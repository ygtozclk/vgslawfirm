// Static copy for the /sgk-ilac-davasi pillar page. Section bodies are plain
// text — blank lines separate paragraphs. A section whose body is empty for
// the current locale is not rendered; the FAQ (and its FAQPage JSON-LD) is
// only rendered once it has at least one item.

export interface PillarSection {
  id: string
  heading: { tr: string; en: string }
  body: { tr: string; en: string }
}

export interface PillarFaqItem {
  question: { tr: string; en: string }
  answer: { tr: string; en: string }
}

export const pillarSections: PillarSection[] = [
  {
    id: 'nedir',
    heading: { tr: 'SGK İlaç Davası Nedir?', en: 'What Is an SGK Drug Lawsuit?' },
    body: { tr: '', en: '' },
  },
  {
    id: 'dava-sureci',
    heading: { tr: 'Dava Süreci', en: 'The Litigation Process' },
    body: { tr: '', en: '' },
  },
  {
    id: 'ihtiyati-tedbir',
    heading: { tr: 'İhtiyati Tedbir', en: 'Interim Injunction' },
    body: { tr: '', en: '' },
  },
  {
    id: 'gerekli-belgeler',
    heading: { tr: 'Gerekli Belgeler', en: 'Required Documents' },
    body: { tr: '', en: '' },
  },
  {
    id: 'sureler',
    heading: { tr: 'Süreler', en: 'Time Limits' },
    body: { tr: '', en: '' },
  },
]

export const pillarFaq: PillarFaqItem[] = []
