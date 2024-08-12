import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const simpleExampleIntput2 = 
`«var age=19»
«var count=1»
«if age>=18»
  Wow! An adult! «count» 
«else»
  Hi! A little boy! «count»
«endif»
«count»`

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


console.log('--- 2. bulk(replace "1" with "3" at 20, replace "1" with "3" at 24) ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'replace', str1:"1", str2:"3", position:20},
    {type:'replace', str1:"1", str2:"3", position:24},
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});