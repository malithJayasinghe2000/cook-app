import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import Modal from '../components/Modal';
import '../css/Favorites.css';
import Navbar from '../components/Navbar';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [mealDetails, setMealDetails] = useState({});
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true); 
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/user/favorites`, {
          withCredentials: true,
        });
        setFavorites(res.data.favorites);
      } catch (err) {
        console.error('Error fetching favorites:', err);
        setError('Failed to load favorite recipes.');
      } finally {
        setLoading(false); 
      }
    };
  
    fetchFavorites();
  }, []);
  

  useEffect(() => {
    const fetchAllMealDetails = async () => {
      setLoading(true); // 
      const detailsPromises = favorites.map((favorite) =>
        fetchMealDetails(favorite.idMeal)
      );
  
      const detailsArray = await Promise.all(detailsPromises);
  
      const detailsMap = detailsArray.reduce((acc, detail, index) => {
        if (detail) {
          acc[favorites[index].idMeal] = detail;
        }
        return acc;
      }, {});
  
      setMealDetails(detailsMap);
      setLoading(false); 
    };
  
    if (favorites.length > 0) {
      fetchAllMealDetails();
    }
  }, [favorites]);
  

  const fetchMealDetails = async (idMeal) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/meals/recipes/details/${idMeal}`);
      return res.data.data;
    } catch (err) {
      console.error('Error fetching meal details:', err);
      return null;
    }
  };

  const handleCardClick = (idMeal) => {
    setSelectedMeal(mealDetails[idMeal]);
    setModalOpen(true);
  };

  const removeFavorite = async (idMeal) => {
    try {
      const cardElement = document.getElementById(`favorite-${idMeal}`);
      cardElement.classList.add('fade-out'); 
      
      setTimeout(async () => {
        const res = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/user/remove-favorites`, {
          data: { idMeal },
          withCredentials: true,
        });
  
        if (res.data.success) {
          setFavorites((prev) => prev.filter((fav) => fav.idMeal !== idMeal));
        }
      }, 500); 
    } catch (err) {
      console.error('Error removing favorite:', err.response ? err.response.data.message : err.message);
    }
  };
  

  return (
    <div className="favorites-app">
          <Navbar />
      {loading ? (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          {favorites.length ? (
            <div className="favorites-grid">
              {favorites.map((favorite) => (
                <div
                key={favorite.idMeal}
                id={`favorite-${favorite.idMeal}`}  // Unique id to target this element
                className="favorites-card"
                onClick={() => handleCardClick(favorite.idMeal)}
              >
              
                  <img
                    src={mealDetails[favorite.idMeal]?.strMealThumb}
                    alt={mealDetails[favorite.idMeal]?.strMeal}
                    className="favorites-image"
                  />
                  <div className="favorites-info">
                    <div className="favorites-category-button">
                      <p className="favorites-category">{mealDetails[favorite.idMeal]?.strCategory}</p>
                      <button
                        className="favorites-heart-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFavorite(favorite.idMeal);
                        }}
                      >
                        <FaHeart color="red" />
                      </button>
                    </div>
                  </div>
                  <h4 className="favorites-title">{mealDetails[favorite.idMeal]?.strMeal}</h4>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorite recipes found.</p>
          )}
  
          {selectedMeal && (
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              meal={selectedMeal}
            />
          )}
        </>
      )}
    </div>
  )
}
  
export default Favorites;
