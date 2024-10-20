import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const template = 
`«var users=["Alice", "Bob", "Clark"]»
«var counter=0»
«for user in users»«counter»«counter=counter+1»
«endfor»`

console.log("===Forward Evaluation===");
console.log(BiEval.forward(template));

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


BiEval.backward(template, {
  type:'bulk',
  operations:[
    {type:'replace', str1:"0", str2:"1", position: 2},
    {type:'replace', str1:"1", str2:"2", position: 4},
    {type:'replace', str1:"2", str2:"3", position: 6},
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


