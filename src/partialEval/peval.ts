import * as CoreAST from "../core/AST";
import * as PartialAST from "../partial/AST";
import * as Expr from "../common/Exp";

// Function to partially evaluate a CoreAST.TermNode
export function partialEval(environment: Map<string, any>, termNode: CoreAST.TermNode): [Map<string, any>, PartialAST.TermNode] {
    switch (termNode.type) {
        case 'const':
            // For constants, return the same term node in PartialAST
            return [environment, { type: 'const', value: termNode.value }];

        case 'space':
            // For space nodes, return the same term node in PartialAST
            return [environment, { type: 'space', width: termNode.width }];

        case 'declare':
            // Partially evaluate the value expression
            const [updatedEnvDeclare, evaluatedValueDeclare] = evaluateExpr(environment, termNode.value);
            // Update environment with the evaluated value
            updatedEnvDeclare.set(termNode.name.name, evaluatedValueDeclare);
            // Return updated environment and PartialAST declare node
            return [updatedEnvDeclare, { type: 'declare', name: termNode.name, value: [termNode.value, evaluatedValueDeclare] }];
        case 'declareend':
            return [environment, termNode];
        case 'assign':
            // Partially evaluate the value expression
            const [updatedEnvAssign, evaluatedValueAssign] = evaluateExpr(environment, termNode.value);
            // Update environment with the evaluated value
            updatedEnvAssign.set(termNode.name.name, evaluatedValueAssign);
            // Return updated environment and PartialAST assign node
            return [updatedEnvAssign, { type: 'assign', name: termNode.name, value: [termNode.value, evaluatedValueAssign] }];

        case 'exp':
            // Partially evaluate the expression
            const [updatedEnvExp, evaluatedExp] = evaluateExpr(environment, termNode.expression);
            // Return updated environment and PartialAST exp node
            return [updatedEnvExp, { type: 'exp', binding: [termNode.expression, evaluatedExp] }];

        case 'seq':
            // Partially evaluate each node in sequence
            let updatedEnvSeq = environment;
            const evaluatedNodesSeq: PartialAST.TermNode[] = [];
            for (const node of termNode.nodes) {
                const [updatedEnvNode2, evaluatedNode] = partialEval(updatedEnvSeq, node);
                evaluatedNodesSeq.push(evaluatedNode);
                updatedEnvSeq = updatedEnvNode2;
            }
            // Return updated environment and PartialAST seq node
            return [updatedEnvSeq, { type: 'seq', nodes: evaluatedNodesSeq }];

        case 'ite':
            // Partially evaluate the condition expression
            const [updatedEnvIte, evaluatedCondition] = evaluateExpr(environment, termNode.condition);
            if (evaluatedCondition === true){
              const [updatedEnvTrue, evaluatedTrueBranch] = partialEval(updatedEnvIte, termNode.trueBranch);
              return [updatedEnvTrue, {
                type: 'seq',
                nodes: [
                    {
                      type:'branchstart',
                      condition: [termNode.condition, evaluatedCondition],
                      trueBranch: termNode.trueBranch,
                      falseBranch: termNode.falseBranch 
                    },
                    evaluatedTrueBranch,
                    {type:'branchend', condition: [termNode.condition, evaluatedCondition]}
                ]
              }]
            } else if (evaluatedCondition === false){
              const [updatedEnvFalse, evaluatedFalseBranch] = partialEval(updatedEnvIte, termNode.falseBranch);
              return [updatedEnvFalse, {
                type: 'seq',
                nodes: [
                    {
                      type:'branchstart',
                      condition: [termNode.condition, evaluatedCondition],
                      trueBranch: termNode.trueBranch,
                      falseBranch: termNode.falseBranch
                    },
                    evaluatedFalseBranch,
                    {type:'branchend', condition: [termNode.condition, evaluatedCondition]}
                ]
              }]
            } else {
              throw new Error(`Condition does not evaluate to boolean: ${evaluatedCondition}`);
            }


        case 'loop': 
          const { lst: list, separator, front, rear, body } = termNode;

          // Evaluate e_arr to get its value
          const [updatedEnv, e_arr_value] = evaluateExpr(environment, list);
      
          // Case 1: e_arr 是一个空数组
          if (Array.isArray(e_arr_value) && e_arr_value.length === 0) {
              return [updatedEnv, {
                  type: 'seq',
                  nodes: [
                      {
                          type: 'loopfront',
                          lst: list,
                          value: front.value,
                          body:body,
                          separator:separator
                      },
                      {
                          type: 'looprear',
                          lst: list,
                          value: rear.value
                      }
                  ]
              }];
          }
      
          // Case 2: e_arr 有一个元素
          else if (Array.isArray(e_arr_value) && e_arr_value.length === 1) {
              const element = e_arr_value[0];
              const variableName = body.variable.name; // Assuming lambda has a variable with a name
              const updatedEnvironment = new Map(environment);
              updatedEnvironment.set(variableName, element);
      
              const [updatedEnv2, evaluatedBody] = partialEval(updatedEnvironment, body.body); // Evaluate t1 to t1'
      
              return [updatedEnv2, {
                  type: 'seq',
                  nodes: [
                      {
                          type: 'loopfront',
                          lst: list,
                          value: front.value,
                          body:body,
                          separator:separator
                      },
                      {
                        type:'lambda',
                        variable: body.variable,
                        binding: [{ type: 'constant', value:element }, element],
                        marker: {
                          type: 'loopitem',
                          lst: list
                        },
                        body: evaluatedBody
                      } as PartialAST.LambdaAppNode,
                      {
                          type: 'looprear',
                          lst: list,
                          value: rear.value
                      }
                  ]
              }];
          }
      
          // Case 3: e_arr 有多个元素
          else if (Array.isArray(e_arr_value) && e_arr_value.length > 1) {
              let updatedEnv = new Map(environment);
              let currentNodes: PartialAST.TermNode[] = [];
      
              for (let i = 0; i < e_arr_value.length; i++) {
                  const element = e_arr_value[i];
                  const variableName = body.variable.name; // Assuming lambda has a variable with a name
                  updatedEnv.set(variableName, element);
      
                  const [updatedEnv2, evaluatedBody] = partialEval(updatedEnv, body.body); // Evaluate ti to ti'
                  updatedEnv = updatedEnv2;

                  currentNodes.push({
                      type: 'lambda',
                      variable: body.variable,
                      body: evaluatedBody,
                      binding: [{ type: 'constant', value:element }, element],
                      marker: {
                          type: 'loopitem',
                          lst: list
                      }
                  });
              }

              // translate currentNodes List to nested lambda form
              let nestedLambdaNode = currentNodes[currentNodes.length-1] as PartialAST.LambdaAppNode;
              for(let i = currentNodes.length-2; i >=0; i--){
                let previousNode = currentNodes[i] as PartialAST.LambdaAppNode;
                let accNestedLambdaNode = {
                  type:'lambda',
                  variable: previousNode.variable,
                  binding: previousNode.binding,
                  marker: previousNode.marker,
                  body: {type:'seq', nodes:[previousNode.body, termNode.separator, nestedLambdaNode]}
                } as PartialAST.LambdaAppNode;
                nestedLambdaNode = accNestedLambdaNode;
              }
      
              return [updatedEnv, {
                  type: 'seq',
                  nodes: [
                      {
                          type: 'loopfront',
                          lst: list,
                          value: front.value,
                          body:body,
                          separator:separator
                      },
                      nestedLambdaNode,
                      {
                          type: 'looprear',
                          lst: list,
                          value: rear.value
                      }
                  ]
              }];
          }
      
          throw new Error(`Unsupported type or value for e_arr: ${typeof e_arr_value}`);

        // case 'call':
        //     // Partially evaluate the function and arguments
        //     const [updatedEnvCall, evaluatedFunc] = partialEval(environment, termNode.func);
        //     const evaluatedArgs: { [key: string]: CoreAST.Expr } = {};
        //     for (const key in termNode.args) {
        //         if (termNode.args.hasOwnProperty(key)) {
        //             const [updatedEnvArg, evaluatedArg] = evaluateExpr(updatedEnvCall, termNode.args[key]);
        //             evaluatedArgs[key] = evaluatedArg;
        //             updatedEnvCall = updatedEnvArg;
        //         }
        //     }
        //     // Return updated environment and PartialAST call node
        //     return [updatedEnvCall, { type: 'call', func: evaluatedFunc, args: evaluatedArgs }];

        case 'nop':
            // For nop node, return the same term node in PartialAST
            return [environment, { type: 'nop' }];

        case 'bot':
            // For bot node, return the same term node in PartialAST
            return [environment, { type: 'bot' }];

        case 'end':
            // For end node, return the same term node in PartialAST
            return [environment, { type: 'end' }];

        default:
            throw new Error(`Unhandled term node type: ${termNode.type}`);
    }
}

// Function to evaluate expressions (Expr) and return updated environment and value
export function evaluateExpr(environment: Map<string, any>, expr: Expr.Expr): [Map<string, any>, any] {
    switch (expr.type) {
        case 'constant':
            // Return the unchanged environment and the constant value
            return [environment, expr.value];

        case 'variable':
            // Lookup the variable value in the environment
            const varValue = environment.get(expr.name);
            if (varValue === undefined) {
                throw new Error(`Variable '${expr.name}' not found in environment`);
            }
            // Return the unchanged environment and the variable value
            return [environment, varValue];

        case 'binary':
            // Evaluate left and right operands
            let [envLeft, left] = evaluateExpr(environment, expr.left);
            let [envRight, right] = evaluateExpr(envLeft, expr.right);

            // Perform binary operation based on the operator
            switch (expr.operator) {
                case '+':
                    return [envRight, left + right];
                case '-':
                    return [envRight, left - right];
                case '*':
                    return [envRight, left * right];
                case '/':
                    return [envRight, left / right];
                case '&&':
                    return [envRight, left && right];
                case '||':
                    return [envRight, left || right];
                case '>':
                    return [envRight, left > right];
                case '<':
                    return [envRight, left < right];
                case '>=':
                    return [envRight, left >= right];
                case '<=':
                    return [envRight, left <= right];
                case '==':
                    return [envRight, left == right];
                case "!=":
                  return [envRight, left != right]; 
                default:
                    throw new Error(`Unsupported binary operator`);
            }

        case 'unary':
            // Evaluate operand
            let [envOperand, operand] = evaluateExpr(environment, expr.operand);

            // Perform unary operation based on the operator
            switch (expr.operator) {
                case 'not':
                    return [envOperand, !operand];
                default:
                    throw new Error(`Unsupported unary operator`);
            }

        case 'field':
            // Evaluate the object
            let [envObject, objectValue] = evaluateExpr(environment, expr.object);

            // Access the field in the object
            if (typeof objectValue !== 'string' && (typeof objectValue !== 'object' || objectValue === null)) {
                throw new Error(`Cannot access field '${expr.field}' from non-object`);
            }

            let fieldValue = undefined;
            // handle "xxxx".length
            if(typeof objectValue === 'string'){
              fieldValue = objectValue[expr.field as keyof String];
            } else if(Array.isArray(objectValue)){
              if(expr.field==='length'){
                fieldValue = objectValue.length;
              }else {
                //TODO
              }
            } else {
              fieldValue = objectValue.fields[expr.field];
            }
            if (fieldValue === undefined) {
                throw new Error(`Field '${expr.field}' not found in object`);
            }
            // Return the unchanged environment and the field value
            return [envObject, fieldValue];

        case 'array':
            // Evaluate elements of the array
            let evaluatedElements: any[] = [];
            let currentEnv = environment;

            for (const element of expr.elements) {
                let [updatedEnv, evaluatedElement] = evaluateExpr(currentEnv, element);
                evaluatedElements.push(evaluatedElement);
                currentEnv = updatedEnv;
            }

            // Return the updated environment and the evaluated array
            return [currentEnv, evaluatedElements];

        case 'object':
            // Evaluate fields of the object
            let evaluatedFields: { [key: string]: any } = {type:'object', fields: {}} as PartialAST.ObjectValue;
            let objEnv = environment;

            for (const key in expr.fields) {
                if (expr.fields.hasOwnProperty(key)) {
                    let [updatedEnv, evaluatedValue] = evaluateExpr(objEnv, expr.fields[key]);
                    evaluatedFields.fields[key] = evaluatedValue;
                    objEnv = updatedEnv;
                }
            }

            // Return the updated environment and the evaluated object
            return [objEnv, evaluatedFields];

        case 'freeze':
            // Evaluate the expression and return it without modification
            return evaluateExpr(environment, expr.expression);

        default:
            throw new Error(`Unhandled expression type`);
    }
}

declare global {
  interface Array<T> {
    flatMap<U>(callback: (value: T, index: number, array: T[]) => U | readonly U[]): U[];
  }
}
// 定义 flatten 函数 for PartialAST
export function flatten(termNode: PartialAST.TermNode): PartialAST.TermNode {
  if (termNode.type === 'seq') {
      // 如果 termNode 是 seq 类型，则递归处理每个元素，并返回新的 seq 节点
      const flattenedElements = termNode.nodes.map(element => flatten(element));
      return { type: 'seq', nodes: flattenedElements.flatMap(seqNode => {
        if(seqNode.type === 'seq'){
          return seqNode.nodes;
        } else {
          return [seqNode]
        }
      }) };
    } else if (termNode.type === 'lambda'){
      return {...termNode, body:flatten(termNode.body)};
    } else {
      // 其他情况下，直接返回
      return termNode;
    }
}
