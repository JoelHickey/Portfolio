/**
 * Human body analogy for AI agents: Brain = Model, Body = Agent, Memory, Tools = Hands.
 * SVG illustration with head (brain), torso, arms, hands, and memory notebook.
 */
export default function FCTGBodyAnalogyDiagram() {
  return (
    <div className="mx-auto flex flex-col items-center justify-center">
      <svg
        viewBox="0 0 200 280"
        className="w-full max-w-[200px] h-auto"
        aria-hidden
      >
        <defs>
          <linearGradient id="fctg-body-torso" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#818cf8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="fctg-brain-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        {/* Head */}
        <ellipse cx="100" cy="45" rx="32" ry="38" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
        {/* Brain inside head */}
        <g transform="translate(100, 45)">
          <ellipse cx="-8" cy="-2" rx="12" ry="14" fill="url(#fctg-brain-fill)" stroke="#a78bfa" strokeWidth="1" opacity="0.9" />
          <ellipse cx="8" cy="-2" rx="12" ry="14" fill="url(#fctg-brain-fill)" stroke="#a78bfa" strokeWidth="1" opacity="0.9" />
          <path d="M -4 8 Q 0 14 4 8" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.7" />
        </g>
        {/* Body / torso */}
        <path
          d="M 68 85 Q 60 110 75 155 L 100 175 L 125 155 Q 140 110 132 85 Q 120 70 100 80 Q 80 70 68 85 Z"
          fill="url(#fctg-body-torso)"
          stroke="#22d3ee"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Left arm */}
        <path d="M 72 105 L 40 145" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />
        {/* Right arm */}
        <path d="M 128 105 L 160 145" stroke="#22d3ee" strokeWidth="8" strokeLinecap="round" />
        {/* Left hand (tools) */}
        <ellipse cx="36" cy="152" rx="12" ry="9" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Right hand (tools) */}
        <ellipse cx="164" cy="152" rx="12" ry="9" fill="#f59e0b" fillOpacity="0.5" stroke="#f59e0b" strokeWidth="1.5" />
        {/* Left leg */}
        <path d="M 85 175 L 80 250" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
        {/* Right leg */}
        <path d="M 115 175 L 120 250" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
        {/* Memory notebook */}
        <rect x="155" y="25" width="28" height="22" rx="2" fill="#0f766e" fillOpacity="0.4" stroke="#2dd4bf" strokeWidth="1" />
        <line x1="159" y1="32" x2="177" y2="32" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.9" />
        <line x1="159" y1="37" x2="175" y2="37" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.7" />
        <line x1="159" y1="42" x2="178" y2="42" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.9" />
        {/* Labels aligned with body parts */}
        <g textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif">
          <text x="100" y="22" fill="#a78bfa" fontWeight="600">Brain</text>
          <text x="100" y="32" fill="#64748b" fontSize="9">Model</text>
        </g>
        <g textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif">
          <text x="55" y="125" fill="#22d3ee" fontWeight="600">Body</text>
          <text x="55" y="135" fill="#64748b" fontSize="9">Agent</text>
        </g>
        <g textAnchor="end" fontSize="11" fontFamily="system-ui, sans-serif">
          <text x="148" y="32" fill="#2dd4bf" fontWeight="600">Memory</text>
          <text x="148" y="42" fill="#64748b" fontSize="9">Context</text>
        </g>
        <g textAnchor="middle" fontSize="11" fontFamily="system-ui, sans-serif">
          <text x="100" y="168" fill="#f59e0b" fontWeight="600">Hands</text>
          <text x="100" y="178" fill="#64748b" fontSize="9">Tools</text>
        </g>
      </svg>
    </div>
  )
}
