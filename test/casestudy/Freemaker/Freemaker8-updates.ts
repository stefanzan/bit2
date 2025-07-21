import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: ".", position: 41 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "This will be processed if it is large", position: 4 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "processed", str2: "handled", position: 17 } as UpdateOperation],
  
  // B section is not applicable in this case
};
export default updates;