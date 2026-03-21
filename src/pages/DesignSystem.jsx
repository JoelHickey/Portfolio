import { useState } from 'react'
import { homeHeroNameGradientTextStyle } from '../design-system/home'

const code = 'rounded bg-white/10 px-1.5 py-0.5 text-sm text-cyan-100/90'
const tokenLabel = 'rounded bg-white/10 px-1.5 py-0.5 font-mono text-[11px] font-normal text-cyan-100/85'

const OVERVIEW_AREA_ITEMS = [
  { label: 'Architecture', active: true },
  { label: 'Tokens', active: true },
  { label: 'Sample pages', active: true },
  { label: 'Documentation', active: true },
  { label: 'How to', active: true },
  { label: 'Design principles', active: false },
  { label: 'Brand guidelines', active: false },
  { label: 'Resources', active: false }
]

const OVERVIEW_AREA_DETAILS = {
  Foundations: {
    status: 'Defined for Home',
    summary: 'The shared visual rules for the Home page.',
    detail:
      'Today that mainly means typography, gradients, colors, shadows, and radius values used across the Home experience.',
    sources: ['tailwind.config.js', 'src/design-system/home.js'],
    next: 'See the Foundations tab for heading examples and the Sources tab for where these values are defined.'
  },
  Architecture: {
    status: 'Emerging structure',
    summary: 'How the Home design system is organized and consumed in code.',
    detail:
      'The current structure splits shared theme values into Tailwind config, mirrors some values in `home.js` for JavaScript-driven use, and applies them in `Home.jsx` while this page documents the result.',
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: ''
  },
  Tokens: {
    status: 'Defined for Home',
    summary: 'The smallest shared style values in the current system.',
    detail:
      'Tokens are the shared visual decisions that keep the interface consistent. They help designers make faster, more repeatable decisions and help engineers implement those same decisions once and reuse them reliably across components and patterns.',
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx'],
    next: ''
  },
  Components: {
    status: 'Defined for Home',
    summary: 'Reusable UI building blocks that already appear in Home.',
    detail:
      'Buttons and card treatments are the clearest current component layer in this system, and they are documented in the component tabs on this page.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the Components tabs for button treatments, card titles, and case-study card shells.'
  },
  Patterns: {
    status: 'Defined for Home',
    summary: 'Repeatable arrangements built from components.',
    detail:
      'Right now this mostly shows up as hero sections, CTA groupings, and case-study shells that combine multiple shared styles and components into larger UI patterns.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'Patterns are nested inside components in this overview because they are built from those reusable pieces.'
  },
  Documentation: {
    status: 'Defined for Home',
    summary: 'The current explanation layer for the Home system.',
    detail:
      'This design system route, the recipe text under each example, and the Sources tab are the current documentation surface for how Home is built.',
    sources: ['src/pages/DesignSystem.jsx'],
    next: 'Use this page to understand the system, then jump to `Home.jsx` to see it used in the live page.'
  },
  'How to': {
    status: 'Lightly defined',
    summary: 'Practical guidance for working with the Home system.',
    detail:
      'The current how-to guidance is lightweight: this overview explains the structure, recipe blocks show how examples are composed, and the Sources tab points to the files to edit.',
    sources: ['src/pages/DesignSystem.jsx', 'src/pages/Home.jsx'],
    next: 'This area can grow into more explicit contribution or extension guidance over time.'
  },
  'Sample pages': {
    status: 'Defined for Home',
    summary: 'Live examples that show the system in use.',
    detail:
      'Today the main sample page is `Home.jsx`, while this design system route provides focused previews of the same decisions in isolation.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'This is currently centered on Home, but the label leaves room for future sample pages.'
  },
  'Design principles': {
    status: 'Not yet defined',
    summary: 'The high-level ideas that would guide design decisions.',
    detail:
      'This system implies some principles through the work itself, but they are not yet documented as explicit design principles.',
    sources: [],
    next: 'A future version could document principles like clarity, consistency, hierarchy, and expressive use of gradients and motion.'
  },
  'Brand guidelines': {
    status: 'Not yet defined',
    summary: 'Rules for brand expression beyond the current Home visuals.',
    detail:
      'The Home page has a visual identity, but there is not yet a standalone brand-guidelines layer describing logo use, voice, or broader brand rules.',
    sources: [],
    next: 'This can stay muted until the broader design system expands beyond the current Home slice.'
  },
  Resources: {
    status: 'Not yet defined',
    summary: 'Downloadable or shared assets for the system.',
    detail:
      'There is not currently a dedicated resource layer for downloadable assets, libraries, or packaged handoff materials.',
    sources: [],
    next: 'This becomes useful once the system grows beyond a single documented page and needs shared assets.'
  }
}

const OVERVIEW_AREA_SECTION_MAP = {
  Foundations: ['foundations-tokens', 'foundations-headings'],
  Architecture: ['foundations-tokens', 'sources'],
  Tokens: ['foundations-tokens', 'sources'],
  Components: ['card-titles', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
  Patterns: ['card-titles', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
  Documentation: ['foundations-tokens', 'sources'],
  'How to': ['foundations-tokens', 'sources'],
  'Sample pages': ['foundations-tokens', 'foundations-headings', 'card-titles', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
  'Design principles': [],
  'Brand guidelines': [],
  Resources: []
}

const OVERVIEW_AREA_ACCENTS = {
  Foundations: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]',
  Architecture: 'border-indigo-400/25 bg-indigo-950/18 shadow-[0_0_40px_-22px_rgba(129,140,248,0.28)]',
  Tokens: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]',
  Components: 'border-violet-400/25 bg-violet-950/18 shadow-[0_0_40px_-22px_rgba(167,139,250,0.28)]',
  Patterns: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]',
  Documentation: 'border-cyan-400/20 bg-cyan-950/14 shadow-[0_0_40px_-22px_rgba(34,211,238,0.22)]',
  'How to': 'border-indigo-400/20 bg-indigo-950/14 shadow-[0_0_40px_-22px_rgba(129,140,248,0.22)]',
  'Sample pages': 'border-violet-400/20 bg-violet-950/14 shadow-[0_0_40px_-22px_rgba(167,139,250,0.22)]',
  'Design principles': 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]',
  'Brand guidelines': 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]',
  Resources: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
}

const STYLE_GUIDE_ITEMS = [
  { label: 'Typography', active: true },
  { label: 'Colors', active: true },
  { label: 'Gradients', active: true },
  { label: 'Shadows', active: true },
  { label: 'Radius', active: true },
  { label: 'Icons', active: false },
  { label: 'Brand', active: false }
]

const PATTERN_LIBRARY_ITEMS = [
  { label: 'Hero sections', active: true },
  { label: 'CTA groups', active: true },
  { label: 'Case-study shells', active: true },
  { label: 'Forms', active: false }
]

const COMPONENT_LIBRARY_ITEMS = [
  { label: 'Buttons', active: true },
  { label: 'Cards', active: true },
  { label: 'Tabs', active: false }
]

const TOKEN_BENEFITS = ['Speed', 'Consistency', 'Reuse', 'Safer updates', 'Shared language']
const ARCHITECTURE_BENEFITS = ['Clarity', 'Shared structure', 'Easier onboarding', 'Safer changes', 'Scales better']
const ARCHITECTURE_SOURCE_ROLES = [
  {
    label: 'Define shared values',
    file: 'tailwind.config.js',
    description: 'This is where the reusable Home styles are named, like gradients, radius, and glow values.'
  },
  {
    label: 'Reuse in JavaScript',
    file: 'src/design-system/home.js',
    description: 'This mirrors some of those same values when the UI needs JavaScript or inline styles instead of a Tailwind class.'
  },
  {
    label: 'Use in the page',
    file: 'src/pages/Home.jsx',
    description: 'This is where the live Home page applies those shared values in real buttons, headings, and cards.'
  },
  {
    label: 'Explain the system',
    file: 'src/pages/DesignSystem.jsx',
    description: 'This page breaks the system into examples and explanations so people can understand how it is put together.'
  }
]
const TOKEN_SOURCE_ROLES = [
  {
    label: 'Define tokens',
    file: 'tailwind.config.js',
    description: 'Defines the named Home token values used by Tailwind classes.'
  },
  {
    label: 'Reuse in JavaScript',
    file: 'src/design-system/home.js',
    description: 'Mirrors some of those same values for JavaScript and inline-style use.'
  },
  {
    label: 'Use in the live page',
    file: 'src/pages/Home.jsx',
    description: 'Uses the tokens in the live page so you can see the system applied in a real UI.'
  }
]

const TOKEN_GROUPS = [
  {
    title: 'Named Home gradients',
    description: 'These give repeated gradients one source of truth so headings, CTAs, and card titles feel like part of the same system.',
    items: [
      { name: 'bg-home-cta', note: 'Primary CTA fill', previewClass: 'bg-home-cta' },
      { name: 'bg-home-cta-label', note: 'Secondary CTA label gradient', previewClass: 'bg-home-cta-label' },
      { name: 'bg-home-h2-stories', note: 'Stories heading gradient', previewClass: 'bg-home-h2-stories' },
      { name: 'bg-home-h2-value', note: 'How I create value heading gradient', previewClass: 'bg-home-h2-value' },
      { name: 'bg-home-card-title-on-dark', note: 'Card title gradient on dark surfaces', previewClass: 'bg-home-card-title-on-dark' }
    ]
  },
  {
    title: 'JavaScript token mirrors',
    description: 'These prevent the visual system from splitting when the same values need to be used outside Tailwind utilities, like inline styles or SVG.',
    items: [
      { name: 'HOME_GRADIENT_CTA', note: 'JS version of `bg-home-cta`' },
      { name: 'HOME_GRADIENT_CTA_LABEL', note: 'JS version of `bg-home-cta-label`' },
      { name: 'HOME_GRADIENT_H2_STORIES', note: 'JS version of `bg-home-h2-stories`' },
      { name: 'HOME_GRADIENT_H2_VALUE', note: 'JS version of `bg-home-h2-value`' },
      { name: 'HOME_GRADIENT_CARD_TITLE_ON_DARK', note: 'JS version of `bg-home-card-title-on-dark`' },
      { name: 'homeHeroNameGradientTextStyle', note: 'Inline gradient text style for the hero name' }
    ]
  },
  {
    title: 'Surface and glow tokens',
    description: 'These keep surfaces and elevation treatments consistent so cards feel related instead of individually styled.',
    items: [
      { name: 'rounded-home-card', note: '2rem card radius token', previewClass: 'rounded-home-card border border-white/10 bg-black/35' },
      { name: 'shadow-home-card-glow', note: 'Base cyan glow for Home cards', previewClass: 'rounded-home-card border border-cyan-300/20 bg-black/35 shadow-home-card-glow' },
      { name: 'shadow-home-card-glow-hover', note: 'Stronger glow used on hover', previewClass: 'rounded-home-card border border-cyan-300/20 bg-black/35 shadow-home-card-glow-hover' }
    ]
  },
  {
    title: 'Color and type today',
    description:
      'Typography and most flat colors still act like system decisions, but they are currently documented through recipes and shared utilities rather than dedicated `home-*` token keys.',
    items: [
      { name: 'text-white', note: 'Primary text on dark surfaces' },
      { name: 'text-slate-300', note: 'Supporting body copy' },
      { name: 'bg-black/55', note: 'Inner fill for the secondary CTA treatment' },
      { name: 'text-7xl md:text-8xl lg:text-9xl', note: 'Hero display scale used in the heading examples' }
    ]
  }
]

const OVERVIEW_ITEM_DETAILS = {
  Typography: {
    status: 'Defined for Home',
    summary: 'Display typography used across the Home page.',
    detail:
      'Typography in this system currently focuses on the hero name, section headings, and large card titles that create visual hierarchy.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the foundations and card-title sections for the current type treatments.',
    sections: ['foundations-headings', 'card-titles'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Colors: {
    status: 'Defined for Home',
    summary: 'Shared color decisions used across Home.',
    detail:
      'Color in the Home system appears through dark surfaces, white text, cyan-indigo-violet accents, and supporting gradient palettes.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx'],
    next: 'Buttons, cards, and headings all show how color is applied in the current system.',
    sections: ['foundations-tokens', 'foundations-headings', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Gradients: {
    status: 'Defined for Home',
    summary: 'Gradient tokens used across headings, CTAs, and card titles.',
    detail:
      'Gradients are one of the strongest signatures in the Home system, appearing in section headings, CTA treatments, and the hero name.',
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx'],
    next: 'See the foundations and button examples to compare where different gradients are used.',
    sections: ['foundations-tokens', 'foundations-headings', 'card-titles', 'buttons-primary', 'buttons-secondary'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Shadows: {
    status: 'Defined for Home',
    summary: 'Glow and elevation treatments that give Home depth.',
    detail:
      'Shadows in the Home system are used mostly as glows and elevation cues, especially around buttons and case-study shells.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'The cards and CTA examples below show where those shadows matter most.',
    sections: ['foundations-tokens', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Radius: {
    status: 'Defined for Home',
    summary: 'Corner-radius decisions used across Home components.',
    detail:
      'Radius values help create the soft edge treatment on cards, buttons, and larger shells throughout the Home page.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx'],
    next: 'Buttons and card shells are the clearest current examples of radius in the system.',
    sections: ['foundations-tokens', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Icons: {
    status: 'Not yet defined',
    summary: 'A reusable icon layer is not yet documented here.',
    detail:
      'The site does use icons in places, but this page does not yet define an icon system or icon-usage guidance for Home.',
    sources: [],
    next: 'This can become active once iconography is documented as part of the broader system.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  Brand: {
    status: 'Not yet defined',
    summary: 'Brand guidance is not yet separated from the Home visuals.',
    detail:
      'There is a visual identity on the Home page, but this route does not yet define brand rules as their own documented system layer.',
    sources: [],
    next: 'A later version could add logo, voice, and broader brand-expression guidance here.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  Buttons: {
    status: 'Defined for Home',
    summary: 'Primary and secondary CTA components used on Home.',
    detail:
      'Buttons are one of the clearest reusable components in the current Home system, with gradient fills, ghost treatments, and shared type and radius conventions.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the primary and secondary sections below for the current button variants.',
    sections: ['buttons-primary', 'buttons-secondary'],
    accent: 'border-violet-400/25 bg-violet-950/18 shadow-[0_0_40px_-22px_rgba(167,139,250,0.28)]'
  },
  Cards: {
    status: 'Defined for Home',
    summary: 'Card shells and title treatments used on Home.',
    detail:
      'Cards in this system include large case-study shells, title treatments, and surface/elevation decisions that make them feel part of the same family.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the card-title and case-study-shell sections below for the current implementation.',
    sections: ['card-titles', 'cards-elevation'],
    accent: 'border-violet-400/25 bg-violet-950/18 shadow-[0_0_40px_-22px_rgba(167,139,250,0.28)]'
  },
  Tabs: {
    status: 'Not yet defined',
    summary: 'A reusable tabs component is not yet defined for Home.',
    detail:
      'This page uses chip and tab-like controls, but the Home system does not yet document a reusable tabs component as part of its library.',
    sources: [],
    next: 'This can become active once a reusable tabs treatment is documented as part of the system.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  'Hero sections': {
    status: 'Defined for Home',
    summary: 'The hero is one of the clearest page-level patterns on Home.',
    detail:
      'The hero pattern combines large gradient-led type, supporting copy, and a CTA treatment into a recognizable opening section.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the foundations section below for the heading treatments that support this pattern.',
    sections: ['foundations-headings'],
    accent: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]'
  },
  'Case-study shells': {
    status: 'Defined for Home',
    summary: 'Large story-card layouts used to present featured work.',
    detail:
      'Case-study shells are larger arrangements built from card surfaces, titles, spacing, and CTA components.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the card-title and case-study-shell sections below for the current implementation.',
    sections: ['card-titles', 'cards-elevation'],
    accent: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]'
  },
  'CTA groups': {
    status: 'Defined for Home',
    summary: 'Grouped call-to-action patterns built from multiple button treatments.',
    detail:
      'CTA groups are larger patterns where primary and secondary actions are presented together with a clear hierarchy.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the button sections below to understand the building blocks used in these grouped CTA patterns.',
    sections: ['buttons-primary', 'buttons-secondary'],
    accent: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]'
  },
  Forms: {
    status: 'Not yet defined',
    summary: 'Forms are not yet part of the documented Home patterns.',
    detail:
      'Forms are a reasonable future pattern area, but this page does not yet include form-specific components or patterns for the Home system.',
    sources: [],
    next: 'This can become active once forms are designed and documented as part of the broader system.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  }
}

function DarkPanel({ children, className = '' }) {
  return (
    <div
      className={`rounded-home-card border border-white/10 bg-white/3 p-8 ${className}`.trim()}
    >
      {children}
    </div>
  )
}

function SystemChip({ label, active = false, selected = false, className = '', onClick, controlsId }) {
  const baseClass = active
    ? 'border-cyan-400/35 bg-white/5 text-cyan-100 shadow-[0_0_20px_-8px_rgba(34,211,238,0.45)]'
    : 'border-white/10 bg-black/20 text-slate-500'
  const selectedClass = selected ? 'ring-2 ring-cyan-300/40 ring-offset-0' : ''
  const classes = `inline-flex rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${baseClass} ${selectedClass} ${className}`.trim()

  if (onClick) {
    return (
      <button
        type="button"
        className={classes}
        onClick={onClick}
        aria-pressed={selected}
        aria-controls={controlsId}
      >
        {label}
      </button>
    )
  }

  return <span className={classes}>{label}</span>
}

function SourceBadge({ label }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1.5 font-mono text-[10px] text-slate-300 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
      {label}
    </span>
  )
}

function BenefitPill({ label }) {
  return (
    <span className="inline-flex rounded-full border border-white/10 bg-white/4 px-3 py-1 text-[10px] font-medium tracking-wide text-slate-300">
      {label}
    </span>
  )
}

/** One bounded sample — preview + recipe don’t visually merge with the next block */
function SampleCard({ children, className = '' }) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-black/30 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] ${className}`.trim()}
    >
      {children}
    </div>
  )
}

function TokenCaption({ children }) {
  return (
    <div className="mb-2 text-left text-xs font-medium normal-case tracking-wide text-slate-500">{children}</div>
  )
}

function ElementSpec({ children }) {
  return (
    <div className="mt-6 max-w-3xl border-t border-white/10 pt-4 text-left">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2">
        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-slate-500">Recipe</span>
        <p className="min-w-0 flex-1 text-xs leading-relaxed text-slate-500 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[11px] [&_code]:text-cyan-100/85">
          {children}
        </p>
      </div>
    </div>
  )
}

function TabPanel({ id, children, className = '' }) {
  return (
    <section id={id} className={className}>
      {children}
    </section>
  )
}

export default function DesignSystem() {
  const [activeOverviewArea, setActiveOverviewArea] = useState(OVERVIEW_AREA_ITEMS[0].label)
  const activeOverviewDetail =
    OVERVIEW_AREA_DETAILS[activeOverviewArea] ?? OVERVIEW_ITEM_DETAILS[activeOverviewArea]
  const visibleSections = new Set(
    activeOverviewDetail?.sections ?? OVERVIEW_AREA_SECTION_MAP[activeOverviewArea] ?? []
  )
  const activeOverviewAccent =
    activeOverviewDetail?.accent ?? OVERVIEW_AREA_ACCENTS[activeOverviewArea]

  return (
    <div className="min-h-screen bg-black tracking-wide text-slate-200">
      <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        <TabPanel id="overview">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start">
            <div
              className="relative overflow-hidden border border-cyan-300/30 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.28),transparent_28%),radial-gradient(circle_at_top_right,rgba(129,140,248,0.22),transparent_32%),radial-gradient(circle_at_bottom,rgba(232,121,249,0.18),transparent_34%),rgba(12,74,110,0.88)] px-6 py-8 text-center text-sm leading-relaxed text-slate-100 shadow-home-card-glow sm:px-8"
              style={{ borderRadius: '2.75rem 2.75rem 3.5rem 3rem / 2.5rem 3rem 3.5rem 3rem' }}
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-12 top-8 h-48 w-48 rounded-full bg-cyan-400/12 blur-3xl" />
                <div className="absolute right-0 top-0 h-60 w-60 rounded-full bg-indigo-500/12 blur-3xl" />
                <div className="absolute bottom-0 left-1/3 h-56 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">Design System</h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-300">
                Defines shared rules and reusable UI.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {OVERVIEW_AREA_ITEMS.map(({ label, active }) => (
                    <SystemChip
                      key={label}
                      label={label}
                      active={active}
                      selected={activeOverviewArea === label}
                      onClick={() => setActiveOverviewArea(label)}
                      controlsId="overview-detail-panel"
                    />
                  ))}
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
                  <div
                    className="rounded-4xl border border-cyan-400/20 bg-cyan-950/18 p-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] lg:p-8"
                  >
                    <p className="text-2xl font-semibold text-white">Style Guide</p>
                    <p className="mt-1 text-sm text-cyan-100/85">Defines visual rules</p>
                    <div className="mt-5 flex flex-wrap gap-2 lg:mt-8 lg:max-w-60">
                      {STYLE_GUIDE_ITEMS.map(({ label, active }) => (
                        <SystemChip
                          key={label}
                          label={label}
                          active={active}
                          selected={activeOverviewArea === label}
                          onClick={() => setActiveOverviewArea(label)}
                          controlsId="overview-detail-panel"
                        />
                      ))}
        </div>
      </div>

                  <div
                    className="rounded-4xl border border-violet-400/20 bg-violet-950/18 p-6 text-left shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] lg:p-8"
                  >
                    <p className="text-2xl font-semibold text-white">Components Library</p>
                    <p className="mt-1 text-sm text-violet-100/85">Defines reusable blocks in code</p>
                    <div className="mt-5 flex flex-wrap gap-2 lg:mt-8 lg:max-w-56">
                      {COMPONENT_LIBRARY_ITEMS.map(({ label, active }) => (
                        <SystemChip
                          key={label}
                          label={label}
                          active={active}
                          selected={activeOverviewArea === label}
                          onClick={() => setActiveOverviewArea(label)}
                          controlsId="overview-detail-panel"
                        />
                      ))}
                    </div>
                    <div className="mt-6 border border-white/10 bg-black/30 p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] lg:max-w-72 lg:p-5"
                      style={{ borderRadius: '1.75rem 1.75rem 2rem 2rem / 1.5rem 1.5rem 2rem 2rem' }}>
                      <p className="text-2xl font-semibold text-white">Pattern Library</p>
                      <p className="mt-1 text-xs text-slate-400 lg:text-sm">Built from components as repeatable arrangements</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {PATTERN_LIBRARY_ITEMS.map(({ label, active }) => (
                          <SystemChip
                            key={label}
                            label={label}
                            active={active}
                            selected={activeOverviewArea === label}
                            onClick={() => setActiveOverviewArea(label)}
                            controlsId="overview-detail-panel"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="overview-detail-panel"
              className={`rounded-4xl border p-6 text-left ${activeOverviewAccent}`.trim()}
            >
              <div>
                <p className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">{activeOverviewArea}</p>
                <p className="mt-2 text-sm text-slate-400">{activeOverviewDetail.status}</p>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {activeOverviewDetail.detail}
              </p>
              {activeOverviewArea === 'Tokens' ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {TOKEN_BENEFITS.map((benefit) => (
                    <BenefitPill key={benefit} label={benefit} />
                  ))}
                </div>
              ) : activeOverviewArea === 'Architecture' ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {ARCHITECTURE_BENEFITS.map((benefit) => (
                    <BenefitPill key={benefit} label={benefit} />
                  ))}
                </div>
              ) : null}
              {activeOverviewDetail.sources.length ? (
                <div className="mt-5">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Files to look at</p>
                  {activeOverviewArea === 'Architecture' ? (
                    <div className="mt-2 text-sm leading-relaxed text-slate-400">
                      This is the current flow: shared values are defined first, reused when JavaScript needs them, applied
                      in the live page, and then explained here.
                    </div>
                  ) : null}
                  {activeOverviewArea === 'Tokens' ? (
                    <div className="mt-3 rounded-3xl border border-white/10 bg-black/20 p-4">
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
                        {TOKEN_SOURCE_ROLES.map(({ label, file, description }, index) => (
                          <div key={file} className="contents">
                            <div className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4">
                              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
                              <p className="mt-2 font-mono text-[11px] text-cyan-100/90">{file}</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                            </div>
                            {index < TOKEN_SOURCE_ROLES.length - 1 ? (
                              <div className="hidden text-center text-slate-500 lg:block" aria-hidden>
                                <span className="text-lg">-&gt;</span>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : activeOverviewArea === 'Architecture' ? (
                    <div className="mt-3 rounded-3xl border border-white/10 bg-black/20 p-4">
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center">
                        {ARCHITECTURE_SOURCE_ROLES.map(({ label, file, description }, index) => (
                          <div key={file} className="contents">
                            <div className="rounded-2xl border border-white/10 bg-white/3 px-4 py-4">
                              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">{label}</p>
                              <p className="mt-2 font-mono text-[11px] text-cyan-100/90">{file}</p>
                              <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                            </div>
                            {index < ARCHITECTURE_SOURCE_ROLES.length - 1 ? (
                              <div className="hidden text-center text-slate-500 lg:block" aria-hidden>
                                <span className="text-lg">-&gt;</span>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {activeOverviewArea === 'Tokens' ? null : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeOverviewDetail.sources.map((source) => (
                        <SourceBadge key={source} label={source} />
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
              {activeOverviewDetail.next ? (
                <p className="mt-5 text-sm leading-relaxed text-slate-400">
                  {activeOverviewDetail.next}
                </p>
              ) : null}
              {activeOverviewArea === 'Sample pages' ? (
                <div className="mt-6 rounded-4xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Home Page</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    <code className={code}>src/pages/Home.jsx</code> uses these shared styles, components, and larger UI
                    patterns in the live page.
                  </p>
                </div>
              ) : null}
            </div>
        </div>
        </TabPanel>

        {visibleSections.size ? (
          <DarkPanel className="text-sm leading-relaxed text-slate-400">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Relevant Examples</p>
            <p className="mt-3 text-white">
              Showing the sections on this page that best support <code className={code}>{activeOverviewArea}</code>.
            </p>
          </DarkPanel>
        ) : null}

        {visibleSections.has('foundations-tokens') ? (
        <TabPanel id="foundations-tokens">
          <section>
            <p className="mb-4 text-sm text-slate-400">
              Tokens exist so shared visual values are defined once and reused everywhere. For designers, that means faster
              decisions and more consistent screens. For engineers, it means less duplicated styling and safer updates. Named
              tokens live in <code className={code}>tailwind.config.js</code> and are mirrored in{' '}
              <code className={code}>src/design-system/home.js</code> when JavaScript needs the same values.
            </p>
            <div className="mb-4 flex flex-wrap gap-2">
              {TOKEN_BENEFITS.map((benefit) => (
                <BenefitPill key={benefit} label={benefit} />
              ))}
            </div>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <div className="grid gap-6 lg:grid-cols-2">
                {TOKEN_GROUPS.map(({ title, description, items }) => (
                  <SampleCard key={title} className="space-y-5">
                    <div>
                      <p className="text-lg font-semibold text-white">{title}</p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">{description}</p>
                    </div>
                    <div className="space-y-3">
                      {items.map(({ name, note, previewClass }) => (
                        <div key={name} className="rounded-2xl border border-white/10 bg-white/3 p-4">
                          <div className="flex items-start justify-between gap-4">
                            <code className={code}>{name}</code>
                            {previewClass ? <span className={`h-4 w-20 shrink-0 ${previewClass}`.trim()} /> : null}
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-slate-400">{note}</p>
                        </div>
                      ))}
                    </div>
                  </SampleCard>
                ))}
              </div>
          </DarkPanel>
        </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('foundations-headings') ? (
        <TabPanel id="foundations-headings">
          <section>
            <p className="mb-4 text-sm text-slate-400">Hero name and gradient H2s as on Home.</p>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Hero</TokenCaption>
                <p
                  className="text-center text-7xl font-semibold leading-[1.1] tracking-normal md:text-8xl lg:text-9xl"
                  style={homeHeroNameGradientTextStyle}
                >
                  Joel Hickey
                </p>
                <ElementSpec>
                  <code>homeHeroNameGradientTextStyle</code> from home.js (inline style) +{' '}
                  <code>text-7xl md:text-8xl lg:text-9xl font-semibold leading-[1.1] tracking-normal</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>
                  <code className={tokenLabel}>bg-home-h2-stories</code>
                </TokenCaption>
                <p className="w-full bg-home-h2-stories bg-clip-text text-center text-6xl font-bold tracking-normal text-transparent md:text-7xl lg:text-8xl">
                  Stories
                </p>
                <ElementSpec>
                  <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-6xl md:text-7xl lg:text-8xl font-bold tracking-normal</code> — see token label
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>
                  <code className={tokenLabel}>bg-home-h2-value</code>
                </TokenCaption>
                <p className="w-full bg-home-h2-value bg-clip-text text-center text-6xl font-bold tracking-wide text-transparent md:text-7xl lg:text-8xl">
                  How I create value
                </p>
                <ElementSpec>
                  <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide</code> — see token label
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('card-titles') ? (
        <TabPanel id="card-titles">
          <section>
            <p className="mb-4 text-sm text-slate-400">Card <code className={code}>h3</code> scales on Home.</p>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Gradient · card title</TokenCaption>
                <p className="bg-home-card-title-on-dark bg-clip-text text-5xl font-semibold tracking-wide text-transparent md:text-6xl lg:text-7xl">
                  Magento Bulk Shipments
                </p>
                <ElementSpec>
                  <code>bg-home-card-title-on-dark</code> + <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>White · card title</TokenCaption>
                <p className="text-4xl font-semibold tracking-wide text-white md:text-5xl lg:text-6xl">Insurance</p>
                <ElementSpec>
                  <code>text-white</code> +{' '}
                  <code>text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide</code> (e.g. Agentic AI card)
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('buttons-primary') ? (
        <TabPanel id="buttons-primary">
          <section>
            <p className="mb-4 text-sm text-slate-400">
              <code className={code}>bg-home-cta</code> fills — padding differs by placement.
            </p>
            <DarkPanel className="flex flex-col flex-wrap gap-8 overflow-visible sm:flex-row sm:items-start">
              <SampleCard className="sm:min-w-0 sm:flex-1">
                <TokenCaption>Hero · larger padding</TokenCaption>
                <span className="inline-block rounded-full bg-home-cta px-8 py-4 text-base font-normal tracking-wide text-white shadow-lg shadow-violet-500/25">
                  Explore
                </span>
                <ElementSpec>
                  <code>bg-home-cta</code> + <code>px-8 py-4</code> +{' '}
                  <code>text-base font-normal tracking-wide text-white</code> + violet shadow / hover as on Home
                </ElementSpec>
              </SampleCard>
              <SampleCard className="sm:min-w-0 sm:flex-1">
                <TokenCaption>Card · tighter padding</TokenCaption>
                <span className="inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25">
                  View story
                </span>
                <ElementSpec>
                  <code>bg-home-cta</code> + <code>px-5 py-2.5</code> +{' '}
                  <code>text-base font-normal tracking-wider text-white</code> + shadow / hover as on Home
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('buttons-secondary') ? (
        <TabPanel id="buttons-secondary">
          <section>
            <p className="mb-4 text-sm text-slate-400">Ghost control — ring + inner fill.</p>
            <DarkPanel className="flex flex-col flex-wrap gap-8 overflow-visible sm:flex-row sm:items-start">
              <SampleCard className="sm:min-w-0 sm:flex-1">
                <TokenCaption>Label only</TokenCaption>
                <p className="bg-home-cta-label bg-clip-text text-base font-normal tracking-wider text-transparent">
                  View more stories
                </p>
                <ElementSpec>
                  <code>bg-home-cta-label</code> + <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-base font-normal tracking-wider</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard className="sm:min-w-0 sm:flex-1">
                <TokenCaption>Gradient ring + inner fill</TokenCaption>
                <div className="inline-block rounded-full bg-home-cta p-px shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-105">
                  <span className="block rounded-full bg-black/55 px-5 py-2.5 text-base font-normal tracking-wider">
                    <span className="bg-home-cta-label bg-clip-text text-transparent">View more stories</span>
                  </span>
                </div>
                <ElementSpec>
                  Outer <code>bg-home-cta p-px</code> (hairline gradient ring) + inner <code>bg-black/55</code> +{' '}
                  <code>px-5 py-2.5</code> + label with <code>bg-home-cta-label</code> / clip-text; hover on outer as
                  Home
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('cards-elevation') ? (
        <TabPanel id="cards-elevation">
          <section className="pb-2">
            <p className="mb-4 text-sm text-slate-400">Case study shells on Home.</p>
            <DarkPanel className="overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Case study shell</TokenCaption>
                <div className="group mx-auto w-full max-w-md">
                  <div
                    className="min-h-[320px] w-full rounded-home-card border border-white/10 shadow-home-card-glow transition-shadow duration-500 group-hover:shadow-home-card-glow-hover md:min-h-[380px]"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                  />
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Hover to see <code className={code}>shadow-home-card-glow-hover</code>.
                </p>
                <ElementSpec>
                  <code>min-h-[320px] md:min-h-[380px]</code>, <code>rounded-home-card</code>,{' '}
                  <code>border-white/10</code>, <code>backgroundColor: rgba(0,0,0,0.5)</code>,{' '}
                  <code>shadow-home-card-glow</code> + wrapper <code>group</code> +{' '}
                  <code>group-hover:shadow-home-card-glow-hover</code>
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('sources') ? (
        <TabPanel id="sources" className="pb-8">
          <p className="mb-4 text-sm text-slate-400">Definitions in the repo:</p>
          <DarkPanel className="text-sm text-slate-400">
            <ul className="list-inside list-disc space-y-2 marker:text-slate-600">
              <li>
                <code className={code}>tailwind.config.js</code> — <code className={code}>home-*</code> theme keys
                (gradients, shadows, radius). Loaded via <code className={code}>@config</code> in{' '}
                <code className={code}>src/index.css</code>.
              </li>
              <li>
                <code className={code}>src/design-system/home.js</code> — same gradient strings for inline styles
                (e.g. hero name), SVG, or non-Tailwind use.
              </li>
              <li>
                <code className={code}>src/pages/Home.jsx</code> — where these tokens are composed. Each sample here is
                wrapped in a card so previews and recipes stay scoped.
              </li>
            </ul>
          </DarkPanel>
        </TabPanel>
        ) : null}

        {!visibleSections.size ? (
          <DarkPanel className="text-sm leading-relaxed text-slate-400">
            <p className="text-white">No detailed examples are documented for this area yet.</p>
            <p className="mt-2">
              The overview describes the role of <code className={code}>{activeOverviewArea}</code>, but this page does
              not yet include dedicated examples or source notes for it.
            </p>
          </DarkPanel>
        ) : null}
      </div>
    </div>
  )
}
