import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

function Insurance() {
  useEffect(() => {
    document.title = 'Insurance Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Insurance case study">

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-200">
          <img
            src="/images/insurance-hero.png"
            alt="Travel essentials — passport, camera, and boarding passes"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-0 pt-12">
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
          <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-16">
            <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
              <h1 className="text-4xl font-bold tracking-wide leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Coverage woven into the journey.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Connecting Helio to a new in-house platform so consultants could quote insurance in 30 seconds — and pilot the system that would eventually replace the legacy stack.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slim metadata bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold uppercase tracking-widest text-slate-500">Role</span>{' '}<span className="font-medium text-slate-600">Senior Product Designer</span>
            <span className="mx-2 text-slate-300" aria-hidden="true">·</span>
            <span className="font-semibold uppercase tracking-widest text-slate-500">Team</span>{' '}<span className="font-medium text-slate-600">PM, UX, in-house dev, EA insurance API</span>
            <span className="mx-2 text-slate-300" aria-hidden="true">·</span>
            <span className="font-semibold uppercase tracking-widest text-slate-500">Duration</span>{' '}<span className="font-medium text-slate-600">~6 months, 2024</span>
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 1 — THE PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">The problem</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Insurance quoting lived in a completely separate third-party system. To add coverage to a booking in Helio (the internal front-end built on Codegen's Travelbox platform), consultants had to leave the platform entirely, re-login to an external insurance tool, re-enter trip and customer details, calculate premiums manually, then switch back to apply the quote. Most didn't bother — 60% of eligible bookings went out without coverage.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-2xl italic text-slate-800 md:text-3xl leading-snug">
              "The fact that I don't have to do 27 clicks to load this into the quote is a win."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Travel consultant, usability testing</footer>
          </blockquote>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">2</p>
              <p className="mt-2 text-sm text-slate-500">separate systems to quote</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">5–8 min</p>
              <p className="mt-2 text-sm text-slate-500">to add insurance to a booking</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">60%</p>
              <p className="mt-2 text-sm text-slate-500">of eligible bookings went uninsured</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed">
              Baseline research — remote moderated sessions with 5 consultants and advisors observing the legacy insurance flow — confirmed what stakeholders suspected: the complexity actively discouraged consultants from offering it. Manual calculations, duplicate data entry, and context switching created a flow that punished thoroughness.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              The result was a compliance risk and a revenue gap. Consultants had adapted by skipping insurance entirely or offering it as an afterthought — a phone call days after the booking.
            </p>
          </div>

          {/* Pain-point summary */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Key friction points</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="sm:border-r border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-3">Process friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Separate system (re-login)', 'Manual premium calculations', 'Duplicate data entry', '28–36 clicks per quote'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-600 mb-3">Business impact</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Low attachment rates', 'Lost revenue on 60% of bookings', 'Compliance risk', 'Inconsistent offering'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="sm:border-r border-b sm:border-b-0 border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Consultant behaviour</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Skipping insurance entirely', 'Post-booking phone follow-ups', 'Paper-based workarounds'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Root cause</p>
                <p className="text-sm text-slate-500">Insurance lived outside the booking platform — no integration, no shared data, no automation.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 2 — THE CRAFT
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">The craft</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            The ideal vision was a fully embedded, personalised coverage assistant — automatic recommendations, one-step conversion, real-time compliance checks. But regulatory complexity across markets, API maturity, and a tight pilot timeline meant I needed to scope the experience deliberately.
          </p>

          <div className="mt-12 max-w-2xl space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                The key constraint was that Helio (the legacy front-end) couldn't be extended with new UI — it was a vendor-managed layer on top of Travelbox. Building insurance into Helio directly wasn't an option. But this constraint became the opportunity: I proposed building the insurance experience on a new in-house platform — <span className="font-medium text-slate-800">Travel Connect</span> — and using insurance as the pilot use case for a system intended to eventually replace Helio entirely.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                The architecture: pressing the insurance button in Helio would open Travel Connect in a new tab. Quote details and traveller data would be carried across via API, so the consultant could generate a quote and compare three coverage tiers without re-entering anything. Once confirmed, the insurance quote would be injected back into Travelbox and appear on the customer's travel quote in Helio.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                This let us build the insurance solution in-house with APIs connected to both Travelbox (for booking data) and EA (for insurance quoting and policy conversion) — and gave the business a working proof of concept for the Travel Connect platform.
              </p>
            </div>
          </div>

          {/* Platform handoff diagram — focuses on the Helio↔Travel Connect design decision */}
          <div className="mt-12" role="img" aria-label="Platform handoff: Helio opens Travel Connect in a new tab. Booking data flows right via API, confirmed quote flows back left.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Platform handoff</p>
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="flex items-stretch gap-0">
                  {/* Left: Legacy stack */}
                  <div className="w-[200px] shrink-0">
                    <div className="rounded-lg border-2 border-slate-300 overflow-hidden">
                      <div className="bg-slate-100 px-4 py-3 border-b border-slate-300">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Helio</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Consultant front-end</p>
                      </div>
                      <div className="bg-slate-50 px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-600">Travelbox</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">Booking engine (Codegen)</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 text-center">Vendor-managed · can't extend UI</p>
                  </div>

                  {/* Center: Arrows */}
                  <div className="flex-1 flex flex-col justify-center items-center px-3 min-w-[120px]">
                    <div className="w-full flex items-center gap-1.5 mb-3">
                      <div className="flex-1 border-t-2 border-dashed border-slate-300" />
                      <svg className="w-3 h-3 text-slate-500 shrink-0" aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M8 1l4 5-4 5V7H0V5h8V1z" /></svg>
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider -mt-1 mb-1">New tab</p>

                    <div className="w-full flex items-center gap-1.5 mb-1 mt-2">
                      <div className="flex-1 border-t-2 border-emerald-400" />
                      <svg className="w-3 h-3 text-emerald-600 shrink-0" aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M8 1l4 5-4 5V7H0V5h8V1z" /></svg>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-medium text-center">Travellers + trip data</p>

                    <div className="w-full flex items-center gap-1.5 mt-3 mb-1">
                      <svg className="w-3 h-3 text-emerald-600 shrink-0 rotate-180" aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M8 1l4 5-4 5V7H0V5h8V1z" /></svg>
                      <div className="flex-1 border-t-2 border-emerald-400" />
                    </div>
                    <p className="text-[10px] text-emerald-700 font-medium text-center">Confirmed quote</p>
                  </div>

                  {/* Right: Travel Connect */}
                  <div className="w-[200px] shrink-0">
                    <div className="rounded-lg border-2 border-emerald-400 overflow-hidden">
                      <div className="bg-emerald-50 px-4 py-3 border-b border-emerald-200">
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Travel Connect</p>
                        <p className="text-[11px] text-emerald-600 mt-0.5">New in-house platform</p>
                      </div>
                      <div className="bg-white px-4 py-3 space-y-1.5">
                        <div className="flex gap-1">
                          {['Basic', 'Standard', 'Premium'].map((tier) => (
                            <span key={tier} className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">{tier}</span>
                          ))}
                        </div>
                        <p className="text-[11px] text-slate-500">Real-time pricing · side-by-side tiers</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-emerald-600 text-center font-medium">Built in-house · pilot for Helio replacement</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 italic">Full integration lifecycle (incl. EA Insurance API) shown in the Delivery section below.</p>
          </div>

          {/* Concept evaluation */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs" aria-label="Concept evaluation comparing four approaches">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-500">Approach</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Feasibility</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Data passthrough</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Platform strategy</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {[
                  { name: 'AI coverage assistant', scores: ['✗', '✓', '✗'], highlight: false },
                  { name: 'Build within Helio (vendor)', scores: ['✗', '✗', '✗'], highlight: false },
                  { name: 'Third-party tool (status quo)', scores: ['✓', '✗', '✗'], highlight: false },
                  { name: 'Travel Connect (new tab, API-linked)', scores: ['✓', '✓', '✓'], highlight: true },
                ].map((row) => (
                  <tr key={row.name} className={`border-b border-slate-100 ${row.highlight ? 'bg-emerald-50' : ''}`}>
                    <th scope="row" className={`py-3 pr-4 text-left font-normal ${row.highlight ? 'font-semibold text-emerald-800' : 'text-slate-700'}`}>{row.name}</th>
                    {row.scores.map((score, i) => (
                      <td key={i} className={`py-3 px-3 text-center ${score === '✓' ? 'text-emerald-600' : 'text-slate-300'}`}>
                        <span className="text-base">{score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-10 max-w-2xl space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed">
              Travel Connect scored highest — it was technically feasible within the legacy constraints, supported full data passthrough from Travelbox, and advanced the long-term platform strategy. The trade-off was a new-tab context switch rather than a fully inline experience, but with booking and traveller data pre-filled and the quote injected back automatically, the cognitive load was dramatically lower than the status quo.
            </p>
          </div>

          {/* Design direction */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Design direction</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {[
                'Helio → Travel Connect handoff via API',
                'Pre-filled quote & traveller details',
                'Three coverage tiers with real-time pricing',
                'One-click confirm, auto-inject back to Travelbox',
                'Pilot for Travel Connect platform',
              ].map((feature) => (
                <div key={feature} className="rounded-lg border border-emerald-200 bg-emerald-50/50 px-3 py-2.5 text-sm text-emerald-800">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Prototyping & testing ── */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h3 className="text-2xl font-semibold text-slate-900">Prototyping & testing</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            I designed the Travel Connect quoting experience in Figma — the moment after the consultant clicks the insurance button in Helio and lands in the new tab. I defined the information architecture, tier comparison layout, and API-driven states (loading, error, empty). The key insight was that consultants needed to see all three coverage tiers with pricing side-by-side before committing, not step through them sequentially.
          </p>

          <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
            After baseline research on the legacy flow, I ran a second round of remote moderated testing with the same 5 participants — 3 Flight Centre AU consultants and 2 Travel Associates AU advisors — this time on the Travel Connect prototype, across two task-based scenarios:
          </p>

          {/* Two tested tasks with flow diagrams */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-3xl">
            {/* Task 1 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Task 1 — Add a quote</p>
              <p className="text-sm text-slate-600 leading-relaxed">Navigate from Helio to Travel Connect, select travellers, search for an insurance quote, then return to Helio and refresh to see it on the booking.</p>
              <p className="mt-3 text-xs font-semibold text-slate-800">15 → 6 clicks</p>
              {/* Flow */}
              <div className="mt-4 flex flex-wrap items-center gap-1">
                {[
                  { label: 'Insurance btn', color: 'slate' },
                  { label: 'Select travellers', color: 'emerald' },
                  { label: 'Search quote', color: 'emerald' },
                  { label: 'Confirm', color: 'emerald' },
                  { label: 'Refresh tab', color: 'slate' },
                  { label: 'On booking', color: 'slate' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${step.color === 'emerald' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                      {step.label}
                    </div>
                    {i < 5 && <span className="text-[10px] text-slate-400" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
            {/* Task 2 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Task 2 — Convert to policy</p>
              <p className="text-sm text-slate-600 leading-relaxed">Open "Manage Insurance" via kebab menu in Helio, navigate through the EA portal to accept declarations, confirm the policy, then return to Helio and refresh.</p>
              <p className="mt-3 text-xs font-semibold text-slate-800">6 → 3 clicks</p>
              {/* Flow */}
              <div className="mt-4 flex flex-wrap items-center gap-1">
                {[
                  { label: 'Manage Ins.', color: 'slate' },
                  { label: 'Declarations', color: 'sky' },
                  { label: 'Confirm policy', color: 'sky' },
                  { label: 'Refresh tab', color: 'slate' },
                  { label: 'Policy live', color: 'slate' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-1">
                    <div className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${step.color === 'sky' ? 'bg-sky-100 text-sky-700' : 'bg-slate-200 text-slate-600'}`}>
                      {step.label}
                    </div>
                    {i < 4 && <span className="text-[10px] text-slate-400" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm text-slate-500 leading-relaxed">
            One honest UX wart: consultants still had to manually refresh the Helio tab to see the insurance appear on the booking. Even so, sentiment was overwhelmingly positive — the flow was faster and simpler than the status quo even with that extra step.
          </p>

          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Usability validation</p>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { value: '28–36 → 16', label: 'Clicks per insurance quote' },
                { value: '27 → 90', label: 'UMUX-Lite score (out of 100)' },
                { value: '5/5', label: 'Would use in production' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-slate-900 md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-12 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "Way better than current flow, easy to use, not a lot of clicks. It will definitely make our job easier."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Flight Centre consultant, usability testing</footer>
          </blockquote>
        </div>
      </div>

      {/* ── Delivery ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h3 className="text-2xl font-semibold text-slate-900">Shipping with partners</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            I partnered with engineering and the EA insurance team to coordinate across three integration points: Travelbox APIs for booking and traveller data passthrough, EA's insurance APIs for real-time quoting and policy conversion, and Helio for the launch-point and quote injection back into the customer itinerary. I spec'd the handoff states, error handling, and edge cases that bridged the design-to-API boundary.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Because this was also the pilot program for Travel Connect as a platform, the stakes were higher than a feature launch — it was proving the architecture, the in-house development model, and the handoff pattern that would scale to other verticals. I drafted the training scenarios and onboarding materials, and we ran a controlled pilot with select consultants, monitoring attachment rates and system stability post-launch.
          </p>
          {/* Integration lifecycle diagram */}
          <div className="mt-12" role="img" aria-label="Integration lifecycle: Travelbox provides traveller data to Travel Connect, which builds a quote request sent to EA Insurance API. Confirmed quotes are written back to Travelbox. Policy conversion happens via EA portal.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Integration lifecycle</p>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
              <div className="min-w-[520px]">
                {/* System headers */}
                <div className="grid grid-cols-3 border-b border-slate-200">
                  <div className="px-4 py-3 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Travelbox</p>
                    <p className="text-[9px] text-slate-500">Booking data source</p>
                  </div>
                  <div className="px-4 py-3 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Travel Connect</p>
                    <p className="text-[9px] text-emerald-500">Orchestration layer</p>
                  </div>
                  <div className="px-4 py-3 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">EA Insurance API</p>
                    <p className="text-[9px] text-sky-500">Quoting & compliance</p>
                  </div>
                </div>
                {/* Quote phase */}
                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-500">Quote</p>
                    <div className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600 text-center w-full">Travellers + trip details</div>
                    <span className="text-[10px] text-emerald-400">→</span>
                  </div>
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <div className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700 text-center w-full">Build quote request</div>
                    <span className="text-[10px] text-sky-400">→</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center">
                    <div className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] text-sky-700 text-center w-full">Return 3 tier prices</div>
                  </div>
                </div>
                {/* Confirm phase */}
                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-500">Confirm</p>
                    <div className="flex items-center gap-1 text-[10px] text-emerald-500">
                      <span>←</span><span>Quote injected</span>
                    </div>
                  </div>
                  <div className="px-3 py-3 border-r border-slate-100 flex items-center justify-center">
                    <div className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700 text-center w-full">Write quote to booking</div>
                  </div>
                  <div className="px-3 py-3" />
                </div>
                {/* Policy phase */}
                <div className="grid grid-cols-3">
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-500">Policy</p>
                    <span className="text-[9px] text-slate-500 italic">via Helio kebab menu</span>
                  </div>
                  <div className="px-3 py-3 border-r border-slate-100 flex items-center justify-center">
                    <span className="text-[10px] text-sky-400">→</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center">
                    <div className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] text-sky-700 text-center w-full">Accept & convert policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 max-w-2xl">
            <span aria-hidden="true">✓</span> <span className="font-semibold">Launched July 2024</span> — first feature live on Travel Connect. Training completion above 95%. Platform pilot validated for broader rollout.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 3 — THE OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">The outcome</h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>+45 pp</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Attachment rate increase</p>
              <p className="mt-1 text-xs text-slate-500">Pilot stores, 90-day pre/post comparison</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>~30s</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Time to add insurance</p>
              <p className="mt-1 text-xs text-slate-500">Down from 5–8 minutes</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>~$2.4M</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Estimated annual revenue lift</p>
              <p className="mt-1 text-xs text-slate-500">Modelled from attachment delta × avg premium</p>
            </div>
          </div>

          {/* Before / after flow comparison — swimlane diagrams */}
          <div className="mt-16 space-y-12" role="img" aria-label="Before and after flow comparison. Before: 28 to 36 clicks across Helio, a 3rd-party tool, and manual work including re-login, duplicate data entry, and context switching. After: 16 clicks across Helio, Travel Connect, and EA portal with pre-filled data and automatic quote injection.">
            {/* BEFORE flow */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Before — external system, 28–36 clicks</p>
              <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
                <div className="min-w-[520px]">
                  {/* Swimlane headers */}
                  <div className="grid grid-cols-3 border-b border-slate-200">
                    <div className="px-4 py-2 border-r border-slate-200">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Helio / Travelbox</p>
                    </div>
                    <div className="px-4 py-2 border-r border-slate-200">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">3rd-party insurance tool</p>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Manual work</p>
                    </div>
                  </div>
                  {/* Swimlane rows */}
                  <div className="grid grid-cols-3">
                    {/* Helio column */}
                    <div className="px-3 py-4 border-r border-slate-100 space-y-2">
                      {['Start on booking', 'Leave platform'].map((s) => (
                        <div key={s} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-500 text-center">{s}</div>
                      ))}
                      <div className="h-px" />
                      <div className="border-t border-dashed border-slate-200 pt-2 space-y-2">
                        <p className="text-[9px] text-slate-500 italic text-center">… wait for quote …</p>
                        {['Switch back to Helio', 'Manually apply quote'].map((s) => (
                          <div key={s} className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-500 text-center">{s}</div>
                        ))}
                      </div>
                    </div>
                    {/* 3rd-party column */}
                    <div className="px-3 py-4 border-r border-slate-100 space-y-2">
                      <div className="h-[36px]" />
                      {['Login to tool', 'Re-enter trip details', 'Re-enter customer details', 'Calculate premium', 'Select plan', 'Generate quote'].map((s) => (
                        <div key={s} className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-700 text-center">{s}</div>
                      ))}
                    </div>
                    {/* Manual work column */}
                    <div className="px-3 py-4 space-y-2">
                      <div className="h-[36px]" />
                      <div className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600 text-center">Re-login</div>
                      <div className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600 text-center">Duplicate data entry</div>
                      <div className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600 text-center">Manual calculation</div>
                      <div className="h-px" />
                      <div className="border-t border-dashed border-slate-200 pt-2">
                        <div className="rounded border border-red-200 bg-red-50 px-2.5 py-1.5 text-[11px] text-red-600 text-center">Context switching ×2</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-slate-500 italic">Heavy context switching, duplicate data entry, no shared data between systems.</p>
            </div>

            {/* AFTER flow */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-600">After — Travel Connect + EA portal, 16 clicks</p>
              <div className="rounded-xl border border-emerald-200 bg-white overflow-x-auto">
                <div className="min-w-[520px]">
                  {/* Swimlane headers */}
                  <div className="grid grid-cols-3 border-b border-emerald-100">
                    <div className="px-4 py-2 border-r border-emerald-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">Helio</p>
                    </div>
                    <div className="px-4 py-2 border-r border-emerald-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-700">Travel Connect</p>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">EA portal</p>
                    </div>
                  </div>
                  {/* Swimlane rows — quoting phase */}
                  <div className="grid grid-cols-3 border-b border-emerald-50">
                    <div className="px-3 py-4 border-r border-emerald-50 space-y-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Quote</p>
                      <div className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800 text-center">Insurance button</div>
                      <div className="flex justify-center">
                        <span className="text-[10px] text-emerald-400">↓ new tab</span>
                      </div>
                    </div>
                    <div className="px-3 py-4 border-r border-emerald-50 space-y-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-emerald-500 mb-1">&nbsp;</p>
                      <div className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800 text-center">Select travellers</div>
                      <div className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800 text-center">Compare 3 tiers</div>
                      <div className="rounded border border-emerald-300 bg-emerald-100 px-2.5 py-1.5 text-[11px] font-semibold text-emerald-900 text-center">Confirm quote</div>
                      <p className="text-[9px] text-emerald-500 italic text-center">Data pre-filled via API</p>
                    </div>
                    <div className="px-3 py-4" />
                  </div>
                  {/* Swimlane rows — injection + policy phase */}
                  <div className="grid grid-cols-3">
                    <div className="px-3 py-4 border-r border-emerald-50 space-y-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-500 mb-1">Policy</p>
                      <div className="rounded border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-500 text-center">Refresh Helio tab</div>
                      <div className="rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800 text-center">Manage Insurance ⋮</div>
                      <div className="flex justify-center">
                        <span className="text-[10px] text-sky-400">↓ redirect</span>
                      </div>
                    </div>
                    <div className="px-3 py-4 border-r border-emerald-50" />
                    <div className="px-3 py-4 space-y-2">
                      <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-500 mb-1">&nbsp;</p>
                      <div className="rounded border border-sky-200 bg-sky-50 px-2.5 py-1.5 text-[11px] text-sky-800 text-center">Accept declarations</div>
                      <div className="rounded border border-sky-300 bg-sky-100 px-2.5 py-1.5 text-[11px] font-semibold text-sky-900 text-center">Confirm policy</div>
                    </div>
                  </div>
                  {/* Final row — result */}
                  <div className="border-t border-emerald-100 px-4 py-2.5 bg-emerald-50/50">
                    <p className="text-[11px] text-emerald-700 text-center font-medium">Policy on booking — quote auto-injected into Travelbox</p>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[11px] text-emerald-600">No duplicate data entry. Three clear system handoffs. Booking data flows via API.</p>
            </div>
          </div>

          <blockquote className="mt-12 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "Great to see a list of coverage with accurate pricing! It's easier and faster than our current process, even having to jump to the Helio tab and refresh."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Flight Centre consultant, usability testing</footer>
          </blockquote>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed">
              Travel Connect eliminated the manual re-entry and third-party login. Booking and traveller details flowed across automatically, three coverage tiers appeared with accurate pricing, and the confirmed quote wrote back to the customer's itinerary in Travelbox. The flow still required a manual Helio tab refresh — an integration constraint consultants noticed but accepted as a fair trade for the speed gain.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Beyond the insurance numbers, the pilot validated Travel Connect as a platform — proving the in-house build model, the API integration pattern, and the new-tab handoff architecture that would scale to other verticals as the eventual Helio replacement.
            </p>
            <p className="text-sm italic text-slate-500">
              Revenue attribution and compliance metrics available on request.
            </p>
          </div>

          <div className="mt-16">
            <Link
              to="/stories/insurance/demo"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try the interactive demo →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Reflection ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            A pilot that proved two things at once — that insurance could be woven into the booking journey, and that Travel Connect could replace the legacy front-end.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">The constraint became the strategy</p>
              <p className="mt-1">We couldn't build inside Helio. That forced us to build Travel Connect — which turned an insurance feature into a platform pilot. The constraint shaped a better long-term outcome than the original brief.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Real booking data exposed what mocks couldn't</p>
              <p className="mt-1">Prototyping with real booking scenarios revealed edge cases in pricing, traveller combinations, and policy rules that would have shipped as bugs with synthetic test data.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Phasing the dream unlocked the real win</p>
              <p className="mt-1">The vision was a fully embedded AI coverage assistant. Shipping the connected quoting flow first proved the business case — +45 pp attachment lift and ~$2.4M estimated revenue impact — and validated the platform architecture for broader rollout.</p>
            </div>
          </div>

          {/* Platform evolution timeline */}
          <div className="mt-12" role="img" aria-label="Platform trajectory: Step 1, Travel Connect v1 as insurance pilot, July 2024. Step 2, Travel Connect as broader platform. Step 3, eventual Helio replacement.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Platform trajectory</p>
            <div className="rounded-xl border border-slate-200 bg-white px-5 py-4 max-w-2xl">
              <div className="flex items-start gap-0">
                {/* Step 1 */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-emerald-700">1</span>
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-slate-700">Travel Connect v1</p>
                  <p className="text-[9px] text-slate-500">Insurance pilot (née "Payments Platform")</p>
                  <p className="mt-1 text-[9px] text-emerald-600 font-medium">Jul 2024</p>
                </div>
                {/* Connector */}
                <div className="flex-1 flex items-center pt-4">
                  <div className="w-full border-t-2 border-dashed border-slate-300" />
                </div>
                {/* Step 2 */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-emerald-700">2</span>
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-slate-700">Travel Connect</p>
                  <p className="text-[9px] text-slate-500">Broader platform</p>
                  <p className="mt-1 text-[9px] text-slate-500">Payments, extras, …</p>
                </div>
                {/* Connector */}
                <div className="flex-1 flex items-center pt-4">
                  <div className="w-full border-t-2 border-dashed border-slate-300" />
                </div>
                {/* Step 3 */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500">3</span>
                  </div>
                  <p className="mt-2 text-[10px] font-semibold text-slate-700">Helio replacement</p>
                  <p className="text-[9px] text-slate-500">Full consultant platform</p>
                  <p className="mt-1 text-[9px] text-slate-500 italic">Long-term vision</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Identified for next phases</p>
            <div className="flex flex-wrap gap-1.5 max-w-2xl">
              {['Add extras & adjust excess in-platform', 'Richer coverage information in Travel Connect', 'Simplified EA portal UI', 'Amendment & cancellation flows', 'Post-launch consultant sentiment metrics'].map((item) => (
                <span key={item} className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-600">{item}</span>
              ))}
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-sm italic text-slate-500">
            Travel Connect went on to become the foundation for broader platform modernisation — insurance was just the first vertical.
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

export default Insurance
