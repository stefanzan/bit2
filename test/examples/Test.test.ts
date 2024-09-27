import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
import {promises as fs} from "fs";


fs.readFile('./test/testcases/Acceleo/Acceleo1.bit2', 'utf8')
  .then(data =>{
     console.log("===Forward Evaluation===");
     console.log(BiEval.forward(data));


// console.log("=== Backward Evaluation===");

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

// console.log('--- 2. bulk(delete "Boys" at 6, insert "Buddies" at 6) ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'delete', str:"Boyes", position:6},
//     {type:'insert', str:"Buddies", position:6},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });





  }).catch(err =>{
    console.error('Error reading file:', err);
  });



