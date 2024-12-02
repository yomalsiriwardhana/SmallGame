import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Instructions from './pages/Instructions';
import Levels from './pages/Levels';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import TomatoGame from './pages/Game';
import Scoreboard from './pages/Scoreboard';
import Profile from './pages/Profile'; // Add the Profile page

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route 
          path="/levels" 
          element={user ? <Levels user={user} username={username} /> : <Login setUser={setUser} />} 
        />
        <Route 
          path="/game" 
          element={user ? <TomatoGame user={user} username={username} /> : <Login setUser={setUser} />} 
        />
        <Route 
          path="/profile" 
          element={user ? <Profile user={user} username={username} setUsername={setUsername} /> : <Login setUser={setUser} />} 
        />
        <Route path="/scoreboard" element={<Scoreboard username={username} />} />
      </Routes>
    </Router>
  );
}

export default App;
