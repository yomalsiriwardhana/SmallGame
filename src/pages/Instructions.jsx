import React from 'react';
import { Link } from 'react-router-dom';
import './instructions.css';

const Instructions = () => {
  return (
    <div className="instructions">
      <div className="imgi" />
      <form id="instructForm">
        <h2 id="ia">BABY ELEPHANT</h2>
        <h2 id="ib">Forest Math Mission </h2>
        <h2 id="ic">- Instructions - </h2>
        <div className="iform-body">
          <h5 className="iform-title">
          Welcome to our instruction page! Here you will find all the
          Information you will need to get you started with this game.
          </h5>
          <h6 className="iform-title">Start the Game : </h6>
          <p className="iform-text">
            <ul>
              <li>
              Create an Account: To get started, you must create an account using your email and password.
              </li>
              <li>
                Login: After creating your account, log in with your registered email and password.
              </li>
            </ul>
          </p>

          <h6 className="iform-title">Game Rules : </h6>
          <p className="iform-text">
            <ul>
              <li>
              Start the Game: 
              Click the Start button to begin your mission.
              </li>
              <li>
              Answer the Questions: 
              You will be given a question with four answer options. Select the correct answer to proceed. 
              </li>
              <li>
              Levels: 
              The game has 4 levels in total.
              Each correct answer will increase your score.
              </li>
              <li>
              Scoring: 
              Your total score can reach up to 20 points if all answers are correct.
              Be careful: If you select an incorrect answer, the game will end, and your score will decrease.
              </li>
              <li>
              Time Limit: 
              You have 30 seconds per question to make your selection.
              </li>
              <li>
              Game Over: 
              If you answer incorrectly or time runs out, the game will end.
              </li>
              <li>
              Final Score: 
              At the end of the game, your total score will be displayed.
              </li>

            </ul>
          </p>
          <h6 className="iform-footer">We hope this instruction page has been able to help you get going with playing the game.</h6>
        </div>
        <label className="footer">DEVELOP BY YOMAL SIRIWARDHANA(2425633)</label>
        
        <Link to="/login"> {/* Link to the game page */}
          <button id="play-btn">Start Mission</button>
          
        </Link>
       
        
    
      </form>
    </div>
  )
}

export default Instructions;

