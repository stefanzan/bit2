import * as Surface from "./AST";
import * as Exp from "../common/Exp";
// Import necessary types
import {
  Expr,
  Constant,
  Variable,
  BinaryOperation,
  UnaryOperation,
  FieldAccess,
  ArrayLiteral,
  ObjectLiteral,
  FreezeExp,
  FunctionCall,
  BinaryOperator,
  UnaryOperator,
} from "../../src/common/Exp";

export function parse(input: string): Surface.Fragment {
  return parseTokens(tokenize(input));
}

export function tokenize(input: string): (Surface.Literal | string)[] {
  const regex = /«[^»]*»/g;
  let match;
  const tokens: (Surface.Literal | string)[] = [];
  let lastIndex = 0;

  while ((match = regex.exec(input)) !== null) {
    if (lastIndex < match.index) {
      tokens.push(input.slice(lastIndex, match.index)); // Literal
    }
    tokens.push(match[0]); // Directive
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push(input.slice(lastIndex)); // Remaining literal
  }

  return tokens;
}

export function parseTokens(
  tokens: (Surface.Literal | string)[]
): Surface.Fragment {
  const fragments: Surface.Fragment[] = [];
  let i = 0;
  // console.log("tokens:", tokens);
  while (i < tokens.length) {
    const token = tokens[i];
    if (
      typeof token === "string" &&
      token.startsWith("«") &&
      token.endsWith("»")
    ) {
      const directiveContent = token.slice(1, -1).trim();
      const [directiveType] = directiveContent.split(" ");

      switch (directiveType.toUpperCase()) {
        case "VAR":
          const declareParts = directiveContent.split("=");
          fragments.push({
            type: "Directive",
            content: {
              type: "declare",
              name: declareParts[0].split(" ")[1].trim(),
              expr: parseExpr(declareParts[1].trim()),
            },
          });
          break;

        case "IF":
          const ifParts = directiveContent.match(/^(IF)\s+/i);
          if (ifParts) {
            const expression = directiveContent.slice(ifParts[0].length).trim();
            const thenBranchTokens: (Surface.Literal | string)[] = [];
            const elseBranchTokens: (Surface.Literal | string)[] = [];
            let nestingLevel = 1;
            let j = i + 1;
            while (j < tokens.length) {
              let nextToken = tokens[j];
              if (typeof nextToken === "string" && nextToken.startsWith("«")) {
                if (
                  nextToken.includes("ENDIF") ||
                  nextToken.includes("endif")
                ) {
                  nestingLevel--;
                  // meet endif, break.
                  if (nestingLevel <= 0) break;
                } else if (
                  (nextToken.includes("else") || nextToken.includes("ELSE")) &&
                  nestingLevel === 1
                ) {
                  nestingLevel = 0; // Mark end of thenBranch
                  if (!nextToken.includes("if") && !nextToken.includes("IF")) {
                    j++;
                    continue;
                  }
                  // 去掉字符else
                  nextToken = nextToken.replace(/else(?=if)/, "");
                }
              }

              if (nestingLevel > 0) thenBranchTokens.push(nextToken);
              else elseBranchTokens.push(nextToken);
              j++;
            }

            const thenBranch = parseTokens(thenBranchTokens);
            const elseBranch = parseTokens(elseBranchTokens);
            i = j; // Move index to end of if statement

            fragments.push({
              type: "Directive",
              content: {
                type: "if",
                expr: parseExpr(expression),
                thenBranch,
                elseBranch,
              },
            });
          }
          break;

        case "FOR":
          // 在 parseTokens 中 FOR case 内

          // 先用正则找出循环变量名和集合表达式
          // 例如：for item in items separator " , " front "[" rear "]"
          const forHeaderRegex =
            /for\s+(\w+)\s+in\s+([^\s]+)(?:\s+separator\s+"([^"]*)")?(?:\s+front\s+"([^"]*)")?(?:\s+rear\s+"([^"]*)")?/i;
          const headerMatch = directiveContent.match(forHeaderRegex);
          if (!headerMatch) throw new Error("Invalid for directive syntax");

          const [
            ,
            name,
            exprStr,
            separatorVal = "",
            frontVal = "",
            rearVal = "",
          ] = headerMatch;

          const loopTokens: (Surface.Literal | string)[] = [];
          let nestingLevel = 1;
          let j = i + 1;
          while (j < tokens.length && nestingLevel > 0) {
            const nextToken = tokens[j];
            if (typeof nextToken === "string" && nextToken.startsWith("«")) {
              if (nextToken.toLowerCase().includes("endfor")) {
                nestingLevel--;
                if (nestingLevel === 0) break;
              } else if (nextToken.toLowerCase().includes("for")) {
                nestingLevel++;
              }
            }
            if (nestingLevel > 0) loopTokens.push(nextToken);
            j++;
          }
          const fragment = parseTokens(loopTokens);
          i = j;

          fragments.push({
            type: "Directive",
            content: {
              type: "for",
              name: name.trim(),
              expr: parseExpr(exprStr.trim()),
              separator: { type: "separator", value: separatorVal },
              front: { type: "front", value: frontVal },
              rear: { type: "rear", value: rearVal },
              fragment,
            },
          });

          // // 定义正则表达式来匹配各个部分
          // // const regex = /(?:\bfor\b|\bin\b|\bseparator\b|\bfront\b|\brear\b|[\[\],])|((?:\w+(?:\.\w*)?)+)|"([^"]*)"|\[([^\]]*)\]/gi;
          // const regex =
          //   /(\bfor\b|\bin\b|\bseparator\b|\bfront\b|\brear\b|[\[\],])|((?:\w+(?:\.\w*)?)+)|"([^"]*)"|\[([^\]]*)\]/gi;
          // const forMatch: string[] = [];
          // let match: RegExpExecArray | null;
          // while ((match = regex.exec(directiveContent)) !== null) {
          //   // separator
          //   if (match[0] === "separator") {
          //     break;
          //   }
          //   // front
          //   else if (match[0] === "front") {
          //     break;
          //   }
          //   // rear
          //   else if (match[0] === "rear") {
          //     break;
          //   }
          //   // for
          //   if (match[1]) {
          //     forMatch.push(match[1]);
          //   }
          //   // p
          //   if (match[2]) {
          //     forMatch.push(match[2]);
          //   }
          //   // in
          //   if (match[3]) {
          //     forMatch.push(match[3]);
          //   }
          //   // paragraphs
          //   if (match[4]) {
          //     forMatch.push(match[4]);
          //   }
          // }

          // // 处理可选的 separator 部分
          // const separatorMatch = directiveContent.match(
          //   /separator\s*"([^"]*)"/i
          // );
          // if (separatorMatch && separatorMatch[1]) {
          //   forMatch.push("separator", separatorMatch[1]);
          // }

          // // 处理可选的 front 部分
          // const frontMatch = directiveContent.match(
          //   /front\s*"([^"]*)"/i
          // );
          // if (frontMatch && frontMatch[1]) {
          //   forMatch.push("front", frontMatch[1]);
          // }

          // // 处理可选的 rear 部分
          // const rearMatch = directiveContent.match(/rear\s*"([^"]*)"/i);
          // if (rearMatch && rearMatch[1]) {
          //   forMatch.push("rear", rearMatch[1]);
          // }

          // if (forMatch) {
          //   const loopTokens: (Surface.Literal | string)[] = [];
          //   let nestingLevel = 1;
          //   let j = i + 1;

          //   // Iterate to collect tokens within the FOR directive
          //   while (j < tokens.length && nestingLevel > 0) {
          //     const nextToken = tokens[j];

          //     // Handle nested FOR and ENDFOR
          //     if (typeof nextToken === "string" && nextToken.startsWith("«")) {
          //       if (
          //         nextToken.includes("ENDFOR") ||
          //         nextToken.includes("endfor")
          //       ) {
          //         nestingLevel--;
          //         if (nestingLevel === 0) break; // End of current FOR block
          //       } else if (
          //         nextToken.includes("FOR") ||
          //         nextToken.includes("for")
          //       ) {
          //         nestingLevel++;
          //       }
          //     }

          //     // Add token if inside the loop
          //     if (nestingLevel > 0) loopTokens.push(nextToken);
          //     j++;
          //   }

          //   // Parse the tokens collected within the loop
          //   const fragment = parseTokens(loopTokens);
          //   i = j; // Move index to the end of the FOR statement

          //   // Build the fragment content
          //   fragments.push({
          //     type: "Directive",
          //     content: {
          //       type: "for",
          //       name: forMatch[1].trim(),
          //       expr: parseExpr(forMatch[3].trim()), // Parse the expression part
          //       separator: {
          //         type: "separator",
          //         value: forMatch[5]?.trim() || "",
          //       },
          //       front: { type: "front", value: forMatch[7]?.trim() || "" },
          //       rear: { type: "rear", value: forMatch[9]?.trim() || "" },
          //       fragment, // Parsed tokens inside the loop
          //     },
          //   });
          // }
          break;

        default:
          if (directiveContent.includes("=")) {
            const assignParts = directiveContent.split("=");
            fragments.push({
              type: "Directive",
              content: {
                type: "assign",
                name: assignParts[0].split(" ")[0].trim(),
                expr: parseExpr(assignParts[1].trim()),
              },
            });
          } else {
            fragments.push({
              type: "Directive",
              content: {
                type: "exp",
                expr: parseExpr(directiveContent),
              },
            });
          }
          break;
      }
    } else {
      fragments.push(token); // Treat as a literal
    }
    i++;
  }

  if (fragments.length === 1) {
    return fragments[0];
  }

  return {
    type: "fragmentList",
    fragments,
  };
}

// Utility function to parse expressions
function parseExpr(input: string): Expr {
  const tokens = tokenizeExpression(input);
  // console.log("parseExpr, tokens:", tokens);
  let pos = 0;

  function tokenizeExpression(input: string): string[] {
    const regex =
      /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(&&|\|\||[<>!=]=|[{}[\](),.:;!+\-*/<>])|(\s+)|([^\s{}[\](),.:;!+\-*/<>!=&|]+)/g;
    // const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([{}[\](),.:;!+\-*/<>=])|(\s+)|([^\s{}[\](),.:;!+\-*/<>=]+)/g;
    // const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|([{}[\](),.:;!])|(\s+)|([^\s{}[\](),.:;!]+)/g;
    const tokens: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(input)) !== null) {
      if (match[1] !== undefined) {
        // Double-quoted string
        tokens.push(`"${match[1]}"`);
      } else if (match[2] !== undefined) {
        // Single-quoted string
        tokens.push(`'${match[2]}'`);
      } else if (match[3] !== undefined) {
        // Delimiters
        tokens.push(match[3]);
      } else if (match[5] !== undefined) {
        // Other tokens (identifiers, numbers, etc.)
        tokens.push(match[5]);
      }
    }

    return tokens;
  }

  function parsePrimary(): Expr {
    if (tokens[pos] === "(") {
      pos++; // Consume '('
      const expr = parseExpression();
      if (tokens[pos] === ")") {
        pos++; // Consume ')'
        return expr;
      }
      throw new Error("Mismatched parentheses");
    }

    if (tokens[pos] === "[") {
      pos++; // Consume '['
      const elements: Expr[] = [];
      while (tokens[pos] !== "]") {
        if (tokens[pos] === ",") {
          pos++; // Consume ','
        } else {
          elements.push(parseExpression());
        }
      }
      pos++; // Consume ']'
      return { type: "array", elements } as ArrayLiteral;
    }

    if (tokens[pos] === "{") {
      pos++; // Consume '{'
      const fields: { [key: string]: Expr } = {};
      while (tokens[pos] !== "}") {
        if (tokens[pos] === ",") {
          pos++; // Consume ','
        } else {
          const key = tokens[pos++];
          if (tokens[pos] === ":") {
            pos++; // Consume ':'
            const value = parseExpression();
            fields[key] = value;
          } else {
            throw new Error("Expected colon in object literal");
          }
        }
      }
      pos++; // Consume '}'
      return { type: "object", fields } as ObjectLiteral;
    }
    // Check for negative numbers
    if (tokens[pos] === "-" && !isNaN(Number(tokens[pos + 1]))) {
      pos++; // Consume '-'
      return { type: "constant", value: -Number(tokens[pos++]) } as Constant;
    }

    if (!isNaN(Number(tokens[pos]))) {
      return { type: "constant", value: Number(tokens[pos++]) } as Constant;
    }

    if (/^['"].*['"]$/.test(tokens[pos])) {
      return {
        type: "constant",
        value: tokens[pos++].slice(1, -1),
      } as Constant;
    }

    // handle boolean true/false and null case
    switch (tokens[pos]) {
      case "null":
        pos++;
        return { type: "constant", value: null };
      case "true":
        pos++;
        return { type: "constant", value: true };
      case "false":
        pos++;
        return { type: "constant", value: false };
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tokens[pos])) {
      let variable = { type: "variable", name: tokens[pos++] } as Variable;

      while (tokens[pos] === ".") {
        pos++; // Consume '.'
        if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tokens[pos])) {
          return {
            type: "field",
            object: variable,
            field: tokens[pos++],
          } as FieldAccess;
        } else {
          throw new Error("Expected property name after '.'");
        }
      }

      return variable;
    }

    if (tokens[pos] === "!") {
      pos++; // Consume '!'
      const expression = parsePrimary();
      return { type: "freeze", expression } as FreezeExp;
    }

    throw new Error(`Unexpected token: ${tokens[pos]}`);
  }

  function parseExpression(): Expr {
    let left = parsePrimary();

    while (
      [
        "+",
        "-",
        "*",
        "/",
        "&&",
        "||",
        ">",
        "<",
        ">=",
        "<=",
        "!=",
        "==",
        "==",
      ].includes(tokens[pos])
    ) {
      const operator = tokens[pos++] as BinaryOperator;
      const right = parsePrimary();
      left = { type: "binary", operator, left, right } as BinaryOperation;
    }

    return left;
  }

  // Start parsing with the expression function
  return parseExpression();
}
