import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'About', href: '/#about', isHash: true },
    { name: 'Projects', href: '/#projects', isHash: true },
    { name: 'Process', href: '/#process', isHash: true },
    { name: 'Locations', href: '/locations', isHash: false },
    { name: 'Contact', href: '/#contact', isHash: true }
  ]

  return (
    <nav style={{ padding: '1.5rem 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'fixed', top: 0, width: '100%', zIndex: 100, backdropFilter: 'blur(10px)', backgroundColor: 'rgba(13, 11, 10, 0.8)' }}>
      <div style={{ borderBottom: '1px solid var(--color-text)', paddingBottom: '0.5rem', zIndex: 101 }}>
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '1rem', letterSpacing: '0.2em' }}>TWO LINES STUDIO</h2>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="desktop-menu" style={{ display: 'flex' }}>
        {navLinks.map(link => (
          link.isHash ? (
            <HashLink key={link.name} smooth to={link.href} style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {link.name}
            </HashLink>
          ) : (
            <Link key={link.name} to={link.href} style={{ margin: '0 1rem', textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {link.name}
            </Link>
          )
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
              link.isHash ? (
                <HashLink key={link.name} smooth to={link.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {link.name}
                </HashLink>
              ) : (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {link.name}
                </Link>
              )
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
