import { partialEval } from "../../src/partialEval/peval";
import * as SimpleCoreExample from "../core/0.simple.test";
import { lambdalize } from "../../src/lambdalize/lambdalize";
import * as LambdaPrint from "../../src/lambda/Print";
import * as Evaluation from "../../src/lambda/Evaluation";

// Define your initial environment
const initialEnvironment = new Map<string, any>();
const [updatedEnv, partialNode] = partialEval(initialEnvironment, SimpleCoreExample.assignmentExample);
const lambdaAST = lambdalize(partialNode);
let str = Evaluation.evaluateTermNode(lambdaAST);
console.log(str);

console.log("---------------Branch Example--------------")
console.log(Evaluation.evaluateTermNode(lambdalize(partialEval(initialEnvironment, SimpleCoreExample.branchExample)[1])));

console.log("---------------Loop Example--------------")
console.log(Evaluation.evaluateTermNode(lambdalize(partialEval(initialEnvironment, SimpleCoreExample.loopExample)[1])));