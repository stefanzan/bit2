import * as BiEval from "../../src/bx/biEval";
import * as SimpleCoreExample from "../core/0.simple.test";
import * as CorePrettyPrint from "../../src/core/PrettyPrint";

console.log("-------- 1. Assignment ----------");
console.log("== Forward Evaluation ==");
const exampleInput = 
`«VAR no = 0»
Before: «no»
«no = no + 1»
After: «no»`;
console.log(BiEval.forward(exampleInput));
console.log("== Backward Evaluation ==");
console.log('Operation:\n replace "0" with "1" at 9');
console.log("Original:");
// CorePrint.printAST(SimpleCoreExample.assignmentExample);
// console.log(CorePrettyPrint.prettyPrint(SimpleCoreExample.assignmentExample));
console.log("Updated:");
BiEval.backward(exampleInput, {type:'replace', str1:"0", str2:"1", position:9}).forEach(updatedCoreAST => {
  // CorePrint.printAST(updatedCoreAST);
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

// console.log('Operation:\n bulk(replace "0" with "1" at 0, replace "1" with "2" at 3)');
// console.log("Updated:");
// BiEval.backward(SimpleCoreExample.assignmentExample, {type:'bulk',operations:[{type:'replace', str1:"0", str2:"1", position:0},{type:'replace', str1:"1", str2:"2", position:3}]}).forEach(updatedCoreAST => {
//   // CorePrint.printAST(updatedCoreAST);
//   console.log(CorePrettyPrint.prettyPrint(updatedCoreAST));
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });




// console.log("-------- 2. Branch ----------");
// console.log(BiEval.forward(SimpleCoreExample.branchExample));

// console.log("-------- 3. Loop ----------");
// console.log(BiEval.forward(SimpleCoreExample.loopExample));

