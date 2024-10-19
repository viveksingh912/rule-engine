import { connectToDatabase } from '@/lib/db'; // 
import AST from '../../../models/ast'; // 
import { NextResponse } from 'next/server'; // Import NextResponse
import { extractImportantData, formatRuleSyntax, getAst, parseRuleExpression } from '@/lib/parser';
import { evaluateNode } from '@/lib/evaluate';

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  let {rule, combineOperator} =  body;
  try {
    if (!Array.isArray(rule)) {
      rule = [rule];
    }
    if(combineOperator == 'AND')combineOperator ='&&';
    else if(combineOperator == 'OR') combineOperator ='||';
    else combineOperator = '&&';
    
    const asts = [];
    
    rule.forEach((r) => {
      const formatted = formatRuleSyntax(r);
      const ast = parseRuleExpression(formatted);
      const required = extractImportantData(ast);
      asts.push(new AST({ ast: required, data: r }));
    });
  
    const combinedAst = {
      type: "LogicalExpression",
      operator: combineOperator,
      left: asts[0],
      right: asts.slice(1).reduce((acc, currAst) => ({
        type: "LogicalExpression",
        operator: combineOperator,
        left: acc,
        right: currAst
      }), asts[1])
    };
    const combinedAstDocument = new AST({ ast: combinedAst, data: rule });
    await combinedAstDocument.save();
    
    return NextResponse.json(combinedAstDocument, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectToDatabase();
  const body = await request.json();
  let {rule, mockData} =  body;
  console.log(mockData);
  try {
    const val = evaluateNode(rule?.ast, mockData);
    return NextResponse.json(val, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET() {
  await connectToDatabase();

  try {
    const asts = await AST.find();
    return NextResponse.json(asts, { status: 200 }); // Use NextResponse.json
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching ASTs' }, { status: 500 }); // Use NextResponse.json
  }
}
