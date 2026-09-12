import 'server-only'
import fs from 'fs'
import path from 'path'

export interface Karar {
  slug: string
  title: string
  description: string
  category: string
  mahkemeTuru: string
  ilacAdi: string
  etkenMadde?: string
  kararTarihi?: string
  body: string
  anonimNotu: string
}

const KARARLAR_DIR = path.join(process.cwd(), 'content', 'kararlar')

function parseFm(raw: string): Record<string, string> {
  const result: Record<string, string> = {}
  for (const line of raw.split('\n')) {
    const ci = line.indexOf(':')
    if (ci === -1) continue
    const key = line.slice(0, ci).trim()
    if (!key) continue
    const val = line.slice(ci + 1).trim()
    const m = val.match(/^"(.*)"$/) ?? val.match(/^'(.*)'$/)
    result[key] = m ? m[1] : val
  }
  return result
}

function extractMahkemeTuru(slug: string): string {
  if (slug.includes('idare-mahkemesi')) return 'İdare Mahkemesi'
  if (slug.includes('is-mahkemesi')) return 'İş Mahkemesi'
  return ''
}

// Titles follow "<Hastalık> - <İLAÇ ADI> (<etken madde>)? İçin|Hakkında ..."
function extractDrug(title: string): { ilacAdi: string; etkenMadde?: string } {
  const m = title.match(/ - (.+?) (İçin|Hakkında)/)
  if (!m) return { ilacAdi: '' }
  const segment = m[1].trim()
  const paren = segment.match(/^(.+?)\s*\(([^)]+)\)$/)
  if (paren) return { ilacAdi: paren[1].trim(), etkenMadde: paren[2].trim() }
  return { ilacAdi: segment }
}

function extractKararTarihi(body: string): string | undefined {
  const flat = body.replace(/\s+/g, ' ')
  let m = flat.match(/KARAR TARİHİ\s*:\s*(\d{2})\/(\d{2})\/(\d{4})/)
  if (!m) m = flat.match(/(\d{2})[/.](\d{2})[/.](\d{4})\s*tarihinde[^.]*?karar verildi/i)
  if (!m) return undefined
  const [, dd, mm, yyyy] = m
  return `${yyyy}-${mm}-${dd}`
}

// Strips the repeated page-break running headers found in the raw court
// documents (e.g. "T.C. / ANKARA / 7. İDARE MAHKEMESİ / ESAS NO : .. / KARAR
// NO : .." for idare mahkemesi decisions, or a single-line "T.C. ANKARA 33.
// İŞ MAHKEMESİ   Esas-Karar No: .." for iş mahkemesi decisions) so the
// rendered body reads as continuous prose instead of repeating the case
// caption every "page".
function stripRunningHeaders(body: string): string {
  const idareBlock =
    /\n[ \t]*T\.C\.[ \t]*\n[ \t]*[A-ZÇĞİÖŞÜ][A-ZÇĞİÖŞÜ \t]*\n[ \t]*\d*\.?[ \t]*[A-ZÇĞİÖŞÜ\s]*(?:İDARE|İŞ) MAHKEMESİ[ \t]*\n(?:[ \t]*\n)?(?:[ \t]*ESAS NO[ \t]*:[^\n]*\n?)?(?:[ \t]*KARAR NO[ \t]*:[^\n]*\n?)?/g
  const isBlock = /\n[ \t]*T\.C\.\s+[A-ZÇĞİÖŞÜ0-9.\s]+(?:İŞ|İDARE) MAHKEMESİ\s+Esas-Karar No\s*:[^\n]*/g
  return body.replace(idareBlock, '\n').replace(isBlock, '\n')
}

function stripFooter(body: string): { content: string; note: string } {
  const idx = body.lastIndexOf('\n---\n')
  if (idx === -1) return { content: body.trim(), note: '' }
  const content = body.slice(0, idx).trim()
  const noteRaw = body.slice(idx + 5).trim()
  const note = noteRaw.replace(/^\*/, '').replace(/\*$/, '').trim()
  return { content, note }
}

function readKarar(filePath: string, slugFromFile: string): Karar {
  // Source documents carry literal form-feed page-break characters from the
  // original PDF export — normalise them to newlines before any parsing.
  const raw = fs.readFileSync(filePath, 'utf-8').replace(/\f/g, '\n')
  const fmStart = raw.indexOf('---\n')
  const fmEnd = raw.indexOf('\n---\n', fmStart + 4)
  const fm = fmStart === 0 && fmEnd !== -1 ? parseFm(raw.slice(4, fmEnd)) : {}
  const rawBody = fmStart === 0 && fmEnd !== -1 ? raw.slice(fmEnd + 5) : raw

  const slug = fm.slug || slugFromFile
  const title = fm.title || ''
  const { content, note } = stripFooter(rawBody)
  const withoutHeading = content.replace(/^#\s+.+\n+/, '')
  const body = stripRunningHeaders(withoutHeading).trim()

  const { ilacAdi, etkenMadde } = extractDrug(title)

  return {
    slug,
    title,
    description: fm.description || '',
    category: fm.category || '',
    mahkemeTuru: extractMahkemeTuru(slug),
    ilacAdi,
    etkenMadde,
    kararTarihi: extractKararTarihi(body),
    body,
    anonimNotu: note,
  }
}

let _cache: Karar[] | null = null

export function getAllKararlar(): Karar[] {
  if (_cache) return _cache
  const items = fs
    .readdirSync(KARARLAR_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readKarar(path.join(KARARLAR_DIR, f), f.slice(0, -3)))
  items.sort((a, b) => (b.kararTarihi ?? '').localeCompare(a.kararTarihi ?? ''))
  _cache = items
  return items
}

export function getKararBySlug(slug: string): Karar | undefined {
  return getAllKararlar().find((k) => k.slug === slug)
}

// Matches kararlar whose ilaçAdı corresponds to the given drug article's
// drugName (case-insensitive, tolerant of partial matches e.g. "Trastuzumab
// Derukstekan" article vs. "ENHERTU (Trastuzumab Deruxtecan)" karar).
export function getKararlarForDrug(drugNameTr: string): Karar[] {
  const norm = drugNameTr.toLowerCase()
  return getAllKararlar().filter((k) => {
    const ilac = k.ilacAdi.toLowerCase()
    const etken = (k.etkenMadde ?? '').toLowerCase()
    return (
      ilac.includes(norm) || norm.includes(ilac) || etken.includes(norm) || norm.includes(etken)
    )
  })
}
