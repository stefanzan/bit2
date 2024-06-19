import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, NopNode, SeqNode, BranchStartNode, BranchEndNode, SepNode, LoopFrontNode, LoopRearNode, EndNode, BotNode, CallStartNode, CallEndNode, LambdaAppNode, Marker, Value } from '../../src/partial/AST';
import * as Print from "../../src/partial/Print"

// Example test cases
const testConstNode: ConstNode = {
    type: 'const',
    value: "42" 
};

const testDeclareNode: DeclareNode = {
    type: 'declare',
    name: {type:"variable", name:'x'},
    value: [{ type: 'constant', value: '5' }, 5]
};

const testSeqNode: SeqNode = {
    type: 'seq',
    nodes: [
        testConstNode,
        testDeclareNode
    ]
};

// Run tests
console.log('Testing ConstNode:');
Print.printNode(testConstNode);
console.log('Testing DeclareNode:');
Print.printNode(testDeclareNode);
console.log('Testing SeqNode:');
Print.printNode(testSeqNode);
