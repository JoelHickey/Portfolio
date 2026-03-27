import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FCTG_PRESO_URL } from '../constants/preso'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

function FCTGAITalk() {
  useEffect(() => {
    document.title = 'Agentic AI Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Agentic AI case study">

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-[#030b0f]">
          <img
            src="/agentic-coding-hero-v2.png"
            alt="Agentic coding environment — Cursor IDE with AI agent collaboration"
            className="h-full w-full object-cover object-center opacity-70"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(3,11,15,0.3) 0%, rgba(3,11,15,0.5) 50%, rgba(3,11,15,0.9) 100%)' }}
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
                Built with the tools it teaches.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                An interactive presentation on agentic design — created entirely with agentic workflows.
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
              <p className="font-semibold uppercase tracking-widest text-slate-400">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">Senior Product Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Context</p>
              <p className="mt-0.5 font-medium text-slate-700">Invited talk — FCTG design team, 15+ designers</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">~4 weeks, solo, 2025</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Tools</p>
              <p className="mt-0.5 font-medium text-slate-700">Cursor Agent, Claude, React, Vite, Tailwind</p>
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="max-w-3xl space-y-2 text-sm text-slate-600">
            <p className="font-semibold uppercase tracking-widest text-slate-400 text-xs">Summary</p>
            <p className="leading-relaxed">Invited to present on agentic AI to FCTG's design team. I solo-built a 54-slide interactive presentation — including 2 working React prototypes, 5+ custom SVG diagrams, and a 3-round hands-on workshop — entirely using agentic workflows (Cursor Agent + Claude). The presentation itself was the proof: built with the tools it teaches.</p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          BRIEF
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Brief</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Flight Centre's design leadership asked me to present on how AI is changing design practice — not theoretically, but practically. What tools exist, how designers should think about them, and what it looks like to actually work this way. The audience: 15+ product designers across the organisation.
          </p>
          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I had full ownership — research, content, build, and delivery. No team, no templates.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">54</p>
              <p className="mt-2 text-sm text-slate-500">interactive slides across 7 chapters</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">1</p>
              <p className="mt-2 text-sm text-slate-500">person — research through delivery</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-slate-900 md:text-6xl">~4 wk</p>
              <p className="mt-2 text-sm text-slate-500">from blank page to live presentation</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          APPROACH
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Approach</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Most AI talks are abstract — slides about what tools <em>could</em> do, not evidence of what they <em>did</em>. I decided to use the presentation itself as the proof: build the entire thing with agentic workflows, so every slide, every demo, and every diagram was a real artifact of the process I was teaching.
          </p>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "If the thing about agentic workflows isn't built with agentic workflows, it's just another deck."
            </p>
          </blockquote>

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            This meant working differently from the start. Not single-shot prompting — not "vibe coding" — but structured, multi-step workflows with clear goals, context carried across sessions, and deliberate human intervention when the agent drifted.
          </p>

          {/* Vibe vs Agentic comparison */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Two modes of AI-assisted design</p>
            <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-xl border border-slate-200 bg-white p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Vibe coding</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">Single-shot prompts. Exploratory. Good for generating starting points and rough ideas. No structured goal, no memory across turns.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Exploratory', 'Single-turn', 'Divergent'].map((tag) => (
                    <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-slate-500">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Agentic workflows</p>
                <p className="mt-3 text-sm text-slate-700 leading-relaxed">Multi-step, goal-driven. Context and rules persist across sessions. The designer steers, intervenes, and validates — the agent executes toward a defined outcome.</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {['Goal-driven', 'Multi-step', 'Context-aware', 'Human-steered'].map((tag) => (
                    <span key={tag} className="rounded-full border border-indigo-200 bg-indigo-100 px-2.5 py-0.5 text-[10px] font-medium text-indigo-700">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROCESS — HOW IT WAS BUILT
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">How it was built</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The project broke into four workstreams — all run through Cursor Agent with Claude as the underlying model. Each required a different balance of agent autonomy and human steering.
          </p>

          {/* ── Workstream 1: Content & structure ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">1</span>
              <h3 className="text-2xl font-semibold text-slate-900">Content & structure</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              I used the agent to research AI concepts, draft the 7-chapter narrative arc, and iterate on slide content. The agent was strong at generating initial structures and finding connections between ideas — but editorial judgment about pacing, what to cut, and what audiences actually need to hear required constant human direction.
            </p>
            <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              Prep docs — practice plans, Q&A prep, slide audits, deck reviews — were all produced through iterative agent sessions, then refined by hand.
            </p>
          </div>

          {/* ── Workstream 2: Interactive demos ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">2</span>
              <h3 className="text-2xl font-semibold text-slate-900">Interactive product demos</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              Rather than static mockups, I built working interactive prototypes — a travel amendments flow and an insurance quoting flow — directly in React. These aren't illustrations of product work; they're functional demos that simulate the real user experience, complete with state management, transitions, and realistic data.
            </p>
            <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              The agent handled component scaffolding, state logic, and iteration on UI details. I directed the interaction patterns, validated against the real product flows, and pushed back when the agent over-engineered solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/stories/amendments/demo"
                className="inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Try amendments demo →
              </Link>
              <Link
                to="/stories/insurance/demo"
                className="inline-flex rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Try insurance demo →
              </Link>
            </div>
          </div>

          {/* ── Workstream 3: Custom diagrams & visualizations ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">3</span>
              <h3 className="text-2xl font-semibold text-slate-900">Custom diagrams & visualizations</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              Every visual in the presentation — AI pipeline diagrams, multi-agent architecture maps, body analogy illustrations, the animated energy battery — is a custom React component, not a static image. The agent generated initial SVG structures and animation logic; I steered the visual language, colour system, and motion design to match the presentation's aesthetic.
            </p>
            <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              This was where the agentic workflow hit its stride. Describing a diagram's structure, layout, and behaviour in a single brief — then iterating through 3–4 rounds of refinement — was dramatically faster than building each SVG by hand.
            </p>
          </div>

          {/* ── Workstream 4: The portfolio itself ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">4</span>
              <h3 className="text-2xl font-semibold text-slate-900">The portfolio site</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              The portfolio you're reading this on was built the same way — React, Vite, Tailwind, all orchestrated through Cursor Agent. Case study pages, the home page, the design system, particle backgrounds, scroll animations — the entire front-end was an agentic build. Meta on meta.
            </p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          INTERVENTION — WHERE I HAD TO STEER
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Where I had to steer</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Working with AI agents isn't autopilot. The value of the human in the loop is knowing when and how to intervene. These are the failure modes I encountered — and the strategies that resolved them.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {['Hallucinate', 'Overcomplicate', 'Loop', 'Overwrite', 'Lazy', 'Fixate', 'Ignore', 'Drift'].map((label) => (
              <span key={label} className="rounded-full border border-amber-300/60 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{label}</span>
            ))}
          </div>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Overcomplicate → Constrain the brief</p>
              <p className="mt-1">The agent consistently over-engineered slide transitions and diagram animations. The fix wasn't asking it to simplify — it was rewriting the brief with explicit constraints: "No more than 2 animation properties. No staggered delays. One entrance, done."</p>
            </div>
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Loop → Reframe, don't retry</p>
              <p className="mt-1">When the agent looped on a layout approach that wasn't working — trying the same CSS strategy with minor variations — retrying the same prompt was useless. Stopping, describing the problem from scratch with a different framing, consistently broke the loop in one pass.</p>
            </div>
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Drift → Persistent rules</p>
              <p className="mt-1">Across long sessions, the agent would slowly drift from established patterns — forgetting colour tokens, ignoring spacing conventions, adding visual elements I hadn't asked for. Cursor rules files (.cursorrules) solved this: codified constraints that persisted across every turn.</p>
            </div>
          </div>

          <div className="mt-12 rounded-2xl border-2 border-indigo-200 bg-indigo-50/60 px-8 py-8 shadow-lg shadow-indigo-100/40 max-w-2xl">
            <p className="text-xl text-slate-800 leading-relaxed md:text-2xl">
              Reframe how you see them: valuable assistants and partners, not just AI agents — treat them like a sharp colleague who needs clear direction.
            </p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          WHAT WAS PRODUCED
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">What was produced</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The output of ~4 weeks of solo agentic work — a scope that would typically involve a designer, a front-end developer, and a content strategist.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: '54-slide interactive deck', desc: 'Built in React with custom animations, chapter navigation, and embedded diagrams. Deployed as a standalone web app.', accent: 'indigo' },
              { title: '2 product demos', desc: 'Working interactive prototypes — amendments and insurance flows — simulating real product UX with state, transitions, and mock data.', accent: 'emerald' },
              { title: '5+ custom diagrams', desc: 'AI pipeline, multi-agent architecture, body analogy, environment canvas — all React SVG components, not static images.', accent: 'cyan' },
              { title: '3-round workshop', desc: 'A hands-on activity run with the audience: vibe coding → agentic workflow → compare and discuss. Concept to execution in one session.', accent: 'violet' },
              { title: 'Full portfolio site', desc: 'The site you\'re on — case studies, interactive previews, particle backgrounds, scroll animations. Same tools, same process.', accent: 'rose' },
              { title: '11 prep documents', desc: 'Practice plans, slide audits, Q&A prep, presentation cheat sheets — all produced through iterative agent sessions.', accent: 'amber' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-slate-200 bg-slate-50 p-6">
                <p className={`text-xs font-semibold uppercase tracking-wider text-${item.accent}-600`}>{item.title}</p>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <a
              href={FCTG_PRESO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              View the full presentation →
            </a>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          DELIVERY
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Presented live to the FCTG design team — 15+ designers across product and brand. The session ran through the 7-chapter deck, followed by the 3-round hands-on workshop where participants experienced vibe coding, levelled up to agentic workflows, and compared the results.
          </p>

          {/* Workshop structure */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Workshop activity</p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Round 1 · ~15 min</span>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">Start with vibe</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Explore flows and tone. Open-ended prompting, iterating freely. No wrong answers — just getting comfortable with the tool.
                </p>
                <p className="mt-3 text-xs text-slate-500">Single-shot, iterative. Exploratory.</p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">Round 2 · ~25 min</span>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">Level up to agentic</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Give AI a clear mission with defined steps and expected outcomes. One structured prompt, full deliverable. See the difference in output quality.
                </p>
                <p className="mt-3 text-xs text-slate-500">Multi-step, defined outcome. Goal-driven.</p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Round 3 · ~15 min</span>
                <h4 className="mt-2 text-lg font-semibold text-slate-900">Compare & discuss</h4>
                <p className="mt-2 text-sm text-slate-600">
                  Side-by-side comparison: what changed between vibe and agentic? Group discussion on when each mode is useful and where the human matters most.
                </p>
                <p className="mt-3 text-xs text-slate-500">Reflection, pattern recognition.</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          REFLECTION
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Building the presentation with agentic tools wasn't just a stylistic choice — it fundamentally changed what was possible in the time I had. But it wasn't magic. Here's what I took away.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Agentic tooling genuinely compressed timelines</p>
              <p className="mt-1">What would have been weeks of front-end development — interactive diagrams, slide animations, demo prototypes — happened in days. Not because the agent wrote perfect code, but because the iteration cycle went from hours to minutes.</p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Judgment and taste can't be delegated</p>
              <p className="mt-1">The agent is fast but undiscriminating. Narrative structure, editorial pacing, knowing what to cut — these stayed entirely human decisions. The agent accelerated execution; it didn't replace direction.</p>
            </div>
            <div className="border-l-2 border-indigo-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Steering AI is a design skill</p>
              <p className="mt-1">Knowing when to constrain a brief, when to reframe a problem, when to let the agent run and when to take the wheel — this is closer to directing a team than writing code. It's a skill that compounds.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Rules and context are infrastructure</p>
              <p className="mt-1">Persistent rules files, structured briefs, and clear constraints aren't overhead — they're the infrastructure that makes agentic work reliable. Without them, every session starts from zero.</p>
            </div>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>15+</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Designers trained in agentic workflows</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>3</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Teams adopted Cursor Agent post-talk</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl lg:text-7xl" style={gradientStyle}>2nd</p>
              <p className="mt-1 text-sm font-medium tracking-wider text-slate-900">Session requested by design leadership</p>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-xs text-slate-500">
            Post-session, three product squads began experimenting with agentic workflows for prototyping and documentation. A follow-up deep-dive was requested for the broader design org.
          </p>
        </div>
      </div>


      {/* ── Footer navigation ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 flex flex-wrap items-center justify-between gap-4">
          <Link to="/stories" className="text-sm text-slate-500 transition hover:text-slate-900">
            ← All stories
          </Link>
          <a
            href={FCTG_PRESO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-slate-500 transition hover:text-slate-900"
          >
            View the full presentation →
          </a>
        </div>
      </div>
    </section>
  )
}

export default FCTGAITalk
