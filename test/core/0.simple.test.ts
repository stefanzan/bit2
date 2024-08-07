import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as Print from "../../src/core/Print";

export const assignmentExample: TermNode = {
  type: 'seq',
  nodes: [
    {type:'declare', name:{type:'variable', name:'v'}, value:{type:'constant',value:0}},
    {type:'exp', expression:{type:'variable', name:'v'}},
    {type:'space', width:1},
    {type:'assign',name:{type:'variable', name:'v'}, value:{type:'binary', operator:'+',left:{type:'variable',name:'v'},right:{type:'constant', value:1}}},
    {type:'space', width:1},
    {type:'exp', expression:{type:'variable', name:'v'}},
    {type:'end'}
  ]
}

export const branchExample: TermNode = {
  type:'seq',
  nodes:[
    {type:'declare', name:{type:'variable', name:'v'}, value:{type:'constant',value:"stefanzantao"}},
    {
      type:'ite',
      condition:{type:'binary', operator:">", left:{type:'field', object:{type:'variable', name:'v'}, field:'length'}, right:{type:'constant', value:10}},
      trueBranch:{type:'seq', nodes:[
          // {type:'exp', expression:{type:'field', object:{type:'variable', name:'v'}, field:'substring(0,10)'}},
          {type:'exp', expression:{type:'variable', name:'v'}},
          {type:'const', value:'...'},
        ]},
      falseBranch: {type:'exp', expression:{type:'variable', name:'v'}}
    },
    {type:'end'}
  ]
}

export const loopExample: TermNode = {
  type:'seq',
  nodes: [
    {
      type:'declare', name:{type:'variable', name:'lst'}, 
      value:{type:'array',elements:[
        { type: 'object', fields: { head: {type:"constant", value: "Hello"}, text: {type:"constant", value: "Hello!" } } },
        { type: 'object', fields: { head: {type:"constant", value: "Farewell"}, text: {type:"constant", value: "Good Bye!"} } }
      ]}
    },
    {
      type:'loop',
      lst:{type:'variable', name:'lst'},
      separator: {type:'sep', value:','},
      front:{type:'front', value:'['},
      rear:{type:'rear', value:']'},
      body:{type:'lambda', variable:{type:'variable', name:'item'}, 
            body: {
              type:'seq',
              nodes:[
                {type:'exp', expression:{type:'field', object:{type:'variable', name:'item'}, field:'head'}},
                {type: 'const', value: ":"},
                {type:'exp', expression:{type:'field', object:{type:'variable', name:'item'}, field:'text'}},
              ]}
            }
    },
    {type:'end'}
  ]
}



export const loopExampleWithAssign: TermNode = {
  type:'seq',
  nodes: [
    {
      type:'declare', name:{type:'variable', name:'lst'}, 
      value:{type:'array',elements:[
        {type:"constant", value: "Hello"},
        {type:"constant", value: "Farewell"}
      ]}
    },
    {
      type:'declare', name:{type:'variable', name:'no'},
      value:{type:'constant', value: 0}
    },
    {
      type:'loop',
      lst:{type:'variable', name:'lst'},
      separator: {type:'sep', value:'\n'},
      front:{type:'front', value:''},
      rear:{type:'rear', value:''},
      body:{type:'lambda', variable:{type:'variable', name:'item'}, 
            body: {
              type:'seq',
              nodes:[
                {type:'assign',name:{type:'variable', name:'no'}, value:{type:'binary', operator:'+',left:{type:'variable',name:'no'},right:{type:'constant', value:1}}},
                {type:'exp', expression:{type:'variable', name:'no'}},
                {type: 'const', value: "."},
                {type:'exp', expression:{type:'variable', name:'item'}}
              ]}
            }
    },
    {type:'end'}
  ]
}

// console.log("--------assignment-----------");
// Print.printAST(assignmentExample);

// console.log("--------branch-----------");
// Print.printAST(branchExample);


// console.log("--------forloop-----------");
// Print.printAST(loopExample);