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
const SUB2_X = CENTER
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
  { id: 'you', x: CENTER, y: 28, r: 20, Icon: FiUser, label: 'You', fill: 'bg-slate-600/90', stroke: 'ring-cyan-400/50' },
  { id: 'agent', x: CENTER, y: 140, r: 56, Icon: null, label: 'Agent', fill: 'bg-cyan-500/25', stroke: 'ring-cyan-400/50' },
  { id: 'sub1', x: 80, y: 360, r: 40, Icon: null, label: 'Sub 1', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub2', x: SUB2_X, y: 360, r: 40, Icon: null, label: 'Sub 2', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
  { id: 'sub3', x: 420, y: 360, r: 40, Icon: null, label: 'Sub 3', fill: 'bg-violet-500/20', stroke: 'ring-violet-400/50' },
]

const AGENT_CAPABILITIES = [
  { id: 'memory', x: CENTER - 24, y: 130, Icon: FiDatabase, tint: 'text-emerald-300', ring: 'ring-emerald-400/35', bg: 'bg-emerald-500/12' },
  { id: 'model', x: CENTER, y: 160, Icon: TbBrain, tint: 'text-violet-300', ring: 'ring-violet-400/35', bg: 'bg-violet-500/12' },
  { id: 'tools', x: CENTER + 24, y: 130, Icon: FiTool, tint: 'text-amber-300', ring: 'ring-amber-400/35', bg: 'bg-amber-500/12' },
]

const SUB_AGENT_CAPABILITIES = [
  { id: 'sub1-memory', x: 70, y: 352, Icon: FiDatabase, tint: 'text-emerald-300/90', ring: 'ring-emerald-400/30', bg: 'bg-emerald-500/10' },
  { id: 'sub1-model', x: 80, y: 372, Icon: TbBrain, tint: 'text-violet-300/90', ring: 'ring-violet-400/30', bg: 'bg-violet-500/10' },
  { id: 'sub1-tools', x: 90, y: 352, Icon: FiTool, tint: 'text-amber-300/90', ring: 'ring-amber-400/30', bg: 'bg-amber-500/10' },
  { id: 'sub2-memory', x: SUB2_X - 10, y: 352, Icon: FiDatabase, tint: 'text-emerald-300/90', ring: 'ring-emerald-400/30', bg: 'bg-emerald-500/10' },
  { id: 'sub2-model', x: SUB2_X, y: 372, Icon: TbBrain, tint: 'text-violet-300/90', ring: 'ring-violet-400/30', bg: 'bg-violet-500/10' },
  { id: 'sub2-tools', x: SUB2_X + 10, y: 352, Icon: FiTool, tint: 'text-amber-300/90', ring: 'ring-amber-400/30', bg: 'bg-amber-500/10' },
  { id: 'sub3-memory', x: 410, y: 352, Icon: FiDatabase, tint: 'text-emerald-300/90', ring: 'ring-emerald-400/30', bg: 'bg-emerald-500/10' },
  { id: 'sub3-model', x: 420, y: 372, Icon: TbBrain, tint: 'text-violet-300/90', ring: 'ring-violet-400/30', bg: 'bg-violet-500/10' },
  { id: 'sub3-tools', x: 430, y: 352, Icon: FiTool, tint: 'text-amber-300/90', ring: 'ring-amber-400/30', bg: 'bg-amber-500/10' },
]
// All dots start at 0s so both diagrams animate in sync when the slide appears
export default function FCTGMultiAgentDiagram({ compact }) {
  const youNode = NODES.find((node) => node.id === 'you')
  const agentNode = NODES.find((node) => node.id === 'agent')
  const sub1Node = NODES.find((node) => node.id === 'sub1')
  const sub2Node = NODES.find((node) => node.id === 'sub2')
  const sub3Node = NODES.find((node) => node.id === 'sub3')
  const [youAgentA, youAgentB] = edgePoints(youNode.x, youNode.y, youNode.r, agentNode.x, agentNode.y, agentNode.r)
  const [agentSub1A, agentSub1B] = edgePoints(CENTER, 140, agentNode.r, 80, 360, sub1Node.r)
  const [agentSub2A, agentSub2B] = edgePoints(CENTER, 140, agentNode.r, SUB2_X, 360, sub2Node.r)
  const [agentSub3A, agentSub3B] = edgePoints(CENTER, 140, agentNode.r, 420, 360, sub3Node.r)
  const [sub1Sub2A, sub1Sub2B] = edgePoints(80, 360, sub1Node.r, SUB2_X, 360, sub2Node.r)
  const [sub2Sub3A, sub2Sub3B] = edgePoints(SUB2_X, 360, sub2Node.r, 420, 360, sub3Node.r)
  const [sub3AgentA, sub3AgentB] = edgePoints(420, 360, sub3Node.r, CENTER, 140, agentNode.r)

  // Multiple dot paths (top-down layout) — durations scaled by path length for same speed
  const PATH_YOU_AGENT = `M ${youNode.x},${youNode.y} L ${agentNode.x},${agentNode.y} L ${youNode.x},${youNode.y}`
  const PATH_AGENT_SUB1 = `M ${CENTER},140 L 80,360 L ${CENTER},140`
  const PATH_AGENT_SUB2 = `M ${CENTER},168 L ${SUB2_X},342 L ${CENTER},168`
  const PATH_AGENT_SUB3 = `M ${CENTER},140 L 420,360 L ${CENTER},140`
  const PATH_SUB1_SUB2 = `M 80,360 L ${SUB2_X},360 L 80,360`
  const PATH_SUB2_SUB3 = `M ${SUB2_X},360 L 420,360 L ${SUB2_X},360`
  const PATH_AGENT_MMT = `M ${CENTER - 18},134 L ${CENTER},154 L ${CENTER + 18},134 L ${CENTER - 18},134`
  const PATH_SUB1_MMT = 'M 72,356 L 80,367 L 88,356 L 72,356'
  const PATH_SUB2_MMT = `M ${SUB2_X - 8},356 L ${SUB2_X},367 L ${SUB2_X + 8},356 L ${SUB2_X - 8},356`
  const PATH_SUB3_MMT = 'M 412,356 L 420,367 L 428,356 L 412,356'
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
        {/* Agent → Sub 1, Sub 2, Sub 3 */}
        <line x1={agentSub1A[0]} y1={agentSub1A[1]} x2={agentSub1B[0]} y2={agentSub1B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentSub2A[0]} y1={agentSub2A[1]} x2={agentSub2B[0]} y2={agentSub2B[1]} stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentSub3A[0]} y1={agentSub3A[1]} x2={agentSub3B[0]} y2={agentSub3B[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
        {/* Sub1 ↔ Sub2, Sub2 ↔ Sub3 (peer handoffs, fuchsia) */}
        <line x1={sub1Sub2A[0]} y1={sub1Sub2A[1]} x2={sub1Sub2B[0]} y2={sub1Sub2B[1]} stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="1" />
        <line x1={sub2Sub3A[0]} y1={sub2Sub3A[1]} x2={sub2Sub3B[0]} y2={sub2Sub3B[1]} stroke="#e879f9" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="1" />
        {/* Sub3 → Agent */}
        <line x1={sub3AgentA[0]} y1={sub3AgentA[1]} x2={sub3AgentB[0]} y2={sub3AgentB[1]} stroke="url(#fctg-multi-line)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.9" />
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
            {node.Icon && (
              <node.Icon
                className="shrink-0 text-cyan-200"
                style={{
                  width: node.id === 'agent' ? (compact ? 14 : 22) : node.id.startsWith('sub') ? (compact ? 10 : 12) : '50%',
                  height: node.id === 'agent' ? (compact ? 14 : 22) : node.id.startsWith('sub') ? (compact ? 10 : 12) : '50%',
                  minWidth: compact ? 8 : 12,
                  minHeight: compact ? 8 : 12,
                }}
              />
            )}
          </div>
        ))}
        {AGENT_CAPABILITIES.map((capability) => (
          <div
            key={capability.id}
            className={`absolute rounded-full ${capability.bg} ring-1 ${capability.ring} flex items-center justify-center`}
            style={{
              left: `${(capability.x / W) * 100}%`,
              top: `${(capability.y / H) * 100}%`,
              width: compact ? 16 : 22,
              height: compact ? 16 : 22,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <capability.Icon className={capability.tint} style={{ width: compact ? 8 : 11, height: compact ? 8 : 11 }} />
          </div>
        ))}
        {SUB_AGENT_CAPABILITIES.map((capability) => (
          <div
            key={capability.id}
            className={`absolute rounded-full ${capability.bg} ring-1 ${capability.ring} flex items-center justify-center`}
            style={{
              left: `${(capability.x / W) * 100}%`,
              top: `${(capability.y / H) * 100}%`,
              width: compact ? 10 : 12,
              height: compact ? 10 : 12,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <capability.Icon className={capability.tint} style={{ width: compact ? 5 : 6, height: compact ? 5 : 6 }} />
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
        {/* Dot 7: internal capability loop inside the agent */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="2.5" fill="#2dd4bf">
            <animateMotion dur={`${DUR_AGENT_MMT}s`} repeatCount="indefinite" path={PATH_AGENT_MMT} />
          </circle>
        </g>
        {/* Dots 8–10: internal capability loops inside the sub-agents */}
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="1.6" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB1_MMT}s`} repeatCount="indefinite" path={PATH_SUB1_MMT} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="1.6" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB2_MMT}s`} repeatCount="indefinite" path={PATH_SUB2_MMT} />
          </circle>
        </g>
        <g filter="url(#fctg-multi-glow-dot)">
          <circle r="1.6" fill="#2dd4bf">
            <animateMotion dur={`${DUR_SUB3_MMT}s`} repeatCount="indefinite" path={PATH_SUB3_MMT} />
          </circle>
        </g>
      </svg>
    </div>
  )
}
