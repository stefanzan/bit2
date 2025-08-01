import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "<!DOCTYPE html>", position: 1 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "!", position: 31 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "beloved", str2: "great", position: 89 } as UpdateOperation],
  "B.ins": [{type:"insert", str:"s", position:127}],
  "B.del": [{ type: "delete", str: "Big Joe", position: 75 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Big Joe", str2: "Joe", position: 76 } as UpdateOperation]
};  
export default updates;