import Link from 'next/link'
import type { Article } from '@/content/articles'

interface ArticleCardProps {
  article: Article
  locale: string
  readMoreLabel: string
  byLabel: string
  featured?: boolean
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({
  article,
  locale,
  readMoreLabel,
  byLabel,
  featured = false,
}: ArticleCardProps) {
  const content = locale === 'en' ? article.en : article.tr
  const href = `/${locale}/yayinlar/${article.slug}`
  const readingMin = locale === 'en'
    ? `${article.readingTime} min read`
    : `${article.readingTime} dk okuma`

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-sm border border-paper-2 bg-paper shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
        <div className="h-1 w-full bg-gold-500" aria-hidden="true" />
        <div className="p-8 md:p-12">
          {/* Categories */}
          <div className="mb-5 flex flex-wrap gap-2">
            {article.categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-night-900 px-3 py-1 text-xs font-medium text-gold-500"
              >
                {cat}
              </span>
            ))}
          </div>
          <h2
            className="text-h2 font-semibold text-ink leading-tight group-hover:text-night-800 transition-colors"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            <Link href={href} className="after:absolute after:inset-0">
              {content.title}
            </Link>
          </h2>
          {content.abstract ? (
            <p className="mt-4 text-body text-slate leading-relaxed max-w-3xl">{content.abstract}</p>
          ) : (
            <p className="mt-4 text-body text-slate leading-relaxed max-w-3xl">{content.summary}</p>
          )}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate">
            <span>
              <span className="font-medium text-gold-500">{byLabel}</span> {article.author}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMin}</span>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-night-900 group-hover:text-gold-500 transition-colors" aria-hidden="true">
            {readMoreLabel}
            <svg className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-paper-2 bg-paper shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="h-0.5 w-full bg-gold-500" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-7">
        {/* Categories */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {article.categories.slice(0, 2).map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-night-700/20 bg-paper-2 px-2.5 py-0.5 text-xs font-medium text-night-800"
            >
              {cat}
            </span>
          ))}
        </div>

        <h2
          className="text-h3 font-semibold text-ink leading-tight group-hover:text-gold-500 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {content.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm text-slate leading-relaxed line-clamp-3">
          {content.summary}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-paper-2 pt-4 text-xs text-slate">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMin}</span>
        </div>
      </div>
    </article>
  )
}
