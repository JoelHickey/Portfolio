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
      },
      boxShadow: {
        'ds-card': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'ds-card-hover': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      backgroundImage: {
        'ds-heading-gradient': 'linear-gradient(to right, #1e293b, #4f46e5, #1e293b)',
        'ds-accent-gradient': 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
        /* FCTG AI Talk — v1 (light) and v2 (dark slides) */
        'fctg-heading-v1': 'linear-gradient(to right, #1e293b, #4f46e5, #1e293b)',
        'fctg-heading-v2': 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
      },
      /* FCTG section layout */
      maxWidth: {
        'fctg-section': '72rem',
      },
    },
  },
  plugins: [],
}
