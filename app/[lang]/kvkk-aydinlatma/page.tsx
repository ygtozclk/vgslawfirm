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
    title: dict.kvkk.seoTitle,
    description: dict.kvkk.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/kvkk-aydinlatma`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr/kvkk-aydinlatma',
        en: 'https://www.vgshukuk.com/en/kvkk-aydinlatma',
      },
    },
  }
}

const sections = [
  {
    key: 'controller' as const,
    contentTr: 'Veri sorumlusu sıfatıyla hareket eden VGS Hukuk & Danışmanlık bürosu aşağıda belirtilen kişisel verilerinizi işlemektedir.',
    contentEn: 'VGS Law & Consultancy, acting as data controller, processes the personal data described below.',
    placeholderTr: '[Büronun tam unvanı, adresi ve iletişim bilgileri buraya eklenmelidir.]',
    placeholderEn: '[Full name, address and contact details of the firm must be added here.]',
  },
  {
    key: 'purposes' as const,
    contentTr: 'Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:',
    contentEn: 'Your personal data is processed for the following purposes:',
    placeholderTr: '[Veri işleme amaçları listelenmelidir: hukuki danışmanlık hizmetlerinin sunulması, iletişim talepleri, yasal yükümlülükler vb.]',
    placeholderEn: '[Processing purposes must be listed: provision of legal services, communication requests, legal obligations, etc.]',
  },
  {
    key: 'legalBasis' as const,
    contentTr: 'Verilerinizin işlenmesi aşağıdaki hukuki dayanağa dayandırılmaktadır:',
    contentEn: 'The processing of your data is based on the following legal basis:',
    placeholderTr: '[KVKK Madde 5 ve/veya Madde 6 kapsamındaki hukuki dayanak belirtilmelidir.]',
    placeholderEn: '[Legal basis under Article 5 and/or Article 6 of KVKK must be specified.]',
  },
  {
    key: 'recipients' as const,
    contentTr: 'Kişisel verileriniz yurt içi ve/veya yurt dışındaki alıcı gruplarına aktarılabilir.',
    contentEn: 'Your personal data may be transferred to recipient groups domestically and/or abroad.',
    placeholderTr: '[Alıcı grupları ve aktarım koşulları belirtilmelidir.]',
    placeholderEn: '[Recipient groups and transfer conditions must be specified.]',
  },
  {
    key: 'retention' as const,
    contentTr: 'Kişisel verileriniz, işleme amacının gerektirdiği süre ve yasal saklama yükümlülükleri çerçevesinde saklanmaktadır.',
    contentEn: 'Your personal data is retained for the period required by the processing purpose and applicable legal retention obligations.',
    placeholderTr: '[Saklama süreleri kategoriler bazında belirtilmelidir.]',
    placeholderEn: '[Retention periods should be specified by category.]',
  },
  {
    key: 'rights' as const,
    contentTr: 'KVKK\'nın 11. maddesi uyarınca veri sorumlusuna başvurarak kişisel verileriniz hakkında;\n• Kişisel verilerinizin işlenip işlenmediğini öğrenme,\n• İşlenmişse bilgi talep etme,\n• İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,\n• Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,\n• Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,\n• Kişisel verilerin silinmesini veya yok edilmesini isteme,\n• İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,\n• Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme\nhaklarına sahipsiniz.',
    contentEn: 'Under Article 11 of KVKK, you have the right to:\n• Learn whether your personal data is being processed,\n• Request information if it has been processed,\n• Learn the purpose of processing and whether data is used appropriately,\n• Know third parties to whom data is transferred,\n• Request rectification of incomplete or inaccurate data,\n• Request deletion or destruction of personal data,\n• Object to automated processing decisions that adversely affect you,\n• Seek compensation for damages caused by unlawful processing.',
    placeholderTr: null,
    placeholderEn: null,
  },
  {
    key: 'contact' as const,
    contentTr: 'KVKK kapsamındaki haklarınızı kullanmak için aşağıdaki yöntemlerle başvurabilirsiniz.',
    contentEn: 'To exercise your rights under KVKK, you may submit a request through the following methods.',
    placeholderTr: '[Başvuru yöntemi, adres, e-posta ve başvuru formu bilgileri eklenmelidir.]',
    placeholderEn: '[Application method, address, email and application form details must be added.]',
  },
]

export default async function KvkkAydinlatmaPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.kvkk

  return (
    <>
      <section className="bg-navy-900 px-6 pt-32 pb-20" aria-labelledby="kvkk-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading },
            ]}
            light
          />
          <h1
            id="kvkk-heading"
            className="mt-6 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {d.heading}
          </h1>
        </div>
      </section>

      <section className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl">
          {/* Draft notice */}
          <div className="mb-10 rounded-sm border-l-4 border-gold-500 bg-paper-2 px-6 py-4">
            <p className="text-sm font-semibold text-ink">⚠ {d.draftNotice}</p>
          </div>

          <div className="flex flex-col gap-10">
            {sections.map(({ key, contentTr, contentEn, placeholderTr, placeholderEn }) => {
              const sectionTitle = d.sections[key]
              const body = locale === 'en' ? contentEn : contentTr
              const placeholder = locale === 'en' ? placeholderEn : placeholderTr

              return (
                <section key={key} aria-labelledby={`kvkk-${key}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="h-0.5 w-8 bg-gold-500" aria-hidden="true" />
                    <h2
                      id={`kvkk-${key}`}
                      className="text-h3 font-semibold text-ink"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {sectionTitle}
                    </h2>
                  </div>
                  <div className="ml-12">
                    {body.split('\n').filter(Boolean).map((line, i) =>
                      line.startsWith('•') ? (
                        <p key={i} className="text-sm text-ink leading-relaxed pl-4 mb-1">{line}</p>
                      ) : (
                        <p key={i} className="text-sm text-ink leading-relaxed mb-2">{line}</p>
                      )
                    )}
                    {placeholder && (
                      <div className="mt-3 rounded-sm border border-dashed border-gold-500/40 bg-paper-2 px-4 py-3">
                        <p className="text-xs text-slate italic">{placeholder}</p>
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
