import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDictionary, hasLocale } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n'
import { articles, getArticleBySlug } from '@/content/articles'
import Breadcrumbs from '@/components/Breadcrumbs'
import ReadingProgress from '@/components/ReadingProgress'

export async function generateStaticParams() {
  return articles.flatMap((a) =>
    ['tr', 'en'].map((lang) => ({ lang, slug: a.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const locale = lang as Locale
  const article = getArticleBySlug(slug)
  if (!article) return {}
  const content = locale === 'en' ? article.en : article.tr
  return {
    title: content.seoTitle,
    description: content.seoDescription,
    alternates: {
      canonical: `https://www.vgshukuk.com/${lang}/yayinlar/${slug}`,
      languages: {
        tr: `https://www.vgshukuk.com/tr/yayinlar/${slug}`,
        en: `https://www.vgshukuk.com/en/yayinlar/${slug}`,
      },
    },
  }
}

function formatDate(iso: string, locale: Locale) {
  return new Date(iso).toLocaleDateString(locale === 'en' ? 'en-GB' : 'tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const locale = lang as Locale
  const dict = await getDictionary(locale)
  const d = dict.publications

  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const content = locale === 'en' ? article.en : article.tr
  const readingMin = locale === 'en'
    ? `${article.readingTime} min read`
    : `${article.readingTime} dk okuma`

  const disclaimer =
    locale === 'en'
      ? 'This content is for general informational purposes only and does not constitute legal advice.'
      : 'Bu içerik genel bilgilendirme amaçlıdır; hukuki danışmanlık niteliği taşımaz.'

  const migrationNote =
    locale === 'en'
      ? 'This article is pending migration from the original platform. The excerpt below is a placeholder — the full article text should be added here.'
      : 'Bu makale orijinal platformdan buraya taşınmayı beklemektedir. Aşağıdaki metin geçici bir yer tutucudur — makalenin tam metni buraya eklenmelidir.'

  return (
    <>
      <ReadingProgress />

      {/* Page hero */}
      <section className="bg-night-900 px-6 pt-32 md:pt-44 pb-12" aria-labelledby="article-heading">
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            crumbs={[
              { label: dict.breadcrumbs.home, href: `/${locale}` },
              { label: d.heading, href: `/${locale}/yayinlar` },
              { label: content.title },
            ]}
            light
          />

          {/* Categories */}
          {article.categories.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {article.categories.map((cat) => (
                <span
                  key={cat}
                  className="rounded-full border border-night-700 bg-night-800 px-3 py-1 text-xs font-medium text-gold-500"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <h1
            id="article-heading"
            className="mt-5 text-h1 font-semibold text-paper leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {content.title}
          </h1>

          <p className="mt-4 text-body text-slate leading-relaxed max-w-2xl">{content.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-slate">
            <span>{article.author}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, locale)}</time>
            <span aria-hidden="true">·</span>
            <span>{readingMin}</span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-paper py-16 px-6">
        <div className="mx-auto max-w-4xl">

          {/* Abstract (if present) */}
          {content.abstract && (
            <div className="mb-10 rounded-sm border border-night-900/10 bg-paper-2 px-7 py-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold-500 mb-3">
                {locale === 'en' ? 'Abstract' : 'Öz'}
              </p>
              <p className="text-sm text-ink leading-relaxed italic">{content.abstract}</p>
            </div>
          )}

          {/* Migration notice */}
          <div className="mb-10 rounded-sm border-l-4 border-gold-500 bg-paper-2 px-6 py-4">
            <p className="text-sm text-slate leading-relaxed">{migrationNote}</p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none text-ink" style={{ fontFamily: 'var(--font-sans)' }}>
            {content.content
              .split('\n')
              .filter(Boolean)
              .map((line, i) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                  return (
                    <p key={i} className="font-semibold text-ink mt-8 mb-3">
                      {line.replace(/\*\*/g, '')}
                    </p>
                  )
                }
                return (
                  <p key={i} className="text-ink leading-relaxed mb-5">
                    {line}
                  </p>
                )
              })}
          </div>

          {/* Legal disclaimer */}
          <aside
            className="mt-14 rounded-sm border border-paper-2 bg-paper-2 px-6 py-5"
            aria-label={locale === 'en' ? 'Legal notice' : 'Yasal uyarı'}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate mb-2">
              {locale === 'en' ? 'Informational Notice' : 'Bilgilendirme Notu'}
            </p>
            <p className="text-sm text-slate leading-relaxed">{disclaimer}</p>
          </aside>

          {/* Author byline */}
          <div className="mt-10 flex items-start gap-5 border-t border-paper-2 pt-8">
            <div
              className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-night-900 text-gold-500 text-lg font-semibold"
              style={{ fontFamily: 'var(--font-heading)' }}
              aria-hidden="true"
            >
              {article.author.split(' ').filter((p) => !p.startsWith('Av.')).map((p) => p[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">{article.author}</p>
              <p className="text-xs text-slate">{article.authorTitle} — {article.authorBar}</p>
            </div>
          </div>

          {/* Back link */}
          <div className="mt-12 border-t border-paper-2 pt-8">
            <Link
              href={`/${locale}/yayinlar`}
              className="inline-flex items-center gap-2 text-sm font-medium text-gold-500 hover:text-gold-300 transition-colors"
            >
              <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              {locale === 'en' ? 'Back to Publications' : 'Yayınlara Dön'}
            </Link>
          </div>
        </div>
      </article>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: content.title,
            description: content.summary,
            keywords: article.categories.join(', '),
            author: {
              '@type': 'Person',
              name: article.author,
              jobTitle: article.authorTitle,
              memberOf: {
                '@type': 'Organization',
                name: article.authorBar,
              },
            },
            datePublished: article.publishedAt,
            publisher: {
              '@type': 'LegalService',
              name: 'VGS Hukuk & Danışmanlık',
              url: 'https://www.vgshukuk.com',
            },
            url: `https://www.vgshukuk.com/${locale}/yayinlar/${article.slug}`,
          }),
        }}
      />
    </>
  )
}
