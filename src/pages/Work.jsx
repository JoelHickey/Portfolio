import { Link } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import MatrixRain from '../components/MatrixRain'

const caseStudies = [
  {
    title: 'Coverage without the extra steps',
    summary: 'Embedded insurance quoting directly into the booking journey.',
    tags: ['Travel', 'Insurance', 'Conversion'],
    image: '/portfolio-slideshow/compono.png',
    path: '/portfolio/insurance'
  },
  {
    title: 'Streamlining Amendments',
    summary: 'Slow, error-prone flow → guided workflow.\n70% less handling time, 9 screens to 3.',
    tags: ['Workflow', 'Product', 'Research'],
    image: '/images/amendments/traveltourism-1.jpg',
    path: '/portfolio/amendments'
  },
  {
    title: 'Flight Centre Travel Group (FCTG) AI Talk',
    summary: 'Planning — AI talk for Flight Centre Travel Group.',
    tags: ['AI', 'Travel', 'Talk'],
    image: '/candidpreso.webp',
    path: '/portfolio/fctg-ai-talk'
  },
  {
    title: 'Magento Bulk Shipments',
    summary: 'Rebuilt the bulk update flow to reduce carrier escalations and speed fulfilment.',
    tags: ['Logistics', 'Magento', 'Workflow'],
    image: '/portfolio-slideshow/magento-batch.png',
    path: '/portfolio/magento-shipping'
  }
]

function Work() {
  const slides = useMemo(
    () => [
      { src: '/portfolio-slideshow/temando-personas.png', alt: 'Temando personas' },
      { src: '/portfolio-slideshow/temando-reports.png', alt: 'Temando reports dashboard' },
      { src: '/portfolio-slideshow/compono.png', alt: 'Compono return flow' },
      { src: '/portfolio-slideshow/magento-batch.png', alt: 'Magento batch flow' },
      { src: '/portfolio-slideshow/bicoin-card.png', alt: 'Bitcoin gift card concept' },
      { src: '/portfolio-slideshow/magento-partners.jpg', alt: 'Magento shipping partners list' },
      { src: '/portfolio-slideshow/magento-welcome.png', alt: 'Magento shipping welcome screen' }
    ],
    []
  )
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) =>
        slides.length <= 1 ? current : (current + 1) % slides.length
      )
    }, 4500)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="flex flex-col">
      <div className="flex min-h-[calc(100vh-64px)] w-full items-start justify-center bg-white pb-28 -mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="full-bleed mb-0 -mt-4">
            <div className="portfolio-hero-video w-full overflow-hidden bg-[#0c1b3e] h-[600px]">
              {slides.map((slide, index) => (
                <img
                  key={slide.src}
                  src={slide.src}
                  alt={slide.alt}
                  className={[
                    index === activeIndex ? 'is-active' : undefined,
                    slide.src.includes('bicoin-card') ? 'hero-zoom-out' : undefined
                  ].filter(Boolean).join(' ')}
                />
              ))}
            </div>
          </div>
          <h1 className="mt-20 text-5xl font-medium text-slate-900 md:text-6xl">
            <span className="bg-[linear-gradient(90deg,#5b21b6_0%,#7c3aed_35%,#2dd4bf_65%,#5eead4_100%)] bg-clip-text text-transparent">
              Portfolio
            </span>
          </h1>
          <p className="mt-4 mb-16 text-base leading-relaxed text-slate-600 md:text-lg">
            Selected stories across product, design systems, and AI‑assisted workflows.
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((card) => {
              const content = (
                <>
                  <div className="aspect-video w-full overflow-hidden rounded-t-2xl border-b border-slate-200">
                    {card.path === '/portfolio/fctg-ai-talk' ? (
                      <div className="relative h-full w-full bg-[#030b0f]">
                        <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black/70"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">{card.summary}</p>
                    <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                      {card.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition duration-300 group-hover:bg-black/50" aria-hidden />
                  {card.path && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                      <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg">
                        View case study
                      </span>
                    </div>
                  )}
                </>
              )

              if (card.path) {
                return (
                  <Link
                    key={card.title}
                    to={card.path}
                    className="block"
                  >
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                      {content}
                    </article>
                  </Link>
                )
              }

              return (
                <article
                  key={card.title}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  {content}
                </article>
              )
            })}
          </div>
        </div>
      </div>
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900">Archive</h2>
          <div className="mt-6 grid gap-4 text-sm text-slate-600 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Bitcoin Gift Card',
                src: '/portfolio-slideshow/bicoin-card.png'
              },
              {
                title: 'Compono Return Portal',
                src: '/portfolio-slideshow/compono.png'
              },
              {
                title: 'Magento Batch Processing',
                src: '/portfolio-slideshow/magento-batch.png'
              },
              {
                title: 'Magento Shipping Partners',
                src: '/portfolio-slideshow/magento-partners.jpg'
              },
              {
                title: 'Magento Shipping Welcome',
                src: '/portfolio-slideshow/magento-welcome.png'
              },
              {
                title: 'Temando Backlog Concept',
                src: '/portfolio-slideshow/temando-backog.png'
              },
              {
                title: 'Temando Developers Portal',
                src: '/portfolio-slideshow/temando-landing.png'
              },
              {
                title: 'Shipping Personas',
                src: '/portfolio-slideshow/temando-personas.png'
              },
              {
                title: 'Magento Shipping Reports',
                src: '/portfolio-slideshow/temando-reports.png'
              },
              {
                title: 'Temando T3 Style Guide',
                src: '/portfolio-slideshow/temando-styleguide.png'
              }
            ].map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="h-40 w-full overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="px-5 py-4 text-sm font-medium text-slate-800">
                  {item.title}
                </div>
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/0 transition duration-300 group-hover:bg-black/50" aria-hidden />
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100">
                  <span className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-lg">
                    View case study
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work
