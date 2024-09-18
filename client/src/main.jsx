// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import React from 'react'
// import Navbar from './components/Navbar';
// import ActionPanel from './components/ActionPanel';
// import GameMap from './components/GameMap';
import MainPage from './pages/MainPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// function App() {
//   return (
//     <div className="App">
//       <Navbar />
//       <div className="game-container">
//         <GameMap />
//         <ActionPanel />
//       </div>
//     </div>
//   );
// }

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: '/characters',
        element: <CreateCharacter />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}