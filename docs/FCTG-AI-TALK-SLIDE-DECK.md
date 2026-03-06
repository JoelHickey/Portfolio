# FCTG AI Talk — Slide Deck Copy

Full text of the slide deck. Extracted from `src/components/FCTGAITalkSlides.jsx`.  
43 slides (Slide 1 = index 0 … Slide 43 = index 42). Titles, subtitles, and body copy only. *Three pillars (Invigoration, innovation, impact) moved to near the end, just before What we hope you take away.*

---

## Slide 1

**Title:** Invigoration, innovation and impact

**Subtitle:** How AI is changing design — and how we'll get there.

**Footer:** Presented to Flight Centre Travel Group's (FCTG) Global Design Team, March 2026

---

## Slide 2

**Title:** What we'll cover

**Subtitle:** Concepts, monumental moments, building momentum, technology and a fun agentic activity!

---

## Slide 3

**Title:** Looking back to look ahead

**Subtitle:** Through every metamorphosis, the human element and mastery of craft have retained their value.

**Body:**
- **Weavers** — The loom changed; the weaver's artistry, mastery, and skill endured.
- **Wheels** — The leap from horse-drawn cart to automobile changed the vehicle; the human in the journey remained.
- **Digital** — Design became systems and flows, not just single screens; the human at the centre of the experience stayed.

---

## Slide 3

**Title:** The fundamentals of design hold strong

**Quote:** "Free from desire, you see essence unformed. Caught in desire, you see only the manifestations." — Rick Rubin, The Way of Code

---

## Slide 3

**Title:** The design process

**Subtitle:** Productivity still means impact — what counts as productive work has evolved.

**Phases (below flow graphic):** Discover → Define → Develop → Deliver

---

## Slide 3

**Title:** Ecosystem

**Subtitle:** Design-centric: every decision needs to be part of the conversation.

---

## Slide 3

**Title:** Energy

**Subtitle:** What charges your designer battery?

**Body (labels in diagram):** Imagination, Creativity, Knowledge, Productivity, Value

---

## Slide 3

**Title:** Strength

**Subtitle:** AI guided me through a structural design problem

**Body:**
- Check this beam for failure modes.
- Bending, shear, buckling — the agent walked through the checks.

---

## Slide 3

**Title:** Speed

**Subtitle:** Prompt to UI in seconds.

**Body (example prompt):** Create a login form with email and password

**Quote:** "Things arise and he accepts them. Things vanish and he lets them go." — Rick Rubin, The Way of Code

---

## Slide 3

**Title:** Iteration

**Subtitle:** Trust the process. Embrace ambiguity.

---

## Slide 3

**Title:** Imagination

**Subtitle:** Beyond the gates of technology.

---

## Slide 3

**Title:** Calmness

**Subtitle:** Less friction, more space to think.

---

## Slide 3

**Title:** Mystical Code

**Subtitle:** Code felt mystical — now it's reachable.

---

## Slide 3

**Title:** Empowerment

**Subtitle:** Build things that add value to your life.

**Body:** Mental health app · Drafting studio

---

## Slide 3

**Title:** Get started and stay grounded

**Subtitle:** Practices that help.

**Body (labels):**
- Start simple
- Experiment freely
- Stay curious
- Use analogies
- Stay human
- Your environment
- Redirect, Don't Fight
- Reset When Stuck
- Document As You Go

---

## Slide 3

**Title:** What is an AI model?

**Subtitle:** The brain agents run on.

**Body:**
- **Large language models (LLMs)** — Reads, reasons, and generates — trained on lots of text and code. Products: ChatGPT, Claude, Gemini (model-only). Tiers: Sonnet, GPT-4o-mini (quick) · Opus, GPT-4o (complex).
- **Why we use them** — Generate options and drafts faster — you focus on judgment, taste, and strategy.
- **Key point** — Outputs only — no tools, no actions. Models respond; they don't act.

---

## Slide 3

**Title:** Inside the model

**Subtitle:** Input → processing → output. Then repeat.

**Body (technical):** Prompt (text) → Tokenize (IDs) → Embed + pos (vectors) → Transformer × N (attention + MLP) → Logits → probs (next-token dist.) → Sample + decode (next token). Loop: append the sampled token to the context and run the same stack again until a stop condition.

**In plain language:** Your words (what you type) → Break into pieces (chunks it knows) → Turn into numbers (meaning as numbers) → The model (thinks about context) → What comes next? (pick the next piece) → Add & repeat (until done). Add that word and run the same steps again until it's done.

---

## Slide 3

**Title:** What is an AI agent?

**Subtitle:** Agents drive outcomes, not just outputs.

**Body:** Brain thinks. Memory remembers. Hands act.

**Caption (single-agent flow):** You → Agent → [Memory | Model | Tools]; Agent loads context.; Retrieved data returns to the Agent.; Agent calls the Model and passes that context in the prompt.; Model output returns to the Agent.

**Note:** Memory is separate from the model. The model is stateless — it only sees what’s in each request. Memory lives outside (e.g. conversation history, or a vector store — searchable by meaning, e.g. "things we decided about the checkout flow"). The agent retrieves it and injects it into the context the model sees. That's the idea behind RAG (retrieval-augmented generation): external knowledge, retrieved and injected into the context the model sees.

---

## Slide 3

**Title:** Model or agent?

**Subtitle:** Use both, in combination — to get ideas and get things done.

**Body:**
- **Model = fast thinking** — You want ideas (naming, options, outlines). You'll paste and edit (output stays with you). It's one question (scoped, no tools).
- **Agent = thinking + doing** — You want it to do things (edit files, run commands). It's multi-step (you review as it goes). You're delegating (hand off, don't paste and edit).

---

## Slide 3

**Title:** Agent architectures

**Subtitle:** Single-agent vs multi-agent.

**Body:**
- **Single-agent:** Best for: renames, refactors, single-step logic.
- **Multi-agent:** Agent plans, coordinates with Memory, Model, and Tools; delegates; sub-agents can hand off. Best for: architecture decisions, parallel work, multi-step tasks.

**In practice:** Simple multi-agent: one agent had the main task ("turn the slide deck into a document"); it delegated a subtask ("read the file and extract all slide copy") to another agent. Two agents, one handoff.

---

## Slide 3

**Title:** What makes behaviour agentic?

**Subtitle:** Plan → Act → Observe (inspect results) → Iterate.

**Body:** The model is the brain. The agent adds the wrapper — tools, a loop, and often memory — and that's what makes it agentic.

---

## Slide 3

**Title:** Vibe coding and Agentic coding

**Subtitle:** Prompt-driven and reactive vs autonomous and structured.

**Body:**
- **Vibe:** Intuitive, creative, fast. You prompt AI for quick results; you're the editor and reviewer. Best for: ideation, rapid prototyping, creative exploration.
- **Agentic:** Agents plan, execute, and test. You're the manager/supervisor. Proactive, long-running processes. Best for: complex systems, refactoring, CI/CD, production-level work.

Same tool, two styles. Combine both: vibe for brainstorming and prototypes; agentic for reliable execution and maintenance.

---

## Slide 3

**Title:** Prompting styles

**Subtitle:** Vibe vs directive — how you phrase it.

**Body:**
- **Intent, mood, context.** "This flow feels clunky, help me improve it."
- **Explicit, step-by-step.** "Rename FooBar to FooBarV2, then update all imports."

Same agent, either style. Choose to fit the task.

**Quote:** "Free from intellect, free from abstraction, The Vibe Coder leads all things back to natural self-sufficiency." — Rick Rubin, The Way of Code

---

## Slide 3

**Title:** Prompt clarity

**Subtitle:** Task · Scope · Done.

**Body:**
- **Vague:** "fix the slider"
- **Specific:** "Fix the re-render loop in HealthMonitor. Don't change UI. Run lint."

---

## Slide 3

**Title:** Context and continuity

**Subtitle:** Sessions break. Context doesn't have to.

**Body:** learnings.md bridges sessions. Point at files · Paste snippets · Reference learnings

---

## Slide 3

**Title:** Intervention

**Subtitle:** Verify outputs, redirect when they drift, reframe when looping.

**Labels:** Hallucinate, Overcomplicate, Loop, Overwrite, Lazy, Fixate, Ignore, Drift, Tone, Pushback

**Body:** Don't expect perfection in the agents. Work with the agent to solve the problem together.

---

## Slide 3

**Title:** Agentic & designer productivity

**Subtitle:** How the agent loop improves how you work.

**Body:**
- **Fewer handoffs** — One prompt drives the steps; you evaluate and decide.
- **Faster iteration** — Agent tries options; you stay in review mode.
- **Less context-switching** — It reads, runs, summarizes; you focus on design thinking.
- **Scale routine work** — Delegate the repeatable; you focus on judgment and creativity.

Across the design process — discover, define, develop, deliver — the agent handles execution; you own direction and quality.

---

## Slide 3

**Title:** Then vs Now

**Subtitle:** Same phases — you steer, the agent executes.

**Layout:** Bar chart. One row per phase (Discover, Define, Develop, Deliver); each row has Then bar (full = 100%) and Now bar (reduced %, same scale). Short captions under each row.

**Body (by phase):**
- **Discover** — Then: Manual synthesis, heavy alignment; feasibility often late. Now: AI synthesises and maps flows; you validate; agent checks feasibility in minutes. Pull hours of research into designs—no more stuck in decks. Competitive and benchmark review in minutes. Stakeholder alignment: previews + AI summaries, fewer decks and meetings.
- **Define** — Then: Flowcharts and annotated specs for handoff; prototypes and specs go stale. Now: AI generates flows; you set direction. PRDs, specs, ADRs in sync—single source of truth. Edge cases and acceptance criteria surfaced early. Copy from tone and guidelines; you edit and approve.
- **Develop** — Then: Hours on prototypes and specs; handoff, long cycles, 12hr feedback, context lost; designs and build misaligned → issues. Now: Prototypes in minutes; design system on cue; identify alignment gaps—hone in; design QA & consistency automated; continuous testing; scenario and edge case testing; a11y in flow; responsive from one source; designer playground; no design–dev handoff—one artifact; review, refine (e.g. 9→3 screens).
- **Deliver** — Then: Build and deploy, long cycles for fixes. Now: Ship faster; iterate on feedback. Previews for sign-off; release docs generated. Training and UAT scenarios generated.

---

## Slide 3

**Title:** Tech stack

**Subtitle:** The technology that powers this project.

**Body:**
- **Front end:** React (UI framework), Vite (Build tool), Tailwind (CSS framework), Design system (Tokens, components, docs)
- **Back end:** Supabase Auth (OTP + sessions), Supabase Postgres (Database)

---

## Slide 3

**Title:** Pipeline

**Subtitle:** How it ships.

**Body:** Cursor (Code editor / AI) → GitHub (Version control) → Vercel (Deploy) → Namecheap (Domain / hosting). Commit → push → (CI) → deploy → live.

---

## Slide 3

**Title:** Cursor

**Subtitle:** AI-powered editor. When you prompt: ReAct — reasoning + acting.

**Body (labels on image):** Chat, Code editor, File directory, Select agent, Terminal

---

## Slide 3

**Title:** When you prompt

**Subtitle:** ReAct — reasoning + acting.

**Body (steps):** 1. Explore (scan context) · 2. Thought (plan) · 3. Response (text streams) · 4. Tool calls (read, write, search, run) · 5. Observation (sees results) · 6. Revise & loop (adjusts, loops) · 7. Done (complete). Simple prompts may skip the loop.

---

## Slide 3

**Title:** GitHub

**Subtitle:** Version control, collaboration, and the bridge between Cursor and deploy. Push runs checks and triggers deploy.

---

## Slide 3

**Title:** Vercel

**Subtitle:** Deploy from Git. Preview branches. Edge functions. The final step in the pipeline.

**Body:** main → Production deploy; branch → Preview URL. Push to main → automatic deploy. Every branch gets a preview.

---

## Slide 3

**Title:** Design systems

**Subtitle:** Give the agent a single source of truth. Outputs stay on-brand.

**Body:** Agent / project → Design system (tokens · components · docs) → On-brand output

---

## Slide 3

**Title:** Design system in practice

**Subtitle:** What to measure when design system + agent work together.

**Measure:** Revision count, handoff rounds, time to production-ready.

**Body:**
- Fewer revision cycles — Less back-and-forth to get on-brand UI
- Fewer design–dev handoff rounds — "Use our Button" once, not every sprint
- Faster to production-ready UI — Agent applies tokens and components
- More time on research, flows, craft — You focus where judgment matters

**How: point the agent at**
- **Tokens & components** — Spacing, color, type. Agent references when generating.
- **Specs in docs** — Figma, Markdown, Storybook. Agent reads and applies.
- **Or use a library** — Chakra, Radix, Mantine, Polaris. Agent uses primitives.

Works best when the design system is documented and in code.

---

## Slide 3

**Title:** Testing

**Subtitle:** Fast feedback. Real browsers. Ship with confidence.

**Body:** Vitest (Unit tests), React Testing Library (Component testing), Playwright (End-to-end tests). CI on push (GitHub Actions).
- **Vibe** — Single-shot, iterative. "Add a unit test for this function." You review inline, tweak, repeat.
- **Directive** — Multi-step, autonomous. "Add test coverage for the checkout flow — unit tests and an E2E with Playwright."

This deck: 75 tests — unit, integration, E2E. Agent adds tests; you set coverage. Coverage finds gaps; tests protect what works.

---

## Slide 3

**Title:** Helpful tips

**Subtitle:** Small practices that add up.

**Body:** Split view · Specs in MD · Watch & debug · Pace yourself · NPM · File directory · Inspect & console · Queuing prompts · Watch productivity · Patience

---

## Slide 3

**Title:** Level up to agentic

**Body:**
- **Problem** — How might we create a Moon trip booking flow that's easy and enjoyable for customers to use?
- **Setup** — Work in pairs. Miro for collaboration; Claude Code for the agent
- **Process** — Start with vibe (aim to iterate 2–3 times), then level up to agentic. Write clear prompts. Redirect the agent when it drifts.
- **Outputs** — Reusable prompts, agent responses, and generated UI/copy
- **Outcomes** — Improved prompting skills, comfort with quick iteration, ability to delegate to the agent with confidence

---

## Slide 3

**Title:** Rounds

**Body:**
- **Round 1 · ~15 min · Warm-up — Start with vibe:** Explore flows and tone. Try: "How would you approach designing a booking flow for a Moon trip?" Chat, iterate, go wild. Quick iterations. Exploratory.
- **Round 2 · ~25 min · Main focus — Level up to agentic:** Give the agent a clear mission. Try: "Create a 3-step Moon booking flow: date picker, cabin selection (economy, business, first), add-ons and terms. Include copy and layout." Agentic: multi-step, delegated. Goal-driven.
- **Round 3 · ~15 min — Show & tell:** Share the clearest Moon booking outputs. Vote on which flow we'd ship. Quick poll, then wrap. Debrief: How could this apply to our Earth bookings?

---

## Slide 3 (Three pillars — moved to near end)

**Title:** Invigoration, innovation, impact

**Subtitle:** In travel design terms

**Body:**
- **Invigoration** — *Re-energising creativity* — Beat creative block in <60 seconds. Reclaim 4–6 hours/week for flows and usability.
- **Innovation** — *New tools & processes* — Style-consistent UI, auto-responsive layouts, and design-system–friendly components; user flows and itinerary visuals at scale.
- **Impact** — *Measurable outcomes* — 2–3× faster from concept to shipped UI; higher A/B test winners; direct lifts in booking conversion from better UX.

---

## Slide 3

**Title:** What we hope you take away

**Subtitle:** Outcomes

**Body:**
- **Agentic** — Better prompting, quick iteration, confident delegation. Stay in the driver's seat — steer when it drifts. Choose the right mode: vibe vs directive. Treat agents as outcome-drivers; clear prompts.
- **Broader (AI / design)** — Push further than eng and dev teams. Point at your design system. Small, high-performing teams will generate more and better ideas with AI in the loop. Reduce the noise — focus on judgment and creativity.
- **Philosophical** — Craft and what lasts; keep questioning the fundamentals.

---

## Slide 3

**Title:** An opportunity of a lifetime

**Body:** Designers who work with AI will have an edge. Embrace the tools, question the outputs, keep the human at the centre. Small, high-performing teams generating and refining ideas with AI will lead the way.

**Tags:** AI is in its infancy, Massive value, Maximise creativity, Move fast, Pause and reflect

**Quote:** "Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns." — Rick Rubin, The Way of Code

---

## Slide 36

**Title:** Thank you

**Subtitle:** Questions?
