// routes/mealRoutes.js
const express = require('express');
const { getCategories, getRecipesByCategory, getMealDetails } = require('../controllers/mealController');

const router = express.Router();

// Define the routes
router.get('/categories', getCategories); // Route to get categories
router.get('/recipes/:category', getRecipesByCategory); // Route to get recipes by category
router.get('/recipes/details/:idMeal', getMealDetails);

module.exports = router;
