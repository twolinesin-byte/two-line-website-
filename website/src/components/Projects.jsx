import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "Vikrambhai Farm House",
    category: "Modern Farm House",
    location: "Ahmedabad",
    description: "An overview of our Residential project that combines efficiency, aesthetics, and technology to create a comfortable and private living experience. Focus on technology integration and comfort.",
    coverImage: "/projects/vikrambhai/00.jpeg",
    images: [
      "/projects/vikrambhai/00.jpeg",
      "/projects/vikrambhai/05.jpeg",
      "/projects/vikrambhai/06.jpeg",
      "/projects/vikrambhai/07.jpeg",
      "/projects/vikrambhai/08.jpeg",
      "/projects/vikrambhai/09.jpeg",
      "/projects/vikrambhai/10.jpeg",
    ]
  },
  {
    id: 2,
    title: "Casa Rivera",
    category: "Residential Interior",
    location: "Surat",
    description: "A premium residential project highlighting meticulous attention to detail, featuring a custom-crafted home theatre with cinematic elegance and seamless execution.",
    coverImage: "/projects/casa_rivera/09.jpeg",
    images: [
      "/projects/casa_rivera/09.jpeg",
      "/projects/casa_rivera/10.jpeg",
      "/projects/casa_rivera/04.jpeg",
      "/projects/casa_rivera/05.jpeg",
      "/projects/casa_rivera/00.jpeg",
      "/projects/casa_rivera/06.jpeg",
      "/projects/casa_rivera/11.jpeg",
      "/projects/casa_rivera/12.jpeg",
      "/projects/casa_rivera/01.jpeg",
      "/projects/casa_rivera/02.jpeg",
      "/projects/casa_rivera/03.jpeg",
    ]
  },
  {
    id: 3,
    title: "Jigneshbhai Farm",
    category: "Residential / Farmhouse",
    location: "Varacha",
    description: "A sophisticated farmhouse design blending the surrounding natural landscape with modern, elegant interior living spaces.",
    coverImage: "/projects/jigneshbhai/00.jpeg",
    images: [
      "/projects/jigneshbhai/00.jpeg",
      "/projects/jigneshbhai/01.jpeg",
      "/projects/jigneshbhai/02.jpeg",
      "/projects/jigneshbhai/03.jpeg",
      "/projects/jigneshbhai/04.jpeg",
    ]
  },
  {
    id: 4,
    title: "Hitenbhai Residence",
    category: "Residential Interior",
    location: "Pal",
    description: "A customized interior solution focusing on lifestyle, space efficiency, and a refined, contemporary aesthetic.",
    coverImage: "/projects/hitenbhai/00.jpeg",
    images: [
      "/projects/hitenbhai/00.jpeg",
      "/projects/hitenbhai/01.jpeg",
      "/projects/hitenbhai/02.jpeg",
      "/projects/hitenbhai/03.jpeg",
      "/projects/hitenbhai/04.jpeg",
      "/projects/hitenbhai/05.jpeg",
    ]
  },
  {
    id: 5,
    title: "Bhavinbhai Residence",
    category: "Residential Interior",
    location: "Pal",
    description: "An elegant residential interior that perfectly balances functional planning with high-end material intelligence and luxury finishes.",
    coverImage: "/projects/bhavinbhai/00.jpeg",
    images: [
      "/projects/bhavinbhai/00.jpeg",
      "/projects/bhavinbhai/01.jpeg",
      "/projects/bhavinbhai/02.jpeg",
      "/projects/bhavinbhai/03.jpeg",
      "/projects/bhavinbhai/04.jpeg",
      "/projects/bhavinbhai/05.jpeg",
    ]
  }
]

function LightboxModal({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Close on Escape key
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % project.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  const prev = (e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
  }
  const next = (e) => {
    e.stopPropagation()
    setActiveIndex((i) => (i + 1) % project.images.length)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 9999,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '5rem 2rem 2rem'
      }}
    >
      {/* Close button — large, always visible at top right */}
      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{
          position: 'fixed', top: '1rem', right: '1.5rem',
          background: 'var(--color-accent)',
          border: 'none',
          color: '#0d0b0a',
          fontSize: '1.2rem',
          fontWeight: 700,
          cursor: 'pointer',
          width: '48px', height: '48px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 10001,
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          lineHeight: 1
        }}
        title="Close (Esc)"
      >✕</button>

      {/* Project title + counter */}
      <p style={{
        position: 'fixed', top: '1.8rem', left: '1.5rem',
        color: 'var(--color-accent)', fontSize: '0.75rem',
        textTransform: 'uppercase', letterSpacing: '0.15em',
        zIndex: 10001
      }}>
        {project.title} — {activeIndex + 1} / {project.images.length}
      </p>

      {/* Hint */}
      <p style={{
        position: 'fixed', top: '1.8rem', left: '50%', transform: 'translateX(-50%)',
        color: 'rgba(245,243,239,0.35)', fontSize: '0.7rem',
        textTransform: 'uppercase', letterSpacing: '0.1em', zIndex: 10001
      }}>
        Click outside image or press Esc to close
      </p>

      {/* Main Image */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', width: '100%', marginBottom: '1.5rem' }}
      >
        <img
          src={project.images[activeIndex]}
          alt={`${project.title} - ${activeIndex + 1}`}
          style={{ width: '100%', height: 'auto', maxHeight: '65vh', objectFit: 'contain', borderRadius: '12px' }}
        />
      </motion.div>

      {/* Navigation buttons */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <button onClick={prev} style={{
          background: 'none', border: '1px solid rgba(245,243,239,0.3)',
          color: '#f5f3ef', fontSize: '1.2rem', cursor: 'pointer',
          width: '44px', height: '44px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>←</button>
        <button onClick={next} style={{
          background: 'none', border: '1px solid rgba(245,243,239,0.3)',
          color: '#f5f3ef', fontSize: '1.2rem', cursor: 'pointer',
          width: '44px', height: '44px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>→</button>
      </div>

      {/* Thumbnail strip */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex', gap: '0.5rem', overflowX: 'auto',
          maxWidth: '900px', width: '100%', paddingBottom: '0.5rem'
        }}
      >
        {project.images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`thumb-${i}`}
            onClick={() => setActiveIndex(i)}
            style={{
              width: '70px', height: '52px', objectFit: 'cover',
              borderRadius: '6px', flexShrink: 0, cursor: 'pointer',
              border: i === activeIndex ? '2px solid var(--color-accent)' : '2px solid transparent',
              opacity: i === activeIndex ? 1 : 0.5,
              transition: 'all 0.2s'
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [lightboxProject, setLightboxProject] = useState(null)

  return (
    <section id="projects" className="section container" style={{ zIndex: 10, position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: '4rem' }}
      >
        <div className="line-accent"></div>
        <h2 className="text-title" style={{ marginBottom: '1rem' }}>Selected<br/>Projects</h2>
        <p className="uppercase" style={{ maxWidth: '600px', fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8 }}>
          A showcase of our recent architectural and interior design projects, tailored for real clients.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {projects.map((project, index) => (
          <div key={project.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ order: index % 2 === 0 ? 1 : 2, position: 'relative', cursor: 'pointer' }}
              onClick={() => setLightboxProject(project)}
            >
              <img
                src={project.coverImage}
                alt={project.title}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'brightness(0.9) contrast(1.05)', borderRadius: '12px' }}
              />
              <div style={{
                position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)',
                transition: 'background 0.3s', borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.25)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
              >
                <span style={{
                  color: 'white', fontSize: '0.75rem', textTransform: 'uppercase',
                  letterSpacing: '0.15em', opacity: 0, transition: 'opacity 0.3s',
                  pointerEvents: 'none'
                }}
                  className="hover-label"
                >View All Photos</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ order: index % 2 === 0 ? 2 : 1 }}
            >
              <p className="uppercase" style={{ color: 'var(--color-accent)', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '1rem' }}>
                {project.category} • {project.location}
              </p>
              <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.05em' }}>{project.title}</h3>
              <p className="uppercase" style={{ opacity: 0.8, letterSpacing: '0.05em', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.875rem' }}>
                {project.description}
              </p>
              <button className="btn-outline" onClick={() => setLightboxProject(project)}>
                View Details
              </button>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxProject && (
          <LightboxModal project={lightboxProject} onClose={() => setLightboxProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
