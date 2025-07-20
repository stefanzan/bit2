import { UpdateOperation } from "../../../src/fuse/Update";

let updates = [
  // Text
  // Insertions
  {type:"insert", str:"  ", position: 24} as UpdateOperation, // front
  {type:"insert", str:"/", position: 9529} as UpdateOperation, // middle
  {type:"insert", str:";", position: 30294} as UpdateOperation, // end

  // Deletions
  // Replacements

  // Exp
  // Insertions
  // Deletions

  // Replacements
];

export default updates;