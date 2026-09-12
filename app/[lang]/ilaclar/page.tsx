import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getDrugArticles, getDrugNames } from '@/content/articles'
import { getAllKararlar } from '@/content/kararlar'
import ArticleCard from '@/components/ArticleCard'
import Breadcrumbs from '@/components/Breadcrumbs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const locale = lang as Locale
  const drugList = getDrugNames(locale).join(', ')

  const title = locale === 'en'
    ? `SGK Drug Reimbursement Lawsuit — ${drugList}`
    : `SGK İlaç Davası — ${drugList}`

  const description = locale === 'en'
    ? `Legal guides for SGK reimbursement disputes over each of these targeted cancer drugs: ${drugList}.`
    : `SGK'nın karşılanmasına ilişkin dava süreçleri bakımından ele alınan akıllı kanser ilaçları: ${drugList}. Her ilaç için ayrı hukuki rehber.`

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/ilaclar`,
      languages: {
        tr: `${SITE_URL}/tr/ilaclar`,
        en: `${SITE_URL}/en/ilaclar`,
      },
    },
  }
}

export default async function IlaclarPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const drugArticles = getDrugArticles()
  const drugNames = getDrugNames(locale)
  const kararSayisi = getAllKararlar().length

  const kararlarimizHeading = locale === 'en' ? "Cases We've Won" : 'Kararlarımız'
  const kararlarimizSub =
    locale === 'en'
      ? `Anonymised official court decisions from ${kararSayisi} SGK drug reimbursement cases we've handled and won.`
      : `Takip ettiğimiz ve kazandığımız ${kararSayisi} SGK ilaç davasına ait anonimleştirilmiş resmi mahkeme kararları.`
  const kararlarimizCta = locale === 'en' ? 'View the Decisions' : 'Kararları İncele'

  const heading = locale === 'en' ? 'SGK Drug Reimbursement Lawsuits' : 'SGK İlaç Davası'
  const sub = locale === 'en'
    ? `Legal guides on SGK reimbursement disputes for each of the following targeted cancer drugs: ${drugNames.join(', ')}.`
    : `SGK'nın karşılanmasına ilişkin dava süreçleri bakımından ele alınan akıllı kanser ilaçları: ${drugNames.join(', ')}.`
  const readMoreLabel = dict.publications.readMore
  const byLabel = dict.publications.by

  return (
    <>
      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="ilaclar-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: heading },
            ]}
            light
          />
          <h1
            id="ilaclar-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {heading}
          </h1>
          <p className="mt-4 max-w-2xl text-body text-mist-2 leading-relaxed">{sub}</p>
        </div>
      </section>

      {/* Drug article grid */}
      <section className="bg-paper py-[clamp(4rem,8vw,7rem)] px-6">
        <div className="mx-auto max-w-6xl">
          <ul
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label={locale === 'en' ? 'Drugs' : 'İlaçlar'}
          >
            {drugArticles.map((article) => (
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
        </div>
      </section>

      {/* Kararlarımız — cross-link into the won-cases section */}
      <section className="bg-paper-2 py-[clamp(3rem,6vw,5rem)] px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start gap-6 rounded-sm border border-night-900/10 bg-paper px-8 py-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                className="text-h3 font-semibold text-ink"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {kararlarimizHeading}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-slate leading-relaxed">{kararlarimizSub}</p>
            </div>
            <Link
              href={`/${locale}/kararlarimiz`}
              className="inline-flex flex-shrink-0 items-center gap-2 rounded-sm bg-night-900 px-6 py-3 text-sm font-semibold text-paper transition-colors hover:bg-night-800"
            >
              {kararlarimizCta}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: heading,
            description: sub,
            url: `${SITE_URL}/${locale}/ilaclar`,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: SITE_URL,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: drugArticles.map((article, i) => {
                const content = locale === 'en' ? article.en : article.tr
                return {
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `${SITE_URL}/${locale}/yayinlar/${article.slug}`,
                  name: content.title,
                }
              }),
            },
          }),
        }}
      />
    </>
  )
}
