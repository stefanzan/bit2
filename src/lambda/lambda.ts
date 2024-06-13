// TypeScript definitions for LambdaAST

// Type definition for commands (t)
type LambdaTermNode =
  | { type: 'const'; value: string }         // const node
  | { type: 'space'; value: string }         // space node
  | { type: 'sep'; value: string }           // separator node
  | { type: 'exp'; binding: Binding }        // expression node
  | { type: 'seq'; elements: LambdaTermNode[] }    // sequence node
  | { type: 'lambda'; param: string; body: LambdaTermNode; binding: Binding, marker: Marker}  // lambda node
  | { type: 'branchstart'; condition: Binding; trueBranch: LambdaTermNode; falseBranch: LambdaTermNode }  // branch start node
  | { type: 'branchend' }                    // branch end node
  | { type: 'loopfront'; arrayExpr: Expr; value: string }  // loop front node
  | { type: 'looprear'; arrayExpr: Expr; value: string }   // loop rear node
  | { type: 'end' }                          // end node
  | { type: 'nop' }                          // nop node
  | { type: 'bot' }                          // bot node
  | { type: 'callstart' }                    // call start node
  | { type: 'callend' };                     // call end node

// Type definition for expressions (e)
type Expr =
  | { type: 'const'; value: string }        // constant value
  | { type: 'var'; name: string }           // variable
  | { type: 'binary'; left: Expr; operator: string; right: Expr }  // binary operation
  | { type: 'unary'; operator: string; operand: Expr }              // unary operation
  | { type: 'field'; object: Expr; field: string }                  // access field in object
  | { type: 'array'; elements: Expr[] }     // array of expressions
  | { type: 'object'; fields: { [key: string]: Expr } }            // object with fields
  | { type: 'freeze'; expression: Expr };   // freeze expression

// Type definition for bindings (b)
type Binding = [Expr, any];

// Type definition for basic types (c)
type Constant = string | boolean | number;
type Value = Constant | null;

// Type definition for objects (c)
type ObjectField = { [key: string]: Constant };

// Type definition for operators (o1, o2)
export type BinaryOperator = '+' | '-' | '*' | '/' | '&&' | '||' | '>' | '<' | '>=' | '<=';
export type UnaryOperator = 'not';

// Type definition for variables (x)
type Variable = string;

// Type definition for strings (s)
type StringLiteral = string;

// Type definition for modes (m)
type Marker = 'declare' | 'assign' | 'loopitem';

