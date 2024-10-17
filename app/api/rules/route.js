import { connectToDatabase } from '@/lib/db'; // 
import AST from '../../../models/ast'; // 
import { NextResponse } from 'next/server'; // Import NextResponse
import { parseRuleExpression, formatRuleSyntax, extractImportantData } from '@/lib/parser';

export async function POST(request) {
  await connectToDatabase();

  const { searchParams } = new URL(request.url); // Access the URL of the request
  const ruleString = searchParams.get('ruleString');
  try {
    const formatedRule = formatRuleSyntax(ruleString);
    const allData = parseRuleExpression(formatedRule);
    const ast = extractImportantData(allData);
    const newAst = new AST({ ast });
    await newAst.save();
    
    return NextResponse.json(newAst, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error saving AST' }, { status: 500 });
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
