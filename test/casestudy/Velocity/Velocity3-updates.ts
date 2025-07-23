import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "List:\n", position: 1 } as UpdateOperation],
  "A.del": [{ type: "bulk", operations: [
    { type: "delete", str: "\n", position: 8 },
    { type: "delete", str: "\n", position: 57 }
  ] } as UpdateOperation],
  "A.rep": [ { type: "bulk", operations: [
    { type: "replace", str1: "Key", str2: "key", position: 15 },
    { type: "replace", str1: "Key", str2: "key", position: 65 }]},
    { type: "bulk", operations: [ 
      { type: "replace", str1: "Value", str2: "value", position: 29 },
      { type: "replace", str1: "Value", str2: "value", position: 80 }] 
    } as UpdateOperation],
  "B.del": [{ type: "delete", str: "Fried ", position: 37 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "meal", str2: "food", position: 21 } as UpdateOperation]
};
export default updates;