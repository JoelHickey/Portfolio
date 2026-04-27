import React, { useState, useEffect, useCallback, useRef } from 'react'
import WaterAscii from './WaterAscii'
import WeavingLoom from './WeavingLoom'
import EmpowermentHealthDrawing from './EmpowermentHealthDrawing'
import ParticleBackground from './ParticleBackground'
import OrbitalTrailsBackground from './OrbitalTrailsBackground'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser, FiUsers, FiTarget, FiRefreshCw, FiCornerUpRight, FiShield, FiFileText, FiActivity, FiSearch, FiMic, FiMessageSquare, FiClipboard, FiGrid, FiEdit3, FiMonitor } from 'react-icons/fi'
import { TbSparkles } from 'react-icons/tb'
import FCTGHeading from './design-system/fctg/FCTGHeading'
import FCTGAIFlowDiagram, { FCTGAIFlowCaption } from './FCTGAIFlowDiagram'
import FCTGMultiAgentDiagram, { FCTGMultiAgentCaption } from './FCTGMultiAgentDiagram'
import FCTGBodyAnalogyDiagram from './FCTGBodyAnalogyDiagram'
import TimeWithAISplitChart from './TimeWithAISplitChart'

const SLIDE_COUNT = 52
const HIDDEN_SLIDES = new Set([14, 16, 18, 24, 25, 32, 33, 38])
const VISIBLE_SLIDE_COUNT = SLIDE_COUNT - HIDDEN_SLIDES.size

function getNextVisibleSlide(index) {
  let next = Math.min(index + 1, SLIDE_COUNT - 1)
  while (HIDDEN_SLIDES.has(next) && next < SLIDE_COUNT - 1) next += 1
  return next
}

function getPreviousVisibleSlide(index) {
  let previous = Math.max(index - 1, 0)
  while (HIDDEN_SLIDES.has(previous) && previous > 0) previous -= 1
  return previous
}

function getVisibleSlideNumber(index) {
  let hiddenBeforeOrAt = 0
  HIDDEN_SLIDES.forEach((hiddenIndex) => {
    if (hiddenIndex <= index) hiddenBeforeOrAt += 1
  })
  return index + 1 - hiddenBeforeOrAt
}

/* Slide quotes — adapted from the Tao Te Ching, via Rick Rubin */
const FCTG_SLIDE_QUOTES = {
  12: { quote: 'To the mind that is still, the whole universe surrenders.', attribution: '— Tao Te Ching, via The Creative Act' },
  32: { quote: 'Things arise and he accepts them. Things vanish and he lets them go.', attribution: '— Tao Te Ching, via The Creative Act' },
}

function SlideQuote({ slideIndex }) {
  const entry = FCTG_SLIDE_QUOTES[slideIndex]
  if (!entry) return null
  const { quote, attribution } = typeof entry === 'string' ? { quote: entry, attribution: '— Rick Rubin, The Way of Code' } : entry
  return (
    <blockquote className="fctg-rubin-quote">
      &ldquo;{quote}&rdquo;{' '}
      <footer className="fctg-rubin-quote-attribution">
        {attribution.includes('The Way of Code') ? (
          <>— Rick Rubin, <a href="https://www.thewayofcode.com" target="_blank" rel="noopener noreferrer">The Way of Code</a></>
        ) : (
          attribution
        )}
      </footer>
    </blockquote>
  )
}

function EcosystemThreadDiagram({ className = '' }) {
  const nodes = [
    {
      label: 'Product',
      x: 320,
      y: 108,
      accent: '#22d3ee',
      glow: 'rgba(34, 211, 238, 0.18)',
      path: 'M 360 120 C 454 124, 542 138, 650 168',
      satellites: [
        { x: 286, y: 84, r: 4.5, opacity: 0.86 },
        { x: 272, y: 128, r: 3.2, opacity: 0.68 },
      ],
      labelY: 68,
    },
    {
      label: 'Business',
      x: 454,
      y: 196,
      accent: '#2dd4bf',
      glow: 'rgba(45, 212, 191, 0.18)',
      path: 'M 492 192 C 564 190, 608 184, 650 178',
      satellites: [
        { x: 416, y: 220, r: 4, opacity: 0.82 },
        { x: 402, y: 176, r: 3.1, opacity: 0.66 },
      ],
      labelY: 248,
    },
    {
      label: 'Technology',
      x: 970,
      y: 112,
      accent: '#a78bfa',
      glow: 'rgba(167, 139, 250, 0.18)',
      path: 'M 930 124 C 836 128, 748 142, 650 168',
      satellites: [
        { x: 1004, y: 86, r: 4.2, opacity: 0.84 },
        { x: 1018, y: 134, r: 3.1, opacity: 0.68 },
      ],
      labelY: 72,
    },
  ]

  return (
    <svg viewBox="0 0 1280 300" className={className} preserveAspectRatio="xMidYMid meet" aria-labelledby="ecosystem-thread-title ecosystem-thread-desc" role="img">
      <title id="ecosystem-thread-title">Design at the center of the mix</title>
      <desc id="ecosystem-thread-desc">Product, business, and technology appear as outer constellations linked by luminous threads into a brighter central design node, showing design working at the center where forces meet.</desc>
      <defs>
        <linearGradient id="ecosystem-thread-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="30%" stopColor="#2dd4bf" />
          <stop offset="62%" stopColor="#818cf8" />
          <stop offset="100%" stopColor="#e879f9" />
        </linearGradient>
        <radialGradient id="ecosystem-panel-haze" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.12)" />
          <stop offset="55%" stopColor="rgba(15, 23, 42, 0.08)" />
          <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
        </radialGradient>
        <radialGradient id="ecosystem-center-haze" cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(248, 250, 252, 0.95)" />
          <stop offset="28%" stopColor="rgba(248, 250, 252, 0.22)" />
          <stop offset="62%" stopColor="rgba(129, 140, 248, 0.15)" />
          <stop offset="100%" stopColor="rgba(2, 6, 23, 0)" />
        </radialGradient>
        <filter id="ecosystem-meter-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1.3 0" result="boost" />
          <feMerge>
            <feMergeNode in="boost" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ecosystem-soft-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>
      <ellipse cx="640" cy="164" rx="404" ry="122" fill="url(#ecosystem-panel-haze)" filter="url(#ecosystem-soft-blur)" opacity="0.82" />
      <rect x="128" y="34" width="1024" height="222" rx="40" fill="rgba(5, 10, 22, 0.24)" stroke="rgba(148, 163, 184, 0.08)" />
      <rect x="150" y="56" width="980" height="178" rx="30" fill="rgba(2, 6, 23, 0.18)" stroke="rgba(255, 255, 255, 0.035)" />

      <ellipse cx="650" cy="174" rx="136" ry="84" fill="url(#ecosystem-center-haze)" filter="url(#ecosystem-soft-blur)" opacity="0.9" />
      <path d="M 650 98 C 662 120, 664 144, 650 174" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 650 98 C 638 120, 636 144, 650 174" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" strokeLinecap="round" />

      {nodes.map(({ label, x, y, accent, glow, path, satellites, labelY }) => (
        <g key={label}>
          <path d={path} fill="none" stroke="rgba(148,163,184,0.08)" strokeWidth="9" strokeLinecap="round" />
          <path d={path} fill="none" stroke="url(#ecosystem-thread-gradient)" strokeWidth="2.2" strokeLinecap="round" filter="url(#ecosystem-meter-glow)" />
          <ellipse cx={x} cy={y} rx="66" ry="44" fill={glow} filter="url(#ecosystem-soft-blur)" />
          <circle cx={x} cy={y} r="8" fill={accent} filter="url(#ecosystem-meter-glow)" />
          {satellites.map(({ x: sx, y: sy, r, opacity }, index) => (
            <circle
              key={`${label}-${index}`}
              cx={sx}
              cy={sy}
              r={r}
              fill={accent}
              fillOpacity={opacity}
              filter="url(#ecosystem-meter-glow)"
            />
          ))}
          <text x={x} y={labelY} textAnchor="middle" fill="rgba(226,232,240,0.74)" fontSize="15" fontWeight="600" letterSpacing="0.16em">
            {label.toUpperCase()}
          </text>
        </g>
      ))}

      <g>
        <circle cx="650" cy="174" r="14" fill="#f8fafc" fillOpacity="0.96" filter="url(#ecosystem-meter-glow)" />
        <circle cx="650" cy="174" r="40" fill="rgba(248,250,252,0.08)" filter="url(#ecosystem-soft-blur)" />
        <text x="650" y="118" textAnchor="middle" fill="rgba(248,250,252,0.96)" fontSize="18" fontWeight="700" letterSpacing="0.18em">
          DESIGN
        </text>
      </g>
    </svg>
  )
}

/** Thin icons for medium stack — Pen & paper / Software / AI-assisted */
function HowWeDesignPhaseIcon({ kind, className, color }) {
  const c = className || 'mx-auto h-10 w-10 md:h-12 md:w-12'
  if (kind === 'pen') return <FiEdit3 className={c} style={{ color }} strokeWidth={1} />
  if (kind === 'photoshop') return <FiLayers className={c} style={{ color }} strokeWidth={1} />
  if (kind === 'figma') return <FiUsers className={c} style={{ color }} strokeWidth={1} />
  if (kind === 'compute') return <FiMonitor className={c} style={{ color }} strokeWidth={1} />
  return <TbSparkles className={c} style={{ color }} strokeWidth={1} />
}

function ChapterLabel({ children }) {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-4 z-30 text-center text-[10px] font-semibold tracking-[0.18em] uppercase text-slate-500/80">
      {children}
    </div>
  )
}

const FLICKER_CHARS = '{}<>()[];:=/\\*&|!?'
function MysticalFlickerHeading() {
  const target = 'Mystical Code'
  const targetArr = target.split('')
  const [chars, setChars] = useState(targetArr)
  const mountedRef = useRef(true)
  useEffect(() => {
    const intervals = targetArr.map((_, i) =>
      setInterval(() => {
        setChars((prev) => {
          const next = [...prev]
          next[i] = FLICKER_CHARS[Math.floor(Math.random() * FLICKER_CHARS.length)]
          return next
        })
      }, 60 + Math.random() * 90)
    )
    const settle = setTimeout(() => {
      intervals.forEach(clearInterval)
      setChars(targetArr)
    }, 2200)
    return () => {
      intervals.forEach(clearInterval)
      clearTimeout(settle)
    }
  }, [])
  useEffect(() => {
    mountedRef.current = true
    const allTimers = []
    const runFlickerWave = () => {
      if (!mountedRef.current) return
      targetArr.forEach((_, i) => {
        const t1 = setTimeout(() => {
          if (!mountedRef.current) return
          const iv = setInterval(() => {
            if (!mountedRef.current) return
            setChars((prev) => {
              const next = [...prev]
              next[i] = FLICKER_CHARS[Math.floor(Math.random() * FLICKER_CHARS.length)]
              return next
            })
          }, 50 + Math.random() * 60)
          allTimers.push(iv)
          const t2 = setTimeout(() => {
            clearInterval(iv)
            if (mountedRef.current) setChars([...targetArr])
          }, 350 + Math.random() * 250)
          allTimers.push(t2)
        }, i * 120)
        allTimers.push(t1)
      })
    }
    const loopId = setInterval(runFlickerWave, 4500)
    return () => {
      mountedRef.current = false
      clearInterval(loopId)
      allTimers.forEach((id) => {
        try { clearTimeout(id) } catch { /* ignore */ }
        try { clearInterval(id) } catch { /* ignore */ }
      })
    }
  }, [])
  return (
    <span className="inline-flex font-mono tracking-wide" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
      {chars.map((c, i) => (
        <span key={`${i}-${c}`} className="fctg-mystical-char inline-block min-w-[0.5em] text-center tabular-nums">{c}</span>
      ))}
    </span>
  )
}

const MODEL_DIAGRAM_STEPS_TECHNICAL = [
  { title: 'Prompt', subtitle: 'text', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Tokenize', subtitle: 'IDs', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Embed + pos', subtitle: 'vectors', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Transformer × N', subtitle: 'attention + MLP', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'Logits → probs', subtitle: 'next-token dist.', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'Sample + decode', subtitle: 'next token', tone: 'border-amber-500/35 bg-amber-950/25 text-amber-100' },
]

const MODEL_DIAGRAM_STEPS_BEGINNER = [
  { title: 'Data input', subtitle: '', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Pre-process input', subtitle: 'clean + tokenize', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Turn into numbers', subtitle: 'encode as tensors', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Run through model', subtitle: 'compare patterns', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'Rank likely outputs', subtitle: 'best options first', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'Return output', subtitle: 'text, label, or score', tone: 'border-amber-500/35 bg-amber-950/25 text-amber-100' },
]

const MODEL_DIAGRAM_EXAMPLE = [
  ['Photo', 'Text'],
  'Clean, resize, tensor',
  'Model runs',
  '"Golden Retriever"',
  'Format label',
  'User sees result',
]

const MODEL_DIAGRAM_STEPS_REFERENCE = [
  {
    title: 'Data input',
    description: [
      'Raw data is gathered from various sources, such as databases,',
      'files, cameras, or sensors. This data can be structured (tables)',
      'or unstructured (text, images, video).',
    ],
    stroke: '#38bdf8',
    fill: 'rgba(12,74,110,0.9)',
  },
  {
    title: 'Pre-processing',
    description: [
      'Raw data is not directly usable by AI models. It must be cleaned',
      'and transformed into a numerical format, usually tensors',
      '(multi-dimensional arrays).',
    ],
    stroke: '#22d3ee',
    fill: 'rgba(8,51,68,0.9)',
  },
  {
    title: 'Model inference',
    description: [
      "The processed input (tensors) flows through the model's",
      'architecture, which is generally a neural network.',
    ],
    stroke: '#fb923c',
    fill: 'rgba(69,26,3,0.9)',
  },
  {
    title: 'Output Generation',
    description: [
      'The final layer of the network, the Output Layer, produces the',
      'result, which could be a classification, probability score,',
      'or generated text.',
    ],
    stroke: '#2dd4bf',
    fill: 'rgba(17,94,89,0.9)',
  },
  {
    title: 'Post-processing',
    description: [
      'The numerical output is converted back into a human-understandable',
      'format, such as identifying an object in a photo, text generation,',
      'or a numerical prediction.',
    ],
    stroke: '#e879f9',
    fill: 'rgba(88,28,135,0.9)',
  },
  {
    title: 'Result',
    description: [
      'After the prediction is made, the results are logged. The',
      'difference between the predicted output and the actual expected',
      'outcome is used to improve the model in future cycles.',
    ],
    stroke: '#a78bfa',
    fill: 'rgba(46,16,101,0.9)',
  },
]

function ModelInBetweenDiagram({ exampleOnly = false }) {
  const steps = MODEL_DIAGRAM_STEPS_REFERENCE
  const titleH = 32
  const titleR = 8
  const gray = '#475569'
  const cardPadding = 12
  const minW = 80
  const computedWidths = steps.map((s) => Math.max(minW, s.title.length * 6.5) + cardPadding * 2)
  const titleWidths = Array(steps.length).fill(Math.max(...computedWidths))
  const cardGap = 44
  let x = 100
  const positions = steps.map((s, i) => {
    const cx = x + titleWidths[i] / 2
    x += titleWidths[i] + cardGap
    return { cx, titleW: titleWidths[i] }
  })
  const titleY = 24
  const exampleY = 165
  const exampleH = titleH
  const svgW = x + 80
  const svgH = 228
  const resultRight = positions[5].cx + positions[5].titleW / 2
  const modelLeft = positions[2].cx - positions[2].titleW / 2
  const loopStroke = steps[5].stroke
  const loopY = 66
  const loopGap = loopY - (titleY + titleH / 2)
  const exampleLoopY = exampleY + titleH / 2 + loopGap
  const loopOutset = 16
  const exPhotoY = exampleY - titleH / 2 - 8
  const exPromptY = exampleY + titleH / 2 + 8
  const ctrlOffset = 50

  const viewBox = exampleOnly ? `0 120 ${svgW} 115` : `0 0 ${svgW} ${svgH}`

  return (
    <div className="w-full max-w-[1400px] mx-auto" aria-label={exampleOnly ? 'Inside the model: example flow' : 'Inside the model: 6-step AI pipeline with feedback loop'}>
      <svg viewBox={viewBox} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="fctg-flow-arrow" markerWidth="5" markerHeight="4" refX="4" refY="2" orient="auto">
            <path d="M0 0 L5 2 L0 4 Z" fill="context-stroke" />
          </marker>
        </defs>

        {!exampleOnly && (
          <>
            {/* Feedback loop: Result → Model inference */}
            <path
              d={`M ${resultRight} ${titleY} H ${resultRight + loopOutset} V ${loopY} H ${modelLeft - loopOutset} V ${titleY} H ${modelLeft}`}
              fill="none"
              stroke={loopStroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 4"
              markerEnd="url(#fctg-flow-arrow)"
              opacity="0.85"
            />
            <text
              x={(resultRight + modelLeft) / 2}
              y={loopY + 10}
              textAnchor="middle"
              dominantBaseline="hanging"
              fontSize="11"
              fill={loopStroke}
              fontFamily="system-ui,sans-serif"
              fontWeight="500"
              opacity="0.9"
            >
              Feedback loop: user confirms or corrects, model improves
            </text>

            {positions.slice(0, -1).map((pos, i) => (
              <path
                key={`flow-${i}`}
                d={`M ${pos.cx + pos.titleW / 2} ${titleY} H ${positions[i + 1].cx - positions[i + 1].titleW / 2}`}
                fill="none"
                stroke={steps[i + 1].stroke}
                strokeWidth="2"
                strokeLinecap="round"
                markerEnd="url(#fctg-flow-arrow)"
                opacity="0.9"
              />
            ))}

            {steps.map(({ title, stroke, fill }, i) => {
              const { cx, titleW } = positions[i]
              return (
                <g key={title}>
                  <rect
                    x={cx - titleW / 2}
                    y={titleY - titleH / 2}
                    width={titleW}
                    height={titleH}
                    rx={titleR}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1.5"
                  />
                  <text
                    x={cx}
                    y={titleY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
                    fill="#f1f5f9"
                    fontFamily="system-ui,sans-serif"
                    fontWeight="600"
                  >
                    {title}
                  </text>
                </g>
              )
            })}
          </>
        )}

        {/* Example row: curved lines Photo & Text prompt → Clean, resize, tensor */}
        <path d={`M ${positions[0].cx + positions[0].titleW / 2} ${exPhotoY} C ${positions[0].cx + positions[0].titleW / 2 + ctrlOffset} ${exPhotoY} ${positions[1].cx - positions[1].titleW / 2 - ctrlOffset} ${exampleY} ${positions[1].cx - positions[1].titleW / 2} ${exampleY}`} fill="none" stroke={steps[1].stroke} strokeWidth="2" strokeLinecap="round" markerEnd="url(#fctg-flow-arrow)" opacity="0.9" />
        <path d={`M ${positions[0].cx + positions[0].titleW / 2} ${exPromptY} C ${positions[0].cx + positions[0].titleW / 2 + ctrlOffset} ${exPromptY} ${positions[1].cx - positions[1].titleW / 2 - ctrlOffset} ${exampleY} ${positions[1].cx - positions[1].titleW / 2} ${exampleY}`} fill="none" stroke={steps[1].stroke} strokeWidth="2" strokeLinecap="round" markerEnd="url(#fctg-flow-arrow)" opacity="0.9" />
        {positions.slice(1, -1).map((pos, i) => (
          <path
            key={`ex-flow-${i + 1}`}
            d={`M ${pos.cx + pos.titleW / 2} ${exampleY} H ${positions[i + 2].cx - positions[i + 2].titleW / 2}`}
            fill="none"
            stroke={steps[i + 2].stroke}
            strokeWidth="2"
            strokeLinecap="round"
            markerEnd="url(#fctg-flow-arrow)"
            opacity="0.9"
          />
        ))}

        {/* Example feedback loop: User sees result → Model runs */}
        <path
          d={`M ${resultRight} ${exampleY} H ${resultRight + loopOutset} V ${exampleLoopY} H ${modelLeft - loopOutset} V ${exampleY} H ${modelLeft}`}
          fill="none"
          stroke={loopStroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="6 4"
          markerEnd="url(#fctg-flow-arrow)"
          opacity="0.75"
        />
        <text
          x={(resultRight + modelLeft) / 2}
          y={exampleLoopY + 10}
          textAnchor="middle"
          dominantBaseline="hanging"
          fontSize="11"
          fill={loopStroke}
          fontFamily="system-ui,sans-serif"
          fontWeight="500"
          opacity="0.85"
        >
          &quot;Actually it&apos;s a Labrador&quot;
        </text>

        {/* Example row: same boxes, aligned (below flow) */}
        {/* Step 0: Photo and Text prompt stacked — same size as other cards */}
        <g>
          <rect x={positions[0].cx - positions[0].titleW / 2} y={exPhotoY - titleH / 2} width={positions[0].titleW} height={titleH} rx={titleR} fill={steps[0].fill} stroke={steps[0].stroke} strokeWidth="1.5" />
          <text x={positions[0].cx} y={exPhotoY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#f1f5f9" fontFamily="system-ui,sans-serif" fontWeight="600">Photo</text>
          <rect x={positions[0].cx - positions[0].titleW / 2} y={exPromptY - titleH / 2} width={positions[0].titleW} height={titleH} rx={titleR} fill={steps[0].fill} stroke={steps[0].stroke} strokeWidth="1.5" />
          <text x={positions[0].cx} y={exPromptY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fill="#f1f5f9" fontFamily="system-ui,sans-serif" fontWeight="600">Text</text>
        </g>
        {steps.slice(1).map(({ stroke, fill }, i) => {
          const { cx, titleW } = positions[i + 1]
          return (
            <g key={`ex-${i + 1}`}>
              <rect
                x={cx - titleW / 2}
                y={exampleY - exampleH / 2}
                width={titleW}
                height={exampleH}
                rx={titleR}
                fill={fill}
                stroke={stroke}
                strokeWidth="1.5"
              />
              <text
                x={cx}
                y={exampleY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="11"
                fill="#f1f5f9"
                fontFamily="system-ui,sans-serif"
                fontWeight="600"
              >
                {MODEL_DIAGRAM_EXAMPLE[i + 1]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function InsideModelFlow() {
  const nodes = [
    { title: 'Input',     example: 'Photo + text',   stroke: '#38bdf8', fill: 'rgba(7,89,133,0.85)'  },
    { title: 'Prep',      example: 'Clean + tensor', stroke: '#22d3ee', fill: 'rgba(8,51,68,0.9)'    },
    { title: 'Inference', example: 'Model runs',     stroke: '#e879f9', fill: 'rgba(88,28,135,0.9)'  },
    { title: 'Output',    example: '"Retriever"',    stroke: '#2dd4bf', fill: 'rgba(17,94,89,0.9)'   },
    { title: 'Format',    example: 'Label',          stroke: '#e879f9', fill: 'rgba(88,28,135,0.85)' },
    { title: 'Result',    example: 'User sees it',   stroke: '#a78bfa', fill: 'rgba(46,16,101,0.9)'  },
  ]
  const nW = 110, nH = 68, gap = 18, marginX = 10, svgH = 195
  const nY = 32, nCY = nY + nH / 2
  const loopOutset = 10, feedbackY = nY + nH + 44
  const positions = nodes.map((_, i) => {
    const prepOffset = i === 1 ? -18 : 0
    const brainGapOffset = i >= 2 ? 34 : 0
    const formatOffset = i === 4 ? -12 : 0
    const resultOffset = i === 5 ? -18 : 0
    const totalOffset = prepOffset + brainGapOffset + formatOffset + resultOffset
    return {
      x: marginX + i * (nW + gap) + totalOffset,
      cx: marginX + nW / 2 + i * (nW + gap) + totalOffset,
    }
  })
  const flowStartX = positions[0].cx
  const lastRight = positions[5].x + nW
  const modelCX = positions[2].cx
  const brainLeftX = modelCX - 62
  const brainRightX = modelCX + 62
  const diagramPadding = 24
  const leftSpan = modelCX - (positions[0].x - diagramPadding)
  const rightSpan = (lastRight + loopOutset + diagramPadding) - modelCX
  const svgW = Math.max(leftSpan, rightSpan) * 2
  const xShift = svgW / 2 - modelCX
  const incomingFlowPath = `M ${flowStartX} ${nCY} H ${brainLeftX}`
  const outgoingFlowPath = `M ${brainRightX} ${nCY} H ${positions[5].cx} H ${lastRight + loopOutset} V ${feedbackY} H ${modelCX} V ${nY + nH}`
  return (
    <div className="w-full max-w-[860px] mx-auto" aria-label="Inside the model: AI pipeline">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="itm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0.4)" />
            <stop offset="30%"  stopColor="rgba(34,211,238,0.88)" />
            <stop offset="60%"  stopColor="rgba(129,140,248,0.88)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0.45)" />
          </linearGradient>
        </defs>
        <g transform={`translate(${xShift} 0)`}>
          {/* Flow: dashed line -> brain activity -> dashed line */}
          <path
            d={incomingFlowPath}
            fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1.5"
          />
        <path
            d={incomingFlowPath}
            fill="none" stroke="rgba(103,232,249,0.95)" strokeWidth="2.2" strokeDasharray="8 6"
            style={{ animation: 'fctg-prod-flow 3s linear infinite' }}
          />
          <path
            d={outgoingFlowPath}
            fill="none" stroke="rgba(148,163,184,0.22)" strokeWidth="1.5"
          />
          <path
            d={outgoingFlowPath}
            fill="none" stroke="url(#itm-grad)" strokeWidth="2.2" strokeDasharray="8 6"
            style={{ animation: 'fctg-prod-flow 3s linear infinite' }}
        />
        <text
          x={(lastRight + loopOutset + modelCX) / 2} y={feedbackY + 14}
            textAnchor="middle" fontSize="10.5" fill="rgba(167,139,250,0.75)"
          fontFamily="system-ui,sans-serif" fontStyle="italic"
        >
          &ldquo;Actually it&rsquo;s a Labrador&rdquo; — model corrects
        </text>
        {/* Nodes: step title (top half) + example value (bottom half) */}
        {nodes.map(({ title, example, stroke, fill }, i) => {
          const { x, cx } = positions[i]
            const isInput = i === 0
            const isBrain = i === 2
            const isSmallStage = i === 1 || i >= 3
            const cardWidth = isSmallStage ? 90 : nW
            const cardHeight = isSmallStage ? 58 : nH
            const cardX = isSmallStage ? x + (nW - cardWidth) / 2 : x
            const cardY = isSmallStage ? nY + (nH - cardHeight) / 2 : nY
          return (
            <g key={i}>
              {isInput && (
                <>
                  {[
                    { label: 'What dog breed is this?', x1: x - 66, y1: nY + 36, x2: x + 6, y2: nY + 36, delay: '0.8s', color: 'rgba(165,243,252,0.9)' },
                  ].map(({ label, x1, y1, x2, y2, delay, color }) => {
                    const path = `M ${x1} ${y1} C ${x1 + 24} ${y1}, ${x2 - 18} ${y2}, ${x2} ${y2}`
                    return (
                      <g key={label}>
                        <text
                          x={x1 + 50}
                          y={y1 - 6}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fontSize="10"
                          fill={color}
                          fontFamily="system-ui,sans-serif"
                          fontWeight="600"
                          letterSpacing="0.15"
                        >
                          <tspan x={x1 + 50} dy="0">What dog breed </tspan>
                          <tspan x={x1 + 50} dy="13">is this?</tspan>
                        </text>
                        <path
                          d={path}
                          fill="none"
                          stroke="rgba(34,211,238,0.16)"
                          strokeWidth="1.2"
                          strokeDasharray="3 7"
                          strokeLinecap="round"
                        />
                        <circle r="2.6" fill="rgba(103,232,249,0.9)">
                          <animateMotion
                            dur="3.6s"
                            begin={delay}
                            repeatCount="indefinite"
                            path={path}
                          />
                          <animate
                            attributeName="opacity"
                            values="0;0.95;0"
                            dur="3.6s"
                            begin={delay}
                            repeatCount="indefinite"
                          />
                        </circle>
                      </g>
                    )
                  })}
                </>
              )}
              {isBrain && (
                <>
                  <path
                    d={`
                      M ${cx} ${nY - 16}
                      C ${cx - 12} ${nY - 32}, ${cx - 34} ${nY - 32}, ${cx - 44} ${nY - 14}
                      C ${x} ${nY - 30}, ${x - 18} ${nY - 2}, ${x - 6} ${nY + 18}
                      C ${x - 22} ${nY + 38}, ${x - 12} ${nY + 68}, ${x + 10} ${nY + 82}
                      C ${x + 18} ${nY + 102}, ${x + 48} ${nY + 110}, ${cx - 6} ${nY + 96}
                      C ${cx - 3} ${nY + 68}, ${cx - 4} ${nY + 34}, ${cx} ${nY + 14}
                      C ${cx + 4} ${nY + 34}, ${cx + 3} ${nY + 68}, ${cx + 6} ${nY + 96}
                      C ${x + 62} ${nY + 110}, ${x + 92} ${nY + 102}, ${x + 100} ${nY + 82}
                      C ${x + 122} ${nY + 68}, ${x + 132} ${nY + 38}, ${x + 116} ${nY + 18}
                      C ${x + 128} ${nY - 2}, ${x + 110} ${nY - 30}, ${cx + 44} ${nY - 14}
                      C ${cx + 34} ${nY - 32}, ${cx + 12} ${nY - 32}, ${cx} ${nY - 16}
                      Z
                    `}
                    fill="rgba(232,121,249,0.08)"
                    stroke="rgba(232,121,249,0.4)"
                    strokeWidth="1.4"
                  />
                  <path
                    d={`
                      M ${x + 12} ${nY + 8}
                      C ${x + 2} ${nY - 6}, ${x + 12} ${nY - 20}, ${x + 30} ${nY - 16}
                      C ${x + 18} ${nY - 2}, ${x + 22} ${nY + 16}, ${x + 36} ${nY + 24}
                      C ${x + 18} ${nY + 30}, ${x + 18} ${nY + 48}, ${x + 34} ${nY + 56}
                      C ${x + 18} ${nY + 64}, ${x + 26} ${nY + 84}, ${x + 48} ${nY + 88}
                    `}
                    fill="none"
                    stroke="rgba(244,114,182,0.32)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <path
                    d={`
                      M ${x + 98} ${nY + 8}
                      C ${x + 108} ${nY - 6}, ${x + 98} ${nY - 20}, ${x + 80} ${nY - 16}
                      C ${x + 92} ${nY - 2}, ${x + 88} ${nY + 16}, ${x + 74} ${nY + 24}
                      C ${x + 92} ${nY + 30}, ${x + 92} ${nY + 48}, ${x + 76} ${nY + 56}
                      C ${x + 92} ${nY + 64}, ${x + 84} ${nY + 84}, ${x + 62} ${nY + 88}
                    `}
                    fill="none"
                    stroke="rgba(244,114,182,0.32)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <path
                    d={`
                      M ${cx} ${nY - 10}
                      C ${cx - 3} ${nY + 8}, ${cx - 2} ${nY + 26}, ${cx} ${nY + 44}
                      C ${cx + 2} ${nY + 62}, ${cx + 3} ${nY + 76}, ${cx} ${nY + 92}
                    `}
                    fill="none"
                    stroke="rgba(244,114,182,0.38)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                  {[
                    { x1: cx - 34, y1: nY + 20, x2: cx - 8, y2: nY + 40 },
                    { x1: cx - 16, y1: nY + 54, x2: cx + 12, y2: nY + 30 },
                    { x1: cx + 8, y1: nY + 44, x2: cx + 32, y2: nY + 22 },
                    { x1: cx - 24, y1: nY + 72, x2: cx + 24, y2: nY + 70 },
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
                    { cx: cx - 34, cy: nY + 20, r: 3 },
                    { cx: cx - 8, cy: nY + 40, r: 3.2 },
                    { cx: cx - 16, cy: nY + 54, r: 2.8 },
                    { cx: cx + 12, cy: nY + 30, r: 3.2 },
                    { cx: cx + 32, cy: nY + 22, r: 3 },
                    { cx: cx + 24, cy: nY + 70, r: 3 },
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
                    `M ${cx - 34} ${nY + 20} C ${cx - 24} ${nY + 24}, ${cx - 16} ${nY + 34}, ${cx - 8} ${nY + 40}`,
                    `M ${cx - 16} ${nY + 54} C ${cx - 8} ${nY + 48}, ${cx + 2} ${nY + 36}, ${cx + 12} ${nY + 30}`,
                    `M ${cx + 8} ${nY + 44} C ${cx + 16} ${nY + 38}, ${cx + 24} ${nY + 28}, ${cx + 32} ${nY + 22}`,
                  ].map((path, idx) => (
                    <circle key={`brain-signal-${idx}`} r="2.4" fill="rgba(252,231,243,0.95)">
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
                </>
              )}
              {!isBrain && !isInput && (
                <rect
                  x={cardX}
                  y={cardY}
                  width={cardWidth}
                  height={cardHeight}
                  rx={8}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth="1.5"
                  opacity="0.72"
                />
              )}
              {!isInput && (
                <>
              <text x={cx} y={isSmallStage ? cardY + cardHeight * 0.32 : nY + nH * 0.28} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isBrain ? '13' : isSmallStage ? '11' : '12'} fill={isBrain ? '#f9a8d4' : '#f1f5f9'} fontFamily="system-ui,sans-serif" fontWeight="700" opacity={isBrain ? '1' : '0.9'}>
                {title}
              </text>
              <text x={cx} y={isSmallStage ? cardY + cardHeight * 0.72 : nY + nH * 0.74} textAnchor="middle" dominantBaseline="middle"
                    fontSize={isBrain ? '9.5' : isSmallStage ? '8' : '9'} fill={isBrain ? '#fbcfe8' : '#e2e8f0'} fontFamily="system-ui,sans-serif" fontWeight="600" opacity={isBrain ? '1' : '0.82'}>
                {example}
              </text>
                </>
              )}
            </g>
          )
        })}
        </g>
      </svg>
    </div>
  )
}

function Slide({ children, className = '', hero, heroOnly, transparent, scrollable, wide }) {
  const isFullViewport = heroOnly && transparent
  const heroOverflow = scrollable ? 'overflow-y-auto' : 'overflow-hidden'
  const contentMax = wide ? 'max-w-5xl' : 'max-w-4xl'
  return (
    <div
      className={`flex w-full flex-col items-center ${hero ? 'justify-start' : 'justify-center'} ${className}`}
      style={{
        ...(isFullViewport
          ? { height: '100vh', minHeight: '100vh', overflow: 'hidden', padding: 0 }
          : { minHeight: '100vh', padding: 'clamp(2rem, 5vw, 6rem) clamp(1rem, 4vw, 4rem)' }),
        ...(transparent
          ? { background: 'transparent' }
          : {
              background: 'linear-gradient(180deg, rgba(10, 14, 23, 0.92) 0%, rgba(13, 19, 33, 0.94) 50%, rgba(10, 14, 23, 0.92) 100%)',
              borderBottom: '1px solid rgba(34, 211, 238, 0.15)',
            }),
      }}
    >
      {hero && <div className={`relative w-screen max-w-none self-center ${heroOverflow} ${heroOnly ? 'h-screen min-h-screen' : ''}`} style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>{hero}</div>}
      {!heroOnly && <div className={`mx-auto w-full ${contentMax} ${hero ? 'mt-8' : ''}`}>{children}</div>}
    </div>
  )
}

function FCTGAITalkSlides() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)

  const goNext = useCallback(() => {
    setSlideIndex(getNextVisibleSlide)
  }, [])

  const goPrev = useCallback(() => {
    setSlideIndex(getPreviousVisibleSlide)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX)
  const onTouchEnd = (e) => {
    if (!touchStart) return
    const diff = touchStart - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
    setTouchStart(null)
  }

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-[#0a0e17]"
      style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Slide 0: Title — WaterAscii + particle animation + scanline + grid */}
      {slideIndex === 0 && (
        <>
          <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}
            aria-hidden
          >
            <WaterAscii
              className="absolute inset-0 h-full w-full"
              background="#030b0f"
              color="#22d3ee"
              fullViewport
            />
          </div>
          <div className="pointer-events-none fixed inset-0 z-[5] opacity-50" aria-hidden>
            <ParticleBackground variant="title" />
          </div>
          <div
            className="pointer-events-none fixed inset-0 z-[60] opacity-[0.02]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none fixed inset-0 z-10 opacity-[0.025]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
            aria-hidden
          />
        </>
      )}
      {/* Slide-specific pattern backgrounds — each slide gets a unique pattern */}
      {/* Chapter 1 content slides: keep particles mounted so the closer inherits motion already in progress */}
      {slideIndex >= 2 && slideIndex <= 5 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-contour opacity-25" aria-hidden />
        </div>
      )}
      {/* Chapter 2 content slides: keep the calmness field mounted for one continuous breathing atmosphere */}
      {slideIndex >= 7 && slideIndex <= 13 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Chapter 3 content slides: keep a readable directing workspace behind the mechanics */}
      {((slideIndex >= 16 && slideIndex <= 23) || slideIndex === 26) && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}

      {/* Slide content */}
      <div className="relative z-20 h-full overflow-x-hidden overflow-y-hidden">
        {/* Chapter label — exclude chapter hero slides */}
        {slideIndex >= 2 && slideIndex <= 5 && <ChapterLabel>Looking back to look ahead</ChapterLabel>}
        {slideIndex >= 7 && slideIndex <= 13 && <ChapterLabel>What the shift unlocks</ChapterLabel>}
        {((slideIndex >= 16 && slideIndex <= 23) || slideIndex === 26) && <ChapterLabel>How to direct</ChapterLabel>}
        {slideIndex >= 28 && slideIndex <= 33 && <ChapterLabel>Design workflows</ChapterLabel>}
        {slideIndex >= 35 && slideIndex <= 38 && <ChapterLabel>What I built</ChapterLabel>}
        {slideIndex >= 39 && slideIndex <= 41 && <ChapterLabel>Close</ChapterLabel>}
        {slideIndex >= 42 && slideIndex <= 51 && <ChapterLabel>Appendix</ChapterLabel>}

        {/* Slide 0: Title */}
        {slideIndex === 0 && (
        <Slide
          heroOnly
          transparent
          hero={
            <div className="relative min-h-screen overflow-hidden bg-transparent">
              <div key={slideIndex} className="fctg-text-transition absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 px-8 pb-16 text-center">
                <h1 className="fctg-heading-hero max-w-5xl text-[3.2rem]! md:text-[4.15rem]! lg:text-[4.9rem]!" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                  <span className="block">Designing with AI</span>
                </h1>
                <p className="mt-10 text-sm font-medium tracking-[0.02em] text-slate-200/90 drop-shadow-[0_1px_8px_rgba(2,6,23,0.7)] md:mt-12 md:text-base">Joel Hickey</p>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 1: Foundations chapter hero */}
        {slideIndex === 1 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/foundations-roots-hero.png"
              alt="Foundations chapter hero — abstract models and branching ideas for design and AI"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 40% 18% at 50% 49%, rgba(2,6,23,0.42) 0%, rgba(2,6,23,0.18) 54%, transparent 78%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-5xl px-6 py-6 text-center md:px-10 md:py-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/98 drop-shadow-[0_1px_10px_rgba(2,6,23,0.75)]">Chapter 1</div>
                <h2 className="fctg-heading text-balance max-w-5xl text-[clamp(1.75rem,6.5vw,3rem)]! leading-[1.08] md:leading-[1.06] drop-shadow-[0_2px_18px_rgba(2,6,23,0.8)]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                  Looking back to look ahead
                </h2>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 2: Tools change — Ch1 open */}
        {slideIndex === 2 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition flex w-full max-w-6xl flex-col items-center px-4">
            <div className="flex max-w-3xl flex-col items-center text-center">
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]!" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Tools change</h2>
            </div>
            {(() => {
              const phases = [
                { label: 'Pen', color: '#f1f5f9' },
                { label: 'Photoshop', color: '#f1f5f9' },
                { label: 'Figma', color: '#f1f5f9' },
                { label: 'AI', color: '#f1f5f9' },
              ]
              return (
                <div className="mt-6 mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-5 gap-y-3 md:mt-8 md:gap-x-7">
                  {phases.map(({ label, color }, i) => (
                    <React.Fragment key={label}>
                      <span className="text-xl font-light tracking-wide md:text-3xl" style={{ color }}>
                        {label}
                      </span>
                      {i < phases.length - 1 && (
                        <span className="text-lg font-light text-slate-600/80 md:text-2xl" aria-hidden>→</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )
            })()}
            <p className="fctg-subtitle mx-auto mt-10! max-w-prose text-lg leading-[1.5] text-slate-100/95 md:mt-12! md:text-2xl md:leading-[1.45]">
              Our craft endures.
            </p>
          </div>
        </Slide>
        )}

        {/* Slide 4 (closer): You at the core — chapter payoff */}
        {slideIndex === 4 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition flex w-full max-w-6xl flex-col items-center justify-center px-4">
            <div className="relative w-full max-w-2xl" style={{ height: 'clamp(340px, 48vh, 460px)' }}>
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 md:h-[520px] md:w-[520px]"
                aria-hidden
                style={{ background: 'radial-gradient(circle, rgba(129,140,248,0.22) 0%, rgba(34,211,238,0.10) 28%, transparent 62%)', filter: 'blur(2px)' }}
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Human</span>
              </div>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 text-center">
                <span className="text-xl font-light tracking-wide md:text-3xl" style={{ color: '#f1f5f9' }}>Taste</span>
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                <span className="text-xl font-light tracking-wide md:text-3xl" style={{ color: '#f1f5f9' }}>Responsibility</span>
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 text-center">
                <span className="text-xl font-light tracking-wide md:text-3xl" style={{ color: '#f1f5f9' }}>Judgment</span>
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-center">
                <span className="text-xl font-light tracking-wide md:text-3xl" style={{ color: '#f1f5f9' }}>Context</span>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 5: Process noise — bridge from human craft to AI unlocks */}
        {slideIndex === 5 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-5xl flex-col items-center text-center px-4">
            <div className="max-w-3xl">
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Designer battery</h2>
              <p className="fctg-subtitle mt-2 text-sm leading-relaxed text-slate-300/95 md:text-base">
                Messy inputs drain the designer. Organised signals recharge the work.
              </p>
            </div>
            <div className="mt-6 flex w-full justify-center px-4 py-5 md:mt-7 md:px-6 md:py-6">
              <style>{`
                @keyframes designer-battery-drain-out {
                  0% { opacity: 0; transform: translateX(16px) scale(0.45); }
                  18% { opacity: 0.9; transform: translateX(0) scale(1); }
                  70% { opacity: 0.65; transform: translateX(-92px) scale(0.72); }
                  100% { opacity: 0; transform: translateX(-150px) scale(0.28); }
                }
                @keyframes designer-battery-charge-in {
                  0% { opacity: 0; transform: translateX(46px) scale(0.28); }
                  22% { opacity: 0.95; transform: translateX(14px) scale(1); }
                  72% { opacity: 0.75; transform: translateX(-52px) scale(0.76); }
                  100% { opacity: 0; transform: translateX(-92px) scale(0.32); }
                }
                @keyframes designer-battery-drain-word {
                  0%, 100% { opacity: 0.72; transform: translateX(0); }
                  42% { opacity: 1; transform: translateX(-9px); }
                  72% { opacity: 0.68; transform: translateX(-18px); }
                }
                @keyframes designer-battery-charge-word {
                  0%, 100% { opacity: 0.74; transform: translateX(10px); }
                  48% { opacity: 1; transform: translateX(0); }
                }
                @keyframes designer-battery-drain-stream {
                  0% { opacity: 0.08; stroke-dashoffset: 0; }
                  45% { opacity: 0.52; }
                  100% { opacity: 0.08; stroke-dashoffset: -92; }
                }
                @keyframes designer-battery-charge-stream {
                  0% { opacity: 0.08; stroke-dashoffset: 92; }
                  45% { opacity: 0.58; }
                  100% { opacity: 0.08; stroke-dashoffset: 0; }
                }
                @keyframes designer-battery-body-pulse {
                  0%, 100% { filter: drop-shadow(0 0 3px rgba(34, 211, 238, 0.24)); }
                  50% { filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.34)); }
                }
                .designer-battery-body { animation: designer-battery-body-pulse 3s ease-in-out infinite; }
                .designer-battery-drain-out,
                .designer-battery-charge-in {
                  transform-box: fill-box;
                  transform-origin: center;
                }
                .designer-battery-drain-out { animation: designer-battery-drain-out 2.7s ease-in-out infinite; }
                .designer-battery-charge-in { animation: designer-battery-charge-in 2.35s ease-in-out infinite; }
                .designer-battery-drain-word { animation: designer-battery-drain-word 2.6s ease-in-out infinite; }
                .designer-battery-charge-word { animation: designer-battery-charge-word 2.3s ease-in-out infinite; }
                .designer-battery-label {
                  filter: none;
                }
                .designer-battery-stream {
                  fill: none;
                  stroke-linecap: round;
                  stroke-dasharray: 1 15;
                  filter: drop-shadow(0 0 4px currentColor);
                }
                .designer-battery-drain-stream { animation: designer-battery-drain-stream 2.7s linear infinite; }
                .designer-battery-charge-stream { animation: designer-battery-charge-stream 2.35s linear infinite; }
              `}</style>
              <div className="relative w-full max-w-[min(640px,50vw)]" style={{ aspectRatio: '1100/220' }}>
                <svg viewBox="0 0 1100 220" className="block h-full w-full text-cyan-400/90" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Designer battery drained by process noise and charged by clear signals">
                  <title>Designer battery</title>
                  <defs>
                    <linearGradient id="designer-battery-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" /><stop offset="28%" stopColor="#f97316" /><stop offset="50%" stopColor="#64748b" /><stop offset="74%" stopColor="#2dd4bf" /><stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="designer-battery-negative-terminal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" /><stop offset="100%" stopColor="#f97316" />
                    </linearGradient>
                    <linearGradient id="designer-battery-positive-terminal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#2dd4bf" /><stop offset="100%" stopColor="#34d399" />
                    </linearGradient>
                    <linearGradient id="designer-battery-drain-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fb7185" stopOpacity="0.32" />
                      <stop offset="42%" stopColor="#fb7185" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#fb7185" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="designer-battery-charge-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#34d399" stopOpacity="0" />
                      <stop offset="54%" stopColor="#34d399" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#34d399" stopOpacity="0.34" />
                    </linearGradient>
                    <filter id="designer-battery-glow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                    <clipPath id="designer-battery-clip"><rect x="147" y="38" width="806" height="144" rx="7" /></clipPath>
                  </defs>
                  {[{ y: 86, d: 0 }, { y: 108, d: 0.24 }, { y: 132, d: 0.48 }, { y: 154, d: 0.72 }, { y: 96, d: 0.96 }, { y: 144, d: 1.2 }].map((p, i) => (
                    <circle key={`designer-charge-${i}`} cx="984" cy={p.y} r="3.2" fill="rgba(52,211,153,0.92)" className="designer-battery-charge-in" style={{ animationDelay: `${p.d}s` }} />
                  ))}
                  {[{ x: 116, y: 72, d: 0 }, { x: 154, y: 96, d: 0.25 }, { x: 198, y: 124, d: 0.5 }, { x: 246, y: 84, d: 0.75 }, { x: 294, y: 112, d: 1 }, { x: 346, y: 78, d: 1.25 }].map((p, i) => (
                    <circle key={`designer-drain-${i}`} cx={p.x} cy={p.y} r="3.2" fill="rgba(251,113,133,0.92)" className="designer-battery-drain-out" style={{ animationDelay: `${p.d}s` }} />
                  ))}
                  <rect x="145" y="36" width="810" height="148" rx="8" fill="rgba(2,6,23,0.72)" stroke="url(#designer-battery-grad)" strokeWidth="1.65" className="designer-battery-body" />
                  <rect x="114" y="72" width="30" height="76" rx="5" fill="none" stroke="url(#designer-battery-negative-terminal)" strokeWidth="1.7" />
                  <rect x="118" y="78" width="22" height="64" rx="4" fill="rgba(251,113,133,0.1)" />
                  <text x="129" y="111" textAnchor="middle" dominantBaseline="middle" fill="url(#designer-battery-negative-terminal)" fontSize="28" fontWeight="800">−</text>
                  <rect x="958" y="72" width="30" height="76" rx="5" fill="none" stroke="url(#designer-battery-positive-terminal)" strokeWidth="1.7" />
                  <rect x="962" y="78" width="22" height="64" rx="4" fill="rgba(52,211,153,0.12)" />
                  <text x="973" y="111" textAnchor="middle" dominantBaseline="middle" fill="url(#designer-battery-positive-terminal)" fontSize="28" fontWeight="800">+</text>
                  <g clipPath="url(#designer-battery-clip)">
                    <rect x="147" y="38" width="806" height="144" rx="7" fill="rgba(2,6,23,0.75)" />
                    <rect x="147" y="38" width="403" height="144" fill="url(#designer-battery-drain-glow)" opacity="0.68" />
                    <rect x="550" y="38" width="403" height="144" fill="url(#designer-battery-charge-glow)" opacity="0.72" />
                    <line x1="550" y1="54" x2="550" y2="166" stroke="rgba(148,163,184,0.12)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 15" />
                    {[
                      { x: 88, y: 62, r: 1.5, c: 'rgba(251,113,133,0.32)' },
                      { x: 142, y: 164, r: 1.9, c: 'rgba(251,113,133,0.46)' },
                      { x: 216, y: 72, r: 1.7, c: 'rgba(248,113,113,0.4)' },
                      { x: 278, y: 150, r: 2, c: 'rgba(249,115,22,0.48)' },
                      { x: 344, y: 96, r: 1.6, c: 'rgba(251,113,133,0.36)' },
                      { x: 430, y: 138, r: 1.7, c: 'rgba(248,113,113,0.38)' },
                      { x: 622, y: 66, r: 1.7, c: 'rgba(34,211,238,0.38)' },
                      { x: 690, y: 154, r: 2, c: 'rgba(45,212,191,0.46)' },
                      { x: 768, y: 86, r: 1.6, c: 'rgba(52,211,153,0.4)' },
                      { x: 842, y: 140, r: 1.8, c: 'rgba(34,211,238,0.42)' },
                      { x: 922, y: 76, r: 1.8, c: 'rgba(52,211,153,0.42)' },
                      { x: 988, y: 166, r: 2.1, c: 'rgba(52,211,153,0.52)' },
                    ].map(({ x, y, r, c }, i) => (
                      <circle key={`designer-compact-dot-${i}`} cx={x} cy={y} r={r} fill={c} />
                    ))}
                    {[70, 94, 118, 142].map((y, i) => (
                      <g key={`designer-drain-trail-${i}`} opacity={0.55 - i * 0.06}>
                        {[0, 1, 2, 3, 4].map((step) => (
                          <circle key={step} cx={460 - step * 66 - i * 8} cy={y + Math.sin(step + i) * 6} r={2.2 - step * 0.18} fill={i === 2 ? 'rgba(249,115,22,0.52)' : 'rgba(251,113,133,0.5)'} />
                        ))}
                      </g>
                    ))}
                    {[68, 96, 124, 152].map((y, i) => (
                      <g key={`designer-charge-trail-${i}`} opacity={0.6 - i * 0.05}>
                        {[0, 1, 2, 3, 4].map((step) => (
                          <circle key={step} cx={990 - step * 66 + i * 5} cy={y + Math.cos(step + i) * 6} r={2.2 - step * 0.18} fill={i === 0 ? 'rgba(34,211,238,0.52)' : 'rgba(52,211,153,0.52)'} />
                        ))}
                      </g>
                    ))}
                    {[
                      { word: 'Unclear goals', x: 238, y: 92, color: '#fb7185', cls: 'designer-battery-drain-word', d: 0 },
                      { word: 'Context switching', x: 408, y: 92, color: '#f87171', cls: 'designer-battery-drain-word', d: 0.18 },
                      { word: 'Rework', x: 238, y: 134, color: '#f97316', cls: 'designer-battery-drain-word', d: 0.36 },
                      { word: 'Scattered context', x: 408, y: 134, color: '#fb7185', cls: 'designer-battery-drain-word', d: 0.54 },
                      { word: 'User need', x: 692, y: 92, color: '#22d3ee', cls: 'designer-battery-charge-word', d: 0.48 },
                      { word: 'Shared context', x: 842, y: 92, color: '#2dd4bf', cls: 'designer-battery-charge-word', d: 0.32 },
                      { word: 'Visible tradeoffs', x: 692, y: 134, color: '#2dd4bf', cls: 'designer-battery-charge-word', d: 0.16 },
                      { word: 'Focus time', x: 842, y: 134, color: '#34d399', cls: 'designer-battery-charge-word', d: 0 },
                    ].map(({ word, x, y, color, cls, d }) => (
                      <text key={word} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={color} className={`designer-battery-label ${cls}`} style={{ color, animationDelay: `${d}s` }} fontSize="20" fontWeight="600">{word}</text>
                    ))}
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 3 (mid-chapter anchor): Foundations hold — The Design of Everyday Things (Norman, 1988) */}
        {slideIndex === 3 && (
        <Slide transparent className="items-center justify-center px-4!">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Foundations hold strong</h2>
            <img
              src="/images/AI talk/design-of-everyday-things.png"
              alt="The Design of Everyday Things by Don Norman, 1988"
              className="mt-10 h-auto w-[140px] rounded-sm shadow-[0_18px_60px_rgba(2,6,23,0.85)] md:mt-12 md:w-[160px]"
            />
          </div>
        </Slide>
        )}

        {/* Slide 5: The shift chapter hero */}
        {slideIndex === 6 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/shift-aurora-hero.png"
              alt="What the shift unlocks chapter hero — vast aurora sky above a still reflective lake"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 40% 18% at 50% 49%, rgba(2,6,23,0.42) 0%, rgba(2,6,23,0.18) 54%, transparent 78%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-3xl px-6 py-6 text-center md:px-10 md:py-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/98 drop-shadow-[0_1px_10px_rgba(2,6,23,0.75)]">Chapter 2</div>
                <h2 className="fctg-heading mt-2 text-balance !text-[2.5rem] md:!text-[3rem] drop-shadow-[0_2px_18px_rgba(2,6,23,0.8)] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What the shift unlocks</h2>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 5: What great assistance feels like — opens Ch2 with a memory of the gold standard */}
        {slideIndex === 7 && (
        <Slide transparent className="items-center justify-center !px-4">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-3xl flex-col items-center text-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Assistance</h2>
            <p className="fctg-subtitle mt-2 text-sm leading-relaxed text-slate-300/95 md:text-base">
              Proactive. Collaborative. Willing to push back.<br />
              It lightens the load without taking over.
            </p>
          </div>
        </Slide>
        )}

        {/* Slide 11: Calmness */}
      {slideIndex === 8 && (
        <Slide transparent wide className="items-center justify-center !px-4">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="mx-auto max-w-xl text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Calmness</h2>
              <p className="fctg-subtitle mt-2 text-sm leading-relaxed text-slate-300/95 md:text-base">
                Less noise. More signal.
              </p>
            </div>
            <div className="mt-8 w-full max-w-5xl px-2 text-center md:mt-10">
              <SlideQuote slideIndex={12} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 12: Imagination */}
      {slideIndex === 9 && (
        <Slide transparent className="items-center justify-center !px-4 !py-4">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4">
            <div>
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Imagination</h2>
              <p className="fctg-subtitle mt-2 text-sm leading-relaxed text-slate-300/95 md:text-base">When the heavy lifting gets lighter, the idea space gets wider.</p>
            </div>
          </div>
        </Slide>
        )}

      {/* Confidence */}
      {slideIndex === 10 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4">
            <div>
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Confidence</h2>
              <p className="fctg-subtitle mt-1">De-risk a direction before you commit to it.</p>
            </div>
          </div>
        </Slide>
        )}

      {/* Perspective */}
      {slideIndex === 11 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4">
            <div>
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Perspective</h2>
              <p className="fctg-subtitle mt-1">Understand the technology. Broaden the view. Reveal the gaps.</p>
            </div>
          </div>
        </Slide>
        )}

      {/* Empowerment */}
      {slideIndex === 12 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-3xl flex-col items-center text-center px-4">
            <div>
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Make things that improve your life.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 26: AI models */}
        {slideIndex === 44 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8 -mt-8 md:-mt-12">
            <div className="flex flex-col items-center text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>AI models</h2>
              <p className="fctg-subtitle mt-1">The brain — it reads, reasons, and generates.</p>
            </div>
            <div className="w-full max-w-4xl mx-auto min-w-0">
              <InsideModelFlow />
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center">Stateless, output only — you supply context each turn; it returns the response.</p>
            <p className="mt-2 text-xs font-medium text-cyan-300/80 text-center">Use when you need an answer.</p>
          </div>
        </Slide>
        )}

        {/* Slide 27: AI Agents — same aesthetic as Multi-agent, body analogy (human) diagram */}
        {slideIndex === 45 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>AI agents</h2>
              <p className="fctg-subtitle mt-1">Drive outcomes, not just outputs.</p>
            </div>
            <FCTGBodyAnalogyDiagram />
            <p className="mt-3 text-xs text-slate-500 text-center max-w-xl mx-auto">Tools enable action, but the model&apos;s reasoning decides which tool, context, or memory to use.</p>
            <p className="text-xs font-medium text-cyan-300/80 text-center max-w-xl mx-auto">Use when you need a task done.</p>
          </div>
        </Slide>
        )}

        {/* Slide 28: Multi-agent systems */}
        {slideIndex === 46 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Multi-agent systems</h2>
              <p className="fctg-subtitle mt-1">A lead agent coordinates specialized sub-agents toward one outcome.</p>
            </div>
            <FCTGMultiAgentDiagram compact />
            <div className="-mt-2 space-y-1">
              <p className="text-xs text-slate-500 text-center max-w-xl mx-auto">The value comes from delegation, parallel work, and coordination across focused tasks.</p>
              <p className="text-xs font-medium text-cyan-300/80 text-center max-w-xl mx-auto">Use when work can be split into parallel streams or multiple steps.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 29: Model, agent, agentic workflow */}
        {slideIndex === 47 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Model, agent, agentic workflow</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">The shift is from response, to task, to coordinated progress.</p>
            </div>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5 flex flex-col">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80 text-center">Stage 1</div>
                <div className="mt-1 text-sm font-semibold text-cyan-200 text-center">Model</div>
                <div className="mt-4 flex items-center justify-center gap-1 text-[8px] md:text-[9px] uppercase tracking-[0.08em] text-cyan-300/80">
                  <span className="whitespace-nowrap rounded-md border border-cyan-500/30 bg-black/20 px-1.5 py-0.75">Prompt</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-cyan-500/30 bg-black/20 px-1.5 py-0.75">Answer</span>
                </div>
                <div className="mt-auto pt-4 text-[11px] text-slate-300 text-center">Generates a response.</div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-2xl" aria-hidden>→</div>

              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 md:p-5 flex flex-col">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-violet-300/80 text-center">Stage 2</div>
                <div className="mt-1 text-sm font-semibold text-violet-200 text-center">Agent</div>
                <div className="mt-4 flex items-center justify-center gap-1 text-[8px] md:text-[9px] uppercase tracking-[0.08em] text-violet-300/80">
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Goal</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Plan</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Tools</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Check</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1 text-[8px] md:text-[9px] uppercase tracking-[0.08em] text-violet-300/80">
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Loop</span>
                  <span aria-hidden>↺</span>
                  <span className="whitespace-nowrap rounded-md border border-violet-500/30 bg-black/20 px-1.5 py-0.75">Result</span>
                </div>
                <div className="mt-auto pt-4 text-[11px] text-slate-300 text-center">Works toward a task.</div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-2xl" aria-hidden>→</div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 md:p-5 flex flex-col">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-emerald-300/80 text-center">Stage 3</div>
                <div className="mt-1 text-sm font-semibold text-emerald-200 text-center">Agentic workflow</div>
                <div className="mt-4 flex items-center justify-center gap-1 text-[8px] md:text-[9px] uppercase tracking-[0.08em] text-emerald-300/80">
                  <span className="whitespace-nowrap rounded-md border border-emerald-500/30 bg-black/20 px-1.5 py-0.75">Direction</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-emerald-500/30 bg-black/20 px-1.5 py-0.75">Work steps</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-emerald-500/30 bg-black/20 px-1.5 py-0.75">Review</span>
                </div>
                <div className="mt-2 text-[9px] text-emerald-300/70 text-center">e.g. research, prototype, validate</div>
                <div className="mt-auto pt-4 text-[11px] text-slate-300 text-center">Coordinates progress across a process.</div>
              </div>
            </div>
            <p className="mt-6 md:mt-8 text-xs text-cyan-300/80 text-center max-w-2xl mx-auto">Once you understand the mechanism, the next step is learning how to direct it.</p>
          </div>
        </Slide>
        )}

        {/* Slide 30: Vibe coding */}
        {slideIndex === 15 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/how-to-direct-hero.png"
              alt="How to direct chapter hero — figure at a crossroads of glowing paths under an aurora night sky"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 40% 18% at 50% 49%, rgba(2,6,23,0.42) 0%, rgba(2,6,23,0.18) 54%, transparent 78%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-3xl px-6 py-6 text-center md:px-10 md:py-8">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-cyan-100/98 drop-shadow-[0_1px_10px_rgba(2,6,23,0.75)]">Chapter 3</div>
                <h2 className="fctg-heading mt-2 text-balance !text-[2.5rem] md:!text-[3rem] drop-shadow-[0_2px_18px_rgba(2,6,23,0.8)] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>How to direct</h2>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 7: Blend looseness and rigidity */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-6">
            <div className="mx-auto max-w-3xl text-center mb-7 md:mb-9">
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Where good context comes from</h2>
            </div>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-center">
              {['Product shape', 'User evidence', 'Rules and constraints'].map((label) => (
                <span key={label} className="rounded-full border border-cyan-500/25 bg-cyan-950/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-200/90">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: Blend looseness and rigidity */}
        {slideIndex === 20 && (
        <Slide transparent className="items-center justify-center px-4!">
          <div key={slideIndex} className="fctg-text-transition mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Blend looseness and rigidity</h2>
            <div className="mt-10 grid w-full max-w-3xl gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch md:gap-6">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/15 px-6 py-6 text-left">
                <p className="text-sm leading-relaxed text-slate-100/95 md:text-[15px]">
                  Hold the outcome, constraints, and taste line steady.
                </p>
              </div>
              <div className="flex items-center justify-center text-slate-500/80">
                <span className="text-xl md:text-2xl" aria-hidden>+</span>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/15 px-6 py-6 text-left">
                <p className="text-sm leading-relaxed text-slate-100/95 md:text-[15px]">
                  Let the agent explore method, structure, sequence, and options.
                </p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: Levers and signals */}
        {slideIndex === 22 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Guardrails</h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Scope', Icon: FiTarget },
                  { label: 'File rules', Icon: FiFileText },
                  { label: 'Budgets', Icon: FiActivity },
                  { label: 'Cleanup', Icon: FiRefreshCw },
                ].map(({ label, Icon }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-xs font-medium text-cyan-200"
                  >
                    <Icon className="h-3.5 w-3.5 text-cyan-300" aria-hidden />
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {[
                  { label: 'Drift', cls: 'border-rose-500/30 bg-rose-500/5 text-rose-300/90' },
                  { label: 'Hallucinate', cls: 'border-fuchsia-500/30 bg-fuchsia-500/5 text-fuchsia-300/90' },
                  { label: 'Overcomplicate', cls: 'border-violet-500/30 bg-violet-500/5 text-violet-300/90' },
                  { label: 'Loop', cls: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300/90' },
                  { label: 'Overwrite', cls: 'border-rose-500/30 bg-rose-500/5 text-rose-300/90' },
                ].map(({ label, cls }) => (
                  <span key={label} className={`rounded-full border px-3 py-1 text-xs font-medium ${cls}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: Director, not executor — Wipeout 2097 mental model */}
        {slideIndex === 17 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-5 md:px-8 md:py-8">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Direction, not execution</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-center">
              <div className="rounded-[28px] border border-cyan-500/20 bg-slate-950/35 p-3 md:p-4 shadow-[0_0_40px_rgba(15,23,42,0.28)]">
                <style>{`
                  @keyframes fctg-wipeout-energy-lap {
                    from { stroke-dashoffset: 0; }
                    to { stroke-dashoffset: -780; }
                  }
                  @keyframes fctg-wipeout-boost-pad {
                    0%, 82%, 100% { opacity: 0.32; transform: scale(0.92); filter: drop-shadow(0 0 0 rgba(34, 211, 238, 0)); }
                    8% { opacity: 0.95; transform: scale(1.08); filter: drop-shadow(0 0 14px rgba(34, 211, 238, 0.55)); }
                    16% { opacity: 0.58; transform: scale(1); filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.2)); }
                  }
                  @keyframes fctg-wipeout-boost-ring {
                    0%, 100% { opacity: 0; transform: scale(0.25); }
                    10% { opacity: 0.78; }
                    32% { opacity: 0; transform: scale(1.9); }
                  }
                  @keyframes fctg-wipeout-ship-pulse {
                    0%, 17% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    22% { transform: scale(1.2); filter: drop-shadow(0 0 18px rgba(34, 211, 238, 0.8)); }
                    28% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    46% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    51% { transform: scale(1.2); filter: drop-shadow(0 0 18px rgba(129, 140, 248, 0.8)); }
                    57% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    63% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    68% { transform: scale(1.2); filter: drop-shadow(0 0 18px rgba(232, 121, 249, 0.8)); }
                    74% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    81% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    86% { transform: scale(1.2); filter: drop-shadow(0 0 18px rgba(45, 212, 191, 0.8)); }
                    92% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                    100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.3)); }
                  }
                  @keyframes fctg-wipeout-trail {
                    0%, 17% { opacity: 0.2; transform: scaleX(0.8); }
                    22% { opacity: 0.9; transform: scaleX(1.8); }
                    28% { opacity: 0.2; transform: scaleX(0.8); }
                    46% { opacity: 0.2; transform: scaleX(0.8); }
                    51% { opacity: 0.9; transform: scaleX(1.8); }
                    57% { opacity: 0.2; transform: scaleX(0.8); }
                    63% { opacity: 0.2; transform: scaleX(0.8); }
                    68% { opacity: 0.9; transform: scaleX(1.8); }
                    74% { opacity: 0.2; transform: scaleX(0.8); }
                    81% { opacity: 0.2; transform: scaleX(0.8); }
                    86% { opacity: 0.9; transform: scaleX(1.8); }
                    92% { opacity: 0.2; transform: scaleX(0.8); }
                    100% { opacity: 0.2; transform: scaleX(0.8); }
                  }
                  @keyframes fctg-wipeout-streaks {
                    from { transform: translateX(0); opacity: 0.26; }
                    50% { opacity: 0.5; }
                    to { transform: translateX(-150px); opacity: 0.18; }
                  }
                  .fctg-wipeout-outline-energy {
                    stroke-dasharray: 120 600;
                    animation: fctg-wipeout-energy-lap 8s linear infinite;
                  }
                  .fctg-wipeout-boost,
                  .fctg-wipeout-ring {
                    transform-box: fill-box;
                    transform-origin: center;
                  }
                  .fctg-wipeout-boost {
                    animation: fctg-wipeout-boost-pad 8s linear infinite;
                  }
                  .fctg-wipeout-ring {
                    animation: fctg-wipeout-boost-ring 8s ease-out infinite;
                  }
                  .fctg-wipeout-ship-core,
                  .fctg-wipeout-ship-trail {
                    transform-box: fill-box;
                    transform-origin: center;
                  }
                  .fctg-wipeout-ship-core {
                    animation: fctg-wipeout-ship-pulse 8s linear infinite;
                  }
                  .fctg-wipeout-ship-trail {
                    animation: fctg-wipeout-trail 8s linear infinite;
                  }
                  .fctg-wipeout-streak {
                    animation: fctg-wipeout-streaks 5s linear infinite;
                  }
                `}</style>
                <svg viewBox="0 0 760 460" className="w-full h-auto" fill="none" aria-hidden>
                  <defs>
                    <linearGradient id="wipeout-track-glow" x1="100" y1="90" x2="650" y2="370" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
                      <stop offset="45%" stopColor="rgba(45,212,191,0.9)" />
                      <stop offset="75%" stopColor="rgba(129,140,248,0.88)" />
                      <stop offset="100%" stopColor="rgba(232,121,249,0.88)" />
                    </linearGradient>
                    <linearGradient id="wipeout-track-fill" x1="76" y1="82" x2="684" y2="380" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="rgba(8,47,73,0.98)" />
                      <stop offset="40%" stopColor="rgba(15,23,42,0.96)" />
                      <stop offset="100%" stopColor="rgba(49,46,129,0.92)" />
                    </linearGradient>
                    <linearGradient id="wipeout-boost-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#e879f9" />
                    </linearGradient>
                    <linearGradient id="wipeout-ship-grad" x1="-24" y1="0" x2="16" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#e2e8f0" />
                      <stop offset="50%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#a5f3fc" />
                    </linearGradient>
                    <radialGradient id="wipeout-engine-glow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="rgba(34,211,238,0.95)" />
                      <stop offset="55%" stopColor="rgba(96,165,250,0.55)" />
                      <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                    </radialGradient>
                    <filter id="wipeout-track-shadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <radialGradient id="wipeout-vignette" cx="50%" cy="45%" r="55%">
                      <stop offset="0%" stopColor="rgba(2,6,23,0)" />
                      <stop offset="100%" stopColor="rgba(2,6,23,0.5)" />
                    </radialGradient>
                    <filter id="wipeout-ship-glow" x="-250%" y="-250%" width="500%" height="500%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0.15  0 0 1 0 0.25  0 0 0 1 0"
                        result="colored"
                      />
                      <feMerge>
                        <feMergeNode in="colored" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <path id="wipeout-track-outline" d="M160 118 C214 62 332 54 423 92 C510 128 603 129 639 183 C673 235 637 311 575 350 C509 392 378 400 270 373 C174 349 96 289 95 221 C94 181 118 151 160 118 Z" />
                    <path id="wipeout-track-lane" d="M228 153 C275 118 347 115 416 136 C478 155 546 163 577 205 C604 242 581 289 532 319 C480 351 390 357 306 338 C231 321 166 278 167 227 C168 196 186 175 228 153 Z" />
                    <path id="wipeout-track-center" d="M194 136 C245 90 340 85 420 114 C494 142 575 146 608 194 C639 239 609 300 554 335 C495 372 384 379 288 356 C203 335 131 284 131 224 C131 189 152 163 194 136 Z" />
                  </defs>

                  <rect x="1" y="1" width="758" height="458" rx="28" fill="rgba(2,6,23,0.9)" stroke="rgba(148,163,184,0.08)" />

                  <g opacity="0.04" stroke="rgba(34,211,238,1)" strokeWidth="0.5">
                    {[80, 140, 200, 260, 320, 380].map(y => (
                      <line key={`hg-${y}`} x1="40" y1={y} x2="720" y2={y} />
                    ))}
                    {[120, 200, 280, 360, 440, 520, 600].map(x => (
                      <line key={`vg-${x}`} x1={x} y1="40" x2={x} y2="420" />
                    ))}
                  </g>

                  <ellipse cx="374" cy="212" rx="286" ry="152" fill="rgba(34,211,238,0.08)" />
                  <ellipse cx="470" cy="252" rx="220" ry="120" fill="rgba(129,140,248,0.08)" />

                  <g strokeLinecap="round">
                    <path className="fctg-wipeout-streak" d="M615 78 L720 48" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
                    <path className="fctg-wipeout-streak" d="M632 112 L742 83" stroke="rgba(34,211,238,0.35)" strokeWidth="2" style={{ animationDelay: '-1.4s' }} />
                    <path className="fctg-wipeout-streak" d="M42 370 L180 330" stroke="rgba(129,140,248,0.24)" strokeWidth="1.5" style={{ animationDelay: '-2.1s' }} />
                    <path className="fctg-wipeout-streak" d="M520 410 L692 360" stroke="rgba(232,121,249,0.2)" strokeWidth="1.5" style={{ animationDelay: '-0.8s' }} />
                    <path className="fctg-wipeout-streak" d="M85 92 L210 62" stroke="rgba(45,212,191,0.2)" strokeWidth="1.5" style={{ animationDelay: '-3.2s' }} />
                    <path className="fctg-wipeout-streak" d="M340 38 L480 22" stroke="rgba(148,163,184,0.18)" strokeWidth="1" style={{ animationDelay: '-4.5s' }} />
                    <path className="fctg-wipeout-streak" d="M120 430 L280 395" stroke="rgba(129,140,248,0.15)" strokeWidth="1" style={{ animationDelay: '-2.8s' }} />
                  </g>

                  <use href="#wipeout-track-outline" fill="url(#wipeout-track-fill)" opacity="0.98" />
                  <use href="#wipeout-track-lane" fill="rgba(2,6,23,0.88)" />
                  <use href="#wipeout-track-outline" stroke="url(#wipeout-track-glow)" strokeWidth="13" opacity="0.18" filter="url(#wipeout-track-shadow)" />
                  <use href="#wipeout-track-outline" stroke="url(#wipeout-track-glow)" strokeWidth="4.5" />
                  <use href="#wipeout-track-lane" stroke="url(#wipeout-track-glow)" strokeWidth="2.5" opacity="0.45" fill="none" />
                  <use href="#wipeout-track-outline" className="fctg-wipeout-outline-energy" stroke="url(#wipeout-track-glow)" strokeWidth="5.5" opacity="0.52" strokeLinecap="round" />

                  <use href="#wipeout-track-lane" stroke="url(#wipeout-track-glow)" strokeWidth="1.2" opacity="0.18" fill="none" strokeDasharray="12 20" />

                  <g opacity="0.95">
                    <g transform="translate(371, 101) rotate(10)">
                      <ellipse className="fctg-wipeout-ring" cx="0" cy="0" rx="38" ry="14" stroke="#22d3ee" strokeWidth="1.5" fill="none" style={{ animationDelay: '-1.5s' }} />
                      <g className="fctg-wipeout-boost" style={{ animationDelay: '-1.5s' }}>
                        <rect x="-32" y="-8" width="64" height="16" rx="3" fill="rgba(34,211,238,0.12)" stroke="url(#wipeout-boost-grad)" strokeWidth="1.5" />
                        <path d="M-16 0 L-8 -5 L-8 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M-2 0 L6 -5 L6 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M12 0 L20 -5 L20 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.7" />
                      </g>
                    </g>
                    <g transform="translate(613, 268) rotate(113)">
                      <ellipse className="fctg-wipeout-ring" cx="0" cy="0" rx="38" ry="14" stroke="#818cf8" strokeWidth="1.5" fill="none" style={{ animationDelay: '-3.8s' }} />
                      <g className="fctg-wipeout-boost" style={{ animationDelay: '-3.8s' }}>
                        <rect x="-32" y="-8" width="64" height="16" rx="3" fill="rgba(129,140,248,0.12)" stroke="url(#wipeout-boost-grad)" strokeWidth="1.5" />
                        <path d="M-16 0 L-8 -5 L-8 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M-2 0 L6 -5 L6 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M12 0 L20 -5 L20 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.7" />
                      </g>
                    </g>
                    <g transform="translate(435, 368) rotate(176)">
                      <ellipse className="fctg-wipeout-ring" cx="0" cy="0" rx="38" ry="14" stroke="#e879f9" strokeWidth="1.5" fill="none" style={{ animationDelay: '-5.2s' }} />
                      <g className="fctg-wipeout-boost" style={{ animationDelay: '-5.2s' }}>
                        <rect x="-32" y="-8" width="64" height="16" rx="3" fill="rgba(232,121,249,0.12)" stroke="url(#wipeout-boost-grad)" strokeWidth="1.5" />
                        <path d="M-16 0 L-8 -5 L-8 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M-2 0 L6 -5 L6 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M12 0 L20 -5 L20 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.7" />
                      </g>
                    </g>
                    <g transform="translate(178, 305) rotate(219)">
                      <ellipse className="fctg-wipeout-ring" cx="0" cy="0" rx="38" ry="14" stroke="#2dd4bf" strokeWidth="1.5" fill="none" style={{ animationDelay: '-6.6s' }} />
                      <g className="fctg-wipeout-boost" style={{ animationDelay: '-6.6s' }}>
                        <rect x="-32" y="-8" width="64" height="16" rx="3" fill="rgba(45,212,191,0.12)" stroke="url(#wipeout-boost-grad)" strokeWidth="1.5" />
                        <path d="M-16 0 L-8 -5 L-8 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M-2 0 L6 -5 L6 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.9" />
                        <path d="M12 0 L20 -5 L20 5 Z" fill="url(#wipeout-boost-grad)" opacity="0.7" />
                      </g>
                    </g>
                  </g>

                  <line x1="160" y1="118" x2="228" y2="153" stroke="rgba(255,255,255,0.45)" strokeWidth="3" strokeDasharray="4 4" />

                  <g opacity="0.4">
                    <polygon points="634,178 644,183 634,188" fill="#818cf8" />
                    <polygon points="100,226 90,221 100,216" fill="#22d3ee" />
                    <polygon points="280,376 275,386 270,376" fill="#e879f9" />
                  </g>

                  <g opacity="0.45">
                    <ellipse cx="0" cy="0" rx="20" ry="7" fill="rgba(15,23,42,0.6)">
                      <animateMotion
                        dur="8s" repeatCount="indefinite" rotate="auto"
                        path="M194 136 C245 90 340 85 420 114 C494 142 575 146 608 194 C639 239 609 300 554 335 C495 372 384 379 288 356 C203 335 131 284 131 224 C131 189 152 163 194 136 Z"
                        keyPoints="0;0.16;0.26;0.42;0.56;0.70;0.84;0.92;1"
                        keyTimes="0;0.20;0.27;0.47;0.57;0.74;0.84;0.94;1"
                        calcMode="spline"
                        keySplines="0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75"
                      />
                    </ellipse>
                  </g>

                  <g filter="url(#wipeout-ship-glow)">
                    <g>
                      <animateMotion
                        dur="8s" repeatCount="indefinite" rotate="auto"
                        path="M194 136 C245 90 340 85 420 114 C494 142 575 146 608 194 C639 239 609 300 554 335 C495 372 384 379 288 356 C203 335 131 284 131 224 C131 189 152 163 194 136 Z"
                        keyPoints="0;0.16;0.26;0.42;0.56;0.70;0.84;0.92;1"
                        keyTimes="0;0.20;0.27;0.47;0.57;0.74;0.84;0.94;1"
                        calcMode="spline"
                        keySplines="0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75;0.3 0.25 0.7 0.75;0.25 0.3 0.7 0.75"
                      />
                      <text x="0" y="-22" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="system-ui" fontWeight="600" letterSpacing="0.08em">YOU</text>
                      <g className="fctg-wipeout-ship-core" transform="scale(1.25)">
                        <path className="fctg-wipeout-ship-trail" d="M-16 0 C-34 -7 -52 -7 -78 0 C-52 7 -34 7 -16 0 Z" fill="url(#wipeout-boost-grad)" opacity="0.72" />
                        <path className="fctg-wipeout-ship-trail" d="M-6 0 C-18 -4 -34 -4 -52 0 C-34 4 -18 4 -6 0 Z" fill="rgba(255,255,255,0.85)" opacity="0.72" />
                        <ellipse cx="-18" cy="0" rx="18" ry="9" fill="url(#wipeout-engine-glow)" opacity="0.92" />
                        <path d="M-18 -9 L8 -6 L18 0 L8 6 L-18 9 L-6 0 Z" fill="url(#wipeout-ship-grad)" />
                        <line x1="-12" y1="-9" x2="-4" y2="-13" stroke="#a5f3fc" strokeWidth="1.2" opacity="0.7" />
                        <line x1="-12" y1="9" x2="-4" y2="13" stroke="#a5f3fc" strokeWidth="1.2" opacity="0.7" />
                        <path d="M-6 -6 L10 0 L-6 6 L0 0 Z" fill="rgba(15,23,42,0.96)" opacity="0.7" />
                        <circle cx="-2" cy="0" r="3.2" fill="rgba(15,23,42,0.94)" />
                        <ellipse cx="0" cy="-1.5" rx="2" ry="1" fill="rgba(165,243,252,0.4)" />
                        <ellipse cx="-24" cy="0" rx="7" ry="4.5" fill="#22d3ee" />
                        <ellipse cx="-22" cy="-3" rx="3" ry="1.5" fill="#22d3ee" opacity="0.6" />
                        <ellipse cx="-22" cy="3" rx="3" ry="1.5" fill="#22d3ee" opacity="0.6" />
                      </g>
                    </g>
                  </g>

                  <rect x="0" y="0" width="760" height="460" rx="28" fill="url(#wipeout-vignette)" pointerEvents="none" />
                </svg>
                <p className="mt-3 text-center text-[11px] text-slate-500">
                  Wipeout 2097 · PlayStation · 1997 · <a href="https://www.youtube.com/watch?v=b1lLk7yxrek&t=389s" target="_blank" rel="noopener noreferrer" className="text-cyan-400/80 hover:text-cyan-300 underline underline-offset-2">Watch on YouTube</a>
                </p>
              </div>
              <div className="grid gap-3">
                <style>{`
                  @keyframes fctg-cockpit-wheel-sway {
                    0%, 100% { transform: rotate(-9deg); }
                    50% { transform: rotate(9deg); }
                  }
                  @keyframes fctg-cockpit-wheel-glow {
                    0%, 100% { filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.35)); }
                    50% { filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.65)); }
                  }
                  @keyframes fctg-cockpit-throttle-push {
                    0%, 100% { transform: translateY(22px); }
                    40%, 60% { transform: translateY(-22px); }
                  }
                  @keyframes fctg-cockpit-throttle-glow {
                    0%, 100% { opacity: 0.2; }
                    40%, 60% { opacity: 0.95; }
                  }
                  @keyframes fctg-cockpit-throttle-trail {
                    0%, 100% { opacity: 0; transform: translateY(10px) scaleY(0.4); }
                    40%, 60% { opacity: 0.7; transform: translateY(-14px) scaleY(1); }
                  }
                  .fctg-cockpit-wheel {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: fctg-cockpit-wheel-sway 8s ease-in-out infinite, fctg-cockpit-wheel-glow 8s ease-in-out infinite;
                  }
                  .fctg-cockpit-throttle-handle {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: fctg-cockpit-throttle-push 6s ease-in-out infinite;
                  }
                  .fctg-cockpit-throttle-burn {
                    animation: fctg-cockpit-throttle-glow 6s ease-in-out infinite;
                  }
                  .fctg-cockpit-throttle-trail {
                    transform-box: fill-box;
                    transform-origin: center bottom;
                    animation: fctg-cockpit-throttle-trail 6s ease-in-out infinite;
                  }
                `}</style>
                <div className="rounded-2xl border border-cyan-500/25 bg-cyan-950/15 p-4">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 120 120" className="h-28 w-28 flex-shrink-0" aria-hidden>
                      <defs>
                        <radialGradient id="cockpit-wheel-hub" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#a5f3fc" />
                          <stop offset="55%" stopColor="#22d3ee" />
                          <stop offset="100%" stopColor="#0e7490" />
                        </radialGradient>
                        <linearGradient id="cockpit-wheel-ring" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#a5f3fc" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>
                      <g className="fctg-cockpit-wheel">
                        <circle cx="60" cy="60" r="38" fill="none" stroke="url(#cockpit-wheel-ring)" strokeWidth="5" />
                        <circle cx="60" cy="60" r="33" fill="none" stroke="rgba(34,211,238,0.3)" strokeWidth="1" />
                        {[0, 60, 120, 180, 240, 300].map((angle) => (
                          <g key={`handle-${angle}`} transform={`rotate(${angle} 60 60)`}>
                            <rect x="57" y="10" width="6" height="14" rx="2" fill="url(#cockpit-wheel-ring)" />
                            <circle cx="60" cy="10" r="4" fill="#67e8f9" stroke="#22d3ee" strokeWidth="1" />
                          </g>
                        ))}
                        {[0, 45, 90, 135].map((angle) => (
                          <line key={`spoke-${angle}`} x1="60" y1="60" x2="60" y2="26" stroke="url(#cockpit-wheel-ring)" strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 60 60)`} />
                        ))}
                        {[0, 45, 90, 135].map((angle) => (
                          <line key={`spoke2-${angle}`} x1="60" y1="60" x2="60" y2="94" stroke="url(#cockpit-wheel-ring)" strokeWidth="4" strokeLinecap="round" transform={`rotate(${angle} 60 60)`} />
                        ))}
                        <circle cx="60" cy="60" r="11" fill="url(#cockpit-wheel-hub)" stroke="#22d3ee" strokeWidth="1.5" />
                        <circle cx="60" cy="60" r="3.5" fill="rgba(15,23,42,0.92)" />
                      </g>
                    </svg>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">You steer</div>
                      <div className="mt-2 text-sm text-slate-200">You set the route. You own the outcome.</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-violet-500/25 bg-violet-950/15 p-4">
                  <div className="flex items-center gap-4">
                    <svg viewBox="0 0 120 120" className="h-28 w-28 flex-shrink-0" aria-hidden>
                      <defs>
                        <linearGradient id="cockpit-throttle-track" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(232,121,249,0.6)" />
                          <stop offset="100%" stopColor="rgba(129,140,248,0.3)" />
                        </linearGradient>
                        <linearGradient id="cockpit-throttle-handle" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#f5d0fe" />
                          <stop offset="50%" stopColor="#c084fc" />
                          <stop offset="100%" stopColor="#7c3aed" />
                        </linearGradient>
                        <linearGradient id="cockpit-throttle-burn" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="rgba(232,121,249,0.95)" />
                          <stop offset="60%" stopColor="rgba(129,140,248,0.5)" />
                          <stop offset="100%" stopColor="rgba(129,140,248,0)" />
                        </linearGradient>
                      </defs>
                      <rect x="44" y="18" width="32" height="84" rx="12" fill="rgba(15,23,42,0.7)" stroke="url(#cockpit-throttle-track)" strokeWidth="1.5" />
                      <rect x="50" y="24" width="20" height="72" rx="6" fill="rgba(2,6,23,0.9)" stroke="rgba(129,140,248,0.2)" strokeWidth="1" />
                      <g className="fctg-cockpit-throttle-trail">
                        <rect x="50" y="14" width="20" height="32" rx="8" fill="url(#cockpit-throttle-burn)" />
                      </g>
                      {[34, 46, 58, 70, 82].map((y) => (
                        <line key={y} x1="52" y1={y} x2="68" y2={y} stroke="rgba(232,121,249,0.4)" strokeWidth="1" />
                      ))}
                      <text x="78" y="26" fill="rgba(232,121,249,0.5)" fontSize="7" fontFamily="system-ui" fontWeight="700" letterSpacing="0.1em">MAX</text>
                      <text x="78" y="98" fill="rgba(129,140,248,0.5)" fontSize="7" fontFamily="system-ui" fontWeight="700" letterSpacing="0.1em">MIN</text>
                      <g className="fctg-cockpit-throttle-handle">
                        <rect x="36" y="60" width="48" height="18" rx="6" fill="url(#cockpit-throttle-handle)" stroke="#a78bfa" strokeWidth="1.2" />
                        <rect x="40" y="64" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.4)" />
                        <line x1="44" y1="71" x2="76" y2="71" stroke="rgba(15,23,42,0.5)" strokeWidth="1" />
                        <line x1="44" y1="74" x2="76" y2="74" stroke="rgba(15,23,42,0.3)" strokeWidth="1" />
                        <circle cx="60" cy="69" r="2" fill="#fdf4ff" />
                      </g>
                    </svg>
                    <div className="min-w-0">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">AI accelerates</div>
                      <div className="mt-2 text-sm text-slate-200">Research collation, synthesis drafts, layout iteration — all inside the route you set.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 18: Design workflows intro */}
        {slideIndex === 27 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/design-workflows-hero.png"
              alt="Design workflows chapter hero — aurora night sky with glowing workflow streams representing research, synthesis, prototyping and validation"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(45,212,191,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 4</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design workflows</h2>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 16: Execution compresses */}
        {slideIndex === 48 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:px-6 md:py-6 mx-auto">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Execution compresses</h2>
              <p className="fctg-subtitle mt-1 text-slate-400 text-sm">Agents create more room for judgment, direction, and decisions.</p>
            </div>
            <div className="mt-4">
              <div className="rounded-2xl border border-slate-700/50 bg-slate-950/35 px-4 py-4 max-w-4xl mx-auto">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Shift across phases</div>
                <div className="mt-3 space-y-3">
                  <div className="rounded-xl border border-slate-700/50 bg-slate-900/35 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">Then</div>
                      <div className="text-[10px] text-slate-500">Execution-heavy</div>
                    </div>
                    <div className="mt-2 flex h-9 overflow-hidden rounded-full border border-cyan-500/25 bg-slate-950/60">
                      <div className="flex basis-[70%] items-center justify-center bg-cyan-950/60 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                        Execution
                      </div>
                      <div className="flex basis-[12%] items-center justify-center bg-violet-950/45 text-[9px] font-semibold uppercase tracking-widest text-violet-200">
                        Judgment
                      </div>
                      <div className="flex basis-[9%] items-center justify-center bg-emerald-950/40 text-[9px] font-semibold uppercase tracking-widest text-emerald-200">
                        Direction
                      </div>
                      <div className="flex basis-[9%] items-center justify-center bg-amber-950/45 text-[9px] font-semibold uppercase tracking-widest text-amber-200">
                        Decisions
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/10 px-3 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80">Now</div>
                      <div className="text-[10px] text-cyan-100/60">Execution compressed</div>
                    </div>
                    <div className="mt-2 flex h-9 overflow-hidden rounded-full border border-cyan-500/25 bg-slate-950/60">
                      <div className="flex basis-[36%] items-center justify-center bg-cyan-950/60 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100">
                        Execution
                      </div>
                      <div className="flex flex-1">
                        <div className="flex-1 flex items-center justify-center bg-violet-950/45 text-[10px] font-semibold uppercase tracking-widest text-violet-200">Judgment</div>
                        <div className="flex-1 flex items-center justify-center bg-emerald-950/40 text-[10px] font-semibold uppercase tracking-widest text-emerald-200">Direction</div>
                        <div className="flex-1 flex items-center justify-center bg-amber-950/45 text-[10px] font-semibold uppercase tracking-widest text-amber-200">Decisions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 19: Research to synthesis */}
        {slideIndex === 28 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Research to synthesis</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">From messy inputs to clear themes, opportunities, and next moves.</p>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="rounded-xl border border-violet-500/25 bg-slate-950/35 p-3 md:p-4">
                <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)_auto_minmax(0,1fr)] lg:items-center">
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiMic, title: 'Interviews', text: 'Notes, transcripts, quotes', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                      { icon: FiMessageSquare, title: 'Tickets', text: 'Pain points from support', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                      { icon: FiClipboard, title: 'Survey data', text: 'Patterns across responses', cls: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200' },
                    ].map(({ icon: Icon, title, text, cls }) => (
                      <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <div className="text-[11px] font-semibold">{title}</div>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-3 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Agentic synthesis</div>
                        <div className="text-[11px] font-semibold text-violet-100">Clusters, summaries, signal detection</div>
            </div>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/30 bg-black/20 text-violet-200">
                        <FiZap className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                      {[
                        'Groups repeated themes',
                        'Pulls quotes and evidence',
                        'Drafts patterns for review',
                      ].map((item) => (
                        <div key={item} className="rounded-md border border-violet-400/15 bg-violet-500/5 px-2 py-1.5 text-[10px] text-slate-300">
                          {item}
                </div>
              ))}
            </div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiGrid, title: 'Themes', text: 'Clear buckets to discuss', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                      { icon: FiTarget, title: 'Opportunities', text: 'What to test next', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                      { icon: FiFileText, title: 'Design direction', text: 'Jobs to be done, insights, next-step brief', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
                    ].map(({ icon: Icon, title, text, cls }) => (
                      <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <div className="text-[11px] font-semibold">{title}</div>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 grid gap-1.5 md:grid-cols-[auto_1fr]">
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Payoff</div>
                  </div>
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2 text-[10px] text-slate-200">
                    Synthesis in minutes, not days. More time for judgment, framing, and better questions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Prototyping */}
        {slideIndex === 29 && (
        <Slide transparent wide className="items-center justify-center overflow-y-auto">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Prototyping</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">Ground it in your design system. Generate live variants in the room.</p>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="space-y-2.5">
                <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Agentic way</p>
                    </div>
                    <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold text-violet-200">Parallel</span>
                  </div>
                  <div className="grid gap-1.5 lg:grid-cols-[minmax(0,1.05fr)_auto_minmax(0,0.95fr)_auto_minmax(0,1.15fr)] lg:items-center">
                    <div className="grid gap-1.5 lg:grid-cols-[minmax(0,1fr)_48px] lg:items-center">
                      <div className="grid gap-1.5">
                        {[
                          { icon: FiLayers, title: 'Design system', text: 'Shared context: tokens, components, examples', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                          { icon: FiTarget, title: 'Brief', text: 'You set direction', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                        ].map(({ icon: Icon, title, text, cls }) => (
                          <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                            <div className="flex items-center gap-2">
                              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20">
                                <Icon className="h-3.5 w-3.5" aria-hidden />
                              </span>
                              <div className="text-[11px] font-semibold">{title}</div>
                            </div>
                            <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                          </div>
                        ))}
                      </div>
                      <div className="hidden lg:block relative" aria-hidden>
                        <svg viewBox="0 0 48 92" className="h-[92px] w-full overflow-visible" fill="none">
                          <path d="M 4 20 L 30 20" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M 4 72 L 30 72" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M 30 20 L 30 46" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M 30 72 L 30 46" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M 30 46 L 44 46" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="30" cy="46" r="3" fill="#22d3ee" fillOpacity="0.85" />
                        </svg>
                      </div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>

                    <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Cursor</div>
                          <div className="text-[11px] font-semibold text-violet-100">Generates + previews</div>
                        </div>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/30 bg-black/20 text-violet-200">
                          <FiZap className="h-3.5 w-3.5" aria-hidden />
                        </span>
                      </div>
                      <div className="mt-1.5 text-[10px] text-slate-300">Reads context, forks work, creates live previews.</div>
                    </div>
                    <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>

                    <div className="grid gap-1.5 lg:grid-cols-[48px_minmax(0,1fr)] lg:items-center">
                      <div className="hidden lg:block relative" aria-hidden>
                        <svg viewBox="0 0 48 92" className="h-[92px] w-full overflow-visible" fill="none">
                          <path d="M 4 46 L 18 46" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M 18 46 L 18 20" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M 18 46 L 18 72" stroke="#22d3ee" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
                          <path d="M 18 20 L 44 20" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <path d="M 18 72 L 44 72" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="1.4" strokeLinecap="round" />
                          <circle cx="18" cy="46" r="3" fill="#22d3ee" fillOpacity="0.85" />
                        </svg>
                      </div>
                      <div className="grid gap-1.5 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.95fr)] lg:items-center">
                        <div className="grid gap-1.5">
                          {[
                            { title: 'Variant A', text: 'Live preview A', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                            { title: 'Variant B', text: 'Live preview B', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                          ].map(({ title, text, cls }) => (
                            <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                              <div className="flex items-center justify-between gap-2">
                                <div className="text-[11px] font-semibold">{title}</div>
                                <FiGlobe className="h-3.5 w-3.5 opacity-80" aria-hidden />
                              </div>
                              <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                            </div>
                          ))}
                        </div>
                        <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                        <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 px-2.5 py-2">
                          <div className="text-[11px] font-semibold text-amber-100">Share, test, refine</div>
                          <div className="mt-1 text-[10px] text-slate-300">Review live variants and implement feedback on the fly.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 grid gap-1.5 md:grid-cols-[auto_1fr]">
                    <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Payoff</div>
                    </div>
                    <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2 text-[10px] text-slate-200">
                      The design system becomes inspectable context. Plan once, execute in parallel, and reflect on live variants.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 21: Why API-backed prototypes matter */}
        {slideIndex === 30 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>API-backed prototypes</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-3xl">Dummy Sabre or Amadeus data makes prototypes behave more like the real system.</p>
            </div>
            <div className="rounded-xl border border-amber-500/25 bg-amber-950/15 px-4 py-3 mb-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300/80">Travel example</div>
              <div className="mt-1 text-xs text-slate-200">A booking-flow prototype becomes more credible when date changes, fare differences, and inventory constraints reflect real travel behaviour.</div>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: FiGlobe, title: 'Real data shape', text: 'Availability, fares, seat maps, baggage, and rule changes expose the states static mockups skip.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { icon: FiActivity, title: 'Better decisions', text: 'You can test loading, empty, error, comparison, and fee-recalculation moments, not just polished screens.', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { icon: FiLayers, title: 'Earlier alignment', text: 'Product, design, and engineering see system constraints sooner, before assumptions harden into handoff risk.', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
              ].map(({ icon: Icon, title, text, cls }) => (
                <div key={title} className={`rounded-xl border p-4 md:p-5 ${cls}`}>
                  <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black/20">
                    <Icon className="h-4 w-4" aria-hidden />
                  </div>
                  <div className="mt-3 text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-slate-300">{text}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-violet-400/20 bg-black/15 p-2.5">
              <div className="grid gap-1.5 md:grid-cols-[auto_1fr]">
                <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Payoff</div>
                </div>
                <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2 text-[10px] text-slate-200">
                  Designers validate behaviour, not just screens.
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 35: Testing and validation */}
        {slideIndex === 31 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>You translate constantly</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">Between user needs and engineering delivery. AI helps keep context intact.</p>
            </div>
            <div className="mx-auto max-w-6xl grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-cyan-500/25 bg-slate-950/35 p-3 md:p-4">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-300/80">Testing — for users</div>
                <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] items-center">
                  <div className="grid gap-1.5">
                    {[
                      { title: 'Prototype', text: 'Flow or experience to review' },
                      { title: 'Goal', text: 'Tasks, success criteria' },
                      { title: 'Users', text: 'Who and what to watch' },
                    ].map(({ title, text }) => (
                      <div key={title} className="rounded-lg border border-cyan-500/25 bg-cyan-950/20 px-2.5 py-1.5">
                        <div className="text-[10px] font-semibold text-cyan-200">{title}</div>
                        <div className="text-[10px] text-slate-400">{text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-cyan-300/50 text-lg px-1">→</div>
                  <div className="grid gap-1.5">
                    {[
                      { title: 'Findings', text: 'What worked, where users struggled' },
                      { title: 'Recommendations', text: 'Prioritised fixes' },
                      { title: 'Next step', text: 'What to retest next' },
                    ].map(({ title, text }) => (
                      <div key={title} className="rounded-lg border border-emerald-500/25 bg-emerald-950/20 px-2.5 py-1.5">
                        <div className="text-[10px] font-semibold text-emerald-200">{title}</div>
                        <div className="text-[10px] text-slate-400">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 rounded-lg border border-cyan-400/15 bg-black/15 px-2.5 py-1.5 text-[10px] text-slate-300">Validate faster. Learn sooner. Iterate with better evidence.</div>
              </div>
              <div className="rounded-xl border border-violet-500/25 bg-slate-950/35 p-3 md:p-4">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300/80">Handoff — for engineering</div>
                <div className="grid gap-2 sm:grid-cols-[1fr_auto_1fr] items-center">
                  <div className="grid gap-1.5">
                    {[
                      { title: 'Figma flow', text: 'Screens, states, prototype links' },
                      { title: 'Context', text: 'Notes, rules, constraints' },
                      { title: 'Ask', text: 'What should engineering get?' },
                    ].map(({ title, text }) => (
                      <div key={title} className="rounded-lg border border-violet-500/25 bg-violet-950/20 px-2.5 py-1.5">
                        <div className="text-[10px] font-semibold text-violet-200">{title}</div>
                        <div className="text-[10px] text-slate-400">{text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden sm:flex items-center justify-center text-violet-300/50 text-lg px-1">→</div>
                  <div className="grid gap-1.5">
                    {[
                      { title: 'Summary', text: 'What the flow does and why' },
                      { title: 'Rules', text: 'States, conditions, criteria' },
                      { title: 'Open questions', text: 'What still needs input' },
                    ].map(({ title, text }) => (
                      <div key={title} className="rounded-lg border border-amber-500/25 bg-amber-950/20 px-2.5 py-1.5">
                        <div className="text-[10px] font-semibold text-amber-200">{title}</div>
                        <div className="text-[10px] text-slate-400">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 rounded-lg border border-violet-400/15 bg-black/15 px-2.5 py-1.5 text-[10px] text-slate-300">Context carries forward so less gets lost between design and engineering.</div>
              </div>
            </div>
            <div className="mx-auto mt-3 max-w-6xl rounded-xl border border-emerald-500/25 bg-emerald-950/15 px-4 py-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300/80">Release guardrails</div>
              <div className="mt-1 text-xs text-slate-300">When changes touch real journeys or shipping risk, add automated checks to protect what works and catch regressions.</div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 36: From Figma file to stronger handoff */}
        {slideIndex === 32 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-violet-300/70">For engineering</div>
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>From Figma to handoff</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-3xl">You bring the designs. The agent turns them into what engineering needs to build.</p>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="rounded-xl border border-violet-500/25 bg-slate-950/35 p-3 md:p-4">
                <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)_auto_minmax(0,1fr)] lg:items-center">
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiGrid, title: 'Figma flow', text: 'Screens, states, and prototype links', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                      { icon: FiFileText, title: 'Context', text: 'Notes, rules, constraints, and examples', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                      { icon: FiTarget, title: 'Ask', text: 'What should engineering get from this?', cls: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200' },
                    ].map(({ icon: Icon, title, text, cls }) => (
                      <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <div className="text-[11px] font-semibold">{title}</div>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                      </div>
                    ))}
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-3 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Agentic handoff</div>
                        <div className="text-[11px] font-semibold text-violet-100">Turns design intent into structured implementation context</div>
                      </div>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/30 bg-black/20 text-violet-200">
                        <FiZap className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                      {[
                        'Summarises the flow',
                        'Extracts rules and edge cases',
                        'Drafts open questions',
                      ].map((item) => (
                        <div key={item} className="rounded-md border border-violet-400/15 bg-violet-500/5 px-2 py-1.5 text-[10px] text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] text-slate-300">The first pass becomes clearer, faster, and easier to refine.</div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiClipboard, title: 'Summary', text: 'What the flow does and why', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                      { icon: FiLayers, title: 'Rules', text: 'States, conditions, and acceptance criteria', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                      { icon: FiMessageSquare, title: 'Open questions', text: 'What still needs product or engineering input', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
                    ].map(({ icon: Icon, title, text, cls }) => (
                      <div key={title} className={`rounded-lg border px-2.5 py-2 ${cls}`}>
                        <div className="flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-black/20">
                            <Icon className="h-3.5 w-3.5" aria-hidden />
                          </span>
                          <div className="text-[11px] font-semibold">{title}</div>
                        </div>
                        <div className="mt-1 text-[10px] text-slate-300">{text}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-2 grid gap-1.5 md:grid-cols-[auto_1fr]">
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Payoff</div>
                  </div>
                  <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2 text-[10px] text-slate-200">
                    Context carries forward so less gets lost between design, product, and engineering.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 37: What changes for teams */}
        {slideIndex === 13 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What changes for teams</h2>
              <p className="fctg-subtitle mt-1">Roles shift from production to direction.</p>
            </div>
            <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 text-center">
              {[
                { title: 'Faster learning', tone: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Clearer handoff', tone: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'Stronger review', tone: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
              ].map(({ title, tone }) => (
                <span key={title} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${tone}`}>
                  {title}
                </span>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 39: AI exposes workflow quality */}
        {slideIndex === 23 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.1rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>AI reveals the weak points</h2>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                {[
                  { label: 'Source of truth', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                  { label: 'Goal clarity', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                  { label: 'Review speed', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                ].map(({ label, cls }) => (
                  <span key={label} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${cls}`}>
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 40: Protect your attention */}
        {slideIndex === 26 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-6">
            <div className="mx-auto max-w-3xl text-center mb-6 md:mb-8">
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Protect your attention</h2>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-3">
              {[
                { title: 'Momentum', text: 'Draft faster. See more options. Synthesize sooner.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Loops', text: 'Another prompt. Another variant. Another check.', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'Reset', text: 'Step away. Breathe. Let judgment return.', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`flex min-h-[108px] flex-col items-center justify-center rounded-xl border px-5 py-5 text-center ${cls}`}>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-2 text-xs leading-relaxed text-slate-300">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 44: When to use more structure */}
      {slideIndex === 21 && (
        <Slide transparent className="items-center justify-center overflow-hidden py-4 md:py-6">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 min-w-0">
            <div className="text-center mb-7 md:mb-9">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Structure when it matters</h2>
            </div>
            <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
              {[
                { title: 'Complex flows', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Higher shipping risk', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                { title: 'Repeatable tasks', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
              ].map(({ title, cls }) => (
                <span key={title} className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${cls}`}>
                  {title}
                </span>
              ))}
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 37: What I built — chapter hero */}
        {slideIndex === 34 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/what-i-built-hero.png"
              alt="What I built chapter hero — three glowing crystalline orbs on a dark arctic landscape connected by gold filaments rising into the aurora"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.35) 0%, rgba(2,6,23,0.5) 48%, rgba(2,6,23,0.85) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-3xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 5</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What I built</h2>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 38: Demo 1 — Mental health monitor */}
        {slideIndex === 35 && (
        <Slide transparent className="items-center justify-center" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-8">
            <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Demo 1 — A tool for me</div>
                <h2 className="fctg-heading mt-1 !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Mental health monitor</h2>
              </div>
            </div>

            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="w-full rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">UI preview</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">The problem</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">I wanted to understand what actually affects how I feel. Nothing on the market fit how I think.</p>
                </div>
                <div className="rounded-xl border border-violet-500/25 bg-violet-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">What I directed</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Build me a self-tracker — physical inputs, emotions, environment. Win95 aesthetic. Frictionless to log.</p>
                </div>
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">What was mine</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Choosing which variables to track. The taste behind the UI. Deciding what I&apos;d actually sit with long enough to log.</p>
                </div>
                <div className="rounded-xl border border-amber-500/25 bg-amber-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">Learnings</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">The brief is the product. Vague direction makes vague software. The more I knew what I wanted, the faster something real appeared.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 39: Demo 2 — Pipe bender drafting */}
        {slideIndex === 36 && (
        <Slide transparent className="items-center justify-center" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-8">
            <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Demo 2 — A tool outside my training</div>
                <h2 className="fctg-heading mt-1 !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Pipe bender drafting</h2>
              </div>
            </div>

            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="w-full rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">UI preview</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">The problem</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">I&apos;m not a mechanical engineer, but I needed to understand — and draft — how pipe bending machinery works.</p>
                </div>
                <div className="rounded-xl border border-violet-500/25 bg-violet-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">What I directed</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Turn reference photos and descriptions into technical schematics and CAD estimates — plan, elevation, section, with dimensions that hold together.</p>
                </div>
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">What was mine</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Judging which schematic was right. Catching structural mistakes I could feel before I could name. Knowing when to stop.</p>
                </div>
                <div className="rounded-xl border border-amber-500/25 bg-amber-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">Learnings</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">You don&apos;t need domain expertise to direct in a domain. You need enough to check the output. Curiosity plus iteration got further than training would have.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 40: Demo 3 — Crisis intelligence dashboard */}
        {slideIndex === 37 && (
        <Slide transparent className="items-center justify-center" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-8">
            <div className="mb-6 md:mb-8 flex items-baseline justify-between gap-4 flex-wrap">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/80">Demo 3 — A tool for sense-making</div>
                <h2 className="fctg-heading mt-1 !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Crisis intelligence dashboard</h2>
              </div>
            </div>

            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <div className="w-full rounded-xl bg-slate-800/60 border border-slate-700/40 flex items-center justify-center" style={{ aspectRatio: '4/3' }}>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">UI preview</span>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl border border-cyan-500/25 bg-cyan-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">The problem</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Too much happening, too fast, too many sources — and my portfolio exposed to all of it.</p>
                </div>
                <div className="rounded-xl border border-violet-500/25 bg-violet-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/90">What I directed</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Build me one scannable view — red, amber, green — that connects global events to specific positions, in language I can trust.</p>
                </div>
                <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300/90">What was mine</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">Deciding what counts as a signal. The information hierarchy. Which sources to trust. The restraint of a single screen.</p>
                </div>
                <div className="rounded-xl border border-amber-500/25 bg-amber-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90">Learnings</div>
                  <p className="mt-1.5 text-[13px] leading-[1.55] text-slate-200">AI is fast at synthesis but bad at knowing what matters to you. The curation is the work — and only you can do it.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 41: Synthesis — What the demos proved */}
      {slideIndex === 38 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto px-4 py-6 md:py-10">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="fctg-heading mt-2 !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What the demos proved</h2>
              <p className="fctg-subtitle mt-2 text-sm md:text-base text-slate-400">Different problems. Same pattern.</p>
            </div>

            <div className="mx-auto grid max-w-4xl gap-3 md:grid-cols-3 md:gap-4">
              {[
                { label: 'Direction', text: 'Clearer direction made better tools.', border: 'border-cyan-500/30', bg: 'bg-cyan-950/15', accent: 'text-cyan-300/90' },
                { label: 'Context', text: 'Better context made faster progress.', border: 'border-violet-500/30', bg: 'bg-violet-950/15', accent: 'text-violet-300/90' },
                { label: 'Judgment', text: 'Human judgment decided what was worth keeping.', border: 'border-teal-500/30', bg: 'bg-teal-950/15', accent: 'text-teal-300/90' },
              ].map(({ label, text, border, bg, accent }) => (
                <div key={label} className={`rounded-2xl border ${border} ${bg} px-4 py-5 md:px-5 md:py-6`}>
                  <div className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${accent}`}>{label}</div>
                  <p className="mt-2 text-[13px] leading-[1.5] text-slate-200">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 47: Close intro */}
      {slideIndex === 39 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/close-hero.png"
              alt="Close chapter hero — teal and violet aurora arching inward over a perfectly still reflective lake, conveying arrival and completion"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 pb-24 text-center md:px-8 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 6</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Close</h2>
              </div>
            </div>
          </div>
        } />
      )}

      {/* Slide 48: How this was built */}
      {slideIndex === 49 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.1rem] md:!text-[2.6rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>How this was built</h2>
              <p className="fctg-subtitle mt-1">This is the actual stack and workflow: a real app, real tests, real delivery.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
              {[
                { title: 'Cursor', text: 'AI-assisted development workflow', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'React', text: 'UI and slide components', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'Vite', text: 'Development and build', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                { title: 'Vitest', text: 'Logic and unit tests', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                { title: 'React Testing Library', text: 'UI behaviour and states', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
                { title: 'Playwright', text: 'Critical browser journeys', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-lg border px-2.5 py-3 text-center ${cls}`}>
                  <div className="text-[13px] font-semibold leading-tight">{title}</div>
                  <div className="mt-1 text-[11px] leading-snug text-slate-300">{text}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">The same principle applies here: the workflow is not just prompts, it is code, tests, review, and delivery.</p>
          </div>
        </Slide>
      )}

      {/* Slide 49: How AI was used to plan and run this session */}
      {slideIndex === 50 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.1rem] md:!text-[2.6rem] inline-block text-center whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Using AI to plan and run this session</h2>
              <p className="fctg-subtitle mt-1">Planning, trimming, prep, and live support.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { title: 'Planning', text: 'Structure, flow, and what to cover', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Trimming & combining', text: 'What to cut, what to merge, clearer narrative', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'Prep materials', text: 'Run-of-show, timesheet, slide list, Q&A prep', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                { title: 'Day-of assist', text: 'Cheat sheet, transitions, “what if” backup', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                { title: 'Live support', text: 'Second screen: pacing, answers, one-liners', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-lg border px-2.5 py-3 text-center ${cls}`}>
                  <div className="text-[13px] font-semibold leading-tight">{title}</div>
                  <div className="mt-1 text-[11px] leading-snug text-slate-300">{text}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6">
              {[
                { title: 'Time saving', text: 'Draft, iterate, and prep faster', cls: 'border-emerald-500/30 bg-emerald-950/20' },
                { title: 'Coverage', text: 'Prep you’d skip otherwise — Q&A, run-of-show, backup', cls: 'border-sky-500/30 bg-sky-950/20' },
                { title: 'Knowledge', text: 'Domain framing, structure, best practices, gap-filling', cls: 'border-rose-500/30 bg-rose-950/20' },
                { title: 'Parallel work', text: 'Deck, copy, and prep docs at the same time', cls: 'border-amber-500/30 bg-amber-950/20' },
                { title: 'Iteration speed', text: 'Try more directions, see results quickly', cls: 'border-indigo-500/30 bg-indigo-950/20' },
                { title: 'Higher floor', text: 'Better first drafts, focus on refining', cls: 'border-pink-500/30 bg-pink-950/20' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-lg border px-3 py-2 text-center ${cls}`}>
                  <div className="text-xs font-semibold text-slate-200">{title}</div>
                  <div className="mt-0.5 text-[11px] text-slate-400">{text}</div>
                </div>
              ))}
            </div>
          </div>
        </Slide>
      )}

      {/* Slide 50: Productivity metrics — building this session */}
      {slideIndex === 51 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <TimeWithAISplitChart variant="dark" />
          </div>
        </Slide>
      )}

      {/* Slide 52: What we hope you take away */}
      {slideIndex === 40 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Three things to keep with you</h2>
            </div>
            <div className="grid gap-3 md:gap-4 md:grid-cols-3">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 px-4 py-4 text-center">
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">How to work</p>
                <p className="text-sm text-slate-300">Structure the work clearly, delegate intentionally, and stay in the driver&apos;s seat.</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 px-4 py-4 text-center">
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-violet-400/90 mb-2">What changes</p>
                <p className="text-sm text-slate-300">Use AI to improve process, decisions, and outcomes, not just generate more output.</p>
              </div>
              <div className="rounded-xl border border-teal-500/30 bg-teal-950/20 px-4 py-4 text-center">
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-teal-400/90 mb-2">What stays human</p>
                <p className="text-sm text-slate-300">Keep judgment human. Keep standards high. Keep questioning the fundamentals.</p>
              </div>
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">The opportunity is not more output. It is better process, better decisions, and better outcomes.</p>
          </div>
        </Slide>
        )}

      {/* Slide 53: Thank you */}
      {slideIndex === 41 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition flex flex-col items-center justify-center text-center px-8 min-h-[60vh]">
            <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Thank you</h2>
            <p className="mt-6 text-sm font-medium text-slate-400">Joel Hickey</p>
            <p className="fctg-subtitle mt-2 text-slate-300">Reach out with any questions</p>
            <p className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm">
              <a href="mailto:joelhickeydesigns@gmail.com" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">Email</a>
              <span className="text-slate-500">·</span>
              <a href="https://www.linkedin.com/in/joel-hickey-493757138/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2">LinkedIn</a>
            </p>
          </div>
        </Slide>
        )}

      {/* Slide 54: Appendix hero */}
      {slideIndex === 42 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition flex flex-col items-center justify-center text-center px-8 min-h-[60vh]">
            <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Reference</div>
            <h2 className="mt-3 fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Appendix</h2>
            <p className="fctg-subtitle mt-2 max-w-xl text-slate-300">Extra mechanism detail, kept out of the main flow.</p>
          </div>
        </Slide>
        )}

        {/* Appendix: Anatomy of a session (moved from Ch3) */}
        {slideIndex === 43 && (
        <Slide transparent className="items-center justify-center overflow-y-auto" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl mx-auto px-4 py-6 md:py-8">
            <div className="flex flex-col items-center text-center mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Anatomy of a session</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">You give a brief to an agent. The agent runs it in a session.</p>
            </div>
            <div className="flex flex-col items-center w-full max-w-md mx-auto">
              <div className="w-full rounded-2xl border-2 border-slate-500/40 bg-slate-900/40 p-4 flex flex-col items-center gap-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-300/90">Tool</span>
                <span className="text-[9px] text-slate-500">e.g. Cursor, AI-native IDE</span>
                <div className="w-full rounded-xl border-2 border-amber-500/40 bg-amber-950/15 p-3 flex flex-col items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400/90">Session</span>
                  <span className="text-[9px] text-slate-500">chat</span>
                  <div className="w-full rounded-lg border-2 border-violet-500/40 bg-violet-950/15 p-3 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400/90">Agent</span>
                    <div className="w-full rounded border border-cyan-500/40 bg-cyan-950/20 px-4 py-2 flex flex-col items-center gap-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-300/90">Brief</span>
                      <span className="text-[10px] text-slate-400">Mobile-first post-booking flow.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

      </div>

      {/* Nav */}
      <div className="fixed bottom-3 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full border border-cyan-500/30 bg-black/80 px-4 py-2 backdrop-blur-sm">
        <button
          type="button"
          onClick={goPrev}
          disabled={slideIndex === 0}
          className="rounded-full p-1.5 text-cyan-400 transition hover:bg-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="min-w-12 text-center text-xs font-mono tracking-wide text-cyan-300">
          {getVisibleSlideNumber(slideIndex)} / {VISIBLE_SLIDE_COUNT}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={slideIndex === SLIDE_COUNT - 1}
          className="rounded-full p-1.5 text-cyan-400 transition hover:bg-cyan-500/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Next slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

    </div>
  )
}

export default FCTGAITalkSlides
