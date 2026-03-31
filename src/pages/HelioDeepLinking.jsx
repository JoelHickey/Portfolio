import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'
import { JoelAvatar } from '../components/JoelAvatar'

function HelioDeepLinking() {
  useEffect(() => {
    document.title = 'Deep Linking Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Deep linking case study">
      <CaseStudyNav sections={[
        { id: 'dl-problem', label: 'Problem' },
        { id: 'dl-strategy', label: 'Strategy' },
        { id: 'dl-design', label: 'Design' },
        { id: 'dl-delivery', label: 'Delivery' },
        { id: 'dl-outcome', label: 'Outcome' },
        { id: 'dl-reflection', label: 'Reflection' },
      ]} />

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-200">
          <img
            src="/images/deep-linking-hero.png"
            alt="Aerial view of a bridge stretching across turquoise ocean"
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
                One link, two philosophies.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Connecting Microsoft CRM to the booking platform so consultants stay with the customer, not the tool.
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
              <p className="mt-0.5 font-medium text-slate-700">3 months · 2023</p>
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
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">45s</p>
              <p className="mt-2 text-sm text-slate-500">Saved per transition</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">3,000+</p>
              <p className="mt-2 text-sm text-slate-500">Consultants connected</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">0</p>
              <p className="mt-2 text-sm text-slate-500">Manual navigation steps</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div id="dl-problem" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Travel consultants lived between two systems: Microsoft CRM for customer records, and Helio for booking and servicing. Every time a consultant needed to act on a booking, they'd manually navigate from CRM to Helio — re-finding the customer, re-locating the booking, and re-establishing context. Multiply that by thousands of transitions a day across 3,000+ consultants, and it was one of the biggest hidden drains on the network.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "I've got the customer on the phone, their record open in CRM, and I still have to go hunt for their booking in Helio."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Consultant, discovery session</footer>
          </blockquote>

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              The business wanted deep links — clickable connections from a CRM customer record directly into Helio. The design question was deceptively simple: <span className="font-medium text-slate-800">where should those links land?</span>
            </p>

        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          STRATEGY
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div id="dl-strategy" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The answer depended on a deeper question: should CRM ask users to choose their destination before leaving, or should Helio receive them and handle wayfinding from inside the product?
          </p>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I recommended a <span className="font-medium text-slate-800">single entry point</span> — one button in CRM that opens Helio with the customer context pre-loaded. The architectural team favoured <span className="font-medium text-slate-800">multiple CRM launch points</span> — separate buttons for flights, hotels, etc., each linking to a specific Helio screen. Both solved the problem. The trade-off was between a seamless product experience and long-term organisational flexibility.
          </p>

          {/* Concept evaluation */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th scope="col" className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-500">Approach</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Feels like one product</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Org flexibility</th>
                  <th scope="col" className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-500">Future-proofing</th>
                </tr>
              </thead>
              <tbody className="text-sm text-slate-600">
                {[
                  { name: 'Single Helio entry point (my proposal)', scores: ['✓', '✗', '○'], highlight: 'cyan' },
                  { name: 'Multiple CRM launch points (arch. direction)', scores: ['○', '✓', '✓'], highlight: 'violet' },
                  { name: 'Embedded Helio panel in CRM', scores: ['✓', '✗', '✗'], highlight: false },
                  { name: 'CRM-side task picker modal', scores: ['○', '○', '✗'], highlight: false },
                ].map((row) => (
                  <tr key={row.name} className={`border-b border-slate-100 ${row.highlight === 'cyan' ? 'bg-cyan-50' : row.highlight === 'violet' ? 'bg-violet-50' : ''}`}>
                    <th scope="row" className={`py-3 pr-4 text-left font-normal ${row.highlight === 'cyan' ? 'font-semibold text-cyan-800' : row.highlight === 'violet' ? 'font-semibold text-violet-800' : 'text-slate-700'}`}>{row.name}</th>
                    {row.scores.map((score, i) => (
                      <td key={i} className={`py-3 px-3 text-center ${score === '✓' ? 'text-emerald-600' : score === '○' ? 'text-amber-500' : 'text-slate-400'}`}>
                        <span className="text-base">{score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-500">✓ strong · ○ partial · ✗ weak</p>
          </div>

          {/* Two proposals side by side */}
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">My proposal</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Single entry into Helio</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-600">
                <li>One clear action in CRM — reduced decision cost at launch point</li>
                <li>Helio owns navigation, guiding from a coherent starting screen</li>
                <li>Lower risk of users choosing a path before they have product context</li>
                <li>Stronger sense of one connected end-to-end experience</li>
              </ul>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-700">Architectural direction</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Multiple CRM launch points</h3>
              <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-slate-600">
                <li>Task-specific entry points (flights, hotels, etc.) from CRM</li>
                <li>Buttons can be rerouted to different systems as the landscape evolves</li>
                <li>CRM positioned as a stable launchpad above underlying tools</li>
                <li>Optimised for flexibility — no dependency on Helio's internal structure</li>
              </ul>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              I mapped both patterns against consultant mental models from discovery sessions. Consultants who thought in <span className="font-medium text-slate-800">customer journeys</span> preferred a single entry point — they wanted to land in one place and orient from there. Consultants who thought in <span className="font-medium text-slate-800">task buckets</span> (flights, hotels, insurance) preferred direct links — they already knew where they were going.
            </p>

        </div>
      </div>

      <div id="dl-design" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Design</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I prototyped both approaches in Figma — the single-entry flow showing a Helio landing screen with contextual navigation, and the multi-entry flow showing CRM with task-specific buttons mapping to individual Helio screens.
          </p>

          {/* CRM → Helio screen mockups */}
          <p className="mt-10 max-w-2xl text-sm font-medium uppercase tracking-widest text-slate-400">Multi-entry flow — shipped design</p>
          <div className="mt-3 grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-start">
            {/* Screen 1: Microsoft CRM */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#2b579a]" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Entry point</span>
                <span className="text-[10px] text-slate-400">Microsoft CRM</span>
              </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm text-[13px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              <div className="bg-[#e8e8e8] pt-2.5 pb-0 px-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-end gap-0.5">
                  <div className="bg-white rounded-t-md px-3 py-1.5 text-[10px] text-slate-800 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#2b579a]/30" />
                    Dynamics 365
                    <span className="text-slate-400 text-[8px] ml-1">×</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#2b579a] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.9"/><rect x="8" y="1" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.6"/><rect x="1" y="8" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.6"/><rect x="8" y="8" width="5" height="5" rx="0.5" fill="white" fillOpacity="0.4"/></svg>
                  <span className="text-[11px] font-semibold text-white tracking-wide">Dynamics 365</span>
                  <span className="text-[11px] text-white/60 ml-1">Sales Hub</span>
                </div>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-white">JH</span>
                </div>
              </div>
              <div className="bg-[#f5f5f5] px-5 py-5">
                <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#2b579a]/10 flex items-center justify-center">
                      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="5" r="2.5" stroke="#2b579a" strokeWidth="1.2"/><path d="M3 12c0-2.2 1.8-4 4-4s4 1.8 4 4" stroke="#2b579a" strokeWidth="1.2"/></svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-slate-900">Sarah Mitchell</p>
                      <p className="text-[10px] text-slate-400">Contact · Active</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] mt-3 border-t border-slate-100 pt-3">
                    <div><span className="text-slate-400">Email</span><p className="text-slate-700">s.mitchell@email.com</p></div>
                    <div><span className="text-slate-400">Phone</span><p className="text-slate-700">+61 4XX XXX XXX</p></div>
                    <div><span className="text-slate-400">Booking ref</span><p className="text-slate-700 font-medium">FC-2023-84291</p></div>
                    <div><span className="text-slate-400">Status</span><p className="text-slate-700">Confirmed</p></div>
                  </div>
                </div>
                <div className="mt-3 bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-5 py-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-3">Open in Helio</p>
                  <div className="flex flex-wrap gap-2" aria-hidden="true">
                    {['Flights', 'Hotels', 'Insurance', 'Travellers'].map((label, i) => (
                      <span key={label} className={`rounded-md px-3 py-1.5 text-[11px] font-medium ${i === 0 ? 'bg-[#2b579a] text-white shadow-sm' : 'bg-slate-100 text-slate-600 border border-slate-200'}`}>
                        {label} <span className="text-[9px] ml-0.5">{i === 0 ? '→' : '↗'}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>

            {/* Connecting arrow — horizontal on lg, vertical on mobile */}
            <div className="flex flex-col items-center justify-center lg:hidden py-2" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 6v18" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M10 18l6 6 6-6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[9px] font-medium text-slate-400 uppercase tracking-wider">Deep link</span>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center self-center py-8" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M8 24h28" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M30 18l6 6-6 6" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="mt-1 text-[9px] font-medium text-slate-400 uppercase tracking-wider">Deep link</span>
            </div>

            {/* Screen 2: Helio */}
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#e10a0a]" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Destination</span>
                <span className="text-[10px] text-slate-400">Helio</span>
              </div>
            <div className="rounded-xl border border-slate-200 overflow-hidden shadow-sm text-[13px]" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
              <div className="bg-[#e8e8e8] pt-2.5 pb-0 px-3">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" />
                </div>
                <div className="flex items-end gap-0.5">
                  <div className="bg-[#d1d1d1] rounded-t-md px-3 py-1.5 text-[10px] text-slate-600 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-[#2b579a]/30" />
                    Dynamics 365
                    <span className="text-slate-400 text-[8px] ml-1">×</span>
                  </div>
                  <div className="bg-white rounded-t-md px-3 py-1.5 text-[10px] text-slate-800 flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-sm bg-red-400/30" />
                    Helio — Flights
                    <span className="text-slate-400 text-[8px] ml-1">×</span>
                  </div>
                </div>
              </div>
              <div className="bg-[#e10a0a] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                    <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1"/><circle cx="6" cy="4" r="1.5" fill="white"/><path d="M3 9.5c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="white" strokeWidth="0.8"/></svg>
                  </div>
                  <span className="text-[11px] font-bold text-white tracking-wide">FLIGHT CENTRE</span>
                  <span className="text-[11px] text-white/70 ml-1">Helio</span>
                </div>
                <JoelAvatar sizeClass="h-6 w-6" className="ring-2 ring-white" alt="" />
              </div>
              <div className="bg-[#f7f7f7] px-5 py-5">
                <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] px-5 py-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-slate-500">SM</span>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Sarah Mitchell</p>
                        <p className="text-[10px] text-slate-400">FC-2023-84291 · Bali · 10–18 May</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-medium text-emerald-700">Context loaded</span>
                  </div>
                  <div className="border-t border-slate-100 pt-3">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-2">Flight amendment</p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px]">
                      <div><span className="text-slate-400">Outbound</span><p className="text-slate-700">SYD → DPS · 10 May · QF43</p></div>
                      <div><span className="text-slate-400">Return</span><p className="text-slate-700">DPS → SYD · 18 May · QF44</p></div>
                      <div><span className="text-slate-400">Travellers</span><p className="text-slate-700">2 adults</p></div>
                      <div><span className="text-slate-400">Status</span><p className="text-slate-700 font-medium">Confirmed</p></div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1 bg-[#e10a0a] text-white text-[10px] font-semibold py-2 px-3 rounded-md text-center">Change flights</div>
                  <div className="flex-1 bg-white text-slate-600 text-[10px] font-medium py-2 px-3 rounded-md text-center border border-slate-200">View itinerary</div>
                </div>
              </div>
            </div>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">Simplified representation — CRM deep link opens Helio with the customer, booking, and flight context pre-loaded. No re-entry required.</p>

          <p className="mt-14 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Walkthrough sessions with consultants and stakeholders clarified where each model broke down. The single-entry approach felt more natural when consultants didn't know what task they needed yet — they wanted to see the customer's full picture first. The multi-entry approach was faster when the task was already clear — skip the landing, go straight to flights.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "Half the time I know exactly what I need. The other half, I need to see the booking first before I know what to do."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Senior consultant, prototype walkthrough</footer>
          </blockquote>

        </div>
      </div>

      <div id="dl-delivery" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The organisation chose the <span className="font-medium text-slate-800">multi-entry approach</span>. The architectural benefits — buttons that can be rerouted to new systems, clear team ownership, and no dependency on Helio's internal structure — aligned better with the enterprise strategy of keeping the CRM as a stable launch point above shifting underlying tools.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Delivery constraints shaped the decision as much as design rationale. The CRM team operated on fixed 3-month delivery cycles with dependencies on CodeGen for any changes — meaning anything that required CRM-side work had a hard ceiling on complexity and turnaround. The multi-entry approach fit within those constraints; the single-entry model I'd recommended would have required deeper CRM integration that the timeline and dependencies couldn't absorb.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            My role was to articulate the UX trade-off clearly enough that the decision was made intentionally, not by default. The architectural team understood the user cost — and accepted it as a conscious trade-off for long-term platform flexibility.
          </p>
          <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800 max-w-2xl">
            <span className="font-semibold">Direction adopted:</span> Multiple CRM launch points with task-specific deep links into Helio. Customer context passed automatically; graceful fallbacks for invalid or expired links.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div id="dl-outcome" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Deep linking eliminated the manual system-switching ritual entirely. Customer context — booking ID, traveller details — flows directly from CRM into Helio in one click. Across 3,000+ consultants making this jump daily, that's hundreds of hours reclaimed per week for customer-facing work.
          </p>

          {/* Before / after flow comparison */}
          <div className="mt-16 space-y-8" role="group" aria-label="Before and after flow comparison. Before: 7 steps with manual navigation. After: 4 steps with deep linking.">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Before — manual navigation</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Customer record (CRM)', 'Copy booking ID', 'Open Helio', 'Search customer', 'Find booking', 'Navigate to task', 'Begin work'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                      {step}
                    </div>
                    {i < 6 && <span className="text-slate-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
                <span className="ml-2 text-xs text-slate-500 italic">+ context loss, tab switching, memory load</span>
              </div>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-emerald-600">After — deep linked</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Customer record (CRM)', 'Click deep link', 'Land in Helio with context', 'Begin work'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 text-xs text-emerald-800">
                      {step}
                    </div>
                    {i < 3 && <span className="text-emerald-400 text-xs" aria-hidden="true">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-12 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              The multi-entry approach means Helio isn't the only possible destination — the same pattern can extend to Travel Connect and future platforms without changing the CRM experience.
            </p>
        </div>
      </div>

      {/* ── Reflection ── */}
      <div id="dl-reflection" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            A navigation design project that turned into a lesson about systems thinking, organisational incentives, and the difference between the best UX answer and the best enterprise answer.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Experience design is also systems design</p>
              <p className="mt-1">Navigation decisions are never just UI choices. They expose ownership boundaries, platform strategy, and future governance needs. Where a link lands is an architectural statement about who controls the user's path.</p>
            </div>
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Good design rationale still matters when you don't win</p>
              <p className="mt-1">Clearly articulating the user cost of the chosen direction helped the team make an intentional trade-off rather than a default one. The architectural team knew exactly what they were trading away — and designed mitigations for the UX gaps. In enterprise environments, the best design doesn't win on merit alone — delivery cycles, team dependencies, and organisational ownership all shape what's possible. Understanding those constraints early is as important as the design work itself.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">The right answer depends on user intent — and organisational intent</p>
              <p className="mt-1">Consultants with clear tasks preferred direct links. Consultants exploring preferred a unified entry. The enterprise preferred the pattern that decoupled systems. All three were defensible — the design skill was mapping the trade-offs, not just picking one.</p>
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

export default HelioDeepLinking
