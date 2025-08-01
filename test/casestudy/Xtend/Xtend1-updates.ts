import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{type:"bulk", operations: [
    { type: "insert", str: "<p>", position: 21 },
    { type: "insert", str: "</p>", position: 32 }
  ] } as UpdateOperation],
  "A.del": [{ type: "delete", str: "</html>", position: 40 } as UpdateOperation],
  "B.ins": [{type: 'insert', str: ' ', position: 28}],
  "A.rep": [{ type: "replace", str1: "html", str2: "HTML", position: 2 } as UpdateOperation],
  "B.del": [{ type: "delete", str: "1", position: 28 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Example1", str2: "Hello, Xtend!", position: 24 } as UpdateOperation]
}
export default updates;