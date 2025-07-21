import { UpdateOperation } from "../../../src/fuse/Update";

// context:
// # A. Update text in template
// ## A.ins: insert "." at the end √
// insert "." at 13

// ## A.del: delete the last "e" in "employee"
// delete "e" at 11

// ## A.rep: Replace "employee" with "member" 
// replace "employee" with "member" at 4

// # B. Update expression in template

// ## B.ins: not appliable.

// ## B.del: delete expression total at line 3 √
// delete "3" at 2 

// ## B.rep: replace 3 by 3 √
// replace "3" with "2" at 2

// you cannot change from 3 to 2, since 3 is the computed result from list's length.

let updates = {
  "A.ins":[{type:"insert", str:".", position:13} as UpdateOperation],
  "A.del":[{type:"delete", str:"e", position:11} as UpdateOperation],
  "A.rep":[
    {type:"replace", str1:"employee", str2:"member", position:4} as UpdateOperation
  ] as UpdateOperation[],
  "B.del":[{type:"delete", str:"3", position:2} as UpdateOperation],
  "B.rep":[{type:"replace", str1:"3", str2:"2", position:2} as UpdateOperation]
}
export default updates;