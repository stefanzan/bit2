import * as BiEval from "../../src/bx/biEval";
import * as CorePrettyPrint from "../../src/core/PrettyPrint";

// console.log("== Forward Evaluation ==");
// const exampleInput = 
// `«VAR no = 0»
// Before: «no»
// «no = no + 1»
// After: «no»`;
// console.log(BiEval.forward(exampleInput));

// console.log("== Backward Evaluation ==");
// console.log('--- 1. replace "0" with "1" at 9------------------');
// console.log("Updated:");
// BiEval.backward(exampleInput, {type:'replace', str1:"0", str2:"1", position:9}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 2. insert "," at 10------------------');
// BiEval.backward(exampleInput, {type:'insert', str:",", position:10}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 3. insert "1" at 10------------------');
// BiEval.backward(exampleInput, {type:'insert', str:"1", position:10}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 4. insert "," at 9------------------');
// BiEval.backward(exampleInput, {type:'insert', str:",", position:9}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 5. insert "1" at 9------------------');
// BiEval.backward(exampleInput, {type:'insert', str:"1", position:9}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log("== Forward Evaluation ==");
// const exampleInput2 = 
// `«VAR no = 100»
// Before: «no»
// «no = no + -88»
// After: «no»`;
// console.log(BiEval.forward(exampleInput2));

// console.log('--- 6. insert "1" at 9------------------');
// BiEval.backward(exampleInput2, {type:'insert', str:"1", position:9}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 7. replace "0" with "1" at 10------------------');
// BiEval.backward(exampleInput2, {type:'replace', str1:"0", str2:"1", position:10}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 8. replace "0" with "1" at 11------------------');
// BiEval.backward(exampleInput2, {type:'replace', str1:"0", str2:"1", position:11}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// const exampleInput2 = 
// `«VAR no = 1»«no = no + 1»«no»
// «no = no + 1»«no»`;
// console.log("== Forward Evaluation ==");
// console.log(BiEval.forward(exampleInput2));

// console.log('--- 1. bulk(replace "2" with "1" at 0, replace "3" with "2" at 2) ------------------');
// BiEval.backward(exampleInput2, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position: 0},
//   {type:'replace', str1:'3', str2:'2', position: 2}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// const exampleInput3 = 
// `«VAR no = 1»«no = 1 + no »«no»
// «no = no + 1»«no»`;
// console.log("== Forward Evaluation ==");
// console.log(BiEval.forward(exampleInput3));

// console.log('--- 1. bulk(replace "2" with "1" at 0, replace "3" with "2" at 2) ------------------');
// BiEval.backward(exampleInput3, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position: 0},
//   {type:'replace', str1:'3', str2:'2', position: 2}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });