import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: insert "Let's " before "Go"
//   insert "Let's " at 5

// ## A.del: 
//   delete "Go " at 1

// ## A.rep: replace "East" with "North"
//   replace "East" with "North" at 8

// This will not get the intended result in the template program, since branch will not change, only the const string "East" modified to "North".

// # B. Update expression in template
// ## B.ins: not appliable.
// ## B.del: 
// ## B.rep: 
let updates = {
  "A.ins": [{ type: "insert", str: "Let's ", position: 5 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "Go ", position: 1 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "East", str2: "North", position: 8 } as UpdateOperation],
};
export default updates;