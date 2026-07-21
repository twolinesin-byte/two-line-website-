import React from 'react'
import { motion } from 'framer-motion'

const steps = [
  { num: '01', title: 'Briefing & Concept Development', desc: 'Understanding client vision, requirements, and the context of the space to develop a strong design concept.' },
  { num: '02', title: 'Space Planning & Layout Design', desc: 'Creating functional layouts that balance aesthetics, circulation, and efficiency.' },
  { num: '03', title: 'Material & Finish Selection', desc: 'Curating materials, textures, and finishes that enhance the design intent and ensure timeless quality.' },
  { num: '04', title: 'Furniture & Lighting Selection', desc: 'Selecting furniture and lighting that complement the design and elevate the overall experience.' },
  { num: '05', title: 'Documentation & Drawings', desc: 'Preparing detailed drawings and specifications for accurate execution.' },
  { num: '06', title: 'Procurement & Coordination', desc: 'Managing procurement, vendors, and site coordination to ensure a smooth process.' },
  { num: '07', title: 'Installation & Finalization', desc: 'Overseeing installation and final detailing to deliver a space that is move-in ready and perfectly finished.' }
]

export default function Process() {
  return (
    <section id="process" className="section container" style={{ zIndex: 10, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '4rem' }}
      >
        <div className="line-accent"></div>
        <h2 className="text-title" style={{ marginBottom: '1rem' }}>Our Design<br/>Process</h2>
        <p className="uppercase" style={{ maxWidth: '600px', fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8 }}>
          A clear and collaborative process ensures that every project is thoughtfully designed, carefully planned, and seamlessly executed.
        </p>
      </motion.div>

      <div style={{ position: 'relative', paddingLeft: '2rem' }}>
        <div style={{ position: 'absolute', top: 0, left: '2rem', width: '1px', height: '100%', backgroundColor: 'rgba(61, 48, 40, 0.2)' }}></div>
        
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{ position: 'relative', marginBottom: '3rem', paddingLeft: '3rem' }}
          >
            <div style={{ position: 'absolute', top: '5px', left: '-5px', width: '11px', height: '11px', borderRadius: '50%', backgroundColor: 'var(--color-text)' }}></div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem', marginTop: '-0.2rem' }}>{step.num}</h3>
              <div>
                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>{step.title}</h4>
                <p className="uppercase" style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.05em', maxWidth: '500px' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
