import * as Parser from "../../src/surface/Parser";
import * as Translator from "../../src/translate/Translate";
import * as CorePrint from "../../src/core/Print";

// Example usage
// const exampleInput = `
//     Some literal text
//     «VAR v = 0»
//     More literal text
//     «FOR item IN lst SEPARATOR "," FRONT "[" REAR "]"» «item» «ENDFOR»
//     End literal text
//     «no = no + 1»
// `;

// const exampleInput = `
// «var paragraphs = ![{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
// <html>
//     <body>
//       «var no = 0»
//       «for p in paragraphs separator "," front "[" rear "]"»
//           «no = no + 1»
//           <h1>«no».«p.head.toUpperCase»</h1>
//         <p>
//           «p.text»
//         </p>
//       «endfor»
//     </body>
// </html>
// `;

const exampleInput = 
`«VAR no = 0»
Before: «v»
«no = no + 1»
After: «no»`;

const parsedFragment = Parser.parse(exampleInput);
console.log(JSON.stringify(parsedFragment, null, 2));
const core = Translator.translate(parsedFragment);
CorePrint.printAST(core);
