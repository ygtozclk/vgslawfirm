'use client'

import { useState } from 'react'
import type { Attorney } from '@/content/team'
import type { Dictionary } from '@/lib/i18n'

interface AttorneyCardProps {
  attorney: Attorney
  locale: string
  dict: Dictionary['team']
}

export default function AttorneyCard({ attorney, locale, dict }: AttorneyCardProps) {
  const [expanded, setExpanded] = useState(false)
  const profile = locale === 'en' ? attorney.en : attorney.tr

  return (
    <article className="rounded-sm border border-paper-2 bg-paper overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="bg-night-800 px-8 py-10">
        <div
          className="mx-auto mb-4 h-16 w-16 rounded-full bg-night-700 flex items-center justify-center"
          aria-hidden="true"
        >
          <span className="text-2xl font-semibold text-gold-500" style={{ fontFamily: 'var(--font-heading)' }}>
            {profile.name.split(' ').filter(p => !p.startsWith('Av.')).map(p => p[0]).slice(0, 2).join('')}
          </span>
        </div>
        <div className="text-center">
          <h3
            className="text-xl font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {profile.name}
          </h3>
          <p className="mt-1 text-sm text-gold-500">{profile.title}</p>
          <p className="mt-1 text-xs text-slate">{profile.bar}</p>
        </div>
      </div>

      {/* Contact links */}
      <div className="flex items-center justify-center gap-4 border-b border-paper-2 px-8 py-4">
        <a
          href={`mailto:${attorney.contact.email}`}
          className="flex items-center gap-1.5 text-sm text-slate hover:text-gold-500 transition-colors"
          aria-label={`${dict.email}: ${attorney.contact.email}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          <span className="sr-only">{dict.email}</span>
        </a>
        <a
          href={`tel:${attorney.contact.phone.replace(/\s/g, '')}`}
          className="flex items-center gap-1.5 text-sm text-slate hover:text-gold-500 transition-colors"
          aria-label={`${dict.phone}: ${attorney.contact.phone}`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          <span className="sr-only">{dict.phone}</span>
        </a>
        {attorney.contact.linkedin && (
          <a
            href={attorney.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-slate hover:text-gold-500 transition-colors"
            aria-label="LinkedIn"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className="sr-only">LinkedIn</span>
          </a>
        )}
      </div>

      {/* Toggle detail */}
      <div className="px-8 py-6">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between text-sm font-medium text-ink hover:text-gold-500 transition-colors"
          aria-expanded={expanded}
        >
          <span>{expanded ? (locale === 'en' ? 'Hide Details' : 'Detayları Gizle') : (locale === 'en' ? 'View Details' : 'Detayları Görüntüle')}</span>
          <svg
            className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && (
          <dl className="mt-5 grid gap-3 text-sm">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate">{dict.education}</dt>
              <dd className="mt-1 text-ink">{profile.education}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate">{dict.languages}</dt>
              <dd className="mt-1 text-ink">{profile.languages.join(', ')}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate">{dict.practiceAreas}</dt>
              <dd className="mt-1">
                <ul className="flex flex-wrap gap-2">
                  {profile.practiceAreas.map((area) => (
                    <li
                      key={area}
                      className="rounded-full border border-paper-2 bg-paper-2 px-3 py-0.5 text-xs text-ink"
                    >
                      {area}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate">{dict.email}</dt>
              <dd className="mt-1">
                <a href={`mailto:${attorney.contact.email}`} className="text-gold-500 hover:text-gold-300 transition-colors">
                  {attorney.contact.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-slate">{dict.phone}</dt>
              <dd className="mt-1">
                <a href={`tel:${attorney.contact.phone.replace(/\s/g, '')}`} className="text-ink hover:text-gold-500 transition-colors">
                  {attorney.contact.phone}
                </a>
              </dd>
            </div>
          </dl>
        )}
      </div>
    </article>
  )
}
