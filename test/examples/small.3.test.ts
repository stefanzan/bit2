import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";




const simpleExampleIntput2 = 
`«var paragraphs=[{head:"Hello", text:"Hello!"},{head:"Farewell", text:"Good Bye!"}]»
<html>
  <body>
    «var no=1»
    «for p in paragraphs»
      «if p.head!=""»
        <h1>«no».«p.head»</h1>
      «endif»
        <p>
          «p.text»
        </p>
    «endfor»
  </body>
</html>`

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

console.log('--- 2. insert "<h1>Test</h1>\n" at 17  ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'insert', str:"<h1>Test</h1>\n", position:17 },
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});