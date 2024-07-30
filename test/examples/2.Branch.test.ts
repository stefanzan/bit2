import * as BiEval from "../../src/bx/biEval";

const exampleInput = 
`«var v="stefanzantao"»
«if v.length>10»
«v»...
«endif»`;

console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput));

console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

console.log('--- 2. replace "stefanzantao" with "stefanzan" at 2------------------');
BiEval.backward(exampleInput, {type:'replace', str1:"stefanzantao", str2:"stefanzan", position:2}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


// const exampleInput2 = 
// `«var v="stefanzantao"»
// «if v.length>10»
// «v»...
// «endif»`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput));

// console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

        