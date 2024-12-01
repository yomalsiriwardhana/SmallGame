import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Instructions from './pages/Instructions';
import Levels from './pages/Levels';
import { auth, db } from './firebase'; // Import Firebase
import { doc, getDoc } from 'firebase/firestore'; // To fetch user data

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
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route 
          path="/levels" 
          element={user ? <Levels user={user} username={username} /> : <Login setUser={setUser} />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
