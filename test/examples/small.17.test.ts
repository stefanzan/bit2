import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const simpleExampleIntput2 = 
`«var c={name:"Person", properties:[{typeName:"String", name:"name"},{typeName:"String", name:"tel"}]}»
class «c.name» {
  «var props=c.properties»«for p in props»
  public «p.typeName» «p.name»;
  «endfor»
}`

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


// console.log('--- 2. bulk(replace "public" with "private" at 21, replace "public" with "private" at 47) ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'replace', str1:"public", str2:"private", position:21},
//     {type:'replace', str1:"public", str2:"private", position:47}
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


console.log('--- 3. bulk(delete "public" at 21, insert "private" at 21, replace "public" with "private" at 47) ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'delete', str:"public", position:21},
    {type:'insert', str:"private", position:21},
    {type:'replace', str1:"public", str2:"private", position:47}
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

