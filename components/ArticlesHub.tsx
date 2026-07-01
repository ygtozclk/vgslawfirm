'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'
import IctihatCard from '@/components/IctihatCard'
import type { Article } from '@/content/articles'
import type { Ictihat } from '@/content/ictihat'

interface ArticlesHubProps {
  articles: Article[]
  categories: string[]
  locale: string
  readMoreLabel: string
  byLabel: string
  searchPlaceholder: string
  noResultsLabel: string
  allLabel: string
  ictihatlar?: Ictihat[]
  relatedDecisionsLabel?: string
  allDecisionsLabel?: string
  ictihatReadMoreLabel?: string
}

export default function ArticlesHub({
  articles,
  categories,
  locale,
  readMoreLabel,
  byLabel,
  searchPlaceholder,
  noResultsLabel,
  allLabel,
  ictihatlar = [],
  relatedDecisionsLabel,
  allDecisionsLabel,
  ictihatReadMoreLabel,
}: ArticlesHubProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  const filtered = useMemo(() => {
    let list = activeCategory
      ? articles.filter((a) => a.categories.includes(activeCategory))
      : articles

    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter((a) => {
        const c = locale === 'en' ? a.en : a.tr
        return (
          c.title.toLowerCase().includes(q) ||
          c.summary.toLowerCase().includes(q) ||
          a.categories.some((cat) => cat.toLowerCase().includes(q))
        )
      })
    }

    return list
  }, [articles, activeCategory, query, locale])

  const isFiltering = activeCategory !== null || query.trim() !== ''
  const displayArticles = isFiltering ? filtered : rest
  const featuredInFiltered = isFiltering ? null : featured

  const relatedIctihat = useMemo(() => {
    if (!ictihatlar.length) return []
    if (activeCategory) return ictihatlar.filter((i) => i.etiketler.includes(activeCategory))
    if (query.trim()) {
      const q = query.toLowerCase()
      return ictihatlar.filter(
        (i) =>
          i.konu.toLowerCase().includes(q) ||
          i.etiketler.some((t) => t.toLowerCase().includes(q))
      )
    }
    return []
  }, [ictihatlar, activeCategory, query])

  return (
    <div>
      {/* Topic chips */}
      <div className="mb-8" role="group" aria-label={locale === 'en' ? 'Filter by topic' : 'Konuya göre filtrele'}>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { setActiveCategory(null); setQuery('') }}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
              activeCategory === null && !query
                ? 'bg-navy-900 text-paper shadow-sm'
                : 'border border-paper-2 bg-paper text-ink hover:border-navy-700 hover:text-navy-900'
            }`}
            aria-pressed={activeCategory === null && !query}
          >
            {allLabel}
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(activeCategory === cat ? null : cat); setQuery('') }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-navy-900 shadow-sm'
                  : 'border border-paper-2 bg-paper text-ink hover:border-gold-500 hover:text-navy-900'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mb-10 relative max-w-xl">
        <label htmlFor="article-search" className="sr-only">
          {searchPlaceholder}
        </label>
        <div className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-slate" aria-hidden="true">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <input
          id="article-search"
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActiveCategory(null) }}
          placeholder={searchPlaceholder}
          className="w-full rounded-sm border border-paper-2 bg-paper py-3 pl-10 pr-4 text-sm text-ink placeholder-slate transition-colors focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-slate hover:text-ink transition-colors"
            aria-label={locale === 'en' ? 'Clear search' : 'Aramayı temizle'}
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Featured article (only when not filtering) */}
      {featuredInFiltered && (
        <div className="mb-10">
          <ArticleCard
            article={featuredInFiltered}
            locale={locale}
            readMoreLabel={readMoreLabel}
            byLabel={byLabel}
            featured
          />
        </div>
      )}

      {/* Article grid */}
      {displayArticles.length === 0 ? (
        <div className="rounded-sm border border-paper-2 bg-paper-2 py-20 text-center">
          <p className="text-slate">{noResultsLabel}</p>
          <button
            onClick={() => { setActiveCategory(null); setQuery('') }}
            className="mt-4 text-sm text-gold-500 hover:text-gold-300 underline transition-colors"
          >
            {allLabel}
          </button>
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite" aria-label={locale === 'en' ? 'Articles' : 'Makaleler'}>
          {displayArticles.map((article) => (
            <li key={article.slug}>
              <ArticleCard
                article={article}
                locale={locale}
                readMoreLabel={readMoreLabel}
                byLabel={byLabel}
              />
            </li>
          ))}
        </ul>
      )}

      {/* Related court decisions — shown when filtering and there are matches */}
      {relatedIctihat.length > 0 && relatedDecisionsLabel && (
        <div className="mt-16 border-t border-paper-2 pt-14">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2
              className="text-h2 font-semibold text-ink"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {relatedDecisionsLabel}
            </h2>
            {allDecisionsLabel && (
              <Link
                href={`/${locale}/ictihat`}
                className="text-sm font-medium text-gold-500 hover:text-gold-300 transition-colors whitespace-nowrap"
              >
                {allDecisionsLabel} →
              </Link>
            )}
          </div>
          <ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label={relatedDecisionsLabel}
          >
            {relatedIctihat.map((ictihat) => (
              <li key={ictihat.slug}>
                <IctihatCard
                  ictihat={ictihat}
                  locale={locale}
                  readMoreLabel={ictihatReadMoreLabel ?? relatedDecisionsLabel}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
