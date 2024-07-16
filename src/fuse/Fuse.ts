import { Value, SpaceNode, ConstNode, ExpNode, ObjectValue, LoopItemMarker } from "../partial/AST";
import { SeqNode, TermNode, LambdaAppNode } from "../lambda/AST";
//@ts-ignore
import { UpdateOperation } from "./Update";
import { isWhitespace } from "../utils/Utils";
import { Expr, FieldAccess, Variable, findVariablesAndFields, Constant } from "../common/Exp";
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
  if ((term.type === 'const' || term.type === 'sep' || term.type === 'loopfront' || term.type === 'looprear') 
      && typeof term.value === 'string'){

    // add a new arr to env
    if(term.type === "loopfront") {
      let exp = term.lst as Expr
      if ((exp as Variable).name) { // Ensure exp is a Variable and has a name property
        let expName = (exp as Variable).name;
        env[expName+"_new"] = [[], []]; // Set env[expName_new] to [[], []]
      } else {
        throw new Error("exp is not a Variable with a name property in loopfront");
      }
    } else if (term.type === "looprear") {
      let exp = term.lst as Expr
      if ((exp as Variable).name) {
        let expName = (exp as Variable).name;
        env[expName] = env[expName+"_new"] // assign back
      } else {
        throw new Error("exp is not a Variable with a name property in loopfront");
      }
    }

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
            },
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
              newTermNode: {
                type: "seq",
                nodes: [{ type: "const", value: str }, term],
              },
              remainingOperation: { type: "id" },
            },
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
            {
              newEnv: env,
              newTermNode: { ...term, value: s_c + str },
              remainingOperation: { type: "id" },
            },
            { newEnv: env, newTermNode: term, remainingOperation: {type:'insert', str, position: position-s_c.length} },
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
            let result = [
              {
                newEnv: env,
                newTermNode: { ...term, value: newStr },
                remainingOperation: { type: "id" },
              },
            ];
            if (delStr.length === s_c.length) {
              result.push({
                newEnv: env,
                //@ts-ignore
                newTermNode: { type: "bot" },
                remainingOperation: { type: "id" },
              });
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
                newTermNode: { ...term, value: "" },
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
        return fuseBulk(env, operation, term);
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
  } else if (term.type === "space") {
    switch (operation.type) {
      case "insert":
        const { str, position } = operation;
        // zero-width space 
        if(term.width == 0) {
          return [
            { newEnv: env, newTermNode: term, remainingOperation: operation },
            {
              newEnv: env,
              newTermNode: {type: "seq", nodes: [{ type: "const", value: str }, term] },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (position == 0) { // non-zero space
          let resultList: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation }[] = [
            {
              newEnv: env,
              newTermNode: {
                type: "seq",
                nodes: [{ type: "const", value: str } as ConstNode, term],
              } as SeqNode,
              remainingOperation: { type: "id" },
            },
          ]; 
          if(isWhitespace(str)){
            resultList.push({
              newEnv: env,
              newTermNode: {type:"space", width: term.width + str.length } as SpaceNode,
              remainingOperation: { type: "id" },
            })
          }
          return resultList;       
        } else if (position < term.width) {
          if(isWhitespace(str)){
            return [
              {
                newEnv: env,
                newTermNode: { ...term, width: str.length+term.width },
                remainingOperation: { type: "id" },
              },
            ];
          } else {
            throw new Error(`Cannot insert non-space between space term: ${operation}`);
          }
        } else if (position === term.width) {
          // 两种策略
          let resultList: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation }[] = [
            { newEnv: env, newTermNode: term, remainingOperation: operation },
          ];
          if(isWhitespace(str)){
            resultList.push({
              newEnv: env,
              newTermNode: { ...term, width:term.width+str.length },
              remainingOperation: { type: "id" },
            })
          }
          return resultList;
        } else {
          const newPos = position - term.width;
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
          if (isWhitespace(delStr) && delStr.length <= term.width) {
            // 如果delStr===s_c，还有一个策略, 即bot
            const newWidth = term.width - delStr.length;
            let result = [
              {
                newEnv: env,
                newTermNode: { ...term, width: newWidth },
                remainingOperation: { type: "id" },
              },
            ];
            if (delStr.length === term.width) {
              result.push({
                newEnv: env,
                //@ts-ignore
                newTermNode: { type: "bot" },
                remainingOperation: { type: "id" },
              });
            }
            //@ts-ignore
            return result;
          } else if (delStr.length > term.width) {
            const remainingStr = delStr.slice(term.width);
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
                newTermNode: { ...term, width: 0 },
                remainingOperation: {
                  type: "delete",
                  str: remainingStr,
                  position: 0,
                },
              },
            ];
          } 
        } else if (
          delPos < term.width &&
          delPos + delStr.length <= term.width
        ) {
          const newWidth =term.width - delStr.length;
          return [
            {
              newEnv: env,
              newTermNode: { ...term, width: newWidth },
              remainingOperation: { type: "id" },
            },
          ];
        } else if (delPos < term.width && delPos + delStr.length > term.width) {
          const remainingWidth = delPos;
          const remainingDelStr = delStr.substring(term.width - delPos); // 剩余需要删除的字符串
          return [
            {
              newEnv: env,
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
          if (str1.length <= term.width) {
            if(isWhitespace(str2)){
              const newWidth = term.width - str1.length + str2.length;
              return [
                {
                  newEnv: env,
                  newTermNode: {
                    ...term,
                    width: newWidth
                  },
                  remainingOperation: { type: "id" },
                },
              ];
            } else {
            return [
              {
                newEnv: env,
                newTermNode: {
                  type:'seq',
                  nodes:[
                    { type:'const', value: str2 },
                    { ...term, width: term.width-str1.length }
                  ]
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
                newEnv: env,
                newTermNode: { type:'const', value: remainingS_c }, // remove space(n), using const(s_c) instead
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
          if(isWhitespace(str2)){
            return [
              {
                newEnv: env,
                newTermNode: {...term, width: str2.length+term.width-str1.length },
                remainingOperation: { type: "id" },
              },
            ];
          } else {
              const newStr =' '.repeat(repPos) + str2 + ' '.repeat(term.width - (repPos+str1.length));
            return [
              {
                newEnv: env,
                newTermNode: {type:'const', value: newStr },
                remainingOperation: { type: "id" },
              },
            ];
          }
        } else if (repPos < term.width && repPos + str1.length > term.width) {
          const part1 = ' '.repeat(repPos); // 替换位置之前的部分
          const overlapPartLength = term.width-repPos; // 与替换的 str1 重叠的部分
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
              newEnv: env,
              newTermNode: newExpression,
              remainingOperation: newOperation,
            },
          ];
        } else {
          const newPos = repPos - term.width;
          return [
            {
              newEnv: env,
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
            newEnv: env,
            newTermNode: term,
            remainingOperation: { type: "id" },
          },
        ];
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }
  } else if (term.type === "exp") {
    const expTerm = term as ExpNode;
    const binding = term.binding;
    const exp = binding[0];
    const val = binding[1];
    const valStr = valToStr(val);

    switch(operation.type) {
      case "insert":
        const { str, position } = operation;
        if (position === 0) {
          let resultList: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation}[] = [] ;
          resultList.push({
            newEnv: env,
            newTermNode: {
              type:"seq",
              nodes:[{type:"const", value:str},term]
            },
            remainingOperation: {type:"id"}
          });
          // another choice:
          let newStr = str + valStr;
          try {
            let newVal = strToVal(newStr, val);
            let {newEnv, newExp} = fuseExp(env, newVal, exp);
            resultList.push({
              newEnv: newEnv,
              newTermNode: {
                ...term,
                binding:[newExp, newVal]
              },
              remainingOperation:{type:"id"}
            });
          } catch (error) {
            // console.error(error);
          }
          return resultList;
        } else if (position < valStr.length) {
          const newStr = valStr.slice(0, position) + str + valStr.slice(position);
          const newVal = strToVal(newStr, val);
          let {newEnv, newExp} = fuseExp(env, newVal, exp);
          return [
            {
              newEnv: newEnv,
              newTermNode:  {
                ...term,
                binding:[newExp, newVal]
              },
              remainingOperation: { type: 'id' },
            }
          ];
         } else if (position == valStr.length) {
            let resultList: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation}[] = [] ;
            const newStr = valStr + str;
            try {
              const newVal = strToVal(newStr, val);
              let {newEnv, newExp} = fuseExp(env, newVal, exp);
              resultList.push({
                  newEnv: newEnv,
                  newTermNode:  {
                    ...term,
                    binding:[newExp, newVal]
                  },
                  remainingOperation: { type: 'id' },
                });
            } catch (error) {
              console.error(error);
            }
            
            // If the expression is a variable, them add variable's bidning to env to mark it unmodifiable.
            if ((exp as Variable).name) { 
              let x = (exp as Variable).name;
              env[x] = [val, [val]]; // mark x as unmodifiable.
            }            

            resultList.push({
              newEnv:env,
              newTermNode:term,
              remainingOperation:{...operation, position:0}
            })
            return resultList;
         } else {
          const newPosition = position - valStr.length;
          // If the expression is a variable, them add variable's bidning to env to mark it unmodifiable.
          if ((exp as Variable).name) { 
            let x = (exp as Variable).name;
            env[x] = [val, [val]]; // mark x as unmodifiable.
          }  
          return [{
              newEnv:env,
              newTermNode:term,
              remainingOperation:{...operation, position:newPosition}
            }];
        }
      case "delete":
        const { str: delStr, position: delPos } = operation;
        if (delPos === 0) { 
          if(delStr.length < valStr.length){
            const newValStr = valStr.slice(delStr.length);
            const newVal = strToVal(newValStr, val);
            let {newEnv, newExp} = fuseExp(env, newVal, exp);
            return [{ newEnv: newEnv, newTermNode: {...term, binding:[newExp, newVal]}, remainingOperation: {type:'id'} }];
          } else if (delStr.length == valStr.length) {
            if ((exp as Variable).name) { 
              let x = (exp as Variable).name;
              if(typeof val == 'string'){
                // two choice: update exp to "", or delete exp
                let {newEnv, newExp} = fuseExp(env, "", exp);
                return [
                  { newEnv: newEnv, newTermNode: {...term, binding:[newExp, ""]}, remainingOperation: {type:'id'} },
                  { newEnv: deleteFromEnv(env, x), newTermNode: {type:'bot'}, remainingOperation: {type:'id'} },
                ];
              } else { // delete exp, delete from env
                return [{ newEnv: deleteFromEnv(env, x), newTermNode: {type:'bot'}, remainingOperation: {type:'id'} }];
              }
            }  else if ((exp as FieldAccess)) {
              let x = ((exp as FieldAccess).object as Variable).name;
              let field = (exp as FieldAccess).field;
              let xVal = env[x][0] as ObjectValue;
              let xValUpdatedMark = env[x][1][0] as ObjectValue;
              if(xValUpdatedMark.fields[field].length==0){
                let newXVal = deleteField(xVal, field);
                let newXValUpdatedMark = deleteField(xValUpdatedMark, field);
                let newEnv = deleteFromEnv(env, x);
                newEnv[x] = [newXVal, [newXValUpdatedMark]];
                return [{newEnv: newEnv, newTermNode:{type:'bot'},remainingOperation: {type:'id'}}];
              } else {
                throw new Error(`field has been updaeted, cannot be remvoed: ${field}$`);
              }
            }
          } else if (delStr.length > valStr.length) {
            let delStr1 = delStr.slice(0,valStr.length);
            let delStr2 = delStr.slice(valStr.length);
            let op1 = {type:'delete', str:delStr1, position:0} as UpdateOperation;
            let resultList = fuse(env, op1, term);
            let op2 = {type:'delete', str:delStr2, position:0} as UpdateOperation;
            resultList.forEach(result => {result.remainingOperation = op2;});
            return resultList;
          }
       } else if (delPos + delStr.length <= valStr.length) {
          const newStr = valStr.slice(0, delPos) + valStr.slice(delPos + delStr.length);
          const newVal = strToVal(newStr, val);
          let {newEnv, newExp} = fuseExp(env, newVal, exp);
          return [{ newEnv: newEnv, newTermNode: {...term, binding:[newExp, newVal]}, remainingOperation: {type:'id'} }];
        } else if (delPos <=valStr.length && delPos + delStr.length > valStr.length) {
          const newStr = valStr.slice(0, delPos);
          const remainingDelStr = delStr.slice(valStr.length-delPos);
          const newVal = strToVal(newStr, val);
          let {newEnv, newExp} = fuseExp(env, newVal, exp);
          return [
            {
              newEnv: newEnv,
              newTermNode: {...term, binding:[newExp, newVal]},
              remainingOperation: { type: 'delete', str:remainingDelStr, position: 0 },
            },
          ];
        } else if(delPos > valStr.length) {
          const newDelPos = delPos - valStr.length;
          let [{newEnv, newTermNode, remainingOperation}] = fuse(env, {type:'id'}, term);
          return [{
            newEnv: newEnv,
            newTermNode: newTermNode,
            remainingOperation: {type:'delete', str: delStr, position: newDelPos}
          }];
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
          if (valStr.startsWith(str1)){
            const newValStr = str2 + valStr.slice(str1.length);
            const newVal = strToVal(newValStr, val);
            let {newEnv, newExp} = fuseExp(env, newVal, exp);
            return [{ newEnv: newEnv, newTermNode: {...term, binding:[newExp, newVal]}, remainingOperation: {type:'id'} }];
          } else {
            throw new Error(`unsupported replacement: ${str1}; ${valStr}`);
          }
        } else if (repPos > valStr.length) {
          const newRepPos = repPos - valStr.length;
          let [{newEnv, newTermNode, remainingOperation}] = fuse(env, {type:'id'}, term); 
          return [
            {
              newEnv: newEnv,
              newTermNode: newTermNode,
              remainingOperation: { ...operation, position:newRepPos}
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

        variables.forEach(variable => {
          env = markVariableInEnv(variable, env);
        });
      
        fields.forEach(({ variable, field }) => {
          env = markFieldOfObjectInEnv(field, variable, env);
        });
      
        return [{newEnv:env, newTermNode:term, remainingOperation:{type:'id'}}];
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }
  } else if (term.type === "lambda") {
    let marker = term.marker;
    if (marker.type === "loopitem") {
      let varName = term.variable.name;
      let varExp = term.binding[0];
      let varVal = term.binding[1];
      let env1 = {...env};
      env1[varName]=[varVal,[]];

      let newArrVarName = "";
      if (marker.lst as Variable) { 
        let expName = (marker.lst as Variable).name;
        newArrVarName = expName + "_new";
      } else {
        throw new Error("exp is not a Variable with a name property in loopitem's marker");
      }

      let resultList = fuse(env1, operation, term.body);
      return resultList.map(({newEnv, newTermNode, remainingOperation})=>{
        let newVarVal = newEnv[varName][0];
        let newArrVal = env[newArrVarName][0] as Value[]; // must be an array
        newArrVal.push(newVarVal);
        env[newArrVarName] = [newArrVal, [newArrVal]];
        let {newEnv: updatedEnv, newExp} = fuseExp(env, newVarVal, varExp); 
        return {
          newEnv: updatedEnv,
          newTermNode:{
            type: 'lambda',
            variable: term.variable,
            body: newTermNode,
            binding: [newExp, newVarVal],
            marker: term.marker
          },
          remainingOperation:remainingOperation
        }
      })
    } else {
      let varName = term.variable.name;
      let varExp = term.binding[0];
      let varVal = term.binding[1];

      let env1 = {...env};
      env1[varName]=[varVal,[]];

      let resultList = fuse(env1, operation, term.body);
      return resultList.map(({newEnv, newTermNode, remainingOperation})=>{
        let newVarVal = newEnv[varName][0];
        let updatedOldEnv = updateEnvByEnv(env, newEnv);
        let {newEnv: updatedEnv, newExp} = fuseExp(updatedOldEnv, newVarVal, varExp); 
        return {
          newEnv: updatedEnv,
          newTermNode:{
            type: 'lambda',
            variable: term.variable,
            body: newTermNode,
            binding: [newExp, newVarVal],
            marker: term.marker
          },
          remainingOperation:remainingOperation
        }
      }) 
    }
  } else if (term.type === "branchstart" || term.type === "branchend" || term.type==="nop") {
    let resultList: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation}[] = [] ;
    resultList.push({newEnv: env, newTermNode: term, remainingOperation: operation});
    switch(operation.type) {
      case "insert":
        const { str, position } = operation;
        if (position === 0){
          resultList.push({
            newEnv:env,
            newTermNode:{
              type:'seq',
              nodes:[{type:'const', value:str},term]
            },
            remainingOperation:{type:'id'}
          })
        }
      case "delete":
      case "replace":
        return resultList;
      case "bulk":
        return fuseBulk(env, operation, term);
      default:
        throw new Error(`Unhandled operation type: ${operation}`);
    }

  } else if (term.type === "seq") {
    if(operation.type==="bulk"){
      return fuseBulk(env, operation, term);
    }

    const terms = term.nodes;
    let results: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation }[] = [
        { newEnv: env, newTermNode: { type: 'seq', nodes: [] }, remainingOperation: operation }
    ];

    for (const subTerm of terms) {
        const newResults: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation }[] = [];
        
        for (const result of results) {
            const subResults = fuse(result.newEnv, result.remainingOperation, subTerm);

            for (const subResult of subResults) {
                const updatedNodes = (result.newTermNode.type === 'seq' ? result.newTermNode.nodes : [result.newTermNode])
                    .concat(subResult.newTermNode.type === 'seq' ? subResult.newTermNode.nodes : [subResult.newTermNode]);
                newResults.push({
                    newEnv: subResult.newEnv,
                    newTermNode: {
                        type: 'seq',
                        nodes: updatedNodes
                    },
                    remainingOperation: subResult.remainingOperation
                });
            }
        }

        results = newResults;
    }

    return results.map(result => ({
        newEnv: result.newEnv,
        newTermNode: result.newTermNode.type === 'seq' && result.newTermNode.nodes.length === 1
            ? result.newTermNode.nodes[0]
            : result.newTermNode,
        remainingOperation: result.remainingOperation
    }));
} else {
    throw new Error(
      "Operation can only be applied to ConstNode with string value"
    );
  }
}

export function fuseExp(env: Environment, value: Value, exp: Expr): { newEnv: Environment; newExp: Expr } {
  switch (exp.type) {
    case 'constant':
      return { newEnv: env, newExp: valueToConstantExpr(value) };
    case 'variable':
      if (!(exp.name in env)) {
        throw new Error(`Variable ${exp.name} not found in environment.`);
      }
      const [varValue, marks] = env[exp.name];
      if (marks.length === 0) {
        const newEnv = {...env};
        newEnv[exp.name] = [value, [value]];
        return { newEnv, newExp: exp };
      } else if (marks.length === 1 && marks[0] === value) {
        return { newEnv: env, newExp: exp };
      } else {
        throw new Error(`Fail, variable cannot be updated to different value ${exp.name}, previous: ${marks[0]}, new: ${varValue}`);
      }
    case 'freeze':
      let [_, evaluated] = evaluateExpr(transformEnvironment(env), exp.expression);
      if (evaluated !== value) {
        throw new Error(`Fail, freezed expression cannot be changed, old: ${value}, new: ${evaluated}`);
      } else {
        return { newEnv: env, newExp: exp };
      }
    
    case 'field':
      // Rule for field access
      const objExp = exp.object;
      if (objExp.type === 'variable' && objExp.name in env) {
        const [objValue, objMarks] = env[objExp.name];
        if ((objValue as ObjectValue).type === 'object') {
          const newFields = { ...(objValue as ObjectValue).fields, [exp.field]: value };
          const newObjValue = { type: 'object', fields: newFields } as ObjectValue;
          const newMarks = updateFieldMarkWithValue(objMarks[0] as ObjectValue, exp.field, value);
          const newEnv: Environment = { ...env};
          newEnv[objExp.name]=[newObjValue, [newMarks]];
          return { newEnv, newExp: exp };
        } else {
          throw new Error("Field access's value is not an object");
        }
      } else {
        throw new Error(`Field access not start with variable.`);
      }
      
    case 'binary':
      let transformedEnv = transformEnvironment(env);
      let [envLeft, left] = evaluateExpr(transformedEnv, exp.left);
      // let [envRight, right] = evaluateExpr(transformedEnv, exp.right);
      if(value as number){
        if (typeof value !== 'number' || value === null) {
          throw new Error('Value must be a non-null number');
        }
        switch (exp.operator) {
          case '+':
            console.log(value-left);
            console.log(exp.right);
            console.log(env);
            let subResultForPlus = fuseExp(env, value - left, exp.right);
            return { newEnv: subResultForPlus.newEnv, newExp: { ...exp, right: subResultForPlus.newExp } };
          case '-':
            let subResultForMinus = fuseExp(env, left-value, exp.right);
            return { newEnv: subResultForMinus.newEnv, newExp: { ...exp, right: subResultForMinus.newExp } };
          case '*':
            let subResultForTimes = fuseExp(env, value / left, exp.right);
            return { newEnv: subResultForTimes.newEnv, newExp: { ...exp, right: subResultForTimes.newExp } };
          case '/':
            let subResultForDivide = fuseExp(env, left/value,  exp.right);
            return { newEnv: subResultForDivide.newEnv, newExp: { ...exp, right: subResultForDivide.newExp } };
        }
      } else if (value as boolean) {
        // TODO
      }

    case 'unary':
      // Add logic for unary operations here
      return { newEnv: env, newExp: exp };
    default:
      throw new Error(`Unsupported expression type: ${exp.type}`);
  }
}

function strToVal(s: string, v:Value): Value {
  if (typeof v === 'number') {
      const parsedNumber = parseFloat(s);
      if(isNaN(parsedNumber)){
        throw new Error("convert to number fail: ${s}");
      } else {
        return parsedNumber;
      }
  } else if (typeof v === 'boolean') {
    if(s==='true'){
      return true;
    } else if (s==='false'){
      return false;
    } else {
      throw new Error("convert to boolean fail: ${s}");
    }
  } else if (typeof v === 'string') {
      return s; // v is already string, return s as is
  } else {
      throw new Error(`Unsupported type: ${typeof v}`);
  }
}

function valToStr(value: Value): string {
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
      return String(value); // Convert number, boolean, and string to string
  } else {
      return 'Unknown'; // Handle unexpected types
  }
}


function deleteFromEnv(env: Environment, key: string): Environment {
  const newEnv = { ...env }; // Create a shallow copy of env
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
    type: 'object',
    fields: newFields
  };
}

function updateFieldMark(obj: ObjectValue, field: string, objVal:ObjectValue): ObjectValue {
  // Destructure the fields, omitting the specified field
  const { [field]: _, ...newFields } = obj.fields;
  newFields[field] = objVal.fields[field];
  // Return a new ObjectValue with the updated fields
  return {
    type: 'object',
    fields: newFields
  };
}

function updateFieldMarkWithValue(obj: ObjectValue, field: string, value: Value): ObjectValue {
  // Destructure the fields, omitting the specified field
  const { [field]: val, ...newFields } = obj.fields;
  newFields[field] = [value];
  // Return a new ObjectValue with the updated fields
  return {
    type: 'object',
    fields: newFields
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

function markFieldOfObjectInEnv(field: string, variable:Variable, env:Environment): Environment {
 let x = variable.name;
  if (!(x in env)) {
    throw new Error(`Variable ${x} not found in environment.`);
 }
 let xVal = env[x][0] as ObjectValue;
 let xValMark = env[x][1][0] as ObjectValue;
 console.log("---------------------------")
 console.log(xVal);
 console.log(xValMark);
 let newXValUpdatedMark = updateFieldMark(xValMark, field, xVal);
 let newEnv = deleteFromEnv(env, x);
 newEnv[x] = [xVal, [newXValUpdatedMark]];
 return newEnv;
}

function updateEnvByEnv(env: Environment, env2: Environment): Environment {
  // Create a copy of env to avoid mutating the original env
  let updatedEnv = { ...env };

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
  if (value === null || typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return { type: 'constant', value: value };
  } else if (Array.isArray(value)) {
    return {
      type: 'constant',
      value: value.map(v => valueToConstantExpr(v)) as unknown as []
    };
  } else if ((value as ObjectValue).type === 'object') {
    const objectValue = value as ObjectValue;
    const fields: { [key: string]: Constant } = {};
    for (const key in objectValue.fields) {
      if (objectValue.fields.hasOwnProperty(key)) {
        fields[key] = valueToConstantExpr(objectValue.fields[key]) as Constant;
      }
    }
    return {
      type: 'constant',
      value: { type: 'object', fields: fields }
    };
  } else {
    throw new Error(`Unhandled value type: ${typeof value}`);
  }
}


export function printEnvironment(env: Environment): void {
  console.log('{\n');
  for (const variable in env) {
    if (env.hasOwnProperty(variable)) {
      const [currentValue, marks] = env[variable];
      console.log(`${variable}: {`);
      console.log(' val: ');
      printValue(currentValue, " ");
      console.log(',marks: [');
      marks.forEach((v, index) => {
        printValue(v, " ");
        if (index < marks.length - 1) {
          console.log(', ');
        }
      });
      console.log(']\n },\n');
    }
  }
  console.log('}');
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
  if (bulkOp.type !== 'bulk' || !bulkOp.operations) {
    throw new Error('Invalid bulk operation');
  }

  // ending of recursive call
  if(bulkOp.operations.length==0 ){
    return [{newEnv:env, newTermNode:term, remainingOperation:{type:'id'}}];
  } else if (term.type==="seq" && term.nodes.length==0) {
    return [{newEnv:env, newTermNode:term, remainingOperation:bulkOp}];
  }

  const [op1, ...restOps] = bulkOp.operations;
  if(term.type==='seq'){
    const firstTerm = term.nodes[0];
    const remainingTerms = term.nodes.slice(1);
    const fuseResultsOfFirstTerm = fuseBulk(env, bulkOp, firstTerm);
    const results: { newEnv: Environment; newTermNode: TermNode; remainingOperation: UpdateOperation }[] = [];

    for (const result of fuseResultsOfFirstTerm) {
        const subResults = fuseBulk(result.newEnv, result.remainingOperation, { type: 'seq', nodes: remainingTerms });

        for (const subResult of subResults) {
          let remainingNodesTerm = [];
          if(subResult.newTermNode.type!='seq'){
            remainingNodesTerm.push(subResult.newTermNode);
          } else {
            remainingNodesTerm = subResult.newTermNode.nodes;
          }
          results.push({
            newEnv: subResult.newEnv,
            newTermNode: { type: 'seq', nodes: [result.newTermNode, ...remainingNodesTerm] },
            remainingOperation: subResult.remainingOperation,
          });
        } 
    }
  
    return results;

  } else {
    
    if (op1.type==="insert" || op1.type==="delete" || op1.type==="replace"){
      const n1 = op1.position;
      const op1Results = fuse(env, op1, term);
      let listOfList = op1Results.map(op1Result => {
        let op1Prime = op1Result.remainingOperation;
        if(op1Prime.type ==="id" || op1Prime.type==="insert" || op1Prime.type==="delete" || op1Prime.type==="replace") {
          let termStr = evaluateTermNode(op1Result.newTermNode);
          let deltaN = termStr.length;
  
          // Adjust positions for the remaining operations
          const adjustedRestOps = restOps.map(op => {
            if(op.type==="id"){
              return op;
            } else if (!('position' in op)) {
              throw new Error('All operations must have positions');
            } else {
              return { ...op, position: op.position - deltaN };
            }
          });
          // Combine the remaining operations
          const remainingBulkOp: UpdateOperation = {
            type: 'bulk',
            operations: [op1Result.remainingOperation, ...adjustedRestOps]
          };
          
          return [{
            newEnv: op1Result.newEnv,
            newTermNode: op1Result.newTermNode,
            remainingOperation: remainingBulkOp
          }] as {newEnv:Environment, newTermNode: TermNode, remainingOperation: UpdateOperation}[];
        } else {
          throw new Error("nested bulk current not supported");
        }
      })
      return listOfList.reduce((acc, val) => acc.concat(val),[]);
    } else if (op1.type === "id"){
      // case 3
      // Create a new bulk operation with the remaining operations
      const newBulkOp: UpdateOperation = {
        type: 'bulk',
        operations: restOps,
      };
      return fuseBulk(env, newBulkOp, term);
    }
  }

  return [];
}

function getOpStr(op1: UpdateOperation): string | undefined {
  if (op1.type === 'insert' || op1.type === 'delete') {
    return op1.str;
  } else if (op1.type === 'replace') {
    return op1.str1;
  } else {
    return undefined;
  }
}