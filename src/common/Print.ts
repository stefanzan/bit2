import {Expr, Constant, ObjectLiteral} from "./Exp";

export function printExpression(expr: Expr, indent: string = ''): void {
  switch (expr.type) {
      case 'constant':
          printConstantValue(expr.value, indent + ' ');
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
              console.log(`${indent}  ${field} = `);
              printExpression(expr.fields[field], indent + '  ')
          });
          break;
      case 'freeze':
          console.log(`${indent}Freeze:`);
          printExpression(expr.expression, indent + '  ');
          break;
  }
}


// Function to print Value with indent
export function printConstantValue(value: any, indent: string): void {
  if (value === null) {
      console.log(`${indent}null`);
  } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
      console.log(`${indent}${value}`);
  } else if (typeof value === 'object') {
      // Assume value is an ObjectLiteral
      console.log(`${indent}{`);
      const objectValue = value as ObjectLiteral; // Type assertion to ensure correct indexing
      for (const key in objectValue) {
          if (objectValue.hasOwnProperty(key)) {
              const newIndent = indent + "  ";
              console.log(`${newIndent}${key}:`);
              //@ts-ignore
              printConstantValue(objectValue[key], newIndent + "  ");
          }
      }
      console.log(`${indent}}`);
      // @ts-ignore
  } else if (typeof value === 'constant'){
    const constantValue = value as Constant; // Type assertion to ensure correct indexing
    printConstantValue(constantValue.value, indent + ' '); 
  }
  else if (typeof value == 'undefined'){
    console.log(`${indent}undefined`);
  }
  else {
      throw new Error(`Unhandled value type: ${typeof value}`);
  }
}