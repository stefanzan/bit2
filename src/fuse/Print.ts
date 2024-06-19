//@ts-ignore
import { UpdateOperation } from "./Update";
// Print function
export function operationToStr(op: UpdateOperation): string {
  switch (op.type) {
    case 'insert':
      return `insert "${op.str}" at ${op.position}`;
    case 'delete':
      return `delete "${op.str}" at ${op.position}`;
    case 'replace':
      return `replace "${op.str1}" with "${op.str2}" at ${op.position}`;
    case 'bulk':
      const bulkOps = op.operations.map(operationToStr).join(', ');
      return `bulk(${bulkOps})`;
    case 'id':
      return 'id';
    default:
      throw new Error(`Unhandled operation type: ${(op as UpdateOperation).type}`);
  }
}