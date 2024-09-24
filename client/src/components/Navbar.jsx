import React from 'react';
import auth from '../utils/auth';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">DND-Game</a>
        <button 
        className="navbar-toggler" 
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation" >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/characters">Characters</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/storyline">Storyline</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/leaderboard">Leaderboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login" onClick={() => { auth.logout(); }}>login</a>
            </li>
          
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;