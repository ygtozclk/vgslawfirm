import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAllKararlar, getKararBySlug } from '@/content/kararlar'
import { getArticleForDrug } from '@/content/articles'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReadingProgress from '@/components/ReadingProgress'
import KararBody from '@/components/KararBody'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

export async function generateStaticParams() {
  return getAllKararlar().flatMap((k) =>
    ['tr', 'en'].map((lang) => ({ lang, slug: k.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const karar = getKararBySlug(slug)
  if (!karar) return {}
  const canonicalUrl = `${SITE_URL}/${lang}/kararlarimiz/${slug}`
  return {
    title: { absolute: `${karar.title} | VGS Hukuk` },
    description: karar.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        tr: `${SITE_URL}/tr/kararlarimiz/${slug}`,
        en: `${SITE_URL}/en/kararlarimiz/${slug}`,
      },
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title: karar.title,
      description: karar.description,
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

export default async function KararDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.kararlarimiz

  const karar = getKararBySlug(slug)
  if (!karar) notFound()

  const canonicalUrl = `${SITE_URL}/${locale}/kararlarimiz/${slug}`
  const tr = locale === 'tr'

  const relatedArticle = getArticleForDrug(karar.ilacAdi, karar.etkenMadde)
  const relatedArticleContent = relatedArticle
    ? locale === 'en'
      ? relatedArticle.en
      : relatedArticle.tr
    : undefined

  const labels = {
    back: tr ? 'Emsal Kararlara Dön' : 'Back to Precedent Decisions',
    relatedArticleHeading: tr ? 'İlgili Hukuki Rehber' : 'Related Legal Guide',
    ilaclarHubLabel: tr ? 'Tüm SGK İlaç Davaları Rehberini İncele' : 'Browse All SGK Drug Litigation Guides',
    noticeHeading: tr ? 'Bilgilendirme Notu' : 'Informational Notice',
    disclaimer: tr
      ? 'Bu içerik genel bilgilendirme amaçlıdır; hukuki danışmanlık niteliği taşımaz. Karar metni anonim resmî bir mahkeme kararından alınmıştır.'
      : 'This content is for general informational purposes only and does not constitute legal advice. The decision text has been taken from an anonymised official court decision.',
  }

  return (
    <>
      <ReadingProgress />

      {/* Hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-12" aria-labelledby="karar-detail-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading, href: `/${locale}/kararlarimiz` },
              { label: karar.title },
            ]}
            light
          />

          <div className="mt-6 flex flex-wrap gap-2">
            {karar.ilacAdi && (
              <span className="rounded-full bg-gold-500 px-3 py-1 text-xs font-semibold text-night-900">
                {karar.ilacAdi}
              </span>
            )}
            {karar.mahkemeTuru && (
              <span className="rounded-full border border-night-700 bg-night-800 px-3 py-1 text-xs font-medium text-gold-500">
                {karar.mahkemeTuru}
              </span>
            )}
          </div>

          <h1
            id="karar-detail-heading"
            className="mt-5 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {karar.title}
          </h1>

          <p className="mt-4 max-w-2xl text-body text-slate leading-relaxed">{karar.description}</p>

          {karar.kararTarihi && (
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate">
              <time dateTime={karar.kararTarihi}>{formatDate(karar.kararTarihi, locale)}</time>
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <article className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Anonymisation notice — kept visible per source disclosure requirement */}
          <aside
            className="rounded-sm border-l-4 border-gold-500 bg-paper-2 px-6 py-4"
            aria-label={locale === 'en' ? 'Anonymisation notice' : 'Anonimleştirme notu'}
          >
            <p className="text-sm text-slate leading-relaxed">
              {karar.anonimNotu || d.anonimNotice}
            </p>
          </aside>

          <KararBody body={karar.body} mahkemeTuru={karar.mahkemeTuru} />

          {/* Related legal guide — links to the matching drug article when one
              exists, otherwise to the /ilaclar hub */}
          <section aria-labelledby="related-article-heading">
            <h2
              id="related-article-heading"
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-gold-500"
            >
              {labels.relatedArticleHeading}
            </h2>
            {relatedArticle && relatedArticleContent ? (
              <Link
                href={`/${locale}/yayinlar/${relatedArticle.slug}`}
                className="block rounded-sm border border-paper-2 bg-paper px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                {relatedArticleContent.title}
              </Link>
            ) : (
              <Link
                href={`/${locale}/ilaclar`}
                className="block rounded-sm border border-paper-2 bg-paper px-5 py-4 text-sm font-medium text-ink transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                {labels.ilaclarHubLabel}
              </Link>
            )}
          </section>

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
              href={`/${locale}/kararlarimiz`}
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

      {/* JSON-LD: LegalCase-flavoured Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: karar.title,
            description: karar.description,
            about: karar.ilacAdi || undefined,
            inLanguage: 'tr',
            datePublished: karar.kararTarihi,
            dateModified: karar.kararTarihi,
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
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': canonicalUrl,
            },
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
                item: `${SITE_URL}/${locale}/kararlarimiz`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: karar.title,
              },
            ],
          }),
        }}
      />
    </>
  )
}
