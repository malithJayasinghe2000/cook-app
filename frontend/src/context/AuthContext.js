import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize isAuthenticated state from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  // Function to handle login
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    
    setTimeout(() => {
      logout(); 
    }, 3600000);
  };

  // Function to handle logout
  const logout = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });

      if (response.data.success) {
        setIsAuthenticated(false);
        localStorage.removeItem('isAuthenticated'); 
      } else {
        console.error('Logout failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error during logout:', error.response ? error.response.data.message : error.message);
    }
  };

 
  useEffect(() => {
    if (isAuthenticated) {
      
      const timer = setTimeout(() => {
        logout(); 
      }, 3600000); 

     
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
