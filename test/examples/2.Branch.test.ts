import * as BiEval from "../../src/bx/biEval";

console.log("== Forward Evaluation ==");
const exampleInput = 
`«var v="stefanzantao"»
«if v.length>10»
«v»...
«endif»`;
console.log(BiEval.forward(exampleInput));
