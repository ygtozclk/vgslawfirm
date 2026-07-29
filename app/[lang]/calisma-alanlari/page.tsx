import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { practiceAreas } from '@/content/practice-areas'
import PracticeAreaCard from '@/components/PracticeAreaCard'
import SectionHeader from '@/components/SectionHeader'
import CTASection from '@/components/CTASection'
import Breadcrumbs from '@/components/Breadcrumbs'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.practiceAreas.seoTitle,
    description: dict.practiceAreas.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/calisma-alanlari`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/calisma-alanlari',
        en: 'https://www.vgshukuk.com/en/calisma-alanlari',
      },
    },
  }
}

export default async function CalısmaAlanlariPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.practiceAreas

  return (
    <>
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="pa-heading">
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="pa-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-body text-mist-2">{d.sub}</p>
        </div>
      </section>

      <section className="bg-night-800 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((area) => (
              <PracticeAreaCard
                key={area.slug}
                area={area}
                locale={locale}
                learnMoreLabel={d.learnMore}
              />
            ))}
          </div>
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
