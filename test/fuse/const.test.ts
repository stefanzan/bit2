//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";

const env: Environment = {};

/**
 * const(s_c), insert
 */
console.log('===================================')
fuse(env
  , {type:'insert',str: "Hello",position:0}
  , { type:'const', value:"" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert',str: "hello",position:0}
  , { type:'const', value:" world!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert', str:' ' , position: 3}
  , { type:'const', value:"Hi!Stefan" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
fuse(env
  , {type:'insert', str:' Zan', position: 3}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'insert', str:'Zan', position: 5}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

/**
 * const(s_c), Delete
 */
console.log('===================================')
fuse(env
  , {type:'delete', str:'H', position: 0}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'Hi!', position: 0}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'Hi! Everyone', position: 0}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'s', position: 9}
  , { type:'const', value:"Hi! Everysone" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'!!', position: 12}
  , { type:'const', value:"Hi! Everyone!!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})


console.log('===================================')
fuse(env
  , {type:'delete', str:'!! Nice to meet you!', position: 12}
  , { type:'const', value:"Hi! Everyone!!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'delete', str:'Nice to meet you!', position: 14}
  , { type:'const', value:"Hi! Everyone" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

/**
 * const(s_c), replace
 */
console.log('===================================')
fuse(env
  , {type:'replace', str1:'Hi!', str2:'Hello!', position: 0}
  , { type:'const', value:"Hi! Everyone" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'replace', str1:'Hi! buddy', str2:'Hey boy!', position: 0}
  , { type:'const', value:"Hi!" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})



console.log('===================================')
fuse(env
  , {type:'replace', str1:'Morning', str2:'Afternoon', position: 9}
  , { type:'const', value:"Hi! Good Morning" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'replace', str1:'Morning Mr.Bit', str2:'Evening Mr.Bin', position: 9}
  , { type:'const', value:"Hi! Good Morning" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})

console.log('===================================')
fuse(env
  , {type:'replace', str1:'Mr.Bit', str2:'Mr.Bin', position: 20}
  , { type:'const', value:"Hi! Good Morning" }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})