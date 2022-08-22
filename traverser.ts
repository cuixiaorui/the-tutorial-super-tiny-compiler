import { ChildNode, NodeTypes, RootNode } from "./ast";

type ParentNode = RootNode | ChildNode | undefined;
type MethodFn = (node: RootNode | ChildNode, parent: ParentNode) => void;
interface VisitorOption {
  enter: MethodFn;
  exit: MethodFn;
}
export interface Visitor {
  Program?: VisitorOption;
  NumberLiteral?: VisitorOption;
  CallExpression?: VisitorOption;
  StringLiteral?: VisitorOption
}

export function traverse(rootNode: RootNode, visitor: Visitor) {
  // 遍历树 深度优先搜索
  function traverArray(array: ChildNode[], parent: ParentNode) {
    array.forEach((node) => {
      traverNode(node, parent);
    });
  }

  function traverNode(node: RootNode | ChildNode, parent?: ParentNode) {
    // enter
    const methods = visitor[node.type];
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
