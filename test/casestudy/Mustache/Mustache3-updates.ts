import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "List:", position: 1 } as UpdateOperation],
  "A.del": [{ type: "bulk", operations: [
    { type: "delete", str: "\n", position: 1 },
    { type: "delete", str: "\n", position: 15 }
  ] } as UpdateOperation],
  "A.rep": [ { type: "bulk", operations: [
    { type: "replace", str1: "b", str2: "p", position: 3 },
    { type: "replace", str1: "b", str2: "p", position: 12 },
    { type: "replace", str1: "b", str2: "p", position: 18 },
    { type: "replace", str1: "b", str2: "p", position: 25 }
  ] } as UpdateOperation],
  "B.del": [{ type: "delete", str: "Alice", position: 5 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Alice", str2: "Adam", position: 10 } as UpdateOperation]
}
export default updates;