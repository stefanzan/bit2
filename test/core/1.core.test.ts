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
  FreezeExp,
  Expr,
  Constant,
  Variable,
  BinaryOperation,
  UnaryOperation,
  FieldAccess,
  ArrayLiteral,
  ObjectLiteral,
  FrontNode,
  RearNode,
  SepNode,
  Lambda,
  AssignNode,
  seq,
  constNode,
  space,
  declare,
  exp,
  loop,
  ite,
  assign,
  nop,
  bot,
  end
} from "../../src/core/AST";
import * as Print from "../../src/core/Print";



// Define constant values
const htmlStart = constNode("<html>");
const htmlEnd = constNode("</html>");
const bodyStart = constNode("<body>");
const bodyEnd = constNode("</body>");

// Define freeze expression for paragraphs
const paragraphs = declare({ type: 'variable', name: 'paragraphs' }, { type: 'freeze', expression: {type: 'array', elements:
  [
  { type: 'object', fields: { head: {type:"constant", value: "Hello"}, text: {type:"constant", value: "Hello!" } } },
  { type: 'object', fields: { head: {type:"constant", value: "Farewell"}, text: {type:"constant", value: "Good Bye!"} } }
  ]}
});

// Define sequence of commands
const documentStructure: SeqNode = seq(
  paragraphs,
  htmlStart, constNode("\\n"), space(4), bodyStart, constNode("\\n"),
  declare({ type: 'variable', name: 'no' }, { type:'constant', value:0} ),
  loop({ type: 'variable', name: 'paragraphs' }, { type: 'sep', value: "" }, { type: 'front', value: "" }, { type: 'rear', value: "" },
    {
      type: 'lambda',
      variable: {type:"variable", name: "p"},
      body: seq(
        ite(
            { type: 'binary', operator: '!=', left: { type: 'field', object: {type: 'variable',name: "p"}, field: 'head' }, right: { type: 'constant', value: null } },
            seq(
                assign({ type: 'variable', name: 'no' }, { type: 'binary', operator: '+', left: { type: 'variable', name: 'no' }, right: {type:'constant',value:1} }),
                space(9), constNode("<h1>"), exp({ type: 'variable', name: 'no' }), constNode("."), exp({ type: 'field', object: {type: 'variable',name: "p"}, field: 'head' }), constNode("</h1>"), constNode("\\n")
            ),
            nop()
        ),
        space(10), constNode("<p>"), constNode("\\n"), space(12), exp({ type: 'field', object: {type: 'variable',name: "p"}, field: 'text' }), constNode("\\n"), space(10), constNode("</p>"), constNode("\\n")
    )
    }

  ),
  space(5), bodyEnd, constNode("\\n"), htmlEnd,
  end()
);

Print.printAST(documentStructure);
