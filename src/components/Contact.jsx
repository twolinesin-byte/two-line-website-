import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    setStatusMsg('')
    try {
      // Use relative URL so it works seamlessly on Vercel and local dev (via Vite proxy)
      const res = await fetch(`/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setStatusMsg(data.message)
        setForm({ name: '', email: '', projectType: '', message: '' })
      } else {
        setStatus('error')
        setStatusMsg(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setStatus('error')
      setStatusMsg('Could not connect to server. Please email us directly at twolines.in@gmail.com')
    }
  }

  return (
    <section id="contact" className="section container" style={{ zIndex: 10, position: 'relative' }}>
      <div className="grid-responsive">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="line-accent"></div>
          <h2 className="text-title" style={{ marginBottom: '2rem' }}>Get In<br/>Touch</h2>
          <p className="uppercase" style={{ marginBottom: '2rem', fontSize: '0.875rem', letterSpacing: '0.05em', lineHeight: 1.8 }}>
            Whether you have a specific project in mind or just want to explore possibilities, we'd love to hear from you.
          </p>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>EMAIL</p>
            <a href="mailto:twolines.in@gmail.com" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '1px solid var(--color-accent)', paddingBottom: '2px' }}>twolines.in@gmail.com</a>
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>PHONE</p>
            <a href="tel:+917069834637" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '1px solid var(--color-accent)', paddingBottom: '2px' }}>+91 70698 34637</a>
          </div>
          <div>
            <p style={{ fontWeight: 600, letterSpacing: '0.1em', marginBottom: '0.5rem' }}>INSTAGRAM</p>
            <a href="https://www.instagram.com/two_lines.in" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit', borderBottom: '1px solid var(--color-accent)', paddingBottom: '2px' }}>@two_lines.in</a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel"
        >
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✓</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-accent)' }}>Message Sent!</h3>
              <p className="uppercase" style={{ fontSize: '0.875rem', opacity: 0.8, lineHeight: 1.8 }}>{statusMsg}</p>
              <button className="btn-outline" style={{ marginTop: '2rem' }} onClick={() => setStatus('idle')}>Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text" name="name" placeholder="YOUR NAME" className="form-input"
                value={form.name} onChange={handleChange} required
              />
              <input
                type="email" name="email" placeholder="YOUR EMAIL" className="form-input"
                value={form.email} onChange={handleChange} required
              />
              <input
                type="text" name="projectType" placeholder="PROJECT TYPE (e.g. RESIDENTIAL, COMMERCIAL)" className="form-input"
                value={form.projectType} onChange={handleChange}
              />
              <textarea
                name="message" placeholder="TELL US ABOUT YOUR PROJECT" className="form-textarea"
                value={form.message} onChange={handleChange} required
              ></textarea>

              {status === 'error' && (
                <p style={{ color: '#e07070', fontSize: '0.8rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  ⚠ {statusMsg}
                </p>
              )}

              <button type="submit" className="btn-outline" style={{ width: '100%' }} disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
