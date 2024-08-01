import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
// import * as BiEval from "../../dist/bit2";

// export const loopExample: TermNode = {
//   type:'seq',
//   nodes: [
//     {
//       type:'declare', name:{type:'variable', name:'lst'}, 
//       value:{type:'array',elements:[
//         { type: 'object', fields: { head: {type:"constant", value: "Hello"}, text: {type:"constant", value: "Hello!" } } },
//         { type: 'object', fields: { head: {type:"constant", value: "Farewell"}, text: {type:"constant", value: "Good Bye!"} } }
//       ]}
//     },
//     {
//       type:'loop',
//       lst:{type:'variable', name:'lst'},
//       separator: {type:'sep', value:','},
//       front:{type:'front', value:'['},
//       rear:{type:'rear', value:']'},
//       body:{type:'lambda', variable:{type:'variable', name:'item'}, 
//             body: {
//               type:'seq',
//               nodes:[
//                 {type:'exp', expression:{type:'field', object:{type:'variable', name:'item'}, field:'head'}},
//                 {type: 'const', value: ":"},
//                 {type:'exp', expression:{type:'field', object:{type:'variable', name:'item'}, field:'text'}},
//               ]}
//             }
//     },
//     {type:'end'}
//   ]
// }
// console.log(CorePretty.printToSurface(loopExample));

const exampleInput = 
`«var lst=[1,2,3]»
«for item in lst separator "," front "[" rear "]"»«item»«endfor»`;

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(exampleInput));

// console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 2. delete "1," at 2 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'1,', position:2}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// console.log('--- 3. delete "2," at 4 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'2,', position:4}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 4. delete "[1,2,3]" at 1 ------------------');
// BiEval.backward(exampleInput, {type:'delete', str:'[1,2,3]', position:1}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

const exampleInput2 = 
`«var lst=[3]»
«for item in lst separator "," front "[" rear "]"»«item»«endfor»`
console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput2));
console.log("=== Backward Evaluation===");
console.log('--- 5. delete "3" at 2 ------------------');
BiEval.backward(exampleInput2, {type:'bulk', operations:[{type:'delete', str:'3', position:2}]}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});

// const exampleInput3 = 
// `«var lst=[{head:"Modeling", text:"UML"},{head:"Programming", text:"Java"}]»
// «for item in lst»
// <h1>«p.head»</h1>
// <p>«p.text»</p>
// «endfor»`;