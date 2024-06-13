import {
  TermNode,
  ConstNode,
  SpaceNode,
  DeclareNode,
  ExpNode,
  SeqNode,
  IfThenElseNode,
  LoopNode,
  NopNode,
  BotNode,
  EndNode,
  FreezeExp,
  Expr,
  Constant,
  Variable,
  BinaryOperation,
  UnaryOperation,
  FieldAccess,
  ArrayLiteral,
  ObjectLiteral,
  FrontNode,
  RearNode,
  SepNode,
  Lambda,
  AssignNode
} from "./AST";

// 测试函数，递归打印AST节点
export function printAST(node: TermNode, indent: string = ''): void {
  switch (node.type) {
      case 'const':
          console.log(`${indent}Const: ${node.value.value}`);
          break;
      case 'space':
          console.log(`${indent}Space: ${node.width}`);
          break;
      case 'declare':
          console.log(`${indent}Declare: ${node.name.name} =`);
          printExpression(node.value, indent + '  ');
          break;
      case 'assign':
          console.log(`${indent}Assign: ${node.name.name} =`);
          printExpression(node.value, indent + '  ');
          break;
      case 'exp':
          console.log(`${indent}Exp:`);
          printExpression(node.expression, indent + '  ');
          break;
      case 'seq':
          console.log(`${indent}Seq:`);
          node.nodes.forEach(n => printAST(n, indent + '  '));
          break;
      case 'ite':
          console.log(`${indent}If-Then-Else: if`);
          printExpression(node.condition, indent + '  ');
          console.log(`${indent}Then:`);
          printAST(node.trueBranch, indent + '  ');
          console.log(`${indent}Else:`);
          printAST(node.falseBranch, indent + '  ');
          break;
      case 'loop':
          console.log(`${indent}Loop:`);
          printExpression(node.lst, indent + '  ');
          console.log(`${indent}Separator: ${node.separator.value}`);
          console.log(`${indent}Front: ${node.front.value}`);
          console.log(`${indent}Rear: ${node.rear.value}`);
          printLambda(node.body, indent + '  ');
          break;
      case 'call':
          console.log(`${indent}Call:`);
          printAST(node.func, indent + '  ');
          Object.keys(node.args).forEach(arg => {
              console.log(`${indent}  ${arg} =`);
              printExpression(node.args[arg], indent + '    ');
          });
          break;
      case 'nop':
          console.log(`${indent}Nop`);
          break;
      case 'bot':
          console.log(`${indent}Bot`);
          break;
      case 'end':
          console.log(`${indent}End`);
          break;
  }
}

function printExpression(expr: Expr, indent: string = ''): void {
  switch (expr.type) {
      case 'constant':
          console.log(`${indent}Constant: ${expr.value}`);
          break;
      case 'variable':
          console.log(`${indent}Variable: ${expr.name}`);
          break;
      case 'binary':
          console.log(`${indent}BinaryOperation: ${expr.operator}`);
          printExpression(expr.left, indent + '  ');
          printExpression(expr.right, indent + '  ');
          break;
      case 'unary':
          console.log(`${indent}UnaryOperation: ${expr.operator}`);
          printExpression(expr.operand, indent + '  ');
          break;
      case 'field':
          console.log(`${indent}FieldAccess: ${expr.field}`);
          printExpression(expr.object, indent + '  ');
          break;
      case 'array':
          console.log(`${indent}ArrayLiteral:`);
          expr.elements.forEach(element => printExpression(element, indent + '  '));
          break;
      case 'object':
          console.log(`${indent}ObjectLiteral:`);
          Object.keys(expr.fields).forEach(field => {
              console.log(`${indent}${field} = ${expr.fields[field].value}`);
          });
          break;
      case 'freeze':
          console.log(`${indent}Freeze:`);
          printExpression(expr.expression, indent + '  ');
          break;
  }
}

export function printLambda(lambda: Lambda, indent: string = ''): void {
  console.log(`${indent}Lambda: ${lambda.variable.name}`);
  printAST(lambda.body, indent + '  ');
}
