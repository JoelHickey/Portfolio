import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import confetti from 'canvas-confetti'
import MatrixRain from '../components/MatrixRain'
import capProductStrategy from '../assets/capabilities/cap-product-strategy-design.png'
import capAiWorkflows from '../assets/capabilities/cap-ai-workflows.png'
import capDesignSystems from '../assets/capabilities/cap-design-systems.png'
import capUsabilityTesting from '../assets/capabilities/cap-usability-testing.png'
import capCustomerResearch from '../assets/capabilities/cap-customer-research.png'
import capDiscoveryFraming from '../assets/capabilities/cap-discovery-framing.png'
import capPrototypingIteration from '../assets/capabilities/cap-prototyping-iteration.png'

const CASE_STUDIES = [
  {
    id: 'fctg',
    title: 'AI talk for now',
    description: 'Speaking with Flight Centre about AI in March.',
    content: (
      <>
        <div className="relative h-[85vh] w-full shrink-0 overflow-hidden bg-slate-800">
          <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.9} />
          <div className="absolute inset-0 bg-black/50 pointer-events-none" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 p-[112px]">
            <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
              AI talk for now
            </h3>
            <p className="mt-1 text-base leading-relaxed text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] md:text-lg">
              Speaking with Flight Centre about AI in March.
            </p>
            <Link
              to="/stories/fctg-ai-talk"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
            >
              View case study
            </Link>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'amendments',
    title: 'Streamlining Amendments',
    description: 'Slow, error-prone flow → guided workflow. 70% less handling time, 9 screens to 3.',
    content: (
      <>
        <div className="relative h-[85vh] w-full shrink-0 overflow-hidden bg-slate-50">
          <img
            src="/images/amendments/traveltourism-1.jpg"
            alt="Streamlining Amendments"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-16">
            <h3 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Streamlining Amendments
            </h3>
            <p className="mt-1 whitespace-nowrap text-base leading-relaxed text-white/90 md:text-lg">
              Slow, error-prone flow → guided workflow. 70% less handling time, 9 screens to 3.
            </p>
            <Link
              to="/stories/amendments"
              className="mt-4 inline-block rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              View case study
            </Link>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'placeholder-1',
    title: 'Coming soon',
    description: 'Case study in the works.',
    content: (
      <>
        <div className="relative h-[85vh] w-full shrink-0 overflow-hidden bg-slate-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-16">
            <p className="text-center text-slate-500 text-lg">Coming soon</p>
            <span className="cursor-not-allowed rounded-full border border-slate-300 bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500">
              View case study
            </span>
          </div>
        </div>
      </>
    )
  },
  {
    id: 'placeholder-2',
    title: 'Coming soon',
    description: 'Case study in the works.',
    content: (
      <>
        <div className="relative h-[85vh] w-full shrink-0 overflow-hidden bg-slate-100">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-16">
            <p className="text-center text-slate-500 text-lg">Coming soon</p>
            <span className="cursor-not-allowed rounded-full border border-slate-300 bg-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-500">
              View case study
            </span>
          </div>
        </div>
      </>
    )
  }
]

// First page = AI talk full width; remaining studies in pairs
const CASE_STUDY_PAGES = [[0], [1, 2], [3]]
const PAGE_COUNT = CASE_STUDY_PAGES.length

// Strip carousel: other case studies (AI talk omitted — promoted above)
const CASE_STUDY_STRIP = [
  { id: 'amendments', title: 'Streamlining Amendments', description: '70% less handling time, 9 screens to 3.', path: '/stories/amendments', image: '/images/amendments/traveltourism-1.jpg' },
  { id: 'insurance', title: 'Coverage without the extra steps', description: 'Embedded insurance quoting into the booking journey.', path: '/stories/insurance', image: '/portfolio-slideshow/compono.png' },
  { id: 'magento', title: 'Magento Bulk Shipments', description: 'Rebuilt the bulk update flow to reduce carrier escalations and speed fulfilment.', path: '/stories', image: '/portfolio-slideshow/magento-batch.png' },
  { id: 'placeholder-1', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null },
  { id: 'placeholder-2', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null }
]
const STRIP_SCROLL_SPEED = 1
const STRIP_SCROLL_SPEED_HOVER = 0.08

const CAPABILITY_IMAGES = [
  { src: capProductStrategy, alt: 'Product Strategy & Design', title: 'Product Strategy & Design', description: 'Roadmaps, vision, and outcomes that align teams.', details: ['Roadmaps & OKRs', 'Vision & north star', 'Outcome-focused prioritisation', 'Stakeholder alignment'] },
  { src: capAiWorkflows, alt: 'AI Workflows', title: 'AI Workflows', description: 'Automation and intelligent workflows that scale.', details: ['Prompt design & tuning', 'Tool integration (APIs, agents)', 'Human-in-the-loop flows', 'Automation that scales quality'] },
  { src: capDesignSystems, alt: 'Design Systems', title: 'Design Systems', description: 'Components, tokens, and consistent UI at scale.', details: ['Components & patterns', 'Design tokens & theming', 'Documentation & usage', 'Cross-product consistency'] },
  { src: capUsabilityTesting, alt: 'Usability Testing', title: 'Usability Testing', description: 'Testing with real users to find what works.', details: ['Test planning & scripts', 'Moderation & facilitation', 'Findings & recommendations', 'Iteration with evidence'] },
  { src: capCustomerResearch, alt: 'Customer Research', title: 'Customer Research', description: 'Customer insights that shape the product.', details: ['Interviews & surveys', 'Jobs-to-be-done', 'Synthesis & insight reports', 'Strategy & prioritisation input'] },
  { src: capDiscoveryFraming, alt: 'Discovery & Framing', title: 'Discovery & Framing', description: 'Problem framing, opportunity mapping, and jobs-to-be-done.', details: ['Problem framing', 'Opportunity mapping', 'JTBD & discovery', 'Alignment workshops'] },
  { src: capPrototypingIteration, alt: 'Prototyping & Iteration', title: 'Prototyping & Iteration', description: 'Lo-fi to hi-fi prototypes and concept testing.', details: ['Lo-fi to hi-fi prototypes', 'Concept testing', 'Flow validation', 'Learn before build'] }
]

function Home() {
  const [caseStudyPage] = useState(0)
  const [capabilitiesInView, setCapabilitiesInView] = useState(false)
  const [, setCapabilitiesHeadingInView] = useState(false)
  const [capabilitiesCardsInView, setCapabilitiesCardsInView] = useState(false)
  const [hoveredCapabilityCard, setHoveredCapabilityCard] = useState(null)
  const [flippedCapabilityCard, setFlippedCapabilityCard] = useState(null)
  const [capabilityStaggerDone, setCapabilityStaggerDone] = useState(false)
  const [stripHovered, setStripHovered] = useState(false)
  const capabilitiesRef = useRef(null)
  const capabilitiesHeadingRef = useRef(null)
  const capabilitiesCardsRef = useRef(null)
  const stripTrackRef = useRef(null)
  const stripOffsetRef = useRef(0)

  // Auto-scroll strip: moves continuously, slows on hover
  useEffect(() => {
    const track = stripTrackRef.current
    if (!track) return
    let rafId
    const cardWidth = 420
    const gap = 32
    const segmentWidth = CASE_STUDY_STRIP.length * (cardWidth + gap)

    const tick = () => {
      const speed = stripHovered ? STRIP_SCROLL_SPEED_HOVER : STRIP_SCROLL_SPEED
      stripOffsetRef.current += speed
      if (stripOffsetRef.current >= segmentWidth) stripOffsetRef.current -= segmentWidth
      track.style.transform = `translateX(-${stripOffsetRef.current}px)`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [stripHovered])

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
    if (!capabilitiesInView) return
    const t = setTimeout(() => setCapabilityStaggerDone(true), 600)
    return () => clearTimeout(t)
  }, [capabilitiesInView])

  useEffect(() => {
    document.body.classList.add('home-sky')
    const duration = 1400
    const start = Date.now()

    const frame = () => {
      const progress = Math.min((Date.now() - start) / duration, 1)
      confetti({
        particleCount: 2,
        spread: 18,
        startVelocity: 16,
        decay: 0.92,
        gravity: 0.5,
        scalar: 0.6,
        shapes: ['star'],
        origin: {
          x: progress,
          y: 0.58
        },
        colors: ['#2dd4bf', '#a855f7']
      })

      if (progress < 1) {
        requestAnimationFrame(frame)
      }
    }

    frame()

    return () => {
      document.body.classList.remove('home-sky')
    }
  }, [])

  // Fireworks when scroll reaches the cards
  const fireworksFiredRef = useRef(false)
  useEffect(() => {
    if (!capabilitiesCardsInView || fireworksFiredRef.current) return
    fireworksFiredRef.current = true

    const el = capabilitiesCardsRef.current
    if (!el) return

    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect()
    const fiveRem = 80 // 5rem in px (cards use bottom: 5rem, transformOrigin 50% 100%)
    const centerX = rect.left + rect.width / 2
    const centerY = rect.bottom - fiveRem
    const x = centerX / window.innerWidth
    const y = centerY / window.innerHeight

    const fireFirework = (delay) => {
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 360,
          angle: 90,
          startVelocity: 50,
          decay: 0.92,
          gravity: 0.8,
          scalar: 0.8,
          shapes: ['star', 'circle'],
          origin: { x, y },
          colors: ['#2dd4bf', '#a855f7', '#f59e0b', '#ffffff']
        })
      }, delay)
    }

    fireFirework(0)
    fireFirework(120)
    fireFirework(240)
    fireFirework(360)
    fireFirework(480)
    })
  }, [capabilitiesCardsInView])


  return (
    <section className="flex flex-col items-center">
      <div className="home-hero flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
        <div className="mx-auto w-full max-w-3xl space-y-16 px-2 text-center -mt-16">
          <div className="hero-stack">
            <p className="hero-line text-white text-6xl font-medium leading-[1.1] tracking-normal md:text-7xl">
              Joel Hickey
            </p>
            <p className="hero-line text-base font-light leading-snug text-slate-200 sm:text-xl md:text-2xl lg:text-3xl [animation-delay:120ms]">
              Designing high‑impact products that people love using.
            </p>
            <div className="hero-line mt-4 flex justify-center" style={{ animationDelay: '200ms' }}>
            <Link
              to="/stories"
              className="inline-block w-fit max-w-full rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent whitespace-nowrap"
            >
              See what I've built
            </Link>
          </div>
          </div>
        </div>
      </div>
      <section id="case-studies" className="bg-white self-stretch -mx-2 w-[calc(100%+1rem)] scroll-mt-0" aria-label="Highlights">
        <div className="mx-auto w-full max-w-full p-0">
          <div className="flex flex-col gap-4">
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{
                  width: `${PAGE_COUNT * 100}%`,
                  transform: `translateX(-${(caseStudyPage / PAGE_COUNT) * 100}%)`
                }}
              >
                {CASE_STUDY_PAGES.map((indices, page) => (
                  <div
                    key={page}
                    className={`grid w-full gap-0 shrink-0 ${indices.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}
                    style={{ width: `${100 / PAGE_COUNT}%` }}
                  >
                    {indices.map((i) => (
                      <article key={CASE_STUDIES[i].id} className="relative flex flex-col overflow-hidden">
                        {CASE_STUDIES[i].content}
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Apple-style auto-scroll strip: other case studies, slows on hover */}
      <section className="-mx-2 w-[calc(100%+1rem)] overflow-hidden bg-white py-[112px]" aria-label="More work">
        <div className="overflow-hidden pb-8">
          <div
            ref={stripTrackRef}
            className="flex w-max gap-8 will-change-transform"
            style={{ width: 'max-content' }}
          >
            {[...CASE_STUDY_STRIP, ...CASE_STUDY_STRIP].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="group relative flex w-[380px] shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-md sm:w-[420px]"
                onMouseEnter={() => setStripHovered(true)}
                onMouseLeave={() => setStripHovered(false)}
              >
                <div className="aspect-[16/10] w-full shrink-0 overflow-hidden bg-slate-200">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-base text-slate-600 line-clamp-2">{item.description}</p>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="pointer-events-auto rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800"
                    >
                      View case study
                    </Link>
                  ) : (
                    <span className="rounded-full border border-white/80 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section ref={capabilitiesRef} className="-mx-2 w-[calc(100%+1rem)] overflow-visible bg-slate-100 px-8 sm:px-16 md:px-24 pb-36" aria-label="Capabilities">
        <div className="w-full overflow-visible">
          <h2
            ref={capabilitiesHeadingRef}
            className={`w-full pt-[112px] pb-16 md:pb-20 text-center text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl transition-all duration-700 ease-out bg-[linear-gradient(90deg,#0f172a_0%,#4f46e5_35%,#0891b2_70%,#0f172a_100%)] bg-clip-text text-transparent ${
              capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Capabilities
          </h2>
          <div ref={capabilitiesCardsRef} className="relative overflow-visible min-h-[80vh] px-8 sm:px-16 md:px-24 pt-8 pb-24">
            {CAPABILITY_IMAGES.map((cap, i) => {
              const totalSpread = 70
              const rotation = -totalSpread / 2 + (i / Math.max(CAPABILITY_IMAGES.length - 1, 1)) * totalSpread
              const isHovered = hoveredCapabilityCard === i
              const isFlipped = flippedCapabilityCard === i
              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isFlipped}
                  aria-label={isFlipped ? `${cap.title}: ${cap.description}` : cap.title}
                  onMouseEnter={() => setHoveredCapabilityCard(i)}
                  onMouseLeave={() => setHoveredCapabilityCard(null)}
                  onFocus={() => setHoveredCapabilityCard(i)}
                  onBlur={() => setHoveredCapabilityCard(null)}
                  onClick={() => setFlippedCapabilityCard((prev) => (prev === i ? null : i))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setFlippedCapabilityCard((prev) => (prev === i ? null : i))
                    }
                    if (e.key === 'Escape') setFlippedCapabilityCard(null)
                  }}
                  className={`absolute overflow-visible rounded-2xl bg-slate-100 cursor-pointer select-none aspect-[5/7] ${
                    capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  } ${isHovered ? 'shadow-2xl' : 'shadow-xl'} transition-all duration-400 ease-out`}
                  style={{
                    transitionDelay: isHovered || capabilityStaggerDone ? '0ms' : (capabilitiesInView ? `${i * 50}ms` : '0ms'),
                    left: '50%',
                    bottom: '5rem',
                    transform: isHovered
                      ? `translateX(-50%) translateY(-2.5rem) rotate(${rotation}deg) scale(1.236)`
                      : `translateX(-50%) rotate(${rotation}deg) scale(1.2)`,
                    width: '38vmin',
                    transformOrigin: '50% 100%',
                    zIndex: isHovered ? 50 : i
                  }}
                >
                  <div className="relative w-full h-full" style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}>
                    <div
                      className="relative w-full h-full transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                      style={{
                        transformStyle: 'preserve-3d',
                        WebkitTransformStyle: 'preserve-3d',
                        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      {/* Front - hidden when flipped so we never see "reversed" image */}
                      <div
                        className="absolute inset-0 rounded-2xl overflow-hidden bg-slate-100 transition-opacity duration-300"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          opacity: isFlipped ? 0 : 1,
                          pointerEvents: isFlipped ? 'none' : 'auto'
                        }}
                      >
                        <img
                          src={cap.src}
                          alt=""
                          className="h-full w-full object-cover object-center pointer-events-none"
                          width={800}
                          height={400}
                          draggable={false}
                        />
                      </div>
                      {/* Back - pre-rotated so its front faces the back of the card; visible only when flipped */}
                      <div
                        className="absolute inset-0 rounded-2xl overflow-hidden flex flex-col items-center justify-start p-4 md:p-5 text-center bg-slate-800 text-white overflow-y-auto transition-opacity duration-300"
                        style={{
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg) translateZ(1px)',
                          opacity: isFlipped ? 1 : 0,
                          pointerEvents: isFlipped ? 'auto' : 'none'
                        }}
                      >
                        <h3 className="text-xs font-semibold tracking-tight text-white uppercase mb-3 shrink-0">
                          {cap.title}
                        </h3>
                        <ul className="text-left w-full space-y-1.5 text-[10px] md:text-xs text-slate-200">
                          {cap.details.map((item, j) => (
                            <li key={j} className="flex items-center gap-2">
                              <span className="text-slate-400 shrink-0">·</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        <span className="mt-auto pt-3 shrink-0 text-[9px] md:text-[10px] text-slate-400">
                          Click to flip back
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      <div className="-mx-2 w-[calc(100%+1rem)] min-h-screen bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-2 pt-28 pb-16">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Get in touch
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
            Let&apos;s design products people love. Available for senior product design roles, advisory work, and collaborations.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button className="rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white transition hover:bg-slate-800">
              Email me
            </button>
            <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300">
              Download CV
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
