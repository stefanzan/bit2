import {flatten, partialEval } from "../../src/partialEval/peval";
import * as SimpleCoreExample from "../core/0.simple.test";
import { lambdalize } from "../../src/lambdalize/lambdalize";
import * as LambdaPrint from "../../src/lambda/Print";
import * as Evaluation from "../../src/lambda/Evaluation";

// Define your initial environment
const initialEnvironment = new Map<string, any>();
console.log("---------------Assign Example--------------")
const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
const lambdaAST = lambdalize(flatten(partialNode));
let str = Evaluation.evaluateTermNode(lambdaAST);
console.log(str);

console.log("---------------Branch Example--------------")
console.log(Evaluation.evaluateTermNode(lambdalize(flatten(partialEval(initialEnvironment, SimpleCoreExample.branchExample)[1]))));

console.log("---------------Loop Example--------------")
console.log(Evaluation.evaluateTermNode(lambdalize(flatten(partialEval(initialEnvironment, SimpleCoreExample.loopExample)[1]))));

console.log("---------------Loop with assign Example--------------")
console.log(Evaluation.evaluateTermNode(lambdalize(flatten(partialEval(initialEnvironment, SimpleCoreExample.loopExampleWithAssign)[1]))));