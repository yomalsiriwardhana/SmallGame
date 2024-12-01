import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './levels.css';
import { auth } from '../firebase'; // Importing auth from Firebase

const Levels = ({ user, username }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      // Redirect to login if the user is not logged in
      navigate('/login');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    // Sign out the user using Firebase authentication
    auth.signOut()
      .then(() => {
        navigate('/'); // Redirect to Home page after logout
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="levels">
      <div className="user-info">
        <span id="username">{username}</span> {/* Display the username */}
      </div>

      <form id="levelForm">
        <h2 id="d">BABY ELEPHANT</h2>
        <h2 id="e">Forest Math Mission</h2>
        <Link to="/game">
          <button id="Easy-btn">Game Start</button>
        </Link>
        <button id="Medium-btn" onClick={handleLogout}>Log Out</button>
        <div className="imgs" />
      </form>
    </div>
  );
}

export default Levels;
