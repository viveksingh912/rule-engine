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
    if(typeof rule === 'string'){
      try{
      rule = await JSON.parse(rule);
      }
      catch(error){
        console.log(error);
      }
    }
    if (!Array.isArray(rule)) {
      rule = [rule];
    }
    if(combineOperator == 'AND')combineOperator ='&&';
    else if(combineOperator == 'OR') combineOperator ='||';
    else combineOperator = '&&';
    
    const combineDRule= rule.join(` ${combineOperator} `);
    const formatted = formatRuleSyntax(combineDRule);
    const ast = parseRuleExpression(formatted);
    const required = extractImportantData(ast);
    const combinedAstDocument = new AST({ ast: required, data: rule });
    await combinedAstDocument.save();
    
    return NextResponse.json(combinedAstDocument?.ast, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(request) {
  await connectToDatabase();
  const body = await request.json();
  let {ast, data} =  body;
  console.log(ast,data);
  if(typeof ast === 'string'){
    try{
    ast= JSON.parse(ast);
    }catch(error){
      console.log(error);
    }
  }
  if(typeof data === 'string'){
    try{
    data= JSON.parse(data);
    }
    catch(error){
      console.log(error);
    }
  }
  try {
    const val = evaluateNode(ast, data);
    return NextResponse.json({result: val}, { status: 200 });
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
