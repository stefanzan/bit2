import {Expr} from "../common/Exp";


// Base types
export type Name = string;
export type Literal = string; // Any char sequence that does not contain « and """

// // AST Nodes
// interface Template {
//     type: 'Template';
//     name: Name;
//     parameter: Name[];
//     fragment: Fragment;
// }

export type Fragment = Literal | Directive | FragmentList;

export interface Directive {
    type: 'Directive';
    content: DeclareDirective | AssignDirective | ExprDirective | IfDirective | ForDirective;
}

export interface DeclareDirective {
    type: 'declare';
    name: Name;
    expr: Expr;
}

export interface AssignDirective {
    type: 'assign';
    name: Name;
    expr: Expr;
}

export interface ExprDirective {
    type: 'exp';
    expr: Expr;
}

export interface IfDirective {
    type: 'if';
    expr: Expr;
    thenBranch: Fragment;
    elseBranch: ElseBranch;
}

export type ElseBranch = IfDirective | Fragment | Bot

export interface Bot {
  type: 'bot';
}

export interface ForDirective {
    type: 'for';
    name: Name;
    expr: Expr;
    separator: Separator;
    front: Front;
    rear: Rear;
    fragment: Fragment;
}

export interface Separator {
  type: 'separator';
  value: string;
}

export interface Front {
  type: 'front';
  value: string;
}

export interface Rear {
  type: 'rear';
  value: string;
}

// Composite Fragment
export interface FragmentList {
    type: 'fragmentList';
    fragments: Fragment[];
}
