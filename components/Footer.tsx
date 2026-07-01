import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'

interface FooterProps {
  locale: string
  dict: Dictionary
}

const firmName = 'VGS Hukuk & Danışmanlık'
const address = 'Strazburg Cad. No: 16/24, Sıhhiye, Çankaya / Ankara 06430'
const phone1 = '+90 312 231 6975'
const phone2 = '+90 539 659 5584'
const email = 'lawfirmvgs@gmail.com'
const linkedin = 'https://linkedin.com/company/vgshukuk'

export default function Footer({ locale, dict }: FooterProps) {
  const nav = dict.nav
  const footer = dict.footer

  const quickLinks = [
    { href: `/${locale}`, label: nav.home },
    { href: `/${locale}/hakkimizda`, label: nav.about },
    { href: `/${locale}/calisma-alanlari`, label: nav.practiceAreas },
    { href: `/${locale}/ekibimiz`, label: nav.team },
    { href: `/${locale}/yayinlar`, label: nav.publications },
    { href: `/${locale}/iletisim`, label: nav.contact },
  ]

  const legalLinks = [
    { href: `/${locale}/kvkk-aydinlatma`, label: footer.kvkkNotice },
    { href: `/${locale}/cerez-politikasi`, label: footer.cookiePolicy },
  ]

  return (
    <footer className="bg-navy-900 text-paper">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="inline-flex flex-col gap-1 text-paper hover:text-gold-300 transition-colors"
              aria-label={`${firmName} — Anasayfa`}
            >
              <span
                className="text-2xl font-bold tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                VGS
              </span>
              <span className="text-xs font-light uppercase tracking-widest text-slate">
                Hukuk & Danışmanlık
              </span>
            </Link>
            <p className="mt-4 text-sm text-slate leading-relaxed">
              {footer.description}
            </p>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate hover:text-gold-500 transition-colors"
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
                    className="text-sm text-slate hover:text-gold-300 transition-colors"
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
                    className="text-sm text-slate hover:text-gold-300 transition-colors"
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
            <address className="flex flex-col gap-3 not-italic text-sm text-slate">
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
              <p className="mt-1 text-xs text-navy-700 leading-tight">
                {locale === 'en'
                  ? '⚠ Please confirm the canonical email address before launch.'
                  : '⚠ Yayın öncesinde kanonik e-posta adresi teyit edilmelidir.'}
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-navy-800 pt-8 sm:flex-row">
          <p className="text-xs text-slate">{footer.copyright}</p>
          <div className="flex items-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-slate hover:text-gold-300 transition-colors"
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
