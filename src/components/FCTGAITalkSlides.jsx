import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import WaterAscii from './WaterAscii'
import WeavingLoom from './WeavingLoom'
import WiderEnvironmentCanvas from './WiderEnvironmentCanvas'
import HealthMonitor from './HealthMonitor'
import ParticleBackground from './ParticleBackground'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser } from 'react-icons/fi'

const SLIDE_COUNT = 20

function Slide({ children, className = '', hero, heroOnly, transparent, scrollable }) {
  const isFullViewport = heroOnly && transparent
  const heroOverflow = scrollable ? 'overflow-y-auto' : 'overflow-hidden'
  return (
    <div
      className={`flex w-full flex-col items-center ${hero ? 'justify-start' : 'justify-center'} ${className}`}
      style={{
        ...(isFullViewport
          ? { height: '100vh', minHeight: '100vh', overflow: 'hidden', padding: 0 }
          : { minHeight: '100vh', padding: '4rem 2rem' }),
        ...(transparent
          ? { background: 'transparent' }
          : {
              background: 'linear-gradient(180deg, rgba(10, 14, 23, 0.92) 0%, rgba(13, 19, 33, 0.94) 50%, rgba(10, 14, 23, 0.92) 100%)',
              borderBottom: '1px solid rgba(34, 211, 238, 0.15)',
            }),
      }}
    >
      {hero && <div className={`relative w-screen max-w-none self-center ${heroOverflow} ${heroOnly ? 'h-screen min-h-screen' : ''}`} style={{ width: '100vw', marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>{hero}</div>}
      {!heroOnly && <div className={`mx-auto w-full max-w-4xl ${hero ? 'mt-8' : ''}`}>{children}</div>}
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
      {/* Slide 2 */}
      {slideIndex === 1 && (
        <div className="fctg-pattern-flow-lines pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 3: Questioning the fundamentals — animated blob background */}
      {slideIndex === 2 && (
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
      {/* Slide 4 */}
      {slideIndex === 3 && (
        <div className="fctg-pattern-dot-matrix pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 5 */}
      {slideIndex === 4 && (
        <div className="fctg-pattern-constellation pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 6: Strength */}
      {slideIndex === 5 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground />
        </div>
      )}
      {/* Slide 7: Speed */}
      {slideIndex === 6 && (
        <div className="pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden>
          <ParticleBackground />
        </div>
      )}
      {/* Slide 8: Iteration — no pattern background */}
      {/* Slide 8: Imagination — no pattern background */}
      {/* Slide 10: Empowerment */}
      {slideIndex === 9 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 11: Mystical Code */}
      {slideIndex === 10 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 12: Calmness */}
      {slideIndex === 11 && (
        <div className="fctg-pattern-concentric pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 13 */}
      {slideIndex === 12 && (
        <div className="fctg-pattern-diagonal pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 14: Energy */}
      {slideIndex === 13 && (
        <div className="fctg-pattern-hexagon pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 15 */}
      {slideIndex === 14 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 16 */}
      {slideIndex === 15 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 17 */}
      {slideIndex === 16 && (
        <div className="fctg-pattern-diagonal pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 18 */}
      {slideIndex === 17 && (
        <div className="fctg-pattern-circuit pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 19 */}
      {slideIndex === 18 && (
        <div className="fctg-pattern-contour pointer-events-none fixed inset-0 z-10 bg-[#030b0f]" aria-hidden />
      )}
      {/* Slide 20 */}
      {slideIndex === 19 && (
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
              <div key={slideIndex} className="fctg-text-transition absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 pb-24 text-center">
                <p className="text-lg font-medium tracking-wide text-cyan-300/90 sm:text-xl">In the future, the wealthy will pay for human empathy.</p>
                <p className="mt-2 text-sm tracking-wide text-cyan-400/70">— Attribution</p>
                <h1 className="mt-12 fctg-heading-hero">
                  Invigoration, innovation and impact
                </h1>
                <p className="mt-4 tracking-wide text-cyan-300/80">FCTG Global Design Team · March 2026</p>
              </div>
            </div>
          }
        />
        )}

        {/* Slide 2: Looking back — full-page weaving */}
        {slideIndex === 1 && (
        <Slide
          heroOnly
          transparent
          scrollable
          hero={
            <div className="relative min-h-screen flex flex-col bg-transparent">
              <WeavingLoom fullPage variant="dark" />
              <div key={slideIndex} className="fctg-text-transition relative z-10 flex min-h-screen flex-col items-start justify-center bg-gradient-to-t from-black/95 via-black/60 to-transparent p-8 pb-24">
                <div className="mx-auto w-full max-w-4xl">
                <h2 className="fctg-heading text-left">
                  Looking back to look ahead
                </h2>
                <div className="mt-20 w-full max-w-2xl text-left">
                  <div className="space-y-8">
                      {[
                        { title: 'The weavers', text: 'When tools take over the repeatable work, craft is redefined, not replaced — judgment, taste, and quality stay with people.' },
                        { title: 'Replacing the cart', text: 'Not a faster horse — a new way to move. The leap matters more than the increment.' },
                        { title: 'The digital era', text: 'Paper, pixels, systems — each era redefined the designer. The designer shapes the system, not just the screen.' },
                        { title: 'The future', text: 'AI amplifies what designers do best — empathy, judgment, creativity, and productivity.', last: true },
                    ].map((item) => (
                      <div key={item.title}>
                        <h3
                          className="text-xl font-semibold tracking-wide bg-clip-text text-transparent"
                          style={{ backgroundImage: item.last ? 'linear-gradient(90deg, #a78bfa 0%, #c084fc 50%, #e879f9 100%)' : 'linear-gradient(90deg, #22d3ee 0%, #c084fc 100%)' }}
                        >
                          {item.title}
                        </h3>
                        <p className="mt-2 text-slate-300 leading-relaxed tracking-wide">{item.text}</p>
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
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
          <h2 className="fctg-heading">Questioning the fundamentals</h2>
          <p className="mt-6 text-lg tracking-wide text-slate-300">Do the principles of designing user interaction change — or are new principles added?</p>
          <div className="mt-20 flex flex-wrap justify-start gap-16">
            <img src="/images/AI talk/appleguidlines87.png" alt="Apple Human Interface Guidelines" className="fctg-book-img max-h-80 w-auto rounded-xl object-contain -rotate-2" />
            <img src="/images/AI talk/designforpeople.webp" alt="Designing for People by Henry Dreyfuss" className="fctg-book-img max-h-80 w-auto rounded-xl object-contain rotate-1" />
            <img src="/images/AI talk/win95guidimage.png" alt="Windows 95 interface guidelines" className="fctg-book-img max-h-80 w-auto rounded-xl object-contain brightness-110 -rotate-1" />
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 4: My process */}
        {slideIndex === 3 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
          <h2 className="fctg-heading">My process</h2>
          <p className="fctg-subtitle">Do our definitions of productivity still make sense in the new world?</p>
          <div className="mt-12 w-screen max-w-none" style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}>
            <svg viewBox="0 0 1280 120" className="block w-full min-h-[120px]" preserveAspectRatio="xMidYMid slice" aria-hidden>
              <title>Productivity in flux — flowing lines</title>
              <defs>
                <linearGradient id="fctg-prod-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="30%" stopColor="#2dd4bf" />
                  <stop offset="60%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
              </defs>
              <path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1.5" fill="none" />
              <path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-prod-gradient)" strokeWidth="2" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} />
              <path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" fill="none" />
              <path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} />
              <path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" fill="none" />
              <path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} />
            </svg>
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 5: Wider environment */}
        {slideIndex === 4 && (
        <Slide heroOnly transparent hero={
          <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <WiderEnvironmentCanvas width={Math.min(viewport.w, viewport.h) * 0.55} height={Math.min(viewport.w, viewport.h) * 0.55} className="text-cyan-500/80" />
            </div>
            <div key={slideIndex} className="fctg-text-transition relative z-10 flex flex-col items-center justify-start pt-12 min-h-screen px-8 pb-24 pointer-events-none bg-gradient-to-b from-black/85 via-black/30 via-35% to-transparent">
              <h2 className="fctg-heading">The wider environment</h2>
              <p className="fctg-subtitle">Design process nested within Earth, society, mission.</p>
            </div>
          </div>
        } />
        )}

        {/* Slide 6: Monumental moments — Strength */}
        {slideIndex === 5 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h2 className="fctg-heading" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Monumental moments</h2>
            <p className="fctg-subtitle">Personal moments that shaped how I work with AI.</p>
            <h3 className="fctg-card-title mt-8">Strength</h3>
            <p className="fctg-card-text mt-1">AI guided me through structural design — load paths, triangulation, fabrication.</p>
            <div className="mt-6 flex flex-col gap-4" aria-hidden>
              <div className="fctg-strength-piece flex items-center gap-2" style={{ animationDelay: '0s' }}>
                <span className="shrink-0 text-sm text-cyan-400/80">Prompt</span>
                <span className="text-sm text-slate-300">Analyse load paths for this truss</span>
              </div>
              <div className="relative min-h-[180px] w-full max-w-md p-2">
                <svg viewBox="0 0 120 80" className="h-full w-full" aria-hidden>
                  <line x1="10" y1="40" x2="60" y2="10" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" className="fctg-strength-piece" style={{ animationDelay: '1.2s' }} />
                  <line x1="60" y1="10" x2="110" y2="40" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" className="fctg-strength-piece" style={{ animationDelay: '1.5s' }} />
                  <line x1="110" y1="40" x2="60" y2="70" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" className="fctg-strength-piece" style={{ animationDelay: '1.8s' }} />
                  <line x1="60" y1="70" x2="10" y2="40" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" className="fctg-strength-piece" style={{ animationDelay: '2.1s' }} />
                  <line x1="10" y1="40" x2="110" y2="40" stroke="rgba(34,211,238,0.5)" strokeWidth="0.75" className="fctg-strength-piece" style={{ animationDelay: '2.4s' }} />
                  <circle cx="10" cy="40" r="3" fill="rgba(34,211,238,0.6)" className="fctg-strength-piece" style={{ animationDelay: '1s' }} />
                  <circle cx="60" cy="10" r="3" fill="rgba(34,211,238,0.6)" className="fctg-strength-piece" style={{ animationDelay: '1.3s' }} />
                  <circle cx="110" cy="40" r="3" fill="rgba(34,211,238,0.6)" className="fctg-strength-piece" style={{ animationDelay: '1.6s' }} />
                  <circle cx="60" cy="70" r="3" fill="rgba(34,211,238,0.6)" className="fctg-strength-piece" style={{ animationDelay: '1.9s' }} />
                  <circle cx="60" cy="40" r="3" fill="rgba(34,211,238,0.6)" className="fctg-strength-piece" style={{ animationDelay: '2.2s' }} />
                </svg>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 7: Speed */}
        {slideIndex === 6 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h3 className="fctg-card-title">Speed</h3>
            <p className="fctg-card-text mt-1">Prompt to working UI in seconds — vibe coding made the productivity gain instantly apparent.</p>
            <div className="mt-6 flex flex-col gap-4" aria-hidden>
              <div className="fctg-speed-ui-piece flex items-center gap-2" style={{ animationDelay: '0s' }}>
                <span className="shrink-0 text-sm text-cyan-400/80">Prompt</span>
                <span className="fctg-speed-prompt-text text-sm text-slate-300">Create a login form with email and password</span>
              </div>
              <div className="w-full max-w-sm p-2">
                <div className="space-y-3">
                  <div className="fctg-speed-ui-piece h-3 w-24 rounded bg-cyan-500/20" style={{ animationDelay: '1.4s' }} />
                  <div className="fctg-speed-ui-piece w-full rounded-md border border-cyan-500/30 bg-cyan-950/30 px-3 py-2 text-sm text-slate-400" style={{ animationDelay: '1.55s' }}>Email</div>
                  <div className="fctg-speed-ui-piece w-full rounded-md border border-cyan-500/30 bg-cyan-950/30 px-3 py-2 text-sm text-slate-400" style={{ animationDelay: '1.7s' }}>Password</div>
                  <div className="fctg-speed-ui-piece flex items-center gap-2" style={{ animationDelay: '1.85s' }}>
                    <div className="h-4 w-4 shrink-0 rounded border-2 border-cyan-500/40 bg-cyan-950/30" />
                    <div className="h-3 flex-1 max-w-[120px] rounded bg-cyan-500/20" />
                  </div>
                  <div className="fctg-speed-ui-piece flex justify-end gap-2 pt-1" style={{ animationDelay: '2s' }}>
                    <span className="rounded-md border border-cyan-500/40 px-4 py-2 text-sm font-medium text-slate-400">Cancel</span>
                    <span className="rounded-md bg-cyan-500/40 px-4 py-2 text-sm font-medium text-white">Submit</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 8: Iteration */}
        {slideIndex === 7 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h3 className="fctg-card-title">Iteration</h3>
            <p className="fctg-card-text mt-1">Ideas begin to flow more freely — learning to trust the process and embrace ambiguity.</p>
            <div className="mt-12 flex justify-center" aria-hidden>
              <style>{`
                @keyframes fctg-iterate-flow {
                  from { stroke-dashoffset: 520; }
                  to { stroke-dashoffset: 0; }
                }
                .fctg-iterate-flow-path {
                  stroke-dasharray: 52 104;
                  animation: fctg-iterate-flow 2.5s linear infinite;
                }
              `}</style>
              <svg viewBox="0 0 320 160" className="h-auto w-full max-w-[340px] text-cyan-400/90" preserveAspectRatio="xMidYMid meet">
                <title>Iteration cycle — prompt, review, refine</title>
                {/* Triangular flow: Prompt (top) → Review (right) → Refine (left) → Prompt */}
                <path
                  d="M 160 25 L 270 120 L 50 120 Z"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.12)"
                  strokeWidth="1.5"
                />
                <path
                  d="M 160 25 L 270 120 L 50 120 Z"
                  fill="none"
                  stroke="rgba(34, 211, 238, 0.55)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="fctg-iterate-flow-path"
                />
                {/* Nodes — fctg-card style circles */}
                <circle cx="160" cy="25" r="10" fill="rgba(6, 78, 99, 0.5)" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="1.5" />
                <circle cx="270" cy="120" r="10" fill="rgba(6, 78, 99, 0.5)" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="1.5" />
                <circle cx="50" cy="120" r="10" fill="rgba(6, 78, 99, 0.5)" stroke="rgba(34, 211, 238, 0.45)" strokeWidth="1.5" />
                {/* Labels */}
                <text x="160" y="50" textAnchor="middle" className="fill-cyan-300/90 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Prompt</text>
                <text x="270" y="145" textAnchor="middle" className="fill-cyan-300/90 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Review</text>
                <text x="50" y="145" textAnchor="middle" className="fill-cyan-300/90 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Refine</text>
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 9: Imagination */}
        {slideIndex === 8 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h3 className="fctg-card-title">Imagination</h3>
            <p className="fctg-card-text mt-1">Imagination is our superpower: we focus on steering what to keep, what to push further. I felt like a child creating again — imagination no longer bound by the gates of technology.</p>
            <div className="mt-12 flex justify-center" aria-hidden>
              <style>{`
                @keyframes fctg-sound-bar {
                  0%, 100% { transform: scaleY(0.3); }
                  50% { transform: scaleY(1); }
                }
                .fctg-sound-bar {
                  transform-origin: center bottom;
                  animation: fctg-sound-bar 1.2s ease-in-out infinite;
                }
              `}</style>
              <svg viewBox="0 0 240 48" className="w-full max-w-[280px] text-cyan-400/70" aria-hidden>
                <title>Sound wave — Imagination</title>
                {[...Array(15)].map((_, i) => (
                  <rect
                    key={i}
                    x={8 + i * 15}
                    y={24 - 6}
                    width={6}
                    height={12}
                    rx={2}
                    fill="currentColor"
                    className="fctg-sound-bar"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 10: Empowerment */}
        {slideIndex === 9 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
          <h3 className="fctg-card-title">Empowerment</h3>
          <p className="fctg-card-text mt-1">Take charge of your wellbeing: inputs for sleep, emotions, and environment.</p>
          <div className="mt-12 flex justify-start">
            <div className="min-w-[700px]">
              <HealthMonitor />
            </div>
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 11: Mystical Code */}
        {slideIndex === 10 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h3 className="fctg-card-title">Mystical Code</h3>
            <p className="fctg-card-text mt-1">AI democratises design and development. As a visual designer, code felt mystical and out of reach; AI brings calm — less wrestling with syntax, more time to shape experiences.</p>
            <div className="mt-12 flex justify-center" aria-hidden>
              <style>{`
                @keyframes fctg-mystical-reveal {
                  0% { opacity: 0.25; filter: blur(2px); }
                  50% { opacity: 1; filter: blur(0); }
                  100% { opacity: 0.9; filter: blur(0); }
                }
                @keyframes fctg-mystical-unlock {
                  0% { opacity: 0.4; transform: translateY(4px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .fctg-mystical-symbol { animation: fctg-mystical-reveal 2.5s ease-in-out infinite; }
                .fctg-mystical-symbol:nth-child(1) { animation-delay: 0s; }
                .fctg-mystical-symbol:nth-child(2) { animation-delay: 0.15s; }
                .fctg-mystical-symbol:nth-child(3) { animation-delay: 0.3s; }
                .fctg-mystical-symbol:nth-child(4) { animation-delay: 0.45s; }
                .fctg-mystical-symbol:nth-child(5) { animation-delay: 0.6s; }
                .fctg-mystical-unlock { animation: fctg-mystical-unlock 1.2s ease-out 0.5s forwards; opacity: 0.4; }
              `}</style>
              <svg viewBox="0 0 280 64" className="w-full max-w-[280px] text-cyan-400/80" preserveAspectRatio="xMidYMid meet">
                <title>Code becomes approachable — mystical to calm</title>
                <g className="fctg-mystical-symbol">
                  <text x="28" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'{'}</text>
                </g>
                <g className="fctg-mystical-symbol">
                  <text x="70" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'}'}</text>
                </g>
                <g className="fctg-mystical-symbol">
                  <text x="112" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 24 }}>{'</>'}</text>
                </g>
                <g className="fctg-mystical-symbol">
                  <text x="168" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'('}</text>
                </g>
                <g className="fctg-mystical-symbol">
                  <text x="210" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{')'}</text>
                </g>
                <g className="fctg-mystical-unlock">
                  <rect x="244" y="26" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                  <path d="M248 26v-4a4 4 0 018 0v4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                  <circle cx="252" cy="33" r="2.5" fill="currentColor" fillOpacity="0.8" />
                </g>
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 12: Calmness */}
        {slideIndex === 11 && (
        <Slide transparent className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
            <h3 className="fctg-card-title">Calmness</h3>
            <p className="fctg-card-text mt-1">Less friction, less anxiety. When the tedious parts are handled, there&apos;s more space to think clearly and create without the usual stress of getting stuck.</p>
            <div className="mt-12 flex justify-center" aria-hidden>
              <style>{`
                @keyframes fctg-breathe-ring {
                  0%, 100% { transform: scale(0.9); opacity: 0.3; }
                  50% { transform: scale(1.2); opacity: 0.15; }
                }
                .fctg-breathe-ring {
                  transform-origin: center;
                  transform-box: fill-box;
                  animation: fctg-breathe-ring 5s ease-in-out infinite;
                }
                .fctg-breathe-ring:nth-child(2) { animation-delay: 0.4s; }
              `}</style>
              <svg viewBox="0 0 120 120" className="w-full max-w-[200px] text-cyan-400/70" preserveAspectRatio="xMidYMid meet">
                <title>Breathing — calm, steady rhythm</title>
                <g transform="translate(60, 60)">
                  <circle r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" className="fctg-breathe-ring" />
                  <circle r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" className="fctg-breathe-ring" />
                </g>
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 13: Building momentum */}
        {slideIndex === 12 && (
        <Slide className="items-start">
          <div key={slideIndex} className="fctg-text-transition w-full max-w-4xl text-left">
          <h2 className="fctg-heading">Building momentum</h2>
          <p className="fctg-subtitle">Ways to get started and stay grounded.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-start">
            {[
              { icon: FiZap, label: 'Simple', text: 'One clear prompt beats a wall of context — start small, then layer in nuance.' },
              { icon: FiLayers, label: 'Curiosity', text: 'Learn what the technology can do — curiosity builds strong foundations.' },
              { icon: FiHome, label: 'Analogy', text: 'Physical-world analogies help connect the dots.' },
              { icon: FiGlobe, label: 'Environment', text: 'Your context shapes what you build — tools, constraints, surroundings.' },
              { icon: FiUser, label: 'Human', text: 'You stay at the centre — judgment, taste, and empathy. AI amplifies; you steer.' },
            ].map(({ icon: Icon, label, text }) => (
              <div key={label} className="fctg-card">
                <Icon className="h-6 w-6 text-cyan-400" strokeWidth={1.5} />
                <h3 className="fctg-card-title mt-3">{label}</h3>
                <p className="fctg-card-text">{text}</p>
              </div>
            ))}
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 14: Energy */}
        {slideIndex === 13 && (
        <Slide transparent>
          <div key={slideIndex} className="fctg-text-transition">
            <h2 className="fctg-heading">Energy</h2>
            <p className="fctg-subtitle">Less energy spent sweating the small stuff.</p>
            <div className="mt-12 flex justify-center" aria-hidden>
              <svg viewBox="0 0 620 140" className="w-full max-w-2xl text-cyan-400/80 overflow-visible" preserveAspectRatio="xMidYMid meet">
                <title>How we spend our energy — battery</title>
                <defs>
                  <clipPath id="fctg-battery-inner">
                    <rect x="10" y="30" width="560" height="60" rx="8" />
                  </clipPath>
                </defs>
                <rect x="0" y="20" width="580" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
                <rect x="580" y="45" width="24" height="30" rx="4" fill="currentColor" fillOpacity="0.3" />
                <g clipPath="url(#fctg-battery-inner)">
                  <rect x="10" y="30" width="504" height="60" fill="rgb(139 92 246)" />
                  <rect x="514" y="30" width="11" height="60" fill="rgb(244 63 94)" />
                  <rect x="525" y="30" width="11" height="60" fill="rgb(245 158 11)" />
                  <rect x="536" y="30" width="11" height="60" fill="rgb(20 184 166)" />
                  <rect x="547" y="30" width="11" height="60" fill="rgb(234 88 12)" />
                </g>
                <text x="300" y="65" textAnchor="middle" className="fill-white text-xs font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Imagination · Creativity · Knowledge · Productivity · Value</text>
              </svg>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 15: The agents */}
        {slideIndex === 14 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
          <h2 className="fctg-heading">The agents</h2>
          <p className="fctg-subtitle">Here&apos;s what I learned from 10 months of working with agents in Cursor.</p>
          <div className="mt-12 space-y-8">
            <div className="fctg-card">
              <h3 className="fctg-card-title">Models</h3>
              <p className="fctg-card-text">Quick refactor: Claude Sonnet, GPT-4o-mini. Complex reasoning: Claude Opus, GPT-4o.</p>
            </div>
            <div className="fctg-card">
              <h3 className="fctg-card-title">Trust your gut</h3>
              <p className="fctg-card-text">Sometimes the agent doesn&apos;t think through the full impact. Question them; they&apos;re not always correct and often agree with you even when wrong.</p>
            </div>
            <div className="fctg-card">
              <h3 className="fctg-card-title">Reframe</h3>
              <p className="fctg-card-text">Valuable assistants and partners, not just AI agents — treat them like a sharp colleague who needs clear direction. Learn and figure out things together.</p>
            </div>
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 16: The agents — Prompt, Context, Frustrations, Behaviors */}
        {slideIndex === 15 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
            <h2 className="fctg-heading">The agents</h2>
            <p className="fctg-subtitle">Prompt clarity, context, and what to watch for.</p>
            <div className="mt-12 space-y-8">
              <div className="fctg-card">
                <h3 className="fctg-card-title">Prompt clarity</h3>
                <p className="fctg-card-text">Specific beats vague. &quot;Create a React button with primary and secondary variants&quot; delivers; &quot;make a button&quot; makes the agent guess.</p>
              </div>
              <div className="fctg-card">
                <h3 className="fctg-card-title">Context and continuity</h3>
                <p className="fctg-card-text">Bridge the gap between sessions: point at files, paste snippets, remind of decisions. Keep a learnings.md — reference it when starting new sessions.</p>
              </div>
              <div className="fctg-card">
                <h3 className="fctg-card-title">Frustrations & when to intervene</h3>
                <p className="fctg-card-text">Agents hallucinate, overcomplicate, loop, overwrite. Verify outputs, redirect when they drift. When looping, stop and reframe. Overwritten work can often be restored — push the agent to restore it.</p>
              </div>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 17: Tooling — v1 order: Tooling before Helpful tips */}
        {slideIndex === 16 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
          <h2 className="fctg-heading">Tooling</h2>
          <p className="fctg-subtitle">The environment and tools that support AI-assisted development. Cursor, terminal, deploy. AI helps with commands; the stack stays familiar.</p>
          <div className="mt-12 fctg-card">
            <p className="fctg-card-text">React, Vite, Tailwind. Vitest, Playwright. npm, Git, GitHub, Netlify CLI.</p>
          </div>
          </div>
        </Slide>
        )}

        {/* Slide 18: Helpful tips */}
        {slideIndex === 17 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
            <h2 className="fctg-heading">Helpful tips</h2>
            <p className="fctg-subtitle">Practical pointers from the workflow.</p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'NPM', text: 'Run scripts, install deps — the agent handles commands; you stay in flow.' },
                { title: 'Instant changes', text: 'Live reload — see updates immediately.' },
                { title: 'File directory & layout', text: 'Split view: code on one side, chat on the other — keep context visible.' },
                { title: 'MD documents', text: 'Markdown for specs, notes — easy for you and the agent to read.' },
                { title: 'Queuing prompts', text: 'Stack prompts and let the agent work through them. Break complex tasks into steps.' },
                { title: 'Patience & pace', text: 'Give the agent time — sometimes it figures things out. Pause: is this moving the right work forward?' },
              ].map(({ title, text }) => (
                <div key={title} className="fctg-card">
                  <h3 className="fctg-card-title">{title}</h3>
                  <p className="fctg-card-text">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 19: Activity or demo */}
        {slideIndex === 18 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
            <h2 className="fctg-heading">Activity or demo</h2>
            <p className="fctg-subtitle">Try it yourself — hands-on with the tools we&apos;ve talked about.</p>
            <div className="mt-12 fctg-card">
              <p className="fctg-card-text mb-4">Try a prompt with the agent, e.g.:</p>
              <p className="rounded-lg bg-cyan-950/40 px-4 py-3 font-mono text-sm text-cyan-200 ring-1 ring-cyan-500/30">
                Create a simple button component with a hover state
              </p>
              <p className="mt-4 text-sm text-slate-400">Or add your own demo content here.</p>
            </div>
          </div>
        </Slide>
        )}

        {/* Slide 20: Opportunity */}
        {slideIndex === 19 && (
        <Slide>
          <div key={slideIndex} className="fctg-text-transition">
          <h2 className="fctg-heading">An opportunity of a lifetime</h2>
          <p className="fctg-subtitle text-xl leading-relaxed mt-6">
            We&apos;re at an inflection point. AI won&apos;t replace designers — but designers who learn to work with AI will have an edge. The opportunity is to amplify what we do best: empathy, judgment, and creativity. Embrace the tools, question the outputs, and keep the human at the centre. This is our moment to shape how the craft evolves.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            {['AI is in its infancy', 'Creating massive value', 'Move fast', 'Understand where needed', 'Pause and reflect — The speed of thinking and questioning itself is incredible'].map((tag) => (
              <span key={tag} className="fctg-tag">
                {tag}
              </span>
            ))}
          </div>
          </div>
        </Slide>
        )}

      </div>

      {/* Nav */}
      <div className="fixed bottom-3 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-4 rounded-full border border-cyan-500/30 bg-black/80 px-6 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={goPrev}
          disabled={slideIndex === 0}
          className="rounded-full p-2 text-cyan-400 transition hover:bg-cyan-500/20 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Previous slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="min-w-[4rem] text-center text-sm font-mono tracking-wide text-cyan-300">
          {slideIndex + 1} / {SLIDE_COUNT}
        </span>
        <button
          type="button"
          onClick={goNext}
          disabled={slideIndex === SLIDE_COUNT - 1}
          className="rounded-full p-2 text-cyan-400 transition hover:bg-cyan-500/20 disabled:opacity-30 disabled:hover:bg-transparent"
          aria-label="Next slide"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
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
