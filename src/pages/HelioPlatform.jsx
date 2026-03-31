import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

function HelioPlatform() {
  useEffect(() => {
    document.title = 'Helio Platform Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Helio Platform case study">
      <CaseStudyNav sections={[
        { id: 'hp-problem', label: 'Problem' },
        { id: 'hp-tours', label: 'Tours' },
        { id: 'hp-payments', label: 'Payments' },
        { id: 'hp-grab', label: 'Grab PNR' },
        { id: 'hp-reflection', label: 'Reflection' },
      ]} />

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-950">
          <img
            src="/images/helio-platform-hero.png"
            alt="Laptop displaying a dark-themed platform dashboard"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-0 pt-20">
            <div className="mx-auto w-full max-w-6xl px-6">
              <Link
                to="/stories"
                className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/45 hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to Stories
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-12 sm:pb-16">
            <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
              <h1 className="text-4xl font-bold tracking-wide leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                The platform behind the counter.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Designing within and around a vendor-managed booking platform used by 3,000+ travel consultants daily.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slim metadata bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">Senior UX/UI Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Domain</p>
              <p className="mt-0.5 font-medium text-slate-700">B2B travel — internal consultant platform</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">PM, UX, Codegen dev, platform architects</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">Ongoing, 2023–present</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key context */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">3,000+</p>
              <p className="mt-2 text-sm text-slate-500">Consultants using Helio daily</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">3</p>
              <p className="mt-2 text-sm text-slate-500">Features shipped within vendor constraints</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">Vendor</p>
              <p className="mt-2 text-sm text-slate-500">Managed front-end (Codegen / Travelbox)</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div id="hp-problem" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Helio is the primary booking platform for Flight Centre and Travel Associates consultants. Built on Codegen's Travelbox engine, it handles search, quoting, booking management, amendments, and servicing. The front-end is vendor-managed — meaning the UX team can influence but not directly control the interface.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-2xl italic text-slate-800 md:text-3xl leading-snug">
              "We can't just redesign Helio. But we can redesign how people experience it."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Internal UX strategy framing</footer>
          </blockquote>

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            My role: improve the consultant experience within these constraints — through feature design, workflow optimisation, usability testing, and analytics-driven validation. This case study covers three examples: validating a Tours Search & Book POC with Fullstory, redesigning payment schedule controls, and fixing the Grab PNR import flow.
          </p>

          {/* Design approach */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Approach within a constrained platform</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="sm:border-r border-b border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">What we can do</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Configure workflows', 'Design within existing patterns', 'Build adjacent platforms', 'Run analytics & usability testing'].map((item) => (
                    <span key={item} className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">What we can't</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Rewrite the front-end', 'Ship custom UI components', 'Control release cadence', 'Bypass vendor architecture'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>

              <div className="sm:border-r border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">The lever</p>
                <p className="text-sm text-slate-500">Use data, research, and testing to make smarter configuration decisions — and prove the case for deeper changes with evidence.</p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">The strategy</p>
                <p className="text-sm text-slate-500">Build what we can in-house (Travel Connect), validate everything with real usage data, and design the path from legacy to modern.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          TOURS SEARCH & BOOK
          ════════════════════════════════════════════════════════════════ */}

      <div id="hp-tours" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Tours Search & Book</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Using Fullstory to validate a proof of concept — and uncover exactly where the funnel broke down.
          </p>

          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Codegen started development on Tours Search & Book in 2020, but it never progressed past initial builds. Without it, consultants used two workarounds — Tours Grab (manual data entry) or Manual Product Items — both slower and error-prone. When the POC finally launched to a pilot pool, I set up Fullstory to capture quantitative interaction data across the entire flow.
          </p>

          {/* Methodology card */}
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">Research methodology</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-800">Method</p>
                <p className="mt-1 text-sm text-slate-500">Quantitative data capture & analysis via Fullstory</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Participants</p>
                <p className="mt-1 text-sm text-slate-500">28 FC AU consultants, 4 TA AU advisors</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Period</p>
                <p className="mt-1 text-sm text-slate-500">October – December 2024</p>
              </div>
            </div>
          </div>

          {/* What worked */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-600">What worked</p>
            <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
              {[
                'Consultants successfully used the Tours search form',
                'Able to select a Tour from results and add to cart',
                'Able to convert the Tour through to booking',
                'Once added to cart, drop-off between steps significantly decreased',
                'Reduction in manual data entry vs. Grab / MPI workflow',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-emerald-200 bg-emerald-50/50 px-3 py-2.5 text-sm text-emerald-800">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ── Funnel analysis ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">The funnel</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Consultants who made it past results converted well, but significant drop-off happened mid-funnel — between search and results, and between results and selection.
          </p>

          {/* Drop-off stats */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">28%</p>
              <p className="mt-2 text-sm text-slate-500">Chose Grab over Search — preferred the manual route despite the POC</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">50%</p>
              <p className="mt-2 text-sm text-slate-500">Drop-off: search → results — couldn't find preferred supplier</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">30%</p>
              <p className="mt-2 text-sm text-slate-500">Drop-off: results → selection — couldn't find the specific tour</p>
            </div>
          </div>

          {/* Funnel visualisation */}
          <div className="mt-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Funnel breakdown</p>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { step: 'Search form', status: 'ok' },
                { step: '50% drop-off', status: 'drop' },
                { step: 'Results page', status: 'warn' },
                { step: '30% drop-off', status: 'drop' },
                { step: 'Tour selected', status: 'ok' },
                { step: 'Added to cart', status: 'ok' },
                { step: 'Converted', status: 'ok' },
              ].map((item, i) => (
                <div key={item.step} className="flex items-center gap-1.5">
                  <div className={`rounded-md border px-2.5 py-1.5 text-xs font-medium ${
                    item.status === 'ok'
                      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                      : item.status === 'warn'
                      ? 'border-amber-200 bg-amber-50 text-amber-800'
                      : 'border-red-200 bg-red-50 text-red-700'
                  }`}>
                    {item.step}
                  </div>
                  {i < 6 && <span className="text-slate-400 text-xs" aria-hidden="true">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="mt-12 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Performance comparison</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <p className="text-3xl font-semibold text-emerald-800">2,000ms</p>
                <p className="mt-1 text-sm text-emerald-700">Search & Book — search to results</p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-3xl font-semibold text-slate-700">4,000ms</p>
                <p className="mt-1 text-sm text-slate-500">Tours Grab — equivalent loading time</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-500">Search & Book was 2× faster on loading alone — the efficiency gains compounded across the full workflow with reduced manual entry.</p>
          </div>

          {/* Opportunities identified */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Opportunities uncovered</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="sm:border-r border-b border-slate-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Enable additional suppliers</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Some suppliers weren't available in the search form's dropdown. When a consultant's preferred supplier was missing, they abandoned Search & Book entirely and reverted to Grab or MPI — accounting for the largest single drop-off in the funnel.
                </p>
              </div>

              <div className="border-b border-slate-200 bg-amber-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-3">Increase product inventory</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Even when consultants could search, some couldn't find the specific tour they were looking for or were met with empty results. Expanding the inventory would directly reduce the 30% results-to-selection drop-off.
                </p>
              </div>

              <div className="sm:border-r border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Improve search functionality</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pre-post accommodation options, solo/single supplement handling, and other edge cases that consultants expected but the POC didn't yet support.
                </p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Improve Grab as a fallback</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  With 28% of consultants still preferring Grab, improving that fallback path in parallel would help the consultants who couldn't yet be served by Search & Book.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 max-w-2xl">
            <span className="font-semibold">Outcome:</span> The Fullstory analysis gave the team a prioritised, data-backed roadmap — supplier expansion and inventory coverage were elevated above interface refinements, and the findings were used to scope the next phase of POC improvements with Codegen.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PAYMENT SCHEDULES — FEATURE DEEP DIVE
          ════════════════════════════════════════════════════════════════ */}

      <div id="hp-payments" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Payment Schedules</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Giving consultants per-component control over payment timing — replacing a manual, error-prone process with no platform support.
          </p>

          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            A typical booking contains multiple components — flights, hotels, tours, transfers — each with different suppliers, deposit requirements, and payment deadlines. But Helio applied a single blanket schedule across the entire itinerary. Consultants managed the gap in spreadsheets and sticky notes because the system couldn't represent reality.
          </p>

          {/* Before / after */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">The friction</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="sm:border-r border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Before</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Single schedule for entire itinerary', 'Inaccurate payment deadlines', 'Manual tracking outside Helio', 'Risk of missed supplier payments'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-200 bg-emerald-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-3">After</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Per-component schedule adjustment', 'Accurate deposit & final payment dates', 'Payment timeline visible in Helio', 'Reduced manual tracking and errors'].map((item) => (
                    <span key={item} className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="sm:border-r border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Root cause</p>
                <p className="text-sm text-slate-500">The platform treated every booking as having one payment timeline — but real itineraries have as many payment schedules as they have suppliers.</p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Impact</p>
                <p className="text-sm text-slate-500">Consultants could now manage deposit and final payment timing per flight, hotel, or tour directly within the itinerary — eliminating the need for parallel spreadsheets and reducing the risk of missed supplier deadlines.</p>
              </div>
            </div>
          </div>

        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          GRAB PNR
          ════════════════════════════════════════════════════════════════ */}

      <div id="hp-grab" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Grab PNR</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Redesigning a blocking modal into an inline resolution flow — turning one of the most common daily frustrations into a fixable moment.
          </p>

          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            When consultants imported flight details via PNR, Travelbox validated names at the booking level — not per component, but across the entire booking. Any mismatch (a middle name abbreviated, a suffix formatted differently) threw a generic error modal and blocked the import. No visibility into what was wrong, no way to fix it inline. Consultants would close, investigate, fix separately, and retry — a task that should take seconds became minutes of detective work, repeated multiple times daily.
          </p>

          {/* Core constraint callout */}
          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 max-w-2xl">
            <span className="font-semibold">Platform constraint:</span> Travelbox enforces traveller name matching at the booking level — names must be consistent across every component, not just the one being imported. This makes PNR mismatches far more frequent than they would be in a component-scoped system.
          </div>

          {/* Problem → solution flow */}
          <div className="mt-12 space-y-8" role="group" aria-label="Before and after flow comparison. Before: 9-step flow blocked by generic error modal. After: 6-step flow with inline resolution.">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Before — generic error modal, blocked import</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Import PNR', 'System validates', 'Name mismatch detected', 'Generic error modal', 'Import blocked', 'Close modal', 'Investigate manually', 'Fix traveller record', 'Retry import'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className={`rounded-md border px-2.5 py-1.5 text-xs ${
                      i >= 3 && i <= 7
                        ? 'border-red-200 bg-red-50 text-red-700 font-medium'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}>
                      {step}
                    </div>
                    {i < 8 && <span className="text-slate-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600">After — redesigned modal with inline resolution</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Import PNR', 'System validates', 'Discrepancies shown in modal', 'Adjust traveller allocation', 'Names matched', 'Import completes'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800">
                      {step}
                    </div>
                    {i < 5 && <span className="text-emerald-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The redesigned modal showed PNR data alongside booking traveller records — making mismatches visible and resolvable inline. Same validation, same strictness — but now the modal helped consultants fix the problem instead of just blocking them. Dead-end became resolution flow.
          </p>

          {/* Key design decisions */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Modal redesign approach</p>
            <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
              {[
                'PNR data vs. booking travellers shown side by side in modal',
                'Inline traveller allocation adjustment without leaving the flow',
                'Clear highlighting of which name fields didn\'t match',
                'Preserved Travelbox validation — mismatches still caught, now resolvable',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* ── Reflection ── */}
      <div id="hp-reflection" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Three different problems, one common theme: working on a vendor-managed platform means you rarely get to redesign from scratch. The skill is knowing where the friction actually lives — and whether the fix is in the interface, the data, or the workflow logic underneath.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Analytics turned "it's not working" into "here's exactly where and why"</p>
              <p className="mt-1">For Tours, anecdotal feedback said the POC was broken. Fullstory showed the interface was fine — the funnel broke because of missing suppliers and inventory, not bad design. The data redirected the team's effort to the right problems.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Sometimes the system just can't represent reality</p>
              <p className="mt-1">Payment schedules failed because the platform assumed one timeline per booking — but each supplier has different deposit and deadline requirements. The fix wasn't better UI — it was better data modelling, exposed through per-component controls that matched how bookings actually work.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Errors should help, not just block</p>
              <p className="mt-1">The PNR modal was a dead end consultants hit multiple times a day. Travelbox's booking-level name strictness made mismatches inevitable, but the old modal just said "error" and closed the door. Redesigning it into a resolution modal — same validation, now with visibility and inline fixing — preserved the safety check while eliminating the daily pain.</p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-sm italic text-slate-500">
            This is a selection from an ongoing body of work on the Helio platform. Additional feature work and platform evolution are in progress.
          </p>
        </div>
      </div>

      {/* ── Footer navigation ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Link to="/stories" className="text-sm text-slate-500 transition hover:text-slate-900">
            ← All stories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HelioPlatform
