import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: ",", position: 4 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "!", position: 10 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "Hi", str2: "Hello", position: 2 } as UpdateOperation],
  "B.ins": [{type:"insert", str:"n", position:8}],
  "B.del": [{ type: "delete", str: "Alice", position: 5 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Alice", str2: "Bob", position: 5 } as UpdateOperation]
};
export default updates;