// controllers/mealController.js
const axios = require('axios');

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';
let validCategories = []; // Array to hold valid categories

// Fetch categories
exports.getCategories = async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/categories.php`);
        validCategories = response.data.categories.map(cat => cat.strCategory); // Store valid categories
        res.status(200).json({
            success: true,
            data: validCategories
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching categories'
        });
    }
};

// Fetch recipes by category
exports.getRecipesByCategory = async (req, res) => {
    const { category } = req.params;

    // Validate category dynamically
    if (!validCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid category provided'
        });
    }

    try {
        const response = await axios.get(`${BASE_URL}/filter.php?c=${category}`);
        res.status(200).json({
            success: true,
            data: response.data.meals
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching recipes'
        });
    }
};

exports.getMealDetails = async (req, res) => {
    const { idMeal } = req.params; // Get idMeal from the URL parameters
    try {
        const response = await axios.get(`${BASE_URL}/lookup.php?i=${idMeal}`);
        
        // Check if the meal exists in the response
        if (response.data.meals) {
            res.status(200).json({
                success: true,
                data: response.data.meals[0], // Return the meal details
            });
        } else {
            res.status(404).json({
                success: false,
                message: "Meal not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
