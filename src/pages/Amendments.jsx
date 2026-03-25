import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

function Amendments() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])





  return (
    <section className="flex flex-col">

      {/* ════════════════════════════════════════════════════════════════
          HERO — Set up the problem, not the solution
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-200">
          <img
            src="/images/amendments/traveltourism-1.jpg"
            alt="Travel consultant and client with passports and boarding passes"
            className="h-full w-full object-cover object-left"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
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
          <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-16">
            <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
              <h1 className="text-4xl font-bold tracking-wide leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Fewer steps, more presence.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Redesigning the amendment workflow so 3,000+ consultants could focus on the customer, not the tool.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slim metadata bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold uppercase tracking-widest text-slate-400">Role</span>{' '}<span className="font-medium text-slate-600">Lead UX Designer</span>
            <span className="mx-2 text-slate-300" aria-hidden>·</span>
            <span className="font-semibold uppercase tracking-widest text-slate-400">Team</span>{' '}<span className="font-medium text-slate-600">PM, 2 UX, offshore dev, ops</span>
            <span className="mx-2 text-slate-300" aria-hidden>·</span>
            <span className="font-semibold uppercase tracking-widest text-slate-400">Duration</span>{' '}<span className="font-medium text-slate-600">~12 months, 2021–22</span>
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 1 — THE PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      {/* ── The problem ── */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            An amendment is any post-booking change — swapping a flight, extending a hotel, adding a car, updating traveller details — across five verticals (flights, hotels, cars, tours, insurance). Consultants were processing thousands a day through Helio, the internal front-end built on Codegen's Travelbox booking platform.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-2xl italic text-slate-800 md:text-3xl leading-snug">
              "I spend half the call fighting the tool. The customer's just… waiting."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Consultant, discovery workshop</footer>
          </blockquote>

          {/* Three bold baseline numbers */}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">13+</p>
              <p className="mt-2 text-sm text-slate-500">clicks per amendment</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">9</p>
              <p className="mt-2 text-sm text-slate-500">screens per change</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">10+ min</p>
              <p className="mt-2 text-sm text-slate-500">average handling time</p>
            </div>
          </div>

          {/* Prose — how we uncovered the depth */}
          <div className="mt-16 max-w-2xl space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed">
              Workshops with 60+ consultants across every brand revealed the same pattern — the same change re-keyed across multiple systems, near-zero automation, 30-second page loads eroding confidence, and legacy constraints blocking most proposed improvements.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Consultants had adapted to the pain, but the cost was invisible — longer calls, more errors, lower satisfaction. We used frequency-versus-friction analysis to prioritise which amendment types to tackle first.
            </p>
          </div>

          {/* Frequency × friction quadrant */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Frequency × friction prioritisation</p>
            <div className="grid grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              {/* Top-left: High frequency, low friction — not the priority */}
              <div className="border-r border-b border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">High frequency · Low friction</p>
                <p className="text-sm text-slate-400 italic">Quick wins — handled in business-as-usual</p>
              </div>

              {/* Top-right: High frequency, high friction — FOCUS */}
              <div className="border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">High frequency · High friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Usability (too many steps)', 'Refresh booking record (Flights)', 'Error messaging', 'Updating passenger details', 'Bulk amendments'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-red-700">▸ Tackled first</p>
              </div>

              {/* Bottom-left: Low frequency, low friction — parked */}
              <div className="border-r border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Low frequency · Low friction</p>
                <p className="text-sm text-slate-400 italic">Deprioritised</p>
              </div>

              {/* Bottom-right: Low frequency, high friction — monitor */}
              <div className="bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Low frequency · High friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Availability (Hotels)', 'Price fluctuations', 'Insurance', 'Amendment history'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-400">9 other issues parked for later</p>
              </div>
            </div>
            {/* Axis labels */}
            <div className="flex justify-between mt-2 text-xs font-semibold uppercase tracking-widest text-slate-400">
              <span>← Low friction</span>
              <span>High friction →</span>
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
            We knew what was broken. The question was how ambitious to be.
          </p>

          <div className="mt-12 max-w-2xl space-y-8">
            <div className="space-y-4">
              <p className="text-lg text-slate-600 leading-relaxed">
                The ideal solution was an AI-powered conversational flow — consultants describe the change in plain language, the system validates dependencies, surfaces pricing, and completes the amendment in one interaction. No screens, no clicks.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                But the legacy stack had no unified API across inventory systems, NLP wasn't production-ready for complex multi-component bookings, and consultants needed relief now — not a multi-year build.
              </p>
            </div>

            <p className="text-lg text-slate-600 leading-relaxed">
              We explored six directions and evaluated each against three criteria: <span className="font-medium text-slate-800">technical feasibility</span> within the legacy stack, <span className="font-medium text-slate-800">cognitive load</span> during a live customer call, and <span className="font-medium text-slate-800">dependency visibility</span> — could the consultant see cascading impacts before committing?
            </p>
          </div>

          {/* Concept evaluation matrix */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-400">Concept</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">Feasibility</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">Cognitive load</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">Dependency visibility</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {[
                  { name: 'AI conversational flow', scores: ['✗', '✓', '✗'], highlight: false },
                  { name: 'Single-page unified', scores: ['✗', '✗', '✓'], highlight: false },
                  { name: 'Inline edit', scores: ['✓', '✗', '✗'], highlight: false },
                  { name: 'Modal overlay', scores: ['✓', '✗', '✗'], highlight: false },
                  { name: 'Tool-led (vendor default)', scores: ['✓', '✗', '✗'], highlight: false },
                  { name: 'Three-page guided workflow', scores: ['✓', '✓', '✓'], highlight: true },
                ].map((row) => (
                  <tr key={row.name} className={`border-b border-slate-100 ${row.highlight ? 'bg-emerald-50' : ''}`}>
                    <td className={`py-3 pr-4 ${row.highlight ? 'font-semibold text-emerald-800' : 'text-slate-700'}`}>{row.name}</td>
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

        </div>
      </div>

      {/* ── Prototyping & testing ── */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h3 className="text-2xl font-semibold text-slate-900">Prototyping & testing</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Wireframes exposed that consultants needed to see dependency impacts before committing — not after. That insight reshaped the hi-fi into a preview-first confirmation pattern.
          </p>

          {/* Wireframes — 2-up, taller */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {[
              { src: '/images/amendments/amendment-wireframes-r16.png', label: 'Wireframes — dependency mapping' },
              { src: '/images/amendments/amendment-wiresframes2.png', label: 'Wireframes — step validation' },
            ].map((image) => (
              <div key={image.src} className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <img src={image.src} alt={image.label} className="h-64 w-full object-cover object-top" />
                <p className="px-4 py-2.5 text-xs font-medium text-slate-500">{image.label}</p>
              </div>
            ))}
          </div>

          {/* Hi-fi — full width, hero treatment */}
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 shadow-sm">
            <img src="/images/amendments/amendments-hifi.png" alt="Hi-fidelity — final flow" className="w-full object-cover object-top" />
            <p className="px-4 py-2.5 text-xs font-medium text-slate-500">Hi-fidelity — final three-page flow</p>
          </div>

          <p className="mt-10 max-w-2xl text-lg text-slate-600 leading-relaxed">
            We tested 15 amendment scenarios with 24 consultants — task-based flows, think-aloud sessions, and A/B comparisons against the legacy system. Consultants completed tasks successfully, but near-misses and workarounds surfaced in almost every session. Multi-component amendments (date change + hotel swap) exposed gaps in the dependency logic that would have shipped unnoticed.
          </p>

          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Pre-launch validation</p>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { value: '96%', label: 'Task success rate (n=24)' },
                { value: '4.5/5', label: 'Usability rating (n=24)' },
                { value: '~3 min', label: 'Avg task time (moderated)' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-slate-900 md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Delivery ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h3 className="text-2xl font-semibold text-slate-900">Shipping across time zones</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            After two rounds of misbuilt flows from written specs, I switched to annotated Figma prototypes with flowcharts, and short Loom walkthroughs for each flow — 3-minute videos that replaced 10-page documents and worked across the 5.5-hour time gap. Revision rounds per feature dropped roughly 60%.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            We ran a 2-week UAT pilot with 50 consultants, shipped high-impact verticals first in Australia, then expanded globally.
          </p>
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 max-w-2xl">
            ✓ <span className="font-semibold">On-time, zero downtime</span> — zero critical bugs at launch. UAT pilot scored 47/50 consultants ready to go live.
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
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>67%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Fewer screens</p>
              <p className="mt-1 text-xs text-slate-500">9 → 3 screens per change</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>89%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Consultant CSAT</p>
              <p className="mt-1 text-xs text-slate-500">Post-launch survey, n=200+</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>~75%</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Shorter handling time</p>
              <p className="mt-1 text-xs text-slate-500">10+ min → ~2.5 min AHT (FullStory)</p>
            </div>
          </div>

          {/* Before / after flow comparison */}
          <div className="mt-16 space-y-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Before — 9 screens, 13+ clicks</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Itinerary', 'Amend modal', 'Reason form', 'Search modal', 'Results', 'Cart', 'Travellers', 'Payment', 'Confirmation'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                      {step}
                    </div>
                    {i < 8 && <span className="text-slate-300 text-xs">→</span>}
                  </div>
                ))}
                <span className="ml-2 text-xs text-slate-400 italic">+ 30s loads between screens</span>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600">After — 3 screens, 6 clicks</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Search & Travellers', 'Results', 'Review & Confirm'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800">
                      {step}
                    </div>
                    {i < 2 && <span className="text-emerald-400 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <blockquote className="mt-12">
            <p className="text-xl italic text-slate-700 md:text-2xl">
              "I used to burn most of a call on the tool. Now I&apos;m present for the customer again."
            </p>
            <footer className="mt-2 text-sm font-medium text-slate-500">— Senior Travel Consultant, Melbourne</footer>
          </blockquote>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed">
              FullStory confirmed the shift at scale: clicks fell from 13+ to 6 per amendment, rage clicks dropped 82%, and page loads fell from 30 seconds to 9. Within 30 days, 94% of consultants had completed at least one amendment in the new flow.
            </p>
            <p className="text-sm italic text-slate-500">
              Validated double-digit labour cost reduction with ops finance. Full ROI and revenue attribution available on request.
            </p>
          </div>

          <div className="mt-16">
            <Link
              to="/stories/amendments/demo"
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
          <h3 className="text-2xl font-semibold text-slate-900">Reflection</h3>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            A 12-month offshore engagement taught me more about communication design than any UI project.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Offshore coordination was the defining constraint</p>
              <p className="mt-1">12+ hour feedback loops, context loss on edge cases, and 3-month delivery cycles limited iteration. Visual handoffs — annotated screenshots and flowcharts — became the default communication layer and compressed decision cycles.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Early workshops prevented months of rework</p>
              <p className="mt-1">The global discovery sessions surfaced edge cases and cross-brand differences we would have missed, and built consultant buy-in before a single screen was designed.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Dropping the AI ambition uncovered the real design problem</p>
              <p className="mt-1">The dream was an AI flow. The reality was a legacy stack. Accepting that early led to a simpler, shippable solution that still cut handling time by ~75%.</p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-sm italic text-slate-500">
            The AI "Dream Flow" later became the 2024 demo — showing what's now technically possible with modern tooling.
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

export default Amendments
