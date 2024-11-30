// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <div className="home">
      <form id="homeForm">
        <h2 id="a">BABY ELEPHANT</h2>
        <h2 id="b">Forest Math Mission</h2>
        <Link to="/login">
          <button id="login-btnn">Login</button>
        </Link>
        <Link to="/register">
          <button id="register-btn">Sign Up</button>
        </Link>
        <Link to="/instructions">
          <button id="instructions-btn">Instructions</button>
        </Link>
        <div className="imgii" />
      </form>
    </div>
  );
};

export default Home;
