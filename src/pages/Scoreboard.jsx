import React, { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore';
import Navbar from '../components/navbar/Navbar';  // Import Navbar
import './scoreboard.css';  // Assuming your CSS is in this file

const Scoreboard = ({ username }) => {  // Accept username as a prop
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const db = getFirestore();
      const scoresCollection = collection(db, 'gameScores');
      const q = query(scoresCollection, orderBy('endTime', 'desc')); // Sort by end time in descending order

      const querySnapshot = await getDocs(q);
      const scoresData = querySnapshot.docs.map(doc => doc.data());
      setScores(scoresData);
    };

    fetchScores();
  }, []);

  return (
    <div>

      <Navbar username={username} />  {/* Make sure username is passed here */}
    <div className="levels1">
    <div className="scoreboard">
      

      <div className="scoreboard-table-container">
        <h2>Scoreboard</h2>
        <table className="scoreboard-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Score</th>
              <th>Game Start Time</th>
              <th>Game End Time</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.username}</td>
                <td>{score.score}</td>
                <td>{new Date(score.startTime.seconds * 1000).toLocaleString()}</td> {/* Format start time */}
                <td>{new Date(score.endTime.seconds * 1000).toLocaleString()}</td> {/* Format end time */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div></div>
  );
};

export default Scoreboard;
