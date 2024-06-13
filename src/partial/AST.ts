import * as CoreAST from "../core/AST";

export type TermNode = ConstNode | SpaceNode | DeclareNode | AssignNode | ExpNode
    | NopNode | SeqNode | BranchStartNode | BranchEndNode | SepNode | LoopFrontNode
    | LoopRearNode | EndNode | BotNode | CallStartNode | CallEndNode | LambdaAppNode;

export interface ConstNode {
    type: 'const';
    value: Constant;
}

export interface SpaceNode {
    type: 'space';
    width: number;
}

export interface DeclareNode {
    type: 'declare';
    name: Variable;
    value: Binding;
}

export interface AssignNode {
    type: 'assign';
    name: Variable;
    value: Binding;
}

export interface ExpNode {
    type: 'exp';
    binding: Binding;
}

export interface NopNode {
    type: 'nop';
}

export interface SeqNode {
    type: 'seq';
    nodes: TermNode[];
}

export interface BranchStartNode {
    type: 'branchstart';
    condition: Binding;
    trueBranch: CoreAST.TermNode;
    falseBranch: CoreAST.TermNode;
}

export interface BranchEndNode {
    type: 'branchend';
}

export interface SepNode {
    type: 'sep';
    value: string;
}

export interface LoopFrontNode {
    type: 'loopfront';
    lst: Expr;
    separator: string;
}

export interface LoopRearNode {
    type: 'looprear';
    lst: Expr;
    separator: string;
}

export interface EndNode {
    type: 'end';
}

export interface BotNode {
    type: 'bot';
}

export interface CallStartNode {
    type: 'callstart';
    name: string;
}

export interface CallEndNode {
    type: 'callend';
}

export interface LambdaAppNode {
    type: 'lambda';
    variable: Variable;
    body: TermNode;
    binding: Binding;
    marker: LoopItem;
}

export interface LoopItem {
    type: 'loopitem';
    lst: Expr;
}

// Expressions
export type Binding = [Expr, Value];

export type Expr = Constant | Variable | BinaryOperation | UnaryOperation
    | FieldAccess | ArrayLiteral | ObjectLiteral | FreezeExp;

export interface Constant {
    type: 'constant';
    value: number | boolean | string | null | ObjectLiteral | [];
}

export interface Variable {
    type: 'variable';
    name: string;
}

export interface BinaryOperation {
    type: 'binary';
    operator: BinaryOperator;
    left: Expr;
    right: Expr;
}

export interface UnaryOperation {
    type: 'unary';
    operator: UnaryOperator;
    operand: Expr;
}

// e.f
export interface FieldAccess {
    type: 'field';
    object: Expr;
    field: string;
}

// array
export interface ArrayLiteral {
    type: 'array';
    elements: Expr[];
}

// object
export interface ObjectLiteral {
    type: 'object';
    fields: { [key: string]: Constant };
}

export interface FreezeExp {
    type: 'freeze';
    expression: Expr;
}

// Value
export type Value = number | boolean | string | null;

// Operators
export type BinaryOperator = '+' | '-' | '*' | '/' | '&&' | '||' | '>' | '<' | '>=' | '<=' | '!=';
export type UnaryOperator = 'not';
