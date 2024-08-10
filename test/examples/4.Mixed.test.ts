import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";

const simpleExampleIntput = 
`«var lst=[1,2]»«var no=1»«for p in lst »«no=1+no»«no»
«endfor»`

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(simpleExampleIntput));

// console.log("=== Backward Evaluation===");

// console.log('--- 1. id ------------------');
// BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 2. bulk(replace "2" with "1" at 0, replace "3" with "2" at 2) ------------------');
// BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position: 0},
//   {type:'replace', str1:'3', str2:'2', position: 2}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// 当前的策略是更新binary exp的右侧
// 因此，如果写成no+1，就会失败
// const simpleExampleIntput2 = 
// `«var lst=[1,2]»«var no=1»«for p in lst »«no=1+no»«no»
// «endfor»`

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(simpleExampleIntput2));

// console.log("=== Backward Evaluation===");

// console.log('--- 1. bulk(replace "2" with "1" at 0, replace "3" with "2" at 2) ------------------');
// BiEval.backward(simpleExampleIntput2, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position: 0},
//   {type:'replace', str1:'3', str2:'2', position: 2}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// const simpleExampleIntput3 = 
// `«var lst=[1,2]»«var no=1»«for p in lst »«no=no+1»«no»
// «endfor»`

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(simpleExampleIntput3));

// console.log("=== Backward Evaluation===");

// console.log('--- 1. bulk(replace "2" with "1" at 0, replace "3" with "1" at 2) ------------------');
// BiEval.backward(simpleExampleIntput3, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position: 0},
//   {type:'replace', str1:'3', str2:'1', position: 2}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// const exampleInput = 
// `«var paragraphs = [{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
// <html>
//   <body>«var no = 1»«for p in paragraphs»
//     «no = 1 + no»<h1>«no».«p.head»</h1>
//     <p>«p.text»</p>«endfor»
//   </body>
// </html>`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput));

// console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 2. bulk(replace "2" with "1" at 25, replace "3" with "2" at 64) ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[
//   {type:'replace', str1:'2', str2:'1', position:25},
//   {type:'replace', str1:'3', str2:'2', position:64}
// ]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });




const exampleInput2 = 
`«var paragraphs = [{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
<html>
  <body>«var no = 1»«for p in paragraphs»
    «if p.head != ""»«no = 1 + no»<h1>«no».«p.head»</h1>«endif»
    <p>
      «p.text»
    </p>«endfor»
  </body>
</html>`;