import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  crumbs: Crumb[]
  light?: boolean
}

export default function Breadcrumbs({ crumbs, light = false }: BreadcrumbsProps) {
  const textColor = light ? 'text-slate' : 'text-slate'
  const activeColor = light ? 'text-paper' : 'text-ink'

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1
        return (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && (
              <svg className={`h-3 w-3 ${textColor} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
            {isLast || !crumb.href ? (
              <span className={activeColor} aria-current={isLast ? 'page' : undefined}>
                {crumb.label}
              </span>
            ) : (
              <Link href={crumb.href} className={`${textColor} hover:text-gold-500 transition-colors`}>
                {crumb.label}
              </Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
