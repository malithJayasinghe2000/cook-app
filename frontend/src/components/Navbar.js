import React from 'react';
import { useAuth } from '../context/AuthContext'; 
import { Link, NavLink, useNavigate } from 'react-router-dom'; 
import '../css/Navbar.css';
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
//   const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">cook</Link>
      </div>
      <div className="navbar-middle">
        <NavLink to="/" className="navbar-link" activeClassName="active">HOME</NavLink>
        <NavLink to="/favorites" className="navbar-link" activeClassName="active">FAVORITES</NavLink>
      </div>
      <div className="navbar-links">
        {isAuthenticated ? (
          <>
            <button className="logout-button" onClick={logout}><IoIosLogOut /></button>
          </>
        ) : (
          <>
            <NavLink to="/login" className="navbar-link" activeClassName="active"><CgProfile size={28}/></NavLink>
            {/* <NavLink to="/register" className="navbar-link" activeClassName="active">Register</NavLink> */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
