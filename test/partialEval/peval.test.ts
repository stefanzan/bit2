import * as CoreAST from "../../src/core/AST";
import * as PartialAST from "../../src/partial/AST";
import { partialEval } from "../../src/partialEval/peval";


// Example usage:
// Define your initial environment
const initialEnvironment = new Map<CoreAST.Variable, any>();

// Example AST node from CoreAST to partially evaluate
const coreNode: CoreAST.TermNode = {
    type: 'const',
    value: {
        type: 'constant',
        value: 42
    }
};

// Perform partial evaluation
const [updatedEnv, partialNode] = partialEval(initialEnvironment, coreNode);
console.log(partialNode); // Output the partially evaluated node
