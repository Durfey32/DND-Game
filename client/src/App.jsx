import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import React from 'react';

function App() {
  return (
    <div className="d-flex justify-content-center">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
    </div>
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