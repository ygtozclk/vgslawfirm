import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CookieBanner from '@/components/CookieBanner'
import { hasLocale, getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export async function generateStaticParams() {
  return [{ lang: 'tr' }, { lang: 'en' }]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang as Locale)
  return {
    title: {
      default: dict.meta.seoTitle,
      template: `%s | ${dict.meta.siteTitle}`,
    },
    description: dict.meta.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}`,
      languages: {
        tr: 'https://www.vgshukuk.com/tr',
        en: 'https://www.vgshukuk.com/en',
      },
    },
    openGraph: {
      siteName: dict.meta.siteTitle,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const locale = lang as Locale
  const dict = await getDictionary(locale)

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ fontFamily: 'var(--font-sans)' }}>
        <Header locale={locale} dict={dict.nav} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer locale={locale} dict={dict} />
        <CookieBanner locale={locale} dict={dict.cookieBanner} />
      </body>
    </html>
  )
}
