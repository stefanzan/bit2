import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: insert "," after "equivalent"
//  insert "," at 30

// ## A.del: 
//   delete "and " at 31

// ## A.rep: 
//   replace " " with ", " at 30

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: 

// ## B.rep: 

let updates = {
  "A.ins": [{ type: "insert", str: ",", position: 30 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "and ", position: 31 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: " ", str2: ", ", position: 30 } as UpdateOperation]
};
export default updates;