import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAllIctihat, getAllIctihatTags } from '@/content/ictihat'
import Breadcrumbs from '@/components/Breadcrumbs'
import IctihatHub from '@/components/IctihatHub'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.ictihat.seoTitle,
    description: dict.ictihat.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/ictihat`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/ictihat',
        en: 'https://www.vgshukuk.com/en/ictihat',
      },
    },
    openGraph: {
      type: 'website',
      url: `https://www.vgshukuk.com/${lang}/ictihat`,
      title: dict.ictihat.seoTitle,
      description: dict.ictihat.seoDescription,
    },
  }
}

export default async function IctihatListPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.ictihat

  const sorted = getAllIctihat() // already sorted by kararTarihi desc
  const allTags = getAllIctihatTags()

  const searchPlaceholder = locale === 'en' ? 'Search decisions…' : 'Karar ara…'
  const noResultsLabel =
    locale === 'en'
      ? 'No decisions found for this search.'
      : 'Bu arama için karar bulunamadı.'
  const allLabel = locale === 'en' ? 'All Topics' : 'Tüm Konular'

  return (
    <>
      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="ictihat-heading">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="ictihat-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-body text-mist-2 leading-relaxed">{d.sub}</p>
        </div>
      </section>

      {/* Hub */}
      <section className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-7xl">
          <IctihatHub
            ictihatlar={sorted}
            allTags={allTags}
            locale={locale}
            readMoreLabel={d.readMore}
            searchPlaceholder={searchPlaceholder}
            noResultsLabel={noResultsLabel}
            allLabel={allLabel}
          />
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: d.heading,
            description: d.seoDescription,
            url: `https://www.vgshukuk.com/${locale}/ictihat`,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: 'https://www.vgshukuk.com',
            },
          }),
        }}
      />
    </>
  )
}
