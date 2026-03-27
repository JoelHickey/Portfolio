import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

function HelioDeepLinking() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Deep linking case study">

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-950">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.25), transparent 30%), radial-gradient(circle at 80% 35%, rgba(129, 140, 248, 0.28), transparent 30%), linear-gradient(135deg, #020617 0%, #0f172a 38%, #111827 72%, #000000 100%)'
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

          {/* Hero visual — CRM → Deep Link → Helio (hidden on small screens) */}
          <div className="absolute inset-x-0 top-24 hidden justify-center px-6 md:flex md:top-28 lg:top-32">
            <div className="grid w-full max-w-2xl gap-3 grid-cols-[1fr_auto_1fr]">
              <div className="rounded-xl border border-cyan-400/20 bg-black/35 px-5 py-4 shadow-[0_0_32px_rgba(34,211,238,0.14)] backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">Entry point</p>
                <p className="mt-1.5 text-2xl font-semibold text-white">Microsoft CRM</p>
              </div>
              <div className="flex items-center justify-center">
                <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-100">
                  →
                </div>
              </div>
              <div className="rounded-xl border border-violet-400/20 bg-black/35 px-5 py-4 shadow-[0_0_32px_rgba(129,140,248,0.14)] backdrop-blur-sm">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200/80">Destination</p>
                <p className="mt-1.5 text-2xl font-semibold text-white">Helio</p>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-12 sm:pb-16">
            <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
              <h1 className="text-4xl font-bold tracking-wide leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                One link, two philosophies.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Deep-linking from Microsoft CRM into Helio — a product coherence vs enterprise flexibility trade-off.
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
              <p className="mt-0.5 font-medium text-slate-700">Lead UX Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Domain</p>
              <p className="mt-0.5 font-medium text-slate-700">B2B travel — CRM-to-platform integration</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">PM, UX, CRM team, platform architects</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">~3 months, 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="max-w-3xl space-y-2 text-sm text-slate-600">
            <p className="font-semibold uppercase tracking-widest text-slate-400 text-xs">Summary</p>
            <p className="leading-relaxed">Consultants were losing ~45 seconds per transition between Microsoft CRM and Helio because there was no contextual link between the two systems. I designed a deep-linking solution that passed booking context via URL parameters — navigating the trade-off between product coherence (single entry point) and enterprise flexibility (multiple entry points). The org chose multi-entry for scalability; the project connected 3,000+ consultants.</p>
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
            Travel consultants lived between two systems: Microsoft CRM for customer records and relationship management, and Helio for booking, quoting, and servicing. Every time a consultant needed to act on a booking, they'd manually navigate from the customer record in CRM to the right screen in Helio — re-finding the customer, re-locating the booking, and re-establishing context. The handoff was invisible and expensive.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-2xl italic text-slate-800 md:text-3xl leading-snug">
              "I've got the customer on the phone, their record open in CRM, and I still have to go hunt for their booking in Helio."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Consultant, discovery session</footer>
          </blockquote>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">2</p>
              <p className="mt-2 text-sm text-slate-500">disconnected systems</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">~45s</p>
              <p className="mt-2 text-sm text-slate-500">lost per transition finding context</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">3,000+</p>
              <p className="mt-2 text-sm text-slate-500">consultants making the jump daily</p>
            </div>
          </div>

          <div className="mt-16 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The deeper problem wasn't just the wasted seconds — it was the cognitive cost. Consultants had to hold the customer context in their head while navigating between systems, often while on a live call. The gap between CRM and Helio created a seam in the experience that consultants papered over with memory, browser tabs, and workarounds.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The business wanted deep links — clickable connections from a CRM customer record directly into Helio. The design question was deceptively simple: <span className="font-medium text-slate-800">where should those links land?</span>
            </p>
          </div>

          {/* Pain-point summary */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Key friction points</p>
            <div className="grid grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
              <div className="border-r border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Navigation friction</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Manual system switching', 'Re-finding customer in Helio', 'No context carried across', 'Multiple browser tabs'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-b border-slate-200 bg-red-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-3">Consultant impact</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Cognitive load during calls', 'Slower response time', 'Error-prone handoffs', 'Broken flow state'].map((item) => (
                    <span key={item} className="rounded-md bg-red-600 px-2 py-1 text-xs font-medium text-white">{item}</span>
                  ))}
                </div>
              </div>

              <div className="border-r border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Workarounds</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Pinned browser tabs', 'Memorised booking IDs', 'Separate note-taking'].map((item) => (
                    <span key={item} className="rounded-md bg-slate-300 px-2 py-1 text-xs font-medium text-slate-600">{item}</span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-50 p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Design question</p>
                <p className="text-sm text-slate-500">Where should deep links from CRM land in Helio — and who should own the wayfinding?</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          STRATEGY
          ════════════════════════════════════════════════════════════════ */}

      {/* ── Ideation ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The answer depended on a deeper question: should CRM ask users to choose their destination before leaving, or should Helio receive them and handle wayfinding from inside the product?
          </p>

          <div className="mt-12 max-w-2xl space-y-8">
            <div className="space-y-4">
              <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
                My recommendation was a <span className="font-medium text-slate-800">single entry point</span> — one button in CRM that opens Helio at a coherent starting screen, with the customer context pre-loaded. From there, the consultant navigates within Helio to the right task. The product owns the wayfinding, not the CRM.
              </p>
              <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
                The architectural team favoured <span className="font-medium text-slate-800">multiple CRM launch points</span> — separate buttons for different destinations (flights, hotels, etc.), each deep-linking to a specific Helio screen. This gave CRM more control and allowed buttons to be rerouted to different systems in the future without changing the Helio experience.
              </p>
              <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
                Both approaches solved the navigation problem. The trade-off was between product coherence (my proposal) and enterprise flexibility (architecture's direction).
              </p>
            </div>
          </div>

          {/* Concept evaluation */}
          <div className="mt-10 overflow-x-auto">
            <table className="w-full max-w-3xl text-xs">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-3 pr-4 text-left font-semibold uppercase tracking-widest text-slate-400">Approach</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">UX coherence</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">Enterprise flexibility</th>
                  <th className="py-3 px-3 text-center font-semibold uppercase tracking-widest text-slate-400">Future-proofing</th>
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
                    <td className={`py-3 pr-4 ${row.highlight === 'cyan' ? 'font-semibold text-cyan-800' : row.highlight === 'violet' ? 'font-semibold text-violet-800' : 'text-slate-700'}`}>{row.name}</td>
                    {row.scores.map((score, i) => (
                      <td key={i} className={`py-3 px-3 text-center ${score === '✓' ? 'text-emerald-600' : score === '○' ? 'text-amber-500' : 'text-slate-300'}`}>
                        <span className="text-base">{score}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-2 text-xs text-slate-400">✓ strong · ○ partial · ✗ weak</p>
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
                <li>Optimised for organisational flexibility and looser coupling</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              I mapped both patterns against consultant mental models from discovery sessions. Consultants who thought in <span className="font-medium text-slate-800">customer journeys</span> preferred a single entry point — they wanted to land in one place and orient from there. Consultants who thought in <span className="font-medium text-slate-800">task buckets</span> (flights, hotels, insurance) preferred direct links — they already knew where they were going.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              Both were valid. The question was which model the organisation wanted to optimise for, and which trade-offs were acceptable.
            </p>
          </div>

          {/* Design direction */}
          <div className="mt-10">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Key design principles</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl">
              {[
                'Customer context passed via URL parameters',
                'Zero re-entry — booking auto-loaded on landing',
                'Wayfinding owned by the destination, not the launcher',
                'Graceful fallbacks for broken or expired links',
                'Extensible to future systems beyond Helio',
              ].map((feature) => (
                <div key={feature} className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
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
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Prototyping & testing</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I prototyped both approaches in Figma — the single-entry flow showing a Helio landing screen with contextual navigation, and the multi-entry flow showing CRM with task-specific buttons mapping to individual Helio screens.
          </p>

          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Walkthrough sessions with consultants and stakeholders clarified where each model broke down. The single-entry approach felt more natural when consultants didn't know what task they needed yet — they wanted to see the customer's full picture first. The multi-entry approach was faster when the task was already clear — skip the landing, go straight to flights.
          </p>

          <blockquote className="mt-10 border-l-2 border-slate-300 pl-6">
            <p className="text-xl italic text-slate-700 md:text-2xl leading-snug">
              "Half the time I know exactly what I need. The other half, I need to see the booking first before I know what to do."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— Senior consultant, prototype walkthrough</footer>
          </blockquote>

          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">Trade-off analysis</p>
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-cyan-800">Single entry — strengths</p>
                <div className="space-y-1.5">
                  {['Simpler CRM interface', 'Product-led wayfinding', 'Lower cognitive load at launch', 'Consistent mental model'].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 text-cyan-500">+</span> {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-cyan-800">Single entry — weaknesses</p>
                <div className="space-y-1.5">
                  {['Extra click when task is known', 'Helio must handle all routing logic', 'Tighter coupling to Helio\'s IA'].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 text-red-400">−</span> {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-violet-800">Multi-entry — strengths</p>
                <div className="space-y-1.5">
                  {['Fastest path when task is clear', 'Buttons re-routable to other systems', 'CRM team owns the integration', 'Scales to new destinations'].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 text-violet-500">+</span> {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm font-semibold text-violet-800">Multi-entry — weaknesses</p>
                <div className="space-y-1.5">
                  {['More CRM clutter as destinations grow', 'Users choose before full context', 'Fragmented experience across entries'].map((item) => (
                    <div key={item} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 text-red-400">−</span> {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Decision ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The organisation chose the <span className="font-medium text-slate-800">multi-entry approach</span>. The architectural benefits — re-routability, loose coupling, and CRM team ownership — aligned better with the enterprise strategy of keeping the CRM as a stable orchestration layer above shifting underlying systems.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            My role was to articulate the UX trade-off clearly enough that the decision was made intentionally, not by default. The architectural team understood the user cost — and accepted it as a conscious trade-off for long-term platform flexibility.
          </p>
          <div className="mt-8 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm text-violet-800 max-w-2xl">
            <span className="font-semibold">Direction adopted:</span> Multiple CRM launch points with task-specific deep links into Helio. Customer context passed via URL parameters; graceful fallbacks for invalid or expired links.
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>0</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Manual navigation steps</p>
              <p className="mt-1 text-xs text-slate-500">CRM → Helio in one click with context</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>~45s</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Saved per transition</p>
              <p className="mt-1 text-xs text-slate-500">No more re-finding customer and booking</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>3,000+</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Consultants connected</p>
              <p className="mt-1 text-xs text-slate-500">CRM and Helio seamlessly linked</p>
            </div>
          </div>

          {/* Before / after flow comparison */}
          <div className="mt-16 space-y-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-400">Before — manual navigation</p>
              <div className="flex flex-wrap items-center gap-1.5">
                {['Customer record (CRM)', 'Copy booking ID', 'Open Helio', 'Search customer', 'Find booking', 'Navigate to task', 'Begin work'].map((step, i) => (
                  <div key={step} className="flex items-center gap-1.5">
                    <div className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs text-slate-500">
                      {step}
                    </div>
                    {i < 6 && <span className="text-slate-300 text-xs">→</span>}
                  </div>
                ))}
                <span className="ml-2 text-xs text-slate-400 italic">+ context loss, tab switching, memory load</span>
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
                    {i < 3 && <span className="text-emerald-400 text-xs">→</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-2xl space-y-4">
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              Deep linking eliminated the manual system-switching ritual entirely. Customer context — booking ID, traveller details — flowed directly from CRM into Helio via URL parameters. Consultants no longer had to hold context in their head or re-navigate between systems during live calls.
            </p>
            <p className="text-lg tracking-wide text-slate-600 leading-relaxed">
              The multi-entry approach means Helio isn't the only possible destination — the same pattern can extend to Travel Connect and future platforms without changing the CRM experience.
            </p>
          </div>
        </div>
      </div>

      {/* ── Reflection ── */}
      <div className="w-full bg-slate-50">
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
              <p className="mt-1">Clearly articulating the user cost of the chosen direction helped the team make an intentional trade-off rather than a default one. The architectural team knew exactly what they were trading away — and designed mitigations for the UX gaps.</p>
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
