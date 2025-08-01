import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "is", position: 12 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "found", position: 13 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "Mouse found", str2: "Found mouse", position: 24 } as UpdateOperation],
  "B.ins":[{type:"insert", str:"f", position:38}],
  "B.rep": [{ type: "replace", str1: "Jerry", str2: "Dear Jerry", position: 37 } as UpdateOperation]
};  

export default updates;