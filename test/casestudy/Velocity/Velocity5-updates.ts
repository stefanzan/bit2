import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{type:"insert", str: "s", position: 20 } as UpdateOperation, {type:"bulk", operations: [
    { type: "insert", str: " ", position: 29 },
    { type: "insert", str: " ", position: 34 }
  ] } as UpdateOperation],
  "A.del": [{ type: "delete", str: "re", position: 5 } as UpdateOperation],
  "B.ins":[{type:"insert", str:"le", position:31}],
  "B.del": [{type:"delete", str: "Bob", position: 28 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "customer", str2: "customers", position: 12 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Mark", str2: "Clark", position: 32 } as UpdateOperation]
};
export default updates;