// // src/services/api.js
// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8000/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   withCredentials: true, // Important for cookie-based authentication
// });

// export const register = (userData) => api.post('/auth/register', userData);
// export const login = (userData) => api.post('/auth/login', userData);
// export const logout = () => api.post('/auth/logout');

// export const getCategories = () => api.get('/meals/categories');
// export const getRecipesByCategory = (category) => api.get(`/meals/recipes/${category}`);
// export const getRecipeDetails = (idMeal) => api.get(`/meals/recipe/${idMeal}`);

// export const addFavoriteRecipe = (idMeal) => api.post('/user/add-favorites', { idMeal });
// export const removeFavoriteRecipe = (idMeal) => api.delete('/user/remove-favorites', { data: { idMeal } });
// export const getFavoriteRecipes = () => api.get('/user/favorites');
