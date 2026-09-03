import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { practiceAreas } from '@/content/practice-areas'
import { getAllIctihat } from '@/content/ictihat'
import { getDrugNames } from '@/content/articles'
import PracticeAreaCard from '@/components/PracticeAreaCard'
import IctihatCard from '@/components/IctihatCard'
import PullQuote from '@/components/PullQuote'
import SectionHeader from '@/components/SectionHeader'
import CTASection from '@/components/CTASection'
import FadeIn from '@/components/FadeIn'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const locale = lang as Locale
  const dict = await getDictionary(locale)

  // Drug names are pulled live from content/articles.ts (via drugName) so the
  // homepage title/description pick up every published drug article — and
  // only those — without ever needing a manual edit here.
  const drugNames = getDrugNames(locale)
  const drugList = drugNames.join(', ')

  const title = locale === 'en'
    ? `${dict.meta.siteTitle} | SGK Drug Reimbursement Lawsuit — ${drugList}`
    : `${dict.meta.siteTitle} | SGK İlaç Davası — ${drugList}`

  const description = locale === 'en'
    ? `Legal counsel for SGK reimbursement disputes over targeted cancer drugs including ${drugList}.`
    : `SGK tarafından karşılanmasına ilişkin dava süreçlerinde ele alınan akıllı kanser ilaçları: ${drugList}. ${dict.meta.siteTitle}.`

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr',
        en: 'https://www.vgshukuk.com/en',
      },
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.home
  const recentIctihat = getAllIctihat().slice(0, 3)

  const areaLabels = practiceAreas.map((a) =>
    locale === 'en' ? a.en.title : a.tr.title
  )

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="hero-premium relative isolate flex items-center px-6"
        style={{ minHeight: '90vh', paddingTop: 'clamp(6rem, 12vw, 11rem)' }}
        aria-labelledby="hero-heading"
      >
        {/* Dikey çizgiler */}
        <div className="hero-lines pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* Film grain */}
        <div className="hero-grain pointer-events-none absolute inset-0 opacity-[0.04]" aria-hidden="true" />

        {/* İçerik */}
        <div className="relative mx-auto w-full max-w-6xl py-16 md:py-20">
          <div className="max-w-[880px]">
            {/* Eyebrow */}
            <p
              className="mb-[1.6rem] text-[13px] font-semibold uppercase text-gold-500"
              style={{ letterSpacing: '0.2em' }}
            >
              {d.heroEyebrow}
            </p>

            {/* H1 */}
            <h1
              id="hero-heading"
              className="font-semibold text-paper"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: 'clamp(2.8rem, 6vw, 5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
            >
              {d.heroHeading}
            </h1>

            {/* Altın hairline */}
            <div className="mt-8 h-[2px] w-14 bg-gold-500" aria-hidden="true" />

            {/* Alt metin */}
            <p
              className="mt-[1.4rem] leading-relaxed text-mist-2"
              style={{ fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)', maxWidth: '52ch' }}
            >
              {d.heroSub}
            </p>

            {/* Butonlar */}
            <div className="mt-[1.8rem] flex flex-wrap gap-4">
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2 rounded-sm bg-gold-500 px-[1.6rem] py-[0.9rem] text-[15px] font-semibold text-night-900 transition-colors duration-200 hover:bg-gold-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              >
                {d.heroCta}
              </Link>
              <Link
                href={`/${locale}/calisma-alanlari`}
                className="inline-flex items-center gap-2 rounded-sm border border-gold-500/40 px-[1.6rem] py-[0.9rem] text-[15px] font-semibold text-gold-300 transition-colors duration-200 hover:border-gold-500/80 hover:text-gold-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500"
              >
                {d.heroCtaSecondary}
              </Link>
            </div>

            {/* Çalışma alanı etiketleri */}
            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-paper/10 pt-6">
              {areaLabels.map((label, i) => (
                <span key={label} className="flex items-center gap-3">
                  <span className="text-[11px] uppercase tracking-wider text-mist-2">
                    {label}
                  </span>
                  {i < areaLabels.length - 1 && (
                    <span className="text-gold-500/50" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tanıtım ── */}
      <section
        className="bg-paper px-6 py-[clamp(4rem,8vw,7rem)]"
        aria-label={d.introHeading}
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="grid gap-14 md:grid-cols-2 md:items-start">
              <SectionHeader
                id="intro-heading"
                heading={d.introHeading}
                align="left"
              />
              <p className="max-w-[68ch] text-body text-slate leading-relaxed">
                {d.introParagraph}
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Çalışma Alanları ── */}
      <section
        className="bg-night-900 px-6 py-[clamp(4rem,8vw,7rem)]"
        aria-labelledby="practice-areas-heading"
      >
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="mb-12">
              <SectionHeader
                id="practice-areas-heading"
                heading={d.practiceAreasHeading}
                subheading={d.practiceAreasSub}
                light
                align="left"
              />
            </div>
          </FadeIn>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {practiceAreas.map((area, i) => (
              <FadeIn key={area.slug} delay={i * 80}>
                <PracticeAreaCard
                  area={area}
                  locale={locale}
                  learnMoreLabel={dict.practiceAreas.learnMore}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Güncel Yargı Kararları ── */}
      {recentIctihat.length > 0 && (
        <section
          className="bg-paper px-6 py-[clamp(4rem,8vw,7rem)]"
          aria-labelledby="recent-decisions-heading"
        >
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
                <h2
                  id="recent-decisions-heading"
                  className="text-h2 font-semibold text-ink leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {d.recentDecisionsHeading}
                </h2>
                <Link
                  href={`/${locale}/ictihat`}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-500 transition-colors hover:text-gold-300"
                >
                  {dict.ictihat.allDecisions}
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </FadeIn>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentIctihat.map((ictihat, i) => (
                <FadeIn key={ictihat.slug} delay={i * 80}>
                  <IctihatCard
                    ictihat={ictihat}
                    locale={locale}
                    readMoreLabel={dict.ictihat.readMore}
                  />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Alıntı ── */}
      <PullQuote
        quote={d.quoteText}
        author={d.quoteAuthor}
        year={d.quoteYear}
      />

      {/* ── İletişim CTA ── */}
      <CTASection
        heading={d.ctaHeading}
        subheading={d.ctaSub}
        buttonLabel={d.ctaButton}
        buttonHref={`/${locale}/iletisim`}
      />
    </>
  )
}
