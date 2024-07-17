import * as BiEval from "../../src/bx/biEval";
import * as SimpleCoreExample from "../core/0.simple.test";
import * as CorePrint from "../../src/core/Print";

console.log("========= Forward Evaluation ========");

console.log("-------- 1. Assignment ----------");
console.log(BiEval.forward(SimpleCoreExample.assignmentExample));

console.log("-------- 2. Branch ----------");
console.log(BiEval.forward(SimpleCoreExample.branchExample));

console.log("-------- 3. Loop ----------");
console.log(BiEval.forward(SimpleCoreExample.loopExample));


console.log("========= Backward Evaluation ========");
console.log("Original:");
CorePrint.printAST(SimpleCoreExample.assignmentExample);

console.log("Updated:");
BiEval.backward(SimpleCoreExample.assignmentExample, {type:'replace', str1:"1", str2:"2", position:3}).forEach(updatedCoreAST => {
  CorePrint.printAST(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});