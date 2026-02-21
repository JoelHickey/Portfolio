import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import WaterAscii from './WaterAscii'
import WeavingLoom from './WeavingLoom'
import WiderEnvironmentCanvas from './WiderEnvironmentCanvas'
import EmpowermentHealthDrawing from './EmpowermentHealthDrawing'
import ParticleBackground from './ParticleBackground'
import OrbitalTrailsBackground from './OrbitalTrailsBackground'
import BatteryParticleFill from './BatteryParticleFill'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser, FiTarget, FiRefreshCw, FiCornerUpRight, FiShield, FiFileText, FiActivity } from 'react-icons/fi'
import FCTGHeading from './design-system/fctg/FCTGHeading'

const SLIDE_COUNT = 30

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
  19: null,
  20: null,
  21: { quote: 'Free from intellect, free from abstraction, The Vibe Coder leads all things back to natural self-sufficiency.', attribution: '— Rick Rubin, The Way of Code' },
  22: null,
  23: null,
  24: null,
  25: null,
  26: null,
  27: null,
  28: { quote: 'Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns.', attribution: '— Rick Rubin, The Way of Code' },
  29: null,
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
    <div className="flex flex-wrap gap-6 justify-center">
        <div className="fctg-card flex-1 min-w-[200px]">
          <h4 className="flex items-center gap-2 text-base font-semibold text-teal-400">
            <FiZap className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Quick
          </h4>
          <p className="fctg-card-text">Sonnet, GPT-4o-mini — renames, typos, style tweaks.</p>
        </div>
        <div className="fctg-card flex-1 min-w-[200px]">
          <h4 className="flex items-center gap-2 text-base font-semibold text-violet-400">
            <FiTarget className="h-4 w-4 shrink-0" strokeWidth={1.5} />
            Complex
          </h4>
          <p className="fctg-card-text">Opus, GPT-4o — architecture, multi-step logic, design decisions.</p>
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
          : { minHeight: '100vh', padding: '6rem 4rem' }),
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
      {/* Slide 1: Title — original WaterAscii + scanline + grid */}
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
      {/* Slide 3: Looking back */}
      {slideIndex === 2 && (
        <div className="fctg-pattern-flow-lines pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
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
      {/* Slide 5 */}
      {slideIndex === 4 && (
        <div className="fctg-pattern-dot-matrix pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 6 */}
      {slideIndex === 5 && (
        <div className="fctg-pattern-constellation pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
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
      {/* Slide 11: Imagination */}
      {slideIndex === 10 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="imagination" />
        </div>
      )}
      {/* Slide 12: Empowerment */}
      {/* Slide 13: Mystical Code */}
      {slideIndex === 12 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="mystical" />
        </div>
      )}
      {/* Slide 14: Calmness */}
      {slideIndex === 13 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="calmness" />
        </div>
      )}
      {/* Slide 15: Building momentum */}
      {slideIndex === 14 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="momentum" />
        </div>
      )}
      {/* Slide 16: The agents — Models, 17: Prompt clarity, 18: Vibe vs agentic */}
      {slideIndex === 15 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 18: Vibe vs agentic */}
      {slideIndex === 16 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground variant="agents" />
        </div>
      )}
      {/* Slide 19: Context and continuity */}
      {slideIndex === 17 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 20: Intervention */}
      {slideIndex === 18 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 20: Tooling */}
      {slideIndex === 19 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 21: Cursor */}
      {slideIndex === 20 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 22: GitHub */}
      {slideIndex === 21 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 23: Netlify */}
      {slideIndex === 22 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 24: Tech stack & testing */}
      {slideIndex === 23 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 25: Design systems */}
      {slideIndex === 24 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 26: Helpful tips */}
      {slideIndex === 25 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 27: Activity */}
      {slideIndex === 26 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 28: Activity details */}
      {slideIndex === 27 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 29: Opportunity */}
      {slideIndex === 28 && (
        <div className="fctg-pattern-mesh pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}

      {/* Slide content */}
      <div className={`relative z-20 h-full overflow-x-hidden ${slideIndex === 0 ? 'overflow-y-hidden' : 'overflow-y-auto'}`}>
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
                  <h2 className="fctg-heading whitespace-nowrap text-[0.65rem] min-[360px]:text-[0.9rem] min-[440px]:text-[1.1rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Looking back to look ahead</h2>
                  <p className="fctg-subtitle mt-1 text-lg tracking-wide text-slate-300">Craft, tools, and what stays human.</p>
                </div>
                <div className="mt-10 w-full max-w-6xl text-center">
                  <div className="grid grid-cols-4 gap-8 min-w-0">
                      {[
                        { title: 'The weavers', text: 'Craft redefined, not replaced.', color: '#22d3ee' },
                        { title: 'Replacing the cart', text: 'The leap matters more than the increment.', color: '#2dd4bf' },
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

        {/* Slide 3: Questioning the fundamentals */}
        {slideIndex === 2 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Questioning the fundamentals</h2>
              <p className="fctg-subtitle mt-1">Do design principles change — or are new ones added?</p>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-16">
              <img src="/images/AI talk/appleguidlines87.png" alt="Apple Human Interface Guidelines" className="fctg-book-img max-h-64 w-auto rounded-xl object-contain -rotate-2" />
              <img src="/images/AI talk/designforpeople.webp" alt="Designing for People by Henry Dreyfuss" className="fctg-book-img max-h-64 w-auto rounded-xl object-contain rotate-1" />
              <img src="/images/AI talk/win95guidimage.png" alt="Windows 95 interface guidelines" className="fctg-book-img max-h-64 w-auto rounded-xl object-contain brightness-110 -rotate-1" />
            </div>
            <div className="mt-10 text-center">
              <SlideQuote slideIndex={3} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 4: Designer process */}
        {slideIndex === 3 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Designer process</h2>
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

        {/* Slide 5: Wider environment */}
        {slideIndex === 4 && (
        <Slide heroOnly transparent hero={
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pt-24">
              <WiderEnvironmentCanvas width={Math.min(viewport.w, viewport.h) * 0.55} height={Math.min(viewport.w, viewport.h) * 0.55} className="text-cyan-500/80" />
            </div>
            <div key={slideIndex} className="fctg-text-transition relative z-10 flex flex-col items-center justify-start pt-16 min-h-screen px-8 pb-16 pointer-events-none bg-gradient-to-b from-black/40 via-transparent via-20% to-transparent">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The wider environment</h2>
              <p className="fctg-subtitle mt-1 drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">Where are the bottlenecks? Who owns them?</p>
            </div>
          </div>
        } />
        )}

        {/* Slide 6: Energy */}
        {slideIndex === 5 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
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
              <div className="relative w-full max-w-[960px]" style={{ aspectRatio: '1100/280' }}>
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

        {/* Slide 7: Strength */}
        {slideIndex === 6 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: content */}
            <div className="max-w-md">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] md:whitespace-nowrap inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Strength</h2>
              <p className="fctg-subtitle mt-1">AI guided me through a structural design problem</p>
              <div className="mt-6 flex flex-col gap-4" aria-hidden>
                <style>{`
                  @keyframes fctg-strength-prompt-type { from { width: 0; } to { width: 30ch; } }
                  @keyframes fctg-strength-agent-type { from { width: 0; } to { width: 75ch; } }
                  @keyframes fctg-strength-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-strength-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-prompt-type 1.5s steps(30) 0s forwards; }
                  .fctg-strength-agent-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-strength-agent-type 2.5s steps(75) 2s forwards; }
                  .fctg-strength-prompt-type::after, .fctg-strength-agent-type::after { content: '|'; animation: fctg-strength-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
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

        {/* Slide 8: Speed */}
        {slideIndex === 7 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            {/* Left: title, subtitle, prompt */}
            <div className="max-w-md">
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
              <div className="mt-6" aria-hidden>
                <style>{`
                  @keyframes fctg-speed-prompt-type { from { width: 0; } to { width: 40ch; } }
                  @keyframes fctg-speed-cursor { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
                  .fctg-speed-prompt-type { display: inline-block; overflow: hidden; white-space: nowrap; width: 0; animation: fctg-speed-prompt-type 2s steps(40) 0s forwards; }
                  .fctg-speed-prompt-type::after { content: '|'; animation: fctg-speed-cursor 0.7s step-end infinite; margin-left: 1px; color: #22d3ee; }
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

        {/* Slide 9: Iteration */}
        {slideIndex === 8 && (
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

        {/* Slide 10: Imagination */}
        {slideIndex === 9 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <div className="inline-flex flex-col gap-2">
                <p className="fctg-card-text flex items-baseline justify-center gap-x-2 whitespace-nowrap">
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

        {/* Slide 11: Empowerment */}
        {slideIndex === 10 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
              <p className="fctg-subtitle mt-1">Build things that add value to your life.</p>
            </div>
            <div className="flex justify-center md:justify-end">
              <EmpowermentHealthDrawing />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 12: Mystical Code */}
        {slideIndex === 11 && (
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

        {/* Slide 13: Calmness */}
        {slideIndex === 12 && (
        <Slide transparent wide className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Calmness</h2>
              <p className="fctg-subtitle mt-1">Less friction, more space to think.</p>
            </div>
            <div className="w-full max-w-5xl mt-10 text-center">
              <SlideQuote slideIndex={13} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 14: Building momentum */}
        {slideIndex === 13 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Building momentum</h2>
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

        {/* Slide 15: The agents — Models */}
        {slideIndex === 14 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The agents</h2>
              <p className="fctg-subtitle mt-1">Choose the right model for the job.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <ModelsSlideContent />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: Prompt clarity */}
        {slideIndex === 15 && (
        <Slide transparent className="items-center justify-center overflow-y-auto" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Prompt clarity</h2>
              <p className="fctg-subtitle mt-1">Be specific so the agent delivers.</p>
            </div>
            <div className="mt-10 space-y-6">
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
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old-4">start my project</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Vague</p>
                    </div>
                    <div className="flex-1 min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="font-mono text-sm text-cyan-200">
                        <span className="fctg-type-new-4">Open 'x' project directory, start the dev server so I preview my app locally.</span>
                      </p>
                      <p className="mt-1 text-xs text-cyan-400/80">Specific</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 sm:w-[30ch] sm:min-w-[30ch] sm:flex-none">
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old">make a button</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Vague</p>
                    </div>
                    <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                        <span className="fctg-type-new">Create a React button with primary and secondary variants, hover state, and disabled state.</span>
                      </p>
                      <p className="mt-1 text-xs text-cyan-400/80">Specific</p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 min-w-0 rounded-lg border border-slate-600/50 bg-slate-900/50 px-4 py-3 sm:w-[30ch] sm:min-w-[30ch] sm:flex-none">
                      <p className="font-mono text-sm text-slate-300">
                        <span className="fctg-type-old-5">test this</span>
                      </p>
                      <p className="mt-1 text-xs text-slate-500">Vague</p>
                    </div>
                    <div className="flex-[1.5] min-w-0 rounded-lg border border-cyan-500/40 bg-cyan-950/30 px-4 py-3">
                      <p className="font-mono text-sm text-cyan-200 overflow-x-auto">
                        <span className="fctg-type-new-5">Add a Vitest + RTL test for Button: render, click, disabled state.</span>
                      </p>
                      <p className="mt-1 text-xs text-cyan-400/80">Specific</p>
                    </div>
                  </div>
              </div>
            </div>
            <div className="mt-10 text-center">
              <SlideQuote slideIndex={17} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: Vibe vs agentic */}
        {slideIndex === 16 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Vibe vs agentic</h2>
              <p className="fctg-subtitle mt-1">Two modes. Know when to use each.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="fctg-card py-5">
                  <h3 className="fctg-card-title">Vibe</h3>
                  <p className="fctg-card-text mt-2">Conversational, exploratory. Chat, iterate, discover. Great for ideation, learning, and open-ended work.</p>
                  <p className="mt-3 rounded-lg border border-slate-600/50 bg-slate-900/50 px-3 py-2 font-mono text-xs text-slate-300">
                    &ldquo;How should I approach testing this app? I&apos;m not sure what to cover first.&rdquo;
                  </p>
                </div>
                <div className="fctg-card py-5">
                  <h3 className="fctg-card-title">Agentic</h3>
                  <p className="fctg-card-text mt-2">Goal-driven, autonomous. Clear task, agent executes steps. Great for implementation, refactors, and defined outcomes.</p>
                  <p className="mt-3 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-2 font-mono text-xs text-cyan-200">
                    &ldquo;Add Playwright tests for the login flow: valid credentials, invalid, empty fields.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 18: Context and continuity */}
        {slideIndex === 17 && (
        <Slide transparent className="items-center justify-center overflow-hidden" wide>
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading whitespace-nowrap" style={{ fontSize: 'clamp(0.875rem, 2.8vw, 2.75rem)', background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Context and continuity</h2>
              <p className="fctg-subtitle mt-1">Sessions break. Context doesn&apos;t have to.</p>
            </div>
            {/* Diagram: learnings.md bridges sessions — CSS-based, elegant flow */}
            <div className="mt-10 w-full max-w-2xl mx-auto" aria-hidden>
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
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-full border-2 border-cyan-500/80 flex items-center justify-center bg-cyan-950/40">
                    <span className="text-xs font-medium text-cyan-200">Session</span>
                  </div>
                  <span className="mt-1 text-[10px] text-slate-500">yesterday</span>
                </div>
                <div className="flex-1 min-w-0 fctg-context-line" />
                <div className="flex flex-col items-center shrink-0 px-4 py-3 rounded-xl border border-cyan-500/50 bg-cyan-950/30">
                  <span className="font-mono text-sm font-semibold text-cyan-50">learnings.md</span>
                  <span className="text-[10px] text-slate-400">your continuity</span>
                </div>
                <div className="flex-1 min-w-0 fctg-context-line" />
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-14 h-14 rounded-full border-2 border-violet-500/80 flex items-center justify-center bg-violet-950/30">
                    <span className="text-xs font-medium text-violet-200">New</span>
                  </div>
                  <span className="mt-1 text-[10px] text-slate-500">session</span>
                </div>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-slate-400">Point at files · Paste snippets · Reference learnings</p>
            <div className="mt-10 text-center">
              <SlideQuote slideIndex={17} />
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Intervention */}
        {slideIndex === 18 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Intervention</h2>
              <p className="fctg-subtitle mt-1 whitespace-nowrap" style={{ fontSize: 'clamp(0.75rem, 2.2vw, 1.125rem)' }}>Verify outputs, redirect when they drift, reframe when looping.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto space-y-6 text-center">
              <div className="flex flex-wrap justify-center items-center gap-2">
                {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift'].map((label) => (
                  <span key={label} className="rounded-full border border-amber-500/30 bg-amber-500/5 px-3 py-1 text-xs font-medium text-amber-300/90">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Tooling */}
        {slideIndex === 19 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-3xl px-6 py-8 mx-auto text-center flex flex-col items-center justify-center">
            <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Tooling</h2>
            <p className="fctg-subtitle mt-1">How this was built.</p>
            <div className="mt-10 flex flex-col items-center">
              <h3 className="fctg-card-title mb-2">Pipeline</h3>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-2 rounded-md bg-violet-500/80 px-2.5 py-1.5 text-xs font-semibold text-white" style={{ animation: 'fctg-pipeline-pulse 2s ease-in-out infinite' }}>Cursor</span>
                <span className="shrink-0 text-cyan-400 text-xs" style={{ animation: 'fctg-pipeline-arrow 1.2s ease-in-out infinite' }}>→</span>
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-600/90 px-2.5 py-1.5 text-xs font-semibold text-white" style={{ animation: 'fctg-pipeline-pulse 2s ease-in-out infinite 0.2s' }}>GitHub</span>
                <span className="shrink-0 text-cyan-400 text-xs" style={{ animation: 'fctg-pipeline-arrow 1.2s ease-in-out infinite 0.15s' }}>→</span>
                <span className="inline-flex items-center gap-2 rounded-md bg-teal-500/80 px-2.5 py-1.5 text-xs font-semibold text-white" style={{ animation: 'fctg-pipeline-pulse 2s ease-in-out infinite 0.4s' }}>Netlify</span>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 21: Cursor */}
        {slideIndex === 20 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">Cursor</FCTGHeading>
              <p className="fctg-subtitle mt-1">AI-powered code editor built on VS Code.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <div className="relative rounded-xl overflow-visible ring-1 ring-cyan-500/30 w-full max-w-full">
                <img
                  src="/images/AI talk/cursor-window.png"
                  alt="Cursor IDE window showing code editor and AI chat panel"
                  className="w-full h-auto object-contain rounded-xl"
                />
                <div className="absolute left-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                  <div className="rounded-lg bg-violet-500/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-violet-400/50">Chat</div>
                  <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </div>
                <div className="absolute left-[50%] top-[30%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-teal-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div className="rounded-lg bg-teal-500/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-teal-400/50">Code editor</div>
                </div>
                <div className="absolute right-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-amber-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div className="rounded-lg bg-amber-500/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-amber-400/50">File directory</div>
                </div>
                <div className="absolute left-[8%] bottom-[22%] flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-indigo-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  <div className="rounded-lg bg-indigo-500/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm ring-1 ring-indigo-400/50">Select agent</div>
                </div>
                <div className="absolute left-[50%] bottom-[8%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                  <div className="rounded-lg bg-slate-600/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">Terminal</div>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 22: GitHub */}
        {slideIndex === 21 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">GitHub</FCTGHeading>
              <p className="fctg-subtitle mt-1">Version control, collaboration, and the bridge between Cursor and deploy.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
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
                  {/* Sleepers on main */}
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <rect key={i} x={25 + i * 28} y={74} width={12} height={12} rx={1} fill="#334155" opacity="0.6" />
                  ))}
                  {/* Main rail */}
                  <path d="M 0 80 L 400 80" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Branch track */}
                  <path d="M 110 80 C 140 80 165 42 205 38 C 245 34 262 80 282 80 L 290 80" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  {/* Trains on main */}
                  <g>
                    <rect x="-12" y="-6" width="24" height="12" rx="2" fill="#22d3ee" stroke="rgba(255,255,255,0.4)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" />
                    </rect>
                  </g>
                  <g>
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#818cf8" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" begin="1.2s" />
                    </rect>
                  </g>
                  <g>
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#a78bfa" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="4s" repeatCount="indefinite" path="M 10 80 L 390 80" begin="2.4s" />
                    </rect>
                  </g>
                  {/* Train on branch */}
                  <g>
                    <rect x="-10" y="-5" width="20" height="10" rx="2" fill="#2dd4bf" stroke="rgba(255,255,255,0.3)" strokeWidth="1">
                      <animateMotion dur="5s" repeatCount="indefinite" path="M 110 80 C 140 80 165 42 205 38 C 245 34 262 80 282 80 L 290 80" rotate="auto" begin="0.8s" />
                    </rect>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 23: Netlify */}
        {slideIndex === 22 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-6xl px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center">
            <div className="flex-1 min-w-0 flex flex-col justify-center overflow-visible">
              <FCTGHeading variant="v2" as="h2" className="w-fit">Netlify</FCTGHeading>
              <p className="fctg-subtitle mt-1">Deploy from Git. Preview branches. Edge functions. The final step in the pipeline.</p>
            </div>
            <div className="flex-1 min-w-0 flex items-center justify-center">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-12 flex flex-col items-center justify-center">
                <img src="/images/netlify-logo.svg" alt="" className="h-24 w-24 brightness-0 invert opacity-90" aria-hidden />
                <p className="mt-4 text-sm text-cyan-200/80 text-center">Push to main → automatic deploy</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 24: Tech stack & testing */}
        {slideIndex === 23 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Tech stack & testing</h2>
              <p className="fctg-subtitle mt-1">React, Vite, Tailwind. Vitest, Playwright.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto space-y-6">
              <div>
                <h4 className="fctg-card-title mb-3">Tech stack</h4>
                <div className="flex flex-wrap gap-3 justify-center">
                  {[
                    { name: 'React', role: 'UI framework' },
                    { name: 'Vite', role: 'Build tool' },
                    { name: 'Tailwind', role: 'CSS framework' },
                  ].map(({ name, role }) => (
                    <span key={name} className="inline-flex flex-col items-start gap-0.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-2">
                      <span className="text-xs font-medium text-cyan-200">{name}</span>
                      <span className="text-[10px] text-cyan-400/80">{role}</span>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="fctg-card-title mb-3">Testing</h4>
                <div className="flex flex-wrap gap-3 justify-center mb-4">
                  {[
                    { name: 'Vitest', role: 'Unit tests' },
                    { name: 'Playwright', role: 'End-to-end tests' },
                  ].map(({ name, role }) => (
                    <span key={name} className="inline-flex flex-col items-start gap-0.5 rounded-lg border border-cyan-500/30 bg-cyan-950/30 px-3 py-2">
                      <span className="text-xs font-medium text-cyan-200">{name}</span>
                      <span className="text-[10px] text-cyan-400/80">{role}</span>
                    </span>
                  ))}
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="fctg-card py-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2">Vibe</h5>
                    <p className="fctg-card-text text-sm">Single-shot, iterative. &quot;Add a unit test for this function.&quot; You review inline, tweak, repeat.</p>
                  </div>
                  <div className="fctg-card py-4">
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">Agentic</h5>
                    <p className="fctg-card-text text-sm">Multi-step, autonomous. &quot;Add test coverage for the checkout flow — unit tests and an E2E with Playwright.&quot;</p>
                  </div>
                </div>
                <p className="text-xs text-cyan-400/80 mt-2">Full coverage uncovers gaps; thorough testing keeps changes from breaking what works.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 25: Design systems */}
        {slideIndex === 24 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Design systems</h2>
              <p className="fctg-subtitle mt-1">Tokens, components, docs. The agent reads them.</p>
            </div>
            <div className="mt-8 max-w-2xl mx-auto fctg-card py-4">
              <h3 className="fctg-card-title text-base mb-2">How we built this (v1 & v2)</h3>
              <p className="fctg-card-text text-sm leading-relaxed mb-2">
                <strong>Started with Tailwind default CSS.</strong> Both v1 (long-scroll) and v2 (these slides) began with raw utility classes applied inline.
              </p>
              <p className="fctg-card-text text-sm leading-relaxed mb-2">
                <strong>Extracted a design system.</strong> FCTGHeading (v1 light / v2 dark), FCTGCard, FCTGLabelPill. v2 uses them; v1 uses inline Tailwind for scroll performance. See /design-system for the full reference.
              </p>
              <p className="fctg-card-text text-sm leading-relaxed">
                <strong>Hook into existing systems.</strong> Extend Chakra, Primer, Radix, Mantine, Material UI, Ant Design, Polaris (Shopify) for accessibility and primitives.
              </p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
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
          </div>
        </Slide>
        )}

        {/* Slide 26: Helpful tips */}
        {slideIndex === 25 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Helpful tips</h2>
              <p className="fctg-subtitle mt-1">Workflow pointers.</p>
            </div>
            <div className="mt-10 max-w-2xl mx-auto">
              <div className="grid gap-4 sm:grid-cols-2">
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

        {/* Slide 27: Activity */}
        {slideIndex === 26 && (
        <Slide transparent scrollable className="items-start justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-6 py-10">
            <div className="text-center mb-10">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>Activity</h2>
              <p className="fctg-subtitle mt-1">Vibe vs agentic showdown</p>
            </div>
            <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-5 mb-8">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">Problem to solve</h4>
              <h3 className="text-lg font-semibold text-cyan-100">Mars booking flow</h3>
              <p className="mt-2 text-sm text-cyan-200/90">Design the checkout for a trip to Mars: departure dates, cabin selection, add-ons. Everyone works on the same problem — compare how vibe vs agentic approaches it.</p>
            </div>
            <p className="text-sm text-cyan-200/90 mb-6">Same problem, two modes. Pairs pick team names. Best Mars checkout prompt wins bragging rights.</p>
            <div className="grid gap-4 md:grid-cols-3">
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
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 28: Activity details — run sheet, logistics, other activities */}
        {slideIndex === 27 && (
        <Slide transparent scrollable className="items-start justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl px-6 py-10">
            <h3 className="text-lg font-semibold text-cyan-100 mb-4">Run sheet (1 hour total)</h3>
            <div className="overflow-x-auto rounded-xl border border-cyan-500/30 bg-cyan-950/20 mb-6 px-4">
              <table className="w-full text-sm text-left">
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
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:44</td><td className="py-2 pr-4">15 min</td><td className="py-2"><strong>Round 3 — Show & tell:</strong> Share outputs. Vote on MVP prompt. Wrap.</td></tr>
                  <tr className="border-b border-cyan-500/20"><td className="py-2 pr-4 font-mono text-cyan-400">0:59</td><td className="py-2 pr-4">1 min</td><td className="py-2">Buffer / wrap.</td></tr>
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-4">
                <h4 className="text-base font-semibold text-cyan-100 mb-2">Logistics (in-person + remote)</h4>
                <ul className="space-y-1.5 text-sm text-cyan-200/90">
                  <li><strong className="text-cyan-200">Shared context:</strong> Miro/FigJam or shared doc for prompts and outputs</li>
                  <li><strong className="text-cyan-200">Pairing:</strong> Breakout rooms for remote; in-person pairs. Pick a team name.</li>
                  <li><strong className="text-cyan-200">Tools:</strong> <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ChatGPT</a>, <a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">DeepSeek</a>, <a href="https://theturbochat.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">The TurboChat</a></li>
                  <li><strong className="text-cyan-200">Materials:</strong> One-page cheat sheet: Mars checkout vibe vs agentic prompt examples</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-cyan-400/70">Tip: Keep time visible. Call out at 5 min left in each round. For remote, use breakout rooms during rounds.</p>
          </div>
        </Slide>
        )}

        {/* Slide 29: Opportunity */}
        {slideIndex === 28 && (
        <Slide transparent className="items-center justify-center">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-5xl">
            <div className="max-w-md mx-auto text-center">
              <h2 className="fctg-heading !text-[2.25rem] md:!text-[2.75rem]" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>An opportunity of a lifetime</h2>
              <p className="fctg-subtitle text-xl leading-relaxed mt-4">
            AI won&apos;t replace designers — but designers who work with AI will have an edge. Amplify empathy, judgment, creativity. Embrace the tools, question the outputs, keep the human at the centre.
          </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['AI is in its infancy', 'Creating massive value', 'Move fast', 'Understand where needed', 'Pause and reflect — The speed of thinking and questioning itself is incredible'].map((tag) => (
              <span key={tag} className="fctg-tag">
                {tag}
              </span>
            ))}
            </div>
            <div className="mt-10 text-center">
              <SlideQuote slideIndex={28} />
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

      {/* Back link */}
      <Link
        to="/stories"
        className="fixed left-6 top-6 z-[70] flex items-center gap-2 text-sm tracking-wide text-cyan-400/90 transition hover:text-cyan-300"
      >
        <span aria-hidden>←</span>
        Back to Stories
      </Link>
    </div>
  )
}

export default FCTGAITalkSlides
