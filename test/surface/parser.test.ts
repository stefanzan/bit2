import * as Parser from "../../src/surface/Parser";
// Example usage
// const exampleInput = `
//     Some literal text
//     «VAR v = 0»
//     More literal text
//     «FOR item IN lst SEPARATOR "," FRONT "[" REAR "]"» «item» «ENDFOR»
//     End literal text
//     «no = no + 1»
// `;

const exampleInput = `
«var paragraphs = ![{head:"Hello", text:"Hello!"}, {head:"Farewell", text:"Good Bye!"}] »
<html>
    <body>
      «var no = 0»
      «for p in paragraphs separator ", " front "[" rear "]"»
          «no = no + 1»
          <h1>«no».«p.head.toUpperCase»</h1>
        <p>
          «p.text»
        </p>
      «endfor»
    </body>
</html>
`;

// const exampleInput = 
// `«VAR no = 0»
// Before: «v»
// «no=no+1»
// After: «no»`;

// const parsedFragment = Parser.parse(exampleInput);
// console.log(JSON.stringify(parsedFragment, null, 2));

// const branchExample = 
// `«VAR v="stefanzantao"»
// «IF v.length>10»
// «v»...
// «ENDIF»`;
// const parsedFragment = Parser.parse(branchExample);
// console.log(JSON.stringify(parsedFragment, null, 2));

// const branchExample2 = 
// `«var v="stefanzantao"»
// «if v.length>10»
// «v»...
// «else»
// «v»
// «endif»`;
// const parsedFragment = Parser.parse(branchExample2);
// console.log(JSON.stringify(parsedFragment, null, 2));

// const exampleInput4 = 
// `«var v="stefanzan0"»
// «if v.length>10»
// «v»...
// «else if v.length == 10 »
// «v»_10
// «endif»`;
// const parsedFragment = Parser.parse(exampleInput4);
// console.log(JSON.stringify(parsedFragment, null, 2));


// const exampleInput5 = 
// `«var lst=[1,2,3]»
// «for item in lst separator "," front "[" rear "]"»«item»«endfor»`;
// const parsedFragment = Parser.parse(exampleInput5);
// console.log(JSON.stringify(parsedFragment, null, 2));

// const exampleInput6 = 
// `«var lst=[{head:"Modeling", text:"UML"},{head:"Programming", text:"Java"}]»
// «for item in lst»
// <h1>«p.head»</h1>
// <p>«p.text»</p>
// «endfor»`;
const parsedFragment = Parser.parse(exampleInput);
console.log(JSON.stringify(parsedFragment, null, 2));
