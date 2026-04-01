import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'
import { FCTG_PRESO_URL } from '../constants/preso'
import TimeWithAISplitChart from '../components/TimeWithAISplitChart'

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
        { id: 'ai-steering', label: 'Where I steered' },
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
                An interactive presentation and hands-on workshop for FCTG design — built end-to-end with agentic workflows.
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
              <p className="mt-0.5 font-medium text-slate-700">Invited internal talk — presented live to 15+ designers (FCTG product &amp; brand)</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">4 weeks, solo, 2025</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Tools</p>
              <p className="mt-0.5 font-medium text-slate-700">Cursor Agent (multiple models), React, Vite, Tailwind</p>
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
            Flight Centre&apos;s design leadership wanted a practical talk: which tools matter, how to think about them, and what the work actually looks like — not theory.
          </p>
          <p className="mt-6 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I owned research through delivery — solo, four weeks, no template deck. The centerpiece was a <span className="font-medium text-slate-800">React presentation app</span> built with the same agentic workflows I was teaching, plus a hands-on workshop.
          </p>

          <div
            className="mt-10 max-w-3xl rounded-xl border border-emerald-200 bg-white p-6 shadow-sm sm:p-8"
            role="region"
            aria-labelledby="fctg-time-shift-heading"
          >
            <TimeWithAISplitChart variant="light" titleId="fctg-time-shift-heading" />
            <div className="mt-8 border-t border-slate-200 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                At a glance
              </p>
              <div
                className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3"
                aria-label="Scope: React presentation app, seven chapters, more than five diagrams, three-round workshop"
              >
                <span className="rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800">
                  React presentation
                </span>
                <span className="rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800">
                  7 chapters
                </span>
                <span className="rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800">
                  5+ diagrams
                </span>
                <span className="rounded-md border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800">
                  3-round workshop
                </span>
              </div>
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
            Most AI talks are abstract — slides about what tools <em>could</em> do, not evidence of what they <em>did</em>. I used the presentation itself as the proof: the deck was built with agentic workflows, and the composed views, transitions, and diagrams were iterated the same way I was asking the room to work.
          </p>

          <div className="mt-10 border-l-2 border-slate-300 pl-5">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              If the thing about agentic workflows isn&apos;t built with agentic workflows, it&apos;s just another deck.
            </p>
          </div>

          <p className="mt-10 max-w-2xl text-sm text-slate-600 leading-relaxed">
            <span className="font-medium text-slate-800">Agentic</span> here means multi-step, goal-driven work with context carried across sessions — as opposed to single-shot &ldquo;vibe&rdquo; prompting. The contrast below is how I framed it live.
          </p>

          {/* Vibe vs Agentic comparison */}
          <div className="mt-10">
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
            Two workstreams, all run through Cursor Agent with multiple models in the loop. Each required a different balance of agent autonomy and human steering.
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

          {/* ── Workstream 2: Custom diagrams & visualizations ── */}
          <div className="mt-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">2</span>
              <h3 className="text-2xl font-semibold text-slate-900">Custom diagrams & visualizations</h3>
            </div>
            <p className="max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
              Every visual — AI pipeline diagrams, multi-agent architecture maps, the animated energy battery — is a custom React component, not a static image. Describing a diagram&apos;s structure in a single brief, then iterating through 3–4 rounds of refinement, was much faster than building each SVG by hand.
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
              <p className="mt-1">When the agent looped on a layout approach — trying the same CSS strategy with minor variations — retrying was useless. Reframing the problem from scratch usually cleared it faster than another nudge in the same direction.</p>
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
            Presented live to 15+ designers across product and brand. The session ran through the 7-chapter deck, followed by a 3-round hands-on workshop where participants experienced both modes of AI-assisted design and compared the results.
          </p>

          {/* What was shipped */}
          <div className="mt-12">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">What was shipped</p>
            <div className="max-w-2xl space-y-3 text-sm text-slate-600">
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">1</span>
                <p><span className="font-semibold text-slate-800">Interactive React deck</span> — ~54 composed views across 7 chapters; custom animations, navigation shell, and diagram components</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">2</span>
                <p><span className="font-semibold text-slate-800">5+ custom SVG diagrams</span> — AI pipelines, multi-agent architecture, body analogy — all React components</p>
              </div>
              <div className="flex gap-3 items-start">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">3</span>
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

          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-slate-600">
            In the room, debate centred on when exploratory prompting stops being enough and a clear mission helps — which was the intent. Several designers asked for the deck and activity prompts afterward. I didn&apos;t run a formal survey; that pickup is the signal I&apos;d build on for a follow-up session.
          </p>

          <div className="mt-10">
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
            Agentic tools changed what I could cover solo in four weeks — not by magic, but by tightening the loop between intent and execution. The lessons transfer anywhere teams are weighing when to delegate to an agent and when to hold the line on taste.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Breadth I&apos;d usually split across roles, compressed into one timeline</p>
              <p className="mt-1">Interactive diagrams, slide animations, and a full presentation shell — work that often spans design, front-end implementation, and content. The agent didn&apos;t ship perfect code; it made iteration cheap enough that I could wear those hats in sequence without losing weeks per artifact.</p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Judgment and taste can&apos;t be delegated</p>
              <p className="mt-1">The agent is fast but undiscriminating. Narrative structure, editorial pacing, knowing what to cut — those stayed human calls. The agent accelerated execution; it didn&apos;t replace direction.</p>
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
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Link to="/stories" className="text-sm text-slate-500 transition hover:text-slate-900">
            ← All stories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default FCTGAITalk
