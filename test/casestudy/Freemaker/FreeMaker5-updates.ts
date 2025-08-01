import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [
    {
      type: "bulk",
      operations: [
        { type: "insert", str: "<b>", position: 13 } as UpdateOperation,
        { type: "insert", str: "</b>", position: 22 } as UpdateOperation,
        { type: "insert", str: "<b>", position: 39 } as UpdateOperation,
        { type: "insert", str: "</b>", position: 47 } as UpdateOperation,
        { type: "insert", str: "<b>", position: 64 } as UpdateOperation,
        { type: "insert", str: "</b>", position: 72 } as UpdateOperation,
      ],
    },
  ],
  "A.del": [
    {
      type: "bulk",
      operations: [
        { type: "delete", str: "\n", position: 6 } as UpdateOperation,
        { type: "delete", str: "\n", position: 24 } as UpdateOperation,
        { type: "delete", str: "\n", position: 41 } as UpdateOperation,
      ],
    },
  ],
  "A.rep": [
    {
      type: "bulk",
      operations: [
        {
          type: "replace",
          str1: "ul",
          str2: "ui",
          position: 2,
        } as UpdateOperation,
        {
          type: "replace",
          str1: "ul",
          str2: "ui",
          position: 64,
        } as UpdateOperation,
      ],
    },
  ],
  "B.ins":[{type:"bulk", operations:[
    {type:"insert", str:"s", position:19},
    {type:"insert", str:"s", position:38},
    {type:"insert", str:"es", position:57}
  ]} as UpdateOperation
  ],
  "B.del": [
    {
      type: "delete",
      str: "\n  <li><b>apple</b></li>\n",
      position: 25,
    } as UpdateOperation,
  ],
  "B.rep": [
    {
      type: "replace",
      str1: "banana",
      str2: "peach",
      position: 13,
    } as UpdateOperation,
  ],
};
export default updates;
