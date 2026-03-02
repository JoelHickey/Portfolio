# Learnings

Project learnings and gotchas for future reference.

---

## Vercel: two projects from one repo (portfolio + aipreso)

**Goal:** One repo, two Vercel projects — **portfolio** (main site) and **aipreso** (2097.io, preso only). aipreso must build and serve only the preso, not the portfolio.

### What went wrong

1. **Wrong build for aipreso**  
   The aipreso project was using the same build as the portfolio (root `npm run build` → portfolio). Fix: **Build Command** override in the aipreso project: `npm ci && npm run build:ai-preso`. The repo’s `scripts/vercel-build.js` checks `BUILD_PRESO` or `VERCEL_PROJECT_NAME === 'aipreso'` and runs the preso build for that project.

2. **Output directory mismatch**  
   The preso build writes to **`ai-preso/dist`**, but the **root `vercel.json`** has `outputDirectory: "dist"`. Vercel looked for **`dist`** at the repo root, didn’t find it, and failed with “No Output Directory named ‘dist’ found”. The dashboard override to `ai-preso/dist` wasn’t reliable (same repo, root vercel.json can take precedence).

3. **Redeploy vs new deployment**  
   “Redeploy” rebuilds the **same** commit. To get a build from **latest** `main` with current project settings, use **Create Deployment** and enter branch **`main`**.

4. **Git author and “contributing access”**  
   Vercel can block “Create Deployment” with: “Deployment request did not have a git author with contributing access.” It checks the **commit author** (git `user.name` / `user.email`), not your Cursor or login email. Commits authored by “Your Name” or another non–team-member fail. Fix: set git config for the repo to a team member (e.g. `Joel Hickey` / `joel_hickey@hotmail.com`) and push a new commit, then Create Deployment from `main`.

### What fixed it

- **Build script:** When the preso build runs, after `build:ai-preso` we **copy `ai-preso/dist` → `dist`**. So Vercel finds `dist` with the preso output and the deployment succeeds, without relying on the dashboard output override.
- **aipreso project settings:** Build Command override: `npm ci && npm run build:ai-preso`. Optionally set `BUILD_PRESO=true` env var. Root Directory left empty.
- **Deploy from latest main** with the correct git author so Vercel accepts the deployment and uses the updated script.

### TL;DR

- **Issue:** Preso output lived in `ai-preso/dist` but Vercel expected `dist` (root vercel.json).
- **Fix:** After the preso build, copy `ai-preso/dist` → `dist` in `scripts/vercel-build.js` so Vercel finds the output.

---

## CI: ESM and `require()` in scripts

The repo has `"type": "module"` in `package.json`, so `.js` files are ESM. Using `require()` in a script (e.g. `scripts/vercel-build.js`) causes `ReferenceError: require is not defined`. Use `import` instead (e.g. `import { execSync } from 'child_process'`).
