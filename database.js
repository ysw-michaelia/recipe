const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectionURL = process.env.CONNECTION_URL;

mongoose.connect(connectionURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

const recipeSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    title: String,
    ingredients: [String],
    instructions: String,
    cookingTime: Number,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// Added recipes
// const sampleRecipes = [
//     {
//         id: '1',
//         title: 'Spaghetti Carbonara',
//         ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan cheese', 'Black pepper'],
//         instructions: 'Cook spaghetti. Fry pancetta. Mix eggs and cheese. Combine all with spaghetti and pancetta.',
//         cookingTime: 20,
//     },
//     {
//         id: '2',
//         title: 'Chicken Curry',
//         ingredients: ['Chicken', 'Onions', 'Garlic', 'Ginger', 'Tomatoes', 'Spices', 'Coconut milk'],
//         instructions: 'Cook onions, garlic, and ginger. Add spices and chicken. Add tomatoes and coconut milk. Simmer until cooked.',
//         cookingTime: 40,
//     },
// ];

// Recipe.insertMany(sampleRecipes)
//     .then(() => {
//         console.log('Sample recipes added');
//     })
//     .catch((err) => {
//         console.error(err);
//     });

module.exports = Recipe;
