import * as LambdaAST from "../lambda/AST";
import * as PartialAST from "../partial/AST";

// Define the unLambdalize function
export function unLambdalize(lambdaNode: LambdaAST.TermNode): PartialAST.TermNode {
  switch (lambdaNode.type) {
    case 'lambda': {
      const { variable, body, binding, marker, isBindingUpdated } = lambdaNode;
      let newBody: PartialAST.TermNode;

      switch (marker.type) {
        case 'declare': {
          // Apply the [T-I-Declare] rule
          newBody = unLambdalize(body);
          return {
            type: 'seq',
            nodes: [
              {
                type: 'declare',
                name: variable,
                value: binding,
                isBindingUpdated:isBindingUpdated
              },
              newBody,
            ],
          };
        }

        case 'assign': {
          // Apply the [T-I-Assign] rule
          newBody = unLambdalize(body);
          return {
            type: 'seq',
            nodes: [
              {
                type: 'assign',
                name: variable,
                value: binding,
                isBindingUpdated:isBindingUpdated
              },
              newBody,
            ],
          };
        }

        default: {
          return {type:'lambda', variable: variable, body:unLambdalize(body), binding:binding, isBindingUpdated:isBindingUpdated, marker:marker }
        }
      }
    }

    // Recursively handle other node types
    case 'seq': {
      return {
        type: 'seq',
        nodes: lambdaNode.nodes.map(unLambdalize),
      };
    }

    default: {
      // Return the node unchanged if it doesn't match any transformation rules
      return lambdaNode as PartialAST.TermNode;
    }
  }
}
