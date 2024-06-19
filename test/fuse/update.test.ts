//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";

const env: Environment = {};
const ins1 : UpdateOperation = {type:'insert',str: "hello",position:0}
const term1 : TermNode = { type:'const', value:" world!" }
console.log('===================================')
fuse(env, ins1, term1).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

const ins2: UpdateOperation = {type:'insert', str:' ', position: 3}
const term2 : TermNode = { type:'const', value:"Hi!Stefan" }
console.log('===================================')
fuse(env, ins2, term2).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});


const ins3: UpdateOperation = {type:'insert', str:' Zan', position: 3}
const term3 : TermNode = { type:'const', value:"Hi!" }
console.log('===================================')
fuse(env, ins3, term3).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
})