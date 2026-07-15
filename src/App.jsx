import React from 'react'
import CanvasBackground from './components/CanvasBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Process from './components/Process'
import Clients from './components/Clients'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <CanvasBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Process />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
