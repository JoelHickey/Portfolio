/**
 * Human body analogy for AI agents: Brain = Model, Memory = Context, Hands = Tools.
 * Polished SVG illustration with label pills and stacked memory cards.
 */
export default function FCTGBodyAnalogyDiagram() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 280 320"
        className="w-full max-w-[280px] h-auto"
        aria-hidden
      >
        <defs>
          <linearGradient id="fctg-body-torso" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="fctg-brain-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
          </linearGradient>
          <filter id="fctg-body-shadow" x="-10%" y="-5%" width="120%" height="115%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.3" />
          </filter>
        </defs>
        {/* Body group with shadow */}
        <g filter="url(#fctg-body-shadow)">
          {/* Neck */}
          <path
            d="M 110 88 Q 130 100 150 88"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="8"
            strokeLinecap="round"
            strokeOpacity="0.6"
          />
          {/* Torso */}
          <path
            d="M 96 100 Q 84 135 90 182 L 130 208 L 170 182 Q 176 135 164 100 Q 148 80 130 94 Q 112 80 96 100 Z"
            fill="url(#fctg-body-torso)"
            stroke="#22d3ee"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Left arm - bent, reaching */}
          <path d="M 100 122 Q 55 145 45 172" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Right arm - bent, reaching */}
          <path d="M 160 122 Q 205 145 215 172" stroke="#22d3ee" strokeWidth="9" strokeLinecap="round" fill="none" />
          {/* Legs */}
          <path d="M 112 208 L 108 288 M 108 288 L 104 292 M 108 288 L 112 292" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
          <path d="M 148 208 L 152 288 M 152 288 L 148 292 M 152 288 L 156 292" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.9" />
        </g>
        {/* Head */}
        <ellipse cx="130" cy="52" rx="34" ry="38" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        {/* Brain - single circle, visible through head */}
        <g transform="translate(130, 52)">
          <circle cx="0" cy="0" r="14" fill="url(#fctg-brain-fill)" stroke="#a78bfa" strokeWidth="1.5" opacity="0.98" />
        </g>
        {/* Left hand + gear icon */}
        <g transform="translate(45, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="0" cy="0" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 0 -4.5 L 0 4.5 M -4.5 0 L 4.5 0 M -3 -3 L 3 3 M -3 3 L 3 -3" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" />
        </g>
        {/* Right hand + magnifier icon */}
        <g transform="translate(215, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="2" cy="-2" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 4 0 L 7 3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {/* Memory / Context - stacked cards */}
        <g transform="translate(218, 40)">
          <rect x="0" y="0" width="30" height="38" rx="4" fill="#0f766e" fillOpacity="0.6" stroke="#2dd4bf" strokeWidth="1.5" />
          <rect x="3" y="5" width="30" height="38" rx="4" fill="#134e4a" fillOpacity="0.7" stroke="#2dd4bf" strokeWidth="1.2" />
          <rect x="6" y="10" width="30" height="38" rx="4" fill="#0f766e" fillOpacity="0.5" stroke="#2dd4bf" strokeWidth="1" />
          <line x1="12" y1="22" x2="24" y2="22" stroke="#2dd4bf" strokeWidth="1.2" opacity="0.9" />
          <line x1="12" y1="30" x2="26" y2="30" stroke="#2dd4bf" strokeWidth="1" opacity="0.7" />
        </g>
        {/* Labels */}
        <g fontFamily="system-ui, sans-serif">
          <rect x="4" y="22" width="68" height="34" rx="17" fill="#a78bfa" fillOpacity="0.25" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.6" />
          <text x="38" y="36" textAnchor="middle" fontSize="12" fill="#c4b5fd" fontWeight="600">Brain</text>
          <text x="38" y="49" textAnchor="middle" fontSize="10" fill="#94a3b8">Model</text>
        </g>
        <g fontFamily="system-ui, sans-serif">
          <rect x="187" y="0" width="78" height="34" rx="17" fill="#2dd4bf" fillOpacity="0.25" stroke="#2dd4bf" strokeWidth="1" strokeOpacity="0.6" />
          <text x="226" y="14" textAnchor="middle" fontSize="12" fill="#5eead4" fontWeight="600">Memory</text>
          <text x="226" y="27" textAnchor="middle" fontSize="10" fill="#94a3b8">Context</text>
        </g>
        <g fontFamily="system-ui, sans-serif">
          <rect x="181" y="188" width="68" height="34" rx="17" fill="#f59e0b" fillOpacity="0.25" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.6" />
          <text x="215" y="206" textAnchor="middle" fontSize="12" fill="#fcd34d" fontWeight="600">Hands</text>
          <text x="215" y="219" textAnchor="middle" fontSize="10" fill="#94a3b8">Tools</text>
        </g>
      </svg>
    </div>
  )
}
