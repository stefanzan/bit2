import * as CoreAST from "../../src/core/AST";
import * as PartialAST from "../../src/partial/AST";
import { partialEval } from "../../src/partialEval/peval";
import {unPartialEval, flatten} from "../../src/partialEval/unpeval";
import * as Expr from "../../src/common/Exp";
import * as SimpleCoreExample from "../core/0.simple.test";
import { printNode } from "../../src/partial/Print";
import * as Print from "../../src/core/Print";

// Example usage:
// Define your initial environment
const initialEnvironment = new Map<string, any>();

// Example AST node from CoreAST to partially evaluate
const coreNode: CoreAST.TermNode = {
    type: 'const',
    value: '42'
};

// Perform partial evaluation
// const [updatedEnv, partialNode] = partialEval(initialEnvironment, coreNode);
// console.log(partialNode); // Output the partially evaluated node

console.log("---------------1. Assign Example------------------------")
const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
let ast = flatten(unPartialEval(partialNode));
Print.printAST(SimpleCoreExample.assignmentExample);
console.log("-------------------");
Print.printAST(ast);

console.log("---------------2. Branch Example------------------------")
const [updatedEnv2, partialNode2] = partialEval(initialEnvironment, SimpleCoreExample.branchExample);
ast = flatten(unPartialEval(partialNode2));
Print.printAST(SimpleCoreExample.branchExample);
console.log("-------------------");
Print.printAST(ast);

// const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.loopExample);
// console.log(partialNode);
// printNode(partialNode);

