import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";

const simpleExampleIntput = 
`«var paragraphs =[1,2] »«var no = 0»«for p in paragraphs»«if p != 0»«no = no + 1»«no»«endif»
«endfor»`

console.log("===Forward Evaluation===");
console.log(BiEval.forward(simpleExampleIntput));

console.log("=== Backward Evaluation===");

// console.log('--- 1. id ------------------');
// BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

console.log('--- 2. insert "<!DOCTYPE html>\n" at 0 ------------------');
BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[{type:'insert', str:"<!DOCTYPE html>\n", position:0}]}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});





// const simpleExampleIntput = 
// `«var paragraphs =[{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
// <html>
//     <body>«var no = 0»«for p in paragraphs»
//       «if p.head != ""»«no = no + 1»<h1>«no».«p.head»</h1>«endif»
//         <p>
//           «p.text»
//         </p>«endfor»
//     </body>
// </html>`

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(simpleExampleIntput));

// console.log("=== Backward Evaluation===");

// // console.log('--- 1. id ------------------');
// // BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
// //   console.log(updatedCoreAST);
// //   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// // });

// console.log('--- 2. insert "<!DOCTYPE html>\n" at 1 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:"<!DOCTYPE html>\n", position:1}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });