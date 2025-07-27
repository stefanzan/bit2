import {
  Value,
  SpaceNode,
  ConstNode,
  ExpNode,
  ObjectValue,
  LoopItemMarker,
} from "../partial/AST";
import { SeqNode, TermNode, LambdaAppNode } from "../lambda/AST";
//@ts-ignore
import { UpdateOperation } from "./Update";
import { isWhitespace, containsNewlineOrSpace } from "../utils/Utils";
import {
  Expr,
  FieldAccess,
  Variable,
  findVariablesAndFields,
  Constant,
  ObjectLiteral,
} from "../common/Exp";
import { evaluateExpr } from "../partialEval/peval";
import { printValue } from "../partial/Print";
import { evaluateTermNode } from "../lambda/Evaluation";

// Environment 类型定义
export interface Environment {
  [variable: string]: [Value, Value[]];
}

// Apply update to a TermNode and return the updated TermNode and remaining operation
export function fuse(
  env: Environment,
  operation: UpdateOperation,
  term: TermNode
): {
  newEnv: Environment;
  newTermNode: TermNode;
  remainingOperation: UpdateOperation;
}[] {
  // Check if the term is a ConstNode
  if (
    (term.type === "const" ||
      term.type === "sep" ||
      term.type === "loopfront" ||
      term.type === "looprear") &&
    typeof term.value === "string"
  ) {
    // add a new arr to env
    if (term.type === "loopfront") {
      let exp = term.lst as Expr;
      if ((exp as Variable).name) {
        // Ensure exp is a Variable and has a name property
        let expName = (exp as Variable).name;
        env[expName + "_new"] = [[], []]; // Set env[expName_new] to [[], []]
      } else {
        throw new Error(
          "exp is not a Variable with a name property in loopfront"
        );
      }
    } else if (term.type === "looprear") {
      let exp = term.lst as Expr;
      if ((exp as Variable).name) {
        let expName = (exp as Variable).name;
        let newLstVal = env[expName + "_new"][0] as Value[];
        newLstVal = newLstVal.reverse();
        env[expName] = [newLstVal, [newLstVal]];
      } else {
        throw new Error(
          "exp is not a Variable with a name property in loopfront"
        );
      }
    }

    const s_c = term.value;
    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
         if (position === 0) {
          // 两种更新策略
          let resultList: {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[] = [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: str + s_c },
              remainingOperation: { type: "id" },
            },
            // optimization: leave only one strategy
            // remove U1
            // {
            //   newEnv: deepCloneEnvironment(env),
            //   newTermNode: {
            //     type: "seq",
            //     nodes: [{ type: "const", value: str }, term],
            //   },
            //   remainingOperation: { type: "id" },
            // }
          ];
          // remove U3
          // if (s_c.length === 0 ) {
          //   resultList.push( 
          //     {
          //       newEnv: deepCloneEnvironment(env),
          //       newTermNode: term,
          //       remainingOperation: operation,
          //     }
          //   );
          // }
          return resultList; 
        } else if (position < s_c.length) {
          const newStr = s_c.slice(0, position) + str + s_c.slice(position);
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: newStr },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (position === s_c.length) {
          // 两种策略
          return [
            // optimization: only one strategy
            // remove U4 == case
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: s_c + str },
              remainingOperation: { type: "id" },
            },
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: {
                type: "insert",
                str,
                position: position - s_c.length,
              },
            },
          ];
        } else {
          const newPos = position - s_c.length;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: { type: "insert", str, position: newPos },
            },
          ];
        }

      case "delete":
        const { str: delStr, position: delPos } = operation;
        if (delPos === 0) {
          if (s_c.startsWith(delStr) && delStr.length <= s_c.length) {
            // 如果delStr===s_c，那么 newStr=""; 还有一个策略，即bot
            const newStr = s_c.slice(delStr.length);
            let result = [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { ...term, value: newStr },
                remainingOperation: { type: "id" },
              },
            ];
            // optimization: only one strategy
            // remove U8
            // if (delStr.length === s_c.length) {
            //   result.push({
            //     newEnv: deepCloneEnvironment(env),
            //     //@ts-ignore
            //     newTermNode: { type: "bot" },
            //     remainingOperation: { type: "id" },
            //   });
            // }
            //@ts-ignore
            return result;
          } else if (delStr.startsWith(s_c) && delStr.length > s_c.length) {
            const remainingStr = delStr.slice(s_c.length);
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { type: "bot" },
                remainingOperation: {
                  type: "delete",
                  str: remainingStr,
                  position: 0,
                },
              },
              // optimization bot equals to ""
              // {
              //   newEnv: deepCloneEnvironment(env),
              //   newTermNode: { ...term, value: "" },
              //   remainingOperation: {
              //     type: "delete",
              //     str: remainingStr,
              //     position: 0,
              //   },
              // },
            ];
          } else {
            throw new Error(
              "cannot delete, not match. delStr: " + delStr + ", s_c: " + s_c
            );
          }
        } else if (
          delPos < s_c.length &&
          delPos + delStr.length <= s_c.length
        ) {
          const newStr =
            s_c.slice(0, delPos) + s_c.slice(delPos + delStr.length);
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: newStr },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (delPos < s_c.length && delPos + delStr.length > s_c.length) {
          const remainingS_c = s_c.substring(0, delPos); // 保留s_c删除位置之前的部分
          const remainingDelStr = delStr.substring(s_c.length - delPos); // 剩余需要删除的字符串
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { type: "const", value: remainingS_c },
              remainingOperation: {
                type: "delete",
                str: remainingDelStr,
                position: 0,
              },
            },
          ];
        } else {
          const newPos = delPos - s_c.length;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: {
                type: "delete",
                str: delStr,
                position: newPos,
              },
            },
          ];
        }

      case "replace":
        const {
          str1,
          str2,
          position: repPos,
        } = operation as {
          type: "replace";
          str1: string;
          str2: string;
          position: number;
        };
        if (repPos === 0) {
          if (s_c.startsWith(str1) && str1.length <= s_c.length) {
            const newStr = str2 + s_c.slice(str1.length);
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: {
                  ...term,
                  value: newStr,
                },
                remainingOperation: { type: "id" },
              },
            ];
          } else if (str1.startsWith(s_c) && str1.length > s_c.length) {
            const remainingS_c = str2.slice(0, s_c.length);
            const remainingStr1 = str1.slice(s_c.length);
            const remainingStr2 = str2.slice(s_c.length);
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { ...term, value: remainingS_c },
                remainingOperation: {
                  type: "replace",
                  str1: remainingStr1,
                  str2: remainingStr2,
                  position: 0,
                },
              },
            ];
          }
        } else if (repPos < s_c.length && repPos + str1.length <= s_c.length) {
          const newStr =
            s_c.slice(0, repPos) + str2 + s_c.slice(repPos + str1.length);
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: newStr },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (repPos < s_c.length && repPos + str1.length > s_c.length) {
          const part1 = s_c.substring(0, repPos); // 替换位置之前的部分
          const overlapPart = s_c.substring(repPos); // 与替换的 str1 重叠的部分
          const overlapStr2 = str2.substring(0, overlapPart.length);
          const remainingStr1 = str1.substring(overlapPart.length); // 剩余需要替换的 str1 部分
          const remainingStr2 = str2.substring(overlapPart.length); // 剩余替换的 str2 部分
          const newOperation: UpdateOperation = {
            type: "replace",
            str1: remainingStr1,
            str2: remainingStr2,
            position: 0,
          };
          const newExpression: TermNode = {
            type: "const",
            value: part1 + overlapStr2,
          };
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: newExpression,
              remainingOperation: newOperation,
            },
          ];
        } else {
          const newPos = repPos - s_c.length;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, value: s_c },
              remainingOperation: {
                type: "replace",
                str1,
                str2,
                position: newPos,
              },
            },
          ];
        }

      case "bulk":
        return fuseBulk(env, operation, term);
      case "id":
        return [
          {
            newEnv: deepCloneEnvironment(env),
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];

      default:
        const exhaustiveCheck: never = operation;
        throw new Error(`Unhandled operation type: ${exhaustiveCheck}`);
    }
  } else if (term.type === "space") {
    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
        // zero-width space
        if (term.width == 0) {
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: operation,
            },
            // optimization: 
            // {
            //   newEnv: deepCloneEnvironment(env),
            //   newTermNode: {
            //     type: "seq",
            //     nodes: [{ type: "const", value: str }, term],
            //   },
            //   remainingOperation: { type: "id" },
            // },
          ];
        } else if (position == 0) {
          // non-zero space
          let resultList: {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[] = [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: {
                type: "seq",
                nodes: [{ type: "const", value: str } as ConstNode, term],
              } as SeqNode,
              remainingOperation: { type: "id" },
            },
          ];
          // optimization
          // if (isWhitespace(str)) {
          //   resultList.push({
          //     newEnv: deepCloneEnvironment(env),
          //     newTermNode: {
          //       type: "space",
          //       width: term.width + str.length,
          //     } as SpaceNode,
          //     remainingOperation: { type: "id" },
          //   });
          // }
          return resultList;
        } else if (position < term.width) {
          if (isWhitespace(str)) {
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { ...term, width: str.length + term.width },
                remainingOperation: { type: "id" },
              },
            ];
          } else {
            throw new Error(
              `Cannot insert non-space between space term: ${operation}`
            );
          }
        } else if (position === term.width) {
          // 两种策略
          let resultList: {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[] = [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: {
                type: "insert",
                str,
                position: position - term.width,
              },
            },
          ];
          // optimization
          // if (isWhitespace(str)) {
          //   // console.log("no: ", str);
          //   resultList.push({
          //     newEnv: deepCloneEnvironment(env),
          //     newTermNode: { ...term, width: term.width + str.length },
          //     remainingOperation: { type: "id" },
          //   });
          // }
          return resultList;
        } else {
          const newPos = position - term.width;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: { type: "insert", str, position: newPos },
            },
          ];
        }
      case "delete":
        const { str: delStr, position: delPos } = operation;
        if (delPos === 0) {
          if (isWhitespace(delStr) && delStr.length <= term.width) {
            // 如果delStr===s_c，还有一个策略, 即bot
            const newWidth = term.width - delStr.length;
            let result = [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { ...term, width: newWidth },
                remainingOperation: { type: "id" },
              },
            ];
            // if (delStr.length === term.width) {
            //   result.push({
            //     newEnv: deepCloneEnvironment(env),
            //     //@ts-ignore
            //     newTermNode: { type: "bot" },
            //     remainingOperation: { type: "id" },
            //   });
            // }
            //@ts-ignore
            return result;
          } else if (delStr.length > term.width) {
            const remainingStr = delStr.slice(term.width);
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { type: "bot" },
                remainingOperation: {
                  type: "delete",
                  str: remainingStr,
                  position: 0,
                },
              },
              // optimization
              // {
              //   newEnv: deepCloneEnvironment(env),
              //   newTermNode: { ...term, width: 0 },
              //   remainingOperation: {
              //     type: "delete",
              //     str: remainingStr,
              //     position: 0,
              //   },
              // },
            ];
          }
        } else if (
          delPos < term.width &&
          delPos + delStr.length <= term.width
        ) {
          const newWidth = term.width - delStr.length;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { ...term, width: newWidth },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (delPos < term.width && delPos + delStr.length > term.width) {
          const remainingWidth = delPos;
          const remainingDelStr = delStr.substring(term.width - delPos); // 剩余需要删除的字符串
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: { type: "space", width: remainingWidth },
              remainingOperation: {
                type: "delete",
                str: remainingDelStr,
                position: 0,
              },
            },
          ];
        } else {
          const newPos = delPos - term.width;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: {
                type: "delete",
                str: delStr,
                position: newPos,
              },
            },
          ];
        }
      case "replace":
        const {
          str1,
          str2,
          position: repPos,
        } = operation as {
          type: "replace";
          str1: string;
          str2: string;
          position: number;
        };
        if (repPos === 0) {
          if (str1.length <= term.width) {
            if (isWhitespace(str2)) {
              const newWidth = term.width - str1.length + str2.length;
              return [
                {
                  newEnv: deepCloneEnvironment(env),
                  newTermNode: {
                    ...term,
                    width: newWidth,
                  },
                  remainingOperation: { type: "id" },
                },
              ];
            } else {
              return [
                {
                  newEnv: deepCloneEnvironment(env),
                  newTermNode: {
                    type: "seq",
                    nodes: [
                      { type: "const", value: str2 },
                      { ...term, width: term.width - str1.length },
                    ],
                  },
                  remainingOperation: { type: "id" },
                },
              ];
            }
          } else if (str1.length > term.width) {
            const remainingS_c = str2.slice(0, term.width);
            const remainingStr1 = str1.slice(term.width);
            const remainingStr2 = str2.slice(term.width);
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { type: "const", value: remainingS_c }, // remove space(n), using const(s_c) instead
                remainingOperation: {
                  type: "replace",
                  str1: remainingStr1,
                  str2: remainingStr2,
                  position: 0,
                },
              },
            ];
          }
        } else if (repPos < term.width && repPos + str1.length <= term.width) {
          if (isWhitespace(str2)) {
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: {
                  ...term,
                  width: str2.length + term.width - str1.length,
                },
                remainingOperation: { type: "id" },
              },
            ];
          } else {
            const newStr =
              " ".repeat(repPos) +
              str2 +
              " ".repeat(term.width - (repPos + str1.length));
            return [
              {
                newEnv: deepCloneEnvironment(env),
                newTermNode: { type: "const", value: newStr },
                remainingOperation: { type: "id" },
              },
            ];
          }
        } else if (repPos < term.width && repPos + str1.length > term.width) {
          const part1 = " ".repeat(repPos); // 替换位置之前的部分
          const overlapPartLength = term.width - repPos; // 与替换的 str1 重叠的部分
          const overlapStr2 = str2.substring(0, overlapPartLength);
          const remainingStr1 = str1.substring(overlapPartLength); // 剩余需要替换的 str1 部分
          const remainingStr2 = str2.substring(overlapPartLength); // 剩余替换的 str2 部分
          const newOperation: UpdateOperation = {
            type: "replace",
            str1: remainingStr1,
            str2: remainingStr2,
            position: 0,
          };
          const newExpression: TermNode = {
            type: "const",
            value: part1 + overlapStr2,
          };
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: newExpression,
              remainingOperation: newOperation,
            },
          ];
        } else {
          const newPos = repPos - term.width;
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: {
                type: "replace",
                str1,
                str2,
                position: newPos,
              },
            },
          ];
        }
      case "bulk":
        return fuseBulk(env, operation, term);
      case "id":
        return [
          {
            newEnv: deepCloneEnvironment(env),
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }
  } else if (term.type === "exp") {
    const expTerm = term as ExpNode;
    const binding = expTerm.binding;
    const exp = binding[0];
    const val = binding[1];
    const valStr = valToStr(val);

    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
        if (position === 0) {
          let resultList: {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[] = [];
          resultList.push({
            newEnv: deepCloneEnvironment(env),
            newTermNode: {
              type: "seq",
              nodes: [{ type: "const", value: str }, term],
            },
            remainingOperation: { type: "id" },
          });
          if (!containsNewlineOrSpace(str)) {
            // another choice:
            let newStr = prependStr(valStr, str, val);
            if (newStr !== undefined) {
              try {
                let newVal = strToVal(newStr, val);
                let { newEnv, newExp } = fuseExp(env, newVal, exp);
                resultList.push({
                  newEnv: deepCloneEnvironment(newEnv),
                  newTermNode: {
                    ...term,
                    binding: [newExp, newVal],
                  },
                  remainingOperation: { type: "id" },
                });
              } catch (error) {
                // console.error(error);
              }
            }
          }

          return resultList;
        } else if (position < valStr.length) {
          const newStr =
            valStr.slice(0, position) + str + valStr.slice(position);
          const newVal = strToVal(newStr, val);
          let { newEnv, newExp } = fuseExp(env, newVal, exp);
          return [
            {
              newEnv: deepCloneEnvironment(newEnv),
              newTermNode: {
                ...term,
                binding: [newExp, newVal],
              },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (position == valStr.length) {
          let resultList: {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[] = [];
          if (!containsNewlineOrSpace(str)) {
            const newStr = appendStr(valStr, str, val);
            if (newStr !== undefined) {
              try {
                const newVal = strToVal(newStr, val);
                let { newEnv, newExp } = fuseExp(env, newVal, exp);
                resultList.push({
                  newEnv: deepCloneEnvironment(newEnv),
                  newTermNode: {
                    ...term,
                    binding: [newExp, newVal],
                  },
                  remainingOperation: { type: "id" },
                });
              } catch (error) {
                console.error(error);
              }
            }
          }

          // If the expression is a variable, them add variable's bidning to env to mark it unmodifiable.
          let env2 = deepCloneEnvironment(env);
          if ((exp as Variable).name) {
            let x = (exp as Variable).name;
            env2[x] = [val, [val]]; // mark x as unmodifiable.
          }

          resultList.push({
            newEnv: env2,
            newTermNode: term,
            remainingOperation: { ...operation, position: 0 },
          });
          return resultList;
        } else {
          const newPosition = position - valStr.length;
          // If the expression is a variable, them add variable's bidning to env to mark it unmodifiable.
          if ((exp as Variable).name) {
            let x = (exp as Variable).name;
            env[x] = [val, [val]]; // mark x as unmodifiable.
          }
          return [
            {
              newEnv: deepCloneEnvironment(env),
              newTermNode: term,
              remainingOperation: { ...operation, position: newPosition },
            },
          ];
        }
      case "delete":
        const { str: delStr, position: delPos } = operation;
        if (delPos === 0) {
          if (delStr.length < valStr.length) {
            const newValStr = valStr.slice(delStr.length);
            const newVal = strToVal(newValStr, val);
            let { newEnv, newExp } = fuseExp(env, newVal, exp);
            return [
              {
                newEnv: deepCloneEnvironment(newEnv),
                newTermNode: { ...term, binding: [newExp, newVal]},
                remainingOperation: { type: "id" },
              },
            ];
          } else if (delStr.length == valStr.length) {
            if ((exp as Variable).name) {
              let x = (exp as Variable).name;
              if (typeof val == "string") {
                // two choice: update exp to "", or delete exp
                let { newEnv, newExp } = fuseExp(env, "", exp);
                return [
                  {
                    newEnv: deepCloneEnvironment(newEnv),
                    newTermNode: { ...term, binding: [newExp, ""]},
                    remainingOperation: { type: "id" },
                  },
                 {
                    newEnv: deleteFromEnv(deepCloneEnvironment(env), x),
                    newTermNode: { type: "bot" },
                    remainingOperation: { type: "id" },
                  },
                  // when delete item and separator in the loop, if we using the following code.
                  // since the item in the loop is not deleted, and unPartialEval currently does not remove the item.
                  // {
                  //   newEnv: deepCloneEnvironment(env),
                  //   newTermNode: { type: "bot" },
                  //   remainingOperation: { type: "id" },
                  // },
                ];
              } else {
                // delete exp, delete from env
                return [
                  {
                    newEnv: deleteFromEnv(deepCloneEnvironment(env), x),
                    newTermNode: { type: "bot" },
                    remainingOperation: { type: "id" },
                  },
                  // {
                  //   newEnv: deepCloneEnvironment(env), // keep it in the env, because of for, cannot
                  //   newTermNode: { type: "bot" },
                  //   remainingOperation: { type: "id" },
                  // },
                ];
              }
            } else if (exp as FieldAccess) {
              let x = ((exp as FieldAccess).object as Variable).name;
              let field = (exp as FieldAccess).field;
              let xVal = env[x][0] as ObjectValue;

              if(env[x][1].length == 0){
                throw new Error("Fields does not existed:" + field);
              }

              let xValUpdatedMark = env[x][1][0] as ObjectValue;
              if (xValUpdatedMark.fields[field].length == 0) {
                let newXVal = deleteField(xVal, field);
                let newXValUpdatedMark = deleteField(xValUpdatedMark, field);
                let newEnv = deleteFromEnv(deepCloneEnvironment(env), x);
                newEnv[x] = [newXVal, [newXValUpdatedMark]];
                return [
                  {
                    newEnv: deepCloneEnvironment(newEnv),
                    newTermNode: { type: "bot" },
                    remainingOperation: { type: "id" },
                  },
                  // {
                  //   newEnv: deepCloneEnvironment(env), // object 不动, because of for, cannot
                  //   newTermNode: { type: "bot" },
                  //   remainingOperation: { type: "id" },
                  // }
                ];
              } else {
                throw new Error(
                  `field has been updated, cannot be remvoed: ${field}$`
                );
              }
            }
          } else if (delStr.length > valStr.length) {
            let delStr1 = delStr.slice(0, valStr.length);
            let delStr2 = delStr.slice(valStr.length);
            let op1 = {
              type: "delete",
              str: delStr1,
              position: 0,
            } as UpdateOperation;
            let resultList = fuse(deepCloneEnvironment(env), op1, term);
            let op2 = {
              type: "delete",
              str: delStr2,
              position: 0,
            } as UpdateOperation;
            resultList.forEach((result) => {
              result.remainingOperation = op2;
            });
            return resultList;
          }
        } else if (delPos + delStr.length <= valStr.length) {
          const newStr =
            valStr.slice(0, delPos) + valStr.slice(delPos + delStr.length);
          const newVal = strToVal(newStr, val);
          let { newEnv, newExp } = fuseExp(env, newVal, exp);
          return [
            {
              newEnv: deepCloneEnvironment(newEnv),
              newTermNode: { ...term, binding: [newExp, newVal]},
              remainingOperation: { type: "id" },
            },
          ];
        } else if (
          delPos <= valStr.length &&
          delPos + delStr.length > valStr.length
        ) {
          const newStr = valStr.slice(0, delPos);
          const remainingDelStr = delStr.slice(valStr.length - delPos);
          const newVal = strToVal(newStr, val);
          let { newEnv, newExp } = fuseExp(env, newVal, exp);
          return [
            {
              newEnv: deepCloneEnvironment(newEnv),
              newTermNode: { ...term, binding: [newExp, newVal]},
              remainingOperation: {
                type: "delete",
                str: remainingDelStr,
                position: 0,
              },
            },
          ];
        } else if (delPos > valStr.length) {
          const newDelPos = delPos - valStr.length;
          let [{ newEnv, newTermNode, remainingOperation }] = fuse(
            deepCloneEnvironment(env),
            { type: "id" },
            term
          );
          return [
            {
              newEnv: deepCloneEnvironment(newEnv),
              newTermNode: newTermNode,
              remainingOperation: {
                type: "delete",
                str: delStr,
                position: newDelPos,
              },
            },
          ];
        }
      case "replace":
        const {
          str1,
          str2,
          position: repPos,
        } = operation as {
          type: "replace";
          str1: string;
          str2: string;
          position: number;
        };
        if (repPos === 0) {
          if (valStr.startsWith(str1)) {
            const newValStr = str2 + valStr.slice(str1.length);
            const newVal = strToVal(newValStr, val);
            let { newEnv, newExp } = fuseExp(
              deepCloneEnvironment(env),
              newVal,
              exp
            );
            // console.log("fuseExp, newVal:", newVal);
            // console.log("newEnv:", newEnv);
            return [
              {
                newEnv: newEnv,
                newTermNode: { ...term, binding: [newExp, newVal]},
                remainingOperation: { type: "id" },
              },
            ];
          } else if (str1.startsWith(valStr)) {
            const newValStr = str2.slice(0, valStr.length);
            const newVal = strToVal(newValStr, val);
            let { newEnv, newExp } = fuseExp(
              deepCloneEnvironment(env),
              newVal,
              exp
            );
            // Note: simple stragety,same length
            const restStr1 = str1.slice(valStr.length);
            const restStr2 = str2.slice(valStr.length);
            return [
              {
                newEnv: newEnv,
                newTermNode: { ...term, binding: [newExp, newVal]},
                remainingOperation: {
                  type: "replace",
                  str1: restStr1,
                  str2: restStr2,
                  position: 0,
                },
              },
            ];
          } else {
            throw new Error(`unsupported replacement: ${str1}; ${str2}`);
          }
        } else if (repPos < valStr.length) {
          const newValStr =
            valStr.slice(0, repPos) + str2 + valStr.slice(repPos + str1.length);
          const newVal = strToVal(newValStr, val);
          let { newEnv, newExp } = fuseExp(
            deepCloneEnvironment(env),
            newVal,
            exp
          );
          return [
            {
              newEnv: newEnv,
              newTermNode: { ...term, binding: [newExp, newVal]},
              remainingOperation: { type: "id" },
            },
          ];
        } else if (repPos >= valStr.length) {
          const newRepPos = repPos - valStr.length;
          let [{ newEnv, newTermNode, remainingOperation }] = fuse(
            deepCloneEnvironment(env),
            { type: "id" },
            term
          );
          return [
            {
              newEnv: deepCloneEnvironment(newEnv),
              newTermNode: newTermNode,
              remainingOperation: { ...operation, position: newRepPos },
            },
          ];
        } else {
          throw new Error(`Unsupported replacement`);
        }
      case "bulk":
        return fuseBulk(env, operation, term);
      case "id":
        // find variables in e, and update them in env
        let { variables, fields } = findVariablesAndFields(exp);

        variables.forEach((variable) => {
          env = markVariableInEnv(variable, env);
        });

        fields.forEach(({ variable, field }) => {
          env = markFieldOfObjectInEnv(field, variable, env);
        });

        // console.log("::::::newExp:", term);
        return [
          {
            newEnv: deepCloneEnvironment(env),
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }
  } else if (term.type === "lambda") {
    let marker = term.marker;
    if (marker.type === "loopitem") {
      // TODO: handle inserting a whole loopitem with separator case
      // 如果是 insert "item" at 0, 可以两种结果：1. insert 改replace;然后保留原item且可以用id往下走; 2. 正常insert
      // 但是如果在最后insert， 就没有term可以参照了
      let loopItemResultList: {
        newEnv: Environment;
        newTermNode: TermNode;
        remainingOperation: UpdateOperation;
      }[] = [];


      // 2. nomrmal case
      let varName = term.variable.name;
      let varExp = term.binding[0];
      let varVal = term.binding[1];
      let env1 = deepCloneEnvironment(env);
      env1 = initializeMarkerOfVariableInEnv(env1, varName, varVal, varExp);

      let newArrVarName = "";
      if (marker.lst as Variable) {
        let expName = (marker.lst as Variable).name;
        newArrVarName = expName + "_new";
      } else {
        throw new Error(
          "exp is not a Variable with a name property in loopitem's marker"
        );
      }

      let bodyResultList = fuse(
        deepCloneEnvironment(env1),
        operation,
        term.body
      );
      let optional2LoopitemReulstList = bodyResultList.map(
        ({ newEnv, newTermNode, remainingOperation }) => {
          // 要考虑删除的情况 varName不再newEnv中存在
          // let envCloned = deepCloneEnvironment(env);
          let envCloned = deepCloneEnvironment(newEnv);
          if (varName in envCloned) {
            let newVarVal = envCloned[varName][0] as Value;
            let newArrVal = envCloned[newArrVarName][0] as Value[]; // must be an array

            if(typeof newVarVal === 'object' && newVarVal !==null && 'type' in newVarVal){
              if(newVarVal.type === 'object' && Object.keys(newVarVal.fields).length === 0) {
                // not push
              } else {
                newArrVal.push(newVarVal);
              }
            } else {
              newArrVal.push(newVarVal);
            }

            // except newArrVarName, varName, others may be updated too.
            envCloned[newArrVarName] = [newArrVal, [newArrVal]];
            envCloned = deleteFromEnv(deepCloneEnvironment(envCloned), varName);
            let { newEnv: updatedEnv, newExp } = fuseExp(
              envCloned,
              newVarVal,
              varExp
            );

            // Note: very important, restore the same name var
            if (env[varName]) {
              updatedEnv[varName] = env[varName];
            }

            return {
              newEnv: updatedEnv,
              newTermNode: {
                type: "lambda",
                variable: term.variable,
                body:
                  newTermNode.type != "seq"
                    ? { type: "seq", nodes: [newTermNode] }
                    : newTermNode, // always return seq
                binding: [newExp, newVarVal],
                marker: term.marker,
              },
              remainingOperation: remainingOperation,
            } as {
              newEnv: Environment;
              newTermNode: TermNode;
              remainingOperation: UpdateOperation;
            };
          } else {
            // deleted item
            // Note: very important, restore the same name var
            if (env[varName]) {
              envCloned[varName] = env[varName];
            }
            return {
              newEnv: envCloned,
              newTermNode: {
                type: "lambda",
                variable: term.variable,
                body:
                  newTermNode.type != "seq"
                    ? { type: "seq", nodes: [newTermNode] }
                    : newTermNode, // always return seq
                binding: [{ type: "constant", value: null }, null],
                marker: term.marker,
              },
              remainingOperation: remainingOperation,
            } as {
              newEnv: Environment;
              newTermNode: TermNode;
              remainingOperation: UpdateOperation;
            };
          }
        }
      );

      return loopItemResultList.concat(optional2LoopitemReulstList);
    } else {
      let loopItemResultList: {
        newEnv: Environment;
        newTermNode: TermNode;
        remainingOperation: UpdateOperation;
      }[] = [];
     // solution 1: insert before
      // 如果postion是0,可以插入一个const(str)在前面，并更新后面的postion值
      if (operation.type === "bulk" && operation.operations.length > 0) {
        let ops = operation.operations;
        const [firstOp, ...restOps] = ops;
        if (firstOp.type === "insert" && firstOp.position === 0) {
          let deltaN = firstOp.str.length;

          // Adjust positions for the remaining operations
          const adjustedRestOps = restOps.map((op) => {
            if (op.type === "id") {
              return op;
            } else if (!("position" in op)) {
              throw new Error("All operations must have positions");
            } else {
              return { ...op, position: op.position - deltaN }; 
              // since creating a new term, position-deltaN cannot be negative.
            }
          });
          // Combine the remaining operations
          let remainingBulkOp: UpdateOperation = {
            type: "bulk",
            operations: adjustedRestOps,
          };
          let resultList = fuse(
            deepCloneEnvironment(env),
            remainingBulkOp,
            term
          );
          resultList.map((result) => {
            result.newTermNode = {
              type: "seq",
              nodes: [{ type: "const", value: firstOp.str }, result.newTermNode],
            };
            return result;
          });
          loopItemResultList = loopItemResultList.concat(resultList);
        }
      } else if (operation.type === "insert" && operation.position === 0) {
        let resultList = fuse(
          deepCloneEnvironment(env),
          {type:'id'},
          term
        );
        resultList.map((result) => {
          result.newTermNode = {
            type: "seq",
            nodes: [{ type: "const", value: operation.str }, result.newTermNode],
          };
          return result;
        });
        loopItemResultList = loopItemResultList.concat(resultList);
      }


      // solution2: normal case:
      let varName = term.variable.name;
      let varExp = term.binding[0];
      let varVal = term.binding[1];

      let env1 = deepCloneEnvironment(env);
      // 判断var类型，非基本类型，需要特殊处理
      env1 = initializeMarkerOfVariableInEnv(env1, varName, varVal, varExp);

      // console.log("--------lambda----------");
      // console.log("operation:", operation);
      // console.log("term.body:", term.body);
      // console.log("env1:", env1);
      let bodyResultList = fuse(deepCloneEnvironment(env1), operation, term.body);
      let resultList = bodyResultList.map(({ newEnv, newTermNode, remainingOperation }) => {
        // console.log("newEnv:", newEnv);
        if(!(varName in newEnv)){
          throw new Error("valued expression of " + varName + " was deleted in the body.");
        }
        let newVarVal = newEnv[varName][0];
        let isNewVarVal = newEnv[varName][1].length > 0;
        delete (newEnv as any)[varName];
        let updatedOldEnv = updateEnvByEnv(env, newEnv);
        if(!isNewVarVal){
          return {
            newEnv: updatedOldEnv,
            newTermNode: {
              type: "lambda",
              variable: term.variable,
              body: newTermNode,
              binding: [varExp, varVal],
              isBindingUpdated:false,
              marker: term.marker,
            },
            remainingOperation: remainingOperation,
          } as {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          };
        } else {
          let { newEnv: updatedEnv, newExp } = fuseExp(
            updatedOldEnv,
            newVarVal,
            varExp
          );
          // console.log("lambda, newVarVal:", newVarVal);
          // console.log("updatedOldEnv:", updatedOldEnv);
          // console.log("exp:", varExp);
          // console.log("newExp:", newExp);
          // console.log("updatedEnv:", updatedEnv);
          return {
            newEnv: updatedEnv,
            newTermNode: {
              type: "lambda",
              variable: term.variable,
              body: newTermNode,
              binding: [newExp, newVarVal],
              isBindingUpdated:true,
              marker: term.marker,
            },
            remainingOperation: remainingOperation,
          } as {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          };
        }
      });
      loopItemResultList = loopItemResultList.concat(resultList);
      return loopItemResultList;
    }
  } else if (
    term.type === "branchstart" ||
    term.type === "branchend" ||
    term.type === "nop"
  ) {
    if (term.type === "branchend") {
      let conditionExp = term.condition[0];
      let conditionVal = term.condition[1];
      try {
        let [_, newConditionalVal] = evaluateExpr(
          transformEnvironment(env),
          conditionExp
        );
        if (newConditionalVal !== conditionVal) {
          throw new Error(
            "Violate BX properties: updates change if-then-else branch."
          );
        }
      } catch (error) {
        throw new Error(
          `Error evaluating condition expression fail during backward: ${error}`
        );        
      }
   }

    let resultList: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [];
    resultList.push({
      newEnv: deepCloneEnvironment(env),
      newTermNode: term,
      remainingOperation: operation,
    });
    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
        if (position === 0) {
          resultList.push({
            newEnv: deepCloneEnvironment(env),
            newTermNode: {
              type: "seq",
              nodes: [{ type: "const", value: str }, term],
            },
            remainingOperation: { type: "id" },
          });
        }
      case "delete":
      case "replace":
      case "id":
        return resultList;
      case "bulk":
        return fuseBulk(env, operation, term);
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }
  } else if (term.type === "seq") {
    if (operation.type === "bulk") {
      return fuseBulk(env, operation, term);
    }

    const terms = term.nodes;
    let results: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [
      {
        newEnv: env,
        newTermNode: { type: "seq", nodes: [] },
        remainingOperation: operation,
      },
    ];

    for (const subTerm of terms) {
      const newResults: {
        newEnv: Environment;
        newTermNode: TermNode;
        remainingOperation: UpdateOperation;
      }[] = [];

      for (const result of results) {
        // console.log("-------------seq-----------");
        // console.log(result);
        // console.log(subTerm);
        const subResults = fuse(
          deepCloneEnvironment(result.newEnv),
          result.remainingOperation,
          subTerm
        );

        for (const subResult of subResults) {
          const updatedNodes = (
            result.newTermNode.type === "seq"
              ? result.newTermNode.nodes
              : [result.newTermNode]
          ).concat(
            subResult.newTermNode.type === "seq"
              ? subResult.newTermNode.nodes
              : [subResult.newTermNode]
          );
          newResults.push({
            newEnv: subResult.newEnv,
            newTermNode: {
              type: "seq",
              nodes: updatedNodes,
            },
            remainingOperation: subResult.remainingOperation,
          });
        }
      }

      results = newResults;
    }

    return results.map((result) => {
      return result;
      //   return {
      //   newEnv: result.newEnv,
      //   newTermNode:
      //     result.newTermNode.type === "seq" &&
      //     result.newTermNode.nodes.length === 1
      //       ? result.newTermNode.nodes[0]
      //       : result.newTermNode,
      //   remainingOperation: result.remainingOperation,
      // }
    });
  } else if (term.type === "end") {
    let resultList: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [];
      // {
      //   newEnv: deepCloneEnvironment(env),
      //   newTermNode: term,
      //   remainingOperation: operation,
      // },
    switch (operation.type) {
     case "insert":
        const { str, position } = operation;
        if (position >= 0) {
          resultList.push({
            newEnv: deepCloneEnvironment(env),
            newTermNode: {
              type: "seq",
              nodes: [{ type: "const", value: str }, term],
            },
            remainingOperation: { type: "id" },
          });
          return resultList;
        } else {
          throw new Error(`Unhandled operation type: ${operation.type}, ${operation.position}, ${operation.str} for end term`);
        }
      case "id":
        return [
          {
            newEnv: deepCloneEnvironment(env),
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];
      default:
        throw new Error(`Unhandled operation type: ${operation.type}`);
      }
  } else {
    throw new Error(
      "Operation can only be applied to ConstNode with string value"
    );
  }
}

export function fuseExp(
  env: Environment,
  value: Value,
  exp: Expr
): { newEnv: Environment; newExp: Expr } {
  switch (exp.type) {
    case "constant":
      return { newEnv: env, newExp: valueToConstantExpr(value) };
    case "variable":
      if (!(exp.name in env)) {
        throw new Error(`Variable ${exp.name} not found in environment.`);
      }
      const [varValue, marks] = env[exp.name];
      if (marks.length === 0) {
        const newEnv = deepCloneEnvironment(env);
        newEnv[exp.name] = [value, [value]];
        return { newEnv, newExp: exp };
      } else if (marks.length === 1 && marks[0] === value) {
        return { newEnv: env, newExp: exp };
      } else {
        throw new Error(
          `Fail, variable cannot be updated to different value ${exp.name}, previous: ${marks[0]}, new: ${value}`
        );
      }
    case "freeze":
      let [_, evaluated] = evaluateExpr(
        transformEnvironment(env),
        exp.expression
      );
      if (evaluated !== value) {
        throw new Error(
          `Fail, freezed expression cannot be changed, old: ${value}, new: ${evaluated}`
        );
      } else {
        return { newEnv: env, newExp: exp };
      }

    case "field":
      // Rule for field access
      const objExp = exp.object;
      if (objExp.type === "variable" && objExp.name in env) {
        const [objValue, objMarks] = env[objExp.name];
        if ((objValue as ObjectValue).type === "object") {
          const newFields = {
            ...(objValue as ObjectValue).fields,
            [exp.field]: value,
          };
          const newObjValue = {
            type: "object",
            fields: newFields,
          } as ObjectValue;
          const newMarks = updateFieldMarkWithValue(
            objMarks[0] as ObjectValue,
            exp.field,
            value
          );
          const newEnv: Environment = deepCloneEnvironment(env);
          newEnv[objExp.name] = [newObjValue, [newMarks]];
          return { newEnv, newExp: exp };
        } else if(typeof objValue === 'object'){ // either list or null value, e.g. call list.length 
          return { newEnv: deepCloneEnvironment(env), newExp: exp };
        } else {
          throw new Error("Field access's value is not an object");
        }
      } else {
        throw new Error(`Field access not start with variable.`);
      }

    case "binary":
      let transformedEnv = transformEnvironment(env);
      let [envLeft, left] = evaluateExpr(transformedEnv, exp.left);
      // let [envRight, right] = evaluateExpr(transformedEnv, exp.right);
      // if(value as number){
      // console.log("transformedEnv:", transformedEnv);
      // console.log("left:", left);
      // console.log("value:", value);
      // console.log("exp:", exp);
      if (typeof value === "number") {
        if (typeof value !== "number" || value === null) {
          throw new Error("Value must be a non-null number");
        }
        switch (exp.operator) {
          case "+":
            let subResultForPlus = fuseExp(env, value - left, exp.right);
            // console.log("subResult:", subResultForPlus);
            return {
              newEnv: subResultForPlus.newEnv,
              newExp: { ...exp, right: subResultForPlus.newExp },
            };
          case "-":
            let subResultForMinus = fuseExp(env, left - value, exp.right);
            return {
              newEnv: subResultForMinus.newEnv,
              newExp: { ...exp, right: subResultForMinus.newExp },
            };
          case "*":
            let subResultForTimes = fuseExp(env, value / left, exp.right);
            return {
              newEnv: subResultForTimes.newEnv,
              newExp: { ...exp, right: subResultForTimes.newExp },
            };
          case "/":
            let subResultForDivide = fuseExp(env, left / value, exp.right);
            return {
              newEnv: subResultForDivide.newEnv,
              newExp: { ...exp, right: subResultForDivide.newExp },
            };
        }
        // } else if (value as boolean) {
      } else if (typeof value == "string") {
        let newLeftValue = value.slice(0, left.length);
        let newRightValue = value.slice(left.length);
        let subResultOfLeft = fuseExp(env, newLeftValue, exp.left);
        let subResultOfRight = fuseExp(subResultOfLeft.newEnv, newRightValue, exp.right);
        return {
          newEnv: subResultOfRight.newEnv,
          newExp: {type:"binary", left:subResultOfLeft.newExp, operator:exp.operator, right: subResultOfRight.newExp} as Expr
        }

      } else if (typeof value === "boolean") {
        // TODO
      }

    case "unary":
      // Add logic for unary operations here
      return { newEnv: env, newExp: exp };
    case "array":
      // construct exp
      let elements = exp.elements;
      let updatedElements = alignAndUpdate(elements, value as Value[]);
      return {
        newEnv: env,
        newExp: { type: "array", elements: updatedElements },
      };
    case "object":
      let fieldsExp = {};
      let fieldsValue = (value as ObjectValue).fields;
      for(const field in fieldsValue) {
        if(fieldsValue.hasOwnProperty(field)){
          const value = fieldsValue[field];
          //@ts-ignore
          fieldsExp[field] = convertToExpr(value);
        }
      }
      return {
        newEnv: env,
        newExp: {type:'object', fields: fieldsExp} 
      }
    default:
      //@ts-ignore
      throw new Error(`Unsupported expression type: ${exp.type}`);
  }
}

function alignAndUpdate(elements: Expr[], valLst: Value[]): Expr[] {
  const updatedElements: Expr[] = [];

  for (let i = 0; i < valLst.length; i++) {
    if (i < elements.length) {
      updatedElements.push(updateExpr(elements[i], valLst[i]));
    } else {
      updatedElements.push(convertToExpr(valLst[i]));
    }
  }

  return updatedElements;
}

function updateExpr(expr: Expr, value: Value): Expr {
  switch (expr.type) {
    case "constant":
      return {
        ...expr,
        value: value as number | boolean | string | [] | null | ObjectLiteral,
      };
    case "array":
      return {
        ...expr,
        elements: alignAndUpdate(expr.elements, value as Value[]),
      };
    case "object":
      return {
        ...expr,
        fields: Object.keys(expr.fields).reduce((fields, key) => {
          fields[key] = {
            ...expr.fields[key],
            value: (value as ObjectValue).fields[key],
          };
          return fields;
        }, {} as { [key: string]: Constant }),
      };
    // case 'freeze':
    // return { ...expr, expression: updateExpr(expr.expression, value) };
    default:
      throw new Error(`Unsupported expression type: ${(expr as any).type}`);
  }
}

function convertToExpr(value: Value): Expr {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string" ||
    value === null
  ) {
    return { type: "constant", value };
  }
  if (Array.isArray(value)) {
    return { type: "array", elements: value.map(convertToExpr) };
  }
  if (typeof value === "object" && value !== null) {
    return {
      type: "object",
      fields: Object.keys(value.fields).reduce((fields, key) => {
        fields[key] = { type: "constant", value: value.fields[key] };
        return fields;
      }, {} as { [key: string]: Constant }),
    };
  }
  throw new Error(`Unsupported value type: ${typeof value}`);
}

function strToVal(s: string, v: Value): Value {
  if (typeof v === "number") {
    // parseFloat("0,") = 0
    const parsedNumber = parseFloat(s);
    if (isNaN(parsedNumber)) {
      throw new Error(`convert to number fail: ` + s);
    } else {
      return parsedNumber;
    }
  } else if (typeof v === "boolean") {
    if (s === "true") {
      return true;
    } else if (s === "false") {
      return false;
    } else {
      throw new Error("convert to boolean fail: ${s}");
    }
  } else if (typeof v === "string") {
    return s; // v is already string, return s as is
  } else {
    throw new Error(`Unsupported type: ${typeof v}`);
  }
}

function valToStr(value: Value): string {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return String(value); // Convert number, boolean, and string to string
  } else {
    return "Unknown"; // Handle unexpected types
  }
}

function deleteFromEnv(env: Environment, key: string): Environment {
  const newEnv = deepCloneEnvironment(env); // Create a shallow copy of env
  delete newEnv[key]; // Delete the specified key from the new environment
  return newEnv; // Return the modified environment
}

/**
 * Deletes a specified field from an ObjectValue.
 * @param obj The ObjectValue from which to delete the field.
 * @param field The field to delete.
 * @returns A new ObjectValue with the specified field removed.
 */
function deleteField(obj: ObjectValue, field: string): ObjectValue {
  // Destructure the fields, omitting the specified field
  const { [field]: _, ...newFields } = obj.fields;

  // Return a new ObjectValue with the updated fields
  return {
    type: "object",
    fields: newFields,
  };
}

function updateFieldMark(
  obj: ObjectValue,
  field: string,
  objVal: ObjectValue
): ObjectValue {
  // Destructure the fields, omitting the specified field
  const { [field]: _, ...newFields } = obj.fields;
  newFields[field] = objVal.fields[field];
  // Return a new ObjectValue with the updated fields
  return {
    type: "object",
    fields: newFields,
  };
}

function updateFieldMarkWithValue(
  obj: ObjectValue,
  field: string,
  value: Value
): ObjectValue {
  // Destructure the fields, omitting the specified field
  const { [field]: val, ...newFields } = obj.fields;
  newFields[field] = [value];
  // Return a new ObjectValue with the updated fields
  return {
    type: "object",
    fields: newFields,
  };
}

function markVariableInEnv(variable: Variable, env: Environment): Environment {
  if (!(variable.name in env)) {
    throw new Error(`Variable ${variable.name} not found in environment.`);
  }

  let val = env[variable.name][0];
  let newEnv = deleteFromEnv(env, variable.name);
  newEnv[variable.name] = [val, [val]];
  return newEnv;
}

function markFieldOfObjectInEnv(
  field: string,
  variable: Variable,
  env: Environment
): Environment {
  let x = variable.name;
  if (!(x in env)) {
    throw new Error(`Variable ${x} not found in environment.`);
  }
  let xVal = env[x][0] as ObjectValue;
  let xValMark = env[x][1][0] as ObjectValue;
  let newXValUpdatedMark = updateFieldMark(xValMark, field, xVal);
  let newEnv = deleteFromEnv(env, x);
  newEnv[x] = [xVal, [newXValUpdatedMark]];
  return newEnv;
}

function updateEnvByEnv(env: Environment, env2: Environment): Environment {
  // Create a copy of env to avoid mutating the original env
  let updatedEnv = deepCloneEnvironment(env);

  // Iterate over keys in env2
  for (const key in env2) {
    if (env2.hasOwnProperty(key)) {
      // Update the value in the updatedEnv
      updatedEnv[key] = env2[key];
    }
  }

  return updatedEnv;
}

function transformEnvironment(env: Environment): Map<string, any> {
  const map = new Map<string, any>();

  for (const variable in env) {
    if (env.hasOwnProperty(variable)) {
      map.set(variable, env[variable][0]);
    }
  }

  return map;
}

export function valueToConstantExpr(value: Value): Constant {
  if (
    value === null ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string"
  ) {
    return { type: "constant", value: value };
  } else if (Array.isArray(value)) {
    return {
      type: "constant",
      value: value.map((v) => valueToConstantExpr(v)) as unknown as [],
    };
  } else if ((value as ObjectValue).type === "object") {
    const objectValue = value as ObjectValue;
    const fields: { [key: string]: Constant } = {};
    for (const key in objectValue.fields) {
      if (objectValue.fields.hasOwnProperty(key)) {
        fields[key] = valueToConstantExpr(objectValue.fields[key]) as Constant;
      }
    }
    return {
      type: "constant",
      value: { type: "object", fields: fields },
    };
  } else {
    throw new Error(`Unhandled value type: ${typeof value}`);
  }
}

export function printEnvironment(env: Environment): void {
  console.log("{\n");
  for (const variable in env) {
    if (env.hasOwnProperty(variable)) {
      const [currentValue, marks] = env[variable];
      console.log(`${variable}: {`);
      console.log(" val: ");
      printValue(currentValue, " ");
      console.log(",marks: [");
      marks.forEach((v, index) => {
        printValue(v, " ");
        if (index < marks.length - 1) {
          console.log(", ");
        }
      });
      console.log("]\n },\n");
    }
  }
  console.log("}");
}


export function fuseBulk(
  env: Environment,
  bulkOp: UpdateOperation,
  term: TermNode
): {
  newEnv: Environment;
  newTermNode: TermNode;
  remainingOperation: UpdateOperation;
}[] {
  if (bulkOp.type === "id") {
    return fuse(deepCloneEnvironment(env), bulkOp, term);
  }

  if (bulkOp.type !== "bulk" || !bulkOp.operations) {
    throw new Error("Invalid bulk operation");
  }

  if (bulkOp.operations.length === 0) {
    return [{
      newEnv: deepCloneEnvironment(env),
      newTermNode: term,
      remainingOperation: { type: "id" },
    }];
  } else if (term.type === "seq" && term.nodes.length === 0) {
    return [{
      newEnv: deepCloneEnvironment(env),
      newTermNode: term,
      remainingOperation: bulkOp,
    }];
  }

  if (term.type === "lambda") {
    let clonedBulkOp = deepCloneOp(bulkOp);
    return fuse(deepCloneEnvironment(env), clonedBulkOp, term);
  }

  // 非递归栈结构模拟递归调用
  type Frame = {
    env: Environment;
    termNodes: TermNode[]; // 剩余待处理的 nodes
    processedNodes: TermNode[]; // 已处理的 nodes
    bulkOp: UpdateOperation;
  };

  if (term.type === "seq") {
    const stack: Frame[] = [{
      env: env,
      termNodes: [...term.nodes],
      processedNodes: [],
      bulkOp: bulkOp,
    }];
    const results: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [];

    while (stack.length > 0) {
      const frame = stack.pop()!;
      const { env, termNodes, processedNodes, bulkOp } = frame;

      if (termNodes.length === 0) {
        results.push({
          newEnv: env,
          newTermNode: {
            type: "seq",
            nodes: processedNodes,
          },
          remainingOperation: bulkOp,
        });
        continue;
      }

      const [head, ...tail] = termNodes;
      const fuseResults = fuseBulk(env, bulkOp, head);

      for (const res of fuseResults) {
        const nextProcessed = [...processedNodes, res.newTermNode];
        stack.push({
          env: res.newEnv,
          termNodes: tail,
          processedNodes: nextProcessed,
          bulkOp: res.remainingOperation,
        });
      }
    }

    return results;
  }

  // 非seq、非lambda情形（普通TermNode）
  const [op1, ...restOps] = bulkOp.operations;

  if (
    op1.type === "insert" ||
    op1.type === "delete" ||
    op1.type === "replace"
  ) {
    const op1Results = fuse(deepCloneEnvironment(env), op1, term);
    let results: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [];

    for (const op1Result of op1Results) {
      const op1Prime = op1Result.remainingOperation;

      if (
        op1Prime.type === "id" ||
        op1Prime.type === "insert" ||
        op1Prime.type === "delete" ||
        op1Prime.type === "replace"
      ) {
        let termStr = evaluateTermNode(op1Result.newTermNode);
        let deltaN = termStr.length;

        const adjustedRestOps = restOps.map((op) => {
          if (op.type === "id") {
            return op;
          } else if (!("position" in op)) {
            throw new Error("All operations must have positions");
          } else {
            return { ...op, position: op.position - deltaN };
          }
        });

        const remainingBulkOp: UpdateOperation = {
          type: "bulk",
          operations: [op1Result.remainingOperation, ...adjustedRestOps],
        };

        results.push({
          newEnv: op1Result.newEnv,
          newTermNode: op1Result.newTermNode,
          remainingOperation: remainingBulkOp,
        });
      } else {
        throw new Error("nested bulk currently not supported");
      }
    }

    return results;
  } else if (op1.type === "id") {
    if (restOps.length === 0) {
      return fuse(deepCloneEnvironment(env), op1, term);
    } else {
      return fuseBulk(env, {
        type: "bulk",
        operations: restOps,
      }, term);
    }
  }

  return [];
}


export function fuseBulk1(
  env: Environment,
  bulkOp: UpdateOperation,
  term: TermNode
): {
  newEnv: Environment;
  newTermNode: TermNode;
  remainingOperation: UpdateOperation;
}[] {
  if (bulkOp.type === "id") {
    // console.log("Bulk, term:", term);
    return fuse(deepCloneEnvironment(env), bulkOp, term);
    // return [{ newEnv: env, newTermNode: term, remainingOperation: { type: 'id' } }];
  }

  if (bulkOp.type !== "bulk" || !bulkOp.operations) {
    throw new Error("Invalid bulk operation");
  }

  // ending of recursive call
  if (bulkOp.operations.length == 0) {
    return [
      {
        newEnv: deepCloneEnvironment(env),
        newTermNode: term,
        remainingOperation: { type: "id" },
      },
    ];
  } else if (term.type === "seq" && term.nodes.length == 0) {
    return [
      {
        newEnv: deepCloneEnvironment(env),
        newTermNode: term,
        remainingOperation: bulkOp,
      },
    ];
  }

  const [op1, ...restOps] = bulkOp.operations;
  if (term.type === "seq") {
    const firstTerm = term.nodes[0];
    const remainingTerms = term.nodes.slice(1);
    const fuseResultsOfFirstTerm = fuseBulk(env, bulkOp, firstTerm);
    // console.log("fuseResultsOfFirstTerm:", fuseResultsOfFirstTerm);
    const results: {
      newEnv: Environment;
      newTermNode: TermNode;
      remainingOperation: UpdateOperation;
    }[] = [];

    for (const result of fuseResultsOfFirstTerm) {
      const subResults = fuseBulk(result.newEnv, result.remainingOperation, {
        type: "seq",
        nodes: remainingTerms,
      });

      for (const subResult of subResults) {
        let remainingNodesTerm = [];
        if (subResult.newTermNode.type != "seq") {
          remainingNodesTerm.push(subResult.newTermNode);
        } else {
          remainingNodesTerm = subResult.newTermNode.nodes;
        }
        results.push({
          newEnv: subResult.newEnv,
          newTermNode: {
            type: "seq",
            nodes: [result.newTermNode, ...remainingNodesTerm],
          },
          remainingOperation: subResult.remainingOperation,
        });
      }
    }

    return results;
  } else if (term.type === "lambda") {
    let clonedBulkOp = deepCloneOp(bulkOp);
    return fuse(deepCloneEnvironment(env), clonedBulkOp, term);
  } else {
    if (
      op1.type === "insert" ||
      op1.type === "delete" ||
      op1.type === "replace"
    ) {
      // 这里不能简单的fuse整个term，要根据term类型来，就好比上一个if判断是seq，除了seq外，LambdaAppNode需要特殊处理
      const op1Results = fuse(deepCloneEnvironment(env), op1, term);
      let listOfList = op1Results.map((op1Result) => {
        let op1Prime = op1Result.remainingOperation;
        if (
          op1Prime.type === "id" ||
          op1Prime.type === "insert" ||
          op1Prime.type === "delete" ||
          op1Prime.type === "replace"
        ) {
          let termStr = evaluateTermNode(op1Result.newTermNode);
          let deltaN = termStr.length;

          // Adjust positions for the remaining operations
          const adjustedRestOps = restOps.map((op) => {
            if (op.type === "id") {
              return op;
            } else if (!("position" in op)) {
              throw new Error("All operations must have positions");
            } else {
              return { ...op, position: op.position - deltaN };
              // if op.position - deltaN <0, then needs special method to handle.
            }
          });
          // Combine the remaining operations
          let remainingBulkOp: UpdateOperation = {
            type: "bulk",
            operations: [op1Result.remainingOperation, ...adjustedRestOps],
          };

          return [
            {
              newEnv: op1Result.newEnv,
              newTermNode: op1Result.newTermNode,
              remainingOperation: remainingBulkOp,
            },
          ] as {
            newEnv: Environment;
            newTermNode: TermNode;
            remainingOperation: UpdateOperation;
          }[];
        } else {
          throw new Error("nested bulk current not supported");
        }
      });
      return listOfList.reduce((acc, val) => acc.concat(val), []);
    } else if (op1.type === "id") {
      // case 3: using id through the whole program.
      if (restOps.length == 0) {
        return fuse(deepCloneEnvironment(env), op1, term);
      } else {
        // case 4
        // Create a new bulk operation with the remaining operations
        const newBulkOp: UpdateOperation = {
          type: "bulk",
          operations: restOps,
        };
        return fuseBulk(env, newBulkOp, term);
      }
    }
  }

  return [];
}

function getOpStr(op1: UpdateOperation): string | undefined {
  if (op1.type === "insert" || op1.type === "delete") {
    return op1.str;
  } else if (op1.type === "replace") {
    return op1.str1;
  } else {
    return undefined;
  }
}

function prependStr(
  str1: string,
  str2: string,
  val: Value
): string | undefined {
  // 尝试将str2转换为Value类型
  try {
    const parsedValue: Value = JSON.parse(str2);

    // 如果转换成功且类型匹配，则返回合并后的字符串
    if (isValidValue(parsedValue)) {
      return str2 + str1;
    }
  } catch (e) {
    // 如果转换失败，则返回undefined
    return undefined;
  }

  return undefined;
}

function appendStr(str1: string, str2: string, val: Value): string | undefined {
  // 尝试将str2转换为Value类型
  try {
    const parsedValue: Value = JSON.parse(str2);

    // 如果转换成功且类型匹配，则返回合并后的字符串
    if (isValidValue(parsedValue)) {
      return str1 + str2;
    }
  } catch (e) {
    // 如果转换失败，则返回undefined
    return undefined;
  }

  return undefined;
}

// 检查转换后的值是否是有效的Value类型
function isValidValue(value: any): value is Value {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string" ||
    value === null ||
    (Array.isArray(value) && value.every(isValidValue)) ||
    (typeof value === "object" &&
      value !== null &&
      value.type === "object" &&
      typeof value.fields === "object")
  ) {
    return true;
  }
  return false;
}

// 类型保护函数，用于判断一个值是否为 ObjectValue 类型
function isObjectValue(value: any): value is ObjectValue {
  return (
    value &&
    typeof value === "object" &&
    value.type === "object" &&
    "fields" in value
  );
}

// 深拷贝函数
// function deepClone(value: Value): Value {
//   console.log(value);
//   if (value === null || typeof value !== "object") {
//     return value;
//   }

//   if (Array.isArray(value)) {
//     return value.map(deepClone);
//   }

//   if (isObjectValue(value)) {
//     const clonedFields: { [key: string]: Value } = {};
//     for (const key in value.fields) {
//       if (value.fields.hasOwnProperty(key)) {
//         clonedFields[key] = deepClone(value.fields[key]);
//       }
//     }
//     return { type: "object", fields: clonedFields };
//   }

//   // 处理普通对象
//   const clonedObj: { [key: string]: Value } = {};
//   for (const key in value as { [key: string]: Value }) {
//     if ((value as { [key: string]: Value }).hasOwnProperty(key)) {
//       clonedObj[key] = deepClone((value as { [key: string]: Value })[key]);
//     }
//   }
//   return clonedObj as unknown as Value;
// }

function deepClone(value: Value, seen = new WeakMap()): Value {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (seen.has(value)) {
    // 已克隆过，直接返回之前克隆结果，避免死循环
    return seen.get(value);
  }

  if (Array.isArray(value)) {
    const clonedArr:any[] = [];
    seen.set(value, clonedArr);
    for (const item of value) {
      clonedArr.push(deepClone(item, seen));
    }
    return clonedArr as unknown as Value;
  }

  if (isObjectValue(value)) {
    const clonedFields: { [key: string]: Value } = {};
    const clonedObj = { type: "object", fields: clonedFields };
    seen.set(value, clonedObj);
    for (const key in value.fields) {
      if (value.fields.hasOwnProperty(key)) {
        clonedFields[key] = deepClone(value.fields[key], seen);
      }
    }
    //@ts-ignore
    return clonedObj;
  }

  // 处理普通对象
  const clonedObj: { [key: string]: Value } = {};
  seen.set(value, clonedObj);
  for (const key in value as { [key: string]: Value }) {
    if ((value as { [key: string]: Value }).hasOwnProperty(key)) {
      clonedObj[key] = deepClone((value as { [key: string]: Value })[key], seen);
    }
  }
  return clonedObj as unknown as Value;
}

// 深拷贝 Environment
function deepCloneEnvironment(env: Environment, seen = new WeakMap()): Environment {
  if (seen.has(env)) {
    return seen.get(env);
  }

  const clonedEnv: Environment = {};
  seen.set(env, clonedEnv);

  for (const key in env) {
    if (env.hasOwnProperty(key)) {
      const [val1, valArray] = env[key];
      clonedEnv[key] = [deepClone(val1, seen), deepClone(valArray, seen) as Value[]];
    }
  }

  return clonedEnv;
}

// function deepCloneEnvironment(env: Environment): Environment {
//   const clonedEnv: Environment = {};
//   for (const key in env) {
//     if (env.hasOwnProperty(key)) {
//       const [val1, valArray] = env[key];
//       clonedEnv[key] = [deepClone(val1), deepClone(valArray) as Value[]];
//     }
//   }
//   return clonedEnv;
// }

// // Value
// export type Value = number | boolean | string | null | ObjectValue | Value[];

// // object
// export interface ObjectValue {
//   type: 'object';
//   fields: { [key: string]: any };
// }

function initializeMarkerOfVariableInEnv(
  env: Environment,
  variableName: string,
  value: Value,
  varExp: Expr
): Environment {
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "string" ||
    value === null
  ) {
    if(varExp.type == "field" && varExp.field=="length"){
      env[variableName] = [value, [value]];
    } else {
      // 如果是 number, boolean, string 或 null，直接初始化为 [value, []]
      env[variableName] = [value, []];
    }
  } else if (Array.isArray(value)) {
    // 如果是 Value[]，简单处理为 [value, []]
    env[variableName] = [value, []];
  } else if (typeof value === "object" && value !== null && "fields" in value) {
    // 如果是 ObjectValue，生成 [value, [{ field1: [], field2: [] }]]
    const fieldMarkers = { type: "object", fields: {} } as ObjectValue;
    for (const field in value.fields) {
      fieldMarkers.fields[field] = [];
    }
    env[variableName] = [value, [fieldMarkers]];
  }

  return env;
}

// 实现 deepCopy 函数
function deepCloneOp(operation: UpdateOperation): UpdateOperation {
  if (operation.type === "bulk") {
    // 深拷贝 operations 数组中的每个操作
    const copiedOperations = operation.operations.map(deepCloneOp);
    return { ...operation, operations: copiedOperations };
  }

  // 对于其他类型的操作，直接返回浅拷贝
  return { ...operation };
}
