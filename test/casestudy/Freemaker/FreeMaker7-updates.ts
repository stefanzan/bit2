import { UpdateOperation } from "../../../src/fuse/Update";


let updates = {
  "A.ins": [{ type:"bulk", operations:[
    { type: "insert", str: ".", position: 31 } as UpdateOperation,
    { type: "insert", str: ".", position: 90 } as UpdateOperation
  ]} as UpdateOperation],
  "A.del": [{ type:"bulk", operations:[
    { type: "delete", str: "for ", position: 17 } as UpdateOperation,
    { type: "delete", str: "for ", position: 71 } as UpdateOperation
  ]} as UpdateOperation],
  "A.rep": [{ type:"bulk", operations:[
    { type: "replace", str1: "for", str2: "is", position: 17 } as UpdateOperation,
    { type: "replace", str1: "for", str2: "is", position: 74 } as UpdateOperation
  ]} as UpdateOperation],
  "B.ins":[{type:"insert", str:"0", position:83}],
  "B.del": [{ type: "delete", str: "0", position: 24 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "1500", str2: "2000", position: 21 } as UpdateOperation] 
}

export default updates;