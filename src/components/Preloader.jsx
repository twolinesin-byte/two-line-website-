import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = 'hidden'

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFinished(true)
            document.body.style.overflow = 'auto'
            if (onComplete) onComplete()
          }, 400)
          return 100
        }
        // Increment by random steps for realistic preloader feel
        const next = prev + Math.floor(Math.random() * 15) + 5
        return next > 100 ? 100 : next
      })
    }, 70)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = 'auto'
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0d0b0a',
            zIndex: 9999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '2rem'
          }}
        >
          {/* Two Parallel Architectural Lines (Signature Logo Animation) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '2.5rem', alignItems: 'center' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              style={{ height: '2px', backgroundColor: 'var(--color-accent)' }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '140px' }}
              transition={{ duration: 1.5, ease: 'easeInOut', delay: 0.2 }}
              style={{ height: '2px', backgroundColor: 'var(--color-accent)' }}
            />
          </div>

          {/* Brand Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.3em' }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
              color: '#f5f3ef',
              textTransform: 'uppercase',
              marginBottom: '1rem',
              textAlign: 'center'
            }}
          >
            Two Lines Studio
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              color: 'var(--color-text)',
              marginBottom: '3rem',
              textAlign: 'center'
            }}
          >
            Architecture • Interior • Landscape
          </motion.p>

          {/* Percentage Progress Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '3.5rem',
              display: 'flex',
              alignItems: 'baseline',
              gap: '0.2rem',
              color: 'var(--color-accent)',
              fontFamily: 'var(--font-sans)',
              fontSize: '2rem',
              fontWeight: 300
            }}
          >
            <span>{progress}</span>
            <span style={{ fontSize: '1rem', opacity: 0.7 }}>%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
