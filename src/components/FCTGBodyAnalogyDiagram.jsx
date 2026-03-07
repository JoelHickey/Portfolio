/**
 * Human body analogy for AI agents: Brain = Model, Memory (injected into Context), Hands = Tools.
 * Shows flow: Memory → Context (input each turn) → Brain.
 */
export default function FCTGBodyAnalogyDiagram() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 280 320"
        className="w-full max-w-[340px] md:max-w-[400px] h-auto"
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
        </defs>
        {/* Body = Agent (Model in head, Memory, Tools in hands) */}
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
          <circle cx="0" cy="0" r="20" fill="url(#fctg-brain-fill)" stroke="#e879f9" strokeWidth="1.5" opacity="0.98" />
          <text x="0" y="4" textAnchor="middle" fontSize="10" fill="#831843" fontWeight="600" fontFamily="system-ui, sans-serif">Model</text>
        </g>
        {/* Left hand holding memory stack */}
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
        {/* Right hand + magnifier icon (Tools) */}
        <g transform="translate(215, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="#f59e0b" fillOpacity="0.7" stroke="#fbbf24" strokeWidth="2" />
          <circle cx="2" cy="-2" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 4 0 L 7 3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        {/* Labels */}
        <g fontFamily="system-ui, sans-serif">
          <text x="28" y="132" textAnchor="middle" fontSize="10" fill="#5eead4" fontWeight="600">Memory</text>
        </g>
        <g fontFamily="system-ui, sans-serif">
          <text x="215" y="198" textAnchor="middle" fontSize="10" fill="#fcd34d" fontWeight="600">Tools</text>
        </g>
      </svg>
    </div>
  )
}
