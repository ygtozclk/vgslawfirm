import Link from 'next/link'
import type { Karar } from '@/content/kararlar'

interface KararCardProps {
  karar: Karar
  locale: string
  readMoreLabel: string
}

function formatDate(iso: string, locale: string) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function KararCard({ karar, locale }: KararCardProps) {
  const href = `/${locale}/kararlarimiz/${karar.slug}`

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-paper-2 bg-paper shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="h-0.5 w-full bg-gold-500" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-7">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {karar.ilacAdi && (
            <span className="rounded-full bg-night-900 px-2.5 py-0.5 text-xs font-medium text-gold-500">
              {karar.ilacAdi}
            </span>
          )}
          {karar.mahkemeTuru && (
            <span className="rounded-full border border-night-700/20 bg-paper-2 px-2.5 py-0.5 text-xs font-medium text-night-800">
              {karar.mahkemeTuru}
            </span>
          )}
        </div>

        <h2
          className="text-h3 font-semibold text-ink leading-tight group-hover:text-gold-500 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {karar.title}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm text-slate leading-relaxed line-clamp-3">
          {karar.description}
        </p>

        {karar.kararTarihi && (
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-paper-2 pt-4 text-xs text-slate">
            <time dateTime={karar.kararTarihi}>{formatDate(karar.kararTarihi, locale)}</time>
          </div>
        )}
      </div>
    </article>
  )
}
