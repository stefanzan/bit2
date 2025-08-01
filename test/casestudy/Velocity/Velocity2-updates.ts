import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: ",", position: 29 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "\n", position: 21 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "World", str2: "Programmer", position: 39 } as UpdateOperation],
  "B.ins": [{type: 'insert', str: 's', position: 34}],
  "B.del": [{ type: "delete", str: "Velocity", position: 30 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Velocity", str2: "velocity", position: 30 } as UpdateOperation]
};
export default updates;