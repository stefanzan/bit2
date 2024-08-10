import * as CoreAST from "../../src/core/AST";
import * as Expr from "../../src/common/Exp";
import * as SimpleCoreExample from "../core/0.simple.test";
import * as Scope from "../../src/scope/scopelize";
import * as CorePrint from "../../src/core/Print";

// const assignmentExample = Scope.scopelize( SimpleCoreExample.assignmentExample);
// CorePrint.printAST(assignmentExample);

// console.log("=================================");
// const branchExample = Scope.scopelize( SimpleCoreExample.branchExample);
// CorePrint.printAST(branchExample);

// console.log("=================================");
// const loopExample = Scope.scopelize( SimpleCoreExample.loopExample);
// CorePrint.printAST(loopExample);

// console.log("=================================");
// const loopExampleWithAssign = Scope.scopelize( SimpleCoreExample.loopExampleWithAssign);
// CorePrint.printAST(loopExampleWithAssign);

console.log("=================================");
const loopExampleWithAssignAndIF = Scope.scopelize( SimpleCoreExample.loopExampleWithAssignAndIF);
CorePrint.printAST(loopExampleWithAssignAndIF);




