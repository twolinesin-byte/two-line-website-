import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 10%', position: 'relative' }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 10 }}
      >
        <div className="line-accent" style={{ height: '4px', width: '80px', marginBottom: '2rem' }}></div>
        <h1 className="text-huge" style={{ marginBottom: '1rem', overflowWrap: 'break-word' }}>
          PORT<br/>FOLIO
        </h1>
        <h2 style={{ letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)', overflowWrap: 'break-word', fontWeight: 400 }}>
          Architecture | Interior | Landscape
        </h2>
        <p style={{ letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '4rem', fontSize: '0.75rem', opacity: 0.6, color: 'var(--color-accent)' }}>
          Surat Architecture &amp; Interior Design Studio • Gujarat
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ position: 'absolute', bottom: '5%', left: '10%', zIndex: 10 }}
      >
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Spaces that connect.<br/>Design that stays.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ position: 'absolute', bottom: '5%', right: '10%', textAlign: 'right', zIndex: 10 }}
      >
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Issue 03<br/>2026</p>
      </motion.div>
    </section>
  )
}
