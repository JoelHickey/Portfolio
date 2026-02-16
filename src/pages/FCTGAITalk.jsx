import { useEffect, useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FiZap, FiLayers, FiHome } from 'react-icons/fi'
import MatrixRain from '../components/MatrixRain'
import WeavingLoom from '../components/WeavingLoom'
import WiderEnvironmentCanvas from '../components/WiderEnvironmentCanvas'

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
  } catch (_) {}
}

const cardList = [
  { id: 'apple', rotate: -8, src: '/images/AI talk/appleguidlines87.png', alt: 'Apple Human Interface Guidelines: The Apple Desktop Interface — hand with mouse and early Mac GUI', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-0', ml: '-ml-0' },
  { id: 'designforpeople', rotate: 0, src: '/images/AI talk/designforpeople.webp', alt: 'Designing for People by Henry Dreyfuss — industrial design and human factors', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg', z: 'z-10', ml: '-ml-64' },
  { id: 'windows', rotate: 8, src: '/images/AI talk/win95guidimage.png', alt: 'Windows 95 interface guidelines', imgClass: 'w-[calc(50%-12px)] max-w-[680px] min-w-0 h-auto object-contain rounded-xl shadow-lg brightness-110', z: 'z-[50]', ml: '-ml-64' },
]

function FCTGAITalk() {
  const [activeCard, setActiveCard] = useState(null)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [swipedOff, setSwipedOff] = useState({ apple: false, designforpeople: false, windows: false })
  const [exitDirection, setExitDirection] = useState({ apple: null, designforpeople: null, windows: null })
  const [hoveredCard, setHoveredCard] = useState(null)
  const startRef = useRef({ x: 0, y: 0 })
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
              Invigoration, innovation, and impact
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-600 md:text-lg">
              Presented to Flight Centre Travel Group&apos;s (FCTG) Global Design Team.
            </p>
          </div>
        </div>
      </div>

      {/* Takeaways / Provocations */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">Weavers, not replaced.</p>
              <p className="mt-2 text-base text-slate-500">Tools redefine the craft — judgment and taste stay with people.</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">Trust your gut as the master.</p>
              <p className="mt-2 text-base text-slate-500">Question the agents; they don’t think through the full impact of tasks.</p>
            </div>
            <div>
              <p className="text-xl font-semibold text-slate-900 md:text-2xl">Invigoration over automation.</p>
              <p className="mt-2 text-base text-slate-500">AI as a tool for innovation and impact, not just efficiency.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Talk sections */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Looking back to look ahead</h2>
            <div className="mt-16 max-w-3xl space-y-10 md:mt-20">
              <div className="mb-[112px]">
                <h3 className="text-xl font-semibold text-slate-900">The weavers</h3>
                <p className="mt-3 text-slate-600">
                  Mechanised looms didn’t replace weavers — they redefined the craft. Weavers moved into overseeing machines and designing patterns. The real shift was productivity and cost. AI is the same story: tools handle the repeatable work, but judgment, taste, and the “quality” that’s hard to automate stay with people. We’re working out what we do ourselves and where we use the tools — not whether we’re replaced.
                </p>
                <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-6 flex justify-center">
                  <WeavingLoom width={280} height={120} className="max-w-[280px]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">The information age</h3>
                <p className="mt-3 text-slate-600">
                  When design software and the internet arrived, designers and researchers didn&apos;t vanish — they moved from paper to pixels, from filing cabinets to search. The craft evolved. Tools changed how we worked, not whether humans were in the loop. AI is the same arc: it redefines the craft; it doesn&apos;t replace the craftsperson.
                </p>
                <div className="mt-8 flex justify-center pt-6 pb-12" aria-hidden>
                  <style>{`
                    @keyframes stage-in {
                      0% { opacity: 0; transform: translateY(4px); }
                      100% { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes arrow-pulse {
                      0%, 100% { opacity: 0.4; }
                      50% { opacity: 0.9; }
                    }
                    .info-age-stage { animation: stage-in 0.6s ease-out forwards; opacity: 0; }
                    .info-age-arrow { animation: arrow-pulse 2s ease-in-out infinite; }
                  `}</style>
                  <svg viewBox="0 0 320 100" className="w-full max-w-[360px] text-slate-400" preserveAspectRatio="xMidYMid meet">
                    <title>Paper → Pixels → Systems</title>
                    {/* Paper */}
                    <g className="info-age-stage" style={{ animationDelay: '0s' }}>
                      <rect x="8" y="20" width="72" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      {[28, 36, 44, 52, 60].map((y, i) => (
                        <line key={i} x1="16" y1={y} x2="72" y2={y} stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.35" />
                      ))}
                      <text x="44" y="72" textAnchor="middle" className="fill-slate-500 text-[10px] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Paper</text>
                    </g>
                    <path d="M 88 48 L 108 48" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" className="info-age-arrow" style={{ animationDelay: '0.2s' }} />
                    <polygon points="104,44 112,48 104,52" fill="currentColor" fillOpacity="0.5" className="info-age-arrow" style={{ animationDelay: '0.2s' }} />
                    {/* Pixels */}
                    <g className="info-age-stage" style={{ animationDelay: '0.25s' }}>
                      <rect x="116" y="20" width="72" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      {[0, 1, 2, 3].map((row) =>
                        [0, 1, 2, 3, 4].map((col) => (
                          <rect key={`${row}-${col}`} x={122 + col * 12} y={26 + row * 10} width={10} height={8} rx={0.5} fill="currentColor" fillOpacity="0.2" />
                        ))
                      )}
                      <rect x={134} y={34} width={10} height={8} rx={0.5} fill="rgb(99 102 241)" fillOpacity="0.5" />
                      <rect x={146} y={34} width={10} height={8} rx={0.5} fill="rgb(20 184 166)" fillOpacity="0.4" />
                      <text x="152" y="72" textAnchor="middle" className="fill-slate-500 text-[10px] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Pixels</text>
                    </g>
                    <path d="M 196 48 L 216 48" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" className="info-age-arrow" style={{ animationDelay: '0.5s' }} />
                    <polygon points="212,44 220,48 212,52" fill="currentColor" fillOpacity="0.5" className="info-age-arrow" style={{ animationDelay: '0.5s' }} />
                    {/* Systems */}
                    <g className="info-age-stage" style={{ animationDelay: '0.5s' }}>
                      <rect x="224" y="20" width="88" height="56" rx="2" fill="none" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
                      <line x1="248" y1="38" x2="268" y2="38" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="268" y1="38" x2="288" y2="48" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="268" y1="38" x2="288" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="268" y1="58" x2="248" y2="58" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="248" y1="58" x2="248" y2="38" stroke="currentColor" strokeWidth="1" strokeOpacity="0.35" />
                      <circle cx="248" cy="38" r="4" fill="rgb(99 102 241)" fillOpacity="0.8" />
                      <circle cx="268" cy="48" r="3" fill="rgb(20 184 166)" fillOpacity="0.8" />
                      <circle cx="288" cy="48" r="3" fill="rgb(245 158 11)" fillOpacity="0.8" />
                      <circle cx="288" cy="58" r="3" fill="rgb(244 63 94)" fillOpacity="0.8" />
                      <circle cx="268" cy="58" r="3" fill="rgb(148 163 184)" fillOpacity="0.8" />
                      <text x="268" y="72" textAnchor="middle" className="fill-slate-500 text-[10px] font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Systems</text>
                    </g>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Questioning the fundamentals of designing user interaction</h3>
                <p className="mt-3 text-slate-600">
                  Does the principle of control change? Will the user continue playing an active rather than reactive role?
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
                <h3 className="text-xl font-semibold text-slate-900 transition-[margin-top] duration-500 ease-out" style={{ marginTop: allSwiped ? 0 : 160 }}>What is my process?</h3>
                <p className="mt-3 mb-12 max-w-3xl text-slate-600">
                  The fundamentals of our process are up for grabs, including how we define and measure productivity. This section isn’t about how to be more productive with AI — it’s about what we mean by productivity and whether it still makes sense within the new world.
                </p>
        {/* Full-bleed lines — own container, direct child of bg-white for true edge-to-edge */}
        <style>{`
          @keyframes prod-flow { from { stroke-dashoffset: 300; } to { stroke-dashoffset: 0; } }
          .prod-line-track { stroke-dasharray: 1 1; stroke-dashoffset: 0; }
          .prod-line-flow { stroke-dasharray: 60 240; animation: prod-flow 2s linear infinite; }
          .prod-line-flow-2 { stroke-dasharray: 60 240; animation: prod-flow 2.4s linear infinite 0.3s; }
          .prod-line-flow-3 { stroke-dasharray: 60 240; animation: prod-flow 1.8s linear infinite 0.6s; }
        `}</style>
        <div
          className="overflow-hidden pt-4 pb-[180px]"
          style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}
        >
          <svg viewBox="-20 0 1240 120" className="w-full h-auto" preserveAspectRatio="none" aria-hidden>
            <title>Productivity in flux — flowing lines</title>
            <path d="M-20 60 Q200 20 400 60 T800 60 T1220 60" stroke="rgb(203 213 225)" strokeWidth="1.5" fill="none" className="prod-line-track" />
            <path d="M-20 60 Q200 20 400 60 T800 60 T1220 60" stroke="rgb(100 116 139)" strokeWidth="2" fill="none" className="prod-line-flow" />
            <path d="M-20 80 Q250 40 500 80 T1000 80 T1220 80" stroke="rgb(226 232 240)" strokeWidth="1" fill="none" className="prod-line-track" />
            <path d="M-20 80 Q250 40 500 80 T1000 80 T1220 80" stroke="rgb(148 163 184)" strokeWidth="1.5" fill="none" className="prod-line-flow-2" />
            <path d="M-20 100 Q300 60 600 100 T1200 100 T1220 100" stroke="rgb(241 245 249)" strokeWidth="1" fill="none" className="prod-line-track" />
            <path d="M-20 100 Q300 60 600 100 T1200 100 T1220 100" stroke="rgb(148 163 184)" strokeWidth="1.5" fill="none" className="prod-line-flow-3" />
          </svg>
        </div>
                <h3 className="text-xl font-semibold text-slate-900">The wider environment</h3>
                <p className="mt-3 mb-12 max-w-3xl text-slate-600">
                  I see design process as the bridge between product goals and business value: it’s where we decide what “done” looks like and how we’ll know we’ve succeeded. In the new world, that definition is something we keep renegotiating — with stakeholders, with tools, and with the outcomes we’re willing to count.
                </p>
                <div className="mt-10 flex justify-center py-8">
                  <WiderEnvironmentCanvas width={560} height={560} className="w-full max-w-[560px] h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Monumental moments</h2>
            <div className="mt-10 max-w-3xl space-y-10">
              <div className="py-8">
                <h3 className="text-xl font-semibold text-slate-900">Strength</h3>
                <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
                  As a designer, I always return to crafting with my hands — there’s something intrinsically human about it. During a project I asked an AI agent (LLM) what the strongest way to build a steel truss would be, and I was blown away. It walked me through load paths and triangulation, then stepped me through planning and fabrication. The agent became an assistant to my process: a valuable tool in my belt. My productivity was boosted immensely!
                </p>
                <div className="mt-20 flex flex-nowrap items-center gap-x-8 pb-6">
                  <p className="whitespace-nowrap bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-4xl font-bold text-transparent">Time</p>
                  <p className="whitespace-nowrap bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-4xl font-bold text-transparent">Safety</p>
                  <p className="whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-4xl font-bold text-transparent">Confidence</p>
                  <p className="whitespace-nowrap bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">Knowledge</p>
                  <p className="whitespace-nowrap bg-gradient-to-r from-cyan-500 to-sky-600 bg-clip-text text-4xl font-bold text-transparent">Curiosity</p>
                  <p className="whitespace-nowrap bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">Less waste</p>
                </div>
              </div>
            </div>
            <div
              className="overflow-hidden py-6"
              style={{ width: '120vw', marginLeft: 'calc(50% - 60vw)', marginRight: 'calc(50% - 60vw)' }}
            >
              <style>{`
                @keyframes beam-pan {
                  0% { transform: translateX(6%); }
                  100% { transform: translateX(-6%); }
                }
                .beam-pan {
                  animation: beam-pan 14s ease-in-out infinite alternate;
                }
              `}</style>
              <div className="relative aspect-[24/5] w-full overflow-hidden">
                <img
                  src="/images/AI talk/beam.jpeg"
                  alt="Galvanized metal beams joined by a weld, with a tape measure — structural fabrication"
                  className="beam-pan h-full w-full object-cover object-center"
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
            <div className="mt-10 max-w-3xl space-y-10">
              <div className="pt-12">
                <h3 className="text-xl font-semibold text-slate-900">Speed</h3>
                <p className="mt-3 text-slate-600">
                  I used Replit to build an interface within a few seconds. The speed of going from prompt to working UI was staggering. Within that moment I questioned my whole process.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-6">
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
              <div className="pt-12">
                <h3 className="text-xl font-semibold text-slate-900">Ideation</h3>
                <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
                  AI thrives when we treat it as a partner in the messy middle — sketching, riffing, and throwing out ideas. The best outcomes come from rapid back-and-forth: prompt, review, refine. Don&apos;t wait for perfection; iterate in the open.
                </p>
                <div className="mt-8 flex justify-center py-6" aria-hidden>
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
                <h3 className="mt-8 text-xl font-semibold text-slate-900">Imagination</h3>
                <p className="mt-3 max-w-3xl text-slate-600 leading-relaxed">
                  This is our true superpower. I used AI to create vocals for my music — something I never could have dreamed of before. It wasn&apos;t about the end result; it was like jamming with a singer and coming up with ideas together. The outer limits and beyond of our imagination can now be realised. That&apos;s where we shine: AI handles the grunt work — generating options, scaffolding structure, filling in the gaps — so we can focus on the decisions that matter. What to keep, what to push further, what story we&apos;re telling. Our job is to steer, not to sweat the small stuff.
                </p>
                <div className="mt-8 flex justify-center">
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
                <div className="mt-12 pt-10 border-t border-slate-200">
                  <p className="max-w-3xl text-xl font-medium text-slate-800 leading-relaxed md:text-2xl">
                    I felt like a child creating again — except my imagination was no longer bound by the gate of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">Building momentum by</h2>
          <div className="mt-20 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col rounded-2xl bg-rose-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiZap className="h-8 w-8 text-rose-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-rose-900 md:text-3xl">Starting simple</h3>
              <p className="mt-5 flex-1 text-rose-800/80 leading-relaxed">
                Start with a small problem or interest. One clear prompt beats a wall of context — begin with the smallest useful ask, then layer in nuance.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-teal-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiLayers className="h-8 w-8 text-teal-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-teal-900 md:text-3xl">Being curious</h3>
              <p className="mt-5 flex-1 text-teal-800/80 leading-relaxed">
                Understand the technology and how it works and what it can do. That curiosity leads to building with strong foundations. Balancing your depth of understanding with productivity is key.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-amber-100 p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12),0_12px_24px_-8px_rgba(0,0,0,0.08)] transition hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] md:p-10">
              <FiHome className="h-8 w-8 text-amber-700" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-2xl font-semibold text-amber-900 md:text-3xl">Using analogy</h3>
              <p className="mt-5 flex-1 text-amber-800/80 leading-relaxed">
                Simple analogies of the physical world often help with connecting the dots.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">How this was built</h2>
          <p className="mt-10 max-w-2xl text-slate-600 leading-relaxed">
            It all starts with an idea.
          </p>
          <img
            src="/images/flow-blocks-diagram.svg"
            alt="Macbook, Cloud, Visitor flow: Create, Store, Ship"
            className="mt-10 w-full max-w-full h-auto"
          />
          <div className="mt-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-500 justify-start" aria-hidden>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium">Create</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium">Store</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium">Ship</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600 justify-start" aria-hidden>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">Code</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">Version</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">Deploy</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-start" aria-hidden>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">Cursor</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">GitHub</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-800">Vercel</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-600 justify-start" aria-hidden>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">npm</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">git</span>
            <span className="shrink-0 text-slate-400 text-xs" aria-hidden>→</span>
            <span className="rounded-md border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-medium">vercel</span>
          </div>
            </div>
          </div>
        </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900">Energy</h2>
          <h3 className="mt-10 text-xl font-semibold text-slate-900">How we spend our energy</h3>
          <div className="mt-6 max-w-2xl">
            <style>{`
              .energy-bar-fill {
                transform-origin: left center;
                animation: energy-bar-fill 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
              @keyframes energy-bar-fill {
                from { transform: scaleX(0); }
                to { transform: scaleX(1); }
              }
            `}</style>
            <svg viewBox="0 0 520 200" className="w-full text-slate-400" aria-hidden>
              <title>How we spend our energy — bar chart</title>
              <defs>
                <linearGradient id="energy-bar-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(244 63 94)" />
                  <stop offset="100%" stopColor="rgb(251 113 133)" />
                </linearGradient>
                <linearGradient id="energy-bar-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(20 184 166)" />
                  <stop offset="100%" stopColor="rgb(45 212 191)" />
                </linearGradient>
                <linearGradient id="energy-bar-3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(99 102 241)" />
                  <stop offset="100%" stopColor="rgb(129 140 248)" />
                </linearGradient>
                <linearGradient id="energy-bar-4" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(245 158 11)" />
                  <stop offset="100%" stopColor="rgb(251 191 36)" />
                </linearGradient>
                <linearGradient id="energy-bar-5" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgb(100 116 139)" />
                  <stop offset="100%" stopColor="rgb(148 163 184)" />
                </linearGradient>
              </defs>
              <g>
                <text x="0" y="26" className="fill-slate-700 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Creative & design</text>
                <rect x="0" y="32" width="400" height="20" rx="10" fill="rgb(241 245 249)" />
                <rect x="0" y="32" width="140" height="20" rx="10" fill="url(#energy-bar-1)" className="energy-bar-fill" style={{ animationDelay: '0.1s' }} />
                <text x="408" y="46" className="fill-slate-500 text-sm tabular-nums" style={{ fontFamily: 'system-ui, sans-serif' }}>35%</text>
              </g>
              <g transform="translate(0, 44)">
                <text x="0" y="26" className="fill-slate-700 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Collaboration & feedback</text>
                <rect x="0" y="32" width="400" height="20" rx="10" fill="rgb(241 245 249)" />
                <rect x="0" y="32" width="100" height="20" rx="10" fill="url(#energy-bar-2)" className="energy-bar-fill" style={{ animationDelay: '0.25s' }} />
                <text x="408" y="46" className="fill-slate-500 text-sm tabular-nums" style={{ fontFamily: 'system-ui, sans-serif' }}>25%</text>
              </g>
              <g transform="translate(0, 88)">
                <text x="0" y="26" className="fill-slate-700 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Learning & exploration</text>
                <rect x="0" y="32" width="400" height="20" rx="10" fill="rgb(241 245 249)" />
                <rect x="0" y="32" width="80" height="20" rx="10" fill="url(#energy-bar-3)" className="energy-bar-fill" style={{ animationDelay: '0.4s' }} />
                <text x="408" y="46" className="fill-slate-500 text-sm tabular-nums" style={{ fontFamily: 'system-ui, sans-serif' }}>20%</text>
              </g>
              <g transform="translate(0, 132)">
                <text x="0" y="26" className="fill-slate-700 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Tools & automation</text>
                <rect x="0" y="32" width="400" height="20" rx="10" fill="rgb(241 245 249)" />
                <rect x="0" y="32" width="48" height="20" rx="10" fill="url(#energy-bar-4)" className="energy-bar-fill" style={{ animationDelay: '0.55s' }} />
                <text x="408" y="46" className="fill-slate-500 text-sm tabular-nums" style={{ fontFamily: 'system-ui, sans-serif' }}>12%</text>
              </g>
              <g transform="translate(0, 176)">
                <text x="0" y="26" className="fill-slate-700 text-sm font-medium" style={{ fontFamily: 'system-ui, sans-serif' }}>Admin & context-switching</text>
                <rect x="0" y="32" width="400" height="20" rx="10" fill="rgb(241 245 249)" />
                <rect x="0" y="32" width="32" height="20" rx="10" fill="url(#energy-bar-5)" className="energy-bar-fill" style={{ animationDelay: '0.7s' }} />
                <text x="408" y="46" className="fill-slate-500 text-sm tabular-nums" style={{ fontFamily: 'system-ui, sans-serif' }}>8%</text>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
              <h2 className="text-6xl font-semibold text-slate-900">Offering high value in the shortest amount of time</h2>
              <div className="mt-10 space-y-8">
                <p className="max-w-3xl text-slate-600">
                  The goal isn&apos;t to do more in less time — it&apos;s to spend time on the work that actually moves the needle. AI lets us offload the repetitive bits so we can focus on creative and strategic decisions.
                </p>
                <h3 className="text-xl font-semibold text-slate-900">How we get there</h3>
                <p className="max-w-3xl text-slate-600">
                  Start with clear outcomes. Use AI to draft, prototype, and explore options quickly. Keep humans in the loop for judgment, taste, and user empathy. Measure success by impact, not output.
                </p>
                <h3 className="text-xl font-semibold text-slate-900">Using smaller teams</h3>
                <p className="max-w-3xl text-slate-600">
                  Smaller teams drive productivity — less coordination overhead, faster decisions, clearer ownership.
                </p>
              </div>
            </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Exploration</h2>
            <div className="mt-8 space-y-4">
              <p className="max-w-3xl text-slate-600">
                AI lowers the cost of trying new things. Want to test a wild idea? Spin up a prototype. Unsure about a direction? Generate a few options and compare. The best way to learn what works is to explore without overcommitting — and AI makes that exploration cheap and fast.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Pushing envelopes and taking things further</h2>
            <div className="mt-8 space-y-4">
              <p className="max-w-3xl text-slate-600">
                We&apos;re not here to do the same work faster. We&apos;re here to ask what&apos;s possible now that wasn&apos;t before. AI can help us reach for higher-fidelity prototypes, richer research synthesis, and ideas that used to be out of reach. Push the boundaries — the tools will catch up.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Reducing designer stress</h2>
            <div className="mt-8 space-y-4">
              <p className="max-w-3xl text-slate-600">
                Repetitive tasks — pixel-pushing, boilerplate, endless tweaks — drain creativity and add friction. When AI handles the tedious parts, we can spend more time in flow: thinking, iterating, and solving real problems. Less burnout, more room for the work that matters.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Calmness by code</h2>
            <div className="mt-8 space-y-4">
              <p className="max-w-3xl text-slate-600">
                Code can be a source of calm, not chaos. When AI helps with scaffolding, refactoring, and documentation, we spend less time wrestling with syntax and more time shaping experiences. The result: a calmer, more intentional workflow where the machine handles the noise and we focus on the signal.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">The agents</h2>
            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Depth and prompt clarity</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  The clearer your intent, the better the output. Be specific: what format, what tone, what constraints? Include examples when you can. If the result is off, refine the prompt instead of accepting a mediocre draft — the agent improves when you give it more to work with.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Context and continuity</h3>
                <p className="mt-3 max-w-3xl text-slate-600">
                  Agents work best when they have context. Point them at files, paste relevant snippets, remind them of decisions you&apos;ve made. They don&apos;t remember between sessions — so bring them up to speed quickly and explicitly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">Frustrations</h2>
            <div className="mt-8 space-y-4">
              <p className="max-w-3xl text-slate-600">
                Agents aren&apos;t perfect. They hallucinate, overcomplicate, and sometimes take the path of least resistance. They&apos;ll agree with you even when wrong, and they can loop or overwrite work. The key is to treat them as powerful but flawed partners: verify outputs, redirect when they drift, and know when to step in and fix things yourself.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900">AI lessons</h2>
            <p className="mt-6 max-w-3xl text-slate-600">
              Learnings from working with agents in Cursor over the last 10 months, grouped by theme.
            </p>

            <div className="mt-10 max-w-3xl space-y-10">
              <div>
                <h3 className="text-xl font-semibold text-slate-900">Trust & verification</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Trust your gut as the master — the agent doesn’t think through the full impact of tasks.</li>
                  <li>Question the agents; they are not always correct.</li>
                  <li>They often agree with you even when they’ve understood or executed incorrectly.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">How agents behave</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>They can be “lazy”: they sometimes prefer you to carry out tasks, or they won’t complete a task and choose the easiest path and forget the rest.</li>
                  <li>They make changes without asking.</li>
                  <li>They move too many steps ahead and need to go back a step; they get stuck in loops solving an error unless you prompt them to stop and relook at the problem — they’ll dig themselves deeper if not stopped.</li>
                  <li>They overcomplicate things; the simplest tasks can be the ones they don’t get right the first time.</li>
                  <li>They want to get back to their original task, which can distract from what you need now.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">When to intervene</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Be patient — give it a little time sometimes to figure it out; you might be surprised.</li>
                  <li>When it’s looping, stop it and reframe the problem.</li>
                  <li>Overwritten work can be restored; push the agents harder to restore — don’t assume it’s lost.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">Human vs agent</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Some things are quicker with human mouse-and-click input.</li>
                  <li>Sometimes it’s quicker to rebuild an interface than to comb through and fix inconsistencies the agent introduced.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900">Tone & pushback</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
                  <li>Sometimes agents take a tone back at you; stay clear on what you want and when to redirect.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-6 py-28">
          <p className="text-lg font-medium text-slate-800 sm:text-xl md:text-2xl md:max-w-3xl">
            Would you take the blue or red pill?
          </p>
          <p className="mt-6 text-lg font-medium text-slate-800 sm:text-xl md:text-2xl md:max-w-3xl">
            But when you figure things out together, it&apos;s like magic!
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
