import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
import {promises as fs} from "fs";

// Benchmarks
// 1. Acceleo
let fileName = './test/testcases/Acceleo/Acceleo1.bit2'

// 2. Django
fileName = './test/testcases/Django/Django1.bit2';
fileName = './test/testcases/Django/Django2.bit2';
fileName = './test/testcases/Django/Django3.bit2';
fileName = './test/testcases/Django/Django4.bit2';

// 3. Freemaker
fileName = './test/testcases/Freemaker/Freemaker1.bit2';
fileName = './test/testcases/Freemaker/Freemaker2.bit2';
fileName = './test/testcases/Freemaker/Freemaker3.bit2';
fileName = './test/testcases/Freemaker/Freemaker4.bit2';
fileName = './test/testcases/Freemaker/Freemaker5.bit2';
fileName = './test/testcases/Freemaker/Freemaker6.bit2';
fileName = './test/testcases/Freemaker/Freemaker7.bit2';
fileName = './test/testcases/Freemaker/Freemaker8.bit2';
fileName = './test/testcases/Freemaker/Freemaker9.bit2';

// 4. Mustache
fileName = './test/testcases/Mustache/Mustache1.bit2';
fileName = './test/testcases/Mustache/Mustache2.bit2';
fileName = './test/testcases/Mustache/Mustache3.bit2';
// fileName = './test/testcases/Mustache/Mustache4.bit2';
fileName = './test/testcases/Mustache/Mustache5.bit2';
fileName = './test/testcases/Mustache/Mustache6.bit2';
// fileName = './test/testcases/Mustache/Mustache6.bit2';

// 5. Nunjucks
fileName = './test/testcases/Nunjucks/Nunjucks1.bit2';
fileName = './test/testcases/Nunjucks/Nunjucks2.bit2';
fileName = './test/testcases/Nunjucks/Nunjucks3.bit2';
//fileName = './test/testcases/Nunjucks/Nunjucks4.bit2';
fileName = './test/testcases/Nunjucks/Nunjucks5.bit2';

// 6. Velocity
fileName = './test/testcases/Velocity/Velocity1.bit2';
fileName = './test/testcases/Velocity/Velocity2.bit2';
fileName = './test/testcases/Velocity/Velocity3.bit2';
fileName = './test/testcases/Velocity/Velocity4.bit2';
fileName = './test/testcases/Velocity/Velocity5.bit2';
fileName = './test/testcases/Velocity/Velocity6.bit2';
fileName = './test/testcases/Velocity/Velocity7.bit2';
fileName = './test/testcases/Velocity/Velocity8.bit2';
// fileName = './test/testcases/Velocity/Velocity9.bit2';
// fileName = './test/testcases/Velocity/Velocity10.bit2';
// fileName = './test/testcases/Velocity/Velocity11.bit2';
// fileName = './test/testcases/Velocity/Velocity12.bit2';

// 7. XTend 
fileName = './test/testcases/Xtend/Xtend1.bit2';
// fileName = './test/testcases/Xtend/Xtend2.bit2';
fileName = './test/testcases/Xtend/Xtend3.bit2';
fileName = './test/testcases/Xtend/Xtend4.bit2';

fileName = './test/testcases/Xtend/Xtend3.bit2';

fs.readFile(fileName, 'utf8')
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



