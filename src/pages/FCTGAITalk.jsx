import { useEffect, useState, useCallback, useRef } from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom'
import { FiZap, FiLayers, FiHome, FiGlobe, FiUser } from 'react-icons/fi'
import MatrixRain from '../components/MatrixRain'
import WaterAscii from '../components/WaterAscii'
import FCTGAITalkSlides from '../components/FCTGAITalkSlides'
import WeavingLoom from '../components/WeavingLoom'
import WiderEnvironmentCanvas from '../components/WiderEnvironmentCanvas'
import HealthMonitor from '../components/HealthMonitor'

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

const cardList = [
  { id: 'apple', rotate: -8, src: '/images/AI talk/appleguidlines87.png', alt: 'Apple Human Interface Guidelines: The Apple Desktop Interface — hand with mouse and early Mac GUI', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-0', ml: '-ml-0' },
  { id: 'designforpeople', rotate: 0, src: '/images/AI talk/designforpeople.webp', alt: 'Designing for People by Henry Dreyfuss — industrial design and human factors', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-10', ml: '-ml-64' },
  { id: 'windows', rotate: 8, src: '/images/AI talk/win95guidimage.png', alt: 'Windows 95 interface guidelines', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg brightness-110', z: 'z-[50]', ml: '-ml-64' },
]

function FCTGAITalk() {
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const layoutV2 = pathname.endsWith('/v2') || searchParams.get('v') === '2' || searchParams.get('layout') === 'new'

  const [activeCard, setActiveCard] = useState(null)
  const [, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [swipedOff, setSwipedOff] = useState({ apple: false, designforpeople: false, windows: false })
  const [exitDirection, setExitDirection] = useState({ apple: null, designforpeople: null, windows: null })
  const [hoveredCard, setHoveredCard] = useState(null)
  const startRef = useRef({ x: 0, y: 0 })
  const dragOffsetRef = useRef({ x: 0, y: 0 })

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

  if (layoutV2) {
    return <FCTGAITalkSlides />
  }

  return (
    <section className="flex flex-col">
      {/* Hero */}
      <div className="flex min-h-[calc(100vh-64px)] w-full flex-col items-stretch bg-white pb-28 -mt-12">
        <div className="relative min-h-screen w-screen overflow-hidden bg-[#030b0f] ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]">
              <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85"
                aria-hidden
              />
              <div className="absolute left-0 right-0 top-0 pt-12">
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
              <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-16">
                <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
                  <p className="text-lg font-medium leading-snug sm:text-xl md:text-2xl md:max-w-2xl">
                    In the future, the wealthy will pay for human empathy.
                  </p>
                  <p className="mt-3 text-sm text-white/90">— Attribution</p>
                </div>
              </div>
            </div>
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="relative z-10" style={{ paddingTop: '80px' }}>
            <h1 className="text-7xl font-semibold text-slate-900 md:text-8xl">
              Invigoration, innovation and impact
            </h1>
            <p className="mt-6 mb-16 max-w-2xl text-base text-slate-600 md:text-lg">
              Presented to Flight Centre Travel Group&apos;s (FCTG) Global Design Team, March 2026
            </p>
          </div>
        </div>
      </div>

      {/* Talk sections */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Looking back to look ahead</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              The history of craft and how it shapes what comes next.
            </p>
            <div className="mt-12 max-w-3xl space-y-10 md:mt-16">
              <div className="mb-[112px]">
                <h3 className="text-2xl font-semibold text-slate-900">The weavers</h3>
                <p className="mt-6 mb-6 text-slate-700">
                  When tools take over the repeatable work, craft is redefined, not replaced — judgment, taste, and quality stay with people.
                </p>
                <div className="mt-12 px-6 pt-6 pb-[112px] flex justify-start">
                  <WeavingLoom width={280} height={120} className="min-w-[320px] w-[320px]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mt-12">Replacing the cart</h3>
                <p className="mt-6 mb-28 text-slate-600">
                  Not a faster horse — a new way to move. When tools change, the craft redefines itself: the leap matters more than the increment, and new tools create new possibilities, not just faster versions of the old.
                </p>
              </div>
              <div className="pt-16">
                <h3 className="text-2xl font-semibold text-slate-900">The digital era</h3>
                <p className="mt-6 mb-6 text-slate-600">
                  Paper, pixels, systems — each era redefined the designer. Hands-on craft gave way to screens and software; undo made iteration cheap, new disciplines emerged. Thinking in components and rules; the designer shapes the system, not just the screen.
                </p>
                <div className="mt-8 flex justify-start overflow-visible pt-6 pb-12" aria-hidden>
                  <style>{`
                    @keyframes stage-in {
                      0% { opacity: 0; transform: translateY(8px) scale(0.96); }
                      100% { opacity: 1; transform: translateY(0) scale(1); }
                    }
                    @keyframes arrow-flow {
                      0% { stroke-dashoffset: 24; }
                      100% { stroke-dashoffset: 0; }
                    }
                    @keyframes node-pulse {
                      0%, 100% { opacity: 0.7; transform: scale(1); }
                      50% { opacity: 1; transform: scale(1.15); }
                    }
                    @keyframes pixel-pop {
                      0% { opacity: 0; transform: scale(0); }
                      70% { opacity: 1; transform: scale(1.1); }
                      100% { opacity: 1; transform: scale(1); }
                    }
                    @keyframes paper-lines {
                      0% { stroke-dasharray: 0 70; }
                      100% { stroke-dasharray: 64 70; }
                    }
                    .info-age-stage { animation: stage-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; opacity: 0; }
                    .info-age-flow { stroke-dasharray: 8 16; animation: arrow-flow 2s ease-in-out infinite; }
                    .info-age-node { animation: node-pulse 2.5s ease-in-out infinite; transform-origin: center; }
                    .info-age-pixel { animation: pixel-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity: 0; }
                    .info-age-paper-line { stroke-dasharray: 0 100; animation: paper-lines 0.8s ease-out 0.3s forwards; }
                  `}</style>
                  <svg viewBox="-5 0 330 100" className="w-full max-w-[360px] shrink-0 text-slate-400" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
                    <title>Paper → Pixels → Systems</title>
                    {/* Paper: 0-80, arrow gap 12, arrow 16, gap 12 */}
                    <g className="info-age-stage" style={{ animationDelay: '0s' }}>
                      <rect x="0" y="20" width="80" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      {[28, 36, 44, 52, 60].map((y, i) => (
                        <line key={i} x1="8" y1={y} x2="72" y2={y} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" className="info-age-paper-line" style={{ animationDelay: `${0.4 + i * 0.06}s` }} />
                      ))}
                    </g>
                    <path d="M 92 48 L 108 48" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" className="info-age-flow" fill="none" style={{ animationDelay: '0.5s' }} />
                    <polygon points="104,44 112,48 104,52" fill="currentColor" fillOpacity="0.6" />
                    {/* Pixels: 120-200 */}
                    <g className="info-age-stage" style={{ animationDelay: '0.2s' }}>
                      <rect x="120" y="20" width="80" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      {[0, 1, 2, 3].map((row) =>
                        [0, 1, 2, 3, 4].map((col) => (
                          <rect key={`${row}-${col}`} x={130 + col * 12} y={26 + row * 10} width={10} height={8} rx={0.5} fill="currentColor" fillOpacity="0.2" className="info-age-pixel" style={{ animationDelay: `${0.6 + row * 0.08 + col * 0.03}s` }} />
                        ))
                      )}
                      <rect x={142} y={34} width={10} height={8} rx={0.5} fill="rgb(99 102 241)" fillOpacity="0.7" className="info-age-pixel info-age-node" style={{ animationDelay: '0.9s' }} />
                      <rect x={154} y={34} width={10} height={8} rx={0.5} fill="rgb(20 184 166)" fillOpacity="0.7" className="info-age-pixel info-age-node" style={{ animationDelay: '1s' }} />
                    </g>
                    <path d="M 212 48 L 228 48" stroke="currentColor" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="round" className="info-age-flow" fill="none" style={{ animationDelay: '1.2s' }} />
                    <polygon points="224,44 232,48 224,52" fill="currentColor" fillOpacity="0.6" />
                    {/* Systems: 240-320 */}
                    <g className="info-age-stage" style={{ animationDelay: '0.4s' }}>
                      <rect x="240" y="20" width="80" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      <line x1="260" y1="38" x2="280" y2="38" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="280" y1="38" x2="300" y2="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="280" y1="38" x2="300" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="280" y1="58" x2="260" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="260" y1="58" x2="260" y2="38" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <circle cx="260" cy="38" r="4" fill="rgb(99 102 241)" fillOpacity="0.9" className="info-age-node" style={{ animationDelay: '1.5s' }} />
                      <circle cx="280" cy="48" r="3" fill="rgb(20 184 166)" fillOpacity="0.9" className="info-age-node" style={{ animationDelay: '1.6s' }} />
                      <circle cx="300" cy="48" r="3" fill="rgb(245 158 11)" fillOpacity="0.9" className="info-age-node" style={{ animationDelay: '1.7s' }} />
                      <circle cx="300" cy="58" r="3" fill="rgb(244 63 94)" fillOpacity="0.9" className="info-age-node" style={{ animationDelay: '1.8s' }} />
                      <circle cx="280" cy="58" r="3" fill="rgb(148 163 184)" fillOpacity="0.9" className="info-age-node" style={{ animationDelay: '1.9s' }} />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="pt-16">
                <h3 className="text-2xl font-semibold text-slate-900">Questioning the fundamentals</h3>
                <p className="mt-6 text-slate-600">
                  Do the principles of designing user interaction change — or are new principles added?
                </p>
                {/* Stacked cards — hover to lift; drag past threshold to swipe off; section collapses when all swiped */}
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
                  <div className="mt-[112px] w-[100vw] relative left-1/2 -translate-x-1/2 max-w-6xl">
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
                <h3 className="text-2xl font-semibold text-slate-900 transition-[margin-top] duration-500 ease-out" style={{ marginTop: allSwiped ? 0 : 160 }}>My process</h3>
                <p className="mt-6 mb-12 max-w-3xl text-slate-600">
                  Do our definitions of productivity still make sense in the new world?
                </p>
              </div>
            </div>
            {/* Full-bleed prod-flow — outside max-w-3xl so breakout reaches true viewport width */}
            <style>{`
              @keyframes prod-flow { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
              .prod-line-track { stroke-dasharray: 1 1; stroke-dashoffset: 0; }
              .prod-line-flow { stroke-dasharray: 60 240; animation: prod-flow 2s linear infinite; }
              .prod-line-flow-2 { stroke-dasharray: 60 240; animation: prod-flow 2.4s linear infinite 0.3s; }
              .prod-line-flow-3 { stroke-dasharray: 60 240; animation: prod-flow 1.8s linear infinite 0.6s; }
            `}</style>
            <div
              className="overflow-hidden pt-4 pb-[180px]"
              style={{
                width: '100vw',
                maxWidth: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
              }}
            >
              <svg viewBox="-20 0 1260 120" className="block w-full h-auto min-w-full" preserveAspectRatio="none" aria-hidden>
                  <title>Productivity in flux — flowing lines</title>
                  <path d="M-20 60 Q200 20 400 60 T800 60 T1240 60" stroke="rgb(203 213 225)" strokeWidth="1.5" fill="none" className="prod-line-track" />
                  <path d="M-20 60 Q200 20 400 60 T800 60 T1240 60" stroke="rgb(100 116 139)" strokeWidth="2" fill="none" className="prod-line-flow" />
                  <path d="M-20 80 Q250 40 500 80 T1000 80 T1240 80" stroke="rgb(226 232 240)" strokeWidth="1" fill="none" className="prod-line-track" />
                  <path d="M-20 80 Q250 40 500 80 T1000 80 T1240 80" stroke="rgb(148 163 184)" strokeWidth="1.5" fill="none" className="prod-line-flow-2" />
                  <path d="M-20 100 Q300 60 600 100 T1200 100 T1240 100" stroke="rgb(241 245 249)" strokeWidth="1" fill="none" className="prod-line-track" />
                  <path d="M-20 100 Q300 60 600 100 T1200 100 T1240 100" stroke="rgb(148 163 184)" strokeWidth="1.5" fill="none" className="prod-line-flow-3" />
                </svg>
            </div>
            <div className="mt-10 max-w-3xl">
              <h3 className="text-2xl font-semibold text-slate-900">The wider environment</h3>
                <p className="mt-6 mb-12 max-w-3xl text-slate-600">
                  Where are the bottlenecks and friction now — and who owns them?
                </p>
                <div className="mt-10 flex justify-center py-8">
                  <WiderEnvironmentCanvas width={560} height={560} className="w-full max-w-[560px] h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Monumental moments</h2>
            <p className="mt-2 max-w-3xl text-slate-600">
              Personal moments that shaped how I work with AI.
            </p>
            <div className="mt-10 max-w-3xl space-y-0">
              <div className="pt-12 pb-12">
                <h3 className="text-2xl font-semibold text-slate-900">Strength</h3>
                <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                  AI guided me through structural design — load paths, triangulation, fabrication — amplifying my process.
                </p>
              </div>
            </div>
            <div className="pt-12 max-w-2xl">
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
                <h3 className="text-2xl font-semibold text-slate-900">Speed</h3>
                <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                  Prompt to working UI in seconds: vibe coding made the productivity gain instantly apparent.
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
            <div className="mt-10 max-w-3xl space-y-0">
              <div className="pt-[112px] pb-12">
                <h3 className="text-2xl font-semibold text-slate-900">Ideation</h3>
                <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                  Ideas begin to flow more freely — learning to trust the process and embrace ambiguity.
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
                <div className="pt-[112px] pb-24">
                  <h3 className="text-2xl font-semibold text-slate-900">Imagination</h3>
                  <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                    Imagination is our superpower: we focus on steering what to keep, what to push further. I felt like a child creating again — imagination no longer bound by the gates of technology.
                  </p>
                  <div className="mt-16 mb-20 flex justify-center" aria-hidden>
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
            </div>
            <div
              className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden"
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
                  <h3 className="text-2xl font-semibold text-slate-900">Empowerment</h3>
                  <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                    Take charge of your wellbeing: inputs for sleep, emotions, and environment
                  </p>
                </div>
                <div className="mt-16 min-w-[820px] w-fit">
                  <HealthMonitor />
                </div>
              </div>
            </div>
            <div className="mt-10 max-w-3xl">
                <div className="pt-[112px] pb-12">
                  <h3 className="text-2xl font-semibold text-slate-900">Mystical Code</h3>
                  <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                    AI democratises design and development. As a visual designer, code felt mystical and out of reach; AI brings calm — less wrestling with syntax, more time to shape experiences.
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
                <div className="pt-[112px] pb-12">
                  <h3 className="text-2xl font-semibold text-slate-900">Calmness</h3>
                  <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                    Less friction, less anxiety. When the tedious parts are handled, there&apos;s more space to think clearly and create without the usual stress of getting stuck.
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
          </div>
        </div>

      <div className="relative z-10 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Building momentum</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Ways to get started and stay grounded.
          </p>
          <div className="mt-12 grid gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <div className="flex flex-col rounded-2xl bg-rose-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiZap className="h-8 w-8 text-rose-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-rose-900 md:text-2xl">Simple</h3>
              <p className="mt-3 flex-1 text-sm text-rose-800/80 leading-relaxed">
                One clear prompt beats a wall of context — start small, then layer in nuance.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-teal-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiLayers className="h-8 w-8 text-teal-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-teal-900 md:text-2xl">Curiosity</h3>
              <p className="mt-3 flex-1 text-sm text-teal-800/80 leading-relaxed">
                Learn what the technology can do — curiosity builds strong foundations.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-amber-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiHome className="h-8 w-8 text-amber-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-xl font-semibold text-amber-900 md:text-2xl">Analogy</h3>
              <p className="mt-5 flex-1 text-sm text-amber-800/80 leading-relaxed">
                Physical-world analogies help connect the dots.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-violet-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiGlobe className="h-8 w-8 text-violet-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-violet-900 md:text-2xl">Environment</h3>
              <p className="mt-3 flex-1 text-sm text-violet-800/80 leading-relaxed">
                Your context shapes what you build — tools, constraints, surroundings.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-indigo-100 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-7">
              <FiUser className="h-8 w-8 text-indigo-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-3 text-xl font-semibold text-indigo-900 md:text-2xl">Human</h3>
              <p className="mt-3 flex-1 text-sm text-indigo-800/80 leading-relaxed">
                You stay at the centre — judgment, taste, and empathy. AI amplifies; you steer.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Energy</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Less energy spent sweating the small stuff.
          </p>
          <div className="mt-10 max-w-2xl">
            <svg viewBox="0 0 620 140" className="w-full max-w-2xl text-slate-400 overflow-visible drop-shadow-[0_8px_30px_rgba(0,0,0,0.12)]" preserveAspectRatio="xMidYMid meet" aria-hidden>
              <title>How we spend our energy — battery</title>
              <defs>
                <clipPath id="battery-inner">
                  <rect x="10" y="30" width="560" height="60" rx="8" />
                </clipPath>
              </defs>
              {/* Battery body */}
              <rect x="0" y="20" width="580" height="80" rx="12" fill="none" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
              <rect x="580" y="45" width="24" height="30" rx="4" fill="currentColor" fillOpacity="0.3" />
              {/* Inner fill — clipped to battery interior */}
              <g clipPath="url(#battery-inner)">
                <rect x="10" y="30" width="504" height="60" fill="rgb(139 92 246)" />
                <rect x="514" y="30" width="11" height="60" fill="rgb(244 63 94)" />
                <rect x="525" y="30" width="11" height="60" fill="rgb(245 158 11)" />
                <rect x="536" y="30" width="11" height="60" fill="rgb(20 184 166)" />
                <rect x="547" y="30" width="11" height="60" fill="rgb(234 88 12)" />
              </g>
              {/* Labels on the fill */}
              <text x="300" y="65" textAnchor="middle" className="fill-white text-xs font-medium drop-shadow-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>Imagination · Creativity · Knowledge · Productivity · Value</text>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">The agents</h2>
            <p className="mt-2 mb-10 max-w-3xl text-slate-600">
              Here&apos;s what I learned from 10 months of working with agents in Cursor.
            </p>
            <div className="mt-8 space-y-16">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Models</h3>
                <div className="mt-8 pb-12">
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
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Prompt clarity</h3>
                <div className="mt-8 pb-12">
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
                  <div className="flex flex-col md:flex-row items-stretch md:items-center gap-6 md:gap-8">
                    <div className="prompt-old-card flex-1 rounded-xl border border-slate-200 bg-slate-100/80 p-6 ring-1 ring-slate-200/50">
                      <span className="inline-block rounded-full bg-slate-400/80 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">Old</span>
                      <p className="mt-4 font-mono text-sm text-slate-600 leading-relaxed">
                        make a button
                      </p>
                      <p className="mt-3 text-xs text-slate-500">Vague — the agent guesses.</p>
                    </div>
                    <div className="flex shrink-0 items-center justify-center prompt-arrow" aria-hidden>
                      <svg className="h-8 w-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                    <div className="prompt-new-card flex-1 rounded-xl border-2 border-indigo-200 bg-white p-6 shadow-lg shadow-indigo-100/50 ring-2 ring-indigo-100">
                      <span className="inline-block rounded-full bg-indigo-600 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-white">New</span>
                      <p className="mt-4 font-mono text-sm text-slate-700 leading-relaxed">
                        Create a React button with primary and secondary variants, hover state, and disabled state.
                      </p>
                      <p className="mt-3 text-xs text-indigo-700 font-medium">Specific — the agent delivers.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Context and continuity</h3>
                <div className="mt-8 pb-12">
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
              <div className="pb-8">
                <h3 className="text-2xl font-semibold text-slate-900">Frustrations</h3>
                <p className="mt-6 max-w-3xl text-slate-600">
                  Agents hallucinate, overcomplicate, and can loop or overwrite work. Verify outputs, redirect when they drift, and step in when needed.
                </p>
              </div>
              <div className="space-y-16">
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">Trust your gut</h3>
                    <p className="mt-6 max-w-3xl text-slate-600">
                      Sometimes the agent doesn&apos;t think through the full impact of tasks. Question them; they&apos;re not always correct and often agree with you even when they&apos;ve understood or executed incorrectly.
                    </p>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">How agents behave</h3>
                    <p className="mt-6 max-w-3xl text-slate-600">
                      Agents can be lazy, make changes without asking, get stuck in loops, overcomplicate simple tasks, and fixate on their original goal instead of what you need now.
                    </p>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">When to intervene</h3>
                    <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Be patient — give it a little time sometimes to figure it out; you might be surprised.</li>
                      <li>When it&apos;s looping, stop it and reframe the problem.</li>
                      <li>Overwritten work can be restored; push the agents harder to restore — don&apos;t assume it&apos;s lost.</li>
                    </ul>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">Human vs agent</h3>
                    <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Some things are quicker with human mouse-and-click input.</li>
                      <li>Sometimes it&apos;s quicker to rebuild an interface than to comb through and fix inconsistencies the agent introduced.</li>
                    </ul>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">Tone & pushback</h3>
                    <ul className="mt-6 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Sometimes agents take a tone back at you; stay clear on what you want and when to redirect.</li>
                    </ul>
                  </div>
                  <div className="pb-8">
                    <h3 className="text-2xl font-semibold text-slate-900">Recent observations</h3>
                    <p className="mt-6 max-w-3xl text-slate-600">
                      Lately, agents seem to think, think again, and question themselves more thoroughly — deeper reasoning before acting, fewer rash edits.
                    </p>
                  </div>
                </div>
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
      </div>

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Tooling</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            The environment and tools that support AI-assisted development for this project.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <h3 className="text-xl font-semibold text-slate-900">Cursor</h3>
              <p className="mt-2 text-slate-600 leading-relaxed">
                The main app for writing and editing code — agents, inline edits, Composer, and integrated model selection.
              </p>
              <div className="mt-6 mb-20 relative rounded-xl overflow-visible shadow-lg">
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
                npm, Git, GitHub, Netlify CLI — the usual suspects. AI helps with commands; the stack stays familiar.
              </p>
            </div>
          </div>
          <div className="mt-16 pt-16 border-t border-slate-200">
            <div className="flex flex-col">
              <div className="pt-0 pb-12">
                <h4 className="text-xl font-semibold text-slate-900 mb-4">AI flow</h4>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start" aria-hidden>
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
                    <img src="/images/netlify-logo.svg" alt="" className="h-4 w-4 brightness-0 invert" aria-hidden />
                    Deploy to Netlify
                  </span>
                </div>
              </div>
              <div className="pt-12 pb-12">
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
      </div>

      <div className="relative z-10 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Helpful tips</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Practical pointers from the workflow.
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

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Activity or demo</h2>
          <p className="mt-2 max-w-3xl text-slate-600">
            Try it yourself — hands-on with the tools we&apos;ve talked about.
          </p>
          <div className="mt-12 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 px-8 py-16">
            <p className="text-slate-600 mb-6">Try a prompt with the agent, e.g.:</p>
            <p className="rounded-lg bg-white px-4 py-3 font-mono text-sm text-slate-700 ring-1 ring-slate-200/60">
              Create a simple button component with a hover state
            </p>
            <p className="mt-6 text-sm text-slate-500">Or add your own demo content here.</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">An opportunity of a lifetime</h2>
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
