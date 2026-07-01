import Link from 'next/link'
import type { PracticeArea } from '@/content/practice-areas'

interface PracticeAreaCardProps {
  area: PracticeArea
  locale: string
  learnMoreLabel: string
}

export default function PracticeAreaCard({
  area,
  locale,
  learnMoreLabel,
}: PracticeAreaCardProps) {
  const content = locale === 'en' ? area.en : area.tr
  const href = `/${locale}/calisma-alanlari/${area.slug}`

  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-4 rounded-sm border border-navy-700 bg-navy-800 p-8 transition-all duration-200 hover:-translate-y-1 hover:border-gold-500 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-2 focus-visible:outline-gold-500"
    >
      <div className="h-0.5 w-10 bg-gold-500 transition-all duration-200 group-hover:w-14" aria-hidden="true" />
      <span
        className="text-xs font-semibold uppercase tracking-widest text-gold-500"
        aria-hidden="true"
      >
        {area.number}
      </span>
      <h3
        className="text-h3 font-semibold text-paper leading-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {content.title}
      </h3>
      <p className="text-slate text-sm leading-relaxed flex-1">{content.shortDesc}</p>
      <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-gold-500 transition-colors group-hover:text-gold-300">
        {learnMoreLabel}
        <svg
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </Link>
  )
}
