import * as PartialAST from "../partial/AST";
import * as CoreAST from "../core/AST";
import * as LambdaAST from "../lambda/AST";
import * as Exp from "../common/Exp";

export function lambdalize(partialAST: PartialAST.TermNode) : LambdaAST.TermNode {
  let nodeType = partialAST.type;
  if(nodeType === 'seq'){
    let seqNode = partialAST as PartialAST.SeqNode;
    return lambdalizeSeq(seqNode);
  } else if (nodeType === "declare" || nodeType === 'assign') {
    throw new Error("declare|assign node shall not be visible here.");
  } else if (nodeType === 'lambda') {
    let lambdaAppNode = partialAST as PartialAST.LambdaAppNode;
    let body = lambdaAppNode.body;
    let translatedBody = lambdalize(body);
    let newLambdaAppNode : LambdaAST.LambdaAppNode = {
      type: 'lambda',
      variable: lambdaAppNode.variable,
      body: translatedBody,
      binding: lambdaAppNode.binding,
      marker: lambdaAppNode.marker
    };
    return newLambdaAppNode;
  } else {
    // @ts-ignore
    return partialAST;
  }
}


function lambdalizeSeq(seqNode: PartialAST.SeqNode): LambdaAST.SeqNode {
  let nodes = seqNode.nodes;
  let newNodes: LambdaAST.TermNode[] = [];

  for (let i = 0; i < nodes.length; i++) {
      let currentNode = nodes[i];

      if (currentNode.type === 'declare' || currentNode.type === 'assign') {
          let declareNode = currentNode as PartialAST.DeclareNode|PartialAST.AssignNode;
          let variableName = declareNode.name;
          // if type is declare, then innerNodes's last one is decalreend, else not.
          let [innerNodes, nextIndex] = extractNodesUntilDeclareendEnd(nodes, i + 1, variableName);
          let {nodes: updatedInnerNodes}: LambdaAST.SeqNode = lambdalizeSeq({ type: 'seq', nodes: innerNodes });
          let lastNode = updatedInnerNodes.pop();
          if(lastNode===undefined){
            throw new Error("lastNode should be declareend or others");
          } else if (lastNode.type != 'declareend'){
            updatedInnerNodes.push(lastNode);
            let lambdaNode: LambdaAST.LambdaAppNode = {
              type: 'lambda',
              variable: declareNode.name,
              body: {type:'seq', nodes: updatedInnerNodes},
              binding: declareNode.value,
              marker: { type: currentNode.type }
            };
            newNodes.push(lambdaNode);
          } else {
            let lambdaNode: LambdaAST.LambdaAppNode = {
              type: 'lambda',
              variable: declareNode.name,
              body: {type:'seq', nodes: updatedInnerNodes},
              binding: declareNode.value,
              marker: { type: currentNode.type }
            };
            newNodes.push(lambdaNode); 
            if(currentNode.type!='declare'){
               newNodes.push(lastNode);
            }
          }
          i = nextIndex; 
      } else {
          newNodes.push(lambdalize(currentNode));
      }
  }

  return { type: 'seq', nodes: newNodes };
}


function extractNodesUntilDeclareendEnd(nodes: PartialAST.TermNode[], startIndex: number, variableName: Exp.Variable): [PartialAST.TermNode[], number] {
  let innerNodes: PartialAST.TermNode[] = [];
  // let branchStartCount = 0;
  let i = startIndex;
  for (; i < nodes.length; i++) {
     if (nodes[i].type === 'declareend') {
        let declareendNode = nodes[i] as CoreAST.DeclareendNode;
        if(declareendNode.name.name === variableName.name){
          innerNodes.push(nodes[i]);
          return [innerNodes, i];
        }
      }       
    // normal nodes, even till end of the sequence
    innerNodes.push(nodes[i]);
  }
  // if(i===nodes.length){
  //   throw new Error("cannot find matched declareend.")
  // } else {
    // useleness
    return [innerNodes, i]
  // }
}
