import React from 'react';
import { Link } from 'react-router-dom';
import './GameOver.css';  // Ensure the case matches exactly

const GameOver = ({ finalScore, handleTryAgain }) => {
  const isMissionSuccess = finalScore === 20;
  const missionStatus = isMissionSuccess ? "Mission Pass" : "Mission Failed";

  return (
    <div className="game-over">
      <form id="game-overForm">
        <h2 style={{ color: isMissionSuccess ? 'blue' : 'red' }}>
          {missionStatus}
        </h2>
        <p>Your final score is {finalScore}.</p>
        <button className="try-again-btn" onClick={handleTryAgain}>
          Try Again
        </button>
        <Link to="/Levels" className="back-to-home">Go Back to Home</Link>
      </form>
    </div>
  );
};

export default GameOver;
