import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' }
  ]

  return (
    <nav style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(13, 11, 10, 0.8)' }}>
      <div style={{ borderBottom: '1px solid var(--color-text)', paddingBottom: '0.5rem', zIndex: 101 }}>
        <h2 style={{ fontSize: '1rem', letterSpacing: '0.2em' }}>TWO LINES STUDIO</h2>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex' }}>
        {navLinks.map(link => (
          <a key={link.name} href={link.href} style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {link.name}
          </a>
        ))}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="mobile-menu-btn" style={{ zIndex: 101, cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text)', marginBottom: '6px', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
        <div style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text)', marginBottom: '6px', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></div>
        <div style={{ width: '25px', height: '2px', backgroundColor: 'var(--color-text)', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none' }}></div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'rgba(13, 11, 10, 0.95)', backdropFilter: 'blur(10px)', padding: '2rem 5%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', borderBottom: '1px solid rgba(245, 243, 239, 0.1)' }}
          >
            {navLinks.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </nav>
  )
}
