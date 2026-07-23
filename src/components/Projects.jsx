import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: "Vikrambhai Farm House",
    category: "Modern Farm House",
    location: "Ahmedabad",
    year: "2023 - 2024",
    status: "Completed",
    scope: "Architecture & Interior",
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
    year: "2023",
    status: "Completed",
    scope: "Interior Design & Execution",
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
    year: "2022 - 2023",
    status: "Completed",
    scope: "Architecture & Landscape",
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
    year: "2023",
    status: "Completed",
    scope: "Interior Planning",
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
    year: "2024",
    status: "Completed",
    scope: "Full Interior Execution",
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

  // Keyboard navigation & Esc key
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % project.images.length)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [project, onClose])

  const prevImage = () => setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
  const nextImage = () => setActiveIndex((i) => (i + 1) % project.images.length)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0d0b0a',
        zIndex: 99999,
        display: 'flex',
        overflow: 'hidden'
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          background: 'var(--color-accent)',
          border: 'none',
          color: '#0d0b0a',
          fontSize: '0.9rem',
          fontWeight: 700,
          cursor: 'pointer',
          padding: '0.6rem 1.2rem',
          borderRadius: '20px',
          zIndex: 100001,
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
        title="Close (Esc)"
      >
        ✕ Close
      </button>

      {/* Main BIG-style Grid Container */}
      <div className="big-modal-grid">
        {/* LEFT SIDE: Project Details */}
        <div className="big-modal-details">
          <div style={{ marginBottom: '2rem' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.75rem'
            }}>
              {project.category} • {project.location}
            </span>
            <h2 style={{
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.04em',
              lineHeight: 1.2,
              marginBottom: '1.5rem',
              color: '#f5f3ef'
            }}>
              {project.title}
            </h2>
            <div style={{ height: '2px', width: '40px', background: 'var(--color-accent)', marginBottom: '1.5rem' }}></div>
            <p className="uppercase" style={{
              fontSize: '0.85rem',
              lineHeight: 1.8,
              letterSpacing: '0.05em',
              opacity: 0.85,
              color: '#f5f3ef',
              marginBottom: '2rem'
            }}>
              {project.description}
            </p>
          </div>

          {/* Architectural Specifications Table */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.2rem 1rem',
            borderTop: '1px solid rgba(245, 243, 239, 0.15)',
            paddingTop: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, display: 'block' }}>Location</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>{project.location}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, display: 'block' }}>Category</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>{project.category}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, display: 'block' }}>Year</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>{project.year || '2023-2024'}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.5, display: 'block' }}>Scope</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.05em' }}>{project.scope || 'Architecture & Interior'}</span>
            </div>
          </div>

          {/* Photo Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justify: 'space-between',
            borderTop: '1px solid rgba(245, 243, 239, 0.15)',
            paddingTop: '1.2rem',
            marginTop: 'auto'
          }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6 }}>
              Photo {activeIndex + 1} of {project.images.length}
            </span>
          </div>
        </div>

        {/* RIGHT SIDE: Project Image Gallery */}
        <div className="big-modal-gallery">
          {/* Active Image Display */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            position: 'relative',
            width: '100%',
            height: '100%',
            maxHeight: 'calc(100vh - 160px)'
          }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={project.images[activeIndex]}
                alt={`${project.title} - ${activeIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
                }}
              />
            </AnimatePresence>

            {/* Navigation Arrow Left */}
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(13,11,10,0.6)',
                border: '1px solid rgba(245,243,239,0.2)',
                color: '#f5f3ef',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                backdropFilter: 'blur(4px)'
              }}
            >
              ←
            </button>

            {/* Navigation Arrow Right */}
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(13,11,10,0.6)',
                border: '1px solid rgba(245,243,239,0.2)',
                color: '#f5f3ef',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justify: 'center',
                backdropFilter: 'blur(4px)'
              }}
            >
              →
            </button>
          </div>

          {/* Thumbnail strip */}
          <div style={{
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            width: '100%',
            paddingTop: '1rem',
            paddingBottom: '0.5rem'
          }}>
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  width: '80px',
                  height: '60px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  border: i === activeIndex ? '2px solid var(--color-accent)' : '2px solid transparent',
                  opacity: i === activeIndex ? 1 : 0.4,
                  transition: 'all 0.2s'
                }}
              />
            ))}
          </div>
        </div>
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
        <h2 className="text-title" style={{ marginBottom: '1rem' }}>Projects</h2>
        <p className="uppercase" style={{ maxWidth: '600px', fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8 }}>
          A showcase of our recent architectural and interior design projects, tailored for real clients.
        </p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
        {projects.map((project, index) => (
          <div key={project.id} className={`grid-responsive ${index % 2 !== 0 ? 'project-odd' : 'project-even'}`} style={{ alignItems: 'center' }}>
            <motion.div
              className="project-item-image"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative', cursor: 'pointer' }}
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
                >View Project</span>
              </div>
            </motion.div>

            <motion.div
              className="project-item-info"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="uppercase" style={{ color: 'var(--color-accent)', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '1rem' }}>
                {project.category} • {project.location}
              </p>
              <h3 style={{ fontSize: 'clamp(1.5rem, 6vw, 2rem)', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)', letterSpacing: '0.05em', wordBreak: 'break-word' }}>{project.title}</h3>
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

      {/* BIG-style Project Modal */}
      <AnimatePresence>
        {lightboxProject && (
          <LightboxModal project={lightboxProject} onClose={() => setLightboxProject(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}
