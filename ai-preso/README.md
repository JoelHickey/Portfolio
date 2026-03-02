# AI Preso deployment (2097.io)

Standalone AI preso site. Use a **separate** Vercel project so 2097.io serves only the preso, not the full portfolio.

## Vercel (recommended)

The repo’s `npm run build` runs the **preso** build when `VERCEL_PROJECT_NAME` is `aipreso`, so you only need to set **Output Directory** for this project.

1. In Vercel: **Add New… → Project**, import the same repo. Name the project **aipreso** (so the conditional build runs the preso).
2. **Root Directory:** leave empty.
3. **Build Command:** leave default (`npm run build`) — no override needed.
4. **Output Directory:** turn **Override** on and set **`ai-preso/dist`** (Framework Settings → Output Directory, above Root Directory on the Build and Development page).
5. **Settings → Domains:** add `2097.io` and `www.2097.io`.
6. **Environment variables:** add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
7. Deploy (push or redeploy).

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
