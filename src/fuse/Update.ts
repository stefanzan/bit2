// Define types for operations
export type UpdateOperation =
  | { type: 'insert'; str: string; position: number }
  | { type: 'delete'; str: string; position: number }
  | { type: 'replace'; str1: string; str2: string; position: number }
  | { type: 'bulk'; operations: UpdateOperation[] }
  | { type: 'id' };