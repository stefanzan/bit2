import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "B.ins":[{type:"bulk", operations:[
    {type:"insert", str:"i", position:4},
    {type:"insert", str:"y", position:11}
  ]}],
  "B.del": [{ type: "delete", str: "Joe", position: 8 } as UpdateOperation]}
export default updates;