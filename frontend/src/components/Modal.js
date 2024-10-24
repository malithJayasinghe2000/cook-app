import React from 'react';
import '../css/Modal.css'; 
import { FaWindowClose  } from 'react-icons/fa';


const Modal = ({ isOpen, onClose, meal }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
      <button className="close-modal" onClick={onClose}>
      <FaWindowClose />
      </button>

        <h2  className='h2-modal'>{meal.strMeal}</h2>
        <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image"/>
        <h3>Ingredients</h3>
        <ul>
          {[...Array(20)].map((_, index) => {
            const ingredient = meal[`strIngredient${index + 1}`];
            const measure = meal[`strMeasure${index + 1}`];
            return (
              ingredient && (
                <li key={index}>
                  {measure} {ingredient}
                </li>
              )
            );
          })}
        </ul>
        <h3>Instructions</h3>
        <p>{meal.strInstructions}</p>
        <a href={meal.strSource} target="_blank" rel="noopener noreferrer">
          Source Recipe
        </a>
      </div>
    </div>
  );
};

export default Modal;
