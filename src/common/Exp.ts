
// Expressions
export type Expr = Constant | Variable | BinaryOperation | UnaryOperation
    | FieldAccess | ArrayLiteral | FreezeExp 
    | ObjectLiteral; // 方便实现，把ObjectLiteral放到了Expr,不是Constant

export interface Constant {
    type: 'constant';
    value: number | boolean | string | [] | null | ObjectLiteral | ObjectLiteral[];
}

export interface Variable {
    type: 'variable';
    name: string;
}

export interface BinaryOperation {
    type: 'binary';
    operator: BinaryOperator;
    left: Expr;
    right: Expr;
}

export interface UnaryOperation {
    type: 'unary';
    operator: UnaryOperator;
    operand: Expr;
}

// e.f
export interface FieldAccess {
    type: 'field';
    object: Expr;
    field: string;
}

// array
export interface ArrayLiteral {
    type: 'array';
    elements: Expr[];
}

// object
export interface ObjectLiteral {
    type: 'object';
    fields: { [key: string]: Constant };
}

export interface FreezeExp {
  type: 'freeze';
  expression: Expr;
}

export interface FunctionCall {
    type: 'function';
    func: Expr;
    args: Expr[];
}


// Operators
export type BinaryOperator = '+' | '-' | '*' | '/' | '&&' | '||' | '>' | '<' | '>=' | '<=' | '!=' | '==';
export type UnaryOperator = 'not';

export function findVariablesAndFields(exp: Expr): { variables: Variable[], fields: { variable: Variable, field: string }[] } {
  let variables: Variable[] = [];
  let fields: { variable: Variable, field: string }[] = [];

  function traverse(node: Expr) {
    switch (node.type) {
      case 'variable':
        variables.push(node);
        break;
      case 'field':
        if (node.object.type === 'variable') {
          fields.push({ variable: node.object, field: node.field });
        } else {
          traverse(node.object);
        }
        break;
      case 'binary':
        traverse(node.left);
        traverse(node.right);
        break;
      case 'unary':
        traverse(node.operand);
        break;
      case 'array':
        node.elements.forEach(traverse);
        break;
      case 'object':
        Object.values(node.fields).forEach(traverse);
        break;
      case 'freeze':
        traverse(node.expression);
        break;
      // Add other cases as needed
      default:
        break;
    }
  }

  traverse(exp);
  return { variables, fields };
}

