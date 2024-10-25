const express = require('express');
const { getCategories, getRecipesByCategory, getMealDetails } = require('../controllers/mealController');

const router = express.Router();

router.get('/categories', getCategories); 
router.get('/recipes/:category', getRecipesByCategory); 
router.get('/recipes/details/:idMeal', getMealDetails);

module.exports = router;
