import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { practiceAreas } from '@/content/practice-areas'
import CTASection from '@/components/CTASection'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateStaticParams() {
  return practiceAreas.map((area) => ({ area: area.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; area: string }>
}): Promise<Metadata> {
  const { lang, area: areaSlug } = await params
  if (!hasLocale(lang)) return {}
  const locale = lang as Locale
  const area = practiceAreas.find((a) => a.slug === areaSlug)
  if (!area) return {}
  const content = locale === 'en' ? area.en : area.tr
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/calisma-alanlari/${areaSlug}`,
      languages: {
        tr: `https://www.vgshukuk.com/tr/calisma-alanlari/${areaSlug}`,
        en: `https://www.vgshukuk.com/en/calisma-alanlari/${areaSlug}`,
      },
    },
  }
}

export default async function PracticeAreaDetailPage({
  params,
}: {
  params: Promise<{ lang: string; area: string }>
}) {
  const { lang, area: areaSlug } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  const area = practiceAreas.find((a) => a.slug === areaSlug)
  if (!area) notFound()

  const content = locale === 'en' ? area.en : area.tr
  const otherAreas = practiceAreas.filter((a) => a.slug !== areaSlug)

  return (
    <>
      {/* Hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="area-heading">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: dict.practiceAreas.heading, href: `/${locale}/calisma-alanlari` },
              { label: content.title },
            ]}
            light
          />
          <div className="mt-6 flex items-center gap-4">
            <span
              className="text-sm font-semibold text-gold-500 uppercase tracking-widest"
              aria-hidden="true"
            >
              {area.number}
            </span>
            <span className="h-px w-8 bg-gold-500" aria-hidden="true" />
          </div>
          <h1
            id="area-heading"
            className="mt-3 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-paper py-20 px-6">
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="h-0.5 w-12 bg-gold-500 mb-8" aria-hidden="true" />
            <p className="text-body text-ink leading-relaxed text-lg">{content.fullDesc}</p>

            {/* JSON-LD structured data */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'LegalService',
                  name: 'VGS Hukuk & Danışmanlık',
                  serviceType: content.title,
                  description: content.fullDesc,
                  provider: {
                    '@type': 'LegalService',
                    name: 'VGS Hukuk & Danışmanlık',
                    address: {
                      '@type': 'PostalAddress',
                      streetAddress: 'Strazburg Cad. No: 16/17',
                      addressLocality: 'Sıhhiye, Çankaya',
                      addressRegion: 'Ankara',
                      postalCode: '06430',
                      addressCountry: 'TR',
                    },
                    telephone: '+905327692084',
                    url: 'https://www.vgshukuk.com',
                    sameAs: ['https://linkedin.com/company/vgshukuk'],
                  },
                }),
              }}
            />
          </div>

          {/* Sidebar — other areas */}
          <aside aria-label={locale === 'en' ? 'Other practice areas' : 'Diğer çalışma alanları'}>
            <h2
              className="mb-6 text-xs font-semibold uppercase tracking-widest text-slate"
            >
              {locale === 'en' ? 'Other Practice Areas' : 'Diğer Çalışma Alanları'}
            </h2>
            <ul className="flex flex-col gap-2">
              {otherAreas.map((other) => {
                const otherContent = locale === 'en' ? other.en : other.tr
                return (
                  <li key={other.slug}>
                    <Link
                      href={`/${locale}/calisma-alanlari/${other.slug}`}
                      className="group flex items-center gap-3 rounded-sm border border-paper-2 bg-paper-2 px-4 py-3 text-sm transition-all hover:border-gold-500 hover:bg-paper"
                    >
                      <span className="text-xs font-semibold text-gold-500">{other.number}</span>
                      <span className="text-ink group-hover:text-gold-500 transition-colors">{otherContent.title}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </aside>
        </div>
      </section>

      <CTASection
        heading={dict.home.ctaHeading}
        subheading={dict.home.ctaSub}
        buttonLabel={dict.home.ctaButton}
        buttonHref={`/${locale}/iletisim`}
      />
    </>
  )
}
