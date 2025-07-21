import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: √
//   insert "\nWe have customers listed." at 156

// ## A.del: delete newlines of list items
//   delete "\n" at 12
//   delete "\n" at 57
//   delete "\n" at 100

// ## A.rep: 
//   replace "table" with "tb" at 3
//   replace "table" with "tb" at 147

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: √
//   delete "Alice" at 35

// ## B.rep: change number from 0,1,2 to 1,2,3
//   replace "0" with "1" at 25, 
//   replace "1" with "2" at 71, 
//   replace "2" with "3" at 115

let updates = {
  "A.ins": [{ type: "insert", str: "\nWe have customers listed.", position: 156 } as UpdateOperation],
  "A.del": [{ type: "bulk", operations: [
    { type: "delete", str: "\n", position: 12 },
    { type: "delete", str: "\n", position: 57 },
    { type: "delete", str: "\n", position: 100 }
  ] } as UpdateOperation],
  "A.rep": [{ type: "bulk", operations: [
    { type: "replace", str1: "table", str2: "tb", position: 3 },
    { type: "replace", str1: "table", str2: "tb", position: 147 }
  ] } as UpdateOperation],
  "B.del": [{ type: "delete", str: "Alice", position: 35 } as UpdateOperation],
  "B.rep": [{ type: "bulk", operations: [
    { type: "replace", str1: "0", str2: "1", position: 25 },
    { type: "replace", str1: "1", str2: "2", position: 71 },
    { type: "replace", str1: "2", str2: "3", position: 115 }
  ] } as UpdateOperation]
};
export default updates;
