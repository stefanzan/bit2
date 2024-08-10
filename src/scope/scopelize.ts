import * as CoreAST from "../core/AST";
import * as Stack from "../utils/Stack";
/**
 * Given a CoreAST, for each decalre(x,e), add declareend(x) at the end of its scope.
 * @param coreAST
 * @returns
 */
export function scopelize(node: CoreAST.TermNode): CoreAST.TermNode {
  switch (node.type) {
    case "declare":
      return {
        type: "seq",
        nodes: [
          node,
          { type: "declareend", name: node.name } as CoreAST.DeclareendNode,
        ],
      } as CoreAST.SeqNode;
    case "seq":
      return scopelizeSeq(node);
    case "ite":
      let trueBranch = node.trueBranch;
      let falseBranch = node.falseBranch;
      return {
        type:'ite',
        condition: node.condition,
        trueBranch: scopelize(trueBranch), // TODO: maybe better handling
        falseBranch: scopelize(falseBranch)
      }
    case "loop":
      let loopBody = node.body;
      let lambdaBody = loopBody.body;
      return {
        ...node,
        body: {
          ...loopBody,
          body: scopelize(lambdaBody)
        }
      }
    case "call":
    case "const":
    case "space":
    case "declareend":
    case "assign":
    case "exp":
    case "nop":
    case "bot":
    case "end":
    case "lambdawithexpr":
    case "sep":
      return node;
  }
  return { type: "bot" };
}

function scopelizeSeq(seqNode: CoreAST.SeqNode): CoreAST.SeqNode {
  let stack = new Stack.Stack<CoreAST.TermNode>();
  let newNodes = [] as CoreAST.TermNode[];
  for (let node of seqNode.nodes) {
    if (node.type === "declare") {
      let declareendNode = {
        type: "declareend",
        name: node.name,
      } as CoreAST.DeclareendNode;
      stack.push(declareendNode);
    }

    if (node.type === "declare") {
      newNodes.push(node);
    } else {
      newNodes.push(scopelize(node));
    }
  }
  if (newNodes.length == 0) {
    return seqNode;
  } else {
    let lastNode = newNodes.pop();
    //@ts-ignore
    if (lastNode.type !== "end") {
      //@ts-ignore
      newNodes.push(lastNode);
    }

    while (!stack.isEmpty()) {
      let endNode = stack.pop();
      if (endNode) {
        newNodes.push(endNode);
      } else {
        throw new Error("endNode is undefined.");
      }
    } //while

    if(lastNode?.type==="end"){
      newNodes.push(lastNode);
    }
  }

  return {
    ...seqNode,
    nodes:newNodes
  };
}
