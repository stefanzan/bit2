import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: 
//   insert "The table is shown bellow:\n" at 2

// ## A.del: 

// ## A.rep: 
//   replace "table" with "tb" at 2
//   replace "table" with "tb" at 269

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: 

// ## B.rep: 
//   replace "Deamon" with "Demon" at 235
let updates = {
  "A.ins": [{ type: "insert", str: "The table is shown bellow:\n", position: 2 } as UpdateOperation],
  "A.rep": [{ type: "bulk", operations: [
    { type: "replace", str1: "table", str2: "tb", position: 2 },
    { type: "replace", str1: "table", str2: "tb", position: 269 }
  ] } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Deamon", str2: "Demon", position: 235 } as UpdateOperation]
};
export default updates;