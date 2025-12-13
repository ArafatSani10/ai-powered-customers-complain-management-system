import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlaout from './layout/Mainlayout/Mainlaout.jsx';
import Home from './components/pages/Home/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlaout></Mainlaout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
