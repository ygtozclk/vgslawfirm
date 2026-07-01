import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAllIctihat, getIctihatBySlug } from '@/content/ictihat'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReadingProgress from '@/components/ReadingProgress'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

export async function generateStaticParams() {
  return getAllIctihat().flatMap((i) =>
    ['tr', 'en'].map((lang) => ({ lang, slug: i.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const ictihat = getIctihatBySlug(slug)
  if (!ictihat) return {}
  const dict = await getDictionary(lang as Locale)
  const d = dict.ictihat
  const canonicalUrl = `${SITE_URL}/${lang}/ictihat/${slug}`
  const description = (ictihat.ozet ?? ictihat.uyusmazlik).slice(0, 160)
  const title = `${ictihat.konu} | ${d.heading} | VGS Hukuk`
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${SITE_URL}/tr/ictihat/${slug}`,
        en: `${SITE_URL}/en/ictihat/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
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

// Parses inline **bold** within a text string and returns a ReactNode array.
function parseInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  const re = /\*\*([^*]+)\*\*/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    parts.push(<strong key={m.index} className="font-semibold">{m[1]}</strong>)
    last = m.index + m[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts.length > 0 ? parts : [text]
}

// Renders a multi-line formatted court-text string to JSX.
// Supports: *italic-only lines*, **bold-only heading lines**, and paragraphs with inline **bold**.
function renderCourtText(text: string): ReactNode[] {
  return text.split('\n').map((raw, i) => {
    const line = raw.trim()
    if (!line) return <div key={i} className="h-3" aria-hidden="true" />

    // *italic note* — entire line wrapped in single asterisks
    if (line.startsWith('*') && !line.startsWith('**') && line.endsWith('*') && line.length > 2) {
      return (
        <p key={i} className="text-sm text-slate italic mb-3">
          {line.slice(1, -1)}
        </p>
      )
    }

    // **BOLD HEADING** — entire line wrapped in double asterisks
    if (line.startsWith('**') && line.endsWith('**') && line.length > 4) {
      const inner = line.slice(2, -2).trim()
      // Confirm no asterisks remain (pure heading, not a paragraph starting with bold)
      if (!inner.includes('**')) {
        return (
          <p
            key={i}
            className="font-semibold text-navy-900 mt-6 mb-1.5 text-sm"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {inner}
          </p>
        )
      }
    }

    // Regular paragraph — may contain inline **bold**
    return (
      <p key={i} className="text-sm leading-loose text-ink mb-2">
        {parseInline(line)}
      </p>
    )
  })
}

export default async function IctihatDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.ictihat

  const ictihat = getIctihatBySlug(slug)
  if (!ictihat) notFound()

  const canonicalUrl = `${SITE_URL}/${locale}/ictihat/${slug}`
  const tr = locale === 'tr'

  const labels = {
    dispute:           tr ? 'Uyuşmazlık'                       : 'Dispute',
    fullText:          tr ? 'Kararın Tam Metni'                : 'Full Decision Text',
    officialLabel:     tr ? 'Resmî karar metni — anonim'       : 'Official decision text — anonymised',
    legalAnalysis:     tr ? 'Hukuki Değerlendirme'             : 'Legal Analysis',
    editorialNote:     tr ? 'Not: Aşağıdaki değerlendirme, karara ilişkin genel hukuki bir yorumdur; mahkemenin kendi ifadeleri değildir.'
                          : "Note: The analysis below reflects general legal commentary on this decision and is not the court's own language.",
    summary:           tr ? 'Kararın Özü'                      : 'Decision Summary',
    source:            tr ? 'Resmî Kaynak'                     : 'Official Source',
    lastChecked:       tr ? 'Son kontrol'                      : 'Last reviewed',
    noticeHeading:     tr ? 'Bilgilendirme Notu'               : 'Informational Notice',
    disclaimer:        tr ? 'Bu içerik genel bilgilendirme amaçlıdır; hukuki danışmanlık niteliği taşımaz. Karar metni anonim resmî kaynaktan alınmıştır. İçtihat ve mevzuat zaman içinde değişebilir.'
                          : 'This content is for general informational purposes only and does not constitute legal advice. The decision text has been taken from an anonymised official source. Case law and legislation may change over time.',
    back:              tr ? 'Yargı Kararlarına Dön'            : 'Back to Court Decisions',
  }

  return (
    <>
      <ReadingProgress />

      {/* ── Hero ── */}
      <section className="bg-navy-900 px-6 pt-32 pb-12" aria-labelledby="ictihat-detail-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading, href: `/${locale}/ictihat` },
              { label: ictihat.konu },
            ]}
            light
          />

          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-gold-500">
            {ictihat.daire}
          </p>

          {ictihat.etiketler.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {ictihat.etiketler.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-navy-700 bg-navy-800 px-3 py-1 text-xs font-medium text-gold-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1
            id="ictihat-detail-heading"
            className="mt-5 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {ictihat.konu}
          </h1>

          {/* Künye */}
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate">
            <span>E. {ictihat.esasNo}</span>
            <span aria-hidden="true">·</span>
            <span>K. {ictihat.kararNo}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={ictihat.kararTarihi}>{formatDate(ictihat.kararTarihi, locale)}</time>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <article className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl space-y-12">

          {/* 1. Uyuşmazlık */}
          <section aria-labelledby="uyusmazlik-heading">
            <h2
              id="uyusmazlik-heading"
              className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-500"
            >
              {labels.dispute}
            </h2>
            <p className="text-body text-ink leading-relaxed">{ictihat.uyusmazlik}</p>
          </section>

          {/* 2. Kararın Tam Metni — open-by-default accordion */}
          {ictihat.kararTamMetni && (
            <section aria-labelledby="tam-metin-heading">
              <details open className="group rounded-sm border border-paper-2 overflow-hidden">
                <summary
                  className="flex cursor-pointer select-none list-none items-center justify-between gap-4 bg-paper-2 px-7 py-4 marker:hidden"
                  aria-controls="tam-metin-body"
                >
                  <div>
                    <h2
                      id="tam-metin-heading"
                      className="text-xs font-semibold uppercase tracking-widest text-navy-900"
                    >
                      {labels.fullText}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate">{labels.officialLabel}</p>
                  </div>
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

                <div
                  id="tam-metin-body"
                  className="bg-paper-2/50 px-7 py-6 font-serif"
                >
                  {renderCourtText(ictihat.kararTamMetni)}
                </div>
              </details>
            </section>
          )}

          {/* 3. Hukuki Değerlendirme — editorial box (only for records that have it) */}
          {ictihat.hukukiDegerlendirme && (
            <section
              aria-labelledby="hukuki-deg-heading"
              className="rounded-sm border border-gold-500/40 bg-paper px-7 py-6"
            >
              <h2
                id="hukuki-deg-heading"
                className="mb-1 text-xs font-semibold uppercase tracking-widest text-gold-500"
              >
                {labels.legalAnalysis}
              </h2>
              <p className="mb-4 text-xs text-slate italic">{labels.editorialNote}</p>
              <p className="text-body text-ink leading-relaxed">{ictihat.hukukiDegerlendirme}</p>
            </section>
          )}

          {/* 4. Kararın Özü / Sonuç — bottom summary box */}
          {ictihat.kararOzu && (
            <section
              aria-labelledby="karar-ozu-heading"
              className="rounded-sm bg-navy-900 px-7 py-7"
            >
              <h2
                id="karar-ozu-heading"
                className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-500"
              >
                {labels.summary}
              </h2>
              <p className="text-body text-paper/90 leading-relaxed">{ictihat.kararOzu}</p>
            </section>
          )}

          {/* Source link */}
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="font-medium text-ink">{labels.source}:</span>
            <a
              href={ictihat.kaynakURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-500 hover:text-gold-300 underline transition-colors"
            >
              mevzuat.adalet.gov.tr
            </a>
            <span className="text-slate">
              ({labels.lastChecked}:{' '}
              {new Date(ictihat.sonKontrol).toLocaleDateString(
                locale === 'en' ? 'en-GB' : 'tr-TR',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )})
            </span>
          </div>

          {/* Legal disclaimer */}
          <aside
            className="rounded-sm border border-paper-2 bg-paper-2 px-6 py-5"
            aria-label={locale === 'en' ? 'Legal notice' : 'Yasal uyarı'}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-2">
              {labels.noticeHeading}
            </p>
            <p className="text-sm text-slate leading-relaxed">{labels.disclaimer}</p>
          </aside>

          {/* Back link */}
          <div className="border-t border-paper-2 pt-8">
            <Link
              href={`/${locale}/ictihat`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-300 transition-colors"
            >
              <svg
                className="h-4 w-4 rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {labels.back}
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
            headline: ictihat.konu,
            description: ictihat.ozet ?? ictihat.uyusmazlik,
            inLanguage: locale,
            datePublished: ictihat.sonKontrol,
            dateModified: ictihat.sonKontrol,
            author: {
              '@type': 'Organization',
              name: 'VGS Hukuk & Danışmanlık',
            },
            publisher: {
              '@type': 'Organization',
              name: 'VGS Hukuk & Danışmanlık',
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/vgs-logo.png`,
              },
            },
            keywords: ictihat.etiketler.join(', '),
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
            citation: `${ictihat.daire}, E. ${ictihat.esasNo}, K. ${ictihat.kararNo}, ${formatDate(ictihat.kararTarihi, 'tr')}`,
            isBasedOn: ictihat.kaynakURL,
          }),
        }}
      />
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
                item: `${SITE_URL}/${locale}/ictihat`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: ictihat.konu,
              },
            ],
          }),
        }}
      />
    </>
  )
}
