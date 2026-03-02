# AI Preso deployment (2097.io)

Standalone AI preso site. Use a **separate** Vercel project so 2097.io serves only the preso, not the full portfolio.

## Vercel (recommended)

If aipreso.vercel.app still shows the portfolio, Vercel is likely using the **repo root** build (Framework Preset = Vite). Force the preso build:

1. **aipreso** project → **Settings** → **Build and Development**.
2. **Framework Preset:** set to **Other** (not Vite). This makes Vercel use **Root Directory** and **ai-preso/vercel.json** instead of the root app.
3. **Root Directory:** set to **`ai-preso`**.
4. **Build Command** (if you see an Override): leave empty so `ai-preso/vercel.json` is used, or set **`cd .. && npm ci && npm run build:ai-preso`**.
5. **Output Directory** (if you see an Override): leave empty or set **`dist`** (relative to ai-preso = ai-preso/dist).
6. **Redeploy** (⋯ on latest deployment → Redeploy, **uncheck** “Use existing Build Cache”).
7. **Domains:** ensure **aipreso.vercel.app** and **2097.io** are on this project only. In the **portfolio** project → Domains, confirm aipreso.vercel.app is **not** listed (if it is, remove it).

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
