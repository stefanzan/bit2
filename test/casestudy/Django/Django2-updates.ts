import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins":[{type:"insert", str:".", position:28} as UpdateOperation],
  "A.del":[{type:"delete", str:"of ", position:14} as UpdateOperation],
  "A.rep":[
    {type:"replace", str1:"Number", str2:"Num", position:7} as UpdateOperation
  ] as UpdateOperation[],
  "B.del":[{type:"delete", str:"2", position:27} as UpdateOperation],
  "B.rep":[{type:"replace", str1:"2", str2:"3", position:27} as UpdateOperation]
}

export default updates;