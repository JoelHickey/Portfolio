import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'
import { TravelConnectTierComparisonMock } from '../insurance/TravelConnectTierComparisonMock'

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
        { id: 'ins-prototyping', label: 'Design' },
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
                Coverage woven into the journey.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                A new in-house quoting platform for Travel Consultants.
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
              <p className="mt-0.5 font-medium text-slate-700">9 months · 2024</p>
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
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">+45%</p>
              <p className="mt-2 text-sm text-slate-500">Insurance attachment</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">30s</p>
              <p className="mt-2 text-sm text-slate-500">To add coverage (from 5–8 min)</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">$2.4M</p>
              <p className="mt-2 text-sm text-slate-500">Estimated annual revenue lift (pilot)</p>
            </div>
          </div>
        </div>
      </div>



      {/* ════════════════════════════════════════════════════════════════
          ACT 1 — THE PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div id="ins-problem" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Adding insurance meant leaving the booking platform, re-entering customer data in a separate tool, and copying the quote back by hand — then, back in Helio, keying a manual line item and often stepping through checkout (cart, travellers, payment) before coverage sat on the booking. Most consultants didn't bother — leaving insurance revenue uncaptured on nearly every booking.
          </p>

          {/* Old flow — railway tracks diagram */}
          <div className="mt-10 overflow-x-auto" role="img" aria-label="Old insurance flow: start on booking in Helio, open Cover-More or similar in another tab, re-enter trip and customer data, get a quote, return to Helio to enter the manual insurance line, then checkout on Helio before the quote is on the booking.">
            <svg viewBox="0 0 780 130" className="w-full max-w-2xl" style={{ minWidth: '480px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Helio track — dashed idle line */}
              <line x1="182" y1="32" x2="635" y2="32" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4" />

              {/* 3rd party connectors between boxes */}
              <line x1="265" y1="98" x2="280" y2="98" stroke="#fcd34d" strokeWidth="1.5" />
              <line x1="375" y1="98" x2="390" y2="98" stroke="#fcd34d" strokeWidth="1.5" />
              <line x1="500" y1="98" x2="515" y2="98" stroke="#fcd34d" strokeWidth="1.5" />

              {/* Curved switches — S-curves, horizontal at both ends */}
              <path d="M182,32 L196,32 C212,32 194,98 210,98" stroke="#94a3b8" strokeWidth="1.5" />
              <path d="M590,98 L604,98 C620,98 617,32 635,32" stroke="#94a3b8" strokeWidth="1.5" />

              {/* Lane labels */}
              <text x="4" y="36" fontSize="10" fontWeight="600" letterSpacing="0.05em" fill="#64748b">HELIO</text>
              <text x="4" y="102" fontSize="10" fontWeight="600" letterSpacing="0.05em" fill="#d97706">3RD PARTY</text>

              {/* Helio steps */}
              <rect x="72" y="18" width="110" height="28" rx="5" fill="#f1f5f9" />
              <text x="127" y="37" textAnchor="middle" fontSize="11" fill="#475569">Start on booking</text>

              <rect x="635" y="18" width="138" height="28" rx="5" fill="#f1f5f9" />
              <text x="704" y="37" textAnchor="middle" fontSize="11" fill="#475569">Checkout + on booking</text>

              {/* 3rd party steps */}
              <rect x="210" y="84" width="55" height="28" rx="5" fill="#fffbeb" stroke="#fcd34d" />
              <text x="237" y="103" textAnchor="middle" fontSize="11" fill="#92400e">Log in</text>

              <rect x="280" y="84" width="95" height="28" rx="5" fill="#fffbeb" stroke="#fcd34d" />
              <text x="327" y="103" textAnchor="middle" fontSize="11" fill="#92400e">Re-enter trip</text>

              <rect x="390" y="84" width="110" height="28" rx="5" fill="#fffbeb" stroke="#fcd34d" />
              <text x="445" y="103" textAnchor="middle" fontSize="11" fill="#92400e">Re-enter customer</text>

              <rect x="515" y="84" width="75" height="28" rx="5" fill="#fffbeb" stroke="#fcd34d" />
              <text x="552" y="103" textAnchor="middle" fontSize="11" fill="#92400e">Get quote</text>
            </svg>
          </div>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "By the time I've switched systems and worked out the premium, the customer's already lost interest."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Travel consultant, baseline research</footer>
          </blockquote>

        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 2 — THE CRAFT
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div id="ins-strategy" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The obvious answer was to build insurance directly into Helio. But Helio was vendor-managed — any change meant going through an external dev team, adding cost and dependency.
          </p>

          <p className="mt-10 max-w-2xl text-sm font-medium uppercase tracking-widest text-slate-400">Concept evaluation</p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs" aria-label="Concept evaluation comparing four approaches">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-500">Approach</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Feasibility</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Data carries over</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Feels like one tool</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Platform strategy</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {[
                  { name: 'AI coverage assistant', scores: ['✗', '✗', '✓', '✗'], highlight: false },
                  { name: 'Build within Helio (vendor)', scores: ['✗', '✓', '✓', '✗'], highlight: false },
                  { name: 'Third-party tool (status quo)', scores: ['✓', '✗', '✗', '✗'], highlight: false },
                  { name: 'Travel Connect (new tab, data-linked)', scores: ['✓', '✓', '✗', '✓'], highlight: true },
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

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            We landed on a different path: build the insurance experience on a new in-house platform, <span className="font-medium text-slate-800">Travel Connect</span>, and use insurance as the pilot to prove it could eventually replace Helio entirely. The trade-off was opening a new tab — but with booking data pre-filled and the confirmed quote writing back into the booking system, the flow was still dramatically faster.
          </p>

          {/* Platform handoff diagram */}
          <div className="mt-12" role="img" aria-label="Platform handoff: Helio opens Travel Connect in a new tab. Booking data flows right via API, confirmed quote flows back left.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Platform handoff</p>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="flex items-stretch">
                  {/* Left: Legacy stack */}
                  <div className="w-[200px] shrink-0 border-r border-slate-200">
                    <div className="px-4 py-3 border-b border-slate-200 bg-slate-50">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Helio</p>
                      <p className="text-[9px] text-slate-500">Consultant front-end</p>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-100">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Travelbox</p>
                      <p className="text-[9px] text-slate-500">Booking engine (vendor)</p>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-[9px] text-slate-400 text-center">Vendor-managed · external dev team</p>
                    </div>
                  </div>

                  {/* Center: Data flow */}
                  <div className="flex-1 flex flex-col justify-center items-center px-4 min-w-[120px] py-4 gap-3">
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex-1 border-t border-emerald-300" />
                      <span className="text-[10px] text-emerald-500">→</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-medium text-center">Travellers + trip data</p>

                    <div className="flex items-center gap-2 w-full mt-1">
                      <span className="text-[10px] text-emerald-500">←</span>
                      <div className="flex-1 border-t border-emerald-300" />
                    </div>
                    <p className="text-[10px] text-emerald-700 font-medium text-center">Confirmed quote</p>
                  </div>

                  {/* Right: Travel Connect */}
                  <div className="w-[200px] shrink-0 border-l border-slate-200">
                    <div className="px-4 py-3 border-b border-emerald-200 bg-emerald-50">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Travel Connect</p>
                      <p className="text-[9px] text-emerald-500">New in-house platform</p>
                    </div>
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex gap-1">
                        {['Basic', 'Standard', 'Premium'].map((tier) => (
                          <span key={tier} className="rounded border border-emerald-200 bg-emerald-50 px-1.5 py-0.5 text-[9px] font-medium text-emerald-700">{tier}</span>
                        ))}
                      </div>
                      <p className="text-[9px] text-slate-500 mt-1.5">Real-time pricing · 3 tiers</p>
                    </div>
                    <div className="px-4 py-2">
                      <p className="text-[9px] text-emerald-600 text-center font-medium">In-house · platform pilot</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Design ── */}
      <div id="ins-prototyping" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Design</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Booking data pre-fills automatically from Helio — trip details, traveller info, dates — removing manual re-entry and the errors that came with it. Consultants run a search from that linked context, see all three coverage tiers with pricing side-by-side, add the chosen tier to Helio, get an on-platform confirmation in Travel Connect, then switch back to Helio and refresh to see coverage on the itinerary while the confirmed quote writes back to the booking.
          </p>

          {/* New flow — two-track railway diagram */}
          <div className="mt-10 overflow-x-auto" role="img" aria-label="New insurance flow: start on booking in Helio, open Travel Connect with data pre-filled, search quotes, compare tiers, add to Helio, see success in Travel Connect, switch to Helio tab and refresh to see quote on booking.">
            <svg viewBox="0 0 780 130" className="w-full max-w-2xl" style={{ minWidth: '480px' }} fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Helio track */}
              <line x1="182" y1="32" x2="543" y2="32" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 4" />
              <line x1="618" y1="32" x2="635" y2="32" stroke="#cbd5e1" strokeWidth="1.5" />

              {/* Travel Connect connectors between boxes */}
              <line x1="268" y1="98" x2="273" y2="98" stroke="#6ee7b7" strokeWidth="1.5" />
              <line x1="341" y1="98" x2="346" y2="98" stroke="#6ee7b7" strokeWidth="1.5" />
              <line x1="418" y1="98" x2="423" y2="98" stroke="#6ee7b7" strokeWidth="1.5" />
              <line x1="481" y1="98" x2="486" y2="98" stroke="#6ee7b7" strokeWidth="1.5" />

              {/* Curved switches */}
              <path d="M182,32 L196,32 C212,32 194,98 210,98" stroke="#6ee7b7" strokeWidth="1.5" />
              <path d="M528,98 L542,98 C558,98 548,32 543,32" stroke="#6ee7b7" strokeWidth="1.5" />

              {/* Lane labels */}
              <text x="4" y="36" fontSize="10" fontWeight="600" letterSpacing="0.05em" fill="#64748b">HELIO</text>
              <text x="4" y="102" fontSize="10" fontWeight="600" letterSpacing="0.05em" fill="#059669">TRAVEL CONNECT</text>

              {/* Helio steps */}
              <rect x="72" y="18" width="110" height="28" rx="5" fill="#f1f5f9" />
              <text x="127" y="37" textAnchor="middle" fontSize="11" fill="#475569">Start on booking</text>

              <rect x="543" y="18" width="75" height="28" rx="5" fill="#f1f5f9" />
              <text x="580" y="37" textAnchor="middle" fontSize="11" fill="#475569">Refresh tab</text>

              <rect x="635" y="18" width="115" height="28" rx="5" fill="#f1f5f9" />
              <text x="692" y="37" textAnchor="middle" fontSize="11" fill="#475569">Quote on booking</text>

              {/* Travel Connect steps */}
              <rect x="210" y="84" width="58" height="28" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
              <text x="239" y="103" textAnchor="middle" fontSize="10" fill="#065f46">Pre-fill</text>

              <rect x="273" y="84" width="68" height="28" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
              <text x="307" y="103" textAnchor="middle" fontSize="10" fill="#065f46">Search</text>

              <rect x="346" y="84" width="72" height="28" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
              <text x="382" y="103" textAnchor="middle" fontSize="10" fill="#065f46">Compare</text>

              <rect x="423" y="84" width="58" height="28" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
              <text x="452" y="103" textAnchor="middle" fontSize="10" fill="#065f46">Add Helio</text>

              <rect x="486" y="84" width="42" height="28" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
              <text x="507" y="103" textAnchor="middle" fontSize="10" fill="#065f46">OK</text>
            </svg>
          </div>
          <p className="mt-3 max-w-2xl text-xs text-slate-500 leading-relaxed">
            <span className="font-medium text-slate-700">OK</span> is the in-tab confirmation (insurance added successfully) before switching back to Helio — the interactive demo shows that screen after <span className="font-medium text-slate-700">Add to HELIO</span>.
          </p>

          <p className="mt-10 max-w-2xl text-sm font-medium uppercase tracking-widest text-slate-400">Tier comparison — shipped product</p>
          <div className="mt-3 max-w-3xl" role="img" aria-label="Travel Connect tier comparison screen showing Bronze, Silver, and Gold coverage options side-by-side with pricing">
            <TravelConnectTierComparisonMock />
            <p className="mt-2 text-[11px] text-slate-500">
              Simplified representation of the shipped product — 10 of 30+ coverage rows shown. The{' '}
              <Link to="/stories/insurance/demo" className="font-medium text-slate-700 underline decoration-slate-400 underline-offset-2 hover:text-slate-900">
                interactive demo
              </Link>{' '}
              opens with the same Flight Centre chrome and card layout for the search step, then this comparison after quotes load. “Refine quote” deep-links to the insurance partner&apos;s portal for edge-case customisation and policy conversion.
            </p>
          </div>

          {/* Testing results */}
          <p className="mt-14 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I ran moderated testing with consultants across brands and regions, comparing the new flow against the old tool on the same booking tasks one week apart.
          </p>

          <div className="mt-12">
            <div className="grid gap-10 sm:grid-cols-3">
              {[
                { value: '27–36 → 16', label: 'Combined clicks in moderated testing' },
                { value: '27 → 90', label: 'Usability score (out of 100)' },
                { value: '5/5', label: 'Would use it for real work' }
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl font-semibold text-slate-900 md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-14 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "The fact that I don't have to do 27 clicks to load this into the quote is a win."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Travel consultant, usability testing</footer>
          </blockquote>

          <div className="mt-14">
            <Link
              to="/stories/insurance/demo"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try the interactive demo →
            </Link>
          </div>

          <div className="mt-6 max-w-2xl rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600 leading-relaxed shadow-sm">
            <p className="font-semibold text-slate-800">What the demo does (aligned with this page)</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
              <li>
                <span className="font-medium text-slate-800">Legacy</span> — Helio manual insurance line, Cover-More in a second tab with re-keyed trip and customer fields, short loading beats, then{' '}
                <span className="font-medium text-slate-800">Add to cart</span> and Helio checkout (cart → travellers → payment) before coverage shows on the itinerary alongside a compact outcome recap.
              </li>
              <li>
                <span className="font-medium text-slate-800">Travel Connect</span> — Tab and quote loading states, search screen in the same UI family as the tier view, comparison and{' '}
                <span className="font-medium text-slate-800">Add to HELIO</span>, success message in Travel Connect, then Helio with insurance on the itinerary and the same style of recap.
              </li>
            </ul>
          </div>

          <p className="mt-14 max-w-2xl text-sm text-slate-500 leading-relaxed">
            One trade-off we couldn't avoid: consultants still had to manually refresh the Helio tab to see the confirmed quote. Fixing that required changes to the booking system we didn't control, but even with that friction the flow was dramatically faster.
          </p>
        </div>
      </div>

      {/* ── Delivery ── */}
      <div id="ins-delivery" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Three systems owned by different teams, each with their own constraints and release cycles. Any one of them could block the launch independently.
          </p>

          {/* Integration lifecycle diagram */}
          <div className="mt-10" role="img" aria-label="Integration lifecycle: Travelbox provides traveller data to Travel Connect, which builds a quote request sent to insurance partner API. Confirmed quotes are written back to Travelbox. Policy conversion happens via partner portal.">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Integration lifecycle</p>
            <div className="rounded-xl border border-slate-200 bg-white overflow-x-auto">
              <div className="min-w-[520px]">
                {/* System headers */}
                <div className="grid grid-cols-3 border-b border-slate-200">
                  <div className="px-4 py-3 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Travelbox</p>
                    <p className="text-[9px] text-slate-500">Booking engine behind Helio</p>
                  </div>
                  <div className="px-4 py-3 border-r border-slate-200 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-600">Travel Connect</p>
                    <p className="text-[9px] text-emerald-500">Quoting front-end</p>
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
                    <div className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] text-sky-700 text-center w-full">Return 3-tier prices</div>
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
                {/* Refine phase */}
                <div className="grid grid-cols-3 border-b border-slate-100">
                  <div className="px-3 py-3 border-r border-slate-100" />
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-500">Refine</p>
                    <div className="rounded border border-emerald-200 bg-emerald-50 px-2 py-1 text-[10px] text-emerald-700 text-center w-full">Deep link to partner</div>
                    <span className="text-[10px] text-sky-400">→</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center">
                    <div className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] text-sky-700 text-center w-full">Customise in partner portal</div>
                  </div>
                </div>
                {/* Policy phase */}
                <div className="grid grid-cols-3">
                  <div className="px-3 py-3 border-r border-slate-100" />
                  <div className="px-3 py-3 border-r border-slate-100 flex flex-col items-center justify-center gap-1.5">
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-sky-500">Policy</p>
                    <span className="text-[10px] text-sky-400">→</span>
                  </div>
                  <div className="px-3 py-3 flex items-center justify-center">
                    <div className="rounded border border-sky-200 bg-sky-50 px-2 py-1 text-[10px] text-sky-700 text-center w-full">Accept & convert policy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The insurance partner already had a portal we could have pointed consultants to — faster to ship, but it would have meant no control over the quoting experience. I walked both teams through the data needs and long-term vision until we agreed: we build the core quoting flow in-house, with the partner portal handling refinement and policy conversion via deep link.
          </p>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The first engineering review surfaced pricing edge cases, a wrong assumption about cancellation data, and a screen I'd designed as if the response was instant when it wasn't. I revised and added a state diagram for the quote lifecycle. Revision rounds dropped from three to one.
          </p>
          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 max-w-2xl">
            <span aria-hidden="true">✓</span> <span className="font-semibold">Launched July 2024</span> — controlled rollout to pilot stores. Training completion above 95%.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          ACT 3 — THE OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div id="ins-outcome" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Pilot stores saw a +45% lift in insurance attachment, quoting dropped from minutes to 30 seconds, and the projected annual revenue uplift was $2.4M.
          </p>
          <div className="mt-10 max-w-2xl text-xs text-slate-500 space-y-1">
            <p className="font-semibold uppercase tracking-widest text-slate-500 mb-2">How we measured</p>
            <p>• Pilot cohort: 3 Flight Centre AU stores, selected for comparable booking volume</p>
            <p>• Baseline: 90-day pre-launch attachment rate for eligible itineraries at the same stores</p>
            <p>• Revenue model: directional — based on the increase in insurance sales × average premium, not finance-audited</p>
            <p>• Attribution limit: no control group; other seasonal or promotional factors not isolated</p>
          </div>
        </div>
      </div>

      {/* ── Reflection ── */}
      <div id="ins-reflection" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            What started as an insurance feature ended up reshaping how the team thought about the entire consultant platform.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">A vendor blocker turned into a platform bet</p>
              <p className="mt-1">Reframing a feature request as a platform investment was a harder sell, but it shifted the business from paying for every change to owning the roadmap — reducing long-term vendor dependency.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Usability testing changed the spec, not just the design</p>
              <p className="mt-1">Consultants uncovered scenarios we hadn't anticipated — multi-policy bookings, last-minute date changes — that reshaped requirements before engineering started.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Insurance was the Trojan horse</p>
              <p className="mt-1">A single product — insurance — justified building Travel Connect. Once live, the same infrastructure unlocked payments, extras, and a roadmap to replace Helio entirely.</p>
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
                  <p className="text-[9px] text-slate-500">Insurance pilot (formerly "Payments Platform")</p>
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
