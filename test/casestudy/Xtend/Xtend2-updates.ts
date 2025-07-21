import { UpdateOperation } from "../../../src/fuse/Update";


// # A. Update text in template
// ## A.ins: add indent for text in between "<p>" and "</p>" 
//   insert "  " at 64 
//   insert "  " at 134

// ## A.del: 
//   delete "\n    " at 59
//   delete "\n    " at 122

// ## A.rep: 
//   replace "h1" with "h2" at 30
//   replace "h1" with "h2" at 43
//   replace "h1" with "h2" at 99
//   replace "h1" with "h2" at 111

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: √ 
//   delete "Greeting" at 33

// ## B.rep: change "Morning" to "morning"
//   replace "M" with "m" at 71

let updates = {
  "A.ins": [{ type: "bulk", operations: [
    { type: "insert", str: "  ", position: 64 },
    { type: "insert", str: "  ", position: 134 }
  ] } as UpdateOperation],
  "A.del": [
    {type:"bulk", operations: [
      { type: "delete", str: "\n    ", position: 59 },
      { type: "delete", str: "\n    ", position: 122 }
    ] } as UpdateOperation
  ],
  "A.rep": [
    {type:"bulk", operations: [
      { type: "replace", str1: "h1", str2: "h2", position: 30 },
      { type: "replace", str1: "h1", str2: "h2", position: 43 },
      { type: "replace",  str1: "h1", str2: "h2", position: 99 },
      { type: "replace", str1: "h1", str2: "h2", position: 111 }
    ] } as UpdateOperation
  ],
  "B.del": [{ type: "delete", str: "Greeting", position: 33 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "M", str2: "m", position: 71 } as UpdateOperation]
};
export default updates;