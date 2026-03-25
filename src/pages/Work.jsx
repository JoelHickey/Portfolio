import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import MatrixRain from '../components/MatrixRain'
import ParticleBackground from '../components/ParticleBackground'
import { FCTG_PRESO_URL } from '../constants/preso'
import { FCTGEnergyPreview, InsurancePreview, AmendmentsPreview } from './Home'

const lineIcons = {
  package: {
    viewBox: '0 0 100 100',
    paths: [
      'M 50 18 L 82 34 L 82 66 L 50 82 L 18 66 L 18 34 Z',
      'M 50 18 L 50 82',
      'M 18 34 L 50 50 L 82 34',
    ],
  },
  coin: {
    viewBox: '0 0 100 100',
    paths: [
      'M 50 14 A 36 36 0 1 1 49.99 14',
      'M 42 36 Q 42 30 50 30 Q 58 30 58 36 Q 58 44 50 44 Q 42 44 42 52 Q 42 58 50 58 Q 58 58 58 52',
      'M 50 24 L 50 64',
    ],
  },
  panels: {
    viewBox: '0 0 100 100',
    paths: [
      'M 14 22 L 56 22 L 56 62 L 14 62 Z',
      'M 44 38 L 86 38 L 86 78 L 44 78 Z',
    ],
  },

  link: {
    viewBox: '0 0 100 100',
    paths: [
      'M 36 50 A 18 18 0 1 1 35.99 50',
      'M 64 50 A 18 18 0 1 1 63.99 50',
    ],
  },
  connect: {
    viewBox: '0 0 100 100',
    paths: [
      'M 26 50 A 14 14 0 1 1 25.99 50',
      'M 74 50 A 14 14 0 1 1 73.99 50',
      'M 40 50 L 60 50',
    ],
  },
  arrow: {
    viewBox: '0 0 100 100',
    paths: [
      'M 20 50 L 75 50',
      'M 60 35 L 75 50 L 60 65',
    ],
  },
  stack: {
    viewBox: '0 0 100 100',
    paths: [
      'M 18 32 L 82 32',
      'M 18 50 L 82 50',
      'M 18 68 L 62 68',
    ],
  },
  code: {
    viewBox: '0 0 100 100',
    paths: [
      'M 34 24 L 14 50 L 34 76',
      'M 66 24 L 86 50 L 66 76',
    ],
  },
  person: {
    viewBox: '0 0 100 100',
    paths: [
      'M 50 36 A 13 13 0 1 1 49.99 36',
      'M 24 80 Q 24 58 50 52 Q 76 58 76 80',
    ],
  },
  chart: {
    viewBox: '0 0 100 100',
    paths: [
      'M 16 78 L 36 52 L 56 62 L 78 24',
      'M 68 24 L 80 24 L 80 36',
    ],
  },
  grid: {
    viewBox: '0 0 100 100',
    paths: [
      'M 18 18 L 46 18 L 46 46 L 18 46 Z',
      'M 54 18 L 82 18 L 82 46 L 54 46 Z',
      'M 18 54 L 46 54 L 46 82 L 18 82 Z',
      'M 54 54 L 82 54 L 82 82 L 54 82 Z',
    ],
  },
}

function LineDrawingIcon({ type }) {
  const icon = lineIcons[type]
  if (!icon) return null
  return (
    <svg viewBox={icon.viewBox} className="h-24 w-24 overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={`line-grad-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="45%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {icon.paths.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke={`url(#line-grad-${type})`}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="1"
          className="line-draw-trace"
          style={{ strokeDasharray: 1, animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </svg>
  )
}

const lineDrawCSS = `
@keyframes line-draw-trace {
  0% { stroke-dashoffset: 1; opacity: 0.4; }
  30% { stroke-dashoffset: 0; opacity: 1; }
  70% { stroke-dashoffset: 0; opacity: 1; }
  100% { stroke-dashoffset: 1; opacity: 0.4; }
}
.line-draw-trace {
  animation: line-draw-trace 3.6s ease-in-out infinite;
  filter: drop-shadow(0 0 6px rgba(34,211,238,0.3)) drop-shadow(0 0 14px rgba(129,140,248,0.2));
}
`

/* Apple shop–style: soft shadow visible at top of card + diffuse below (matches apple.com/shop) */
const cardShadow =
  'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_2px_12px_rgba(0,0,0,0.15),0_8px_28px_-6px_rgba(0,0,0,0.2)]'
const cardShadowHover =
  'hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_18px_rgba(0,0,0,0.22),0_12px_36px_-8px_rgba(0,0,0,0.28)]'

const caseStudies = [
  {
    title: 'Agentic AI Talk',
    summary: '',
    tags: ['Live presentation', '15+ designers'],
    image: null,
    path: null,
    externalUrl: FCTG_PRESO_URL,
    preview: 'energy'
  },
  {
    title: 'Travel Insurance',
    summary: '',
    tags: ['+45% attachment', '~30s add time'],
    image: null,
    preview: 'insurance',
    path: '/stories/insurance'
  },
  {
    title: 'Travel Amendments',
    summary: '',
    tags: ['10+ min → 2–3 min', '67% faster workflow'],
    image: null,
    preview: 'amendments',
    path: '/stories/amendments'
  },
  {
    title: 'CRM Deep Linking',
    summary: '',
    tags: ['Systems design', 'Navigation strategy'],
    image: null,
    preview: 'link',
    path: '/stories/helio-deep-linking'
  },
  {
    title: 'Helio Platform',
    summary: '',
    tags: ['Fullstory analytics', 'Workflow redesign'],
    image: null,
    preview: 'grid',
    path: '/stories/helio-platform'
  },
  {
    title: 'Magento Shipping',
    summary: '',
    tags: ['Reduced escalations', 'Faster fulfilment'],
    image: null,
    preview: 'package',
    path: '/stories/magento-shipping'
  }
]

const archiveItems = [
  { title: 'Bitcoin Gift Card', image: null, preview: 'coin', path: null, summary: '', tags: [] },
  { title: 'Compono Portal', image: null, preview: 'panels', path: null, summary: '', tags: [] },
  { title: 'Shipping Partners', image: null, preview: 'connect', path: null, summary: '', tags: [] },
  { title: 'Shipping Welcome', image: null, preview: 'arrow', path: null, summary: '', tags: [] },
  { title: 'Backlog Concept', image: null, preview: 'stack', path: null, summary: '', tags: [] },
  { title: 'Developers Portal', image: null, preview: 'code', path: null, summary: '', tags: [] },
  { title: 'Shipping Personas', image: null, preview: 'person', path: null, summary: '', tags: [] },
  { title: 'Shipping Reports', image: null, preview: 'chart', path: null, summary: '', tags: [] },
  { title: 'T3 Style Guide', image: null, preview: 'grid', path: null, summary: '', tags: [] },
]

const allCards = [...caseStudies, ...archiveItems]

function Work() {
  useEffect(() => {
    document.body.classList.add('home-sky')
    return () => document.body.classList.remove('home-sky')
  }, [])

  return (
    <section className="relative z-10 flex flex-col">
      <style>{lineDrawCSS}</style>
      {/* Full viewport: title + subtitle centered — cards below the fold */}
      <div
        className="relative flex w-full flex-col justify-start overflow-hidden px-16 pt-24 pb-4 md:px-20 md:pt-32 lg:px-24"
        role="region"
        aria-labelledby="stories-heading"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <div className="flex max-w-full flex-col items-start leading-none">
            <h1 id="stories-heading" className="m-0 text-5xl font-bold tracking-wide bg-clip-text text-transparent md:text-6xl lg:text-7xl" style={{ background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Stories
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full px-16 pt-16 pb-28 md:px-20 md:pt-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="w-full text-left">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {allCards.map((card) => {
              const imageBlock = (
                  <div className="aspect-video w-full overflow-hidden">
                    {card.preview === 'energy' ? (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950 px-10">
                        <div className="w-full max-w-[360px]">
                          <FCTGEnergyPreview />
                        </div>
                      </div>
                    ) : card.preview === 'insurance' ? (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950">
                        <style>{`
                          @keyframes insurance-heart-trace { 0% { stroke-dashoffset: 1; } 28% { stroke-dashoffset: 0; } 72% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 1; } }
                          @keyframes insurance-heart-beat { 0%, 100% { transform: scale(1); } 12% { transform: scale(1.08); } 24% { transform: scale(1); } 36% { transform: scale(1.05); } 48% { transform: scale(1); } }
                          @keyframes insurance-heart-glow { 0%, 100% { filter: drop-shadow(0 0 4px rgba(34,211,238,0.4)) drop-shadow(0 0 12px rgba(129,140,248,0.25)); opacity: 0.9; } 50% { filter: drop-shadow(0 0 10px rgba(34,211,238,0.55)) drop-shadow(0 0 20px rgba(167,139,250,0.35)); opacity: 1; } }
                          .insurance-heart-beat-wrap { transform-origin: 160px 50px; animation: insurance-heart-beat 2.4s ease-in-out infinite; }
                          .insurance-home-heart { stroke-linejoin: round; stroke-linecap: round; stroke-dasharray: 1; animation: insurance-heart-trace 3.2s ease-in-out infinite, insurance-heart-glow 2.4s ease-in-out infinite; }
                        `}</style>
                        <svg viewBox="130 16 60 60" className="h-14 w-14 overflow-visible" aria-hidden>
                          <defs>
                            <linearGradient id="stories-heart-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#818cf8" />
                              <stop offset="45%" stopColor="#22d3ee" />
                              <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                          </defs>
                          <g className="insurance-heart-beat-wrap">
                            <path
                              d="M 160 68 C 144 52, 136 38, 136 30 C 136 24, 142 22, 148 26 C 152 28, 154 32, 160 38 C 166 32, 168 28, 172 26 C 178 22, 184 24, 184 30 C 184 38, 176 52, 160 68 Z"
                              fill="none"
                              stroke="url(#stories-heart-grad)"
                              strokeWidth="3"
                              pathLength="1"
                              className="insurance-home-heart"
                              style={{ strokeDasharray: 1 }}
                            />
                          </g>
                        </svg>
                      </div>
                    ) : card.preview === 'amendments' ? (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950">
                        <AmendmentsPreview />
                      </div>
                    ) : card.matrixPreview ? (
                      <div className="relative h-full w-full bg-[#030b0f]">
                        <MatrixRain className="absolute inset-0 h-full w-full" opacity={0.85} />
                        <div
                          className="pointer-events-none absolute inset-0 bg-black/70"
                          aria-hidden
                        />
                      </div>
                    ) : card.preview === 'placeholder' ? (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950">
                        <div className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                          Coming soon
                        </div>
                      </div>
                    ) : lineIcons[card.preview] ? (
                      <div className="flex h-full w-full items-center justify-center bg-slate-950">
                        <LineDrawingIcon type={card.preview} />
                      </div>
                    ) : card.image ? (
                      <img
                        src={card.image}
                        alt={card.title}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : null}
                  </div>
              )
              const isEnergy = card.preview === 'energy'
              const textBlock = (
                  <div className="flex flex-col items-center px-8 pt-8 pb-4 text-center">
                    <h3 className="text-2xl font-semibold tracking-wider text-white md:text-3xl">{card.title}</h3>
                    {card.summary && (
                      <p
                        className={`mt-3 text-base font-medium tracking-wide text-slate-400 ${
                          card.path === '/stories/insurance' ? 'whitespace-nowrap' : 'whitespace-pre-line'
                        }`}
                      >
                        {card.summary}
                      </p>
                    )}
                  </div>
              )
              const content = <>{textBlock}{imageBlock}</>

              const articleCls = `group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-800/60 bg-slate-950 transition duration-300 ease-out hover:-translate-y-0.5 ${cardShadow} ${cardShadowHover}`

              if (card.externalUrl) {
                return (
                  <a
                    key={card.title}
                    href={card.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <article className={articleCls}>
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
                    <article className={articleCls}>
                      {content}
                    </article>
                  </Link>
                )
              }

              return (
                <article
                  key={card.title}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-800/60 bg-slate-950 transition duration-300 ease-out ${cardShadow}`}
                >
                  {content}
                </article>
              )
            })}
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default Work

