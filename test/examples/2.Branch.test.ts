import * as BiEval from "../../src/bx/biEval";

// const exampleInput = 
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

// console.log('--- 2. replace "stefanzantao" with "stefanzentao" at 2------------------');
// BiEval.backward(exampleInput, {type:'replace', str1:"stefanzantao", str2:"stefanzentao", position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 3. replace "stefanzantao" with "stefanzan" at 2------------------');
// BiEval.backward(exampleInput, {type:'replace', str1:"stefanzantao", str2:"stefanzan", position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// const exampleInput2 = 
// `«var v="stefanzantao"»
// «if v.length>10»
// «v»...
// «else»
// «v»
// «endif»`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput2));

// console.log("=== Backward Evaluation===");
// console.log('--- 4. replace "a" with "e" at 9------------------');
// BiEval.backward(exampleInput2, {type:'replace', str1:"a", str2:"e", position:9}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// const exampleInput3 = 
// `«var v="stefan"»
// «if v.length>10»
// «v»...
// «else»
// «v»
// «endif»`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput3));

// console.log("=== Backward Evaluation===");
// console.log('--- 5. replace "stefan" with "stefanzantao" at 2------------------');
// BiEval.backward(exampleInput3, {type:'replace', str1:"stefan", str2:"stefanzantao", position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });        


const exampleInput4 = 
`«var v="stefanzan0"»
«if v.length>10»
«v»...
«else if v.length == 10 »
«v»_10
«endif»`;

console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput4));

console.log("=== Backward Evaluation===");
console.log('--- 6. replace "a" with "e" at 9------------------');
BiEval.backward(exampleInput4, {type:'replace', str1:"a", str2:"e", position:9}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});        