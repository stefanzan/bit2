import * as PartilAST from "../partial/AST";
import { Variable } from "../common/Exp";
import * as CoreAST from "../core/AST";
// Complete TermNode type
export type TermNode = PartilAST.ConstNode | PartilAST.SpaceNode | CoreAST.DeclareendNode | CoreAST.SepNode | PartilAST.ExpNode | SeqNode
  | LambdaAppNode | PartilAST.BranchStartNode | PartilAST.BranchEndNode
  | PartilAST.LoopFrontNode | PartilAST.LoopRearNode | PartilAST.EndNode
  | PartilAST.NopNode | PartilAST.BotNode | PartilAST.CallStartNode | PartilAST.CallEndNode;


export interface SeqNode {
  type: 'seq';
  nodes: TermNode[];
}

export interface LambdaAppNode {
  type: 'lambda';
  variable: Variable;
  body: TermNode;
  binding: PartilAST.Binding;
  marker: Marker;
}

type Marker = PartilAST.LoopItemMarker | DeclareMarker | AssignMarker;

export interface DeclareMarker {
  type: 'declare';
}

export interface AssignMarker {
  type: 'assign';
}



