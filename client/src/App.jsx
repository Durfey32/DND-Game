import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
        <main>
      <Outlet />
      </main>
    </>
  );
}

src/App.js

import React from 'react';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DND Game Leaderboard</h1>
      </header>
      <Leaderboard />
    </div>
  );
}

export default App;