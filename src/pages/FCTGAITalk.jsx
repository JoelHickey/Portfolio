import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'
import { FCTG_PRESO_URL } from '../constants/preso'

function FCTGAITalk() {
  useEffect(() => {
    document.title = 'Agentic AI Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Agentic AI case study">
      <CaseStudyNav sections={[
        { id: 'ai-brief', label: 'Brief' },
        { id: 'ai-approach', label: 'Approach' },
        { id: 'ai-process', label: 'Process' },
        { id: 'ai-steering', label: 'Steering' },
        { id: 'ai-delivery', label: 'Delivery' },
        { id: 'ai-reflection', label: 'Reflection' },
      ]} />

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
              <p className="font-semibold uppercase tracking-widest text-slate-500">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">Senior Product Designer</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Context</p>
              <p className="mt-0.5 font-medium text-slate-700">Invited talk — FCTG design team, 15+ designers</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">4 weeks, solo, 2025</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Tools</p>
              <p className="mt-0.5 font-medium text-slate-700">Cursor Agent, Claude, React, Vite, Tailwind</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key results */}
      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">15+</p>
              <p className="mt-2 text-sm text-slate-500">Designers trained in agentic workflows</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">3</p>
              <p className="mt-2 text-sm text-slate-500">Teams adopted Cursor Agent post-talk</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">2nd</p>
              <p className="mt-2 text-sm text-slate-500">Session requested by design leadership</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          BRIEF
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-brief" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Brief</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Flight Centre's design leadership asked me to present on how AI is changing design practice — not theoretically, but practically. What tools exist, how designers should think about them, and what it looks like to actually work this way.
          </p>
          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Full ownership — research, content, build, and delivery. Solo, 4 weeks, no templates. I built a 54-slide interactive presentation with 2 working React prototypes, 5+ custom SVG diagrams, and a 3-round hands-on workshop — entirely using the agentic workflows I was teaching.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">54</p>
              <p className="mt-2 text-sm text-slate-500">interactive slides across 7 chapters</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">2</p>
              <p className="mt-2 text-sm text-slate-500">working React prototypes embedded live</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900 md:text-5xl">4 wk</p>
              <p className="mt-2 text-sm text-slate-500">from blank page to live presentation</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          APPROACH
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-approach" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Approach</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Most AI talks are abstract — slides about what tools <em>could</em> do, not evidence of what they <em>did</em>. I decided to use the presentation itself as the proof: build the entire thing with agentic workflows, so every slide, demo, and diagram was a real artifact of the process I was teaching.
          </p>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "If the thing about agentic workflows isn't built with agentic workflows, it's just another deck."
            </p>
          </blockquote>

          <p className="mt-10 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Not single-shot prompting — structured, multi-step workflows with clear goals, context carried across sessions, and deliberate human intervention when the agent drifted.
          </p>

          {/* Vibe vs Agentic comparison */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Two modes of AI-assisted design</p>
            <div className="grid gap-6 sm:grid-cols-2 max-w-3xl">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
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
          PROCESS
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-process" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Process</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Three workstreams, all run through Cursor Agent with Claude. Each required a different balance of agent autonomy and human steering.
          </p>

          {/* ── Workstream 1: Content & structure ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">1</span>
              <h3 className="text-2xl font-semibold text-slate-900">Content & structure</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              The agent researched AI concepts, drafted the 7-chapter narrative arc, and iterated on slide content. It was strong at generating initial structures — but editorial judgment about pacing, what to cut, and what the audience actually needed to hear stayed with me.
            </p>
          </div>

          {/* ── Workstream 2: Interactive demos ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">2</span>
              <h3 className="text-2xl font-semibold text-slate-900">Interactive product demos</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              Rather than static mockups, I built working React prototypes — a travel amendments flow and an insurance quoting flow — with state management, transitions, and realistic data. The agent handled component scaffolding and iteration; I directed the interaction patterns and validated against real product flows.
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
              Every visual — AI pipeline diagrams, multi-agent architecture maps, the animated energy battery — is a custom React component, not a static image. Describing a diagram's structure in a single brief, then iterating through 3–4 rounds of refinement, was dramatically faster than building each SVG by hand.
            </p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          INTERVENTION — WHERE I HAD TO STEER
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-steering" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Where I had to steer</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Working with AI agents isn't autopilot. The value of the human in the loop is knowing when and how to intervene. Three failure modes came up repeatedly — each required a different correction strategy.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Overcomplicate → Constrain the brief</p>
              <p className="mt-1">The agent over-engineered transitions and animations. Asking it to simplify didn't work — rewriting the brief with explicit constraints did: "No more than 2 animation properties. One entrance, done."</p>
            </div>
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Loop → Reframe, don't retry</p>
              <p className="mt-1">When the agent looped on a layout approach — trying the same CSS strategy with minor variations — retrying was useless. Describing the problem from scratch with a different framing broke the loop in one pass.</p>
            </div>
            <div className="border-l-2 border-amber-300 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Drift → Persistent rules</p>
              <p className="mt-1">Across long sessions, the agent drifted from established patterns — forgetting tokens, ignoring conventions. Cursor rules files solved this: codified constraints that persisted across every turn.</p>
            </div>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          DELIVERY
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-delivery" className="w-full bg-slate-50 scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Presented live to the FCTG design team — 15+ designers across product and brand. The session ran through the 7-chapter deck, followed by a 3-round hands-on workshop where participants experienced both modes of AI-assisted design and compared the results.
          </p>

          {/* What was shipped */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">What was shipped</p>
            <div className="max-w-2xl space-y-3 text-sm text-slate-600">
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">1</span>
                <p><span className="font-semibold text-slate-800">54-slide interactive deck</span> — React app with custom animations, chapter navigation, and embedded diagrams</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">2</span>
                <p><span className="font-semibold text-slate-800">2 working product demos</span> — amendments and insurance flows with real state, transitions, and mock data</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">3</span>
                <p><span className="font-semibold text-slate-800">5+ custom SVG diagrams</span> — AI pipelines, multi-agent architecture, body analogy — all React components</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">4</span>
                <p><span className="font-semibold text-slate-800">3-round hands-on workshop</span> — vibe coding → agentic workflow → compare and discuss</p>
              </div>
            </div>
          </div>

          {/* Workshop structure */}
          <div className="mt-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">Workshop activity</p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-600">Round 1 · 15 min</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Start with vibe</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Open-ended prompting, iterating freely. Getting comfortable with the tool.
                </p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-indigo-600">Round 2 · 25 min</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Level up to agentic</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Clear mission, defined steps, expected outcomes. One structured prompt, full deliverable.
                </p>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-600">Round 3 · 15 min</span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">Compare & discuss</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Side-by-side comparison: what changed? When is each mode useful? Where does the human matter most?
                </p>
              </div>
            </div>
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
          REFLECTION
          ════════════════════════════════════════════════════════════════ */}

      <div id="ai-reflection" className="w-full bg-white scroll-mt-20">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Building the presentation with agentic tools changed what was possible in the time I had. But it wasn't magic — the lessons apply to any team considering this way of working.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Agentic tooling compressed a team's worth of work into solo output</p>
              <p className="mt-1">Interactive diagrams, slide animations, demo prototypes — a scope that would typically need a designer, a front-end developer, and a content strategist. Not because the agent wrote perfect code, but because the iteration cycle went from hours to minutes.</p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Judgment and taste can't be delegated</p>
              <p className="mt-1">The agent is fast but undiscriminating. Narrative structure, editorial pacing, knowing what to cut — these stayed entirely human decisions. The agent accelerated execution; it didn't replace direction.</p>
            </div>
            <div className="border-l-2 border-indigo-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Steering AI is a design skill</p>
              <p className="mt-1">Knowing when to constrain a brief, when to reframe a problem, when to let the agent run and when to take the wheel — this is closer to directing a team than writing code. It's a skill that compounds with every project.</p>
            </div>
          </div>
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
