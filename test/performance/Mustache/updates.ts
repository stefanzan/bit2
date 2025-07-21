import { UpdateOperation } from "../../../src/fuse/Update";

let updates: UpdateOperation[] = [
  // Text
  // Insertions
  {type:"insert", str:" >=", position:423} as UpdateOperation,
  {type:"insert", str:".", position:2059} as UpdateOperation,
  {type:"insert", str:" Information", position:32012} as UpdateOperation,

  // Deletions
  {type:"delete", str:".", position:414} as UpdateOperation,
  {type:"delete", str:" Endpoint", position:1993} as UpdateOperation,
  {type:"delete", str:"## Documentation For Authorization", position:31860} as UpdateOperation,
  
  // Replacements
  {type:"replace", str1:":", str2:".", position:163} as UpdateOperation,
  {type:"replace", str1:"Documentation", str2:"Docs", position:11711} as UpdateOperation,
  {type:"replace", str1:"key", str2:"Key", position:31938} as UpdateOperation,


  // Exp
  // Insertions
  {type:"insert", str:"ful", position:45} as UpdateOperation,
  {type:"insert", str:"s", position:2175} as UpdateOperation,
  {type:"insert", str:"s", position:31684} as UpdateOperation,

  // Deletions
  {type:"delete", str:"codegen.", position:253} as UpdateOperation,
  {type:"delete", str:" (Partial)", position:10534} as UpdateOperation,
  {type:"delete", str:"d", position:30713} as UpdateOperation,

  // Replacements
  {type:"replace", str1:"SDK", str2:"sdk", position:24} as UpdateOperation,
  {type:"replace", str1:"get_incident_request_status", str2:"get_request_status_of_incident", position:11314} as UpdateOperation,
  {type:"bulk", operations:[
    {type:"replace", str1:"Authorization", str2:"token", position:1388} as UpdateOperation,
    {type:"replace", str1:"Authorization", str2:"token", position:31952} as UpdateOperation
  ]} as UpdateOperation, 
  
];

export default updates;