import Link from 'next/link'
import type { Ictihat } from '@/content/ictihat'

interface IctihatCardProps {
  ictihat: Ictihat
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

export default function IctihatCard({ ictihat, locale, readMoreLabel }: IctihatCardProps) {
  const href = `/${locale}/ictihat/${ictihat.slug}`

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-paper-2 bg-paper shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="h-0.5 w-full bg-night-700" aria-hidden="true" />
      <div className="flex flex-1 flex-col p-7">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate">
          {ictihat.daire}
        </p>

        <div className="mb-4 flex flex-wrap gap-1.5">
          {ictihat.etiketler.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-night-700/20 bg-paper-2 px-2.5 py-0.5 text-xs font-medium text-night-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2
          className="text-h3 font-semibold text-ink leading-tight group-hover:text-gold-500 transition-colors"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          <Link href={href} className="after:absolute after:inset-0">
            {ictihat.konu}
          </Link>
        </h2>

        <p className="mt-3 flex-1 text-sm text-slate leading-relaxed line-clamp-3">
          {ictihat.uyusmazlik}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-paper-2 pt-4 text-xs text-slate">
          <span>E. {ictihat.esasNo}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={ictihat.kararTarihi}>{formatDate(ictihat.kararTarihi, locale)}</time>
        </div>
      </div>
    </article>
  )
}
