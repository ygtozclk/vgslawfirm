'use client'

import { useState, useMemo } from 'react'
import KararCard from '@/components/KararCard'
import type { Karar } from '@/content/kararlar'

interface KararHubProps {
  kararlar: Karar[]
  locale: string
  readMoreLabel: string
  allLabel: string
}

export default function KararHub({ kararlar, locale, readMoreLabel, allLabel }: KararHubProps) {
  const [activeTur, setActiveTur] = useState<string | null>(null)

  const turler = useMemo(
    () => Array.from(new Set(kararlar.map((k) => k.mahkemeTuru).filter(Boolean))),
    [kararlar]
  )

  const filtered = useMemo(
    () => (activeTur ? kararlar.filter((k) => k.mahkemeTuru === activeTur) : kararlar),
    [kararlar, activeTur]
  )

  return (
    <div>
      <div
        className="mb-10 flex flex-wrap gap-2"
        role="group"
        aria-label={locale === 'en' ? 'Filter by court type' : 'Mahkeme türüne göre filtrele'}
      >
        <button
          onClick={() => setActiveTur(null)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
            activeTur === null
              ? 'bg-night-900 text-paper shadow-sm'
              : 'border border-paper-2 bg-paper text-ink hover:border-night-700 hover:text-night-900'
          }`}
          aria-pressed={activeTur === null}
        >
          {allLabel}
        </button>
        {turler.map((tur) => (
          <button
            key={tur}
            onClick={() => setActiveTur(activeTur === tur ? null : tur)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
              activeTur === tur
                ? 'bg-gold-500 text-night-900 shadow-sm'
                : 'border border-paper-2 bg-paper text-ink hover:border-gold-500 hover:text-night-900'
            }`}
            aria-pressed={activeTur === tur}
          >
            {tur}
          </button>
        ))}
      </div>

      <ul
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        aria-live="polite"
        aria-label={locale === 'en' ? 'Won cases' : 'Kazanılan davalar'}
      >
        {filtered.map((karar) => (
          <li key={karar.slug}>
            <KararCard karar={karar} locale={locale} readMoreLabel={readMoreLabel} />
          </li>
        ))}
      </ul>
    </div>
  )
}
