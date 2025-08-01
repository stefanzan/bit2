import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: "Question List\n", position: 2 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "/", position: 31 } as UpdateOperation],
  "A.rep": [
    { type: "replace", str1: "ul", str2: "ui", position: 3 } as UpdateOperation,
    { type: "replace", str1: "ul", str2: "ui", position: 89 } as UpdateOperation
  ] as UpdateOperation[],
  "B.ins": [ {type:"insert", str:"really ", position:67}],
  "B.del": [{ type: "delete", str: "?", position: 75 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "1", str2: "0", position: 30 } as UpdateOperation]
};  

export default updates;
