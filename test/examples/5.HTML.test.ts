import { TermNode, ConstNode, SpaceNode, DeclareNode, AssignNode, ExpNode, SeqNode, IfThenElseNode, LoopNode, CallNode, NopNode, BotNode, EndNode, Lambda } from '../../src/core/AST';
import * as CorePretty from "../../src/core/PrettyPrint";
import * as BiEval from "../../src/bx/biEval";




// const simpleExampleIntput = 
// `«var paragraphs =[{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
// <html>
//     <body>«var no = 0»«for p in paragraphs»
//       «if p.head != ""»«no = no + 1»<h1>«no».«p.head»</h1>«endif»
//         <p>
//           «p.text»
//         </p>«endfor»
//     </body>
// </html>`

// console.log("===Forward Evaluation===");
// console.log(BiEval.forward(simpleExampleIntput));

// console.log("=== Backward Evaluation===");

// console.log('--- 1. id ------------------');
// BiEval.backward(simpleExampleIntput, {type:'bulk', operations:[]}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 2. insert "<!DOCTYPE html>\n" at 1 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:"<!DOCTYPE html>\n", position:1}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 3. insert "<head></head>\n" at 8 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:"<head></head>\n", position:8}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// 在"1.HELLO"的"1"后面插入1个空格
// console.log('--- 4. insert " " at 30 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:" ", position:44}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// // no result, since lambda body not equal

// console.log('--- 4. insert "Greeting" at 30 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:"Greeting", position:44}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });


// 在"1.HELLO"的"O"后面插入1个空格
// console.log('--- 5. insert " " at 36 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'insert', str:" ", position:36}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// 删除"<html>"中的"t"
// console.log('--- 6. delete "t" at 3 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'delete', str:"t", position:3}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// 删除"<html>\n"
// console.log('--- 7. delete "<html>\n" at 1 ------------------');
// BiEval.backward(simpleExampleIntput, {type:'delete', str:"<html>\n", position:1}).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 8. bulk(delete "<html>" at 1, delete "\n" at  1) ------------------');
// BiEval.backward(simpleExampleIntput, {
//   type:'bulk',
//   operations:[
//     {type:'delete', str:"<html>", position:1},
//     {type:'delete', str:"\n", position:1}
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });
// 因为const("<html>\n")整个是一个term, 因此第一个deletion做完之后，第二个op被更新为 delete "\n" at -1
// 当前解法：将字符串以\n来切割，切得更细


const simpleExampleIntput2 = 
`«var paragraphs =[{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
<html>
    <body>«var no = 1»«for p in paragraphs»
      «if p.head != ""»«no = 1 + no»<h1>«no».«p.head»</h1>«endif»
        <p>
          «p.text»
        </p>«endfor»
    </body>
</html>`

console.log("===Forward Evaluation===");
console.log(BiEval.forward(simpleExampleIntput2));

console.log("=== Backward Evaluation===");



// console.log('--- 9. bulk(replace "2" with "1" at 29, replace "3" with "2" at 94)  ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'replace', str1:"2", str2:"1",position:29},
//     {type:'replace', str1:"3", str2:"2",position:94},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });

// console.log('--- 10. bulk(delete "  " at 48, delete "  " at 75, delete "  " at 112, delete "  " at 42)  ------------------');
// BiEval.backward(simpleExampleIntput2, {
//   type:'bulk',
//   operations:[
//     {type:'delete', str:"  ", position:48},
//     {type:'delete', str:"  ", position:75},
//     {type:'delete', str:"  ", position:112},
//     {type:'delete', str:"  ", position:142},
//   ]
// }).forEach(updatedCoreAST => {
//   console.log(updatedCoreAST);
//   console.log("~~~~~~~~~~~~~~~~~~~~~~~~");
// });