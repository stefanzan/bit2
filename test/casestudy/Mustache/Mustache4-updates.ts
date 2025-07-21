import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "really ", position:14 } as UpdateOperation],
  "A.rep": [{type:"bulk", operations: [
    { type: "replace", str1: "b", str2: "p", position: 3 },
    { type: "replace", str1: "b", str2: "p", position: 24 }
  ] } as UpdateOperation],
  "B.del": [{ type: "delete", str: ".", position: 21 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Clark", str2: "Mark", position: 25 } as UpdateOperation]
};
export default updates;