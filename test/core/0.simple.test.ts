import { TermNode, Expr, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Constant, Variable, BinaryOperation, UnaryOperation, FieldAccess, ArrayLiteral, FreezeExp, Lambda } from '../../src/core/AST';
import * as Print from "../../src/core/Print";

const assignment: TermNode = {
  type: 'seq',
  nodes: [
    {type:'declare', name:{type:'variable', name:'v'}, value:{type:'constant',value:0}},
    {type:'exp', expression:{type:'variable', name:'v'}},
    {type:'space', width:1},
    {type:'assign',name:{type:'variable', name:'v'}, value:{type:'binary', operator:'+',left:{type:'variable',name:'v'},right:{type:'constant', value:1}}},
    {type:'space', width:1},
    {type:'exp', expression:{type:'variable', name:'v'}}
  ]
}

const branch: TermNode = {
  type:'ite',
  condition:{type:'binary', operator:">", left:{type:'field', object:{type:'variable', name:'v'}, field:'length'}, right:{type:'constant', value:10}},
  trueBranch:{type:'seq', nodes:[
      {type:'exp', expression:{type:'field', object:{type:'variable', name:'v'}, field:'substring(0,10)'}},
      {type:'const', value:{type:"constant", value:'...'}},
    ]},
  falseBranch: {type:'exp', expression:{type:'variable', name:'v'}}
}

const loop: TermNode = {
  type:'loop',
  lst:{type:'variable', name:'lst'},
  separator: {type:'sep', value:','},
  front:{type:'front', value:'['},
  rear:{type:'rear', value:']'},
  body:{type:'lambda', variable:{type:'variable', name:'item'}, body:{type:'exp', expression:{type:'variable', name:'item'}}}
}

console.log("--------assignment-----------");
Print.printAST(assignment);

console.log("--------branch-----------");
Print.printAST(branch);


console.log("--------forloop-----------");
Print.printAST(loop);