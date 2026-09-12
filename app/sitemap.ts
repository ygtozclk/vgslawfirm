import type { MetadataRoute } from 'next'
import { practiceAreas } from '@/content/practice-areas'
import { articles } from '@/content/articles'
import { getAllIctihat } from '@/content/ictihat'
import { getAllKararlar } from '@/content/kararlar'

const BASE_URL = 'https://www.vgshukuk.com'
const locales = ['tr', 'en']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  const staticRoutes = [
    '',
    '/hakkimizda',
    '/calisma-alanlari',
    '/ekibimiz',
    '/yayinlar',
    '/ilaclar',
    '/ictihat',
    '/kararlarimiz',
    '/iletisim',
    '/kvkk-aydinlatma',
    '/cerez-politikasi',
  ]

  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${route}`])
          ),
        },
      })
    }

    for (const area of practiceAreas) {
      entries.push({
        url: `${BASE_URL}/${locale}/calisma-alanlari/${area.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/calisma-alanlari/${area.slug}`])
          ),
        },
      })
    }

    for (const article of articles) {
      entries.push({
        url: `${BASE_URL}/${locale}/yayinlar/${article.slug}`,
        lastModified: new Date(article.publishedAt),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/yayinlar/${article.slug}`])
          ),
        },
      })
    }

    for (const ictihat of getAllIctihat()) {
      entries.push({
        url: `${BASE_URL}/${locale}/ictihat/${ictihat.slug}`,
        lastModified: new Date(ictihat.sonKontrol || ictihat.kararTarihi),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/ictihat/${ictihat.slug}`])
          ),
        },
      })
    }

    for (const karar of getAllKararlar()) {
      entries.push({
        url: `${BASE_URL}/${locale}/kararlarimiz/${karar.slug}`,
        lastModified: karar.kararTarihi ? new Date(karar.kararTarihi) : new Date(),
        changeFrequency: 'yearly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/kararlarimiz/${karar.slug}`])
          ),
        },
      })
    }
  }

  return entries
}
