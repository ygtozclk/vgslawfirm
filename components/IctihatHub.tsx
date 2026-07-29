'use client'

import { useState, useMemo } from 'react'
import IctihatCard from '@/components/IctihatCard'
import type { Ictihat } from '@/content/ictihat'

interface IctihatHubProps {
  ictihatlar: Ictihat[]
  allTags: string[]
  locale: string
  readMoreLabel: string
  searchPlaceholder: string
  noResultsLabel: string
  allLabel: string
}

export default function IctihatHub({
  ictihatlar,
  allTags,
  locale,
  readMoreLabel,
  searchPlaceholder,
  noResultsLabel,
  allLabel,
}: IctihatHubProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    let list = activeTag
      ? ictihatlar.filter((i) => i.etiketler.includes(activeTag))
      : ictihatlar

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (i) =>
          i.konu.toLowerCase().includes(q) ||
          i.daire.toLowerCase().includes(q) ||
          i.uyusmazlik.toLowerCase().includes(q) ||
          i.etiketler.some((t) => t.toLowerCase().includes(q))
      )
    }

    return list
  }, [ictihatlar, activeTag, query])

  return (
    <div>
      {/* Topic chips */}
      <div
        className="mb-8"
        role="group"
        aria-label={locale === 'en' ? 'Filter by topic' : 'Konuya göre filtrele'}
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setActiveTag(null)
              setQuery('')
            }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
              activeTag === null && !query
                ? 'bg-night-900 text-paper shadow-sm'
                : 'border border-paper-2 bg-paper text-ink hover:border-night-700 hover:text-night-900'
            }`}
            aria-pressed={activeTag === null && !query}
          >
            {allLabel}
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                setActiveTag(activeTag === tag ? null : tag)
                setQuery('')
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                activeTag === tag
                  ? 'bg-gold-500 text-night-900 shadow-sm'
                  : 'border border-paper-2 bg-paper text-ink hover:border-gold-500 hover:text-night-900'
              }`}
              aria-pressed={activeTag === tag}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-10 relative max-w-xl">
        <label htmlFor="ictihat-search" className="sr-only">
          {searchPlaceholder}
        </label>
        <div
          className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate"
          aria-hidden="true"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          id="ictihat-search"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActiveTag(null)
          }}
          placeholder={searchPlaceholder}
          className="w-full rounded-sm border border-paper-2 bg-paper py-3 pl-10 pr-4 text-sm text-ink placeholder-slate transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-slate hover:text-ink transition-colors"
            aria-label={locale === 'en' ? 'Clear search' : 'Aramayı temizle'}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-sm border border-paper-2 bg-paper-2 py-20 text-center">
          <p className="text-slate">{noResultsLabel}</p>
          <button
            onClick={() => {
              setActiveTag(null)
              setQuery('')
            }}
            className="mt-4 text-sm text-gold-500 hover:text-gold-300 underline transition-colors"
          >
            {allLabel}
          </button>
        </div>
      ) : (
        <ul
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-live="polite"
          aria-label={locale === 'en' ? 'Court decisions' : 'Yargı kararları'}
        >
          {filtered.map((ictihat) => (
            <li key={ictihat.slug}>
              <IctihatCard ictihat={ictihat} locale={locale} readMoreLabel={readMoreLabel} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
