import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";




const simpleExampleIntput2 = 
`«var paragraphs = [{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »<html>
  <body>«var no = 1»«for p in paragraphs»
      <h1>«no».«p.head»</h1>
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

// console.log('--- 2. insert "\n<h1>Test</h1>" at 15  ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'insert', str:"\n<h1>Test</h1>", position:15 },
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// 返回三种正确的结果

// 在<body>\n后面插入
// console.log('--- 3. insert "<h1>Test</h1>\n" at 16  ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'insert', str:"<h1>Test</h1>\n", position:16 },
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// 失败，因为<body>后面的\n是foritem的一部分

console.log('--- 4. insert " " at 28, insert " " at 88  ------------------');
BiEval.backward(simpleExampleIntput2, {
  type:'bulk',
  operations:[
    {type:'insert', str:" ", position: 28},
    {type:'insert', str:" ", position: 88},
  ]
}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});