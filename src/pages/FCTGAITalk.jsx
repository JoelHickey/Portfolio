import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiLayers, FiHome, FiGlobe } from 'react-icons/fi'
import MatrixRain from '../components/MatrixRain'
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

  return (
    <section className="flex flex-col">
      {/* Hero */}
      <div className="flex min-h-[calc(100vh-64px)] w-full items-start justify-center bg-white pb-28 -mt-12">
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="full-bleed mb-0">
            <div className="relative w-full h-[600px] overflow-hidden bg-[#030b0f]">
              <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/85"
                aria-hidden
              />
              <div className="absolute left-0 right-0 top-0 pt-12">
                <div className="mx-auto w-full max-w-6xl px-6">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white"
                  >
                    <span aria-hidden>←</span>
                    Back to Portfolio
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
          </div>
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
            <div className="mt-16 max-w-3xl space-y-10 md:mt-20">
              <div className="mb-[112px]">
                <h3 className="text-2xl font-semibold text-slate-900">The weavers</h3>
                <p className="mt-6 mb-6 text-slate-700">
                  What stays with people when tools take over the repeatable work?
                </p>
                <div className="space-y-3 text-slate-600">
                  <p className="border-l-2 border-slate-300 pl-4">Craft is redefined, not replaced</p>
                  <p className="border-l-2 border-slate-300 pl-4">Judgment, taste, and quality stay with people</p>
                </div>
                <div className="mt-12 px-6 pt-6 pb-[112px] flex justify-start">
                  <WeavingLoom width={280} height={120} className="min-w-[320px] w-[320px]" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mt-12">Replacing the cart</h3>
                <p className="mt-6 mb-6 text-slate-600">
                  Not a faster horse — a new way to move. When tools change, the craft redefines itself.
                </p>
                <div className="space-y-3 mb-28 text-slate-600">
                  <p className="border-l-2 border-slate-300 pl-4">The leap matters more than the increment</p>
                  <p className="border-l-2 border-slate-300 pl-4">New tools create new possibilities, not just faster versions of the old</p>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">The digital era</h3>
                <p className="mt-3 mb-6 text-slate-600">
                  Paper, pixels, systems — each era redefined the designer.
                </p>
                <div className="space-y-3 text-slate-600">
                  <p className="border-l-2 border-slate-300 pl-4">Hands-on craft gave way to screens and software; undo made iteration cheap, new disciplines emerged</p>
                  <p className="border-l-2 border-slate-300 pl-4">Thinking in components and rules; the designer shapes the system, not just the screen</p>
                </div>
                <div className="mt-8 flex justify-start pt-6 pb-12" aria-hidden>
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
                  <svg viewBox="0 0 320 100" className="w-full max-w-[560px] text-slate-400" preserveAspectRatio="xMidYMid meet">
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
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Questioning the fundamentals</h3>
                <p className="mt-3 text-slate-600">
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
                <p className="mt-3 mb-12 max-w-3xl text-slate-600">
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
                <p className="mt-3 mb-12 max-w-3xl text-slate-600">
                  Where are the bottlenecks and friction now — and who owns them?
                </p>
                <div className="mt-10 flex justify-center py-8">
                  <WiderEnvironmentCanvas width={560} height={560} className="w-full max-w-[560px] h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent">Monumental moments</h2>
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
              <p className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-4xl font-bold text-transparent">Discovery</p>
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
                  Prompt to working UI in seconds: The productive gain was instantly apparent.
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
            <div
              className="overflow-hidden"
              style={{
                width: '100vw',
                marginLeft: 'calc(50% - 50vw)',
                marginRight: 'calc(50% - 50vw)',
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
                <div className="mt-16">
                  <HealthMonitor />
                </div>
                </div>
              </div>
            </div>
            <div className="mt-10 max-w-3xl space-y-0">
              <div className="pt-[112px] pb-12">
                <h3 className="text-2xl font-semibold text-slate-900">Ideation</h3>
                <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                  AI thrives as a partner in the messy middle — prompt, review, refine. When AI handles the tedious parts, ideas flow more freely. Trust the process, embrace ambiguity.
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
                      <circle cx="100" cy="30" r="10" fill="rgb(99 102 241)" fillOpacity="0.9" />
                      <text x="100" y="34" textAnchor="middle" className="fill-white text-[11px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>P</text>
                    </g>
                    <g className="iterate-pulse-node" style={{ animationDelay: '0.33s' }}>
                      <circle cx="161" cy="135" r="10" fill="rgb(20 184 166)" fillOpacity="0.9" />
                      <text x="161" y="139" textAnchor="middle" className="fill-white text-[11px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>R</text>
                    </g>
                    <g className="iterate-pulse-node" style={{ animationDelay: '0.66s' }}>
                      <circle cx="39" cy="135" r="10" fill="rgb(245 158 11)" fillOpacity="0.9" />
                      <text x="39" y="139" textAnchor="middle" className="fill-white text-[11px] font-semibold" style={{ fontFamily: 'system-ui, sans-serif' }}>F</text>
                    </g>
                    {/* Orbiting dot — the "iterating" idea flowing around the cycle */}
                    <g className="iterate-orbit-dot">
                      <circle cx="170" cy="100" r="5" fill="rgb(99 102 241)" />
                    </g>
                  </svg>
                </div>
                <div className="pt-[112px] pb-12">
                <h3 className="text-2xl font-semibold text-slate-900">Imagination and Joy</h3>
                <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                  Imagination is our superpower — AI handles the grunt work so we can focus on steering: what to keep, what to push further, what story we&apos;re telling. I felt like a child creating again — except my imagination was no longer bound by the gates of technology.
                </p>
                <div className="mt-16 flex justify-center">
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
                <div className="pt-[112px] pb-12">
                  <h3 className="text-2xl font-semibold text-slate-900">Mystical Code</h3>
                  <p className="mt-6 max-w-3xl text-slate-600 leading-relaxed">
                    As a visual designer, code felt mystical and out of reach. AI brings calm: less wrestling with syntax, more scaffolding and refactoring, more time to shape experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">Building momentum</h2>
          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col rounded-2xl bg-rose-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiZap className="h-8 w-8 text-rose-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-rose-900 md:text-3xl">Starting simple</h3>
              <p className="mt-5 flex-1 text-rose-800/80 leading-relaxed">
                One clear prompt beats a wall of context — start small, then layer in nuance.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-teal-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiLayers className="h-8 w-8 text-teal-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-teal-900 md:text-3xl">Being curious</h3>
              <p className="mt-5 flex-1 text-teal-800/80 leading-relaxed">
                Learn what the technology can do — curiosity builds strong foundations.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-amber-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiHome className="h-8 w-8 text-amber-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-amber-900 md:text-3xl">Using analogy</h3>
              <p className="mt-5 flex-1 text-amber-800/80 leading-relaxed">
                Physical-world analogies help connect the dots.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-violet-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiGlobe className="h-8 w-8 text-violet-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-violet-900 md:text-3xl">Environment</h3>
              <p className="mt-5 flex-1 text-violet-800/80 leading-relaxed">
                Your context shapes what you build — tools, constraints, surroundings.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">Energy</h2>
          <p className="mt-6 text-slate-600">
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

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent pb-6">The agents</h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Depth and prompt clarity</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  Be specific: format, tone, constraints. Include examples. If the result is off, refine the prompt — the agent improves when you give it more to work with.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Context and continuity</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  Give them context: point at files, paste snippets, remind them of your decisions. They don&apos;t remember between sessions — bring them up to speed quickly.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Frustrations</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  Agents aren&apos;t perfect. They hallucinate, overcomplicate, and sometimes take the path of least resistance. They&apos;ll agree with you even when wrong, and they can loop or overwrite work. The key is to treat them as powerful but flawed partners: verify outputs, redirect when they drift, and know when to step in and fix things yourself.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">AI lessons</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  Learnings from working with agents in Cursor over the last 10 months, grouped by theme.
                </p>
                <div className="mt-8 space-y-8">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">Trust & verification</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Trust your gut as the master — the agent doesn&apos;t think through the full impact of tasks.</li>
                      <li>Question the agents; they are not always correct.</li>
                      <li>They often agree with you even when they&apos;ve understood or executed incorrectly.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">How agents behave</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>They can be &quot;lazy&quot;: they sometimes prefer you to carry out tasks, or they won&apos;t complete a task and choose the easiest path and forget the rest.</li>
                      <li>They make changes without asking.</li>
                      <li>They move too many steps ahead and need to go back a step; they get stuck in loops solving an error unless you prompt them to stop and relook at the problem — they&apos;ll dig themselves deeper if not stopped.</li>
                      <li>They overcomplicate things; the simplest tasks can be the ones they don&apos;t get right the first time.</li>
                      <li>They want to get back to their original task, which can distract from what you need now.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">When to intervene</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Be patient — give it a little time sometimes to figure it out; you might be surprised.</li>
                      <li>When it&apos;s looping, stop it and reframe the problem.</li>
                      <li>Overwritten work can be restored; push the agents harder to restore — don&apos;t assume it&apos;s lost.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">Human vs agent</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Some things are quicker with human mouse-and-click input.</li>
                      <li>Sometimes it&apos;s quicker to rebuild an interface than to comb through and fix inconsistencies the agent introduced.</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">Tone & pushback</h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                      <li>Sometimes agents take a tone back at you; stay clear on what you want and when to redirect.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white pb-40">
        <div className="mx-auto w-full max-w-6xl px-6 pt-28 pb-28">
          <h2 className="text-6xl font-semibold text-slate-900">How this was built</h2>
          <p className="mt-10 max-w-2xl text-slate-600 leading-relaxed">
            It all starts with an idea.
          </p>
          <div className="mt-10 flex flex-col gap-6">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-5">AI Flow</h3>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start" aria-hidden>
            <span className="inline-flex items-center gap-2 rounded-md bg-violet-100 px-2.5 py-1.5 text-xs font-semibold text-violet-800">
              <img src="/images/cursor-logo.svg" alt="" className="h-4 w-4 text-violet-700" aria-hidden />
              Select agent model
            </span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
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
            <p className="mt-4 text-sm text-slate-600">
              Models: Claude, GPT-4o
            </p>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-5">Front-end Technology Stack</h3>
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
              <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                <span className="text-xs font-medium text-slate-600">React Router</span>
                <span className="text-[10px] text-slate-500">Routing</span>
              </span>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="text-2xl font-semibold text-slate-900 mb-5">Testing</h3>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                <span className="text-xs font-medium text-slate-600">Vitest</span>
                <span className="text-[10px] text-slate-500">Unit tests</span>
              </span>
              <span className="inline-flex flex-col items-start gap-0.5 rounded-md border border-slate-200 bg-white px-3 py-2">
                <span className="text-xs font-medium text-slate-600">Playwright</span>
                <span className="text-[10px] text-slate-500">End-to-end tests</span>
              </span>
            </div>
          </div>
          <p className="mt-12 max-w-2xl text-slate-600 text-sm leading-relaxed">
            From idea to deploy in a day — roughly 8 hours. AI handled scaffolding and layouts; I steered structure and visual choices.
          </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-sky-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">Helpful tips</h2>
          <p className="mt-6 max-w-3xl text-slate-600">
            Add your tips here.
          </p>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">Wrap up</p>
          <h2 className="mt-2 text-6xl font-semibold text-slate-900">An opportunity of a lifetime</h2>
          <div className="mt-8 space-y-4">
            <p className="max-w-3xl text-slate-600">
              We&apos;re at an inflection point. AI won&apos;t replace designers — but designers who learn to work with AI will have an edge. The opportunity is to amplify what we do best: empathy, judgment, and creativity. Embrace the tools, question the outputs, and keep the human at the centre. This is our moment to shape how the craft evolves.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FCTGAITalk
