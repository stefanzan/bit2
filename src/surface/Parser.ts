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

export function parse(input: string) : Surface.Fragment {
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
          const ifParts = directiveContent.match(/IF\s+(.*?)\s*»/);
          if (ifParts) {
            const thenBranchTokens: (Surface.Literal | string)[] = [];
            const elseBranchTokens: (Surface.Literal | string)[] = [];
            let nestingLevel = 1;
            let j = i + 1;
            while (j < tokens.length && nestingLevel > 0) {
              const nextToken = tokens[j];
              if (typeof nextToken === "string" && nextToken.startsWith("«")) {
                if (nextToken.includes("ENDIF")) {
                  nestingLevel--;
                  if (nestingLevel === 0) break;
                } else if (nextToken.includes("IF")) {
                  nestingLevel++;
                } else if (nextToken.includes("ELSE") && nestingLevel === 1) {
                  nestingLevel = 0; // Mark end of thenBranch
                  j++;
                  continue;
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
                expr: parseExpr(ifParts[1].trim()),
                thenBranch,
                elseBranch,
              },
            });
          }
          break;

          case "FOR":
            // 定义正则表达式来匹配各个部分
            const regex = /(\bfor\b|\bin\b|\bseparator\b|\bfront\b|\brear\b|[\[\],])|(\w+)|"([^"]*)"|\[([^\]]*)\]/gi;
            const forMatch: string[] = [];
            let match: RegExpExecArray | null;
            while ((match = regex.exec(directiveContent)) !== null) {
              // for
              if (match[1]) {
                forMatch.push(match[1]);
              }
              // p
              if (match[2]) {
                forMatch.push(match[2]);
              }
              // in
              if (match[3]) {
                forMatch.push(match[3]);
              }
              // paragraphs
              if (match[4]) {
                forMatch.push(match[4]);
              }
            }
            
            // 处理可选的 separator 部分
            const separatorMatch = directiveContent.match(/separator\s*"([^"]*)"/i);
            if (separatorMatch && separatorMatch[1]) {
              forMatch.push('separator', separatorMatch[1]);
            }
            
            // 处理可选的 front 部分
            const frontMatch = directiveContent.match(/front\s*(?:\[([^\]]*)\])?/i);
            if (frontMatch && frontMatch[1]) {
              forMatch.push('front', frontMatch[1]);
            }
            
            // 处理可选的 rear 部分
            const rearMatch = directiveContent.match(/rear\s*(?:\[([^\]]*)\])?/i);
            if (rearMatch && rearMatch[1]) {
              forMatch.push('rear', rearMatch[1]);
            }
            
            if (forMatch) {
              const loopTokens: (Surface.Literal | string)[] = [];
              let nestingLevel = 1;
              let j = i + 1;
          
              // Iterate to collect tokens within the FOR directive
              while (j < tokens.length && nestingLevel > 0) {
                const nextToken = tokens[j];
          
                // Handle nested FOR and ENDFOR
                if (typeof nextToken === "string" && nextToken.startsWith("«")) {
                  if (nextToken.includes("ENDFOR")) {
                    nestingLevel--;
                    if (nestingLevel === 0) break; // End of current FOR block
                  } else if (nextToken.includes("FOR")) {
                    nestingLevel++;
                  }
                }
          
                // Add token if inside the loop
                if (nestingLevel > 0) loopTokens.push(nextToken);
                j++;
              }
          
              // Parse the tokens collected within the loop
              const fragment = parseTokens(loopTokens);
              i = j; // Move index to the end of the FOR statement
          
              // Build the fragment content
              fragments.push({
                type: "Directive",
                content: {
                  type: "for",
                  name: forMatch[1].trim(),
                  expr: parseExpr(forMatch[3].trim()), // Parse the expression part
                  separator: { type: "separator", value: forMatch[5]?.trim() || "" },
                  front: { type: "front", value: forMatch[7]?.trim() || "" },
                  rear: { type: "rear", value: forMatch[9]?.trim() || "" },
                  fragment, // Parsed tokens inside the loop
                },
              });
            }
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
    const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'|(&&|\|\||[<>!=]=|[{}[\](),.:;!+\-*/<>])|(\s+)|([^\s{}[\](),.:;!+\-*/<>!=&|]+)/g;
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
      return { type: "constant", value: tokens[pos++].slice(1, -1) } as Constant;
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tokens[pos])) {
      return { type: "variable", name: tokens[pos++] } as Variable;
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
      ["+", "-", "*", "/", "&&", "||", ">", "<", ">=", "<=", "!="].includes(
        tokens[pos]
      )
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
