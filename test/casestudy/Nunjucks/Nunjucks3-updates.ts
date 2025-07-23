import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "Questions:\n", position: 1 }],
  "A.del": [{type:"bulk", operations: [
    { type: "delete", str: "?", position: 32 },
    { type: "delete", str: "?", position: 68 }
  ] }],
  "A.rep": [{type:"bulk", operations: [
    { type: "replace", str1: "did", str2: "do", position: 2 },
    { type: "replace", str1: "did", str2: "do", position: 34 }
  ]}],
  "B.del": [{ type: "delete", str: "apple", position: 20 }],
  "B.rep": [{ type: "replace", str1: "yellow", str2: "green", position: 63 }]
};
export default updates;