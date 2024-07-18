import * as Exp from "./Exp";

export function prettyPrint(node:Exp.Expr): string {
  switch(node.type){
    case 'constant':
      return String(node.value);
    case 'variable':
      return node.name;
    case 'binary':
      return prettyPrint(node.left) + prettyPrintBinaryOperator(node.operator) + prettyPrint(node.right);
    case 'unary':
      return prettyPrintUnaryOperator(node.operator) + prettyPrint(node.operand);
    case 'field':
      return prettyPrint(node.object)+"."+node.field;
    case 'array':
      return "[" + node.elements.map(ele=>prettyPrint(ele)).join(",") + "]";
    case 'freeze':
      return "!" + prettyPrint(node.expression);
    default:
      return "";
  }
}

export function prettyPrintBinaryOperator(node: Exp.BinaryOperator):string {
  return node;
}

export function prettyPrintUnaryOperator(node: Exp.UnaryOperator):string {
  return node;
}