// models/ast.js
import mongoose from 'mongoose';

const astSchema = new mongoose.Schema({
  ast: { type: Object, required: true },
  data: {type: [String] , required: true},
}, {timestamps:true});

// Export the model
const AST = mongoose.models.AST || mongoose.model('AST', astSchema);

export default AST;