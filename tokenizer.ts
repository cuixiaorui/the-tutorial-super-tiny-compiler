interface Token {
  type: TokenType;
  value: string;
}

export enum TokenType {
  paren,
  name,
  number,
  string,
}

export function tokenizer(code: string) {
  let current = 0;
  const tokens: Token[] = [];

  while (current < code.length) {
    let char = code[current];

    const WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (char === "(") {
      tokens.push({
        type: TokenType.paren,
        value: char,
      });
      current++;
      continue;
    }

    if (char === ")") {
      tokens.push({
        type: TokenType.paren,
        value: char,
      });
      current++;
      continue;
    }

    // add
    // name -> [a-z]
    const LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      let value = "";
      while (LETTERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenType.name,
        value,
      });
    }

    // number
    const NUMBERS = /[0-9]/;
    if (NUMBERS.test(char)) {
      let value = "";
      while (NUMBERS.test(char) && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenType.number,
        value: value,
      });
    }

    // string
    if (char === '"') {
      let value = "";
      char = code[++current];
      while (char !== '"' && current < code.length) {
        value += char;
        char = code[++current];
      }

      tokens.push({
        type: TokenType.string,
        value: value,
      });

      current++;
      continue;
    }
  }

  return tokens;
}
