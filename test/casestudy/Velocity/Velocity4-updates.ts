import { UpdateOperation } from "../../../src/fuse/Update";



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
  "B.del": [{ type: "delete", str: "A", position: 35 } as UpdateOperation],
  "B.rep": [{ type: "bulk", operations: [
    { type: "replace", str1: "0", str2: "1", position: 25 },
    { type: "replace", str1: "1", str2: "2", position: 71 },
    { type: "replace", str1: "2", str2: "3", position: 115 }
  ] } as UpdateOperation]
};
export default updates;
