import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const simpleExampleIntput2 = 
`«var count=1»
Output:«count»`

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

console.log('--- 2. replace "1" with "0" at 8 ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'replace', str1:"1", str2:"0", position:8},
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

