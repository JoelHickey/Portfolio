import { useId } from 'react'

const VIEW = 400
const CX = VIEW / 2
const CY = VIEW / 2

// Three circles in an equilateral triangle (120° apart from top)
const VENN_R = 76
const VENN_D = 72 // distance from center to each circle center → even margin inside parent
const toRad = (deg) => (deg * Math.PI) / 180
const CIRCLES = [
  { angle: -90, label: 'Product' },
  { angle: -90 + 120, label: 'Business' },
  { angle: -90 + 240, label: 'Technology' },
].map(({ angle, label }) => {
  const rad = toRad(angle)
  return {
    x: CX + VENN_D * Math.cos(rad),
    y: CY + VENN_D * Math.sin(rad),
    label,
  }
})

// Outer ring labels — room legibility (slightly larger / medium vs centre Design)
const OUTER_LABEL_STYLE = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
}

function WiderEnvironmentCanvas({ className = '', width = 560, height = 560, variant = 'cyan' }) {
  const id = useId().replace(/:/g, '-')
  const isCyan = variant !== 'black'

  return (
    <span className={className} style={{ display: 'inline-block', lineHeight: 0 }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${VIEW} ${VIEW}`}
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Product, Business, and Technology as overlapping domains, with Design called out at the centre where tradeoffs meet"
        style={{ overflow: 'visible', display: 'block' }}
      >
      <defs>
        <linearGradient id={`${id}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="35%" stopColor="#2dd4bf" />
          <stop offset="65%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient id={`${id}-fill`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(34, 211, 238, 0.08)" />
          <stop offset="100%" stopColor="rgba(167, 139, 250, 0.06)" />
        </linearGradient>
      </defs>

      <g fill="none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Three overlapping circles — solid stroke */}
        {CIRCLES.map((c) => (
          <circle
            key={c.label}
            cx={c.x}
            cy={c.y}
            r={VENN_R}
            fill="none"
            stroke={isCyan ? `url(#${id}-stroke)` : 'rgba(0,0,0,0.4)'}
            strokeWidth={1.5}
            opacity={0.95}
          />
        ))}
        {/* Circle labels — outer domains */}
        <g
          fill={isCyan ? '#e2e8f0' : '#0f172a'}
          fontFamily={OUTER_LABEL_STYLE.fontFamily}
          fontSize={OUTER_LABEL_STYLE.fontSize}
          fontWeight={OUTER_LABEL_STYLE.fontWeight}
          style={{ letterSpacing: OUTER_LABEL_STYLE.letterSpacing, textTransform: OUTER_LABEL_STYLE.textTransform }}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {CIRCLES.map((c) => (
            <text key={c.label} x={c.x} y={c.y}>
              {c.label}
            </text>
          ))}
        </g>
        {/* Centre focal — tradeoffs meet here; rings support this, not the headline */}
        <g textAnchor="middle" dominantBaseline="middle" pointerEvents="none">
          <circle
            cx={CX}
            cy={CY}
            r={22}
            fill={isCyan ? 'rgba(34, 211, 238, 0.14)' : 'rgba(15, 23, 42, 0.08)'}
            stroke={isCyan ? `url(#${id}-stroke)` : 'rgba(0,0,0,0.35)'}
            strokeWidth={1.35}
            opacity={0.95}
          />
          <text
            x={CX}
            y={CY}
            fill={isCyan ? '#f8fafc' : '#0f172a'}
            fontFamily={OUTER_LABEL_STYLE.fontFamily}
            fontSize={12}
            fontWeight={700}
            letterSpacing="0.1em"
            style={{ textTransform: 'uppercase' }}
          >
            Design
          </text>
        </g>
      </g>
    </svg>
    </span>
  )
}

export default WiderEnvironmentCanvas
