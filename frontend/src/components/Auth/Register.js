import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import '../../css/Register.css'; // Import CSS
import { useNavigate,Link } from 'react-router-dom';

const Register = () => {
  const [apiError, setApiError] = useState(''); 
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string().required('Phone number is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm password is required'),
    }),
    onSubmit: async (values) => {
      setApiError(''); 
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, values);
        console.log(res.data);

        navigate('/login');
        
      } catch (err) {
        
        if (err.response && err.response.data && err.response.data.message) {
          setApiError(err.response.data.message); // Set the error message from the response
        } else {
          setApiError('An unexpected error occurred. Please try again.'); // Fallback error message
        }
      }
    },
  });

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={formik.handleSubmit}>
     <h2 className='reg-logo' style={{ textAlign: "center " }}> <Link className='reg-logo' to="/">cook</Link></h2>
        <h2>Register</h2>


        <div className='row'>
          <div className='col-6'>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}
              />
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="error-message">{formik.errors.firstName}</div>
              ) : null}
            </div>
          </div>

          <div className='col-6'>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}
              />
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="error-message">{formik.errors.lastName}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="abc@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.email && formik.errors.email ? 'error' : ''}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-message">{formik.errors.email}</div>
              ) : null}
            </div>
          </div>

          <div className='col-6'>
            <div className="form-group">
              <input
                type="text"
                name="phoneNumber"
                placeholder="011 2222 333"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.phoneNumber && formik.errors.phoneNumber ? 'error' : ''}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                <div className="error-message">{formik.errors.phoneNumber}</div>
              ) : null}
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-6'>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.password && formik.errors.password ? 'error' : ''}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-message">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>

          <div className='col-6'>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'error' : ''}
              />
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="error-message">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
          </div>
        </div>
        {apiError && <div className="error-message" style={{textAlign:'center'}}>{apiError}</div>} 

        <button type="submit" className="submit-button">
          Create Account
        </button>

        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
