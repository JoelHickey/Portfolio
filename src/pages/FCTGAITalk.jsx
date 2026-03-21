import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser, FiActivity, FiCornerUpRight, FiRefreshCw, FiFileText } from 'react-icons/fi'
import WaterAscii from '../components/WaterAscii'
import FCTGAITalkSlides from '../components/FCTGAITalkSlides'
import WeavingLoom from '../components/WeavingLoom'
import WiderEnvironmentCanvas from '../components/WiderEnvironmentCanvas'
import HealthMonitor from '../components/HealthMonitor'
import BatteryParticleFill from '../components/BatteryParticleFill'
const SWIPE_THRESHOLD = 100

function playSwipeSound(cardId) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime

    if (cardId === 'apple') {
      // Whoosh — filtered noise sweep
      const duration = 0.24
      const sr = ctx.sampleRate
      const buffer = ctx.createBuffer(1, Math.floor(sr * duration), sr)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < data.length; i++) {
        const t = i / sr
        data[i] = (Math.random() * 2 - 1) * Math.exp(-t * 12)
      }
      const src = ctx.createBufferSource()
      src.buffer = buffer
      const filter = ctx.createBiquadFilter()
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(700, now)
      filter.frequency.exponentialRampToValueAtTime(60, now + duration)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration)
      src.connect(filter).connect(gain).connect(ctx.destination)
      src.start(0)
      src.stop(duration)
    } else if (cardId === 'designforpeople') {
      // Swoop — descending tone
      const duration = 0.3
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(80, now + duration)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration)
      osc.connect(gain).connect(ctx.destination)
      osc.start(0)
      osc.stop(duration)
    } else {
      // Thump — short low impact
      const duration = 0.12
      const osc = ctx.createOscillator()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(120, now)
      osc.frequency.exponentialRampToValueAtTime(40, now + duration)
      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.25, now)
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration)
      osc.connect(gain).connect(ctx.destination)
      osc.start(0)
      osc.stop(duration)
    }
  } catch { /* ignore audio errors */ }
}

/* Section IDs for pagination (The Way of Code style) */
const FCTG_SECTIONS = [
  { id: 'hero', label: 'Intro' },
  { id: 'quote', label: 'Quote' },
  { id: 'looking-back', label: 'Looking back' },
  { id: 'questioning-fundamentals', label: 'Fundamentals' },
  { id: 'designer-process', label: 'Process' },
  { id: 'wider-environment', label: 'Environment' },
  { id: 'energy', label: 'Energy' },
  { id: 'strength', label: 'Strength' },
  { id: 'speed', label: 'Speed' },
  { id: 'iteration', label: 'Iteration' },
  { id: 'imagination', label: 'Imagination' },
  { id: 'empowerment', label: 'Empowerment' },
  { id: 'mystical-code', label: 'Mystical' },
  { id: 'calmness', label: 'Calmness' },
  { id: 'building-momentum', label: 'Momentum' },
  { id: 'models', label: 'Models' },
  { id: 'prompt-clarity', label: 'Prompts' },
  { id: 'vibe-vs-agentic', label: 'Vibe' },
  { id: 'context-continuity', label: 'Context' },
  { id: 'intervention', label: 'Intervention' },
  { id: 'tooling', label: 'Tooling' },
  { id: 'tooling-stack', label: 'Stack' },
  { id: 'design-systems', label: 'Design systems' },
  { id: 'helpful-tips', label: 'Tips' },
  { id: 'activity', label: 'Activity' },
  { id: 'opportunity', label: 'Opportunity' },
]

const cardList = [
  { id: 'apple', rotate: -8, src: '/images/AI talk/appleguidlines87.png', alt: 'Apple Human Interface Guidelines: The Apple Desktop Interface — hand with mouse and early Mac GUI', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-0', ml: '-ml-0' },
  { id: 'designforpeople', rotate: 0, src: '/images/AI talk/designforpeople.webp', alt: 'Designing for People by Henry Dreyfuss — industrial design and human factors', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-10', ml: '-ml-64' },
  { id: 'windows', rotate: 8, src: '/images/AI talk/win95guidimage.png', alt: 'Windows 95 interface guidelines', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg brightness-110', z: 'z-[50]', ml: '-ml-64' },
]

function FCTGAITalk() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const layoutV2 = pathname.endsWith('/v2') || searchParams.get('v') === '2' || searchParams.has('v2') || searchParams.get('layout') === 'new'

  const [activeCard, setActiveCard] = useState(null)
  const [, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [swipedOff, setSwipedOff] = useState({ apple: false, designforpeople: false, windows: false })
  const [exitDirection, setExitDirection] = useState({ apple: null, designforpeople: null, windows: null })
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeSection, setActiveSection] = useState('hero')
  const startRef = useRef({ x: 0, y: 0 })
  const dragOffsetRef = useRef({ x: 0, y: 0 })
  const sectionRefs = useRef({})

  const handlePointerDown = useCallback((e, id) => {
    if (swipedOff[id]) return
    startRef.current = { x: e.clientX, y: e.clientY }
    setDragStart({ x: e.clientX, y: e.clientY })
    setDragOffset({ x: 0, y: 0 })
    setActiveCard(id)
  }, [swipedOff])

  useEffect(() => {
    if (!activeCard) return
    const onMove = (e) => {
      const next = {
        x: e.clientX - startRef.current.x,
        y: e.clientY - startRef.current.y,
      }
      dragOffsetRef.current = next
      setDragOffset(next)
    }
    const onUp = () => {
      const dx = dragOffsetRef.current.x
      const pastThreshold = Math.abs(dx) > SWIPE_THRESHOLD
      if (pastThreshold) {
        playSwipeSound(activeCard)
        const dir = dx > 0 ? 'right' : 'left'
        setExitDirection((prev) => ({ ...prev, [activeCard]: dir }))
        setSwipedOff((prev) => ({ ...prev, [activeCard]: true }))
      }
      setActiveCard(null)
      setDragOffset({ x: 0, y: 0 })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [activeCard])

  /* Scroll spy for pagination — debounced to avoid jitter during scroll */
  useEffect(() => {
    const refs = sectionRefs.current
    let debounceId = null
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (debounceId) clearTimeout(debounceId)
            debounceId = setTimeout(() => {
              setActiveSection(id)
              debounceId = null
            }, 100)
            break
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    Object.values(refs).forEach((el) => el && observer.observe(el))
    return () => {
      if (debounceId) clearTimeout(debounceId)
      observer.disconnect()
    }
  }, [])

  const scrollToSection = useCallback((id) => {
    const el = sectionRefs.current[id] || document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  const allSwiped = swipedOff.apple && swipedOff.designforpeople && swipedOff.windows

  const getCardTransform = useCallback((id, baseRotate) => {
    const hover = hoveredCard === id && !activeCard && !swipedOff[id]
    const lift = hover ? ' scale(1.05) translateY(-12px)' : ''
    if (swipedOff[id]) {
      const dir = exitDirection[id] === 'right' ? 1 : -1
      return `rotate(${baseRotate}deg) translate(${dir * 120}vw, -60px)`
    }
    if (activeCard === id) {
      return `rotate(${baseRotate}deg) translate(${dragOffset.x}px, ${dragOffset.y}px)${lift}`
    }
    return `rotate(${baseRotate}deg)${lift}`
  }, [activeCard, dragOffset, swipedOff, exitDirection, hoveredCard])

  /* Scroll snap — The Way of Code style: grab each section when scrolling */
  useEffect(() => {
    if (layoutV2) return
    document.documentElement.classList.add('fctg-v1-scroll-snap')
    return () => document.documentElement.classList.remove('fctg-v1-scroll-snap')
  }, [layoutV2])

  /* Arrow keys: up/down navigate between sections */
  useEffect(() => {
    if (layoutV2) return
    const onKeyDown = (e) => {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
      const idx = FCTG_SECTIONS.findIndex((s) => s.id === activeSection)
      if (idx < 0) return
      if (e.key === 'ArrowDown' && idx < FCTG_SECTIONS.length - 1) {
        e.preventDefault()
        scrollToSection(FCTG_SECTIONS[idx + 1].id)
      } else if (e.key === 'ArrowUp' && idx > 0) {
        e.preventDefault()
        scrollToSection(FCTG_SECTIONS[idx - 1].id)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [layoutV2, activeSection, scrollToSection])

  if (layoutV2) {
    return <FCTGAITalkSlides />
  }

  return (
    <section className="flex flex-col relative">
      {/* Pagination — The Way of Code style: fixed right-side dots */}
      <nav
        className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex"
        aria-label="Section navigation"
      >
        {FCTG_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() => scrollToSection(id)}
            className="group flex items-center gap-2 text-right"
            aria-label={`Go to ${label}`}
            aria-current={activeSection === id ? 'true' : undefined}
          >
            <span
              className={`h-2 w-2 shrink-0 rounded-full transition-all duration-200 ${
                activeSection === id
                  ? 'bg-slate-800 scale-125 ring-2 ring-slate-400/50'
                  : 'bg-slate-300 hover:bg-slate-500'
              }`}
            />
            <span
              className={`max-w-0 overflow-hidden whitespace-nowrap text-xs font-medium transition-all duration-200 group-hover:max-w-[120px] ${
                activeSection === id ? 'text-slate-800' : 'text-slate-500'
              }`}
            >
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Hero */}
      <div
        id="hero"
        ref={(el) => { sectionRefs.current.hero = el }}
        className="fctg-v1-snap-section flex min-h-[calc(100vh-64px)] w-full flex-col items-stretch bg-white pb-28 -mt-12"
      >
        <div className="relative min-h-screen w-screen overflow-hidden bg-[#030b0f] ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
              <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <WaterAscii className="absolute inset-0 h-full w-full" background="#030b0f" color="#22d3ee" fullViewport />
              </div>
              <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.02]" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(34, 211, 238, 0.1) 2px, rgba(34, 211, 238, 0.1) 4px)' }} aria-hidden />
              <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]" style={{ backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} aria-hidden />
              <div
                className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-black/70 via-black/50 to-black/85"
                aria-hidden
              />
              <div className="absolute left-0 right-0 top-0 z-10 pt-12">
                <div className="mx-auto w-full max-w-6xl px-6">
                  <Link
                    to="/stories"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white"
                  >
                    <span aria-hidden>←</span>
                    Back to Stories
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center pt-16 pb-16 text-center">
                <h1 className="text-5xl font-semibold text-white md:text-7xl lg:text-8xl">
                  Invigoration, innovation
                </h1>
                <h1 className="mt-2 text-5xl font-semibold text-white md:text-7xl lg:text-8xl">
                  and impact
                </h1>
                <p className="mt-6 max-w-2xl text-base text-white md:text-lg">
                  Design & AI · March 2026
                </p>
                </div>
              </div>
            </div>

      {/* Quote */}
      <div
        id="quote"
        ref={(el) => { sectionRefs.current.quote = el }}
        className="fctg-v1-snap-section relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 py-28"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-slate-50"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 20% 40%, rgba(34, 211, 238, 0.15), transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 60%, rgba(129, 140, 248, 0.12), transparent 50%),
              radial-gradient(ellipse 50% 50% at 50% 50%, rgba(167, 139, 250, 0.08), transparent 70%)
            `,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 fctg-quote-breathe"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, rgba(34, 211, 238, 0.06), transparent 60%)',
          }}
          aria-hidden
        />
        <style>{`
          @keyframes fctg-quote-breathe {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.05); }
          }
          .fctg-quote-breathe { animation: fctg-quote-breathe 8s ease-in-out infinite; }
        `}</style>
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <p className="text-2xl font-medium tracking-wide text-slate-800 sm:text-3xl md:text-4xl leading-relaxed">
            In the future, the wealthy will pay for human empathy.
          </p>
          <p className="mt-6 text-sm font-medium tracking-wide text-slate-600">— Attribution</p>
        </div>
      </div>

      {/* Talk sections */}
      <div
        id="looking-back"
        ref={(el) => { sectionRefs.current['looking-back'] = el }}
        className="fctg-v1-snap-section relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-white"
      >
        <div className="absolute inset-0 overflow-hidden opacity-[0.35]" aria-hidden>
          <div className="absolute inset-0 flex items-center justify-center">
            <WeavingLoom width={1400} height={500} variant="purple" className="scale-125" />
            </div>
            </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 text-center">
          <div className="w-full max-w-2xl mx-auto">
            <h2 className="text-4xl font-semibold leading-tight md:text-5xl md:whitespace-nowrap" style={{ background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Looking back to look ahead</h2>
            <p className="mt-2 text-lg tracking-wide text-slate-600">Craft, tools, and what stays human.</p>
            </div>
          <div className="mt-10 w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 min-w-0">
              {[
                { title: 'Weavers', text: 'Craft redefined, not replaced.', color: '#0891b2' },
                { title: 'Cart to car', text: 'The leap matters more than the increment.', color: '#0d9488' },
                { title: 'Digital', text: 'Systems, not just screens.', color: '#4f46e5' },
                { title: 'The future', text: 'Amplify human skills,\nnot replace them.', color: '#7c3aed' },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <h3 className="text-lg font-semibold tracking-wide" style={{ color: item.color }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed tracking-wide whitespace-pre-line">{item.text}</p>
          </div>
              ))}
        </div>
      </div>
                </div>
              </div>

      {/* Questioning the fundamentals — own page */}
      <div
        id="questioning-fundamentals"
        ref={(el) => { sectionRefs.current['questioning-fundamentals'] = el }}
        className="fctg-v1-snap-section flex min-h-screen w-full flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Questioning the fundamentals</h2>
          <p className="mt-6 max-w-3xl text-slate-600 text-lg">
            Do design principles change — or are new ones added?
          </p>
          {/* Stacked cards — hover to lift; drag past threshold to swipe off */}
                <style>{`
                  .card-fan-swipe { transform-origin: center bottom; transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease, opacity 0.4s ease; }
                  .card-fan-swipe.dragging { transition: none; }
                  .card-fan-swipe:hover { z-index: 100; }
                  .card-fan-swipe:hover:not(.dragging) img { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
                  .card-fan-swipe img { transition: box-shadow 0.35s ease; }
                  .cards-section-collapse { transition: max-height 0.5s ease, opacity 0.4s ease, margin 0.5s ease, padding 0.5s ease; }
                `}</style>
                <div
                  className="cards-section-collapse"
                  style={{
                    maxHeight: allSwiped ? 0 : 1200,
                    opacity: allSwiped ? 0 : 1,
                    marginTop: allSwiped ? 0 : undefined,
                    paddingBottom: allSwiped ? 0 : undefined,
                    overflow: allSwiped ? 'hidden' : 'visible',
                  }}
                >
            <div className="mt-12 w-[100vw] relative left-1/2 -translate-x-1/2 max-w-6xl">
                    <div className="flex flex-nowrap items-end justify-start gap-0 pl-[calc((100vw-min(100vw,72rem))/2+1.5rem)] pr-6 min-h-[420px] isolate">
                      {cardList.map((card) => (
                        <div
                          key={card.id}
                          className={`card-fan-swipe relative flex-shrink-0 cursor-grab active:cursor-grabbing touch-none select-none ${card.z} ${card.ml} ${activeCard === card.id ? 'dragging' : ''}`}
                          style={{
                            transform: getCardTransform(card.id, card.rotate),
                            opacity: swipedOff[card.id] ? 0 : 1,
                            pointerEvents: swipedOff[card.id] ? 'none' : 'auto',
                          }}
                          onPointerDown={(e) => { e.preventDefault(); handlePointerDown(e, card.id) }}
                          onPointerEnter={() => setHoveredCard(card.id)}
                          onPointerLeave={() => setHoveredCard(null)}
                          onMouseDown={(e) => e.preventDefault()}
                        >
                          <img src={card.src} alt={card.alt} className={card.imgClass} draggable={false} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
        </div>
      </div>

      {/* Designer process — own page */}
      <div
        id="designer-process"
        ref={(el) => { sectionRefs.current['designer-process'] = el }}
        className="fctg-v1-snap-section flex min-h-screen w-full flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Designer process</h2>
          <p className="mt-6 max-w-3xl text-slate-600 text-lg">
            Does productivity still mean the same thing?
          </p>
        <div
            className="overflow-hidden pt-12 pb-12 w-screen max-w-none"
            style={{ marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)' }}
          >
            <svg viewBox="0 0 1280 120" className="block w-full min-h-[120px]" preserveAspectRatio="xMidYMid slice" aria-hidden>
            <title>Productivity in flux — flowing lines</title>
              <defs>
                <linearGradient id="fctg-v1-prod-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="30%" stopColor="#2dd4bf" />
                  <stop offset="60%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <clipPath id="fctg-v1-prod-clip-q1"><rect x="0" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-v1-prod-clip-q2"><rect x="320" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-v1-prod-clip-q3"><rect x="640" y="0" width="320" height="120" /></clipPath>
                <clipPath id="fctg-v1-prod-clip-q4"><rect x="960" y="0" width="320" height="120" /></clipPath>
              </defs>
              {/* Line 1 — thicker towards right */}
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="2" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="rgba(34, 211, 238, 0.2)" strokeWidth="2.5" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="2.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 60 Q200 20 400 60 T800 60 T1280 60" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="2.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2s linear infinite' }} /></g>
              {/* Line 2 */}
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="0.75" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.25" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="rgba(34, 211, 238, 0.15)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 80 Q250 40 500 80 T1000 80 T1280 80" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 2.4s linear infinite 0.3s' }} /></g>
              {/* Line 3 */}
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="0.75" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1.25" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="rgba(34, 211, 238, 0.1)" strokeWidth="1.5" fill="none" /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q1)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q2)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.25" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q3)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.5" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
              <g clipPath="url(#fctg-v1-prod-clip-q4)"><path d="M0 100 Q300 60 600 100 T1200 100 T1280 100" stroke="url(#fctg-v1-prod-gradient)" strokeWidth="1.75" fill="none" strokeDasharray="60 240" style={{ animation: 'fctg-prod-flow 1.8s linear infinite 0.6s' }} /></g>
          </svg>
        </div>
                </div>
              </div>

      {/* The wider environment — own page */}
      <div
        id="wider-environment"
        ref={(el) => { sectionRefs.current['wider-environment'] = el }}
        className="fctg-v1-snap-section flex min-h-screen w-full flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-12">
          <h2 className="text-4xl font-semibold leading-tight md:text-5xl" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The wider environment</h2>
          <p className="mt-6 max-w-3xl text-slate-600 text-lg">
            Where are the bottlenecks? Who owns them?
          </p>
          <div className="mt-12 flex justify-center py-8">
            <WiderEnvironmentCanvas width={560} height={560} className="w-full max-w-[560px] h-auto" variant="black" />
                </div>
              </div>
            </div>

      <div
        id="energy"
        ref={(el) => { sectionRefs.current.energy = el }}
        className="fctg-v1-snap-section relative flex min-h-screen flex-col justify-center z-10 w-full overflow-hidden bg-white"
      >
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:gap-12 md:items-center">
            <div className="max-w-md text-center md:text-left">
              <h2 className="text-4xl font-semibold md:text-5xl inline-block" style={{ background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Energy</h2>
              <p className="mt-2 text-slate-600">What charges your designer battery?</p>
          </div>
            <div className="flex justify-center md:justify-end" aria-hidden>
              <style>{`
                @keyframes fctg-battery-shine { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
                @keyframes fctg-battery-pulse { 0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.3)); } 50% { filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.5)); } }
                @keyframes fctg-battery-bubble { 0% { opacity: 0; transform: translateX(0) scale(0.5); } 20% { opacity: 0.8; transform: translateX(6px) scale(1); } 80% { opacity: 0.5; transform: translateX(-40px) scale(0.8); } 100% { opacity: 0; transform: translateX(-56px) scale(0.4); } }
                @keyframes fctg-battery-charge-in { 0% { opacity: 0; transform: translateX(20px) scale(0.3); } 30% { opacity: 1; transform: translateX(8px) scale(0.9); } 70% { opacity: 0.8; transform: translateX(-8px) scale(0.6); } 100% { opacity: 0; transform: translateX(-28px) scale(0.2); } }
                @keyframes fctg-battery-charging-pulse { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
                @keyframes fctg-word-charge { 0%, 90%, 100% { opacity: 0.7; text-shadow: 0 0 0 transparent; } 45% { opacity: 1; text-shadow: 0 0 12px currentColor; } }
                .fctg-battery-segment { animation: fctg-battery-shine 2.5s ease-in-out infinite; }
                .fctg-battery-body { animation: fctg-battery-pulse 3s ease-in-out infinite; }
                .fctg-battery-bubble { animation: fctg-battery-bubble 2.5s ease-in-out infinite; }
                .fctg-battery-charge-in { animation: fctg-battery-charge-in 2s ease-in-out infinite; }
                .fctg-word-charge { animation: fctg-word-charge 2s ease-in-out infinite; }
              `}</style>
              <div className="relative w-full max-w-[960px]" style={{ aspectRatio: '1100/280' }}>
                <svg viewBox="0 0 1100 280" className="block w-full h-full text-cyan-400/90" preserveAspectRatio="xMidYMid meet">
                  <title>Energy battery</title>
                  <defs>
                    <linearGradient id="fctg-v1-battery-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" /><stop offset="25%" stopColor="#2dd4bf" /><stop offset="50%" stopColor="#818cf8" /><stop offset="75%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#e879f9" />
                    </linearGradient>
                    <clipPath id="fctg-v1-battery-clip"><rect x="44" y="32" width="992" height="186" rx="6" /></clipPath>
                  </defs>
                  {[{ y: 80, d: 0 }, { y: 130, d: 0.3 }, { y: 180, d: 0.6 }, { y: 105, d: 0.15 }, { y: 155, d: 0.45 }, { y: 60, d: 0.5 }, { y: 210, d: 0.2 }, { y: 115, d: 0.75 }, { y: 165, d: 0.35 }].map((p, i) => (
                    <circle key={i} cx="1068" cy={p.y} r="3" fill="rgba(34, 211, 238, 0.9)" className="fctg-battery-charge-in" style={{ animationDelay: `${p.d}s` }} />
                  ))}
                  <rect x="4" y="88" width="36" height="84" rx="6" fill="none" stroke="url(#fctg-v1-battery-grad)" strokeWidth="2" />
                  <text x="22" y="135" textAnchor="middle" fill="url(#fctg-v1-battery-grad)" fontSize="28" fontWeight="800">−</text>
                  <rect x="40" y="28" width="1000" height="204" rx="10" fill="none" stroke="url(#fctg-v1-battery-grad)" strokeWidth="2" className="fctg-battery-body" />
                  <rect x="1040" y="72" width="36" height="116" rx="8" fill="none" stroke="url(#fctg-v1-battery-grad)" strokeWidth="2" />
                  <text x="1058" y="135" textAnchor="middle" fill="url(#fctg-v1-battery-grad)" fontSize="28" fontWeight="800">+</text>
                  <g clipPath="url(#fctg-v1-battery-clip)">
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
            </div>
      </div>

      {/* Strength */}
      <div
        id="strength"
        ref={(el) => { sectionRefs.current.strength = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col overflow-y-auto bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28 flex-1 flex flex-col justify-center">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Strength</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            AI guided me through structural design — load paths, triangulation, fabrication — amplifying my process.
          </p>
          <div className="mt-12 max-w-2xl">
              <style>{`
                @keyframes beam-pan {
                  0% { transform: translateX(6%); }
                  100% { transform: translateX(-6%); }
                }
                .beam-pan {
                  animation: beam-pan 14s ease-in-out infinite alternate;
                }
              `}</style>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                <img
                  src="/images/AI talk/beam.jpeg"
                  alt="Galvanized metal beams joined by a tape measure — structural fabrication"
                  className="h-full w-full object-cover object-center"
                />
                {/* Dark multiply overlay + vignette */}
                <div
                  className="pointer-events-none absolute inset-0 mix-blend-multiply"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 50%, rgba(0,0,0,0.08) 100%), radial-gradient(ellipse 85% 70% at 50% 50%, transparent 50%, rgba(0,0,0,0.18) 100%)',
                  }}
                  aria-hidden
                />
              </div>
            </div>
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="whitespace-nowrap bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">Efficiency</p>
            <p className="whitespace-nowrap bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-4xl font-bold text-transparent">Assurance</p>
            <p className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-4xl font-bold text-transparent">Knowledge</p>
            <p className="whitespace-nowrap bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">Value</p>
          </div>
        </div>
      </div>

      {/* Speed */}
      <div
        id="speed"
        ref={(el) => { sectionRefs.current.speed = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div
          className="overflow-hidden"
          style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
                backgroundColor: '#ffffff',
                paddingTop: '112px',
                paddingBottom: '112px'
              }}
            >
              <div className="mx-auto max-w-6xl w-full px-6">
                <div className="max-w-3xl">
                <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Speed</h2>
                <p className="mt-2 max-w-3xl text-slate-600">
                  Prompt to UI in seconds.
                </p>
                <div className="mt-16 flex flex-col items-start gap-6">
                  <style>{`
                    @keyframes speed-ui-build {
                      0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
                      12% { opacity: 1; transform: translateY(0) scale(1); }
                      70% { opacity: 1; transform: translateY(0) scale(1); }
                      100% { opacity: 0; transform: translateY(-10px) scale(0.98); }
                    }
                    @keyframes speed-prompt-type {
                      0% { opacity: 0; max-width: 0; }
                      8% { opacity: 1; max-width: 20rem; }
                      68% { opacity: 1; max-width: 20rem; }
                      100% { opacity: 0; max-width: 0; }
                    }
                    .speed-ui-piece {
                      animation: speed-ui-build 6s ease-in-out infinite;
                      opacity: 0;
                    }
                    .speed-prompt-text {
                      animation: speed-prompt-type 6s ease-in-out infinite;
                      white-space: nowrap;
                      overflow: hidden;
                      display: inline-block;
                      vertical-align: bottom;
                    }
                  `}</style>
                  {/* Phase 1: Prompt */}
                  <div className="w-full max-w-sm" aria-hidden>
                    <div className="speed-ui-piece rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm" style={{ animationDelay: '0s' }}>
                      <div className="flex items-center gap-2">
                        <span className="shrink-0 text-sm text-slate-400">Prompt</span>
                        <span className="speed-prompt-text text-sm text-slate-700">Create a login form with email and password</span>
                      </div>
                    </div>
                  </div>
                  {/* Phase 2: UI assembles */}
                  <div className="w-full max-w-sm rounded-lg border border-slate-200 bg-slate-50/50 p-4 shadow-sm" aria-hidden>
                    <div className="space-y-3">
                      <div
                        className="speed-ui-piece h-3 w-24 rounded bg-slate-200/80"
                        style={{ animationDelay: '1.4s' }}
                      />
                      <input
                        type="text"
                        readOnly
                        placeholder="Email"
                        className="speed-ui-piece w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 placeholder-slate-400 shadow-sm"
                        style={{ animationDelay: '1.55s' }}
                      />
                      <input
                        type="text"
                        readOnly
                        placeholder="Password"
                        className="speed-ui-piece w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-500 placeholder-slate-400 shadow-sm"
                        style={{ animationDelay: '1.7s' }}
                      />
                      <div className="speed-ui-piece flex items-center gap-2" style={{ animationDelay: '1.85s' }}>
                        <div className="h-4 w-4 shrink-0 rounded border-2 border-slate-300 bg-white" />
                        <div className="h-3 flex-1 max-w-[120px] rounded bg-slate-200/80" />
                      </div>
                      <div className="speed-ui-piece flex justify-end gap-2 pt-1" style={{ animationDelay: '2s' }}>
                        <div
                          className="speed-ui-piece rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-600"
                        >
                          Cancel
                        </div>
                        <div
                          className="speed-ui-piece rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm"
                        >
                          Submit
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
      </div>

      {/* Iteration */}
      <div
        id="iteration"
        ref={(el) => { sectionRefs.current.iteration = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Iteration</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Trust the process. Embrace ambiguity.
          </p>
          <div className="mt-16 flex justify-center" aria-hidden>
                  <style>{`
                    @keyframes iterate-flow {
                      0% { stroke-dashoffset: 120; }
                      100% { stroke-dashoffset: 0; }
                    }
                    @keyframes iterate-orbit {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    @keyframes iterate-pulse {
                      0%, 100% { opacity: 0.4; transform: scale(0.9); }
                      50% { opacity: 1; transform: scale(1.1); }
                    }
                    .iterate-flow-path {
                      stroke-dasharray: 30 30;
                      animation: iterate-flow 2.5s linear infinite;
                    }
                    .iterate-orbit-dot {
                      animation: iterate-orbit 4s linear infinite;
                      transform-origin: 100px 100px;
                    }
                    .iterate-pulse-node {
                      animation: iterate-pulse 1.5s ease-in-out infinite;
                    }
                    .iterate-pulse-node:nth-child(2) { animation-delay: 0.25s; }
                    .iterate-pulse-node:nth-child(3) { animation-delay: 0.5s; }
                  `}</style>
                  <svg viewBox="0 0 200 200" className="h-auto w-full max-w-[280px] text-slate-400" preserveAspectRatio="xMidYMid meet">
                    <title>Iteration cycle — prompt, review, refine</title>
                    {/* Circular track */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" />
                    {/* Flowing dashed path */}
                    <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="iterate-flow-path" strokeOpacity="0.7" />
                    {/* Nodes on circle: Prompt (top), Review (bottom-right), Refine (bottom-left) */}
                    <g className="iterate-pulse-node">
                      <circle cx="100" cy="30" r="22" fill="rgb(99 102 241)" fillOpacity="0.9" />
                      <text x="100" y="33" textAnchor="middle" className="fill-white text-[8px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>Prompt</text>
                    </g>
                    <g className="iterate-pulse-node" style={{ animationDelay: '0.33s' }}>
                      <circle cx="161" cy="135" r="22" fill="rgb(20 184 166)" fillOpacity="0.9" />
                      <text x="161" y="138" textAnchor="middle" className="fill-white text-[8px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>Review</text>
                    </g>
                    <g className="iterate-pulse-node" style={{ animationDelay: '0.66s' }}>
                      <circle cx="39" cy="135" r="22" fill="rgb(245 158 11)" fillOpacity="0.9" />
                      <text x="39" y="138" textAnchor="middle" className="fill-white text-[8px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>Refine</text>
                    </g>
                    {/* Orbiting dot — the "iterating" idea flowing around the cycle */}
                    <g className="iterate-orbit-dot">
                      <circle cx="170" cy="100" r="5" fill="rgb(99 102 241)" />
                    </g>
                  </svg>
                </div>
        </div>
      </div>

      {/* Imagination */}
      <div
        id="imagination"
        ref={(el) => { sectionRefs.current.imagination = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Imagination</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Beyond the gates of technology.
          </p>
          <div className="mt-16 flex justify-center" aria-hidden>
                  <style>{`
                    @keyframes sound-bar {
                      0%, 100% { transform: scaleY(0.3); }
                      50% { transform: scaleY(1); }
                    }
                    .imagination-sound-bar {
                      transform-origin: center bottom;
                      animation: sound-bar 1.2s ease-in-out infinite;
                    }
                  `}</style>
                  <svg viewBox="0 0 240 48" className="w-full max-w-[280px] text-slate-300" aria-hidden>
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
                        className="imagination-sound-bar"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      />
                    ))}
                  </svg>
                </div>
                </div>
              </div>

      {/* Empowerment */}
      <div
        id="empowerment"
        ref={(el) => { sectionRefs.current.empowerment = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div
          className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden min-h-screen flex flex-col justify-center"
          style={{
            background: "url('/wp2625478-windows-95-desktop-background.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                paddingTop: '112px',
                paddingBottom: '112px'
              }}
            >
              <div className="mx-auto max-w-6xl w-full px-6">
                <div className="max-w-3xl">
                  <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Empowerment</h2>
                  <p className="mt-2 max-w-3xl text-slate-600">
                    Build things that add value to your life.
                  </p>
                </div>
                <div className="mt-16 min-w-[820px] w-fit">
                  <HealthMonitor />
            </div>
          </div>
        </div>
      </div>

      {/* Mystical Code */}
      <div
        id="mystical-code"
        ref={(el) => { sectionRefs.current['mystical-code'] = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Mystical Code</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Code felt mystical — now it&apos;s reachable.
          </p>
                  <div className="mt-16 flex justify-center" aria-hidden>
                    <style>{`
                      @keyframes mystical-reveal {
                        0% { opacity: 0.25; filter: blur(2px); }
                        50% { opacity: 1; filter: blur(0); }
                        100% { opacity: 0.9; filter: blur(0); }
                      }
                      @keyframes mystical-unlock {
                        0% { opacity: 0.4; transform: translateY(4px); }
                        100% { opacity: 1; transform: translateY(0); }
                      }
                      .mystical-symbol { animation: mystical-reveal 2.5s ease-in-out infinite; }
                      .mystical-symbol:nth-child(1) { animation-delay: 0s; }
                      .mystical-symbol:nth-child(2) { animation-delay: 0.15s; }
                      .mystical-symbol:nth-child(3) { animation-delay: 0.3s; }
                      .mystical-symbol:nth-child(4) { animation-delay: 0.45s; }
                      .mystical-symbol:nth-child(5) { animation-delay: 0.6s; }
                      .mystical-unlock { animation: mystical-unlock 1.2s ease-out 0.5s forwards; opacity: 0.4; }
                    `}</style>
                    <svg viewBox="0 0 280 64" className="w-full max-w-[280px] text-slate-400" preserveAspectRatio="xMidYMid meet">
                      <title>Code becomes approachable — mystical to calm</title>
                      <g className="mystical-symbol">
                        <text x="28" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'{'}</text>
                      </g>
                      <g className="mystical-symbol">
                        <text x="70" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'}'}</text>
                      </g>
                      <g className="mystical-symbol">
                        <text x="112" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 24 }}>{'</>'}</text>
                      </g>
                      <g className="mystical-symbol">
                        <text x="168" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{'('}</text>
                      </g>
                      <g className="mystical-symbol">
                        <text x="210" y="40" textAnchor="middle" className="fill-current" style={{ fontFamily: 'monospace', fontSize: 28 }}>{')'}</text>
                      </g>
                      <g className="mystical-unlock">
                        <rect x="244" y="26" width="16" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                        <path d="M248 26v-4a4 4 0 018 0v4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.7" />
                        <circle cx="252" cy="33" r="2.5" fill="currentColor" fillOpacity="0.8" />
                      </g>
                    </svg>
            </div>
            </div>
      </div>

      {/* Calmness */}
      <div
        id="calmness"
        ref={(el) => { sectionRefs.current.calmness = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Calmness</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Less friction, more space to think.
          </p>
                  <div className="mt-16 flex justify-center" aria-hidden>
                    <style>{`
                      @keyframes breathe-in {
                        0%, 100% { transform: scale(0.85); opacity: 0.6; }
                        50% { transform: scale(1.15); opacity: 1; }
                      }
                      @keyframes breathe-ring {
                        0%, 100% { transform: scale(0.9); opacity: 0.3; }
                        50% { transform: scale(1.2); opacity: 0.15; }
                      }
                      .breathe-core { animation: breathe-in 5s ease-in-out infinite; transform-origin: center; }
                      .breathe-ring { animation: breathe-ring 5s ease-in-out infinite; transform-origin: center; }
                      .breathe-ring:nth-child(2) { animation-delay: 0.4s; }
                      .breathe-ring:nth-child(3) { animation-delay: 0.8s; }
                    `}</style>
                    <svg viewBox="0 0 120 120" className="w-full max-w-[200px] text-slate-300" preserveAspectRatio="xMidYMid meet">
                      <title>Breathing — calm, steady rhythm</title>
                      <circle cx="60" cy="60" r="45" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.2" className="breathe-ring" />
                      <circle cx="60" cy="60" r="35" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.25" className="breathe-ring" />
                      <circle cx="60" cy="60" r="24" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" className="breathe-core" />
                    </svg>
            </div>
        </div>
      </div>

      <div
        id="building-momentum"
        ref={(el) => { sectionRefs.current['building-momentum'] = el }}
        className="fctg-v1-snap-section relative z-10 w-full bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Building momentum</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Getting started.
          </p>
          <div className="mt-12 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="flex flex-col rounded-2xl bg-rose-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiZap className="h-8 w-8 text-rose-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-rose-900 md:text-2xl">Start simple</h3>
              <p className="mt-3 flex-1 text-sm text-rose-800/80 leading-relaxed">One clear prompt beats a wall of context.</p>
            </div>
            <div className="flex flex-col rounded-2xl bg-teal-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiActivity className="h-8 w-8 text-teal-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-teal-900 md:text-2xl">Experiment freely</h3>
              <p className="mt-3 flex-1 text-sm text-teal-800/80 leading-relaxed">Learn what the technology can do.</p>
          </div>
            <div className="flex flex-col rounded-2xl bg-amber-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiLayers className="h-8 w-8 text-amber-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-amber-900 md:text-2xl">Stay curious</h3>
              <p className="mt-3 flex-1 text-sm text-amber-800/80 leading-relaxed">Curiosity builds strong foundations.</p>
          </div>
            <div className="flex flex-col rounded-2xl bg-violet-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiHome className="h-8 w-8 text-violet-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-violet-900 md:text-2xl">Use analogies</h3>
              <p className="mt-3 flex-1 text-sm text-violet-800/80 leading-relaxed">Physical-world analogies help connect the dots.</p>
          </div>
            <div className="flex flex-col rounded-2xl bg-indigo-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiUser className="h-8 w-8 text-indigo-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-indigo-900 md:text-2xl">Stay human</h3>
              <p className="mt-3 flex-1 text-sm text-indigo-800/80 leading-relaxed">Judgment, taste, empathy. AI amplifies; you steer.</p>
            </div>
            <div className="flex flex-col rounded-2xl bg-cyan-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiGlobe className="h-8 w-8 text-cyan-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-cyan-900 md:text-2xl">Your environment</h3>
              <p className="mt-3 flex-1 text-sm text-cyan-800/80 leading-relaxed">Context shapes what you build.</p>
            </div>
            <div className="flex flex-col rounded-2xl bg-emerald-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiCornerUpRight className="h-8 w-8 text-emerald-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-emerald-900 md:text-2xl">Redirect, Don&apos;t Fight</h3>
              <p className="mt-3 flex-1 text-sm text-emerald-800/80 leading-relaxed">When stuck, redirect rather than push.</p>
            </div>
            <div className="flex flex-col rounded-2xl bg-orange-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiRefreshCw className="h-8 w-8 text-orange-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-orange-900 md:text-2xl">Reset When Stuck</h3>
              <p className="mt-3 flex-1 text-sm text-orange-800/80 leading-relaxed">Start fresh when loops persist.</p>
            </div>
            <div className="flex flex-col rounded-2xl bg-slate-200 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiFileText className="h-8 w-8 text-slate-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-slate-900 md:text-2xl">Document As You Go</h3>
              <p className="mt-3 flex-1 text-sm text-slate-700 leading-relaxed">Notes, test plans. Agent reads them.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Models */}
      <div
        id="models"
        ref={(el) => { sectionRefs.current.models = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>The agents</h2>
          <p className="mt-2 mb-10 max-w-3xl text-slate-600">
            Choose the right model for the job.
          </p>
          <div className="mt-8">
            <style>{`
                    @keyframes model-match-in {
                      0% { opacity: 0; transform: translateY(12px) scale(0.97); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes model-arrow-draw {
                      0% { stroke-dashoffset: 24; }
                      100% { stroke-dashoffset: 0; }
                    }
                    .model-match-card { animation: model-match-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
                    .model-match-card:nth-child(1) { animation-delay: 0s; }
                    .model-match-card:nth-child(2) { animation-delay: 0.2s; }
                    .model-arrow { stroke-dasharray: 24; animation: model-arrow-draw 0.6s ease-out 0.4s forwards; stroke-dashoffset: 24; }
            `}</style>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="model-match-card rounded-xl border border-teal-200 bg-teal-50/60 p-5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500/20">
                          <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">Quick refactor</span>
          </div>
                      <p className="mt-3 text-sm text-slate-700">Rename a variable, fix a typo, tweak styles</p>
                      <div className="mt-4 flex items-center gap-2">
                        <svg className="model-arrow h-4 w-4 shrink-0 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        <span className="rounded-full bg-teal-100 px-2.5 py-1 text-xs font-medium text-teal-800">e.g. Claude Sonnet, GPT-4o-mini</span>
          </div>
          </div>
                    <div className="model-match-card rounded-xl border border-indigo-200 bg-indigo-50/60 p-5">
                      <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20">
                          <svg className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Complex reasoning</span>
                      </div>
                      <p className="mt-3 text-sm text-slate-700">Architecture, multi-step logic, design decisions</p>
                      <div className="mt-4 flex items-center gap-2">
                        <svg className="model-arrow h-4 w-4 shrink-0 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                        <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-800">e.g. Claude Opus, GPT-4o</span>
                      </div>
                    </div>
          </div>
            </div>
          </div>
        </div>

      {/* Prompt clarity */}
      <div
        id="prompt-clarity"
        ref={(el) => { sectionRefs.current['prompt-clarity'] = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col overflow-y-auto bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28 flex-1 flex flex-col justify-center">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Prompt clarity</h2>
          <p className="mt-2 mb-10 max-w-3xl text-slate-600">
            Be specific so the agent delivers.
          </p>
          <div className="mt-8 space-y-6">
            <style>{`
                    @keyframes prompt-old-in {
                      0% { opacity: 0; transform: translateX(-24px); }
                      100% { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes prompt-new-in {
                      0% { opacity: 0; transform: translateX(24px); }
                      100% { opacity: 1; transform: translateX(0); }
                    }
                    @keyframes arrow-pulse {
                      0%, 100% { opacity: 0.4; }
                      50% { opacity: 1; }
                    }
                    .prompt-old-card { animation: prompt-old-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
                    .prompt-new-card { animation: prompt-new-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.4s forwards; opacity: 0; }
                    .prompt-arrow { animation: arrow-pulse 2s ease-in-out 1s infinite; }
            `}</style>
                  {[
                    { old: 'start my project', new: "Open 'x' project directory, start the dev server so I preview my app locally." },
                    { old: 'make a button', new: 'Create a React button with primary and secondary variants, hover state, and disabled state.' },
                    { old: 'test this', new: 'Add a Vitest + RTL test for Button: render, click, disabled state.' },
                  ].map(({ old, new: newText }, i) => (
                    <div key={i} className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
                      <div className="prompt-old-card flex-1 rounded-xl border border-slate-200 bg-slate-100/80 p-6 ring-1 ring-slate-200/50" style={{ animationDelay: `${i * 0.15}s` }}>
                        <span className="inline-block rounded-full bg-slate-400/80 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">Vague</span>
                        <p className="mt-4 font-mono text-sm text-slate-600 leading-relaxed">{old}</p>
                      </div>
                      <div className="flex shrink-0 items-center justify-center prompt-arrow" aria-hidden>
                        <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
                      </div>
                      <div className="prompt-new-card flex-1 rounded-xl border-2 border-indigo-200 bg-white p-6 shadow-lg shadow-indigo-100/50 ring-2 ring-indigo-100" style={{ animationDelay: `${i * 0.15 + 0.2}s` }}>
                        <span className="inline-block rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">Specific</span>
                        <p className="mt-4 font-mono text-sm text-slate-700 leading-relaxed">{newText}</p>
                      </div>
                    </div>
                  ))}
          </div>
        </div>
      </div>

      {/* Vibe vs agentic */}
      <div
        id="vibe-vs-agentic"
        ref={(el) => { sectionRefs.current['vibe-vs-agentic'] = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Vibe vs agentic</h2>
          <p className="mt-2 mb-10 max-w-3xl text-slate-600">
            Two modes. Know when to use each.
          </p>
                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5">
                    <h4 className="text-lg font-semibold text-slate-900">Vibe</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">Conversational, exploratory. Chat, iterate, discover. Great for ideation, learning, and open-ended work.</p>
                    <p className="mt-3 rounded-lg border border-slate-300 bg-white px-3 py-2 font-mono text-xs text-slate-600">&ldquo;How should I approach testing this app? I&apos;m not sure what to cover first.&rdquo;</p>
                  </div>
                  <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-5">
                    <h4 className="text-lg font-semibold text-slate-900">Agentic</h4>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">Goal-driven, autonomous. Clear task, agent executes steps. Great for implementation, refactors, and defined outcomes.</p>
                    <p className="mt-3 rounded-lg border border-indigo-300 bg-white px-3 py-2 font-mono text-xs text-indigo-800">&ldquo;Add Playwright tests for the login flow: valid credentials, invalid, empty fields.&rdquo;</p>
              </div>
            </div>
        </div>
      </div>

      {/* Context and continuity */}
      <div
        id="context-continuity"
        ref={(el) => { sectionRefs.current['context-continuity'] = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Context and continuity</h2>
          <p className="mt-2 mb-10 max-w-3xl text-slate-600">
            Sessions break. Context doesn&apos;t have to.
          </p>
          <div className="mt-8">
                  <style>{`
                    @keyframes context-session-in {
                      0% { opacity: 0; transform: scale(0.96); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes context-bridge-in {
                      0% { opacity: 0; transform: translateY(6px); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes context-gap-pulse {
                      0%, 100% { opacity: 0.4; }
                      50% { opacity: 0.8; }
                    }
                    .context-session { animation: context-session-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
                    .context-session-1 { animation-delay: 0s; }
                    .context-session-2 { animation-delay: 0.5s; }
                    .context-bridge { animation: context-bridge-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
                    .context-bridge:nth-child(1) { animation-delay: 0.25s; }
                    .context-bridge:nth-child(2) { animation-delay: 0.35s; }
                    .context-bridge:nth-child(3) { animation-delay: 0.45s; }
                    .context-bridge:nth-child(4) { animation-delay: 0.55s; }
                    .context-gap { animation: context-gap-pulse 2.5s ease-in-out 1s infinite; }
                  `}</style>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-3">
                      <div className="context-session context-session-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                        <span className="text-sm font-medium text-slate-600">Session 1</span>
            </div>
                      <div className="context-gap flex flex-1 items-center gap-2" aria-hidden>
                        <div className="h-0.5 flex-1 rounded-full bg-slate-300" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">no memory</span>
                        <div className="h-0.5 flex-1 rounded-full bg-slate-300" />
                      </div>
                      <div className="context-session context-session-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
                        <span className="text-sm font-medium text-slate-600">Session 2</span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500">Bridge the gap:</p>
                    <div className="flex flex-wrap gap-3">
                      <div className="context-bridge flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-2.5 shadow-sm">
                        <svg className="h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                        <span className="text-sm font-medium text-amber-800">Point at files</span>
                      </div>
                      <div className="context-bridge flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-2.5 shadow-sm">
                        <svg className="h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                        <span className="text-sm font-medium text-amber-800">Paste snippets</span>
                      </div>
                      <div className="context-bridge flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-2.5 shadow-sm">
                        <svg className="h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        <span className="text-sm font-medium text-amber-800">Remind of decisions</span>
                      </div>
                      <div className="context-bridge flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/90 px-4 py-2.5 shadow-sm">
                        <svg className="h-4 w-4 shrink-0 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        <span className="text-sm font-medium text-amber-800">Learnings document</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Keep a <code className="rounded bg-slate-200/80 px-1.5 py-0.5 text-sm">learnings.md</code> with patterns, preferences, and decisions. Reference it when starting new sessions so the agent has context without you re-explaining.
                    </p>
                  </div>
          </div>
        </div>
      </div>

      {/* Intervention */}
      <div
        id="intervention"
        ref={(el) => { sectionRefs.current.intervention = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Intervention</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Verify outputs, redirect when they drift, reframe when looping.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift'].map((label) => (
              <span key={label} className="rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
                {label}
              </span>
            ))}
            </div>
          <div className="mt-16 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 px-8 py-8 shadow-lg shadow-indigo-100/40 overflow-hidden">
              <style>{`
                @keyframes reframe-in {
                  0% { opacity: 0; transform: translateY(12px); }
                  100% { opacity: 1; transform: translateY(0); }
                }
                .reframe-sentence {
                  animation: reframe-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                }
              `}</style>
            <p className="reframe-sentence text-xl text-slate-800 leading-relaxed md:text-2xl">
              Reframe how you see them: valuable assistants and partners, not just AI agents — treat them like a sharp colleague who needs clear direction and learn and figure out things together.
            </p>
          </div>
        </div>
      </div>

      <div
        id="tooling"
        ref={(el) => { sectionRefs.current.tooling = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center relative z-10 w-full bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Tooling</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            How this was built.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-semibold text-slate-900">Cursor</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                The main app for writing and editing code — agents, inline edits, Composer, and integrated model selection.
              </p>
              <div className="mt-6 mb-8 relative rounded-xl overflow-visible shadow-lg">
                <img
                  src="/images/AI talk/cursor-window.png"
                  alt="Cursor IDE window showing code editor and AI chat panel"
                  className="w-full h-auto object-contain rounded-xl"
                />
                {/* Annotations */}
                <div className="absolute left-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                  <div className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-800 shadow-sm ring-1 ring-violet-200/60">Chat</div>
                  <svg className="h-4 w-4 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                </div>
                <div className="absolute left-[50%] top-[30%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-teal-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div className="rounded-lg bg-teal-100 px-2.5 py-1.5 text-xs font-semibold text-teal-800 shadow-sm ring-1 ring-teal-200/60">Code editor</div>
                </div>
                <div className="absolute right-[8%] top-[35%] flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-amber-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  <div className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-xs font-semibold text-amber-800 shadow-sm ring-1 ring-amber-200/60">File directory</div>
                </div>
                <div className="absolute left-[8%] bottom-[22%] flex items-center gap-2" aria-hidden>
                  <svg className="h-4 w-4 text-indigo-400 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  <div className="rounded-lg bg-indigo-100 px-2.5 py-1.5 text-xs font-semibold text-indigo-800 shadow-sm ring-1 ring-indigo-200/60">Select agent</div>
                </div>
                <div className="absolute left-[50%] bottom-[8%] -translate-x-1/2 flex items-center gap-2" aria-hidden>
                  <div className="rounded-lg bg-slate-500/90 px-2.5 py-1.5 text-xs font-semibold text-white shadow-sm">Terminal</div>
                  <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
              </div>
            </div>
          <div>
              <h3 className="text-xl font-semibold text-slate-900">Terminal & deploy</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                npm, Git, GitHub, Vercel CLI — the usual suspects. AI helps with commands; the stack stays familiar.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-semibold text-slate-900 mb-4">AI flow</h4>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3" aria-hidden>
                <span className="inline-flex items-center gap-2 rounded-md bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-800">
                  <img src="/images/cursor-logo.svg" alt="" className="h-4 w-4 text-violet-700" aria-hidden />
                  Prompt in Cursor
                </span>
                <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
                <span className="inline-flex items-center gap-2 rounded-md bg-slate-800 px-2.5 py-1.5 text-xs font-semibold text-white">
                  <img src="/images/github-logo.svg" alt="" className="h-4 w-4 brightness-0 invert" aria-hidden />
                  Commit to GitHub
                </span>
                <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
                <span className="inline-flex items-center gap-2 rounded-md bg-teal-600 px-2.5 py-1.5 text-xs font-semibold text-white">
                  <img src="/images/vercel-logo.svg" alt="" className="h-4 w-4 brightness-0 invert" aria-hidden />
                  Deploy to Vercel
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        id="tooling-stack"
        ref={(el) => { sectionRefs.current['tooling-stack'] = el }}
        className="fctg-v1-snap-section flex min-h-screen flex-col justify-center relative z-10 w-full bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Tech stack & testing</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            React, Vite, Tailwind. Vitest, Playwright.
          </p>
          <div className="mt-12 flex flex-col">
              <div className="pt-0 pb-12">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">Tech stack</h4>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <img src="/images/react-logo.svg" alt="" className="h-4 w-4" aria-hidden />
                      React
                    </span>
                    <span className="text-[10px] text-slate-500">UI framework</span>
                  </span>
                  <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <img src="/images/vite-logo.svg" alt="" className="h-4 w-4" aria-hidden />
                      Vite
                    </span>
                    <span className="text-[10px] text-slate-500">Build tool</span>
                  </span>
                  <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <img src="/images/tailwind-logo.svg" alt="" className="h-4 w-4" aria-hidden />
                      Tailwind
                    </span>
                    <span className="text-[10px] text-slate-500">CSS framework</span>
                  </span>
            </div>
          </div>
              <div className="pt-12 pb-12">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">Testing</h4>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <img src="/images/vitest-logo.svg" alt="" className="h-4 w-4" aria-hidden />
                      Vitest
                    </span>
                    <span className="text-[10px] text-slate-500">Unit tests</span>
                  </span>
                  <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                    <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-600">
                      <img src="/images/playwright-logo.svg" alt="" className="h-4 w-4" aria-hidden />
                      Playwright
                    </span>
                    <span className="text-[10px] text-slate-500">End-to-end tests</span>
                  </span>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h5 className="text-sm font-semibold uppercase tracking-wider text-violet-600">Vibe</h5>
                    <p className="mt-2 text-sm text-slate-600">
                      Single-shot, iterative. &quot;Add a unit test for this function.&quot; You review inline, tweak, repeat. Great for one-off tests.
                    </p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h5 className="text-sm font-semibold uppercase tracking-wider text-teal-600">Agentic</h5>
                    <p className="mt-2 text-sm text-slate-600">
                      Multi-step, autonomous. &quot;Add test coverage for the checkout flow — unit tests and an E2E with Playwright.&quot; Agent creates files, config, and runs tests.
                    </p>
                  </div>
                </div>
                <p className="mt-6 max-w-3xl text-sm text-slate-600 leading-relaxed">
                  Full coverage uncovers gaps; thorough testing keeps changes from breaking what works.
                </p>
              </div>
            </div>
        </div>
      </div>

      <div
        id="design-systems"
        ref={(el) => { sectionRefs.current['design-systems'] = el }}
        className="fctg-v1-snap-section relative z-10 w-full bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Design systems</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Tokens, components, docs. The agent reads them.
          </p>
          <div className="mt-8 max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-3">How we built this (v1 & v2)</h3>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong className="text-slate-800">Started with Tailwind default CSS.</strong> Both v1 (this long-scroll) and v2 (slides) began with raw utility classes — <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">text-6xl</code>, <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">bg-gradient-to-r</code> — applied inline.
            </p>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong className="text-slate-800">Extracted a design system.</strong> We moved repeated values into <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">tailwind.config.js</code> and wrapped patterns into components: <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">FCTGHeading</code> (v1 light / v2 dark), <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">FCTGCard</code>, <code className="rounded bg-slate-100 px-1 py-0.5 text-sm">FCTGLabelPill</code>. v2 uses them; v1 uses inline Tailwind for scroll performance.
            </p>
            <p className="text-slate-600 leading-relaxed mb-3">
              See{' '}
              <Link to="/design-system" className="text-indigo-600 hover:text-indigo-700 underline">
                Design system — Home
              </Link>
              .
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              <strong className="text-slate-800">Hook into existing systems.</strong> Extend Chakra, Primer, Radix, Mantine, Material UI, Ant Design, Polaris (Shopify) for accessibility and primitives.
                </p>
              </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Tokens & components</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Spacing, color, typography. Agent outputs stay consistent.
                </p>
              </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900">Specs in docs</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Figma, MD, Storybook. Point the agent at the source of truth.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="helpful-tips"
        ref={(el) => { sectionRefs.current['helpful-tips'] = el }}
        className="fctg-v1-snap-section relative z-10 w-full bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Helpful tips</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Workflow pointers.
          </p>
          <style>{`
            @keyframes tip-card-in {
              0% { opacity: 0; transform: translateY(16px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .tip-card { animation: tip-card-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
            .tip-card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px -12px rgba(0,0,0,0.15); }
            .tip-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          `}</style>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 auto-rows-fr">
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200/60" style={{ animationDelay: '0.05s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">Tools</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">NPM</h3>
              <p className="mt-1.5 text-sm text-slate-600">Run scripts, install deps — the agent handles commands; you stay in flow.</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200/60" style={{ animationDelay: '0.1s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">Tools</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Instant changes</h3>
              <p className="mt-1.5 text-sm text-slate-600">Live reload — see updates immediately, no constant refresh.</p>
          </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-teal-200/60 lg:col-span-2" style={{ animationDelay: '0.15s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-teal-600">Workflow</span>
              <h4 className="mt-1 text-base font-semibold text-slate-900">File directory & screen layout</h4>
              <p className="mt-1.5 text-sm text-slate-600">Know your project structure. Split view: code on one side, chat on the other — keep context visible.</p>
              </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-violet-200/60" style={{ animationDelay: '0.2s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Docs</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">MD documents</h3>
              <p className="mt-1.5 text-sm text-slate-600">Markdown for specs, notes, test plans — easy for you and the agent to read.</p>
              </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-violet-200/60" style={{ animationDelay: '0.25s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Docs</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Test plan MD</h3>
              <p className="mt-1.5 text-sm text-slate-600">Clarify what to cover before the agent writes tests.</p>
              </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-amber-200/60 lg:col-span-2" style={{ animationDelay: '0.3s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Prompts</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Queuing & sequenced prompts</h3>
              <p className="mt-1.5 text-sm text-slate-600">Stack prompts and let the agent work through them. Break complex tasks into steps — step one, then step two — so it follows your logic.</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-indigo-200/60" style={{ animationDelay: '0.35s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-500">Tools</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Terminal</h3>
              <p className="mt-1.5 text-sm text-slate-600">Agent runs commands here — watch output for errors and progress.</p>
          </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-rose-200/60 lg:col-span-2" style={{ animationDelay: '0.4s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">Observation</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Watching it think</h3>
              <p className="mt-1.5 text-sm text-slate-600">Agents iterate — explore, revise, self-correct. Observe the reasoning; learn what works and when to step in.</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-rose-200/60" style={{ animationDelay: '0.42s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">Observation</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Inspect mode & console</h3>
              <p className="mt-1.5 text-sm text-slate-600">DevTools and the console surface what the agent changed and where things break — use them.</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-rose-200/60" style={{ animationDelay: '0.45s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-600">Observation</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">It found the bug</h3>
              <p className="mt-1.5 text-sm text-slate-600">Learn from how it got there — patterns you can reuse.</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200/60 lg:col-span-2" style={{ animationDelay: '0.5s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Mindset</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Patience & pace</h3>
              <p className="mt-1.5 text-sm text-slate-600">Give the agent time — sometimes it figures things out. Fast doesn&apos;t mean effective. Pause: is this moving the right work forward?</p>
            </div>
            <div className="tip-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-200/60 lg:col-span-2" style={{ animationDelay: '0.55s' }}>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Mindset</span>
              <h3 className="mt-1 text-base font-semibold text-slate-900">Enjoy the ride</h3>
              <p className="mt-1.5 text-sm text-slate-600">Lean into the tools — the gains and &quot;how did it do that?&quot; moments are part of it.</p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="activity"
        ref={(el) => { sectionRefs.current.activity = el }}
        className="fctg-v1-snap-section relative z-10 w-full bg-white"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Activity</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Hands-on workshop for ~15 designers (in-person + remote). 1 hour. <strong>Focus: teaching vibe → agentic.</strong> Let&apos;s make it fun.
          </p>

          <div className="mt-12 space-y-12">
            <div className="rounded-2xl border-2 border-slate-200 bg-slate-50/80 p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-2">Problem to solve</h4>
              <h3 className="text-xl font-semibold text-slate-900">Mars booking flow</h3>
              <p className="mt-2 text-slate-600">
                Design the checkout for a trip to Mars: departure dates, cabin selection, add-ons. Everyone works on the same problem — compare how vibe vs agentic approaches it.
              </p>
              </div>

              <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-2">Vibe vs agentic showdown</h3>
              <p className="text-slate-600 mb-6">
                Same problem, two modes. Feel the difference. Pairs pick team names. Best Mars checkout prompt wins bragging rights. Worst output gets an honorable mention.
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="rounded-xl border-2 border-violet-200 bg-violet-50/50 p-6 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Round 1 · ~15 min</span>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">Start with vibe</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Explore flows and tone. Try: &quot;How would you approach designing a checkout for a Mars trip? What should we consider?&quot; Or: &quot;What tone should a space-travel booking flow have?&quot; Chat, iterate, go wild. No wrong answers.
                  </p>
                  <p className="mt-3 text-xs text-slate-500">Single-shot, iterative. Exploratory.</p>
                </div>
                <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-6 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">Round 2 · ~25 min</span>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">Level up to agentic</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Give AI a clear mission. Try: &quot;Create a 3-step checkout for a Mars trip: step 1 — departure date picker; step 2 — cabin selection (economy, business, first); step 3 — add-ons and terms. Include copy and layout.&quot; One prompt, full outcome.
                  </p>
                  <p className="mt-3 text-xs text-slate-500">Multi-step, defined outcome. Goal-driven.</p>
                </div>
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-6 shadow-sm">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Round 3 · ~15 min</span>
                  <h4 className="mt-2 text-lg font-semibold text-slate-900">Show & tell</h4>
                  <p className="mt-2 text-sm text-slate-600">
                    Share the best Mars checkout outputs — vibe vs agentic. Vote on which flow we'd ship. When would you use vibe vs agentic for this problem? Quick poll, then wrap.
                  </p>
                </div>
              </div>
              </div>

            <div className="rounded-2xl border-2 border-slate-300 bg-white p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Run sheet (1 hour total)</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="py-2 pr-4 font-semibold text-slate-800">Time</th>
                      <th className="py-2 pr-4 font-semibold text-slate-800">Duration</th>
                      <th className="py-2 font-semibold text-slate-800">Step</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600">
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:00</td><td className="py-2.5 pr-4">2 min</td><td className="py-2.5">Intro: Problem = Mars booking flow (departure, cabin, add-ons). Explain vibe vs agentic. Share links. Pair up, pick team names.</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:02</td><td className="py-2.5 pr-4">15 min</td><td className="py-2.5"><strong>Round 1 — Vibe:</strong> Explore flows and tone. E.g. &quot;How would you approach designing a checkout for a Mars trip? What should we consider?&quot; Chat, iterate, go wild.</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:17</td><td className="py-2.5 pr-4">2 min</td><td className="py-2.5">Transition: Explain agentic. &quot;Now give AI a clear mission and let it run.&quot;</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:19</td><td className="py-2.5 pr-4">25 min</td><td className="py-2.5"><strong>Round 2 — Agentic:</strong> E.g. &quot;Create a 3-step checkout for a Mars trip: step 1 — date picker; step 2 — cabin selection (economy, business, first); step 3 — add-ons and terms. Include copy and layout.&quot; One prompt, full outcome.</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:44</td><td className="py-2.5 pr-4">15 min</td><td className="py-2.5"><strong>Round 3 — Show & tell:</strong> Pairs share best Mars checkout outputs (vibe vs agentic). Vote on which flow we'd ship. Quick poll: vibe or agentic for this problem? Wrap.</td></tr>
                    <tr className="border-b border-slate-100"><td className="py-2.5 pr-4 font-mono text-slate-500">0:59</td><td className="py-2.5 pr-4">1 min</td><td className="py-2.5">Buffer / wrap.</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs text-slate-500">Tip: Keep time visible. Call out at 5 min left in each round. For remote, use breakout rooms during rounds; bring everyone back for transitions and show & tell.</p>
              </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Logistics (in-person + remote)</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li><strong className="text-slate-800">Shared context:</strong> Miro/FigJam or shared doc for Mars checkout prompts and outputs</li>
                <li><strong className="text-slate-800">Pairing:</strong> Breakout rooms for remote; in-person pairs; mixed pairs via video. Pick a team name.</li>
                <li><strong className="text-slate-800">Tools:</strong> Free, no sign-up: <a href="https://chat.openai.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">ChatGPT</a>, <a href="https://chat.deepseek.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">DeepSeek</a>, or <a href="https://theturbochat.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">The TurboChat</a> — open in browser and go; shared screen for demos</li>
                <li><strong className="text-slate-800">Materials:</strong> One-page cheat sheet: Mars checkout vibe vs agentic prompt examples</li>
                </ul>
              </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Other vibe → agentic activities</h4>
              <p className="text-sm text-slate-600 mb-4">All alternatives use the Mars booking flow. Pick one if you want a different format.</p>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="flex gap-3">
                  <span className="shrink-0 rounded bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-violet-700">Mars</span>
                  <span><strong className="text-slate-800">Same prompt, two modes</strong> — Everyone does the Mars checkout twice: vibe first (explore flows and tone), then agentic (3-step checkout with date picker, cabin, add-ons). Compare outputs.</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 rounded bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-violet-700">Mars</span>
                  <span><strong className="text-slate-800">Prompt roulette</strong> — Half the prompts are vibe-style Mars prompts (&quot;How would you approach a Mars checkout?&quot;); half are agentic (&quot;Create a 3-step Mars checkout with…&quot;). Draw random, run, guess which mode. Reveal at the end.</span>
                </li>
                <li className="flex gap-3">
                  <span className="shrink-0 rounded bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-violet-700">Mars</span>
                  <span><strong className="text-slate-800">Bad prompt → good prompt</strong> — Start with vague Mars prompts (&quot;design a Mars checkout&quot; or &quot;make it good&quot;). Run them (chaos). Rewrite as agentic (clear steps, outcome-focused). Run again. Before/after comparison.</span>
                </li>
                </ul>
            </div>
          </div>
        </div>
      </div>

      <div
        id="opportunity"
        ref={(el) => { sectionRefs.current.opportunity = el }}
        className="fctg-v1-snap-section relative z-10 w-full bg-slate-50"
      >
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal" style={{ background: 'linear-gradient(90deg, #4c1d95 0%, #5b21b6 25%, #6d28d9 50%, #7c3aed 75%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>An opportunity of a lifetime</h2>
          <div className="mt-8 space-y-4">
            <p className="max-w-3xl text-slate-600">
              We&apos;re at an inflection point. AI won&apos;t replace designers — but designers who learn to work with AI will have an edge. The opportunity is to amplify what we do best: empathy, judgment, and creativity. Embrace the tools, question the outputs, and keep the human at the centre. This is our moment to shape how the craft evolves.
            </p>
          </div>
          <div className="mt-16 flex flex-wrap gap-4">
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/60">AI is in its infancy</span>
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/60">Creating massive value</span>
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/60">Move fast</span>
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/60">Understand where needed</span>
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200/60">Pause and reflect — The speed of thinking and questioning itself is incredible</span>
        </div>
      </div>
      </div>

    </section>
  )
}

export default FCTGAITalk
