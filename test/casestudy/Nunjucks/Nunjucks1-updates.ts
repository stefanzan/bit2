import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: ".", position: 16 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "I am ", position: 5 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "hungry", str2: "starving", position: 10 } as UpdateOperation],

  // B. No updates for expressions in this case
};
export default updates;