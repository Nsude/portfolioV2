import React, { useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom';
import Footer from './landing-page/Footer';
import Navbar from './navbar/Navbar';
import LandingPage from './landing-page/LandingPage';
import { useNavbarContext } from './contexts/NavbarContext';

const Layout = () => {
  const footerRef = useRef();
  const {setSectionRefs} = useNavbarContext();

  useEffect(() => {
    setSectionRefs(prev => ({
      ...prev,
      contacts: footerRef
    }))
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <LandingPage />
        <Outlet />
      </main>

      <section ref={footerRef}>
        <Footer />
      </section>
    </>
  )
}

export default Layout;