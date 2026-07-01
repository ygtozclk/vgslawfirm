'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface LangSwitcherProps {
  locale: string
}

export default function LangSwitcher({ locale }: LangSwitcherProps) {
  const pathname = usePathname()

  function getAlternateHref(targetLocale: string) {
    const segments = pathname.split('/')
    segments[1] = targetLocale
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider" role="navigation" aria-label="Language switcher">
      <Link
        href={getAlternateHref('tr')}
        className={`px-2 py-1 rounded-sm transition-colors ${
          locale === 'tr'
            ? 'text-gold-500'
            : 'text-slate hover:text-paper'
        }`}
        aria-current={locale === 'tr' ? 'true' : undefined}
        lang="tr"
        hrefLang="tr"
      >
        TR
      </Link>
      <span className="text-navy-700" aria-hidden="true">|</span>
      <Link
        href={getAlternateHref('en')}
        className={`px-2 py-1 rounded-sm transition-colors ${
          locale === 'en'
            ? 'text-gold-500'
            : 'text-slate hover:text-paper'
        }`}
        aria-current={locale === 'en' ? 'true' : undefined}
        lang="en"
        hrefLang="en"
      >
        EN
      </Link>
    </div>
  )
}
