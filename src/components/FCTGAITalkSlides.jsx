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

const SLIDE_COUNT = 44

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
  14: { quote: 'The work is done and then forgotten. That is why it lasts forever.', attribution: '— Rick Rubin, The Way of Code' },
  15: null,
  16: null,
  17: null,
  18: null,
  19: null,
  20: null,
  21: null,
  22: null,
  23: { quote: 'Free from intellect, free from abstraction, The Vibe Coder leads all things back to natural self-sufficiency.', attribution: '— Rick Rubin, The Way of Code' },
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
  41: null,
  42: { quote: 'Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns.', attribution: '— Rick Rubin, The Way of Code' },
  43: null,
  44: null,
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
  { title: 'Your words', subtitle: 'what you type', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Break into pieces', subtitle: 'chunks it knows', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'Turn into numbers', subtitle: 'meaning as numbers', tone: 'border-cyan-500/35 bg-cyan-950/25 text-cyan-100' },
  { title: 'The model', subtitle: 'thinks about context', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'What comes next?', subtitle: 'pick the next piece', tone: 'border-violet-500/35 bg-violet-950/25 text-violet-100' },
  { title: 'Add & repeat', subtitle: 'until done', tone: 'border-amber-500/35 bg-amber-950/25 text-amber-100' },
]

function ModelInBetweenDiagram() {
  const renderDiagram = (steps, loopText) => (
    <div className="rounded-lg md:rounded-xl border border-slate-600/40 bg-slate-900/30 p-3 md:p-4 space-y-3 md:space-y-3.5">
      <div className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1.5 md:gap-x-2 md:gap-y-2">
        {steps.map((s, i) => (
          <div key={`${s.title}-${i}`} className="flex items-center gap-1 md:gap-1.5 shrink-0">
            <div className={`rounded border px-2 py-1.5 md:px-2.5 md:py-2 ${s.tone}`}>
              <div className="text-[10px] md:text-[11px] font-semibold leading-none whitespace-nowrap">{s.title}</div>
              <div className="mt-0.5 text-[9px] md:text-[10px] leading-none opacity-80 whitespace-nowrap">{s.subtitle}</div>
            </div>
            {i < steps.length - 1 && (
              <span className="text-slate-500 text-xs md:text-sm select-none shrink-0" aria-hidden>→</span>
            )}
          </div>
        ))}
      </div>
      <div className="pt-1 border-t border-slate-700/60 mt-1 text-[10px] md:text-[11px] text-slate-400 text-center">
        {loopText}
      </div>
    </div>
  )

  return (
    <div className="space-y-4 md:space-y-5">
      {renderDiagram(MODEL_DIAGRAM_STEPS_TECHNICAL, 'Loop: append the sampled token to the context and run the same stack again until a stop condition.')}
      <div>
        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2 text-center">In plain language</p>
        {renderDiagram(MODEL_DIAGRAM_STEPS_BEGINNER, 'Add that word and run the same steps again until it\'s done.')}
      </div>
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
            <ParticleBackground variant="empowerment" />
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
      {/* Slide 2: Empathy quote */}
      {slideIndex === 1 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 2: What we'll cover */}
      {slideIndex === 2 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 4: Looking back — monumental hero with particles */}
      {slideIndex === 3 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-40" aria-hidden />
        </div>
      )}
      {/* Slide 5: Questioning the fundamentals — animated blob background */}
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
      {/* Slide 6: Designer process */}
      {slideIndex === 5 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 7: Wider environment — monumental hero with particles */}
      {slideIndex === 6 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-dot-matrix opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 8: Energy */}
      {slideIndex === 7 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 9: Strength */}
      {slideIndex === 8 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
        </div>
      )}
      {/* Slide 10: Speed */}
      {slideIndex === 9 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="speed" />
        </div>
      )}
      {/* Slide 11: Iteration */}
      {slideIndex === 10 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 12: Imagination */}
      {slideIndex === 11 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="imagination" />
        </div>
      )}
      {/* Slide 13: Calmness */}
      {slideIndex === 12 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 14: Mystical Code */}
      {slideIndex === 13 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
        </div>
      )}
      {/* Slide 15: Empowerment */}
      {slideIndex === 14 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="empowerment" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 16: Building momentum */}
      {slideIndex === 15 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
        </div>
      )}
      {/* Slide 17: What is an AI model? */}
      {slideIndex === 16 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 17: What happens inside the model? */}
      {slideIndex === 17 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 18: What is an AI agent? */}
      {slideIndex === 18 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 19: Model or agent? */}
      {slideIndex === 19 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 20: Agent architectures */}
      {slideIndex === 20 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 21: What makes behaviour agentic? */}
      {slideIndex === 21 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 22: Vibe coding vs Agentic coding */}
      {slideIndex === 22 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 23: Vibe vs directive */}
      {slideIndex === 23 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 24: Prompt clarity */}
      {slideIndex === 24 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 25: Context and continuity */}
      {slideIndex === 25 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 26: Intervention */}
      {slideIndex === 26 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-hexagon" aria-hidden />
        </div>
      )}
      {/* Slide 27: Agentic & designer productivity */}
      {slideIndex === 27 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 28: Tech stack */}
      {slideIndex === 28 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 29: Pipeline */}
      {slideIndex === 29 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 30: ReAct (what happens when you prompt) */}
      {slideIndex === 30 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 31: GitHub */}
      {slideIndex === 31 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 32: Vercel */}
      {slideIndex === 32 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 33: Design systems */}
      {slideIndex === 33 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 34: Design system in practice */}
      {slideIndex === 34 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 35: Testing */}
      {slideIndex === 35 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 36: Pricing & usage */}
      {slideIndex === 36 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-circuit" aria-hidden />
        </div>
      )}
      {/* Slide 37: Helpful tips */}
      {slideIndex === 37 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 38: Activity */}
      {slideIndex === 38 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 39: Activity rounds */}
      {slideIndex === 39 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 40: Activity run sheet */}
      {slideIndex === 40 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 41: What we hope you take away */}
      {slideIndex === 41 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide 42: Opportunity */}
      {slideIndex === 42 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-mesh" aria-hidden />
        </div>
      )}
      {/* Slide 43: Thank you */}
      {slideIndex === 43 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
          <div className="absolute inset-0 fctg-pattern-contour" aria-hidden />
        </div>
      )}
      {/* Slide content */}
      <div className="relative z-20 h-full overflow-x-hidden overflow-y-hidden">
        {/* Chapter label — same position at very top for all chapter slides */}
        {slideIndex >= 3 && slideIndex <= 7 && <ChapterLabel>Concepts</ChapterLabel>}
        {slideIndex >= 8 && slideIndex <= 14 && <ChapterLabel>Monumental moments</ChapterLabel>}
        {slideIndex >= 15 && slideIndex <= 26 && <ChapterLabel>Building momentum</ChapterLabel>}
        {slideIndex >= 27 && slideIndex <= 37 && <ChapterLabel>Technology</ChapterLabel>}
        {slideIndex >= 38 && slideIndex <= 40 && <ChapterLabel>Activity</ChapterLabel>}
        {/* Slide 1: Title */}
        {slideIndex === 0 && (
        <Slide
          heroOnly
          transparent
          hero={
            <div className="relative min-h-screen overflow-hidden bg-transparent">
              <div key={slideIndex} className="fctg-text-transition absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-16 px-8 pb-16 text-center">
                <h1 className="fctg-heading-hero">
                  <span className="block">Invigoration, innovation</span>
                  <span className="block">and impact</span>
                </h1>
                <p className="mt-4 tracking-wide text-cyan-300/80">Presented to Flight Centre Travel Group&apos;s (FCTG) Global Design Team, March 2026</p>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 2: Empathy quote */}
        {slideIndex === 1 && (
        <Slide transparent>
          <div key={slideIndex} className="fctg-text-transition flex flex-col items-center justify-center text-center px-8">
            <p className="text-xl font-medium tracking-wide text-cyan-300/90 sm:text-2xl max-w-2xl">In the future, the wealthy will pay for human empathy.</p>
            <p className="mt-4 text-sm tracking-wide text-cyan-400/70">— Attribution</p>
          </div>
        </Slide>
        )}

        {/* Slide 2: What we'll cover */}
        {slideIndex === 2 && (
        <Slide transparent className="!p-0">
          <div key={slideIndex} className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8">
            <div className="fctg-text-transition w-full max-w-3xl">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What we&apos;ll cover</h2>
              <p className="fctg-subtitle mt-3 text-slate-300 md:whitespace-nowrap">Concepts, monumental moments, building momentum, technology — and a hands-on activity.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 3: Looking back — full-page weaving */}
        {slideIndex === 3 && (
        <Slide
          heroOnly
          transparent
          scrollable
          hero={
            <div className="relative min-h-screen flex flex-col bg-transparent">
              <WeavingLoom fullPage variant="dark" />
              <div key={slideIndex} className="fctg-text-transition relative z-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-16 px-8 pb-16">
                <div className="mx-auto w-full max-w-5xl">
                  <div className="w-full max-w-2xl mx-auto text-center px-2">
                    <h2 className="fctg-heading md:whitespace-nowrap !text-[2.25rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Looking back to look ahead</h2>
                    <p className="fctg-subtitle mt-1 text-lg tracking-wide text-slate-300">Craft, tools, and what stays human.</p>
                  </div>
                <div className="mt-4 md:mt-10 w-full max-w-6xl text-center">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 min-w-0">
                      {[
                        { title: 'The weavers', text: 'Craft redefined, not replaced.', color: '#22d3ee' },
                        { title: 'Cart to car', text: 'The leap matters more than the increment.', color: '#2dd4bf' },
                        { title: 'The digital era', text: 'Systems, not just screens.', color: '#818cf8' },
                        { title: 'The future', text: 'Amplify human skills,\nnot replace them.', color: '#a78bfa' },
                      ].map((item) => (
                      <div key={item.title}>
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

        {/* Slide 5: Questioning the fundamentals */}
        {slideIndex === 4 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl flex flex-col items-center">
            <div className="flex flex-col items-center text-center max-w-md">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Questioning the fundamentals</h2>
              <p className="fctg-subtitle mt-1 md:whitespace-nowrap">Do design principles change — or are new ones added?</p>
            </div>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center gap-6 md:gap-16">
              <img src="/images/AI talk/appleguidlines87.png" alt="Apple Human Interface Guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain -rotate-2" />
              <img src="/images/AI talk/designforpeople.webp" alt="Designing for People by Henry Dreyfuss" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain rotate-1" />
              <img src="/images/AI talk/win95guidimage.png" alt="Windows 95 interface guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain brightness-110 -rotate-1" />
            </div>
            <div className="mt-4 md:mt-10 text-center flex flex-col items-center">
              <SlideQuote slideIndex={4} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 6: Designer process */}
        {slideIndex === 5 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The designer process</h2>
              <p className="fctg-subtitle mt-1">Does productivity still mean the same thing?</p>
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

        {/* Slide 7: Wider environment */}
        {slideIndex === 6 && (
        <Slide heroOnly transparent hero={
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pt-4 md:pt-24">
              <WiderEnvironmentCanvas
                width={viewport.w < 768 ? Math.min(viewport.w, viewport.h) * 0.88 : Math.min(viewport.w, viewport.h) * 0.55}
                height={viewport.w < 768 ? Math.min(viewport.w, viewport.h) * 0.88 : Math.min(viewport.w, viewport.h) * 0.55}
                className="text-cyan-500/80"
              />
            </div>
            <div key={slideIndex} className="fctg-text-transition relative z-10 flex flex-col items-center justify-start pt-28 md:pt-16 min-h-screen px-4 md:px-8 pb-8 md:pb-16 pointer-events-none bg-gradient-to-b from-black/40 via-transparent via-20% to-transparent">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The wider environment</h2>
              <p className="fctg-subtitle mt-1 text-sm md:text-base drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">Where are the bottlenecks? Who owns them?</p>
            </div>
          </div>
        } />
        )}

        {/* Slide 8: Energy */}
        {slideIndex === 7 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-7xl grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 md:gap-12 items-center">
            {/* Left: content */}
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Energy</h2>
              <p className="fctg-subtitle mt-1">What charges your designer battery?</p>
            </div>
            {/* Right: battery — constrained, no full-width breakout */}
            <div className="flex justify-center md:justify-end" aria-hidden>
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
                {/* Negative terminal (left) — abuts main body at x=40 */}
                <rect x="4" y="88" width="36" height="84" rx="6" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" />
                <text x="22" y="135" textAnchor="middle" fill="url(#fctg-battery-grad)" fontSize="28" fontWeight="800">−</text>
                {/* Main body — connects negative (40) to positive (1040) */}
                <rect x="40" y="28" width="1000" height="204" rx="10" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" className="fctg-battery-body" />
                {/* Positive terminal (right) — abuts main body at x=1040 */}
                <rect x="1040" y="72" width="36" height="116" rx="8" fill="none" stroke="url(#fctg-battery-grad)" strokeWidth="2" />
                <text x="1058" y="135" textAnchor="middle" fill="url(#fctg-battery-grad)" fontSize="28" fontWeight="800">+</text>
                <g clipPath="url(#fctg-battery-clip)">
                  <foreignObject x="44" y="32" width="992" height="186">
                    <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 6, pointerEvents: 'none' }}>
                      <BatteryParticleFill width={992} height={186} />
                    </div>
                  </foreignObject>
                  {[{ x: 160, y: 90, d: 0 }, { x: 330, y: 130, d: 0.4 }, { x: 540, y: 95, d: 0.8 }, { x: 440, y: 165, d: 0.2 }, { x: 710, y: 110, d: 0.5 }, { x: 820, y: 80, d: 0.1 }, { x: 875, y: 145, d: 0.6 }, { x: 935, y: 105, d: 0.3 }, { x: 270, y: 120, d: 0.7 }].map((b, i) => (
                    <circle key={i} cx={b.x} cy={b.y} r="3.5" fill="rgba(255,255,255,0.65)" className="fctg-battery-bubble" style={{ animationDelay: `${b.d}s` }} />
                  ))}
                  {[{ word: 'Imagination', x: 143, color: '#22d3ee', d: 0 }, { word: 'Creativity', x: 342, color: '#2dd4bf', d: 0.2 }, { word: 'Knowledge', x: 540, color: '#818cf8', d: 0.4 }, { word: 'Productivity', x: 738, color: '#a78bfa', d: 0.6 }, { word: 'Value', x: 937, color: '#e879f9', d: 0.8 }].map(({ word, x, color, d }) => (
                    <text key={word} x={x} y="125" dominantBaseline="middle" textAnchor="middle" fill={color} fontSize="24" fontWeight="600" className="fctg-word-charge" style={{ animationDelay: `${d}s` }}>{word}</text>
                  ))}
                </g>
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 9: Strength */}
        {slideIndex === 8 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: content */}
            <div className="max-w-md mx-auto md:mx-0 text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Strength</h2>
              <p className="fctg-subtitle mt-1">AI guided me through a structural design problem</p>
              <div className="mt-6 flex flex-col gap-4 min-w-0 overflow-hidden" aria-hidden>
                <style>{`
                  @keyframes fctg-strength-prompt-type { from { width: 0; } to { width: 30ch; } }
                  @keyframes fctg-strength-agent-type { from { width: 0; } to { width: 75ch; } }
                  @keyframes fctg-strength-agent-type-mobile { from { width: 0; } to { width: 100%; } }
                  @keyframes fctg-strength-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-strength-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-prompt-type 1.5s steps(30) 0s forwards; }
                  .fctg-strength-agent-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-agent-type 2.5s steps(75) 2s forwards; }
                  .fctg-strength-prompt-type::after, .fctg-strength-agent-type::after { content: '|'; animation: fctg-strength-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
                  @media (max-width: 767px) {
                    .fctg-strength-agent-type { white-space: normal; animation: fctg-strength-agent-type-mobile 2.5s steps(75) 2s forwards; }
                  }
                `}</style>
                <div className="fctg-strength-piece text-sm text-cyan-300" style={{ animationDelay: '0s' }}>
                  <span className="fctg-strength-prompt-type">Analyse load paths for this truss</span>
                </div>
                <div className="fctg-strength-piece text-sm text-violet-300" style={{ animationDelay: '2s' }}>
                  <span className="fctg-strength-agent-type">Compression, tension, triangulation — the agent explained the load paths.</span>
                </div>
              </div>
            </div>
            {/* Right: three vertical truss monuments */}
            <div className="flex justify-center items-end gap-6 overflow-visible py-4" aria-hidden>
              <style>{`
                @keyframes fctg-truss-draw { from { stroke-dashoffset: 1700; } to { stroke-dashoffset: 0; } }
                @keyframes fctg-truss-draw-2 { from { stroke-dashoffset: 2500; } to { stroke-dashoffset: 0; } }
                @keyframes fctg-truss-draw-3 { from { stroke-dashoffset: 1800; } to { stroke-dashoffset: 0; } }
                .fctg-truss-path { stroke-dasharray: 1700; stroke-dashoffset: 1700; animation: fctg-truss-draw 5s ease-out 4.5s forwards; }
                .fctg-truss-path-2 { stroke-dasharray: 2500; stroke-dashoffset: 2500; animation: fctg-truss-draw-2 5s ease-out 4.5s forwards; }
                .fctg-truss-path-3 { stroke-dasharray: 1800; stroke-dashoffset: 1800; animation: fctg-truss-draw-3 5s ease-out 4.5s forwards; }
              `}</style>
              {/* Monument 1: Warren truss */}
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
                  M 10 350 L 10 10
                  M 90 350 L 90 10
                  M 10 350 L 90 290
                  M 90 290 L 10 230
                  M 10 230 L 90 170
                  M 90 170 L 10 110
                  M 10 110 L 90 50
                  M 90 50 L 10 10
                  M 10 290 L 90 230
                  M 90 230 L 10 170
                  M 10 170 L 90 110
                  M 90 110 L 10 50
                " />
              </svg>
              {/* Monument 2: Pratt truss — verticals + diagonals */}
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
                  M 10 350 L 10 10
                  M 90 350 L 90 10
                  M 30 350 L 30 10
                  M 50 350 L 50 10
                  M 70 350 L 70 10
                  M 10 350 L 30 10
                  M 30 350 L 50 10
                  M 50 350 L 70 10
                  M 70 350 L 90 10
                " />
              </svg>
              {/* Monument 3: K-truss — K-shaped panels */}
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
                  M 10 350 L 10 10
                  M 90 350 L 90 10
                  M 30 180 L 30 350
                  M 70 180 L 70 350
                  M 10 10 L 30 180
                  M 30 180 L 50 10
                  M 50 10 L 70 180
                  M 70 180 L 90 10
                  M 10 350 L 30 180
                  M 30 180 L 50 350
                  M 50 350 L 70 180
                  M 70 180 L 90 350
                " />
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 10: Speed */}
        {slideIndex === 9 && (
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
              <div className="mt-6 min-w-0 overflow-hidden" aria-hidden>
                <style>{`
                  @keyframes fctg-speed-prompt-type { from { width: 0; } to { width: 40ch; } }
                  @keyframes fctg-speed-prompt-type-mobile { from { opacity: 0; } to { opacity: 1; } }
                  @keyframes fctg-speed-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-speed-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-speed-prompt-type 2s steps(40) 0s forwards; }
                  .fctg-speed-prompt-type::after { content: '|'; animation: fctg-speed-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
                  @media (max-width: 767px) {
                    .fctg-speed-prompt-type { width: auto; white-space: normal; overflow: visible; animation: fctg-speed-prompt-type-mobile 1s ease-out 0s forwards; }
                    .fctg-speed-prompt-type::after { display: none; }
                  }
                `}</style>
                <div className="fctg-speed-ui-piece text-sm text-cyan-300">
                  <span className="fctg-speed-prompt-type">Create a login form with email and password</span>
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

        {/* Slide 11: Iteration */}
        {slideIndex === 10 && (
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

        {/* Slide 12: Imagination */}
        {slideIndex === 11 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex flex-col gap-2 max-w-xl">
                <p className="fctg-card-text flex flex-col md:flex-row items-center justify-center gap-2 md:gap-x-2 md:gap-y-0 md:items-baseline">
                  <span className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] shrink-0 inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Imagination</span>
                  <span className="whitespace-nowrap">Beyond the gates of technology.</span>
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

        {/* Slide 13: Calmness */}
        {slideIndex === 12 && (
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

        {/* Slide 14: Mystical Code */}
        {slideIndex === 13 && (
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

        {/* Slide 15: Empowerment */}
        {slideIndex === 14 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Build things that add value to your life.</p>
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Mental health app</a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Drafting studio</a>
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <EmpowermentHealthDrawing />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 15: Get started and stay grounded (Building momentum chapter) */}
        {slideIndex === 15 && (
        <Slide transparent className="!p-0 overflow-hidden" wide>
          <div key={slideIndex} className="absolute inset-0 flex flex-col items-center justify-center px-4 py-6">
            <div className="fctg-text-transition w-full max-w-5xl flex flex-col items-center min-w-0">
            <div className="w-full max-w-2xl text-center mx-auto px-2 min-w-0">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.5rem] lg:!text-[2.75rem] leading-tight" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Get started and stay grounded</h2>
              <p className="fctg-subtitle mt-1">Practices that help.</p>
            </div>
            <div className="mt-10 mx-auto max-w-3xl grid grid-cols-3 gap-4">
            {[
              { icon: FiZap, label: 'Start simple' },
              { icon: FiActivity, label: 'Experiment freely' },
              { icon: FiLayers, label: 'Stay curious' },
              { icon: FiHome, label: 'Use analogies' },
              { icon: FiUser, label: 'Stay human' },
              { icon: FiGlobe, label: 'Your environment' },
              { icon: FiCornerUpRight, label: 'Redirect, Don\'t Fight' },
              { icon: FiRefreshCw, label: 'Reset When Stuck' },
              { icon: FiFileText, label: 'Document As You Go' },
            // eslint-disable-next-line no-unused-vars -- Icon is used as JSX element
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="fctg-card fctg-card-compact fctg-momentum-card">
                <Icon className="h-5 w-5 shrink-0 text-cyan-400" strokeWidth={1.5} />
                <h3 className="fctg-card-title fctg-card-title-compact">{label}</h3>
              </div>
            ))}
          </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: What is an AI model? */}
        {slideIndex === 16 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8">
            <div className="text-center mb-3 md:mb-8">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>What is an AI model?</h2>
              <p className="fctg-subtitle mt-0.5 text-xs md:text-sm text-slate-400">The brain agents run on.</p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4 md:space-y-5 text-center">
              <div className="rounded-lg md:rounded-xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/40 to-cyan-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-400/10">
                <h3 className="text-xs md:text-sm font-semibold text-cyan-300 mb-0.5 md:mb-1.5 tracking-tight">Large language models (LLMs)</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95">Reads, reasons, and generates — trained on lots of text and code.</p>
                <p className="text-[10px] md:text-[11px] text-slate-400 mt-2 md:mt-2.5 pt-2 md:pt-2.5 border-t border-cyan-500/20">
                  <span className="font-medium text-cyan-300/90">Products:</span> ChatGPT, Claude, Gemini (model-only).
                </p>
                <p className="text-[10px] md:text-[11px] text-slate-400 mt-1">
                  <span className="font-medium text-cyan-300/90">Tiers:</span> Sonnet, GPT-4o-mini (quick) · Opus, GPT-4o (complex).
                </p>
              </div>
              <div className="rounded-lg md:rounded-xl border border-slate-600/40 bg-slate-900/60 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-slate-950/30 ring-1 ring-slate-500/30">
                <h3 className="text-xs md:text-sm font-semibold text-cyan-300 mb-0.5 md:mb-1.5 tracking-tight">Why we use them</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95">Generate options and drafts faster — you focus on judgment, taste, and strategy.</p>
              </div>
              <div className="rounded-lg md:rounded-xl border border-amber-500/25 bg-gradient-to-b from-amber-950/40 to-amber-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/10">
                <h3 className="text-xs md:text-sm font-semibold text-amber-300 mb-0.5 md:mb-1.5 tracking-tight">Key point</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95">Outputs only — no tools, no actions. Models respond; they don&apos;t act.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: What happens inside the model? */}
        {slideIndex === 17 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Inside the model</h2>
              <p className="fctg-subtitle mt-0.5 text-xs md:text-sm text-slate-400">
                <span className="text-cyan-300 font-medium">Input</span>
                <span> → </span>
                <span className="text-violet-300 font-medium">processing</span>
                <span> → </span>
                <span className="text-amber-300 font-medium">output</span>
                <span>. Then repeat.</span>
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <ModelInBetweenDiagram />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 18: What is an AI agent? */}
        {slideIndex === 18 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto text-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>What is an AI agent?</h2>
            <p className="fctg-subtitle mt-1 max-w-2xl mx-auto">Agents drive outcomes, not just outputs.</p>
            <div className="mt-4 md:mt-6 max-w-2xl mx-auto">
              <FCTGBodyAnalogyDiagram />
            </div>
            <p className="mt-3 md:mt-4 text-slate-500 text-[10px] md:text-xs italic">Brain thinks. Memory remembers. Hands act.</p>
            <p className="mt-1 text-slate-500/80 text-[9px] md:text-[10px] max-w-xl mx-auto">Memory is separate from the model — the model is stateless; memory lives outside and the agent injects it into the context the model sees.</p>
          </div>
        </Slide>
        )}

        {/* Slide 19: Model or agent? */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Model or agent?</h2>
              <p className="fctg-subtitle mt-0.5 text-xs md:text-sm text-slate-400">Use both, in combination. Model = fast thinking. Agent = thinking + doing.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5 text-center">
                <h3 className="text-sm md:text-base font-semibold text-cyan-300 mb-3">Use the model when</h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300/95 list-disc list-inside text-left inline-block">
                  <li><strong className="text-cyan-100">You want ideas</strong> — naming, options, outlines.</li>
                  <li><strong className="text-cyan-100">You&apos;ll paste and edit</strong> — output stays with you.</li>
                  <li><strong className="text-cyan-100">It&apos;s one question</strong> — scoped, no tools.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 md:p-5 text-center">
                <h3 className="text-sm md:text-base font-semibold text-violet-300 mb-3">Use an agent when</h3>
                <ul className="space-y-2 text-xs md:text-sm text-slate-300/95 list-disc list-inside text-left inline-block">
                  <li><strong className="text-violet-100">You want it to do things</strong> — edit files, run commands.</li>
                  <li><strong className="text-violet-100">It&apos;s multi-step</strong> — you review as it goes.</li>
                  <li><strong className="text-violet-100">You&apos;re delegating</strong> — hand off, don&apos;t paste and edit.</li>
                </ul>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Agent architectures — single-agent vs multi-agent */}
        {slideIndex === 20 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4">
            <div className="text-center mb-3">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Agent architectures</h2>
              <p className="fctg-subtitle mt-0.5 text-sm text-slate-400">Single-agent vs multi-agent.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-600/50 p-3 flex flex-col">
                <FCTGAIFlowDiagram compact />
                <FCTGAIFlowCaption compact />
                <p className="mt-auto pt-2 text-center text-xs text-cyan-400/80">Best for: renames, refactors, single-step logic.</p>
              </div>
              <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-600/50 p-3 flex flex-col">
                <FCTGMultiAgentDiagram compact />
                <FCTGMultiAgentCaption compact />
                <p className="mt-1 text-center text-slate-400 text-[10px] italic">Agent plans, coordinates with M/M/T, delegates; sub-agents can hand off.</p>
                <p className="mt-auto pt-2 text-center text-xs text-violet-400/80">Best for: architecture decisions, parallel work, multi-step tasks.</p>
              </div>
            </div>
            <p className="mt-4 md:mt-5 text-center text-xs text-slate-500 max-w-2xl mx-auto">Simple multi-agent in practice: one agent had the main task (&ldquo;turn the slide deck into a document&rdquo;); it delegated a subtask (&ldquo;read the file and extract all slide copy&rdquo;) to another agent. Two agents, one handoff.</p>
          </div>
        </Slide>
        )}

        {/* Slide 27: How the agent loop improves how you work */}
        {slideIndex === 27 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-8">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Agentic & designer productivity</h2>
              <p className="fctg-subtitle mt-0.5 text-xs md:text-sm text-slate-400">How the agent loop improves how you work.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-3xl mx-auto">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-cyan-300 mb-1">Fewer handoffs</h3>
                <p className="text-xs md:text-sm text-slate-300/95">One prompt drives the steps; you evaluate and decide.</p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-cyan-300 mb-1">Faster iteration</h3>
                <p className="text-xs md:text-sm text-slate-300/95">Agent tries options; you stay in review mode.</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-violet-300 mb-1">Less context-switching</h3>
                <p className="text-xs md:text-sm text-slate-300/95">It reads, runs, summarizes; you focus on design thinking.</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 md:p-4">
                <h3 className="text-sm font-semibold text-violet-300 mb-1">Scale routine work</h3>
                <p className="text-xs md:text-sm text-slate-300/95">Delegate the repeatable; you focus on judgment and creativity.</p>
              </div>
            </div>
            <p className="mt-4 md:mt-5 text-center text-xs text-slate-500 max-w-2xl mx-auto">Across the design process — discover, define, develop, deliver — the agent handles execution; you own direction and quality.</p>
          </div>
        </Slide>
        )}

        {/* Slide 23: Prompting styles — vibe vs directive */}
        {slideIndex === 23 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Prompting styles</h2>
              <p className="fctg-subtitle mt-1">Vibe vs directive — how you phrase it.</p>
            </div>
            <div className="mt-4 md:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 max-w-4xl mx-auto">
              <div className="rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3">
                <p className="text-[11px] md:text-xs text-slate-400 mb-2">Intent, mood, context.</p>
                <p className="font-mono text-xs md:text-sm text-slate-300 italic">&ldquo;This flow feels clunky, help me improve it.&rdquo;</p>
              </div>
              <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                <p className="text-[11px] md:text-xs text-slate-400 mb-2">Explicit, step-by-step.</p>
                <p className="font-mono text-xs md:text-sm text-cyan-200 italic">&ldquo;Rename FooBar to FooBarV2, then update all imports.&rdquo;</p>
              </div>
            </div>
            <p className="mt-4 md:mt-6 text-center text-slate-400 text-xs md:text-sm max-w-2xl mx-auto">Same agent, either style. Choose to fit the task.</p>
            <div className="mt-4 md:mt-8 text-center">
              <SlideQuote slideIndex={22} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 24: Prompt clarity */}
        {slideIndex === 24 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Prompt clarity</h2>
              <p className="fctg-subtitle mt-1">Task · Scope · Done.</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              <div className="rounded-xl border border-slate-600/50 bg-slate-900/50 px-4 py-3">
                <p className="text-xs text-slate-500 mb-1">Vague</p>
                <p className="font-mono text-sm text-slate-300">&quot;fix the slider&quot;</p>
              </div>
              <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                <p className="text-xs text-cyan-400/80 mb-1">Specific</p>
                <p className="font-mono text-sm text-cyan-200">&quot;Fix the re-render loop in HealthMonitor. Don&apos;t change UI. Run lint.&quot;</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <SlideQuote slideIndex={23} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 21: What makes behaviour agentic? */}
        {slideIndex === 21 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-8">
            <div className="text-center mb-5 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>What makes behaviour agentic?</h2>
              <p className="fctg-subtitle mt-1">Plan → Act → Observe (inspect results) → Iterate.</p>
            </div>

            <div className="rounded-xl border border-cyan-500/40 bg-cyan-950/30 p-4 md:p-5 max-w-3xl mx-auto">
              <p className="text-center text-slate-200 text-sm md:text-base max-w-2xl mx-auto">You need the agent wrapper — tools, loop, and often memory. The model is the brain; the rest of the system is what makes it agentic.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 22: Vibe coding and Agentic coding */}
        {slideIndex === 22 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:py-8 text-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Vibe coding and Agentic coding</h2>
            <p className="fctg-subtitle mt-2 max-w-2xl mx-auto">Prompt-driven and reactive vs autonomous and structured.</p>
            <div className="mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto text-left">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5">
                <p className="text-xs md:text-sm text-slate-300/95 mb-2">Intuitive, creative, fast. You prompt AI for quick results; you&apos;re the editor and reviewer.</p>
                <p className="text-[11px] md:text-xs text-slate-400">Best for: ideation, rapid prototyping, creative exploration.</p>
              </div>
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4 md:p-5">
                <p className="text-xs md:text-sm text-slate-300/95 mb-2">Agents plan, execute, and test. You&apos;re the manager/supervisor. Proactive, long-running processes.</p>
                <p className="text-[11px] md:text-xs text-slate-400">Best for: complex systems, refactoring, CI/CD, production-level work.</p>
              </div>
            </div>
            <p className="mt-8 md:mt-10 text-center text-slate-400 text-sm md:text-base max-w-2xl mx-auto">Combine both: vibe for brainstorming and prototypes; agentic for reliable execution and maintenance.</p>
          </div>
        </Slide>
        )}

        {/* Slide 25: Context and continuity */}
        {slideIndex === 25 && (
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
                  <SlideQuote slideIndex={24} />
                </div>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 26: Intervention */}
        {slideIndex === 26 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl px-4 py-4 md:py-8 mx-auto text-center flex flex-col items-center justify-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Intervention</h2>
            <p className="fctg-subtitle mt-1" style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.125rem)' }}>Verify outputs, redirect when they drift, reframe when looping.</p>
            <p className="mt-2 text-sm text-slate-400 italic">Don&apos;t expect perfection in the agents. Work with the agent to solve the problem together.</p>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center items-center gap-2">
              {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift', 'Tone', 'Pushback'].map((label) => (
                <span key={label} className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-300/90">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 28: Tech stack (merged with How this was built) — right after Intervention */}
        {slideIndex === 28 && (
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

        {/* Slide 29: Pipeline */}
        {slideIndex === 29 && (
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

        {/* Slide 30: Cursor — IDE */}
        {slideIndex === 30 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full flex flex-col items-center justify-center px-4 py-4 md:px-10 md:py-10">
            <div className="text-center mb-6 md:mb-8">
              <FCTGHeading variant="v2" as="h2" className="w-fit mx-auto">Cursor</FCTGHeading>
              <p className="fctg-subtitle mt-0.5 text-sm">AI-powered editor. When you prompt: ReAct — reasoning + acting.</p>
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

        {/* Slide 31: What happens when you prompt (ReAct) */}
        {slideIndex === 31 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full flex flex-col items-center justify-center px-4 pt-3 pb-20 md:px-8 md:pt-4 md:pb-24">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="fctg-heading !text-[1.75rem] md:!text-[2.25rem] inline-block mx-auto" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>When you prompt</h2>
              <p className="fctg-subtitle mt-0.5 text-xs">ReAct — reasoning + acting.</p>
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

        {/* Slide 32: GitHub */}
        {slideIndex === 32 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">GitHub</FCTGHeading>
              <p className="fctg-subtitle mt-1">Version control, collaboration, and the bridge between Cursor and deploy.</p>
              <p className="fctg-subtitle mt-0.5 text-xs text-slate-400">Push runs checks and triggers deploy.</p>
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

        {/* Slide 33: Vercel */}
        {slideIndex === 33 && (
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

        {/* Slide 32: Design systems */}
        {slideIndex === 34 && (
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

        {/* Slide 33: Design system + agent — productivity focus */}
        {slideIndex === 35 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4">
            <div className="text-center mb-4 md:mb-5">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Productivity in this area</h2>
              <p className="fctg-subtitle mt-1">What to measure when design system + agent work together.</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4 md:p-5 mb-5 md:mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                {[
                  { label: 'Fewer revision cycles', desc: 'Less back-and-forth to get on-brand UI' },
                  { label: 'Fewer design–dev handoff rounds', desc: '"Use our Button" once, not every sprint' },
                  { label: 'Faster to production-ready UI', desc: 'Agent applies tokens and components' },
                  { label: 'More time on research, flows, craft', desc: 'You focus where judgment matters' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex flex-col gap-0.5 rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-3 py-2.5">
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
                <div key={title} className="fctg-card fctg-card-compact fctg-tips-card py-1.5 px-2 md:py-2 md:px-2.5">
                  <h3 className="fctg-card-title font-semibold">{title}</h3>
                  <p className="fctg-card-text mt-0.5">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 36: Testing */}
        {slideIndex === 36 && (
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
              <p className="text-xs text-cyan-400/80 text-center">CI runs on push (GitHub Actions).</p>
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
              <p className="text-xs text-cyan-400/80 text-center">This deck: 75 tests — unit, integration, E2E. Full coverage uncovers gaps; thorough testing keeps changes from breaking what works.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 35: Helpful tips */}
        {slideIndex === 37 && (
        <Slide transparent className="items-center justify-center overflow-hidden py-4 md:py-6">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 min-w-0">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="fctg-heading !text-[2rem] md:!text-[2.25rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Tips for the workflow</h2>
              <p className="fctg-subtitle mt-0.5 text-xs">Workflow pointers.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1.5 md:gap-2">
              {[
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

        {/* Slide 36: Activity — Vibe vs directive showdown */}
        {slideIndex === 38 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-6">
            <div className="text-center mb-4 md:mb-5">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Vibe vs directive showdown</h2>
              <p className="text-sm text-cyan-200/90 mt-2">Same problem, two modes. Pairs pick team names.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">Problem</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">How might we design a booking flow for a Moon trip?</p>
                <p className="text-[11px] md:text-xs text-cyan-300/80 mt-2">Show & tell: we vote on the clearest, most usable flow. Bragging rights to the winners.</p>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">What we&apos;re practising</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">Choosing vibe vs directive, writing clear prompts, steering when it drifts — and taking one workflow into real work.</p>
              </div>
              <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">What you&apos;ll leave with</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">Prompts, agent responses, generated UI/copy</p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">Logistics</h4>
                <p className="text-xs md:text-sm text-cyan-200/90"><a href="https://miro.com/app/board/uXjVG-nWxPQ=/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Miro</a>, <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ChatGPT</a>/<a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">DeepSeek</a>/<a href="https://theturbochat.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">TurboChat</a></p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 37: Activity — rounds */}
        {slideIndex === 39 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity: Rounds</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">Round 1 · ~15 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Start with vibe</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Explore flows and tone. Try: &quot;How would you approach designing a booking flow for a Moon trip?&quot; Chat, iterate, go wild.</p>
                <p className="mt-2 text-xs text-cyan-400/70">Single-shot, iterative. Exploratory.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Round 2 · ~25 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Level up to directive</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Give AI a clear mission. Try: &quot;Create a 3-step booking flow for a Moon trip: step 1 — departure date picker; step 2 — cabin selection (economy, business, first); step 3 — add-ons and terms. Include copy and layout.&quot;</p>
                <p className="mt-2 text-xs text-cyan-400/70">Multi-step, defined outcome. Goal-driven.</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">Round 3 · ~15 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Show & tell</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Share the best Moon booking outputs — vibe vs directive. Vote on MVP prompt. Quick poll, then wrap.</p>
                <p className="mt-2 text-sm text-cyan-300/90 italic">Debrief: How could this apply to our Earth bookings?</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 38: Activity — run sheet */}
        {slideIndex === 40 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity: Run sheet</h2>
              <p className="fctg-subtitle mt-1">1 hour total</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 overflow-x-auto px-4 md:px-6 py-4">
              <table className="w-full text-sm md:text-base text-left">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="py-2 pr-4 font-semibold text-cyan-200">Time</th>
                    <th className="py-2 pr-4 font-semibold text-cyan-200">Duration</th>
                    <th className="py-2 font-semibold text-cyan-200">Step</th>
                  </tr>
                </thead>
                <tbody className="text-cyan-200/90">
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:00</td><td className="py-2 pr-4">2 min</td><td className="py-2">Intro: Problem = Moon booking flow. Explain vibe vs directive. Pair up, pick team names.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:02</td><td className="py-2 pr-4">15 min</td><td className="py-2"><strong>Round 1 — Vibe:</strong> Explore flows and tone. Chat, iterate.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:17</td><td className="py-2 pr-4">2 min</td><td className="py-2">Transition: Explain directive.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:19</td><td className="py-2 pr-4">25 min</td><td className="py-2"><strong>Round 2 — Directive:</strong> Create 3-step booking flow. One prompt, full outcome.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:44</td><td className="py-2 pr-4">15 min</td><td className="py-2"><strong>Round 3 — Show & tell:</strong> Share outputs. Vote on MVP prompt. Debrief: How could this apply to our Earth bookings? Wrap.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:59</td><td className="py-2 pr-4">1 min</td><td className="py-2">Buffer / wrap.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-cyan-400/70">Tip: Keep time visible. Call out at 5 min left in each round. For remote, use breakout rooms during rounds.</p>
          </div>
        </Slide>
        )}

      {/* Slide 41: What we hope you take away */}
      {slideIndex === 41 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-8 md:py-6">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>What we hope you take away</h2>
              <p className="fctg-subtitle mt-1">Agentic outcomes</p>
            </div>
            <div className="rounded-xl border border-slate-500/25 bg-slate-900/40 px-4 py-4 md:px-6 md:py-5 max-w-3xl mx-auto">
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Higher-level</p>
              <ul className="text-left text-xs md:text-sm text-slate-300 space-y-1.5 list-disc list-inside mb-4">
                <li>Designers who work with AI will have an edge — amplify empathy, judgment, creativity; keep the human at the centre.</li>
                <li>Stay in the driver&apos;s seat: steer agents; don&apos;t just accept outputs.</li>
                <li>Choose the right mode for the job — explore (vibe) or specify (directive).</li>
                <li>Treat agents as outcome-drivers, not just output-generators.</li>
                <li>Like in mixing: reduce the noise so you can focus on the signal.</li>
              </ul>
              <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">In practice</p>
              <ul className="text-left text-xs md:text-sm text-slate-300 space-y-1.5 list-disc list-inside">
                <li><strong className="text-slate-200">Vibe vs directive</strong> — Use each intentionally when prompting agents.</li>
                <li><strong className="text-slate-200">Clear prompts</strong> — What, where, rules; fewer revision loops.</li>
                <li><strong className="text-slate-200">Point at design system</strong> — Tokens, docs, or a library.</li>
                <li><strong className="text-slate-200">Intervene when it drifts</strong> — Don&apos;t expect perfection; steer when it loops.</li>
                <li><strong className="text-slate-200">Try one this week</strong> — Small agentic task in Cursor.</li>
              </ul>
              <p className="mt-4 pt-3 border-t border-slate-500/20 text-xs md:text-sm text-slate-400">Productivity that serves quality — fewer revision loops, clearer briefs, and time to focus on judgment and creativity.</p>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 42: Opportunity */}
      {slideIndex === 42 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>An opportunity of a lifetime</h2>
              <p className="fctg-subtitle text-base md:text-xl leading-relaxed mt-2 md:mt-4">
            AI won&apos;t replace designers — but designers who work with AI will have an edge. Amplify empathy, judgment, creativity. Embrace the tools, question the outputs, keep the human at the centre.
          </p>
              <p className="mt-3 text-sm md:text-base text-slate-400">Pushing further than traditional engineering and dev teams.</p>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {['AI is in its infancy', 'Creating massive value', 'Move fast', 'Understand where needed', 'Pause and reflect — The speed of thinking and questioning itself is incredible'].map((tag) => (
              <span key={tag} className="fctg-tag">
                {tag}
              </span>
            ))}
            </div>
            <div className="mt-4 md:mt-10 text-center">
              <SlideQuote slideIndex={42} />
            </div>
            </div>
          </div>
        </Slide>
        )}

      {/* Slide 43: Thank you */}
      {slideIndex === 43 && (
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
