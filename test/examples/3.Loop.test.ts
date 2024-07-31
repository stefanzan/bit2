import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";


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

console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput));

// console.log("=== Backward Evaluation===");
// console.log('--- 1. id ------------------');
// BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
