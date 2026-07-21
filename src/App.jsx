import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import CanvasBackground from './components/CanvasBackground'
import Navbar from './components/Navbar'
import Home from './components/Home'
import LocationsList from './components/LocationsList'
import LocationDetail from './components/LocationDetail'
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
      <ScrollToTop />
      <CanvasBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<LocationsList />} />
        <Route path="/locations/:id" element={<LocationDetail />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
