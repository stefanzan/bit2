import * as CoreAST from "../core/AST";
import {Expr, Constant, Variable, ObjectLiteral} from "../common/Exp";

export type TermNode = ConstNode | SpaceNode | DeclareNode | AssignNode | ExpNode
    | NopNode | SeqNode | BranchStartNode | BranchEndNode | SepNode | LambdaAppNode
    | LoopFrontNode | LoopRearNode | EndNode | BotNode | CallStartNode | CallEndNode;

export interface ConstNode {
    type: 'const';
    value: string;
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

export interface LambdaAppNode {
  type: 'lambda';
  variable: Variable;
  body: TermNode;
  binding: Binding;
  marker: Marker;
}

export type Marker = LoopItemMarker;

// Marker types
export interface LoopItemMarker {
  type: 'loopitem';
  lst: Expr;
}

export interface LoopFrontNode {
    type: 'loopfront';
    lst: Expr;
    value: string;
}

export interface LoopRearNode {
    type: 'looprear';
    lst: Expr;
    value: string;
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

// Expressions
export type Binding = [Expr, Value];

// Value
export type Value = number | boolean | string | null | ObjectValue | [];

// object
export interface ObjectValue {
  type: 'object';
  fields: { [key: string]: any };
}