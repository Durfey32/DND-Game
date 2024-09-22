
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Login from './pages/Login.jsx'
import React from 'react'

import MainPage from './pages/MainPage.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import CreateCharacter from './pages/CreateCharacter.jsx';
import Storyline from './pages/Storyline.jsx'
import EditCharacter from './pages/EditCharacter.jsx'



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
      {
        path: '/storyline',
        element: <Storyline />,
      },
      {
        path: '/edit-character',
        element: <EditCharacter />,
      },

    ],
  },
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}