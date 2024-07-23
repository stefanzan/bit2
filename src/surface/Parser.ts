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
                // elseBranch: elseBranch.length > 0 ? elseBranch : { type: 'bot' }
                elseBranch: elseBranch,
              },
            });
          }
          break;

        case "FOR":
          const forParts = directiveContent.match(
            /FOR\s+(\w+)\s+IN\s+(.*?)\s+SEPARATOR\s+"(.*?)"\s+BEFORE\s+"(.*?)"\s+AFTER\s+"(.*?)"/
          );
          if (forParts) {
            const loopTokens: (Surface.Literal | string)[] = [];
            let nestingLevel = 1;
            let j = i + 1;
            while (j < tokens.length && nestingLevel > 0) {
              const nextToken = tokens[j];
              if (typeof nextToken === "string" && nextToken.startsWith("«")) {
                if (nextToken.includes("ENDFOR")) {
                  nestingLevel--;
                  if (nestingLevel === 0) break;
                } else if (nextToken.includes("FOR")) {
                  nestingLevel++;
                }
              }
              if (nestingLevel > 0) loopTokens.push(nextToken);
              j++;
            }

            const fragment = parseTokens(loopTokens);
            i = j; // Move index to end of for statement

            fragments.push({
              type: "Directive",
              content: {
                type: "for",
                name: forParts[1].trim(),
                expr: parseExpr(forParts[2].trim()),
                separator: { type: "separator", value: forParts[3].trim() },
                front: { type: "front", value: forParts[4].trim() },
                rear: { type: "rear", value: forParts[5].trim() },
                fragment,
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
                name: assignParts[0].split(" ")[1].trim(),
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
  const tokens = tokenize(input);
  let pos = 0;
  // Tokenize the input string
  function tokenize(input: string): string[] {
    return input
      .replace(/\s+/g, " ")
      .split(/([()+\-*/&&||<>=!]+|[\[\],.:])/)
      .filter((token) => token.trim().length > 0)
      .map((token) => token.trim());
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
      const fields: { [key: string]: Constant } = {};
      while (tokens[pos] !== "}") {
        if (tokens[pos] === ",") {
          pos++; // Consume ','
        } else {
          const key = tokens[pos++];
          if (tokens[pos] === ":") {
            pos++; // Consume ':'
            const value = parsePrimary();
            fields[key] = value as Constant;
          } else {
            throw new Error("Expected colon in object literal");
          }
        }
      }
      pos++; // Consume '}'
      return { type: "object", fields } as ObjectLiteral;
    }

    if (!isNaN(Number(tokens[pos]))) {
      return { type: "constant", value: Number(tokens[pos++]) } as Constant;
    }

    if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tokens[pos])) {
      return { type: "variable", name: tokens[pos++] } as Variable;
    }

    if (tokens[pos] === "freeze") {
      pos++; // Consume 'freeze'
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
