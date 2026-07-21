import React from 'react'
import { motion } from 'framer-motion'

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
              Two Lines Studio is a multidisciplinary design consultancy specializing in Architecture, Interior Design, and Landscape.
            </p>
            <p>
              Driven by functional planning and material intelligence, we deliver end-to-end solutions that are efficient, market-ready, and aesthetically refined.
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
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Meet the Minds</h3>
            <img src="/rhujul_patel.jpg" alt="Rhujul Patel" style={{ width: '100%', maxWidth: '240px', aspectRatio: '3/4', objectFit: 'cover', marginBottom: '1.5rem', borderRadius: '4px' }} />
            <h4 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rhujul Patel</h4>
            <p style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.7 }}>Principal Designer</p>
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
