import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins":[{type:"insert", str:"</p>", position:12} as UpdateOperation],
  "A.del":[{type:"bulk", operations:[
    {type:"delete", str:"and", position:36} as UpdateOperation,
    {type:"delete", str:"and", position:54} as UpdateOperation
  ]} as UpdateOperation],
  "A.rep":[{type:"replace", str1:"Fruits:", str2:"List of Fruits:", position:5} as UpdateOperation],  
  "B.del":[{type:"bulk", operations:[
    {type:"delete", str:"banana", position:24} as UpdateOperation, 
    {type:"delete", str:"\n  <li>banana</li>\nand", position:17} as UpdateOperation
  ]} as UpdateOperation],
  "B.rep":[{type:"replace", str1:"mango", str2:"strawberry", position:67} as UpdateOperation]   
}

export default updates;