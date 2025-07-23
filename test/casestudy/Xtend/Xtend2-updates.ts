import { UpdateOperation } from "../../../src/fuse/Update";



let updates = {
  "A.ins": [{ type: "bulk", operations: [
    { type: "insert", str: "  ", position: 64 },
    { type: "insert", str: "  ", position: 134 }
  ] } as UpdateOperation],
  "A.del": [
    {type:"bulk", operations: [
      { type: "delete", str: "\n    ", position: 59 },
      { type: "delete", str: "\n    ", position: 122 }
    ] } as UpdateOperation
  ],
  "A.rep": [
    {type:"bulk", operations: [
      { type: "replace", str1: "h1", str2: "h2", position: 30 },
      { type: "replace", str1: "h1", str2: "h2", position: 43 },
      { type: "replace",  str1: "h1", str2: "h2", position: 99 },
      { type: "replace", str1: "h1", str2: "h2", position: 111 }
    ] } as UpdateOperation
  ],
  "B.del": [{ type: "delete", str: "ting", position: 38 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "M", str2: "m", position: 71 } as UpdateOperation]
};
export default updates;