import {
  createRootNode,
  createStringLiteralNode,
  createNumberLiteralNode,
  createCallExpression,
} from "./ast";
import { Token, TokenTypes } from "./tokenizer";

export function parser(tokens: Token[]) {
  const root = createRootNode();

  let current = 0;

  function walk() {
    let token = tokens[current];

    if (token.type === TokenTypes.Number) {
      current++;

      return createNumberLiteralNode(token.value);
    }

    if (token.type === TokenTypes.String) {
      current++;

      return createStringLiteralNode(token.value);
    }

    if (token.type === TokenTypes.Paren && token.value === "(") {
      token = tokens[++current];

      let node = createCallExpression(token.value);

      // 上一个 token 已经使用完了  所以我们还需要在移动下位置
      token = tokens[++current];
      // params
      while (
        // token.type !== TokenType.paren ||
        // (token.type === TokenType.paren && token.value !== ")")
        !(token.type === TokenTypes.Paren && token.value === ")")
      ) {
        node.params.push(walk());
        token = tokens[current];
      }

      // 跳过 )
      current++;

      return node;
    }

    throw new Error(`识别不了的 token: ${token}`);
  }

  while (current < tokens.length) {
    root.body.push(walk());
  }

  return root;
}
