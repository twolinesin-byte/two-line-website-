import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 5%', position: 'relative' }}>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ zIndex: 10 }}
      >
        <div className="line-accent" style={{ height: '4px', width: '80px', marginBottom: '2rem' }}></div>
        <h1 className="text-huge" style={{ marginBottom: '1rem' }}>
          PORT<br/>FOLIO
        </h1>
        <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '4rem', fontSize: '1.2rem' }}>
          Architecture | Interior | Landscape
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ position: 'absolute', bottom: '5%', left: '5%', zIndex: 10 }}
      >
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Spaces that connect.<br/>Design that stays.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{ position: 'absolute', bottom: '5%', right: '5%', textAlign: 'right', zIndex: 10 }}
      >
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Issue 03<br/>2026</p>
      </motion.div>
    </section>
  )
}
