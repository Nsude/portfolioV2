import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import ReactLenis from 'lenis/react'

gsap.registerPlugin(CustomEase, ScrollTrigger);

function App() {
  const lenisRef = useRef();

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000)
    }
  
    gsap.ticker.add(update);

    ScrollTrigger.refresh();
  
    return () => {
      gsap.ticker.remove(update);
     
    }
  }, [])


  return (
    <ReactLenis 
      root
      options={{ 
        lerp: 0.08, 
        smoothWheel: true,
        autoRaf: false
      }} 
      ref={lenisRef}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </ReactLenis>
  )
}

export default App
