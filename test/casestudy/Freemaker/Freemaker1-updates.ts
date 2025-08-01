import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "</p>", position: 155 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "\n", position: 111 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "Welcome", str2: "Hello", position: 25 } as UpdateOperation],
  "B.ins": [{type:"insert", str:"s", position:127}],
  "B.del": [{ type: "delete", str: "e", position: 13 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "https://www.livet.com", str2: "https://www.livet.com/landing/", position: 117 } as UpdateOperation]
};  

export default updates;