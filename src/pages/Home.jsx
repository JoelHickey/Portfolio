import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'

// Case study cards: 3 per row grid
const CASE_STUDY_CARDS = [
  { id: 'fctg', title: 'AI talk for now', description: 'Speaking with Flight Centre about AI in March.', path: '/stories/fctg-ai-talk', image: null },
  { id: 'amendments', title: 'Streamlining Amendments', description: '70% less handling time, 9 screens to 3.', path: '/stories/amendments', image: null },
  { id: 'insurance', title: 'Coverage without the extra steps', description: 'Embedded insurance quoting into the booking journey.', path: '/stories/insurance', image: '/portfolio-slideshow/compono.png' },
  { id: 'magento', title: 'Magento Bulk Shipments', description: 'Rebuilt the bulk update flow to reduce carrier escalations and speed fulfilment.', path: '/stories', image: '/portfolio-slideshow/magento-batch.png' },
  { id: 'placeholder-1', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null },
  { id: 'placeholder-2', title: 'Coming soon', description: 'Case study in the works.', path: null, image: null }
]

const CAPABILITIES = [
  { title: 'Product Strategy & Design', description: 'Roadmaps, vision, and outcomes that align teams.', details: ['Roadmaps & OKRs', 'Vision & north star', 'Outcome-focused prioritisation', 'Stakeholder alignment'] },
  { title: 'AI Workflows', description: 'Automation and intelligent workflows that scale.', details: ['Prompt design & tuning', 'Tool integration (APIs, agents)', 'Human-in-the-loop flows', 'Automation that scales quality'] },
  { title: 'Design Systems', description: 'Components, tokens, and consistent UI at scale.', details: ['Components & patterns', 'Design tokens & theming', 'Documentation & usage', 'Cross-product consistency'] },
  { title: 'Usability Testing', description: 'Testing with real users to find what works.', details: ['Test planning & scripts', 'Moderation & facilitation', 'Findings & recommendations', 'Iteration with evidence'] },
  { title: 'Customer Research', description: 'Customer insights that shape the product.', details: ['Interviews & surveys', 'Jobs-to-be-done', 'Synthesis & insight reports', 'Strategy & prioritisation input'] },
  { title: 'Discovery & Framing', description: 'Problem framing, opportunity mapping, and jobs-to-be-done.', details: ['Problem framing', 'Opportunity mapping', 'JTBD & discovery', 'Alignment workshops'] },
  { title: 'Prototyping & Iteration', description: 'Lo-fi to hi-fi prototypes and concept testing.', details: ['Lo-fi to hi-fi prototypes', 'Concept testing', 'Flow validation', 'Learn before build'] }
]

function Home() {
  const [capabilitiesInView, setCapabilitiesInView] = useState(false)
  const [, setCapabilitiesHeadingInView] = useState(false)
  const [capabilitiesCardsInView, setCapabilitiesCardsInView] = useState(false)
  const capabilitiesRef = useRef(null)
  const capabilitiesHeadingRef = useRef(null)
  const capabilitiesCardsRef = useRef(null)

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

  return (
    <section className="flex flex-col items-center">
      <div className="home-hero relative flex min-h-[calc(100vh-64px)] w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 min-h-[calc(100vh-64px)]">
          <ParticleBackground variant="title" className="absolute inset-0 h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-3xl space-y-16 px-2 text-center -mt-16">
          <div className="hero-stack">
            <p className="hero-line text-6xl font-bold leading-[1.1] tracking-normal md:text-7xl lg:text-8xl">
              <span
                className="inline-block w-fit"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 25%, #6366f1 50%, #8b5cf6 75%, #d946ef 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Joel Hickey
              </span>
            </p>
            <p className="hero-line text-base font-light leading-snug text-slate-200 sm:text-xl md:text-2xl lg:text-3xl mb-8 [animation-delay:120ms]">
              Designing high‑impact products that people love using.
            </p>
            <div className="hero-line flex justify-center" style={{ animationDelay: '200ms' }}>
            <Link
              to="/stories"
              className="inline-block w-fit max-w-full rounded-full bg-gradient-to-r from-cyan-600 via-violet-700 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent whitespace-nowrap"
            >
              See what I've crafted
            </Link>
          </div>
          </div>
        </div>
      </div>
      {/* Work section: case study cards, 3 per row */}
      <section className="relative z-10 -mx-2 w-[calc(100%+1rem)] min-h-screen overflow-hidden bg-transparent pb-[112px]" aria-label="Stories">
        <h2 className="w-full pt-[112px] pb-20 md:pb-24 text-center text-5xl font-bold tracking-normal md:text-6xl lg:text-7xl">
          <span
            className="inline-block w-fit"
            style={{
              background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 35%, #2dd4bf 65%, #5eead4 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Stories
          </span>
        </h2>
        <div className="w-full px-16 md:px-20 lg:px-24 pb-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {CASE_STUDY_CARDS.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/20 shadow-xl transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
              >
                <div className="aspect-16/10 w-full shrink-0 overflow-hidden border-b border-cyan-500/20 bg-cyan-950/30">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt=""
                      className="h-full w-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <div className="h-full w-full bg-cyan-950/40" aria-hidden />
                  )}
                </div>
                <div className="flex flex-1 flex-col items-center text-center p-5 md:p-6">
                  <h3 className="text-xl font-semibold text-cyan-200 md:text-2xl">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-300 line-clamp-2 md:text-base">{item.description}</p>
                </div>
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-xl bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="pointer-events-auto rounded-full border border-cyan-500/40 bg-cyan-950/30 px-5 py-2.5 text-sm font-semibold text-cyan-200 shadow-sm transition hover:border-cyan-400/50 hover:bg-cyan-950/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent"
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
      <section ref={capabilitiesRef} className="relative z-10 -mx-2 w-[calc(100%+1rem)] min-h-screen overflow-visible bg-transparent pb-36" aria-label="Capabilities">
        <div className="w-full overflow-visible">
          <h2
            ref={capabilitiesHeadingRef}
            className={`w-full pt-[112px] pb-16 md:pb-20 text-center text-5xl font-bold tracking-normal md:text-6xl lg:text-7xl transition-all duration-700 ease-out bg-[linear-gradient(90deg,#0f172a_0%,#4f46e5_35%,#0891b2_70%,#0f172a_100%)] bg-clip-text text-transparent ${
              capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Capabilities
          </h2>
          <div className="w-full px-16 md:px-20 lg:px-24 pb-8">
            <div ref={capabilitiesCardsRef} className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.slice(0, 6).map((cap, i) => (
              <div
                key={i}
                className={`rounded-xl border border-cyan-500/40 bg-cyan-950/20 flex flex-col overflow-hidden shadow-xl backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/60 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)] ${
                  capabilitiesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: capabilitiesInView ? `${i * 50}ms` : '0ms'
                }}
              >
                <div className="flex flex-col p-5 md:p-6 text-center">
                  <h3 className="text-xl font-semibold text-cyan-200 md:text-2xl">
                    {cap.title}
                  </h3>
                  <ul className="text-center w-full mt-3 space-y-1.5 text-sm text-slate-300 md:text-base flex flex-col items-center">
                    {cap.details.map((item, j) => (
                      <li key={j} className="flex items-center justify-center gap-2">
                        <span className="text-cyan-400/70 shrink-0">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            </div>
          </div>
        </div>
      </section>
      <section className="relative z-10 -mx-2 w-[calc(100%+1rem)] min-h-screen bg-transparent pb-36" aria-label="Get in touch">
        <div className="mx-auto w-full max-w-6xl px-16 md:px-20 lg:px-24 pt-[112px] pb-16 text-center">
          <h2 className="w-full text-5xl font-bold tracking-normal text-cyan-100 md:text-6xl lg:text-7xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
            Let&apos;s design products people love. Available for senior product design roles, advisory work, and collaborations.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button className="rounded-full border border-cyan-500/40 bg-cyan-950/30 px-5 py-2.5 text-sm font-semibold text-cyan-200 shadow-sm transition hover:border-cyan-400/50 hover:bg-cyan-950/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-transparent">
              Email me
            </button>
            <button className="rounded-full border border-cyan-500/30 bg-transparent px-5 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-cyan-500/50 hover:text-cyan-200">
              Download CV
            </button>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Home
