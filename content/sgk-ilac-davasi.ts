// Static copy for the /sgk-ilac-davasi pillar page. Bodies are plain text —
// blank lines separate blocks; a block whose lines start with "1. " renders as
// an ordered list, "- " as a bullet list, and **text** as bold. A section or
// FAQ item that is empty for the current locale is not rendered; the FAQPage
// JSON-LD is only emitted once at least one FAQ item exists.

export interface PillarSection {
  id: string
  heading: { tr: string; en: string }
  body: { tr: string; en: string }
}

export interface PillarFaqItem {
  question: { tr: string; en: string }
  answer: { tr: string; en: string }
}

// Lead paragraph shown in the page hero (falls back to the default subline)
export const pillarIntro: { tr: string; en: string } = {
  tr: "Bazı kanser ilaçları Türkiye'de ruhsatlı olmasına veya yurt dışından temin edilebilmesine rağmen SGK'nın Bedeli Ödenecek İlaçlar Listesi'nde (EK-4/A) yer almaz ya da yalnızca belirli endikasyonlarda ödenir. Bu durumda hekimin reçete ettiği ilacın bedeli hastaya kalır. SGK ilaç davası, bu tür ilaçların bedelinin SGK tarafından karşılanması ve daha önce ödenen bedellerin iadesi için açılan davadır.",
  en: '',
}

export const pillarSections: PillarSection[] = [
  {
    id: 'nedir',
    heading: { tr: 'SGK İlaç Davası Nedir?', en: 'What Is an SGK Drug Lawsuit?' },
    body: {
      tr: `SGK ilaç davası, hekim tarafından tedavi için gerekli görülen bir ilacın bedelinin SGK tarafından karşılanmasına ilişkin başvurunun reddedilmesi üzerine, bu ret işleminin iptali ve ilaç bedelinin karşılanması talebiyle açılan davadır. Davada çoğunlukla ilacın ileriye dönük olarak tedavi süresince karşılanması ile dava öncesinde hasta tarafından ödenen bedellerin yasal faiziyle iadesi birlikte talep edilir.

Uygulamada SGK'nın ret gerekçeleri genellikle ilacın Bedeli Ödenecek İlaçlar Listesi'nde yer almaması, Sağlık Uygulama Tebliği'nde (SUT) öngörülen kullanım ilkelerine uygun olmaması veya ilacın endikasyon dışı kullanılmasıdır. Mahkemeler ise ilacın hasta için tıbben gerekli olup olmadığını, muadilinin bulunup bulunmadığını ve hastanın yaşam hakkı ile sosyal güvenlik hakkını birlikte değerlendirmektedir.`,
      en: '',
    },
  },
  {
    id: 'dava-sureci',
    heading: { tr: 'Dava Süreci Nasıl İşler?', en: 'How Does the Litigation Process Work?' },
    body: {
      tr: `1. **SGK'ya başvuru:** Reçete, sağlık kurulu raporu ve gerekli belgelerle SGK'ya ilaç bedelinin karşılanması için yazılı başvuru yapılır.
2. **Ret işlemi:** SGK başvuruyu reddeder veya süresi içinde cevap vermez.
3. **Dava açılması:** Hastanın sigortalılık statüsüne göre iş mahkemesinde veya idare mahkemesinde dava açılır.
4. **Geçici koruma talebi:** Tedavinin aksamaması için dava dilekçesiyle birlikte ihtiyati tedbir (iş mahkemesi) veya yürütmenin durdurulması (idare mahkemesi) talep edilir.
5. **Bilirkişi / sağlık kurulu incelemesi:** Mahkeme, ilacın hasta için tıbben gerekli olup olmadığını, standart tedavilerle sonuç alınıp alınamayacağını ve muadil bulunup bulunmadığını üniversite veya eğitim araştırma hastanesi onkoloji uzmanlarından oluşan kurula değerlendirtir.
6. **Karar:** Mahkeme, ret işleminin iptaline, ilaç bedelinin karşılanmasına ve ödenen bedellerin iadesine karar verebilir. İlk derece kararlarına karşı kanun yoluna başvurulabilir.`,
      en: '',
    },
  },
  {
    id: 'gorevli-mahkeme',
    heading: { tr: 'İş Mahkemesi mi, İdare Mahkemesi mi?', en: 'Labour Court or Administrative Court?' },
    body: {
      tr: `Görevli mahkeme hastanın sigortalılık statüsüne göre belirlenir. Uygulamada 4/a (SSK) ve 4/b (Bağ-Kur) kapsamındaki sigortalılar ve bunların bakmakla yükümlü olduğu kişiler bakımından davalar iş mahkemesinde, kamu görevlileri ve Emekli Sandığı kapsamındaki kişiler bakımından ise idare mahkemesinde görülmektedir. Yanlış mahkemede dava açılması zaman kaybına yol açabileceğinden, statünün dava öncesinde doğru tespit edilmesi önemlidir.`,
      en: '',
    },
  },
  {
    id: 'ihtiyati-tedbir',
    heading: { tr: 'İhtiyati Tedbir ve Yürütmenin Durdurulması', en: 'Interim Injunction and Stay of Execution' },
    body: {
      tr: `Kanser tedavisinde zaman kritik olduğundan, davanın sonuçlanması beklenirken ilacın temin edilebilmesi için geçici hukuki koruma talep edilir. İş mahkemesinde bu talep ihtiyati tedbir (HMK m. 389 vd.), idare mahkemesinde ise yürütmenin durdurulması (İYUK m. 27) şeklindedir. Mahkemeler, ilacın hayati önemde olduğunu ve muadilinin bulunmadığını gösteren hekim raporları bulunduğunda bu talepleri dava açıldıktan kısa süre sonra değerlendirebilmektedir. Geçici koruma kararları davanın esasına ilişkin kesin bir sonuç değildir.`,
      en: '',
    },
  },
  {
    id: 'gerekli-belgeler',
    heading: { tr: 'Gerekli Belgeler', en: 'Required Documents' },
    body: {
      tr: `- Tedaviyi yürüten hekimlerce düzenlenen sağlık kurulu raporu (ilacın gerekliliği, muadil bulunmadığı ve kullanılmaması halinde doğacak riskler)
- Reçete ve epikriz / patoloji raporları
- Yurt dışından temin edilen veya endikasyon dışı kullanılan ilaçlarda TİTCK onay yazısı
- SGK'ya yapılan başvuru ve SGK'nın ret yazısı
- İlaç daha önce kendi imkanlarınızla alındıysa fatura ve ödeme belgeleri`,
      en: '',
    },
  },
  {
    id: 'sureler',
    heading: { tr: 'Süreler', en: 'Time Limits' },
    body: {
      tr: `İdare mahkemesinde açılacak davalarda, kural olarak ret işleminin tebliğinden itibaren 60 günlük dava açma süresi bulunmaktadır. İş mahkemesinde açılacak davalarda ise SGK'ya başvuru yapılmış ve ret cevabı alınmış olması dava şartıdır. Geçici koruma kararlarına karşı itiraz süreleri kısa olduğundan (çoğunlukla 7 gün veya 1 hafta) sürecin yakından takip edilmesi gerekir. Somut durumunuza uygulanacak süreler için hukuki değerlendirme yapılması önerilir.`,
      en: '',
    },
  },
]

export const pillarFaq: PillarFaqItem[] = [
  {
    question: { tr: "SGK'nın ödemediği kanser ilacı için dava açılabilir mi?", en: '' },
    answer: {
      tr: 'Evet. Hekim tarafından tedavi için gerekli görülen bir ilacın bedelinin karşılanması talebi SGK tarafından reddedilirse, ret işleminin iptali ve ilaç bedelinin karşılanması için dava açılabilir.',
      en: '',
    },
  },
  {
    question: { tr: 'İlacı kendi imkanlarımla aldım, parasını geri alabilir miyim?', en: '' },
    answer: {
      tr: 'Dava öncesinde ödenen ilaç bedellerinin iadesi de davada talep edilebilir. Mahkemeler, yayımladığımız kararlarda da görüldüğü üzere, ödenen bedellerin başvuru veya ödeme tarihinden itibaren yasal faiziyle iadesine karar verebilmektedir. Bunun için fatura ve ödeme belgelerinin saklanması gerekir.',
      en: '',
    },
  },
  {
    question: { tr: 'Dava sürerken ilaca nasıl ulaşırım?', en: '' },
    answer: {
      tr: 'Dava dilekçesiyle birlikte ihtiyati tedbir veya yürütmenin durdurulması talep edilebilir. Bu talebin kabulü halinde ilaç bedeli dava süresince veya kararda belirtilen süre boyunca SGK tarafından karşılanır.',
      en: '',
    },
  },
  {
    question: { tr: "İlaç Türkiye'de ruhsatlı değilse dava açılabilir mi?", en: '' },
    answer: {
      tr: "Yurt dışından temin edilen ilaçlar için TİTCK onayı alınarak ilaç Türk Eczacıları Birliği aracılığıyla getirtilebilmektedir. İlacın Türkiye'de ruhsatlı olmaması veya SUT kapsamında bulunmaması tek başına davayı engellemez.",
      en: '',
    },
  },
  {
    question: { tr: 'Hasta vefat ederse dava ne olur?', en: '' },
    answer: {
      tr: 'Hastanın vefatı halinde mirasçılar davayı sürdürebilir ve hasta tarafından ödenen ilaç bedellerinin iadesini talep edebilir.',
      en: '',
    },
  },
  {
    question: { tr: 'Dava ne kadar sürer?', en: '' },
    answer: {
      tr: 'Süre mahkemenin iş yükü ve bilirkişi incelemesine göre değişir. Geçici koruma talepleri genellikle kısa sürede değerlendirilirken, davanın esasına ilişkin karar aylar sürebilir.',
      en: '',
    },
  },
]

// Closing disclaimer shown at the end of the page
export const pillarNote: { tr: string; en: string } = {
  tr: 'Bu sayfadaki bilgiler genel bilgilendirme amaçlıdır ve hukuki görüş niteliği taşımaz. Somut durumunuzun değerlendirilmesi için VGS Hukuk & Danışmanlık ile iletişime geçebilirsiniz.',
  en: '',
}
