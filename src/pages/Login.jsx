import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // For navigating to Levels page after login

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Sign in user with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Retrieve the user's username from Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Set the username in the application state
        const userData = userDoc.data();
        const loggedInUser = {
          uid: user.uid,
          username: userData.username,
        };
        setUser(loggedInUser); // Update user state with username
        
        // Navigate to Levels page after successful login
        navigate('/levels');
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error logging in. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
