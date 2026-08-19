import React, { useState } from 'react'
import { createPortal } from 'react-dom'
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
    title: "Ṛtam",
    category: "Residential Architecture & Interior",
    location: "Surat",
    year: "2024",
    status: "Completed",
    scope: "Architecture, Interior & Landscape",
    description: "A sanctuary of modern living that harmonizes sacred geometry, natural light, and refined material palettes to create an uplifting architectural experience.",
    coverImage: "/projects/rtam/00.jpeg",
    images: [
      "/projects/rtam/00.jpeg",
      "/projects/rtam/01.jpeg",
      "/projects/rtam/02.jpeg",
      "/projects/rtam/03.jpeg",
      "/projects/rtam/04.jpeg",
      "/projects/rtam/05.jpeg",
      "/projects/rtam/06.jpeg",
      "/projects/rtam/07.jpeg",
      "/projects/rtam/08.jpeg",
      "/projects/rtam/09.jpeg",
      "/projects/rtam/10.jpeg",
      "/projects/rtam/11.jpeg",
      "/projects/rtam/12.jpeg",
      "/projects/rtam/13.jpeg",
      "/projects/rtam/14.jpeg",
      "/projects/rtam/15.jpeg",
      "/projects/rtam/16.jpeg",
      "/projects/rtam/17.jpeg",
      "/projects/rtam/18.jpeg",
      "/projects/rtam/19.jpeg",
      "/projects/rtam/20.jpeg",
      "/projects/rtam/21.jpeg",
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
  },
  {
    id: 6,
    title: "Park Arena",
    category: "Commercial & Residential Interior",
    location: "Surat",
    year: "2024",
    status: "Completed",
    scope: "Interior Planning & Execution",
    description: "A sleek contemporary interior project featuring custom spatial arrangements, ambient architectural lighting, and high-performance material selections.",
    coverImage: "/projects/park_arena/00.jpeg",
    images: [
      "/projects/park_arena/00.jpeg",
      "/projects/park_arena/01.jpeg",
      "/projects/park_arena/02.jpeg",
      "/projects/park_arena/03.jpeg",
      "/projects/park_arena/04.jpeg",
      "/projects/park_arena/05.jpeg",
      "/projects/park_arena/06.jpeg",
      "/projects/park_arena/07.jpeg",
      "/projects/park_arena/08.jpeg",
      "/projects/park_arena/09.jpeg",
      "/projects/park_arena/10.jpeg",
      "/projects/park_arena/11.jpeg",
      "/projects/park_arena/12.jpeg",
      "/projects/park_arena/13.jpeg",
      "/projects/park_arena/14.jpeg",
      "/projects/park_arena/15.jpeg",
    ]
  },
  {
    id: 7,
    title: "Vantrum",
    category: "Architecture & Interior",
    location: "Vadodara",
    year: "2024",
    status: "Completed",
    scope: "Architecture, Interior & Lighting Design",
    description: "A landmark architectural development in Vadodara highlighting volumetric design, striking exterior facades, and meticulously crafted interior environments.",
    coverImage: "/projects/vantrum/00.jpeg",
    images: [
      "/projects/vantrum/00.jpeg",
      "/projects/vantrum/01.jpeg",
      "/projects/vantrum/02.jpeg",
      "/projects/vantrum/03.jpeg",
      "/projects/vantrum/04.jpeg",
      "/projects/vantrum/05.jpeg",
      "/projects/vantrum/06.jpeg",
      "/projects/vantrum/07.jpeg",
      "/projects/vantrum/08.jpeg",
      "/projects/vantrum/09.jpeg",
      "/projects/vantrum/10.jpeg",
      "/projects/vantrum/11.jpeg",
      "/projects/vantrum/12.jpeg",
      "/projects/vantrum/13.jpeg",
    ]
  },
  {
    id: 8,
    title: "The Coffee Lab",
    category: "Commercial & Hospitality Interior",
    location: "London N1C 4AA",
    year: "2024",
    status: "Completed",
    scope: "Interior Architecture & Execution",
    description: "A specialty coffee destination in London N1C 4AA featuring warm material palettes, bespoke counter details, ambient architectural lighting, and refined spatial flow.",
    coverImage: "/projects/coffee_lab/00.jpeg",
    images: [
      "/projects/coffee_lab/00.jpeg",
      "/projects/coffee_lab/01.jpeg",
      "/projects/coffee_lab/02.jpeg",
      "/projects/coffee_lab/03.jpeg",
      "/projects/coffee_lab/04.jpeg",
      "/projects/coffee_lab/05.jpeg",
      "/projects/coffee_lab/06.jpeg",
    ]
  }
]

function LightboxModal({ project, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Lock body scroll while modal is open & keyboard navigation
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') {
        setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
      }
      if (e.key === 'ArrowRight') {
        setActiveIndex((i) => (i + 1) % project.images.length)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKey)
    }
  }, [project, onClose])

  const prevImage = () => {
    setActiveIndex((i) => (i - 1 + project.images.length) % project.images.length)
  }
  const nextImage = () => {
    setActiveIndex((i) => (i + 1) % project.images.length)
  }

  // Swipe handling for touch screens
  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const minSwipeDistance = 40
    if (distance > minSwipeDistance) {
      nextImage()
    } else if (distance < -minSwipeDistance) {
      prevImage()
    }
  }

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#0d0b0a',
        zIndex: 999999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Modal Top Header Bar */}
      <div className="modal-header-bar">
        {/* Left: Back Pill Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="ios-glass-btn modal-header-btn"
        >
          ← BACK
        </motion.button>

        {/* Center: Project Title */}
        <div style={{
          textAlign: 'center',
          opacity: 0.9,
          fontSize: '0.78rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          padding: '0 0.5rem',
          maxWidth: '50%'
        }}>
          {project.title}
        </div>

        {/* Right: Close Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="ios-glass-btn modal-header-btn"
          style={{
            background: 'linear-gradient(135deg, rgba(196, 164, 124, 0.4) 0%, rgba(196, 164, 124, 0.15) 100%)',
            borderColor: 'rgba(196, 164, 124, 0.5)'
          }}
          title="Close (Esc)"
        >
          ✕ CLOSE
        </motion.button>
      </div>

      {/* Main BIG-style Grid Container */}
      <div className="big-modal-grid">
        {/* LEFT SIDE (On Mobile: Top): Project Details */}
        <div className="big-modal-details">
          <div style={{ marginBottom: '1.5rem', width: '100%' }}>
            <span style={{
              color: 'var(--color-accent)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              fontWeight: 600,
              display: 'block',
              marginBottom: '0.5rem'
            }}>
              {project.category} • {project.location}
            </span>
            <h2 className="modal-details-title">
              {project.title}
            </h2>
            <div className="modal-divider"></div>
            <p className="uppercase" style={{
              fontSize: '0.85rem',
              lineHeight: 1.7,
              letterSpacing: '0.04em',
              opacity: 0.85,
              color: '#e2dfd7',
              marginBottom: '1.5rem',
              textAlign: 'left'
            }}>
              {project.description}
            </p>
          </div>

          {/* Architectural Specifications Grid */}
          <div className="modal-specs-grid">
            <div>
              <span className="spec-label">Location</span>
              <span className="spec-value">{project.location}</span>
            </div>
            <div>
              <span className="spec-label">Category</span>
              <span className="spec-value">{project.category}</span>
            </div>
            <div>
              <span className="spec-label">Year</span>
              <span className="spec-value">{project.year || '2023-2024'}</span>
            </div>
            <div>
              <span className="spec-label">Scope</span>
              <span className="spec-value">{project.scope || 'Architecture & Interior'}</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE (On Mobile: Below Details): Project Image Gallery */}
        <div className="big-modal-gallery">
          {/* Active Image Display */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              maxWidth: '100%',
              height: '100%',
              minHeight: '300px',
              boxSizing: 'border-box',
              touchAction: 'pan-y',
              overflow: 'hidden'
            }}
          >
            {/* Transparent Guard Overlay (Anti-Download Protection) */}
            <div
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 5
              }}
            />

            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={project.images[activeIndex]}
                alt={`${project.title} - ${activeIndex + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25 }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.7)',
                  display: 'block',
                  margin: '0 auto',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none'
                }}
              />
            </AnimatePresence>

            {/* Photo Counter Pill Badge */}
            <div style={{
              position: 'absolute',
              top: '0.6rem',
              right: '0.6rem',
              background: 'rgba(13, 11, 10, 0.8)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(196, 164, 124, 0.35)',
              color: '#f5f3ef',
              fontSize: '0.68rem',
              letterSpacing: '0.1em',
              padding: '0.3rem 0.7rem',
              borderRadius: '20px',
              zIndex: 10
            }}>
              {activeIndex + 1} / {project.images.length}
            </div>

            {/* Navigation Arrow Left */}
            <button
              onClick={prevImage}
              aria-label="Previous Image"
              className="modal-nav-arrow modal-nav-arrow-left"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.color = '#0d0b0a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(13, 11, 10, 0.85)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
            >
              ←
            </button>

            {/* Navigation Arrow Right */}
            <button
              onClick={nextImage}
              aria-label="Next Image"
              className="modal-nav-arrow modal-nav-arrow-right"
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.color = '#0d0b0a'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(13, 11, 10, 0.85)'
                e.currentTarget.style.color = 'var(--color-accent)'
              }}
            >
              →
            </button>
          </div>

          {/* Centered / Scrollable Thumbnail strip */}
          <div className="modal-thumbnail-strip">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                onClick={() => {
                  setZoomScale(1)
                  setActiveIndex(i)
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{
                  width: '72px',
                  height: '52px',
                  objectFit: 'cover',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  border: i === activeIndex ? '2px solid var(--color-accent)' : '2px solid transparent',
                  opacity: i === activeIndex ? 1 : 0.45,
                  transition: 'all 0.2s',
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                  WebkitUserDrag: 'none'
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>,
    document.body
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
                loading="lazy"
                decoding="async"
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                style={{ width: '100%', height: 'auto', objectFit: 'cover', filter: 'brightness(0.9) contrast(1.05)', borderRadius: '12px', WebkitUserSelect: 'none', userSelect: 'none', WebkitTouchCallout: 'none', WebkitUserDrag: 'none' }}
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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-outline ios-glass-btn"
                onClick={() => setLightboxProject(project)}
              >
                View Details
              </motion.button>
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
