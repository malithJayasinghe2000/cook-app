import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import Modal from '../components/Modal.js';
import '../css/RecipeApp.css';
import Navbar from '../components/Navbar.js';

const RecipeApp = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/meals/categories`);

        setCategories(res.data.data);
        if (res.data.data.length > 0) {
          setSelectedCategory(res.data.data[0]);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false); 
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchRecipes = async () => {
        setLoading(true); 
        try {
          const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/meals/recipes/${selectedCategory}`);
          setRecipes(res.data.data);
        } catch (err) {
          console.error('Error fetching recipes:', err);
        } finally {
          setLoading(false); 
        }
      };
      fetchRecipes();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); // Start loading
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/favorites`, {
          withCredentials: true,
        });
        setFavorites(res.data.favorites.map(fav => fav.idMeal));
      } catch (err) {
        console.error('Error fetching favorites:', err);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (idMeal, event) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
  
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
  
    const heartButton = event.currentTarget;
  
    
    heartButton.classList.add('heart-animation');
  
    setTimeout(() => {
      heartButton.classList.remove('heart-animation');
    }, 600); // Match the duration of the animation (0.6s)
  
    if (isFavorite(idMeal)) {
      try {
        const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/user/remove-favorites`, {
          data: { idMeal },
          withCredentials: true
        });
        if (res.data.success) {
          setFavorites((prev) => prev.filter((fav) => fav !== idMeal));
        }
      } catch (err) {
        console.error('Error removing favorite:', err.response ? err.response.data.message : err.message);
      }
    } else {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/add-favorites`, { idMeal }, { withCredentials: true });
        if (res.data.success) {
          setFavorites((prev) => [...prev, idMeal]);
        }
      } catch (err) {
        console.error('Error adding favorite:', err.response ? err.response.data.message : err.message);
      }
    }
  };
  

  const isFavorite = (idMeal) => favorites.includes(idMeal);

  const fetchMealDetails = async (idMeal) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/meals/recipes/details/${idMeal}`);
      setSelectedMeal(res.data.data);
      setModalOpen(true);
    } catch (err) {
      console.error('Error fetching meal details:', err);
    }
  };

  return (
    <div className="recipe-app">
        <Navbar />
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
      
      {/* Categories */}
      <div className="category-buttons">
        {categories.slice(0, 5).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? 'active' : ''}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div className="recipe-grid">
        {recipes.length ? (
          recipes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" onClick={() => fetchMealDetails(recipe.idMeal)} />
              <div className="recipe-info">
                <div className='row recipe-header'>
                  <div className='col-6'>
                    <p className="category">{selectedCategory}</p>
                  </div>
                  <div className='col-6'>
                  <button
                    className="heart-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(recipe.idMeal, e); // Pass the event here
                    }}
                  >
                    {isFavorite(recipe.idMeal) ? <FaHeart color="red" /> : <FaRegHeart />}
                  </button>

                  </div>
                </div>
              </div>
              <div className='row rec-t'>
              <p className="recipe-title">
                {recipe.strMeal.length > 24 ? recipe.strMeal.slice(0, 24) + '...' : recipe.strMeal}
              </p>

              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      {/* Modal for displaying meal details */}
      <Modal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        meal={selectedMeal} 
        favorites={favorites}
      />
    </div>
  );
};

export default RecipeApp;
