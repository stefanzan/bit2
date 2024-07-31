import * as AST from "./AST";
import * as Exp from "../common/PrettyPrint";

export function printToSurface(node:AST.TermNode):string {
  let str = "";
  switch(node.type) {
    case 'const':
      return node.value;
    case 'space':
      return " ".repeat(node.width);
    case 'declare':
      str = "«";
      str += "var ";
      str += Exp.prettyPrint(node.name);
      str += "=";
      str += Exp.prettyPrint(node.value);
      str += "»";
      // str += "\n";
      return str;
    case 'assign':
      str = "«";
      str += Exp.prettyPrint(node.name);
      str += "=";
      str += Exp.prettyPrint(node.value);
      str += "»";
      // str += "\n"
      return str;
    case 'exp':
      str = "«";
      str += Exp.prettyPrint(node.expression);
      str += "»";
      return str;
    case 'seq':
      return node.nodes.map(node => printToSurface(node)).join("");
    case 'ite':
      str = "«if " + Exp.prettyPrint(node.condition) + "»";
      str += printToSurface(node.trueBranch);
      let falseBranch = node.falseBranch;
      if(falseBranch.type === "ite" || (falseBranch.type==='seq'&& falseBranch.nodes.length==1)){
        let nestedIfStr = printToSurface(falseBranch);
        str += "«elseif" + nestedIfStr.slice(3);
      } else if(falseBranch.type !== 'bot' && (falseBranch.type==='seq' && falseBranch.nodes.length!=0)){
        str += "«else»";
        str += printToSurface(falseBranch);
      }
      if(str.endsWith("«endif»")){
        return str;
      } else {
        str += "«endif»";
        return str;
      }
    case 'loop':
      str = "«for " + Exp.prettyPrint(node.body.variable) + " in " + Exp.prettyPrint(node.lst);
      if(node.separator.value){
        str += ' separator ' + '"' + node.separator.value + '"'; 
      }
      if(node.front.value){
        str += ' front ' + '"' + node.front.value + '"'; 
      }
      if(node.rear.value){
        str += ' rear ' + '"' + node.rear.value + '"'; 
      } 
      str += "»";
      str += printToSurface(node.body.body);
      str += "«endfor»";
      return str;
    case 'nop':
      return "";
    case 'bot':
      return "";
    case 'end':
      return "";
    default:
      return "";
  }
  return "";
}
