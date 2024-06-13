
import { TermNode, Expr, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Constant, Variable, BinaryOperation, UnaryOperation, FieldAccess, ArrayLiteral, FreezeExp, Lambda } from '../../src/core/AST';
import * as Print from "../../src/core/Print";

// 创建一个示例AST
const exampleAST: TermNode = {
    type: 'seq',
    nodes: [
        { type: 'declare', name: {type:"variable", name: "x"}, value: { type: 'constant', value: 42 } },
        { type: 'assign', name: {type:"variable", name: "x"}, value: { type: 'binary', operator: '+', left: { type: 'variable', name: 'x' }, right: { type: 'constant', value: 1 } } },
        {
            type: 'ite',
            condition: { type: 'binary', operator: '>', left: { type: 'variable', name: 'x' }, right: { type: 'constant', value: 10 } },
            trueBranch: { type: 'assign', name: {type:"variable", name: "x"}, value: { type: 'constant', value: 10 } },
            falseBranch: { type: 'assign', name: {type:"variable", name: "x"}, value: { type: 'constant', value: 0 } }
        }
    ]
};

// 打印示例AST
Print.printAST(exampleAST);
