interface PullQuoteProps {
  quote: string
  author: string
  year?: string
}

export default function PullQuote({ quote, author, year }: PullQuoteProps) {
  return (
    <section className="bg-navy-900 py-20 px-6" aria-label="Alıntı">
      <div className="mx-auto max-w-3xl text-center">
        <span
          className="block font-heading text-7xl leading-none text-gold-500 select-none mb-2"
          style={{ fontFamily: 'var(--font-heading)' }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <blockquote>
          <p
            className="text-h2 font-semibold italic leading-relaxed text-paper"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {quote}
          </p>
          <footer className="mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
            <cite className="text-sm not-italic text-gold-300">
              {author}{year ? `, ${year}` : ''}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
