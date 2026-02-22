import { FiUser } from 'react-icons/fi'
import { TbRobot } from 'react-icons/tb'

/**
 * Multi-agent: You → Orchestrator → [Agent 1 | Agent 2 | Agent 3] → back
 * Orchestrator delegates to specialist agents, consolidates responses.
 */
const W = 480
const H = 160

const NODES = [
  { id: 'you', x: 70, y: 80, r: 20, Icon: FiUser, label: 'You', fill: 'bg-slate-600/90', stroke: 'ring-cyan-400/50' },
  { id: 'orchestrator', x: 220, y: 80, r: 26, Icon: TbRobot, label: 'Orchestrator', fill: 'bg-cyan-500/25', stroke: 'ring-cyan-400/50' },
  { id: 'agent1', x: 380, y: 35, r: 18, Icon: TbRobot, label: 'Agent 1', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'agent2', x: 380, y: 80, r: 18, Icon: TbRobot, label: 'Agent 2', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'agent3', x: 380, y: 125, r: 18, Icon: TbRobot, label: 'Agent 3', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
]

const PATH = 'M 70,80 L 220,80 L 380,35 L 220,80 L 380,80 L 220,80 L 380,125 L 220,80 L 70,80'
const DURATION = 5

function edgePoints(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1
  const d = Math.hypot(dx, dy) || 1
  return [
    [x1 + (r1 * dx) / d, y1 + (r1 * dy) / d],
    [x2 - (r2 * dx) / d, y2 - (r2 * dy) / d],
  ]
}

export default function FCTGMultiAgentDiagram() {
  const [youOrchA, youOrchB] = edgePoints(70, 80, 20, 220, 80, 26)
  const [orchYouA, orchYouB] = edgePoints(220, 80, 26, 70, 80, 20)
  const [orchA1A, orchA1B] = edgePoints(220, 80, 26, 380, 35, 18)
  const [orchA2A, orchA2B] = edgePoints(220, 80, 26, 380, 80, 18)
  const [orchA3A, orchA3B] = edgePoints(220, 80, 26, 380, 125, 18)

  return (
    <div className="relative w-full max-w-xl mx-auto py-8" style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fctg-multi-line" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="fctg-multi-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1={youOrchA[0]} y1={youOrchA[1]} x2={youOrchB[0]} y2={youOrchB[1]} stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={orchYouA[0]} y1={orchYouA[1]} x2={orchYouB[0]} y2={orchYouB[1]} stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={orchA1A[0]} y1={orchA1A[1]} x2={orchA1B[0]} y2={orchA1B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={orchA2A[0]} y1={orchA2A[1]} x2={orchA2B[0]} y2={orchA2B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={orchA3A[0]} y1={orchA3A[1]} x2={orchA3B[0]} y2={orchA3B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
      </svg>
      <div className="absolute inset-0 pointer-events-none z-10">
        {NODES.map(({ x, y, r, Icon, label, fill, stroke }) => (
          <div
            key={label}
            className={`absolute rounded-full ${fill} ring-2 ${stroke} flex flex-col items-center justify-center`}
            style={{
              left: `${(x / W) * 100}%`,
              top: `${(y / H) * 100}%`,
              width: `${(r * 2 / W) * 100}%`,
              aspectRatio: '1',
              transform: 'translate(-50%, -50%)',
              minWidth: 40,
              minHeight: 40,
            }}
          >
            <Icon className="w-1/2 h-1/2 shrink-0 text-cyan-200" style={{ minWidth: 16, minHeight: 16 }} />
            <span className="text-[9px] font-medium text-slate-300 mt-0.5 leading-tight">{label}</span>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full z-20 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="fctg-multi-glow-dot" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="5" fill="#a78bfa">
            <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" path={PATH} />
          </circle>
        </g>
      </svg>
    </div>
  )
}
