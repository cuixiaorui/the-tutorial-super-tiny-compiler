export enum NodeTypes {
  NumberLiteral = "NumberLiteral",
  Program = "Program",
  StringLiteral = "StringLiteral",
  CallExpression = "CallExpression",
}

export type ChildNode = NumberLiteralNode | CallExpressionNode | StringLiteralNode;

export interface Node {
  type: NodeTypes;
}

export interface NumberLiteralNode extends Node {
  type: NodeTypes.NumberLiteral;
  value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
  type: NodeTypes.StringLiteral;
}

export interface CallExpressionNode extends Node {
  name: string;
  params: ChildNode[];
  type: NodeTypes.CallExpression;
}

export interface RootNode extends Node {
  body: ChildNode[];
  type: NodeTypes.Program
}

export function createStringLiteralNode(value): StringLiteralNode {
  return {
    type: NodeTypes.StringLiteral,
    value,
  };
}

export function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  };
}

export function createNumberLiteralNode(value): NumberLiteralNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  };
}

export function createCallExpression(name): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  };
}
