//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { TermNode } from "../../src/lambda/AST";
import { printNode } from "../../src/lambda/Print";
import { ExpNode } from "../../src/partial/AST";

let env: Environment = {};

/**
 * insert
 */
console.log('=============Insertion======================')
console.log('1. insert "Hello " at 0 |> exp(const("world!"))');
fuse(env
  , {type:'insert',str: "Hello ",position:0}
  , { type:'exp', binding:[{type:'constant', value:"world!"},"world!"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('2. insert "Hello " at 0 |> exp(const(17))');
fuse(env
  , {type:'insert',str: "Hello ",position:0}
  , { type:'exp', binding:[{type:'constant', value:17}, 17] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('3. insert "Hello " at 0 |> exp(const(true))');
fuse(env
  , {type:'insert',str: "Hello ",position:0}
  , { type:'exp', binding:[{type:'constant', value:true}, true] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('4. insert " " at 5 |> exp(const("Helloworld!"))');
fuse(env
  , {type:'insert',str: " ",position:5}
  , { type:'exp', binding:[{type:'constant', value:"Helloworld"}, "Helloworld"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('4. insert "0" at 1 |> exp(const(15))');
fuse(env
  , {type:'insert',str: "0",position: 1}
  , { type:'exp', binding:[{type:'constant', value:15}, 15] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('4. insert "0" at 2 |> exp(const(15))');
fuse(env
  , {type:'insert',str: "0",position: 2}
  , { type:'exp', binding:[{type:'constant', value:15}, 15] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('4. insert "!" at 2 |> exp(const("Hi"))');
fuse(env
  , {type:'insert',str: "!",position: 2}
  , { type:'exp', binding:[{type:'constant', value:"Hi"}, "Hi"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('===================================')
console.log('4. insert "Mr.You" at 2 |> exp(const("Hi!"))');
fuse(env
  , {type:'insert',str: "Mr.You",position: 4}
  , { type:'exp', binding:[{type:'constant', value:"Hi!"}, "Hi!"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

/**
 * replace
 */
console.log('=============Replacement======================')
console.log('1. replace "Hello" with "Hi" at 0 |> exp(const("Hello"))');
fuse(env
  , {type:'replace',str1: "Hello", str2:"Hi", position:0}
  , { type:'exp', binding:[{type:'constant', value:"Hello"}, "Hello"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('2. replace "Hello" with "Hi" at 0 |> exp(const("Hello, Mr.Bin")');
fuse(env
  , {type:'replace',str1: "Hello", str2:"Hi", position:0}
  , { type:'exp', binding:[{type:'constant', value:"Hello, Mr.Bin"}, "Hello, Mr.Bin"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('3. replace "you" with "they" at 0 |> exp(const("how are")');
fuse(env
  , {type:'replace',str1: "you", str2:"they", position:8}
  , { type:'exp', binding:[{type:'constant', value:"how are"}, "how are"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('4. replace "fine" with "nice" at 0 |> exp(x)');
env['x']=[17,[]];
fuse(env
  , {type:'replace',str1: "fine", str2:"nice", position:3}
  , { type:'exp', binding:[{type:'variable', name:"x"}, 17] } as ExpNode
).forEach(({newEnv: newEnv, newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  console.log(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
// reset env
env = {};

/**
 * Delete
 */
console.log('=============Deletion======================')
console.log('1. delete "Hello " at 0 |> exp(const("Hello Mr.Bin"))');
fuse(env
  , {type:'delete',str: "Hello ", position:0}
  , { type:'exp', binding:[{type:'constant', value:"Hello Mr.Bin"}, "Hello Mr.Bin"] } as ExpNode
).forEach(({newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});

console.log('2. delete "Hello " at 0 |> exp(x)');
env['x']=["Hello Mr.Bin",[]];
fuse(env
  , {type:'delete',str: "Hello ", position:0}
  , { type:'exp', binding:[{type:'variable', name:"x"}, "Hello Mr.Bin"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  console.log(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};



console.log('3. delete "Hello " at 0 |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello Mr.Bin", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'delete',str: "Hello ", position:0}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello Mr.Bin"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};

console.log('4. delete "Hello" at 0 |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'delete',str: "Hello", position:0}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};


console.log('5. delete "Hello" at 0 |> exp(greeting)');
env['greeting']=["Hello",[]];
fuse(env
  , {type:'delete',str: "Hello", position:0}
  , {type:'exp', binding:[{type:'variable', name:'greeting'}, "Hello"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};

console.log('6. delete "15" at 0 |> exp(age)');
env['age']=[15,[]];
fuse(env
  , {type:'delete',str: "15", position:0}
  , {type:'exp', binding:[{type:'variable', name:'age'}, 15] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};



console.log('7. delete "Hello Mr.Bin" at 0 |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'delete',str: "Hello Mr.Bin", position:0}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};


console.log('8. delete "Mr." at 6 |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello Mr.Bin", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'delete',str: "Mr.", position:6}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello Mr.Bin"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};

console.log('9. delete "1" at 1 |> exp(age)');
env['age']=[115,[]];
fuse(env
  , {type:'delete',str: "1", position:1}
  , {type:'exp', binding:[{type:'variable', name:'age'}, 115] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};



console.log('10. delete "Mr.Bin" at 6 |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello Mr.", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'delete',str: "Mr.Bin", position:6}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello Mr."] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};


console.log('11. delete "15 Hello" at 1 |> exp(age)');
env['age']=[115,[]];
fuse(env
  , {type:'delete',str: "15 Hello", position:1}
  , {type:'exp', binding:[{type:'variable', name:'age'}, 115] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};


console.log('12. delete "Hello" at 5 |> exp(age)');
env['age']=[115,[]];
fuse(env
  , {type:'delete',str: "Hello", position:5}
  , {type:'exp', binding:[{type:'variable', name:'age'}, 115] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};



console.log('13. id |> exp(x.greeting)');
env['x']=[{type:'object', fields:{greeting:"Hello Mr.Bin", age:18} },[{type:'object', fields:{greeting:[], age:[]}}]];
fuse(env
  , {type:'id'}
  , {type:'exp', binding:[{type:'field', field:'greeting', object:{type:"variable", name:"x"}}, "Hello Mr.Bin"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};



console.log('14. id |> exp(greeting)');
env['greeting']=["Hello",[]];
fuse(env
  , {type:'id'}
  , {type:'exp', binding:[{type:'variable', name:'greeting'}, "Hello"] } as ExpNode
).forEach(({newEnv:newEnv,newTermNode: newTerm, remainingOperation: newOp}) => {
  console.log('------')
  printEnvironment(newEnv);
  printNode(newTerm);
  console.log('U: ' + operationToStr(newOp));
});
env = {};