import { test, expect } from "vitest";
import { tokenizer, TokenType } from "./tokenizer";

test("tokenizer", () => {
  const tokens = [
    { type: TokenType.paren, value: "(" },
    { type: TokenType.name, value: "add" },
    { type: TokenType.number, value: "2" },
    { type: TokenType.paren, value: "(" },
    { type: TokenType.name, value: "subtract" },
    { type: TokenType.number, value: "4" },
    { type: TokenType.number, value: "2" },
    { type: TokenType.paren, value: ")" },
    { type: TokenType.paren, value: ")" },
  ];

  const code = "(add 2 (subtract 4 2))";
  expect(tokenizer(code)).toEqual(tokens);
});

test("paren", () => {
  const tokens = [
    {
      type: TokenType.paren,
      value: "(",
    },
  ];
  const code = "(";
  expect(tokenizer(code)).toEqual(tokens);
});

test("name", () => {
  const tokens = [
    {
      type: TokenType.name,
      value: "add",
    },
  ];
  const code = "add";
  expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
  const tokens = [
    {
      type: TokenType.number,
      value: "22",
    },
  ];
  const code = "22";
  expect(tokenizer(code)).toEqual(tokens);
});

test("paren + name + number", () => {
  const tokens = [
    {
      type: TokenType.paren,
      value: "(",
    },
    {
      type: TokenType.name,
      value: "add",
    },
    {
      type: TokenType.number,
      value: "2",
    },
    {
      type: TokenType.number,
      value: "2",
    },
    {
      type: TokenType.paren,
      value: ")",
    },
  ];
  const code = "(add 2 2)";
  expect(tokenizer(code)).toEqual(tokens);
});

test("string", () => {
  const tokens = [
    {
      type: TokenType.paren,
      value: "(",
    },
    {
      type: TokenType.name,
      value: "add",
    },
    {
      type: TokenType.string,
      value: "hello",
    },
    {
      type: TokenType.string,
      value: "world",
    },
    {
      type: TokenType.paren,
      value: ")",
    },
  ];
  const code = '(add "hello" "world")';
  expect(tokenizer(code)).toEqual(tokens);
});
