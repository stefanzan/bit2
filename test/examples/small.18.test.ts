import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


const simpleExampleIntput2 = 
`«var paragraphs=[{head:"Hello", text:"Hello!"},{head:"Farewell", text:"Good Bye!"}]»
<html>
    <body>«var no=0»«for p in paragraphs»
        «if p.head!=""»«no=no+1»<h1>«no».«p.head»</h1>«endif»
        <p>
          «p.text»
        </p>«endfor»
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

// 将 1.HELLO 改为 1.<b>HELLO</b>, 2.FAREWELL同时改为2.<b>FAREWELL</b>
console.log('--- 2. bulk(insert "<b>" at 33, insert "</b>" at 41, insert "<b>" at 107, insert "</b>" at 118) ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'insert', str:"<b>", position:33},
    {type:'insert', str:"</b>", position:41},
    {type:'insert', str:"<b>", position:107},
    {type:'insert', str:"</b>", position:118},
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});


