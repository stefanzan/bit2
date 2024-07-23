import * as Parser from "../../src/surface/Parser";
// Example usage
// Example usage
const exampleInput = `
  Some literal text
  «VAR v = 0»
  More literal text
  «FOR item IN lst SEPARATOR "," BEFORE "[" AFTER "]"» «item» «ENDFOR»
  End literal text
  «no = no + 1»
`;

const tokens = Parser.tokenize(exampleInput);
const parsedFragment = Parser.parseTokens(tokens);
console.log(JSON.stringify(parsedFragment, null, 2));
