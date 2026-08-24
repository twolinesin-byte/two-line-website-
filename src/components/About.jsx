import React, { useState } from 'react'
import { motion } from 'framer-motion'

function FlipCardRhujul() {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Meet the Minds
      </h3>

      <div
        className="flip-card-container"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          perspective: '1200px',
          width: '100%',
          maxWidth: '300px',
          height: '420px',
          margin: '0 auto',
          cursor: 'pointer'
        }}
      >
        <motion.div
          className="flip-card-inner"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* FRONT SIDE */}
          <div
            className="flip-card-front ios-glass-panel"
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              borderRadius: '24px'
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px', marginBottom: '1.2rem', width: '100%', height: '260px', background: 'rgba(0, 0, 0, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/rhujul_patel.jpg"
                alt="Rhujul Patel"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'brightness(0.95) contrast(1.05)'
                }}
              />
              <div style={{
                position: 'absolute',
                bottom: '0.6rem',
                right: '0.6rem',
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#f5f3ef',
                fontSize: '0.68rem',
                padding: '0.3rem 0.65rem',
                borderRadius: '20px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}>
                <span>Hover for Info</span> ↺
              </div>
            </div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Rhujul Patel
            </h4>
            <p style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-accent)' }}>
              Principal Designer
            </p>
          </div>

          {/* BACK SIDE */}
          <div
            className="flip-card-back ios-glass-panel"
            style={{
              position: 'absolute',
              inset: 0,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              padding: '2rem 1.4rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(28, 22, 18, 0.95) 0%, rgba(14, 11, 9, 0.95) 100%)',
              border: '1px solid rgba(196, 164, 124, 0.45)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 1px 1px 0 rgba(255,255,255,0.3)'
            }}
          >
            <div className="liquid-glass-badge" style={{ marginBottom: '1rem', fontSize: '0.7rem' }}>
              🎓 B.E. Civil Engineering
            </div>

            <h4 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#ffffff' }}>
              Rhujul Patel
            </h4>
            
            <p style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-accent)', marginBottom: '1rem', fontWeight: 600 }}>
              Principal Designer & Engineer
            </p>

            <div style={{ height: '1px', width: '40px', background: 'var(--color-accent)', marginBottom: '1rem' }} />

            <div style={{ fontSize: '0.82rem', lineHeight: 1.6, color: 'rgba(245, 243, 239, 0.9)', textTransform: 'none', marginBottom: '1rem' }}>
              <p style={{ marginBottom: '0.6rem' }}>
                Holding a degree in <strong>B.E. Civil Engineering</strong>, Rhujul combines structural precision with architectural design.
              </p>
              <p style={{ fontSize: '0.78rem', opacity: 0.85 }}>
                Specializes in structural engineering, space planning, and design-to-execution support.
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.4rem',
              justifyContent: 'center',
              marginTop: 'auto'
            }}>
              <span style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem', background: 'rgba(196, 164, 124, 0.15)', border: '1px solid rgba(196, 164, 124, 0.3)', borderRadius: '15px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                Civil Eng.
              </span>
              <span style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem', background: 'rgba(196, 164, 124, 0.15)', border: '1px solid rgba(196, 164, 124, 0.3)', borderRadius: '15px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                Architecture
              </span>
              <span style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem', background: 'rgba(196, 164, 124, 0.15)', border: '1px solid rgba(196, 164, 124, 0.3)', borderRadius: '15px', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                Execution
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="section container" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', zIndex: 10, position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="line-accent"></div>
          <h2 className="text-title" style={{ marginBottom: '2rem' }}>About<br/>The Studio</h2>
        </motion.div>

        <div className="grid-responsive">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="uppercase"
            style={{ fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8, opacity: 0.8, textAlign: 'justify' }}
          >
            <p style={{ marginBottom: '1.5rem' }}>
              Two Lines Studio is a premier multidisciplinary architecture, interior design, and landscape consultancy based in Surat, Gujarat. Specializing in luxury residential villas, modern farmhouses, and commercial architecture across Surat, our studio blends creative vision with civil engineering precision.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Driven by functional space distribution, micro-climatic planning, and material intelligence, we deliver end-to-end design-to-execution solutions tailored to Surat's evolving urban & residential landscape.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="glass-panel"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '2rem' }}
          >
            <FlipCardRhujul />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="stats-container"
        >
          <div className="stat-item">
            <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>50+</h3>
            <p className="uppercase" style={{ fontSize: '0.875rem' }}>Clients<br/>Connection</p>
          </div>
          <div className="stat-item">
            <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>4+</h3>
            <p className="uppercase" style={{ fontSize: '0.875rem' }}>Years of<br/>Working</p>
          </div>
          <div className="stat-item">
            <h3 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>100%</h3>
            <p className="uppercase" style={{ fontSize: '0.875rem' }}>Design to<br/>Execution Support</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

