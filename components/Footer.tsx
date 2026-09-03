import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'
import { site } from '@/lib/site'
import VgsLogo from './VgsLogo'

interface FooterProps {
  locale: string
  dict: Dictionary
}

const { name: firmName, address, phone1, phone2, email, linkedin } = site

export default function Footer({ locale, dict }: FooterProps) {
  const nav = dict.nav
  const footer = dict.footer

  const quickLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/hakkimizda`, label: nav.about },
    { href: `/${locale}/calisma-alanlari`, label: nav.practiceAreas },
    { href: `/${locale}/ekibimiz`, label: nav.team },
    { href: `/${locale}/yayinlar`, label: nav.publications },
    { href: `/${locale}/ilaclar`, label: locale === 'en' ? 'Drugs' : 'İlaçlar' },
    { href: `/${locale}/iletisim`, label: nav.contact },
  ]

  const legalLinks = [
    { href: `/${locale}/kvkk-aydinlatma`, label: footer.kvkkNotice },
    { href: `/${locale}/cerez-politikasi`, label: footer.cookiePolicy },
  ]

  return (
    <footer className="bg-night-900 text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-block transition-opacity hover:opacity-80"
              aria-label={`${firmName} — Anasayfa`}
            >
              <VgsLogo className="h-20 w-auto" wordmark="#FFFFFF" />
            </Link>
            <p className="mt-4 text-sm text-mist-2 leading-relaxed">
              {footer.description}
            </p>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-mist-2 hover:text-gold-500 transition-colors"
              aria-label="LinkedIn'de takip edin"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold-500">
              {footer.quickLinks}
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-mist-2 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold-500">
              {footer.legalLinks}
            </h3>
            <ul className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-mist-2 hover:text-gold-300 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold-500">
              {locale === 'en' ? 'Contact' : 'İletişim'}
            </h3>
            <address className="flex flex-col gap-3 not-italic text-sm text-mist-2">
              <span className="leading-relaxed">{address}</span>
              <a href={`tel:${phone1.replace(/\s/g, '')}`} className="hover:text-gold-300 transition-colors">
                {phone1}
              </a>
              <a href={`tel:${phone2.replace(/\s/g, '')}`} className="hover:text-gold-300 transition-colors">
                {phone2}
              </a>
              <a href={`mailto:${email}`} className="hover:text-gold-300 transition-colors break-all">
                {email}
              </a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-night-800 pt-8 sm:flex-row">
          <p className="text-xs text-mist-2">© {new Date().getFullYear()} {footer.copyright}</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-mist-2 hover:text-gold-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
