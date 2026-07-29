import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import nodemailer from 'nodemailer'
import { site } from '@/lib/site'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10),
  kvkk: z.literal(true),
})

function buildTransporter() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? 587)
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !user || !pass) return null

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    const to = process.env.CONTACT_EMAIL ?? site.email
    const transporter = buildTransporter()

    if (transporter) {
      await transporter.sendMail({
        from: `"VGS Hukuk Web Formu" <${process.env.SMTP_USER}>`,
        to,
        replyTo: data.email,
        subject: `[İletişim Formu] ${data.subject}`,
        text: [
          `Ad Soyad : ${data.name}`,
          `E-posta  : ${data.email}`,
          `Telefon  : ${data.phone ?? '—'}`,
          `Konu     : ${data.subject}`,
          '',
          data.message,
        ].join('\n'),
        html: `
          <table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
            <tr><td style="color:#5A6B7B;white-space:nowrap">Ad Soyad</td><td><strong>${data.name}</strong></td></tr>
            <tr><td style="color:#5A6B7B;white-space:nowrap">E-posta</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
            <tr><td style="color:#5A6B7B;white-space:nowrap">Telefon</td><td>${data.phone ?? '—'}</td></tr>
            <tr><td style="color:#5A6B7B;white-space:nowrap">Konu</td><td>${data.subject}</td></tr>
            <tr><td colspan="2" style="padding-top:16px;border-top:1px solid #eee"><pre style="white-space:pre-wrap;font-family:inherit">${data.message}</pre></td></tr>
          </table>
        `,
      })
    } else {
      // SMTP yapılandırılmamış — .env.local içinde SMTP_* değişkenlerini ayarlayın
      console.warn('[ContactForm] SMTP not configured. Submission logged only.')
      console.log('[ContactForm] Submission:', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        timestamp: new Date().toISOString(),
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, message: 'Invalid form data' }, { status: 400 })
    }
    console.error('[ContactForm] Error:', error)
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 })
  }
}
