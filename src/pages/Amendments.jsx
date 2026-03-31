import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

function Amendments() {
  useEffect(() => {
    document.title = 'Amendments Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])


  return (
    <section className="flex flex-col" aria-label="Amendments case study">
      <CaseStudyNav sections={[
        { id: 'amend-problem', label: 'Problem' },
        { id: 'amend-strategy', label: 'Strategy' },
        { id: 'amend-prototyping', label: 'Design' },
        { id: 'amend-delivery', label: 'Delivery' },
        { id: 'amend-outcome', label: 'Outcome' },
        { id: 'amend-reflection', label: 'Reflection' },
      ]} />

      {/* ════════════════════════════════════════════════════════════════
          HERO — Set up the problem, not the solution
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-200">
          <img
            src="/images/amendments/airport-departures.png"
            alt="Airport departure board showing flight statuses"
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

      {/* Metadata bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">Senior UI/UX Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Company</p>
              <p className="mt-0.5 font-medium text-slate-700">Flight Centre Travel Group</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">12 months · 2021–22</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">Dedicated cross-functional team</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key results */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">75%</p>
              <p className="mt-2 text-sm text-slate-500">Shorter handling time</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">89%</p>
              <p className="mt-2 text-sm text-slate-500">Consultant satisfaction</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">40%</p>
              <p className="mt-2 text-sm text-slate-500">Fewer error escalations</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Problem ── */}
      <div id="amend-problem" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            An amendment is any post-booking change — a different flight, a longer hotel stay, a new car, updated traveller details. Consultants were handling thousands a day through Helio, the internal booking tool built on a vendor-managed system called Travelbox. Every extra minute on the tool was a minute not spent selling, rebooking, or retaining a customer.
          </p>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
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

          <p className="mt-16 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Workshops with 60+ consultants revealed the same pattern everywhere: re-keying changes across systems, 30-second page loads, and no automation. We mapped frequency against friction to prioritise what to fix first.
          </p>

          {/* Frequency × friction quadrant */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Frequency × friction prioritisation</p>
            <div
              className="grid grid-cols-2 rounded-xl border border-slate-200 overflow-hidden"
              aria-label="Frequency versus friction prioritisation matrix"
            >
              {/* Top-left: High frequency, low friction — not the priority */}
              <div className="border-r border-b border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">High frequency · Low friction</p>
                <p className="text-sm text-slate-500 italic">Quick wins — handled in business-as-usual</p>
              </div>

              {/* Top-right: High frequency, high friction — FOCUS */}
              <div className="border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-700 mb-3">High frequency · High friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Usability (too many steps)', 'Refresh booking record (Flights)', 'Error messaging', 'Updating passenger details', 'Bulk amendments'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs font-semibold text-red-700"><span aria-hidden="true">▸</span> Tackled first</p>
              </div>

              {/* Bottom-left: Low frequency, low friction — parked */}
              <div className="border-r border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Low frequency · Low friction</p>
                <p className="text-sm text-slate-500 italic">Deprioritised</p>
              </div>

              {/* Bottom-right: Low frequency, high friction — monitor */}
              <div className="bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-3">Low frequency · High friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Availability (Hotels)', 'Price fluctuations', 'Insurance', 'Amendment history'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-slate-500">9 other issues parked for later</p>
              </div>
            </div>
            {/* Axis labels */}
            <div className="flex justify-between mt-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
              <span><span aria-hidden="true">←</span> Low friction</span>
              <span>High friction <span aria-hidden="true">→</span></span>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          STRATEGY
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div id="amend-strategy" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The ideal solution was a conversational AI — describe the change, the system handles the rest. But the legacy stack had no unified API, language processing wasn't production-ready for complex bookings, and consultants needed relief now.
          </p>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            We explored six directions and evaluated each against three criteria: <span className="font-medium text-slate-800">technical feasibility</span> within the legacy stack, whether it was <span className="font-medium text-slate-800">easy to use on a live call</span>, and whether it <span className="font-medium text-slate-800">showed knock-on effects</span> before the consultant committed.
          </p>

          {/* Concept evaluation matrix */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs" aria-label="Concept evaluation comparing six approaches">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-500">Concept</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Feasibility</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Easy on a live call</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Shows knock-on effects</th>
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
                    <th
                      scope="row"
                      className={`py-3 pr-4 text-left ${row.highlight ? 'font-semibold text-emerald-800' : 'font-normal text-slate-700'}`}
                    >
                      {row.name}
                    </th>
                    {row.scores.map((score, i) => (
                      <td key={i} className={`py-3 px-3 text-center ${score === '✓' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        <span className="text-base">{score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The three-page guided workflow was the only option that scored across all three.
          </p>

          {/* Three-page workflow structure */}
          <div className="mt-12" role="img" aria-label="Three-page guided workflow: page one is Search and Travellers, page two is Results with dependency flags, page three is Review and Confirm.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Workflow structure</p>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
              <div className="min-w-[480px] flex items-stretch">
                <div className="flex-1 border-r border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-700">1</span>
                    <p className="text-[11px] font-semibold text-slate-700">Search & Travellers</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Select amendment type, update traveller details, set search criteria — all on one page instead of four.</p>
                </div>
                <div className="flex-1 border-r border-slate-200 px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-700">2</span>
                    <p className="text-[11px] font-semibold text-slate-700">Results & Dependencies</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Available options with cascading impacts flagged upfront — price changes, blocked segments, affected items.</p>
                </div>
                <div className="flex-1 px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-[10px] font-bold text-emerald-700">3</span>
                    <p className="text-[11px] font-semibold text-slate-700">Review & Confirm</p>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">Full summary of changes, cost difference, and downstream effects before committing.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Prototyping & testing ── */}
      <div id="amend-prototyping" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Design</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Early wireframes revealed the key insight: consultants needed to see what else would break before committing a change — not after. That finding drove every subsequent design decision.
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

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            We tested 15 scenarios with 24 consultants across 3 brands. Multi-component changes (date change + hotel swap) exposed gaps — the preview step didn't flag cascading price impacts until we added "affected items" chips. Those findings became acceptance criteria before handoff.
          </p>

          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Pre-launch validation</p>
            <div className="grid gap-8 sm:grid-cols-3">
              {[
                { value: '96%', label: 'Task success rate (n=24)' },
                { value: '4.5/5', label: 'Usability rating (n=24)' },
                { value: '3 min', label: 'Avg task time (moderated)' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-slate-900 md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">Moderated sessions, randomised task order. Usability: custom 5-point scale ("How confident would you feel using this on a live call?"), 24 participants across 3 brands.</p>
          </div>

          <div className="mt-14">
            <Link
              to="/stories/amendments/demo"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try the interactive demo →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Delivery ── */}
      <div id="amend-delivery" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The PM wanted to ship all five booking types at once. I pushed back — dependency logic differed enough that shipping together would multiply edge cases. We aligned on a phased rollout: flights first (highest volume), then hotels and cars, with tours and insurance deferred to v2.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            After two rounds of misbuilt flows from written specs, I switched to annotated Figma prototypes and 3-minute Loom walkthroughs — replacing 10-page documents and bridging the 5.5-hour time gap with the offshore team. Over 40 walkthroughs and 120+ annotated screens. Revision rounds dropped from 4 to 1.5 per feature.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            We piloted with 50 consultants across 3 AU markets for 2 weeks, shipped flights first, then expanded to hotels, cars, and additional regions over the following months.
          </p>
          <div className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 max-w-2xl">
            <span aria-hidden="true">✓</span> <span className="font-semibold">On-time, zero downtime</span> — no critical bugs in first 30 days. Pilot scored 47/50 consultants ready to go live.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div id="amend-outcome" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            FullStory session data confirmed the shift at scale: clicks fell from 13+ to 6, frustration signals dropped 82%, and page loads went from 30 seconds to 9. Within 30 days, 94% of consultants had adopted the new flow — freeing up hours per day across the network for revenue-generating work.
          </p>

          {/* Before / after flow comparison */}
          <div className="mt-16 space-y-8" role="group" aria-label="Before and after flow comparison. Before: 9 screens and 13+ clicks. After: 3 screens and 6 clicks.">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Before — 9 screens, 13+ clicks</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Itinerary', 'Amend modal', 'Reason form', 'Search modal', 'Results', 'Cart', 'Travellers', 'Payment', 'Confirmation'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                      {step}
                    </div>
                    {i < 8 && <span className="text-slate-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
                <span className="ml-2 text-xs text-slate-500 italic">+ 30s loads between screens</span>
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
                    {i < 2 && <span className="text-emerald-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <blockquote className="mt-12 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "I used to burn most of a call on the tool. Now I&apos;m present for the customer again."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Senior Travel Consultant, Melbourne</footer>
          </blockquote>

          <div className="mt-10 max-w-2xl text-xs text-slate-500 space-y-1">
            <p className="font-semibold uppercase tracking-widest text-slate-500 mb-2">How we measured</p>
            <p>• Handling time: FullStory session timing, same amendment types (flight date change, hotel extension), 30-day pre/post window across AU pilot stores</p>
            <p>• Satisfaction: post-task pulse survey ("How satisfied are you with the new amendment flow?"), 5-point scale, sent at session end — 200+ responses, 65% response rate</p>
            <p>• Labour savings: handling-time reduction × daily amendment volume × loaded cost per minute — validated with ops finance; figure under NDA, methodology available in interview</p>
          </div>

        </div>
      </div>

      {/* ── Reflection ── */}
      <div id="amend-reflection" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            A 12-month offshore engagement taught me more about shipping through organisational complexity than any UI project.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Offshore coordination was the defining constraint</p>
              <p className="mt-1">12+ hour feedback loops and 3-month delivery cycles limited iteration. Visual handoffs — annotated screenshots and flowcharts — became the communication layer that compressed decision cycles.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Early workshops prevented months of rework</p>
              <p className="mt-1">Discovery sessions surfaced edge cases and cross-brand differences we'd have missed, and built consultant buy-in before a single screen was designed.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Dropping the AI ambition uncovered the real design problem</p>
              <p className="mt-1">Accepting the legacy constraints early led to a simpler solution that still cut handling time by 75% — shipping speed more than offset the features we deferred.</p>
            </div>
            <div className="border-l-2 border-red-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">What I'd do differently</p>
              <p className="mt-1">I'd bring engineering into feasibility checkpoints earlier — before hi-fi, not after. Two rounds of misbuilt flows could have been one if I'd paired with the tech lead on edge cases sooner. I'd also instrument the pilot more deliberately — we measured readiness but missed time-on-task data that would have strengthened the business case.</p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-sm tracking-wide text-slate-600 leading-relaxed">
            The communication layer — visual handoffs, Loom walkthroughs, edge-case libraries — became the team's default operating model, outlasting the project. The AI "Dream Flow" I'd originally scoped became a 2024 internal demo showing what the same workflow could look like with modern tooling — the strategic seed planted during this project.
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
