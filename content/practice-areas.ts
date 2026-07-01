export interface PracticeArea {
  slug: 'ozel-hukuk' | 'kamu-hukuku' | 'ceza-hukuku' | 'kvkk'
  number: string
  tr: {
    title: string
    shortDesc: string
    fullDesc: string
    seoTitle: string
    seoDescription: string
  }
  en: {
    title: string
    shortDesc: string
    fullDesc: string
    seoTitle: string
    seoDescription: string
  }
}

export const practiceAreas: PracticeArea[] = [
  {
    slug: 'ozel-hukuk',
    number: '01',
    tr: {
      title: 'Özel Hukuk',
      shortDesc:
        'Eşit düzeydeki hukuk özneleri arasındaki uyuşmazlıklarda, dava öncesi ve sonrasında hukuki danışmanlık.',
      fullDesc:
        'Eşit düzeydeki her bir hukuk öznesinin birbirleriyle olan hukuki ilişkilerinden doğan uyuşmazlıklarda, dava yolu öncesinde ve sonrasında hukuki danışmanlık hizmeti sunuyoruz.',
      seoTitle: 'Özel Hukuk | VGS Hukuk & Danışmanlık',
      seoDescription:
        'Sözleşmeler, iş hukuku ve özel uyuşmazlıklarda dava öncesi ve sonrasına yönelik hukuki danışmanlık. VGS Hukuk & Danışmanlık, Ankara.',
    },
    en: {
      title: 'Private Law',
      shortDesc:
        'Legal consultancy before and after litigation in disputes between legal subjects of equal standing.',
      fullDesc:
        'We provide legal consultancy before and after litigation in disputes arising from the legal relationships between legal subjects of equal standing.',
      seoTitle: 'Private Law | VGS Law & Consultancy',
      seoDescription:
        'Contract, labour, and private dispute legal consultancy before and after litigation. VGS Law & Consultancy, Ankara.',
    },
  },
  {
    slug: 'kamu-hukuku',
    number: '02',
    tr: {
      title: 'Kamu Hukuku',
      shortDesc:
        'İdari yargıda iptal ve tam yargı davaları, idari sözleşmelerden doğan uyuşmazlıklar ve tazminat talepleri.',
      fullDesc:
        'İdari yargıda iptal ve tam yargı davaları, idari sözleşmelerden kaynaklanan uyuşmazlıklar ve tazminat davaları başta olmak üzere; idari başvuru, yargı yoluna başvuru ve sonraki aşamalara ilişkin hukuki danışmanlık sağlıyoruz.',
      seoTitle: 'Kamu Hukuku | VGS Hukuk & Danışmanlık',
      seoDescription:
        'İdare mahkemelerinde iptal ve tam yargı davaları, idari sözleşme uyuşmazlıkları ve tazminat talepleri. VGS Hukuk & Danışmanlık, Ankara.',
    },
    en: {
      title: 'Public Law',
      shortDesc:
        'Administrative jurisdiction: annulment and full-remedy actions, administrative contract disputes, and compensation claims.',
      fullDesc:
        'We provide legal consultancy on annulment and full-remedy actions in administrative courts, disputes arising from administrative contracts and compensation claims, including administrative applications and all judicial stages.',
      seoTitle: 'Public Law | VGS Law & Consultancy',
      seoDescription:
        'Administrative court actions, contract disputes, and compensation claims. VGS Law & Consultancy, Ankara.',
    },
  },
  {
    slug: 'ceza-hukuku',
    number: '03',
    tr: {
      title: 'Ceza Hukuku',
      shortDesc:
        'Basit ve nitelikli suçlarda soruşturma ve kovuşturma aşamalarında profesyonel hukuki destek.',
      fullDesc:
        'Basit ve nitelikli suçlar bakımından, soruşturma ve kovuşturma aşamalarında müvekkillerimize profesyonel hukuki destek sunuyoruz.',
      seoTitle: 'Ceza Hukuku | VGS Hukuk & Danışmanlık',
      seoDescription:
        'Soruşturma ve kovuşturma aşamalarında ceza avukatlığı hizmetleri. VGS Hukuk & Danışmanlık, Ankara.',
    },
    en: {
      title: 'Criminal Law',
      shortDesc:
        'Representation for simple and qualified offences during the investigation and prosecution phases.',
      fullDesc:
        'We provide professional legal support to our clients during the investigation and prosecution phases for simple and qualified criminal offences.',
      seoTitle: 'Criminal Law | VGS Law & Consultancy',
      seoDescription:
        'Criminal defence representation during investigation and prosecution. VGS Law & Consultancy, Ankara.',
    },
  },
  {
    slug: 'kvkk',
    number: '04',
    tr: {
      title: 'KVKK',
      shortDesc:
        '6698 sayılı Kanun kapsamında veri sorumlularına uyum programı ve mevzuata uygunluk danışmanlığı.',
      fullDesc:
        '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında "veri sorumlusu" niteliğindeki gerçek ve tüzel kişilere; yasal yükümlülükleri çerçevesinde hukuki hizmet veriyor, uyum programı kapsamında gerekli düzenlemelerin yapılmasında profesyonel destek sağlıyoruz.',
      seoTitle: 'KVKK Danışmanlığı | VGS Hukuk & Danışmanlık',
      seoDescription:
        'Veri sorumluları için KVKK uyum programı, politika hazırlığı ve yasal yükümlülük danışmanlığı. VGS Hukuk & Danışmanlık, Ankara.',
    },
    en: {
      title: 'Personal Data Protection (KVKK)',
      shortDesc:
        'Services for data controllers under Law No. 6698, including compliance-programme drafting and regulatory obligations.',
      fullDesc:
        'We provide legal services and professional compliance support to natural and legal persons in the capacity of "data controller" within the scope of Law No. 6698 on the Protection of Personal Data (KVKK), covering all regulatory obligations.',
      seoTitle: 'KVKK (Data Protection) | VGS Law & Consultancy',
      seoDescription:
        'KVKK compliance programmes, policy drafting, and regulatory advisory for data controllers. VGS Law & Consultancy, Ankara.',
    },
  },
]
