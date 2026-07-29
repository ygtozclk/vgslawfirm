import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { team } from '@/content/team'
import AttorneyCard from '@/components/AttorneyCard'
import CTASection from '@/components/CTASection'
import Breadcrumbs from '@/components/Breadcrumbs'
import FadeIn from '@/components/FadeIn'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.team.seoTitle,
    description: dict.team.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/ekibimiz`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/ekibimiz',
        en: 'https://www.vgshukuk.com/en/ekibimiz',
      },
    },
  }
}

export default async function EkibimizPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.team

  return (
    <>
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="team-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="team-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
          <p className="mt-4 text-body text-mist-2">{d.sub}</p>
        </div>
      </section>

      <section className="bg-paper-2 py-[clamp(4rem,8vw,7rem)] px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 max-w-3xl mx-auto">
            {team.map((attorney, i) => (
              <FadeIn key={attorney.id} delay={i * 80}>
                <AttorneyCard
                  attorney={attorney}
                  locale={locale}
                  dict={d}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* JSON-LD for attorneys */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: team.map((attorney, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Person',
                name: attorney.tr.name,
                jobTitle: attorney.tr.title,
                worksFor: {
                  '@type': 'LegalService',
                  name: 'VGS Hukuk & Danışmanlık',
                },
                email: attorney.contact.email,
                telephone: attorney.contact.phone,
                sameAs: attorney.contact.linkedin ? [attorney.contact.linkedin] : undefined,
              },
            })),
          }),
        }}
      />

      <CTASection
        heading={dict.home.ctaHeading}
        subheading={dict.home.ctaSub}
        buttonLabel={dict.home.ctaButton}
        buttonHref={`/${locale}/iletisim`}
      />
    </>
  )
}
