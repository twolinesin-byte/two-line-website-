import React from 'react'

export default function Footer() {
  return (
    <footer style={{ padding: '4rem 5%', borderTop: '1px solid rgba(245, 243, 239, 0.2)', marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', zIndex: 10, position: 'relative', backgroundColor: 'var(--color-bg)' }}>
      <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.2em', marginBottom: '1rem' }}>TWO LINES STUDIO</h2>
      <p className="uppercase" style={{ fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.1em', marginBottom: '2rem' }}>
        Architecture | Interior | Landscape
      </p>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="https://www.instagram.com/two_lines.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Instagram</a>
        <a href="mailto:twolines.in@gmail.com" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>twolines.in@gmail.com</a>
        <a href="tel:+917069834637" style={{ textDecoration: 'none', color: 'inherit', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>+91 70698 34637</a>
      </div>
      <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>© 2026 Two Lines Studio. All rights reserved.</p>
    </footer>
  )
}
