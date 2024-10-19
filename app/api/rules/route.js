import { connectToDatabase } from '@/lib/db'; // 
import AST from '../../../models/ast'; // 
import { NextResponse } from 'next/server'; // Import NextResponse
import { extractImportantData, formatRuleSyntax, getAst, parseRuleExpression } from '@/lib/parser';

export async function POST(request) {
  await connectToDatabase();
  const body = await request.json();
  let {rule} =  body;
  try {
    if (!Array.isArray(rule)) {
      rule = [rule];
    }
    
    const asts = [];
    
    rule.forEach((r) => {
      const formatted = formatRuleSyntax(r);
      const ast = parseRuleExpression(formatted);
      const required = extractImportantData(ast);
      asts.push(new AST({ ast: required, data: r }));
    });

    console.log(asts);
  
    const combinedAst = {
      type: "LogicalExpression",
      operator: "&&",
      left: asts[0],
      right: asts.slice(1).reduce((acc, currAst) => ({
        type: "LogicalExpression",
        operator: "&&",
        left: acc,
        right: currAst
      }), asts[0])
    };
    const combinedAstDocument = new AST({ ast: combinedAst, data: rule });
    await combinedAstDocument.save();
    
    return NextResponse.json(combinedAstDocument, { status: 201 });
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
