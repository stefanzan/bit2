import * as PartialAST from "../partial/AST";
import * as LambdaAST from "../lambda/AST";


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
          let [innerNodes, nextIndex] = extractNodesUntilBranchEndOrLast(nodes, i + 1);
          let {nodes: updatedInnerNodes}: LambdaAST.SeqNode = lambdalizeSeq({ type: 'seq', nodes: innerNodes });
          let lastNode = updatedInnerNodes.pop();
          if (lastNode === undefined) {
            // 数组为空，没有最后一个元素
            throw new Error("Expected the last element to be a BranchEndNode, but the array was empty.");
          } else if (lastNode?.type !== 'branchend') {
            updatedInnerNodes.push(lastNode);
          }
          let lambdaNode: LambdaAST.LambdaAppNode = {
              type: 'lambda',
              variable: declareNode.name,
              body: {type:'seq', nodes: updatedInnerNodes},
              binding: declareNode.value,
              marker: { type: currentNode.type }
          };
          newNodes.push(lambdaNode);
          if(lastNode?.type === 'branchend'){
            newNodes.push({ type: 'branchend', condition: lastNode.condition });
          }
          i = nextIndex; // Skip to the index after the matched BranchEndNode
      } else {
          newNodes.push(lambdalize(currentNode));
      }
  }

  return { type: 'seq', nodes: newNodes };
}


function extractNodesUntilBranchEndOrLast(nodes: PartialAST.TermNode[], startIndex: number): [PartialAST.TermNode[], number] {
  let innerNodes: PartialAST.TermNode[] = [];
  let branchStartCount = 0;

  for (let i = startIndex; i < nodes.length; i++) {
      // branch
      if (nodes[i].type === 'branchstart') {
          branchStartCount++;
      } else if (nodes[i].type === 'branchend') {
          if (branchStartCount === 0) {
              innerNodes.push(nodes[i]);
              return [innerNodes, i];
          } else {
              branchStartCount--;
          }
      }
      // program 
      if (nodes[i].type === 'end') {
        innerNodes.push(nodes[i]);
        return [innerNodes, i];
      }       
    // normal nodes, even till end of the sequence
    innerNodes.push(nodes[i]);
  }
  return [innerNodes, nodes.length-1];
}
