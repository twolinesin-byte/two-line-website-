import express from 'express'
import nodemailer from 'nodemailer'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// ---------------------------------------------------------------------------
// 1. SECURITY HEADERS MIDDLEWARE
// ---------------------------------------------------------------------------
app.use((req, res, next) => {
  // Prevent clickjacking by restricting framing
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  // Prevent MIME-sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff')
  // Enable browser XSS filtering
  res.setHeader('X-XSS-Protection', '1; mode=block')
  // Restrict referrer information sent on navigation
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  // Restrict sensitive browser features
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  // Force HTTPS for 1 year (HSTS)
  if (req.headers['x-forwarded-proto'] === 'https' || process.env.NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  }
  next()
})

// CORS Policy Configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

// JSON Body Parser with Payload Limit (prevents DoS payload inflation attacks)
app.use(express.json({ limit: '50kb' }))

// Create Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

// Test transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error.message)
    console.error('   Make sure GMAIL_USER and GMAIL_APP_PASSWORD are set in .env')
  } else {
    console.log('✅ Email transporter ready — emails will be sent to', process.env.GMAIL_USER)
  }
})

// ---------------------------------------------------------------------------
// 2. RATE LIMITER & INPUT SANITIZATION (ANTI-SPAM & SECURITY)
// ---------------------------------------------------------------------------
const ipRateMap = new Map()

// Lightweight in-memory rate limiter: max 5 form submissions per IP per 15 minutes
const rateLimiter = (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes

  const userRecord = ipRateMap.get(ip) || { count: 0, resetTime: now + windowMs }

  if (now > userRecord.resetTime) {
    userRecord.count = 1
    userRecord.resetTime = now + windowMs
  } else {
    userRecord.count += 1
  }

  ipRateMap.set(ip, userRecord)

  if (userRecord.count > 5) {
    return res.status(429).json({
      success: false,
      error: 'Too many requests. Please wait a few minutes before submitting again.'
    })
  }
  next()
}

// XSS Sanitizer function
function sanitize(str) {
  if (typeof str !== 'string') return ''
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
}

// Email Regex Validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// ---------------------------------------------------------------------------
// 3. BACKEND API ROUTES
// ---------------------------------------------------------------------------

// Explicit SEO routes for sitemap and robots
app.get('/sitemap.xml', (req, res) => {
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.sendFile(path.join(__dirname, 'public', 'sitemap.xml'))
})

app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain')
  res.setHeader('Cache-Control', 'public, max-age=86400')
  res.sendFile(path.join(__dirname, 'public', 'robots.txt'))
})

// Secure Contact Form API Endpoint
app.post('/api/contact', rateLimiter, async (req, res) => {
  const { name, email, projectType, message } = req.body

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' })
  }

  const cleanName = sanitize(name).substring(0, 100)
  const cleanEmail = sanitize(email).substring(0, 150)
  const cleanProjectType = sanitize(projectType || 'Not specified').substring(0, 100)
  const cleanMessage = sanitize(message).substring(0, 3000)

  if (!EMAIL_REGEX.test(cleanEmail)) {
    return res.status(400).json({ success: false, error: 'Please enter a valid email address.' })
  }

  const mailOptions = {
    from: `"Two Lines Studio Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: cleanEmail,
    subject: `New Enquiry from ${cleanName} — Two Lines Studio`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #0d0b0a; color: #f5f3ef; padding: 40px; border-radius: 8px;">
        <h2 style="color: #c4a47c; letter-spacing: 0.2em; text-transform: uppercase; font-size: 1.2rem; margin-bottom: 8px;">Two Lines Studio</h2>
        <p style="color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px;">New Website Enquiry</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;">${cleanName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;"><a href="mailto:${cleanEmail}" style="color: #c4a47c;">${cleanEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Project Type</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;">${cleanProjectType}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-top: 16px;">Message</td>
            <td style="padding: 12px 0; font-size: 1rem; line-height: 1.7; padding-top: 16px;">${cleanMessage.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>

        <p style="margin-top: 40px; font-size: 0.75rem; color: #555; text-align: center; letter-spacing: 0.05em;">
          Sent securely from the Two Lines Studio website contact form.<br/>
          Reply directly to this email to respond to ${cleanName}.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent — from ${cleanName} (${cleanEmail})`)
    return res.json({ success: true, message: 'Your message has been sent! We will get back to you soon.' })
  } catch (err) {
    console.error('❌ Failed to send email:', err.message)
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again or contact us directly.' })
  }
})

// ---------------------------------------------------------------------------
// 4. FRONTEND SERVING WITH CACHE CONTROL
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d',
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache')
    }
  }
}))

// Any other requests return index.html
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Export for Vercel
export default app

// Local Listener
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Two Lines Studio server running on http://localhost:${PORT}`)
  })
}
