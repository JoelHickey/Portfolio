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

const SLIDE_COUNT = 34

/* Slide quotes — Rick Rubin from The Way of Code; Henry Dreyfuss for Looking back */
const FCTG_SLIDE_QUOTES = {
  0: null,
  1: null,
  2: null,
  3: { quote: 'Free from desire, you see essence unformed. Caught in desire, you see only the manifestations.', attribution: '— Rick Rubin, The Way of Code' },
  4: null,
  5: null,
  6: null,
  7: null,
  8: null,
  9: { quote: 'Things arise and he accepts them. Things vanish and he lets them go.', attribution: '— Rick Rubin, The Way of Code' },
  10: null,
  11: null,
  12: null,
  13: { quote: 'The work is done and then forgotten. That is why it lasts forever.', attribution: '— Rick Rubin, The Way of Code' },
  14: null,
  15: null,
  16: null,
  17: null,
  18: null,
  19: { quote: 'Free from intellect, free from abstraction, The Vibe Coder leads all things back to natural self-sufficiency.', attribution: '— Rick Rubin, The Way of Code' },
  20: null,
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
  33: { quote: 'Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns.', attribution: '— Rick Rubin, The Way of Code' },
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
        try { clearTimeout(id) } catch (_) {}
        try { clearInterval(id) } catch (_) {}
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

function ModelsSlideContent() {
  return (
    <div className="flex flex-wrap gap-3 md:gap-6 justify-center">
        <div className="flex-1 min-w-[140px] md:min-w-[180px] rounded-lg md:rounded-xl border border-teal-500/30 bg-gradient-to-br from-teal-950/50 to-teal-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-md ring-1 ring-teal-400/10">
          <h4 className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-teal-400">
            <span className="flex h-5 w-5 md:h-7 md:w-7 items-center justify-center rounded-md md:rounded-lg bg-teal-500/20">
              <FiZap className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 shrink-0" strokeWidth={1.5} />
            </span>
            Quick
          </h4>
          <p className="text-[11px] md:text-xs mt-1 md:mt-2 leading-snug text-slate-300/95">Sonnet, GPT-4o-mini. Fast for renames, typos.</p>
        </div>
        <div className="flex-1 min-w-[140px] md:min-w-[180px] rounded-lg md:rounded-xl border border-violet-500/30 bg-gradient-to-br from-violet-950/50 to-violet-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-md ring-1 ring-violet-400/10">
          <h4 className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-semibold text-violet-400">
            <span className="flex h-5 w-5 md:h-7 md:w-7 items-center justify-center rounded-md md:rounded-lg bg-violet-500/20">
              <FiTarget className="h-2.5 w-2.5 md:h-3.5 md:w-3.5 shrink-0" strokeWidth={1.5} />
            </span>
            Complex
          </h4>
          <p className="text-[11px] md:text-xs mt-1 md:mt-2 leading-snug text-slate-300/95">Opus, GPT-4o. For reasoning, multi-step work.</p>
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
      {/* Slide 3: Looking back — monumental hero with particles */}
      {slideIndex === 2 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
          <div className="absolute inset-0 fctg-pattern-flow-lines opacity-40" aria-hidden />
        </div>
      )}
      {/* Slide 4: Questioning the fundamentals — animated blob background */}
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
      {/* Slide 5: Designer process */}
      {slideIndex === 4 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 6: Wider environment — monumental hero with particles */}
      {slideIndex === 5 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
          <div className="absolute inset-0 fctg-pattern-dot-matrix opacity-30" aria-hidden />
        </div>
      )}
      {/* Slide 7: Energy */}
      {slideIndex === 6 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 8: Strength */}
      {slideIndex === 7 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="strength" />
        </div>
      )}
      {/* Slide 9: Speed */}
      {slideIndex === 8 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="speed" />
        </div>
      )}
      {/* Slide 10: Iteration */}
      {slideIndex === 9 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 11: Imagination */}
      {slideIndex === 10 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="imagination" />
        </div>
      )}
      {/* Slide 12: Calmness */}
      {slideIndex === 11 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 13: Mystical Code */}
      {slideIndex === 12 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
        </div>
      )}
      {/* Slide 14: Empowerment */}
      {slideIndex === 13 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 16: Building momentum */}
      {slideIndex === 14 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
        </div>
      )}
      {/* Slide 17: What is an AI model? */}
      {slideIndex === 15 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="brain" />
        </div>
      )}
      {/* Slide 17: What is an AI agent? */}
      {slideIndex === 16 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 18: When to use single vs agentic */}
      {slideIndex === 18 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 19: Vibe vs agentic */}
      {slideIndex === 19 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 20: Prompt clarity */}
      {slideIndex === 20 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 17: AI tools & agents */}
      {slideIndex === 17 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 21: Context and continuity */}
      {slideIndex === 21 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 22: Intervention */}
      {slideIndex === 22 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 23: Tech stack */}
      {slideIndex === 23 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 24: Cursor */}
      {slideIndex === 24 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 25: GitHub */}
      {slideIndex === 25 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 26: Netlify */}
      {slideIndex === 26 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 27: Design systems */}
      {slideIndex === 27 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 28: Testing */}
      {slideIndex === 28 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 29: Helpful tips */}
      {slideIndex === 29 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 30: Activity */}
      {slideIndex === 30 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 31: Activity rounds */}
      {slideIndex === 31 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 32: Activity run sheet */}
      {slideIndex === 32 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 33: Opportunity */}
      {slideIndex === 33 && (
        <div className="fctg-pattern-mesh pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide content */}
      <div className="relative z-20 h-full overflow-x-hidden overflow-y-hidden">
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

        {/* Slide 3: Looking back — full-page weaving */}
        {slideIndex === 2 && (
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

        {/* Slide 4: Questioning the fundamentals */}
        {slideIndex === 3 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Questioning the fundamentals</h2>
              <p className="fctg-subtitle mt-1 md:whitespace-nowrap">Do design principles change — or are new ones added?</p>
            </div>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center gap-6 md:gap-16">
              <img src="/images/AI talk/appleguidlines87.png" alt="Apple Human Interface Guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain -rotate-2" />
              <img src="/images/AI talk/designforpeople.webp" alt="Designing for People by Henry Dreyfuss" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain rotate-1" />
              <img src="/images/AI talk/win95guidimage.png" alt="Windows 95 interface guidelines" className="fctg-book-img max-h-40 md:max-h-64 w-auto rounded-xl object-contain brightness-110 -rotate-1" />
            </div>
            <div className="mt-4 md:mt-10 text-center flex flex-col items-center">
              <SlideQuote slideIndex={3} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 5: Designer process */}
        {slideIndex === 4 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Designer process</h2>
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

        {/* Slide 6: Wider environment */}
        {slideIndex === 5 && (
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

        {/* Slide 7: Energy */}
        {slideIndex === 6 && (
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

        {/* Slide 8: Strength */}
        {slideIndex === 7 && (
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

        {/* Slide 9: Speed */}
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

        {/* Slide 10: Iteration */}
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

        {/* Slide 11: Imagination */}
        {slideIndex === 10 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex flex-col gap-2">
                <p className="fctg-card-text flex flex-col md:flex-row items-center justify-center gap-2 md:gap-x-2 md:gap-y-0 md:items-baseline">
                  <span className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] shrink-0 inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Imagination</span>
                  <span>Beyond the gates of technology.</span>
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

        {/* Slide 12: Calmness */}
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

        {/* Slide 13: Mystical Code */}
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

        {/* Slide 14: Empowerment */}
        {slideIndex === 13 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Build things that add value to your life.</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <EmpowermentHealthDrawing />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 15: Building momentum */}
        {slideIndex === 14 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Building momentum</h2>
              <p className="fctg-subtitle mt-1">Get started and stay grounded.</p>
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
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="fctg-card fctg-card-compact fctg-momentum-card">
                <Icon className="h-5 w-5 shrink-0 text-cyan-400" strokeWidth={1.5} />
                <h3 className="fctg-card-title fctg-card-title-compact">{label}</h3>
              </div>
            ))}
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: What is an AI model? */}
        {slideIndex === 15 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4 md:px-10 md:py-8">
            <div className="text-center mb-3 md:mb-8">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>What is an AI model?</h2>
              <p className="fctg-subtitle mt-0.5 text-xs md:text-sm text-slate-400">The foundation agents are built on.</p>
              <div className="mt-1 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent md:mt-1.5" aria-hidden />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-6 max-w-4xl mx-auto">
              <div className="rounded-lg md:rounded-xl border border-cyan-500/25 bg-gradient-to-b from-cyan-950/40 to-cyan-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-cyan-950/30 ring-1 ring-cyan-400/10">
                <h3 className="text-xs md:text-sm font-semibold text-cyan-300 mb-0.5 md:mb-1.5 tracking-tight">Large language models (LLMs)</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95">Reads, reasons, generates. Trained on huge datasets.</p>
              </div>
              <div className="rounded-lg md:rounded-xl border border-violet-500/25 bg-gradient-to-b from-violet-950/40 to-violet-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-violet-950/30 ring-1 ring-violet-400/10 min-w-0 overflow-hidden">
                <h3 className="text-xs md:text-sm font-semibold text-violet-300 mb-0.5 md:mb-1.5 tracking-tight">ChatGPT, Claude, Gemini</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95 break-words">You ask, they respond — one turn, no tools.</p>
              </div>
              <div className="rounded-lg md:rounded-xl border border-amber-500/25 bg-gradient-to-b from-amber-950/40 to-amber-950/20 py-2.5 px-3 md:py-4 md:px-5 shadow-lg shadow-amber-950/30 ring-1 ring-amber-400/10">
                <h3 className="text-xs md:text-sm font-semibold text-amber-300 mb-0.5 md:mb-1.5 tracking-tight">Key point</h3>
                <p className="text-[11px] md:text-xs leading-snug text-slate-300/95">Models answer. They don&apos;t act.</p>
              </div>
            </div>
            <div className="mt-4 pt-4 md:mt-8 md:pt-8 border-t border-slate-600/40 max-w-2xl mx-auto">
              <p className="text-[10px] md:text-[11px] font-medium uppercase tracking-widest text-slate-500 mb-2 md:mb-3 text-center">Match the model to the task</p>
              <ModelsSlideContent />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: What is an AI agent? */}
        {slideIndex === 16 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl mx-auto text-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>What is an AI agent?</h2>
            <p className="fctg-subtitle mt-1 max-w-2xl mx-auto md:whitespace-nowrap">Use agents for actions, not just answers. Like a person: model thinks, agent acts.</p>
            <div className="mt-4 md:mt-8 max-w-2xl mx-auto">
              <FCTGBodyAnalogyDiagram />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Prompt clarity */}
        {slideIndex === 20 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Prompt clarity</h2>
              <p className="fctg-subtitle mt-1">Be specific so the agent delivers — in both vibe and agentic modes.</p>
            </div>
            <div className="mt-4 md:mt-10 space-y-4 md:space-y-6">
              <style>{`
                  @keyframes fctg-typewriter-old { from { width: 0; } to { width: 14ch; } }
                  @keyframes fctg-typewriter-new {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 72ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-typewriter-old-4 { from { width: 0; } to { width: 18ch; } }
                  @keyframes fctg-typewriter-new-4 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 65ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-typewriter-old-5 { from { width: 0; } to { width: 10ch; } }
                  @keyframes fctg-typewriter-new-5 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 58ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-cursor-blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-type-old-4 { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-typewriter-old-4 1.5s steps(18) 0.5s forwards; }
                  .fctg-type-new-4 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-typewriter-new-4 2.5s steps(65) 2.5s forwards; }
                  .fctg-type-old { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-typewriter-old 1.5s steps(14) 6s forwards; }
                  .fctg-type-new { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-typewriter-new 3s steps(72) 8s forwards; }
                  .fctg-type-old-5 { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-typewriter-old-5 1.2s steps(10) 12s forwards; }
                  .fctg-type-new-5 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-typewriter-new-5 2s steps(58) 14s forwards; }
                  .fctg-type-old::after, .fctg-type-new::after, .fctg-type-old-4::after, .fctg-type-new-4::after, .fctg-type-old-5::after, .fctg-type-new-5::after {
                    content: '|'; animation: fctg-cursor-blink 0.7s step-end infinite; margin-left: 1px;
                  }
                `}</style>
              <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 sm:w-[30ch] sm:min-w-[30ch] sm:flex-none">
                      <p className="text-xs text-slate-500 mb-1">Vague</p>
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old-4">start my project</span>
                      </p>
                    </div>
                    <div className="flex-1 min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="text-xs text-cyan-400/80 mb-1">Specific</p>
                      <p className="font-mono text-sm text-cyan-200">
                        <span className="fctg-type-new-4">Open the portfolio project, start the dev server so I can preview locally.</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 sm:w-[30ch] sm:min-w-[30ch] sm:flex-none">
                      <p className="text-xs text-slate-500 mb-1">Vague</p>
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old">make a button</span>
                      </p>
                    </div>
                    <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="text-xs text-cyan-400/80 mb-1">Specific</p>
                      <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                        <span className="fctg-type-new">Create a React button with primary and secondary variants, hover state, and disabled state.</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 sm:w-[30ch] sm:min-w-[30ch] sm:flex-none">
                      <p className="text-xs text-slate-500 mb-1">Vague</p>
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old-5">test this</span>
                      </p>
                    </div>
                    <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="text-xs text-cyan-400/80 mb-1">Specific</p>
                      <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                        <span className="fctg-type-new-5">Add a Vitest + RTL test for Button: render, click, disabled state.</span>
                      </p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="mt-4 md:mt-10 text-center">
              <SlideQuote slideIndex={20} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 19: Vibe vs agentic */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Vibe vs agentic</h2>
              <p className="fctg-subtitle mt-1">Two modes. Choose based on the task.</p>
            </div>
            <div className="mt-4 md:mt-10 space-y-4 md:space-y-6">
              <style>{`
                  @keyframes fctg-vibe-type-1 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 75ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-vibe-type-2 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 48ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-vibe-type-3 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 52ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-agent-type-1 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 84ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-agent-type-2 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 77ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-agent-type-3 {
                    from { max-width: 0; overflow: hidden; white-space: nowrap; }
                    99% { max-width: 72ch; overflow: hidden; white-space: nowrap; }
                    to { max-width: none; overflow: visible; white-space: normal; }
                  }
                  @keyframes fctg-cursor-blink-va { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-vibe-type-1 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-vibe-type-1 2.5s steps(75) 0.5s forwards; }
                  .fctg-vibe-type-2 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-vibe-type-2 1.8s steps(48) 5s forwards; }
                  .fctg-vibe-type-3 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-vibe-type-3 1.9s steps(52) 9.5s forwards; }
                  .fctg-agent-type-1 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-agent-type-1 2.5s steps(84) 0.5s forwards; }
                  .fctg-agent-type-2 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-agent-type-2 2.5s steps(77) 5s forwards; }
                  .fctg-agent-type-3 { display: inline-block; max-width: 0; overflow: hidden; white-space: nowrap; animation: fctg-agent-type-3 2.2s steps(72) 9.5s forwards; }
                  .fctg-vibe-type-1::after, .fctg-vibe-type-2::after, .fctg-vibe-type-3::after,
                  .fctg-agent-type-1::after, .fctg-agent-type-2::after, .fctg-agent-type-3::after {
                    content: '|'; animation: fctg-cursor-blink-va 0.7s step-end infinite; margin-left: 1px;
                  }
                `}</style>
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 overflow-hidden sm:min-w-[38ch] sm:max-w-[45ch] sm:flex-none">
                    <p className="font-mono text-sm text-slate-300 overflow-hidden break-words">
                      <span className="fctg-vibe-type-1">&ldquo;How should I approach testing this app? I&apos;m not sure what to cover first.&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Vibe</p>
                  </div>
                  <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                    <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                      <span className="fctg-agent-type-1">&ldquo;Add Playwright tests for the login flow: valid credentials, invalid, empty fields.&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-cyan-400/80">Agentic</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 overflow-hidden sm:min-w-[38ch] sm:max-w-[45ch] sm:flex-none">
                    <p className="font-mono text-sm text-slate-300 overflow-hidden break-words">
                      <span className="fctg-vibe-type-2">&ldquo;What&apos;s a good way to structure this component?&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Vibe</p>
                  </div>
                  <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                    <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                      <span className="fctg-agent-type-2">&ldquo;Refactor this API route to use async/await and add error handling for 500s.&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-cyan-400/80">Agentic</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 overflow-hidden sm:min-w-[38ch] sm:max-w-[45ch] sm:flex-none">
                    <p className="font-mono text-sm text-slate-300 overflow-hidden break-words">
                      <span className="fctg-vibe-type-3">&ldquo;Can you help me think through the design for this?&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Vibe</p>
                  </div>
                  <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                    <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                      <span className="fctg-agent-type-3">&ldquo;Add a dark mode toggle to the nav. Persist preference in localStorage.&rdquo;</span>
                    </p>
                    <p className="mt-1 text-xs text-cyan-400/80">Agentic</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-10 text-center">
              <SlideQuote slideIndex={19} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: AI tools & agents — single vs multi-agent */}
        {slideIndex === 17 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-4">
            <div className="text-center mb-3">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Agent architectures</h2>
              <p className="fctg-subtitle mt-0.5 text-sm text-slate-400">Single system vs agentic multi-agent.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
              <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-600/50 p-3">
                <h3 className="text-slate-200 font-semibold text-xs mb-2 text-center">Single system</h3>
                <FCTGAIFlowDiagram compact />
                <FCTGAIFlowCaption compact />
              </div>
              <div className="flex-1 rounded-xl bg-slate-800/40 border border-slate-600/50 p-3">
                <h3 className="text-slate-200 font-semibold text-xs mb-2 text-center">Agentic multi-agent</h3>
                <FCTGMultiAgentDiagram compact />
                <FCTGMultiAgentCaption compact />
                <p className="mt-1 text-center text-slate-400 text-[10px] italic">Agent plans, coordinates with M/M/T, delegates; sub-agents can hand off.</p>
              </div>
            </div>
            <p className="mt-2 text-center text-slate-500 text-[10px] italic">Model = brain. Agent = hands.</p>
          </div>
        </Slide>
        )}

        {/* Slide 18: When to use single vs agentic */}
        {slideIndex === 18 && (
        <Slide transparent className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl flex flex-col items-center">
            <div className="w-full flex flex-col items-center text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block md:whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>When to use single vs agentic</h2>
              <p className="fctg-subtitle mt-1">Choose based on task complexity.</p>
            </div>
            <div className="mt-4 md:mt-10 max-w-2xl mx-auto grid gap-4 md:gap-6 sm:grid-cols-2">
              <div className="fctg-card py-5">
                <h3 className="fctg-card-title text-base mb-2">Single system</h3>
                <p className="fctg-card-text text-sm mb-2">Simpler tasks, one agent, straightforward flows.</p>
                <p className="text-xs text-cyan-400/90">Renames, refactors, single-step logic.</p>
              </div>
              <div className="fctg-card py-5">
                <h3 className="fctg-card-title text-base mb-2">Agentic multi-agent</h3>
                <p className="fctg-card-text text-sm mb-2">Complex tasks, parallel work, specialized sub-agents.</p>
                <p className="text-xs text-violet-400/90">Architecture decisions, multi-step logic, design systems.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 21: Context and continuity */}
        {slideIndex === 21 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 py-2 md:py-6">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Context and continuity</h2>
              <p className="fctg-subtitle mt-1 text-sm md:text-base">Sessions break. Context doesn&apos;t have to.</p>
            </div>
            {/* Diagram: learnings.md bridges sessions — CSS-based, elegant flow */}
            <div className="mt-3 md:mt-10 w-full max-w-2xl mx-auto min-w-0 overflow-hidden" aria-hidden>
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
            <div className="mt-2 md:mt-10 text-center">
              <SlideQuote slideIndex={21} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 22: Intervention */}
        {slideIndex === 22 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl px-4 py-4 md:py-8 mx-auto text-center flex flex-col items-center justify-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Intervention</h2>
            <p className="fctg-subtitle mt-1" style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.125rem)' }}>Verify outputs, redirect when they drift, reframe when looping.</p>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center items-center gap-2">
              {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift'].map((label) => (
                <span key={label} className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-300/90">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 23: Tech stack (merged with How this was built) — right after Intervention */}
        {slideIndex === 23 && (
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
                <div className="text-[10px] font-semibold uppercase tracking-wider text-teal-400 mb-2 text-center">Pipeline</div>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                    { name: 'Cursor', role: 'Code editor / AI' },
                    { name: 'GitHub', role: 'Version control' },
                    { name: 'Netlify', role: 'Deploy' },
                    { name: 'Namecheap', role: 'Domain / hosting' },
                  ].map((item, i) => (
                    <span key={item.name} className="inline-flex items-center gap-1">
                      {i > 0 && <span className="text-teal-400/60 text-xs shrink-0">→</span>}
                      <span className="inline-flex flex-col items-center gap-0.5 rounded-lg border border-teal-500/30 bg-teal-950/30 px-3 py-2 text-center">
                        <span className="text-xs font-medium text-teal-200">{item.name}</span>
                        <span className="text-[10px] text-teal-400/80">{item.role}</span>
                      </span>
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
                <div className="text-[10px] font-semibold uppercase tracking-wider text-violet-400 mb-2 text-center">Back end</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { name: 'Auth', role: 'Proposed' },
                    { name: 'Database', role: 'Proposed' },
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

        {/* Slide 24: Cursor + What happens when you prompt (ReAct) */}
        {slideIndex === 24 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-4 py-4 md:px-12 md:py-10">
            <div className="text-center mb-4 md:mb-8">
              <FCTGHeading variant="v2" as="h2" className="w-fit">Cursor</FCTGHeading>
              <p className="fctg-subtitle mt-0.5 text-sm">AI-powered editor. When you prompt: ReAct — reasoning + acting.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-12 items-start">
              <div className="relative rounded-xl overflow-visible ring-1 ring-cyan-500/30 w-full max-w-md mx-auto">
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
              <div className="py-2">
                <h3 className="text-sm font-semibold text-slate-300 mb-3">What happens when you prompt</h3>
                <div className="grid grid-cols-3 gap-3">
                  <style>{`
                    @keyframes fctg-react-step-in {
                      0% { opacity: 0; transform: translateY(8px); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    .fctg-react-step { opacity: 0; animation: fctg-react-step-in 0.5s ease-out forwards; }
                  `}</style>
                  {[
                    { label: 'Thought', desc: 'planning', color: 'border-cyan-500/40 bg-cyan-950/30', delay: '0s' },
                    { label: 'Response', desc: 'text streams', color: 'border-teal-500/40 bg-teal-950/30', delay: '0.2s' },
                    { label: 'Tool calls', desc: 'read, write, search, run', color: 'border-violet-500/40 bg-violet-950/30', delay: '0.4s' },
                    { label: 'Observation', desc: 'sees results', color: 'border-indigo-500/40 bg-indigo-950/30', delay: '0.6s' },
                    { label: 'Revise & loop', desc: 'adjusts, loops', color: 'border-fuchsia-500/40 bg-fuchsia-950/30', delay: '0.8s' },
                    { label: 'Done', desc: 'complete', color: 'border-emerald-500/40 bg-emerald-950/30', delay: '1s' },
                  ].map((step) => (
                    <div key={step.label} className={`fctg-react-step rounded-lg border px-3 py-2 ${step.color}`} style={{ animationDelay: step.delay }}>
                      <span className="text-xs font-semibold text-white block">{step.label}</span>
                      <span className="text-[10px] text-slate-400">{step.desc}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-slate-500">Simple prompts may skip the loop.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 25: GitHub */}
        {slideIndex === 25 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">GitHub</FCTGHeading>
              <p className="fctg-subtitle mt-1">Version control, collaboration, and the bridge between Cursor and deploy.</p>
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
                  <path d="M 0 80 L 400 80" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Branch track — smooth plateau at top, gentle rejoin */}
                  <path d="M 110 80 C 160 80 200 48 230 48 C 250 48 265 80 290 80" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8 6" fill="none" />
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

        {/* Slide 26: Netlify */}
        {slideIndex === 26 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">Netlify</FCTGHeading>
              <p className="fctg-subtitle mt-1">Deploy from Git. Preview branches. Edge functions. The final step in the pipeline.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-8 flex flex-col items-center justify-center w-full max-w-md">
                <img src="/images/netlify-logo.svg" alt="" className="h-20 w-20 brightness-0 invert opacity-90" aria-hidden />
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

        {/* Slide 27: Design systems */}
        {slideIndex === 27 && (
        <Slide transparent wide className="items-center justify-center overflow-hidden">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-4 md:gap-12 items-start">
            {/* Left: heading, subtitle, animated blocks, How we built this */}
            <div>
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design systems</h2>
              <p className="fctg-subtitle mt-1">Tokens, components, docs. The agent reads them.</p>
              <div className="mt-4 md:mt-6 flex justify-center md:justify-start gap-2" aria-hidden>
                <style>{`
                  @keyframes fctg-ds-block-in {
                    0% { opacity: 0; transform: scale(0.5) translateY(12px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(-2px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                  }
                  @keyframes fctg-ds-block-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-4px); }
                  }
                  .fctg-ds-block { animation: fctg-ds-block-in 0.5s ease-out forwards, fctg-ds-block-float 3s ease-in-out infinite; opacity: 0; }
                `}</style>
                {[
                  { w: 'w-12', h: 'h-8', color: 'bg-cyan-500/40 border-cyan-400/50', delay: '0s' },
                  { w: 'w-16', h: 'h-10', color: 'bg-violet-500/40 border-violet-400/50', delay: '0.1s' },
                  { w: 'w-10', h: 'h-6', color: 'bg-teal-500/40 border-teal-400/50', delay: '0.2s' },
                  { w: 'w-14', h: 'h-8', color: 'bg-fuchsia-500/40 border-fuchsia-400/50', delay: '0.3s' },
                  { w: 'w-8', h: 'h-10', color: 'bg-indigo-500/40 border-indigo-400/50', delay: '0.4s' },
                ].map((block, i) => (
                  <div
                    key={i}
                    className={`fctg-ds-block rounded-lg border ${block.w} ${block.h} ${block.color}`}
                    style={{ animationDelay: `${block.delay}, ${0.8 + i * 0.4}s` }}
                  />
                ))}
              </div>
              <div className="mt-4 md:mt-6 fctg-card py-3 md:py-4">
                <h3 className="fctg-card-title text-base mb-2">How we built this</h3>
                <p className="fctg-card-text text-sm leading-relaxed mb-2">
                  Started with Tailwind utilities. Extracted FCTGHeading, FCTGCard, FCTGLabelPill. These slides use them; the long-scroll page stays inline for scroll performance.
                </p>
                <p className="fctg-card-text text-sm leading-relaxed">
                  See <code className="text-cyan-400">/design-system</code> for the full reference. Or extend Chakra, Primer, Radix, Mantine, Polaris for accessibility and primitives.
                </p>
              </div>
            </div>
            {/* Right: Tokens & Specs */}
            <div className="flex flex-col gap-4">
              {[
                { title: 'Tokens & components', text: 'Spacing, color, typography. Agent outputs stay consistent.' },
                { title: 'Specs in docs', text: 'Figma, MD, Storybook. Point the agent at the source of truth.' },
              ].map(({ title, text }) => (
                <div key={title} className="fctg-card py-4">
                  <h3 className="fctg-card-title">{title}</h3>
                  <p className="fctg-card-text mt-1">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 28: Testing */}
        {slideIndex === 28 && (
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
              <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                <div className="fctg-card py-4">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2">Vibe</h5>
                  <p className="fctg-card-text text-sm">Single-shot, iterative. &quot;Add a unit test for this function.&quot; You review inline, tweak, repeat.</p>
                </div>
                <div className="fctg-card py-4">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">Agentic</h5>
                  <p className="fctg-card-text text-sm">Multi-step, autonomous. &quot;Add test coverage for the checkout flow — unit tests and an E2E with Playwright.&quot;</p>
                </div>
              </div>
              <p className="text-xs text-cyan-400/80 text-center">This deck: 75 tests — unit, integration, E2E. Full coverage uncovers gaps; thorough testing keeps changes from breaking what works.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 29: Helpful tips */}
        {slideIndex === 29 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 min-w-0">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Helpful tips</h2>
              <p className="fctg-subtitle mt-1">Workflow pointers.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="grid gap-3 md:gap-4 sm:grid-cols-2">
                {[
                  { title: 'Split view', text: 'Code + chat visible. Live reload.' },
                  { title: 'Specs in MD', text: 'Notes, test plans. Agent reads them.' },
                  { title: 'Watch & debug', text: 'Terminal, reasoning, DevTools. Learn the pattern.' },
                  { title: 'Pace yourself', text: 'Queue prompts, break into steps. Patience pays off.' },
                ].map(({ title, text }) => (
                  <div key={title} className="fctg-card py-4">
                    <h3 className="fctg-card-title">{title}</h3>
                    <p className="fctg-card-text mt-1">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 30: Activity — problem + logistics */}
        {slideIndex === 30 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-2 md:py-6">
            <div className="text-center mb-3 md:mb-4">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity</h2>
              <p className="fctg-subtitle mt-0.5 text-sm md:text-base">Vibe vs agentic showdown</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">Problem</h4>
                <h3 className="text-base md:text-lg font-semibold text-cyan-100">Mars booking flow</h3>
                <p className="mt-1 text-xs md:text-sm text-cyan-200/90">Checkout: dates, cabin, add-ons. Same problem — compare vibe vs agentic.</p>
              </div>
              <div className="rounded-xl border border-amber-500/25 bg-amber-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">Artifacts</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">Agent responses, prompts, generated UI/copy</p>
              </div>
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Outcomes</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">Vibe vs agentic comparison, reusable pattern, prompts to take away</p>
              </div>
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-3 md:p-4">
                <h4 className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">Logistics</h4>
                <p className="text-xs md:text-sm text-cyan-200/90">Miro/FigJam, pairs, <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ChatGPT</a>/<a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">DeepSeek</a>/<a href="https://theturbochat.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">TurboChat</a>, cheat sheet</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 31: Activity — rounds */}
        {slideIndex === 31 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity</h2>
              <p className="fctg-subtitle mt-1">Rounds</p>
            </div>
            <p className="text-sm text-cyan-200/90 mb-4 md:mb-6 text-center">Same problem, two modes. Pairs pick team names. Best Mars checkout prompt wins bragging rights.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="rounded-xl border border-violet-500/30 bg-violet-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">Round 1 · ~15 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Start with vibe</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Explore flows and tone. Try: &quot;How would you approach designing a checkout for a Mars trip?&quot; Chat, iterate, go wild.</p>
                <p className="mt-2 text-xs text-cyan-400/70">Single-shot, iterative. Exploratory.</p>
              </div>
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-400">Round 2 · ~25 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Level up to agentic</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Give AI a clear mission. Try: &quot;Create a 3-step checkout for a Mars trip: step 1 — departure date picker; step 2 — cabin selection (economy, business, first); step 3 — add-ons and terms. Include copy and layout.&quot;</p>
                <p className="mt-2 text-xs text-cyan-400/70">Multi-step, defined outcome. Goal-driven.</p>
              </div>
              <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">Round 3 · ~15 min</span>
                <h4 className="mt-2 text-base font-semibold text-cyan-100">Show & tell</h4>
                <p className="mt-2 text-sm text-cyan-200/80">Share the best Mars checkout outputs — vibe vs agentic. Vote on MVP prompt. Quick poll, then wrap.</p>
                <p className="mt-2 text-sm text-cyan-300/90 italic">Debrief: How could this apply to our Earth bookings?</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 32: Activity — run sheet */}
        {slideIndex === 32 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-4 md:px-6 py-4 md:py-10">
            <div className="text-center mb-4 md:mb-6">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity</h2>
              <p className="fctg-subtitle mt-1">Run sheet (1 hour total)</p>
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
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:00</td><td className="py-2 pr-4">2 min</td><td className="py-2">Intro: Problem = Mars booking flow. Explain vibe vs agentic. Pair up, pick team names.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:02</td><td className="py-2 pr-4">15 min</td><td className="py-2"><strong>Round 1 — Vibe:</strong> Explore flows and tone. Chat, iterate.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:17</td><td className="py-2 pr-4">2 min</td><td className="py-2">Transition: Explain agentic.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:19</td><td className="py-2 pr-4">25 min</td><td className="py-2"><strong>Round 2 — Agentic:</strong> Create 3-step checkout. One prompt, full outcome.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:44</td><td className="py-2 pr-4">15 min</td><td className="py-2"><strong>Round 3 — Show & tell:</strong> Share outputs. Vote on MVP prompt. Debrief: How could this apply to our Earth bookings? Wrap.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:59</td><td className="py-2 pr-4">1 min</td><td className="py-2">Buffer / wrap.</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-cyan-400/70">Tip: Keep time visible. Call out at 5 min left in each round. For remote, use breakout rooms during rounds.</p>
          </div>
        </Slide>
        )}

      {/* Slide 33: Opportunity */}
      {slideIndex === 33 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>An opportunity of a lifetime</h2>
              <p className="fctg-subtitle text-base md:text-xl leading-relaxed mt-2 md:mt-4">
            AI won&apos;t replace designers — but designers who work with AI will have an edge. Amplify empathy, judgment, creativity. Embrace the tools, question the outputs, keep the human at the centre.
          </p>
            <div className="mt-4 md:mt-10 flex flex-wrap justify-center gap-2 md:gap-3">
            {['AI is in its infancy', 'Creating massive value', 'Move fast', 'Understand where needed', 'Pause and reflect — The speed of thinking and questioning itself is incredible'].map((tag) => (
              <span key={tag} className="fctg-tag">
                {tag}
              </span>
            ))}
            </div>
            <div className="mt-4 md:mt-10 text-center">
              <SlideQuote slideIndex={33} />
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
