import * as BiEval from "../../src/bx/biEval";
import * as CorePrettyPrint from "../../src/core/PrettyPrint";

console.log("== Forward Evaluation ==");
const exampleInput = 
`«VAR no = 0»
Before: «no»
«no = no + 1»
After: «no»`;
console.log(BiEval.forward(exampleInput));

console.log("== Backward Evaluation ==");
console.log('--- 1. replace "0" with "1" at 9------------------');
console.log("Updated:");
BiEval.backward(exampleInput, {type:'replace', str1:"0", str2:"1", position:9}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

console.log('--- 2. insert "," at 10------------------');
BiEval.backward(exampleInput, {type:'insert', str:",", position:10}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

console.log('--- 3. insert "1" at 10------------------');
BiEval.backward(exampleInput, {type:'insert', str:"1", position:10}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

console.log('--- 4. insert "," at 9------------------');
BiEval.backward(exampleInput, {type:'insert', str:",", position:9}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

console.log('--- 5. insert "1" at 9------------------');
BiEval.backward(exampleInput, {type:'insert', str:"1", position:9}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


console.log("== Forward Evaluation ==");
const exampleInput2 = 
`«VAR no = 100»
Before: «no»
«no = no + -88»
After: «no»`;
console.log(BiEval.forward(exampleInput2));

console.log('--- 6. insert "1" at 9------------------');
BiEval.backward(exampleInput2, {type:'insert', str:"1", position:9}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


console.log('--- 7. replace "0" with "1" at 10------------------');
BiEval.backward(exampleInput2, {type:'replace', str1:"0", str2:"1", position:10}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


console.log('--- 8. replace "0" with "1" at 11------------------');
BiEval.backward(exampleInput2, {type:'replace', str1:"0", str2:"1", position:11}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

