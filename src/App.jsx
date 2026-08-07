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

function AmbientLiquidGlow() {
  return (
    <div className="ios-ambient-wrapper" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -2, overflow: 'hidden' }}>
      <div className="ios-glow-orb orb-1" />
      <div className="ios-glow-orb orb-2" />
      <div className="ios-glow-orb orb-3" />
    </div>
  )
}

function App() {
  // Global Anti-Download Security: Disable right-click context menu and dragging on images
  useEffect(() => {
    const preventContextMenu = (e) => {
      if (e.target.tagName === 'IMG' || e.target.closest('.big-modal-gallery')) {
        e.preventDefault()
      }
    }
    const preventDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault()
      }
    }
    document.addEventListener('contextmenu', preventContextMenu)
    document.addEventListener('dragstart', preventDragStart)
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu)
      document.removeEventListener('dragstart', preventDragStart)
    }
  }, [])

  return (
    <>
      <Preloader />
      <ScrollToTop />
      <AmbientLiquidGlow />
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
