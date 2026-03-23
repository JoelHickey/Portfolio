import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import MatrixRain from '../components/MatrixRain'
import ParticleBackground from '../components/ParticleBackground'
import { FCTG_PRESO_URL } from '../constants/preso'
import { FCTGEnergyPreview } from './Home'

/* Apple shop–style: soft shadow visible at top of card + diffuse below (matches apple.com/shop) */
const cardShadow =
  'shadow-[0_-2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.04),0_4px_20px_rgba(0,0,0,0.06),0_20px_48px_-12px_rgba(0,0,0,0.08)]'
const cardShadowHover =
  'hover:shadow-[0_-4px_12px_rgba(0,0,0,0.05),0_2px_8px_rgba(0,0,0,0.05),0_12px_32px_rgba(0,0,0,0.08),0_28px_56px_-16px_rgba(0,0,0,0.1)]'

const caseStudies = [
  {
    title: 'Insurance',
    summary: 'Coverage woven into the travel journey.',
    tags: ['Travel', 'Insurance', 'Conversion'],
    image: '/portfolio-slideshow/compono.png',
    path: '/stories/insurance'
  },
  {
    title: 'Amendments',
    summary: 'Updates to travel components simplified.',
    tags: ['Workflow', 'Product', 'Research'],
    image: '/images/amendments/traveltourism-1.jpg',
    path: '/stories/amendments'
  },
  {
    title: 'Agentic AI',
    summary: 'Presented live, March 2026.',
    tags: ['AI', 'Travel', 'Talk'],
    image: null,
    path: null,
    externalUrl: FCTG_PRESO_URL,
    preview: 'energy'
  },
  {
    title: 'Deep link',
    summary: 'Unified entry point from CRM into Helio.',
    tags: ['Travel', 'Systems', 'Navigation'],
    image: null,
    preview: 'crm-helio',
    path: '/stories/helio-deep-linking'
  },
  {
    title: 'Helio Platform Enhancements',
    summary: 'Case study in progress.',
    tags: ['Travel', 'Platform'],
    image: null,
    preview: 'placeholder',
    path: null
  },
  {
    title: 'Magento Bulk Shipments',
    summary: 'Rebuilt the bulk update flow to reduce carrier escalations and speed fulfilment.',
    tags: ['Logistics', 'Magento', 'Workflow'],
    image: '/portfolio-slideshow/magento-batch.png',
    path: '/stories/magento-shipping'
  }
]

const archiveItems = [
  { title: 'Bitcoin Gift Card', image: '/portfolio-slideshow/bicoin-card.png', path: null, summary: '', tags: [] },
  { title: 'Compono Return Portal', image: '/portfolio-slideshow/compono.png', path: null, summary: '', tags: [] },
  { title: 'Magento Batch Processing', image: '/portfolio-slideshow/magento-batch.png', path: null, summary: '', tags: [] },
  { title: 'Magento Shipping Partners', image: '/portfolio-slideshow/magento-partners.jpg', path: null, summary: '', tags: [] },
  { title: 'Magento Shipping Welcome', image: '/portfolio-slideshow/magento-welcome.png', path: null, summary: '', tags: [] },
  { title: 'Temando Backlog Concept', image: '/portfolio-slideshow/temando-backog.png', path: null, summary: '', tags: [] },
  { title: 'Temando Developers Portal', image: '/portfolio-slideshow/temando-landing.png', path: null, summary: '', tags: [] },
  { title: 'Shipping Personas', image: '/portfolio-slideshow/temando-personas.png', path: null, summary: '', tags: [] },
  { title: 'Magento Shipping Reports', image: '/portfolio-slideshow/temando-reports.png', path: null, summary: '', tags: [] },
  { title: 'Temando T3 Style Guide', image: '/portfolio-slideshow/temando-styleguide.png', path: null, summary: '', tags: [] }
]

const featuredStory = caseStudies.find((card) => card.externalUrl) ?? caseStudies[0]
const storyIndexCards = [...caseStudies.filter((card) => card !== featuredStory), ...archiveItems]

function Work() {
  useEffect(() => {
    document.body.classList.add('home-sky')
    return () => document.body.classList.remove('home-sky')
  }, [])

  const featuredStoryContent = (
    <article
      className={`group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-white transition duration-300 ease-out ${
        featuredStory.path || featuredStory.externalUrl ? `hover:-translate-y-0.5 ${cardShadowHover}` : ''
      } ${cardShadow} md:flex md:min-h-[380px]`}
    >
      <div className="relative flex flex-1 flex-col justify-center p-8 md:p-10 lg:p-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Featured story</p>
        <h3 className="mt-4 text-4xl font-semibold tracking-wide text-slate-900 md:text-5xl lg:text-6xl">
          {featuredStory.title}
        </h3>
        {featuredStory.summary && (
          <p className="mt-3 text-xl font-extralight tracking-wider text-slate-600 md:text-2xl">
            {featuredStory.summary}
          </p>
        )}
        {featuredStory.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            {featuredStory.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1">
                {tag}
              </span>
            ))}
          </div>
        )}
        {(featuredStory.path || featuredStory.externalUrl) && (
          <span className="mt-6 inline-block w-fit rounded-full bg-slate-900 px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-sm">
            {featuredStory.externalUrl ? 'Open presentation' : 'View case study'}
          </span>
        )}
      </div>

      <div className="border-t border-slate-200 md:w-[46%] md:border-l md:border-t-0">
        <div className="relative h-full min-h-[280px] w-full overflow-hidden bg-slate-950">
          {featuredStory.preview === 'energy' ? (
            <div className="flex h-full w-full items-center justify-center bg-slate-950 px-6">
              <FCTGEnergyPreview />
            </div>
          ) : featuredStory.matrixPreview ? (
            <>
              <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
              <div className="pointer-events-none absolute inset-0 bg-black/70" aria-hidden />
            </>
          ) : featuredStory.preview === 'crm-helio' ? (
            <div
              className="relative flex h-full w-full items-center justify-center overflow-hidden"
              style={{
                background:
                  'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.2), transparent 28%), radial-gradient(circle at 78% 32%, rgba(129, 140, 248, 0.22), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 75%, #000000 100%)'
              }}
            >
              <div className="grid w-full max-w-[88%] grid-cols-[1fr_auto_1fr] items-center gap-3">
                <div className="rounded-2xl border border-cyan-400/20 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">CRM</p>
                  <p className="mt-2 text-base font-semibold text-white">Microsoft</p>
                </div>
                <div className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                  Link
                </div>
                <div className="rounded-2xl border border-violet-400/20 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Product</p>
                  <p className="mt-2 text-base font-semibold text-white">Helio</p>
                </div>
              </div>
            </div>
          ) : featuredStory.preview === 'placeholder' ? (
            <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#ecfeff_100%)]">
              <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                Coming soon
              </div>
            </div>
          ) : (
            <img
              src={featuredStory.image}
              alt={featuredStory.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          )}
        </div>
      </div>
    </article>
  )

  return (
    <section className="relative z-10 flex flex-col">
      {/* Full viewport: title + subtitle centered — cards below the fold */}
      <div
        className="relative flex min-h-[75svh] w-full flex-col justify-center overflow-hidden px-16 py-12 md:px-20 lg:px-24"
        role="region"
        aria-labelledby="stories-heading"
      >
        <div className="pointer-events-none absolute inset-0 min-h-full overflow-hidden bg-[#0a0f18]">
          {/* contained = canvas clips to hero only; default fixed fullscreen canvas was painting over the white section below */}
          <ParticleBackground variant="scatter" contained className="h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="flex max-w-full flex-col items-center leading-none">
            <h1 id="stories-heading" className="m-0 text-6xl font-bold tracking-wide md:text-7xl lg:text-8xl">
              <span className="bg-[linear-gradient(90deg,#06b6d4_0%,#14b8a6_35%,#2dd4bf_65%,#5eead4_100%)] bg-clip-text text-transparent">
                Stories
              </span>
            </h1>
            <div
              className="mt-3 h-10 w-full max-w-md min-w-[16rem] sm:h-11 sm:max-w-lg md:h-14 md:max-w-xl"
              aria-hidden
            >
              <svg
                viewBox="0 0 420 72"
                className="mx-auto h-full w-full max-w-full text-cyan-400/70"
                preserveAspectRatio="xMidYMid meet"
              >
                <title>Sound wave</title>
                {[...Array(22)].map((_, i) => (
                  <circle
                    key={i}
                    cx={14 + i * 18}
                    cy={36}
                    r={4}
                    fill="currentColor"
                    className="stories-sound-dot"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white pb-28">
        <div className="w-full pt-[112px] pb-20 text-center md:pb-24">
          <h2 className="text-4xl font-semibold tracking-wide text-slate-900 md:text-5xl lg:text-6xl">
            From discovery to delivery.
          </h2>
        </div>
        <div className="w-full px-16 text-left md:px-20 lg:px-24">
          {featuredStory.externalUrl ? (
            <a
              href={featuredStory.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              {featuredStoryContent}
            </a>
          ) : featuredStory.path ? (
            <Link to={featuredStory.path} className="block">
              {featuredStoryContent}
            </Link>
          ) : (
            featuredStoryContent
          )}

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {storyIndexCards.map((card) => {
              const content = (
                <>
                  <div className="aspect-video w-full overflow-hidden rounded-t-[32px] border-b border-slate-200">
                    {card.matrixPreview ? (
                      <div className="relative h-full w-full bg-[#030b0f]">
                        <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black/70"
                          aria-hidden
                        />
                      </div>
                    ) : card.preview === 'crm-helio' ? (
                      <div
                        className="relative flex h-full w-full items-center justify-center overflow-hidden"
                        style={{
                          background:
                            'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.2), transparent 28%), radial-gradient(circle at 78% 32%, rgba(129, 140, 248, 0.22), transparent 28%), linear-gradient(135deg, #020617 0%, #0f172a 40%, #111827 75%, #000000 100%)'
                        }}
                      >
                        <div className="grid w-full max-w-[88%] grid-cols-[1fr_auto_1fr] items-center gap-3">
                          <div className="rounded-2xl border border-cyan-400/20 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">CRM</p>
                            <p className="mt-2 text-base font-semibold text-white">Microsoft</p>
                          </div>
                          <div className="text-center text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100/80">
                            Link
                          </div>
                          <div className="rounded-2xl border border-violet-400/20 bg-white/5 px-4 py-4 text-center backdrop-blur-sm">
                            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">Product</p>
                            <p className="mt-2 text-base font-semibold text-white">Helio</p>
                          </div>
                        </div>
                      </div>
                    ) : card.preview === 'placeholder' ? (
                      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#f8fafc_0%,#eef2ff_45%,#ecfeff_100%)]">
                        <div className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 shadow-sm">
                          Coming soon
                        </div>
                      </div>
                    ) : (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6 pb-12">
                    <h3 className="text-xl font-semibold tracking-wide text-slate-900 md:text-2xl">{card.title}</h3>
                    {card.summary && (
                      <p
                        className={`mt-3 text-base font-extralight tracking-wider text-slate-600 ${
                          card.path === '/stories/insurance' ? 'whitespace-nowrap' : 'whitespace-pre-line'
                        }`}
                      >
                        {card.summary}
                      </p>
                    )}
                    {card.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-slate-600">
                        {card.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-slate-200 bg-white px-3 py-1">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {(card.path || card.externalUrl) && (
                      <span className="mt-4 inline-block w-fit rounded-full bg-slate-900 px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-sm">
                        {card.externalUrl ? 'Open presentation' : 'View case study'}
                      </span>
                    )}
                  </div>
                </>
              )

              if (card.externalUrl) {
                return (
                  <a
                    key={card.title}
                    href={card.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white transition duration-300 ease-out hover:-translate-y-0.5 ${cardShadow} ${cardShadowHover}`}
                    >
                      {content}
                    </article>
                  </a>
                )
              }

              if (card.path) {
                return (
                  <Link
                    key={card.title}
                    to={card.path}
                    className="block"
                  >
                    <article
                      className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white transition duration-300 ease-out hover:-translate-y-0.5 ${cardShadow} ${cardShadowHover}`}
                    >
                      {content}
                    </article>
                  </Link>
                )
              }

              return (
                <article
                  key={card.title}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[32px] border border-slate-200/80 bg-white transition duration-300 ease-out ${cardShadow}`}
                >
                  {content}
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Work

