import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins":[{type:"bulk", operations:[
    {type:"insert", str:" ", position:18} as UpdateOperation, 
    {type:"insert", str:" ", position:23} as UpdateOperation]} as UpdateOperation],
  "A.del":[{type:"bulk", operations:[
    {type:"delete", str:",", position:17} as UpdateOperation,
    {type:"delete", str:",", position:20} as UpdateOperation]} as UpdateOperation],
  "A.rep":[{type:"bulk", operations:[
    {type:"replace", str1:",", str2:";", position:17} as UpdateOperation,
    {type:"replace", str1:",", str2:";", position:21} as UpdateOperation]} as UpdateOperation],
  "B.del":[{type:"bulk", operations:[
    {type:"delete", str:"BoB,", position:18} as UpdateOperation
  ]} as UpdateOperation],
  "B.rep":[{type:"bulk", operations:[
    {type:"replace", str1:"Alice", str2:"Ada", position:12} as UpdateOperation
  ]} as UpdateOperation],
}


export default updates;