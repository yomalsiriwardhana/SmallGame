import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Ensure the case matches exactly

function Navbar() {
  return (
    <div className="navbar">
      <div className="title">BABY ELEPHANT</div>
      <div className="nav-links">
        <Link to="/scoreboard" className="nav-link">Scoreboard</Link>
        <Link to="/instructions" className="nav-link">Instructions</Link>
        <Link to="/Levels" className="nav-link">Home</Link>
        <div className="logout">SIRIWARDHANA</div>  {/* Corrected h1 tag to div */}
      </div>
    </div>
  );
}

export default Navbar;
