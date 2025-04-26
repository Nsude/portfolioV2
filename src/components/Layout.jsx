import React from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './navbar/Navbar';
import LandingPage from './landing-page/LandingPage';

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        <LandingPage />
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout;