//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";

const env: Environment = {};

/**
 * space(n), insert
 */
console.log('===================================')
fuse(env
  , {type:'insert',str: "Hello",position:0}
  , { type:'space', width:2 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert',str: "    ",position:0}
  , { type:'space', width:2 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert', str:'   ', position: 3}
  , { type:'space', width:5 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert', str:'  ', position: 3}
  , { type:'space', width:3 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'insert', str:'Zan', position: 5}
  , { type:'space', width:3 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

/**
 * space(n), Delete
 */
console.log('==============Space(n), Deletion=====================')
fuse(env
  , {type:'delete', str:' ', position: 0}
  , { type:'space', width:3 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'   ', position: 0}
  , { type:'space', width:3 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'   Everyone', position: 0}
  , { type:'space', width:3 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:' ', position: 5}
  , { type:'space', width:8 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'  ', position: 2}
  , { type:'space', width:4 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})


console.log('===================================')
fuse(env
  , {type:'delete', str:'  Nice to meet you!', position: 2}
  , { type:'space', width:4 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'Nice to meet you!', position: 14}
  , { type:'space', width:4 }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})