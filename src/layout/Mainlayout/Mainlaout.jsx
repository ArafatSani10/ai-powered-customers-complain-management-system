import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/pages/shared/Navbar/Navbar';
import Footer from '../../components/pages/shared/Footer/Footer';

const Mainlaout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Mainlaout;