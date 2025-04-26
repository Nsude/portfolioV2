import React from 'react'
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Testimonials from './Testimonials';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Testimonials />
    </div>
  )
}

export default LandingPage;