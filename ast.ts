export enum NodeTypes {
  NumberLiteral,
  Program,
  StringLiteral,
  CallExpression,
}

export interface Node {
  type: NodeTypes;
}

export interface NumberLiteralNode extends Node {
  value: string;
}

export interface StringLiteralNode extends Node {
  value: string;
}

export interface CallExpressionNode extends Node {
  name: string;
  params: Node[];
}

export interface RootNode extends Node {
  body: Node[];
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
