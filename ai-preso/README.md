# AI Preso deployment (2097.io)

Standalone AI preso site. Use a **separate** Vercel project so 2097.io serves only the preso, not the full portfolio.

## Vercel — one-time setup (aipreso project)

Use **only** these settings. Do **not** set Root Directory.

| Setting | Value |
|--------|--------|
| **Root Directory** | *(leave empty)* |
| **Framework Preset** | Other |
| **Build Command** (Override on) | `npm ci && npm run build:ai-preso` |
| **Output Directory** (Override on) | `ai-preso/dist` |

Then: **Deployments** → ⋯ → **Redeploy** (uncheck “Use existing Build Cache”).

- **Domains:** Add `2097.io` and `www.2097.io` to this project only. In the **portfolio** project, remove `aipreso.vercel.app` if it’s there.

## Netlify (legacy)

- **Base directory:** `ai-preso`
- Build command and publish directory are in `ai-preso/netlify.toml`

## Supabase auth

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env` and add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. In Vercel (or Netlify) → Environment variables, add the same vars
4. In Supabase → Authentication → URL Configuration, add:
   - Site URL: `https://2097.io`
   - Redirect URLs: `https://2097.io`, `https://www.2097.io`, `http://localhost:4174`
