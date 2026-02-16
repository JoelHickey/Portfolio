# Portfolio Testing Plan

A structured testing strategy for the portfolio project—covering hierarchy, current coverage, and roadmap.

---

## 1. Testing Hierarchy

### 1.1 Parent Levels (Above Project)

```
┌─────────────────────────────────────────────────────────┐
│  TESTING TYPES (What kind of test)                      │
│  ┌─────────────────────────────────────────────────┐   │
│  │ E2E        Full app, real browser, real flows   │   │
│  │            (Playwright, Cypress)                 │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ Integration  Multiple units, routing, APIs      │   │
│  │              (component + router + store)       │   │
│  ├─────────────────────────────────────────────────┤   │
│  │ Unit         Single component or function       │   │
│  │              (Vitest + React Testing Library)   │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  EXECUTION (Where tests run)                            │
│  Local dev → CI/CD pipeline → Quality gates             │
└─────────────────────────────────────────────────────────┘
```

### 1.2 Project Structure

```
Portfolio
├── Pages (route-level)
│   ├── Home
│   ├── About
│   ├── Work
│   ├── Contact
│   ├── Amendments
│   │   └── AmendmentsDemo → AmendmentsFlowDemo
│   └── FCTGAITalk
│
├── Amendments Ecosystem
│   ├── AmendmentsFlowDemoTailwind  ← Dream flow (primary demo)
│   ├── AmendmentsFlowDemoPrimer
│   └── shared/* (ProviderCard, HotelCard, etc.)
│
└── Shared Components
    ├── MatrixRain
    ├── WeavingLoom
    └── AnimatedLineDrawing
```

---

## 2. Current Coverage

| Layer | Scope | Tests | Status |
|-------|-------|-------|--------|
| **Unit** | Dream flow logic (getAvailability, rangeContainsSoldNight, etc.) | 22 | ✅ |
| **Unit** | Dream flow user flows (open, Confirm, Back, sold-out, etc.) | 15 | ✅ |
| **Unit** | Dream flow edge cases (AI Use, Split, Hold, Search, etc.) | 16 | ✅ |
| **Unit** | Turtle flow (old flow: Amend → Travellers → Search → Results → Cart → Payment → Confirm) | 6 | ✅ |
| **Unit** | Rabbit flow (new flow: Search & Travellers → Results → Review → Confirm) | 5 | ✅ |
| **Integration** | Amendments page + demo entry | 3 | ✅ |
| **Integration** | AmendmentsDemo page + AmendmentsFlowDemo | 2 | ✅ |
| **Integration** | App routing (Home, Work, Amendments, Demo, Contact, About) | 6 | ✅ |
| **E2E** | Full app (Playwright smoke) | 1 | ✅ |

**Total: 75 tests** (64 unit + 11 integration)

---

## 3. Tooling

| Purpose | Tool | Config |
|---------|------|--------|
| Test runner | Vitest | `package.json` scripts |
| Component testing | React Testing Library | — |
| DOM assertions | @testing-library/jest-dom | `src/test/setup.js` |
| User interaction | @testing-library/user-event | — |
| Mocking | Vitest `vi` | `canvas-confetti`, `ResizeObserver` mocked |
| E2E | Playwright | `playwright.config.js`, `e2e/`; starts dev server via `webServer` |

**Commands:**
- `npm test` — run all unit/integration tests
- `npm run test:watch` — watch mode during development
- `npm run e2e` — run E2E tests (Playwright; starts dev server if needed)
- `npm run e2e:ui` — run E2E tests in Playwright UI mode

---

## 4. Roadmap

### Phase 1: Solidify Unit Layer (Current)

| Priority | Task | Est. | Status |
|----------|------|------|--------|
| 1.1 | Dream flow logic tests | — | ✅ Done |
| 1.2 | Dream flow user flows | — | ✅ Done |
| 1.3 | Dream flow Confirm + history | — | ✅ Done |
| 1.4 | Turtle flow (old flow) | 1–2 days | ✅ Done |
| 1.5 | Rabbit flow (new flow) | 1–2 days | ✅ Done |

### Phase 2: Integration Tests ✅

| Priority | Task | Est. | Notes |
|----------|------|------|-------|
| 2.1 | Amendments page renders + demo entry | 0.5 day | ✅ `src/pages/Amendments.test.jsx` |
| 2.2 | AmendmentsDemo page + AmendmentsFlowDemo | 0.5 day | ✅ `src/pages/AmendmentsDemo.test.jsx` |
| 2.3 | Routing smoke: key routes render | 1 day | ✅ `src/App.test.jsx` |

### Phase 3: E2E (Optional)

| Priority | Task | Est. | Notes |
|----------|------|------|-------|
| 3.1 | Add Playwright or Cypress | 0.5 day | ✅ `playwright.config.js`, `e2e/smoke.spec.js` |
| 3.2 | Critical path: navigate to demo, run dream flow | 1 day | Hero → Work → Amendments → Demo → Confirm |
| 3.3 | Visual regression (optional) | 1+ days | Perceptual diffs |

### Phase 4: Quality Gates

| Priority | Task | Notes |
|----------|------|-------|
| 4.1 | Run tests in CI on push/PR | GitHub Actions, etc. |
| 4.2 | Block merge on test failure | Standard practice |
| 4.3 | Coverage report (optional) | `vitest --coverage` |

---

## 5. Test Naming and Structure

### Naming Convention

```
describe('Feature / Component')
  describe('Sub-area (e.g. logic, user flows, edge cases)')
    it('specific behavior in user-facing terms')
```

### Example

```js
describe('Dream flow – logic', () => {
  describe('getAvailability', () => {
    it('marks days 1, 8, 16, 22 as sold', () => { ... })
  })
})

describe('Dream flow – user flows', () => {
  it('Confirm collapses flow and shows amended card in itinerary', () => { ... })
})
```

---

## 6. What to Test (Guidelines)

### Do Test
- User-visible behavior (flows, interactions)
- Pure logic (date math, availability)
- Edge cases (sold-out, split stay, empty state)
- Error and loading states
- Accessibility attributes (`aria-*`, `role`)

### Defer or Skip
- Implementation details (internal state shape)
- Third-party libraries
- Trivial presentational markup
- Rarely changed legacy code

---

## 7. Quick Reference

| Question | Answer |
|----------|--------|
| Where are tests? | Unit/Integration: `src/amendments/AmendmentsFlowDemoTailwind.test.jsx`, `src/pages/Amendments.test.jsx`, `src/pages/AmendmentsDemo.test.jsx`, `src/App.test.jsx`. E2E: `e2e/*.spec.js` |
| How to run? | `npm test` (unit/integration), `npm run e2e` (E2E; starts dev server automatically), `npm run e2e:ui` (E2E UI mode) |
| How to add tests? | New `describe` / `it` blocks, mirror component structure |
| When to retest? | After changing amendments demo, before deploy |
| CI? | Add GitHub Actions (or similar) to run `npm test` |

---

## 8. Next Steps

1. **Short term:** Run `npm test` before commits that touch amendments demo or routing.
2. **Medium term:** Phase 2 integration tests complete. Phase 1.4/1.5 (Turtle/Rabbit flow) done. Consider Phase 3 (E2E).
3. **Long term:** Add CI pipeline and optional E2E.
