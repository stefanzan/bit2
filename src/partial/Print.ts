import { TermNode, Marker, Value, ObjectValue } from '../../src/partial/AST';
import {Expr} from "../common/Exp";
import { printExpression } from '../common/Print';

// Function to print the AST nodes for testing purposes
export function printNode(node: TermNode, indent: string = ''): void {
    console.log(indent + node.type);

    switch (node.type) {
        case 'const':
            console.log(indent + '  Value: ' + node.value);
            break;
        case 'space':
            console.log(indent + '  Width: ' + node.width);
            break;
        case 'declare':
            console.log(indent + '  Name: ' + node.name.name);
            printBinding(node.value, indent + '  ');
            break;
        case 'assign':
            console.log(indent + '  Name: ' + node.name.name);
            printBinding(node.value, indent + '  ');
            break;
        case 'exp':
            printBinding(node.binding, indent + '  ');
            break;
        case 'seq':
            node.nodes.forEach(n => printNode(n, indent + '  '));
            break;
        case 'branchstart':
            printBinding(node.condition, indent + '  ');
            break;
        case 'sep':
            console.log(indent + '  Value: ' + node.value);
            break;
        case 'loopfront':
            console.log(indent + '  front: ' + node.value);
            break;
        case 'looprear':
            console.log(indent + '  rear: ' + node.value);
            break;
        case 'lambda':
            console.log(indent + '  Variable: ' + node.variable.name);
            printNode(node.body, indent + '  ');
            printBinding(node.binding, indent + '  ');
            printMarker(node.marker, indent + '  ');
            break;
        case 'callstart':
            console.log(indent + '  Name: ' + node.name);
            break;
        case 'end':
            console.log(`${indent}  End`);
            break;
        default:
            break;
    }
}

export function printBinding(binding: [Expr, Value], indent: string): void {
  printExpression(binding[0], indent);
  printValue(binding[1], indent);
}



// Function to print Value with indent
export function printValue(value: Value, indent: string): void {
    if (value === null) {
        console.log(`${indent}null`);
    } else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'string') {
        console.log(`${indent}${value}`);
    } else if (typeof value === 'object') {
        // Assume value is an ObjectLiteral
        console.log(`${indent}{`);
        const objectValue = value as ObjectValue; // Type assertion to ensure correct indexing
        for (const key in objectValue) {
            if (objectValue.hasOwnProperty(key)) {
                const newIndent = indent + "  ";
                console.log(`${newIndent}${key}:`);
                //@ts-ignore
                printValue(objectValue[key], newIndent + "  ");
            }
        }
        console.log(`${indent}}`);
    } else {
        throw new Error(`Unhandled value type: ${typeof value}`);
    }
}



export function printMarker(marker: Marker, indent: string = ''): void {
  console.log(indent + marker.type);
}