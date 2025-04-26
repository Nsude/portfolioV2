import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import CustomButton from './components/buttons/customButton'
import Layout from './components/Layout'
import gsap from 'gsap'
import { CustomEase } from 'gsap/all'

gsap.registerPlugin(CustomEase);

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
