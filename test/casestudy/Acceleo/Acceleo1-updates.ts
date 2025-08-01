import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{ type: "insert", str: " ", position: 52 } as UpdateOperation],
  "A.del": [
    {type:"bulk", 
      operations: [{ type: "delete", str: "final", position: 119 } as UpdateOperation,
    { type: "delete", str: "final", position: 200 } as UpdateOperation]}    
  ] as UpdateOperation[],
  "A.rep": [
    { type: "replace", str1: "public", str2: "private", position: 2 } as UpdateOperation
  ] as UpdateOperation[],
  "B.ins": [
    { type: "insert", str: "s", position: 21 } as UpdateOperation
  ], 
  "B.del": [
    {type:"bulk", operations:[{ type: "delete", str: "son", position: 18 } as UpdateOperation,
    { type: "delete", str: "son", position: 30 } as UpdateOperation]}
  ] as UpdateOperation[],
  "B.rep": [
    {type:"bulk", operations:[
      { type: "replace", str1: "tel", str2: "phone",  position: 59 } as UpdateOperation,
    { type: "replace", str1: "tel", str2: "phone",  position: 103 } as UpdateOperation,
    { type: "replace", str1: "tel", str2: "phone",  position: 109 } as UpdateOperation,
    { type: "replace", str1: "tel", str2: "phone",  position: 232 } as UpdateOperation,
    { type: "replace", str1: "tel", str2: "phone",  position: 258 } as UpdateOperation,
    { type: "replace", str1: "tel", str2: "phone",  position: 284 } as UpdateOperation
    ]}
  ] as UpdateOperation[]
};  

export default updates;


