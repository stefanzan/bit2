import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{type:"bulk", operations: [
    { type: "insert", str: "<b>", position: 9 },
    { type: "insert", str: "</b>", position: 17 },
    { type: "insert", str: "<b>", position: 34 },
    { type: "insert", str: "</b>", position: 42 }]} as UpdateOperation,{type:"bulk", operations: [
    { type: "insert", str: "<ul>", position: 2 },
    { type: "insert", str: "</ul>", position: 56 }]} as UpdateOperation],
  "A.del": [{ type: "bulk", operations: [
    { type: "delete", str: "\n", position: 2 },
    { type: "delete", str: "\n", position: 19 }]} as UpdateOperation],
  "A.rep": [{ type: "bulk", operations: [
    { type: "replace", str1: "li", str2: "p", position: 6 },
    { type: "replace", str1: "li", str2: "p", position: 15 },
    { type: "replace", str1: "li", str2: "p", position: 22 },
    { type: "replace", str1: "li", str2: "p", position: 31 }]} as UpdateOperation],
  "B.del": [{ type: "delete", str: "5", position: 13 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Phone", str2: "Iphone", position: 27 } as UpdateOperation]
};
export default updates;