import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import './register.css'; // Import the CSS for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState(''); // State for alert messages

  // Validation functions
  const validateForm = () => {
    if (!username || !email || !password) {
      return 'All fields are required.';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    if (password.length < 6) {
      return 'Password should be at least 6 characters long.';
    }

    return ''; // If no validation errors
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validate form fields
    const validationError = validateForm();
    if (validationError) {
      setAlertMessage(validationError);
      return;
    }

    try {
      // Create a new user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Store user data in Firestore, including the username
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        username: username, // Save username to Firestore
        createdAt: new Date(),
      });

      // If registration is successful, display success alert
      setAlertMessage('Your Registration successful! You can Login now');
    } catch (error) {
      console.error('Error registering user:', error);
      setAlertMessage('Error registering user. Please try again.');
    }
  };

  const handleAlertClose = () => {
    setAlertMessage(''); // Close the alert when the "OK" button is clicked
  };

  return (
    <div className="register">
      {/* Display alert message */}
      {alertMessage && (
        <div>
          <div className={`alert ${alertMessage.includes('successful') ? 'success' : 'error'}`}>
            <p>{alertMessage}</p>
          </div>

          {/* Display "OK" button only for error alerts */}
          {alertMessage.includes('Error') && (
            <div className="alertbtn">
              <button onClick={handleAlertClose}>OK</button>
            </div>
          )}
        </div>
      )}

      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Register</button>
        </form>

        <div className="formLink">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
        <div className="imgr"></div>
      </div>
    </div>
  );
};

export default Register;
