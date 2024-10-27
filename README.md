Rule Engine with AST(NEXT JS)
Overview
This rule engine application uses an Abstract Syntax Tree (AST) to determine user eligibility based on various attributes, including age, department, income, and spending. The application is structured as a 3-tier model comprising a UI, an API layer, and a backend. Using MongoDB as a non-SQL database allows the flexible storage of AST-based rules and metadata, providing support for the dynamic creation, combination, and modification of rules.

Features
AST Representation: Converts conditional eligibility rules into AST structures for optimized rule management.
API Endpoints: Provides endpoints for rule creation and execution.
```
Prerequisites
Node.js and npm installed
Environment variables  are already add in .env file
```
Getting Started
1. Clone the Repository
```
git clone https://github.com/viveksingh912/rule-engine
```
2. Navigate to the Project Directory
```
cd rule-engine
```
3. Install Dependencies
```
npm install
```
5. Run the Project
```
npm run dev
```
Design Choices
```
Database: MongoDB was chosen due to its flexible document structure, which aligns well with the dynamic nature of AST nodes and the hierarchical rule representation.
```
API Endpoints
```
1. Create Rule AST
Endpoint: /api/rules
Method: POST
Description: Accepts a single rule or an array of rules and returns the corresponding AST structure.
Request Body:

{
   "rule": "<rule_string>" or [rule_string1, rule_string2, rule_string3]
}
by default it combines rules using AND operator

2. Evaluate Rule with Data
Endpoint: /api/rules
Method: PUT
Description: Accepts an AST and a data object to evaluate the eligibility based on defined rules.
  {
     "ast": "<ast_structure>",
     "data": {
        "age": 35,
        "department": "Sales",
        ...
     }
  }
```
