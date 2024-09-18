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

export default App;