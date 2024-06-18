import * as PartialPrint from "../partial/Print";
import * as LambdaAST from "./AST";

// Function to print LambdaAST nodes
export function printNode(node: LambdaAST.TermNode, indent: string = ""): void {
  switch (node.type) {
    case 'lambda':
      console.log(`${indent}LambdaAppNode:`);
      console.log(`${indent}  Variable: ${node.variable.name}`);
      console.log(`${indent}  Binding:`);
      PartialPrint.printBinding(node.binding, indent + "    ");
      console.log(`${indent}  Marker: ${node.marker.type}`);
      console.log(`${indent}  Body:`);
      printNode(node.body, indent + "    ");
      break;
    case 'seq':
      node.nodes.forEach(n => printNode(n, indent + '  '));
      break;
    default:
      PartialPrint.printNode(node, indent);
  }
}