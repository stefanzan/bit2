import * as CoreAST from "../core/AST";
import * as PartialAST from "../partial/AST";
import * as Expr from "../common/Exp";
import * as LambdaAST from "../lambda/AST";
import { partialEval } from "../partialEval/peval";
import { lambdalize } from "../lambdalize/lambdalize";
import * as Evaluation from "../lambda/Evaluation";
import * as UnEvaluation from "../../src/partialEval/unpeval";
import * as Parser from "../surface/Parser";
import * as Translator from "../translate/Translate";


//@ts-ignore
import { UpdateOperation } from "../../src/fuse/Update";
import { operationToStr } from "../../src/fuse/Print";
import { Environment, fuse, printEnvironment } from "../../src/fuse/Fuse";
import { printNode } from "../../src/lambda/Print";
import { unLambdalize } from "../../src/lambdalize/unLambdalize";
import { flatten } from "../../src/partialEval/peval";
import * as LambdaPrint from "../../src/lambda/Print";

export function evaluateToLambdaAST(core: CoreAST.TermNode): LambdaAST.TermNode {
  const initialEnvironment = new Map<string, any>();
  const [_, partialNode] = partialEval(initialEnvironment, core);
  const lambdaAST = lambdalize(partialNode);
  return lambdaAST;
}


export function forward(str: string):string {
  let surface = Parser.parse(str);
  let core = Translator.translate(surface)
  let result = Evaluation.evaluateTermNode(evaluateToLambdaAST(core));
  return result;
}


export function backward(core: CoreAST.TermNode, operation: UpdateOperation): CoreAST.TermNode[] {
  let lambdaAST = evaluateToLambdaAST(core)
  // LambdaPrint.printNode(lambdaAST,"");
  let env: Environment = {};
  return fuse(env, operation, lambdaAST)
  .map(({newTermNode: newTerm, remainingOperation: newOp}) => {
    let partialAST = flatten(unLambdalize(newTerm));
    let updatedCoreAST = UnEvaluation.flatten(UnEvaluation.unPartialEval(partialAST));
    return updatedCoreAST;
  });
}
