import React, { useState, useEffect } from 'react';
import './game.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';
import GameOver from '../components/gameover/GameOver';
import audioFile from '../assets/audioFile.mp3';
import { getFirestore, collection, addDoc, updateDoc, getDocs, doc } from 'firebase/firestore';

const TomatoGame = ({ user, username }) => {
  const [quest, setQuest] = useState('');
  const [solution, setSolution] = useState(-1);
  const [options, setOptions] = useState([]);
  const [note, setNote] = useState('Select the correct answer.');
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [audio] = useState(new Audio(audioFile));
  const [isMuted, setIsMuted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [level, setLevel] = useState(1);
  const [showImg2, setShowImg2] = useState(false); // New state for image change
  const navigate = useNavigate();

  const fetchImage = async () => {
    try {
      const response = await fetch('https://marcconrad.com/uob/banana/api.php');
      if (response.ok) {
        const data = await response.text();
        startQuest(data);
      } else {
        console.error('Failed to fetch image from the API.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, []);

  useEffect(() => {
    const handlePlay = () => {
      audio.loop = true;
      audio.volume = isMuted ? 0 : 1;
      audio.play();
    };
    const handleClick = () => {
      document.removeEventListener('click', handleClick);
      handlePlay();
    };
    document.addEventListener('click', handleClick);
    return () => {
      audio.pause();
      document.removeEventListener('click', handleClick);
    };
  }, [audio, isMuted]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds === 0) {
        clearInterval(timer);
        handleGameOver();
      } else {
        setSeconds((prev) => prev - 1);
        setShowImg2(seconds <= 10); // Show "img2" in the last 10 seconds
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [seconds]);

  const startQuest = (data) => {
    try {
      const parsed = JSON.parse(data);
      setQuest(parsed.question);
      setSolution(parsed.solution);

      // Generate random options, including the correct answer
      const answers = new Set([parsed.solution]);
      while (answers.size < 4) {
        answers.add(Math.floor(Math.random() * 10)); // Adjust range as needed
      }
      setOptions(Array.from(answers).sort(() => Math.random() - 0.5));
      setNote('Select the correct answer.');
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
  };

  const handleAnswerSelection = (selectedAnswer) => {
    if (parseInt(selectedAnswer, 10) === solution) {
      setNote('Correct!');
      updateScore(true);
      levelUp();
    } else {
      handleGameOver();
    }
  };

  const updateScore = (isCorrect) => {
    setScore((prevScore) => (isCorrect ? prevScore + 5 : Math.max(prevScore - 1, 0)));
  };

  const levelUp = () => {
    if (level < 4) {
      setLevel((prevLevel) => prevLevel + 1);
      setSeconds(30);
      fetchImage();
      setShowImg2(false); // Reset to show "img1" at the start of each level
    } else {
      handleGameOver();
    }
  };

  const saveScoreToDatabase = async (finalScore) => {
    try {
      const db = getFirestore();
      const scoresCollection = collection(db, 'scores');
      const userEmail = getCookie('email');
      const querySnapshot = await getDocs(scoresCollection);
      const userDoc = querySnapshot.docs.find(doc => doc.data().userEmail === userEmail);
      if (userDoc) {
        await updateDoc(doc(scoresCollection, userDoc.id), { score: finalScore });
      } else {
        await addDoc(scoresCollection, {
          userEmail,
          score: finalScore,
          timestamp: new Date(),
        });
      }
    } catch (error) {
      console.error('Error saving/updating score to database: ', error);
    }
  };

  const handleGameOver = () => {
    saveScoreToDatabase(score);
    setIsGameOver(true);
  };

  const handleTryAgain = () => {
    setScore(0);
    setSeconds(30);
    setIsGameOver(false);
    setLevel(1);
    setShowImg2(false);
    fetchImage();
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div>
      <Navbar />
      <div className="bg">
        {isGameOver ? (
          <GameOver finalScore={score} handleTryAgain={handleTryAgain} />
        ) : (
          <>
            <div className="user-info">
              <span id="username">{username}</span> {/* Display the username */}
            </div>
            <div className={showImg2 ? 'img2' : 'img1'} />
            <div id="question-image">
              <img src={quest} alt="Question" id="quest" className="color-image" />
            </div>
            <p id="note">{note}</p>
            <div className="options">
              {options.map((option, index) => (
                <button
                  key={index}
                  className="answer-btn"
                  onClick={() => handleAnswerSelection(option)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button className="mute-btn" onClick={handleMuteToggle}>
              {isMuted ? ' 🔇' : ' 🔊'}
            </button>
            <div>
              <p id="timer">Timer : {seconds} s</p>
              <p id="score">Score : {score}</p>
              <p id="level">Level : {level}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TomatoGame;
