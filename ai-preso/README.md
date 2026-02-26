# AI Preso deployment (2097.io)

This folder contains the Netlify config for the standalone AI preso site.

**Netlify Build settings:**
- **Base directory:** `ai-preso`
- Build command and publish directory are in `ai-preso/netlify.toml`

## Supabase auth

1. Create a project at [supabase.com](https://supabase.com)
2. Copy `.env.example` to `.env` and add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
3. In Netlify → Site configuration → Environment variables, add the same vars
4. In Supabase → Authentication → URL Configuration, add:
   - Site URL: `https://2097.io`
   - Redirect URLs: `https://2097.io`, `https://www.2097.io`, `http://localhost:4174`
