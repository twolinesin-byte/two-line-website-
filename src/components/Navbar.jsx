import React from 'react'

export default function Navbar() {
  return (
    <nav style={{ padding: '2rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(13, 11, 10, 0.8)' }}>
      <div style={{ borderBottom: '1px solid var(--color-text)', paddingBottom: '0.5rem' }}>
        <h2 style={{ fontSize: '1rem', letterSpacing: '0.2em' }}>TWO LINES STUDIO</h2>
      </div>
      <div>
        <a href="#about" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About</a>
        <a href="#projects" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projects</a>
        <a href="#process" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Process</a>
        <a href="#contact" style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contact</a>
      </div>
    </nav>
  )
}
