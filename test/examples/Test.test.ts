import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
import {promises as fs} from "fs";
import { UpdateOperation } from "../../src/fuse/Update";

// Benchmarks
// 1. Acceleo
// let fileName = './test/casestudy/Acceleo/generate.bit2'

// 2. Django
// fileName = './test/casestudy/Django/Django1.bit2';
// fileName = './test/casestudy/Django/Django2.bit2';
// fileName = './test/casestudy/Django/Django3.bit2';
// fileName = './test/casestudy/Django/Django4.bit2';

// 3. Freemaker
// fileName = './test/casestudy/Freemaker/Freemaker1.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker2.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker3.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker4.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker5.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker6.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker7.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker8.bit2';
// fileName = './test/casestudy/Freemaker/Freemaker9.bit2';

// 4. Mustache
// fileName = './test/casestudy/Mustache/Mustache1.bit2';
// fileName = './test/casestudy/Mustache/Mustache2.bit2';
// fileName = './test/casestudy/Mustache/Mustache3.bit2';
// // fileName = './test/casestudy/Mustache/Mustache4.bit2';
// fileName = './test/casestudy/Mustache/Mustache5.bit2';
// fileName = './test/casestudy/Mustache/Mustache6.bit2';
// fileName = './test/casestudy/Mustache/Mustache6.bit2';

// 5. Nunjucks
// fileName = './test/casestudy/Nunjucks/Nunjucks1.bit2';
// fileName = './test/casestudy/Nunjucks/Nunjucks2.bit2';
// fileName = './test/casestudy/Nunjucks/Nunjucks3.bit2';
// //fileName = './test/casestudy/Nunjucks/Nunjucks4.bit2';
// fileName = './test/casestudy/Nunjucks/Nunjucks5.bit2';

// 6. Velocity
// fileName = './test/casestudy/Velocity/Velocity1.bit2';
// fileName = './test/casestudy/Velocity/Velocity2.bit2';
// fileName = './test/casestudy/Velocity/Velocity3.bit2';
// fileName = './test/casestudy/Velocity/Velocity4.bit2';
// fileName = './test/casestudy/Velocity/Velocity5.bit2';
// fileName = './test/casestudy/Velocity/Velocity6.bit2';
// fileName = './test/casestudy/Velocity/Velocity7.bit2';
// fileName = './test/casestudy/Velocity/Velocity8.bit2';
// fileName = './test/casestudy/Velocity/Velocity9.bit2';
// fileName = './test/casestudy/Velocity/Velocity10.bit2';
// fileName = './test/casestudy/Velocity/Velocity11.bit2';
// fileName = './test/casestudy/Velocity/Velocity12.bit2';

// 7. XTend 
// fileName = './test/casestudy/Xtend/Xtend1.bit2';
// // fileName = './test/casestudy/Xtend/Xtend2.bit2';
// fileName = './test/casestudy/Xtend/Xtend3.bit2';
// fileName = './test/casestudy/Xtend/Xtend4.bit2';

// Test 
let fileName = './test/casestudy/Django/Django3.bit2';

fs.readFile(fileName, 'utf8')
  .then(data =>{
     console.log("===Forward Evaluation===");
     console.log(BiEval.forward(data));

    console.log("=== Backward Evaluation===");
    BiEval.backward(data, 
    {
      "type": "bulk",
      "operations": [
        {type:"delete", str:"Bob,", position:18}
    ]}
).forEach(updatedCoreAST => {
    console.log(updatedCoreAST);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
  });




  }).catch(err =>{
    console.error('Error reading file:', err);
  });



