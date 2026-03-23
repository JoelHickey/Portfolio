import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineMail } from 'react-icons/hi'
import { SiLinkedin } from 'react-icons/si'
import ParticleBackground from '../components/ParticleBackground'
import { FCTG_PRESO_URL } from '../constants/preso'
import BatteryParticleFill from '../components/BatteryParticleFill'
import { homeHeroNameGradientTextStyle } from '../design-system/home'
import { applyStarMapOrbitTransform } from '../hooks/useStarMapBounceIntro.js'

// Energy slide preview for FCTG AI talk card — full battery from slide "Energy / What charges your designer battery?"
export function FCTGEnergyPreview() {
  return (
    <div className="flex min-w-0 h-full w-full flex-col bg-transparent">
      <div className="flex-1 min-h-0 min-w-0 flex items-center justify-center px-1 py-1">
        <div className="w-full h-full max-h-[120px] md:max-h-[152px]" style={{ aspectRatio: '1100/280' }}>
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
            <title>Energy battery</title>
            <defs>
              <linearGradient id="energy-card-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" /><stop offset="25%" stopColor="#2dd4bf" /><stop offset="50%" stopColor="#818cf8" /><stop offset="75%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#e879f9" />
              </linearGradient>
              <clipPath id="energy-card-clip"><rect x="44" y="32" width="992" height="186" rx="6" /></clipPath>
            </defs>
            {[{ y: 80, d: 0 }, { y: 130, d: 0.3 }, { y: 180, d: 0.6 }, { y: 105, d: 0.15 }, { y: 155, d: 0.45 }, { y: 60, d: 0.5 }, { y: 210, d: 0.2 }, { y: 115, d: 0.75 }, { y: 165, d: 0.35 }].map((p, i) => (
              <circle key={i} cx="1068" cy={p.y} r="3" fill="rgba(34, 211, 238, 0.9)" className="energy-card-charge-in" style={{ animationDelay: `${p.d}s` }} />
            ))}
            <rect x="40" y="28" width="1000" height="204" rx="10" fill="none" stroke="url(#energy-card-grad)" strokeWidth="2" className="energy-card-body" />
            <rect x="4" y="78" width="36" height="104" rx="6" fill="none" stroke="url(#energy-card-grad)" strokeWidth="2" />
            <text x="22" y="130" textAnchor="middle" dominantBaseline="middle" fill="url(#energy-card-grad)" fontSize="32" fontWeight="800">−</text>
            <rect x="1040" y="78" width="36" height="104" rx="6" fill="none" stroke="url(#energy-card-grad)" strokeWidth="2" />
            <text x="1058" y="130" textAnchor="middle" dominantBaseline="middle" fill="url(#energy-card-grad)" fontSize="32" fontWeight="800">+</text>
            <g clipPath="url(#energy-card-clip)">
              <foreignObject x="44" y="32" width="992" height="186">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 6, pointerEvents: 'none' }}>
                  <BatteryParticleFill width={992} height={186} />
                </div>
              </foreignObject>
              {[{ x: 160, y: 90, d: 0 }, { x: 330, y: 130, d: 0.4 }, { x: 540, y: 95, d: 0.8 }, { x: 440, y: 165, d: 0.2 }, { x: 710, y: 110, d: 0.5 }, { x: 820, y: 80, d: 0.1 }, { x: 875, y: 145, d: 0.6 }, { x: 935, y: 105, d: 0.3 }, { x: 270, y: 120, d: 0.7 }].map((b, i) => (
                <circle key={i} cx={b.x} cy={b.y} r="3.5" fill="rgba(255,255,255,0.65)" className="energy-card-bubble" style={{ animationDelay: `${b.d}s` }} />
              ))}
              <foreignObject x="44" y="89" width="992" height="72">
                <div xmlns="http://www.w3.org/1999/xhtml" style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-evenly', boxSizing: 'border-box', pointerEvents: 'none' }}>
                  {[{ word: 'Innovation', color: '#22d3ee', d: 0 }, { word: 'Invigoration', color: '#818cf8', d: 0.35 }, { word: 'Impact', color: '#e879f9', d: 0.7 }].map(({ word, color, d }) => (
                    <span key={word} className="energy-card-word" style={{ flex: '0 0 auto', fontSize: 46, fontWeight: 500, color, whiteSpace: 'nowrap', letterSpacing: '0.12em', animationDelay: `${d}s` }}>{word}</span>
                  ))}
                </div>
              </foreignObject>
            </g>
          </svg>
        </div>
      </div>
    </div>
  )
}

// Insurance card — heart under description; same gradient as amendments + trace + heartbeat + glow
function InsurancePreview() {
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
        <title>Insurance</title>
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
function AmendmentsPreview() {
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
        <title>Streamlining Amendments — from winding to straight</title>
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

function CRMLinkingPreview() {
  return (
    <div className="flex min-h-0 w-full items-center justify-center bg-transparent p-2">
      <div
        className="relative flex w-full max-w-[340px] items-center justify-center overflow-hidden rounded-[28px] border border-white/10 px-4 py-5"
        style={{
          background:
            'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.14), transparent 32%), radial-gradient(circle at 78% 28%, rgba(129, 140, 248, 0.16), transparent 32%), linear-gradient(135deg, rgba(2, 6, 23, 0.88) 0%, rgba(15, 23, 42, 0.72) 40%, rgba(0, 0, 0, 0.7) 100%)'
        }}
      >
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="rounded-2xl border border-cyan-400/20 bg-white/5 px-3 py-4 text-center backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">CRM</p>
            <p className="mt-2 text-sm font-semibold text-white md:text-base">Microsoft</p>
          </div>
          <div className="text-center text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80 md:text-xs">
            Deep link
          </div>
          <div className="rounded-2xl border border-violet-400/20 bg-white/5 px-3 py-4 text-center backdrop-blur-sm">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Product</p>
            <p className="mt-2 text-sm font-semibold text-white md:text-base">Helio</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Case study cards: 3 per row grid
const CASE_STUDY_CARDS = [
  { id: 'fctg', title: 'Agentic AI', description: 'Presented live, March 2026.', path: null, externalUrl: FCTG_PRESO_URL, image: null, preview: 'energy' },
  {
    id: 'insurance',
    title: 'Insurance',
    description: 'Coverage woven into the travel journey.',
    path: '/stories/insurance',
    image: null,
    preview: 'insurance'
  },
  { id: 'amendments', title: 'Amendments', description: 'Updates to travel components simplified.', path: '/stories/amendments', image: null, preview: 'amendments' },
  { id: 'placeholder-1', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null, preview: null },
  { id: 'placeholder-2', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null, preview: null }
]

/** Insurance card title */
function storyCardHeadingTitle(item) {
  if (item.preview === 'insurance') {
    return 'Insurance'
  }
  return item.title
}

const PILLARS = ['Strategy', 'Craft', 'Research', 'Systems', 'AI']

/*
 * Outer ring: five pillars ×3 satellites each (AI: augment → steer → trust).
 */
const OUTER_RING = [
  { label: 'Direction', pillar: 0 },
  { label: 'Focus', pillar: 0 },
  { label: 'Align', pillar: 0 },
  { label: 'Usability', pillar: 1 },
  { label: 'Visual', pillar: 1 },
  { label: 'Detail', pillar: 1 },
  { label: 'Discover', pillar: 2 },
  { label: 'Validate', pillar: 2 },
  { label: 'Learn', pillar: 2 },
  { label: 'Scale', pillar: 3 },
  { label: 'Integrate', pillar: 3 },
  { label: 'Sustain', pillar: 3 },
  { label: 'Augment', pillar: 4 },
  { label: 'Steer', pillar: 4 },
  { label: 'Trust', pillar: 4 }
]

const STAR_MAP_NODE_COUNT = PILLARS.length + OUTER_RING.length

/** Inner pillars: regular pentagon on the orbit (-90° = top, clockwise). */
const INNER_ORBIT_START_DEG = -90
const STAR_CHART_INNER = PILLARS.map((_, i) => ({
  angle: INNER_ORBIT_START_DEG + i * (360 / PILLARS.length),
  radiusScale: 1
}))

/*
 * Outer satellites: wider ±° clusters around each pillar ray so labels don’t stack (esp. Systems).
 * Hub angles: Strategy -90°, Craft -18°, Research 54°, Systems 126°, AI 198° (−162°).
 */
const STAR_CHART_OUTER = [
  { angle: -110, radiusScale: 0.93 },
  { angle: -90, radiusScale: 1 },
  { angle: -70, radiusScale: 0.97 },
  { angle: -38, radiusScale: 0.94 },
  { angle: -18, radiusScale: 1.03 },
  { angle: 2, radiusScale: 0.92 },
  { angle: 34, radiusScale: 0.94 },
  { angle: 54, radiusScale: 1.02 },
  { angle: 74, radiusScale: 0.95 },
  { angle: 104, radiusScale: 0.92 },
  { angle: 126, radiusScale: 1.06 },
  { angle: 148, radiusScale: 0.94 },
  { angle: -182, radiusScale: 0.92 },
  { angle: -162, radiusScale: 1.05 },
  { angle: -142, radiusScale: 0.94 }
]
const OUTER_RING_RADIUS_MULTIPLIER = 2

/** SVG segments: core → inner pillars, then inner → outer satellites (trimmed to disc edges). */
function measureStarMapConnectors(containerEl, starsRef, coreRef) {
  if (!containerEl) return null
  const stars = starsRef?.current
  if (!stars || stars.length < PILLARS.length + OUTER_RING.length) return null
  const w = containerEl.offsetWidth
  const h = containerEl.offsetHeight
  if (w < 1 || h < 1) return null
  const c = containerEl.getBoundingClientRect()
  const innerCount = PILLARS.length
  const lines = []

  const coreEl = coreRef?.current
  if (coreEl) {
    const cr = coreEl.getBoundingClientRect()
    const cxc = cr.left + cr.width / 2 - c.left
    const cyc = cr.top + cr.height / 2 - c.top
    const rCore = Math.max(cr.width, cr.height) / 2
    for (let pi = 0; pi < PILLARS.length; pi++) {
      const innerEl = stars[pi]
      if (!innerEl) continue
      const ir = innerEl.getBoundingClientRect()
      const ixc = ir.left + ir.width / 2 - c.left
      const iyc = ir.top + ir.height / 2 - c.top
      let dx = ixc - cxc
      let dy = iyc - cyc
      const len = Math.hypot(dx, dy) || 1e-6
      const ux = dx / len
      const uy = dy / len
      const rInner = Math.max(ir.width, ir.height) / 2
      if (len <= rCore + rInner + 2) continue
      lines.push({
        kind: 'core',
        pillar: pi,
        x1: cxc + ux * rCore,
        y1: cyc + uy * rCore,
        x2: ixc - ux * rInner,
        y2: iyc - uy * rInner
      })
    }
  }

  for (let i = 0; i < OUTER_RING.length; i++) {
    const { pillar } = OUTER_RING[i]
    const innerEl = stars[pillar]
    const outerEl = stars[innerCount + i]
    if (!innerEl || !outerEl) continue
    const ir = innerEl.getBoundingClientRect()
    const or = outerEl.getBoundingClientRect()
    const ixc = ir.left + ir.width / 2 - c.left
    const iyc = ir.top + ir.height / 2 - c.top
    const oxc = or.left + or.width / 2 - c.left
    const oyc = or.top + or.height / 2 - c.top
    let dx = oxc - ixc
    let dy = oyc - iyc
    const len = Math.hypot(dx, dy) || 1e-6
    const ux = dx / len
    const uy = dy / len
    /* Circle radii — trim segment so strokes don’t run through disc interiors */
    const rInner = Math.max(ir.width, ir.height) / 2
    const rOuter = Math.max(or.width, or.height) / 2
    if (len <= rInner + rOuter + 2) continue
    lines.push({
      kind: 'spoke',
      x1: ixc + ux * rInner,
      y1: iyc + uy * rInner,
      x2: oxc - ux * rOuter,
      y2: oyc - uy * rOuter,
      pillar,
      outerIndex: i
    })
  }
  return lines.length ? { w, h, lines } : null
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
  const [capabilitiesCardsInView, setCapabilitiesCardsInView] = useState(false)
  const [showAllCapabilities, setShowAllCapabilities] = useState(false)
  const [selectedPillarIndex, setSelectedPillarIndex] = useState(0)
  const [starMapMeasure, setStarMapMeasure] = useState({ size: 0, radius: 100, radiusOuter: 200 })
  const [starMapConnectors, setStarMapConnectors] = useState(null)
  const storiesHeadingRef = useRef(null)
  const storiesParallaxWrapRef = useRef(null)
  const capabilitiesRef = useRef(null)
  const capabilitiesHeadingRef = useRef(null)
  const capabilitiesParallaxWrapRef = useRef(null)
  const contactParallaxWrapRef = useRef(null)
  const capabilitiesCardsRef = useRef(null)
  const starMapRef = useRef(null)
  const starMapCoreRef = useRef(null)
  const starMapStarRefs = useRef(Array.from({ length: STAR_MAP_NODE_COUNT }, () => null))

  const starMapLayouts = useMemo(
    () => [
      ...STAR_CHART_INNER.map((c) => ({
        angle: c.angle,
        outer: false,
        radiusScale: c.radiusScale
      })),
      ...STAR_CHART_OUTER.map((c) => ({
        angle: c.angle,
        outer: true,
        radiusScale: c.radiusScale
      }))
    ],
    []
  )

  const storyCardParallax0Ref = useRef(null)
  const storyCardParallax1Ref = useRef(null)
  const storyCardParallax2Ref = useRef(null)

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
    const el = capabilitiesCardsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setCapabilitiesCardsInView(true)
      },
      { threshold: 0.2 }
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

  useLayoutEffect(() => {
    const el = starMapRef.current
    if (!el) return
    const measure = () => {
      const w = el.offsetWidth
      const r = parseFloat(getComputedStyle(el).getPropertyValue('--cap-radius').trim()) || 100
      setStarMapMeasure({ size: w, radius: r, radiusOuter: r * OUTER_RING_RADIUS_MULTIPLIER })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [capabilitiesInView])

  useLayoutEffect(() => {
    if (!capabilitiesInView) return
    const refs = starMapStarRefs.current
    starMapLayouts.forEach((layout, i) => {
      const el = refs[i]
      if (el) applyStarMapOrbitTransform(el, layout)
    })
  }, [capabilitiesInView, starMapLayouts])

  /* Pillar → capability connector lines (re-measure on resize). */
  useLayoutEffect(() => {
    const el = starMapRef.current
    if (!el) return
    let rafId = 0
    let rafId2 = 0
    const update = () => {
      setStarMapConnectors(measureStarMapConnectors(el, starMapStarRefs, starMapCoreRef))
    }
    update()
    rafId = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(update)
    })
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(update)
    })
    ro.observe(el)
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      if (rafId2) cancelAnimationFrame(rafId2)
      ro.disconnect()
    }
  }, [capabilitiesInView, starMapLayouts])

  /* Scroll-linked heading parallax — direct DOM updates, respects reduced motion */
  useLayoutEffect(() => {
    if (typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return

    const headingWraps = [storiesParallaxWrapRef, capabilitiesParallaxWrapRef, contactParallaxWrapRef]
    const cardRefs = [storyCardParallax0Ref, storyCardParallax1Ref, storyCardParallax2Ref]
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
    <section className="relative z-10 flex w-full flex-col items-center">
      <div className="home-hero relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden">
        <div className="relative z-10 mx-auto w-full max-w-6xl space-y-16 px-6 text-center -mt-16">
          <div className="hero-stack">
            <p className="hero-line text-7xl font-semibold leading-[1.1] tracking-normal md:text-8xl lg:text-9xl">
              <span className="inline-block w-fit" style={homeHeroNameGradientTextStyle}>
                Joel Hickey
              </span>
            </p>
            <p className="hero-line mt-2 text-base font-light leading-snug tracking-wider text-slate-200 sm:text-xl md:text-2xl lg:text-3xl mb-10 [animation-delay:120ms]">
              Designing high‑impact products that people love using.
            </p>
            <div className="hero-line flex justify-center mt-1" style={{ animationDelay: '200ms' }}>
            <a
              href="#stories"
              onClick={scrollToStories}
              className="inline-block w-fit max-w-full rounded-full bg-home-cta px-8 py-4 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent whitespace-nowrap"
            >
              Explore
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
              className={`w-full pt-[112px] pb-32 text-center text-6xl font-bold tracking-wide md:pb-36 md:text-7xl lg:text-8xl transition-all duration-700 ease-out bg-home-h2-stories bg-clip-text text-transparent ${
                storiesHeadingInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Stories
            </h2>
          </div>
          <div className="w-full px-10 pb-8">
          {/* Row 1: AI talk only — shorter aspect to reduce height */}
          <div className="w-full">
              {CASE_STUDY_CARDS.slice(0, 1).map((item) => (
                <div
                  key={item.id}
                  className="group relative flex min-w-0 transition-all duration-500 hover:translate-y-[-2px]"
                >
                  {item.externalUrl ? (
                    <div
                      ref={storyCardParallax0Ref}
                      className="will-change-transform w-full min-w-0"
                    >
                    <div
                      className={`relative flex h-full min-h-[320px] w-full min-w-0 flex-col overflow-hidden rounded-home-card border border-white/10 py-16 transition-shadow duration-500 md:min-h-[380px] md:flex-row md:py-20 shadow-home-card-glow group-hover:shadow-home-card-glow-hover`}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                    >
                      <div className="relative flex min-w-0 flex-1 flex-col items-start text-left justify-start px-12 md:px-14">
                        <h3 className="text-4xl font-semibold tracking-wide text-white md:text-5xl lg:text-6xl">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-xl font-extralight tracking-wider text-white md:text-2xl">{item.description}</p>
                        <a
                          href={item.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-6 inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110"
                        >
                          Open presentation
                        </a>
                      </div>
                      <div className="relative w-full shrink-0 overflow-hidden md:w-[52%] md:min-w-0 md:max-w-[640px] flex items-center justify-center px-10 md:px-12">
                        <div className="w-full max-h-[180px] md:max-h-[280px] [aspect-ratio:1100/280] flex items-center justify-center">
                          <FCTGEnergyPreview />
                        </div>
                      </div>
                    </div>
                    </div>
                  ) : null}
                </div>
              ))}
          </div>
          {/* Row 2: Insurance + Amendments — items-start so card height = content + padding (same as AI card) */}
          <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
            {CASE_STUDY_CARDS.slice(1, 3).map((item, rowIdx) => (
              <div
                key={item.id}
                className="group relative flex min-w-0 transition-all duration-500 hover:translate-y-[-2px]"
              >
                {item.externalUrl ? (
                  <div
                    ref={rowIdx === 0 ? storyCardParallax1Ref : storyCardParallax2Ref}
                    className="will-change-transform w-full min-w-0"
                  >
                  <div
                    className={`relative flex h-full min-h-[320px] w-full min-w-0 flex-col overflow-hidden rounded-home-card border border-white/10 ${item.preview === 'insurance' || item.preview === 'amendments' ? 'py-20 md:py-24' : 'py-12 md:py-14'} transition-shadow duration-500 md:min-h-[380px] md:flex-row shadow-home-card-glow group-hover:shadow-home-card-glow-hover`}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                  >
                    <div className="relative flex min-w-0 flex-1 flex-col items-start text-left justify-start px-10 md:px-11 lg:px-12">
                      <h3
                        className={`font-semibold tracking-wide ${
                          item.preview === 'insurance' || item.preview === 'amendments'
                            ? 'text-4xl md:text-5xl lg:text-6xl'
                            : 'text-5xl md:text-6xl lg:text-7xl'
                        } ${
                          item.preview === 'insurance' || item.preview === 'amendments'
                            ? 'text-white'
                            : `bg-home-card-title-on-dark bg-clip-text text-transparent`
                        }`}
                        {...(item.preview === 'insurance' ? { 'aria-label': 'Insurance' } : {})}
                      >
                        {storyCardHeadingTitle(item)}
                      </h3>
                      <p className="mt-3 whitespace-nowrap font-extralight tracking-wider text-white text-xl md:text-2xl">
                        {item.description}
                      </p>
                      {item.preview === 'insurance' && (
                        <div className="mt-4 w-full max-w-[360px] shrink-0">
                          <InsurancePreview />
                        </div>
                      )}
                      <a
                        href={item.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110"
                      >
                        Open presentation
                      </a>
                    </div>
                    <div className="relative w-full shrink-0 overflow-hidden md:w-[40%] md:min-w-0 md:max-w-[300px] flex items-center justify-center px-6 md:px-8">
                      <div className="w-full min-h-[100px] max-h-[140px] md:min-h-[120px] md:max-h-[220px] flex items-center justify-center overflow-visible">
                        {item.preview === 'insurance' ? (
                          <div className="h-full w-full min-h-[80px] rounded-lg bg-cyan-950/20" aria-hidden />
                        ) : item.preview === 'amendments' ? (
                          <AmendmentsPreview />
                        ) : item.preview === 'crm-helio' ? (
                          <CRMLinkingPreview />
                        ) : item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="h-full w-full bg-cyan-950/40" aria-hidden />
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                ) : (
                  <div
                    ref={rowIdx === 0 ? storyCardParallax1Ref : storyCardParallax2Ref}
                    className="will-change-transform w-full min-w-0"
                  >
                  <div className={`relative flex h-full min-h-[320px] w-full min-w-0 flex-col overflow-hidden rounded-home-card border border-white/10 ${item.preview === 'insurance' || item.preview === 'amendments' ? 'py-20 md:py-24' : 'py-12 md:py-14'} transition-shadow duration-500 md:min-h-[380px] md:flex-row shadow-home-card-glow group-hover:shadow-home-card-glow-hover`}
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="relative flex min-w-0 flex-1 flex-col items-start text-left justify-start px-10 md:px-11 lg:px-12">
                      <h3
                        className={`font-semibold tracking-wide ${
                          item.preview === 'insurance' || item.preview === 'amendments'
                            ? 'text-4xl md:text-5xl lg:text-6xl'
                            : 'text-5xl md:text-6xl lg:text-7xl'
                        } ${
                          item.preview === 'insurance' || item.preview === 'amendments'
                            ? 'text-white'
                            : `bg-home-card-title-on-dark bg-clip-text text-transparent`
                        }`}
                        {...(item.preview === 'insurance' ? { 'aria-label': 'Insurance' } : {})}
                      >
                        {storyCardHeadingTitle(item)}
                      </h3>
                      <p className="mt-3 whitespace-nowrap font-extralight tracking-wider text-white text-xl md:text-2xl">
                        {item.description}
                      </p>
                      {item.preview === 'insurance' && (
                        <div className="mt-4 w-full max-w-[360px] shrink-0">
                          <InsurancePreview />
                        </div>
                      )}
                      {item.preview === 'amendments' && (
                        <div className="mt-4 w-full max-w-[280px] shrink-0">
                          <AmendmentsPreview />
                        </div>
                      )}
                      {item.path ? (
                        <Link
                          to={item.path}
                          className="mt-auto inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                        >
                          View story
                        </Link>
                      ) : (
                        <span className="mt-auto inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25">
                          Coming soon
                        </span>
                      )}
                    </div>
                    <div className="relative w-full shrink-0 overflow-hidden md:w-[40%] md:min-w-0 md:max-w-[300px] flex items-center justify-center px-6 md:px-8">
                      <div className="w-full min-h-[100px] max-h-[140px] md:min-h-[120px] md:max-h-[220px] flex items-center justify-center overflow-visible">
                        {item.preview === 'insurance' || item.preview === 'amendments' ? (
                          <div className="h-full w-full min-h-[80px] rounded-lg bg-cyan-950/20" aria-hidden />
                        ) : item.preview === 'crm-helio' ? (
                          <CRMLinkingPreview />
                        ) : item.image ? (
                          <img
                            src={item.image}
                            alt=""
                            className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <div className="h-full w-full bg-cyan-950/40" aria-hidden />
                        )}
                      </div>
                    </div>
                  </div>
                  </div>
                )}
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
                className="block rounded-full bg-black px-5 py-2.5 text-base font-normal tracking-wider outline-none transition hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
      <section ref={capabilitiesRef} className="relative z-10 w-full min-h-screen overflow-visible bg-transparent pb-[112px]" aria-label="How I create value">
        <div className="w-full overflow-visible">
          {/* pb-48/md:pb-52 — extra space vs Stories h2: star map orbits overflow the box; tighter pb reads cramped */}
          <div ref={capabilitiesParallaxWrapRef} className="w-full will-change-transform">
            <h2
              ref={capabilitiesHeadingRef}
              className={`w-full pt-[112px] pb-48 text-center text-6xl font-bold tracking-wide md:pb-52 md:text-7xl lg:text-8xl transition-all duration-700 ease-out bg-home-h2-value bg-clip-text text-transparent ${
                capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              How I create value
            </h2>
          </div>
          <div className="w-full px-10 pb-16 sm:pb-20 md:pb-24 lg:pb-32">
            <div
              ref={capabilitiesCardsRef}
              className={`relative mx-auto flex flex-col items-center transition-opacity duration-500 ${
                capabilitiesInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {/* Interactive star map — starfield, constellation lines, twinkle, glow */}
              <div
                ref={starMapRef}
                className="star-map-container relative mt-20 w-[420px] h-[420px] sm:w-[540px] sm:h-[540px] md:w-[640px] md:h-[640px] lg:w-[800px] lg:h-[800px] flex shrink-0 items-center justify-center overflow-visible rounded-home-card [--cap-radius:150px] sm:[--cap-radius:180px] md:[--cap-radius:210px] lg:[--cap-radius:260px] [--cap-radius-outer:calc(var(--cap-radius)*2)]"
              >
                {/* Starfield — subtle dots with slow drift */}
                <div className="star-map-drift-inner absolute inset-0 overflow-hidden rounded-home-card" aria-hidden>
                  <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                    {[
                      [20, 30], [55, 18], [85, 42], [120, 25], [160, 38], [175, 70], [150, 105], [180, 140],
                      [140, 165], [100, 155], [60, 170], [25, 145], [15, 100], [45, 65], [70, 88], [110, 72],
                      [95, 115], [130, 95], [35, 120], [155, 55], [50, 48], [165, 125], [78, 140], [115, 32]
                    ].map(([x, y], i) => (
                      <circle key={i} cx={x} cy={y} r="0.8" fill="rgba(255,255,255,0.35)" className="star-map-dot" style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
                    ))}
                  </svg>
                </div>
                {capabilitiesInView && starMapConnectors ? (
                  <svg
                    className="pointer-events-none absolute inset-0 z-[6] h-full w-full overflow-visible"
                    width={starMapConnectors.w}
                    height={starMapConnectors.h}
                    viewBox={`0 0 ${starMapConnectors.w} ${starMapConnectors.h}`}
                    preserveAspectRatio="none"
                    aria-hidden
                  >
                    {starMapConnectors.lines.map((ln) =>
                      ln.kind === 'core' ? (
                        <line
                          key={`conn-core-${ln.pillar}`}
                          x1={ln.x1}
                          y1={ln.y1}
                          x2={ln.x2}
                          y2={ln.y2}
                          stroke="rgba(165, 243, 252, 0.22)"
                          strokeWidth={1.15}
                          strokeLinecap="round"
                        />
                      ) : (
                        <line
                          key={`conn-spoke-${ln.outerIndex}`}
                          x1={ln.x1}
                          y1={ln.y1}
                          x2={ln.x2}
                          y2={ln.y2}
                          stroke="rgba(165, 243, 252, 0.22)"
                          strokeWidth={1.15}
                          strokeLinecap="round"
                        />
                      )
                    )}
                  </svg>
                ) : null}
                {/* Center — Core (same disc language as inner pillars, non-interactive) */}
                <div
                  ref={starMapCoreRef}
                  className="absolute left-1/2 top-1/2 z-[13] flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/20 opacity-95 shadow-home-card-glow sm:h-40 sm:w-40 md:h-44 md:w-44 lg:h-48 lg:w-48"
                  aria-label="Core — people and outcomes"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-full"
                    style={{
                      background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.035) 45%, rgba(255,255,255,0) 75%)',
                      filter: 'blur(1px)'
                    }}
                    aria-hidden
                  />
                  <svg
                    viewBox="0 0 24 24"
                    className="relative z-10 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14"
                    aria-hidden
                  >
                    <defs>
                      <linearGradient id="core-user-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="25%" stopColor="#2dd4bf" />
                        <stop offset="50%" stopColor="#818cf8" />
                        <stop offset="75%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#e879f9" />
                      </linearGradient>
                    </defs>
                    {/* Hairline-friendly in 24×24; thinner than heart’s apparent weight */}
                    <path
                      d="M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      fill="none"
                      stroke="url(#core-user-grad)"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 20a7.5 7.5 0 0 1 15 0"
                      fill="none"
                      stroke="url(#core-user-grad)"
                      strokeWidth="1.35"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="star-map-orbit-inner absolute inset-0">
                  {/* First ring — five inner lenses (PILLARS) */}
                  {PILLARS.map((pillar, i) => {
                    const isSelected = selectedPillarIndex === i
                    return (
                      <button
                        key={i}
                        ref={(el) => {
                          starMapStarRefs.current[i] = el
                        }}
                        type="button"
                        onClick={() => setSelectedPillarIndex(i)}
                        className={`group star-map-star shadow-home-card-glow group-hover:shadow-home-card-glow-hover absolute left-1/2 top-1/2 z-[11] flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-black/20 text-center opacity-95 transition-shadow duration-300 sm:h-32 sm:w-32 md:h-36 md:w-36 lg:h-40 lg:w-40 ${isSelected ? 'selected' : ''}`}
                      >
                        <span className="block max-w-24 whitespace-nowrap text-sm font-normal leading-tight tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:max-w-28 sm:text-base md:max-w-32 md:text-lg lg:text-xl">
                          {pillar}
                        </span>
                      </button>
                    )
                  })}
                </div>
                <div className="star-map-orbit-outer absolute inset-0">
                  {/* Outer ring — five pillars ×3 satellites */}
                  {OUTER_RING.map((node, i) => {
                    return (
                      <div
                        key={`outer-${i}`}
                        ref={(el) => {
                          starMapStarRefs.current[PILLARS.length + i] = el
                        }}
                        className="star-map-star shadow-home-card-glow pointer-events-none absolute left-1/2 top-1/2 z-[12] flex h-16 w-16 items-center justify-center overflow-visible rounded-full border border-white/10 bg-black/20 text-center opacity-95 sm:h-[4.5rem] sm:w-[4.5rem] md:h-20 md:w-20 lg:h-24 lg:w-24"
                      >
                        {node.label ? (
                          <span className="block max-w-20 whitespace-nowrap text-sm font-normal leading-tight tracking-wider text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] sm:max-w-24 sm:text-base md:max-w-28 md:text-lg lg:text-lg">
                            {node.label}
                          </span>
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 w-full min-h-screen bg-transparent pb-[112px]" aria-label="Get in touch">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-10 pt-[112px] pb-8 text-center">
          <div ref={contactParallaxWrapRef} className="w-full will-change-transform">
            <h2 className="w-full pb-8 text-center text-6xl font-bold tracking-wide md:pb-10 md:text-7xl lg:text-8xl bg-[linear-gradient(90deg,#cffafe_0%,#67e8f9_24%,#818cf8_52%,#c084fc_78%,#f5d0fe_100%)] bg-clip-text text-transparent">
              Get in touch
            </h2>
          </div>
          <div className="w-full text-center">
            <p className="inline-block text-xl font-extralight tracking-wider text-white md:text-2xl">
              Open to senior roles and collaborations.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            <a
              href="mailto:joelhickeydesigns@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px]"
            >
              <HiOutlineMail className="shrink-0" size={20} aria-hidden />
              Email me
            </a>
            <a
              href="https://www.linkedin.com/in/joelhickey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px]"
            >
              <SiLinkedin className="shrink-0" size={20} aria-hidden />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Home
