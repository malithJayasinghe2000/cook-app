import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; 
import '../../css/Login.css';
import { useNavigate,Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(''); // State to hold error messages
  const { login } = useAuth(); // Use the login function from context
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Clear previous errors
    setError('');

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setError('Email is required.');
      return false;
    }
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Password validation
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    return true; // Form is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      return; // Exit if form is not valid
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, formData, { withCredentials: true });
      console.log(res.data); // Handle success (e.g., redirect to dashboard)
      login(); 
      setError('');
      navigate('/');
    } catch (err) {
      console.error(err.response.data);
      setError('Your password or username is incorrect'); // Set the error message
    }
  };

  return (
    <div className="container">
      <div className="formContainer">

      <Link to="/"><h2 className="logo" style={{ textAlign: 'center', fontWeight: 'bold' }}>cook</h2></Link>

        <h3 className="title" style={{ textAlign: 'left' }}>Login</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="inputGroup">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email address"
              className="input"
              required
            />
          </div>
          <div className="inputGroup">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className="input"
              required
            />
            <small className="errorMessage">Please enter a password</small>
          </div>
          <button type="submit" className="button">
            SIGN IN
          </button>
          {error && <small className="errorText">{error}</small>} {/* Conditionally render error message */}
        </form>
        <p className="signupText">
          Don't have an account? <a href="/register" className="signupLink">Create an account</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
