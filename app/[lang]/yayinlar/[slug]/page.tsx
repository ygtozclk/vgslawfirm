import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { articles, getArticleBySlug } from '@/content/articles'
import { getIctihatBySlug } from '@/content/ictihat'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReadingProgress from '@/components/ReadingProgress'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

export async function generateStaticParams() {
  return articles.flatMap((a) =>
    ['tr', 'en'].map((lang) => ({ lang, slug: a.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const locale = lang as Locale
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const content = locale === 'en' ? article.en : article.tr
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: `${SITE_URL}/${lang}/yayinlar/${slug}`,
      languages: {
        tr: `${SITE_URL}/tr/yayinlar/${slug}`,
        en: `${SITE_URL}/en/yayinlar/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/${lang}/yayinlar/${slug}`,
      title: content.seoTitle,
      description: content.seoDescription,
    },
  }
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// ── Lightweight markdown-style renderer for article body content ──
// Supports: ## / ### headings, - bullet lists, 1. ordered lists, | table |
// rows, legacy **standalone bold** subheadings, and inline **bold** /
// [text](url) links within paragraphs, list items, and table cells.

type Block =
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'strongHeading'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'table'; header: string[]; rows: string[][] }

function parseBlocks(content: string): Block[] {
  const lines = content.split('\n').map((l) => l.trim())
  const blocks: Block[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line) {
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() })
      i++
      continue
    }
    if (/^[-*]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*]\s+/, ''))
        i++
      }
      blocks.push({ type: 'ul', items })
      continue
    }
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s+/, ''))
        i++
      }
      blocks.push({ type: 'ol', items })
      continue
    }
    if (line.startsWith('|')) {
      const rows: string[][] = []
      while (i < lines.length && lines[i].startsWith('|')) {
        const cells = lines[i].split('|').slice(1, -1).map((c) => c.trim())
        if (!/^:?-+:?$/.test(cells.join(''))) rows.push(cells)
        i++
      }
      const [header, ...body] = rows
      if (header) blocks.push({ type: 'table', header, rows: body })
      continue
    }
    const boldOnly = line.match(/^\*\*([^*]+)\*\*$/)
    if (boldOnly) {
      blocks.push({ type: 'strongHeading', text: boldOnly[1] })
      i++
      continue
    }
    blocks.push({ type: 'p', text: line })
    i++
  }
  return blocks
}

function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  let key = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(
        <strong key={key++} className="font-semibold text-ink">
          {m[1]}
        </strong>
      )
    } else {
      parts.push(
        <Link
          key={key++}
          href={m[3]}
          className="text-gold-600 underline decoration-gold-500/40 underline-offset-2 hover:text-gold-500 transition-colors"
        >
          {m[2]}
        </Link>
      )
    }
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length > 0 ? parts : [text]
}

function renderBlocks(blocks: Block[]): ReactNode[] {
  return blocks.map((b, i) => {
    switch (b.type) {
      case 'h2':
        return (
          <h2
            key={i}
            className="mt-10 mb-4 text-h3 font-semibold text-ink"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {b.text}
          </h2>
        )
      case 'h3':
        return (
          <h3 key={i} className="mt-8 mb-3 text-lg font-semibold text-ink">
            {b.text}
          </h3>
        )
      case 'strongHeading':
        return (
          <p key={i} className="font-semibold text-ink mt-8 mb-3">
            {b.text}
          </p>
        )
      case 'p':
        return (
          <p key={i} className="text-ink leading-relaxed mb-5">
            {parseInline(b.text)}
          </p>
        )
      case 'ul':
        return (
          <ul key={i} className="mb-5 ml-5 list-disc space-y-2 text-ink">
            {b.items.map((it, j) => (
              <li key={j} className="leading-relaxed">
                {parseInline(it)}
              </li>
            ))}
          </ul>
        )
      case 'ol':
        return (
          <ol key={i} className="mb-5 ml-5 list-decimal space-y-2 text-ink">
            {b.items.map((it, j) => (
              <li key={j} className="leading-relaxed">
                {parseInline(it)}
              </li>
            ))}
          </ol>
        )
      case 'table':
        return (
          <div key={i} className="mb-6 overflow-x-auto rounded-sm border border-paper-2">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-paper-2 bg-paper-2 text-left">
                  {b.header.map((h, j) => (
                    <th key={j} className="py-2.5 px-4 font-semibold text-ink">
                      {parseInline(h)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row, ri) => (
                  <tr key={ri} className="border-b border-paper-2/60 last:border-0">
                    {row.map((cell, ci) => (
                      <td key={ci} className="py-2.5 px-4 text-slate align-top">
                        {parseInline(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  })
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.publications

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const content = locale === 'en' ? article.en : article.tr
  const readingMin = locale === 'en'
    ? `${article.readingTime} min read`
    : `${article.readingTime} dk okuma`
  const canonicalUrl = `${SITE_URL}/${locale}/yayinlar/${slug}`
  const tr = locale === 'tr'

  const disclaimer =
    locale === 'en'
      ? 'This content is for general informational purposes only and does not constitute legal advice.'
      : 'Bu içerik genel bilgilendirme amaçlıdır; hukuki danışmanlık niteliği taşımaz.'

  const isPendingMigration =
    content.content.includes('taşınmasını beklemektedir') || content.content.includes('awaits migration')
  const migrationNote =
    locale === 'en'
      ? 'This article is pending migration from the original platform. The excerpt below is a placeholder — the full article text should be added here.'
      : 'Bu makale orijinal platformdan buraya taşınmayı beklemektedir. Aşağıdaki metin geçici bir yer tutucudur — makalenin tam metni buraya eklenmelidir.'

  const labels = {
    faqHeading: tr ? 'Sıkça Sorulan Sorular' : 'Frequently Asked Questions',
    relatedHeading: tr ? 'İlgili İçerikler' : 'Related Reading',
    relatedIctihatHeading: tr ? 'İlgili Yargı Kararları' : 'Related Court Decisions',
  }

  const relatedArticles = (article.related?.articles ?? [])
    .map((s) => getArticleBySlug(s))
    .filter((a): a is NonNullable<typeof a> => Boolean(a))
  const relatedIctihat = (article.related?.ictihat ?? [])
    .map((s) => getIctihatBySlug(s))
    .filter((i): i is NonNullable<typeof i> => Boolean(i))

  const blocks = parseBlocks(content.content)

  return (
    <>
      <ReadingProgress />

      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-12" aria-labelledby="article-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading, href: `/${locale}/yayinlar` },
              { label: content.title },
            ]}
            light
          />

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-night-700 bg-night-800 px-3 py-1 text-xs font-medium text-gold-500"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1
            id="article-heading"
            className="mt-5 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content.title}
          </h1>

          <p className="mt-4 text-body text-slate leading-relaxed max-w-2xl">{content.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMin}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl">

          {/* Abstract (if present) */}
          {content.abstract && (
            <div className="mb-10 rounded-sm border border-night-900/10 bg-paper-2 px-7 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
                {locale === 'en' ? 'Abstract' : 'Öz'}
              </p>
              <p className="text-sm text-ink leading-relaxed italic">{content.abstract}</p>
            </div>
          )}

          {/* Migration notice (legacy placeholder articles only) */}
          {isPendingMigration && (
            <div className="mb-10 rounded-sm border-l-4 border-gold-500 bg-paper-2 px-6 py-4">
              <p className="text-sm text-slate leading-relaxed">{migrationNote}</p>
            </div>
          )}

          {/* Content */}
          <div className="prose prose-lg max-w-none" style={{ fontFamily: 'var(--font-sans)' }}>
            {renderBlocks(blocks)}
          </div>

          {/* FAQ */}
          {content.faq && content.faq.length > 0 && (
            <section className="mt-12 border-t border-paper-2 pt-10" aria-labelledby="faq-heading">
              <h2
                id="faq-heading"
                className="mb-6 text-h3 font-semibold text-ink"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {labels.faqHeading}
              </h2>
              <div className="space-y-3">
                {content.faq.map((qa, i) => (
                  <details
                    key={i}
                    className="group rounded-sm border border-paper-2 bg-paper-2/50 px-5 py-4"
                  >
                    <summary className="flex cursor-pointer select-none list-none items-center justify-between gap-4 font-medium text-ink marker:hidden">
                      {qa.question}
                      <svg
                        className="h-4 w-4 flex-shrink-0 text-slate transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="mt-3 text-sm text-slate leading-relaxed">{qa.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* Related content */}
          {(relatedArticles.length > 0 || relatedIctihat.length > 0) && (
            <section className="mt-12 border-t border-paper-2 pt-10">
              {relatedArticles.length > 0 && (
                <div className="mb-8">
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-500">
                    {labels.relatedHeading}
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {relatedArticles.map((a) => {
                      const rc = locale === 'en' ? a.en : a.tr
                      return (
                        <li key={a.slug}>
                          <Link
                            href={`/${locale}/yayinlar/${a.slug}`}
                            className="block rounded-sm border border-paper-2 bg-paper px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
                          >
                            {rc.title}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
              {relatedIctihat.length > 0 && (
                <div>
                  <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-500">
                    {labels.relatedIctihatHeading}
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {relatedIctihat.map((ic) => (
                      <li key={ic.slug}>
                        <Link
                          href={`/${locale}/ictihat/${ic.slug}`}
                          className="block rounded-sm border border-paper-2 bg-paper px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
                        >
                          {ic.konu}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* Legal disclaimer */}
          <aside
            className="mt-14 rounded-sm border border-paper-2 bg-paper-2 px-6 py-5"
            aria-label={locale === 'en' ? 'Legal notice' : 'Yasal uyarı'}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-2">
              {locale === 'en' ? 'Informational Notice' : 'Bilgilendirme Notu'}
            </p>
            <p className="text-sm text-slate leading-relaxed">{disclaimer}</p>
          </aside>

          {/* Author byline */}
          <div className="mt-10 flex items-start gap-5 border-t border-paper-2 pt-8">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-night-900 text-gold-500 text-lg font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}
              aria-hidden="true"
            >
              {article.author.split(' ').filter((p) => !p.startsWith('Av.')).map((p) => p[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{article.author}</p>
              <p className="text-xs text-slate">{article.authorTitle} — {article.authorBar}</p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-12 border-t border-paper-2 pt-8">
            <Link
              href={`/${locale}/yayinlar`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-300 transition-colors"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {locale === 'en' ? 'Back to Publications' : 'Yayınlara Dön'}
            </Link>
          </div>
        </div>
      </article>

      {/* JSON-LD: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: content.title,
            description: content.summary,
            keywords: article.categories.join(', '),
            author: {
              '@type': 'Person',
              name: article.author,
              jobTitle: article.authorTitle,
              memberOf: {
                '@type': 'Organization',
                name: article.authorBar,
              },
            },
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: SITE_URL,
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            url: canonicalUrl,
            inLanguage: locale,
          }),
        }}
      />

      {/* JSON-LD: FAQPage */}
      {content.faq && content.faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: content.faq.map((qa) => ({
                '@type': 'Question',
                name: qa.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: qa.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: tr ? 'Anasayfa' : 'Home',
                item: `${SITE_URL}/${locale}`,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: d.heading,
                item: `${SITE_URL}/${locale}/yayinlar`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: content.title,
              },
            ],
          }),
        }}
      />
    </>
  )
}
