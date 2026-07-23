import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [isFinished, setIsFinished] = useState(false)

  useEffect(() => {
    // Lock body scroll while loading
    document.body.style.overflow = 'hidden'

    // Slower, luxurious counting pace (~3.8s total)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setIsFinished(true)
            document.body.style.overflow = 'auto'
            if (onComplete) onComplete()
          }, 600)
          return 100
        }
        // Small smooth increments for unhurried Likova-style counting
        const next = prev + Math.floor(Math.random() * 4) + 2
        return next > 100 ? 100 : next
      })
    }, 85)

    return () => {
      clearInterval(interval)
      document.body.style.overflow = 'auto'
    }
  }, [onComplete])

  const formattedProgress = String(progress).padStart(2, '0')

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1] }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: '#0a0908',
            zIndex: 9999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justify: 'center',
            padding: '2rem',
            userSelect: 'none'
          }}
        >
          {/* Center Brand Group */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {/* Signature Two Lines Animation */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '3rem', alignItems: 'center' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '120px' }}
                transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
                style={{ height: '2px', backgroundColor: 'var(--color-accent)' }}
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '180px' }}
                transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                style={{ height: '2px', backgroundColor: 'var(--color-accent)' }}
              />
            </div>

            {/* Main Title Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 30, letterSpacing: '0.15em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
              transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.8rem, 6vw, 3.2rem)',
                color: '#f5f3ef',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                fontWeight: 400
              }}
            >
              Two Lines
            </motion.h1>

            {/* Sub-Brand Title */}
            <motion.span
              initial={{ opacity: 0, letterSpacing: '0.2em' }}
              animate={{ opacity: 0.8, letterSpacing: '0.55em' }}
              transition={{ duration: 1.2, delay: 0.6 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.75rem, 2.5vw, 1.1rem)',
                color: 'var(--color-accent)',
                textTransform: 'uppercase',
                marginBottom: '2rem',
                fontWeight: 500
              }}
            >
              Studio
            </motion.span>

            {/* Disciplines */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.9 }}
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#f5f3ef'
              }}
            >
              Architecture • Interior • Landscape
            </motion.p>
          </div>

          {/* Bottom Bar: Loading Status + Counter */}
          <div style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '3rem',
            right: '3rem',
            display: 'flex',
            justify: 'space-between',
            alignItems: 'flex-end'
          }}>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              style={{
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: '#f5f3ef'
              }}
            >
              Loading Experience
            </motion.span>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(1.8rem, 4vw, 3rem)',
                fontWeight: 300,
                color: 'var(--color-accent)',
                letterSpacing: '0.05em',
                lineHeight: 1
              }}
            >
              <span>{formattedProgress}</span>
              <span style={{ fontSize: '0.5em', opacity: 0.7, marginLeft: '2px' }}>%</span>
            </motion.div>
          </div>

          {/* Bottom Edge Full-Width Thin Progress Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '2px',
              width: `${progress}%`,
              backgroundColor: 'var(--color-accent)',
              transition: 'width 0.25s linear'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
