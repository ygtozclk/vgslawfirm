import 'server-only'
import { getDrugArticles } from '@/content/articles'
import { getAllKararlar, type Karar } from '@/content/kararlar'

// Unified drug list built from both drug articles (content/articles.ts) and
// kararlar (content/kararlar/*.md). Backs the homepage title, the /ilaclar hub
// and the /sgk-ilac-davasi pillar page.
//
// Order follows search volume — high-volume brands first. Each entry lists the
// lowercase terms (brand + etken madde spellings) used to match an article's
// drugName/title or a karar's frontmatter title to it, so e.g. "Trastuzumab
// Derukstekan" (article) and "ENHERTU (Trastuzumab Deruxtecan)" (karar)
// collapse into a single "Enhertu" entry.
const DRUG_REGISTRY: { key: string; tr: string; en: string; terms: string[] }[] = [
  { key: 'keytruda', tr: 'Keytruda', en: 'Keytruda', terms: ['keytruda', 'pembrolizumab'] },
  { key: 'enhertu', tr: 'Enhertu', en: 'Enhertu', terms: ['enhertu', 'trastuzumab derukstekan', 'trastuzumab deruxtecan'] },
  { key: 'imfinzi', tr: 'Imfinzi', en: 'Imfinzi', terms: ['imfinzi', 'durvalumab'] },
  { key: 'tecentriq', tr: 'Tecentriq', en: 'Tecentriq', terms: ['tecentriq', 'atezolizumab'] },
  { key: 'opdivo', tr: 'Opdivo (Nivolumab)', en: 'Opdivo (Nivolumab)', terms: ['opdivo', 'nivolumab'] },
  { key: 'perjeta', tr: 'Perjeta', en: 'Perjeta', terms: ['perjeta', 'pertuzumab'] },
  { key: 'trodelvy', tr: 'Trodelvy', en: 'Trodelvy', terms: ['trodelvy', 'sacituzumab'] },
  { key: 'lumakras', tr: 'Lumakras', en: 'Lumakras', terms: ['lumakras', 'sotorasib'] },
  { key: 'padcev', tr: 'Padcev', en: 'Padcev', terms: ['padcev', 'enfortumab'] },
  { key: 'erbitux', tr: 'Erbitux', en: 'Erbitux', terms: ['erbitux', 'cetuksimab', 'cetuximab'] },
  { key: 'bevax', tr: 'Bevax', en: 'Bevax', terms: ['bevax'] },
  { key: 'prexet', tr: 'Prexet', en: 'Prexet', terms: ['prexet'] },
  { key: 'yulareb', tr: 'Yulareb', en: 'Yulareb', terms: ['yulareb'] },
]

export interface Drug {
  key: string
  name: { tr: string; en: string }
  articleSlug?: string
  // Newest first (inherits getAllKararlar() ordering)
  kararlar: Karar[]
}

// Turkish-safe lowercase: "TECENTRİQ".toLowerCase() would otherwise yield a
// combining dot ("tecentri̇q") and break substring matches.
export function normalizeDrugText(s: string): string {
  return s.replace(/İ/g, 'I').replace(/ı/g, 'i').toLowerCase()
}

function matchesTerms(text: string, terms: string[]): boolean {
  const norm = normalizeDrugText(text)
  return terms.some((t) => norm.includes(t))
}

let _cache: Drug[] | null = null

export function getAllDrugs(): Drug[] {
  if (_cache) return _cache
  const articles = getDrugArticles()
  const kararlar = getAllKararlar()
  const usedArticles = new Set<string>()

  const drugs: Drug[] = []
  for (const entry of DRUG_REGISTRY) {
    const article = articles.find((a) =>
      matchesTerms(`${a.drugName.tr} ${a.drugName.en} ${a.tr.title}`, entry.terms)
    )
    if (article) usedArticles.add(article.slug)
    const matched = kararlar.filter((k) => matchesTerms(k.title, entry.terms))
    if (!article && matched.length === 0) continue
    drugs.push({
      key: entry.key,
      name: { tr: entry.tr, en: entry.en },
      articleSlug: article?.slug,
      kararlar: matched,
    })
  }

  // Drug articles added later without a registry entry are still listed
  // (appended at the end) so nothing silently drops off the title/hub.
  for (const a of articles) {
    if (usedArticles.has(a.slug)) continue
    drugs.push({
      key: a.slug,
      name: { tr: a.drugName.tr, en: a.drugName.en },
      articleSlug: a.slug,
      kararlar: kararlar.filter((k) => matchesTerms(k.title, [normalizeDrugText(a.drugName.tr)])),
    })
  }

  _cache = drugs
  return drugs
}

export function getDrugNames(locale: 'tr' | 'en'): string[] {
  return getAllDrugs().map((d) => d.name[locale])
}

// Article page when one exists, otherwise the drug's most recent karar.
export function getDrugHref(drug: Drug, locale: string): string {
  if (drug.articleSlug) return `/${locale}/yayinlar/${drug.articleSlug}`
  return `/${locale}/kararlarimiz/${drug.kararlar[0].slug}`
}

// Serializable shape for DrugLinkList
export function getDrugLinks(locale: 'tr' | 'en') {
  return getAllDrugs().map((d) => ({
    key: d.key,
    name: d.name[locale],
    href: getDrugHref(d, locale),
    kararCount: d.kararlar.length,
  }))
}

export function getDrugForKarar(karar: Karar): Drug | undefined {
  return getAllDrugs().find((d) => d.kararlar.some((k) => k.slug === karar.slug))
}

export function getRelatedKararlar(karar: Karar): Karar[] {
  const drug = getDrugForKarar(karar)
  if (!drug) return []
  return drug.kararlar.filter((k) => k.slug !== karar.slug)
}
