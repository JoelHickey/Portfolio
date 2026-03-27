/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        ds: {
          primary: '#4f46e5',       // indigo-600
          'primary-light': '#818cf8',
          accent: '#22d3ee',        // cyan-400
          'accent-muted': '#0e7490', // cyan-800
          surface: {
            DEFAULT: '#ffffff',
            muted: '#f8fafc',        // slate-50
          },
          text: {
            primary: '#0f172a',     // slate-900
            secondary: '#475569',   // slate-600
            muted: '#94a3b8',       // slate-400
          },
          border: {
            DEFAULT: '#e2e8f0',
            accent: '#818cf8',
          },
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      fontSize: {
        'ds-heading-lg': ['3rem', { lineHeight: '1.15' }],
        'ds-heading-md': ['2.25rem', { lineHeight: '1.2' }],
        'ds-heading-sm': ['1.5rem', { lineHeight: '1.3' }],
        'ds-body': ['1rem', { lineHeight: '1.6' }],
        'ds-body-sm': ['0.9375rem', { lineHeight: '1.6' }],
      },
      spacing: {
        'ds-section': '3rem',
        'ds-card': '1.5rem',
      },
      borderRadius: {
        'ds-card': '0.75rem',
        'ds-badge': '0.5rem',
        'home-card': '2rem',
      },
      boxShadow: {
        'ds-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'ds-card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'home-card-glow':
          '0 0 8px rgba(34, 211, 238, 0.16), 0 0 24px rgba(34, 211, 238, 0.12), 0 0 48px -12px rgba(34, 211, 238, 0.1)',
        'home-card-glow-hover':
          '0 0 16px rgba(34, 211, 238, 0.22), 0 0 32px rgba(34, 211, 238, 0.16), 0 0 64px -16px rgba(34, 211, 238, 0.14)',
      },
      backgroundImage: {
        'ds-heading-gradient': 'linear-gradient(to right, #1e293b, #4f46e5, #1e293b)',
        'ds-accent-gradient': 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
        /* FCTG AI Talk — v1 (light) and v2 (dark slides) */
        'fctg-heading-v1': 'linear-gradient(to right, #1e293b, #4f46e5, #1e293b)',
        'fctg-heading-v2': 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
        /**
         * Home page — extracted design tokens (primary CTA bar, section H2s, card chrome).
         * JS fallbacks: src/design-system/home.js
         */
        'home-cta': 'linear-gradient(90deg, #0e7490 0%, #4f46e5 38%, #7c3aed 62%, #c026d3 100%)',
        'home-cta-label':
          'linear-gradient(90deg, #5eead4 0%, #a5b4fc 38%, #c4b5fd 62%, #f0abfc 100%)',
        'home-h2-stories':
          'linear-gradient(135deg, #0f172a 0%, #312e81 22%, #5b21b6 42%, #7c3aed 58%, #a78bfa 74%, #4c1d95 100%)',
        'home-h2-value':
          'linear-gradient(135deg, #0f172a 0%, #0d9488 25%, #06b6d4 50%, #22d3ee 75%, #0f172a 100%)',
        'home-card-title-on-dark':
          'linear-gradient(90deg, #0f172a 0%, #4f46e5 35%, #0891b2 70%, #0f172a 100%)',
      },
      /* FCTG section layout */
      maxWidth: {
        'fctg-section': '72rem',
      },
    },
  },
  plugins: [],
}
