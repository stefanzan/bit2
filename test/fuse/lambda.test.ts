//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode,LambdaAppNode,DeclareMarker, AssignMarker } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { BranchEndNode, BranchStartNode, ExpNode, LoopFrontNode, LoopItemMarker, LoopRearNode, NopNode } from "../../src/partial/AST";

let env: Environment = {};

/**
 * Declare/Assign
 */



console.log('===================================')
// let x = 1; <x>
console.log('1. replace "1" with "2" at 0 |> \ x.x 1');
let lambdaAppDeclare: LambdaAppNode = {
  type:'lambda',
  variable: {type:'variable', name:'x'},
  body:{type:'exp', binding:[{type:'variable',name:'x'}, 1]},
  binding:[{type:'constant', value:1},1],
  isBindingUpdated:false,
  marker: {type:'declare'} as DeclareMarker
}
fuse(env
  , {type:'replace',str1: "1", str2:"2", position:0}
  , lambdaAppDeclare
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};


console.log('===================================')
// x = y+10; <x>
env['y']=[1,[1]];
console.log('2. replace "11" with "12" at 0 |> \ x.x (y+10)');
let lambdaAppAssign: LambdaAppNode = {
  type:'lambda',
  variable: {type:'variable', name:'x'},
  body:{type:'exp', binding:[{type:'variable',name:'x'}, 11]},
  binding:[{type:'binary', operator:"+", left:{type:'variable', name:'y'}, right:{type:'constant', value:10}},11],
  isBindingUpdated:false,
  marker: {type:'assign'} as AssignMarker
}
fuse(env
  , {type:'replace',str1: "11", str2:"12", position:0}
  , lambdaAppAssign
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};


console.log('===================================')
// x = 10+y; <x>
env['y']=[1,[]];
console.log('3. replace "11" with "12" at 0 |> \ x.x (10+y)');
let lambdaAppAssign2: LambdaAppNode = {
  type:'lambda',
  variable: {type:'variable', name:'x'},
  body:{type:'exp', binding:[{type:'variable',name:'x'}, 11]},
  binding:[{type:'binary', operator:"+", right:{type:'variable', name:'y'}, left:{type:'constant', value:10}}, 11],
  isBindingUpdated:false,
  marker: {type:'assign'} as AssignMarker
}
fuse(env
  , {type:'replace',str1: "11", str2:"12", position:0}
  , lambdaAppAssign2
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};


console.log('===================================')
// let x = 1; <x>
console.log('4. replace "2" with "1" at 2 |> (\\x.x (\\x.x (1+x))) 1');
let lambdaAppDeclareAssign: LambdaAppNode = {
  type:'lambda',
  variable: {type:'variable', name:'x'},
  body:{type:'seq', nodes:[
    {type:'exp', binding:[{type:'variable',name:'x'}, 1]}, 
    {type:'space', width:1},
    {type:'lambda',
      variable:{type:'variable', name:'x'},
      body:{type:'exp', binding:[{type:'variable',name:'x'}, 2]},
      binding:[{type:'binary', operator:"+", left:{type:'variable', name:'x'}, right:{type:'constant', value:1}}, 2],
      isBindingUpdated:false,
      marker: {type:'assign'} as AssignMarker
    } 
  ]},
  binding:[{type:'constant', value:1},1],
  isBindingUpdated:false,
  marker: {type:'declare'} as DeclareMarker
}
fuse(env
  , {type:'replace',str1: "2", str2:"1", position:2}
  , lambdaAppDeclareAssign
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};



console.log('===================================')
// let x = 1; <x>; x = x+1; x
console.log('5. replace "1" with "2" at 0 |> (\\x.x (\\x.x (1+x))) 1');
let lambdaAppDeclareAssign2: LambdaAppNode = {
  type:'lambda',
  variable: {type:'variable', name:'x'},
  body:{type:'seq', nodes:[
    {type:'exp', binding:[{type:'variable',name:'x'}, 1]}, 
    {type:'space', width:1},
    {type:'lambda',
      variable:{type:'variable', name:'x'},
      body:{type:'exp', binding:[{type:'variable',name:'x'}, 2]},
      binding:[{type:'binary', operator:"+", left:{type:'variable', name:'x'}, right:{type:'constant', value:1}}, 2],
      isBindingUpdated:false,
      marker: {type:'assign'} as AssignMarker
    } 
  ]},
  binding:[{type:'constant', value:1},1],
  isBindingUpdated:false,
  marker: {type:'declare'} as DeclareMarker
}
fuse(env
  , {type:'replace',str1: "1", str2:"2", position:0}
  , lambdaAppDeclareAssign2
).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};

// /**
//  * Loopitem
//  */
// console.log('==============Loopitem=====================')
// env['lst'] = [[1,2,3],[]];
// env['lst_new']=[[10],[]];

// console.log('1. replace "2" with "20" at 0 |> \ x.x 2');
// let lambdaAppLoopitem: LambdaAppNode = {
//   type:'lambda',
//   variable: {type:'variable', name:'x'},
//   body:{type:'exp', binding:[{type:'variable',name:'x'}, 2]},
//   binding:[{type:'constant', value:2},2],
//   marker: {type:'loopitem', lst:{type:'variable', name:'lst'}} as LoopItemMarker
// }
// fuse(env
//   , {type:'replace',str1: "2", str2:"20", position:0}
//   , lambdaAppLoopitem
// ).forEach(({newEnv:newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
//   console.log('------')
//   printEnvironment(newEnv);
//   printNode(newTerm);
//   console.log('U: ' + operationToStr(newOp));
// });
// env={};
