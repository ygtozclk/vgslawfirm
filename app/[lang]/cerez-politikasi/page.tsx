import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
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
    title: dict.cookies.seoTitle,
    description: dict.cookies.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/cerez-politikasi`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/cerez-politikasi',
        en: 'https://www.vgshukuk.com/en/cerez-politikasi',
      },
    },
  }
}

const sections = [
  {
    key: 'whatAreCookies' as const,
    contentTr: 'Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınız aracılığıyla cihazınıza yerleştirilen küçük metin dosyalarıdır. Çerezler, web sitesinin sizi bir sonraki ziyaretinizde hatırlamasına ve işlevselliği iyileştirmesine yardımcı olur.',
    contentEn: 'Cookies are small text files placed on your device through your browser when you visit a website. Cookies help the website remember you on your next visit and improve its functionality.',
  },
  {
    key: 'typesUsed' as const,
    contentTr: 'Bu web sitesinde kullandığımız çerez türleri hakkında bilgi aşağıda verilmektedir.',
    contentEn: 'Information about the types of cookies used on this website is provided below.',
    placeholder: {
      tr: '[Zorunlu çerezler, analitik çerezler, işlevsellik çerezleri ve varsa pazarlama çerezleri tablolar halinde listeleyin: isim, amaç, saklama süresi.]',
      en: '[List essential cookies, analytics cookies, functionality cookies and any marketing cookies in tables: name, purpose, retention period.]',
    },
  },
  {
    key: 'thirdParty' as const,
    contentTr: 'Web sitemiz üçüncü taraf çerezler kullanabilir.',
    contentEn: 'Our website may use third-party cookies.',
    placeholder: {
      tr: '[Kullanılan üçüncü taraf hizmetler (Google Analytics, vb.) ve bunlara ait çerez politikaları belirtilmelidir.]',
      en: '[Third-party services used (Google Analytics, etc.) and their cookie policies must be listed.]',
    },
  },
  {
    key: 'management' as const,
    contentTr: 'Tarayıcı ayarlarınızdan çerezleri reddedebilir veya silebilirsiniz. Ancak bu işlem web sitemizin bazı özelliklerinin çalışmamasına yol açabilir.',
    contentEn: 'You can reject or delete cookies through your browser settings. However, this may prevent some features of our website from working.',
    placeholder: {
      tr: '[Büyük tarayıcılar için çerez yönetim talimatları eklenmelidir.]',
      en: '[Cookie management instructions for major browsers should be added.]',
    },
  },
  {
    key: 'contact' as const,
    contentTr: 'Çerez politikamız hakkında sorularınız için bizimle iletişime geçebilirsiniz.',
    contentEn: 'For questions about our cookie policy, please contact us.',
    placeholder: {
      tr: '[İletişim adresi ve e-posta bilgisi eklenmelidir.]',
      en: '[Contact address and email must be added.]',
    },
  },
]

export default async function CerezPolitikasiPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.cookies

  return (
    <>
      <section className="bg-navy-900 px-6 pt-32 pb-20" aria-labelledby="cookie-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="cookie-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 rounded-sm border-l-4 border-gold-500 bg-paper-2 px-6 py-4">
            <p className="text-sm font-semibold text-ink">⚠ {d.draftNotice}</p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map(({ key, contentTr, contentEn, placeholder }) => {
              const sectionTitle = d.sections[key]
              const body = locale === 'en' ? contentEn : contentTr
              const ph = placeholder ? (locale === 'en' ? placeholder.en : placeholder.tr) : null

              return (
                <section key={key} aria-labelledby={`cookie-${key}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="h-0.5 w-8 bg-gold-500" aria-hidden="true" />
                    <h2
                      id={`cookie-${key}`}
                      className="text-h3 font-semibold text-ink"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {sectionTitle}
                    </h2>
                  </div>
                  <div className="ml-12">
                    <p className="text-sm text-ink leading-relaxed">{body}</p>
                    {ph && (
                      <div className="mt-3 rounded-sm border border-dashed border-gold-500/40 bg-paper-2 px-4 py-3">
                        <p className="text-xs text-slate italic">{ph}</p>
                      </div>
                    )}
                  </div>
                </section>
              )
            })}
          </div>

          <p className="mt-12 text-xs text-slate">
            {locale === 'en'
              ? 'Last updated: [Date to be added after legal review]'
              : 'Son güncelleme: [Hukuki inceleme sonrası eklenecektir]'}
          </p>
        </div>
      </section>
    </>
  )
}
