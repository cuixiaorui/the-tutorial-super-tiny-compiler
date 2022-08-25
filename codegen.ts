export function codegen(node) {
  switch (node.type) {
    case "Program":
      return node.body.map(codegen).join("");
    case "ExpressionStatement":
      return codegen(node.expression) + ";";
    case "NumberLiteral":
      return node.value;
    case "CallExpression":
      return (
        node.callee.name + "(" + node.arguments.map(codegen).join(", ") + ")"
      );
  }
}
