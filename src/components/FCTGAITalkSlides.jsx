import { useState, useEffect, useCallback, useRef } from 'react'
import WaterAscii from './WaterAscii'
import WeavingLoom from './WeavingLoom'
import WiderEnvironmentCanvas from './WiderEnvironmentCanvas'
import EmpowermentHealthDrawing from './EmpowermentHealthDrawing'
import ParticleBackground from './ParticleBackground'
import OrbitalTrailsBackground from './OrbitalTrailsBackground'
import BatteryParticleFill from './BatteryParticleFill'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser, FiTarget, FiRefreshCw, FiCornerUpRight, FiShield, FiFileText, FiActivity, FiSearch, FiMic, FiMessageSquare, FiClipboard, FiGrid } from 'react-icons/fi'
import { TbBrain, TbRobot } from 'react-icons/tb'
import FCTGHeading from './design-system/fctg/FCTGHeading'
import FCTGAIFlowDiagram, { FCTGAIFlowCaption } from './FCTGAIFlowDiagram'
import FCTGMultiAgentDiagram, { FCTGMultiAgentCaption } from './FCTGMultiAgentDiagram'
import FCTGBodyAnalogyDiagram from './FCTGBodyAnalogyDiagram'

const SLIDE_COUNT = 51

/* Slide quotes — Rick Rubin from The Way of Code; Henry Dreyfuss for Looking back */
const FCTG_SLIDE_QUOTES = {
  7: { quote: 'Free from desire, you see essence unformed. Caught in desire, you see only the manifestations.', attribution: '— Rick Rubin, The Way of Code' },
  11: { quote: 'Things arise and he accepts them. Things vanish and he lets them go.', attribution: '— Rick Rubin, The Way of Code' },
  50: { quote: 'Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns.', attribution: '— Rick Rubin, The Way of Code' },
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
                          x={x1}
                          y={y1}
                          textAnchor="start"
                          dominantBaseline="middle"
                          fontSize="10"
                          fill={color}
                          fontFamily="system-ui,sans-serif"
                          fontWeight="600"
                          letterSpacing="0.15"
                        >
                          {label}
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
      {/* Slide 3: Concepts intro */}
      {slideIndex === 2 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
          <div className="absolute inset-0 fctg-pattern-contour opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 4: Looking back — monumental hero with particles */}
      {slideIndex === 3 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-40" aria-hidden />
        </div>
      )}
      {/* Slide 5: The fundamentals of design hold strong — animated blob background */}
      {slideIndex === 4 && (
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
      {slideIndex === 5 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 8: Wider environment — monumental hero with particles */}
      {slideIndex === 6 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" centerOffsetY={80} />
          <div className="absolute inset-0 fctg-pattern-dot-matrix opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 9: Energy */}
      {slideIndex === 7 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}

      {/* Slide 9: Monumental moments intro */}
      {slideIndex === 8 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-30" aria-hidden />
        </div>
      )}

      {/* Slide 10: Strength */}
      {slideIndex === 9 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
        </div>
      )}
      {/* Slide 11: Speed */}
      {slideIndex === 10 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="speed" />
        </div>
      )}
      {/* Slide 12: Iteration */}
      {slideIndex === 11 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 13: Imagination */}
      {slideIndex === 12 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="imagination" />
        </div>
      )}
      {/* Slide 14: Calmness */}
      {slideIndex === 13 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 15: Mystical Code */}
      {slideIndex === 14 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
        </div>
      )}
      {/* Slide 16: Empowerment */}
      {slideIndex === 15 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="empowerment" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 21: Vibe coding — philosophy */}
      {slideIndex === 21 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 22: Exploration vs execution — pure black */}
      {slideIndex === 22 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 23: Combined vibe and prompting — pure black */}
      {slideIndex === 23 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 24: Vibe prompts vs agentic briefs — pure black */}
      {slideIndex === 24 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 25: Agentic brief */}
      {slideIndex === 25 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 27: Context and continuity */}
      {slideIndex === 27 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 28: How you stay in control */}
      {slideIndex === 28 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 29: Wipeout analogy */}
      {slideIndex === 29 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 16: Mechanisms intro */}
      {slideIndex === 16 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
          <div className="absolute inset-0 fctg-pattern-circuit opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 17: AI models */}
      {slideIndex === 17 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 18: AI Agents — pure black to match image */}
      {slideIndex === 18 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 26: Why this changes the work */}
      {slideIndex === 26 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 30: Design practice intro */}
      {slideIndex === 30 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 32: Research to synthesis */}
      {slideIndex === 32 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 31: Execution compresses */}
      {slideIndex === 31 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 19: Multi-agent systems — pure black */}
      {slideIndex === 19 && (
        <div className="pointer-events-none fixed inset-0 bg-black" aria-hidden />
      )}
      {/* Slide 20: Model, agent, agentic workflow */}
      {slideIndex === 20 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
          <div className="absolute inset-0 fctg-pattern-circuit opacity-20" aria-hidden />
        </div>
      )}
      {/* Slide 33: Agentic prototyping */}
      {slideIndex === 33 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 34: Why API-backed prototypes matter */}
      {slideIndex === 34 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 35: Testing and validation */}
      {slideIndex === 35 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 36: From Figma file to stronger handoff */}
      {slideIndex === 36 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 37: What changes for teams */}
      {slideIndex === 37 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 38: Technology intro */}
      {slideIndex === 38 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 39: What makes a workflow AI-ready */}
      {slideIndex === 39 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 40: Context into brief */}
      {slideIndex === 40 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 41: What good output looks like */}
      {slideIndex === 41 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 42: Design systems */}
      {slideIndex === 42 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 43: Testing */}
      {slideIndex === 43 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 44: Helpful tips */}
      {slideIndex === 44 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 45: Activity & close intro */}
      {slideIndex === 45 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 46: Level up (activity) */}
      {slideIndex === 46 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 47: Close intro */}
      {slideIndex === 47 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 50: Thank you */}
      {slideIndex === 50 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide content */}
      <div className="relative z-20 h-full overflow-x-hidden overflow-y-hidden">
        {/* Chapter label — same position at very top for all chapter slides */}
        {slideIndex >= 4 && slideIndex <= 7 && <ChapterLabel>Concepts</ChapterLabel>}
        {slideIndex >= 10 && slideIndex <= 15 && <ChapterLabel>Monumental moments</ChapterLabel>}
        {slideIndex >= 17 && slideIndex <= 20 && <ChapterLabel>Mechanisms</ChapterLabel>}
        {slideIndex >= 22 && slideIndex <= 29 && <ChapterLabel>From vibe to agentic</ChapterLabel>}
        {slideIndex >= 31 && slideIndex <= 37 && <ChapterLabel>Design practice</ChapterLabel>}
        {slideIndex >= 39 && slideIndex <= 44 && <ChapterLabel>AI-ready systems</ChapterLabel>}
        {slideIndex === 46 && <ChapterLabel>Activity</ChapterLabel>}
        {slideIndex >= 48 && slideIndex <= 50 && <ChapterLabel>Close</ChapterLabel>}
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
              <p className="fctg-subtitle mt-1 text-slate-300 text-base md:text-lg">From concepts to agentic design practice, technology, and live practice.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 3: Concepts intro */}
        {slideIndex === 2 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/concepts-hero.png"
              alt="Concepts chapter hero showing abstract models, branching reasoning, and foundational AI ideas"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 1</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Concepts</h2>
                <p className="fctg-subtitle mt-2">Foundational ideas for AI and design.</p>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 4: Looking back — full-page weaving */}
        {slideIndex === 3 && (
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
        {slideIndex === 4 && (
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
              <SlideQuote slideIndex={7} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 7: Design process — discover, define, develop, deliver */}
        {slideIndex === 5 && (
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
        {slideIndex === 6 && (
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
      {slideIndex === 7 && (
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

      {/* Slide 9: Monumental moments intro */}
      {slideIndex === 8 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/monumental-moments-hero.png"
              alt="Monumental moments chapter hero showing sculptural abstract forms for strength, speed, imagination, and transformation"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(129,140,248,0.16) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 2</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Monumental moments</h2>
                <p className="fctg-subtitle mt-2">The moments that make the shift feel real.</p>
              </div>
            </div>
          </div>
        } />
      )}

      {/* Slide 10: Strength */}
      {slideIndex === 9 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: content */}
            <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Strength</h2>
              <p className="fctg-subtitle mt-1">Aim: understand the beam&apos;s likely failure modes before designing further.</p>
              <div className="mt-6 flex flex-col gap-4 min-w-0 overflow-visible" aria-hidden>
                <style>{`
                  @keyframes fctg-strength-prompt-type { from { width: 0; } to { width: 44ch; } }
                  @keyframes fctg-strength-agent-type { from { width: 0; } to { width: 85ch; } }
                  @keyframes fctg-strength-agent-type-mobile { from { width: 0; } to { width: 100%; } }
                  @keyframes fctg-strength-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-strength-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-prompt-type 1.5s steps(44) 0s forwards; }
                  .fctg-strength-agent-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-agent-type 2.5s steps(85) 2s forwards; }
                  .fctg-strength-prompt-type::after, .fctg-strength-agent-type::after { content: '|'; animation: fctg-strength-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
                  @media (max-width: 767px) {
                    .fctg-strength-agent-type { white-space: normal; animation: fctg-strength-agent-type-mobile 2.5s steps(75) 2s forwards; }
                  }
                `}</style>
                <div className="fctg-strength-piece text-sm text-cyan-300" style={{ animationDelay: '0s' }}>
                  <span className="fctg-strength-prompt-type">Help me understand how this beam could fail.</span>
                </div>
                <div className="fctg-strength-piece text-sm text-violet-300" style={{ animationDelay: '2s' }}>
                  <span className="fctg-strength-agent-type">Bending, shear, buckling — AI helped me assess the risks faster.</span>
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
      {slideIndex === 10 && (
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
              <p className="fctg-subtitle mt-1">From 30+ minutes to first output in seconds.</p>
              <p className="mt-2 text-xs text-slate-400">A usable first pass still takes judgment.</p>
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
                  <span className="fctg-speed-agent-type">Email, password, remember me, submit — form rendered.</span>
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
            <SlideQuote slideIndex={10} />
          </div>
        </Slide>
        )}

      {/* Slide 12: Iteration */}
      {slideIndex === 11 && (
        <Slide heroOnly transparent hero={
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <ParticleBackground variant="iteration" />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="relative z-10 max-w-2xl px-8 text-center">
                <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block drop-shadow-[0_0_30px_rgba(0,0,0,0.8)]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Iteration</h2>
                <p className="fctg-subtitle mt-1 text-lg drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] whitespace-nowrap overflow-x-auto">Trust the process. Steer the direction. Embrace ambiguity.</p>
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
                <SlideQuote slideIndex={11} />
              </div>
            </div>
          </div>
        } />
        )}

      {/* Slide 13: Imagination */}
      {slideIndex === 12 && (
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
      {slideIndex === 13 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Calmness</h2>
              <p className="fctg-subtitle mt-1">Less friction, more space to think.</p>
            </div>
            <div className="w-full max-w-5xl mt-10 text-center">
              <SlideQuote slideIndex={15} />
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 15: Mystical Code */}
      {slideIndex === 14 && (
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
              <p className="fctg-subtitle mt-1">More understanding of the technical side, and how UI and development interact through the process.</p>
            </div>
          </div>
          <div className="w-full max-w-5xl mt-10 text-center">
            <SlideQuote slideIndex={14} />
          </div>
        </Slide>
        )}

      {/* Slide 16: Empowerment */}
      {slideIndex === 15 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Build things that add value to your life.</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-cyan-400">
                <span className="text-cyan-300/70">Examples:</span>
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


        {/* Slide 21: Vibe coding */}
        {slideIndex === 21 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen flex flex-col items-center justify-between pt-14 md:pt-16 pb-16 md:pb-20 overflow-hidden">
            <img
              src="/vibe-coding-conductor.png"
              alt="Conductor directing an AI orchestra"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 70% 50% at 30% 40%, rgba(34,211,238,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 45% at 70% 30%, rgba(167,139,250,0.14) 0%, transparent 65%)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/5" />
            <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
              <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 5</div>
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>From vibe to agentic</h2>
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

        {/* Slide 16: Mechanisms intro */}
        {slideIndex === 16 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/mechanisms-hero.png"
              alt="Mechanisms chapter hero showing prompts flowing through models, agent loops, and orchestration systems"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 4</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Mechanisms</h2>
                <p className="fctg-subtitle mt-2">How models, agents, and orchestration turn prompts into action.</p>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 17: AI models */}
        {slideIndex === 17 && (
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
            <p className="mt-2 text-xs font-medium text-cyan-300/80 text-center">Use when you need an answer.</p>
          </div>
        </Slide>
        )}

        {/* Slide 18: AI Agents — same aesthetic as Multi-agent, body analogy (human) diagram */}
        {slideIndex === 18 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>AI Agents</h2>
              <p className="fctg-subtitle mt-1">Drive outcomes, not just outputs.</p>
            </div>
            <FCTGBodyAnalogyDiagram />
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80 text-center">Operational loop: model -&gt; memory/tools -&gt; result -&gt; model</p>
            <p className="mt-3 text-xs text-slate-500 text-center max-w-xl mx-auto">Tools enable action, but the model&apos;s reasoning decides which tool, context, or memory to use.</p>
            <p className="text-xs font-medium text-violet-300/80 text-center max-w-xl mx-auto">Use when you need a task done.</p>
          </div>
        </Slide>
        )}

        {/* Slide 19: Multi-agent systems */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-4 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Multi-agent systems</h2>
              <p className="fctg-subtitle mt-1">Specialized agents, orchestrated toward one outcome</p>
            </div>
            <FCTGMultiAgentDiagram compact />
            <p className="mt-3 text-xs text-slate-500 text-center max-w-xl mx-auto">Like an orchestra, each agent has a distinct role, but the value comes from coordination toward a shared outcome.</p>
            <p className="text-xs font-medium text-emerald-300/80 text-center max-w-xl mx-auto">Use when work spans multiple steps.</p>
            <p className="text-xs text-cyan-300/80 text-center max-w-xl mx-auto">Once you understand the mechanism, the next step is learning how to direct it.</p>
          </div>
        </Slide>
        )}

        {/* Slide 20: Model, agent, agentic workflow */}
        {slideIndex === 20 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Model, agent, agentic workflow</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">The shift is from response, to task, to coordinated progress.</p>
            </div>
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5">
                <div className="text-[9px] font-semibold uppercase tracking-[0.16em] text-cyan-300/80 text-center">Stage 1</div>
                <div className="mt-1 text-sm font-semibold text-cyan-200 text-center">Model</div>
                <div className="mt-4 flex items-center justify-center gap-1 text-[8px] md:text-[9px] uppercase tracking-[0.08em] text-cyan-300/80">
                  <span className="whitespace-nowrap rounded-md border border-cyan-500/30 bg-black/20 px-1.5 py-0.75">Prompt</span>
                  <span aria-hidden>→</span>
                  <span className="whitespace-nowrap rounded-md border border-cyan-500/30 bg-black/20 px-1.5 py-0.75">Answer</span>
                </div>
                <div className="mt-4 text-[11px] text-slate-300 text-center">Generates a response.</div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-2xl" aria-hidden>→</div>

              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 md:p-5">
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
                <div className="mt-4 text-[11px] text-slate-300 text-center">Works toward a task.</div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-2xl" aria-hidden>→</div>

              <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 md:p-5">
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
                <div className="mt-3 text-[11px] text-slate-300 text-center">Coordinates progress across a process.</div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 22: Exploration vs execution */}
        {slideIndex === 22 && (
        <Slide transparent className="items-center justify-center overflow-hidden" style={{ background: '#000' }} wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto px-4 py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading text-[2.25rem]! md:text-[2.75rem]! inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Exploration vs execution</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">Vibe opens possibilities. Agentic moves toward outcomes.</p>
            </div>
            <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-cyan-500/30 bg-cyan-950/20 p-4 text-center">
                <div className="text-sm font-semibold text-cyan-200">Vibe</div>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <p>Open-ended prompts, fast iteration, conversational direction.</p>
                  <p>Best when you are still discovering the problem, direction, or shape of the work.</p>
                </div>
              </div>
              <div className="rounded-2xl border border-violet-500/30 bg-violet-950/20 p-4 text-center">
                <div className="text-sm font-semibold text-violet-200">Agentic</div>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <p>Clear goals, constraints, and expected deliverables.</p>
                  <p>Best when you know what needs to get done and want the work to move forward.</p>
                </div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Mental model</div>
              <div className="mt-1 text-sm text-slate-100">They are not opposites. Vibe helps you find the direction. Agentic helps you make progress in it.</div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 23: How the interaction changes */}
        {slideIndex === 23 && (
        <Slide transparent className="items-center justify-center overflow-hidden" style={{ background: '#000' }} wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto flex flex-col items-center gap-5 text-center px-4 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Switching from vibe to agentic</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl mx-auto">Move from exploration to delegation once the work can be directed.</p>
            </div>
            <div className="grid w-full max-w-4xl gap-4 md:grid-cols-3">
              {[
                {
                  title: 'You can name the outcome',
                  text: 'You know what should be produced, changed, or decided.',
                  cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200',
                },
                {
                  title: 'You can state the constraints',
                  text: 'You can explain what should stay fixed, what context matters, and where the boundaries are.',
                  cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200',
                },
                {
                  title: 'You can explain what good looks like',
                  text: 'You have success checks that make the result reviewable.',
                  cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200',
                },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-2xl border p-4 text-left ${cls}`}>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-snug text-slate-200">{text}</p>
                </div>
              ))}
            </div>
            <div className="w-full max-w-3xl rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Decision rule</div>
              <div className="mt-1 text-sm text-slate-100">If you are still exploring, stay in vibe. If you can brief it, go agentic.</div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 24: Vibe prompts vs agentic briefs */}
        {slideIndex === 24 && (
        <Slide transparent className="items-center justify-center overflow-y-auto" style={{ background: '#000' }} wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Vibe vs agentic briefs</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">The difference is how clearly the work is directed.</p>
            </div>
            <div className="w-full rounded-2xl border border-slate-700/50 bg-slate-950/30 px-4 py-4 md:px-5 md:py-5">
              <div className="hidden md:grid md:grid-cols-[72px_minmax(0,0.7fr)_minmax(0,1.3fr)] gap-4 pb-3 text-left">
                <div />
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">Vibe</div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-violet-300">Agentic brief</div>
              </div>
              <div className="w-full divide-y divide-slate-800/80">
                {[
                  {
                    label: 'UI',
                    vibe: 'Explore directions for a booking flow.',
                    outcome: '3-step booking flow',
                    constraints: 'premium tone, mobile compare',
                    deliverable: 'wireframe + copy',
                    success: 'quick, confident choice',
                  },
                  {
                    label: 'Copy',
                    vibe: 'How could this feel more premium?',
                    outcome: 'headline, helper, CTA',
                    constraints: 'confident, clear, not cliche',
                    deliverable: '3 options',
                    success: 'fits voice, supports decisions',
                  },
                ].map(({ label, vibe, outcome, constraints, deliverable, success }) => (
                  <div key={label} className="grid gap-3 py-3 text-left md:grid-cols-[72px_minmax(0,0.7fr)_minmax(0,1.3fr)] md:gap-4 md:items-start">
                    <div className="flex items-center md:justify-center">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</span>
                    </div>
                    <div className="min-w-0">
                      <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-cyan-400">Vibe</span>
                      <p className="mt-1 md:mt-0 text-[11px] leading-snug text-slate-100 md:text-[12px]">{vibe}</p>
                    </div>
                    <div className="min-w-0">
                      <span className="md:hidden text-[10px] font-semibold uppercase tracking-wider text-violet-400">Agentic brief</span>
                      <div className="mt-1 md:mt-0 grid gap-1.5 text-[11px] md:grid-cols-2 md:text-[12px]">
                        {[
                          ['Outcome', outcome],
                          ['Constraints', constraints],
                          ['Deliverable', deliverable],
                          ['Success', success],
                        ].map(([part, value]) => (
                          <div key={part} className="rounded-xl border border-violet-500/20 bg-violet-950/15 px-3 py-2">
                            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-300">{part}</span>
                            <p className="mt-1 leading-snug text-slate-100">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-3 text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Bottom line</div>
                <div className="mt-1 text-sm text-slate-100">Vibe helps you explore. Agentic helps you delegate.</div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 25: What goes into an agent brief */}
        {slideIndex === 25 && (
        <Slide transparent className="items-center justify-center overflow-y-auto" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-8">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The agent brief</h2>
              <p className="fctg-subtitle mt-1 mb-4 text-xs md:text-sm text-slate-400">Good delegation starts with clear direction.</p>
            </div>
            <div className="mx-auto grid w-full max-w-5xl gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-start">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                {[
                  { title: 'Outcome', text: 'What should be accomplished?', Icon: FiTarget, cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                  { title: 'Context', text: 'What files, examples, or background matter?', Icon: FiFileText, cls: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200' },
                  { title: 'Constraints', text: 'What should stay fixed? Scope, tools, rules.', Icon: FiShield, cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                  { title: 'Deliverable', text: 'What should come back? Copy, code, wireframes, notes.', Icon: FiClipboard, cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                  { title: 'Success checks', text: 'How will you know it is good enough to review?', Icon: FiGrid, cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200 sm:col-span-2 lg:col-span-2' },
                ].map(({ title, text, Icon, cls }) => (
                  <div key={title} className={`rounded-2xl border p-4 text-left shadow-[0_0_24px_rgba(15,23,42,0.18)] ${cls}`}>
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/25 bg-black/15">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <div>
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="mt-1 text-xs leading-snug text-slate-300">{text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[28px] border border-slate-700/50 bg-slate-950/40 p-4 shadow-[0_0_36px_rgba(15,23,42,0.22)]">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Example brief</div>
                    <h3 className="mt-1 text-sm font-semibold text-slate-100">Turn a vague ask into a delegatable one</h3>
                  </div>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-950/20 px-2.5 py-1 text-[10px] font-medium text-cyan-200">Agent-ready</span>
                </div>
                <div className="mt-4 space-y-3">
                  {[
                    ['Outcome', 'Design a 3-step booking flow for dates, cabin, and add-ons.'],
                    ['Context', 'Reuse the existing travel card patterns and keep the current premium tone.'],
                    ['Constraints', 'Do not change other pages. Keep it mobile-first and easy to compare options.'],
                    ['Deliverable', 'Return a wireframe direction plus headline, helper copy, and CTA text.'],
                    ['Success checks', 'A user can move through the flow clearly and understand the tradeoffs fast.'],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-slate-700/50 bg-slate-900/35 px-3 py-2.5 text-left">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">{label}</div>
                      <p className="mt-1 text-[11px] leading-snug text-slate-200">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-center">
              <div className="rounded-full border border-slate-600/30 bg-slate-900/35 px-4 py-2 text-[11px] text-slate-300 shadow-[0_0_24px_rgba(15,23,42,0.2)]">
                A good brief does not specify every step. It gives enough direction to work well and enough guardrails to review well.
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 27: Context and continuity */}
        {slideIndex === 27 && (
        <Slide
          heroOnly
          transparent
          scrollable
          hero={
            <div key={slideIndex} className="fctg-text-transition min-h-screen w-full flex items-center justify-center px-4 py-4 pb-24 md:py-8 md:pb-28">
              <div className="w-full max-w-5xl">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                  <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Context carries forward</h2>
                  <p className="fctg-subtitle mt-1 text-sm md:text-base whitespace-nowrap">Sessions end. Shared context keeps progress continuous.</p>
                </div>
                {/* Diagram: shared context bridges sessions — CSS-based, elegant flow */}
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
                        <span className="text-[10px] md:text-xs font-medium text-cyan-200">Previous</span>
                      </div>
                      <span className="mt-0.5 md:mt-1 text-[9px] md:text-[10px] text-slate-500">session</span>
                    </div>
                    <div className="flex-1 min-w-0 fctg-context-line" />
                    <div className="flex flex-col items-center shrink-0">
                      <div className="flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-2xl border border-cyan-500/50 bg-cyan-950/30 shadow-[0_0_24px_rgba(34,211,238,0.08)]">
                        <FiFileText className="h-6 w-6 md:h-7 md:w-7 text-cyan-300" aria-hidden />
                      </div>
                      <span className="mt-1.5 text-[10px] md:text-xs font-semibold uppercase tracking-[0.18em] text-cyan-50">Shared context</span>
                      <span className="mt-1 text-[9px] md:text-[10px] text-slate-400">notes, decisions, patterns</span>
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
                <div className="mt-2 md:mt-8 text-center">
                  <div className="mx-auto max-w-2xl rounded-xl border border-slate-500/25 bg-slate-900/35 px-4 py-3 text-center">
                    <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Why it matters</div>
                    <div className="mt-1 text-xs md:text-sm text-slate-200">Agentic work improves when context is externalized, not held in your head or trapped in one session.</div>
                  </div>
                </div>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 28: How you stay in control */}
        {slideIndex === 28 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto flex flex-col items-center gap-5 px-6 py-4">
            <div className="flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Staying in control</h2>
              <p className="fctg-subtitle mt-1">Set the guardrails. Review the output.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2.5">
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
              <div className="flex flex-wrap justify-center gap-2 mt-8 md:mt-10">
                {[
                  { label: 'Hallucinate', cls: 'border-fuchsia-500/30 bg-fuchsia-500/5 text-fuchsia-300/90' },
                  { label: 'Overcomplicate', cls: 'border-violet-500/30 bg-violet-500/5 text-violet-300/90' },
                  { label: 'Loop', cls: 'border-indigo-500/30 bg-indigo-500/5 text-indigo-300/90' },
                  { label: 'Overwrite', cls: 'border-rose-500/30 bg-rose-500/5 text-rose-300/90' },
                  { label: 'Shortcut', cls: 'border-amber-500/30 bg-amber-500/5 text-amber-300/90' },
                  { label: 'Fixate', cls: 'border-cyan-500/30 bg-cyan-500/5 text-cyan-300/90' },
                  { label: 'Ignore', cls: 'border-slate-400/30 bg-slate-400/5 text-slate-300/90' },
                  { label: 'Drift', cls: 'border-teal-500/30 bg-teal-500/5 text-teal-300/90' },
                  { label: 'Tone', cls: 'border-pink-500/30 bg-pink-500/5 text-pink-300/90' },
                  { label: 'Pushback', cls: 'border-orange-500/30 bg-orange-500/5 text-orange-300/90' },
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

        {/* Slide 32: Research to synthesis */}
        {slideIndex === 32 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Research to synthesis</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">From messy research inputs to clear themes, opportunities, and next moves.</p>
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
                    <div className="mt-2 text-[10px] text-slate-300">You review the logic, rename the themes, and decide what matters.</div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiGrid, title: 'Themes', text: 'Clear buckets to discuss', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                      { icon: FiTarget, title: 'Opportunities', text: 'What to test next', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                      { icon: FiFileText, title: 'Design direction', text: 'JTBD, insights, next-step brief', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
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

        {/* Slide 29: A Wipeout 2097 mental model */}
        {slideIndex === 29 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-5 md:px-8 md:py-8">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.2rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Wipeout 2097 mental model</h2>
              <p className="fctg-subtitle mt-1 max-w-3xl">The process is the track. You still steer. Agentic AI is the speed boost.</p>
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
                    0%, 8%, 100% { transform: scale(1); filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.32)); }
                    10%, 13%, 19%, 22%, 28%, 31%, 39%, 42%, 50%, 53%, 61%, 64%, 72%, 75%, 84%, 87% {
                      transform: scale(1.08);
                      filter: drop-shadow(0 0 16px rgba(96, 165, 250, 0.7));
                    }
                  }
                  @keyframes fctg-wipeout-trail {
                    0%, 8%, 100% { opacity: 0.24; transform: scaleX(0.95); }
                    10%, 13%, 19%, 22%, 28%, 31%, 39%, 42%, 50%, 53%, 61%, 64%, 72%, 75%, 84%, 87% {
                      opacity: 0.9;
                      transform: scaleX(1.45);
                    }
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
                  </defs>

                  <rect x="1" y="1" width="758" height="458" rx="28" fill="rgba(2,6,23,0.9)" stroke="rgba(148,163,184,0.08)" />
                  <ellipse cx="374" cy="212" rx="286" ry="152" fill="rgba(34,211,238,0.08)" />
                  <ellipse cx="470" cy="252" rx="220" ry="120" fill="rgba(129,140,248,0.08)" />

                  <g strokeLinecap="round">
                    <path className="fctg-wipeout-streak" d="M615 78 L720 48" stroke="rgba(148,163,184,0.25)" strokeWidth="1.5" />
                    <path className="fctg-wipeout-streak" d="M632 112 L742 83" stroke="rgba(34,211,238,0.35)" strokeWidth="2" style={{ animationDelay: '-1.4s' }} />
                    <path className="fctg-wipeout-streak" d="M42 370 L180 330" stroke="rgba(129,140,248,0.24)" strokeWidth="1.5" style={{ animationDelay: '-2.1s' }} />
                    <path className="fctg-wipeout-streak" d="M520 410 L692 360" stroke="rgba(232,121,249,0.2)" strokeWidth="1.5" style={{ animationDelay: '-0.8s' }} />
                  </g>

                  <use href="#wipeout-track-outline" fill="url(#wipeout-track-fill)" opacity="0.98" />
                  <use href="#wipeout-track-outline" stroke="url(#wipeout-track-glow)" strokeWidth="13" opacity="0.18" filter="url(#wipeout-track-shadow)" />
                  <use href="#wipeout-track-outline" stroke="url(#wipeout-track-glow)" strokeWidth="4.5" />
                  <use href="#wipeout-track-outline" className="fctg-wipeout-outline-energy" stroke="url(#wipeout-track-glow)" strokeWidth="5.5" opacity="0.52" strokeLinecap="round" />

                  <g opacity="0.95">
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="340" cy="104" rx="18" ry="9" stroke="#22d3ee" strokeWidth="2" style={{ animationDelay: '-0.72s' }} />
                      <rect className="fctg-wipeout-boost" x="306" y="98" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-0.72s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="416" cy="113" rx="18" ry="9" stroke="#22d3ee" strokeWidth="2" style={{ animationDelay: '-1.5s' }} />
                      <rect className="fctg-wipeout-boost" x="382" y="107" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-1.5s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="491" cy="126" rx="18" ry="9" stroke="#2dd4bf" strokeWidth="2" style={{ animationDelay: '-2.25s' }} />
                      <rect className="fctg-wipeout-boost" x="457" y="120" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-2.25s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="548" cy="158" rx="18" ry="9" stroke="#2dd4bf" strokeWidth="2" style={{ animationDelay: '-3.1s' }} />
                      <rect className="fctg-wipeout-boost" x="514" y="152" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-3.1s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="569" cy="224" rx="18" ry="9" stroke="#818cf8" strokeWidth="2" style={{ animationDelay: '-4.02s' }} />
                      <rect className="fctg-wipeout-boost" x="535" y="218" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-4.02s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="533" cy="298" rx="18" ry="9" stroke="#a78bfa" strokeWidth="2" style={{ animationDelay: '-4.86s' }} />
                      <rect className="fctg-wipeout-boost" x="499" y="292" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-4.86s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="459" cy="342" rx="18" ry="9" stroke="#a78bfa" strokeWidth="2" style={{ animationDelay: '-5.76s' }} />
                      <rect className="fctg-wipeout-boost" x="425" y="336" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-5.76s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="361" cy="349" rx="18" ry="9" stroke="#e879f9" strokeWidth="2" style={{ animationDelay: '-6.52s' }} />
                      <rect className="fctg-wipeout-boost" x="327" y="343" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-6.52s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="273" cy="318" rx="18" ry="9" stroke="#e879f9" strokeWidth="2" style={{ animationDelay: '-7.24s' }} />
                      <rect className="fctg-wipeout-boost" x="239" y="312" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-7.24s' }} />
                    </g>
                    <g>
                      <ellipse className="fctg-wipeout-ring" cx="214" cy="252" rx="18" ry="9" stroke="#22d3ee" strokeWidth="2" style={{ animationDelay: '-7.92s' }} />
                      <rect className="fctg-wipeout-boost" x="180" y="246" width="68" height="12" rx="6" fill="url(#wipeout-boost-grad)" style={{ animationDelay: '-7.92s' }} />
                    </g>
                  </g>

                  <g opacity="0.55">
                    <circle cx="208" cy="162" r="4.5" fill="#22d3ee" />
                    <circle cx="586" cy="198" r="4.5" fill="#818cf8" />
                    <circle cx="312" cy="346" r="4.5" fill="#e879f9" />
                    <path d="M208 162 L182 138" stroke="rgba(34,211,238,0.38)" strokeWidth="1.5" />
                    <path d="M586 198 L626 194" stroke="rgba(129,140,248,0.38)" strokeWidth="1.5" />
                    <path d="M312 346 L300 382" stroke="rgba(232,121,249,0.3)" strokeWidth="1.5" />
                  </g>

                  <g opacity="0.45">
                    <ellipse cx="0" cy="0" rx="20" ry="7" fill="rgba(15,23,42,0.6)">
                      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M228 153 C275 118 347 115 416 136 C478 155 546 163 577 205 C604 242 581 289 532 319 C480 351 390 357 306 338 C231 321 166 278 167 227 C168 196 186 175 228 153 Z" />
                    </ellipse>
                  </g>

                  <g filter="url(#wipeout-ship-glow)">
                    <g>
                      <animateMotion dur="8s" repeatCount="indefinite" rotate="auto" path="M228 153 C275 118 347 115 416 136 C478 155 546 163 577 205 C604 242 581 289 532 319 C480 351 390 357 306 338 C231 321 166 278 167 227 C168 196 186 175 228 153 Z" />
                      <g className="fctg-wipeout-ship-core">
                        <path className="fctg-wipeout-ship-trail" d="M-16 0 C-34 -7 -52 -7 -78 0 C-52 7 -34 7 -16 0 Z" fill="url(#wipeout-boost-grad)" opacity="0.72" />
                        <path className="fctg-wipeout-ship-trail" d="M-6 0 C-18 -4 -34 -4 -52 0 C-34 4 -18 4 -6 0 Z" fill="rgba(255,255,255,0.85)" opacity="0.72" />
                        <ellipse cx="-18" cy="0" rx="18" ry="9" fill="url(#wipeout-engine-glow)" opacity="0.92" />
                        <path d="M-18 -9 L8 -6 L18 0 L8 6 L-18 9 L-6 0 Z" fill="url(#wipeout-ship-grad)" />
                        <path d="M-6 -6 L10 0 L-6 6 L0 0 Z" fill="rgba(15,23,42,0.96)" opacity="0.7" />
                        <circle cx="-2" cy="0" r="3.2" fill="rgba(15,23,42,0.94)" />
                        <ellipse cx="-24" cy="0" rx="7" ry="4.5" fill="#22d3ee" />
                      </g>
                    </g>
                  </g>

                  <text x="38" y="48" fill="rgba(148,163,184,0.72)" style={{ fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Process track</text>
                  <text x="38" y="66" fill="rgba(148,163,184,0.54)" style={{ fontSize: 11 }}>You still steer. AI just adds velocity where the boosts are.</text>
                </svg>
              </div>
              <div className="grid gap-3">
                <div className="rounded-2xl border border-cyan-500/25 bg-cyan-950/15 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Steering stays human</div>
                  <div className="mt-2 text-sm text-slate-200">You choose the route, judge the turns, and decide when to brake, boost, or change direction.</div>
                </div>
                <div className="rounded-2xl border border-violet-500/25 bg-violet-950/15 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Agentic AI adds speed</div>
                  <div className="mt-2 text-sm text-slate-200">It accelerates execution inside the process you define. It does not replace the process itself.</div>
                </div>
                <div className="rounded-2xl border border-slate-500/25 bg-slate-900/40 p-4">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Takeaway</div>
                  <div className="mt-2 text-sm text-slate-100">The track is still yours. Agentic workflows help you move faster on it.</div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 26: Why this changes the work */}
        {slideIndex === 26 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-6 md:px-8 md:py-8">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Why the work changes</h2>
              <p className="fctg-subtitle mt-1 max-w-2xl">The shift is not just better prompting. It changes what designers spend time doing.</p>
            </div>
            <div className="mx-auto grid w-full max-w-3xl gap-3 md:grid-cols-2">
              {[
                { title: 'Less asking for isolated outputs', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'More defining outcomes', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'More shaping context and constraints', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                { title: 'More reviewing, steering, and judging', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-xl border p-4 md:p-5 text-center ${cls}`}>
                  <div className="text-sm font-semibold">{title}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">What this means next</div>
              <div className="mt-1 text-xs text-slate-200">As execution gets easier, direction becomes more valuable.</div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 30: Design practice intro */}
        {slideIndex === 30 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/design-practice-hero.png"
              alt="Design practice chapter hero showing research, synthesis, prototyping, and validation artifacts"
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
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 6</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design practice</h2>
                <p className="fctg-subtitle mt-2">Research, synthesis, prototyping, and validation in the age of agentic AI.</p>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 31: Execution compresses */}
        {slideIndex === 31 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:px-6 md:py-6 mx-auto">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Execution compresses</h2>
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

        {/* Slide 34: Why API-backed prototypes matter */}
        {slideIndex === 34 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>API-backed prototypes</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-3xl">Dummy Sabre or Amadeus data makes prototypes behave more like the real system.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { icon: FiGlobe, title: 'Real data shape', text: 'Availability, fares, seat maps, baggage, and rule changes expose the states static mockups skip.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { icon: FiActivity, title: 'Better decisions', text: 'You can test loading, empty, error, compare, and fee-recalculation moments, not just polished screens.', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
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
              <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,0.7fr)] lg:items-center">
                <div className="rounded-xl border border-amber-500/25 bg-amber-950/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-amber-300/80">Travel example</div>
                  <div className="mt-1 text-xs text-slate-200">A booking-flow prototype becomes more credible when date changes, fare differences, and inventory constraints behave like a live travel system, even with dummy data.</div>
                </div>
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
          </div>
        </Slide>
        )}

        {/* Slide 36: From Figma file to stronger handoff */}
        {slideIndex === 36 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>From Figma to handoff</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-3xl">A flow, some context, and a clear ask can become implementation-ready guidance.</p>
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
                    <div className="mt-2 text-[10px] text-slate-300">You still review the output, but the first pass becomes clearer, faster, and easier to refine.</div>
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

        {/* Slide 35: Testing and validation */}
        {slideIndex === 35 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Testing and validation</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">UX validation: from test plan to findings, recommendations, and next steps.</p>
            </div>
            <div className="mx-auto max-w-6xl">
              <div className="rounded-xl border border-violet-500/25 bg-slate-950/35 p-3 md:p-4">
                <div className="grid gap-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.05fr)_auto_minmax(0,1fr)] lg:items-center">
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiGlobe, title: 'Prototype', text: 'Flow or live experience to review', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                      { icon: FiTarget, title: 'Goal', text: 'Tasks, success criteria, hypotheses', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                      { icon: FiUser, title: 'Users', text: 'Who to test with and what to watch', cls: 'border-indigo-500/30 bg-indigo-950/20 text-indigo-200' },
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
                        <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Agentic validation</div>
                        <div className="text-[11px] font-semibold text-violet-100">Generates plan, script, synthesis, next actions</div>
                      </div>
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-violet-400/30 bg-black/20 text-violet-200">
                        <FiZap className="h-3.5 w-3.5" aria-hidden />
                      </span>
                    </div>
                    <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
                      {[
                        'Drafts a discussion guide',
                        'Summarises notes and patterns',
                        'Suggests next experiments',
                      ].map((item) => (
                        <div key={item} className="rounded-md border border-violet-400/15 bg-violet-500/5 px-2 py-1.5 text-[10px] text-slate-300">
                          {item}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[10px] text-slate-300">You run the session, judge the findings, and decide what changes are worth making.</div>
                  </div>
                  <div className="hidden lg:flex items-center justify-center text-cyan-300/70 text-sm" aria-hidden>→</div>
                  <div className="grid gap-1.5">
                    {[
                      { icon: FiSearch, title: 'Findings', text: 'What worked, where users struggled', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                      { icon: FiActivity, title: 'Recommendations', text: 'Prioritised fixes and improvements', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                      { icon: FiRefreshCw, title: 'Next step', text: 'What to retest or explore next', cls: 'border-fuchsia-500/30 bg-fuchsia-950/20 text-fuchsia-200' },
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
                    Validate faster. Learn sooner. Iterate with better evidence.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 37: What changes for teams */}
        {slideIndex === 37 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What changes for teams</h2>
              <p className="fctg-subtitle mt-1">Faster cycles. Clearer handoff. More room for judgment.</p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {[
                { title: 'Faster cycles', text: 'Move from idea to testable output sooner.', tone: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Clearer handoff', text: 'Context carries forward with less loss.', tone: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'More time for judgment', text: 'Agents expand options; people decide what matters.', tone: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
              ].map(({ title, text, tone }) => (
                <div key={title} className={`rounded-xl border p-4 text-center ${tone}`}>
                  <div className="text-sm font-semibold">{title}</div>
                  <div className="mt-1 text-xs text-slate-300">{text}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-3 text-center">
              <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Works best when</div>
              <div className="mt-1 text-xs text-slate-300">Teams give clear context, work from strong systems, and keep human review on direction and decisions.</div>
            </div>
          </div>
        </Slide>
        )}



        {/* Slide 38: AI-ready systems intro */}
        {slideIndex === 38 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/tech-chapter-hero.png"
              alt="Technology chapter hero showing connected tools, systems, and delivery infrastructure"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/28" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(6,182,212,0.18) 0%, transparent 70%), linear-gradient(180deg, rgba(2,6,23,0.24) 0%, rgba(2,6,23,0.42) 48%, rgba(2,6,23,0.82) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 7</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>AI-ready systems</h2>
                <p className="fctg-subtitle mt-2">The systems, context, and feedback that make AI useful in real work.</p>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 39: AI exposes workflow quality */}
        {slideIndex === 39 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.1rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>AI does not fix a messy workflow</h2>
              <p className="fctg-subtitle mt-1">It makes the gaps easier to see.</p>
            </div>
            <div className="mx-auto mt-6 max-w-5xl">
              <div className="relative overflow-hidden px-2 py-3 md:px-4 md:py-4">
                <div className="relative z-10 flex justify-center">
                  <div className="w-full max-w-4xl p-2 md:p-4">
                    <svg viewBox="0 0 760 240" className="h-auto w-full" preserveAspectRatio="xMidYMid meet" aria-label="Bridge with three gaps in the workflow">
                      <defs>
                        <linearGradient id="fctg-bridge-deck" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="rgba(226,232,240,0.92)" />
                          <stop offset="100%" stopColor="rgba(203,213,225,0.92)" />
                        </linearGradient>
                      </defs>

                      <rect x="96" y="78" width="12" height="68" rx="3" fill="rgba(100,116,139,0.85)" />
                      <rect x="652" y="78" width="12" height="68" rx="3" fill="rgba(100,116,139,0.85)" />

                      <rect x="44" y="70" width="160" height="18" rx="9" fill="url(#fctg-bridge-deck)" />
                      <rect x="248" y="70" width="112" height="18" rx="9" fill="url(#fctg-bridge-deck)" />
                      <rect x="400" y="70" width="112" height="18" rx="9" fill="url(#fctg-bridge-deck)" />
                      <rect x="556" y="70" width="160" height="18" rx="9" fill="url(#fctg-bridge-deck)" />

                      <line x1="204" y1="70" x2="248" y2="88" stroke="rgba(34,211,238,0.95)" strokeWidth="3" />
                      <line x1="204" y1="88" x2="248" y2="70" stroke="rgba(34,211,238,0.95)" strokeWidth="3" />

                      <line x1="360" y1="79" x2="400" y2="79" stroke="rgba(167,139,250,0.98)" strokeWidth="4" strokeDasharray="5 7" />

                      <line x1="512" y1="70" x2="556" y2="88" stroke="rgba(251,191,36,0.95)" strokeWidth="3" />
                      <line x1="512" y1="88" x2="556" y2="70" stroke="rgba(251,191,36,0.95)" strokeWidth="3" />

                      <line x1="226" y1="102" x2="226" y2="132" stroke="rgba(34,211,238,0.42)" strokeWidth="2" />
                      <line x1="380" y1="102" x2="380" y2="132" stroke="rgba(167,139,250,0.42)" strokeWidth="2" />
                      <line x1="534" y1="102" x2="534" y2="132" stroke="rgba(251,191,36,0.42)" strokeWidth="2" />

                      <text x="226" y="160" textAnchor="middle" fill="rgba(165,243,252,0.98)" fontSize="14" fontWeight="700" letterSpacing="0.8">Source of truth</text>
                      <text x="380" y="160" textAnchor="middle" fill="rgba(221,214,254,0.98)" fontSize="14" fontWeight="700" letterSpacing="0.8">Goal clarity</text>
                      <text x="534" y="160" textAnchor="middle" fill="rgba(253,230,138,0.98)" fontSize="14" fontWeight="700" letterSpacing="0.8">Review speed</text>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 40: From inputs to usable brief */}
        {slideIndex === 40 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="fctg-heading !text-[1.75rem] md:!text-[2.35rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Turn scattered inputs into one clear brief</h2>
              <p className="fctg-subtitle mt-1">Select the context that changes the answer.</p>
            </div>
            <div className="mt-5 grid gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
              <div className="relative lg:pr-18">
                <div className="space-y-1.5">
                  {[
                    { title: 'Figma', text: 'Flows, states, components', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                    { title: 'Research', text: 'Themes, needs, pain points', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                    { title: 'Product', text: 'Rules, edge cases, priorities', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                    { title: 'Live product', text: 'Current screens, bugs, analytics', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
                  ].map(({ title, text, cls }) => (
                    <div key={title} className={`rounded-xl border p-2.5 ${cls}`}>
                      <div className="text-[11px] font-semibold uppercase tracking-[0.18em]">{title}</div>
                      <div className="mt-1 text-xs text-slate-300">{text}</div>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 lg:flex" aria-hidden>
                  <svg viewBox="0 0 72 280" className="h-64 w-[72px] overflow-visible">
                    <defs>
                      <marker id="fctg-brief-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                        <path d="M0 0 L6 3 L0 6 Z" fill="#67e8f9" />
                      </marker>
                    </defs>
                    <path d="M 6 32 H 30 M 6 96 H 30 M 6 160 H 30 M 6 224 H 30" stroke="#67e8f9" strokeOpacity="0.55" strokeWidth="2" fill="none" />
                    <path d="M 30 32 V 224" stroke="#67e8f9" strokeOpacity="0.4" strokeWidth="2" fill="none" />
                    <path d="M 30 128 H 66" stroke="#67e8f9" strokeOpacity="0.8" strokeWidth="2.5" fill="none" markerEnd="url(#fctg-brief-arrow)" />
                  </svg>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-500/25 bg-slate-900/45 p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Shape it into an agent brief</div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {[
                    { title: 'Outcome', text: 'What should change.', cls: 'border-cyan-500/20 bg-black/20 text-cyan-100' },
                    { title: 'Context', text: 'Only what matters.', cls: 'border-violet-500/20 bg-black/20 text-violet-100' },
                    { title: 'Constraints', text: 'What stays fixed.', cls: 'border-teal-500/20 bg-black/20 text-teal-100' },
                    { title: 'Deliverable', text: 'What should come back.', cls: 'border-amber-500/20 bg-black/20 text-amber-100' },
                    { title: 'Success checks', text: 'How you will review it.', cls: 'border-fuchsia-500/20 bg-black/20 text-fuchsia-100 sm:col-span-2' },
                  ].map(({ title, text, cls }) => (
                    <div key={title} className={`rounded-xl border px-3 py-2.5 ${cls}`}>
                      <div className="text-sm font-semibold">{title}</div>
                      <div className="mt-1 text-xs text-slate-300">{text}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border border-cyan-500/20 bg-black/20 p-3 text-left">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/80">Example</div>
                  <p className="mt-2 text-[13px] leading-relaxed text-slate-200">Improve the booking amendment flow using current screens, fee rules, and support pain points. Return missing states and risks to validate.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 41: What good output looks like */}
        {slideIndex === 41 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:py-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="fctg-heading !text-[2.05rem] md:!text-[2.65rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What good output looks like</h2>
              <p className="fctg-subtitle mt-1">Good output is clear, reviewable, and easy to act on.</p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { title: 'Clearer flows', text: 'A structure you can review and react to.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Missing states', text: 'Errors, loading, edge cases, and support moments are called out.', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                { title: 'Guidance', text: 'Rules, criteria, and open questions are drafted.', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                { title: 'Next steps', text: 'What to test, check, or sign off is explicit.', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-xl border p-4 ${cls}`}>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">The point is not finished work. It is a stronger next step.</p>
          </div>
        </Slide>
        )}


        {/* Slide 42: Design systems as shared context */}
        {slideIndex === 42 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl mx-auto px-4 text-center">
            <h2 className="fctg-heading !text-[2.05rem] md:!text-[2.55rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design systems as shared context</h2>
            <p className="fctg-subtitle mt-1">A design system is one of the clearest forms of inspectable context for AI.</p>
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
            <p className="mt-4 text-xs text-slate-400 max-w-2xl mx-auto">
              This can be a formal design system or just well-documented tokens, components, patterns, and examples the agent can inspect.
            </p>
          </div>
        </Slide>
        )}

        {/* Slide 33: Agentic prototyping */}
        {slideIndex === 33 && (
        <Slide transparent wide className="items-center justify-center overflow-y-auto">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[72rem] px-4 py-4 md:py-6">
            <div className="flex flex-col items-center text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Agentic prototyping</h2>
              <p className="fctg-subtitle mt-1 text-slate-300 text-sm md:text-base max-w-2xl">Ground the agent in your design system, then generate two live variants.</p>
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
                          { icon: FiLayers, title: 'Design system', text: 'Brand + components in context', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
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
                  <div className="mt-2">
                    <div className="rounded-lg border border-violet-400/20 bg-black/15 px-2.5 py-2">
                      <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300/80">Payoff</div>
                      <div className="mt-1 text-[10px] text-slate-200">Plan once. Execute in parallel. Reflect on live variants.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 43: Testing as fast feedback */}
        {slideIndex === 43 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="fctg-heading !text-[1.8rem] md:!text-[2.35rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Testing as fast feedback</h2>
              <p className="fctg-subtitle mt-1 whitespace-nowrap">Testing gives AI-assisted changes a real feedback loop before release.</p>
            </div>
            <div className="mt-5 md:mt-8 max-w-3xl mx-auto space-y-4 md:space-y-5">
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { title: 'Protect what works', text: 'Catch regressions as AI helps make changes.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                  { title: 'Test real behaviour', text: 'Check browser flows, not just ideal paths on paper.', cls: 'border-violet-500/30 bg-violet-950/20 text-violet-200' },
                  { title: 'Ship with confidence', text: 'Review, test, and release with fewer surprises.', cls: 'border-emerald-500/30 bg-emerald-950/20 text-emerald-200' },
                ].map(({ title, text, cls }) => (
                  <div key={title} className={`rounded-xl border p-4 text-center ${cls}`}>
                    <div className="text-sm font-semibold">{title}</div>
                    <div className="mt-1 text-xs text-slate-300">{text}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-400 text-center">Use this level when changes touch real user journeys or shipping risk. AI can help write tests, but humans still decide coverage and release confidence.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 44: When to use more structure */}
        {slideIndex === 44 && (
        <Slide transparent className="items-center justify-center overflow-hidden py-4 md:py-6">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 min-w-0">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>When to use more structure</h2>
              <p className="fctg-subtitle mt-1 text-xs">Use the heavier setup when the work is harder to recover from.</p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-3 md:grid-cols-3">
              {[
                { title: 'Complex flows', text: 'Multiple states, rules, branches, or edge cases need stronger structure.', cls: 'border-cyan-500/30 bg-cyan-950/20 text-cyan-200' },
                { title: 'Higher shipping risk', text: 'Add more guardrails when mistakes would create rework or customer pain.', cls: 'border-teal-500/30 bg-teal-950/20 text-teal-200' },
                { title: 'Repeatable tasks', text: 'Structure pays off most when the pattern will be reused.', cls: 'border-amber-500/30 bg-amber-950/20 text-amber-200' },
              ].map(({ title, text, cls }) => (
                <div key={title} className={`rounded-xl border p-4 text-center ${cls}`}>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  <p className="mt-1 text-xs text-slate-300">{text}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs text-slate-400">Stay lighter for rough exploration, quick drafts, and low-stakes ideas.</p>
          </div>
        </Slide>
        )}

      {/* Slide 45: Activity intro */}
        {slideIndex === 45 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/activity-close-hero.png"
              alt="Activity and close chapter hero showing collaborative workshop artifacts and rapid iteration"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 8</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity</h2>
                <p className="fctg-subtitle mt-2">Look back at real work, then apply the pattern to the work in front of you.</p>
              </div>
            </div>
          </div>
        } />
        )}

        {/* Slide 46: Instructions */}
        {slideIndex === 46 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-[100rem] px-4 md:px-6 py-4 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Instructions</h2>
            </div>
            <p className="mx-auto mb-4 max-w-3xl text-center text-[10px] text-slate-500">Work solo.</p>
            <div className="mx-auto mb-4 grid max-w-[100rem] grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
              <div className="flex h-full flex-col rounded-xl border border-amber-500/25 bg-amber-950/20 p-3 text-left">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-400">Start</span>
                <span className="mt-1 text-[9px] text-slate-500">5 min</span>
                <p className="mt-2 text-[11px] leading-relaxed text-cyan-200/90">Choose a real workflow with friction.</p>
              </div>
              <div className="hidden lg:flex items-stretch justify-center text-cyan-400/70" aria-hidden>
                <svg viewBox="0 0 48 160" className="h-full min-h-[120px] w-12 overflow-visible">
                  <defs>
                    <marker id="fctg-activity-fork-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                      <path d="M0 0 L6 3 L0 6 Z" fill="#67e8f9" />
                    </marker>
                  </defs>
                  <path d="M 4 80 H 20" stroke="#67e8f9" strokeOpacity="0.7" strokeWidth="2" fill="none" />
                  <path d="M 20 80 V 38" stroke="#67e8f9" strokeOpacity="0.45" strokeWidth="2" fill="none" />
                  <path d="M 20 80 V 122" stroke="#67e8f9" strokeOpacity="0.45" strokeWidth="2" fill="none" />
                  <path d="M 20 38 H 42" stroke="#67e8f9" strokeOpacity="0.8" strokeWidth="2.25" fill="none" markerEnd="url(#fctg-activity-fork-arrow)" />
                  <path d="M 20 122 H 42" stroke="#67e8f9" strokeOpacity="0.8" strokeWidth="2.25" fill="none" markerEnd="url(#fctg-activity-fork-arrow)" />
                </svg>
              </div>
              <div className="flex h-full flex-col rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 text-left">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-violet-400">Explore</span>
                <span className="mt-1 text-[9px] text-slate-500">15 min</span>
                <p className="mt-2 text-[11px] leading-relaxed text-cyan-200/80">Explore 3 ideas for improving the workflow.</p>
              </div>
              <div className="hidden lg:flex items-center justify-center text-cyan-400/70" aria-hidden>
                <span className="text-xl">→</span>
              </div>
              <div className="flex h-full flex-col rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3 text-left">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-indigo-400">Develop</span>
                <span className="mt-1 text-[9px] text-slate-500">25 min</span>
                <p className="mt-2 text-[11px] leading-relaxed text-cyan-200/80">Turn 1 idea into a clearer workflow or prototype.</p>
              </div>
              <div className="hidden lg:flex items-center justify-center text-cyan-400/70" aria-hidden>
                <span className="text-xl">→</span>
              </div>
              <div className="flex h-full flex-col rounded-xl border border-amber-500/30 bg-amber-950/20 p-3 text-left">
                <span className="text-[9px] font-semibold uppercase tracking-wider text-amber-400">Share</span>
                <span className="mt-1 text-[9px] text-slate-500">15 min</span>
                <p className="mt-2 text-[11px] leading-relaxed text-cyan-200/80">Share what you made, 1 key gap, and 1 thing to validate next.</p>
              </div>
              <div className="hidden lg:flex items-center justify-center text-cyan-400/70" aria-hidden>
                <span className="text-xl">→</span>
              </div>
              <div className="grid h-full gap-3">
                <div className="rounded-xl border border-teal-500/25 bg-teal-950/20 p-3 text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-teal-400">Outputs</span>
                  <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-cyan-200/90">
                    <p>1 clearer workflow</p>
                    <p>1 thing to validate next</p>
                  </div>
                </div>
                <div className="rounded-xl border border-fuchsia-500/25 bg-fuchsia-950/20 p-3 text-left">
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-fuchsia-400">Outcomes</span>
                  <div className="mt-2 space-y-1 text-[11px] leading-relaxed text-cyan-200/90">
                    <p>Clearer direction</p>
                    <p>Better sense of what still needs judgment</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-3 flex max-w-3xl flex-wrap items-center justify-center gap-2 text-[10px]">
              <span className="uppercase tracking-[0.18em] text-slate-500">Open</span>
              <a
                href="https://miro.com/app/board/uXjVG-nWxPQ=/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3 py-1 text-cyan-200 transition hover:border-cyan-400/50 hover:bg-cyan-950/35"
              >
                Miro board - capture/share
              </a>
              <a
                href="https://figma.com/make"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-violet-500/30 bg-violet-950/20 px-3 py-1 text-violet-200 transition hover:border-violet-400/50 hover:bg-violet-950/35"
              >
                Figma Make - explore/develop
              </a>
            </div>
            <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-slate-500">Capture in Miro. Explore and develop in Figma Make.</p>
          </div>
        </Slide>
        )}

      {/* Slide 47: Close intro */}
      {slideIndex === 47 && (
        <Slide transparent heroOnly hero={
          <div key={slideIndex} className="fctg-text-transition relative w-full h-screen overflow-hidden">
            <img
              src="/activity-close-hero.png"
              alt="Close chapter hero showing collaborative workshop artifacts and delivery outcomes"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/24" />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 72% 54% at 50% 18%, rgba(34,211,238,0.14) 0%, transparent 72%), linear-gradient(180deg, rgba(2,6,23,0.22) 0%, rgba(2,6,23,0.38) 48%, rgba(2,6,23,0.8) 100%)',
              }}
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-4 pb-24 text-center md:px-8 md:pt-6 md:pb-28">
              <div className="max-w-2xl text-center">
                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-300/90">Chapter 9</div>
                <h2 className="fctg-heading !text-[2.5rem] md:!text-[3rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Close</h2>
                <p className="fctg-subtitle mt-2">What we built, what matters, and what to take with you.</p>
              </div>
            </div>
          </div>
        } />
      )}

      {/* Slide 48: Built with this stack */}
      {slideIndex === 48 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.1rem] md:!text-[2.6rem] inline-block whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Built with this stack</h2>
              <p className="fctg-subtitle mt-1">The deck runs as a real app, with real testing and delivery tooling.</p>
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

      {/* Slide 49: What we hope you take away */}
      {slideIndex === 49 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl mx-auto px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What we hope you take away</h2>
              <p className="fctg-subtitle mt-1">Three things to keep with you.</p>
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

      {/* Slide 50: Thank you */}
      {slideIndex === 50 && (
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
