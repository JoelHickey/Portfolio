import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { SiLinkedin } from 'react-icons/si'
import ParticleBackground from '../components/ParticleBackground'

import BatteryParticleFill from '../components/BatteryParticleFill'
import { homeHeroNameGradientTextStyle } from '../design-system/home'

// Energy slide preview for FCTG AI talk card — full battery from slide "Energy / What charges your designer battery?"
export function FCTGEnergyPreview() {
  return (
    <div className="flex min-w-0 h-full w-full flex-col bg-transparent">
      <div className="flex-1 min-h-0 min-w-0 flex items-center justify-center px-1 py-1">
        <div className="w-full h-full max-h-[110px] md:max-h-[120px]" style={{ aspectRatio: '1100/280' }}>
          <style>{`
            @keyframes energy-card-pulse { 0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.3)); } 50% { filter: drop-shadow(0 0 16px rgba(34, 211, 238, 0.5)); } }
            @keyframes energy-card-bubble { 0% { opacity: 0; transform: translateX(0) scale(0.5); } 20% { opacity: 0.8; transform: translateX(6px) scale(1); } 80% { opacity: 0.5; transform: translateX(-40px) scale(0.8); } 100% { opacity: 0; transform: translateX(-56px) scale(0.4); } }
            @keyframes energy-card-charge-in { 0% { opacity: 0; transform: translateX(20px) scale(0.3); } 30% { opacity: 1; transform: translateX(8px) scale(0.9); } 70% { opacity: 0.8; transform: translateX(-8px) scale(0.6); } 100% { opacity: 0; transform: translateX(-28px) scale(0.2); } }
            @keyframes energy-card-word { 0%, 90%, 100% { opacity: 0.7; } 45% { opacity: 1; } }
            .energy-card-body { animation: energy-card-pulse 3s ease-in-out infinite; }
            .energy-card-bubble { animation: energy-card-bubble 2.5s ease-in-out infinite; }
            .energy-card-charge-in { animation: energy-card-charge-in 2s ease-in-out infinite; }
            .energy-card-word { animation: energy-card-word 2s ease-in-out infinite; }
          `}</style>
          <svg viewBox="0 0 1100 280" className="block w-full h-full text-cyan-400/90" preserveAspectRatio="xMidYMid meet" aria-hidden>
            <defs>
              <linearGradient id="energy-card-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" /><stop offset="25%" stopColor="#2dd4bf" /><stop offset="50%" stopColor="#818cf8" /><stop offset="75%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
              <clipPath id="energy-card-clip"><rect x="44" y="32" width="992" height="186" rx="6" /></clipPath>
            </defs>
            {[{ y: 80, d: 0 }, { y: 130, d: 0.3 }, { y: 180, d: 0.6 }, { y: 105, d: 0.15 }, { y: 155, d: 0.45 }, { y: 60, d: 0.5 }, { y: 210, d: 0.2 }, { y: 115, d: 0.75 }, { y: 165, d: 0.35 }].map((p, i) => (
              <circle key={i} cx="1068" cy={p.y} r="3" fill="rgba(34, 211, 238, 0.9)" className="energy-card-charge-in" style={{ animationDelay: `${p.d}s` }} />
            ))}
            <rect x="40" y="28" width="1000" height="204" rx="10" fill="none" stroke="url(#energy-card-grad)" strokeWidth="5" className="energy-card-body" />
            <rect x="4" y="78" width="36" height="104" rx="6" fill="none" stroke="url(#energy-card-grad)" strokeWidth="5" />
            <rect x="1040" y="78" width="36" height="104" rx="6" fill="none" stroke="url(#energy-card-grad)" strokeWidth="5" />
            {/* − terminal (left) */}
            <text x="22" y="145" textAnchor="middle" fontSize="56" fontWeight="600" fill="url(#energy-card-grad)" style={{ userSelect: 'none' }}>−</text>
            {/* + terminal (right) */}
            <text x="1058" y="145" textAnchor="middle" fontSize="56" fontWeight="600" fill="url(#energy-card-grad)" style={{ userSelect: 'none' }}>+</text>
            <g clipPath="url(#energy-card-clip)">
              <foreignObject x="44" y="32" width="992" height="186">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 6, pointerEvents: 'none' }}>
                  <BatteryParticleFill width={992} height={186} />
                </div>
              </foreignObject>
              {[{ x: 160, y: 90, d: 0 }, { x: 330, y: 130, d: 0.4 }, { x: 540, y: 95, d: 0.8 }, { x: 440, y: 165, d: 0.2 }, { x: 710, y: 110, d: 0.5 }, { x: 820, y: 80, d: 0.1 }, { x: 875, y: 145, d: 0.6 }, { x: 935, y: 105, d: 0.3 }, { x: 270, y: 120, d: 0.7 }].map((b, i) => (
                <circle key={i} cx={b.x} cy={b.y} r="3.5" fill="rgba(255,255,255,0.65)" className="energy-card-bubble" style={{ animationDelay: `${b.d}s` }} />
              ))}
              {[{ word: 'Innovation', color: '#22d3ee', x: 210, d: 0 }, { word: 'Invigoration', color: '#818cf8', x: 540, d: 0.35 }, { word: 'Impact', color: '#e879f9', x: 870, d: 0.7 }].map(({ word, color, x, d }) => (
                <text key={word} x={x} y="135" textAnchor="middle" fontSize="42" fontWeight="500" letterSpacing="0.12em" fill={color} className="energy-card-word" style={{ animationDelay: `${d}s`, pointerEvents: 'none' }}>{word}</text>
              ))}
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

// Insurance card — heart under description; same gradient as amendments + trace + heartbeat + glow
export function InsurancePreview() {
  const gradId = 'insurance-home-heart-grad'
  const heartD =
    'M 160 68 C 144 52, 136 38, 136 30 C 136 24, 142 22, 148 26 C 152 28, 154 32, 160 38 C 166 32, 168 28, 172 26 C 178 22, 184 24, 184 30 C 184 38, 176 52, 160 68 Z'
  return (
    <div className="flex w-full min-w-0 items-start justify-start self-start bg-transparent">
      <style>{`
        @keyframes insurance-heart-trace {
          0% { stroke-dashoffset: 1; }
          28% { stroke-dashoffset: 0; }
          72% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: 1; }
        }
        @keyframes insurance-heart-beat {
          0%, 100% { transform: scale(1); }
          12% { transform: scale(1.08); }
          24% { transform: scale(1); }
          36% { transform: scale(1.05); }
          48% { transform: scale(1); }
        }
        @keyframes insurance-heart-glow {
          0%, 100% {
            filter: drop-shadow(0 0 4px rgba(34, 211, 238, 0.4)) drop-shadow(0 0 12px rgba(129, 140, 248, 0.25));
            opacity: 0.9;
          }
          50% {
            filter: drop-shadow(0 0 10px rgba(34, 211, 238, 0.55)) drop-shadow(0 0 20px rgba(167, 139, 250, 0.35));
            opacity: 1;
          }
        }
        .insurance-heart-beat-wrap {
          transform-origin: 160px 50px;
          animation: insurance-heart-beat 2.4s ease-in-out infinite;
        }
        .insurance-home-heart {
          stroke-linejoin: round;
          stroke-linecap: round;
          stroke-dasharray: 1;
          animation: insurance-heart-trace 3.2s ease-in-out infinite, insurance-heart-glow 2.4s ease-in-out infinite;
        }
      `}</style>
      <svg
        viewBox="0 0 320 100"
        className="block h-[104px] w-[338px] max-w-full shrink-0 overflow-visible"
        preserveAspectRatio="xMinYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="45%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        {/* Nudge path (min x ≈ 136) left so stroke hugs viewBox edge; -110 left a ~26u gap */}
        <g transform="translate(-134 0)">
          <g className="insurance-heart-beat-wrap">
            <path
              d={heartD}
              fill="none"
              stroke={`url(#${gradId})`}
              strokeWidth="2.85"
              pathLength="1"
              className="insurance-home-heart"
              style={{ strokeDasharray: 1 }}
            />
          </g>
        </g>
      </svg>
    </div>
  )
}

// Amendments card preview — squiggly line that becomes straighter (streamlining); same gradient line aesthetic
export function AmendmentsPreview() {
  const gradId = 'amendments-home-card-grad'
  const strokeClass = 'amendments-home-card-draw'
  // Two clear S-waves then smooth ease into straight so "streamlining" reads at a glance.
  const pathD =
    'M 0 50 C 20 8, 40 92, 60 50' +
    ' C 80 8, 100 92, 120 50' +
    ' C 138 18, 156 50, 175 50' +
    ' C 194 50, 213 50, 232 50 C 251 50, 270 50, 290 50 L 320 50'
  return (
    <div className="amendments-preview-wrap flex min-w-0 w-full min-h-[90px] items-center justify-center bg-transparent p-4" style={{ width: '100%' }}>
      <style>{`
        @keyframes amendments-home-pulse { 0%, 100% { filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.4)); } 50% { filter: drop-shadow(0 0 12px rgba(34, 211, 238, 0.6)); } }
        @keyframes amendments-home-draw { 0% { stroke-dashoffset: 1; } 25% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 0; } }
        .amendments-home-card-draw { stroke-dasharray: 1; animation: amendments-home-pulse 2.5s ease-in-out infinite, amendments-home-draw 3s ease-out infinite; }
      `}</style>
      <svg viewBox="0 0 320 100" width="280" height="80" className="block shrink-0 text-cyan-400" style={{ minWidth: 200, maxWidth: '100%' }} preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#818cf8" /><stop offset="45%" stopColor="#22d3ee" /><stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
        <path d={pathD} fill="none" stroke={`url(#${gradId})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.15" />
        <path d={pathD} fill="none" stroke={`url(#${gradId})`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={strokeClass} pathLength="1" style={{ strokeDasharray: 1 }} />
      </svg>
    </div>
  )
}


// Case study cards: 3 per row grid
const CASE_STUDY_CARDS = [
  { id: 'fctg', title: 'AI & Design', description: 'Presented a live talk showing Flight Centre\u2019s design team how AI tools can speed up their work.', path: '/stories/fctg-ai-talk', externalUrl: null, image: null, preview: 'energy' },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Redesigned travel insurance buying experience — +45% more customers added cover.',
    path: '/stories/insurance',
    image: null,
    preview: 'insurance'
  },
  { id: 'amendments', title: 'Amendments', description: 'Simplified post-booking changes — 75% faster for staff, 67% fewer steps.', path: '/stories/amendments', image: null, preview: 'amendments' }
]

/** Insurance card title */
function storyCardHeadingTitle(item) {
  if (item.preview === 'insurance') {
    return 'Insurance'
  }
  return item.title
}


/** Subtle scroll-linked vertical offset (Apple-style): element drifts as it crosses the viewport. */
function getScrollParallaxOffset(
  el,
  { strength = 0.11, maxPx = 20, focalFrac = 0.4 } = {}
) {
  if (!el) return 0
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  if (rect.bottom < -rect.height || rect.top > vh + rect.height) return 0
  const centerY = rect.top + rect.height / 2
  const focal = vh * focalFrac
  const raw = -(centerY - focal) * strength
  return Math.max(-maxPx, Math.min(maxPx, Math.round(raw * 10) / 10))
}

function Home() {
  const [storiesHeadingInView, setStoriesHeadingInView] = useState(false)
  const [capabilitiesInView, setCapabilitiesInView] = useState(false)
  const [, setCapabilitiesHeadingInView] = useState(false)
  const [logosInView, setLogosInView] = useState(false)
  const storiesHeadingRef = useRef(null)
  const storiesParallaxWrapRef = useRef(null)
  const capabilitiesRef = useRef(null)
  const capabilitiesHeadingRef = useRef(null)
  const capabilitiesParallaxWrapRef = useRef(null)
  const contactParallaxWrapRef = useRef(null)
  const logosRef = useRef(null)
  const capabilitiesCardsRef = useRef(null)
  const storyCardParallax0Ref = useRef(null)
  const storyCardParallax1Ref = useRef(null)
  const storyCardParallax2Ref = useRef(null)

  useEffect(() => { document.title = 'Joel Hickey — Product Design + AI Workflows' }, [])

  useEffect(() => {
    const el = storiesHeadingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStoriesHeadingInView(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = capabilitiesRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCapabilitiesInView(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const el = capabilitiesHeadingRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCapabilitiesHeadingInView(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const el = logosRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setLogosInView(true)
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.add('home-sky')
    return () => {
      document.body.classList.remove('home-sky')
    }
  }, [])

  const scrollToStories = useCallback((e) => {
    e.preventDefault()
    const el = document.getElementById('stories')
    if (!el) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
    window.history.replaceState(null, '', '#stories')
  }, [])

  useEffect(() => {
    if (window.location.hash !== '#stories') return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let cancelled = false
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (cancelled) return
        document.getElementById('stories')?.scrollIntoView({
          behavior: smooth ? 'smooth' : 'auto',
          block: 'start'
        })
      })
    })
    return () => {
      cancelled = true
    }
  }, [])

  /* Scroll-linked heading parallax — direct DOM updates, respects reduced motion */
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const headingWraps = [storiesParallaxWrapRef, capabilitiesParallaxWrapRef, contactParallaxWrapRef]
    const cardRefs = [storyCardParallax0Ref]
    let scheduled = 0

    const tick = () => {
      scheduled = 0
      for (const ref of headingWraps) {
        const wrap = ref.current
        if (!wrap) continue
        const target = wrap.querySelector('h2') ?? wrap
        const y = getScrollParallaxOffset(target)
        wrap.style.transform = y !== 0 ? `translate3d(0, ${y}px, 0)` : ''
      }
      for (const ref of cardRefs) {
        const wrap = ref.current
        if (!wrap) continue
        const y = getScrollParallaxOffset(wrap, {
          strength: 0.07,
          maxPx: 18,
          focalFrac: 0.42
        })
        wrap.style.transform = y !== 0 ? `translate3d(0, ${y}px, 0)` : ''
      }
    }

    const onScrollOrResize = () => {
      if (!scheduled) scheduled = requestAnimationFrame(tick)
    }

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)
    tick()

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      if (scheduled) cancelAnimationFrame(scheduled)
      for (const ref of headingWraps) {
        if (ref.current) ref.current.style.transform = ''
      }
      for (const ref of cardRefs) {
        if (ref.current) ref.current.style.transform = ''
      }
    }
  }, [])

  return (
    <div className="relative z-10 flex w-full flex-col items-center">
      <div className="home-hero relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl space-y-16 px-4 sm:px-6 text-center -mt-8 sm:-mt-16">
          <div className="hero-stack">
            <h1 className="hero-line text-[2.75rem] font-semibold leading-[1.1] tracking-normal sm:text-6xl md:text-8xl lg:text-9xl">
              <span className="inline-block w-fit" style={homeHeroNameGradientTextStyle}>
                Joel Hickey
              </span>
            </h1>
            <p className="hero-line mt-4 text-base font-light leading-snug tracking-wider text-slate-300 sm:text-xl md:text-2xl lg:text-3xl [animation-delay:120ms]">
              Senior Product Designer<span className="mx-2 sm:mx-3 text-slate-500" aria-hidden>·</span>AI Workflows
            </p>
            <p className="hero-line mt-5 flex flex-wrap items-center justify-center gap-y-1 text-center text-[11px] font-medium tracking-wider text-slate-400 sm:text-sm [animation-delay:180ms]">
              <span className="whitespace-nowrap">$2.4M revenue impact</span><span className="mx-1.5 sm:mx-2 text-slate-500" aria-hidden>·</span><span className="whitespace-nowrap">+45% customers buying</span><span className="mx-1.5 sm:mx-2 text-slate-500" aria-hidden>·</span><span className="whitespace-nowrap">75% time saved</span>
            </p>
            <div className="hero-line flex justify-center mt-6" style={{ animationDelay: '220ms' }}>
            <a
              href="#stories"
              onClick={scrollToStories}
              className="inline-block w-fit max-w-full rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent whitespace-nowrap min-h-[44px]"
            >
              View stories
            </a>
          </div>
          </div>
        </div>
      </div>
      {/* Work section: case study cards, 3 per row */}
      <section
        id="stories"
        className="relative z-10 w-full scroll-mt-6 min-h-screen overflow-visible bg-transparent pb-[112px]"
        aria-label="Stories"
      >
        <div className="w-full overflow-visible">
          <div ref={storiesParallaxWrapRef} className="w-full will-change-transform">
            <h2
              ref={storiesHeadingRef}
              className={`w-full pt-16 pb-20 text-center text-4xl font-bold tracking-wide sm:pt-[112px] sm:pb-32 sm:text-6xl md:pb-36 md:text-7xl lg:text-8xl transition-all duration-700 ease-out bg-home-h2-stories bg-clip-text text-transparent ${
                storiesHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Stories
            </h2>
          </div>
          <div className="w-full px-4 sm:px-10 pb-8">
          <div ref={storyCardParallax0Ref} className="grid grid-cols-1 gap-10 md:grid-cols-2 will-change-transform">
            {/* Row 1: AI talk — spans full width */}
            <div className="md:col-span-2 group relative flex min-w-0 transition-all duration-500 hover:translate-y-[-2px]">
              <div className="w-full min-w-0">
                <div
                  className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-home-card border border-white/10 py-14 transition-shadow duration-500 md:flex-row md:py-16 shadow-home-card-glow group-hover:shadow-home-card-glow-hover"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                  <div className="relative flex min-w-0 flex-1 flex-col items-start text-left justify-start px-5 sm:px-10 md:px-11 lg:px-12">
                    <h3 className="text-2xl font-semibold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">
                      {CASE_STUDY_CARDS[0].title}
                    </h3>
                    <p className="mt-4 text-base font-extralight tracking-wider text-white sm:mt-6 sm:text-xl md:text-2xl">{CASE_STUDY_CARDS[0].description}</p>
                    <Link
                      to={CASE_STUDY_CARDS[0].path}
                      aria-label={`View story: ${CASE_STUDY_CARDS[0].title}`}
                      className="mt-6 hidden md:inline-flex items-center rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
                    >
                      View story
                    </Link>
                  </div>
                  <div className="relative mt-6 md:mt-0 w-full shrink-0 overflow-hidden md:w-[52%] md:min-w-0 md:max-w-[640px] flex items-center justify-center px-5 sm:px-10 md:px-12">
                    <div className="w-full [aspect-ratio:1100/280] flex items-center justify-center">
                      <FCTGEnergyPreview />
                    </div>
                  </div>
                  <div className="mt-6 px-5 sm:px-10 md:hidden">
                    <Link
                      to={CASE_STUDY_CARDS[0].path}
                      aria-label={`View story: ${CASE_STUDY_CARDS[0].title}`}
                      className="inline-flex items-center rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
                    >
                      View story
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* Row 2: Insurance + Amendments — same structure as AI card */}
            {CASE_STUDY_CARDS.slice(1, 3).map((item) => (
              <div
                key={item.id}
                className="group relative flex min-w-0 transition-all duration-500 hover:translate-y-[-2px]"
              >
                <div className="w-full min-w-0">
                  <div
                    className="relative flex h-full w-full min-w-0 flex-col overflow-hidden rounded-home-card border border-white/10 py-14 md:py-16 transition-shadow duration-500 shadow-home-card-glow group-hover:shadow-home-card-glow-hover"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <div className="relative flex min-w-0 flex-col items-start text-left justify-start px-5 sm:px-10 md:px-11 lg:px-12">
                      <h3
                        className="text-2xl font-semibold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl"
                        {...(item.preview === 'insurance' ? { 'aria-label': 'Insurance' } : {})}
                      >
                        {storyCardHeadingTitle(item)}
                      </h3>
                      <p className="mt-4 text-base font-extralight tracking-wider text-white sm:mt-6 sm:text-xl md:text-2xl">
                        {item.description}
                      </p>
                    </div>
                    <div className="mt-6 px-5 sm:px-10 md:px-11 lg:px-12">
                      {item.preview === 'insurance' && (
                        <div className="w-full max-w-[360px]">
                          <InsurancePreview />
                        </div>
                      )}
                      {item.preview === 'amendments' && (
                        <div className="w-full max-w-[280px]">
                          <AmendmentsPreview />
                        </div>
                      )}
                    </div>
                    <div className="mt-6 px-5 sm:px-10 md:px-11 lg:px-12">
                      {item.path ? (
                        <Link
                          to={item.path}
                          aria-label={`View story: ${item.title}`}
                          className="inline-flex items-center rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
                        >
                          View story
                        </Link>
                      ) : (
                        <span className="inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25">
                          Coming soon
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center pt-20">
            {/*
              Gradient “ring” trick: outer has bg-home-cta + p-px; inner must be opaque (e.g. bg-black).
              bg-transparent on the inner shows the parent’s full gradient — reads as a solid fill, not a ring.
            */}
            <div className="inline-block rounded-full bg-home-cta p-px shadow-sm shadow-violet-500/15 transition hover:shadow-violet-500/25 hover:brightness-105">
              <Link
                to="/stories"
                className="inline-flex items-center rounded-full bg-black px-5 py-2.5 text-base font-normal tracking-wider outline-none transition hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
              >
                <span className="bg-home-cta-label bg-clip-text text-transparent">
                  View more stories
                </span>
              </Link>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section ref={capabilitiesRef} className="relative z-10 w-full min-h-screen overflow-visible bg-transparent" aria-label="How I create value">
        <div className="w-full overflow-visible">
          {/* pb-48/md:pb-52 — extra space vs Stories h2: star map orbits overflow the box; tighter pb reads cramped */}
          <div ref={capabilitiesParallaxWrapRef} className="w-full will-change-transform">
            <h2
              ref={capabilitiesHeadingRef}
              className={`w-full pt-16 pb-20 text-center text-4xl font-bold tracking-wide sm:pt-[112px] sm:pb-32 sm:text-6xl md:pb-36 md:text-7xl lg:text-8xl transition-all duration-700 ease-out bg-home-h2-value bg-clip-text text-transparent ${
                capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              How I create value
            </h2>
          </div>
          <div
            ref={capabilitiesCardsRef}
            className={`mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-6 px-6 pb-16 md:grid-cols-[4fr_5fr_4fr] md:gap-6 md:px-10 md:pb-24 transition-all duration-700 ease-out ${
              capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex flex-col gap-8 md:gap-10">
              {[
                { title: 'Strategy', desc: 'I bring different teams together to plan and deliver — from insurance to travel changes to shipping.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <circle cx="5" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="12" cy="19" r="2" /><circle cx="12" cy="11" r="1.5" />
                    <path d="M6.8 6.2l3.7 3.3M17.2 6.2l-3.7 3.3M12 13v4" />
                  </svg>
                )},
                { title: 'Research', desc: 'I test designs with real users, compare options side by side, and watch how people actually use the product.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <path d="M3 20h18M6 16V10M10 16V6M14 16V12M18 16V8" strokeLinecap="round" />
                    <path d="M3 14l4-6 4 4 4-6 4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )},
                { title: 'Leadership', desc: 'I present to teams, run workshops, and set up clear steps for turning designs into working software.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.5" />
                    <path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2" strokeLinecap="round" />
                    <path d="M17 12a4 4 0 014 4v1" strokeLinecap="round" />
                  </svg>
                )},
              ].map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-home-card border border-white/10 px-6 py-5 shadow-home-card-glow transition-shadow duration-300 hover:shadow-home-card-glow-hover md:px-8 md:py-6"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)', transitionDelay: capabilitiesInView ? `${200 + i * 120}ms` : '0ms' }}
                >
                  <div className="flex items-center gap-2.5">
                    {p.icon}
                    <h3 className="text-base font-semibold tracking-wider text-white md:text-lg">{p.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm font-light leading-relaxed tracking-wider text-slate-300 md:text-base">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute bottom-0 left-1/2 animate-[hover-glow_4s_ease-in-out_infinite]"
                style={{ width: 0, height: 0, borderLeft: '80px solid transparent', borderRight: '80px solid transparent', borderTop: '48px solid rgba(34,211,238,0.35)', filter: 'blur(18px)' }}
              />
              <img
                src="/images/value-section-hero.png"
                alt="Designer orchestrating strategy, research, craft, systems, and AI"
                className="relative h-[240px] w-auto object-contain sm:h-[280px] md:h-[340px] lg:h-[400px] animate-[value-float_4s_ease-in-out_infinite]"
              />
            </div>
            <div className="flex flex-col gap-8 md:gap-10">
              {[
                { title: 'AI & Automation', desc: 'I use AI tools in my daily work — I built this portfolio with them and teach other designers how.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <ellipse cx="12" cy="12" rx="8" ry="9" />
                    <path d="M8 8.5c0 1 .8 2 2 2.5s2.5.3 3.5-.5M9 15c1 .8 3 1 4.5 0" strokeLinecap="round" />
                    <circle cx="9" cy="8" r="0.75" fill="currentColor" /><circle cx="15" cy="8" r="0.75" fill="currentColor" />
                    <path d="M4 10H2M20 10h2M4 15H2M20 15h2M7 3L6 1M17 3l1-2" strokeLinecap="round" />
                  </svg>
                )},
                { title: 'Craft', desc: 'I design real features — insurance purchasing, booking changes, system connections — used by thousands every day.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <rect x="3" y="3" width="18" height="18" rx="3" />
                    <path d="M3 9h18M9 9v12" strokeLinecap="round" />
                    <rect x="12" y="12" width="6" height="4" rx="1" />
                  </svg>
                )},
                { title: 'Systems', desc: 'I create ready-made building blocks, clear instructions, and shared guides so the whole team works faster.', icon: (
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5 text-cyan-400">
                    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
                    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
                  </svg>
                )},
              ].map((p, i) => (
                <div
                  key={p.title}
                  className="rounded-home-card border border-white/10 px-6 py-5 shadow-home-card-glow transition-shadow duration-300 hover:shadow-home-card-glow-hover md:px-8 md:py-6"
                  style={{ backgroundColor: 'rgba(0,0,0,0.5)', transitionDelay: capabilitiesInView ? `${200 + (i + 3) * 120}ms` : '0ms' }}
                >
                  <div className="flex items-center gap-2.5">
                    {p.icon}
                    <h3 className="text-base font-semibold tracking-wider text-white md:text-lg">{p.title}</h3>
                  </div>
                  <p className="mt-1.5 text-sm font-light leading-relaxed tracking-wider text-slate-300 md:text-base">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        ref={logosRef}
        className="relative z-10 w-full bg-transparent"
        aria-label="Brands I've designed for"
      >
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-10 pt-[112px] pb-[112px]">
          <div className={`w-full mx-auto transition-all duration-700 ease-out ${logosInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <h2 className="text-center text-2xl font-light tracking-wider text-slate-300 md:text-3xl lg:text-4xl">
              Brands I've designed for
            </h2>
          </div>
          <div className={`mt-14 flex w-full flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:mt-16 sm:gap-x-16 md:gap-x-28 lg:gap-x-36 transition-all duration-700 ease-out delay-200 ${logosInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <img src="/images/logos/flight-centre.png" alt="Flight Centre Travel Group" className="h-8 w-auto object-contain brightness-0 invert sm:h-10 md:h-14 lg:h-16" />
            <img src="/images/logos/canstar.png" alt="Canstar" className="h-10 w-auto object-contain sm:h-12 md:h-16 lg:h-20" />
            <img src="/images/logos/temando.png" alt="Temando" className="h-3.5 w-auto object-contain sm:h-4 md:h-6 lg:h-7" />
          </div>
        </div>
      </section>
      <section className="relative z-10 w-full min-h-screen bg-transparent pb-[112px]" aria-label="Get in touch">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-10 pt-[112px] pb-8 text-center">
          <div ref={contactParallaxWrapRef} className="w-full will-change-transform">
            <h2 className="w-full pb-8 text-center text-4xl font-bold tracking-wide sm:text-6xl md:pb-10 md:text-7xl lg:text-8xl bg-[linear-gradient(90deg,#cffafe_0%,#67e8f9_24%,#818cf8_52%,#c084fc_78%,#f5d0fe_100%)] bg-clip-text text-transparent">
              Get in touch
            </h2>
          </div>
          <div className="w-full text-center">
            <p className="inline-block text-base font-extralight leading-relaxed tracking-wider text-white md:text-lg">
              Open to senior product design contracts — strategy, hands-on design, and AI-powered tools.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:joelhickeydesigns@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
            >
              <HiOutlineMail className="shrink-0" size={20} aria-hidden />
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/joelhickey"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn (opens in a new tab)"
              className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
            >
              <SiLinkedin className="shrink-0" size={20} aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
