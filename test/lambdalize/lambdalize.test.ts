import { flatten, partialEval } from "../../src/partialEval/peval";
import * as SimpleCoreExample from "../core/0.simple.test";
import { lambdalize } from "../../src/lambdalize/lambdalize";
import * as LambdaPrint from "../../src/lambda/Print";
import * as Scope from "../../src/scope/scopelize";

// Define your initial environment
const initialEnvironment = new Map<string, any>();

// console.log("---------------Assign Example--------------")
// LambdaPrint.printNode(lambdalize(partialEval(initialEnvironment, Scope.scopelize(SimpleCoreExample.assignmentExample))[1]));

// console.log("---------------Branch Example--------------")
// LambdaPrint.printNode(lambdalize(partialEval(initialEnvironment, Scope.scopelize(SimpleCoreExample.branchExample))[1]));

// console.log("---------------Loop Example--------------")
// LambdaPrint.printNode(lambdalize(partialEval(initialEnvironment, Scope.scopelize(SimpleCoreExample.loopExample))[1]));

// console.log("---------------Loop with assign Example--------------")
// LambdaPrint.printNode(lambdalize(flatten(partialEval(initialEnvironment, Scope.scopelize(SimpleCoreExample.loopExampleWithAssign))[1])));

console.log("---------------Loop with assign and if Example--------------")
LambdaPrint.printNode(lambdalize(flatten(partialEval(initialEnvironment, Scope.scopelize(SimpleCoreExample.loopExampleWithAssignAndIF))[1])));