// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import Navbar from './components/Navbar'; 
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import RecipeApp from './pages/RecipeApp';
import Favorites from './pages/Favorites';
import ProtectedRoute from './components/Auth/ProtectedRoute'; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
      
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/"  element={<RecipeApp />}  />
          <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} />} /> {/* Protect the Favorites route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
