# FCTG AI Talk — Questions you may be asked (with suggested answers)

Prepared so you’re ready for the day. Use or adapt these answers.

---

## About the “Then vs Now” and your experience

**Q: How did you actually measure the “Then” vs “Now” effort (e.g. 30% in Develop)? Is it anecdotal or did you track time?**

**A:** It’s based on experience rather than formal time-tracking. The percentages are illustrative—they’re there to show *where* the biggest shifts are (especially in Develop) and to start a conversation. If we wanted to make it data-led later, we could run a short pilot and log hours per phase before and after.

---

**Q: You removed Codegen/HELiO by name—will people assume it’s about our current tools and ways of working?**

**A:** The slide is about the *pattern*: spec-heavy handoff, long cycles, context lost, alignment issues. I’ve kept it generic so it speaks to anyone who’s lived that, regardless of which platform. If people ask “is this us?”, I say it’s drawn from real projects; the lesson is what changes when you have an agent in the loop, not naming past tools.

---

**Q: Which of the productivity gains have you seen yourself vs which are “this is possible with the tools”?**

**A:** I’ve personally seen: prototypes in minutes, design system on cue (when the system is in code or docs the agent can read), alignment gaps surfacing quickly, and less time on prototype rework. Things like “competitive review in minutes” and “training/UAT scenarios generated” I’ve seen in practice; others (e.g. full PRD sync, accessibility in flow) are where the tools are heading and worth piloting.

---

**Q: What if our design system isn’t in a form an agent can use—how do we get to “design system on cue”?**

**A:** Start with what the agent *can* read: tokens and components in code, or a single source of truth (e.g. docs, Storybook). If the system lives only in Figma, the first step is exporting tokens or key patterns into something machine-readable. It doesn’t have to be perfect—even a small, documented subset gives “on cue” value.

---

## About the activity (Moon booking, Miro, rounds)

**Q: Why Moon/Mars instead of a real FCTG flow (e.g. Earth booking)?**

**A:** So everyone can focus on *how* they work with the agent—prompting, vibe vs agentic, redirecting—without getting stuck on real constraints (brand, APIs, existing flows). Once that’s comfortable, we can apply the same approach to Earth bookings or any real brief.

---

**Q: What if people don’t have or don’t want to use Claude Code—can they use something else?**

**A:** Yes. The activity is about the *pattern*: start conversational (vibe), then give a clear mission (agentic). Any capable coding agent (e.g. Cursor, other tools) works. The slide links to Claude Code for consistency; we can share alternatives beforehand if needed.

---

**Q: How do we make sure the activity doesn’t feel like a demo that doesn’t apply to our day job?**

**A:** The debrief is there for that: “How could this apply to our Earth bookings?” We’re not asking them to ship a Moon flow—we’re asking them to feel the difference between vibe and agentic, then take that mindset and one concrete habit (e.g. “I’ll try one agentic prompt on a real flow this week”) back to their work.

---

**Q: What’s the minimum we need on the Miro board before the session (e.g. frames, voting)?**

**A:** Frames for: Problem & links, Round 1 (vibe prompts/outputs), Round 2 (agentic prompts/outputs), Show & tell (best outputs). Before Round 3, turn on voting (e.g. dot voting) in the Show & tell frame so everyone can vote on which flow they’d ship. One dot colour is enough unless we want to capture different criteria.

---

## Sceptical or pushback

**Q: Isn’t this mostly for engineers? Why should designers spend time on “agents” and code?**

**A:** Designers own flows, UX, and what gets built. If we don’t engage with how things are actually made—including agents that generate UI and copy—we get handed outputs we didn’t shape. This isn’t about becoming a developer; it’s about staying in the driver’s seat: setting direction, reviewing, redirecting, and using the right prompt at the right time.

---

**Q: How do we avoid design becoming “prompt and accept” and losing craft and judgment?**

**A:** The deck is explicit: you steer, the agent executes. We’re not optimising for “fewer decisions”—we’re optimising for less *grind* (spec treadmill, alignment loops, prototype rework) so we have more time for judgment, creativity, and craft. The “vibe vs directive” and “redirect when it drifts” points are there to keep human judgment central.

---

**Q: What about quality, consistency, and brand—won’t AI output be all over the place?**

**A:** That’s why “design system on cue” and “alignment to designs checked” are in the slide. The gain isn’t “let the AI go wild”—it’s “give the agent the system and the intent, then review and refine.” Consistency comes from pointing the agent at tokens, components, and tone; quality comes from us checking and correcting.

---

**Q: Have you seen this actually ship in production, or is it still prototype/pilot?**

**A:** I’ve used it to get real prototypes and flows to a shippable state—the “one artifact,” no design–dev handoff, is something I’ve lived. Full production rollout depends on org (tools, security, governance). The talk is about what’s *possible* and how to build the skills; production adoption is the next conversation with tech and leadership.

---

**Q: What if leadership just sees “AI” and thinks we can cut design headcount?**

**A:** The angle I’d take: AI changes *how* design work gets done, not *whether* we need design. The value is better flows, faster iteration, and designers who can shape what gets built instead of handing off and hoping. That’s a multiplier for design impact, not a replacement. The “early majority” and “shape AI for travel design” framing is there to position design as leading, not defending.

---

## Practical and tooling

**Q: Which tools are we standardising on—Cursor, Claude, something else? Who pays?**

**A:** I’m not deciding policy for FCTG—that’s for the org. The deck shows Cursor and Claude as examples of the *kind* of setup (editor + agent). Whatever we standardise on, the skills we’re practising—vibe vs agentic, clear prompts, redirecting—transfer. Cost and licensing are for leadership and IT to sort out.

---

**Q: How do we handle confidentiality and IP when using cloud AI for FCTG flows and copy?**

**A:** Good question for legal and security. In general: don’t put confidential customer data or unreleased strategy into public AI. For a workshop we’re using a generic Moon booking brief; for real work, we’d need clear guidance on what can go into which tools and whether we have enterprise/on-prem options.

---

**Q: What about accessibility and compliance when we generate UI and copy with AI?**

**A:** The slide calls out “a11y in flow; AI suggests fixes”—so we’re not skipping a11y; we’re bringing it into the loop. Generated UI and copy still need to be reviewed against our standards and compliance. The agent can help catch issues; we still own the sign-off.

---

**Q: How do we “point at your design system” if it’s in Figma and the agent is in code?**

**A:** Today that often means: tokens or key components documented in code or in a doc the agent can read, or exported from Figma (e.g. tokens). The ideal is a single source of truth that both design and code use. If the system is only in Figma, the first step is making a slice of it machine-readable so the agent can reference it.

---

## Strategy and rollout

**Q: What’s the one thing we should do in the next 7 days / 30 days?**

**A:** *7 days:* One “agentic” prompt on a real task—e.g. “Generate a 3-step flow for [X] using our components and tone.” See how it feels to steer and refine. *30 days:* Pick one small project or flow and do it start-to-finish with an agent in the loop; then reflect on what was faster and what wasn’t.

---

**Q: Is there a pilot or proof of concept we can join?**

**A:** That’s a conversation with the team and leadership. This talk is to build shared language and skills. A natural next step would be a small pilot (e.g. one squad or one flow) with clear success criteria and a short retrospective. I’m happy to help shape that if it’s useful.

---

**Q: How does this fit with our existing design process and governance?**

**A:** Same phases—discover, define, develop, deliver. We’re not throwing out the process; we’re changing how much of the heavy lifting is manual vs assisted. Governance (reviews, sign-off, accessibility, brand) still applies; we’re just getting to “reviewable” faster and with less rework.

---

**Q: Who owns “AI for design” in the org—design, tech, or a joint thing?**

**A:** I’d frame it as joint: design owns the intent, flows, and quality bar; tech owns the tools, security, and pipelines. Design needs to be in the room so we shape how AI is used for our work, not just receive whatever engineering adopts.

---

## About you and the talk

**Q: How long have you been using this in real work, and on what kind of projects?**

**A:** [Adapt to your experience.] I’ve been using AI-assisted design and coding agents on real flows and prototypes for [X]. The “Then vs Now” slide is drawn from that—spec-heavy handoff, long cycles, alignment issues—and what’s different when you have an agent in the loop.

---

**Q: What’s the biggest mistake or disappointment you’ve had with AI-assisted design?**

**A:** Expecting the first output to be final. It’s a collaboration: you prompt, you review, you redirect. When I treat it like “one prompt, done,” quality drops. When I treat it like “clear brief, then iterate,” it’s much better. That’s why we stress steering and redirecting.

---

**Q: Why present to design and not just to dev/engineering?**

**A:** Because designers own the flows, the UX, and the “what we’re building.” If only engineering has these tools, we get handed outputs we didn’t shape. I want design to be in the room—and in the driver’s seat—when we decide how AI is used for our products.

---

**Q: What would you do differently if you were rolling this out to the whole team?**

**A:** I’d pair the talk with a very small, concrete pilot and a “7-day win”—one habit per person—so it doesn’t stay theoretical. I’d also make sure we have a clear answer on tools, access, and confidentiality so people don’t feel blocked.

---

## Quick-fire / curveballs

**Q: What’s one thing you’d remove from the deck if you had to cut one slide?**

**A:** I’d keep the Then vs Now and the activity; if I had to drop something, it might be one of the more conceptual slides (e.g. Energy/Strength/Speed) and lean on the narrative in the room. The goal is people leaving with “vibe vs agentic” and one thing they’ll try.

---

**Q: How would you explain “agentic” to a non-technical stakeholder in one sentence?**

**A:** “Agentic means the AI can take a clear goal and work through multiple steps—editing files, checking things, using tools—instead of just answering one question at a time. You give the mission; it executes; you review and steer.”

---

**Q: What’s the main thing you want people to remember from today?**

**A:** Same phases—you steer, the agent executes. Better prompting and confident delegation, with the human at the centre. And one concrete thing they’ll try in the next week.

---

*End of Q&A. Good luck for the day.*
