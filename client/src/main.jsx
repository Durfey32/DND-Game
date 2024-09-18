import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import Navbar from './components/Navbar';
import ActionPanel from './components/ActionPanel';
import GameMap from './components/GameMap';
import MainPage from './pages/MainPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="game-container">
        <GameMap />
        <ActionPanel />
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
]);