import { useState, useEffect, useRef } from 'react'
import { FiUser, FiTool, FiDatabase } from 'react-icons/fi'
import { TbBrain, TbRobot } from 'react-icons/tb'

/**
 * Agentic multi-agent: You → Agent → [Memory, Model, Tools] and Sub 1, 2, 3.
 * Top-down layout. Agent plans, coordinates with M/M/T, delegates; sub-agents can hand off.
 */
const W = 500
const H = 500
const CENTER = 250
const SUB2_X = 280 // offset right so Agent→Sub2 line doesn't pass through Model
const DURATION = 4.5
// Dot speed (units/sec) — duration = pathLength / DOT_SPEED for consistent speed
const DOT_SPEED = 100

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

function getPathLength(d) {
  if (typeof document === 'undefined') return 0
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', d)
  return path.getTotalLength()
}

const NODES = [
  { id: 'you', x: CENTER, y: 50, r: 20, Icon: FiUser, label: 'You', fill: 'bg-slate-600/90', stroke: 'ring-cyan-400/50' },
  { id: 'agent', x: CENTER, y: 140, r: 28, Icon: TbRobot, label: 'Agent', fill: 'bg-cyan-500/25', stroke: 'ring-cyan-400/50' },
  { id: 'memory', x: 80, y: 230, r: 16, Icon: FiDatabase, label: 'Memory', fill: 'bg-emerald-500/20', stroke: 'ring-emerald-400/40' },
  { id: 'model', x: 230, y: 230, r: 16, Icon: TbBrain, label: 'Model', fill: 'bg-violet-500/25', stroke: 'ring-violet-400/50' },
  { id: 'tools', x: 420, y: 230, r: 16, Icon: FiTool, label: 'Tools', fill: 'bg-amber-500/20', stroke: 'ring-amber-400/40' },
  { id: 'sub1', x: 80, y: 360, r: 18, Icon: TbRobot, label: 'Sub 1', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub2', x: SUB2_X, y: 360, r: 18, Icon: TbRobot, label: 'Sub 2', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub3', x: 420, y: 360, r: 18, Icon: TbRobot, label: 'Sub 3', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
]

// Sub-agent M/M/T (small, dashed) — each sub has its own, spaced to avoid overlap
const SUB1_MMT = [
  { x: 50, y: 435, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 80, y: 435, label: 'M', bg: 'bg-violet-500/30' },
  { x: 110, y: 435, label: 'T', bg: 'bg-amber-500/30' },
]
const SUB2_MMT = [
  { x: 250, y: 435, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 280, y: 435, label: 'M', bg: 'bg-violet-500/30' },
  { x: 310, y: 435, label: 'T', bg: 'bg-amber-500/30' },
]
const SUB3_MMT = [
  { x: 390, y: 435, label: 'M', bg: 'bg-emerald-500/30' },
  { x: 420, y: 435, label: 'M', bg: 'bg-violet-500/30' },
  { x: 450, y: 435, label: 'T', bg: 'bg-amber-500/30' },
]
// All dots start at 0s so both diagrams animate in sync when the slide appears
export default function FCTGMultiAgentDiagram({ compact }) {
  const [youAgentA, youAgentB] = edgePoints(CENTER, 50, 20, CENTER, 140, 28)
  const [agentMemA, agentMemB] = edgePoints(CENTER, 140, 28, 80, 230, 16)
  const [agentModelA, agentModelB] = edgePoints(CENTER, 140, 28, 230, 230, 16)
  const [agentToolsA, agentToolsB] = edgePoints(CENTER, 140, 28, 420, 230, 16)
  const [agentSub1A, agentSub1B] = edgePoints(CENTER, 140, 28, 80, 360, 18)
  const [agentSub2A, agentSub2B] = edgePoints(CENTER, 140, 28, SUB2_X, 360, 18)
  const [agentSub3A, agentSub3B] = edgePoints(CENTER, 140, 28, 420, 360, 18)
  const [sub1Sub2A, sub1Sub2B] = edgePoints(80, 360, 18, SUB2_X, 360, 18)
  const [sub2Sub3A, sub2Sub3B] = edgePoints(SUB2_X, 360, 18, 420, 360, 18)
  const [sub3AgentA, sub3AgentB] = edgePoints(420, 360, 18, CENTER, 140, 28)

  // Multiple dot paths (top-down layout) — durations scaled by path length for same speed
  const PATH_YOU_AGENT = `M ${CENTER},50 L ${CENTER},140 L ${CENTER},50`
  const PATH_AGENT_SUB1 = `M ${CENTER},140 L 80,360 L ${CENTER},140`
  const PATH_AGENT_SUB2 = `M ${CENTER},168 L ${SUB2_X},342 L ${CENTER},168`
  const PATH_AGENT_SUB3 = `M ${CENTER},140 L 420,360 L ${CENTER},140`
  const PATH_SUB1_SUB2 = `M 80,360 L ${SUB2_X},360 L 80,360`
  const PATH_SUB2_SUB3 = `M ${SUB2_X},360 L 420,360 L ${SUB2_X},360`
  const PATH_AGENT_MMT = `M ${CENTER},140 L 80,230 L ${CENTER},140 L 230,230 L ${CENTER},140 L 420,230 L ${CENTER},140`
  const PATH_SUB1_MMT = 'M 80,378 L 50,435 L 80,378 L 80,435 L 80,378 L 110,435 L 80,378'
  const PATH_SUB2_MMT = `M ${SUB2_X},378 L 250,435 L ${SUB2_X},378 L ${SUB2_X},435 L ${SUB2_X},378 L 310,435 L ${SUB2_X},378`
  const PATH_SUB3_MMT = 'M 420,378 L 390,435 L 420,378 L 420,435 L 420,378 L 450,435 L 420,378'
  // Use getTotalLength() for exact path lengths — duration = length / DOT_SPEED for same speed
  const DUR_YOU_AGENT = getPathLength(PATH_YOU_AGENT) / DOT_SPEED
  const DUR_AGENT_SUB1 = getPathLength(PATH_AGENT_SUB1) / DOT_SPEED
  const DUR_AGENT_SUB2 = getPathLength(PATH_AGENT_SUB2) / DOT_SPEED
  const DUR_AGENT_SUB3 = getPathLength(PATH_AGENT_SUB3) / DOT_SPEED
  const DUR_SUB1_SUB2 = getPathLength(PATH_SUB1_SUB2) / DOT_SPEED
  const DUR_SUB2_SUB3 = getPathLength(PATH_SUB2_SUB3) / DOT_SPEED
  const DUR_AGENT_MMT = getPathLength(PATH_AGENT_MMT) / DOT_SPEED
  const DUR_SUB1_MMT = getPathLength(PATH_SUB1_MMT) / DOT_SPEED
  const DUR_SUB2_MMT = getPathLength(PATH_SUB2_MMT) / DOT_SPEED
  const DUR_SUB3_MMT = getPathLength(PATH_SUB3_MMT) / DOT_SPEED

  return (
    <div className={`relative w-full mx-auto ${compact ? 'max-w-[360px] py-2 min-h-0' : 'max-w-2xl py-6 min-h-[380px]'}`} style={{ aspectRatio: `${W}/${H}` }}>
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
        <line x1={80} y1={378} x2={50} y2={435} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={80} y1={378} x2={80} y2={435} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={80} y1={378} x2={110} y2={435} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Sub 2 → M/M/T (dashed) */}
        <line x1={SUB2_X} y1={378} x2={250} y2={435} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={SUB2_X} y1={378} x2={280} y2={435} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={SUB2_X} y1={378} x2={310} y2={435} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Sub 3 → M/M/T (dashed) */}
        <line x1={420} y1={378} x2={390} y2={435} stroke="#2dd4bf" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={420} y1={378} x2={420} y2={435} stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1={420} y1={378} x2={450} y2={435} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" strokeOpacity="0.7" />
      </svg>
      <div className="absolute inset-0 pointer-events-none z-10">
        {NODES.map((node) => (
          <div
            key={node.label}
            className={`absolute rounded-full ${node.fill} ring-2 ${node.stroke} flex flex-col items-center justify-center`}
            style={{
              left: `${(node.x / W) * 100}%`,
              top: `${(node.y / H) * 100}%`,
              width: `${(node.r * 2 / W) * 100}%`,
              aspectRatio: '1',
              transform: 'translate(-50%, -50%)',
              minWidth: compact ? 24 : 36,
              minHeight: compact ? 24 : 36,
            }}
          >
            <node.Icon className="w-1/2 h-1/2 shrink-0 text-cyan-200" style={{ minWidth: compact ? 8 : 12, minHeight: compact ? 8 : 12 }} />
            <span className={`font-medium text-slate-300 leading-tight ${compact ? 'text-[6px] mt-0' : 'text-[8px] mt-0.5'}`}>{node.label}</span>
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
        {/* Dot 1: You↔Agent (cyan) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="5" fill="#22d3ee">
            <animateMotion dur={`${DUR_YOU_AGENT}s`} repeatCount="indefinite" path={PATH_YOU_AGENT} />
          </circle>
        </g>
        {/* Dots 2–4: Agent→Sub1, Sub2, Sub3 */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#22d3ee">
            <animateMotion dur={`${DUR_AGENT_SUB1}s`} repeatCount="indefinite" path={PATH_AGENT_SUB1} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#818cf8">
            <animateMotion dur={`${DUR_AGENT_SUB2}s`} repeatCount="indefinite" path={PATH_AGENT_SUB2} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#e879f9">
            <animateMotion dur={`${DUR_AGENT_SUB3}s`} repeatCount="indefinite" path={PATH_AGENT_SUB3} />
          </circle>
        </g>
        {/* Dots 5–6: Sub1↔Sub2, Sub2↔Sub3 (pink) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#f472b6">
            <animateMotion dur={`${DUR_SUB1_SUB2}s`} repeatCount="indefinite" path={PATH_SUB1_SUB2} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#f472b6">
            <animateMotion dur={`${DUR_SUB2_SUB3}s`} repeatCount="indefinite" path={PATH_SUB2_SUB3} />
          </circle>
        </g>
        {/* Dot 7: Agent→Memory→Model→Tools (teal) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="4" fill="#2dd4bf">
            <animateMotion dur={`${DUR_AGENT_MMT}s`} repeatCount="indefinite" path={PATH_AGENT_MMT} />
          </circle>
        </g>
        {/* Dots 8–10: Sub 1, 2, 3 → their M/M/T (teal) */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB1_MMT}s`} repeatCount="indefinite" path={PATH_SUB1_MMT} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB2_MMT}s`} repeatCount="indefinite" path={PATH_SUB2_MMT} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="3" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB3_MMT}s`} repeatCount="indefinite" path={PATH_SUB3_MMT} />
          </circle>
        </g>
      </svg>
    </div>
  )
}
