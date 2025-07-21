import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: wrap text with p mark 
//   insert "<p>" at 21 
//   insert "</p>" at 32

// ## A.del: 
//   delete "</html>" at 40

// ## A.rep: 
//   replace "html" with "HTML" at 2

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: √
//   delete "Example1" at 21

// ## B.rep: replace "Example1" with "Hello, Xtend!"
//   replace "Example1" with "Hello, Xtend!" at 24
let updates = {
  "A.ins": [{type:"bulk", operations: [
    { type: "insert", str: "<p>", position: 21 },
    { type: "insert", str: "</p>", position: 32 }
  ] } as UpdateOperation],
  "A.del": [{ type: "delete", str: "</html>", position: 40 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "html", str2: "HTML", position: 2 } as UpdateOperation],
  "B.del": [{ type: "delete", str: "Example1", position: 21 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Example1", str2: "Hello, Xtend!", position: 24 } as UpdateOperation]
}
export default updates;