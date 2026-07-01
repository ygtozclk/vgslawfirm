interface SectionHeaderProps {
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  light?: boolean
  id?: string
}

export default function SectionHeader({
  heading,
  subheading,
  align = 'left',
  light = false,
  id,
}: SectionHeaderProps) {
  const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  const headingColor = light ? 'text-paper' : 'text-ink'
  const subColor = light ? 'text-gold-300' : 'text-slate'
  const ruleColor = light ? 'bg-gold-300' : 'bg-gold-500'

  return (
    <div className={`flex flex-col gap-3 ${textAlign}`}>
      <div className={`h-0.5 w-12 ${ruleColor}`} aria-hidden="true" />
      <h2
        id={id}
        className={`font-heading text-h2 font-semibold leading-tight ${headingColor}`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {heading}
      </h2>
      {subheading && (
        <p className={`text-body ${subColor} max-w-xl`}>{subheading}</p>
      )}
    </div>
  )
}
