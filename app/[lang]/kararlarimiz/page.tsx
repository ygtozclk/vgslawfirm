import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAllKararlar } from '@/content/kararlar'
import Breadcrumbs from '@/components/Breadcrumbs'
import KararHub from '@/components/KararHub'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  const d = dict.kararlarimiz
  return {
    title: d.seoTitle,
    description: d.seoDescription,
    alternates: {
      canonical: `${SITE_URL}/${lang}/kararlarimiz`,
      languages: {
        tr: `${SITE_URL}/tr/kararlarimiz`,
        en: `${SITE_URL}/en/kararlarimiz`,
      },
    },
    openGraph: {
      type: 'website',
      url: `${SITE_URL}/${lang}/kararlarimiz`,
      title: d.seoTitle,
      description: d.seoDescription,
    },
  }
}

export default async function KararlarimizListPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.kararlarimiz

  const kararlar = getAllKararlar()

  return (
    <>
      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="kararlarimiz-heading">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="kararlarimiz-heading"
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
          <KararHub
            kararlar={kararlar}
            locale={locale}
            readMoreLabel={d.readMore}
            allLabel={d.allDecisions}
          />

          {/* Anonymisation notice */}
          <aside
            className="mt-14 rounded-sm border border-paper-2 bg-paper-2 px-6 py-5"
            aria-label={locale === 'en' ? 'Legal notice' : 'Yasal uyarı'}
          >
            <p className="text-sm text-slate leading-relaxed">{d.anonimNotice}</p>
          </aside>
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
            url: `${SITE_URL}/${locale}/kararlarimiz`,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: SITE_URL,
            },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: kararlar.map((k, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/${locale}/kararlarimiz/${k.slug}`,
                name: k.title,
              })),
            },
          }),
        }}
      />
    </>
  )
}
