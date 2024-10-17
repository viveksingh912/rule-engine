import * as parser from '@babel/parser';

export function parseRuleExpression(expression) {
  return parser.parseExpression(expression, {
    sourceType: 'module',
    plugins: ['jsx']
  });
}

export function extractImportantData(node) {
    const relevantFields = {};

    if (node.type === 'BinaryExpression' || node.type === 'LogicalExpression') {
      relevantFields.type = node.type;
      relevantFields.operator = node.operator;
      relevantFields.left = extractImportantData(node.left);
      relevantFields.right = extractImportantData(node.right);
    } else if (node.type === 'Identifier') {
      relevantFields.type = 'Identifier';
      relevantFields.name = node.name;
    } else if (node.type === 'NumericLiteral') {
      relevantFields.type = 'NumericLiteral';
      relevantFields.value = node.value;
    } else if (node.type === 'StringLiteral') {
      relevantFields.type = 'StringLiteral';
      relevantFields.value = node.value;
    }

    return relevantFields;
  }

  export function formatRuleSyntax(rule) {
    // Replace 'AND' with '&&'
    let convertedRule = rule.replace(/AND/g, '&&');
  
    // Replace 'OR' with '||'
    convertedRule = convertedRule.replace(/OR/g, '||');
    convertedRule = convertedRule.replace(/NOT/g, '!');
    // Replace '=' with '==='
    convertedRule = convertedRule.replace(/(?<![<>!=])=(?!=)/g, '===');
  
    return convertedRule;
  }
  