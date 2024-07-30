import * as CoreAST from "../core/AST";
import * as Exp from "../common/Exp";
import * as PartialAST from "../partial/AST";
import { ObjectValue, Value } from "../partial/AST";

// Helper function to extract the expression from the binding
function getExpr(binding: PartialAST.Binding): Exp.Expr {
  return binding[0];
}

export function unPartialEval(node: PartialAST.TermNode): CoreAST.TermNode {
  switch (node.type) {
    case 'const':
      return CoreAST.constNode(node.value);
    case 'space':
      return CoreAST.space(node.width);
    case 'declare':
      return CoreAST.declare(node.name, getExpr(node.value));
    case 'assign':
      return CoreAST.assign(node.name, getExpr(node.value));
    case 'exp':
      return CoreAST.exp(getExpr(node.binding));
    case 'nop':
      return CoreAST.nop();
    case 'end':
      return CoreAST.end();
    case 'bot':
      return CoreAST.bot();
    case 'seq':
        return unSeq(node);
    case 'lambda':
        return unPartialEvalLambdaApp(node);
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
}

// 2 branchstart()...
// 4 loopstart()
function unSeq(node: PartialAST.SeqNode): CoreAST.TermNode {
  const nodes = node.nodes;
  const newNodes: CoreAST.TermNode[] = [];
  for (let i = 0; i < nodes.length; i++) {
    const current = nodes[i];
    if (current.type === 'branchstart') {
      const condition = current.condition[0];
      const conditionValue = current.condition[1];
      const trueBranch = current.trueBranch;
      const falseBranch = current.falseBranch;
      let nestedLevel = 1;
      const branchSeq = [];
      for (let j = i + 1; j < nodes.length; j++) {
        const next = nodes[j];
        if(next.type === 'branchstart'){
          nestedLevel++;
        } if (next.type === 'branchend') {
          if(nestedLevel==1){
            break;
          } else {
            nestedLevel--;
            branchSeq.push(nodes[j]);
          }
        } else {
          branchSeq.push(nodes[j]);
        }
      }
      if(conditionValue){
        newNodes.push(CoreAST.ite(condition,unSeq({type:'seq', nodes:branchSeq}), falseBranch))
      } else {
        newNodes.push(CoreAST.ite(condition,trueBranch,unSeq({type:'seq', nodes:branchSeq})))
      }
      i += branchSeq.length+1;
    } else if (current.type === 'loopfront') {
      let loopfrontNode = current;
      let looprearNode = {type:'looprear', value:''};
      const updatedLoopSeq = [];
      for (let j = i + 1; j < nodes.length; j++) {
        const next = nodes[j];
        if (next.type === 'looprear') {
          looprearNode = next;
          break;
        } else {
          updatedLoopSeq.push(unPartialEval(nodes[j]));
        }
      }

      // case 1: all deleted, including front/rear
      if(loopfrontNode.value==="" && looprearNode.value==="" && (updatedLoopSeq.length==0 || isAllBot(updatedLoopSeq))){
        newNodes.push(CoreAST.bot());
      } else if (updatedLoopSeq.length==0 || isAllBot(updatedLoopSeq)){
        // case 2: emtpy list
        newNodes.push(CoreAST.loop(loopfrontNode.lst, loopfrontNode.separator, {type:'front', value:current.value}, {type:'rear', value:looprearNode.value},loopfrontNode.body));
      } else if (updatedLoopSeq.length==1){
        // case 3: one in list
        let body = updatedLoopSeq[0];
        if(body.type==="lambdawithexpr"){
          newNodes.push(CoreAST.loop(loopfrontNode.lst, loopfrontNode.separator, {type:'front', value:current.value}, {type:'rear', value:looprearNode.value},constructLambda(body)));
        } else {
          throw new Error("Must be lambda in loopitem");
        }
      } else {
        // case 4 and case 5
        let filteredUpdatedLoopSeq = filterBotNodesFromTermNodes(updatedLoopSeq);
        if(areAllLambdaWithExprsEqual(filteredUpdatedLoopSeq)){
          newNodes.push(CoreAST.loop(loopfrontNode.lst, loopfrontNode.separator, {type:'front', value:current.value}, {type:'rear', value:looprearNode.value},constructLambda(filteredUpdatedLoopSeq[0])));
        } else {
          throw new Error("\ x.t in loop seq, ts are not equal");
        }
      }
     i += updatedLoopSeq.length+1;
    } else {
      newNodes.push(unPartialEval(current));
    }
  }
  return CoreAST.seq(...newNodes);
}

function unPartialEvalLambdaApp(node: PartialAST.LambdaAppNode):CoreAST.TermNode {
  let {variable, body, binding, marker} = node;
  let newBody = unPartialEval(body);
  return {
    type:'lambdawithexpr',
    variable:variable,
    body:newBody,
    exp: convertToArrayLiteral(binding[1])
  }
}

// Function to check if a given node is a BotNode
function isBotNode(node: CoreAST.TermNode): boolean {
  return node.type === 'bot';
}

// Function to check whether all elements in a list are BotNode
function isAllBot(nodes: CoreAST.TermNode[]): boolean {
  return nodes.every(isBotNode);
}

// Function to convert a single Value to an Expr
function valueToExpr(value: Value): Exp.Expr {
  if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string' || value === null) {
    return { type: 'constant', value };
  } else if (Array.isArray(value)) {
    return { type: 'array', elements: value.map(valueToExpr) };
  } else if ((value as ObjectValue).type === 'object') {
    const fields: { [key: string]: Exp.Constant } = {};
    for (const key in (value as ObjectValue).fields) {
      if ((value as ObjectValue).fields.hasOwnProperty(key)) {
        const fieldValue = (value as ObjectValue).fields[key];
        fields[key] = { type: 'constant', value: fieldValue };
      }
    }
    return { type: 'object', fields };
  } else {
    throw new Error("Unsupported Value type");
  }
}

// Function to convert a single Value to an ArrayLiteral
function singleValueToArrayLiteral(value: Value): Exp.ArrayLiteral {
  const element = valueToExpr(value);
  return { type: 'array', elements: [element] };
}

// Function to convert a list of Values to an ArrayLiteral
function valuesToArrayLiteral(values: Value[]): Exp.ArrayLiteral {
  const elements = values.map(valueToExpr);
  return { type: 'array', elements };
}
// Function to convert a Value or Value[] to an ArrayLiteral
function convertToArrayLiteral(valueOrValues: Value | Value[]): Exp.ArrayLiteral {
  if (Array.isArray(valueOrValues)) {
    return valuesToArrayLiteral(valueOrValues);
  } else {
    return singleValueToArrayLiteral(valueOrValues);
  }
}

// Function to construct a Lambda from a LambdaWithExpr
function constructLambda(lambdaWithExpr: CoreAST.LambdaWithExpr): CoreAST.Lambda {
  return {
    type: 'lambda',
    variable: lambdaWithExpr.variable,
    body: lambdaWithExpr.body
  };
}



// Type guard to check if a TermNode is a LambdaWithExpr
function isLambdaWithExpr(node: CoreAST.TermNode): node is CoreAST.LambdaWithExpr {
  return node.type === 'lambdawithexpr';
}

// Function to filter TermNodes which are LambdaWithExpr and do not have a BotNode as body
function filterBotNodesFromTermNodes(nodes: CoreAST.TermNode[]): CoreAST.LambdaWithExpr[] {
  return nodes.filter(isLambdaWithExpr).filter(lambda => !isBotNode(lambda.body));
}

// Function to check if two Variables are equal
function areVariablesEqual(var1: Exp.Variable, var2: Exp.Variable): boolean {
  return var1.name === var2.name;
}

// Function to check if two Expr objects are equal
function areExprEqual(expr1: Exp.Expr, expr2: Exp.Expr): boolean {
  if (expr1.type !== expr2.type) {
    return false;
  }

  switch (expr1.type) {
    case 'constant':
      const constant1 = expr1 as Exp.Constant;
      const constant2 = expr2 as Exp.Constant;
      if (typeof constant1.value === 'object' && typeof constant2.value === 'object') {
        return areExprEqual(constant1.value as Exp.Expr, constant2.value as Exp.Expr);
      }
      return constant1.value === constant2.value;

    case 'variable':
      return (expr1 as Exp.Variable).name === (expr2 as Exp.Variable).name;

    case 'binary':
      const binary1 = expr1 as Exp.BinaryOperation;
      const binary2 = expr2 as Exp.BinaryOperation;
      return binary1.operator === binary2.operator &&
             areExprEqual(binary1.left, binary2.left) &&
             areExprEqual(binary1.right, binary2.right);

    case 'unary':
      const unary1 = expr1 as Exp.UnaryOperation;
      const unary2 = expr2 as Exp.UnaryOperation;
      return unary1.operator === unary2.operator &&
             areExprEqual(unary1.operand, unary2.operand);

    case 'field':
      const field1 = expr1 as Exp.FieldAccess;
      const field2 = expr2 as Exp.FieldAccess;
      return field1.field === field2.field &&
             areExprEqual(field1.object, field2.object);

    case 'array':
      const array1 = expr1 as Exp.ArrayLiteral;
      const array2 = expr2 as Exp.ArrayLiteral;
      if (array1.elements.length !== array2.elements.length) {
        return false;
      }
      return array1.elements.every((element, index) => areExprEqual(element, array2.elements[index]));

    case 'object':
      const object1 = expr1 as Exp.ObjectLiteral;
      const object2 = expr2 as Exp.ObjectLiteral;
      const fields1 = Object.keys(object1.fields);
      const fields2 = Object.keys(object2.fields);
      if (fields1.length !== fields2.length) {
        return false;
      }
      return fields1.every(field => object2.fields.hasOwnProperty(field) && areExprEqual(object1.fields[field], object2.fields[field]));

    case 'freeze':
      return areExprEqual((expr1 as Exp.FreezeExp).expression, (expr2 as Exp.FreezeExp).expression);

    default:
      return false;
  }
}

// Recursive function to check if two TermNodes are equal
function areTermNodesEqual(node1: CoreAST.TermNode, node2: CoreAST.TermNode): boolean {
  if (node1.type !== node2.type) {
    return false;
  }

  switch (node1.type) {
    case 'const':
      return (node1 as CoreAST.ConstNode).value === (node2 as CoreAST.ConstNode).value;
    case 'space':
      return (node1 as CoreAST.SpaceNode).width === (node2 as CoreAST.SpaceNode).width;
    case 'declare':
      const declare1 = node1 as CoreAST.DeclareNode;
      const declare2 = node2 as CoreAST.DeclareNode;
      return areVariablesEqual(declare1.name, declare2.name) && areExprEqual(declare1.value, declare2.value);
    case 'assign':
      const assign1 = node1 as CoreAST.AssignNode;
      const assign2 = node2 as CoreAST.AssignNode;
      return areVariablesEqual(assign1.name, assign2.name) && areExprEqual(assign1.value, assign2.value);
    case 'exp':
      return areExprEqual((node1 as CoreAST.ExpNode).expression, (node2 as CoreAST.ExpNode).expression);
    case 'seq':
      const seq1 = (node1 as CoreAST.SeqNode).nodes;
      const seq2 = (node2 as CoreAST.SeqNode).nodes;
      if (seq1.length !== seq2.length) {
        return false;
      }
      return seq1.every((subNode, index) => areTermNodesEqual(subNode, seq2[index]));
    case 'ite':
      const ite1 = node1 as CoreAST.IfThenElseNode;
      const ite2 = node2 as CoreAST.IfThenElseNode;
      return areExprEqual(ite1.condition, ite2.condition) &&
             areTermNodesEqual(ite1.trueBranch, ite2.trueBranch) &&
             areTermNodesEqual(ite1.falseBranch, ite2.falseBranch);
    case 'loop':
      const loop1 = node1 as CoreAST.LoopNode;
      const loop2 = node2 as CoreAST.LoopNode;
      return areExprEqual(loop1.lst, loop2.lst) &&
             loop1.separator.value === loop2.separator.value &&
             loop1.front.value === loop2.front.value &&
             loop1.rear.value === loop2.rear.value &&
             areLambdasEqual(loop1.body, loop2.body);
    case 'nop':
      return true;
    case 'bot':
      return true;
    case 'end':
      return true;
    case 'call':
      const call1 = node1 as CoreAST.CallNode;
      const call2 = node2 as CoreAST.CallNode;
      return areTermNodesEqual(call1.func, call2.func) &&
             Object.keys(call1.args).length === Object.keys(call2.args).length &&
             Object.keys(call1.args).every(key => areExprEqual(call1.args[key], call2.args[key]));
    case 'lambdawithexpr':
      const lambda1 = node1 as CoreAST.LambdaWithExpr;
      const lambda2 = node2 as CoreAST.LambdaWithExpr;
      return areVariablesEqual(lambda1.variable, lambda2.variable) &&
             areTermNodesEqual(lambda1.body, lambda2.body);
    default:
      return false;
  }
}

// Function to check if two LambdaWithExpr are equal
function areLambdasEqual(lambda1: CoreAST.Lambda, lambda2: CoreAST.Lambda): boolean {
  return areVariablesEqual(lambda1.variable, lambda2.variable) && 
         areTermNodesEqual(lambda1.body, lambda2.body) ;
}

// Function to check if two LambdaWithExpr are equal
function areLambdaWithExprsEqual(lambda1: CoreAST.LambdaWithExpr, lambda2: CoreAST.LambdaWithExpr): boolean {
  return areVariablesEqual(lambda1.variable, lambda2.variable) && 
         areTermNodesEqual(lambda1.body, lambda2.body) ;
}

// Function to check if all elements in a list of LambdaWithExpr are equal
function areAllLambdaWithExprsEqual(lambdas: CoreAST.LambdaWithExpr[]): boolean {
  if (lambdas.length === 0) {
    return true;
  }

  const firstLambda = lambdas[0];
  return lambdas.every(lambda => areLambdaWithExprsEqual(lambda, firstLambda));
}


// 定义 flatten 函数
export function flatten(termNode: CoreAST.TermNode): CoreAST.TermNode {
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
    } else if (termNode.type==="ite"){
      return {...termNode, trueBranch:flatten(termNode.trueBranch), falseBranch:flatten(termNode.falseBranch)};
    } else if (termNode.type === "loop"){
      return {...termNode, body: {...termNode.body, body: flatten(termNode.body.body)}};
    } else {
      // 其他情况下，直接返回
      return termNode;
  }
}
