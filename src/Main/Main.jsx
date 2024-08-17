import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Component/Footer/Footer';

const Main = () => {
  return (
    <>
      <div className="h-16">
        <Navbar></Navbar>
      </div>
      <div className="min-h-[calc(100vh-235px)] container mx-auto p-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
