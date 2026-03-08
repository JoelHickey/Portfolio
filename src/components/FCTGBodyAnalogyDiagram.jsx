/**
 * Human body analogy for AI agents: Brain = Model, Memory (injected into Context), Hands = Tools.
 * Shows flow: Memory → Context (input each turn) → Brain.
 */
export default function FCTGBodyAnalogyDiagram() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        viewBox="-55 -10 390 340"
        className="w-full max-w-[260px] md:max-w-[300px] h-auto"
        overflow="visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="fctg-body-torso" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="fctg-brain-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.85" />
          </linearGradient>
          <filter id="fctg-body-shadow" x="-10%" y="-5%" width="120%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.3" />
          </filter>
          <marker id="fctg-callout-dot" markerWidth="4" markerHeight="4" refX="2" refY="2">
            <circle cx="2" cy="2" r="2" fill="#475569" />
          </marker>
        </defs>

        {/* Body */}
        <g filter="url(#fctg-body-shadow)">
          <path d="M 110 88 Q 130 100 150 88" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M 96 100 Q 84 135 90 182 L 130 208 L 170 182 Q 176 135 164 100 Q 148 80 130 94 Q 112 80 96 100 Z" fill="url(#fctg-body-torso)" stroke="#22d3ee" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 100 122 Q 55 145 45 172" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M 160 122 Q 205 145 215 172" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" fill="none" />
          <path d="M 112 208 L 108 288 M 108 288 L 104 292 M 108 288 L 112 292" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
          <path d="M 148 208 L 152 288 M 152 288 L 148 292 M 152 288 L 156 292" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        </g>

        {/* Head */}
        <ellipse cx="130" cy="52" rx="34" ry="38" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        {/* Brain */}
        <circle cx="130" cy="52" r="20" fill="url(#fctg-brain-fill)" stroke="#e879f9" strokeWidth="1.5" opacity="0.98" />

        {/* Left hand */}
        <g transform="translate(45, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="2" />
          <g transform="translate(-12, -28) rotate(-18) scale(0.85)">
            <rect x="0" y="0" width="30" height="38" rx="4" fill="#0f766e" fillOpacity="0.6" stroke="#2dd4bf" strokeWidth="1.5" />
            <rect x="3" y="5" width="30" height="38" rx="4" fill="#134e4a" fillOpacity="0.7" stroke="#2dd4bf" strokeWidth="1.2" />
            <rect x="6" y="10" width="30" height="38" rx="4" fill="#0f766e" fillOpacity="0.5" stroke="#2dd4bf" strokeWidth="1" />
            <line x1="12" y1="22" x2="24" y2="22" stroke="#2dd4bf" strokeWidth="1.2" opacity="0.9" />
            <line x1="12" y1="30" x2="26" y2="30" stroke="#2dd4bf" strokeWidth="1" opacity="0.7" />
          </g>
        </g>

        {/* Right hand */}
        <g transform="translate(215, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="2" cy="-2" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 4 0 L 7 3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Callout: Model → Reasoning (brain, top-right) */}
        <line x1="150" y1="37" x2="172" y2="18" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <text x="175" y="10" textAnchor="start" fontSize="16" fill="#e879f9" fontWeight="600" fontFamily="system-ui,sans-serif">Model</text>
        <text x="175" y="26" textAnchor="start" fontSize="14" fill="#e879f9" opacity="0.75" fontFamily="system-ui,sans-serif">→ Reasoning</text>

        {/* Callout: Memory → Context (left hand) */}
        <line x1="33" y1="172" x2="-10" y2="172" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <text x="-13" y="167" textAnchor="end" fontSize="16" fill="#5eead4" fontWeight="600" fontFamily="system-ui,sans-serif">Memory</text>
        <text x="-13" y="183" textAnchor="end" fontSize="14" fill="#5eead4" opacity="0.75" fontFamily="system-ui,sans-serif">→ Context</text>

        {/* Callout: Tools → Actions (right hand) */}
        <line x1="227" y1="172" x2="250" y2="172" stroke="#fcd34d" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <text x="253" y="167" textAnchor="start" fontSize="16" fill="#fcd34d" fontWeight="600" fontFamily="system-ui,sans-serif">Tools</text>
        <text x="253" y="183" textAnchor="start" fontSize="14" fill="#fcd34d" opacity="0.75" fontFamily="system-ui,sans-serif">→ Actions</text>
      </svg>
    </div>
  )
}
