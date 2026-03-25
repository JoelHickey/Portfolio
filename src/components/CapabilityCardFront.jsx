import AnimatedSVGDraw from './AnimatedLineDrawing'

/**
 * SVG fronts for capability cards — cyan/teal aesthetic, one per capability.
 */
const CYAN = '#22d3ee'
const TEAL = '#2dd4bf'
const CYAN_MUTED = 'rgba(34, 211, 238, 0.35)'
const TEAL_MUTED = 'rgba(45, 212, 191, 0.4)'

const defs = (
  <defs>
    <linearGradient id="cap-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={CYAN} stopOpacity="0.9" />
      <stop offset="100%" stopColor={TEAL} stopOpacity="0.9" />
    </linearGradient>
    <linearGradient id="cap-grad-subtle" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor={CYAN} stopOpacity="0.25" />
      <stop offset="100%" stopColor={TEAL} stopOpacity="0.2" />
    </linearGradient>
  </defs>
)

const fronts = {
  'Product Strategy & Design': () => (
    <AnimatedSVGDraw duration={1.4} className="block w-full h-full product-strategy-card">
      <svg viewBox="0 0 100 100" className="w-full h-full product-strategy-svg" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {defs}
        {/* North star (vision) at top */}
        <path stroke="url(#cap-grad-subtle)" strokeWidth="2" fill="url(#cap-grad-subtle)" d="M50 22 L62 58 L28 42 L72 42 L38 58 Z" />
        <path stroke="url(#cap-grad)" strokeWidth="1.2" d="M50 28 L55 48 L50 45 L45 48 Z" />
        <circle className="north-star-pulse" cx="50" cy="38" r="3" fill={TEAL} stroke={CYAN} strokeWidth="0.8" />
        {/* Roadmap path (how we get there) */}
        <path className="roadmap-path" stroke={CYAN_MUTED} strokeWidth="1.5" d="M10 72 Q50 42 90 72" />
        <path className="roadmap-path-2" stroke={CYAN_MUTED} strokeWidth="1" opacity="0.7" d="M18 68 Q50 44 82 68" />
        {/* Label so the metaphor is clear */}
        <text x="50" y="88" textAnchor="middle" fill={TEAL} fillOpacity="0.9" style={{ fontFamily: 'system-ui, sans-serif', fontSize: 5.5, fontWeight: 500, letterSpacing: '0.05em' }}>Vision → Roadmap</text>
      </svg>
    </AnimatedSVGDraw>
  ),
  'AI Workflows': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* Central hub */}
      <circle cx="50" cy="50" r="14" stroke={CYAN_MUTED} strokeWidth="1.5" fill="url(#cap-grad-subtle)" />
      <circle cx="50" cy="50" r="6" fill="url(#cap-grad)" stroke={CYAN} strokeWidth="1" />
      {/* Orbiting nodes */}
      {[0, 1, 2].map((i) => {
        const a = (i / 3) * Math.PI * 2 - Math.PI / 2
        const x = 50 + Math.cos(a) * 32
        const y = 50 + Math.sin(a) * 32
        return (
          <g key={i}>
            <circle cx={x} cy={y} r="8" stroke={CYAN_MUTED} strokeWidth="1.2" fill="none" />
            <line x1={50 + Math.cos(a) * 20} y1={50 + Math.sin(a) * 20} x2={50 + Math.cos(a) * 26} y2={50 + Math.sin(a) * 26} stroke="url(#cap-grad)" strokeWidth="1" />
          </g>
        )
      })}
      {/* Flow lines */}
      <path stroke={TEAL_MUTED} strokeWidth="0.8" strokeDasharray="3 2" d="M50 36 L50 44 M36 50 L44 50 M50 56 L50 64 M56 50 L64 50" />
    </svg>
  ),
  'Design Systems': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* Grid of components */}
      {[
        [22, 20], [48, 20], [74, 20],
        [22, 48], [48, 48], [74, 48],
        [22, 76], [48, 76]
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={20} height={18} rx="2.5" stroke={i === 4 ? 'url(#cap-grad)' : CYAN_MUTED} strokeWidth={i === 4 ? 1.2 : 1} fill={i === 4 ? 'url(#cap-grad-subtle)' : 'none'} />
      ))}
      {/* Token dots */}
      <circle cx="32" cy="29" r="1.5" fill={TEAL} />
      <circle cx="58" cy="29" r="1.5" fill={TEAL} />
      <circle cx="58" cy="57" r="1.5" fill={CYAN} />
    </svg>
  ),
  'Usability Testing': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* User figure */}
      <circle cx="50" cy="32" r="12" stroke={CYAN_MUTED} strokeWidth="1.5" fill="url(#cap-grad-subtle)" />
      <path stroke={CYAN_MUTED} strokeWidth="1.5" d="M32 78 Q50 58 68 78" />
      {/* Observation rays / focus */}
      <path stroke="url(#cap-grad)" strokeWidth="1" d="M50 44 L50 52 M38 38 L32 32 M62 38 L68 32 M38 48 L30 54 M62 48 L70 54" />
      {/* Check / success */}
      <path stroke={TEAL} strokeWidth="2" d="M28 52 L34 58 L44 46" />
      <circle cx="72" cy="58" r="8" stroke={TEAL_MUTED} strokeWidth="1" fill="none" />
      <path stroke={TEAL} strokeWidth="1.2" d="M68 58 L71 61 L76 56" />
    </svg>
  ),
  'Customer Research': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* Speech / thought shape */}
      <path stroke={CYAN_MUTED} strokeWidth="1.2" fill="url(#cap-grad-subtle)" d="M26 42 Q50 28 74 42 Q74 62 50 72 Q26 62 26 42" />
      {/* Central insight */}
      <circle cx="50" cy="48" r="8" fill="url(#cap-grad)" stroke={CYAN} strokeWidth="1" />
      <path stroke={CYAN} strokeWidth="0.8" d="M46 48 L49 51 L54 46" />
      {/* Quote marks / voice */}
      <path stroke={TEAL_MUTED} strokeWidth="1" d="M34 58 Q38 54 42 58 M58 58 Q62 54 66 58" />
    </svg>
  ),
  'Discovery & Framing': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* Frame / canvas */}
      <rect x="28" y="28" width="44" height="48" rx="3" stroke={CYAN_MUTED} strokeWidth="1.5" fill="url(#cap-grad-subtle)" />
      {/* Content lines */}
      <path stroke="url(#cap-grad)" strokeWidth="1" d="M36 42 L64 42 M36 52 L58 52 M36 62 L52 62" />
      {/* Lightbulb / idea */}
      <path stroke={TEAL} strokeWidth="1.2" fill="url(#cap-grad-subtle)" d="M50 18 L54 26 L50 24 L46 26 Z" />
      <circle cx="50" cy="22" r="2" fill={TEAL} />
    </svg>
  ),
  'Prototyping & Iteration': () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {defs}
      {/* Layers */}
      <rect x="28" y="28" width="44" height="32" rx="2" stroke={CYAN_MUTED} strokeWidth="1.2" fill="none" />
      <rect x="32" y="34" width="44" height="32" rx="2" stroke={CYAN_MUTED} strokeWidth="1.2" fill="url(#cap-grad-subtle)" />
      <rect x="36" y="40" width="44" height="32" rx="2" stroke="url(#cap-grad)" strokeWidth="1.2" fill="url(#cap-grad-subtle)" />
      {/* Iteration arrow */}
      <path stroke={TEAL} strokeWidth="1.5" fill="none" d="M72 58 L78 58 L78 72 L62 72 L62 66" />
      <path stroke={TEAL} strokeWidth="1.2" d="M66 72 L62 68 M66 72 L70 76" />
    </svg>
  )
}

export default function CapabilityCardFront({ title }) {
  const Render = fronts[title]
  if (!Render) return <div className="w-full h-full bg-cyan-950/40" aria-hidden />
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6 bg-cyan-950/30">
      <div className="w-full max-w-[85%] aspect-square text-cyan-400/95">
        <Render />
      </div>
    </div>
  )
}
