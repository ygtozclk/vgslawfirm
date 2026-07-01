'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LangSwitcher from './LangSwitcher'
import MobileNav from './MobileNav'
import type { Dictionary } from '@/lib/i18n'

interface HeaderProps {
  locale: string
  dict: Dictionary['nav']
}

const practiceAreaSlugs = [
  'ozel-hukuk',
  'kamu-hukuku',
  'ceza-hukuku',
  'kvkk',
]

export default function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [paDropdown, setPaDropdown] = useState(false)
  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')
  const isPracticeAreaPage = practiceAreaSlugs.some((slug) =>
    pathname.includes(`/calisma-alanlari`)
  )

  const navLinks = [
    { href: `/${locale}`, label: dict.home },
    { href: `/${locale}/hakkimizda`, label: dict.about },
    { href: `/${locale}/ekibimiz`, label: dict.team },
    { href: `/${locale}/yayinlar`, label: dict.publications },
    { href: `/${locale}/iletisim`, label: dict.contact },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
        scrolled
          ? 'bg-navy-900/98 shadow-lg shadow-black/20 backdrop-blur-sm'
          : 'bg-navy-900/80 backdrop-blur-sm'
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo — overflowing below navbar */}
        <Link
          href={`/${locale}`}
          className="absolute left-6 top-0 z-10 flex h-[88px] items-center justify-center px-4 transition-opacity hover:opacity-80"
          aria-label="VGS Hukuk & Danışmanlık — Anasayfa"
        >
          <Image
            src="/vgs-logo.png"
            alt="VGS Hukuk & Danışmanlık"
            width={200}
            height={80}
            priority
            className="h-20 w-auto object-contain"
          />
        </Link>
        {/* Spacer to preserve flex layout for the absolute-positioned logo */}
        <div className="w-44" aria-hidden="true" />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Ana navigasyon">
          <Link
            href={`/${locale}`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              pathname === `/${locale}` ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {dict.home}
          </Link>
          <Link
            href={`/${locale}/hakkimizda`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/hakkimizda`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {dict.about}
          </Link>

          {/* Practice areas dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setPaDropdown(true)}
            onMouseLeave={() => setPaDropdown(false)}
          >
            <Link
              href={`/${locale}/calisma-alanlari`}
              className={`flex items-center gap-1 rounded-sm px-3 py-2 text-sm transition-colors ${
                isPracticeAreaPage ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
              }`}
            >
              {dict.practiceAreas}
              <svg className={`h-3.5 w-3.5 transition-transform duration-150 ${paDropdown ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>
            {paDropdown && (
              <div className="absolute top-full left-0 mt-1 w-56 rounded-sm border border-navy-700 bg-navy-800 py-1 shadow-xl shadow-black/20">
                {[
                  { slug: 'ozel-hukuk', label: locale === 'en' ? 'Private Law' : 'Özel Hukuk' },
                  { slug: 'kamu-hukuku', label: locale === 'en' ? 'Public Law' : 'Kamu Hukuku' },
                  { slug: 'ceza-hukuku', label: locale === 'en' ? 'Criminal Law' : 'Ceza Hukuku' },
                  { slug: 'kvkk', label: 'KVKK' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/calisma-alanlari/${item.slug}`}
                    className="block px-4 py-2.5 text-sm text-paper/80 hover:bg-navy-700 hover:text-gold-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href={`/${locale}/ekibimiz`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/ekibimiz`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {dict.team}
          </Link>

          <Link
            href={`/${locale}/yayinlar`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/yayinlar`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {dict.publications}
          </Link>

          <Link
            href={`/${locale}/ictihat`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/ictihat`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {locale === 'en' ? 'Court Decisions' : 'Yargı Kararları'}
          </Link>

          <Link
            href={`/${locale}/iletisim`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/iletisim`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {dict.contact}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LangSwitcher locale={locale} />
          <MobileNav locale={locale} dict={dict} />
        </div>
      </div>
    </header>
  )
}
