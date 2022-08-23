import { expect, test } from "vitest";
import { NodeTypes, RootNode } from "./ast";
import { traverser, Visitor } from "./traverser";
// 遍历树
test("traverser", () => {
  const ast: RootNode = {
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

  const callCounts: Array<string | NodeTypes >[] = [];
  const visitor: Visitor = {
    Program: {
      enter(node, parent) {
        callCounts.push(["program-enter", node.type, ""]);
      },
      exit(node, parent) {
        callCounts.push(["program-exit", node.type, ""]);
      },
    },

    CallExpression: {
      enter(node, parent) {
        callCounts.push(["callExpression-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["callExpression-exit", node.type, parent!.type]);
      },
    },

    NumberLiteral: {
      enter(node, parent) {
        callCounts.push(["numberLiteral-enter", node.type, parent!.type]);
      },
      exit(node, parent) {
        callCounts.push(["numberLiteral-exit", node.type, parent!.type]);
      },
    },
  };

  traverser(ast, visitor);

  expect(callCounts).toEqual([
    ["program-enter", NodeTypes.Program, ""],
    ["callExpression-enter", NodeTypes.CallExpression, NodeTypes.Program],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    [
      "callExpression-enter",
      NodeTypes.CallExpression,
      NodeTypes.CallExpression,
    ],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-enter", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["numberLiteral-exit", NodeTypes.NumberLiteral, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.CallExpression],
    ["callExpression-exit", NodeTypes.CallExpression, NodeTypes.Program],
    ["program-exit", NodeTypes.Program, ""],
  ]);
});
