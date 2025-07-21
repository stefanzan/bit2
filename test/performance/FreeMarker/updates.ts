import { UpdateOperation } from "../../../src/fuse/Update";

let updates = [
  // Text
  // Insertions
  {type:"insert", str:"  ", position: 24} as UpdateOperation,
  {type:"insert", str:"/", position: 9529} as UpdateOperation,
  {type:"insert", str:";", position: 29889} as UpdateOperation,

  // Deletions
  {type:"delete", str:" maximum-scale=1,", position: 113} as UpdateOperation,
  {type:"delete", str:" m-0", position: 10651} as UpdateOperation,
  {type:"delete", str:"\n    //console.log(vm);", position:29546} as UpdateOperation,

  // Replacements
  {type:"replace", str1:"1", str2:"0.8", position: 111} as UpdateOperation,
  {type:"replace", str1:"fa-times", str2:"fa-times-circle", position: 11036} as UpdateOperation, 
  {type:"replace", str1:"250", str2:"300", position:29361} as UpdateOperation,

  // Exp
  // Insertions
  {type:"insert", str:" WebAdmin", position: 248} as UpdateOperation,
  {type:"insert", str:".stu", position: 29614} as UpdateOperation,
  {type:"insert", str:"s", position: 29842} as UpdateOperation, 

  // Deletions
  {type:"delete", str:"sql转DAO,", position: 306} as UpdateOperation, 
  // {type:"bulk", operations:[
  //   {type:"delete", str:"/generator", position:815} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1098} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1161} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1218} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1279} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1344} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1465} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1570} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1701} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1835} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1906} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:1956} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2045} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2174} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2244} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2341} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2418} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:2490} as UpdateOperation,
  //   {type:"delete", str:"/generator", position:29317} as UpdateOperation,
  // ]} as UpdateOperation,
  {type:"delete", str:"formData", position: 11295} as UpdateOperation, 
  {type:"delete", str:"com.software.system", position: 29668} as UpdateOperation,

  // Replacements
  {type:"replace", str1:"ui", str2:"ul", position: 11545} as UpdateOperation,
  {type:"replace", str1:"success", str2:"Success", position: 29746} as UpdateOperation, 
  {type:"replace", str1:"error", str2:"Error", position: 29812} as UpdateOperation, 
];

export default updates;