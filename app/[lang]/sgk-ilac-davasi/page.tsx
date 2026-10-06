import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { getAllKararlar } from '@/content/kararlar'
import { getAllIctihat } from '@/content/ictihat'
import { getDrugLinks } from '@/content/drugs'
import { pillarFaq, pillarIntro, pillarNote, pillarSections } from '@/content/sgk-ilac-davasi'
import Breadcrumbs from '@/components/Breadcrumbs'
import DrugLinkList from '@/components/DrugLinkList'
import KararCard from '@/components/KararCard'
import IctihatCard from '@/components/IctihatCard'
import CTASection from '@/components/CTASection'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.vgshukuk.com'

function getCopy(locale: Locale) {
  return locale === 'en'
    ? {
        seoTitle: 'SGK Drug Lawsuit — Recovering Cancer Drug Costs From SGK | VGS Hukuk',
        seoDescription:
          'SGK drug lawsuits for targeted cancer drugs not covered by SGK: litigation and interim injunction before administrative and labour courts, required documents, time limits and decisions from our cases.',
        heading: 'SGK Drug Lawsuit',
        sub: 'We handle lawsuits and interim injunction proceedings before administrative and labour courts to have targeted cancer drugs covered by SGK.',
        drugsHeading: 'Drugs We Litigate For',
        kararlarHeading: 'Decisions From Cases We Handle',
        ictihatHeading: 'Related Court of Cassation Decisions',
        allKararlar: 'All Decisions',
        allIctihat: 'All Court Decisions',
        faqHeading: 'Frequently Asked Questions',
      }
    : {
        seoTitle: "SGK İlaç Davası — Kanser İlacı Bedelinin SGK'dan Alınması | VGS Hukuk",
        seoDescription:
          "SGK'nın karşılamadığı akıllı kanser ilaçları için SGK ilaç davası: idare ve iş mahkemelerinde dava ve ihtiyati tedbir süreci, gerekli belgeler, süreler ve takip ettiğimiz davalardan kararlar.",
        heading: 'SGK İlaç Davası',
        sub: 'Akıllı kanser ilaçlarının SGK tarafından karşılanması için idare ve iş mahkemelerinde dava ve ihtiyati tedbir süreçlerini takip ediyoruz.',
        drugsHeading: 'Dava Takip Ettiğimiz İlaçlar',
        kararlarHeading: 'Takip Ettiğimiz Davalardan Kararlar',
        ictihatHeading: 'İlgili Yargıtay Kararları',
        allKararlar: 'Tüm Kararlar',
        allIctihat: 'Tüm Yargı Kararları',
        faqHeading: 'Sıkça Sorulan Sorular',
      }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const c = getCopy(lang as Locale)
  const url = `${SITE_URL}/${lang}/sgk-ilac-davasi`
  return {
    title: { absolute: c.seoTitle },
    description: c.seoDescription,
    alternates: {
      canonical: url,
      languages: {
        tr: `${SITE_URL}/tr/sgk-ilac-davasi`,
        en: `${SITE_URL}/en/sgk-ilac-davasi`,
      },
    },
    openGraph: {
      type: 'article',
      url,
      title: c.seoTitle,
      description: c.seoDescription,
    },
    twitter: {
      card: 'summary',
      title: c.seoTitle,
      description: c.seoDescription,
    },
  }
}

// **bold** -> <strong>
function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  )
}

// Renders the minimal markup used in content/sgk-ilac-davasi.ts: blank-line
// separated blocks; "1. " lines -> <ol>, "- " lines -> <ul>, else <p>.
function RichText({ text }: { text: string }) {
  const blocks = text
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean)
  return (
    <>
      {blocks.map((block, i) => {
        const lines = block.split('\n').map((l) => l.trim())
        if (lines.every((l) => /^\d+\.\s/.test(l))) {
          return (
            <ol key={i} className="mt-4 list-decimal space-y-3 pl-6 text-body text-slate leading-relaxed marker:font-semibold marker:text-gold-500">
              {lines.map((l, j) => (
                <li key={j}>
                  <Inline text={l.replace(/^\d+\.\s+/, '')} />
                </li>
              ))}
            </ol>
          )
        }
        if (lines.every((l) => l.startsWith('- '))) {
          return (
            <ul key={i} className="mt-4 list-disc space-y-2 pl-6 text-body text-slate leading-relaxed marker:text-gold-500">
              {lines.map((l, j) => (
                <li key={j}>
                  <Inline text={l.slice(2)} />
                </li>
              ))}
            </ul>
          )
        }
        return (
          <p key={i} className="mt-4 text-body text-slate leading-relaxed whitespace-pre-line">
            <Inline text={block} />
          </p>
        )
      })}
    </>
  )
}

function SeeAllLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-500 transition-colors hover:text-gold-300"
    >
      {label}
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  )
}

export default async function SgkIlacDavasiPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const c = getCopy(locale)
  const url = `${SITE_URL}/${locale}/sgk-ilac-davasi`

  const sections = pillarSections.filter((s) => s.body[locale].trim())
  const faq = pillarFaq.filter((f) => f.question[locale].trim() && f.answer[locale].trim())
  const drugLinks = getDrugLinks(locale)
  const recentKararlar = getAllKararlar().slice(0, 6)
  const ictihat = getAllIctihat().slice(0, 6)

  return (
    <>
      {/* Hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="pillar-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: c.heading },
            ]}
            light
          />
          <h1
            id="pillar-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {c.heading}
          </h1>
          <p className="mt-4 max-w-3xl text-body text-mist-2 leading-relaxed">{pillarIntro[locale] || c.sub}</p>
        </div>
      </section>

      {/* Static copy sections */}
      {sections.length > 0 && (
        <section className="bg-paper px-6 py-[clamp(4rem,8vw,7rem)]">
          <div className="mx-auto max-w-4xl space-y-14">
            {sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`}>
                <h2
                  id={`${s.id}-heading`}
                  className="text-h2 font-semibold text-ink leading-tight"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {s.heading[locale]}
                </h2>
                <RichText text={s.body[locale]} />
              </section>
            ))}
          </div>
        </section>
      )}

      {/* Drugs */}
      <section className="bg-paper-2 px-6 py-[clamp(4rem,8vw,7rem)]" aria-labelledby="pillar-drugs-heading">
        <div className="mx-auto max-w-6xl">
          <h2
            id="pillar-drugs-heading"
            className="mb-8 text-h2 font-semibold text-ink leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {c.drugsHeading}
          </h2>
          <DrugLinkList drugs={drugLinks} locale={locale} />
        </div>
      </section>

      {/* Recent kararlar */}
      {recentKararlar.length > 0 && (
        <section className="bg-paper px-6 py-[clamp(4rem,8vw,7rem)]" aria-labelledby="pillar-kararlar-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2
                id="pillar-kararlar-heading"
                className="text-h2 font-semibold text-ink leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.kararlarHeading}
              </h2>
              <SeeAllLink href={`/${locale}/kararlarimiz`} label={c.allKararlar} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recentKararlar.map((k) => (
                <KararCard key={k.slug} karar={k} locale={locale} readMoreLabel={dict.kararlarimiz.readMore} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Yargıtay kararları */}
      {ictihat.length > 0 && (
        <section className="bg-paper-2 px-6 py-[clamp(4rem,8vw,7rem)]" aria-labelledby="pillar-ictihat-heading">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <h2
                id="pillar-ictihat-heading"
                className="text-h2 font-semibold text-ink leading-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {c.ictihatHeading}
              </h2>
              <SeeAllLink href={`/${locale}/ictihat`} label={c.allIctihat} />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {ictihat.map((item) => (
                <IctihatCard key={item.slug} ictihat={item} locale={locale} readMoreLabel={dict.ictihat.readMore} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {faq.length > 0 && (
        <section className="bg-paper px-6 py-[clamp(4rem,8vw,7rem)]" aria-labelledby="pillar-faq-heading">
          <div className="mx-auto max-w-4xl">
            <h2
              id="pillar-faq-heading"
              className="mb-8 text-h2 font-semibold text-ink leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {c.faqHeading}
            </h2>
            <div className="divide-y divide-paper-2 border-y border-paper-2">
              {faq.map((f, i) => (
                <details key={i} className="group py-5">
                  <summary className="cursor-pointer list-none text-lg font-semibold text-ink group-open:text-gold-500">
                    {f.question[locale]}
                  </summary>
                  <RichText text={f.answer[locale]} />
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {pillarNote[locale] && (
        <section className="bg-paper px-6 pb-[clamp(3rem,6vw,5rem)]">
          <aside
            className="mx-auto max-w-4xl rounded-sm border border-paper-2 bg-paper-2 px-6 py-5"
            aria-label={locale === 'en' ? 'Legal notice' : 'Yasal uyarı'}
          >
            <p className="text-sm text-slate leading-relaxed">{pillarNote[locale]}</p>
          </aside>
        </section>
      )}

      <CTASection
        heading={dict.home.ctaHeading}
        subheading={dict.home.ctaSub}
        buttonLabel={dict.home.ctaButton}
        buttonHref={`/${locale}/iletisim`}
      />

      {/* JSON-LD: WebPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: c.seoTitle,
            description: c.seoDescription,
            url,
            inLanguage: locale,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: SITE_URL,
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: dict.breadcrumbs.home, item: `${SITE_URL}/${locale}` },
              { '@type': 'ListItem', position: 2, name: c.heading, item: url },
            ],
          }),
        }}
      />
      {/* JSON-LD: FAQPage — only once FAQ items exist */}
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faq.map((f) => ({
                '@type': 'Question',
                name: f.question[locale],
                acceptedAnswer: { '@type': 'Answer', text: f.answer[locale] },
              })),
            }),
          }}
        />
      )}
    </>
  )
}
