import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CanvasBackground from './components/CanvasBackground'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <Preloader />
      <ScrollToTop />
      <CanvasBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
