const User = require('../models/User'); 

// Add a recipe to favorites
exports.addFavoriteRecipe = async (req, res) => {
    const { idMeal } = req.body;
    const userId = req.user.id; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (user.favorites.some(fav => fav.idMeal === idMeal)) {
            return res.status(400).json({ success: false, message: 'Recipe is already in favorites' });
        }

        user.favorites.push({ idMeal });
        await user.save();

        res.status(200).json({ success: true, message: 'Recipe added to favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Remove a recipe from favorites
exports.removeFavoriteRecipe = async (req, res) => {
    const { idMeal } = req.body; 
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.favorites = user.favorites.filter(fav => fav.idMeal !== idMeal);
        await user.save();

        res.status(200).json({ success: true, message: 'Recipe removed from favorites' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get favorite recipes
exports.getFavoriteRecipes = async (req, res) => {
    const userId = req.user.id; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            favorites: user.favorites,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
