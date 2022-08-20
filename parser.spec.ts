import { describe, expect, it } from "vitest";
import { NodeTypes } from "./ast";
import { parser } from "./parser";
import { TokenTypes } from "./tokenizer";

describe("parser", () => {
  it("parser tokens to ast", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "subtract" },
      { type: TokenTypes.Number, value: "4" },
      { type: TokenTypes.Number, value: "2" },
      { type: TokenTypes.Paren, value: ")" },
      { type: TokenTypes.Paren, value: ")" },
    ];
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "2",
            },
            {
              type: NodeTypes.CallExpression,
              name: "subtract",
              params: [
                {
                  type: NodeTypes.NumberLiteral,
                  value: "4",
                },
                {
                  type: NodeTypes.NumberLiteral,
                  value: "2",
                },
              ],
            },
          ],
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("number", () => {
    const tokens = [{ type: TokenTypes.Number, value: "2" }];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.NumberLiteral,
          value: "2",
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("name", () => {
    const tokens = [{ type: TokenTypes.String, value: "hello" }];

    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.StringLiteral,
          value: "hello",
        },
      ],
    };
    expect(parser(tokens)).toEqual(ast);
  });

  it("call expression (add 1 1)", () => {
    const tokens = [
      { type: TokenTypes.Paren, value: "(" },
      { type: TokenTypes.Name, value: "add" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Number, value: "1" },
      { type: TokenTypes.Paren, value: ")" },
    ];
    const ast = {
      type: NodeTypes.Program,
      body: [
        {
          type: NodeTypes.CallExpression,
          name: "add",
          params: [
            {
              type: NodeTypes.NumberLiteral,
              value: "1",
            },
            {
              type: NodeTypes.NumberLiteral,
              value: "1",
            },
          ],
        },
      ],
    };

    expect(parser(tokens)).toEqual(ast);
  });
});
