import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import ContactForm from '@/components/ContactForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import FadeIn from '@/components/FadeIn'
import { site } from '@/lib/site'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: dict.contact.seoTitle,
    description: dict.contact.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/iletisim`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/iletisim',
        en: 'https://www.vgshukuk.com/en/iletisim',
      },
    },
  }
}

export default async function IletisimPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.contact

  return (
    <>
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-20" aria-labelledby="contact-heading">
        <div className="mx-auto max-w-6xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="contact-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
        </div>
      </section>

      <section className="bg-paper-2 py-[clamp(4rem,8vw,7rem)] px-6">
        <div className="mx-auto max-w-6xl grid gap-16 lg:grid-cols-2">
          {/* Contact Info */}
          <FadeIn>
          <div>
            <h2
              className="text-h3 font-semibold text-ink leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {locale === 'en' ? 'Get in Touch' : 'Bize Ulaşın'}
            </h2>
            <p className="mt-3 text-sm text-slate leading-relaxed">
              {locale === 'en'
                ? 'We are here for your legal consultancy and case management needs. Contact us by phone, email, or the form.'
                : 'Hukuki danışmanlık ve iş takibi ihtiyaçlarınız için buradayız. Telefon, e-posta veya form aracılığıyla bizimle iletişime geçebilirsiniz.'}
            </p>

            <dl className="mt-10 flex flex-col gap-6">
              <div className="flex gap-4">
                <dt className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-night-900 text-gold-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <span className="sr-only">{d.address}</span>
                </dt>
                <dd className="text-sm text-ink leading-relaxed">{d.addressValue}</dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-night-900 text-gold-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <span className="sr-only">{d.phone}</span>
                </dt>
                <dd className="flex flex-col gap-1 text-sm">
                  <a href="tel:+903122316975" className="text-ink hover:text-gold-500 transition-colors">+90 312 231 6975</a>
                  <a href="tel:+905396595584" className="text-ink hover:text-gold-500 transition-colors">+90 539 659 5584</a>
                </dd>
              </div>

              <div className="flex gap-4">
                <dt className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-night-900 text-gold-500">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <span className="sr-only">{d.email}</span>
                </dt>
                <dd className="text-sm">
                  <a href={`mailto:${site.email}`} className="text-ink hover:text-gold-500 transition-colors">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>

            {/* Map embed placeholder */}
            <div className="mt-10 overflow-hidden rounded-sm border border-paper/60 bg-paper h-64 flex items-center justify-center">
              <p className="text-sm text-slate text-center px-8">
                {locale === 'en'
                  ? 'Google Maps embed — Strazburg Cad. No: 16/24, Sıhhiye, Çankaya / Ankara'
                  : 'Google Haritalar gömülü içerik — Strazburg Cad. No: 16/24, Sıhhiye, Çankaya / Ankara'}
              </p>
            </div>
          </div>
          </FadeIn>

          {/* Contact Form */}
          <FadeIn delay={100}>
          <div className="rounded-sm bg-paper p-8 shadow-sm">
            <h2
              className="mb-8 text-h3 font-semibold text-ink leading-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {d.formHeading}
            </h2>
            <ContactForm locale={locale} dict={d} />
          </div>
          </FadeIn>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LegalService',
            name: 'VGS Hukuk & Danışmanlık',
            url: 'https://www.vgshukuk.com',
            telephone: ['+903122316975', '+905396595584'],
            email: site.email,
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Strazburg Cad. No: 16/24',
              addressLocality: 'Sıhhiye, Çankaya',
              addressRegion: 'Ankara',
              postalCode: '06430',
              addressCountry: 'TR',
            },
            areaServed: ['TR', 'Dünya geneli'],
            sameAs: ['https://linkedin.com/company/vgshukuk'],
          }),
        }}
      />
    </>
  )
}
