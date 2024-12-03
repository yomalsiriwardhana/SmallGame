import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar/Navbar';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import './profile.css';

const Profile = ({ user, username, setUsername }) => {
  const [gameScores, setGameScores] = useState([]); // To store game score data
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [reauthPassword, setReauthPassword] = useState(''); // For reauthentication password
  const [apiNewUsername, setApiNewUsername] = useState(username); // For API-based username update
  const [directNewUsername, setDirectNewUsername] = useState(username); // For direct username update
  const userEmail = user.email;

  // Fetch player game scores using Firestore API
  useEffect(() => {
    const fetchPlayerGameScores = async () => {
      try {
        const db = getFirestore(); // Initialize Firestore
        const q = query(
          collection(db, 'gameScores'), // Fetch data from the 'gameScores' collection
          where('username', '==', username) // Filter data where 'username' matches the current user's username
        );
        const querySnapshot = await getDocs(q); // Execute the query
        const scores = [];
        querySnapshot.forEach((doc) => {
          scores.push(doc.data()); // Push each game score document to the scores array
        });
        setGameScores(scores); // Set the fetched scores to state
      } catch (error) {
        setErrorMessage('Error fetching game data: ' + error.message); // Handle any errors
      }
    };

    fetchPlayerGameScores(); // Call the function to fetch data
  }, [username]);

  // Handle username update using the API
  const handleApiUsernameChange = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/update-username/${user.uid}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: apiNewUsername }), // Pass the new username to the API
      });

      if (!response.ok) throw new Error('Failed to update username via API'); // Handle API errors

      setUsername(apiNewUsername); // Update username state in parent component
      setSuccessMessage('Username updated successfully via API!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating username via API: ' + error.message);
      setSuccessMessage('');
    }
  };

  // Handle direct Firestore username update
  const handleDirectUsernameChange = async () => {
    try {
      if (directNewUsername.trim() === '') {
        setErrorMessage('Username cannot be empty.');
        return;
      }

      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid); // Reference to Firestore document
      await updateDoc(userRef, { username: directNewUsername }); // Update username in Firestore

      setUsername(directNewUsername); // Update state in parent component
      setSuccessMessage('Username updated successfully directly!');
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error updating username directly: ' + error.message);
    }
  };

  // Reauthenticate the user
  const reauthenticateUser = async () => {
    try {
      const credential = EmailAuthProvider.credential(userEmail, reauthPassword); // Create a credential using the email and entered password
      await reauthenticateWithCredential(user, credential); // Reauthenticate the user
      return true; // Return success
    } catch (error) {
      setErrorMessage('Reauthentication failed: ' + error.message); // Handle errors
      return false; // Return failure
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    const reauthenticated = await reauthenticateUser();
    if (!reauthenticated) return;

    try {
      await user.delete(); // Delete the user's account from Firebase Authentication
      setSuccessMessage('Account deleted successfully.');
      setErrorMessage('');
      window.location.href = '/'; // Redirect to the home page after deletion
    } catch (error) {
      setErrorMessage('Error deleting account: ' + error.message); // Handle any errors
    }
  };

  return (
    <div>
      <Navbar username={username} /> {/* Pass the username to the Navbar component */}

      <div className="profile-container">
        {/* Left Side */}
        <div className="profile-left">
          <h2>Player Information</h2>

          {/* Display error and success messages */}
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="profileField">
            <label>Update Username via API:</label>
            <input
              type="text"
              value={apiNewUsername}
              onChange={(e) => setApiNewUsername(e.target.value)} // Update the API-based username state
            />
          </div>

          <div className="profileField">
            <label>Email:</label>
            <p>{userEmail}</p> {/* Display email as read-only */}
          </div>

          {/* Reauthentication password input */}
          <div className="profileField">
            <label>Enter Password for Delete Account:</label>
            <input
              type="password"
              value={reauthPassword}
              onChange={(e) => setReauthPassword(e.target.value)} // Update reauth password state
            />
          </div>

          {/* Delete Account Button */}
          <button className="deleteButton" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>

        {/* Right Side */}
        <div className="profile-right">
          <h2>Change Username Directly</h2>
          <div className="profileField">
            <label>New Username:</label>
            <input
              type="text"
              value={directNewUsername}
              onChange={(e) => setDirectNewUsername(e.target.value)} // Update the direct username state
            />
          </div>
          <button onClick={handleDirectUsernameChange}>Update Username</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
