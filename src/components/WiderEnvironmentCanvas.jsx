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

// One style for all diagram text — the caption look: light weight, uppercase, spaced
const DIAGRAM_LABEL_STYLE = {
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: '0.2em',
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
        aria-label="Product, Business, and Technology overlapping"
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
      <style>{`
        @keyframes wider-env-dash-rotate {
          to { stroke-dashoffset: ${2 * Math.PI * VENN_R}; }
        }
        .wider-env-circle { animation: wider-env-dash-rotate 12s linear infinite; }
      `}</style>

      <g fill="none" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        {/* Three overlapping circles — dashed, rotating stroke */}
        {CIRCLES.map((c) => (
          <circle
            key={c.label}
            className="wider-env-circle"
            cx={c.x}
            cy={c.y}
            r={VENN_R}
            fill="none"
            stroke={isCyan ? `url(#${id}-stroke)` : 'rgba(0,0,0,0.4)'}
            strokeWidth={1.5}
            strokeDasharray={`${(2 * Math.PI * VENN_R) / 72} ${(2 * Math.PI * VENN_R) / 24}`}
            opacity={0.95}
          />
        ))}
        {/* Circle labels — same caption style: 10px, 400, uppercase, 0.2em spacing */}
        <g
          fill={isCyan ? '#e2e8f0' : '#0f172a'}
          fontFamily={DIAGRAM_LABEL_STYLE.fontFamily}
          fontSize={DIAGRAM_LABEL_STYLE.fontSize}
          fontWeight={DIAGRAM_LABEL_STYLE.fontWeight}
          style={{ letterSpacing: DIAGRAM_LABEL_STYLE.letterSpacing, textTransform: DIAGRAM_LABEL_STYLE.textTransform }}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {CIRCLES.map((c) => (
            <text key={c.label} x={c.x} y={c.y}>
              {c.label}
            </text>
          ))}
        </g>
      </g>
    </svg>
    </span>
  )
}

export default WiderEnvironmentCanvas
