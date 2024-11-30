import React from 'react';

const Levels = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.username}!</h1> {/* Display the logged-in user's username */}
      <p>Choose your level:</p>
      {/* Render levels or game content here */}
    </div>
  );
};

export default Levels;
