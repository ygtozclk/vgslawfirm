'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Dictionary } from '@/lib/i18n'

interface MobileNavProps {
  locale: string
  dict: Dictionary['nav']
}

export default function MobileNav({ locale, dict }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const links = [
    { href: `/${locale}`, label: dict.home },
    { href: `/${locale}/hakkimizda`, label: dict.about },
    { href: `/${locale}/calisma-alanlari`, label: dict.practiceAreas },
    { href: `/${locale}/ekibimiz`, label: dict.team },
    { href: `/${locale}/yayinlar`, label: dict.publications },
    {
      href: `/${locale}/ictihat`,
      label: locale === 'en' ? 'Court Decisions' : 'Yargı Kararları',
    },
    {
      href: `/${locale}/kararlarimiz`,
      label: locale === 'en' ? "Cases We've Won" : 'Kararlarımız',
    },
    { href: `/${locale}/iletisim`, label: dict.contact },
  ]

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-sm text-paper transition-colors hover:bg-night-700 lg:hidden"
        aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block h-0.5 w-5 bg-current transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-night-900 px-6 py-8 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigasyon menüsü"
        >
          <nav>
            <ul className="flex flex-col gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-sm px-4 py-3 text-lg font-medium text-paper transition-colors hover:bg-night-800 hover:text-gold-300"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 border-t border-night-700 pt-8">
            <Link
              href={`/${locale}/iletisim`}
              className="block w-full rounded-sm border border-night-700 px-6 py-3.5 text-center text-sm font-semibold text-paper transition-colors hover:bg-night-800"
              onClick={() => setOpen(false)}
            >
              {dict.contact}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
