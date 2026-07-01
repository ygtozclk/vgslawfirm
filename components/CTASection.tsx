import Link from 'next/link'

interface CTASectionProps {
  heading: string
  subheading: string
  buttonLabel: string
  buttonHref: string
}

export default function CTASection({
  heading,
  subheading,
  buttonLabel,
  buttonHref,
}: CTASectionProps) {
  return (
    <section className="bg-paper-2 py-20 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <h2
          className="text-h2 font-semibold text-ink leading-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {heading}
        </h2>
        <p className="mt-4 text-body text-slate">{subheading}</p>
        <Link
          href={buttonHref}
          className="mt-8 inline-flex items-center gap-2 rounded-sm bg-gold-500 px-8 py-3.5 text-sm font-semibold text-navy-900 transition-colors duration-200 hover:bg-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
        >
          {buttonLabel}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
