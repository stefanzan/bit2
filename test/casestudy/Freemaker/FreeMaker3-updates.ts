import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "In summary,", position: 6 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "than ", position: 26 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "cheaper", str2: "less great", position: 18 } as UpdateOperation],
};  

export  default updates;