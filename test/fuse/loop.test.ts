//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { BranchEndNode, BranchStartNode, ExpNode, LoopFrontNode, LoopRearNode, NopNode } from "../../src/partial/AST";

let env: Environment = {};

/**
 * insert
 */
console.log('=============Insertion======================')
console.log('1. insert "Hello " at 0 |> loopfront(lst,"[")');
env['lst']=[[1,2,3],[]];
fuse(env
  , {type:'insert',str: "Hello ",position:0}
  , { type:'loopfront', value:'[', lst:{type:'variable', name:'lst'}} as LoopFrontNode
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};

console.log('===================================')
console.log('2. insert "Hello " at 10 |> loopfront(lst,"[")');
env['lst']=[[1,2,3],[]];
fuse(env
  , {type:'insert',str: "Hello ",position:10}
  , { type:'loopfront', value:'[', lst:{type:'variable', name:'lst'}} as LoopFrontNode
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};

console.log('3. insert "Hello " at 10 |> looprear(lst,"]")');
env['lst']=[[1,2,3],[]];
env['lst_new']=[[10,20,30],[10,20,30]];
fuse(env
  , {type:'insert',str: "Hello ",position:10}
  , { type:'looprear', value:']', lst:{type:'variable', name:'lst'}} as LoopRearNode
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

