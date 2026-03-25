/** Standalone AI preso (e.g. 2097.io). Override in .env with VITE_FCTG_PRESO_URL */
export const FCTG_PRESO_URL =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_FCTG_PRESO_URL) ||
  'https://2097.io'
