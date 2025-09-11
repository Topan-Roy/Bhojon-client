import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div>
            <div className="py-3">
                <Navbar></Navbar>
            </div>
            <div className="">
                <Outlet></Outlet>
            </div>

            <div className="">
                <Footer></Footer>
            </div>
        </div>
    );
};

export default RootLayout;