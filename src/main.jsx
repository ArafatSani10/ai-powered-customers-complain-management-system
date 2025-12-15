import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainlaout from './layout/Mainlayout/Mainlaout.jsx';
import Home from './components/pages/Home/Home.jsx';
import About from './components/pages/About/About.jsx';
import Login from './components/pages/login/login.jsx';
import TermsAndCondtions from './components/pages/TermsAndCondtions/TermsAndCondtions.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlaout></Mainlaout>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },

      {
        path:'/about',
        element:<About></About>
      },

      {
        path:'/terms-and-conditions',
        element:<TermsAndCondtions></TermsAndCondtions>
      },

      {
        path:'/login',
        element:<Login></Login>
      },
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
