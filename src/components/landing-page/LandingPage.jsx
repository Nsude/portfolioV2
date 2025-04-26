import React, { useEffect, useRef } from 'react'
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Testimonials from './Testimonials';
import { useNavbarContext } from '../contexts/NavbarContext';

const LandingPage = () => {
  const {setSectionRefs} = useNavbarContext();
  const heroRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();

  useEffect(() => {
    setSectionRefs(prev => ({
      ...prev,
      hero: heroRef,
      about: aboutRef,
      projects: projectsRef
    }))
  }, [setSectionRefs])

  return (
    <div>
      <section ref={heroRef}>
        <Hero />
      </section>
      <section ref={aboutRef}>
        <About />
      </section>
      <section ref={projectsRef}>
        <Projects />
      </section>

      <Testimonials />
    </div>
  )
}

export default LandingPage;