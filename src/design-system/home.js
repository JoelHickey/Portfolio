/**
 * Home page design tokens — keep in sync with `tailwind.config.js` (`home-*` theme keys).
 * Use Tailwind classes (`bg-home-cta`, `shadow-home-card-glow`, …) in JSX where possible;
 * use this file for inline styles, SVG, canvas, or documentation.
 */

export const HOME_GRADIENT_CTA =
  'linear-gradient(90deg, #0e7490 0%, #4f46e5 38%, #7c3aed 62%, #c026d3 100%)'

export const HOME_GRADIENT_CTA_LABEL =
  'linear-gradient(90deg, #5eead4 0%, #a5b4fc 38%, #c4b5fd 62%, #f0abfc 100%)'

export const HOME_GRADIENT_H2_STORIES =
  'linear-gradient(135deg, #0f172a 0%, #312e81 22%, #5b21b6 42%, #7c3aed 58%, #a78bfa 74%, #4c1d95 100%)'

export const HOME_GRADIENT_H2_VALUE =
  'linear-gradient(135deg, #0f172a 0%, #0d9488 25%, #06b6d4 50%, #22d3ee 75%, #0f172a 100%)'

export const HOME_GRADIENT_CARD_TITLE_ON_DARK =
  'linear-gradient(90deg, #0f172a 0%, #4f46e5 35%, #0891b2 70%, #0f172a 100%)'

/** Hero “Joel Hickey” — distinct from CTA bar; no Tailwind utility yet */
export const homeHeroNameGradientTextStyle = {
  background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 25%, #6366f1 50%, #8b5cf6 75%, #d946ef 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent'
}
