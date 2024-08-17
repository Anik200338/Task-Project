import React from 'react';
import Navbar from '../Component/Navbar/Navbar';
import AddCard from '../Component/AddCard/AddCard';
import AllProducts from '../Component/AllProduct/AllProducts';

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <AddCard></AddCard>
      <AllProducts></AllProducts>
    </div>
  );
};

export default Home;
