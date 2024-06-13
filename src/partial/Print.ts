import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, NopNode, SeqNode, BranchStartNode, BranchEndNode, SepNode, LoopFrontNode, LoopRearNode, EndNode, BotNode, CallStartNode, CallEndNode, LambdaAppNode, LoopItem, Variable, Constant, BinaryOperation, UnaryOperation, FieldAccess, ArrayLiteral, ObjectLiteral, FreezeExp, Expr, Value } from '../../src/partial/AST';

// Function to print the AST nodes for testing purposes
export function printNode(node: TermNode, indent: string = ''): void {
    console.log(indent + node.type);

    switch (node.type) {
        case 'const':
            console.log(indent + '  Value: ' + node.value.value);
            break;
        case 'space':
            console.log(indent + '  Width: ' + node.width);
            break;
        case 'declare':
            console.log(indent + '  Name: ' + node.name.name);
            printBinding(node.value, indent + '  ');
            break;
        case 'assign':
            console.log(indent + '  Name: ' + node.name.name);
            printBinding(node.value, indent + '  ');
            break;
        case 'exp':
            printBinding(node.binding, indent + '  ');
            break;
        case 'seq':
            node.nodes.forEach(n => printNode(n, indent + '  '));
            break;
        case 'branchstart':
            printBinding(node.condition, indent + '  ');
            break;
        case 'sep':
            console.log(indent + '  Value: ' + node.value);
            break;
        case 'loopfront':
            console.log(indent + '  front: ' + node.separator);
            break;
        case 'looprear':
            console.log(indent + '  rear: ' + node.separator);
            break;
        case 'lambda':
            console.log(indent + '  Variable: ' + node.variable.name);
            printNode(node.body, indent + '  ');
            printBinding(node.binding, indent + '  ');
            printLoopItem(node.marker, indent + '  ');
            break;
        case 'callstart':
            console.log(indent + '  Name: ' + node.name);
            break;
        default:
            break;
    }
}

export function printBinding(binding: [Expr, Value], indent: string): void {
    printExpr(binding[0], indent);
    console.log(indent + '  Value: ' + binding[1]);
}

export function printLoopItem(node: LoopItem, indent: string = ''): void {
  console.log(indent + node.type);
}

export function printExpr(expr: Expr, indent: string): void {
    switch (expr.type) {
        case 'constant':
            console.log(indent + 'Constant: ' + expr.value);
            break;
        case 'variable':
            console.log(indent + 'Variable: ' + expr.name);
            break;
        case 'binary':
            console.log(indent + 'Binary Operation: ' + expr.operator);
            printExpr(expr.left, indent + '  ');
            printExpr(expr.right, indent + '  ');
            break;
        case 'unary':
            console.log(indent + 'Unary Operation: ' + expr.operator);
            printExpr(expr.operand, indent + '  ');
            break;
        case 'field':
            console.log(indent + 'Field Access: ' + expr.field);
            printExpr(expr.object, indent + '  ');
            break;
        case 'array':
            console.log(indent + 'Array:');
            expr.elements.forEach(e => printExpr(e, indent + '  '));
            break;
        case 'object':
            console.log(indent + 'Object:');
            Object.keys(expr.fields).forEach(key => {
                console.log(indent + '  ' + key + ':');
                printExpr(expr.fields[key], indent + '    ');
            });
            break;
        case 'freeze':
            console.log(indent + 'Freeze:');
            printExpr(expr.expression, indent + '  ');
            break;
        default:
            break;
    }
}
