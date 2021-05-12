const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  username: { type: String, required: true },
  title: { type: String, required: true },
  // image: { type: String, required: true},
  ingredients: { type: Array , required: true },
  instruction: {type: String , required: true }
}, {
  timestamps: true,
});



const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;