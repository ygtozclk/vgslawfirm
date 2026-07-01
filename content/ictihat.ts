import 'server-only'
import fs from 'fs'
import path from 'path'

export interface Ictihat {
  slug: string
  daire: string
  esasNo: string
  kararNo: string
  kararTarihi: string
  konu: string
  ozet?: string
  etiketler: string[]
  kaynakURL: string
  sonKontrol: string
  uyusmazlik: string
  kararTamMetni?: string
  hukukiDegerlendirme: string
  kararOzu: string
}

const ICTIHAT_DIR = path.join(process.cwd(), 'content', 'ictihat')

function parseFm(raw: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const line of raw.split('\n')) {
    const ci = line.indexOf(':')
    if (ci === -1) continue
    const key = line.slice(0, ci).trim()
    if (!key) continue
    const val = line.slice(ci + 1).trim()
    if (val.startsWith('[')) {
      const m = val.match(/"([^"]*?)"/g)
      result[key] = m ? m.map((s) => s.slice(1, -1)) : []
    } else {
      const m = val.match(/^"(.*)"$/) ?? val.match(/^'(.*)'$/)
      result[key] = m ? m[1] : val
    }
  }
  return result
}

// Strip trailing "---\n...*disclaimer*" footer common in these MDX files
function stripFooter(body: string): string {
  const idx = body.lastIndexOf('\n---\n')
  return idx !== -1 ? body.slice(0, idx) : body
}

function parseSections(body: string): Record<string, string> {
  const out: Record<string, string> = {}
  // Prepend \n so the first section starts with \n## like the rest
  const parts = ('\n' + body).split(/\n## /)
  for (const part of parts.slice(1)) {
    const nl = part.indexOf('\n')
    if (nl === -1) continue
    const heading = part.slice(0, nl).trim()
    if (!heading) continue
    out[heading] = part.slice(nl + 1).trimEnd()
  }
  return out
}

// "Sonuç" is the summary heading used in newer records; maps to the same field as "Kararın Özü"
const SECTION_FIELD: Record<string, keyof Ictihat> = {
  'Uyuşmazlık':           'uyusmazlik',
  'Kararın Tam Metni':    'kararTamMetni',
  'Hukuki Değerlendirme': 'hukukiDegerlendirme',
  'Kararın Özü':          'kararOzu',
  'Sonuç':                'kararOzu',
}

function readMdx(filePath: string, slug: string): Ictihat {
  const raw = fs.readFileSync(filePath, 'utf-8')

  const fmStart = raw.indexOf('---\n')
  const fmEnd   = raw.indexOf('\n---\n', fmStart + 4)
  const fm      = fmStart === 0 && fmEnd !== -1 ? parseFm(raw.slice(4, fmEnd)) : {}
  const rawBody = fmStart === 0 && fmEnd !== -1 ? raw.slice(fmEnd + 5) : raw

  const sections = parseSections(stripFooter(rawBody))

  const record: Ictihat = {
    slug,
    daire:               String(fm.daire       ?? ''),
    esasNo:              String(fm.esasNo      ?? ''),
    kararNo:             String(fm.kararNo     ?? ''),
    kararTarihi:         String(fm.kararTarihi ?? ''),
    konu:                String(fm.konu        ?? ''),
    etiketler:           Array.isArray(fm.etiketler) ? (fm.etiketler as string[]) : [],
    kaynakURL:           String(fm.kaynakURL   ?? ''),
    sonKontrol:          String(fm.sonKontrol  ?? ''),
    uyusmazlik:          '',
    hukukiDegerlendirme: '',
    kararOzu:            '',
  }

  if (fm.ozet) record.ozet = String(fm.ozet)

  for (const [heading, content] of Object.entries(sections)) {
    const field = SECTION_FIELD[heading]
    if (field) (record as unknown as Record<string, unknown>)[field] = content
  }

  return record
}

// Module-level cache — safe for static builds; cleared on process restart in dev
let _cache: Ictihat[] | null = null

export function getAllIctihat(): Ictihat[] {
  if (_cache) return _cache
  const items = fs
    .readdirSync(ICTIHAT_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => readMdx(path.join(ICTIHAT_DIR, f), f.slice(0, -4)))
  items.sort(
    (a, b) => new Date(b.kararTarihi).getTime() - new Date(a.kararTarihi).getTime()
  )
  _cache = items
  return items
}

export function getIctihatBySlug(slug: string): Ictihat | undefined {
  return getAllIctihat().find((i) => i.slug === slug)
}

export function getAllIctihatTags(): string[] {
  const tags = new Set<string>()
  getAllIctihat().forEach((i) => i.etiketler.forEach((t) => tags.add(t)))
  return Array.from(tags)
}
