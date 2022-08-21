import { ChildNode, NodeTypes, RootNode } from "./ast";

const nodeTypeToCallMethod = {
  [NodeTypes.CallExpression]: "CallExpression",
  [NodeTypes.NumberLiteral]: "NumberLiteral",
  [NodeTypes.Program]: "Program",
  [NodeTypes.StringLiteral]: "StringLiteral",
} as const;

type ParentNode = RootNode | ChildNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface MethodOptions {
  enter: MethodFn;
  exit: MethodFn;
}
export interface TraversOptions {
  Program?: MethodOptions;
  NumberLiteral?: MethodOptions;
  CallExpression?: MethodOptions;
}

export function traverse(rootNode: RootNode, options: TraversOptions) {
  // 遍历树 深度优先搜索
  function traverArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverNode(node, parent);
    });
  }

  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    // enter
    const methods = options[nodeTypeToCallMethod[node.type]];
    if (methods) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      case NodeTypes.Program:
        traverArray(node.body, node);
        break;
      case NodeTypes.CallExpression:
        traverArray(node.params, node);
        break;
      case NodeTypes.NumberLiteral:
        break;
      default:
        break;
    }

    // exit
    if (methods) {
      methods.exit(node, parent);
    }
  }
  traverNode(rootNode);
}
