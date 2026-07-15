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

// Middleware
app.use(cors())
app.use(express.json())

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
// 1. BACKEND API ROUTES
// ---------------------------------------------------------------------------
app.post('/api/contact', async (req, res) => {
  const { name, email, projectType, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' })
  }

  const mailOptions = {
    from: `"Two Lines Studio Website" <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `New Enquiry from ${name} — Two Lines Studio`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #0d0b0a; color: #f5f3ef; padding: 40px; border-radius: 8px;">
        <h2 style="color: #c4a47c; letter-spacing: 0.2em; text-transform: uppercase; font-size: 1.2rem; margin-bottom: 8px;">Two Lines Studio</h2>
        <p style="color: #888; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px;">New Website Enquiry</p>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;"><a href="mailto:${email}" style="color: #c4a47c;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em;">Project Type</td>
            <td style="padding: 12px 0; border-bottom: 1px solid rgba(245,243,239,0.1); font-size: 1rem;">${projectType || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #c4a47c; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top; padding-top: 16px;">Message</td>
            <td style="padding: 12px 0; font-size: 1rem; line-height: 1.7; padding-top: 16px;">${message.replace(/\n/g, '<br/>')}</td>
          </tr>
        </table>

        <p style="margin-top: 40px; font-size: 0.75rem; color: #555; text-align: center; letter-spacing: 0.05em;">
          Sent from the Two Lines Studio website contact form.<br/>
          Reply directly to this email to respond to ${name}.
        </p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log(`✅ Email sent — from ${name} (${email})`)
    return res.json({ success: true, message: 'Your message has been sent! We will get back to you soon.' })
  } catch (err) {
    console.error('❌ Failed to send email:', err.message)
    return res.status(500).json({ success: false, error: 'Failed to send email. Please try again or contact us directly.' })
  }
})

// ---------------------------------------------------------------------------
// 2. FRONTEND SERVING (SINGLE FILE SETUP)
// ---------------------------------------------------------------------------
// Serve the built frontend files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')))

// Any other requests (like /about, /projects) will return the frontend index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// Export the app for Vercel Serverless Functions
export default app

// Only listen locally if not running on Vercel
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Two Lines Studio server running on http://localhost:${PORT}`)
  })
}
