import { test, expect } from "vitest";
import { tokenizer, TokenTypes } from "./tokenizer";

test("tokenizer", () => {
  const tokens = [
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.name, value: "add" },
    { type: TokenTypes.number, value: "2" },
    { type: TokenTypes.paren, value: "(" },
    { type: TokenTypes.name, value: "subtract" },
    { type: TokenTypes.number, value: "4" },
    { type: TokenTypes.number, value: "2" },
    { type: TokenTypes.paren, value: ")" },
    { type: TokenTypes.paren, value: ")" },
  ];

  const code = "(add 2 (subtract 4 2))";
  expect(tokenizer(code)).toEqual(tokens);
});

test("paren", () => {
  const tokens = [
    {
      type: TokenTypes.paren,
      value: "(",
    },
  ];
  const code = "(";
  expect(tokenizer(code)).toEqual(tokens);
});

test("name", () => {
  const tokens = [
    {
      type: TokenTypes.name,
      value: "add",
    },
  ];
  const code = "add";
  expect(tokenizer(code)).toEqual(tokens);
});

test("number", () => {
  const tokens = [
    {
      type: TokenTypes.number,
      value: "22",
    },
  ];
  const code = "22";
  expect(tokenizer(code)).toEqual(tokens);
});

test("paren + name + number", () => {
  const tokens = [
    {
      type: TokenTypes.paren,
      value: "(",
    },
    {
      type: TokenTypes.name,
      value: "add",
    },
    {
      type: TokenTypes.number,
      value: "2",
    },
    {
      type: TokenTypes.number,
      value: "2",
    },
    {
      type: TokenTypes.paren,
      value: ")",
    },
  ];
  const code = "(add 2 2)";
  expect(tokenizer(code)).toEqual(tokens);
});

test("string", () => {
  const tokens = [
    {
      type: TokenTypes.paren,
      value: "(",
    },
    {
      type: TokenTypes.name,
      value: "add",
    },
    {
      type: TokenTypes.string,
      value: "hello",
    },
    {
      type: TokenTypes.string,
      value: "world",
    },
    {
      type: TokenTypes.paren,
      value: ")",
    },
  ];
  const code = '(add "hello" "world")';
  expect(tokenizer(code)).toEqual(tokens);
});
