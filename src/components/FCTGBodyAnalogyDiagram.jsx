/**
 * Human body analogy for AI agents: Brain = Model, Memory (injected into Context), Hands = Tools.
 * Shows flow: Memory → Context (input each turn) → Brain.
 */
export default function FCTGBodyAnalogyDiagram() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        viewBox="-55 -10 390 340"
        className="w-full max-w-[340px] md:max-w-[420px] h-auto"
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
          <filter id="fctg-signal-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="fctg-callout-dot" markerWidth="4" markerHeight="4" refX="2" refY="2">
            <circle cx="2" cy="2" r="2" fill="#475569" />
          </marker>
        </defs>

        {/* Body */}
        <g filter="url(#fctg-body-shadow)">
          <path d="M 110 88 Q 130 100 150 88" fill="none" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" strokeOpacity="0.6" />
          <path d="M 96 100 Q 84 135 90 182 L 130 208 L 170 182 Q 176 135 164 100 Q 148 80 130 94 Q 112 80 96 100 Z" fill="none" stroke="url(#fctg-body-torso)" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M 112 116 Q 130 132 148 116" fill="none" stroke="#22d3ee" strokeWidth="1.4" strokeOpacity="0.4" strokeLinecap="round" />
          <path d="M 108 142 Q 130 160 152 142" fill="none" stroke="#818cf8" strokeWidth="1.25" strokeOpacity="0.28" strokeLinecap="round" />
          <path d="M 100 122 Q 55 145 45 172" stroke="#22d3ee" strokeWidth="4.25" strokeLinecap="round" fill="none" strokeOpacity="0.88" />
          <path d="M 160 122 Q 205 145 215 172" stroke="#22d3ee" strokeWidth="4.25" strokeLinecap="round" fill="none" strokeOpacity="0.88" />
          <path d="M 112 208 L 108 288 M 108 288 L 104 292 M 108 288 L 112 292" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.88" />
          <path d="M 148 208 L 152 288 M 152 288 L 148 292 M 152 288 L 156 292" stroke="#22d3ee" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.88" />
        </g>

        {/* Nervous system: brain -> shoulders -> arms -> memory/tools/model */}
        <g>
          <path d="M 120 92 C 115 103, 108 112, 100 122 Q 55 145 45 172" fill="none" stroke="rgba(94,234,212,0.42)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 140 92 C 145 103, 152 112, 160 122 Q 205 145 215 172" fill="none" stroke="rgba(252,211,77,0.42)" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M 145 38 C 154 31, 162 24, 172 18" fill="none" stroke="rgba(232,121,249,0.42)" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="120" cy="92" r="2.6" fill="rgba(153,246,228,0.7)" filter="url(#fctg-signal-glow)">
            <animate attributeName="opacity" values="0.45;1;0.55" dur="2.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="140" cy="92" r="2.6" fill="rgba(253,230,138,0.7)" filter="url(#fctg-signal-glow)">
            <animate attributeName="opacity" values="0.45;1;0.55" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
          </circle>
          <circle r="2.4" fill="rgba(153,246,228,0.95)" filter="url(#fctg-signal-glow)">
            <animateMotion dur="2.8s" begin="0.25s" repeatCount="indefinite" path="M 120 92 C 115 103, 108 112, 100 122 Q 55 145 45 172" />
            <animate attributeName="opacity" values="0;1;0" dur="2.8s" begin="0.25s" repeatCount="indefinite" />
          </circle>
          <circle r="2.4" fill="rgba(253,230,138,0.95)" filter="url(#fctg-signal-glow)">
            <animateMotion dur="2.8s" begin="0.85s" repeatCount="indefinite" path="M 140 92 C 145 103, 152 112, 160 122 Q 205 145 215 172" />
            <animate attributeName="opacity" values="0;1;0" dur="2.8s" begin="0.85s" repeatCount="indefinite" />
          </circle>
          <circle r="2.3" fill="rgba(249,168,212,0.98)" filter="url(#fctg-signal-glow)">
            <animateMotion dur="1.9s" begin="0.55s" repeatCount="indefinite" path="M 145 38 C 154 31, 162 24, 172 18" />
            <animate attributeName="opacity" values="0;1;0" dur="1.9s" begin="0.55s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Brain: match the AI models slide treatment */}
        <g>
          <path
            d={`
              M 130 18
              C 121 6, 105 6, 97 20
              C 75 8, 61 30, 70 46
              C 58 61, 66 85, 82 95
              C 88 111, 109 117, 126 107
              C 128 86, 127 66, 130 49
              C 133 66, 132 86, 134 107
              C 151 117, 172 111, 178 95
              C 194 85, 202 61, 190 46
              C 199 30, 185 8, 163 20
              C 155 6, 139 6, 130 18
              Z
            `}
            fill="rgba(232,121,249,0.08)"
            stroke="rgba(232,121,249,0.4)"
            strokeWidth="1.4"
          />
          <path
            d={`
              M 86 37
              C 78 27, 86 16, 100 19
              C 91 29, 94 42, 105 48
              C 92 53, 92 66, 104 72
              C 92 79, 98 93, 115 96
            `}
            fill="none"
            stroke="rgba(244,114,182,0.32)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d={`
              M 174 37
              C 182 27, 174 16, 160 19
              C 169 29, 166 42, 155 48
              C 168 53, 168 66, 156 72
              C 168 79, 162 93, 145 96
            `}
            fill="none"
            stroke="rgba(244,114,182,0.32)"
            strokeWidth="1.1"
            strokeLinecap="round"
          />
          <path
            d={`
              M 130 24
              C 128 38, 128 52, 130 66
              C 132 80, 133 90, 130 100
            `}
            fill="none"
            stroke="rgba(244,114,182,0.38)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          {[
            { x1: 104, y1: 44, x2: 123, y2: 59 },
            { x1: 117, y1: 70, x2: 137, y2: 52 },
            { x1: 136, y1: 63, x2: 154, y2: 46 },
            { x1: 111, y1: 85, x2: 149, y2: 83 },
          ].map((edge, idx) => (
            <line
              key={`brain-edge-${idx}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="rgba(244,114,182,0.28)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          ))}
          {[
            { cx: 104, cy: 44, r: 2.5 },
            { cx: 123, cy: 59, r: 2.8 },
            { cx: 117, cy: 70, r: 2.4 },
            { cx: 137, cy: 52, r: 2.8 },
            { cx: 154, cy: 46, r: 2.5 },
            { cx: 149, cy: 83, r: 2.5 },
          ].map((node, idx) => (
            <circle
              key={`brain-node-${idx}`}
              cx={node.cx}
              cy={node.cy}
              r={node.r}
              fill="rgba(249,168,212,0.88)"
            >
              <animate
                attributeName="opacity"
                values="0.35;1;0.45"
                dur={`${1.8 + idx * 0.18}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
          {[
            'M 104 44 C 111 47, 117 54, 123 59',
            'M 117 70 C 123 66, 130 57, 137 52',
            'M 136 63 C 142 59, 148 51, 154 46',
          ].map((path, idx) => (
            <circle key={`brain-signal-${idx}`} r="2.1" fill="rgba(252,231,243,0.95)">
              <animateMotion
                dur={`${1.6 + idx * 0.25}s`}
                begin={`${idx * 0.35}s`}
                repeatCount="indefinite"
                path={path}
              />
              <animate
                attributeName="opacity"
                values="0;1;0"
                dur={`${1.6 + idx * 0.25}s`}
                begin={`${idx * 0.35}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Left hand */}
        <g transform="translate(45, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="none" stroke="#fbbf24" strokeWidth="1.8" opacity="0.9" />
          <g transform="translate(-12, -28) rotate(-18) scale(0.85)">
            <rect x="0" y="0" width="30" height="38" rx="4" fill="none" stroke="#2dd4bf" strokeWidth="1.4" opacity="0.9" />
            <rect x="3" y="5" width="30" height="38" rx="4" fill="none" stroke="#2dd4bf" strokeWidth="1.05" opacity="0.65" />
            <rect x="6" y="10" width="30" height="38" rx="4" fill="none" stroke="#2dd4bf" strokeWidth="0.9" opacity="0.45" />
            <line x1="12" y1="22" x2="24" y2="22" stroke="#2dd4bf" strokeWidth="1.2" opacity="0.9" />
            <line x1="12" y1="30" x2="26" y2="30" stroke="#2dd4bf" strokeWidth="1" opacity="0.7" />
          </g>
        </g>

        {/* Right hand */}
        <g transform="translate(215, 172)">
          <ellipse cx="0" cy="0" rx="12" ry="10" fill="none" stroke="#fbbf24" strokeWidth="1.8" opacity="0.9" />
          <circle cx="2" cy="-2" r="4" fill="none" stroke="#fbbf24" strokeWidth="1.5" />
          <path d="M 4 0 L 7 3" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Callout: Model → Reasoning (brain, top-right) */}
        <path d="M 150 37 C 157 31, 164 24, 172 18" fill="none" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <circle r="2.2" fill="rgba(249,168,212,0.98)" filter="url(#fctg-signal-glow)">
          <animateMotion dur="1.9s" begin="0.55s" repeatCount="indefinite" path="M 150 37 C 157 31, 164 24, 172 18" />
          <animate attributeName="opacity" values="0;1;0" dur="1.9s" begin="0.55s" repeatCount="indefinite" />
        </circle>
        <text x="175" y="10" textAnchor="start" fontSize="16" fill="#e879f9" fontWeight="600" fontFamily="system-ui,sans-serif">Model</text>
        <text x="175" y="26" textAnchor="start" fontSize="14" fill="#e879f9" opacity="0.75" fontFamily="system-ui,sans-serif">→ Reasoning</text>

        {/* Callout: Memory → Context (left hand) */}
        <path d="M 45 172 C 28 172, 10 172, -10 172" fill="none" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <circle r="2.2" fill="rgba(153,246,228,0.98)" filter="url(#fctg-signal-glow)">
          <animateMotion dur="2.2s" begin="0.2s" repeatCount="indefinite" path="M 45 172 C 28 172, 10 172, -10 172" />
          <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <text x="-13" y="167" textAnchor="end" fontSize="16" fill="#5eead4" fontWeight="600" fontFamily="system-ui,sans-serif">Memory</text>
        <text x="-13" y="183" textAnchor="end" fontSize="14" fill="#5eead4" opacity="0.75" fontFamily="system-ui,sans-serif">→ Context</text>

        {/* Callout: Tools → Actions (right hand) */}
        <path d="M 215 172 C 228 172, 239 172, 250 172" fill="none" stroke="#fcd34d" strokeWidth="1" strokeOpacity="0.6" markerStart="url(#fctg-callout-dot)" />
        <circle r="2.2" fill="rgba(253,230,138,0.98)" filter="url(#fctg-signal-glow)">
          <animateMotion dur="2.2s" begin="0.8s" repeatCount="indefinite" path="M 215 172 C 228 172, 239 172, 250 172" />
          <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <text x="253" y="167" textAnchor="start" fontSize="16" fill="#fcd34d" fontWeight="600" fontFamily="system-ui,sans-serif">Tools</text>
        <text x="253" y="183" textAnchor="start" fontSize="14" fill="#fcd34d" opacity="0.75" fontFamily="system-ui,sans-serif">→ Actions</text>
      </svg>
    </div>
  )
}
