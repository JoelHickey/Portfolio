import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const cardShadow =
  'shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_2px_12px_rgba(0,0,0,0.15),0_8px_28px_-6px_rgba(0,0,0,0.2)]'
const cardShadowHover =
  'hover:shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_4px_18px_rgba(0,0,0,0.22),0_12px_36px_-8px_rgba(0,0,0,0.28)]'

const caseStudies = [
  {
    title: 'AI & Design',
    summary: 'Presented a live talk showing Flight Centre\u2019s design team how AI tools can speed up their work.',
    path: '/stories/fctg-ai-talk'
  },
  {
    title: 'Insurance',
    summary: 'Redesigned travel insurance buying experience \u2014 +45% more customers added cover.',
    path: '/stories/insurance'
  },
  {
    title: 'Amendments',
    summary: 'Simplified post-booking changes \u2014 75% faster for staff, 67% fewer steps.',
    path: '/stories/amendments'
  },
  {
    title: 'CRM Deep Linking',
    summary: 'Made it one click to find a customer\u2019s booking \u2014 3,000+ staff use it daily.',
    path: '/stories/helio-deep-linking'
  },
  {
    title: 'Helio Platform',
    summary: '3,000+ daily users \u2014 improving the tools travel staff rely on every day.',
    path: '/stories/helio-platform'
  },
  {
    title: 'Magento Shipping',
    summary: 'Designed a faster way for online shops to send out large batches of orders.',
    path: '/stories/magento-shipping'
  }
]

function Work() {
  useEffect(() => {
    document.title = 'Stories \u2014 Joel Hickey'
    document.body.classList.add('home-sky')
    return () => document.body.classList.remove('home-sky')
  }, [])

  return (
    <section className="relative z-10 flex flex-col" aria-labelledby="stories-heading">
      <div
        className="relative flex w-full flex-col justify-start overflow-hidden px-6 pt-24 pb-4 sm:px-12 md:px-20 md:pt-32 lg:px-24"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <div className="flex max-w-full flex-col items-start leading-none">
            <h1 id="stories-heading" className="m-0 text-5xl font-bold tracking-wide bg-clip-text text-transparent md:text-6xl lg:text-7xl" style={{ background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #6366f1 50%, #7c3aed 75%, #c026d3 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              Stories
            </h1>
            <p className="mt-4 text-base font-extralight tracking-wider text-white md:text-lg">
              Finding the real problem, designing the solution, and proving it worked.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full px-6 pt-16 pb-28 sm:px-12 md:px-20 md:pt-20 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 list-none m-0 p-0">
            {caseStudies.map((card) => (
              <li key={card.title}>
                <Link
                  to={card.path}
                  aria-label={`View story: ${card.title}`}
                  className="block h-full rounded-home-card outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <article className={`group relative flex h-full flex-col overflow-hidden rounded-home-card border border-white/10 bg-slate-950 transition duration-300 ease-out hover:-translate-y-0.5 ${cardShadow} ${cardShadowHover}`}>
                    <div className="flex flex-col items-start px-8 py-8 text-left">
                      <h2 className="text-2xl font-medium tracking-wider text-white md:text-3xl">{card.title}</h2>
                      {card.summary && (
                        <p className="mt-3 text-base font-extralight tracking-wide text-slate-200">
                          {card.summary}
                        </p>
                      )}
                    </div>
                  </article>
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-12 text-center text-sm text-slate-500">
            Also designed for Compono, Temando, and others.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Work
