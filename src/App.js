import React, { useState } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Instructions from './pages/Instructions'; // Ensure this path is correct
import Levels from './pages/Levels';

function App() {
  const [user, setUser] = useState(null); // State to hold the logged-in user's data

  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />
        
        {/* Login Page */}
        <Route 
          path="/login" 
          element={<Login setUser={setUser} />} // Pass setUser to login to update user state
        />
        
        {/* Registration Page */}
        <Route path="/register" element={<Register />} />
        
        {/* Instructions Page */}
        <Route path="/instructions" element={<Instructions />} />
        
        {/* Levels Page */}
        <Route 
          path="/levels" 
          element={user ? <Levels user={user} /> : <Login setUser={setUser} />} // If user is logged in, show levels, otherwise redirect to login
        />
      </Routes>
    </Router>
  );
}

export default App;
