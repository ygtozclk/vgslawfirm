interface VgsLogoProps {
  className?: string
  /** Panel rengi — markanın mürdüm moru */
  panel?: string
  /** Panel içi harf rengi */
  letter?: string
  /** "LAW FIRM" satırının rengi; PNG'deki siyah koyu zeminde kaybolduğu için renk dışarıdan verilir */
  wordmark?: string
}

/**
 * VGS logosunun vektörel yeniden çizimi: üç mürdüm panel, serif V·G·S,
 * altta harf aralıklı LAW FIRM. Orijinal PNG (2000×2000, kare) yerine
 * sıkı kadrajlı bir lockup — her boyutta keskin, her zeminde okunur.
 */
export default function VgsLogo({
  className,
  panel = '#582A51',
  letter = '#FFFFFF',
  wordmark = 'currentColor',
}: VgsLogoProps) {
  return (
    <svg
      viewBox="0 0 300 262"
      className={className}
      role="img"
      aria-label="VGS Hukuk & Danışmanlık"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="6" y="6" width="88" height="212" fill={panel} />
      <rect x="106" y="6" width="88" height="212" fill={panel} />
      <rect x="206" y="6" width="88" height="212" fill={panel} />
      <g
        fill={letter}
        style={{
          fontFamily: 'var(--font-heading), Georgia, serif',
          fontWeight: 500,
          fontSize: '108px',
        }}
        textAnchor="middle"
      >
        <text x="50" y="196">V</text>
        <text x="150" y="196">G</text>
        <text x="250" y="196">S</text>
      </g>
      <text
        x="150"
        y="252"
        fill={wordmark}
        textAnchor="middle"
        style={{
          fontFamily: 'var(--font-sans), system-ui, sans-serif',
          fontWeight: 500,
          fontSize: '21px',
          letterSpacing: '0.42em',
        }}
      >
        LAW FIRM
      </text>
    </svg>
  )
}
