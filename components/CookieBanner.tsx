'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import type { Dictionary } from '@/lib/i18n'

const STORAGE_KEY = 'vgs-cookie-consent'

interface CookieBannerProps {
  locale: string
  dict: Dictionary['cookieBanner']
}

export default function CookieBanner({ locale, dict }: CookieBannerProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) setVisible(true)
    } catch {
      // localStorage not available
    }
  }, [])

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted') } catch {}
    setVisible(false)
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, 'declined') } catch {}
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={locale === 'en' ? 'Cookie consent' : 'Çerez izni'}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-night-700 bg-night-900 px-6 py-5 shadow-2xl sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm sm:rounded-sm sm:border"
    >
      <p className="text-sm text-paper/90 leading-relaxed">
        {dict.message}{' '}
        <Link
          href={`/${locale}/cerez-politikasi`}
          className="underline text-gold-300 hover:text-gold-500 transition-colors"
        >
          {dict.learnMore}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="flex-1 rounded-sm bg-gold-500 px-4 py-2 text-sm font-semibold text-night-900 transition-colors hover:bg-gold-300"
        >
          {dict.accept}
        </button>
        <button
          onClick={decline}
          className="flex-1 rounded-sm border border-night-700 px-4 py-2 text-sm font-medium text-mist transition-colors hover:border-gold-500 hover:text-paper"
        >
          {dict.decline}
        </button>
      </div>
    </div>
  )
}
