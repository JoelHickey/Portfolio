import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

function HelioPlatform() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Helio Platform case study">

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 30% 40%, rgba(34, 211, 238, 0.18), transparent 35%), radial-gradient(circle at 70% 30%, rgba(129, 140, 248, 0.22), transparent 35%), radial-gradient(circle at 50% 80%, rgba(192, 38, 211, 0.12), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 38%, #111827 72%, #000000 100%)'
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/15 via-black/25 to-black/70"
            aria-hidden
          />
          <div className="absolute left-0 right-0 top-0 pt-12">
            <div className="mx-auto w-full max-w-6xl px-6">
              <Link
                to="/stories"
                className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/45 hover:text-white"
              >
                <span aria-hidden>←</span>
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
              <p className="font-semibold uppercase tracking-widest text-slate-400">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">Senior UX/UI Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Domain</p>
              <p className="mt-0.5 font-medium text-slate-700">B2B travel — internal consultant platform</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">PM, UX, Codegen dev, platform architects</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">Ongoing, 2023–present</p>
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="max-w-3xl space-y-2 text-sm text-slate-600">
            <p className="font-semibold uppercase tracking-widest text-slate-400 text-xs">Summary</p>
            <p className="leading-relaxed">Helio is the booking platform used by 3,000+ Flight Centre consultants daily. As the UX designer embedded in the platform team, I worked across multiple features — Tours Search & Book, Payment Schedules, and Grab PNR — within the constraints of a vendor-managed front-end, using FullStory analytics to diagnose friction and measure improvement.</p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Helio is the primary booking and servicing platform for Flight Centre and Travel Associates consultants across Australia. Built on Codegen's Travelbox engine, it handles everything from search and quoting to booking management, amendments, and post-sale servicing. It's the tool consultants live in all day.
          </p>

          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The challenge is that Helio's front-end is vendor-managed — meaning the UX team can influence but not directly control the interface. Extending the UI with new features, rewriting interaction patterns, or shipping rapid experiments all require navigating the constraints of a platform built for configurability, not design agility.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-2xl italic text-slate-800 md:text-3xl leading-snug">
              "We can't just redesign Helio. But we can redesign how people experience it."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Internal UX strategy framing</footer>
          </blockquote>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">3,000+</p>
              <p className="mt-2 text-sm text-slate-500">consultants using Helio daily</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">FC + TA</p>
              <p className="mt-2 text-sm text-slate-500">Flight Centre & Travel Associates brands</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">Vendor</p>
              <p className="mt-2 text-sm text-slate-500">managed front-end (Codegen / Travelbox)</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              My role has been to improve the consultant experience within these constraints — through feature design, workflow optimisation, usability testing, and analytics-driven validation. Some work extends Helio directly. Other work builds adjacent experiences (like Travel Connect) that integrate back into the platform.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              This case study covers three examples of that work: using Fullstory analytics to validate a Tours Search & Book POC, redesigning payment schedule controls to eliminate manual workarounds, and fixing the Grab PNR flight import flow that was blocking agents from completing bookings.
            </p>
          </div>

          {/* Design approach */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Approach within a constrained platform</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="sm:border-r border-b border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">What we can do</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Configure workflows', 'Design within existing patterns', 'Build adjacent platforms (Travel Connect)', 'Run analytics & usability testing'].map((item) => (
                    <span key={item} className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">What we can't</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Rewrite the front-end', 'Ship custom UI components', 'Control release cadence', 'Bypass vendor architecture'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>

              <div className="sm:border-r border-slate-200 bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">The lever</p>
                <p className="text-sm text-slate-500">Use data, research, and testing to make smarter configuration decisions — and prove the case for deeper changes with evidence.</p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">The strategy</p>
                <p className="text-sm text-slate-500">Build what we can in-house (Travel Connect), validate everything with real usage data, and design the path from legacy to modern.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          TOURS SEARCH & BOOK
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Tours Search & Book</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Using Fullstory to validate a proof of concept — and uncover exactly where consultants were succeeding and where the funnel broke down.
          </p>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              Codegen started development on Tours Search and Book in 2020, but it never progressed past initial builds into a proper proof of concept. Without it, consultants reverted to two workarounds: using the Tours Grab feature (which required manual data entry) or adding the tour as a Manual Product Item (MPI) — both slower, error-prone, and disconnected from the booking workflow.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              When the POC finally launched to a small pool of stores, we needed a way to understand how consultants were actually using it — not through surveys or assumptions, but through observed behaviour. I set up Fullstory to capture quantitative interaction data across the entire Tours Search and Book flow.
            </p>
          </div>

          {/* Methodology card */}
          <div className="mt-10 rounded-xl border border-slate-200 bg-white p-6 max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">Research methodology</p>
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
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">The funnel</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Fullstory session data across the pilot pool revealed a clear pattern: consultants who made it past the results page converted well, but significant drop-off happened in the middle of the funnel — between search and results, and between results and selection.
          </p>

          {/* Drop-off stats */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>28%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Chose Grab over Search</p>
              <p className="mt-1 text-xs text-slate-500">Preferred the manual route despite the POC being available</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>50%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Drop-off: search → results</p>
              <p className="mt-1 text-xs text-slate-500">Consultants couldn't find their preferred supplier in the search form</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>30%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Drop-off: results → selection</p>
              <p className="mt-1 text-xs text-slate-500">Couldn't find the specific tour within the results page</p>
            </div>
          </div>

          {/* Funnel visualisation */}
          <div className="mt-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Funnel breakdown</p>
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
                  {i < 6 && <span className="text-slate-300 text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Performance */}
          <div className="mt-12 max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Performance comparison</p>
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
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Opportunities uncovered</p>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Improve search functionality</p>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Pre-post accommodation options, solo/single supplement handling, and other edge cases that consultants expected but the POC didn't yet support.
                </p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Improve Grab as a fallback</p>
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

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Payment Schedules</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Giving consultants per-component control over payment timing — replacing a manual, error-prone process that had no flexibility built into the platform.
          </p>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              A typical booking in Helio contains multiple components — flights, hotels, tours, transfers — each with different suppliers, deposit requirements, and final payment deadlines. But Helio had no ability to adjust the payment schedule at the component level. Consultants were stuck with a single, blanket payment schedule applied across the entire itinerary regardless of what each supplier actually required.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The result was inaccurate payment timelines, manual workarounds to track what was actually due and when, and a constant risk of missed deadlines or incorrect amounts. Consultants were managing payment complexity outside the system — in spreadsheets, sticky notes, and memory — because the system couldn't represent the reality of a multi-component booking.
            </p>
          </div>

          {/* Before / after */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">The friction</p>
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
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Root cause</p>
                <p className="text-sm text-slate-500">The platform treated every booking as having one payment timeline — but real itineraries have as many payment schedules as they have suppliers.</p>
              </div>

              <div className="bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Impact</p>
                <p className="text-sm text-slate-500">Consultants could now manage deposit and final payment timing per flight, hotel, or tour directly within the itinerary — eliminating the need for parallel spreadsheets and reducing the risk of missed supplier deadlines.</p>
              </div>
            </div>
          </div>

          <div className="mt-10 max-w-2xl">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The solution enabled consultants to view and adjust the payment schedule for each component individually within the itinerary. Deposit amounts, payment due dates, and final balance deadlines could now reflect what each supplier actually required — not a one-size-fits-all approximation. This brought the source of truth back into Helio and eliminated the parallel manual tracking that had become standard practice.
            </p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          GRAB PNR
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Grab PNR</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Redesigning a blocking modal into an inline resolution flow — turning one of the most common daily frustrations into a fixable moment.
          </p>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              When consultants imported flight details into Helio via PNR (Passenger Name Record), the system would validate the incoming data against the booking's traveller records. Travelbox enforces strict name matching at the booking level — not per component, but across the entire booking. If there was any inconsistency between the PNR and the booking's travellers — a name spelled differently, a middle name missing, a suffix mismatch — Helio would throw a generic error modal and block the import entirely.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              This was one of the most common blockers consultants hit daily. The strictness of Travelbox's booking-level traveller name validation meant that even minor discrepancies — an airline abbreviating a middle name, or a suffix formatted differently — would prevent the import. The existing modal gave consultants no visibility into what was wrong or any way to resolve it. They'd close the modal, leave the flow, manually investigate the mismatch across traveller records, fix it separately, and retry. A task that should take seconds routinely turned into minutes of detective work, repeated multiple times a day.
            </p>
          </div>

          {/* Core constraint callout */}
          <div className="mt-10 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 max-w-2xl">
            <span className="font-semibold">Platform constraint:</span> Travelbox enforces traveller name matching at the booking level — names must be consistent across every component, not just the one being imported. This makes PNR mismatches far more frequent than they would be in a component-scoped system.
          </div>

          {/* Problem → solution flow */}
          <div className="mt-12 space-y-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Before — generic error modal, blocked import</p>
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
                    {i < 8 && <span className="text-slate-300 text-xs">→</span>}
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
                    {i < 5 && <span className="text-emerald-400 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The redesigned modal replaced the generic error with a clear view of the discrepancies — showing the PNR traveller data alongside the booking's traveller records so the consultant could see exactly what didn't match. From within the same modal, they could adjust the traveller allocation, reassigning or correcting names so the data aligned without ever leaving the import flow.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The shift was from a dead-end modal (error, close, leave, fix elsewhere, retry) to a resolution modal (see the problem, fix it here, continue). The validation still caught every mismatch — but now it helped consultants resolve them instead of just blocking them. For a pain point that was hitting consultants multiple times daily, the compound time savings were significant.
            </p>
          </div>

          {/* Key design decisions */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Modal redesign approach</p>
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
      <div className="w-full bg-slate-50">
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
      <div className="w-full bg-white">
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
