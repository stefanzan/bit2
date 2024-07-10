import { Constant } from "../common/Exp";
import { Binding, Value, ObjectValue } from "../partial/AST";
import * as LambdaAST from "./AST";

export function evaluateTermNode(node: LambdaAST.TermNode): string {
  switch (node.type) {
    case 'const':
      return node.value;
    case 'sep':
      return node.value;
    case 'space':
      return ' '.repeat(node.width);
    case 'exp':
      return String(evaluateBinding(node.binding));
    case 'seq':
      return node.nodes.map(subNode => evaluateTermNode(subNode)).join('');
    case 'lambda':
      return evaluateTermNode(node.body);
    case 'branchstart':
    case 'branchend':
    case 'end':
    case 'nop':
      return ''; // 返回空字符串，表示这些节点在输出中没有表示
    case 'loopfront':
    case 'looprear':
      return node.value;
    default:
      throw new Error(`Unhandled term node type: ${node.type}`);
  }
}

function evaluateConstant(constant: Constant): string {
  const { value } = constant;
  if (value === null) {
    return 'null';
  } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return String(value);
  } else if (Array.isArray(value)) {
    return `[${value.map(item => String(item)).join(', ')}]`;
  } else if (typeof value === 'object' && value.type === 'object') {
    const fields = Object.entries(value.fields).map(([key, val]) => `${key}: ${evaluateConstant(val)}`);
    return `{ ${fields.join(', ')} }`;
  } else {
    throw new Error(`Unhandled constant value type: ${typeof value}`);
  }
}

function evaluateBinding(binding: Binding) : string {
  let value = binding[1];
  return printValue(value);
}

export function printValue(value: Value): string {
  if (value === null) {
    return 'null';
  } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
    return value.toString();
  } else if ((value as ObjectValue).type === 'object') {
    const objectValue = value as ObjectValue;
    let result = '{';
    for (const key in objectValue.fields) {
      if (objectValue.fields.hasOwnProperty(key)) {
        result += `${key}: ${printValue(objectValue.fields[key])}, `;
      }
    }
    if (result.length > 1) {
      result = result.slice(0, -2); // 移除最后的逗号和空格
    }
    result += '}';
    return result;
  } else if (Array.isArray(value)){
   const arrayValue = value as Value[];
   let result = '[';
   for (const element of arrayValue) {
     result += `${printValue(element)}, `;
   }
   if (result.length > 1) {
     result = result.slice(0, -2); // 移除最后的逗号和空格
   }
   result += ']';
   return result;
  } else {
    throw new Error(`Unhandled value type: ${typeof value}`);
  }
}

function isObjectValue(value: Value): value is ObjectValue {
  return (value as ObjectValue).type === 'object';
}

function isArrayValue(value: Value): value is Value[] {
  return Array.isArray(value);
}
