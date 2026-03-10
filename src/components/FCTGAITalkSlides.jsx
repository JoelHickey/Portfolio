import { useState, useEffect, useCallback, useRef } from 'react'
import WaterAscii from './WaterAscii'
import WeavingLoom from './WeavingLoom'
import WiderEnvironmentCanvas from './WiderEnvironmentCanvas'
import EmpowermentHealthDrawing from './EmpowermentHealthDrawing'
import ParticleBackground from './ParticleBackground'
import OrbitalTrailsBackground from './OrbitalTrailsBackground'
import BatteryParticleFill from './BatteryParticleFill'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser, FiTarget, FiRefreshCw, FiCornerUpRight, FiShield, FiFileText, FiActivity, FiSearch } from 'react-icons/fi'
import { TbBrain, TbRobot } from 'react-icons/tb'
import FCTGHeading from './design-system/fctg/FCTGHeading'
import FCTGAIFlowDiagram, { FCTGAIFlowCaption } from './FCTGAIFlowDiagram'
import FCTGMultiAgentDiagram, { FCTGMultiAgentCaption } from './FCTGMultiAgentDiagram'
import FCTGBodyAnalogyDiagram from './FCTGBodyAnalogyDiagram'

const SLIDE_COUNT = 40

/* Slide quotes — Rick Rubin from The Way of Code; Henry Dreyfuss for Looking back */
const FCTG_SLIDE_QUOTES = {
  0: null,
  1: null,
  2: null,
  3: null,
  4: { quote: 'Free from desire, you see essence unformed. Caught in desire, you see only the manifestations.', attribution: '— Rick Rubin, The Way of Code' },
  5: null,
  6: null,
  7: null,
  8: null,
  9: null,
  10: { quote: 'Things arise and he accepts them. Things vanish and he lets them go.', attribution: '— Rick Rubin, The Way of Code' },
  11: null,
  12: null,
  13: null,
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
  21: null,
  22: null,
  23: null,
  24: null,
  25: null,
  26: null,
  27: null,
  28: null,
  29: null,
  30: null,
  31: null,
  32: null,
  33: null,
  34: null,
  35: null,
  36: null,
  37: null,
  38: null,
  39: null,
  40: null,
  39: { quote: 'Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns.', attribution: '— Rick Rubin, The Way of Code' },
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
    <span className="inline-flex font-mono tracking-wide" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
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
    { title: 'Data input',        example: 'Photo + Text',           stroke: '#38bdf8', fill: 'rgba(7,89,133,0.85)'  },
    { title: 'Pre-process',       example: 'Clean, resize, tensor',  stroke: '#22d3ee', fill: 'rgba(8,51,68,0.9)'    },
    { title: 'Model inference',   example: 'Neural net runs',        stroke: '#fb923c', fill: 'rgba(69,26,3,0.9)'    },
    { title: 'Output generation', example: '"Golden Retriever"',     stroke: '#2dd4bf', fill: 'rgba(17,94,89,0.9)'   },
    { title: 'Post-process',      example: 'Format label',           stroke: '#e879f9', fill: 'rgba(88,28,135,0.85)' },
    { title: 'Result',            example: 'User sees it',           stroke: '#a78bfa', fill: 'rgba(46,16,101,0.9)'  },
  ]
  const nW = 110, nH = 68, gap = 26, marginX = 10, svgH = 195
  const svgW = marginX * 2 + nodes.length * nW + (nodes.length - 1) * gap
  const nY = 32, nCY = nY + nH / 2
  const loopOutset = 10, feedbackY = nY + nH + 44
  const positions = nodes.map((_, i) => ({
    x: marginX + i * (nW + gap),
    cx: marginX + nW / 2 + i * (nW + gap),
  }))
  const lastRight = positions[5].x + nW
  const modelCX = positions[2].cx
  return (
    <div className="w-full max-w-[860px] mx-auto" aria-label="Inside the model: AI pipeline">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="itm-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(34,211,238,0)"    />
            <stop offset="30%"  stopColor="rgba(34,211,238,0.85)" />
            <stop offset="60%"  stopColor="rgba(129,140,248,0.85)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)"   />
          </linearGradient>
          <marker id="itm-arr" markerWidth="7" markerHeight="6" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L7 3 L0 6 Z" fill="rgba(129,140,248,0.9)" />
          </marker>
          <marker id="itm-arr-loop" markerWidth="7" markerHeight="6" refX="5.5" refY="3" orient="auto">
            <path d="M0 0 L7 3 L0 6 Z" fill="rgba(167,139,250,0.85)" />
          </marker>
        </defs>
        {/* Forward connector arrows */}
        {positions.slice(0, -1).map((pos, i) => (
          <line
            key={i}
            x1={pos.x + nW} y1={nCY}
            x2={positions[i + 1].x} y2={nCY}
            stroke="url(#itm-grad)" strokeWidth="2" strokeDasharray="8 6"
            markerEnd="url(#itm-arr)"
            style={{ animation: `fctg-prod-flow 1.8s linear infinite ${(i * 0.28).toFixed(2)}s` }}
          />
        ))}
        {/* Feedback loop: Result → Model inference */}
        <path
          d={`M ${lastRight} ${nCY} H ${lastRight + loopOutset} V ${feedbackY} H ${modelCX} V ${nY + nH}`}
          fill="none" stroke="rgba(167,139,250,0.45)" strokeWidth="1.5" strokeDasharray="7 6"
          markerEnd="url(#itm-arr-loop)"
          style={{ animation: 'fctg-prod-flow 3.5s linear infinite 1.4s' }}
        />
        <text
          x={(lastRight + loopOutset + modelCX) / 2} y={feedbackY + 14}
          textAnchor="middle" fontSize="9" fill="rgba(167,139,250,0.75)"
          fontFamily="system-ui,sans-serif" fontStyle="italic"
        >
          &ldquo;Actually it&rsquo;s a Labrador&rdquo; — model corrects
        </text>
        {/* Nodes: step title (top half) + example value (bottom half) */}
        {nodes.map(({ title, example, stroke, fill }, i) => {
          const { x, cx } = positions[i]
          const divY = nY + nH * 0.52
          return (
            <g key={i}>
              <rect x={x} y={nY} width={nW} height={nH} rx={8} fill={fill} stroke={stroke} strokeWidth="1.5" />
              <line x1={x + 6} y1={divY} x2={x + nW - 6} y2={divY} stroke={stroke} strokeWidth="0.75" opacity="0.4" />
              <text x={cx} y={nY + nH * 0.28} textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fill="#f1f5f9" fontFamily="system-ui,sans-serif" fontWeight="700">
                {title}
              </text>
              <text x={cx} y={nY + nH * 0.74} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fill={stroke} fontFamily="system-ui,sans-serif" fontStyle="italic">
                {example}
              </text>
            </g>
          )
        })}
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

function useViewportSize() {
  const [size, setSize] = useState({ w: 720, h: 720 })
  useEffect(() => {
    const update = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])
  return size
}

function FCTGAITalkSlides() {
  const [slideIndex, setSlideIndex] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const viewport = useViewportSize()

  const goNext = useCallback(() => {
    setSlideIndex((i) => Math.min(i + 1, SLIDE_COUNT - 1))
  }, [])

  const goPrev = useCallback(() => {
    setSlideIndex((i) => Math.max(i - 1, 0))
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
      {/* Slide 1: Title — WaterAscii + particle animation + scanline + grid */}
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
      {/* Slide 2: What we'll cover */}
      {slideIndex === 1 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 3: Looking back — monumental hero with particles */}
      {slideIndex === 2 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-40" aria-hidden />
        </div>
      )}
      {/* Slide 5: The fundamentals of design hold strong — animated blob background */}
      {slideIndex === 3 && (
        <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden bg-[#030b0f]" aria-hidden>
          <div
            className="fctg-blob fctg-blob-1"
            style={{
              position: 'absolute',
              width: '80vmax',
              height: '80vmax',
              left: '-20%',
              top: '-25%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(34, 211, 238, 0.08) 40%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'fctg-blob-float 16s ease-in-out infinite',
            }}
          />
          <div
            className="fctg-blob fctg-blob-2"
            style={{
              position: 'absolute',
              width: '70vmax',
              height: '70vmax',
              right: '-15%',
              bottom: '-20%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(129, 140, 248, 0.22) 0%, rgba(129, 140, 248, 0.06) 40%, transparent 70%)',
              filter: 'blur(60px)',
              animation: 'fctg-blob-float 18s ease-in-out infinite',
              animationDelay: '-8s',
            }}
          />
          <div
            style={{
              position: 'absolute',
              width: '50vmax',
              height: '50vmax',
              left: '50%',
              top: '50%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(167, 139, 250, 0.2) 0%, transparent 60%)',
              filter: 'blur(70px)',
              animation: 'fctg-blob-float-center 14s ease-in-out infinite',
              animationDelay: '-4s',
            }}
          />
        </div>
      )}
      {/* Slide 6: Design process */}
      {slideIndex === 4 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 8: Wider environment — monumental hero with particles */}
      {slideIndex === 5 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" centerOffsetY={80} />
          <div className="absolute inset-0 fctg-pattern-dot-matrix opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 9: Energy */}
      {slideIndex === 6 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 10: Strength */}
      {slideIndex === 7 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
        </div>
      )}
      {/* Slide 11: Speed */}
      {slideIndex === 8 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="speed" />
        </div>
      )}
      {/* Slide 12: Iteration */}
      {slideIndex === 9 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 13: Imagination */}
      {slideIndex === 10 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="imagination" />
        </div>
      )}
      {/* Slide 14: Calmness */}
      {slideIndex === 11 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 15: Mystical Code */}
      {slideIndex === 12 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
        </div>
      )}
      {/* Slide 16: Empowerment */}
      {slideIndex === 13 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="empowerment" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 18: Vibe coding — philosophy (above models/agents) */}
      {slideIndex === 17 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 16: What happens inside the model? */}
      {slideIndex === 14 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 17: AI Agents — pure black to match image */}
      {slideIndex === 15 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 18: Multi-agent systems — pure black */}
      {slideIndex === 16 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 19: Ways of creating with vibe — pure black */}
      {slideIndex === 18 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 27: Agentic & designer productivity */}
      {slideIndex === 19 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 29: Then vs Now — same phases, you steer, agent executes */}
      {slideIndex === 21 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 22: Context and continuity */}
      {slideIndex === 22 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 28: Intervention */}
      {slideIndex === 20 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Helpful tips — after Intervention */}
      {slideIndex === 23 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 30: Tech stack */}
      {slideIndex === 24 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 31: Pipeline */}
      {slideIndex === 25 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 32: ReAct (what happens when you prompt) */}
      {slideIndex === 26 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 33: GitHub */}
      {slideIndex === 27 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 34: GitHub (content) — same bg as 33 */}
      {slideIndex === 28 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 35: Vercel */}
      {slideIndex === 29 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 36: Design systems */}
      {slideIndex === 30 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 37: Design system in practice */}
      {slideIndex === 31 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* In the wild — example/payoff after Design system in practice */}
      {slideIndex === 32 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 38: Testing */}
      {slideIndex === 33 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 40: Level up (activity) */}
      {slideIndex === 34 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 41: Rounds */}
      {slideIndex === 35 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 41: Rounds (duplicate bg) */}
      {slideIndex === 35 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 41: Three pillars */}
      {slideIndex === 36 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 42: What we hope you take away */}
      {slideIndex === 37 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 43: Opportunity */}
      {slideIndex === 38 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 44: Thank you */}
      {slideIndex === 39 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide content */}
      <div className="relative z-20 h-full overflow-x-hidden overflow-y-hidden">
        {/* Chapter label — same position at very top for all chapter slides */}
        {slideIndex >= 4 && slideIndex <= 6 && <ChapterLabel>Concepts</ChapterLabel>}
        {slideIndex >= 7 && slideIndex <= 13 && <ChapterLabel>Monumental moments</ChapterLabel>}
        {slideIndex >= 14 && slideIndex <= 24 && <ChapterLabel>Building momentum</ChapterLabel>}
        {slideIndex >= 24 && slideIndex <= 33 && <ChapterLabel>Technology</ChapterLabel>}
        {slideIndex >= 34 && slideIndex <= 39 && <ChapterLabel>Activity & close</ChapterLabel>}
        {/* Slide 1: Title */}
        {slideIndex === 0 && (
        <Slide
          heroOnly
          transparent
          hero={
            <div className="relative min-h-screen overflow-hidden bg-transparent">
              <div key={slideIndex} className="fctg-text-transition absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 px-8 pb-16 text-center">
                <h1 className="fctg-heading-hero" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                  <span className="block">Invigoration, innovation</span>
                  <span className="block">and impact</span>
                </h1>
                <p className="mt-8 tracking-wide text-cyan-300/80">Presented to Flight Centre Travel Group&apos;s (FCTG) Global Design Team, March 2026</p>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 2: What we'll cover */}
        {slideIndex === 1 && (
        <Slide transparent className="!p-0">
          <div key={slideIndex} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
            <div className="fctg-text-transition w-full max-w-3xl">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What we&apos;ll cover</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-base md:text-lg whitespace-nowrap">Concepts, monumental moments, building momentum, technology and a fun agentic activity!</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 3: Looking back — full-page weaving */}
        {slideIndex === 2 && (
        <Slide
          heroOnly
          transparent
          scrollable
          hero={
            <div className="relative min-h-screen flex flex-col bg-transparent">
              <WeavingLoom fullPage variant="dark" showShuttle={false} />
              <div key={slideIndex} className="fctg-text-transition relative z-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-16 px-8 pb-16">
                <div className="mx-auto w-full max-w-5xl">
                  <div className="w-full max-w-2xl mx-auto text-center px-2">
                    <h2 className="fctg-heading md:whitespace-nowrap !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Looking back to look ahead</h2>
                    <p className="fctg-subtitle mt-1 text-lg tracking-wide text-slate-300">Through every metamorphosis, the human element and mastery of craft have retained their value.</p>
                  </div>
                <div className="mt-4 md:mt-10 w-full max-w-4xl mx-auto text-center">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 items-start">
                      {[
                        { title: 'Weavers', text: "The loom changed; the weaver's artistry, mastery, and skill endured.", color: '#22d3ee' },
                        { title: 'Wheels', text: "The leap from horse-drawn cart to automobile changed the vehicle; the human in the journey remained.", color: '#2dd4bf' },
                        { title: 'Digital', text: "Design became systems and flows, not just single screens; the human at the centre of the experience stayed.", color: '#818cf8' },
                      ].map((item) => (
                      <div key={item.title} className="text-center max-w-xs">
                        <h3 className="text-lg font-semibold tracking-wide" style={{ color: item.color }}>
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm text-slate-300 leading-relaxed tracking-wide whitespace-pre-line">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                </div>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 6: The fundamentals of design hold strong */}
        {slideIndex === 3 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl flex flex-col items-center">
            <div className="flex flex-col items-center text-center max-w-md">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The fundamentals of design hold strong</h2>
            </div>
            <div className="mt-4 md:mt-10 flex flex-nowrap justify-center items-center gap-4 md:gap-8 overflow-x-auto min-w-0">
              <img src="/images/AI talk/appleguidlines87.png" alt="Apple Human Interface Guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain shrink-0 -rotate-2" />
              <img src="/images/AI talk/designforpeople.webp" alt="Designing for People by Henry Dreyfuss" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain shrink-0 rotate-1" />
              <img src="/images/AI talk/design-of-everyday-things.png" alt="The Design of Everyday Things by Don Norman" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain shrink-0 -rotate-1" />
              <img src="/images/AI talk/win95guidimage.png" alt="Windows 95 interface guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain shrink-0 brightness-110 rotate-2" />
            </div>
            <div className="mt-4 md:mt-10 text-center flex flex-col items-center">
              <SlideQuote slideIndex={6} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 7: Design process — discover, define, develop, deliver */}
        {slideIndex === 4 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The design process</h2>
              <p className="fctg-subtitle mt-1">What counts as productive work has evolved.</p>
            </div>
          <div className="mt-10 w-screen max-w-none" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            <svg viewBox="0 0 1280 120" className="block w-full min-h-[120px]" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <title>Productivity in flux — flowing lines</title>
              <defs>
                <linearGradient id="fctg-prod-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="30%" stopColor="#2dd4bf" />
                  <stop offset="60%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <clipPath id="fctg-prod-clip-q1"><rect x="0" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-prod-clip-q2"><rect x="320" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-prod-clip-q3"><rect x="640" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-prod-clip-q4"><rect x="960" y="0" width="320" height="120" /></clipPath>
              </defs>
              {/* Line 1 — thicker towards right */}
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="2" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="2.5" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-prod-gradient)" strokeWidth="2.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-prod-gradient)" strokeWidth="2.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              {/* Line 2 */}
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.75" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.25" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-prod-gradient)" strokeWidth="1" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              {/* Line 3 */}
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="0.75" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1.25" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-prod-clip-q1)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-prod-gradient)" strokeWidth="1" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q2)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q3)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-prod-clip-q4)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
            </svg>
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 8: Wider environment — title, diagram, subtitle in clear order */}
        {slideIndex === 5 && (
        <Slide transparent className="items-center justify-center !py-6 !px-4">
          <div key={slideIndex} className="fctg-text-transition flex flex-col items-center min-h-full w-full max-w-4xl gap-6 md:gap-8">
            <div className="text-center">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>
                Ecosystem
              </h2>
              <p className="fctg-subtitle mt-1 text-sm md:text-base text-slate-300/95 max-w-xl mx-auto">
                Design-centric: every decision needs to be part of the conversation.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center min-h-0 w-full">
              <WiderEnvironmentCanvas
                width={viewport.w < 768 ? Math.min(viewport.w, viewport.h - 220) * 0.85 : Math.min(560, viewport.w * 0.5, (viewport.h - 200) * 0.6)}
                height={viewport.w < 768 ? Math.min(viewport.w, viewport.h - 220) * 0.85 : Math.min(560, viewport.w * 0.5, (viewport.h - 200) * 0.6)}
                className="text-cyan-500/80"
              />
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 9: Energy */}
      {slideIndex === 6 && (
        <Slide transparent className="items-center justify-center !py-4 !px-4">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-7xl grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 md:gap-8 items-center">
            {/* Left: content */}
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Energy</h2>
              <p className="fctg-subtitle mt-1">What charges your designer battery?</p>
            </div>
            {/* Right: battery — aligned with subtitle "What charges your designer battery?" */}
            <div className="flex justify-center md:justify-end mt-4 md:mt-5" aria-hidden>
              <style>{`
                @keyframes fctg-battery-shine { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
                @keyframes fctg-battery-pulse { 0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.3)); } 50% { filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.5)); } }
                @keyframes fctg-battery-bubble { 0% { opacity: 0; transform: translateX(0) scale(0.5); } 20% { opacity: 0.8; transform: translateX(6px) scale(1); } 80% { opacity: 0.5; transform: translateX(-40px) scale(0.8); } 100% { opacity: 0; transform: translateX(-56px) scale(0.4); } }
                @keyframes fctg-battery-charge-in { 0% { opacity: 0; transform: translateX(20px) scale(0.3); } 30% { opacity: 1; transform: translateX(8px) scale(0.9); } 70% { opacity: 0.8; transform: translateX(-8px) scale(0.6); } 100% { opacity: 0; transform: translateX(-28px) scale(0.2); } }
                @keyframes fctg-battery-charging-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                @keyframes fctg-energy-from-word { 0% { opacity: 0; transform: translateY(0) scale(0.5); } 15% { opacity: 0.9; transform: translateY(8px) scale(1); } 85% { opacity: 0.6; transform: translateY(72px) scale(0.8); } 100% { opacity: 0; transform: translateY(90px) scale(0.4); } }
                @keyframes fctg-plus-spark { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.8; transform: scale(1.2); } }
                @keyframes fctg-word-charge { 0%, 90%, 100% { opacity: 0.7; text-shadow: 0 0 0 transparent; } 45% { opacity: 1; text-shadow: 0 0 12px currentColor; } }
                .fctg-battery-segment { animation: fctg-battery-shine 2.5s ease-in-out infinite; }
                .fctg-battery-body { animation: fctg-battery-pulse 3s ease-in-out infinite; }
                .fctg-battery-bubble { animation: fctg-battery-bubble 2.5s ease-in-out infinite; }
                .fctg-battery-charge-in { animation: fctg-battery-charge-in 2s ease-in-out infinite; }
                .fctg-battery-charging { animation: fctg-battery-charging-pulse 1.2s ease-in-out infinite; }
                .fctg-word-charge { animation: fctg-word-charge 2s ease-in-out infinite; }
              `}</style>
              <div className="relative w-full max-w-[min(1280px,90vw)]" style={{ aspectRatio: '1100/280' }}>
                <svg viewBox="0 0 1100 280" className="block w-full h-full text-cyan-400/90" preserveAspectRatio="xMidYMid meet">
                <title>Energy battery</title>
                <defs>
                  <linearGradient id="fctg-battery-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" /><stop offset="25%" stopColor="#2dd4bf" /><stop offset="50%" stopColor="#818cf8" /><stop offset="75%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                  <filter id="fctg-battery-glow"><feGaussianBlur stdDeviation="2" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                  <clipPath id="fctg-battery-clip"><rect x="44" y="32" width="992" height="186" rx="6" /></clipPath>
                </defs>
                {[{ y: 80, d: 0 }, { y: 130, d: 0.3 }, { y: 180, d: 0.6 }, { y: 105, d: 0.15 }, { y: 155, d: 0.45 }, { y: 60, d: 0.5 }, { y: 210, d: 0.2 }, { y: 115, d: 0.75 }, { y: 165, d: 0.35 }].map((p, i) => (
                  <circle key={i} cx="1068" cy={p.y} r="3" fill="rgba(34, 211, 238, 0.9)" className="fctg-battery-charge-in" style={{ animationDelay: `${p.d}s` }} />
                ))}
                {/* Main body — connects negative (40) to positive (1040) */}
                <rect x="40" y="28" width="1000" height="204" rx="10" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" className="fctg-battery-body" />
                {/* Negative terminal (left) — centred on body centre y=130 */}
                <rect x="4" y={28 + 204 / 2 - 104 / 2} width="36" height="104" rx="6" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" />
                <text x="22" y="130" textAnchor="middle" dominantBaseline="middle" fill="url(#fctg-battery-grad)" fontSize="32" fontWeight="800">−</text>
                {/* Positive terminal (right) — same, centred on body */}
                <rect x="1040" y={28 + 204 / 2 - 104 / 2} width="36" height="104" rx="6" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" />
                <text x="1058" y="130" textAnchor="middle" dominantBaseline="middle" fill="url(#fctg-battery-grad)" fontSize="32" fontWeight="800">+</text>
                <g clipPath="url(#fctg-battery-clip)">
                  <foreignObject x="44" y="32" width="992" height="186">
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 6, pointerEvents: 'none' }}>
                      <BatteryParticleFill width={992} height={186} />
                    </div>
                  </foreignObject>
                  {[{ x: 160, y: 90, d: 0 }, { x: 330, y: 130, d: 0.4 }, { x: 540, y: 95, d: 0.8 }, { x: 440, y: 165, d: 0.2 }, { x: 710, y: 110, d: 0.5 }, { x: 820, y: 80, d: 0.1 }, { x: 875, y: 145, d: 0.6 }, { x: 935, y: 105, d: 0.3 }, { x: 270, y: 120, d: 0.7 }].map((b, i) => (
                    <circle key={i} cx={b.x} cy={b.y} r="3.5" fill="rgba(255,255,255,0.65)" className="fctg-battery-bubble" style={{ animationDelay: `${b.d}s` }} />
                  ))}
                  {/* Words in their own container: equal gaps between each word (space-evenly) */}
                  <foreignObject x="44" y="95" width="992" height="60">
                    <div xmlns="http://www.w3.org/1999/xhtml" className="fctg-battery-words" style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', boxSizing: 'border-box', pointerEvents: 'none' }}>
                      {[{ word: 'Imagination', color: '#22d3ee', d: 0 }, { word: 'Creativity', color: '#2dd4bf', d: 0.2 }, { word: 'Knowledge', color: '#818cf8', d: 0.4 }, { word: 'Productivity', color: '#a78bfa', d: 0.6 }, { word: 'Value', color: '#e879f9', d: 0.8 }].map(({ word, color, d }) => (
                        <span key={word} className="fctg-word-charge" style={{ flex: '0 0 auto', fontSize: 28, fontWeight: 600, color, whiteSpace: 'nowrap', animationDelay: `${d}s` }}>{word}</span>
                      ))}
                    </div>
                  </foreignObject>
                </g>
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 10: Strength */}
      {slideIndex === 7 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: content */}
            <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Strength</h2>
              <p className="fctg-subtitle mt-1">AI guided me through a structural design problem</p>
              <div className="mt-6 flex flex-col gap-4 min-w-0 overflow-visible" aria-hidden>
                <style>{`
                  @keyframes fctg-strength-prompt-type { from { width: 0; } to { width: 30ch; } }
                  @keyframes fctg-strength-agent-type { from { width: 0; } to { width: 85ch; } }
                  @keyframes fctg-strength-agent-type-mobile { from { width: 0; } to { width: 100%; } }
                  @keyframes fctg-strength-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-strength-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-prompt-type 1.5s steps(30) 0s forwards; }
                  .fctg-strength-agent-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-agent-type 2.5s steps(85) 2s forwards; }
                  .fctg-strength-prompt-type::after, .fctg-strength-agent-type::after { content: '|'; animation: fctg-strength-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
                  @media (max-width: 767px) {
                    .fctg-strength-agent-type { white-space: normal; animation: fctg-strength-agent-type-mobile 2.5s steps(75) 2s forwards; }
                  }
                `}</style>
                <div className="fctg-strength-piece text-sm text-cyan-300" style={{ animationDelay: '0s' }}>
                  <span className="fctg-strength-prompt-type">Check this beam for failure modes.</span>
                </div>
                <div className="fctg-strength-piece text-sm text-violet-300" style={{ animationDelay: '2s' }}>
                  <span className="fctg-strength-agent-type">Bending, shear, buckling — the agent walked through the checks.</span>
                </div>
              </div>
            </div>
            {/* Right: three vertical truss monuments */}
            <div className="flex justify-center items-end gap-6 overflow-visible py-4" aria-hidden>
              <style>{`
                @keyframes fctg-truss-draw { from { stroke-dashoffset: 2400; } to { stroke-dashoffset: 0; } }
                @keyframes fctg-truss-draw-2 { from { stroke-dashoffset: 2400; } to { stroke-dashoffset: 0; } }
                @keyframes fctg-truss-draw-3 { from { stroke-dashoffset: 2200; } to { stroke-dashoffset: 0; } }
                .fctg-truss-path { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: fctg-truss-draw 5s ease-out 4.5s forwards; }
                .fctg-truss-path-2 { stroke-dasharray: 2400; stroke-dashoffset: 2400; animation: fctg-truss-draw-2 5s ease-out 4.5s forwards; }
                .fctg-truss-path-3 { stroke-dasharray: 2200; stroke-dashoffset: 2200; animation: fctg-truss-draw-3 5s ease-out 4.5s forwards; }
              `}</style>
              {/* Monument 1: Warren truss — triangulated, no box outline */}
              <svg viewBox="-5 -5 110 370" className="h-[200px] md:h-[260px] w-auto shrink-0" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="fctg-truss-grad" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="33%" stopColor="#2dd4bf" />
                    <stop offset="66%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <path className="fctg-truss-path" stroke="url(#fctg-truss-grad)" d="
                  M 10 10 L 90 10
                  M 10 350 L 90 350
                  M 10 10 L 30 350
                  M 30 10 L 10 350
                  M 30 10 L 50 350
                  M 50 10 L 30 350
                  M 50 10 L 70 350
                  M 70 10 L 50 350
                  M 70 10 L 90 350
                  M 90 10 L 70 350
                " />
              </svg>
              {/* Monument 2: Pratt truss — verticals and diagonals, triangulated */}
              <svg viewBox="-5 -5 110 370" className="h-[200px] md:h-[260px] w-auto shrink-0" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="fctg-truss-grad-2" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="33%" stopColor="#2dd4bf" />
                    <stop offset="66%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <path className="fctg-truss-path-2" stroke="url(#fctg-truss-grad-2)" d="
                  M 10 10 L 90 10
                  M 10 350 L 90 350
                  M 10 10 L 10 350
                  M 30 10 L 30 350
                  M 50 10 L 50 350
                  M 70 10 L 70 350
                  M 90 10 L 90 350
                  M 10 350 L 30 10
                  M 30 350 L 50 10
                  M 50 350 L 70 10
                  M 70 350 L 90 10
                " />
              </svg>
              {/* Monument 3: K-truss — K-shaped panels, triangulated */}
              <svg viewBox="-5 -5 110 370" className="h-[200px] md:h-[260px] w-auto shrink-0" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <linearGradient id="fctg-truss-grad-3" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="33%" stopColor="#2dd4bf" />
                    <stop offset="66%" stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#e879f9" />
                  </linearGradient>
                </defs>
                <path className="fctg-truss-path-3" stroke="url(#fctg-truss-grad-3)" d="
                  M 10 10 L 90 10
                  M 10 350 L 90 350
                  M 10 10 L 10 350
                  M 90 10 L 90 350
                  M 50 10 L 50 350
                  M 10 10 L 50 180 L 90 10
                  M 10 350 L 50 180 L 90 350
                " />
              </svg>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 10: Speed */}
      {slideIndex === 8 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: title, subtitle, prompt */}
            <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
              <style>{`
                @keyframes fctg-speed-flash-sweep {
                  from { background-position: -100% 0; }
                  to { background-position: 200% 0; }
                }
                .fctg-speed-heading-flash {
                  position: relative;
                  display: inline-block;
                }
                .fctg-speed-heading-flash::after {
                  content: 'Speed';
                  position: absolute;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background: linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,0.8) 50%, transparent 65%, transparent 100%);
                  background-size: 50% 100%;
                  background-repeat: no-repeat;
                  background-position: -100% 0;
                  -webkit-background-clip: text;
                  background-clip: text;
                  color: transparent;
                  animation: fctg-speed-flash-sweep 0.7s ease-out 2;
                  pointer-events: none;
                }
              `}</style>
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] fctg-speed-heading-flash inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Speed</h2>
              <p className="fctg-subtitle mt-1">Prompt to UI in seconds.</p>
              <div className="mt-6 flex flex-col gap-4 min-w-0 overflow-hidden" aria-hidden>
                <style>{`
                  @keyframes fctg-speed-prompt-type { from { width: 0; } to { width: 40ch; } }
                  @keyframes fctg-speed-prompt-type-mobile { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes fctg-speed-agent-type { from { width: 0; } to { width: 65ch; } }
                  @keyframes fctg-speed-agent-type-mobile { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes fctg-speed-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-speed-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-speed-prompt-type 2s steps(40) 0s forwards; }
                  .fctg-speed-prompt-type::after { content: '|'; animation: fctg-speed-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
                  .fctg-speed-agent-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-speed-agent-type 2s steps(65) 2.2s forwards; }
                  .fctg-speed-agent-type::after { content: '|'; animation: fctg-speed-cursor 0.7s step-end infinite 2.2s; margin-left: 1px; color: #a78bfa; }
                  @media (max-width: 767px) {
                    .fctg-speed-prompt-type { width: auto; white-space: normal; overflow: visible; animation: fctg-speed-prompt-type-mobile 1s ease-out 0s forwards; }
                    .fctg-speed-prompt-type::after { display: none; }
                    .fctg-speed-agent-type { width: auto; white-space: normal; overflow: visible; animation: fctg-speed-agent-type-mobile 0.8s ease-out 2s forwards; }
                    .fctg-speed-agent-type::after { display: none; }
                  }
                `}</style>
                <div className="fctg-speed-ui-piece text-sm text-cyan-300">
                  <span className="fctg-speed-prompt-type">Create a login form with email and password</span>
                </div>
                <div className="fctg-speed-ui-piece text-sm text-violet-300" style={{ animationDelay: '2s' }}>
                  <span className="fctg-speed-agent-type">Email field, password field, remember me, Submit — the agent rendered the form.</span>
                </div>
              </div>
            </div>
            {/* Right: form preview */}
            <div className="flex justify-center fctg-speed-ui-piece" style={{ animationDelay: '1.3s' }}>
              <style>{`
                @keyframes fctg-speed-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
                @keyframes fctg-speed-label { from { opacity: 0; } to { opacity: 1; } }
                .fctg-speed-draw { stroke-dasharray: 1; stroke-dashoffset: 1; animation: fctg-speed-draw 0.5s ease-out forwards; }
                .fctg-speed-label { opacity: 0; animation: fctg-speed-label 0.2s ease-out forwards; }
              `}</style>
              <svg viewBox="0 0 280 200" className="w-full max-w-[320px] text-slate-400" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <defs>
                  <linearGradient id="fctg-speed-form-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#a78bfa" />
                  </linearGradient>
                </defs>
                <rect className="fctg-speed-draw" pathLength="1" x="8" y="32" width="264" height="40" rx="6" stroke="url(#fctg-speed-form-grad)" style={{ animationDelay: '1.4s' }} />
                <rect className="fctg-speed-draw" pathLength="1" x="8" y="84" width="264" height="40" rx="6" stroke="url(#fctg-speed-form-grad)" style={{ animationDelay: '1.7s' }} />
                <rect className="fctg-speed-draw" pathLength="1" x="8" y="136" width="18" height="18" rx="4" stroke="url(#fctg-speed-form-grad)" style={{ animationDelay: '2s' }} />
                <rect className="fctg-speed-draw" pathLength="1" x="8" y="164" width="64" height="32" rx="6" stroke="url(#fctg-speed-form-grad)" style={{ animationDelay: '2.2s' }} />
                <rect className="fctg-speed-draw" pathLength="1" x="80" y="164" width="64" height="32" rx="6" stroke="url(#fctg-speed-form-grad)" style={{ animationDelay: '2.4s' }} />
                <text x="20" y="56" className="fctg-speed-label text-sm fill-slate-500" style={{ fontFamily: 'system-ui', fontSize: 12, animationDelay: '1.9s' }}>Email</text>
                <text x="20" y="108" className="fctg-speed-label text-sm fill-slate-500" style={{ fontFamily: 'system-ui', fontSize: 12, animationDelay: '2.2s' }}>Password</text>
                <text x="40" y="180" textAnchor="middle" dominantBaseline="middle" className="fctg-speed-label text-sm fill-slate-400" style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 500, animationDelay: '2.7s' }}>Cancel</text>
                <text x="112" y="180" textAnchor="middle" dominantBaseline="middle" className="fctg-speed-label text-sm fill-slate-400" style={{ fontFamily: 'system-ui', fontSize: 12, fontWeight: 500, animationDelay: '2.9s' }}>Submit</text>
              </svg>
            </div>
          </div>
          <div className="w-full max-w-5xl mt-10 text-center">
            <SlideQuote slideIndex={8} />
          </div>
        </Slide>
        )}

      {/* Slide 12: Iteration */}
      {slideIndex === 9 && (
        <Slide heroOnly transparent hero={
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <ParticleBackground variant="iteration" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative z-10 max-w-2xl px-8 text-center">
                <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Iteration</h2>
                <p className="fctg-subtitle mt-1 text-lg drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] whitespace-nowrap overflow-x-auto">Trust the process. Embrace ambiguity.</p>
                <div className="mt-10 flex justify-center" aria-hidden>
                  <div className="relative">
                    <div className="absolute inset-0 blur-2xl bg-cyan-500/20 rounded-full scale-150" />
                    <svg viewBox="0 0 160 160" className="relative w-48 h-48 md:w-64 md:h-64 text-cyan-400/80" aria-hidden>
                      <style>{`
                        @keyframes fctg-iterate-spin { to { transform: rotate(360deg); } }
                        @keyframes fctg-iterate-spin-rev { to { transform: rotate(-360deg); } }
                        @keyframes fctg-iterate-pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
                        .fctg-iterate-ring { animation: fctg-iterate-spin 10s linear infinite; transform-origin: center; }
                        .fctg-iterate-ring-2 { animation: fctg-iterate-spin-rev 14s linear infinite; transform-origin: center; }
                        .fctg-iterate-ring-3 { animation: fctg-iterate-spin 7s linear infinite; transform-origin: center; }
                        .fctg-iterate-ring-4 { animation: fctg-iterate-spin-rev 11s linear infinite; transform-origin: center; }
                        .fctg-iterate-ring-5 { animation: fctg-iterate-spin 9s linear infinite; transform-origin: center; }
                        .fctg-iterate-dot { animation: fctg-iterate-pulse 1.5s ease-in-out infinite; }
                        .fctg-iterate-draw { stroke-dasharray: 300; stroke-dashoffset: 300; animation: fctg-iterate-draw 1.5s ease-out forwards; }
                      `}</style>
                      <defs>
                        <linearGradient id="fctg-iterate-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#22d3ee" />
                          <stop offset="50%" stopColor="#818cf8" />
                          <stop offset="100%" stopColor="#e879f9" />
                        </linearGradient>
                      </defs>
                      <g className="fctg-iterate-ring">
                        <circle cx="80" cy="80" r="60" fill="none" stroke="url(#fctg-iterate-grad)" strokeWidth="2" strokeDasharray="10 12" opacity="0.8" />
                        <circle cx="80" cy="20" r="5" fill="currentColor" className="fctg-iterate-dot" />
                      </g>
                      <g className="fctg-iterate-ring-2">
                        <circle cx="80" cy="80" r="48" fill="none" stroke="url(#fctg-iterate-grad)" strokeWidth="1.5" strokeDasharray="8 10" opacity="0.7" />
                        <circle cx="80" cy="32" r="4" fill="currentColor" className="fctg-iterate-dot" style={{ animationDelay: '0.3s' }} />
                      </g>
                      <g className="fctg-iterate-ring-3">
                        <circle cx="80" cy="80" r="36" fill="none" stroke="url(#fctg-iterate-grad)" strokeWidth="1.5" strokeDasharray="6 8" opacity="0.8" />
                        <circle cx="80" cy="44" r="3" fill="currentColor" className="fctg-iterate-dot" style={{ animationDelay: '0.6s' }} />
                      </g>
                      <g className="fctg-iterate-ring-4">
                        <circle cx="80" cy="80" r="24" fill="none" stroke="url(#fctg-iterate-grad)" strokeWidth="1" strokeDasharray="4 6" opacity="0.7" />
                        <circle cx="80" cy="56" r="2.5" fill="currentColor" className="fctg-iterate-dot" style={{ animationDelay: '0.9s' }} />
                      </g>
                      <g className="fctg-iterate-ring-5">
                        <circle cx="80" cy="80" r="12" fill="none" stroke="url(#fctg-iterate-grad)" strokeWidth="1" strokeDasharray="3 4" opacity="0.9" />
                        <circle cx="80" cy="68" r="2" fill="currentColor" className="fctg-iterate-dot" style={{ animationDelay: '1.2s' }} />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 z-10 pb-16 pt-2 bg-gradient-to-t from-black/80 to-transparent pointer-events-none -translate-y-16">
              <div className="max-w-2xl mx-auto px-8 text-center">
                <SlideQuote slideIndex={9} />
              </div>
            </div>
          </div>
        } />
        )}

      {/* Slide 13: Imagination */}
      {slideIndex === 10 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex flex-col gap-2 max-w-xl">
                <p className="fctg-card-text flex flex-col md:flex-row items-center justify-center gap-2 md:gap-x-2 md:gap-y-0 md:items-baseline">
                  <span className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] shrink-0 inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Imagination</span>
                  <span className="whitespace-nowrap text-white">Beyond the gates of technology.</span>
                </p>
              <div className="w-full min-w-0" aria-hidden>
                <style>{`
                  @keyframes fctg-sound-dot {
                    0%, 100% { transform: translateY(6px); }
                    50% { transform: translateY(-6px); }
                  }
                  .fctg-sound-dot {
                    transform-origin: center;
                    animation: fctg-sound-dot 1.2s ease-in-out infinite;
                  }
                `}</style>
                <svg viewBox="0 0 490 48" className="w-full h-10 text-cyan-400/70" preserveAspectRatio="xMidYMid slice" aria-hidden>
                  <title>Sound wave — Imagination</title>
                  {[...Array(35)].map((_, i) => (
                    <circle
                      key={i}
                      cx={8 + i * 14}
                      cy={24}
                      r={2.5}
                      fill="currentColor"
                      className="fctg-sound-dot"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    />
                  ))}
                </svg>
              </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 14: Calmness */}
      {slideIndex === 11 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Calmness</h2>
              <p className="fctg-subtitle mt-1">Less friction, more space to think.</p>
            </div>
            <div className="w-full max-w-5xl mt-10 text-center">
              <SlideQuote slideIndex={13} />
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 15: Mystical Code */}
      {slideIndex === 12 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] relative min-h-[3rem] md:min-h-[3.5rem] flex items-center justify-center">
                <span className="sr-only">Mystical Code</span>
                <style>{`
                  @keyframes fctg-mystical-heading-a {
                    0%, 40% { opacity: 1; }
                    50%, 90% { opacity: 0; }
                    100% { opacity: 1; }
                  }
                  @keyframes fctg-mystical-heading-b {
                    0%, 40% { opacity: 0; }
                    50%, 90% { opacity: 1; }
                    100% { opacity: 0; }
                  }
                  .fctg-mystical-heading-a { animation: fctg-mystical-heading-a 6s ease-in-out infinite; }
                  .fctg-mystical-heading-b { animation: fctg-mystical-heading-b 6s ease-in-out infinite; }
                `}</style>
                <span className="fctg-mystical-heading-a absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Mystical Code</span>
                <span className="fctg-mystical-heading-b absolute inset-0 flex items-center justify-center font-mono text-2xl tracking-widest" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>{'{ } </> ( )'}</span>
              </h2>
              <p className="fctg-subtitle mt-1">Code felt mystical — now it&apos;s reachable.</p>
            </div>
          </div>
          <div className="w-full max-w-5xl mt-10 text-center">
            <SlideQuote slideIndex={12} />
          </div>
        </Slide>
        )}

      {/* Slide 16: Empowerment */}
      {slideIndex === 13 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Build things that add value to your life.</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cyan-400">
                <span>Mental health app</span>
                <span>Drafting studio</span>
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <EmpowermentHealthDrawing />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: Vibe coding — philosophy (above models/agents) */}
        {slideIndex === 17 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen flex flex-col items-center justify-between pt-14 md:pt-16 pb-16 md:pb-20 overflow-hidden">
            <img
              src="/vibe-coding-conductor.png"
              alt="Conductor directing an AI orchestra"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ animation: 'conductor-zoom 28s ease-in-out infinite', transformOrigin: '50% 40%' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(34,211,238,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 45% at 70% 30%, rgba(167,139,250,0.14) 0%, transparent 65%)',
                animation: 'aurora-drift 18s ease-in-out infinite',
              }}
            />
            {[
              { top: '8%',  left: '12%', size: 2,   delay: '0s',    dur: '3.2s' },
              { top: '14%', left: '78%', size: 1.5, delay: '1.1s',  dur: '4.5s' },
              { top: '22%', left: '55%', size: 2.5, delay: '0.4s',  dur: '3.8s' },
              { top: '6%',  left: '42%', size: 1.5, delay: '2.3s',  dur: '5.1s' },
              { top: '31%', left: '88%', size: 2,   delay: '0.9s',  dur: '4.0s' },
              { top: '18%', left: '25%', size: 1,   delay: '1.7s',  dur: '2.9s' },
              { top: '40%', left: '7%',  size: 1.5, delay: '3.1s',  dur: '4.4s' },
              { top: '5%',  left: '65%', size: 2,   delay: '0.2s',  dur: '3.6s' },
              { top: '28%', left: '72%', size: 1,   delay: '2.8s',  dur: '5.5s' },
              { top: '48%', left: '93%', size: 1.5, delay: '1.4s',  dur: '3.3s' },
              { top: '12%', left: '90%', size: 2,   delay: '0.7s',  dur: '4.7s' },
              { top: '35%', left: '38%', size: 1,   delay: '2.0s',  dur: '3.0s' },
              { top: '3%',  left: '33%', size: 2,   delay: '3.5s',  dur: '4.2s' },
              { top: '20%', left: '8%',  size: 1.5, delay: '1.9s',  dur: '3.9s' },
              { top: '44%', left: '60%', size: 1,   delay: '0.6s',  dur: '5.0s' },
            ].map(({ top, left, size, delay, dur }, i) => (
              <span key={i} className="absolute rounded-full bg-white pointer-events-none" style={{ top, left, width: size, height: size, animation: `star-twinkle ${dur} ease-in-out ${delay} infinite`, boxShadow: `0 0 ${size * 3}px ${size}px rgba(255,255,255,0.6)` }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Vibe coding</h2>
            </div>
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
              <div className="flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-1">
                <span className="text-base md:text-xl font-semibold text-white/90 tracking-tight">Creative flow</span>
                <span className="text-slate-500">·</span>
                <span className="text-base md:text-xl font-semibold text-white/90 tracking-tight">Intuition</span>
                <span className="text-slate-500">·</span>
                <span className="text-base md:text-xl font-semibold text-white/90 tracking-tight">Conversational</span>
                <span className="text-slate-500">·</span>
                <span className="text-base md:text-xl font-semibold text-white/90 tracking-tight">Rapid experimentation</span>
              </div>
            </div>
          </div>
        } />
        )}


        {/* Slide 16: AI models */}
        {slideIndex === 14 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8 -mt-8 md:-mt-12">
            <div className="flex flex-col items-center text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AI models</h2>
              <p className="fctg-subtitle mt-1">The brain — it reads, reasons, and generates.</p>
            </div>
            <div className="w-full max-w-4xl mx-auto min-w-0">
              <InsideModelFlow />
            </div>
            <p className="mt-3 text-xs text-slate-500 text-center">Stateless, output only — you supply context each turn; it returns the response.</p>
          </div>
        </Slide>
        )}

        {/* Slide 17: AI Agents — same aesthetic as Multi-agent, body analogy (human) diagram */}
        {slideIndex === 15 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AI Agents</h2>
              <p className="fctg-subtitle mt-1">Drive outcomes, not just outputs.</p>
            </div>
            <FCTGBodyAnalogyDiagram />
            <p className="mt-3 text-xs text-slate-500 text-center max-w-xl mx-auto">The model is the brain. The wrapper — tools, loop, memory — is what makes it agentic.</p>
          </div>
        </Slide>
        )}

        {/* Slide 18: Multi-agent systems */}
        {slideIndex === 16 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Multi-agent systems</h2>
              <p className="fctg-subtitle mt-1">Orchestrate. Delegate. Scale.</p>
            </div>
            <FCTGMultiAgentDiagram compact />
            <p className="mt-3 text-xs text-slate-500 text-center max-w-xl mx-auto">Use multi-agent when one agent isn’t enough — distinct roles, parallel work, or a pipeline that needs handoffs.</p>
          </div>
        </Slide>
        )}

        {/* Slide 19: Ways of creating with vibe — after multi-agent, before Context */}
        {slideIndex === 18 && (
        <Slide transparent className="items-center justify-center overflow-hidden" style={{ background: '#000' }} wide>
          <style>{`
            @keyframes vibe-node-pulse { 0%, 100% { opacity: 0.4; r: 4.5; } 50% { opacity: 0.85; r: 6; } }
          `}</style>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto flex flex-col items-center gap-6 text-center px-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Ways of creating with vibe</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl mx-auto">Two modes, one philosophy.</p>
            </div>
            <div className="w-full grid gap-4 grid-cols-2 max-w-4xl mx-auto">
              {/* Vibe card */}
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 overflow-hidden flex flex-col">
                <div className="relative flex-[2] min-h-[180px]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
                    <defs>
                      <linearGradient id="vibe-wave-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(34,211,238,0)" />
                        <stop offset="25%" stopColor="rgba(34,211,238,0.5)" />
                        <stop offset="75%" stopColor="rgba(45,212,191,0.5)" />
                        <stop offset="100%" stopColor="rgba(34,211,238,0)" />
                      </linearGradient>
                      <linearGradient id="vibe-fade-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(3,5,15,0.9)" />
                      </linearGradient>
                    </defs>
                    <path d="M-30 25 Q50 5 110 28 T230 22 T360 28 T480 20" stroke="rgba(34,211,238,0.14)" strokeWidth="1" fill="none" />
                    <path d="M-30 50 Q60 28 130 52 T270 46 T410 52 T530 44" stroke="rgba(34,211,238,0.18)" strokeWidth="1.25" fill="none" />
                    <path d="M-30 75 Q70 52 150 76 T310 70 T470 76 T600 68" stroke="rgba(45,212,191,0.16)" strokeWidth="1" fill="none" />
                    <path d="M-30 100 Q80 76 170 100 T350 94 T530 100 T660 92" stroke="rgba(34,211,238,0.2)" strokeWidth="1.5" fill="none" />
                    <path d="M-30 125 Q90 100 190 124 T390 118 T590 124" stroke="rgba(34,211,238,0.15)" strokeWidth="1" fill="none" />
                    <path d="M-30 150 Q100 126 210 150 T430 144 T650 150" stroke="rgba(45,212,191,0.13)" strokeWidth="1" fill="none" />
                    <path d="M-30 170 Q110 148 230 170 T470 165 T700 170" stroke="rgba(34,211,238,0.1)" strokeWidth="0.75" fill="none" />
                    <path d="M-30 30 Q55 8 120 32 T250 26 T390 32 T510 24" stroke="url(#vibe-wave-grad)" strokeWidth="2" fill="none" strokeDasharray="14 10" style={{ animation: 'fctg-prod-flow 3s linear infinite' }} />
                    <path d="M-30 72 Q72 48 154 74 T314 68 T474 74 T594 66" stroke="url(#vibe-wave-grad)" strokeWidth="1.75" fill="none" strokeDasharray="12 12" style={{ animation: 'fctg-prod-flow 4.2s linear infinite 0.8s' }} />
                    <path d="M-30 114 Q88 90 188 114 T384 108 T580 114" stroke="url(#vibe-wave-grad)" strokeWidth="1.5" fill="none" strokeDasharray="10 14" style={{ animation: 'fctg-prod-flow 5.5s linear infinite 1.8s' }} />
                    <path d="M-30 155 Q106 132 222 156 T448 150 T674 156" stroke="url(#vibe-wave-grad)" strokeWidth="1.25" fill="none" strokeDasharray="8 16" style={{ animation: 'fctg-prod-flow 7s linear infinite 3s' }} />
                    <rect x="0" y="0" width="400" height="180" fill="url(#vibe-fade-bottom)" />
                  </svg>
                </div>
                <div className="flex-[1] px-5 pt-4 pb-5 border-t border-cyan-500/15 bg-black/30 flex flex-col gap-2.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-cyan-500/40 bg-cyan-950/60 shrink-0">
                      <FiZap className="w-3 h-3 text-cyan-400" />
                    </span>
                    <h3 className="text-sm md:text-base font-semibold text-cyan-300">Vibe</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">Creative flow, intuition, rapid experimentation. You&apos;re the conductor — conversational, iterative prompts to shape a vision without worrying about implementation details.</p>
                  <p className="text-[10px] md:text-xs text-cyan-400/80 italic mt-1">&ldquo;I&rsquo;m thinking about a booking flow — what would you try first?&rdquo;</p>
                </div>
              </div>

              {/* Agentic card */}
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 overflow-hidden flex flex-col">
                <div className="relative flex-[2] min-h-[180px]">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
                    <defs>
                      <linearGradient id="agent-edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(167,139,250,0)" />
                        <stop offset="30%" stopColor="rgba(167,139,250,0.55)" />
                        <stop offset="70%" stopColor="rgba(192,132,252,0.55)" />
                        <stop offset="100%" stopColor="rgba(167,139,250,0)" />
                      </linearGradient>
                      <linearGradient id="agent-fade-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(5,3,15,0.9)" />
                      </linearGradient>
                      <filter id="node-glow">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                      </filter>
                    </defs>
                    {[40, 90, 140, 190].map(y => (
                      <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="rgba(167,139,250,0.06)" strokeWidth="0.75" />
                    ))}
                    {[80, 160, 240, 320].map(x => (
                      <line key={x} x1={x} y1="0" x2={x} y2="180" stroke="rgba(167,139,250,0.04)" strokeWidth="0.75" />
                    ))}
                    <line x1="35" y1="30" x2="130" y2="75" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" strokeDasharray="5 4" style={{ animation: 'fctg-prod-flow 2.8s linear infinite' }} />
                    <line x1="130" y1="75" x2="240" y2="40" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" strokeDasharray="5 4" style={{ animation: 'fctg-prod-flow 2.8s linear infinite 0.5s' }} />
                    <line x1="240" y1="40" x2="360" y2="90" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" strokeDasharray="5 4" style={{ animation: 'fctg-prod-flow 2.8s linear infinite 1s' }} />
                    <line x1="35" y1="30" x2="60" y2="130" stroke="rgba(167,139,250,0.18)" strokeWidth="1" strokeDasharray="4 5" style={{ animation: 'fctg-prod-flow 3.5s linear infinite 0.2s' }} />
                    <line x1="60" y1="130" x2="190" y2="155" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" strokeDasharray="5 4" style={{ animation: 'fctg-prod-flow 2.8s linear infinite 1.5s' }} />
                    <line x1="190" y1="155" x2="315" y2="135" stroke="rgba(167,139,250,0.25)" strokeWidth="1.5" strokeDasharray="5 4" style={{ animation: 'fctg-prod-flow 2.8s linear infinite 2s' }} />
                    <line x1="315" y1="135" x2="360" y2="90" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="4 5" style={{ animation: 'fctg-prod-flow 3s linear infinite 2.5s' }} />
                    <line x1="130" y1="75" x2="60" y2="130" stroke="rgba(167,139,250,0.12)" strokeWidth="0.75" />
                    <line x1="240" y1="40" x2="190" y2="155" stroke="rgba(167,139,250,0.1)" strokeWidth="0.75" />
                    <line x1="360" y1="90" x2="315" y2="135" stroke="rgba(167,139,250,0.12)" strokeWidth="0.75" />
                    <line x1="130" y1="75" x2="315" y2="135" stroke="rgba(167,139,250,0.08)" strokeWidth="0.75" />
                    <line x1="35" y1="30" x2="360" y2="90" stroke="url(#agent-edge-grad)" strokeWidth="1" strokeDasharray="10 8" style={{ animation: 'fctg-prod-flow 4s linear infinite' }} />
                    <line x1="60" y1="130" x2="360" y2="90" stroke="url(#agent-edge-grad)" strokeWidth="1" strokeDasharray="10 8" style={{ animation: 'fctg-prod-flow 5s linear infinite 1.2s' }} />
                    <circle cx="35" cy="30" r="5" fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" filter="url(#node-glow)" />
                    <circle cx="130" cy="75" r="7" fill="rgba(167,139,250,0.5)" stroke="rgba(192,132,252,0.8)" strokeWidth="2" filter="url(#node-glow)" style={{ animation: 'vibe-node-pulse 3s ease-in-out 0s infinite' }} />
                    <circle cx="240" cy="40" r="5" fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" filter="url(#node-glow)" />
                    <circle cx="360" cy="90" r="7" fill="rgba(167,139,250,0.5)" stroke="rgba(192,132,252,0.8)" strokeWidth="2" filter="url(#node-glow)" style={{ animation: 'vibe-node-pulse 3s ease-in-out 1s infinite' }} />
                    <circle cx="60" cy="130" r="5" fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" filter="url(#node-glow)" />
                    <circle cx="190" cy="155" r="7" fill="rgba(167,139,250,0.5)" stroke="rgba(192,132,252,0.8)" strokeWidth="2" filter="url(#node-glow)" style={{ animation: 'vibe-node-pulse 3s ease-in-out 2s infinite' }} />
                    <circle cx="315" cy="135" r="5" fill="rgba(167,139,250,0.35)" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" filter="url(#node-glow)" />
                    <rect x="0" y="0" width="400" height="180" fill="url(#agent-fade-bottom)" />
                  </svg>
                </div>
                <div className="flex-[1] px-5 pt-4 pb-5 border-t border-violet-500/15 bg-black/30 flex flex-col gap-2.5 text-left">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-violet-500/40 bg-violet-950/60 shrink-0">
                      <TbRobot className="w-3 h-3 text-violet-400" />
                    </span>
                    <h3 className="text-sm md:text-base font-semibold text-violet-300">Agentic</h3>
                  </div>
                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed">Goal-oriented, autonomous execution. Give a high-level goal; the agent plans, tests, and iterates on multi-step workflows. Your role: supervisor or architect.</p>
                  <p className="text-[10px] md:text-xs text-violet-400/80 italic mt-1">&ldquo;Create a 3-step Moon booking flow: date picker, cabin selection, add-ons. Include copy and layout.&rdquo;</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 27: Agentic Designer Productivity — plan, execute, reflect */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center overflow-y-auto" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-8">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The Agentic Design Loop</h2>
              <p className="fctg-subtitle mt-1 mb-4 text-xs md:text-sm text-slate-400">The rhythm you inject into every stage.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto mb-5 md:mb-6">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-cyan-300 mb-1.5">Plan</h3>
                <p className="text-xs md:text-sm text-slate-300/95 leading-tight">You set direction and criteria. Agent gets the brief.</p>
                <p className="mt-1 text-[10px] text-slate-500 italic leading-tight">e.g. Research competitors → 3 concepts → prototype winner → usability summary.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-indigo-300 mb-1.5">Execute</h3>
                <p className="text-xs md:text-sm text-slate-300/95 leading-tight">Agent runs research, prototype, test, summary. You stay in review.</p>
                <p className="mt-1 text-[10px] text-slate-500 italic leading-tight">e.g. Agent runs that brief; you step in only when needed.</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-violet-300 mb-1.5">Reflect</h3>
                <p className="text-xs md:text-sm text-slate-300/95 leading-tight">You evaluate and approve. Agent takes repeatable tasks; you focus on judgment.</p>
                <p className="mt-1 text-[10px] text-slate-500 italic leading-tight">e.g. Review summary; decide what to iterate or ship.</p>
              </div>
            </div>
            <p className="mt-2 text-center text-[11px] text-cyan-300/90 max-w-2xl mx-auto"><span className="text-slate-400 font-medium">Productivity impact:</span> 2–4× faster cycles; ~30–50% time saved on execution.</p>
          </div>
        </Slide>
        )}

        {/* Slide 26: Context and continuity */}
        {slideIndex === 22 && (
        <Slide
          heroOnly
          transparent
          scrollable
          hero={
            <div key={slideIndex} className="fctg-text-transition min-h-screen w-full flex items-center justify-center px-4 py-4 pb-24 md:py-8 md:pb-28">
              <div className="w-full max-w-5xl">
                <div className="max-w-md mx-auto text-center">
                  <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Context and continuity</h2>
                  <p className="fctg-subtitle mt-1 text-sm md:text-base">Sessions break. Context doesn&apos;t have to.</p>
                </div>
                {/* Diagram: learnings.md bridges sessions — CSS-based, elegant flow */}
                <div className="mt-3 md:mt-8 w-full max-w-2xl mx-auto min-w-0 overflow-visible px-1" aria-hidden>
                  <style>{`
                    @keyframes fctg-context-shimmer {
                      0% { background-position: 200% 0; }
                      100% { background-position: -200% 0; }
                    }
                    .fctg-context-line {
                      height: 2px;
                      background: linear-gradient(90deg, transparent 0%, #22d3ee 20%, #818cf8 50%, #a78bfa 80%, transparent 100%);
                      background-size: 200% 100%;
                      animation: fctg-context-shimmer 8s ease-in-out infinite;
                    }
                  `}</style>
                  <div className="flex items-center justify-between gap-2 md:gap-4">
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-cyan-500/80 flex items-center justify-center bg-cyan-950/40">
                        <span className="text-[10px] md:text-xs font-medium text-cyan-200">Session</span>
                      </div>
                      <span className="mt-0.5 md:mt-1 text-[9px] md:text-[10px] text-slate-500">yesterday</span>
                    </div>
                    <div className="flex-1 min-w-0 fctg-context-line" />
                    <div className="flex flex-col items-center shrink-0 px-2 py-2 md:px-4 md:py-3 rounded-lg md:rounded-xl border border-cyan-500/50 bg-cyan-950/30">
                      <span className="font-mono text-xs md:text-sm font-semibold text-cyan-50">learnings.md</span>
                      <span className="text-[9px] md:text-[10px] text-slate-400">continuity</span>
                    </div>
                    <div className="flex-1 min-w-0 fctg-context-line" />
                    <div className="flex flex-col items-center shrink-0">
                      <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border-2 border-violet-500/80 flex items-center justify-center bg-violet-950/30">
                        <span className="text-[10px] md:text-xs font-medium text-violet-200">New</span>
                      </div>
                      <span className="mt-0.5 md:mt-1 text-[9px] md:text-[10px] text-slate-500">session</span>
                    </div>
                  </div>
                </div>
                <p className="mt-2 md:mt-6 text-center text-xs md:text-sm text-slate-400">Point at files · Paste snippets · Reference learnings</p>
                <div className="mt-2 md:mt-8 text-center">
                  <SlideQuote slideIndex={25} />
                </div>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 28: Intervention */}
        {slideIndex === 20 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-5 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>How you stay in control</h2>
              <p className="fctg-subtitle mt-1">Verify outputs, redirect when they drift, reframe when looping.</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                <span className="rounded-full border border-amber-500/40 bg-amber-950/30 px-3 py-1 text-xs font-medium text-amber-400">Verify</span>
                <span className="rounded-full border border-cyan-500/40 bg-cyan-950/30 px-3 py-1 text-xs font-medium text-cyan-400">Redirect</span>
                <span className="rounded-full border border-fuchsia-500/40 bg-fuchsia-950/30 px-3 py-1 text-xs font-medium text-fuchsia-400">Reframe</span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift', 'Tone', 'Pushback'].map((label) => (
                  <span key={label} className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-300/90">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 29: Then vs Now — UX design cycle (Empathize, Define, Ideate, Prototype, Test) */}
        {slideIndex === 21 && (
        <Slide transparent className="items-center justify-center overflow-y-auto">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-7xl px-4 py-4 md:py-6 mx-auto">
            <div className="text-center mb-4 md:mb-5">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Then vs Now</h2>
              <p className="fctg-subtitle mt-1 text-slate-400 text-sm">The UX design cycle — same phases, you lead, agent runs.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3">
              {[
                { phase: 'Empathize', phaseColor: 'text-cyan-400', borderColor: 'border-cyan-500/30', bgColor: 'bg-cyan-950/20', then: 'Manual interviews, synthesis; insights come late.', now: 'Agent synthesises research; you validate; agent surfaces patterns in minutes.', metric: 'Insights in minutes vs weeks.' },
                { phase: 'Define', phaseColor: 'text-teal-400', borderColor: 'border-teal-500/30', bgColor: 'bg-teal-950/20', then: 'Problem statements, specs for handoff; documents go stale.', now: 'Agent generates problem frames; you set direction. JTBD, PRDs in sync—you edit and approve.', metric: 'Specs in sync; ~50% less rework.' },
                { phase: 'Ideate', phaseColor: 'text-amber-400', borderColor: 'border-amber-500/30', bgColor: 'bg-amber-950/20', then: 'Brainstorms, sticky notes; concepts scattered; handoff to prototype.', now: 'Agent generates concepts; you curate. Multiple directions in minutes; you pick and refine.', metric: 'Concepts in minutes; 2–3× faster.' },
                { phase: 'Prototype', phaseColor: 'text-indigo-400', borderColor: 'border-indigo-500/30', bgColor: 'bg-indigo-950/20', then: 'Hours on wireframes; handoff, long cycles; design and dev misaligned.', now: 'Agent prototypes; design system on cue. Design QA automated; one artifact, no handoff.', metric: 'Prototypes in minutes; 2–3× faster.' },
                { phase: 'Test', phaseColor: 'text-violet-400', borderColor: 'border-violet-500/30', bgColor: 'bg-violet-950/20', then: 'Usability sessions, manual analysis; feedback loops slow.', now: 'Agent runs tests, surfaces insights; you review. Iterate faster; ship with confidence.', metric: '~30–50% faster to validate.' },
              ].map(({ phase, phaseColor, borderColor, bgColor, then, now, metric }) => (
                <div key={phase} className={`rounded-xl border ${borderColor} ${bgColor} p-3 md:p-4 flex flex-col gap-2 min-w-0`}>
                  <div className={`text-xs font-semibold uppercase tracking-wider ${phaseColor}`}>{phase}</div>
                  <div className="flex flex-col gap-1.5 text-xs md:text-sm text-slate-300/95">
                    <div>
                      <span className="text-slate-500 font-medium">Then </span>
                      <span className="text-slate-400">{then}</span>
                    </div>
                    <div>
                      <span className="text-cyan-400/90 font-medium">Now </span>
                      <span className="text-slate-300">{now}</span>
                    </div>
                  </div>
                  <div className={`mt-1 pt-1.5 border-t border-slate-700/50 text-[10px] ${phaseColor} opacity-90`}>{metric}</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-400 max-w-2xl mx-auto">Across phases: 2–4× faster cycle time; ~30–50% time saved on execution.</p>
          </div>
        </Slide>
        )}

        {/* Slide 30: Tech stack (merged with How this was built) — right after Then vs Now */}
        {slideIndex === 24 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Tech stack</h2>
              <p className="fctg-subtitle mt-1 md:whitespace-nowrap">The technology that powers this project.</p>
            </div>
            <div className="mt-4 md:mt-8 max-w-2xl mx-auto space-y-4 md:space-y-6 flex flex-col items-center">
              <div className="w-full flex flex-col items-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 mb-2 text-center">Front end</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: 'React', role: 'UI framework' },
                    { name: 'Vite', role: 'Build tool' },
                    { name: 'Tailwind', role: 'CSS framework' },
                    { name: 'Design system', role: 'Tokens, components, docs' },
                  ].map(({ name, role }) => (
                    <span key={name} className="inline-flex flex-col items-center gap-0.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-2 text-center">
                      <span className="text-xs font-medium text-cyan-200">{name}</span>
                      <span className="text-[10px] text-cyan-400/80">{role}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 mb-2 text-center">Back end</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: 'Supabase Auth', role: 'OTP + sessions' },
                    { name: 'Supabase Postgres', role: 'Database' },
                  ].map(({ name, role }) => (
                    <span key={name} className="inline-flex flex-col items-center gap-0.5 rounded-lg border border-violet-500/30 bg-violet-950/30 px-3 py-2 text-center">
                      <span className="text-xs font-medium text-violet-200">{name}</span>
                      <span className="text-[10px] text-violet-400/80">{role}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 31: Pipeline */}
        {slideIndex === 25 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Pipeline</h2>
              <p className="fctg-subtitle mt-1">How it ships.</p>
            </div>
            <div className="mt-4 md:mt-10 max-w-3xl mx-auto">
              <div className="flex flex-wrap items-center justify-center gap-2">
                {[
                  { name: 'Cursor', role: 'Code editor / AI', box: 'border-cyan-500/40 bg-cyan-950/40', nameCls: 'text-cyan-200', roleCls: 'text-cyan-400/90' },
                  { name: 'GitHub', role: 'Version control', box: 'border-violet-500/40 bg-violet-950/40', nameCls: 'text-violet-200', roleCls: 'text-violet-400/90' },
                  { name: 'Vercel', role: 'Deploy', box: 'border-emerald-500/40 bg-emerald-950/40', nameCls: 'text-emerald-200', roleCls: 'text-emerald-400/90' },
                  { name: 'Namecheap', role: 'Domain / hosting', box: 'border-amber-500/40 bg-amber-950/40', nameCls: 'text-amber-200', roleCls: 'text-amber-400/90' },
                ].map((item, i) => (
                  <span key={item.name} className="inline-flex items-center gap-1">
                    {i > 0 && <span className="text-slate-400 text-sm shrink-0" aria-hidden>→</span>}
                    <span className={`inline-flex flex-col items-center gap-0.5 rounded-lg border px-3 py-2 text-center ${item.box}`}>
                      <span className={`text-xs font-medium ${item.nameCls}`}>{item.name}</span>
                      <span className={`text-[10px] ${item.roleCls}`}>{item.role}</span>
                    </span>
                  </span>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-400 text-center">Commit → push → (CI) → deploy → live.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 32: Cursor — IDE */}
        {slideIndex === 26 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full flex flex-col items-center justify-center px-4 py-4 md:px-10 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <FCTGHeading variant="v2" as="h2" className="w-fit mx-auto">Cursor</FCTGHeading>
              <p className="fctg-subtitle mt-1 text-sm">AI-powered editor. When you prompt: ReAct — reasoning + acting.</p>
            </div>
            <div className="relative rounded-xl overflow-visible ring-1 ring-cyan-500/30 w-full max-w-lg">
              <img
                src="/images/AI talk/cursor-window.png"
                alt="Cursor IDE window showing code editor and AI chat panel"
                className="w-full h-auto object-contain rounded-xl"
              />
              <div className="absolute left-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                <div className="rounded-lg bg-violet-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm ring-1 ring-violet-400/50">Chat</div>
              </div>
              <div className="absolute left-[50%] top-[30%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                <div className="rounded-lg bg-teal-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm ring-1 ring-teal-400/50">Code editor</div>
              </div>
              <div className="absolute right-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                <div className="rounded-lg bg-amber-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm ring-1 ring-amber-400/50">File directory</div>
              </div>
              <div className="absolute left-[8%] bottom-[22%] flex items-center gap-2" aria-hidden>
                <div className="rounded-lg bg-indigo-500/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm ring-1 ring-indigo-400/50">Select agent</div>
              </div>
              <div className="absolute left-[50%] bottom-[8%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                <div className="rounded-lg bg-slate-600/90 px-2 py-1 text-[10px] font-semibold text-white shadow-sm">Terminal</div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 33: What happens when you prompt (ReAct) */}
        {slideIndex === 27 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full flex flex-col items-center justify-center px-4 pt-3 pb-20 md:px-8 md:pt-4 md:pb-24">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[1.75rem] md:!text-[2.25rem] inline-block mx-auto" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>When you prompt</h2>
              <p className="fctg-subtitle mt-1 text-xs">ReAct — reasoning + acting.</p>
            </div>
            <style>{`
              @keyframes fctg-react-step-in {
                0% { opacity: 0; transform: translateX(-6px); }
                100% { opacity: 1; transform: translateX(0); }
              }
              .fctg-react-step { opacity: 0; animation: fctg-react-step-in 0.4s ease-out forwards; }
            `}</style>
            <ol className="space-y-1 w-full max-w-xl">
              {[
                { label: 'Explore', desc: 'scan context', color: 'border-slate-500/40 bg-slate-800/40', delay: '0s' },
                { label: 'Thought', desc: 'plan', color: 'border-cyan-500/40 bg-cyan-950/30', delay: '0.08s' },
                { label: 'Response', desc: 'text streams', color: 'border-teal-500/40 bg-teal-950/30', delay: '0.16s' },
                { label: 'Tool calls', desc: 'read, write, search, run', color: 'border-violet-500/40 bg-violet-950/30', delay: '0.24s' },
                { label: 'Observation', desc: 'sees results', color: 'border-indigo-500/40 bg-indigo-950/30', delay: '0.32s' },
                { label: 'Revise & loop', desc: 'adjusts, loops', color: 'border-fuchsia-500/40 bg-fuchsia-950/30', delay: '0.4s' },
                { label: 'Done', desc: 'complete', color: 'border-emerald-500/40 bg-emerald-950/30', delay: '0.48s' },
              ].map((step, i) => (
                <li key={step.label} className="flex items-center gap-2">
                  <span className="fctg-react-step shrink-0 w-5 h-5 rounded-full bg-slate-600/60 border border-slate-500/50 flex items-center justify-center text-[10px] font-semibold text-slate-300" style={{ animationDelay: step.delay }}>{i + 1}</span>
                  <div className={`fctg-react-step flex-1 min-w-0 rounded-md border px-2.5 py-1.5 ${step.color}`} style={{ animationDelay: step.delay }}>
                    <span className="text-xs font-semibold text-slate-100 block">{step.label}</span>
                    <span className="text-[10px] text-slate-400">{step.desc}</span>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-[10px] text-slate-500 italic text-center">Simple prompts may skip the loop.</p>
          </div>
        </Slide>
        )}

        {/* GitHub */}
        {slideIndex === 28 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">GitHub</FCTGHeading>
              <p className="fctg-subtitle mt-1">Version control, collaboration, and the bridge between Cursor and deploy.</p>
              <p className="fctg-subtitle mt-1 text-xs text-slate-400">Push runs checks and triggers deploy.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center pt-12 lg:pt-16">
              {/* Railway diagram: main, branch, merge */}
              <div className="relative overflow-visible w-full max-w-xl" aria-hidden>
                <svg viewBox="0 0 400 160" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="fctg-github-rail" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#475569" />
                      <stop offset="50%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <linearGradient id="fctg-github-branch" gradientUnits="userSpaceOnUse" x1="0" y1="80" x2="400" y2="80">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#2dd4bf" />
                      <stop offset="100%" stopColor="#22d3ee" />
                    </linearGradient>
                  </defs>
                  {/* Main rail */}
                  <path d="M 0 80 L 400 80" stroke="#22d3ee" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Branch track — smooth plateau at top, gentle rejoin */}
                  <path d="M 110 80 C 160 80 200 48 230 48 C 250 48 265 80 290 80" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 6" fill="none" />
                  {/* Trains on main — hidden until animateMotion starts to avoid top-left flash */}
                  <g visibility="hidden">
                    <animate attributeName="visibility" from="hidden" to="visible" dur="0.001s" begin="0s" fill="freeze" />
                    <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#22d3ee" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" />
                    </rect>
                  </g>
                  <g visibility="hidden">
                    <animate attributeName="visibility" from="hidden" to="visible" dur="0.001s" begin="1.2s" fill="freeze" />
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#818cf8" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" begin="1.2s" />
                    </rect>
                  </g>
                  <g visibility="hidden">
                    <animate attributeName="visibility" from="hidden" to="visible" dur="0.001s" begin="2.4s" fill="freeze" />
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#a78bfa" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" begin="2.4s" />
                    </rect>
                  </g>
                  {/* Train on branch */}
                  <g visibility="hidden">
                    <animate attributeName="visibility" from="hidden" to="visible" dur="0.001s" begin="0.8s" fill="freeze" />
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#2dd4bf" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M 110 80 C 160 80 200 48 230 48 C 250 48 265 80 290 80" rotate="auto" begin="0.8s" />
                    </rect>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Vercel */}
        {slideIndex === 29 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">Vercel</FCTGHeading>
              <p className="fctg-subtitle mt-1">Deploy from Git. Preview branches. Edge functions. The final step in the pipeline.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-8 flex flex-col items-center justify-center w-full max-w-md">
                <img src="/images/vercel-logo.svg" alt="" className="h-20 w-20 brightness-0 invert opacity-90" aria-hidden />
                <div className="mt-6 flex flex-col gap-3 w-full">
                  <div className="flex items-center gap-3 rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-4 py-3">
                    <span className="shrink-0 rounded-md bg-teal-500/80 px-2 py-1 text-xs font-semibold text-white">main</span>
                    <span className="text-cyan-400 text-sm">→</span>
                    <span className="text-sm text-cyan-200">Production deploy</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-4 py-3">
                    <span className="shrink-0 rounded-md bg-slate-600/80 px-2 py-1 text-xs font-semibold text-cyan-200">branch</span>
                    <span className="text-cyan-400 text-sm">→</span>
                    <span className="text-sm text-cyan-200">Preview URL</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-cyan-400/80 text-center">Push to main → automatic deploy. Every branch gets a preview.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Design systems */}
        {slideIndex === 30 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto px-4 text-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design systems</h2>
            <p className="fctg-subtitle mt-1">Give the agent a single source of truth. Outputs stay on-brand.</p>
            <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3" aria-hidden>
              <span className="rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-3 py-1.5 text-xs font-medium text-cyan-200">Agent / project</span>
              <span className="text-slate-500 text-sm">→</span>
              <span className="rounded-lg border border-violet-500/40 bg-violet-950/30 px-2.5 py-1.5 text-center">
                <span className="text-xs font-medium text-violet-200 block">Design system</span>
                <span className="text-[10px] text-violet-400/90">tokens · components · docs</span>
              </span>
              <span className="text-slate-500 text-sm">→</span>
              <span className="rounded-lg border border-teal-500/40 bg-teal-950/30 px-3 py-1.5 text-xs font-medium text-teal-200">On-brand output</span>
            </div>
          </div>
        </Slide>
        )}

        {/* Design system + agent — productivity focus */}
        {slideIndex === 31 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Productivity in this area</h2>
              <p className="fctg-subtitle mt-1">What to measure when design system + agent work together.</p>
              <p className="mt-1.5 text-xs text-slate-500">Measure: revision count, handoff rounds, time to production-ready.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5 mb-5 md:mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: 'Fewer revision cycles', desc: 'Less back-and-forth to get on-brand UI' },
                  { label: 'Fewer design–dev handoff rounds', desc: '"Use our Button" once, not every sprint' },
                  { label: 'Faster to production-ready UI', desc: 'Agent applies tokens and components' },
                  { label: 'More time on research, flows, craft', desc: 'You focus where judgment matters' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex flex-col gap-0.5 rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-3 py-2.5 text-center">
                    <span className="text-sm font-semibold text-cyan-200">{label}</span>
                    <span className="text-xs text-cyan-300/80">{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">How: point the agent at</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-3">
              {[
                { title: 'Tokens & components', text: 'Spacing, color, type. Agent references when generating.' },
                { title: 'Specs in docs', text: 'Figma, Markdown, Storybook. Agent reads and applies.' },
                { title: 'Or use a library', text: 'Chakra, Radix, Mantine, Polaris. Agent uses primitives.' },
              ].map(({ title, text }) => (
                <div key={title} className="fctg-card fctg-card-compact fctg-tips-card py-1.5 px-2 md:py-2 md:px-2.5 text-center">
                  <h3 className="fctg-card-title font-semibold">{title}</h3>
                  <p className="fctg-card-text mt-0.5">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-500">Works best when the design system is documented and in code.</p>
          </div>
        </Slide>
        )}

        {/* In the wild — example/payoff after Design system in practice */}
        {slideIndex === 32 && (
        <Slide transparent wide className="items-center justify-center overflow-y-auto">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>In the wild</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">Connect your design system to Cursor — brief to two live, on-brand variants, no dev handoff.</p>
              <p className="mt-2 text-[11px] text-slate-500">Example payoff: concept to two shareable previews in one flow.</p>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-3 items-stretch">
              {[
                { step: '01', label: 'Design system', desc: 'Tokens + components connected to Cursor. Agent references brand and components directly.', gain: 'On-brand automatically' },
                { step: '02', label: 'You set direction', desc: 'Give the agent a brief — what to test, what the variants should explore.', gain: 'You own direction' },
                { step: '03', label: 'Agent generates variants', desc: 'Two on-brand UI versions — your tokens applied, components used correctly.', gain: 'Two options in minutes' },
                { step: '04', label: 'Deploy each variant', desc: 'Branch A -> Preview URL A · Branch B -> Preview URL B. Live, instantly.', gain: 'Live URLs, not mockups' },
                { step: '05', label: 'A/B test, ready to share', desc: 'Send two links. Stakeholders click, not squint at Figma. You pick the winner.', gain: 'No dev handoff' },
              ].map(({ step, label, desc, gain }) => (
                <div key={step} className="rounded-xl border border-slate-600/40 bg-slate-800/40 p-3 md:p-4 flex flex-col gap-1.5">
                  <span className="text-[10px] font-mono font-semibold text-slate-300 opacity-60">{step}</span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-300 leading-tight">{label}</h3>
                  <p className="text-[10px] md:text-xs text-slate-400 leading-snug flex-1">{desc}</p>
                  <div className="pt-2 border-t border-slate-700/50">
                    <span className="text-[10px] font-semibold text-slate-400">{gain}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 md:mt-5 flex flex-wrap justify-center gap-2">
              {['No token drift', 'No dev handoff', 'Two live URLs in minutes', "Designer in the driver's seat"].map((tag) => (
                <span key={tag} className="rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-[10px] md:text-xs font-medium text-cyan-300">{tag}</span>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Testing */}
        {slideIndex === 33 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Testing</h2>
              <p className="fctg-subtitle mt-1">Fast feedback. Real browsers. Ship with confidence.</p>
            </div>
            <div className="mt-4 md:mt-10 max-w-2xl mx-auto space-y-4 md:space-y-6">
              <div className="flex flex-wrap gap-3 justify-center">
                {[
                  { name: 'Vitest', role: 'Unit tests' },
                  { name: 'React Testing Library', role: 'Component testing' },
                  { name: 'Playwright', role: 'End-to-end tests' },
                ].map(({ name, role }) => (
                  <span key={name} className="inline-flex flex-col items-start gap-0.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-2">
                    <span className="text-xs font-medium text-cyan-200">{name}</span>
                    <span className="text-[10px] text-cyan-400/80">{role}</span>
                  </span>
                ))}
              </div>
              <p className="text-xs text-cyan-400/80 text-center">CI on push (GitHub Actions).</p>
              <div className="grid gap-2 md:gap-3 sm:grid-cols-2">
                <div className="fctg-card fctg-card-compact fctg-vibe-directive-card">
                  <h5 className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-violet-400 mb-1">Vibe</h5>
                  <p className="fctg-card-text mt-0">Single-shot, iterative. &quot;Add a unit test for this function.&quot; You review inline, tweak, repeat.</p>
                </div>
                <div className="fctg-card fctg-card-compact fctg-vibe-directive-card">
                  <h5 className="text-[10px] md:text-[11px] font-semibold uppercase tracking-wider text-teal-400 mb-1">Directive</h5>
                  <p className="fctg-card-text mt-0">Multi-step, autonomous. &quot;Add test coverage for the checkout flow — unit tests and an E2E with Playwright.&quot;</p>
                </div>
              </div>
              <p className="text-xs text-cyan-400/80 text-center">This deck: 75 tests — unit, integration, E2E. Agent adds tests; you set coverage. Coverage finds gaps; tests protect what works.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Helpful tips — after Intervention */}
        {slideIndex === 23 && (
        <Slide transparent className="items-center justify-center overflow-hidden py-4 md:py-6">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 min-w-0">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Helpful tips</h2>
              <p className="fctg-subtitle mt-1 text-xs">Small practices that add up.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-2">
              {[
                { title: 'Single model only?', text: 'Vibe code (full files, copy-paste, run commands) or run plan/execute/reflect yourself—you direct, paste, evaluate.' },
                { title: 'Split view', text: 'Code + chat visible. Live reload.' },
                { title: 'Specs in MD', text: 'Notes, test plans. Agent reads them.' },
                { title: 'Watch & debug', text: 'Terminal, DevTools. Learn the pattern.' },
                { title: 'Pace yourself', text: 'Queue prompts, break into steps.' },
                { title: 'NPM', text: 'Scripts, deps. Agent runs install, build, test.' },
                { title: 'File directory', text: 'File structure. Agent reads layout.' },
                { title: 'Inspect & console', text: 'Your friends.' },
                { title: 'Queuing prompts', text: 'Sequenced. Pace it.' },
                { title: 'Watch productivity', text: 'If it slows you down, step back.' },
                { title: 'Patience', text: 'It often will fix and get it right.' },
              ].map(({ title, text }) => (
                <div key={title} className="fctg-card fctg-card-compact fctg-tips-card py-1.5 px-2 md:py-2 md:px-2.5">
                  <h3 className="fctg-card-title text-[10px] md:text-[11px] font-semibold">{title}</h3>
                  <p className="fctg-card-text mt-0.5 text-[9px] md:text-[10px] leading-snug">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Level up to agentic */}
        {slideIndex === 34 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-7xl px-4 md:px-6 py-4 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Level up to agentic</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4 max-w-7xl mx-auto">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4 text-center">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1.5">Problem</h4>
                <p className="text-[11px] md:text-xs text-cyan-200/90">How might we create a Moon trip booking flow that&apos;s easy and enjoyable for customers to use?</p>
              </div>
              <div className="rounded-xl border border-violet-500/25 bg-violet-950/20 p-3 md:p-4 text-center">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-violet-400 mb-1.5">Setup</h4>
                <p className="text-[11px] md:text-xs text-cyan-200/90">Work in pairs. <a href="https://miro.com/app/board/uXjVG-nWxPQ=/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Miro</a> for collaboration; <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Claude Code</a> for the agent.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3 md:p-4 text-center">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1.5">Process</h4>
                <p className="text-[11px] md:text-xs text-cyan-200/90">Start with vibe (aim to iterate 2–3 times), then level up to agentic. Write clear prompts. Redirect the agent when it drifts.</p>
              </div>
              <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-3 md:p-4 text-center">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1.5">Outputs</h4>
                <p className="text-[11px] md:text-xs text-cyan-200/90">Reusable prompts, agent responses, and generated UI/copy</p>
              </div>
              <div className="rounded-xl border border-teal-500/25 bg-teal-950/20 p-3 md:p-4 text-center">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-teal-400 mb-1.5">Outcomes</h4>
                <p className="text-[11px] md:text-xs text-cyan-200/90">Improved prompting skills, comfort with quick iteration, ability to delegate to the agent with confidence</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Rounds */}
        {slideIndex === 35 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Rounds</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">Round 1 · ~15 min · Warm-up</span>
                <h4 className="mt-2 text-sm font-semibold text-cyan-100">Start with vibe</h4>
                <p className="mt-2 text-xs text-cyan-200/80">Explore flows and tone. Try: &quot;How would you approach designing a booking flow for a Moon trip?&quot; Chat, iterate, go wild.</p>
                <p className="mt-2 text-[11px] text-cyan-400/70">Quick iterations. Exploratory.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Round 2 · ~25 min · Main focus</span>
                <h4 className="mt-2 text-sm font-semibold text-cyan-100">Level up to agentic</h4>
                <p className="mt-2 text-xs text-cyan-200/80">Give the agent a clear mission. Try: &quot;Create a 3-step Moon booking flow: date picker, cabin selection (economy, business, first), add-ons and terms. Include copy and layout.&quot;</p>
                <p className="mt-2 text-[11px] text-cyan-400/70">Agentic: multi-step, delegated. Goal-driven.</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">Round 3 · ~15 min</span>
                <h4 className="mt-2 text-sm font-semibold text-cyan-100">Show & tell</h4>
                <p className="mt-2 text-xs text-cyan-200/80">Share the clearest Moon booking outputs. Vote on which flow we'd ship. Quick poll, then wrap.</p>
                <p className="mt-2 text-xs text-cyan-300/90 italic">Debrief: How could this apply to our Earth bookings?</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 43: Three pillars — Invigoration, innovation, impact */}
      {slideIndex === 36 && (
        <Slide transparent className="!p-0">
          <div key={slideIndex} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
            <div className="fctg-text-transition w-full max-w-4xl">
              <h2 className="fctg-heading !text-[1.75rem] md:!text-[2.25rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Invigoration, innovation, impact</h2>
              <p className="fctg-subtitle mt-2 text-slate-400">In travel design terms</p>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
                <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 flex flex-col items-center">
                  <h3 className="text-base font-semibold text-cyan-300 mb-2">Re-energising creativity</h3>
                  <p className="text-sm text-slate-300">Beat creative block in &lt;60 seconds. Reclaim 4–6 hours/week for flows and usability.</p>
                </div>
                <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 flex flex-col items-center">
                  <h3 className="text-base font-semibold text-violet-300 mb-2">New tools &amp; processes</h3>
                  <p className="text-sm text-slate-300">Style-consistent UI, auto-responsive layouts, and design-system–friendly components; user flows and itinerary visuals at scale.</p>
                </div>
                <div className="rounded-xl border border-fuchsia-500/30 bg-fuchsia-950/20 p-4 flex flex-col items-center">
                  <h3 className="text-base font-semibold text-fuchsia-300 mb-2">Measurable outcomes</h3>
                  <p className="text-sm text-slate-300">2–3× faster from concept to shipped UI; higher A/B test winners; direct lifts in booking conversion from better UX.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

      {/* What we hope you take away */}
      {slideIndex === 37 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What we hope you take away</h2>
              <p className="fctg-subtitle mt-1">Outcomes</p>
            </div>
            <div className="rounded-xl border border-slate-500/25 bg-slate-900/40 px-5 py-5 md:px-6 md:py-6 shadow-lg shadow-slate-950/50 text-center">
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400/80 mb-2">Agentic</p>
              <p className="text-sm text-slate-300 mb-2">Better prompting, quick iteration, confident delegation.</p>
              <ul className="text-slate-300 text-xs md:text-sm space-y-1.5 list-none pl-0 mb-4">
                <li>Stay in the driver&apos;s seat — steer when it drifts.</li>
                <li>Choose the right mode: vibe vs directive.</li>
                <li>Treat agents as outcome-drivers; clear prompts.</li>
              </ul>
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-violet-400/90 mb-2">Broader (AI / design)</p>
              <ul className="text-slate-300 text-xs md:text-sm space-y-1.5 list-none pl-0 mb-4">
                <li>Push further than eng and dev teams.</li>
                <li>Point at your design system.</li>
                <li>Small, high-performing teams will generate more and better ideas with AI in the loop.</li>
                <li>Reduce the noise — focus on judgment and creativity.</li>
              </ul>
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-teal-400/90 mb-2">Philosophical</p>
              <p className="text-sm text-slate-300 mb-0">Craft and what lasts; keep questioning the fundamentals.</p>
            </div>
          </div>
        </Slide>
        )}

      {/* Opportunity */}
      {slideIndex === 38 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <div className="flex justify-center w-full">
                <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>An opportunity of a lifetime</h2>
              </div>
              <p className="fctg-subtitle text-base md:text-xl leading-relaxed mt-2 md:mt-4">
            Designers who work with AI will have an edge.<br />
            Embrace the tools, question the outputs, keep the human at the centre.<br />
            <span className="text-cyan-200/90">Small, high-performing teams generating and refining ideas with AI will lead the way.</span>
          </p>
            <div className="mt-4 md:mt-10 w-full max-w-2xl mx-auto flex flex-nowrap justify-center gap-2 md:gap-3 overflow-x-auto">
            {['AI is in its infancy', 'Massive value', 'Maximise creativity', 'Move fast', 'Pause and reflect'].map((tag) => (
              <span key={tag} className="fctg-tag whitespace-nowrap shrink-0">
                {tag}
              </span>
            ))}
            </div>
            <div className="mt-4 md:mt-10 text-center">
              <SlideQuote slideIndex={39} />
            </div>
            </div>
          </div>
        </Slide>
        )}

      {/* Thank you */}
      {slideIndex === 39 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition flex flex-col items-center justify-center text-center px-8 min-h-[60vh]">
            <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Thank you</h2>
            <p className="fctg-subtitle mt-4 text-slate-300">Questions?</p>
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
          className="rounded-full p-1.5 text-cyan-400 transition hover:bg-cyan-500/20 focus:outline-none disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous slide"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="min-w-12 text-center text-xs font-mono tracking-wide text-cyan-300">
          {slideIndex + 1} / {SLIDE_COUNT}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={slideIndex === SLIDE_COUNT - 1}
          className="rounded-full p-1.5 text-cyan-400 transition hover:bg-cyan-500/20 focus:outline-none disabled:opacity-30 disabled:hover:bg-transparent"
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
