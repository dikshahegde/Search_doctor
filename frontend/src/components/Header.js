import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo"><h3>Doctor Finder</h3></div> 
      <div className="navbar">
        <div className="links">
          <Link className="link" to="/">Home</Link>
          <Link className="link" to="/login">Login</Link>
          <Link className="link" to="/register">Register</Link>
          <Link className="link" to="/about">About</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
