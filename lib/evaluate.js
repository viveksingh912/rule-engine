export const evaluateNode = (node, mockData) => {
    switch (node.type) {
      case 'LogicalExpression':
        const leftValue = evaluateNode(node.left);
        const rightValue = evaluateNode(node.right);

        // Replace logical operators with their evaluated values
        if (node.operator === '&&') {
          return leftValue && rightValue; // Logical AND
        } else if (node.operator === '||') {
          return leftValue || rightValue; // Logical OR
        }
        break;

      case 'BinaryExpression':
        const left = evaluateNode(node.left);
        const right = evaluateNode(node.right);

        // Evaluate binary expressions based on the operator
        switch (node.operator) {
          case '>':
            return left > right;
          case '<':
            return left < right;
          case '===':
            return left === right;
          case '!=':
            return left !== right;
          case '!==':
            return left !== right;
          // Add more operators as needed
          default:
            return null;
        }

      case 'Identifier':
        // Return the value from mockData
        return mockData[node.name] || null;

      case 'NumericLiteral':
        return node.value;

      case 'StringLiteral':
        return node.value;

      default:
        return null; 
    }
  };
