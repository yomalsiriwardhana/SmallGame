import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';

function Home() {
  return (
    <div className="home">
      <div id="homeForm">
        <h1 id="a">Welcome to the Game</h1>
        <h2 id="b">Please Log in or Register to Continue</h2>

        <Link to="/login">
          <button id="login-btnn">Login</button>
        </Link>

        <Link to="/register">
          <button id="register-btn">Register</button> {/* Ensure this points to /register */}
        </Link>

        <Link to="/instructions">
          <button id="instructions-btn">Instructions</button>
        </Link>
        <div className="imgii"></div>
      </div>
    </div>
  );
}

export default Home;
