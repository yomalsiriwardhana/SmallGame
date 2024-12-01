import React, { useState } from 'react'; 
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Assuming you're using the same CSS structure

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in successfully");

      // Get the current user and update state in App.js
      const user = auth.currentUser;
      setUser(user); // Set the logged-in user in the parent component (App.js)

      // Redirect to Levels page after successful login
      navigate('/levels'); // Ensure the route to Levels is '/levels'
    } catch (error) {
      console.error("Error logging in user:", error);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="login">
      <div className="imgl"></div>
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
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
