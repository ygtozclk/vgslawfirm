export interface Article {
  slug: string
  categories: string[]
  featured?: boolean
  readingTime: number
  author: string
  authorSlug: string
  authorTitle: string
  authorBar: string
  publishedAt: string
  tr: {
    title: string
    summary: string
    abstract?: string
    content: string
    seoTitle: string
    seoDescription: string
  }
  en: {
    title: string
    summary: string
    abstract?: string
    content: string
    seoTitle: string
    seoDescription: string
  }
}

export const articles: Article[] = [
  {
    slug: 'trastuzumab-derukstekan-sgk-ilac-bedeli',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: true,
    readingTime: 12,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2024-06-01',
    tr: {
      title: 'Trastuzumab Derukstekan (Enhertu) Bakımından İlaç Bedelinin SGK\'ca Karşılanmasına İlişkin Hukuki Süreçler',
      summary:
        'Trastuzumab derukstekan (ticari adı: Enhertu) başta olmak üzere endikasyon dışı akıllı kanser ilaçlarının SGK tarafından karşılanması için başvurulabilecek hukuki yollar ve mahkeme süreçleri üzerine akademik bir inceleme.',
      abstract:
        'Bu çalışma; trastuzumab derukstekan etken maddeli Enhertu adlı biyolojik ilacın, Sosyal Güvenlik Kurumu (SGK) tarafından karşılanmaması durumunda başvurulabilecek idari ve yargısal yolları ele almaktadır. İhtiyati tedbir kararları, endikasyon dışı ilaç bedelinin ödenmesine ilişkin içtihat ve güncel mevzuat çerçevesinde bir değerlendirme sunulmaktadır.',
      content: `
Bu içerik, orijinal makalenin tam metninin buraya taşınmasını beklemektedir.

**Giriş**

Trastuzumab derukstekan (INN); HER2 pozitif meme kanseri ve HER2 ekspresyonu gösteren diğer solid tümörlerin tedavisinde kullanılan, antikor-ilaç konjugatı (ADC) sınıfına ait bir biyolojik ajandır. Türkiye'de "Enhertu" ticari adıyla ruhsatlandırılan bu ilaç, 2023 yılı itibarıyla SGK Sağlık Uygulama Tebliği (SUT) kapsamındaki geri ödeme listelerine alınmamış olup bedeli SGK tarafından karşılanmamaktadır.

**Hukuki Süreç**

Söz konusu ilaçların bedelinin SGK tarafından karşılanabilmesi için başvurulacak hukuki yollar şu şekilde sıralanabilir:

1. SGK'ya İdari Başvuru
2. İdare Mahkemesinde İptal Davası Açılması
3. İhtiyati Tedbir Talebi

**Sonuç**

Orijinal makale içeriği buraya taşınmalıdır. Bu alan, ilacın SGK tarafından karşılanması sürecine ilişkin hukuki değerlendirmelere ayrılmıştır.
      `.trim(),
      seoTitle: 'Enhertu (Trastuzumab Derukstekan) SGK Karşılama Süreci | VGS Hukuk',
      seoDescription:
        'Trastuzumab derukstekan (Enhertu) ilaç bedelinin SGK\'ca karşılanması için başvurulabilecek hukuki yollar, ihtiyati tedbir ve endikasyon dışı ilaç mevzuatı.',
    },
    en: {
      title: 'Legal Processes for SGK Coverage of Trastuzumab Deruxtecan (Enhertu)',
      summary:
        'An academic review of the legal avenues available to obtain SGK coverage for trastuzumab deruxtecan (Enhertu) and other off-label targeted cancer therapies in Turkey.',
      abstract:
        'This article examines the administrative and judicial avenues available when the Social Security Institution (SGK) declines to cover the biologic drug Enhertu (trastuzumab deruxtecan). It provides an evaluation of interim injunctions, case law on off-label drug reimbursement, and the current regulatory framework.',
      content: `
This content awaits migration of the full article text.

**Introduction**

Trastuzumab deruxtecan (INN) is a biologic agent of the antibody-drug conjugate (ADC) class used in the treatment of HER2-positive breast cancer and other solid tumours with HER2 expression. Registered in Turkey under the trade name "Enhertu", the drug had not been included in the SGK Health Implementation Communiqué (SUT) reimbursement lists as of 2023 and its cost is not covered by SGK.

**Legal Process**

The legal avenues for seeking SGK coverage of such drugs include:

1. Administrative Application to SGK
2. Action for Annulment before the Administrative Court
3. Application for Interim Injunction

**Conclusion**

Original article content to be migrated here. This section is reserved for legal analysis of the reimbursement process.
      `.trim(),
      seoTitle: 'SGK Coverage of Enhertu (Trastuzumab Deruxtecan) — Legal Process | VGS Law',
      seoDescription:
        'Legal avenues for obtaining SGK reimbursement of trastuzumab deruxtecan (Enhertu), including interim injunctions and off-label drug law in Turkey.',
    },
  },
  {
    slug: 'kvkk-uyum-programi',
    categories: ['KVKK Uyumu'],
    featured: false,
    readingTime: 6,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2021-03-31',
    tr: {
      title: 'KVKK Uyum Programı',
      summary:
        '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlularının yükümlülükleri ve uyum programının ana bileşenleri.',
      content: `
Bu makale, orijinal platformdan buraya taşınmayı beklemektedir.

7 Nisan 2016 tarihli ve 29677 sayılı Resmî Gazete'de yayımlanan 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK"), Türkiye'de kişisel verilerin işlenmesine ilişkin usul ve esasları düzenlemekte; bireylerin temel hak ve özgürlüklerini güvence altına almayı amaçlamaktadır.

**Orijinal makale içeriği buraya taşınmalıdır.** Bu alan, Av. Barış Ürün tarafından 31.03.2021 tarihinde yayımlanan "KVKK Uyum Programı" başlıklı makalenin tam metnine ayrılmıştır.
      `.trim(),
      seoTitle: 'KVKK Uyum Programı | VGS Hukuk & Danışmanlık',
      seoDescription:
        'Av. Barış Ürün, 6698 sayılı KVKK kapsamında veri sorumlularının uyum yükümlülüklerini değerlendiriyor.',
    },
    en: {
      title: 'KVKK Compliance Programme',
      summary:
        "An overview of data controllers' obligations and the key components of a compliance programme under Law No. 6698 (KVKK).",
      content: `
This content awaits migration from the original platform.

Law No. 6698 on the Protection of Personal Data ("KVKK"), published in the Official Gazette no. 29677 dated 7 April 2016, sets out the rules governing the processing of personal data in Turkey and aims to protect individuals' fundamental rights and freedoms.

**Original article content should be migrated here.** This section is reserved for the full text of the article "KVKK Uyum Programı" published by Av. Barış Ürün on 31.03.2021.
      `.trim(),
      seoTitle: 'KVKK Compliance Programme | VGS Law & Consultancy',
      seoDescription:
        "Av. Barış Ürün reviews the compliance obligations for data controllers under Law No. 6698 (KVKK).",
    },
  },
]

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getAllCategories(): string[] {
  const cats = new Set<string>()
  articles.forEach((a) => a.categories.forEach((c) => cats.add(c)))
  return Array.from(cats)
}
