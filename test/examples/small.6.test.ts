import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const simpleExampleIntput2 = 
`«var count=1»
Before: «count»
«count=count+1»
After: «count»`

console.log("===Forward Evaluation===");
console.log(BiEval.forward(simpleExampleIntput2));

console.log("=== Backward Evaluation===");

// console.log('--- 1. id  ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'id'},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });



// console.log('--- 2. bulk(replace "1" with "0" at 9, replace "2" with "1" at 19) ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'replace', str1:"1", str2:"0", position:9},
//     {type:'replace', str1:"2", str2:"1", position:19},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// // «var count=0»
// // Before: «count»
// // «count=count+1»
// // After: «count»


// console.log('--- 3. bulk(replace "1" with "0" at 9) ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'replace', str1:"1", str2:"0", position:9},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// // «var count=0»
// // Before: «count»
// // «count=count+2»
// // After: «count»



// console.log('--- 4. bulk(replace "2" with "1" at 19) ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'replace', str1:"2", str2:"1", position:19},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// // «var count=1»
// // Before: «count»
// // «count=count+0»
// // After: «count»