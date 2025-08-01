import { UpdateOperation } from "../../../src/fuse/Update";

let updates = {
  "A.ins": [{type:"bulk", operations:[{type:"insert", str:"/", position:66} as UpdateOperation,
            {type:"insert", str:"/", position:105} as UpdateOperation]} as UpdateOperation,{type: "bulk", operations:[
            {type:"insert", str:"</tr>", position:80} as UpdateOperation,
            {type:"insert", str:"</tr>", position:124} as UpdateOperation]} as UpdateOperation],
  "A.del": [{type:"bulk", operations:[{type:"delete", str:"\n", position:85} as UpdateOperation,
            {type:"delete", str:"\n", position:128} as UpdateOperation]} as UpdateOperation,{type: "bulk", operations:[
            {type:"delete", str:"\n", position:43} as UpdateOperation]} as UpdateOperation],
  "A.rep": [{type:"replace", str1:"animals", str2:"python and elephant", position:12} as UpdateOperation],
  "B.ins":[ {type:"insert", str:"us", position:103} as UpdateOperation],
  "B.del": [{type:"delete", str:"python", position:59} as UpdateOperation],
  "B.rep": [{type:"bulk", operations:[
    {type:"replace", str1:"python", str2:"Python", position:59} as UpdateOperation,
    {type:"replace", str1:"elephant", str2:"Elephant", position:95} as UpdateOperation
  ]} as UpdateOperation]
};

export default updates;
