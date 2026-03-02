# AI Preso deployment (2097.io)

Standalone AI preso site. Use a **separate** Vercel project so 2097.io serves only the preso, not the full portfolio.

## Vercel (recommended)

Use **Root Directory** so this project builds only the preso (no env var needed).

1. In Vercel: **Add New… → Project**, import the same repo.
2. **Settings → Build and Development:**
   - **Root Directory:** set to **`ai-preso`** (required).
   - Build Command / Output Directory: leave default; `ai-preso/vercel.json` and `ai-preso/package.json` define the build and output.
3. **Settings → Domains:** add `2097.io` and `www.2097.io`.
4. **Environment variables:** add **`VITE_SUPABASE_URL`** and **`VITE_SUPABASE_ANON_KEY`** (no BUILD_PRESO needed).
5. **Redeploy** after changing Root Directory.

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
