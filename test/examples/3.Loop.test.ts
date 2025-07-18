import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
// import * as BiEval from "../../dist/bit2";

// const exampleInput0 = 
// `«var lst=[1]»
// «for item in lst separator "," front "[" rear "]"»«item»«endfor»`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput0));

// console.log('--- 4. delete "1" at 2 ------------------');
// BiEval.backward(exampleInput0, {type:'delete', str:'1', position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


const exampleInput = 
`«var lst=[1,2,3]»
«for item in lst separator "," front "[" rear "]"»«item»«endfor»`;

console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput));

// console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 2. delete "1," at 2 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'1,', position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 3. delete "2," at 4 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'2,', position:4}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 4. delete "1,2,3" at 2 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'1,2,3', position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 5. delete "[1,2,3]" at 1 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'[1,2,3]', position:1}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// // Note: output: «var lst=[]»
// // cannot keep «var lst=[1,2,3]», because '[', ',', and ']' are separators.

// console.log('--- 6. bulk(replace "," with ";" at 3, replace "," with ";" at 5) ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[
//   {type:'replace', str1:',', str2:';', position:3},
//   {type:'replace', str1:',', str2:';', position:5},
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// We don't support this case.
console.log('--- 7. bulk(insert "9" at 4, insert "," at 5) ------------------');
BiEval.backward(exampleInput, {type:'bulk', operations:[
  {type:'insert', str:'9', position:4},
  {type:'insert', str:',', position:5},
]}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


// const exampleInput11 = 
// `«var lst=[1,2,3]»
// «for item in lst»«item»
// «endfor»`;


// console.log('--- 4. insert "9\n" at 3 ------------------');
// BiEval.backward(exampleInput11, {type:'insert', str:'9\n', position:3}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// const exampleInput2 = 
// `«var lst=[3]»
// «for item in lst separator "," front "[" rear "]"»«item»«endfor»`
// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput2));
// console.log("=== Backward Evaluation===");
// console.log('--- 7. delete "3" at 2 ------------------');
// BiEval.backward(exampleInput2, {type:'bulk', operations:[{type:'delete', str:'3', position:2}]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// const exampleInput3 = 
// `«var lst=[{head:"Modeling", text:"UML"},{head:"Programming", text:"Java"}]»
// «for p in lst»
// <h1>«p.head»</h1>
// <p>«p.text»</p>
// «endfor»`;
// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput3));
// console.log("=== Backward Evaluation===");

// console.log('--- 8. replace "Modeling" with "Modeling Tools" at 6 ------------------');
// BiEval.backward(exampleInput3, {type:'replace', str1:'Modeling', str2:"Modeling Tools", position:6}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 9. bulk(replace "Modeling" with "Modeling Tools" at 6, replace "UML" with "UML Language" at 29) ------------------');
// BiEval.backward(exampleInput3, {type:'bulk', operations:[
//   {type:'replace', str1:'Modeling', str2:"Modeling Tools", position:6},
//   {type:'replace', str1:'UML', str2:"UML Language", position:29}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 10. bulk(replace "Modeling" with "Modeling Tools" at 6, replace "Programming" with "Programming Languages" at 42) ------------------');
// BiEval.backward(exampleInput3, {type:'bulk', operations:[
//   {type:'replace', str1:'Modeling', str2:"Modeling Tools", position:6},
//   {type:'replace', str1:'Programming', str2:"Programming Languages", position:42}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });



// const exampleInput4 = 
// `«var lst=[{head:"Modeling", text:"UML"},{head:"Programming", text:"Java"}]»
// «for p in lst»
// <h1>«p.head»</h1>
// «endfor»`;
// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput4));
// console.log("=== Backward Evaluation===");
// console.log('--- 11. replace "Modeling" with "Modeling Tools" at 6 ------------------');
// BiEval.backward(exampleInput4, {type:'replace', str1:'Modeling', str2:"Modeling Tools", position:6}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
