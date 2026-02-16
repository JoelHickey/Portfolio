import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Amendments() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const discoveryActivities = [
    {
      title: 'Global workshops',
      description:
        'Co-led interactive workshops with 60+ consultants and stakeholders across all brands globally to ensure complete coverage.',
      image: '/images/amendments/image1.png'
    },
    {
      title: 'Problem discovery workshop',
      description: 'Captured pain points and context during the problem discovery session.',
      image: '/images/amendments/Problem discovery.png'
    },
    {
      title: 'Voting on pain points',
      description: 'Mapped manual amendment steps across product verticals.',
      image: '/images/amendments/image3.png'
    },
    {
      title: 'Matrix analysis',
      description:
        'Prioritized amendment types by frequency versus friction, with stakeholder voting to align on the biggest productivity wins.',
      image: '/images/amendments/matrix.png'
    },
    {
      title: 'Competitive analysis',
      description: 'Benchmarked amendment flows across key competitors.'
    },
    {
      title: 'Risk assessment',
      description: 'Assessed technical and financial impacts and risks.'
    }
  ]

  const keyFindings = [
    { big: '13+', subtext: 'clicks with hidden dependency impacts' },
    { big: '0%', subtext: 'automation — manual data entry caused booking errors' },
    { big: '9', subtext: 'screens for amendment flows' },
    { big: '30s', subtext: 'load time reduced consultant confidence' },
    { big: '10+ min', subtext: 'hold times frustrated customers' },
    { big: '100%', subtext: 'core fixes blocked by legacy platform' }
  ]

  const ideationBullets = [
    'Design studio workshops and Crazy 8s with internal and external stakeholders produced rapid sketches and 50+ reframes to explore breadth.',
    'Competitive reviews and technology exploration benchmarked flows and assessed AI, automation, and real-time integration feasibility.'
  ]

  const concepts = [
    { name: 'AI-powered conversational interface', description: 'Natural language amendment requests.', outcome: 'Not supported by underlying technology', selected: false },
    { name: 'Single-page unified workflow', description: 'All amendment logic on one screen.', outcome: 'Too complex with underlying technology', selected: false },
    { name: 'Three-page guided workflow', description: 'Step-by-step validation with dependency checking.', outcome: 'Selected approach', selected: true },
    { name: 'Inline flow', description: 'Changes made directly within the booking view.', outcome: 'Cluttered interface, unclear validation states', selected: false },
    { name: 'Modal flow', description: 'All changes available in one modal per amendment.', outcome: 'Disrupted context, frustrated users', selected: false },
    { name: 'Codegen-led solutions', description: 'Technical and financial impacts assessed.', outcome: 'Not used — UX unsatisfactory', selected: false }
  ]

  const usabilityMethods = [
    { method: 'Task-based testing', detail: '15 common amendment scenarios tested with 24 consultants' },
    { method: 'Think-aloud protocols', detail: 'Identified confusion points and mental model mismatches' },
    { method: 'A/B testing', detail: 'Compared new workflow against legacy system for time and accuracy' },
    { method: 'Edge case validation', detail: 'Tested complex multi-component amendments (e.g., date change + hotel swap)' },
    { method: 'Accessibility audit', detail: 'Keyboard navigation, screen reader compatibility, color contrast' }
  ]

  const usabilityResults = [
    { value: '97%', label: 'Task success rate' },
    { value: '89%', label: 'CSAT' },
    { value: '8–12 min → 2–3 min', label: 'Average time' }
  ]

  const developmentBullets = [
    'Design handoff — detailed specs for Codegen with flowcharts and annotated prototypes to reduce ambiguity.',
    'Delivery cycles — 3-month cycles with planned checkpoints across the 5.5-hour time gap.',
    'Real-time collaboration — continuous UI/UX alignment and fast adjustments during build.'
  ]

  const qaBullets = [
    'Comprehensive testing — real-world scenarios validated through UAT.',
    'Data validation — edge cases like past dates, sold-out inventory, and concurrent bookings.',
    'UAT with consultants — 2-week pilot with 50 consultants.',
    'Regression testing — existing booking flows stayed stable.',
    'Iteration — fixes tested and patched as needed.'
  ]

  const deliveryBullets = [
    'Global partnership — Codegen delivered within HELiO.',
    'Cross-functional delivery — engineering, design, ops, and training across time zones.',
    'Pilots first — validate with select markets before global rollout.',
    'Training — materials and sessions for 60+ consultants.',
    'Change management — support docs and feedback loops.',
    'Feature toggles — enable/disable releases safely.',
    'Success tracking — adoption and efficiency monitoring.'
  ]

  const workflowMetrics = [
    { label: 'Screens', value: '67%', detail: '9 → 3 screens' },
    { label: 'Loading time', value: '69%', detail: '30s → 9s' },
    { label: 'User actions', value: '55%', detail: '18+ → 8–10 clicks' }
  ]

  const postReleaseMetrics = [
    { label: 'Adoption rate', value: '94%', detail: 'active within 30 days' },
    { label: 'Task completion', value: '97%', detail: 'error-free amendments' },
    { label: 'Avg session time', value: '2.4m', detail: 'down from 10.2m' },
    { label: 'Rage clicks', value: '-82%', detail: 'reduction in frustrated interactions' }
  ]

  const challengeBullets = [
    'Limited domain context — engineers lacked direct exposure to consultant workflows.',
    'Bulk amendments out of scope — group/corporate flows weren’t covered initially.',
    'Stakeholder pushback — UX improvements conflicted with delivery effort.',
    'Decision noise — too many stakeholders and unclear ownership slowed progress.',
    'Async gaps — 12+ hour feedback loops delayed decisions.',
    'Context loss — edge cases didn’t transfer well through docs alone.',
    'Long cycles — 3‑month delivery limited iteration during build.',
    'Quality trade‑offs — timelines constrained UX refinement.',
    'Testing limits — limited production‑like environments slowed validation.'
  ]

  const learningBullets = [
    'Kick‑off alignment — early workshops prevented months of rework.',
    'Visual specs win — flowcharts and annotated screenshots cut back‑and‑forth by 60%.',
    'Video walkthroughs — short Looms beat long documents.',
    'Overlap windows — small time‑shift enabled real‑time decisions.',
    'Reliability builds trust — consistent cadence reduced uncertainty.',
    'Embrace constraints — limits led to simpler, maintainable solutions.'
  ]

  const dreamBullets = [
    'Interpret intent and recommend best options',
    'Validate dependencies across flights, hotels, transfers, and activities',
    'Show live pricing and availability',
    'Auto-check business rules and compliance',
    'Complete the amendment in one conversational flow'
  ]

  const dreamConstraints = [
    'Technical constraints — legacy systems couldn’t aggregate real-time inventory across GDS providers.',
    'Data silos — hotel, car, and activity inventory had no unified API.',
    'AI limitations — NLP wasn’t production-ready for complex bookings.',
    'Business risk — commission/SLA requirements needed human validation.',
    'Timeline pressure — consultants needed relief now, not a multi‑year build.'
  ]

  return (
    <section className="flex flex-col">
      <div className="flex min-h-[calc(100vh-64px)] w-full items-start justify-center bg-white pb-28 -mt-12">
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="full-bleed mb-0">
            <div className="relative w-full h-[600px] overflow-hidden bg-slate-200">
              <img
                src="/images/amendments/traveltourism-1.jpg"
                alt="Travel consultant and client with passports and boarding passes"
                className="h-full w-full object-cover object-left"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/80"
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
                  <p className="text-lg font-medium leading-snug whitespace-nowrap sm:text-xl md:text-2xl">
                    My whole shift became minutes. That&apos;s time I have for my customers now.
                  </p>
                  <p className="mt-3 text-sm text-white/90">— Sarah Mitchell, Senior Travel Consultant, Melbourne</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden pt-20">
            <h1 className="text-6xl font-semibold text-slate-900 md:text-7xl">
              Streamlining Amendments
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-600 leading-relaxed md:text-lg">
              How might we help travel consultants complete amendments quickly and accurately with dependency checks, without
              jumping between systems? A guided workflow that cut handling time and boosted confidence.
            </p>
            <div className="mt-8">
              <Link
                to="/portfolio/amendments/demo"
                className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Try interactive demo →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">+67%</p>
              <p className="mt-2 text-base font-medium text-slate-500">Efficiency</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">89%</p>
              <p className="mt-2 text-base font-medium text-slate-500">Satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">-70%</p>
              <p className="mt-2 text-base font-medium text-slate-500">Handling time</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Discovery</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            How we understood the problem with stakeholders and evidence.
          </p>
          <div className="space-y-10">
          <div className="space-y-4">
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-600">
              {discoveryActivities.map((activity) => (
                <li
                  key={activity.title}
                  className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                >
                  {activity.image && (
                    <img
                      src={activity.image}
                      alt=""
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                    <p className="mt-1 text-xs text-slate-600">{activity.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 pt-12 pb-12">
            <h3 className="text-xl font-semibold text-slate-700">Key findings</h3>
            <div className="flex flex-wrap justify-between gap-x-10 gap-y-10 sm:grid sm:grid-cols-2 lg:grid-cols-3">
              {keyFindings.map((item) => (
                <div key={`${item.big}-${item.subtext}`}>
                  <p className="text-3xl font-semibold text-slate-900 md:text-4xl">{item.big}</p>
                  <p className="mt-2 text-sm font-medium text-slate-500">{item.subtext}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Ideation</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Exploring breadth through workshops and competitive review before we narrowed the direction.
          </p>
          <div className="space-y-8 max-w-3xl">
            <p className="text-lg text-slate-600 leading-relaxed">
              Design studio workshops and Crazy 8s with internal and external stakeholders produced rapid sketches and 50+ reframes to explore breadth.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Competitive reviews and technology exploration benchmarked flows and assessed AI, automation, and real-time integration feasibility.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Concept development</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Six directions we explored; one we chose.
          </p>
          <div className="space-y-6">
            <ul className="space-y-3 text-sm">
              {concepts.filter((c) => !c.selected).map((concept) => (
                <li
                  key={concept.name}
                  className="border-l-2 border-slate-200 pl-4 py-2.5 pr-3 rounded-r-lg"
                >
                  <div className="flex flex-wrap items-baseline gap-2">
                    <span className="font-semibold text-slate-900">{concept.name}</span>
                    <span className="text-slate-600">— {concept.description}</span>
                  </div>
                  <span className="inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {concept.outcome}
                  </span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              ✓ <span className="font-semibold">Three-page guided workflow</span> — Step-by-step validation with dependency checking.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Prototyping</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Wireframes and hi-fidelity prototypes to test the chosen workflow.
          </p>
          <div className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 text-sm text-slate-600">
            {[
              { src: '/images/amendments/amendment-wireframes-r16.png', alt: 'Amendment wireframes' },
              { src: '/images/amendments/amendment-wiresframes2.png', alt: 'Amendment wireframes 2' },
              { src: '/images/amendments/amendments-hifi.png', alt: 'Hi-fidelity prototypes' }
            ].map((image) => (
              <div
                key={image.src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <img src={image.src} alt={image.alt} className="h-40 w-full object-cover" />
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Usability testing</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Validating the workflow with consultants before build.
          </p>
          <div className="space-y-10">
            <div>
              <ul className="space-y-2 text-sm text-slate-600">
                {usabilityMethods.map((item) => (
                  <li key={item.method} className="flex gap-3 leading-relaxed">
                    <span className="font-semibold text-slate-800 shrink-0 min-w-[10rem]">{item.method}</span>
                    <span>{item.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm max-w-2xl">
              <img
                src="/images/amendments/amendments-proto-testing.png"
                alt="Prototype testing"
                className="h-48 w-full object-cover"
              />
              <div className="px-4 py-3">
                <p className="text-sm font-semibold text-slate-800">Prototype testing</p>
              </div>
            </div>

            <div>
              <div className="grid gap-4 sm:grid-cols-3">
                {usabilityResults.map((stat) => (
                  <div key={stat.label} className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3">
                    <p className="text-2xl font-semibold text-emerald-900">{stat.value}</p>
                    <p className="text-xs font-medium text-emerald-800">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <blockquote className="border-l-4 border-slate-300 pl-5 py-1 text-lg italic text-slate-700">
              “If this works the way it looks, amendments will take minutes, dependencies will be clear, and the risk of missed changes drops.”
              <footer className="mt-3 not-italic text-sm font-medium text-slate-600">— Alex Carter, Senior Consultant, Sydney</footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div className="space-y-12">
            <div>
              <h2 className="text-6xl font-semibold text-slate-900 pb-16">Development</h2>
              <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
                Handoff, build, and delivery with Codegen across time zones.
              </p>
              <div className="space-y-4">
            <ul className="space-y-2 text-sm text-slate-600">
              {developmentBullets.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Quality assurance</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              {qaBullets.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900">
              <span className="font-semibold">Launch readiness:</span> Zero critical bugs, 94% UAT approval,
              benchmarks exceeded.
            </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Delivery</h3>
            <p className="max-w-2xl text-slate-600 leading-relaxed">
              Coordinated teams and regions while keeping consultants productive during the transition:
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              {deliveryBullets.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              ✓ <span className="font-semibold">On‑time, zero downtime</span> — transitioned without disrupting daily
              operations.
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Rollout</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Progressive launch, metrics, and post-release validation.
          </p>
          <div className="space-y-6">
          <p className="max-w-2xl text-slate-600 leading-relaxed">
            Progressive rollout — shipped high‑impact verticals first, then expanded in later releases from Australia
            to global.
          </p>
          <h3 className="text-xl font-semibold text-slate-900">Workflow efficiency measurements</h3>
          <div className="grid gap-6 md:grid-cols-3">
            {workflowMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900 md:text-5xl">{metric.value}</p>
                <p className="mt-1 text-xs text-emerald-600">↓ fewer / faster</p>
                <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
              </div>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-slate-900">Post‑release validation</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed">FullStory used to validate real‑world impact post‑launch.</p>
          <div className="grid gap-6 md:grid-cols-2">
            {postReleaseMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                <p className="mt-2 text-4xl font-semibold text-slate-900 md:text-5xl">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
            <span className="font-semibold">FullStory insights:</span> Amendments completed 76% faster; error‑related
            tickets down 88% in the first quarter.
          </div>
          <p className="text-sm italic text-slate-500">
            Business impact available on request — ROI, labor savings, and revenue attribution.
          </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div>
            <h2 className="text-6xl font-semibold text-slate-900 pb-16">Reflection</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Challenges, learnings, and what we'd do differently.
          </p>
          <div className="space-y-6">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">Challenges & learnings</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {challengeBullets.map((item) => (
                  <li key={item} className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900">What I learned</h3>
              <ul className="space-y-2 text-sm text-slate-600">
                {learningBullets.map((item) => (
                  <li key={item} className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">Dream vs reality</h3>
            <p className="max-w-2xl text-slate-600 leading-relaxed">
              The ideal solution was an AI “Dream Flow” where consultants describe the change in plain language and the
              system handles the rest.
            </p>
            <ul className="grid gap-2 text-sm text-slate-600 md:grid-cols-2">
              {dreamBullets.map((item) => (
                <li key={item} className="flex gap-3 leading-relaxed">
                  <span className="text-slate-400 shrink-0">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              <p className="font-semibold">Why we couldn’t build this (2019–2020):</p>
              <ul className="mt-2 space-y-1">
                {dreamConstraints.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <p className="text-sm italic text-slate-500">
              We delivered a practical three‑page workflow with 75% time savings. The Dream Flow later became the 2024
              demo showing what’s now possible.
            </p>
          </div>
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default Amendments
