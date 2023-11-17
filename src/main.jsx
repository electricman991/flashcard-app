import React from 'react'
import ReactDOM from 'react-dom/client'
import About from './components/About.jsx'
import Flashcard, {loader as getCardsAction, action as flashAction} from './components/Flashcard.jsx'
import Home, {loader as HomeLoader} from './components/Home.jsx'
import Editcard, {action as editAction, loader as editLoader} from './components/edit.jsx'
import { action as deleteAction } from './components/delete.jsx'
//import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    loader: HomeLoader,
    
    children: [
      {
        path: "/cards/:cardId",
        element: <Flashcard />,
        loader: getCardsAction,
        action: flashAction,
      },
      
      {
        path: "cards/:cardId/edit",
        element: <Editcard />,
        loader: editLoader,
        action: editAction,
      },

      {
        path: "cards/:cardId/delete",
        action: deleteAction,
      },
      
    ]
    
  },

  {
    path: "/about",
    element: <About />,
  },

  {
    path: "/contact",
    element: <Home />,
  },
  
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
