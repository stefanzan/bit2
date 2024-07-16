import { partialEval } from "../../src/partialEval/peval";
import * as SimpleCoreExample from "../core/0.simple.test";
import { lambdalize } from "../../src/lambdalize/lambdalize";
import { unLambdalize } from "../../src/lambdalize/unLambdalize";
import * as PartialPrint from "../../src/partial/Print";
import { flatten } from "../../src/partialEval/peval";

// Define your initial environment
const initialEnvironment = new Map<string, any>();
let [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
let lambdaAST = flatten(unLambdalize(lambdalize(partialNode)));
PartialPrint.printNode(flatten(partialNode));
console.log("--------------------------------");
PartialPrint.printNode(lambdaAST);

console.log("---------------Branch Example--------------")
let [updatedEnv1, partialNode1] = partialEval(initialEnvironment, SimpleCoreExample.branchExample);
lambdaAST = flatten(unLambdalize(lambdalize(partialNode1)));
PartialPrint.printNode(flatten(partialNode1));
console.log("--------------------------------");
PartialPrint.printNode(lambdaAST);


console.log("---------------Loop Example--------------")
let [updatedEnv2, partialNode2] = partialEval(initialEnvironment, SimpleCoreExample.loopExample);
lambdaAST = flatten(unLambdalize(lambdalize(partialNode2)));
PartialPrint.printNode(flatten(partialNode2));
console.log("--------------------------------");
PartialPrint.printNode(lambdaAST);
