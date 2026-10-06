import Link from 'next/link'

interface DrugLinkListProps {
  drugs: { key: string; name: string; href: string; kararCount: number }[]
  locale: string
  light?: boolean
}

export default function DrugLinkList({ drugs, locale, light = false }: DrugLinkListProps) {
  const kararLabel = (n: number) => (locale === 'en' ? `${n} decision${n === 1 ? '' : 's'}` : `${n} karar`)

  return (
    <ul className="flex flex-wrap gap-3" aria-label={locale === 'en' ? 'Drugs' : 'İlaçlar'}>
      {drugs.map((drug) => (
        <li key={drug.key}>
          <Link
            href={drug.href}
            className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              light
                ? 'border-paper/15 text-paper hover:border-gold-500 hover:text-gold-300'
                : 'border-night-900/15 bg-paper text-ink hover:border-gold-500 hover:text-gold-500'
            }`}
          >
            {drug.name}
            {drug.kararCount > 0 && (
              <span className={`text-xs ${light ? 'text-mist-2' : 'text-slate'}`}>
                · {kararLabel(drug.kararCount)}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}
