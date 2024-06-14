import {
  TermNode,
  ConstNode,
  SpaceNode,
  DeclareNode,
  ExpNode,
  SeqNode,
  IfThenElseNode,
  LoopNode,
  NopNode,
  BotNode,
  EndNode,
  FrontNode,
  RearNode,
  SepNode,
  Lambda,
  AssignNode
} from "./AST";
import * as Print from "../common/Print";

// 测试函数，递归打印AST节点
export function printAST(node: TermNode, indent: string = ''): void {
  switch (node.type) {
      case 'const':
          console.log(`${indent}Const: ${node.value.value}`);
          break;
      case 'space':
          console.log(`${indent}Space: ${node.width}`);
          break;
      case 'declare':
          console.log(`${indent}Declare: ${node.name.name} =`);
          Print.printExpression(node.value, indent + '  ');
          break;
      case 'assign':
          console.log(`${indent}Assign: ${node.name.name} =`);
          Print.printExpression(node.value, indent + '  ');
          break;
      case 'exp':
          console.log(`${indent}Exp:`);
          Print.printExpression(node.expression, indent + '  ');
          break;
      case 'seq':
          console.log(`${indent}Seq:`);
          node.nodes.forEach(n => printAST(n, indent + '  '));
          break;
      case 'ite':
          console.log(`${indent}If-Then-Else: if`);
          Print.printExpression(node.condition, indent + '  ');
          console.log(`${indent}Then:`);
          printAST(node.trueBranch, indent + '  ');
          console.log(`${indent}Else:`);
          printAST(node.falseBranch, indent + '  ');
          break;
      case 'loop':
          console.log(`${indent}Loop:`);
          Print.printExpression(node.lst, indent + '  ');
          console.log(`${indent}Separator: ${node.separator.value}`);
          console.log(`${indent}Front: ${node.front.value}`);
          console.log(`${indent}Rear: ${node.rear.value}`);
          printLambda(node.body, indent + '  ');
          break;
      case 'call':
          console.log(`${indent}Call:`);
          printAST(node.func, indent + '  ');
          Object.keys(node.args).forEach(arg => {
              console.log(`${indent}  ${arg} =`);
              Print.printExpression(node.args[arg], indent + '    ');
          });
          break;
      case 'nop':
          console.log(`${indent}Nop`);
          break;
      case 'bot':
          console.log(`${indent}Bot`);
          break;
      case 'end':
          console.log(`${indent}End`);
          break;
  }
}


export function printLambda(lambda: Lambda, indent: string = ''): void {
  console.log(`${indent}Lambda: ${lambda.variable.name}`);
  printAST(lambda.body, indent + '  ');
}
