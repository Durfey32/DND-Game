import React, { useState, useEffect } from 'react';

// Helper function to get level XP threshold
const getLevelXPThreshold = (level) => {
  const value = Math.floor(75 + (400 + 75 * Math.pow(1.10409, level)));
  return value;
};

// Helper function to get XP thresholds up to a max level
const getXPThresholds = () => {
  const maxLevel = 50;
  const levelXPThresholds = new Map();

  for (let level = 1; level < maxLevel; level++) {
    const levelXP = getLevelXPThreshold(level);
    levelXPThresholds.set(level, levelXP);
  }

  return levelXPThresholds;
};

// Function to check if user can level up
const canUserLevelUp = (user) => {
  const xp = user.xp; // Assuming the user object contains xp
  const levelXPThresholds = getXPThresholds();

  for (let levels of levelXPThresholds.keys()) {
    if (!(xp >= levelXPThresholds.get(levels))) {
      if (user.level !== levels) {
        // Update the user's level
        user.setLevel(levels);
      }

      const nextLevelXP = getLevelXPThreshold(levels);
      return nextLevelXP - xp; // Return the XP needed for the next level
    }
  }

  return 0; // If the user can't level up yet
};

// React Component to display user's progress
const UserProgress = ({ user }) => {
  const [xpToNextLevel, setXpToNextLevel] = useState(0);

  useEffect(() => {
    const xpNeeded = canUserLevelUp(user);
    setXpToNextLevel(xpNeeded);
  }, [user]);

  return (
    <div>
      <h1>{user.name}'s Progress</h1>
      <p>Current Level: {user.level}</p>
      <p>XP to next level: {xpToNextLevel}</p>
    </div>
  );
};


const App = () => {

  const [user, setUser] = useState({
    name: 'John',
    xp: 1000, // Example XP
    level: 5, // Current level
    setLevel: (newLevel) => setUser((prevUser) => ({ ...prevUser, level: newLevel })),
  });

  return (
    <div>
      <UserProgress user={user} />
    </div>
  );
};

export default App;