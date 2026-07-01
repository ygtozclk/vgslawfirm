import 'server-only'

export type Locale = 'tr' | 'en'

export const locales: Locale[] = ['tr', 'en']
export const defaultLocale: Locale = 'tr'

export function hasLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

const dictionaries = {
  tr: () => import('@/messages/tr.json').then((m) => m.default),
  en: () => import('@/messages/en.json').then((m) => m.default),
}

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
