//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode,LambdaAppNode,DeclareMarker, AssignMarker,SeqNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { BranchEndNode, BranchStartNode, ExpNode, LoopFrontNode, LoopItemMarker, LoopRearNode, NopNode } from "../../src/partial/AST";

let env: Environment = {};


// console.log('===================================')
// // hello stefan!
// // seq(const("hello"), space(1), exp(name), const("!"))
// // replace "stefan" with "tao" at 6
// console.log('1. replace "stefan" with "tao" at 6 |> seq(const("hello"), space(1), exp(name), const("!"))');
// let seq: SeqNode = {
//   type:'seq',
//   nodes:[
//     {type:'const', value:"hello"},
//     {type:'space', width:1},
//     {type:'exp', binding:[{type:'variable', name:'name'},"stefan"]},
//     {type:'const', value:"!"}
//   ]
// }
// env['name']=["stefan",[]];

// fuse(env
//   , {type:'replace',str1: "stefan", str2:"tao", position:6}
//   , seq
// ).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
//   console.log('------')
//   printEnvironment(newEnv);
//   printNode(newTerm);
//   console.log('U: ' + operationToStr(newOp));
// });
// env={};


console.log('===================================')
console.log('2. insert " " at 1 |> seq(declare(no, 1), exp(no), assign(no, no+1), exp(no))');
let seq2: SeqNode = {
  type:'seq',
  nodes:[
    {
      type:'lambda',
      variable: {type:'variable', name:'no'},
      body:{type:'seq', nodes:[
        {type:'exp', binding:[{type:'variable', name:'no'}, 1]},
        {
          type:'lambda',
          variable: {type:'variable', name:'no'},
          body:{type:'seq', nodes:[
            {type:'exp', binding:[{type:'variable', name:'no'}, 2]},
          ]},
          binding:[{type:'binary', operator:"+", left:{type:'variable', name:'no'}, right:{type:'constant', value:1}}, 2],
          isBindingUpdated:false,
          marker: {type:'assign'} as AssignMarker
        }
      ]},
      binding:[{type:'constant', value:1}, 1],
      isBindingUpdated:false,
      marker: {type:'declare'} as DeclareMarker
    }
  ]
}

fuse(env
  , {type:'insert',str: " ", position:1}
  , seq2
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};