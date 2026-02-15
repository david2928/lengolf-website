import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/client'

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 5 // max 5 requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip)

  if (!entry || now > entry.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimit) {
    if (now > entry.resetTime) rateLimit.delete(ip)
  }
}, 5 * 60 * 1000)

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, company, event_type, group_size, preferred_date, message, page_source } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Validate controlled-set fields
    const VALID_EVENT_TYPES = ['corporate', 'party', 'team_building', 'meet_greet', 'birthday', 'filming', 'other']
    const VALID_GROUP_SIZES = ['under_10', '10_20', '20_30', '30_50', '50_plus']
    if (event_type && !VALID_EVENT_TYPES.includes(event_type)) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 })
    }
    if (group_size && !VALID_GROUP_SIZES.includes(group_size)) {
      return NextResponse.json({ error: 'Invalid group size' }, { status: 400 })
    }
    if (preferred_date && (!/^\d{4}-\d{2}-\d{2}$/.test(preferred_date) || isNaN(Date.parse(preferred_date)))) {
      return NextResponse.json({ error: 'Invalid preferred date' }, { status: 400 })
    }

    // Build structured message for storage (appends event details above user message)
    const structuredParts: string[] = []
    if (event_type) structuredParts.push(`Event Type: ${event_type}`)
    if (group_size) structuredParts.push(`Group Size: ${group_size}`)
    if (preferred_date) structuredParts.push(`Preferred Date: ${preferred_date}`)
    const fullMessage = structuredParts.length > 0
      ? `${structuredParts.join('\n')}\n\n${message}`
      : message

    const supabase = createClient()

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: fullMessage,
        page_source: page_source || null,
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit contact form' },
        { status: 500 }
      )
    }

    // Send email notification
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || 'notification@len.golf',
        to: process.env.CONTACT_EMAIL_TO || 'info@len.golf',
        replyTo: email,
        subject: `${page_source === 'events' ? 'Event Inquiry' : 'Contact Form'}: ${name}${company ? ` (${company})` : ''}`,
        html: `
          <h2>${page_source === 'events' ? 'New Event Inquiry' : 'New Contact Form Submission'}</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(phone)}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Company</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(company)}</td></tr>` : ''}
            ${event_type ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Event Type</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(event_type)}</td></tr>` : ''}
            ${group_size ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Group Size</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(group_size)}</td></tr>` : ''}
            ${preferred_date ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Preferred Date</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(preferred_date)}</td></tr>` : ''}
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Message</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(message).replace(/\n/g, '<br>')}</td></tr>
            ${page_source ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Source</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(page_source)}</td></tr>` : ''}
          </table>
        `,
      })
    } catch (emailError) {
      // Log but don't fail the request — the submission is already saved
      console.error('Email notification failed:', emailError)
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
