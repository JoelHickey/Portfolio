import { useState, useEffect, useRef } from 'react'
import { FiUser, FiTool, FiDatabase } from 'react-icons/fi'
import { TbBrain, TbRobot } from 'react-icons/tb'

/**
 * Agentic multi-agent: You → Agent → [Memory, Model, Tools] and Sub 1, 2, 3.
 * Top-down layout. Agent plans, coordinates with M/M/T, delegates; sub-agents can hand off.
 */
const W = 400
const H = 420
const DURATION = 4.5

const MULTI_AGENT_STEPS = [
  'You send the prompt.',
  'Agent receives and delegates.',
  'Agent plans, coordinates with Memory, Model, and Tools.',
  'Agent delegates to Sub-agent 1.',
  'Sub-agent 1 hands off to Sub-agent 2.',
  'Sub-agent 2 hands off to Sub-agent 3.',
  'Sub-agent 3 responds.',
  'Response back to you.',
]

// Caption cycles every 17.5s to match single-agent diagram
const STEP_INTERVAL = DURATION / MULTI_AGENT_STEPS.length

function getMultiStepForTime(t) {
  const cycle = t % DURATION
  return Math.min(Math.floor(cycle / STEP_INTERVAL), MULTI_AGENT_STEPS.length - 1)
}

export function FCTGMultiAgentCaption({ compact }) {
  const [step, setStep] = useState(0)
  const startRef = useRef(null)

  useEffect(() => {
    let raf
    const tick = () => {
      if (startRef.current == null) startRef.current = performance.now()
      const elapsed = (performance.now() - startRef.current) / 1000
      setStep(getMultiStepForTime(elapsed))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <p className={`text-center text-slate-500 text-sm min-h-10 flex items-center justify-center ${compact ? 'mt-2' : 'mt-4'}`}>
      <span key={step} style={{ animation: 'fctg-fade-in 0.5s ease-out' }}>{MULTI_AGENT_STEPS[step]}</span>
    </p>
  )
}

function edgePoints(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1
  const d = Math.hypot(dx, dy) || 1
  return [
    [x1 + (r1 * dx) / d, y1 + (r1 * dy) / d],
    [x2 - (r2 * dx) / d, y2 - (r2 * dy) / d],
  ]
}

const NODES = [
  { id: 'you', x: 200, y: 45, r: 20, Icon: FiUser, label: 'You', fill: 'bg-slate-600/90', stroke: 'ring-cyan-400/50' },
  { id: 'agent', x: 200, y: 130, r: 28, Icon: TbRobot, label: 'Agent', fill: 'bg-cyan-500/25', stroke: 'ring-cyan-400/50' },
  { id: 'memory', x: 100, y: 210, r: 16, Icon: FiDatabase, label: 'Memory', fill: 'bg-emerald-500/20', stroke: 'ring-emerald-400/40' },
  { id: 'model', x: 200, y: 210, r: 16, Icon: TbBrain, label: 'Model', fill: 'bg-violet-500/25', stroke: 'ring-violet-400/50' },
  { id: 'tools', x: 300, y: 210, r: 16, Icon: FiTool, label: 'Tools', fill: 'bg-amber-500/20', stroke: 'ring-amber-400/40' },
  { id: 'sub1', x: 100, y: 310, r: 18, Icon: TbRobot, label: 'Sub 1', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub2', x: 200, y: 310, r: 18, Icon: TbRobot, label: 'Sub 2', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub3', x: 300, y: 310, r: 18, Icon: TbRobot, label: 'Sub 3', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
]

// Sub-agent M/M/T (small, dashed) — each sub has its own
const SUB1_MMT = [
  { x: 70, y: 385, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 100, y: 385, label: 'M', bg: 'bg-violet-500/30' },
  { x: 130, y: 385, label: 'T', bg: 'bg-amber-500/30' },
]
const SUB2_MMT = [
  { x: 170, y: 385, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 200, y: 385, label: 'M', bg: 'bg-violet-500/30' },
  { x: 230, y: 385, label: 'T', bg: 'bg-amber-500/30' },
]
const SUB3_MMT = [
  { x: 270, y: 385, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 300, y: 385, label: 'M', bg: 'bg-violet-500/30' },
  { x: 330, y: 385, label: 'T', bg: 'bg-amber-500/30' },
]
// Stagger so multi-agent dots don't start in sync with single-system (single-system cycle ~4.5s)
const MULTI_BEGIN = '2.25s'
const MULTI_BEGIN_1 = '3.75s'   // +1.5s
const MULTI_BEGIN_2 = '5.25s'   // +3s
const MULTI_BEGIN_3 = '3.25s'   // +1s
const MULTI_BEGIN_4 = '3.05s'   // +0.8s
const MULTI_BEGIN_5 = '3.85s'   // +1.6s
export default function FCTGMultiAgentDiagram({ compact }) {
  const [youAgentA, youAgentB] = edgePoints(200, 45, 20, 200, 130, 28)
  const [agentMemA, agentMemB] = edgePoints(200, 130, 28, 100, 210, 16)
  const [agentModelA, agentModelB] = edgePoints(200, 130, 28, 200, 210, 16)
  const [agentToolsA, agentToolsB] = edgePoints(200, 130, 28, 300, 210, 16)
  const [agentSub1A, agentSub1B] = edgePoints(200, 130, 28, 100, 310, 18)
  const [agentSub2A, agentSub2B] = edgePoints(200, 130, 28, 200, 310, 18)
  const [agentSub3A, agentSub3B] = edgePoints(200, 130, 28, 300, 310, 18)
  const [sub1Sub2A, sub1Sub2B] = edgePoints(100, 310, 18, 200, 310, 18)
  const [sub2Sub3A, sub2Sub3B] = edgePoints(200, 310, 18, 300, 310, 18)
  const [sub3AgentA, sub3AgentB] = edgePoints(300, 310, 18, 200, 130, 28)

  // Multiple dot paths (top-down layout)
  const PATH_YOU_AGENT = 'M 200,45 L 200,130 L 200,45' // 10s
  const PATH_AGENT_SUB1 = 'M 200,130 L 100,310 L 200,130' // 18s
  const PATH_AGENT_SUB2 = 'M 200,130 L 200,310 L 200,130' // 18s
  const PATH_AGENT_SUB3 = 'M 200,130 L 300,310 L 200,130' // 18s
  const PATH_SUB1_SUB2 = 'M 100,310 L 200,310 L 100,310' // 12s
  const PATH_SUB2_SUB3 = 'M 200,310 L 300,310 L 200,310' // 12s
  const PATH_AGENT_MMT = 'M 200,130 L 100,210 L 200,130 L 200,210 L 200,130 L 300,210 L 200,130' // 8s
  const PATH_SUB1_MMT = 'M 100,310 L 70,385 L 100,310 L 100,385 L 100,310 L 130,385 L 100,310' // 10s
  const PATH_SUB2_MMT = 'M 200,310 L 170,385 L 200,310 L 200,385 L 200,310 L 230,385 L 200,310' // 10s
  const PATH_SUB3_MMT = 'M 300,310 L 270,385 L 300,310 L 300,385 L 300,310 L 330,385 L 300,310' // 10s

  return (
    <div className={`relative w-full mx-auto ${compact ? 'max-w-[280px] py-2 min-h-0' : 'max-w-2xl py-6 min-h-[320px]'}`} style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fctg-multi-line" x1="0%" y1="0%" x2="0%" y2="100%">
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
        {/* You ↔ Agent */}
        <line x1={youAgentA[0]} y1={youAgentA[1]} x2={youAgentB[0]} y2={youAgentB[1]} stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        {/* Agent → Memory, Model, Tools */}
        <line x1={agentMemA[0]} y1={agentMemA[1]} x2={agentMemB[0]} y2={agentMemB[1]} stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentModelA[0]} y1={agentModelA[1]} x2={agentModelB[0]} y2={agentModelB[1]} stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentToolsA[0]} y1={agentToolsA[1]} x2={agentToolsB[0]} y2={agentToolsB[1]} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        {/* Agent → Sub 1, Sub 2, Sub 3 */}
        <line x1={agentSub1A[0]} y1={agentSub1A[1]} x2={agentSub1B[0]} y2={agentSub1B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentSub2A[0]} y1={agentSub2A[1]} x2={agentSub2B[0]} y2={agentSub2B[1]} stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentSub3A[0]} y1={agentSub3A[1]} x2={agentSub3B[0]} y2={agentSub3B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        {/* Sub1 ↔ Sub2, Sub2 ↔ Sub3 (peer handoffs, fuchsia) */}
        <line x1={sub1Sub2A[0]} y1={sub1Sub2A[1]} x2={sub1Sub2B[0]} y2={sub1Sub2B[1]} stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="1" />
        <line x1={sub2Sub3A[0]} y1={sub2Sub3A[1]} x2={sub2Sub3B[0]} y2={sub2Sub3B[1]} stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="1" />
        {/* Sub3 → Agent */}
        <line x1={sub3AgentA[0]} y1={sub3AgentA[1]} x2={sub3AgentB[0]} y2={sub3AgentB[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        {/* Sub 1 → M/M/T (dashed) */}
        <line x1={100} y1={328} x2={70} y2={385} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={100} y1={328} x2={100} y2={385} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={100} y1={328} x2={130} y2={385} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Sub 2 → M/M/T (dashed) */}
        <line x1={200} y1={328} x2={170} y2={385} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={200} y1={328} x2={200} y2={385} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={200} y1={328} x2={230} y2={385} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Sub 3 → M/M/T (dashed) */}
        <line x1={300} y1={328} x2={270} y2={385} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={300} y1={328} x2={300} y2={385} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={300} y1={328} x2={330} y2={385} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
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
              minWidth: compact ? 24 : 36,
              minHeight: compact ? 24 : 36,
            }}
          >
            <Icon className="w-1/2 h-1/2 shrink-0 text-cyan-200" style={{ minWidth: compact ? 8 : 12, minHeight: compact ? 8 : 12 }} />
            <span className={`font-medium text-slate-300 leading-tight ${compact ? 'text-[6px] mt-0' : 'text-[8px] mt-0.5'}`}>{label}</span>
          </div>
        ))}
        {/* Sub 1, 2, 3 M/M/T mini nodes */}
        {[...SUB1_MMT, ...SUB2_MMT, ...SUB3_MMT].map((n, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${n.bg} ring-1 ring-slate-500/50`}
            style={{
              left: `${(n.x / W) * 100}%`,
              top: `${(n.y / H) * 100}%`,
              width: '4%',
              aspectRatio: '1',
              transform: 'translate(-50%, -50%)',
              minWidth: 16,
              minHeight: 16,
              fontSize: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(203,213,225,0.9)',
            }}
          >
            {n.label}
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
        {/* Dot 1: You↔Agent (cyan) — offset so multi-agent doesn't sync with single-system */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="5" fill="#22d3ee">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_YOU_AGENT} begin={MULTI_BEGIN} />
          </circle>
        </g>
        {/* Dots 2–4: Agent→Sub1, Sub2, Sub3 (staggered) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#22d3ee">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={PATH_AGENT_SUB1} begin={MULTI_BEGIN} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#818cf8">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={PATH_AGENT_SUB2} begin={MULTI_BEGIN_1} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#e879f9">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={PATH_AGENT_SUB3} begin={MULTI_BEGIN_2} />
          </circle>
        </g>
        {/* Dots 5–6: Sub1↔Sub2, Sub2↔Sub3 (pink) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#f472b6">
            <animateMotion dur="3s" repeatCount="indefinite" path={PATH_SUB1_SUB2} begin={MULTI_BEGIN} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#f472b6">
            <animateMotion dur="3s" repeatCount="indefinite" path={PATH_SUB2_SUB3} begin={MULTI_BEGIN_3} />
          </circle>
        </g>
        {/* Dot 7: Agent→Memory→Model→Tools (teal) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#2dd4bf">
            <animateMotion dur="2s" repeatCount="indefinite" path={PATH_AGENT_MMT} begin={MULTI_BEGIN} />
          </circle>
        </g>
        {/* Dots 8–10: Sub 1, 2, 3 → their M/M/T (teal, staggered) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_SUB1_MMT} begin={MULTI_BEGIN} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_SUB2_MMT} begin={MULTI_BEGIN_4} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={PATH_SUB3_MMT} begin={MULTI_BEGIN_5} />
          </circle>
        </g>
      </svg>
    </div>
  )
}
