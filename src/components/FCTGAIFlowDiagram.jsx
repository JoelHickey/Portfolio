import { useState, useEffect } from 'react'
import { FiUser, FiTool, FiDatabase } from 'react-icons/fi'
import { TbBrain, TbRobot } from 'react-icons/tb'

const AGENT_FLOW_STEPS = [
  'You → Agent → [Memory | Model | Tools]',
  'Agent loads context.',
  'Retrieved data returns to the Agent.',
  'Agent calls the Model and passes that context in the prompt.',
  'Model output returns to the Agent.',
]

export function FCTGAIFlowCaption({ compact }) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % AGENT_FLOW_STEPS.length), (4.5 * 1000) / AGENT_FLOW_STEPS.length)
    return () => clearInterval(t)
  }, [])
  return (
    <p className={`text-center text-slate-500 flex items-center justify-center ${compact ? 'mt-1 text-[10px] min-h-6' : 'mt-4 text-sm min-h-10'}`}>
      <span key={step} style={{ animation: 'fctg-fade-in 0.5s ease-out' }}>{AGENT_FLOW_STEPS[step]}</span>
    </p>
  )
}

/**
 * Simple hub-and-spoke: You → Agent → [Model | Tools | Memory]
 * Top-down layout. Sequence explained in caption.
 */
const W = 200
const H = 320

const NODES = [
  { id: 'you', x: 100, y: 45, r: 22, Icon: FiUser, label: 'You', fill: 'bg-slate-600/90', stroke: 'ring-cyan-400/50' },
  { id: 'agent', x: 100, y: 160, r: 28, Icon: TbRobot, label: 'Agent', fill: 'bg-cyan-500/25', stroke: 'ring-cyan-400/50' },
  { id: 'memory', x: 40, y: 280, r: 20, Icon: FiDatabase, label: 'Memory', fill: 'bg-emerald-500/20', stroke: 'ring-emerald-400/40' },
  { id: 'model', x: 100, y: 280, r: 20, Icon: TbBrain, label: 'Model', fill: 'bg-violet-500/25', stroke: 'ring-violet-400/50' },
  { id: 'tools', x: 160, y: 280, r: 20, Icon: FiTool, label: 'Tools', fill: 'bg-amber-500/20', stroke: 'ring-amber-400/40' },
]

const PATH = 'M 100,45 L 100,160 L 40,280 L 100,160 L 100,280 L 100,160 L 160,280 L 100,160 L 100,45'
const DURATION = 4.5

function edgePoints(x1, y1, r1, x2, y2, r2) {
  const dx = x2 - x1, dy = y2 - y1
  const d = Math.hypot(dx, dy) || 1
  return [
    [x1 + (r1 * dx) / d, y1 + (r1 * dy) / d],
    [x2 - (r2 * dx) / d, y2 - (r2 * dy) / d],
  ]
}

export default function FCTGAIFlowDiagram({ compact }) {
  const [youAgentA, youAgentB] = edgePoints(100, 45, 22, 100, 160, 28)
  const [agentYouA, agentYouB] = edgePoints(100, 160, 28, 100, 45, 22)
  const [agentMemA, agentMemB] = edgePoints(100, 160, 28, 40, 280, 20)
  const [agentModelA, agentModelB] = edgePoints(100, 160, 28, 100, 280, 20)
  const [agentToolsA, agentToolsB] = edgePoints(100, 160, 28, 160, 280, 20)

  return (
    <div className={`relative w-full mx-auto ${compact ? 'max-w-[160px] py-2' : 'max-w-xl py-8'}`} style={{ aspectRatio: `${W}/${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full z-0 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="fctg-line" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
          <filter id="fctg-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <line x1={youAgentA[0]} y1={youAgentA[1]} x2={youAgentB[0]} y2={youAgentB[1]} stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentYouA[0]} y1={agentYouA[1]} x2={agentYouB[0]} y2={agentYouB[1]} stroke="#22d3ee" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1={agentModelA[0]} y1={agentModelA[1]} x2={agentModelB[0]} y2={agentModelB[1]} stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.95" />
        <line x1={agentToolsA[0]} y1={agentToolsA[1]} x2={agentToolsB[0]} y2={agentToolsB[1]} stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.95" />
        <line x1={agentMemA[0]} y1={agentMemA[1]} x2={agentMemB[0]} y2={agentMemB[1]} stroke="url(#fctg-line)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.9" />
        <g filter="url(#fctg-glow)">
          <circle r="6" fill="#22d3ee">
            <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" path={PATH} />
          </circle>
        </g>
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
              minWidth: compact ? 28 : 44,
              minHeight: compact ? 28 : 44,
            }}
          >
            <node.Icon className="w-1/2 h-1/2 shrink-0 text-cyan-200" style={{ minWidth: compact ? 12 : 18, minHeight: compact ? 12 : 18 }} />
            <span className={`font-medium text-slate-300 leading-tight ${compact ? 'text-[8px] mt-0.5' : 'text-[10px] mt-1'}`}>{node.label}</span>
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 w-full h-full z-20 pointer-events-none" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="fctg-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <g filter="url(#fctg-glow)">
          <circle r="6" fill="#22d3ee">
            <animateMotion dur={`${DURATION}s`} repeatCount="indefinite" path={PATH} />
          </circle>
        </g>
      </svg>
    </div>
  )
}
