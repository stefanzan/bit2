import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: change "customer" to "customers"
//   insert "s" at 20
// ## A.ins: add space after ","
//   insert " " at 29 
//   insert " " at 34

// ## A.del: change "there" to "the"
//    delete "re" at 5

// ## A.rep: change "customer" to "customers"
//   replace "customer" with "customers" at 12

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: 

// ## B.rep: 
//   replace "Mark" with "Clark" at 32

let updates = {
  "A.ins": [{type:"insert", str: "s", position: 20 } as UpdateOperation, {type:"bulk", operations: [
    { type: "insert", str: " ", position: 29 },
    { type: "insert", str: " ", position: 34 }
  ] } as UpdateOperation],
  "A.del": [{ type: "delete", str: "re", position: 5 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "customer", str2: "customers", position: 12 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Mark", str2: "Clark", position: 32 } as UpdateOperation]
};
export default updates;