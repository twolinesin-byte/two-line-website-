import React from 'react'
import { motion } from 'framer-motion'
import { Building2, Home, Store } from 'lucide-react'

export default function Clients() {
  return (
    <section id="clients" className="section container" style={{ zIndex: 10, position: 'relative' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ position: 'relative' }}
        >
          <img src="/landscape.png" alt="Landscape Architecture" style={{ width: '100%', height: 'auto', objectFit: 'cover', borderRadius: '4px', filter: 'brightness(0.9)' }} />
          <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100%', height: '100%', border: '1px solid var(--color-text)', zIndex: -1 }}></div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="line-accent"></div>
            <h2 className="text-title" style={{ marginBottom: '2rem' }}>Our<br/>Clients</h2>
            <p className="uppercase" style={{ marginBottom: '4rem', fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8 }}>
              We collaborate with a diverse range of clients and partners, delivering tailored design solutions that meet functional needs and elevate experiences. Our focus is on building long-term relationships through trust, clarity, and consistent execution.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'rgba(139, 115, 85, 0.1)', borderRadius: '4px' }}>
                <Building2 size={32} color="var(--color-text)" strokeWidth={1} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>DEVELOPERS & BUILDERS</h4>
                <p className="uppercase" style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.05em' }}>
                  Design and execution support for sample flats, sales offices, and amenity spaces.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'rgba(139, 115, 85, 0.1)', borderRadius: '4px' }}>
                <Home size={32} color="var(--color-text)" strokeWidth={1} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>RESIDENTIAL CLIENTS</h4>
                <p className="uppercase" style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.05em' }}>
                  Customized interior solutions based on lifestyle, space efficiency, and budget.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}
            >
              <div style={{ padding: '1rem', backgroundColor: 'rgba(139, 115, 85, 0.1)', borderRadius: '4px' }}>
                <Store size={32} color="var(--color-text)" strokeWidth={1} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>COMMERCIAL CLIENTS</h4>
                <p className="uppercase" style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.05em' }}>
                  Functional and brand-aligned design for offices, retail, and hospitality environments.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
