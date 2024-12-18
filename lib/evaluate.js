export const evaluateNode = (node, mockData) => {
    switch (node.type) {
      case 'LogicalExpression':
        const   leftValue = evaluateNode(node.left, mockData);
        const   rightValue = evaluateNode(node.right, mockData);
        // Replace logical operators with their evaluated values
        if (node.operator === '&&') {
          return leftValue && rightValue; // Logical AND
        } else if (node.operator === '||') {
          return leftValue || rightValue; // Logical OR
        }
        break;

      case 'BinaryExpression':
        const left = evaluateNode(node.left, mockData);
        const right = evaluateNode(node.right, mockData);
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
            return 0;
        }
        break;

      case 'Identifier':
        // Return the value from mockData
        return mockData[node.name] || 0;
        break;

      case 'NumericLiteral':
        return node.value;
        break;

      case 'StringLiteral':
        return node.value;
        break;

      default:
        return 0; 
        break;
    }
  };
