//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode,LambdaAppNode,DeclareMarker, AssignMarker,SeqNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { BranchEndNode, BranchStartNode, ExpNode, LoopFrontNode, LoopItemMarker, LoopRearNode, NopNode } from "../../src/partial/AST";

let env: Environment = {};

/**
 * Declare/Assign
 */
console.log('===================================')
// hello stefan!
// seq(const("hello"), space(1), exp(name), const("!"))
// replace "stefan" with "tao" at 6
console.log('1. replace "stefan" with "tao" at 6 |> seq(const("hello"), space(1), exp(name), const("!"))');
let seq: SeqNode = {
  type:'seq',
  nodes:[
    {type:'const', value:"hello"},
    {type:'space', width:1},
    {type:'exp', binding:[{type:'variable', name:'name'},"stefan"]},
    {type:'const', value:"!"}
  ]
}
env['name']=["stefan",[]];

fuse(env
  , {type:'replace',str1: "stefan", str2:"tao", position:6}
  , seq
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};