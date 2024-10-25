import * as LambdaAST from "../../src/lambda/AST";
import * as LambdaPrint from "../../src/lambda/Print";

// Example usage
const exampleAST: LambdaAST.TermNode = {
  type:'seq',
  nodes: [
    { type: 'const', value:'hello'},
    { type: 'space', width: 1 },
    {
      type: 'lambda',
      variable: {type:'variable',name:'x'},
      body: { type: 'const', value:'world'},
      binding: [{ type: 'variable', name: 'x' }, 'valueX' ],
      isBindingUpdated:false,
      marker: { type: 'loopitem', lst: { type: 'variable', name: 'arr' } }
    },
    {
      type: 'lambda',
      variable: {type:'variable',name:'y'},
      body: { type: 'const', value: 'test'},
      binding: [ { type: 'variable', name: 'y' }, 'valueY' ],
      isBindingUpdated:false,
      // @ts-ignore
      marker: { type: 'declare' }
    },
    {
      type: 'lambda',
      variable: {type:'variable',name:'z'},
      body: { type: 'const', value: 'example'},
      binding: [{ type: 'variable', name: 'z' }, 'valueZ' ],
      isBindingUpdated:false,
      // @ts-ignore
      marker: { type: 'assign' }
    },
    {type:'end'}
  ]
};

// Print the example AST
LambdaPrint.printNode(exampleAST);