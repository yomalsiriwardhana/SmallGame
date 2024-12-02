import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { Link } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState(''); // Added state to differentiate between success and error alerts

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // Get the current user and update state in App.js
      const user = auth.currentUser;
      setUser(user);

      // Set the success alert message
      setAlertMessage('Login successful! Redirecting to Next page...');
      setAlertType('success');

      // Redirect to Levels page after a short delay (for better UX)
      setTimeout(() => {
        navigate('/levels'); // Ensure the route to Levels is '/levels'
      }, 2000); // 1.5 seconds delay for the success message to be visible
    } catch (error) {
      console.error("Error logging in user:", error);
      // Set the error alert message
      setAlertMessage('Invalid email or password. Please try again.');
      setAlertType('error');
    }
  };

  return (
    <div className="login">
      {/* Display alert message */}
      {alertMessage && (
        <div className={`alert ${alertType}`}>
          <p>{alertMessage}</p>
        </div>
      )}

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
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

        {/* Register link */}
        <p className="register-link">
          Don't have an account?{' '}
          <Link to="/register" className="register-text">Register here</Link>
        </p>

        <div className="imgl"></div>
      </form>
    </div>
  );
};

export default Login;
