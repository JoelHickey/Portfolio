import { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Insurance() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const discoveryActivities = [
    {
      title: 'Remote usability testing',
      description: 'Remote moderated usability testing with consultants and advisors to validate the end-to-end flow.',
      artifact: { src: '/images/insurance/image1.png', alt: 'Usability testing session notes' }
    },
    {
      title: 'Usability goal',
      description: 'Focused on the consultant insurance experience and key friction points in quoting and conversion.',
      artifact: { src: '/images/insurance/image2.png', alt: 'Usability goal artifact' }
    },
    {
      title: 'Participants',
      description: '5 participants across brands (3 AU travel consultants + 2 AU travel advisors).',
      artifact: { src: '/images/insurance/image3.png', alt: 'Participant summary artifact' }
    },
    {
      title: 'Quote task',
      description: 'Task-based testing for adding an insurance quote directly into HELiO bookings.',
      artifact: { src: '/images/insurance/image4.png', alt: 'Quote task artifact' }
    },
    {
      title: 'Policy task',
      description: 'Validated conversion from quote to policy without leaving the booking workflow.',
      artifact: { src: '/images/insurance/image5.png', alt: 'Policy conversion artifact' }
    },
    {
      title: 'Insights synthesis',
      description: 'Captured usability gains and click reduction outcomes from the pilot.',
      artifact: { src: '/images/insurance/image6.png', alt: 'Insights synthesis artifact' }
    }
  ]

  const keyFindings = [
    { title: 'Separate system', detail: 'Insurance quoting lived in a different platform with re-login required', icon: '🔀' },
    { title: 'Manual calculations', detail: 'Consultants calculated premiums manually based on trip details', icon: '🧮' },
    { title: 'Duplicate data entry', detail: 'Customer details were entered twice across platforms', icon: '📋' },
    { title: 'Lengthy process', detail: '5-8 minutes to add insurance to a booking', icon: '⏱️' },
    { title: 'Low attachment rates', detail: 'Complexity discouraged consultants from offering coverage', icon: '📉' },
    { title: 'Lost revenue', detail: 'Missed insurance opportunities on 60% of eligible bookings', icon: '💸' }
  ]

  const conceptBullets = [
    'Integrated quoting — Insurance options displayed within the booking screen',
    'Auto-calculated premiums — Real-time pricing based on trip details',
    'Smart recommendations — Suggested coverage tiers aligned to traveler profiles',
    'One-click add — Add insurance to booking in a single step',
    'Pre-populated forms — Customer details auto-filled from booking data'
  ]

  const workflowMetrics = [
    { label: 'Context switching', value: '100%', note: '2 systems → 1' },
    { label: 'Process time', value: '90%', note: '5-8m → 30s' },
    { label: 'User actions', value: '233%', note: '28-36 → 16 clicks' }
  ]

  const postReleaseMetrics = [
    { label: 'Attachment rate', value: '+45%', note: 'increase in insurance attachment after launch' },
    { label: 'Time to add insurance', value: '30s', note: 'average time to add coverage (down from 5-8 minutes)' },
    { label: 'Revenue lift', value: '$2.4M', note: 'additional annual revenue from improved attachment' },
    { label: 'Compliance risk', value: '↓ lower', note: 'consistent insurance offering and audit-ready records' }
  ]

  return (
    <section className="flex flex-col">
      <div className="flex min-h-[calc(100vh-64px)] w-full items-start justify-center bg-white pb-28 -mt-12">
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="full-bleed mb-0">
            <div className="relative w-full h-[600px] overflow-hidden bg-slate-200">
              <img
                src="/portfolio-slideshow/compono.png"
                alt="Booking and insurance flow"
                className="h-full w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
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
                  <p className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                    The fact that I don&apos;t have to do 27 clicks to load this into the quote is a win.
                  </p>
                  <p className="mt-3 text-sm text-white/90">— Travel consultant, usability testing</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden pt-20">
            <h1 className="text-6xl font-semibold text-slate-900 md:text-7xl">
              Travel insurance integration
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-600 leading-relaxed md:text-lg">
              Pilot project for a new booking platform. We integrated travel insurance directly into the booking flow to streamline quoting
              and lift attachment rates.
            </p>
            <div className="mt-8">
              <Link
                to="/stories/insurance/demo"
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
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">+45%</p>
              <p className="mt-2 text-base font-medium text-slate-500">Attachment rate</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">90%</p>
              <p className="mt-2 text-base font-medium text-slate-500">Time saved</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-6xl">$2.4M</p>
              <p className="mt-2 text-base font-medium text-slate-500">Annual revenue</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 mb-10">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Objective & Key Result</p>
            <p className="mt-2 text-slate-700 leading-relaxed">
              Streamline insurance quoting and increase attachment rates through an integrated workflow.
            </p>
          </div>
          <blockquote className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 italic">
            &ldquo;The fact that I don&apos;t have to do 27 clicks to load this into the quote is a win. This would make a lot of people in retail very happy!&rdquo;
            <footer className="mt-3 not-italic text-sm font-medium text-slate-500">— Travel consultant, usability testing</footer>
          </blockquote>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Discovery</h2>
          <h3 className="text-xl font-semibold text-slate-800 -mt-10 mb-4">Research</h3>
          <ul className="space-y-2 text-slate-600 mb-8">
            {discoveryActivities.map((activity) => (
              <li key={activity.title} className="flex gap-3 leading-relaxed">
                <span className="text-slate-400 shrink-0">—</span>
                <span>{activity.description}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {discoveryActivities.map((activity) => (
              <div
                key={activity.title}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={activity.artifact.src}
                  alt={activity.artifact.alt}
                  className="h-32 w-full object-cover"
                />
                <div className="px-4 py-3">
                  <p className="text-sm font-semibold text-slate-800">{activity.title}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-16 mb-4">Findings</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {keyFindings.map((finding) => (
              <div
                key={finding.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex gap-3 items-start">
                  <span className="text-lg shrink-0" aria-hidden>{finding.icon}</span>
                  <div>
                    <p className="font-semibold text-slate-900">{finding.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{finding.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-16 mb-4">Problem definition</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed">
            How might we embed insurance quoting into the booking workflow so consultants can add coverage in under a minute, without
            context switching or manual calculations?
          </p>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Ideation</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Exploring inline vs modal and data dependencies with the insurance API team.
          </p>
          <ul className="space-y-3 text-slate-600 max-w-2xl">
            <li className="flex gap-3 leading-relaxed">
              <span className="text-slate-400 shrink-0">—</span>
              <span>Explored inline quote panels versus modal handoffs to keep consultants in the booking context.</span>
            </li>
            <li className="flex gap-3 leading-relaxed">
              <span className="text-slate-400 shrink-0">—</span>
              <span>Mapped data dependencies to pre-fill customer details and reduce re-entry effort.</span>
            </li>
            <li className="flex gap-3 leading-relaxed">
              <span className="text-slate-400 shrink-0">—</span>
              <span>Partnered with the insurance API team to validate real-time pricing and policy conversion steps.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Concept development</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            Integrated quoting and one-click add — the direction we chose.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 max-w-2xl">
            {conceptBullets.map((bullet) => (
              <li key={bullet} className="flex gap-3 leading-relaxed">
                <span className="text-slate-400 shrink-0">—</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            <strong>Result:</strong> Reduced insurance addition time from 5–8 minutes to 30 seconds while lifting attachment rates by 45%.
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Prototyping</h2>
          <h3 className="text-xl font-semibold text-slate-800 -mt-10 mb-4">Wireframes</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed mb-2">
            Early layout iterations focused on keeping quoting, pricing, and policy conversion in a single continuous flow.
          </p>
          <p className="text-sm text-slate-500 mb-8">Wireframe artifacts available on request.</p>

          <h3 className="text-xl font-semibold text-slate-800 mb-2">Hi-fidelity prototypes</h3>
          <p className="text-sm text-slate-500 mb-10">High-fidelity prototypes available on request.</p>

          <h3 className="text-xl font-semibold text-slate-800 mb-4">Usability testing</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed mb-4">
            Moderated usability testing with 5 consultants/advisors validated the integrated insurance experience.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 mb-6">
            <li className="flex gap-3"><span className="font-semibold text-slate-800 min-w-40 shrink-0">Methodology</span> <span>Remote moderated usability testing</span></li>
            <li className="flex gap-3"><span className="font-semibold text-slate-800 min-w-40 shrink-0">Key tasks</span> <span>Add insurance quote to HELiO booking, convert quote to policy</span></li>
            <li className="flex gap-3"><span className="font-semibold text-slate-800 min-w-40 shrink-0">Participants</span> <span>3 AU travel consultants + 2 AU travel advisors</span></li>
          </ul>
          <div className="grid gap-4 sm:grid-cols-2 mb-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3">
              <p className="text-2xl font-semibold text-emerald-800">58%</p>
              <p className="text-xs font-medium text-emerald-800">Improved usability score (UMUX 27% → 90%)</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3">
              <p className="text-2xl font-semibold text-sky-800">233%</p>
              <p className="text-xs font-medium text-sky-800">Reduction in clicks (28–36 → 16)</p>
            </div>
          </div>
          <blockquote className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 italic">
            &ldquo;100% I would use the insurance flow. I think it&apos;s a very good addition and it will increase our productivity and sales.&rdquo;
            <footer className="mt-3 not-italic text-sm font-medium text-slate-500">— Travel Associates advisor, usability testing</footer>
          </blockquote>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Development</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            In-house delivery, API integration, and training with the EA insurance API team.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 max-w-2xl">
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">In-house delivery</span> <span>Led the internal agile team to build the integration</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">API integration</span> <span>Worked with EA&apos;s API team to enable real-time quoting and conversion</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">Training rollout</span> <span>Created materials and ran training for consultants</span></li>
          </ul>

          <h3 className="text-xl font-semibold text-slate-900 mt-12 mb-4">Quality assurance</h3>
          <ul className="space-y-2 text-sm text-slate-600 max-w-2xl">
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">Compliance validation</span> <span>Ensured regulatory requirements were met across markets</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">Pilot testing</span> <span>Controlled pilot with select consultants to validate usability and stability</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="font-semibold text-slate-800 shrink-0">Performance monitoring</span> <span>Tracked attachment rates and system stability post-launch</span></li>
          </ul>
          <div className="mt-6 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
            <strong>Launch readiness:</strong> Pilot stability confirmed | Compliance checks passed | Training completion above 95%
          </div>

          <h3 className="text-xl font-semibold text-slate-900 mt-12 mb-4">Delivery</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed mb-4">
            Integrating insurance into the booking platform required close coordination with external partners and internal stakeholders.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 max-w-2xl">
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>In-house development</strong> — Led the internal agile team</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>Platform pilot</strong> — Used as a pilot project for the new booking platform</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>API integration</strong> — Partnered with EA insurance API team</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>Compliance validation</strong> — Ensured regulatory requirements across markets</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>Pilot testing</strong> — Controlled pilot with select consultants</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>Training rollout</strong> — Training materials and sessions for consultants</span></li>
            <li className="flex gap-3 leading-relaxed"><span className="text-slate-400 shrink-0">—</span> <span><strong>Performance monitoring</strong> — Tracked attachment rates and stability post-launch</span></li>
          </ul>
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            ✓ <strong>Launched successfully in July 2024</strong> — Seamless integration with immediate revenue impact
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Rollout</h2>
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed -mt-10 mb-10">
            <strong>July 2024 launch</strong> — Rolled out from pilot consultants to broader teams with ongoing monitoring.
          </p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Workflow efficiency measurements</h3>
          <p className="text-sm text-slate-500 mb-4">Technical breakdown of workflow improvements between old and new flows</p>
          <div className="grid gap-4 sm:grid-cols-3 mb-8">
            {workflowMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-600">{metric.note}</p>
              </div>
            ))}
          </div>
          <p className="text-sm italic text-slate-500 mb-8">Try the interactive demo to experience both workflows</p>

          <h3 className="text-xl font-semibold text-slate-900 mb-4">Post-release validation</h3>
          <p className="text-sm text-slate-500 mb-4">Business impact and adoption signals tracked after rollout</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
            {postReleaseMetrics.map((metric) => (
              <div key={metric.label} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{metric.value}</p>
                <p className="mt-1 text-xs text-slate-600">{metric.note}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sm text-sky-900">
            <strong>Business impact:</strong> Improved consultant efficiency, stronger compliance posture, and new revenue unlocked in the first quarter post-launch.
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-6xl font-semibold text-slate-900 pb-16">Reflection</h2>
          <h3 className="text-xl font-semibold text-slate-800 -mt-10 mb-4">Challenges & learnings</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed mb-6">
            Building the pilot surfaced a few key learnings that shaped subsequent phases:
          </p>
          <div className="grid gap-8 lg:grid-cols-2 max-w-4xl">
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-800 mb-3">Key challenges</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="border-l-2 border-amber-300 pl-4"><strong>Regulatory complexity:</strong> Coverage rules varied by market, requiring additional validation logic</li>
                <li className="border-l-2 border-amber-300 pl-4"><strong>API dependencies:</strong> Tight coupling with partner APIs required careful staging and fallback handling</li>
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800 mb-3">What I learned</p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li className="border-l-2 border-emerald-400 pl-4"><strong>Align with compliance early:</strong> Early validation reduced rework and approval cycles</li>
                <li className="border-l-2 border-emerald-400 pl-4"><strong>Prototype with real data:</strong> Real booking scenarios revealed edge cases faster than mock data</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-slate-800 mt-12 mb-4">Dream vs reality</h3>
          <p className="max-w-2xl text-slate-600 leading-relaxed mb-4">
            The ideal vision was a fully personalized coverage assistant that recommended the right plan automatically. We shipped the highest-impact,
            feasible version for the pilot timeline.
          </p>
          <ul className="space-y-2 text-sm text-slate-600 max-w-2xl mb-6">
            <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span> Instant coverage recommendations based on trip, traveler, and policy rules</li>
            <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span> Auto-approval for low-risk policies to reduce consultant workload</li>
            <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span> Real-time compliance checks across markets</li>
            <li className="flex gap-3"><span className="text-slate-400 shrink-0">—</span> One-step policy conversion with no extra data entry</li>
          </ul>
          <div className="rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-900 max-w-2xl">
            <p className="font-semibold mb-2">Why we phased the dream:</p>
            <ul className="space-y-1 text-slate-700">
              <li><strong>Regulatory constraints:</strong> Requirements varied across markets and insurers</li>
              <li><strong>API maturity:</strong> Real-time pricing endpoints required staged rollout</li>
              <li><strong>Pilot timeline:</strong> Delivered the integrated flow first to prove impact and adoption</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Insurance
