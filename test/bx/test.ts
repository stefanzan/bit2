import * as BiEval from "../../dist/bit2";

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

