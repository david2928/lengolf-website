import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { createClient } from '@/lib/supabase/client'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'mail.len.golf',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
    servername: 'cs94.hostneverdie.com',
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message, page_source } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    const { error } = await supabase
      .from('contact_submissions')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message,
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
        subject: `New Contact Form: ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Name</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Email</td><td style="padding:8px;border-bottom:1px solid #eee"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Phone</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(phone)}</td></tr>` : ''}
            ${company ? `<tr><td style="padding:8px;font-weight:bold;border-bottom:1px solid #eee">Company</td><td style="padding:8px;border-bottom:1px solid #eee">${escapeHtml(company)}</td></tr>` : ''}
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
