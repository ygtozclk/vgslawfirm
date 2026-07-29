'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'

interface ContactFormProps {
  locale: string
  dict: Dictionary['contact']
}

function buildSchema(dict: Dictionary['contact']) {
  return z.object({
    name: z.string().min(1, dict.required),
    email: z.string().min(1, dict.required).email(dict.invalidEmail),
    phone: z.string().optional(),
    subject: z.string().min(1, dict.required),
    message: z.string().min(10, dict.required),
    kvkk: z.boolean().refine((v) => v === true, { message: dict.kvkkRequired }),
  })
}

type FormData = {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  kvkk: boolean
}

export default function ContactForm({ locale, dict }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const schema = buildSchema(dict)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { kvkk: false },
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Network error')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const inputBase =
    'w-full rounded-sm border border-night-700/25 bg-white px-4 py-3 text-sm text-ink placeholder-slate/60 transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500/50'
  const inputError = 'border-red-400 focus:border-red-400 focus:ring-red-400/50'
  const labelBase = 'block text-xs font-semibold uppercase tracking-wider text-slate mb-2'

  if (status === 'success') {
    return (
      <div className="rounded-sm border border-gold-500/30 bg-night-900/5 p-10 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-sm bg-gold-500/10">
          <svg className="h-6 w-6 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-ink">{dict.successMessage}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
      {/* Name */}
      <div>
        <label htmlFor="contact-name" className={labelBase}>
          {dict.fieldName} <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={dict.fieldName}
          className={`${inputBase} ${errors.name ? inputError : ''}`}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          {...register('name')}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* Email + Phone row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className={labelBase}>
            {dict.fieldEmail} <span className="text-gold-500" aria-hidden="true">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder={dict.fieldEmail}
            className={`${inputBase} ${errors.email ? inputError : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-500" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelBase}>
            {dict.fieldPhone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            placeholder={dict.fieldPhone}
            className={inputBase}
            {...register('phone')}
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="contact-subject" className={labelBase}>
          {dict.fieldSubject} <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          placeholder={dict.fieldSubject}
          className={`${inputBase} ${errors.subject ? inputError : ''}`}
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          {...register('subject')}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.subject.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="contact-message" className={labelBase}>
          {dict.fieldMessage} <span className="text-gold-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={dict.fieldMessage}
          className={`${inputBase} resize-none ${errors.message ? inputError : ''}`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      {/* KVKK */}
      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded-sm border-night-700/30 accent-gold-500 transition-colors focus:ring-gold-500 focus:ring-offset-0"
            aria-invalid={!!errors.kvkk}
            aria-describedby={errors.kvkk ? 'kvkk-error' : undefined}
            {...register('kvkk')}
          />
          <span className="text-sm text-ink leading-relaxed">
            {dict.kvkkConsent}{' '}
            <Link
              href={`/${locale}/kvkk-aydinlatma`}
              className="text-gold-500 underline underline-offset-2 hover:text-gold-300 transition-colors"
              target="_blank"
            >
              {dict.kvkkLink}
            </Link>
            {' '}{dict.kvkkConsentSuffix}
            {' '}<span className="text-gold-500" aria-hidden="true">*</span>
          </span>
        </label>
        {errors.kvkk && (
          <p id="kvkk-error" className="mt-1.5 text-xs text-red-500" role="alert">
            {errors.kvkk.message}
          </p>
        )}
      </div>

      {/* Error state */}
      {status === 'error' && (
        <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600" role="alert">
          {dict.errorMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-gold-500 px-8 py-3.5 text-sm font-semibold text-night-900 transition-colors duration-200 hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
      >
        {status === 'loading' ? (
          <>
            <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {locale === 'en' ? 'Sending…' : 'Gönderiliyor…'}
          </>
        ) : dict.submitButton}
      </button>
    </form>
  )
}
