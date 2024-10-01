import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import React from 'react';
// import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
// import Leaderboard from './components/Leaderboard';

function App() {
  return (
    <div >
      <Navbar />
      <main className="d-flex justify-content-center container">
        <Outlet />
        {/* <h1>DND Game Leaderboard</h1>
        <Leaderboard /> */}
      </main>
    </div>
  );
}

export default App;