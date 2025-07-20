import { UpdateOperation } from "../../../src/fuse/Update";

let updates = [
  // Text
  // Insertions
  {type:"insert", str:"\n    <p>Welcome to Sentry</p>", position: 126} as UpdateOperation, // front
  {type:"insert", str:" Account", position: 2785} as UpdateOperation, // middle
  {type:"insert", str:"-large", position: 6374} as UpdateOperation, // end

  // Deletions
  {type:"delete", str:" to continue", position: 197} as UpdateOperation, // front
  {type:"bulk", operations: [
    {type:"delete", str:"textinput ", position:1358}, 
    {type:"delete", str:"textinput ", position:1821}
  ]} as UpdateOperation, // middle
  {type:"delete", str:"/", position: 6244} as UpdateOperation, // end

  // Replacements
  {type:"replace", str1:"Sign In", str2:"Login", position: 332} as UpdateOperation, // front
  {type:"replace", str1:"Lost", str2:"Forget", position: 2139} as UpdateOperation, // middle
  {type:"bulk", operations: [
    {type:"replace", str1:"label", str2:"p", position: 4787},
    {type:"replace", str1:"label", str2:"p", position: 5023},
    {type:"replace", str1:"label", str2:"p", position: 5054},
    {type:"replace", str1:"label", str2:"p", position: 5290},
  ]} as UpdateOperation, // end

  // Exp
  // Insertions
  {type:"insert", str:"th", position: 120} as UpdateOperation, // front
  {type:"bulk", operations: [
    {type:"insert", str:"label_", position: 1102},
    {type:"insert", str:"label_", position: 1581}
  ]} as UpdateOperation, // middle
  {type:"insert", str:"Sentry ", position: 5251} as UpdateOperation, // end

  // Deletions
  {type:"delete", str:" to", position: 65} as UpdateOperation, // front
  {type:"bulk", operations: [
    {type:"delete", str:"/", position: 2388},
    {type:"delete", str:"/", position: 2677},
    {type:"delete", str:"/", position: 2962},
  ]} as UpdateOperation, // middle
  {type:"delete", str:" via email", position: 4992} as UpdateOperation, // end
 
  // Replacements
  {type:"bulk", operations: [
    {type:"replace", str1:"div_id_username", str2:"div_username_id", position: 1034},
    {type:"replace", str1:"div_id_password", str2:"div_password_id", position: 1507},
  ]} as UpdateOperation, // front
  {type:"replace", str1:"/account/recover/", str2:"/password/forget/", position: 2120} as UpdateOperation, // middle
  {type:"bulk", operations: [
    {type:"replace", str1:"sentry.io", str2:"data.sentry.io", position: 6164},
    {type:"replace", str1:"sentry.io", str2:"data.sentry.io", position: 6240},
  ]} as UpdateOperation, // end
];

export default updates;