export interface ArticleFaqItem {
  question: string
  answer: string
}

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
  // Set only for articles about a specific named drug — drives the dynamic
  // homepage title/description and the /ilaclar hub page. Leave unset for
  // non-drug publications (e.g. KVKK) so they're excluded automatically.
  drugName?: {
    tr: string
    en: string
  }
  related?: {
    articles?: string[]
    ictihat?: string[]
    kararlar?: string[]
  }
  tr: {
    title: string
    summary: string
    abstract?: string
    content: string
    seoTitle: string
    seoDescription: string
    faq?: ArticleFaqItem[]
    merakEdilenler?: ArticleFaqItem[]
  }
  en: {
    title: string
    summary: string
    abstract?: string
    content: string
    seoTitle: string
    seoDescription: string
    faq?: ArticleFaqItem[]
    merakEdilenler?: ArticleFaqItem[]
  }
}

export const articles: Article[] = [
  {
    slug: 'trastuzumab-derukstekan-sgk-ilac-bedeli',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: true,
    drugName: { tr: 'Trastuzumab Derukstekan', en: 'Trastuzumab Deruxtecan' },
    readingTime: 12,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2024-06-01',
    related: {
      kararlar: [
        'mide-kanseri-enhertu-idare-mahkemesi-karari',
        'meme-kanseri-enhertu-is-mahkemesi-karari',
        'adenoid-kistik-karsinom-enhertu-is-mahkemesi-karari',
        'meme-kanseri-enhertu-is-mahkemesi-karari-2',
      ],
    },
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
      merakEdilenler: [
        {
          question: 'Enhertu (Trastuzumab Derukstekan) SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçede hastanın HER2 durumunu ve önceki tedavi geçmişini gösteren sağlık kurulu raporu, varsa TİTCK endikasyon dışı kullanım onayı, SGK'ya yapılan ön başvuru ile alınan ret veya zımni ret yazısı yer almalıdır. Tedavinin aciliyeti nedeniyle dilekçeye ayrıca ihtiyati tedbir talebi de eklenmelidir.",
        },
        {
          question: 'Enhertu Bedeli Nereden Temin Edilir?',
          answer:
            'Enhertu, SUT\'un EK-4/A listesinde yer almadığından hastane eczaneleri üzerinden standart reçeteyle temin edilememektedir; ilaç genellikle TİTCK\'nın yurt dışı ilaç temin mekanizması veya özel eczaneler aracılığıyla ithal edilerek hastaya ulaştırılmaktadır.',
        },
        {
          question: 'Enhertu İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. İlaç bedeli önce hasta tarafından karşılanmışsa, faturalar ve tıbbi belgelerle SGK'ya başvurup ret cevabı alındıktan sonra bedelin iadesi için dava açılabilir; 5510 sayılı Kanun'un 97. maddesi uyarınca bu talep 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Enhertu Talebini Neden Reddeder?',
          answer:
            "En sık ret gerekçesi, ilacın SUT'un Bedeli Ödenecek İlaçlar Listesi'nde (EK-4/A) hiç yer almamasıdır. Bunun yanında TİTCK onayının bulunmaması ve sağlık kurulu raporunun HER2 pozitifliğini veya önceki tedavi başarısızlığını yeterince belgelememesi de ret sebepleri arasındadır.",
        },
        {
          question: 'Enhertu Davası Hangi Mahkemede Görülür?',
          answer:
            'SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun\'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.',
        },
      ],
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
      merakEdilenler: [
        {
          question: 'How Should a Petition for an Enhertu (Trastuzumab Deruxtecan) SGK Application Be Prepared?',
          answer:
            "The petition should include a health board report documenting the patient's HER2 status and prior treatment history, any TİTCK off-label use approval, and the written pre-litigation application to SGK together with its refusal or implied refusal. Given the urgency of treatment, a request for an interim injunction should also be included.",
        },
        {
          question: 'Where Is the Cost of Enhertu Obtained From?',
          answer:
            "Since Enhertu is not on SUT's Annex 4/A list, it cannot be obtained through a standard hospital-pharmacy prescription; the drug is generally imported and supplied to the patient through TİTCK's foreign drug procurement mechanism or through specialised pharmacies.",
        },
        {
          question: 'Can the Amount Paid for Enhertu Be Reclaimed?',
          answer:
            'Yes. If the drug cost was initially paid by the patient, a case can be filed to reclaim it after applying to SGK with invoices and medical documents and receiving a refusal; under Article 97 of Law No. 5510, this claim is subject to a 5-year limitation period.',
        },
        {
          question: 'Why Does SGK Refuse Enhertu Requests?',
          answer:
            "The most common ground is that the drug is not listed at all on SUT's Reimbursable Drugs List (Annex 4/A). The absence of TİTCK approval and a health board report that does not adequately document HER2 positivity or prior treatment failure are also common grounds for refusal.",
        },
        {
          question: 'Which Court Hears an Enhertu Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
    },
  },
  {
    slug: 'perjeta-sgk-karsiliyor-mu',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: false,
    drugName: { tr: 'Perjeta', en: 'Perjeta' },
    readingTime: 7,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2026-08-20',
    related: {
      articles: ['erbitux-sgk-karsiliyor-mu', 'bevax-sgk-karsiliyor-mu', 'trastuzumab-derukstekan-sgk-ilac-bedeli'],
      ictihat: ['kanser-ilaci-yetkili-mahkeme', 'odeme-listesi-disi-ilacta-ihtiyati-tedbir'],
    },
    tr: {
      title: "Perjeta (Pertuzumab) SGK Karşılıyor mu? Onaylı Endikasyon Dışı Kullanımda Dava Süreci",
      summary:
        "Perjeta'nın (pertuzumab) hangi HER2 pozitif meme kanseri vakalarında SGK tarafından karşılandığı, onay dışı kullanımlarda izlenecek hukuki yol ve 2026 fiyatı.",
      content: `
**Perjeta (pertuzumab)**, HER2 pozitif meme kanseri tedavisinde trastuzumab (Herceptin) ile birlikte kullanılan hedefe yönelik bir ilaçtır. Diğer birçok akıllı ilaçtan farklı olarak Perjeta, **SGK'nın Bedeli Ödenecek İlaçlar Listesi'ne (EK-4/A) 2016 yılında dahil edilmiştir** ve onaylı endikasyonunda kullanıldığında SGK tarafından karşılanmaktadır. Ancak uygulamada asıl uyuşmazlık, ilacın SUT'ta tanımlanan protokolün ve endikasyonun dışında -örneğin farklı bir tedavi hattında veya farklı bir kombinasyonla- kullanılmak istenmesi halinde ortaya çıkmaktadır.

## Perjeta (Pertuzumab) Nedir?

Pertuzumab, kanser hücrelerinin yüzeyindeki **HER2 reseptörüne** trastuzumabdan farklı bir bölgeden bağlanan monoklonal bir antikordur. İki ilacın kombine kullanımı, HER2 sinyal yolağının daha kapsamlı biçimde bloke edilmesini sağlar. Perjeta başlıca şu durumlarda kullanılır:

- **Metastatik HER2 pozitif meme kanserinde**, daha önce anti-HER2 tedavisi veya metastatik hastalık için kemoterapi almamış hastalarda, trastuzumab ve dosetaksel ile kombine birinci basamak tedavi
- **Neoadjuvan tedavi** (ameliyat öncesi): Lokal ileri, inflamatuar veya erken evre (2 cm üzeri veya lenf nodu pozitif) tümörlerde
- **Adjuvan tedavi** (ameliyat sonrası): Nüks riski yüksek hastalarda

## SGK Perjeta'yı Ne Zaman Karşılıyor?

Perjeta, SUT'un EK-4/A listesinde yer aldığından, **yukarıda sayılan onaylı endikasyon ve protokole uygun kullanıldığında** SGK tarafından karşılanmaktadır. Bunun için genellikle aranan koşullar:

- HER2 pozitifliğinin patoloji raporuyla doğrulanmış olması,
- Trastuzumab ile kombine kullanılması,
- Metastatik, neoadjuvan veya adjuvan tedavi başlıklarından birine uygun klinik tabloda reçete edilmesi,
- Onkoloji uzmanı tarafından düzenlenmiş sağlık kurulu raporu.

Sorun, hastanın klinik tablosunun SUT'ta tarif edilen protokolün tam olarak dışında kalması durumunda ortaya çıkmaktadır. Örneğin ilacın SUT'ta öngörülmeyen bir kombinasyonla, farklı bir tedavi basamağında ya da onaylı olmayan bir endikasyonda kullanılması gerektiği hekim tarafından değerlendirildiğinde, SGK bu talebi "endikasyon dışı kullanım" olarak nitelendirip reddedebilmektedir. Bu noktada hastanın hukuki yola başvurması gündeme gelir.

## Perjeta 2026 Fiyatı

Güncel verilere göre Perjeta 420 mg flakonun fiyatı yaklaşık **76.500 TL** seviyesindedir. Tedaviye başlarken uygulanan yükleme dozu, idame dozunun iki katı olduğundan ilk kürün maliyeti yaklaşık **153.000 TL**'ye ulaşmakta, sonraki kürler ise flakon başına belirtilen fiyat üzerinden devam etmektedir. Perjeta genellikle üç haftada bir uygulandığından, tedavinin toplam süresine göre maliyet önemli ölçüde artabilir. Onaylı endikasyonda ve SUT şartlarına uygun kullanıldığında bu maliyetin SGK tarafından karşılanması beklenir; ret halinde ise idari işlemin iptali için dava yolu açıktır.

## SGK Ret Verdiğinde İzlenecek Hukuki Süreç

**A) Onaylı endikasyonda haksız ret:** Hastanın klinik tablosu SUT'ta tanımlanan şartlara uyduğu halde SGK ödemeyi reddetmişse, bu işlemin iptali istemiyle doğrudan dava açılabilir; ayrıca [ihtiyati tedbir](/tr/ictihat/kanser-ilaci-yetkili-mahkeme) talep edilerek tedavinin aksamaması sağlanabilir.

**B) Onaylı endikasyon dışı kullanım:** Hekim, hastanın tedavisi için Perjeta'nın SUT'ta tanımlı olmayan bir şekilde kullanılmasının zorunlu olduğunu değerlendiriyorsa süreç şu şekilde ilerler:

1. **TİTCK'ya endikasyon dışı kullanım onayı başvurusu** yapılır; bu başvuruda ilacın bilimsel yayınlarla desteklenen bir yararının bulunduğu ve alternatifinin olmadığı ortaya konur.
2. **SGK'ya yazılı başvuru** yapılır; başvuruya doktor raporu, patoloji sonucu ve varsa TİTCK onayı eklenir.
3. **SGK'nın reddi veya zımni reddi halinde**, sigortalılık statüsüne göre iş mahkemesi veya idare mahkemesinde dava açılır.
4. **İhtiyati tedbir talebi** ile dava süresince ilacın SGK tarafından karşılanması istenir.
5. **Bilirkişi incelemesi** sonucunda, ilacın hastalık için zorunlu olduğu tespit edilirse mahkeme SGK'yı ödemeye mahkûm edebilir.

## Gerekli Belgeler

- HER2 pozitifliğini gösteren patoloji raporu
- Onkoloji uzmanı sağlık kurulu raporu (tedavi basamağı ve kombinasyonu belirtir)
- Epikriz ve önceki tedavi kayıtları
- SUT dışı kullanım söz konusuysa TİTCK başvuru/onay belgesi
- SGK ret yazısı veya başvuru kaydı
- Faturalar (bedel cepten ödendiyse)

## Dava Süresi

Onaylı endikasyondaki haksız retlere ilişkin davalar SUT hükümlerinin açık olması nedeniyle görece daha öngörülebilir sürede ilerleyebilirken, endikasyon dışı kullanım iddiasına dayanan davalarda bilirkişi süreci nedeniyle **6-18 ay** arası bir süre beklenebilir.
      `.trim(),
      seoTitle: "Perjeta (Pertuzumab) SGK Karşılama Şartları ve Dava Süreci | VGS Hukuk",
      seoDescription:
        "Perjeta'nın (pertuzumab) hangi HER2 pozitif meme kanseri vakalarında SGK tarafından karşılandığı, onay dışı kullanımlarda izlenecek hukuki yol ve 2026 fiyatı.",
      faq: [
        {
          question: "Perjeta SGK'nın listesinde mi?",
          answer:
            "Evet, Perjeta 2016 yılından bu yana SUT'un EK-4/A listesinde yer almaktadır; onaylı endikasyonda kullanıldığında SGK tarafından karşılanır.",
        },
        {
          question: 'Perjeta hangi ilaçla birlikte kullanılıyor?',
          answer: 'Trastuzumab (Herceptin) ve genellikle dosetaksel ile kombine olarak kullanılır.',
        },
        {
          question: 'SGK, listede olan bir ilaç için neden ödeme reddedebilir?',
          answer:
            "İlacın listede yer alması, her kullanım biçiminin otomatik olarak karşılanacağı anlamına gelmez; kullanım SUT'ta tanımlanan protokole (endikasyon, kombinasyon, basamak) uymuyorsa ret söz konusu olabilir.",
        },
        {
          question: 'Erken evre meme kanserinde Perjeta karşılanıyor mu?',
          answer:
            'Nüks riski yüksek, uygun klinik kriterleri taşıyan hastalarda neoadjuvan/adjuvan tedavi kapsamında karşılanabilir; kriterlerin sağlanmadığı değerlendirilirse ret ve dava süreci gündeme gelebilir.',
        },
        {
          question: "Dava sürerken Perjeta'yı nasıl temin ederim?",
          answer:
            'Mahkemeden alınacak ihtiyati tedbir kararıyla, dava sonuçlanıncaya kadar ilaç bedelinin SGK tarafından karşılanması sağlanabilir.',
        },
      ],
      merakEdilenler: [
        {
          question: 'Perjeta SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçeye HER2 pozitifliğini gösteren patoloji raporu, Perjeta'nın trastuzumab ile kombine kullanıldığını belirten onkoloji sağlık kurulu raporu, hastanın tedavi basamağını (metastatik, neoadjuvan veya adjuvan) gösteren epikriz ve varsa SGK ret yazısı eklenmelidir.",
        },
        {
          question: 'Perjeta Bedeli Nereden Temin Edilir?',
          answer:
            "Perjeta SUT'un EK-4/A listesinde yer aldığından, onaylı endikasyonda kullanıldığında hastane eczaneleri üzerinden SGK protokolüyle doğrudan temin edilir. SGK'nın ödemeyi reddettiği durumlarda ilaç, dava süreci boyunca özel eczanelerden cepten satın alınmak zorunda kalınabilir.",
        },
        {
          question: 'Perjeta İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. Onaylı endikasyonda haksız ret nedeniyle cepten ödenen Perjeta bedeli, faturalar ve SGK ret yazısıyla birlikte açılacak dava yoluyla geri istenebilir; talep 5510 sayılı Kanun'un 97. maddesindeki 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Perjeta Talebini Neden Reddeder?',
          answer:
            "En sık ret gerekçesi, ilacın trastuzumab olmaksızın veya SUT'ta tanımlı metastatik/neoadjuvan/adjuvan basamaklarının dışında bir klinik tabloda reçete edilmesidir. Sağlık kurulu raporunun HER2 pozitifliğini veya tedavi basamağını yeterince belgelememesi de sık karşılaşılan bir ret nedenidir.",
        },
        {
          question: 'Perjeta Davası Hangi Mahkemede Görülür?',
          answer:
            "SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.",
        },
      ],
    },
    en: {
      title: 'Does SGK Cover Perjeta (Pertuzumab)? Litigation for Off-Label Use',
      summary:
        'Which HER2-positive breast cancer cases SGK covers for Perjeta (pertuzumab), the legal route for off-label use, and the 2026 price.',
      content: `
**Perjeta (pertuzumab)** is a targeted therapy used together with trastuzumab (Herceptin) in the treatment of HER2-positive breast cancer. Unlike many other targeted cancer drugs, Perjeta **was added to SGK's Reimbursable Drugs List (Annex 4/A) in 2016** and is covered by SGK when used within its approved indication. In practice, disputes arise mainly when the drug is intended for use outside the protocol or indication defined in the Health Implementation Communiqué (SUT) — for example, in a different treatment line or a different combination.

## What Is Perjeta (Pertuzumab)?

Pertuzumab is a monoclonal antibody that binds to the **HER2 receptor** on cancer cells at a different site than trastuzumab. Combined use of the two drugs allows for more comprehensive blockade of the HER2 signalling pathway. Perjeta is mainly used in:

- **Metastatic HER2-positive breast cancer**, as first-line combination therapy with trastuzumab and docetaxel in patients who have not previously received anti-HER2 therapy or chemotherapy for metastatic disease
- **Neoadjuvant therapy** (pre-surgery): for locally advanced, inflammatory, or early-stage tumours (larger than 2 cm or node-positive)
- **Adjuvant therapy** (post-surgery): for patients at high risk of recurrence

## When Does SGK Cover Perjeta?

Because Perjeta is listed in SUT's Annex 4/A, it is covered by SGK **when used in line with the approved indication and protocol listed above**. The conditions generally required are:

- HER2 positivity confirmed by a pathology report,
- Combined use with trastuzumab,
- Prescription matching one of the metastatic, neoadjuvant, or adjuvant treatment settings,
- A health board report issued by a medical oncologist.

The problem arises when the patient's clinical picture falls entirely outside the protocol described in SUT — for example, when the treating physician determines that the drug is needed in a combination, treatment line, or indication not foreseen by SUT. In that case SGK may classify the request as "off-label use" and reject it, at which point the patient's legal remedy becomes relevant.

## Perjeta 2026 Price

Based on current data, a 420 mg vial of Perjeta costs approximately **76,500 TL**. Because the loading dose administered at the start of treatment is double the maintenance dose, the cost of the first cycle reaches approximately **153,000 TL**, with subsequent cycles billed at the per-vial price. Since Perjeta is typically administered every three weeks, the total cost can rise considerably depending on the length of treatment. When used within the approved indication and SUT conditions, this cost is expected to be covered by SGK; if refused, an action to annul the administrative decision is available.

## Legal Process When SGK Refuses Payment

**A) Unjustified refusal within the approved indication:** If the patient's clinical picture meets the conditions defined in SUT yet SGK refuses payment, an action can be filed directly for annulment of the decision; an [interim injunction](/en/ictihat/kanser-ilaci-yetkili-mahkeme) may also be requested so that treatment is not interrupted.

**B) Use outside the approved indication:** If the treating physician determines that Perjeta must be used in a manner not defined in SUT, the process proceeds as follows:

1. **Application to TİTCK for off-label use approval**, demonstrating that the drug's benefit is supported by scientific literature and that no alternative exists.
2. **Written application to SGK**, accompanied by the physician's report, pathology results, and any TİTCK approval.
3. **If SGK refuses or fails to respond**, a case is filed before the labour court or the administrative court depending on the patient's insurance status.
4. **A request for an interim injunction** so that SGK covers the drug while the case is pending.
5. **Expert examination**: if the court-appointed experts confirm the drug is medically necessary, the court may order SGK to pay.

## Required Documents

- Pathology report confirming HER2 positivity
- Health board report from an oncology specialist (stating treatment line and combination)
- Discharge summary and prior treatment records
- TİTCK application/approval documents, if off-label use is involved
- SGK refusal letter or application record
- Invoices, if the cost was paid out of pocket

## Duration of Proceedings

Cases based on an unjustified refusal within the approved indication tend to proceed relatively predictably because the SUT provisions are clear, whereas cases based on off-label use generally take **6 to 18 months** due to the expert examination process.
      `.trim(),
      seoTitle: 'Does SGK Cover Perjeta (Pertuzumab)? Conditions & Litigation | VGS Law',
      seoDescription:
        'Which HER2-positive breast cancer cases SGK covers for Perjeta (pertuzumab), the legal route for off-label use, and the 2026 price.',
      faq: [
        {
          question: 'Is Perjeta on the SGK reimbursement list?',
          answer:
            "Yes, Perjeta has been listed in SUT's Annex 4/A since 2016 and is covered by SGK when used within its approved indication.",
        },
        {
          question: 'Which drug is Perjeta used together with?',
          answer: 'It is used in combination with trastuzumab (Herceptin) and, typically, docetaxel.',
        },
        {
          question: 'Why would SGK refuse payment for a listed drug?',
          answer:
            "Being on the list does not mean every mode of use is automatically covered; if the use does not match the protocol defined in SUT (indication, combination, treatment line), SGK may refuse.",
        },
        {
          question: 'Is Perjeta covered in early-stage breast cancer?',
          answer:
            'It may be covered under neoadjuvant/adjuvant treatment for patients at high risk of recurrence who meet the clinical criteria; if the criteria are deemed unmet, refusal and litigation may follow.',
        },
        {
          question: 'How can I obtain Perjeta while the case is ongoing?',
          answer:
            'A court-ordered interim injunction can ensure SGK covers the drug cost until the case is concluded.',
        },
      ],
      merakEdilenler: [
        {
          question: 'How Should a Petition for a Perjeta SGK Application Be Prepared?',
          answer:
            "The petition should include a pathology report confirming HER2 positivity, an oncology health board report stating that Perjeta is used in combination with trastuzumab, a discharge summary showing the treatment line (metastatic, neoadjuvant, or adjuvant), and, if applicable, SGK's refusal letter.",
        },
        {
          question: 'Where Is the Cost of Perjeta Obtained From?',
          answer:
            "Since Perjeta is listed in SUT's Annex 4/A, it is supplied directly through hospital pharmacies under SGK's protocol when used within its approved indication. Where SGK refuses payment, the drug may need to be purchased out of pocket from a private pharmacy while the case is pending.",
        },
        {
          question: 'Can the Amount Paid for Perjeta Be Reclaimed?',
          answer:
            "Yes. Perjeta costs paid out of pocket due to an unjustified refusal within the approved indication can be reclaimed through litigation, supported by invoices and SGK's refusal letter; the claim is subject to the 5-year limitation period under Article 97 of Law No. 5510.",
        },
        {
          question: 'Why Does SGK Refuse Perjeta Requests?',
          answer:
            "The most common ground is prescribing the drug without trastuzumab or outside the metastatic, neoadjuvant, or adjuvant treatment lines defined in SUT. A health board report that does not adequately document HER2 positivity or the treatment line is another frequent ground for refusal.",
        },
        {
          question: 'Which Court Hears a Perjeta Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
    },
  },
  {
    slug: 'erbitux-sgk-karsiliyor-mu',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: false,
    drugName: { tr: 'Erbitux', en: 'Erbitux' },
    readingTime: 7,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2026-08-22',
    related: {
      articles: ['perjeta-sgk-karsiliyor-mu', 'bevax-sgk-karsiliyor-mu', 'trastuzumab-derukstekan-sgk-ilac-bedeli'],
      ictihat: ['endikasyon-disi-ilac-belgeler', 'kanser-ilaci-yetkili-mahkeme'],
    },
    tr: {
      title: 'Erbitux (Setuksimab) SGK Karşılıyor mu? Şartları, Fiyatı ve Dava Süreci',
      summary:
        "Erbitux'un (setuksimab/cetuximab) SGK tarafından karşılandığı şartlar, karşılanmadığı durumlarda izlenecek hukuki yol, 2026 fiyatı ve gerekli belgeler.",
      content: `
**Erbitux (setuksimab / cetuximab)**, kolorektal kanser ile baş-boyun kanserlerinin tedavisinde kullanılan, EGFR reseptörünü hedef alan bir monoklonal antikordur. SGK bu ilacı **tamamen dışlamamakta, ancak yalnızca Sağlık Uygulama Tebliği'nde (SUT) tanımlanan sıkı şartları taşıyan hastalarda** geri ödeme kapsamına almaktadır. Bu şartların dışına çıkıldığında -örneğin hastalık ilerlediği halde ilaca devam edilmesi ya da farklı bir tedavi basamağında kullanılması durumunda- SGK ödemeyi reddetmekte ve hastalar hukuki yola başvurmak zorunda kalmaktadır.

## Erbitux (Setuksimab) Nedir?

Setuksimab, kanser hücrelerinin yüzeyinde bulunan **EGFR (epidermal büyüme faktörü reseptörü)**'ne bağlanarak hücrelerin çoğalma sinyalini bloke eden hedefe yönelik bir tedavidir. Türkiye'de ruhsatlı olduğu başlıca endikasyonlar şunlardır:

- **RAS doğal tip (wild-type) metastatik kolorektal kanser**, FOLFOX veya FOLFIRI kemoterapi rejimleriyle kombine
- **Skuamöz hücreli baş-boyun kanseri**, platin bazlı kemoterapi veya radyoterapi ile kombine

## SGK Erbitux'u Hangi Şartlarda Karşılıyor?

SUT'a göre Erbitux'un geri ödeme kapsamına girebilmesi için aranan başlıca şartlar şunlardır:

- Hastanın **daha önce setuksimab veya başka bir anti-EGFR tedavisi kullanmamış** olması,
- **ECOG performans skorunun 0-1** olması (hastanın genel durumunun tedaviye elverişli olması),
- Metastatik kolorektal kanserde **RAS geninin doğal tip (mutasyonsuz)** olduğunun gösterilmiş olması,
- Bu şartların **en az bir tıbbi onkoloji uzmanının yer aldığı sağlık kurulu raporu** ile belgelenmesi.

Bu koşullar sağlandığında Erbitux'un bedeli SGK tarafından karşılanır. Ancak SUT açıkça şu sınırı da koymaktadır: **tedavi sırasında hastalıkta ilerleme (progresyon) görülmesi veya birlikte uygulanan kemoterapi rejiminin değiştirilmesi halinde**, Erbitux'un (veya başka bir anti-EGFR tedavinin) bedeli artık geri ödeme kapsamında değildir. Baş-boyun kanserinde de radyoterapi veya kemoterapi ile kombinasyon şartına uyulmadığında aynı sonuç doğar. Uygulamada uyuşmazlıkların büyük kısmı bu sınır noktalarında -yani ilacın SUT'ta tarif edilen "penceresinin" dışına çıkıldığı iddia edilen durumlarda- ortaya çıkmaktadır.

## Erbitux 2026 Fiyatı

Güncel verilere göre Erbitux 100 mg flakonun satış fiyatı yaklaşık **9.200-9.300 TL** seviyesindedir; 500 mg'lık büyük flakon ise vücut yüzey alanına göre hesaplanan doza bağlı olarak orantılı biçimde daha yüksek bir fiyata sahiptir. Tedavinin haftalık uygulanması nedeniyle, aylık toplam maliyet kullanılan doza göre yüz bin TL'yi aşabilmektedir. Güncel fiyat için eczane veya hastane ile teyit edilmesi önerilir.

## SGK Ret Verdiğinde İzlenecek Hukuki Süreç

Erbitux'a ilişkin uyuşmazlıklarda iki farklı senaryo söz konusu olabilir:

**A) SUT şartları sağlandığı halde SGK'nın ödemeyi reddetmesi:** Bu durumda SGK'nın ret işlemi hukuka aykırıdır ve doğrudan iptali istemiyle dava açılabilir.

**B) SUT'ta tanımlanan şartların dışında (endikasyon dışı) kullanım:** Örneğin ilaca progresyon sonrasında devam edilmesi gerektiği tıbben değerlendirilmişse, bu kullanım "endikasyon dışı" sayılır ve aşağıdaki süreç izlenir:

1. **[TİTCK'ya endikasyon dışı kullanım onayı başvurusu](/tr/ictihat/endikasyon-disi-ilac-belgeler):** Tedaviyi yürüten hekim, ilacın hastanın tedavisi için zorunlu olduğunu ve muadilinin bulunmadığını belgeleyerek başvuru yapar.
2. **SGK'ya yazılı başvuru:** Onay ve doktor raporlarıyla birlikte SGK İl Müdürlüğü'ne başvurulur.
3. **Dava açılması:** SGK'nın reddi veya zımni reddi halinde, sigortalılık statüsüne göre iş mahkemesi veya idare mahkemesinde dava açılır.
4. **İhtiyati tedbir talebi:** Dava süresince ilacın kesintisiz temini için mahkemeden tedbir kararı talep edilir.
5. **Bilirkişi incelemesi:** Mahkeme, ilacın hastalık için tıbben zorunlu olup olmadığını onkoloji alanında uzman bilirkişilere değerlendirtir.

## Gerekli Belgeler

| Belge | Açıklama |
|---|---|
| Sağlık kurulu raporu | RAS mutasyon durumu, ECOG skoru ve tedavi geçmişini gösterir |
| Genetik test sonucu | RAS doğal tip / mutasyon durumunun ispatı için |
| Patoloji ve epikriz raporları | Hastalığın türü ve evresi |
| TİTCK başvuru/onay belgesi | Endikasyon dışı kullanım söz konusuysa gereklidir |
| SGK ret yazısı veya başvuru kaydı | Dava şartının ispatı |
| Faturalar | İlaç bedeli cepten ödendiyse |

## Dava Süresi

SUT kapsamındaki bir hakkın haksız reddine dayanan davalar görece daha hızlı ilerleyebilirken, endikasyon dışı kullanım iddiasına dayanan davalarda bilirkişi süreci nedeniyle ortalama **6-18 ay** arasında bir süre söz konusu olabilir. İhtiyati tedbir talebinin kabulü halinde, tedaviye dava süresince ara verilmeden devam edilebilir.
      `.trim(),
      seoTitle: 'Erbitux (Setuksimab) SGK Karşılama Şartları ve Dava Süreci | VGS Hukuk',
      seoDescription:
        "Erbitux'un (setuksimab/cetuximab) SGK tarafından karşılandığı şartlar, karşılanmadığı durumlarda izlenecek hukuki yol, 2026 fiyatı ve gerekli belgeler.",
      faq: [
        {
          question: "Erbitux'u SGK her zaman karşılıyor mu?",
          answer:
            'Hayır, yalnızca SUT\'ta tanımlanan RAS doğal tip, performans skoru ve tedavi basamağı şartlarını taşıyan hastalarda karşılanır.',
        },
        {
          question: 'Hastalıkta ilerleme (progresyon) olduğunda Erbitux\'a devam edilirse SGK öder mi?',
          answer:
            "SUT'a göre progresyon sonrası kullanım geri ödeme kapsamı dışındadır; bu durumda bedel dava yoluyla talep edilebilir.",
        },
        {
          question: 'RAS mutasyonu olan hastalarda Erbitux kullanılabilir mi?',
          answer: "Tıbbi olarak değerlendirme hekime aittir; SGK'nın geri ödemesi ise RAS doğal tip şartına bağlıdır.",
        },
        {
          question: 'Baş-boyun kanserinde Erbitux hangi şartlarla karşılanıyor?',
          answer:
            'Radyoterapi veya belirli kemoterapi rejimleriyle kombinasyon ve sağlık kurulu raporu şartlarının birlikte sağlanması gerekir.',
        },
        {
          question: 'Dava açmadan önce SGK\'ya başvuru zorunlu mu?',
          answer: "Evet, SGK'ya yazılı başvuru yapılmadan ve ret cevabı alınmadan dava açılamaz.",
        },
      ],
      merakEdilenler: [
        {
          question: 'Erbitux SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçeye RAS geninin doğal tip olduğunu gösteren genetik test sonucu, ECOG performans skorunu belirten sağlık kurulu raporu, hastanın daha önce anti-EGFR tedavisi almadığını gösteren tedavi geçmişi ve SGK ret yazısı eklenmelidir.",
        },
        {
          question: 'Erbitux Bedeli Nereden Temin Edilir?',
          answer:
            "SUT şartlarını (RAS doğal tip, ECOG 0-1, ilk kullanım) taşıyan hastalarda Erbitux hastane eczaneleri üzerinden SGK protokolüyle doğrudan karşılanır. Progresyon sonrası devam gibi şartların dışına çıkılan durumlarda ilaç, dava süresince özel eczanelerden cepten temin edilmek zorunda kalınabilir.",
        },
        {
          question: 'Erbitux İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. SUT şartları sağlandığı halde haksız ret nedeniyle cepten ödenen Erbitux bedeli, faturalarla açılacak dava yoluyla geri istenebilir; talep 5510 sayılı Kanun'un 97. maddesindeki 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Erbitux Talebini Neden Reddeder?',
          answer:
            "En sık ret gerekçeleri; hastada RAS mutasyonu bulunması, hastalıkta ilerleme (progresyon) görülmesine rağmen ilaca devam edilmek istenmesi, ECOG performans skorunun 0-1 aralığında olmaması ve hastanın daha önce başka bir anti-EGFR tedavisi kullanmış olmasıdır.",
        },
        {
          question: 'Erbitux Davası Hangi Mahkemede Görülür?',
          answer:
            "SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.",
        },
      ],
    },
    en: {
      title: 'Does SGK Cover Erbitux (Cetuximab)? Conditions, Price & Litigation',
      summary:
        'The conditions under which SGK covers Erbitux (cetuximab), the legal route when payment is refused, the 2026 price, and required documents.',
      content: `
**Erbitux (cetuximab)** is a monoclonal antibody targeting the EGFR receptor, used in the treatment of colorectal cancer and head and neck cancers. SGK does **not exclude this drug entirely, but reimburses it only for patients meeting the strict conditions defined in the Health Implementation Communiqué (SUT)**. Once those conditions are exceeded — for example, continuing the drug despite disease progression, or using it at a different treatment line — SGK refuses payment and patients are forced to pursue a legal remedy.

## What Is Erbitux (Cetuximab)?

Cetuximab is a targeted therapy that binds to **EGFR (epidermal growth factor receptor)** on the surface of cancer cells, blocking the cell-proliferation signal. Its main licensed indications in Turkey are:

- **RAS wild-type metastatic colorectal cancer**, combined with FOLFOX or FOLFIRI chemotherapy regimens
- **Squamous cell head and neck cancer**, combined with platinum-based chemotherapy or radiotherapy

## Under What Conditions Does SGK Cover Erbitux?

According to SUT, the main conditions for Erbitux to be reimbursed are:

- The patient has **not previously received cetuximab or another anti-EGFR therapy**,
- An **ECOG performance status of 0-1** (the patient's general condition is suitable for treatment),
- In metastatic colorectal cancer, the **RAS gene is shown to be wild-type (non-mutated)**,
- These conditions are documented by a **health board report including at least one medical oncology specialist**.

When these conditions are met, Erbitux is covered by SGK. However, SUT also clearly sets a limit: **if disease progression is observed during treatment, or the accompanying chemotherapy regimen is changed**, Erbitux (or another anti-EGFR therapy) is no longer within the reimbursement scope. The same result follows in head and neck cancer if the required combination with radiotherapy or chemotherapy is not met. In practice, most disputes arise at these boundary points — situations where the drug is alleged to fall outside the "window" defined in SUT.

## Erbitux 2026 Price

Based on current data, a 100 mg vial of Erbitux costs approximately **9,200-9,300 TL**; the larger 500 mg vial is priced proportionally higher based on the body-surface-area dose calculation. Because treatment is administered weekly, the total monthly cost can exceed one hundred thousand TL depending on the dose used. It is advisable to confirm the current price with a pharmacy or hospital.

## Legal Process When SGK Refuses Payment

Two different scenarios may arise in disputes concerning Erbitux:

**A) SGK refuses payment despite the SUT conditions being met:** In this case SGK's refusal is unlawful and an action may be filed directly for its annulment.

**B) Use outside the conditions defined in SUT (off-label):** For example, if it is medically determined that the drug must be continued after progression, this use is treated as "off-label" and the following process applies:

1. **[Application to TİTCK for off-label use approval](/en/ictihat/endikasyon-disi-ilac-belgeler):** The treating physician applies, documenting that the drug is necessary for the patient's treatment and that no alternative exists.
2. **Written application to SGK:** Submitted to the Provincial Directorate of SGK together with the approval and physician's reports.
3. **Filing a case:** If SGK refuses or fails to respond, a case is filed before the labour court or administrative court depending on the patient's insurance status.
4. **Request for an interim injunction:** Requested from the court so that the drug is supplied without interruption while the case is pending.
5. **Expert examination:** The court has oncology specialists assess whether the drug is medically necessary for the disease.

## Required Documents

| Document | Description |
|---|---|
| Health board report | States RAS mutation status, ECOG score, and treatment history |
| Genetic test result | Proof of RAS wild-type / mutation status |
| Pathology and discharge reports | Type and stage of the disease |
| TİTCK application/approval document | Required if off-label use is involved |
| SGK refusal letter or application record | Proof of the pre-litigation application |
| Invoices | If the drug cost was paid out of pocket |

## Duration of Proceedings

Cases based on an unjustified refusal within SUT conditions can proceed relatively quickly, while cases alleging off-label use typically take an average of **6 to 18 months** due to the expert examination process. If the request for an interim injunction is granted, treatment can continue without interruption while the case is pending.
      `.trim(),
      seoTitle: 'Does SGK Cover Erbitux (Cetuximab)? Conditions & Litigation | VGS Law',
      seoDescription:
        'The conditions under which SGK covers Erbitux (cetuximab), the legal route when payment is refused, the 2026 price, and required documents.',
      faq: [
        {
          question: 'Does SGK always cover Erbitux?',
          answer:
            'No, it is covered only for patients meeting the RAS wild-type, performance score, and treatment-line conditions defined in SUT.',
        },
        {
          question: 'Will SGK pay if Erbitux is continued after disease progression?',
          answer:
            'Under SUT, use after progression falls outside the reimbursement scope; in that case the cost can be claimed through litigation.',
        },
        {
          question: 'Can Erbitux be used in patients with a RAS mutation?',
          answer:
            "That is a medical decision for the physician; SGK's reimbursement, however, is conditional on the RAS wild-type requirement.",
        },
        {
          question: 'Under what conditions is Erbitux covered in head and neck cancer?',
          answer:
            'Both a combination with radiotherapy or a specific chemotherapy regimen and a health board report must be satisfied together.',
        },
        {
          question: 'Is an application to SGK mandatory before filing a case?',
          answer: 'Yes, a case cannot be filed without a prior written application to SGK and a refusal response.',
        },
      ],
      merakEdilenler: [
        {
          question: 'How Should a Petition for an Erbitux SGK Application Be Prepared?',
          answer:
            "The petition should include the genetic test result confirming RAS wild-type status, a health board report stating the ECOG performance score, treatment history showing the patient has not previously received anti-EGFR therapy, and SGK's refusal letter.",
        },
        {
          question: 'Where Is the Cost of Erbitux Obtained From?',
          answer:
            'For patients meeting the SUT conditions (RAS wild-type, ECOG 0-1, first use), Erbitux is supplied directly through hospital pharmacies under SGK\'s protocol. Where use falls outside those conditions — such as continuing after disease progression — the drug may need to be purchased out of pocket from a private pharmacy while the case is pending.',
        },
        {
          question: 'Can the Amount Paid for Erbitux Be Reclaimed?',
          answer:
            "Yes. Erbitux costs paid out of pocket due to an unjustified refusal despite meeting SUT conditions can be reclaimed through litigation supported by invoices; the claim is subject to the 5-year limitation period under Article 97 of Law No. 5510.",
        },
        {
          question: 'Why Does SGK Refuse Erbitux Requests?',
          answer:
            'The most common grounds are the presence of a RAS mutation, requesting to continue the drug despite disease progression, an ECOG performance score outside the 0-1 range, and the patient having previously received another anti-EGFR therapy.',
        },
        {
          question: 'Which Court Hears an Erbitux Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
    },
  },
  {
    slug: 'bevax-sgk-karsiliyor-mu',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: false,
    drugName: { tr: 'Bevax', en: 'Bevax' },
    readingTime: 7,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2026-08-25',
    related: {
      articles: ['trodelvy-sgk-karsiliyor-mu', 'erbitux-sgk-karsiliyor-mu', 'perjeta-sgk-karsiliyor-mu'],
      ictihat: ['kanser-ilaci-davasinda-derdestlik', 'kanser-ilaci-yetkili-mahkeme'],
    },
    tr: {
      title: 'Bevax (Bevasizumab) SGK Karşılıyor mu? Endikasyona Göre Ödeme Farkları ve Dava Yolu',
      summary:
        "Bevax'ın (bevasizumab) hangi endikasyonlarda SGK tarafından karşılandığı, karşılanmadığı durumlarda izlenecek hukuki süreç ve güncel fiyat bilgisi.",
      content: `
Kanser tedavisinde damar oluşumunu (anjiyogenezi) baskılayarak etki eden **Bevax (bevasizumab)**, SGK'nın ilaç geri ödemesinde en çok karışıklık yaratan ilaçlardan biridir. Çünkü bevasizumab etken maddesi, **bazı kanser türlerinde ve belirli tedavi basamaklarında SGK tarafından karşılanırken, aynı ilacın farklı bir endikasyonda veya farklı bir tedavi hattında kullanılması halinde ödeme yapılmamaktadır.** Bu yazıda Bevax'ın hangi durumlarda karşılandığını, hangi durumlarda dava açmanın gerekli olduğunu ve bu sürecin nasıl işlediğini inceliyoruz. Benzer bir tablo, SGK'nın geri ödeme listesine hiç alınmamış olan [Trodelvy (sacituzumab govitecan)](/tr/yayinlar/trodelvy-sgk-karsiliyor-mu) için de geçerlidir; iki ilaç da endikasyona göre değişen ödeme kapsamı bakımından karşılaştırılabilir.

## Bevax (Bevasizumab) Nedir, Nasıl Etki Eder?

Bevasizumab, tümörün beslenmesi için ihtiyaç duyduğu yeni damarların oluşumunu (VEGF yolağını) engelleyerek kanser hücrelerinin büyümesini ve yayılmasını yavaşlatan bir **anti-anjiyojenik akıllı ilaç**tır. Bevax, bu etken maddenin Türkiye'de 2021 yılında ruhsat almış bir biyobenzeridir; aynı etken maddeyi taşıyan referans ürün ise piyasada Altuzan markasıyla bilinmektedir. Bevasizumab başlıca şu tedavilerde kullanılmaktadır:

- Metastatik kolon ve rektum kanseri
- Küçük hücreli dışı akciğer kanseri (belirli kombinasyonlarda)
- Glioblastoma multiforme (yüksek dereceli beyin tümörü)
- Bazı yumurtalık, serviks ve böbrek kanseri vakaları

## SGK Bevax'ı Hangi Durumlarda Karşılıyor?

SGK, bevasizumab etken maddesini **tüm kullanım biçimlerinde değil, yalnızca Sağlık Uygulama Tebliği'nde (SUT) sayılan özel şartları taşıyan endikasyonlarda** geri ödeme kapsamına almaktadır. Örneğin:

- 5-florourasil/folinik asit veya irinotekan kombinasyonlarıyla birlikte **metastatik kolon veya rektum kanserinin birinci basamak tedavisinde** kullanılması,
- Daha önce bevasizumab kullanılmamış hastalarda **ikinci ve sonraki basamak** tedavide belirli kombinasyonlarla kullanılması,
- Belirli kriterleri taşıyan **glioblastoma** vakalarında kullanılması

hallerinde SGK tarafından karşılanmaktadır. Ancak SUT'ta tanımlanan bu şartların dışına çıkıldığında -örneğin farklı bir kanser türünde, farklı bir tedavi basamağında veya SUT'ta aranan performans/rapor koşulları sağlanmadan reçete edildiğinde- SGK ödemeyi reddedebilmektedir. Uygulamada özellikle **akciğer kanseri gibi bazı endikasyonlarda** SGK'nın ödemeyi reddettiği ve hastaların ilaç bedelinin kesintisiz karşılanması için mahkemeden ihtiyati tedbir talep ettiği görülmektedir.

Bu nedenle "Bevax'ı SGK karşılıyor mu?" sorusunun tek bir cevabı yoktur; cevap, **hangi kanser türü, hangi tedavi basamağı ve hangi kombinasyonla kullanıldığına** göre değişir.

## Bevax 2026 Fiyatı

Bevax, bevasizumab etken maddesini taşıyan biyobenzer bir üründür ve fiyatı, aynı etken maddeye sahip referans ürünle benzer bir bantta seyretmektedir. Güncel referans fiyatlara göre 100 mg flakon yaklaşık **6.000-6.500 TL**, 400 mg flakon ise yaklaşık **23.000 TL** civarındadır. Tedavi protokolüne göre hastanın kilosuna dayalı doz hesaplaması yapıldığından, bir kürün toplam maliyeti kullanılan flakon sayısına göre değişir. Güncel ve kesine yakın fiyat için eczane veya hastane ile teyit edilmesi önerilir.

## SGK Ret Verdiğinde İzlenecek Hukuki Süreç

Bevax'ın SUT kapsamındaki bir endikasyonda usulüne uygun reçete edildiği hallerde SGK'nın ödemeyi reddetmesi hukuka aykırı bir işlemdir ve bu ret kararına karşı dava açılabilir. SUT kapsamı dışında kalan bir kullanım söz konusuysa, süreç "endikasyon dışı ilaç davası" niteliği taşır. Her iki durumda da izlenecek adımlar şunlardır:

1. **Sağlık kurulu raporunun düzenlenmesi:** Hastalığın türü, evresi ve tedavi basamağının SUT'ta aranan kriterlere uyduğunu (veya uymadığı hallerde ilacın tıbben zorunlu olduğunu) gösteren rapor onkoloji uzmanınca hazırlanır.
2. **[TİTCK'ya başvuru](/tr/ictihat/kanser-ilaci-yetkili-mahkeme) (SUT dışı kullanımlarda):** İlaç SUT'ta tanımlı endikasyon dışında kullanılacaksa, Türkiye İlaç ve Tıbbi Cihaz Kurumu'ndan endikasyon dışı kullanım onayı alınması sürece güç katar.
3. **SGK'ya yazılı başvuru:** Rapor ve varsa TİTCK onayı ile birlikte SGK İl Müdürlüğü'ne başvuru yapılır.
4. **Dava açılması:** SGK'nın reddi veya sessiz kalması halinde, sigortalılık statüsüne göre iş mahkemesi veya idare mahkemesinde dava açılır.
5. **İhtiyati tedbir talebi:** Tedavinin aksamaması için, dava süresince ilaç bedelinin SGK tarafından karşılanması talep edilir.

## Gerekli Belgeler

- Onkoloji uzmanı raporu ve sağlık kurulu raporu
- Patoloji sonucu ve epikriz
- Kullanılan tedavi basamağını (önceki kemoterapi rejimlerini) gösteren belgeler
- SGK'ya yapılan başvuru ve varsa ret yazısı
- İlaç faturaları (bedel cepten ödendiyse)

## Dava Süresi

Bevax'a ilişkin SGK davaları, dosyanın SUT kapsamındaki bir endikasyona mı yoksa endikasyon dışı bir kullanıma mı dayandığına göre farklı sürede sonuçlanabilir. SUT kapsamındaki bir endikasyonda haksız ret söz konusuysa süreç görece hızlı ilerleyebilirken, endikasyon dışı kullanımlarda bilirkişi incelemesi nedeniyle süreç **6-18 ay** arasında sürebilir. İhtiyati tedbir talebi kabul edildiğinde, tedavi dava süresince kesintiye uğramadan devam edebilir.
      `.trim(),
      seoTitle: 'Bevax (Bevasizumab) SGK Karşılama Şartları ve Dava Yolu | VGS Hukuk',
      seoDescription:
        "Bevax'ın (bevasizumab) hangi endikasyonlarda SGK tarafından karşılandığı, karşılanmadığı durumlarda izlenecek hukuki süreç ve güncel fiyat bilgisi.",
      faq: [
        {
          question: 'Bevax ile Altuzan arasında SGK ödemesi açısından fark var mı?',
          answer:
            'İkisi de aynı etken maddeyi (bevasizumab) içerdiğinden SGK ödeme kuralları etken maddeye ve endikasyona göre belirlenir; marka farkı tek başına ödeme durumunu değiştirmez.',
        },
        {
          question: "Bevax'ı hangi kanser türlerinde SGK karşılıyor?",
          answer:
            "Başta metastatik kolorektal kanserin belirli basamakları ve bazı glioblastoma vakaları olmak üzere, SUT'ta sayılan sınırlı sayıda endikasyonda karşılanmaktadır.",
        },
        {
          question: 'SGK, SUT kapsamındaki bir kullanım için de ödemeyi reddedebilir mi?',
          answer:
            "Usulüne uygun rapor ve reçete olmasına rağmen SGK'nın ret verdiği durumlar uygulamada görülmektedir; bu haller idari işlemin iptali istemiyle dava konusu yapılabilir.",
        },
        {
          question: 'İhtiyati tedbir talebi ne işe yarar?',
          answer:
            'Dava sonuçlanana kadar ilacın SGK tarafından geçici olarak karşılanmasını sağlayarak tedavinin kesintiye uğramasını önler.',
        },
        {
          question: 'Dava açmadan önce mutlaka avukat tutmam gerekir mi?',
          answer:
            'Zorunlu değildir, ancak SUT hükümlerinin teknik niteliği ve sürelerin kaçırılma riski nedeniyle bu alanda deneyimli bir avukattan destek alınması sürecin sağlıklı yürütülmesine katkı sağlar.',
        },
      ],
      merakEdilenler: [
        {
          question: 'Bevax SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçeye hastalığın türünü ve evresini gösteren patoloji ve epikriz raporları, tedavi basamağını (birinci veya sonraki basamak) belirten onkoloji sağlık kurulu raporu, hastanın daha önce bevasizumab kullanmadığını gösteren tedavi kayıtları ve SGK ret yazısı eklenmelidir.",
        },
        {
          question: 'Bevax Bedeli Nereden Temin Edilir?',
          answer:
            "SUT'ta sayılan endikasyonlarda (belirli basamaklarda metastatik kolorektal kanser, uygun glioblastoma vakaları) Bevax hastane eczaneleri üzerinden SGK protokolüyle karşılanır. Akciğer kanseri gibi SUT kapsamı dışında kalan endikasyonlarda ilaç, dava sürecinde alınacak ihtiyati tedbir kararına kadar özel eczanelerden cepten temin edilmek zorunda kalınabilir.",
        },
        {
          question: 'Bevax İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. SUT kapsamındaki bir endikasyonda haksız ret nedeniyle cepten ödenen Bevax bedeli, faturalarla açılacak dava yoluyla geri istenebilir; talep 5510 sayılı Kanun'un 97. maddesindeki 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Bevax Talebini Neden Reddeder?',
          answer:
            "En sık ret gerekçesi, ilacın SUT'ta sayılan sınırlı endikasyon listesinin (kolorektal kanser, glioblastoma) dışında -örneğin akciğer, yumurtalık veya serviks kanserinde- reçete edilmesidir. Tedavi basamağının SUT'ta tanımlanan sıraya uymaması da sık görülen bir ret nedenidir.",
        },
        {
          question: 'Bevax Davası Hangi Mahkemede Görülür?',
          answer:
            "SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.",
        },
      ],
    },
    en: {
      title: 'Does SGK Cover Bevax (Bevacizumab)? Coverage by Indication & Litigation',
      summary:
        'Which indications SGK covers for Bevax (bevacizumab), the legal process when coverage is refused, and current pricing.',
      content: `
**Bevax (bevacizumab)**, which works by suppressing the formation of new blood vessels (angiogenesis) in cancer treatment, is one of the drugs that creates the most confusion in SGK's drug reimbursement practice. This is because the active substance bevacizumab **is covered by SGK for certain cancer types and specific treatment lines, while the same drug is not reimbursed when used for a different indication or treatment line.** This article examines when Bevax is covered, when litigation becomes necessary, and how that process works. A comparable picture applies to [Trodelvy (sacituzumab govitecan)](/en/yayinlar/trodelvy-sgk-karsiliyor-mu), which has not been added to SGK's reimbursement list at all; the two drugs are comparable in terms of coverage that varies by indication.

## What Is Bevax (Bevacizumab) and How Does It Work?

Bevacizumab is an **anti-angiogenic targeted therapy** that slows the growth and spread of cancer cells by blocking the formation of new blood vessels (the VEGF pathway) that a tumour needs for nourishment. Bevax is a biosimilar of this active substance licensed in Turkey in 2021; the reference product containing the same active substance is known on the market under the brand Altuzan. Bevacizumab is mainly used in:

- Metastatic colon and rectal cancer
- Non-small cell lung cancer (in certain combinations)
- Glioblastoma multiforme (a high-grade brain tumour)
- Certain ovarian, cervical, and kidney cancer cases

## Under What Circumstances Does SGK Cover Bevax?

SGK reimburses the active substance bevacizumab **not in every mode of use, but only in indications meeting the specific conditions listed in the Health Implementation Communiqué (SUT)**. For example, it is covered when used:

- In combination with 5-fluorouracil/folinic acid or irinotecan regimens, as **first-line treatment for metastatic colon or rectal cancer**,
- In patients not previously treated with bevacizumab, as **second-line and later** treatment with specific combinations,
- In **glioblastoma** cases meeting specific criteria.

However, when these SUT-defined conditions are exceeded — for example, in a different cancer type, a different treatment line, or prescribed without meeting the required performance/report conditions — SGK may refuse payment. In practice, SGK has been seen to refuse payment particularly in **certain indications such as lung cancer**, prompting patients to seek an interim injunction from the court so that the drug cost is covered without interruption.

For this reason, the question "does SGK cover Bevax?" has no single answer; it depends on **which cancer type, which treatment line, and which combination** it is used with.

## Bevax 2026 Price

Bevax is a biosimilar product containing bevacizumab, and its price tracks a similar band to the reference product containing the same active substance. Based on current reference prices, a 100 mg vial costs approximately **6,000-6,500 TL**, and a 400 mg vial approximately **23,000 TL**. Because dosing is calculated based on the patient's weight according to the treatment protocol, the total cost of a cycle varies with the number of vials used. It is advisable to confirm the current, near-exact price with a pharmacy or hospital.

## Legal Process When SGK Refuses Payment

If Bevax is properly prescribed within an indication covered by SUT, SGK's refusal to pay is an unlawful act and can be challenged in court. If the use falls outside SUT's scope, the process takes the form of an "off-label drug case." In both situations, the steps are:

1. **Preparation of a health board report:** An oncology specialist prepares a report showing that the disease type, stage, and treatment line meet the criteria required by SUT (or, where they do not, that the drug is medically necessary).
2. **[Application to TİTCK](/en/ictihat/kanser-ilaci-yetkili-mahkeme) (for off-label use):** If the drug will be used outside the indication defined in SUT, obtaining off-label use approval from the Turkish Medicines and Medical Devices Agency strengthens the process.
3. **Written application to SGK:** Submitted to the Provincial Directorate of SGK together with the report and any TİTCK approval.
4. **Filing a case:** If SGK refuses or remains silent, a case is filed before the labour court or administrative court depending on the patient's insurance status.
5. **Request for an interim injunction:** Requested so that treatment is not interrupted and SGK covers the drug cost while the case is pending.

## Required Documents

- Oncology specialist's report and health board report
- Pathology results and discharge summary
- Documents showing the treatment line used (prior chemotherapy regimens)
- The application made to SGK and any refusal letter
- Drug invoices, if the cost was paid out of pocket

## Duration of Proceedings

SGK cases concerning Bevax can conclude in different timeframes depending on whether the case is based on an indication covered by SUT or an off-label use. Cases based on an unjustified refusal within SUT's scope can proceed relatively quickly, while off-label cases can take **6 to 18 months** due to the expert examination process. If the request for an interim injunction is granted, treatment can continue without interruption while the case is pending.
      `.trim(),
      seoTitle: 'Does SGK Cover Bevax (Bevacizumab)? Coverage & Litigation | VGS Law',
      seoDescription:
        'Which indications SGK covers for Bevax (bevacizumab), the legal process when coverage is refused, and current pricing.',
      faq: [
        {
          question: 'Is there a difference between Bevax and Altuzan in terms of SGK payment?',
          answer:
            "Since both contain the same active substance (bevacizumab), SGK's reimbursement rules are determined by the active substance and indication; the brand alone does not change the coverage outcome.",
        },
        {
          question: 'In which cancer types does SGK cover Bevax?',
          answer:
            'Mainly certain lines of metastatic colorectal cancer treatment and some glioblastoma cases — a limited number of indications listed in SUT.',
        },
        {
          question: 'Can SGK refuse payment even for a use covered by SUT?',
          answer:
            "Cases where SGK refuses payment despite a properly issued report and prescription do occur in practice; these can be challenged in court as an action for annulment of the administrative decision.",
        },
        {
          question: 'What is the purpose of an interim injunction request?',
          answer:
            'It ensures SGK temporarily covers the drug until the case is concluded, preventing an interruption in treatment.',
        },
        {
          question: 'Do I necessarily need a lawyer before filing a case?',
          answer:
            "It is not mandatory, but given the technical nature of SUT's provisions and the risk of missing deadlines, support from an experienced lawyer in this field contributes to a properly conducted process.",
        },
      ],
      merakEdilenler: [
        {
          question: 'How Should a Petition for a Bevax SGK Application Be Prepared?',
          answer:
            'The petition should include pathology and discharge reports showing the type and stage of the disease, an oncology health board report stating the treatment line (first-line or later), treatment records showing the patient has not previously received bevacizumab, and SGK\'s refusal letter.',
        },
        {
          question: 'Where Is the Cost of Bevax Obtained From?',
          answer:
            'For indications listed in SUT (certain lines of metastatic colorectal cancer, eligible glioblastoma cases), Bevax is supplied through hospital pharmacies under SGK\'s protocol. For indications outside SUT\'s scope, such as lung cancer, the drug may need to be purchased out of pocket from a private pharmacy until an interim injunction is obtained through litigation.',
        },
        {
          question: 'Can the Amount Paid for Bevax Be Reclaimed?',
          answer:
            "Yes. Bevax costs paid out of pocket due to an unjustified refusal within a SUT-covered indication can be reclaimed through litigation supported by invoices; the claim is subject to the 5-year limitation period under Article 97 of Law No. 5510.",
        },
        {
          question: 'Why Does SGK Refuse Bevax Requests?',
          answer:
            'The most common ground is prescribing the drug outside the limited list of indications defined in SUT (colorectal cancer, glioblastoma) — for example, in lung, ovarian, or cervical cancer. A treatment line that does not match the sequence defined in SUT is another frequent ground for refusal.',
        },
        {
          question: 'Which Court Hears a Bevax Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
    },
  },
  {
    slug: 'trodelvy-sgk-karsiliyor-mu',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'Endikasyon Dışı İlaç', 'İhtiyati Tedbir'],
    featured: false,
    drugName: { tr: 'Trodelvy', en: 'Trodelvy' },
    readingTime: 8,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2026-08-27',
    related: {
      articles: ['bevax-sgk-karsiliyor-mu', 'trastuzumab-derukstekan-sgk-ilac-bedeli'],
      ictihat: ['odeme-listesi-disi-ilacta-ihtiyati-tedbir', 'endikasyon-disi-ilac-belgeler'],
    },
    tr: {
      title: "Trodelvy (Sacituzumab Govitecan) SGK Karşılıyor mu? 2026 Fiyatı ve Dava Süreci",
      summary:
        "Trodelvy'nin SGK tarafından karşılanıp karşılanmadığı, 2026 güncel fiyatı, TİTCK onay süreci ve ilaç bedelinin dava yoluyla geri alınması hakkında kapsamlı rehber.",
      content: `
Meme kanseri ve mesane kanseri tedavisinde son yıllarda öne çıkan **Trodelvy (sacituzumab govitecan)**, Türkiye'de ruhsatlı olmasına rağmen Sosyal Güvenlik Kurumu'nun (SGK) geri ödeme listesinde yer almamaktadır. Bu durum, ilacı kullanmak zorunda kalan hastaların tedavi maliyetinin tamamını kendi imkanlarıyla karşılamasına neden olmakta ve çoğu zaman hukuki sürece başvurulmasını gerektirmektedir. Bu yazıda Trodelvy'nin ne için kullanıldığını, SGK karşılama durumunu, güncel fiyat aralığını ve ilaç bedelinin dava yoluyla geri alınabilmesi için izlenmesi gereken adımları ele alıyoruz. Geri ödeme listesine kısmen dahil olan ancak belirli endikasyonlar dışında yine ret ile karşılaşılabilen [Bevax (bevasizumab)](/tr/yayinlar/bevax-sgk-karsiliyor-mu) ile karşılaştırıldığında, Trodelvy'nin sürecinin baştan itibaren "SUT dışı ilaç" niteliğinde ilerlediği görülür.

## Trodelvy (Sacituzumab Govitecan) Nedir?

Trodelvy, etken maddesi sacituzumab govitecan olan bir **antikor-ilaç konjugatı (ADC)** grubu ilacıdır. Kanser hücrelerinin yüzeyinde sıkça bulunan TROP-2 proteinini hedef alan bir antikor ile kemoterapötik bir ajanı birleştirerek çalışır; bu sayede ilaç doğrudan kanser hücresine yönlenir ve sağlıklı dokulara verilen zarar sınırlandırılmaya çalışılır. Uluslararası kılavuzlarda başlıca şu durumlarda kullanılmaktadır:

- Önceki tedavilere yanıt vermeyen **üçlü negatif meme kanseri (metastatik TNBC)**
- İleri evre veya metastatik **ürotelyal (mesane ve idrar yolları) kanser**

Standart kemoterapi seçenekleri tükenmiş, hormon reseptörü ve HER2 açısından negatif olan agresif meme kanseri vakalarında Trodelvy, sınırlı tedavi seçenekleri arasında yer almaktadır.

## Trodelvy'nin SGK Karşılama Durumu

Trodelvy, Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) nezdinde ruhsatlı bir ilaç olsa da, SGK'nın **"Bedeli Ödenecek İlaçlar Listesi" (EK-4/A)** kapsamına henüz alınmamıştır. Sağlık Uygulama Tebliği'nde (SUT) yer almayan ilaçların bedeli, hastanın kullandığı endikasyondan bağımsız olarak SGK tarafından ödenmemektedir. Bu nedenle:

- Trodelvy, bugün itibarıyla **hiçbir endikasyonda** SGK tarafından doğrudan karşılanmamaktadır.
- İlaç, çoğunlukla **yurt dışından temin edilen bir ilaç** statüsündedir ve reçete edilen hastalar bedeli önce kendi imkanlarıyla ödemek durumunda kalmaktadır.
- Reçete eden onkoloji uzmanının, ilacın hastanın tedavisi için tıbben zorunlu olduğunu belgeleyen bir sağlık kurulu raporu düzenlemesi, sonraki hukuki süreç açısından önem taşımaktadır.

## Trodelvy 2026 Fiyatı

Trodelvy, ithal bir ilaç olduğu için fiyatı döviz kuruna bağlı olarak değişkenlik göstermektedir ve piyasada tek bir sabit liste fiyatı bulunmamaktadır. Uluslararası kaynaklara göre 180 mg'lık bir flakonun maliyeti yaklaşık **1.100-1.200 ABD Doları** bandındadır; tedavi protokolüne göre bir kürde birden fazla flakon kullanılabildiğinden, aylık tedavi maliyeti yüz binlerce TL'yi bulabilmektedir. Güncel ve kesin fiyat bilgisi için ilacı temin eden eczane veya hastane ile doğrudan teyit yapılması önerilir; bu tür ithal ürünlerde fiyatlar kur hareketlerine bağlı olarak sık aralıklarla değişebilmektedir.

## SGK Karşılamadığında İzlenecek Hukuki Yol

Trodelvy bedelini SGK'dan talep edebilmek veya daha önce cepten ödenen tutarları geri alabilmek için genel olarak şu aşamalar izlenir:

### 1. TİTCK'ya Endikasyon Dışı / Yurt Dışı İlaç Kullanım Başvurusu

Tedaviyi yürüten onkolog tarafından, ilacın hastanın tedavisi için zorunlu olduğunu, alternatifinin bulunmadığını ve bilimsel yayınlarla desteklendiğini gösteren bir başvuru Türkiye İlaç ve Tıbbi Cihaz Kurumu'na yapılır. Bu onay, sonradan açılacak davada en önemli dayanaklardan biridir; onay verilmemesi tek başına davanın reddi anlamına gelmez, ancak dosyayı zayıflatabilir.

### 2. SGK'ya Yazılı Başvuru

TİTCK onayı ile birlikte doktor raporu, reçete ve varsa ödeme belgeleri eklenerek SGK İl Müdürlüğü'ne yazılı başvuru yapılır. SGK, EK-4/A listesinde yer almayan ilaçlar için başvuruları büyük çoğunlukla reddetmekte veya süresi içinde yanıt vermemektedir (zımni ret).

### 3. Dava Açılması

SGK'nın ret cevabı ya da zımni reddin ardından, hastanın sosyal güvencesine göre **iş mahkemesi** veya **idare mahkemesi**nde dava açılır:

- SSK/Bağ-Kur kapsamındaki sigortalılar: İş mahkemesi
- Memur ve memur emeklileri (5510 sayılı Kanun'un 4/c maddesi kapsamı dışında kalanlar): İdare mahkemesi

### 4. İhtiyati Tedbir Talebi

Dava dilekçesinde, yargılama sürerken ilacın SGK tarafından geçici olarak karşılanması için **[ihtiyati tedbir](/tr/ictihat/odeme-listesi-disi-ilacta-ihtiyati-tedbir)** talep edilir. Mahkeme, ilacın hayati önem taşıdığı ve muadilinin bulunmadığı yönünde belge sunulması halinde bu talebi değerlendirir. Tedbir kararı verilmesi durumunda, dava sonuçlanana kadar ilaç bedelsiz olarak temin edilebilir.

### 5. Bilirkişi İncelemesi ve Karar

Mahkeme, dosyayı genellikle üniversitelerin tıbbi onkoloji birimlerinden bilirkişilere göndererek ilacın hastalık için zorunlu olup olmadığını değerlendirir. Bilirkişi raporunun olumlu olması halinde, SGK ilacın bedelini ödemekle yükümlü kılınabilir.

## Gerekli Belgeler

| Belge | Açıklama |
|---|---|
| Onkoloji uzmanı raporu | İlacın hayati önem taşıdığını ve alternatifinin bulunmadığını belgeler |
| Patoloji ve epikriz raporları | Hastalığın türünü ve evresini gösterir |
| TİTCK başvuru/onay belgesi | Endikasyon dışı veya yurt dışı ilaç kullanım sürecine dair belge |
| SGK ret yazısı veya başvuru kaydı | Dava şartı olan ön başvurunun ispatı |
| Fatura ve ödeme dekontları | İlaç cepten alındıysa geri ödeme talebinin dayanağı |

## Dava Süresi ve Zamanaşımı

SGK'ya karşı açılan ilaç davaları uygulamada ortalama **6 ay ile 18 ay** arasında sonuçlanmaktadır; bu süre mahkemenin iş yoğunluğuna ve bilirkişi sürecine göre değişebilir. İlaç bedelinin geri alınmasına ilişkin taleplerde, 5510 sayılı Kanun'un 97. maddesi uyarınca **5 yıllık zamanaşımı** söz konusudur ve süre, ödemenin yapıldığı veya SGK'nın ödemeyi reddettiği tarihten itibaren işlemeye başlar.
      `.trim(),
      seoTitle: 'Trodelvy (Sacituzumab Govitecan) SGK Karşılıyor mu? | VGS Hukuk',
      seoDescription:
        "Trodelvy'nin SGK tarafından karşılanıp karşılanmadığı, 2026 güncel fiyatı, TİTCK onay süreci ve ilaç bedelinin dava yoluyla geri alınması.",
      faq: [
        {
          question: "Trodelvy'yi SGK hiç karşılamıyor mu?",
          answer:
            "Güncel Sağlık Uygulama Tebliği'ne göre Trodelvy hiçbir endikasyonda SGK'nın geri ödeme listesinde yer almamaktadır; bu nedenle bedeli hasta tarafından ödenmekte veya dava yoluyla talep edilmektedir.",
        },
        {
          question: "Trodelvy davası açmadan önce SGK'ya başvuru şart mı?",
          answer:
            'Evet. Dava açılabilmesi için önce SGK\'ya yazılı başvuru yapılmış ve bu başvurunun reddedilmiş veya süresi içinde cevaplanmamış olması gerekir.',
        },
        {
          question: 'Dava sürerken ilacı nasıl temin edebilirim?',
          answer:
            'Mahkemeden ihtiyati tedbir kararı alınması halinde, dava sonuçlanıncaya kadar ilaç bedeli SGK tarafından karşılanabilir.',
        },
        {
          question: 'TİTCK onayı alınmadan dava açılabilir mi?',
          answer:
            'Onay alınması süreci güçlendirse de mutlak bir şart değildir; onay verilmemiş olsa dahi ilacın bilimsel etkinliği ve hastaya özgü zorunluluğu ispatlanarak dava açılabilir.',
        },
        {
          question: 'İlacı kendi imkanlarımla aldıysam parasını geri alabilir miyim?',
          answer:
            "Fatura ve tıbbi belgelerle birlikte SGK'ya başvuru yapıp ret cevabı aldıktan sonra, ödenen bedelin iadesi için dava açılabilir.",
        },
      ],
      merakEdilenler: [
        {
          question: 'Trodelvy SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçeye TİTCK'ya yapılan endikasyon dışı/yurt dışı ilaç kullanım başvurusu ve varsa onayı, onkoloji uzmanının ilacın hastanın tedavisi için zorunlu ve alternatifsiz olduğunu belirten raporu, reçete, SGK'ya yapılan ön başvuru ile alınan ret veya zımni ret yazısı ve ihtiyati tedbir talebi eklenmelidir.",
        },
        {
          question: 'Trodelvy Bedeli Nereden Temin Edilir?',
          answer:
            "Trodelvy SUT'un EK-4/A listesinde yer almadığından hastane eczaneleri üzerinden standart reçeteyle temin edilemez; ilaç genellikle yurt dışından ithal edilerek özel eczaneler veya TİTCK'nın yurt dışı ilaç temin mekanizması aracılığıyla hastaya ulaştırılır.",
        },
        {
          question: 'Trodelvy İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. İlaç bedeli önce hasta tarafından karşılanmışsa, faturalar ve tıbbi belgelerle SGK'ya başvurup ret cevabı alındıktan sonra bedelin iadesi için dava açılabilir; 5510 sayılı Kanun'un 97. maddesi uyarınca bu talep 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Trodelvy Talebini Neden Reddeder?',
          answer:
            "Trodelvy'nin SUT'un Bedeli Ödenecek İlaçlar Listesi'nde (EK-4/A) hiç yer almaması, tek başına ve neredeyse her başvuruda karşılaşılan ret gerekçesidir. TİTCK onayının bulunmaması ise ret kararını değiştirmese de sonraki davada dosyayı zayıflatabilir.",
        },
        {
          question: 'Trodelvy Davası Hangi Mahkemede Görülür?',
          answer:
            "SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.",
        },
      ],
    },
    en: {
      title: 'Does SGK Cover Trodelvy (Sacituzumab Govitecan)? 2026 Price & Litigation',
      summary:
        'Whether SGK covers Trodelvy, its current 2026 price, the TİTCK approval process, and reclaiming the drug cost through litigation.',
      content: `
**Trodelvy (sacituzumab govitecan)**, which has come to the fore in recent years in the treatment of breast and bladder cancer, is licensed in Turkey but is not on the Social Security Institution's (SGK) reimbursement list. As a result, patients who must use the drug end up paying the full cost of treatment themselves and are often forced to pursue legal action. This article covers what Trodelvy is used for, its SGK coverage status, the current price range, and the steps required to reclaim the drug cost through litigation. Compared with [Bevax (bevacizumab)](/en/yayinlar/bevax-sgk-karsiliyor-mu), which is partially included in the reimbursement list but can still be refused outside certain indications, Trodelvy's process proceeds from the outset as a case involving a drug entirely outside SUT.

## What Is Trodelvy (Sacituzumab Govitecan)?

Trodelvy is a drug in the **antibody-drug conjugate (ADC)** class whose active substance is sacituzumab govitecan. It works by combining an antibody that targets the TROP-2 protein, frequently found on the surface of cancer cells, with a chemotherapeutic agent; this directs the drug straight to the cancer cell and aims to limit damage to healthy tissue. International guidelines list its main uses as:

- **Triple-negative breast cancer (metastatic TNBC)** that has not responded to prior treatments
- Advanced or metastatic **urothelial (bladder and urinary tract) cancer**

In aggressive breast cancer cases that are negative for hormone receptors and HER2, where standard chemotherapy options have been exhausted, Trodelvy is among the limited treatment options available.

## Trodelvy's SGK Coverage Status

Although Trodelvy is licensed by the Turkish Medicines and Medical Devices Agency (TİTCK), it has not yet been added to SGK's **"Reimbursable Drugs List" (Annex 4/A)**. The cost of drugs not listed in the Health Implementation Communiqué (SUT) is not paid by SGK regardless of the patient's indication. As a result:

- As of today, Trodelvy is **not directly covered by SGK for any indication**.
- The drug is largely treated as one **procured from abroad**, and prescribed patients must initially cover the cost themselves.
- It is important for subsequent legal proceedings that the prescribing oncologist issues a health board report documenting that the drug is medically necessary for the patient's treatment.

## Trodelvy 2026 Price

As an imported drug, Trodelvy's price fluctuates with the exchange rate and there is no single fixed list price on the market. According to international sources, a 180 mg vial costs approximately **1,100-1,200 USD**; since more than one vial may be used per cycle depending on the treatment protocol, the monthly treatment cost can reach hundreds of thousands of TL. It is advisable to confirm the current, exact price directly with the pharmacy or hospital supplying the drug, as prices for such imported products can change frequently with currency movements.

## Legal Route When SGK Does Not Cover the Drug

To claim the cost of Trodelvy from SGK, or to reclaim amounts previously paid out of pocket, the following stages are generally followed:

### 1. Application to TİTCK for Off-Label / Foreign Drug Use

The treating oncologist submits an application to the Turkish Medicines and Medical Devices Agency showing that the drug is necessary for the patient's treatment, that no alternative exists, and that it is supported by scientific literature. This approval is one of the most important grounds in the case to be filed later; its absence does not by itself mean the case will be dismissed, but it can weaken the file.

### 2. Written Application to SGK

A written application is made to the Provincial Directorate of SGK, together with the TİTCK approval, physician's report, prescription, and any payment documents. SGK largely refuses applications for drugs not on the Annex 4/A list, or fails to respond within the statutory period (implied refusal).

### 3. Filing a Case

Following SGK's refusal or implied refusal, a case is filed before the **labour court** or **administrative court** depending on the patient's social security status:

- Insured persons under SSK/Bağ-Kur: labour court
- Civil servants and retired civil servants (those outside the scope of Article 4/c of Law No. 5510): administrative court

### 4. Request for an Interim Injunction

The statement of claim requests an **[interim injunction](/en/ictihat/odeme-listesi-disi-ilacta-ihtiyati-tedbir)** so that SGK temporarily covers the drug while the litigation is pending. The court considers this request if documents are submitted showing that the drug is of vital importance and that no alternative exists. If the injunction is granted, the drug can be obtained free of charge until the case concludes.

### 5. Expert Examination and Decision

The court typically refers the file to experts from university medical oncology departments to assess whether the drug is necessary for the disease. If the expert report is favourable, SGK may be ordered to pay for the drug.

## Required Documents

| Document | Description |
|---|---|
| Oncology specialist's report | Documents that the drug is vitally important and that no alternative exists |
| Pathology and discharge reports | Show the type and stage of the disease |
| TİTCK application/approval document | Relates to the off-label or foreign drug use process |
| SGK refusal letter or application record | Proof of the pre-litigation application required for the case |
| Invoices and payment receipts | Basis for a reimbursement claim if the drug was purchased out of pocket |

## Duration of Proceedings and Limitation Period

Drug cases filed against SGK generally conclude within an average of **6 to 18 months** in practice; this period can vary depending on the court's workload and the expert examination process. For claims to reclaim the drug cost, a **5-year limitation period** applies under Article 97 of Law No. 5510, running from the date payment was made or SGK refused payment.
      `.trim(),
      seoTitle: 'Does SGK Cover Trodelvy (Sacituzumab Govitecan)? | VGS Law',
      seoDescription:
        'Whether SGK covers Trodelvy, its current 2026 price, the TİTCK approval process, and reclaiming the drug cost through litigation.',
      faq: [
        {
          question: "Does SGK not cover Trodelvy at all?",
          answer:
            'Under the current Health Implementation Communiqué, Trodelvy is not on SGK\'s reimbursement list for any indication; as a result its cost is paid by the patient or claimed through litigation.',
        },
        {
          question: 'Is an application to SGK required before filing a Trodelvy case?',
          answer:
            'Yes. A case can only be filed after a written application has been made to SGK and that application has been refused or has gone unanswered within the statutory period.',
        },
        {
          question: 'How can I obtain the drug while the case is ongoing?',
          answer:
            'If the court grants an interim injunction, the drug cost can be covered by SGK until the case is concluded.',
        },
        {
          question: 'Can a case be filed without TİTCK approval?',
          answer:
            "While obtaining approval strengthens the process, it is not an absolute requirement; a case can be filed even without approval by proving the drug's scientific efficacy and the patient's specific need.",
        },
        {
          question: 'Can I get a refund if I purchased the drug myself?',
          answer:
            'Yes — after applying to SGK with invoices and medical documents and receiving a refusal, a case can be filed to reclaim the amount paid.',
        },
      ],
      merakEdilenler: [
        {
          question: 'How Should a Petition for a Trodelvy SGK Application Be Prepared?',
          answer:
            "The petition should include the application to TİTCK for off-label/foreign drug use and any approval obtained, the oncology specialist's report stating that the drug is necessary for the patient's treatment and that no alternative exists, the prescription, SGK's written pre-litigation application and its refusal or implied refusal, and a request for an interim injunction.",
        },
        {
          question: 'Where Is the Cost of Trodelvy Obtained From?',
          answer:
            "Since Trodelvy is not on SUT's Annex 4/A list, it cannot be obtained through a standard hospital-pharmacy prescription; the drug is generally imported and supplied to the patient through specialised pharmacies or TİTCK's foreign drug procurement mechanism.",
        },
        {
          question: 'Can the Amount Paid for Trodelvy Be Reclaimed?',
          answer:
            'Yes. If the drug cost was initially paid by the patient, a case can be filed to reclaim it after applying to SGK with invoices and medical documents and receiving a refusal; under Article 97 of Law No. 5510, this claim is subject to a 5-year limitation period.',
        },
        {
          question: 'Why Does SGK Refuse Trodelvy Requests?',
          answer:
            "Trodelvy's absence from SUT's Reimbursable Drugs List (Annex 4/A) is, by itself, the ground cited in nearly every refusal. The lack of TİTCK approval does not change the refusal but can weaken the subsequent case file.",
        },
        {
          question: 'Which Court Hears a Trodelvy Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
    },
  },
  {
    slug: 'prexet-sgk-karsiliyor-mu',
    categories: ['SGK İlaç Davası', 'Akıllı Kanser İlaçları', 'İhtiyati Tedbir'],
    featured: false,
    drugName: { tr: 'Prexet', en: 'Prexet' },
    readingTime: 7,
    author: 'Av. Barış Ürün',
    authorSlug: 'baris-urun',
    authorTitle: 'Avukat',
    authorBar: 'Ankara Barosu',
    publishedAt: '2026-08-29',
    related: {
      articles: ['perjeta-sgk-karsiliyor-mu', 'trastuzumab-derukstekan-sgk-ilac-bedeli'],
      ictihat: ['kanser-ilaci-odeme-olcutleri', 'kanser-ilaci-yetkili-mahkeme'],
    },
    tr: {
      title: 'Prexet (Pemetreksed Disodyum) SGK Karşılıyor mu? Ret ve Gecikme Durumunda Yapılacaklar',
      summary:
        "Prexet'in (pemetreksed disodyum) SGK tarafından genel karşılanma durumu, ret veya gecikme yaşandığında izlenecek hukuki yol, gerekli belgeler ve 2026 fiyatı.",
      content: `
Bu listedeki diğer birçok akıllı ilaçtan farklı olarak **Prexet (pemetreksed disodyum)**, SGK'nın Bedeli Ödenecek İlaçlar Listesi'nde (EK-4/A) yer alan ve onaylı endikasyonlarında **genel kural olarak SGK tarafından karşılanan** bir kemoterapi ilacıdır. Bu nedenle Prexet'e ilişkin hukuki uyuşmazlıklar, ilacın "hiç karşılanmaması"ndan değil; sağlık kurulu raporunun usulüne uygun düzenlenmemesi, SUT'ta aranan kombinasyon/basamak şartlarının dışında reçete edilmesi veya SGK'nın belirli bir talebi (ek siklus, doz artışı, farklı hat kullanımı gibi) reddetmesinden kaynaklanmaktadır.

## Prexet (Pemetreksed Disodyum) Nedir?

Pemetreksed, hücre bölünmesi için gerekli folat metabolizmasını bloke ederek etki eden bir **antimetabolit kemoterapi ilacı**dır. Prexet, bu etken maddenin jenerik bir formülasyonudur. Başlıca kullanım alanları:

- **Malign plevral mezotelyoma** (akciğer zarı kanseri), sisplatin ile kombine
- **Nonskuamöz küçük hücreli dışı akciğer kanseri (NSCLC)**, birinci basamak tedavide platin bazlı kemoterapi ile kombine veya idame tedavisinde tek başına

## SGK Prexet'i Genel Olarak Karşılıyor mu?

Evet. Pemetreksed etken maddeli ürünler (Prexet dahil), SUT'un ilgili maddelerinde tanımlanan endikasyon ve kombinasyon şartları sağlandığında **SGK tarafından ödenmektedir**. Uygulamada bu genel kuralın istisnası, aşağıdaki durumlarda ortaya çıkan ret veya gecikmelerdir:

- **Sağlık kurulu raporunun eksik veya SUT'ta aranan ifadeleri (histolojik tip, evre, performans skoru gibi) içermeyecek şekilde düzenlenmesi**,
- İlacın **SUT'ta tanımlanan kombinasyon veya basamak dışında** (örneğin öngörülmeyen bir ilaçla birlikte veya farklı bir tedavi hattında) reçete edilmesi,
- **İdame tedavisinde** öngörülenden farklı bir uygulama sıklığı veya süresi talep edilmesi,
- Reçete edilen doz ile SUT'ta esas alınan doz hesaplama kriterleri arasında farklılık bulunması.

Bu gibi durumlarda SGK, ödemeyi kısmen veya tamamen reddedebilmekte ya da inceleme sürecini uzatarak fiilen gecikmeye yol açabilmektedir.

## Prexet 2026 Fiyatı

Güncel verilere göre Prexet 100 mg flakonun fiyatı yaklaşık **6.750 TL**, 500 mg flakonun fiyatı ise yaklaşık **33.250 TL** seviyesindedir. Doz, hastanın vücut yüzey alanına göre hesaplandığından toplam kür maliyeti kullanılan flakon kombinasyonuna göre değişmektedir. SUT şartlarına uygun kullanımda bu bedelin SGK tarafından karşılanması esastır.

## SGK Ret Verdiğinde veya Geciktirdiğinde İzlenecek Yol

Prexet onaylı endikasyonda ve SUT şartlarına uygun reçete edildiği halde SGK ödemeyi reddediyorsa, bu işlem hukuka aykırıdır ve doğrudan **idari işlemin iptali** istemiyle dava konusu yapılabilir. Süreç genel hatlarıyla şöyle işler:

1. **[Raporun gözden geçirilmesi](/tr/ictihat/kanser-ilaci-odeme-olcutleri) ve gerekirse yenilenmesi:** Ret genellikle raporun SUT'ta aranan ayrıntıları (histoloji, performans skoru, tedavi basamağı) içermemesinden kaynaklanıyorsa, öncelikle eksiksiz bir sağlık kurulu raporu ile yeniden başvuru yapılması önerilir.
2. **SGK'ya yazılı itiraz/başvuru:** Ret kararına karşı SGK İl Müdürlüğü'ne yazılı olarak itiraz edilir; rapor, patoloji sonucu ve tedavi geçmişi eklenir.
3. **İdari başvurunun reddi halinde dava açılması:** Sigortalılık statüsüne göre iş mahkemesi veya idare mahkemesinde, ret işleminin iptali ve ilaç bedelinin karşılanması talebiyle dava açılır.
4. **İhtiyati tedbir talebi:** Tedavinin süreklilik gerektirmesi nedeniyle, dava süresince ilacın kesintisiz temini için ihtiyati tedbir istenebilir.
5. **Bilirkişi incelemesi:** Mahkeme, reçetelenen tedavinin SUT kriterlerine ve tıbbi zorunluluğa uygunluğunu bilirkişiye değerlendirtir.

Eğer uyuşmazlık SUT'ta hiç tanımlanmayan bir kullanım biçimine (gerçek anlamda endikasyon dışı kullanıma) dayanıyorsa, sürece ayrıca TİTCK'dan endikasyon dışı kullanım onayı başvurusu eklenir.

## Gerekli Belgeler

| Belge | Açıklama |
|---|---|
| Sağlık kurulu raporu | Histolojik tip, evre, performans skoru ve tedavi basamağını içermelidir |
| Patoloji ve epikriz raporları | Tanının ve tedavi geçmişinin ispatı |
| SGK ret/itiraz yazışmaları | Dava şartı olan ön başvurunun ispatı |
| TİTCK başvurusu (varsa) | Gerçek endikasyon dışı kullanım söz konusuysa gereklidir |
| Faturalar | İlaç bedeli cepten ödendiyse geri ödeme talebinin dayanağı |

## Dava Süresi

SUT kapsamındaki bir hakkın haksız reddine dayanan davalar, konunun teknik olarak daha sınırlı olması nedeniyle görece daha kısa sürede sonuçlanabilirken, gerçek anlamda endikasyon dışı kullanım iddiası içeren dosyalarda bilirkişi süreci nedeniyle **6-18 ay** arası bir süre söz konusu olabilir.
      `.trim(),
      seoTitle: 'Prexet (Pemetreksed Disodyum) SGK Karşılama Durumu | VGS Hukuk',
      seoDescription:
        "Prexet'in (pemetreksed disodyum) SGK tarafından genel karşılanma durumu, ret veya gecikme yaşandığında izlenecek hukuki yol, gerekli belgeler ve 2026 fiyatı.",
      faq: [
        {
          question: "Prexet'i SGK genel olarak karşılıyor mu?",
          answer:
            "Evet, pemetreksed etken maddeli ürünler SUT'ta tanımlı endikasyonlarda (mezotelyoma, nonskuamöz NSCLC) genel kural olarak SGK tarafından karşılanmaktadır.",
        },
        {
          question: 'SGK, karşıladığı bir ilaç için neden ödeme reddedebilir?',
          answer:
            "Genellikle sağlık kurulu raporunun SUT'ta aranan ayrıntıları içermemesi veya reçetenin tanımlı kombinasyon/basamak dışında olması ret nedenidir.",
        },
        {
          question: 'Rapor eksikse ne yapmalıyım?',
          answer:
            "Öncelikle SUT'ta aranan kriterleri (histoloji, evre, performans skoru) eksiksiz içeren yeni bir sağlık kurulu raporuyla başvurulması, dava açmadan sorunu çözebilir.",
        },
        {
          question: 'SGK ret kararına karşı hangi mahkemede dava açılır?',
          answer: 'Sigortalılık statüsüne göre iş mahkemesi veya idare mahkemesinde dava açılır.',
        },
        {
          question: 'Dava sürerken tedaviye ara vermek zorunda mıyım?',
          answer:
            'Hayır; mahkemeden alınacak ihtiyati tedbir kararıyla dava süresince ilacın kesintisiz teminine devam edilebilir.',
        },
      ],
      merakEdilenler: [
        {
          question: 'Prexet SGK Başvurusu Dilekçesi Nasıl Hazırlanır?',
          answer:
            "Dilekçeye histolojik tip, evre ve performans skorunu içeren sağlık kurulu raporu, patoloji ve epikriz raporları, SGK ile yapılan ret/itiraz yazışmaları ve gerçek anlamda endikasyon dışı kullanım söz konusuysa TİTCK başvurusu eklenmelidir.",
        },
        {
          question: 'Prexet Bedeli Nereden Temin Edilir?',
          answer:
            "Prexet SUT'un EK-4/A listesinde yer aldığından, onaylı endikasyonda ve eksiksiz raporla reçete edildiğinde hastane eczaneleri üzerinden SGK protokolüyle doğrudan karşılanır. Ret veya gecikme yaşanan durumlarda ilaç, itiraz/dava süreci boyunca özel eczanelerden cepten temin edilmek zorunda kalınabilir.",
        },
        {
          question: 'Prexet İçin Ödenen Bedel Geri Alınabilir mi?',
          answer:
            "Evet. Rapor eksikliği veya usule aykırı ret nedeniyle cepten ödenen Prexet bedeli, faturalarla açılacak dava yoluyla geri istenebilir; talep 5510 sayılı Kanun'un 97. maddesindeki 5 yıllık zamanaşımına tabidir.",
        },
        {
          question: 'SGK Prexet Talebini Neden Reddeder?',
          answer:
            "En sık ret gerekçeleri; sağlık kurulu raporunun histolojik tip, evre veya performans skoru gibi SUT'ta aranan ayrıntıları içermemesi, ilacın tanımlı kombinasyon veya tedavi basamağı dışında reçete edilmesi ve idame tedavide öngörülenden farklı bir sıklık veya doz talep edilmesidir.",
        },
        {
          question: 'Prexet Davası Hangi Mahkemede Görülür?',
          answer:
            "SSK veya Bağ-Kur kapsamındaki sigortalılar iş mahkemesinde, 5510 sayılı Kanun'un 4/c maddesi kapsamındaki memur ve memur emeklileri ise idare mahkemesinde dava açar.",
        },
      ],
    },
    en: {
      title: 'Does SGK Cover Prexet (Pemetrexed Disodium)? Refusal & Delay Remedies',
      summary:
        "Prexet's (pemetrexed disodium) general SGK coverage status, the legal route in case of refusal or delay, required documents, and the 2026 price.",
      content: `
Unlike many other targeted drugs on this list, **Prexet (pemetrexed disodium)** is a chemotherapy drug listed on SGK's Reimbursable Drugs List (Annex 4/A) and, within its approved indications, is **covered by SGK as a general rule**. For this reason, legal disputes concerning Prexet do not arise from the drug being "never covered," but from a health board report not being properly prepared, the drug being prescribed outside the combination/treatment-line conditions required by SUT, or SGK refusing a specific request (such as an additional cycle, dose increase, or a different treatment line).

## What Is Prexet (Pemetrexed Disodium)?

Pemetrexed is an **antimetabolite chemotherapy drug** that works by blocking the folate metabolism required for cell division. Prexet is a generic formulation of this active substance. Its main uses are:

- **Malignant pleural mesothelioma** (cancer of the lung lining), combined with cisplatin
- **Non-squamous non-small cell lung cancer (NSCLC)**, combined with platinum-based chemotherapy as first-line treatment, or alone as maintenance therapy

## Does SGK Generally Cover Prexet?

Yes. Products containing pemetrexed (including Prexet) are **paid for by SGK** when the indication and combination conditions defined in the relevant provisions of SUT are met. In practice, the exception to this general rule arises from refusals or delays in the following situations:

- **The health board report is incomplete or does not contain the details required by SUT** (such as histological type, stage, or performance score),
- The drug is prescribed **outside the combination or treatment line defined in SUT** (for example, together with a drug not foreseen, or at a different treatment line),
- A different frequency or duration of administration than foreseen is requested **for maintenance treatment**,
- There is a discrepancy between the prescribed dose and the dose-calculation criteria used as a basis in SUT.

In such cases, SGK may partially or fully refuse payment, or effectively cause a delay by prolonging the review process.

## Prexet 2026 Price

Based on current data, a 100 mg vial of Prexet costs approximately **6,750 TL**, and a 500 mg vial approximately **33,250 TL**. Since dosing is calculated based on the patient's body surface area, the total cost of a cycle varies with the vial combination used. When used in accordance with SUT conditions, this cost is, in principle, covered by SGK.

## Route to Follow When SGK Refuses or Delays Payment

If Prexet is prescribed within an approved indication and in accordance with SUT conditions yet SGK refuses payment, this act is unlawful and can be directly challenged in court by seeking **annulment of the administrative decision**. The process generally works as follows:

1. **[Reviewing the report](/en/ictihat/kanser-ilaci-odeme-olcutleri) and renewing it if necessary:** If the refusal generally stems from the report lacking the details required by SUT (histology, performance score, treatment line), it is advisable to first reapply with a complete health board report.
2. **Written objection/application to SGK:** A written objection to the refusal is filed with the Provincial Directorate of SGK, accompanied by the report, pathology results, and treatment history.
3. **Filing a case if the administrative application is refused:** Depending on the patient's insurance status, a case is filed before the labour court or administrative court, seeking annulment of the refusal and coverage of the drug cost.
4. **Request for an interim injunction:** Because the treatment requires continuity, an interim injunction may be sought so that the drug is supplied without interruption while the case is pending.
5. **Expert examination:** The court has experts assess whether the prescribed treatment complies with SUT's criteria and medical necessity.

If the dispute is based on a mode of use not defined in SUT at all (genuine off-label use), an application to TİTCK for off-label use approval is additionally added to the process.

## Required Documents

| Document | Description |
|---|---|
| Health board report | Must include histological type, stage, performance score, and treatment line |
| Pathology and discharge reports | Proof of diagnosis and treatment history |
| SGK refusal/objection correspondence | Proof of the pre-litigation application required for the case |
| TİTCK application (if any) | Required if genuine off-label use is involved |
| Invoices | Basis for a reimbursement claim if the drug cost was paid out of pocket |

## Duration of Proceedings

Cases based on an unjustified refusal of a right covered by SUT can conclude relatively quickly, as the matter is technically more limited, while files genuinely alleging off-label use can take **6 to 18 months** due to the expert examination process.
      `.trim(),
      seoTitle: 'Does SGK Cover Prexet (Pemetrexed Disodium)? | VGS Law',
      seoDescription:
        "Prexet's (pemetrexed disodium) general SGK coverage status, the legal route in case of refusal or delay, required documents, and the 2026 price.",
      faq: [
        {
          question: 'Does SGK generally cover Prexet?',
          answer:
            'Yes, products containing pemetrexed are, as a general rule, covered by SGK within the indications defined in SUT (mesothelioma, non-squamous NSCLC).',
        },
        {
          question: 'Why would SGK refuse payment for a drug it otherwise covers?',
          answer:
            "The refusal is usually because the health board report lacks the details required by SUT, or because the prescription falls outside the defined combination/treatment line.",
        },
        {
          question: 'What should I do if the report is incomplete?',
          answer:
            'Reapplying with a new health board report that fully includes the criteria required by SUT (histology, stage, performance score) can resolve the issue without litigation.',
        },
        {
          question: "Which court hears a case against SGK's refusal?",
          answer: 'A case is filed before the labour court or the administrative court, depending on the patient\'s insurance status.',
        },
        {
          question: 'Do I have to interrupt treatment while the case is ongoing?',
          answer:
            'No; a court-ordered interim injunction allows uninterrupted supply of the drug to continue while the case is pending.',
        },
      ],
      merakEdilenler: [
        {
          question: 'How Should a Petition for a Prexet SGK Application Be Prepared?',
          answer:
            'The petition should include a health board report stating the histological type, stage, and performance score, pathology and discharge reports, the refusal/objection correspondence with SGK, and, if genuine off-label use is involved, the TİTCK application.',
        },
        {
          question: 'Where Is the Cost of Prexet Obtained From?',
          answer:
            "Since Prexet is listed in SUT's Annex 4/A, it is supplied directly through hospital pharmacies under SGK's protocol when prescribed within the approved indication and supported by a complete report. In cases of refusal or delay, the drug may need to be purchased out of pocket from a private pharmacy during the objection/litigation process.",
        },
        {
          question: 'Can the Amount Paid for Prexet Be Reclaimed?',
          answer:
            "Yes. Prexet costs paid out of pocket due to an incomplete report or an unlawful refusal can be reclaimed through litigation supported by invoices; the claim is subject to the 5-year limitation period under Article 97 of Law No. 5510.",
        },
        {
          question: 'Why Does SGK Refuse Prexet Requests?',
          answer:
            'The most common grounds are a health board report that omits details required by SUT such as histological type, stage, or performance score; a prescription outside the defined combination or treatment line; and a request for a different frequency or dose during maintenance treatment than what is foreseen.',
        },
        {
          question: 'Which Court Hears a Prexet Case?',
          answer:
            'Insured persons under SSK or Bağ-Kur file their case before the labour court, while civil servants and retired civil servants within the scope of Article 4/c of Law No. 5510 file before the administrative court.',
        },
      ],
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

// Articles that cover a specific named drug — backs the dynamic homepage
// title/description and the /ilaclar hub page. A new drug article picks
// this up automatically the moment `drugName` is set above.
type DrugArticle = Article & { drugName: NonNullable<Article['drugName']> }

export function getDrugArticles(): DrugArticle[] {
  return articles.filter((a): a is DrugArticle => Boolean(a.drugName))
}

export function getDrugNames(locale: 'tr' | 'en'): string[] {
  return getDrugArticles().map((a) => (locale === 'en' ? a.drugName.en : a.drugName.tr))
}

// Finds the drug article matching a karar's ilaçAdı/etkenMadde (e.g. karar
// "ENHERTU" / "Trastuzumab Deruxtecan" -> article drugName.tr "Trastuzumab
// Derukstekan"), used to cross-link kararlar detail pages back to their
// drug's article when one exists.
export function getArticleForDrug(ilacAdi: string, etkenMadde?: string): DrugArticle | undefined {
  const norms = [ilacAdi, etkenMadde].filter(Boolean).map((s) => s!.toLowerCase())
  if (norms.length === 0) return undefined
  return getDrugArticles().find((a) => {
    // Match against the generic name and also the article's own title text,
    // since a karar's etken madde spelling (e.g. "Deruxtecan") doesn't always
    // match the article's Turkish transliteration (e.g. "Derukstekan") — the
    // brand name (e.g. "Enhertu"), mentioned in the title, bridges the two.
    const drugTr = a.drugName.tr.toLowerCase()
    const haystack = `${drugTr} ${a.tr.title.toLowerCase()} ${a.tr.seoTitle.toLowerCase()}`
    return norms.some((n) => haystack.includes(n) || n.includes(drugTr))
  })
}
