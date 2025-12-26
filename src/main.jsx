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
import ContactUs from './components/pages/ContactUs/ContactUs.jsx';
import Register from './components/pages/Register/Register.jsx';
import HelpDesk from './components/pages/HelpDesk/HelpDesk.jsx';

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
        path: '/about',
        element: <About></About>
      },

      {
        path: '/terms-and-conditions',
        element: <TermsAndCondtions></TermsAndCondtions>
      },

      {
        path: '/contact-us',
        element: <ContactUs></ContactUs>
      },

      {
        path:'/help-desk',
        element:<HelpDesk></HelpDesk>
      },

      {
        path: '/login',
        element: <Login></Login>
      },

      {
        path: '/register',
        element: <Register></Register>
      },
    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
