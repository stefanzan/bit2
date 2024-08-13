import * as Exp from "./Exp";

export function prettyPrint(node:Exp.Expr): string {
  switch(node.type){
    case 'constant':
      let val = node.value;
      if(typeof val === 'string') {
        return '"' + String(val) + '"';
      } else if(typeof val === 'object' && val !== null){
         if(Array.isArray(val)) { 
          if( val.length === 0){
            return "[]";
          } else if(val.length !== 0){
            return '[' + (val as Exp.Expr[]).map(prettyPrint).join(', ') + ']';
          } 
        } else {
            return prettyPrint(val as Exp.Expr);
        }
      } else {
        return String(val);
      }
    case 'variable':
      //@ts-ignore
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
    case 'object':
      let fieldsObj = node.fields;
      const fieldsStr = Object.keys(fieldsObj).map(field => {
        return field + ":" + prettyPrint(fieldsObj[field]);
      }).join(', ');
      return "{" + fieldsStr  +"}";
    default: // basic types
      return "";
  }
}

export function prettyPrintBinaryOperator(node: Exp.BinaryOperator):string {
  return node;
}

export function prettyPrintUnaryOperator(node: Exp.UnaryOperator):string {
  return node;
}