import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { articles, getAllCategories } from '@/content/articles'
import { getAllIctihat, getAllIctihatTags } from '@/content/ictihat'
import Breadcrumbs from '@/components/Breadcrumbs'
import ArticlesHub from '@/components/ArticlesHub'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.publications.seoTitle,
    description: dict.publications.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/yayinlar`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/yayinlar',
        en: 'https://www.vgshukuk.com/en/yayinlar',
      },
    },
  }
}

export default async function YayinlarPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.publications

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  const sortedIctihat = getAllIctihat() // already sorted by kararTarihi desc
  const categories = Array.from(new Set([...getAllCategories(), ...getAllIctihatTags()]))

  const searchPlaceholder = locale === 'en' ? 'Search articles…' : 'Makale ara…'
  const noResultsLabel = locale === 'en' ? 'No articles found for this search.' : 'Bu arama için makale bulunamadı.'
  const allLabel = locale === 'en' ? 'All Topics' : 'Tüm Konular'

  return (
    <>
      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="pub-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="pub-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-body text-mist-2 leading-relaxed">{d.sub}</p>
        </div>
      </section>

      {/* Hub — topic chips + search + grid */}
      <section className="bg-paper py-[clamp(4rem,8vw,7rem)] px-6">
        <div className="mx-auto max-w-6xl">
          <ArticlesHub
            articles={sortedArticles}
            categories={categories}
            locale={locale}
            readMoreLabel={d.readMore}
            byLabel={d.by}
            searchPlaceholder={searchPlaceholder}
            noResultsLabel={noResultsLabel}
            allLabel={allLabel}
            ictihatlar={sortedIctihat}
            relatedDecisionsLabel={dict.ictihat.relatedDecisions}
            allDecisionsLabel={dict.ictihat.allDecisions}
            ictihatReadMoreLabel={dict.ictihat.readMore}
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
            url: `https://www.vgshukuk.com/${locale}/yayinlar`,
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
