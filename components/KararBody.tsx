interface KararBodyProps {
  body: string
  mahkemeTuru: string
}

type Block =
  | { type: 'heading'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'p'; text: string }

function splitCaptionAndNarrative(body: string, mahkemeTuru: string): { caption: string; narrative: string } {
  const lines = body.split('\n')

  if (mahkemeTuru === 'İdare Mahkemesi') {
    const idx = lines.findIndex((l) => l.trim() === 'TÜRK MİLLETİ ADINA')
    if (idx !== -1) {
      return {
        caption: lines.slice(0, idx).join('\n').trim(),
        narrative: lines.slice(idx).join('\n').trim(),
      }
    }
  }

  // İş Mahkemesi captions carry only short fields (names, dates, roles); the
  // narrative always opens with a long, colon-free sentence.
  let splitAt = lines.length
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim()
    if (!trimmed) continue
    if (trimmed.includes(':')) continue
    if (trimmed.length < 50) continue
    splitAt = i
    break
  }
  return {
    caption: lines.slice(0, splitAt).join('\n').trim(),
    narrative: lines.slice(splitAt).join('\n').trim(),
  }
}

// Everything after the operative "... karar verildi." sentence (signatures,
// the YARGILAMA GİDERLERİ cost table) is alignment-sensitive and rendered
// verbatim rather than reflowed into prose.
function splitClosing(narrative: string): { main: string; closing: string } {
  const re = /karar\s+verildi\.?[^\n]*/gi
  let splitIdx = -1
  let m: RegExpExecArray | null
  while ((m = re.exec(narrative))) {
    splitIdx = m.index + m[0].length
  }
  if (splitIdx === -1) return { main: narrative, closing: '' }
  return {
    main: narrative.slice(0, splitIdx).trim(),
    closing: narrative.slice(splitIdx).trim(),
  }
}

const ALLCAPS_LABEL = /^[A-ZÇĞİÖŞÜ0-9][A-ZÇĞİÖŞÜ0-9.\s:]*$/

function parseMain(text: string): Block[] {
  const lines = text.split('\n')
  const blocks: Block[] = []
  let current: string[] = []

  const flush = () => {
    if (current.length > 0) {
      blocks.push({ type: 'p', text: current.join(' ').replace(/\s+/g, ' ').trim() })
      current = []
    }
  }

  for (const raw of lines) {
    const trimmed = raw.trim()
    if (!trimmed) {
      flush()
      continue
    }
    const indent = raw.length - raw.trimStart().length

    if (trimmed === 'TÜRK MİLLETİ ADINA') {
      flush()
      blocks.push({ type: 'heading', text: trimmed })
      continue
    }

    if (trimmed.length <= 40 && ALLCAPS_LABEL.test(trimmed)) {
      flush()
      blocks.push({ type: 'subheading', text: trimmed })
      continue
    }

    if (indent >= 4 && current.length > 0) flush()
    current.push(trimmed)
  }
  flush()
  return blocks
}

export default function KararBody({ body, mahkemeTuru }: KararBodyProps) {
  const { caption, narrative } = splitCaptionAndNarrative(body, mahkemeTuru)
  const { main, closing } = splitClosing(narrative)
  const blocks = parseMain(main)

  return (
    <div className="font-serif">
      {caption && (
        <pre className="mb-8 overflow-x-auto whitespace-pre-wrap break-words rounded-sm border border-paper-2 bg-paper-2/60 px-5 py-4 font-mono text-xs leading-relaxed text-slate">
          {caption}
        </pre>
      )}

      {blocks.map((b, i) => {
        if (b.type === 'heading') {
          return (
            <p
              key={i}
              className="my-6 text-center text-sm font-semibold uppercase tracking-widest text-night-900"
            >
              {b.text}
            </p>
          )
        }
        if (b.type === 'subheading') {
          return (
            <p key={i} className="mt-6 mb-2 text-sm font-semibold text-night-900">
              {b.text}
            </p>
          )
        }
        return (
          <p key={i} className="mb-3 text-sm leading-loose text-ink">
            {b.text}
          </p>
        )
      })}

      {closing && (
        <pre className="mt-8 overflow-x-auto whitespace-pre-wrap break-words rounded-sm border border-paper-2 bg-paper-2/60 px-5 py-4 font-mono text-xs leading-relaxed text-slate">
          {closing}
        </pre>
      )}
    </div>
  )
}
