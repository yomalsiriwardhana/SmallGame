import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Correct imports
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; // Register page route
import Instructions from './pages/Instructions';
import Levels from './pages/Levels';
import { auth, db } from './firebase'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore'; // To fetch user data
import TomatoGame from './pages/Game'; // Adjust the path based on where TomatoGame is located
import Scoreboard from './pages/Scoreboard'; // Import the Scoreboard page

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(''); // Store username

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch username from Firestore using currentUser.uid
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }
      } else {
        setUser(null);
        setUsername('');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Routes> {/* Ensure Routes wraps all Route components */}
        {/* Routes that are accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} /> {/* Register page is always accessible */}
        <Route path="/instructions" element={<Instructions />} />

        {/* Protected Routes */}
        <Route 
          path="/levels" 
          element={user ? <Levels user={user} username={username} /> : <Login setUser={setUser} />} 
        />

        <Route 
          path="/game" 
          element={user ? <TomatoGame user={user} username={username} /> : <Login setUser={setUser} />} 
        />
        
        {/* Scoreboard Route */}
        <Route path="/scoreboard" element={<Scoreboard username={username} />} />

      </Routes>
    </Router>
  );
}

export default App;
