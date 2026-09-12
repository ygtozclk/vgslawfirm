'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import LangSwitcher from './LangSwitcher'
import MobileNav from './MobileNav'
import VgsLogo from './VgsLogo'
import type { Dictionary } from '@/lib/i18n'

interface HeaderProps {
  locale: string
  dict: Dictionary['nav']
}

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
  const isPracticeAreaPage = pathname.includes('/calisma-alanlari')

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-all duration-300 ${
        scrolled
          ? 'bg-night-900/98 shadow-lg shadow-black/20 backdrop-blur-sm'
          : 'border-b border-paper/10 bg-transparent'
      }`}
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
        {/* Mobil: logo header içinde kalır */}
        <Link
          href={`/${locale}`}
          className="flex items-center md:hidden"
          aria-label="VGS Hukuk & Danışmanlık — Anasayfa"
        >
          <VgsLogo className="h-12 w-auto" wordmark="#FFFFFF" />
        </Link>

        {/* Masaüstü: kapı plaketi — header alt çizgisini taşan lockup.
            Scroll'da 200ms'de küçülüp header içine oturur. */}
        <Link
          href={`/${locale}`}
          className="absolute left-6 top-0 z-10 hidden md:block transition-opacity hover:opacity-90"
          aria-label="VGS Hukuk & Danışmanlık — Anasayfa"
        >
          <span
            className="flex items-center justify-center transition-all duration-200 ease-out"
            style={{
              height: scrolled ? '64px' : 'clamp(88px, 11vw, 148px)',
              marginTop: scrolled ? '8px' : '0px',
            }}
          >
            <VgsLogo className="h-full w-auto" wordmark="#FFFFFF" />
          </span>
        </Link>
        {/* Spacer to preserve flex layout for the absolute-positioned logo */}
        <div className="hidden w-[200px] md:block" aria-hidden="true" />

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
              <div className="absolute top-full left-0 mt-1 w-56 rounded-sm border border-night-700 bg-night-800 py-1 shadow-xl shadow-black/20">
                {[
                  { slug: 'ozel-hukuk', label: locale === 'en' ? 'Private Law' : 'Özel Hukuk' },
                  { slug: 'kamu-hukuku', label: locale === 'en' ? 'Public Law' : 'Kamu Hukuku' },
                  { slug: 'ceza-hukuku', label: locale === 'en' ? 'Criminal Law' : 'Ceza Hukuku' },
                  { slug: 'kvkk', label: 'KVKK' },
                ].map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/calisma-alanlari/${item.slug}`}
                    className="block px-4 py-2.5 text-sm text-paper/80 hover:bg-night-700 hover:text-gold-300 transition-colors"
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
            href={`/${locale}/kararlarimiz`}
            className={`rounded-sm px-3 py-2 text-sm transition-colors ${
              isActive(`/${locale}/kararlarimiz`) ? 'text-gold-500' : 'text-paper/80 hover:text-paper'
            }`}
          >
            {locale === 'en' ? "Cases We've Won" : 'Kararlarımız'}
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
