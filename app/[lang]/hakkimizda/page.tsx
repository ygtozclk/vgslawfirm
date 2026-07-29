import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import SectionHeader from '@/components/SectionHeader'
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
    title: dict.about.seoTitle,
    description: dict.about.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/hakkimizda`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/hakkimizda',
        en: 'https://www.vgshukuk.com/en/hakkimizda',
      },
    },
  }
}

const values = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    keyTr: 'visionHeading' as const,
    bodyKey: 'vision' as const,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    keyTr: 'missionHeading' as const,
    bodyKey: 'mission' as const,
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    keyTr: 'readyHeading' as const,
    bodyKey: 'ready' as const,
  },
]

export default async function HakkimizdaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.about

  return (
    <>
      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="about-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="about-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
          <p className="mt-6 max-w-2xl text-body text-mist-2 leading-relaxed">
            {d.intro}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-paper-2 py-[clamp(4rem,8vw,7rem)] px-6" aria-labelledby="values-heading">
        <div className="mx-auto max-w-6xl">
          <h2 id="values-heading" className="sr-only">
            {locale === 'en' ? 'Our Values' : 'Değerlerimiz'}
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {values.map(({ icon, keyTr, bodyKey }, i) => (
              <FadeIn key={keyTr} delay={i * 80}>
                <article className="rounded-sm bg-paper p-8 shadow-sm border-t-2 border-gold-500/30 hover:border-gold-500/70 transition-colors">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-sm bg-night-900 text-gold-500">
                    {icon}
                  </div>
                  <h3
                    className="text-h3 font-semibold text-ink leading-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {d[keyTr]}
                  </h3>
                  <p className="mt-3 text-sm text-slate leading-relaxed">{d[bodyKey]}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Detail section */}
      <section className="bg-paper py-[clamp(4rem,8vw,7rem)] px-6">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="flex gap-8 items-start">
              <div className="hidden md:block h-24 w-0.5 bg-gold-500 flex-shrink-0 mt-1" aria-hidden="true" />
              <div>
                <SectionHeader heading={d.readyHeading} />
                <p className="mt-5 text-body text-slate leading-relaxed">{d.ready}</p>
              </div>
            </div>
          </FadeIn>
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
