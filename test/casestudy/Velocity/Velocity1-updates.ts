import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "<head></head>\n", position: 9 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "</html>", position: 345 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "html", str2: "HTML", position: 3 } as UpdateOperation],
  "B.del": [{ type: "delete", str: "hn", position: 30 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Water", str2: "Drink", position: 266 } as UpdateOperation]
};
export default updates;