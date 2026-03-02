# FCTG AI Talk — Slide Deck Copy

Full text of the slide deck. Extracted from `src/components/FCTGAITalkSlides.jsx`.  
44 slides (Slide 1 = index 0 … Slide 44 = index 43). Titles, subtitles, and body copy only.

---

## Slide 1

**Title:** Invigoration, innovation and impact

**Subtitle:** Presented to Flight Centre Travel Group's (FCTG) Global Design Team, March 2026

---

## Slide 2

**Body:** In the future, the wealthy will pay for human empathy.

— Attribution

---

## Slide 3

**Title:** What we'll cover

**Subtitle:** Concepts, monumental moments, building momentum, technology — and a hands on activity.

---

## Slide 4

**Title:** Looking back to look ahead

**Subtitle:** Craft, tools, and what stays human.

**Body:**
- **The weavers** — Craft is redefined, not replaced. Tools change; skill endures.
- **Cart to car** — The leap matters more than the step. The focus is on the shift.
- **The digital era** — Systems, not just screens. Flows and platforms matter.
- **The future** — Human skills are amplified, not replaced.

---

## Slide 5

**Title:** Questioning the fundamentals

**Subtitle:** Do design principles change — or are new ones added?

**Quote:** "Free from desire, you see essence unformed. Caught in desire, you see only the manifestations." — Rick Rubin, The Way of Code

---

## Slide 6

**Title:** The designer process

**Subtitle:** Does productivity still mean the same thing?

---

## Slide 7

**Title:** The wider environment

**Subtitle:** Where are the bottlenecks? Who owns them?

---

## Slide 8

**Title:** Energy

**Subtitle:** What charges your designer battery?

**Body (labels in diagram):** Imagination, Creativity, Knowledge, Productivity, Value

---

## Slide 9

**Title:** Strength

**Subtitle:** AI guided me through a structural design problem

**Body:**
- Analyse load paths for this truss
- Compression, tension, triangulation — the agent explained the load paths.

---

## Slide 10

**Title:** Speed

**Subtitle:** Prompt to UI in seconds.

**Body (example prompt):** Create a login form with email and password

**Quote:** "Things arise and he accepts them. Things vanish and he lets them go." — Rick Rubin, The Way of Code

---

## Slide 11

**Title:** Iteration

**Subtitle:** Trust the process. Embrace ambiguity.

---

## Slide 12

**Title:** Imagination

**Subtitle:** Beyond the gates of technology.

---

## Slide 13

**Title:** Calmness

**Subtitle:** Less friction, more space to think.

**Quote:** "The work is done and then forgotten. That is why it lasts forever." — Rick Rubin, The Way of Code

---

## Slide 14

**Title:** Mystical Code

**Subtitle:** Code felt mystical — now it's reachable.

---

## Slide 15

**Title:** Empowerment

**Subtitle:** Build things that add value to your life.

**Body:** Mental health app · Drafting studio

---

## Slide 16

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

## Slide 17

**Title:** What is an AI model?

**Subtitle:** The brain agents run on.

**Body:**
- **Large language models (LLMs)** — Reads, reasons, and generates — trained on lots of text and code. Products: ChatGPT, Claude, Gemini (model-only). Tiers: Sonnet, GPT-4o-mini (quick) · Opus, GPT-4o (complex).
- **Why we use them** — Generate options and drafts faster — you focus on judgment, taste, and strategy.
- **Key point** — Outputs only — no tools, no actions. Models respond; they don't act.

---

## Slide 18

**Title:** Inside the model

**Subtitle:** Input → processing → output. Then repeat.

**Body (technical):** Prompt (text) → Tokenize (IDs) → Embed + pos (vectors) → Transformer × N (attention + MLP) → Logits → probs (next-token dist.) → Sample + decode (next token). Loop: append the sampled token to the context and run the same stack again until a stop condition.

**In plain language:** Your words (what you type) → Break into pieces (chunks it knows) → Turn into numbers (meaning as numbers) → The model (thinks about context) → What comes next? (pick the next piece) → Add & repeat (until done). Add that word and run the same steps again until it's done.

---

## Slide 19

**Title:** What is an AI agent?

**Subtitle:** Agents drive outcomes, not just outputs.

**Body:** Brain thinks. Memory remembers. Hands act.

**Caption (single-agent flow):** You → Agent → [Memory | Model | Tools]; Agent loads context.; Retrieved data returns to the Agent.; Agent calls the Model and passes that context in the prompt.; Model output returns to the Agent.

**Note:** Memory is separate from the model. The model is stateless — it only sees what’s in each request. Memory lives outside (e.g. conversation history, or a vector store — searchable by meaning, e.g. "things we decided about the checkout flow"). The agent retrieves it and injects it into the context the model sees. That's the idea behind RAG (retrieval-augmented generation): external knowledge, retrieved and injected into the context the model sees.

---

## Slide 20

**Title:** Model or agent?

**Subtitle:** Use both, in combination — to get ideas and get things done.

**Body:**
- **Model = fast thinking** — You want ideas (naming, options, outlines). You'll paste and edit (output stays with you). It's one question (scoped, no tools).
- **Agent = thinking + doing** — You want it to do things (edit files, run commands). It's multi-step (you review as it goes). You're delegating (hand off, don't paste and edit).

---

## Slide 21

**Title:** Agent architectures

**Subtitle:** Single-agent vs multi-agent.

**Body:**
- **Single-agent:** Best for: renames, refactors, single-step logic.
- **Multi-agent:** Agent plans, coordinates with Memory, Model, and Tools; delegates; sub-agents can hand off. Best for: architecture decisions, parallel work, multi-step tasks.

**In practice:** Simple multi-agent: one agent had the main task ("turn the slide deck into a document"); it delegated a subtask ("read the file and extract all slide copy") to another agent. Two agents, one handoff.

---

## Slide 22

**Title:** What makes behaviour agentic?

**Subtitle:** Plan → Act → Observe (inspect results) → Iterate.

**Body:** The model is the brain. The agent adds the wrapper — tools, a loop, and often memory — and that's what makes it agentic.

---

## Slide 23

**Title:** Vibe coding and Agentic coding

**Subtitle:** Prompt-driven and reactive vs autonomous and structured.

**Body:**
- **Vibe:** Intuitive, creative, fast. You prompt AI for quick results; you're the editor and reviewer. Best for: ideation, rapid prototyping, creative exploration.
- **Agentic:** Agents plan, execute, and test. You're the manager/supervisor. Proactive, long-running processes. Best for: complex systems, refactoring, CI/CD, production-level work.

Combine both: vibe for brainstorming and prototypes; agentic for reliable execution and maintenance.

---

## Slide 24

**Title:** Prompting styles

**Subtitle:** Vibe vs directive — how you phrase it.

**Body:**
- **Intent, mood, context.** "This flow feels clunky, help me improve it."
- **Explicit, step-by-step.** "Rename FooBar to FooBarV2, then update all imports."

Same agent, either style. Choose to fit the task.

**Quote:** "Free from intellect, free from abstraction, The Vibe Coder leads all things back to natural self-sufficiency." — Rick Rubin, The Way of Code

---

## Slide 25

**Title:** Prompt clarity

**Subtitle:** Task · Scope · Done.

**Body:**
- **Vague:** "fix the slider"
- **Specific:** "Fix the re-render loop in HealthMonitor. Don't change UI. Run lint."

---

## Slide 26

**Title:** Context and continuity

**Subtitle:** Sessions break. Context doesn't have to.

**Body:** learnings.md bridges sessions. Point at files · Paste snippets · Reference learnings

---

## Slide 27

**Title:** Intervention

**Subtitle:** Verify outputs, redirect when they drift, reframe when looping.

**Labels:** Hallucinate, Overcomplicate, Loop, Overwrite, Lazy, Fixate, Ignore, Drift, Tone, Pushback

**Body:** Don't expect perfection in the agents. Work with the agent to solve the problem together.

---

## Slide 28

**Title:** Agentic & designer productivity

**Subtitle:** How the agent loop improves how you work.

**Body:**
- **Fewer handoffs** — One prompt drives the steps; you evaluate and decide.
- **Faster iteration** — Agent tries options; you stay in review mode.
- **Less context-switching** — It reads, runs, summarizes; you focus on design thinking.
- **Scale routine work** — Delegate the repeatable; you focus on judgment and creativity.

Across the design process — discover, define, develop, deliver — the agent handles execution; you own direction and quality.

---

## Slide 29

**Title:** Tech stack

**Subtitle:** The technology that powers this project.

**Body:**
- **Front end:** React (UI framework), Vite (Build tool), Tailwind (CSS framework), Design system (Tokens, components, docs)
- **Back end:** Supabase Auth (OTP + sessions), Supabase Postgres (Database)

---

## Slide 30

**Title:** Pipeline

**Subtitle:** How it ships.

**Body:** Cursor (Code editor / AI) → GitHub (Version control) → Vercel (Deploy) → Namecheap (Domain / hosting). Commit → push → (CI) → deploy → live.

---

## Slide 31

**Title:** Cursor

**Subtitle:** AI-powered editor. When you prompt: ReAct — reasoning + acting.

**Body (labels on image):** Chat, Code editor, File directory, Select agent, Terminal

---

## Slide 32

**Title:** When you prompt

**Subtitle:** ReAct — reasoning + acting.

**Body (steps):** 1. Explore (scan context) · 2. Thought (plan) · 3. Response (text streams) · 4. Tool calls (read, write, search, run) · 5. Observation (sees results) · 6. Revise & loop (adjusts, loops) · 7. Done (complete). Simple prompts may skip the loop.

---

## Slide 33

**Title:** GitHub

**Subtitle:** Version control, collaboration, and the bridge between Cursor and deploy. Push runs checks and triggers deploy.

---

## Slide 34

**Title:** Vercel

**Subtitle:** Deploy from Git. Preview branches. Edge functions. The final step in the pipeline.

**Body:** main → Production deploy; branch → Preview URL. Push to main → automatic deploy. Every branch gets a preview.

---

## Slide 35

**Title:** Design systems

**Subtitle:** Give the agent a single source of truth. Outputs stay on-brand.

**Body:** Agent / project → Design system (tokens · components · docs) → On-brand output

---

## Slide 36

**Title:** Design system in practice

**Subtitle:** What to measure when design system + agent work together.

**Body:**
- Fewer revision cycles — Less back-and-forth to get on-brand UI
- Fewer design–dev handoff rounds — "Use our Button" once, not every sprint
- Faster to production-ready UI — Agent applies tokens and components
- More time on research, flows, craft — You focus where judgment matters

**How: point the agent at**
- **Tokens & components** — Spacing, color, type. Agent references when generating.
- **Specs in docs** — Figma, Markdown, Storybook. Agent reads and applies.
- **Or use a library** — Chakra, Radix, Mantine, Polaris. Agent uses primitives.

---

## Slide 37

**Title:** Testing

**Subtitle:** Fast feedback. Real browsers. Ship with confidence.

**Body:** Vitest (Unit tests), React Testing Library (Component testing), Playwright (End-to-end tests). CI runs on push (GitHub Actions).
- **Vibe** — Single-shot, iterative. "Add a unit test for this function." You review inline, tweak, repeat.
- **Directive** — Multi-step, autonomous. "Add test coverage for the checkout flow — unit tests and an E2E with Playwright."

This deck: 75 tests — unit, integration, E2E. Full coverage uncovers gaps; thorough testing keeps changes from breaking what works.

---

## Slide 38

**Title:** Helpful tips

**Subtitle:** Small practices that add up.

**Body:** Split view · Specs in MD · Watch & debug · Pace yourself · NPM · File directory · Inspect & console · Queuing prompts · Watch productivity · Patience

---

## Slide 39

**Title:** Activity

**Subtitle:** Vibe vs directive showdown. Same problem, two modes. Pairs pick team names.

**Body:**
- **Problem** — How might we design a booking flow for a Moon trip?
- **Format** — Show & tell: we vote on the clearest, most usable flow. Bragging rights for the winners.
- **What we're practising** — Choosing vibe vs directive, writing clear prompts, steering when it drifts — and taking this workflow into real work.
- **Outputs** — Prompts, agent responses, and generated UI/copy
- **Logistics** — Miro for collaboration; ChatGPT, DeepSeek, or TurboChat for the agent

---

## Slide 40

**Title:** Activity: Rounds

**Body:**
- **Round 1 · ~15 min — Start with vibe:** Explore flows and tone. Try: "How would you approach designing a booking flow for a Moon trip?" Chat, iterate, go wild. Single-shot, iterative. Exploratory.
- **Round 2 · ~25 min — Level up to directive:** Give AI a clear mission. Try: "Create a 3-step booking flow for a Moon trip: step 1 — departure date picker; step 2 — cabin selection (economy, business, first); step 3 — add-ons and terms. Include copy and layout." Multi-step, defined outcome. Goal-driven.
- **Round 3 · ~15 min — Show & tell:** Share the best Moon booking outputs — vibe vs directive. Vote on MVP prompt. Quick poll, then wrap. Debrief: How could this apply to our Earth bookings?

---

## Slide 41

**Title:** Activity: Run sheet

**Subtitle:** 1 hour total

**Body (run sheet):**
| Time | Duration | Step |
|------|----------|------|
| 0:00 | 2 min | Intro: Problem = Moon booking flow. Explain vibe vs directive. Pair up, pick team names. |
| 0:02 | 15 min | Round 1 — Vibe: Explore flows and tone. Chat, iterate. |
| 0:17 | 2 min | Transition: Explain directive. |
| 0:19 | 25 min | Round 2 — Directive: Create 3-step booking flow. One prompt, full outcome. |
| 0:44 | 15 min | Round 3 — Show & tell: Share outputs. Vote on MVP prompt. Debrief: How could this apply to our Earth bookings? Wrap. |
| 0:59 | 1 min | Buffer / wrap. |

Tip: Keep time visible. Call out at 5 min left in each round. For remote, use breakout rooms during rounds.

---

## Slide 42

**Title:** What we hope you take away

**Subtitle:** Agentic outcomes

**Body:**
- **Higher-level:** Designers who work with AI will have an edge — amplify empathy, judgment, creativity; keep the human at the centre. Stay in the driver's seat: steer agents; don't just accept outputs. Choose the right mode for the job — explore (vibe) or specify (directive). Treat agents as outcome-drivers, not just output-generators. Like in mixing: reduce the noise so you can focus on the signal.
- **In practice:** Vibe vs directive — Use each intentionally when prompting agents. Clear prompts — What, where, rules; fewer revision loops. Point at design system — Tokens, docs, or a library. Intervene when it drifts — Don't expect perfection; steer when it loops. Try one this week — Small agentic task in Cursor.

Productivity that serves quality — fewer revision loops, clearer briefs, and time to focus on judgment and creativity.

---

## Slide 43

**Title:** An opportunity of a lifetime

**Body:** AI won't replace designers — but designers who work with AI will have an edge. Amplify empathy, judgment, creativity. Embrace the tools, question the outputs, keep the human at the centre.

**Subtitle:** Pushing further than traditional engineering and dev teams.

**Tags:** AI is in its infancy, Creating massive value, Move fast, Understand where needed, Pause and reflect — The speed of thinking and questioning itself is incredible

**Quote:** "Empty, yet inexhaustible, fathomless and eternal. Source is the ancestor of elegant patterns." — Rick Rubin, The Way of Code

---

## Slide 44

**Title:** Thank you

**Subtitle:** Questions?
