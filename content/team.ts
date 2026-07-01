export interface Attorney {
  id: string
  slug: string
  tr: {
    name: string
    title: string
    education: string
    languages: string[]
    practiceAreas: string[]
    bar: string
  }
  en: {
    name: string
    title: string
    education: string
    languages: string[]
    practiceAreas: string[]
    bar: string
  }
  contact: {
    phone: string
    email: string
    linkedin?: string
  }
}

export const team: Attorney[] = [
  {
    id: 'baris-urun',
    slug: 'baris-urun',
    tr: {
      name: 'Av. Barış Ürün',
      title: 'Avukat',
      education: 'Atılım Üniversitesi',
      languages: ['Türkçe', 'İngilizce'],
      practiceAreas: [
        'Sözleşmeler Hukuku',
        'İş Hukuku',
        'Kişisel Verilerin Korunması Hukuku',
        'Rekabet Hukuku',
      ],
      bar: 'Ankara Barosu',
    },
    en: {
      name: 'Av. Barış Ürün',
      title: 'Attorney',
      education: 'Atılım University',
      languages: ['Turkish', 'English'],
      practiceAreas: [
        'Contract Law',
        'Labour Law',
        'Personal Data Protection Law',
        'Competition Law',
      ],
      bar: 'Ankara Bar Association',
    },
    contact: {
      phone: '+90 539 659 5584',
      email: 'baris.urun@vgshukuk.com',
      linkedin: 'https://linkedin.com/in/avbaris',
    },
  },
  {
    id: 'dilek-ozaslan',
    slug: 'dilek-ozaslan',
    tr: {
      name: 'Dilek Özaslan',
      title: 'Arabulucu Avukat',
      education: 'Ankara Üniversitesi',
      languages: ['Türkçe'],
      practiceAreas: [
        'İcra İflas Hukuku',
        'Aile Hukuku',
        'Miras Hukuku',
        'Ticaret Hukuku',
      ],
      bar: 'Ankara Barosu',
    },
    en: {
      name: 'Dilek Özaslan',
      title: 'Mediator Attorney',
      education: 'Ankara University',
      languages: ['Turkish'],
      practiceAreas: [
        'Enforcement and Bankruptcy Law',
        'Family Law',
        'Inheritance Law',
        'Commercial Law',
      ],
      bar: 'Ankara Bar Association',
    },
    contact: {
      phone: '+90 532 769 20 84',
      email: 'dilek.ozaslan@vgshukuk.com',
    },
  },
]
