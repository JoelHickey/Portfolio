import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

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
      <CaseStudyNav sections={[
        { id: 'ins-problem', label: 'Problem' },
        { id: 'ins-strategy', label: 'Strategy' },
        { id: 'ins-prototyping', label: 'Prototyping' },
        { id: 'ins-delivery', label: 'Delivery' },
        { id: 'ins-outcome', label: 'Outcome' },
        { id: 'ins-reflection', label: 'Reflection' },
      ]} />

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
                From minutes to seconds — a new in-house quoting platform for Travel Consultants.
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
              <p className="mt-0.5 font-medium text-slate-700">Senior Product Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Domain</p>
              <p className="mt-0.5 font-medium text-slate-700">B2B travel — insurance quoting platform</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">PM, UX, in-house dev, insurance API partner</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">~6 months, 2024</p>
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="max-w-3xl space-y-2 text-sm text-slate-600">
            <p className="font-semibold uppercase tracking-widest text-slate-500 text-xs">Summary</p>
            <p className="leading-relaxed">Insurance was disconnected from the booking workflow — consultants had to leave the platform, re-enter data in a third-party tool, and manually apply quotes. I designed Travel Connect, a new in-house quoting platform that integrated with the existing booking system via API. The result: +45pp insurance attachment rate, ~30s to add coverage (down from 5–8 min), and ~$2.4M estimated annual revenue lift from the pilot.</p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 1 — THE PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div id="ins-problem" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Insurance was completely disconnected from the booking workflow. To quote or manage coverage, consultants had to leave Helio, the internal booking platform, re-enter details in a third-party tool, calculate premiums manually, then switch back — all without shared data or automation. Most didn't bother.
          </p>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "By the time I've switched systems and worked out the premium, the customer's already lost interest."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Travel consultant, baseline research</footer>
          </blockquote>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">2</p>
              <p className="mt-2 text-sm text-slate-500">separate systems to quote and manage</p>
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

        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 2 — THE CRAFT
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div id="ins-strategy" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The obvious answer was to build insurance directly into Helio. But Helio was vendor-managed — any new feature had to go through Codegen, adding cost, time, and dependency. We landed on a different path: build the insurance experience on a new in-house platform, <span className="font-medium text-slate-800">Travel Connect</span>, and use insurance as the pilot to prove it could eventually replace Helio entirely. Insurance won the first-pilot slot because the revenue gap was quantifiable (60% of eligible bookings uninsured) and the workflow was self-contained enough to ship without touching the core booking flow.
          </p>

          <div className="mt-12 max-w-2xl space-y-8">
            <div className="space-y-4">
              <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
                The trade-off was a new-tab context switch. But with booking data pre-filled via API, three coverage tiers displayed side-by-side, and the confirmed quote injecting back into Travelbox automatically, the flow was still dramatically faster than the status quo. We evaluated embedded and iframe approaches first — neither was viable within the vendor constraints and pilot timeline.
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
                        <p className="text-[11px] text-slate-500 mt-0.5">Booking engine (vendor)</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-slate-500 text-center whitespace-nowrap">Vendor-managed · via Codegen</p>
                  </div>

                  {/* Center: Arrows */}
                  <div className="flex-1 flex flex-col justify-center items-center px-3 min-w-[120px]">
                    <div className="w-full flex items-center gap-1.5 mb-3">
                      <div className="flex-1 border-t border-dashed border-slate-200" />
                      <svg className="w-2.5 h-2.5 text-slate-400 shrink-0" aria-hidden="true" viewBox="0 0 12 12" fill="currentColor"><path d="M8 1l4 5-4 5V7H0V5h8V1z" /></svg>
                    </div>
                    <p className="text-[9px] text-slate-500 font-medium uppercase tracking-wider -mt-1 mb-1">Opens new tab</p>

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
                        <p className="text-[11px] text-slate-500 whitespace-nowrap">Real-time pricing · 3 tiers</p>
                      </div>
                    </div>
                    <p className="mt-2 text-[11px] text-emerald-600 text-center font-medium whitespace-nowrap">In-house · platform pilot</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 italic">Full integration lifecycle (incl. insurance partner API) shown in the Delivery section below.</p>
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
                      <td key={i} className={`py-3 px-3 text-center ${score === '✓' ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <span className="text-base">{score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>

      {/* ── Prototyping & testing ── */}
      <div id="ins-prototyping" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Prototyping & testing</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I designed the quoting experience in Figma — information architecture, tier comparison layout, and API-driven states. During the search phase, the insurance partner API surfaced destination-specific travel advisories — giving consultants risk context they'd never had before, right when it mattered. For the comparison screen, the key insight: consultants needed to see all three coverage tiers with pricing side-by-side, not step through them sequentially.
          </p>

          {/* Figma screenshot — tier comparison */}
          <div className="mt-12 max-w-3xl">
            <div className="rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
              <div className="aspect-[16/9] flex items-center justify-center">
                {/* TODO: Replace with actual Figma screenshot */}
                <p className="text-sm text-slate-400">Figma screenshot — tier comparison layout</p>
              </div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 italic">Three coverage tiers displayed side-by-side with real-time pricing — the core design decision from usability insight.</p>
          </div>

          <p className="mt-12 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I then ran remote moderated testing with 5 consultants on the Travel Connect prototype, across two task-based scenarios:
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
              <p className="text-sm text-slate-600 leading-relaxed">Open "Manage Insurance" via kebab menu in Helio, navigate through the insurance partner portal to accept declarations, confirm the policy, then return to Helio and refresh.</p>
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
                { value: '28–36 → 16', label: 'Combined clicks in moderated testing' },
                { value: '27 → 90', label: 'UMUX-Lite score (out of 100)' },
                { value: '5/5', label: 'Would use in production' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-slate-900 md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">UMUX-Lite baseline (27) measured against the same two tasks on the legacy third-party tool. Same 5 participants, same scale, tested one week apart.</p>
          </div>

          <blockquote className="mt-12 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "The fact that I don't have to do 27 clicks to load this into the quote is a win."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Travel consultant, usability testing</footer>
          </blockquote>
        </div>
      </div>

      {/* ── Delivery ── */}
      <div id="ins-delivery" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I worked across three integration points with engineering and the insurance partner team: Travelbox for booking data, partner APIs for real-time quoting and policy conversion, and Helio for the launch-point and quote injection — spec'ing handoff states, error handling, and edge cases at each boundary.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The insurance partner team initially wanted us to embed their full portal via iframe — faster for them, but it would have locked us into their UI and blocked the platform play. I walked through the data-flow requirements and the long-term architecture with both teams until we aligned on an API-first approach where each side owned their surface.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Spec delivery wasn't one-shot. After the initial Figma handoff, the first eng review surfaced three issues: edge cases around multi-traveller pricing, an incorrect assumption about how Travelbox exposed cancellation data, and a loading state I'd designed for a synchronous response that was actually async. I revised the spec, added an explicit state diagram for the quote lifecycle, and we agreed on a definition of done that included both the happy path and the four most common failure states. Revision rounds dropped from three in the first feature module to one for the final two.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Because this was the pilot for Travel Connect as a platform, the stakes were higher than a feature launch. Three external dependencies could block independently — Travelbox for data, the insurance partner API for pricing, and Helio for the launch-point — and the platform itself had no production track record. We mitigated with a controlled pilot: limited stores, close monitoring of attachment rates and system stability, and a rollback path if integration failed. I drafted training materials and we shipped quote and bind, deferring mid-trip modifications and multi-policy management to v2.
          </p>
          {/* Integration lifecycle diagram */}
          <div className="mt-12" role="img" aria-label="Integration lifecycle: Travelbox provides traveller data to Travel Connect, which builds a quote request sent to insurance partner API. Confirmed quotes are written back to Travelbox. Policy conversion happens via partner portal.">
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
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">Insurance Partner API</p>
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
            <span aria-hidden="true">✓</span> <span className="font-semibold">Launched July 2024</span> — first feature live on Travel Connect. Training completion above 95%. Attachment rates climbed immediately, validating the platform for broader rollout.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 3 — THE OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div id="ins-outcome" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>

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
              <p className="mt-1 text-xs text-slate-500">Pilot-store extrapolation — attachment delta × avg premium</p>
            </div>
          </div>

          <div className="mt-10 max-w-2xl text-xs text-slate-500 space-y-1">
            <p className="font-semibold uppercase tracking-widest text-slate-500 mb-2">How we measured</p>
            <p>• Pilot cohort: 3 Flight Centre AU stores, selected for comparable booking volume</p>
            <p>• Baseline: 90-day pre-launch attachment rate for eligible itineraries at the same stores</p>
            <p>• Revenue model: directional — attachment delta × average premium, not finance-audited</p>
            <p>• Attribution limit: no control group; other seasonal or promotional factors not isolated</p>
          </div>

          {/* Before / after flow comparison — swimlane diagrams */}
          <div className="mt-16 space-y-12" role="img" aria-label="Before and after flow comparison. Before: 28 to 36 steps across Helio, a 3rd-party tool, and manual work including re-login, duplicate data entry, and context switching. After: 16 steps across Helio, Travel Connect, and partner portal with pre-filled data and automatic quote injection.">
            {/* BEFORE flow */}
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Before — 3 systems, 28–36 steps with re-login and manual re-entry</p>
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
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-emerald-600">After — unified flow, 16 steps with pre-filled data</p>
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
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-sky-600">Partner portal</p>
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

          <p className="mt-12 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Beyond the insurance numbers, the pilot proved the in-house build model and the API integration pattern that would scale to other verticals.
          </p>

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
      <div id="ins-reflection" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            What started as an insurance feature ended up reshaping how the team thought about the entire consultant platform.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">A vendor blocker turned into a platform bet</p>
              <p className="mt-1">We couldn't build inside Helio. Pitching Travel Connect as the alternative meant reframing a feature request as a platform investment — a harder sell internally, but it gave the team ownership of the front-end for the first time.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Real booking data exposed what mocks couldn't</p>
              <p className="mt-1">Prototyping with real booking scenarios revealed edge cases in pricing, traveller combinations, and policy rules that would have shipped as bugs with synthetic test data.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Phasing the dream unlocked the real win</p>
              <p className="mt-1">The vision was a fully embedded AI coverage assistant. By shipping the connected quoting flow first — deferring mid-trip modifications, multi-policy management, and AI-driven recommendations — we proved the business case quickly enough to secure investment in the broader platform.</p>
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
