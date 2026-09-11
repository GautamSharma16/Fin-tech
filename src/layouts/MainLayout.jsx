import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <Navbar />
      <main className="flex-1 w-full pt-4 md:pt-0">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
