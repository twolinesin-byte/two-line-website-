import React from 'react'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Process from './Process'
import Clients from './Clients'
import Contact from './Contact'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Process />
      <Clients />
      <Contact />
    </main>
  )
}
