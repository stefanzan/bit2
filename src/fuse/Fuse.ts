import { Value } from "../partial/AST";
import { TermNode } from "../lambda/AST";
//@ts-ignore
import { UpdateOperation } from "./Update";

// Environment 类型定义
export interface Environment {
  [variable: string]: [Value, Value[]];
}

// Apply update to a TermNode and return the updated TermNode and remaining operation
export function fuse(
  env: Environment,
  operation: UpdateOperation,
  term: TermNode
): 
  {
    newEnv: Environment;
    newTermNode: TermNode;
    remainingOperation: UpdateOperation;
  }[] {
  // Check if the term is a ConstNode
  if (term.type === "const" && typeof term.value === "string") {
    const s_c = term.value;

    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
        if (s_c.length === 0) {
          return [
            { newEnv: env, newTermNode: term, remainingOperation: operation },
            {
              newEnv: env,
              newTermNode: { ...term, value: str },
              remainingOperation: { type: "id" },
            }
          ];
        } else if (position === 0) {
          // 两种更新策略
          return [
            {
              newEnv: env,
              newTermNode: { ...term, value: str + s_c },
              remainingOperation: { type: "id" },
            },
            {
              newEnv: env,
              newTermNode: {type:'seq', nodes: [{type:'const', value:str}, term]},
              remainingOperation: { type: "id" },
            }
          ];
        } else if (position < s_c.length) {
          const newStr = s_c.slice(0, position) + str + s_c.slice(position);
          return [
            {
              newEnv: env,
              newTermNode: { ...term, value: newStr },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (position === s_c.length) {
          // 两种策略
          return [
            {newEnv:env, newTermNode:{...term, value:s_c+str},remainingOperation:{type:'id'}},
            { newEnv: env, newTermNode: term, remainingOperation: operation },
          ];
        } else {
          const newPos = position - s_c.length;
          return [
            {
              newEnv: env,
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
            let result = [{
                newEnv: env,
                newTermNode: { ...term, value: newStr },
                remainingOperation: { type: "id" },
              }];
            if(delStr.length === s_c.length){
              result.push({
                newEnv: env,
                //@ts-ignore
                newTermNode: {type:'bot'},
                remainingOperation: { type: "id" },
              })
            }
            //@ts-ignore
            return result;
          } else if (delStr.startsWith(s_c) && delStr.length > s_c.length) {
            const remainingStr = delStr.slice(s_c.length);
            return [
              {
                newEnv: env,
                newTermNode: { type: "bot" },
                remainingOperation: {
                  type: "delete",
                  str: remainingStr,
                  position: 0,
                },
              },
              {
                newEnv: env,
                newTermNode: { ...term, value:'' },
                remainingOperation: {
                  type: "delete",
                  str: remainingStr,
                  position: 0,
                },
              },
            ];
          }
        } else if (
          delPos < s_c.length &&
          delPos + delStr.length <= s_c.length
        ) {
          const newStr =
            s_c.slice(0, delPos) + s_c.slice(delPos + delStr.length);
          return [
            {
              newEnv: env,
              newTermNode: { ...term, value: newStr },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (delPos < s_c.length && delPos + delStr.length > s_c.length) {
          const remainingS_c = s_c.substring(0, delPos); // 保留s_c删除位置之前的部分
          const remainingDelStr = delStr.substring(s_c.length - delPos); // 剩余需要删除的字符串
          return [
            {
              newEnv: env,
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
              newEnv: env,
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
                newEnv: env,
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
                newEnv: env,
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
              newEnv: env,
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
              newEnv: env,
              newTermNode: newExpression,
              remainingOperation: newOperation,
            },
          ];
        } else {
          const newPos = repPos - s_c.length;
          return [
            {
              newEnv: env,
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
      // TODO bulk
      case "id":
        return [
          {
            newEnv: env,
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];

      default:
        const exhaustiveCheck: never = operation;
        throw new Error(`Unhandled operation type: ${exhaustiveCheck}`);
    }
  } else {
    throw new Error(
      "Operation can only be applied to ConstNode with string value"
    );
  }
}
