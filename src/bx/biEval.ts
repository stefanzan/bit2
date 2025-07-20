import * as CoreAST from "../core/AST";
import * as Expr from "../common/Exp";
import * as LambdaAST from "../lambda/AST";
import * as Scope from "../scope/scopelize";
import { flatten, partialEval } from "../partialEval/peval";
import { lambdalize } from "../lambdalize/lambdalize";
import * as Evaluation from "../lambda/Evaluation";
import * as UnEvaluation from "../../src/partialEval/unpeval";
import * as Parser from "../surface/Parser";
import * as Translator from "../translate/Translate";
import * as CorePrint from "../core/Print";
import * as CorePretty from "../core/PrettyPrint";
import * as PartialPrint from "../partial/Print";
import * as PartialAST from "../partial/AST";

//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { printNode } from "../../src/lambda/Print";
import { unLambdalize } from "../../src/lambdalize/unLambdalize";
import * as LambdaPrint from "../../src/lambda/Print";

export function evaluateToLambdaAST(core: CoreAST.TermNode): LambdaAST.TermNode {
  const initialEnvironment = new Map<string, any>();
  const scopedCore = Scope.scopelize(core);
  const [_, partialNode] = partialEval(initialEnvironment, scopedCore);
  // console.log("----------------------------");
  // PartialPrint.printNode(partialNode);
  const flattenedPartialNode = flatten(partialNode);
  const lambdaAST = lambdalize(flattenedPartialNode);
  // console.log("----------------------------");
  // LambdaPrint.printNode(lambdaAST);
  return lambdaAST;
}


export function forward(str: string):string {
  let surface = Parser.parse(str);
  let core = Translator.translate(surface)
  // CorePrint.printAST(core);
  let result = Evaluation.evaluateTermNode(evaluateToLambdaAST(core));
  return result;
}


export function backward(str: string, operation: UpdateOperation): string[] {
  let surface = Parser.parse(str);
  let core = Translator.translate(surface)
  let lambdaAST = evaluateToLambdaAST(core)
  // LambdaPrint.printNode(lambdaAST,"");
  let env: Environment = {};
  let resultList = fuse(env, operation, lambdaAST)
  .map(({newTermNode: newTerm, remainingOperation: newOp}) => {
    let partialAST = flatten(unLambdalize(newTerm));
    // console.log("--------updatedPartialAST------------");
    // PartialPrint.printNode(partialAST);
    try {
      let updatedCoreASTRedundant = UnEvaluation.unPartialEval(partialAST)
      let updatedCoreAST = UnEvaluation.flatten(updatedCoreASTRedundant);
      // console.log("--------updatedCoreAST------------");
      // CorePrint.printAST(updatedCoreAST);
      let surfaceText = CorePretty.printToSurface(updatedCoreAST);
      // console.log("biEval backward, success:\n", surfaceText);
      return surfaceText;
    } catch (error) {
      const typedError = error as Error;
      console.log("biEval backward, fail:" + typedError.message);
      return "";
    }
  });

  console.log("solution list length:", resultList.length);
  resultList = resultList.filter(result => result != (""))
  // remove redundant/identical results
  return Array.from(new Set(resultList));
}
