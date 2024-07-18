import * as BiEval from "../../src/bx/biEval";
import * as SimpleCoreExample from "../core/0.simple.test";
import * as CorePrint from "../../src/core/Print";
import * as CorePrettyPrint from "../../src/core/PrettyPrint";

console.log("-------- 1. Assignment ----------");
console.log("== Forward Evaluation ==");
console.log(BiEval.forward(SimpleCoreExample.assignmentExample));
console.log("== Backward Evaluation ==");
console.log('Operation:\n replace "1" with "2" at 3');
console.log("Original:");
// CorePrint.printAST(SimpleCoreExample.assignmentExample);
console.log(CorePrettyPrint.prettyPrint(SimpleCoreExample.assignmentExample));

console.log("Updated:");
BiEval.backward(SimpleCoreExample.assignmentExample, {type:'replace', str1:"1", str2:"2", position:3}).forEach(updatedCoreAST => {
  // CorePrint.printAST(updatedCoreAST);
  console.log(CorePrettyPrint.prettyPrint(updatedCoreAST));
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});
console.log("-------- 2. Branch ----------");
console.log(BiEval.forward(SimpleCoreExample.branchExample));

console.log("-------- 3. Loop ----------");
console.log(BiEval.forward(SimpleCoreExample.loopExample));

