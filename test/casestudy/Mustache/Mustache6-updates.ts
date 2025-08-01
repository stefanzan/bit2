import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "People list:\n", position: 3 } as UpdateOperation],
  "A.del": [{ type: "bulk", operations: [
    { type: "delete", str: "\n", position: 2 },
    { type: "delete", str: "\n", position: 16 }
  ] } as UpdateOperation],
  "A.rep": [ { type: "bulk", operations: [
    { type: "replace", str1: "b", str2: "p", position: 4 },
    { type: "replace", str1: "b", str2: "p", position: 13 },
    { type: "replace", str1: "b", str2: "p", position: 19 },
    { type: "replace", str1: "b", str2: "p", position: 26 }
  ] } as UpdateOperation],
  "B.ins": [ {type:"insert", str:"oo", position:23}],
  "B.del": [{ type: "delete", str: "A", position: 6 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Bob", str2: "Clark", position: 21 } as UpdateOperation]
}
export default updates;