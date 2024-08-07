import { flatten, partialEval } from "../../src/partialEval/peval";
import * as SimpleCoreExample from "../core/0.simple.test";
import { lambdalize } from "../../src/lambdalize/lambdalize";
import * as LambdaPrint from "../../src/lambda/Print";

// Define your initial environment
const initialEnvironment = new Map<string, any>();

// console.log("---------------Assign Example--------------")
// const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
// const lambdaAST = lambdalize(partialNode);
// LambdaPrint.printNode(lambdaAST);

// console.log("---------------Branch Example--------------")
// LambdaPrint.printNode(lambdalize(partialEval(initialEnvironment, SimpleCoreExample.branchExample)[1]));

// console.log("---------------Loop Example--------------")
// LambdaPrint.printNode(lambdalize(partialEval(initialEnvironment, SimpleCoreExample.loopExample)[1]));

console.log("---------------Loop with assign Example--------------")
LambdaPrint.printNode(lambdalize(flatten(partialEval(initialEnvironment, SimpleCoreExample.loopExampleWithAssign)[1])));
