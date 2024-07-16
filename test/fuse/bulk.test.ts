//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";

const env: Environment = {};

/**
 * 
 */
console.log('===================================')
console.log('1. bulk(insert " " at 6, insert "world" at 7) |> const("Hello")');
let bulkOp = {
  type:'bulk',
  operations:[
    {type:'insert', str:" ", position:6},
    {type:'insert', str:"world", position:7}
  ]
} as UpdateOperation;
fuse(env
  , bulkOp
  , { type:'const', value:'Hello' }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});



console.log('===================================')
console.log('2. bulk(insert "_" at 5, insert "world" at 6) |> const("Hello")');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'insert', str:"_", position:5},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , { type:'const', value:'Hello' }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});


console.log('===================================')
console.log('3. bulk(replace "wwo " with "llo " at 2, insert "world" at 6) |> const("Hello")');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'replace', str1:"wwo ", str2:"llo ", position:2},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , { type:'const', value:'Hewwo' }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});


console.log('===================================')
console.log('4. bulk(id, insert "world" at 6) |> const("Hello")');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'id'},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , { type:'const', value:'Hello' }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});


console.log('===================================')
console.log('5. bulk(replace "wwo " with "llo " at 2, insert "world" at 6) |> seq(const("Hello"))');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'replace', str1:"wwo ", str2:"llo ", position:2},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , {
    type:'seq',
    nodes:[{type:'const', value:'Hewwo' }]
  }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('6. bulk(replace "wwo " with "llo " at 2, insert "world" at 6) |> seq(const("Hello"),space(1))');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'replace', str1:"wwo ", str2:"llo ", position:2},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , {
    type:'seq',
    nodes:[{type:'const', value:'Hewwo' }, {type:'space', width:1}]
  }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('7. bulk(replace "wwo " with "llo " at 2, insert "world" at 6) |> seq(const("Hello"),space(1), const("!"))');
fuse(env
  , {
    type:'bulk',
    operations:[
      {type:'replace', str1:"wwo ", str2:"llo ", position:2},
      {type:'insert', str:"world", position:6}
    ]
  } as UpdateOperation
  , {
    type:'seq',
    nodes:[{type:'const', value:'Hewwo' }, {type:'space', width:1},{type:'const', value:'!'}]
  }
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
