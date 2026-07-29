import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [hoveredNav, setHoveredNav] = useState(null)

  const navLinks = [
    { name: 'About', href: '/#about', isHash: true },
    { name: 'Projects', href: '/#projects', isHash: true },
    { name: 'Process', href: '/#process', isHash: true },
    { name: 'Contact', href: '/#contact', isHash: true }
  ]

  return (
    <nav className="navbar ios-glass-nav" onMouseLeave={() => setHoveredNav(null)}>
      <div className="nav-logo-container">
        <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <h2 style={{ fontSize: '0.95rem', letterSpacing: '0.22em', fontWeight: 600, textTransform: 'uppercase' }}>
            TWO LINES STUDIO
          </h2>
        </Link>
      </div>

      {/* Desktop Menu with Smooth Butter Sliding Glass Pill */}
      <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', position: 'relative' }}>
        {navLinks.map(link => {
          const isHovered = hoveredNav === link.name
          const Component = link.isHash ? HashLink : Link
          return (
            <Component
              key={link.name}
              smooth={link.isHash ? true : undefined}
              to={link.href}
              className="ios-nav-link"
              onMouseEnter={() => setHoveredNav(link.name)}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <span style={{ position: 'relative', zIndex: 2 }}>{link.name}</span>
              {isHovered && (
                <motion.div
                  layoutId="hoverGlassPill"
                  className="ios-nav-hover-pill"
                  initial={false}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.08) 100%)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.35)',
                    boxShadow: 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.5), 0 8px 20px rgba(0, 0, 0, 0.3)',
                    zIndex: 1
                  }}
                />
              )}
            </Component>
          )
        })}
      </div>

      {/* Mobile Hamburger Icon */}
      <div className="mobile-menu-btn" style={{ zIndex: 101, cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)}>
        <div style={{ width: '22px', height: '2px', backgroundColor: 'var(--color-text)', marginBottom: '5px', transition: '0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }}></div>
        <div style={{ width: '22px', height: '2px', backgroundColor: 'var(--color-text)', marginBottom: '5px', opacity: isOpen ? 0 : 1, transition: '0.3s' }}></div>
        <div style={{ width: '22px', height: '2px', backgroundColor: 'var(--color-text)', transition: '0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }}></div>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="ios-mobile-dropdown"
          >
            {navLinks.map(link => (
              link.isHash ? (
                <HashLink key={link.name} smooth to={link.href} onClick={() => setIsOpen(false)} className="ios-mobile-link">
                  {link.name}
                </HashLink>
              ) : (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="ios-mobile-link">
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


