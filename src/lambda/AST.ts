import * as PartilAST from "../partial/AST";
import { Variable } from "../common/Exp";

// Complete TermNode type
export type TermNode = PartilAST.ConstNode | PartilAST.SpaceNode | PartilAST.SepNode | PartilAST.ExpNode | SeqNode
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

interface DeclareMarker {
  type: 'declare';
}

interface AssignMarker {
  type: 'assign';
}



