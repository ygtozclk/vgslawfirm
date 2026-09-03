import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getDrugArticles, getDrugNames } from '@/content/articles'
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
