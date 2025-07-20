import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";
// import * as BiEval from "../../dist/bit2";


const exampleInput = 
`«var lst=[{name:"Alice", data:[1,2]},{name:"Bob", data:[3,4]}]»
«for person in lst»«var data = person.data»
  «for item in data separator ","»«item»«endfor»
«endfor»`;

console.log("===Forward Evaluation===");
console.log(BiEval.forward(exampleInput));

console.log("=== Backward Evaluation===");
console.log('--- 1. id ------------------');
BiEval.backward(exampleInput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
  console.log(updatedCoreAST);
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
});