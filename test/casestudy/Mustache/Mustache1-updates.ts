import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "!", position: 15 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "Well,", position: 49 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "Hello", str2: "Hi", position: 4 } as UpdateOperation],
  "B.ins": [{type:"insert", str:"Girl", position:15}],
  "B.del": [{ type: "delete", str: "8", position: 58 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "1498", str2: "1495", position: 55 } as UpdateOperation]
};
export default updates;