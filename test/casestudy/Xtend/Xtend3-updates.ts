import { UpdateOperation } from "../../../src/fuse/Update";

// # A. Update text in template
// ## A.ins: add newline between two div marks. i.e. from "</div><div>" to "</div>\n  <div>"
//   insert "\n  " at 99
 
// ## A.del: delete the first "<html>" tag.
//   delete "<html>" at 1

// ## A.rep: 
//   replace "</html>" at 182

// # B. Update expression in template
// ## B.ins: not appliable.

// ## B.del: √
//   delete "Good Morning" at 69
// ## B.rep: 
//   replace "Sunny" with "Cloudy" at 148

let updates = {
  "A.ins": [{ type: "insert", str: "\n  ", position: 99 } as UpdateOperation],
  "A.del": [{ type: "delete", str: "<html>", position: 1 } as UpdateOperation],
  "A.rep": [{ type: "replace", str1: "</html>", str2: "", position: 182 } as UpdateOperation],
  "B.del": [{ type: "delete", str: "Good Morning", position: 69 } as UpdateOperation],
  "B.rep": [{ type: "replace", str1: "Sunny", str2: "Cloudy", position: 148 } as UpdateOperation]
};
export default updates;