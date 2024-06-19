import * as CoreAST from "../../src/core/AST";
import * as PartialAST from "../../src/partial/AST";
import { partialEval } from "../../src/partialEval/peval";
import * as Expr from "../../src/common/Exp";
import * as SimpleCoreExample from "../core/0.simple.test";
import { printNode } from "../../src/partial/Print";

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

const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
// const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.branchExample);
// const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.loopExample);
// console.log(partialNode);
printNode(partialNode);

