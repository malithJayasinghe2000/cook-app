// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Add favorite recipe
router.post('/add-favorites', protect, addFavoriteRecipe);

// Remove favorite recipe
router.delete('/remove-favorites', protect, removeFavoriteRecipe);

// Get favorite recipes
router.get('/favorites', protect, getFavoriteRecipes);

module.exports = router;
