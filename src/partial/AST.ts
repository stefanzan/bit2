import * as CoreAST from "../core/AST";
import {Expr, Constant, Variable, ObjectLiteral} from "../common/Exp";

export type TermNode = ConstNode | SpaceNode | DeclareNode | CoreAST.DeclareendNode | AssignNode | ExpNode
    | NopNode | SeqNode | BranchStartNode | BranchEndNode | CoreAST.SepNode | LambdaAppNode
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
    isBindingUpdated:boolean;
}


export interface AssignNode {
    type: 'assign';
    name: Variable;
    value: Binding;
    isBindingUpdated:boolean;
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
    condition: Binding;
}


export interface LambdaAppNode {
  type: 'lambda';
  variable: Variable;
  body: TermNode;
  binding: Binding;
  isBindingUpdated:boolean;
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
    body: CoreAST.Lambda;
    separator:CoreAST.SepNode;
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
export type Value = number | boolean | string | null | ObjectValue | Value[];

// object
export interface ObjectValue {
  type: 'object';
  fields: { [key: string]: any };
}