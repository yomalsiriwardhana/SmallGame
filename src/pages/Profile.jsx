import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import './profile.css';
import Navbar from '../components/navbar/Navbar';  // Adjust the path if needed

const Profile = ({ user, username, setUsername }) => {
  const [newUsername, setNewUsername] = useState(username);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch user email from Firebase Authentication
  const userEmail = user.email;

  // Handle username update
  const handleSave = async () => {
    try {
      // Update username in Firestore if it's different
      if (newUsername !== username) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, { username: newUsername });
        
        // Update the username in the parent state (App.js)
        setUsername(newUsername);  // Update the username in the parent state
        
        setSuccessMessage('Username updated successfully!');
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Username update failed', error);
      setErrorMessage('Error updating username: ' + error.message);
      setSuccessMessage('');
    }
  };

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await user.delete(); // Delete the user account
      window.location.href = '/'; // Redirect to home page
    } catch (error) {
      setErrorMessage('Error deleting account: ' + error.message);
    }
  };

  return (
    <div>
      <Navbar username={newUsername} /> {/* Pass the updated username */}
      
      <div className="profile">
        <div className="profileForm">
          <h2>Profile</h2>

          {/* Display error message */}
          {errorMessage && <p className="error">{errorMessage}</p>}
          
          {/* Display success message */}
          {successMessage && <p className="success">{successMessage}</p>}

          <div className="profileField">
            <label>Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </div>

          <div className="profileField">
            <label>Email:</label>
            <input
              type="text"
              value={userEmail}
              disabled
              readOnly
            />
          </div>

          <button onClick={handleSave}>Save Changes</button>
          <button className="deleteButton" onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
