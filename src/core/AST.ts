import {Expr, Constant, Variable, BinaryOperation, UnaryOperation, FieldAccess, ArrayLiteral, FreezeExp, ObjectLiteral, FunctionCall, BinaryOperator, UnaryOperator} from "../common/Exp";

export type TermNode = ConstNode | SpaceNode | DeclareNode | AssignNode 
    | ExpNode | SeqNode | IfThenElseNode 
    | LoopNode 
    | CallNode | NopNode | BotNode | EndNode;

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
    value: Expr;
}

export interface AssignNode {
    type: 'assign';
    name: Variable;
    value: Expr;
}

export interface ExpNode {
    type: 'exp';
    expression: Expr;
}

export interface SeqNode {
    type: 'seq';
    nodes: TermNode[];
}

export interface IfThenElseNode {
    type: 'ite';
    condition: Expr;
    trueBranch: TermNode;
    falseBranch: TermNode;
}

export interface LoopNode {
    type: 'loop';
    lst: Expr;
    separator: SepNode;
    front: FrontNode;
    rear: RearNode;
    body: Lambda;
}



export interface NopNode {
    type: 'nop';
}

export interface BotNode {
    type: 'bot';
}

export interface EndNode {
    type: 'end';
}

export interface SepNode {
  type: 'sep';
  value: string;
}

export interface FrontNode {
  type: 'front';
  value: string;
}

export interface RearNode {
  type: 'rear';
  value: string;
}

export interface Lambda {
  type: 'lambda';
  variable: Variable;
  body: TermNode;
}

export interface CallNode {
  type: 'call';
  func: TermNode;
  args: { [key: string]: Expr };
}



export function seq(...nodes: TermNode[]): SeqNode {
  return { type: 'seq', nodes };
}

export function constNode(value: string): ConstNode {
  return { type: 'const', value:{type:'constant', value:value} };
}

export function space(width: number): SpaceNode {
  return { type: 'space', width };
}

export function declare(name: Variable, value: Expr): DeclareNode {
  return { type: 'declare', name, value };
}

export function exp(expression: Expr): ExpNode {
  return { type: 'exp', expression };
}

export function loop(lst: Expr, sep: SepNode, front: FrontNode, rear: RearNode, body: Lambda): LoopNode {
  return { type: 'loop', lst, separator: sep, front, rear, body };
}

export function ite(condition: Expr, trueBranch: TermNode, falseBranch: TermNode): IfThenElseNode {
  return { type: 'ite', condition, trueBranch, falseBranch };
}

export function assign(name: Variable, value: Expr): AssignNode {
  return { type: 'assign', name, value };
}

export function nop(): NopNode {
  return { type: 'nop' };
}

export function bot(): BotNode {
  return { type: 'bot' };
}

export function end(): EndNode {
  return { type: 'end' };
}
