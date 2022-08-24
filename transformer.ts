import { NodeTypes, RootNode, createNumberLiteralNode } from "./ast";
import { traverser } from "./traverser";
export function transformer(ast: RootNode) {
  const newAST = {
    type: "Program",
    body: [],
  };

  ast.context = newAST.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        if (node.type === NodeTypes.CallExpression) {
          let expression: any = {
            type: "CallExpression",
            callee: {
              type: "Identifier",
              name: node.name,
            },
            arguments: [],
          };

          node.context = expression.arguments;

          if (parent?.type !== NodeTypes.CallExpression) {
            expression = {
              type: "ExpressionStatement",
              expression,
            };
          }

          parent?.context?.push(expression);
        }
      },
      exit() {},
    },
    NumberLiteral: {
      enter(node, parent) {
        if (node.type === NodeTypes.NumberLiteral) {

          if (parent && parent.type === NodeTypes.CallExpression) {
            parent.context?.push(createNumberLiteralNode(node.value));
          }
        }
      },
      exit(node, parent) {},
    },
  });

  return newAST;
}
