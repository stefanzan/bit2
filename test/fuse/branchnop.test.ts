//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { BranchEndNode, BranchStartNode, ExpNode, NopNode } from "../../src/partial/AST";

let env: Environment = {};

/**
 * insert
 */
console.log('=============Insertion======================')
console.log('1. insert "Hello " at 0 |> nop');
fuse(env
  , {type:'insert',str: "Hello ",position:0}
  , { type:'nop' } as NopNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('2. insert "Hello, " at 0 |> branchstart(age <= 18, "boy", "man")');
env['age']=[16,[]];
fuse(env
  , {type:'insert',str: "Hello, ",position:0}
  , { type:'branchstart', condition:[{type:'binary', operator:'<=', left:{type:'variable', name:'age'},right:{type:'constant', value:18}},true], trueBranch:{type:'const', value:"boy"}, falseBranch:{type:'const', value:'man'}} as BranchStartNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env={};

console.log('===================================')
console.log('3. insert "Bye!" at 0 |> branchend');
env['age']=[16,[]];
fuse(env
  , {type:'insert',str: "Bye!",position:0}
  , { type:'branchend',
      condition:[{type:'binary', operator:'<=', left:{type:'variable', name:'age'},right:{type:'constant', value:18}},true]
  } as BranchEndNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('=============Replacement======================')
console.log('4. replace "Hello" with "Hi" at 0 |> nop');
fuse(env
  , {type:'replace',str1: "Hello", str2:"Hi", position:0}
  , { type:'nop' } as NopNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('=============Deletion======================')
console.log('4. delete "Hello" at 0 |> nop');
fuse(env
  , {type:'delete',str: "Hello", position:0}
  , { type:'nop' } as NopNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});