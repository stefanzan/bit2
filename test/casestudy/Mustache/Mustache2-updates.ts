import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "Will ", position: 1 } as UpdateOperation],
  "A.del": [{ type: "delete", str: ".", position: 6 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "P", str2: "p", position: 12 } as UpdateOperation]
}

export default updates;