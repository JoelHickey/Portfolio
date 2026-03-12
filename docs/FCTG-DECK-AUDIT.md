# FCTG Deck Audit — Ship Readiness

Audit completed for consistency, typos, and alignment. **Update:** Component now has **50 slides** (index 0–49); doc `FCTG-AI-TALK-SLIDE-DECK.md` has **44 sections** (Slide 1–44). Doc ↔ component no longer 1:1 (see report below).

---

## ✅ Fixes applied

| Issue | Change |
|-------|--------|
| **Typo** | "The designer process" → "The design process" |
| **Hyphenation** | "hands on activity" → "hands-on activity" |
| **Stale comment** | Background block "Slide 36: Pricing & usage" → "Slide 37: Testing" |
| **Slide comments** | Level up, Rounds comments updated for doc numbering |

---

## ⚠️ Items for your review

### 1. Slide 2 — Empathy quote attribution
**Current:** "— Attribution"  
**Note:** Placeholder; quote often attributed to various futurists / designers. Add the actual source before presenting (e.g., "— [Name]").

### 2. Level up Setup — Claude Code link
**Current:** Links to `https://claude.ai`  
**Note:** Claude Code may have a different URL. Confirm before delivery.

### 3. Miro board link
**Current:** `https://miro.com/app/board/uXjVG-nWxPQ=/`  
**Note:** Confirm this is the correct board for the activity.

---

## ✓ Verified (pre–50-slide state)

- **Slide count:** *No longer accurate.* Component has **50 slides** (0–49); doc has **44 sections**. `SLIDE_COUNT` = 50; `FCTG_SLIDE_QUOTES` still keyed by index.
- **Doc ↔ component:** *No longer fully aligned.* Takeaway slide, activity slide, and structure differ (see FCTG-AI-TALK alignment report).
- **Chapter labels:** In component: Concepts (3–7), Monumental moments (10–15), Mechanisms (17–20), From vibe to agentic (22–29), Design practice (31–37), AI-ready systems (38–43), Activity (44–45), Close (46–49). Doc section numbers (1–44) do not map to component indices.
- **Terminology:** "Vibe vs directive", "agentic", "outcome-drivers" used consistently.
- **Links:** Miro and Figma Make links present on Instructions (activity) slide; no Claude/agent link on slides (practice plan mentions Claude Code — confirm intent).
- **UK spelling:** "Analyse" used (appropriate for FCTG/Australian audience).
- **Get started labels:** "Redirect, Don't Fight", "Reset When Stuck", "Document As You Go" — casing intentional.

---

## Ship checklist

- [ ] Add attribution for empathy quote (Slide 2)
- [ ] Verify Claude Code URL
- [ ] Verify Miro board URL
- [ ] Run through deck end-to-end (keyboard nav, mobile)
- [ ] Confirm images load (`/images/AI talk/` paths)
