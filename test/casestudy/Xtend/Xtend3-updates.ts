import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type: "insert", str: "\n  ", position: 99 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "<html>", position: 1 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "</html>", str2: "", position: 182 } as UpdateOperation],
  "B.del": [{ type: "delete", str: "o", position: 71 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Sunny", str2: "Cloudy", position: 148 } as UpdateOperation]
};
export default updates;