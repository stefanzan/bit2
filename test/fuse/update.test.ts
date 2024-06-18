//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { printOperation } from "../../src/fuse/Print";

// Example usage
const operation: UpdateOperation = {
  type: "bulk",
  operations: [
    {
      type: "replace",
      str1: "1",
      str2: "0",
      position: 7,
    },
    {
      type: "replace",
      str1: "2",
      str2: "1",
      position: 16,
    }
  ],
};

console.log(printOperation(operation)); // Output: replace foo with bar at 10;
