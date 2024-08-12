import * as Surface from "../surface/AST";
import * as Core from "../core/AST";

// Main translation function
export function translate(surfaceAST: Surface.Fragment): Core.SeqNode {
  const coreNodes = translateFragment(surfaceAST);
  return Core.seq(...coreNodes);
}

// Translate a surface AST fragment to a core AST term node
function translateFragment(fragment: Surface.Fragment): Core.TermNode[] {
  if (typeof fragment === 'string') {
    return convertStringToNodes(fragment);
  }

  switch (fragment.type) {
    case 'Directive':
      switch (fragment.content.type) {
        case 'declare':
          return [Core.declare({type: 'variable', name: fragment.content.name}, fragment.content.expr)];
        case 'assign':
          return [Core.assign({type: 'variable', name: fragment.content.name}, fragment.content.expr)];
        case 'exp':
          return [Core.exp(fragment.content.expr)];
        case 'if':
          return [Core.ite(
            fragment.content.expr,
            { type: 'seq', nodes: translateFragment(fragment.content.thenBranch) },
            translateElseBranch(fragment.content.elseBranch) // Use the new function here
          )];
        case 'for':
          return [Core.loop(
            fragment.content.expr,
            { type: 'sep', value: fragment.content.separator.value },
            { type: 'front', value: fragment.content.front.value },
            { type: 'rear', value: fragment.content.rear.value },
            { type: 'lambda', variable: { type: 'variable', name: fragment.content.name }, body: { type: 'seq', nodes: translateFragment(fragment.content.fragment) }}
          )];
        default:
          throw new Error(`Unknown directive: ${fragment}`);
      }
    case 'fragmentList':
      return fragment.fragments.flatMap(translateFragment);
    default:
      throw new Error(`Unknown fragment: ${fragment}`);
  }
}

// Helper function to convert string to Core nodes, including SpaceNode for spaces
function convertStringToNodes(str: string): Core.TermNode[] {
  const nodes: Core.TermNode[] = [];
  let buffer = '';

  for (let char of str) {
    if (char === ' ') {
      if (buffer.length > 0) {
        if(buffer.endsWith("\n")){
          // 以\n切割
          const parts = buffer.split(/(\n)/);
          for(const part of parts){
            if(part!=''){
              nodes.push(Core.constNode(part));
            }
          }
        } else {
          nodes.push(Core.constNode(buffer));
        }
        buffer = '';
      }
      nodes.push(Core.space(1)); // Add SpaceNode for each space
    } else {
      buffer += char;
    }
  }

  if (buffer.length > 0) {
    if(buffer.endsWith("\n")){
      // 以\n切割
      const parts = buffer.split(/(\n)/);
      for(const part of parts){
        if(part!=''){
          nodes.push(Core.constNode(part));
        }
      }
    } else {
      nodes.push(Core.constNode(buffer));
    }
  }

  return nodes;
}

// Type guard for IfDirective
function isIfDirective(obj: any): obj is Surface.IfDirective {
  return obj && obj.type === 'if';
}

// Type guard for Bot
function isBot(obj: any): obj is Surface.Bot {
  return obj && obj.type === 'bot';
}

// Helper function to handle ElseBranch specifically
function translateElseBranch(elseBranch: Surface.ElseBranch): Core.TermNode {
  if (isIfDirective(elseBranch)) {
    // If it's an IfDirective
    const ifDirective = elseBranch as Surface.IfDirective;
    return Core.ite(
      ifDirective.expr,
      { type: 'seq', nodes: translateFragment(ifDirective.thenBranch) },
      translateElseBranch(ifDirective.elseBranch) // Recursive call for nested if
    );
  } else if (isBot(elseBranch)) {
    // If it's a Bot
    return Core.bot(); 
  } else {
    // If it has a 'fragments' field, it's a Fragment
    return { type: 'seq', nodes: translateFragment(elseBranch) };
  } 
}

