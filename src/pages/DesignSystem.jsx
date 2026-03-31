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
    status: 'In use',
    summary: 'The shared visual rules for the live page.',
    detail:
      'Today that mainly means typography, gradients, colors, shadows, and radius values used across the primary experience.',
    sources: ['tailwind.config.js', 'src/design-system/home.js'],
    next: 'See the Foundations tab for heading examples and the Sources tab for where these values are defined.'
  },
  Architecture: {
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx']
  },
  Tokens: {
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx']
  },
  Components: {
    status: 'In use',
    summary: 'Reusable UI building blocks that already appear on the live page.',
    detail:
      'Buttons and card treatments are the clearest current component layer in this system, and they are documented in the component tabs on this page.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the Components tabs for button treatments, card titles, and case-study card shells.'
  },
  Patterns: {
    status: 'In use',
    summary: 'Repeatable arrangements built from components.',
    detail:
      'Right now this mostly shows up as hero sections, CTA groupings, and case-study shells that combine multiple shared styles and components into larger UI patterns.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'Patterns are nested inside components in this overview because they are built from those reusable pieces.'
  },
  Documentation: {
    status: 'In use',
    summary: 'The current explanation layer for this system.',
    detail:
      'This design system route, the recipe text under each example, and the Sources tab are the current documentation surface for how the live page is built.',
    sources: ['src/pages/DesignSystem.jsx'],
    next: 'Use this page to understand the system, then open `src/pages/Home.jsx` to see it used in the live page.'
  },
  'How to': {
    status: 'Lightly defined',
    summary: 'Practical guidance for working with this system.',
    detail:
      'The current how-to guidance is lightweight: this overview explains the structure, recipe blocks show how examples are composed, and the Sources tab points to the files to edit.',
    sources: ['src/pages/DesignSystem.jsx', 'src/pages/Home.jsx'],
    next: 'This area can grow into more explicit contribution or extension guidance over time.'
  },
  'Sample pages': {
    status: 'In use',
    summary: 'Live examples that show the system in use.',
    detail:
      'Today the main sample is `src/pages/Home.jsx`, while this design system route provides focused previews of the same decisions in isolation.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'This is currently centered on that route, but the label leaves room for future sample pages.'
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
    summary: 'Rules for brand expression beyond the current visuals.',
    detail:
      'The portfolio has a visual identity, but there is not yet a standalone brand-guidelines layer describing logo use, voice, or broader brand rules.',
    sources: [],
    next: 'This can stay muted until the broader design system expands beyond the current documented slice.'
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
  Architecture: [],
  Tokens: ['foundations-tokens'],
  Components: [],
  Patterns: [],
  Documentation: [],
  'How to': [],
  'Sample pages': [],
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

const IN_PRACTICE_INPUTS = [
  {
    title: 'Portfolio goals',
    copy: 'Help visitors quickly understand who I am, what I do, and why the work is worth their attention.',
    className: 'border-cyan-400/28 bg-cyan-950/20 text-cyan-50'
  },
  {
    title: 'Brand expression',
    copy: 'Make the portfolio feel recognizably mine through a consistent visual language, tone, and point of view.',
    className: 'border-cyan-400/28 bg-cyan-950/20 text-cyan-50'
  },
  {
    title: 'Accessibility and clarity',
    copy: 'Keep the work easy to scan, readable on any screen, and usable for different kinds of visitors.',
    className: 'border-cyan-400/28 bg-cyan-950/20 text-cyan-50'
  },
  {
    title: 'Technical constraints',
    copy: 'Stay performant, responsive, and easy to refine without the site becoming harder to maintain.',
    className: 'border-cyan-400/28 bg-cyan-950/20 text-cyan-50'
  }
]

const IN_PRACTICE_OUTCOMES = [
  {
    title: 'Faster iteration',
    copy: 'Refine pages and components without rebuilding the same decisions each time.',
    className: 'border-emerald-400/28 bg-emerald-950/20 text-emerald-50'
  },
  {
    title: 'Safer changes',
    copy: 'Update styles and patterns with less visual drift across the site.',
    className: 'border-emerald-400/28 bg-emerald-950/20 text-emerald-50'
  },
  {
    title: 'Stronger identity',
    copy: 'Make the portfolio feel more distinct and recognizably mine.',
    className: 'border-emerald-400/28 bg-emerald-950/20 text-emerald-50'
  },
  {
    title: 'Consistent experience',
    copy: 'Keep pages, case studies, and interactions feeling part of one system.',
    className: 'border-emerald-400/28 bg-emerald-950/20 text-emerald-50'
  }
]

const COMBINED_TOP_GUIDANCE = ['Design principles', 'Brand guidelines']

const COMBINED_FOUNDATION_ITEMS = ['Tokens']

const COMBINED_SYSTEM_GROUPS = [
  {
    title: 'Style Guide',
    subtitle: 'Defines visual rules',
    items: STYLE_GUIDE_ITEMS
  },
  {
    title: 'Components Library',
    subtitle: 'Defines reusable blocks in code',
    items: COMPONENT_LIBRARY_ITEMS
  },
  {
    title: 'Pattern Library',
    subtitle: 'Built from components as repeatable arrangements',
    items: PATTERN_LIBRARY_ITEMS
  }
]

const COMBINED_SUPPORTING_ITEMS = ['Documentation', 'How to', 'Sample pages', 'Resources']

const TOKEN_BENEFITS = [
  'Define once',
  'Reuse across UI',
  'Keep visuals consistent',
  'Update with less risk',
  'Share one language'
]
const OVERVIEW_AREA_BENEFITS = {
  Foundations: ['Shared rules', 'Named values', 'Consistent hierarchy', 'Reusable surfaces'],
  Components: ['Reusable blocks', 'Consistent actions', 'Shared surfaces', 'Faster assembly'],
  Patterns: ['Built from components', 'Repeatable layouts', 'Clear hierarchy', 'Scales across pages'],
  Documentation: ['Explains decisions', 'Shows examples', 'Maps source files', 'Supports handoff'],
  'How to': ['Use examples', 'Read recipes', 'Find source files', 'Extend safely'],
  'Sample pages': ['See it in context', 'Validate real usage', 'Compare isolated examples']
}
const ARCHITECTURE_BENEFITS = [
  'Gives the system structure',
  'Keeps decisions consistent',
  'Makes ownership clearer',
  'Makes changes safer',
  'Supports growth'
]
const ARCHITECTURE_SOURCE_ROLES = [
  {
    label: 'Define shared values',
    file: 'tailwind.config.js',
    description: 'This file defines shared gradients, radius, and glow values.',
    cls: 'border-cyan-500/30 bg-cyan-950/20',
    titleCls: 'text-cyan-100'
  },
  {
    label: 'Mirror for JavaScript',
    file: 'src/design-system/home.js',
    description: 'This file mirrors the same values for JavaScript and inline styles.',
    cls: 'border-violet-500/30 bg-violet-950/20',
    titleCls: 'text-violet-100'
  },
  {
    label: 'Apply in the UI',
    file: 'src/pages/Home.jsx',
    description: 'This file applies those shared values in buttons, headings, and cards.',
    cls: 'border-emerald-500/30 bg-emerald-950/20',
    titleCls: 'text-emerald-100'
  }
]
const ARCHITECTURE_DOC_ROLE = {
  label: 'Document the system',
  file: 'src/pages/DesignSystem.jsx',
  description: 'This page documents the full flow.',
  cls: 'border-amber-500/30 bg-amber-950/20',
  titleCls: 'text-amber-100'
}
const TOKEN_SOURCE_ROLES = [
  {
    label: 'Define tokens',
    file: 'tailwind.config.js',
    description: 'This file defines named token values used across the system.',
    cls: 'border-cyan-500/30 bg-cyan-950/20',
    titleCls: 'text-cyan-100'
  },
  {
    label: 'Mirror for JavaScript',
    file: 'src/design-system/home.js',
    description: 'This file mirrors those token values for JavaScript and inline styles.',
    cls: 'border-violet-500/30 bg-violet-950/20',
    titleCls: 'text-violet-100'
  },
  {
    label: 'Apply in the UI',
    file: 'src/pages/Home.jsx',
    description: 'This file applies those token values in headings, buttons, and cards.',
    cls: 'border-emerald-500/30 bg-emerald-950/20',
    titleCls: 'text-emerald-100'
  }
]

const TOKEN_GROUPS = [
  {
    title: 'Named gradients',
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
      { name: 'shadow-home-card-glow', note: 'Base cyan glow for case-study cards', previewClass: 'rounded-home-card border border-cyan-300/20 bg-black/35 shadow-home-card-glow' },
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
      { name: 'text-[2.75rem] sm:text-6xl md:text-8xl lg:text-9xl', note: 'Hero display scale — mobile-first, ramping through breakpoints' }
    ]
  }
]

const OVERVIEW_ITEM_DETAILS = {
  Typography: {
    status: 'In use',
    summary: 'The main typography system used across the live page.',
    detail:
      'Typography in this system includes the hero display, section headings, card titles, supporting copy, labels, and other text styles used throughout the home page.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the heading, supporting type, and card-title sections for the current typography treatments.',
    sections: ['foundations-headings', 'typography-supporting', 'card-titles'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Colors: {
    status: 'In use',
    summary: 'Shared color decisions used across the live page.',
    detail:
      'Color in this system appears through dark surfaces, white text, cyan-indigo-violet accents, and supporting gradient palettes.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx'],
    next: 'Buttons, cards, and headings all show how color is applied in the current system.',
    sections: ['foundations-tokens', 'foundations-headings', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Gradients: {
    status: 'In use',
    summary: 'Gradient tokens used across headings, CTAs, and card titles.',
    detail:
      'Gradients are one of the strongest signatures in this system, appearing in section headings, CTA treatments, and the hero name.',
    sources: ['tailwind.config.js', 'src/design-system/home.js', 'src/pages/Home.jsx'],
    next: 'See the foundations and button examples to compare where different gradients are used.',
    sections: ['foundations-tokens', 'foundations-headings', 'card-titles', 'buttons-primary', 'buttons-secondary'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Shadows: {
    status: 'In use',
    summary: 'Glow and elevation treatments that give the interface depth.',
    detail:
      'Shadows in this system are used mostly as glows and elevation cues, especially around buttons and case-study shells.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'The cards and CTA examples below show where those shadows matter most.',
    sections: ['foundations-tokens', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Radius: {
    status: 'In use',
    summary: 'Corner-radius decisions used across these components.',
    detail:
      'Radius values help create the soft edge treatment on cards, buttons, and larger shells throughout the live page.',
    sources: ['tailwind.config.js', 'src/pages/Home.jsx'],
    next: 'Buttons and card shells are the clearest current examples of radius in the system.',
    sections: ['foundations-tokens', 'buttons-primary', 'buttons-secondary', 'cards-elevation'],
    accent: 'border-cyan-400/25 bg-cyan-950/18 shadow-[0_0_40px_-22px_rgba(34,211,238,0.3)]'
  },
  Icons: {
    status: 'Not yet defined',
    summary: 'A reusable icon layer is not yet documented here.',
    detail:
      'The site does use icons in places, but this page does not yet define an icon system or icon-usage guidance for this system.',
    sources: [],
    next: 'This can become active once iconography is documented as part of the broader system.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  Brand: {
    status: 'Not yet defined',
    summary: 'Brand guidance is not yet separated from the current visuals.',
    detail:
      'There is a visual identity on the live page, but this route does not yet define brand rules as their own documented system layer.',
    sources: [],
    next: 'A later version could add logo, voice, and broader brand-expression guidance here.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  Buttons: {
    status: 'In use',
    summary: 'Primary and secondary CTA components used on the live page.',
    detail:
      'Buttons are one of the clearest reusable components in this system, with gradient fills, ghost treatments, and shared type and radius conventions.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the primary and secondary sections below for the current button variants.',
    sections: ['buttons-primary', 'buttons-secondary'],
    accent: 'border-violet-400/25 bg-violet-950/18 shadow-[0_0_40px_-22px_rgba(167,139,250,0.28)]'
  },
  Cards: {
    status: 'In use',
    summary: 'Card shells and title treatments used on the live page.',
    detail:
      'Cards in this system include large case-study shells, title treatments, and surface/elevation decisions that make them feel part of the same family.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the card-title and case-study-shell sections below for the current implementation.',
    sections: ['card-titles', 'cards-elevation'],
    accent: 'border-violet-400/25 bg-violet-950/18 shadow-[0_0_40px_-22px_rgba(167,139,250,0.28)]'
  },
  Tabs: {
    status: 'Not yet defined',
    summary: 'A reusable tabs component is not yet defined for this system.',
    detail:
      'This page uses chip and tab-like controls, but this system does not yet document a reusable tabs component as part of its library.',
    sources: [],
    next: 'This can become active once a reusable tabs treatment is documented as part of the system.',
    sections: [],
    accent: 'border-white/10 bg-black/25 shadow-[0_0_30px_-18px_rgba(255,255,255,0.08)]'
  },
  'Hero sections': {
    status: 'In use',
    summary: 'The hero is one of the clearest page-level patterns on the live page.',
    detail:
      'The hero pattern combines large gradient-led type, supporting copy, and a CTA treatment into a recognizable opening section.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the foundations section below for the heading treatments that support this pattern.',
    sections: ['foundations-headings'],
    accent: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]'
  },
  'Case-study shells': {
    status: 'In use',
    summary: 'Large story-card layouts used to present featured work.',
    detail:
      'Case-study shells are larger arrangements built from card surfaces, titles, spacing, and CTA components.',
    sources: ['src/pages/Home.jsx', 'src/pages/DesignSystem.jsx'],
    next: 'See the card-title and case-study-shell sections below for the current implementation.',
    sections: ['card-titles', 'cards-elevation'],
    accent: 'border-fuchsia-400/25 bg-fuchsia-950/16 shadow-[0_0_40px_-22px_rgba(232,121,249,0.25)]'
  },
  'CTA groups': {
    status: 'In use',
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
    summary: 'Forms are not yet part of the documented patterns.',
    detail:
      'Forms are a reasonable future pattern area, but this page does not yet include form-specific components or patterns for this system.',
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

function InPracticeFlowCard({ title, copy, className, edge = null }) {
  const edgeStub =
    edge === 'right' ? (
      <span className="pointer-events-none absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-slate-300/70 shadow-[0_0_8px_rgba(148,163,184,0.16)] min-[901px]:block" />
    ) : edge === 'left' ? (
      <span className="pointer-events-none absolute right-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-slate-300/70 shadow-[0_0_8px_rgba(148,163,184,0.16)] min-[901px]:block" />
    ) : null

  return (
    <article
      className={`relative min-h-[82px] rounded-[14px] border px-3 py-[11px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_0_1px_rgba(255,255,255,0.02)] ${className}`.trim()}
    >
      {edgeStub}
      <h3 className="text-[12px] font-semibold">{title}</h3>
      <p className="mt-1 text-[10px] leading-[1.3] text-slate-200/84">{copy}</p>
    </article>
  )
}

function InPracticeMergeConnector() {
  return (
    <div className="hidden items-center justify-center text-slate-300 min-[901px]:flex">
      <svg viewBox="0 0 96 358" fill="none" className="block h-[358px] w-[96px] overflow-visible">
        <path d="M 0 41 H 48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 133 H 48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 225 H 48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 317 H 48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 41 V 317" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 179 H 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 41 H 48" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0 133 H 48" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0 225 H 48" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 0 317 H 48" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 41 V 317" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 179 H 96" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function InPracticeFanConnector() {
  return (
    <div className="hidden items-center justify-center text-slate-300 min-[901px]:flex">
      <svg viewBox="0 0 96 358" fill="none" className="block h-[358px] w-[96px] overflow-visible">
        <path d="M 0 179 H 48" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 41 V 317" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 41 H 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 133 H 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 225 H 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 48 317 H 96" stroke="currentColor" strokeOpacity="0.12" strokeWidth="3" strokeLinecap="round" />
        <path d="M 0 179 H 48" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 41 V 317" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 41 H 96" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 133 H 96" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 225 H 96" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 48 317 H 96" stroke="currentColor" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

function CombinedSystemGroup({ title, subtitle, items, activeOverviewArea, setActiveOverviewArea }) {
  return (
    <section className="rounded-2xl border border-white/18 bg-white/3 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_0_1px_rgba(255,255,255,0.04)]">
      <h3 className="text-[13px] font-semibold tracking-wide text-white">{title}</h3>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-300/80">{subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map(({ label, active }) => (
          <SystemChip
            key={label}
            label={label}
            active={active || activeOverviewArea === label}
            selected={activeOverviewArea === label}
            onClick={() => setActiveOverviewArea(label)}
            controlsId="overview-detail-panel"
          />
        ))}
      </div>
    </section>
  )
}

function DesignSystemInPracticeDiagram({ activeOverviewArea, setActiveOverviewArea }) {
  const isOverviewItemActive = (label) =>
    OVERVIEW_AREA_ITEMS.some((item) => item.label === label && item.active) || activeOverviewArea === label

  return (
    <div className="mx-auto max-w-[1220px]">
      <div className="grid items-center gap-6 min-[901px]:gap-0 min-[901px]:grid-cols-[minmax(0,1.08fr)_96px_minmax(360px,0.98fr)_96px_minmax(0,1.08fr)]">
        <div className="relative z-20 grid gap-[10px] min-[901px]:col-start-1">
          {IN_PRACTICE_INPUTS.map((item) => (
            <InPracticeFlowCard
              key={item.title}
              title={item.title}
              copy={item.copy}
              className={item.className}
              edge="right"
            />
          ))}
        </div>

        <div className="min-[901px]:col-start-2">
          <InPracticeMergeConnector />
        </div>

        <article className="relative rounded-[18px] border border-violet-300/28 bg-violet-950/14 px-5 pb-5 pt-[18px] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_28px_-24px_rgba(167,139,250,0.22)] min-[901px]:col-start-3">
          <span className="pointer-events-none absolute right-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-slate-300/70 shadow-[0_0_8px_rgba(148,163,184,0.16)] min-[901px]:block" />
          <span className="pointer-events-none absolute left-full top-1/2 hidden h-px w-4 -translate-y-1/2 bg-slate-300/70 shadow-[0_0_8px_rgba(148,163,184,0.16)] min-[901px]:block" />
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.18em] text-violet-100/84">Design system</p>
          <p className="mx-auto mt-2 max-w-[360px] text-center text-[11px] text-slate-200/76">
            Brings together the shared rules, reusable parts, and guidance that shape how a team designs and builds
            a product.
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {COMBINED_TOP_GUIDANCE.map((label) => (
              <SystemChip
                key={label}
                label={label}
                active={activeOverviewArea === label}
                selected={activeOverviewArea === label}
                onClick={() => setActiveOverviewArea(label)}
                controlsId="overview-detail-panel"
              />
            ))}
          </div>

          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <SystemChip
              label="Architecture"
              active
              selected={activeOverviewArea === 'Architecture'}
              onClick={() => setActiveOverviewArea('Architecture')}
              controlsId="overview-detail-panel"
            />
            {COMBINED_FOUNDATION_ITEMS.map((label) => (
              <SystemChip
                key={label}
                label={label}
                active={isOverviewItemActive(label)}
                selected={activeOverviewArea === label}
                onClick={() => setActiveOverviewArea(label)}
                controlsId="overview-detail-panel"
              />
            ))}
          </div>

          <div className="mt-4 grid gap-3">
            {COMBINED_SYSTEM_GROUPS.map((group) => (
              <CombinedSystemGroup
                key={group.title}
                title={group.title}
                subtitle={group.subtitle}
                items={group.items}
                activeOverviewArea={activeOverviewArea}
                setActiveOverviewArea={setActiveOverviewArea}
              />
            ))}
          </div>

          <div className="mt-4 border-t border-white/8 pt-4">
            <div className="flex flex-wrap justify-center gap-2">
              {COMBINED_SUPPORTING_ITEMS.map((label) => (
                <SystemChip
                  key={label}
                  label={label}
                  active={isOverviewItemActive(label)}
                  selected={activeOverviewArea === label}
                  onClick={() => setActiveOverviewArea(label)}
                  controlsId="overview-detail-panel"
                />
              ))}
            </div>
          </div>
        </article>

        <div className="min-[901px]:col-start-4">
          <InPracticeFanConnector />
        </div>

        <div className="relative z-20 grid gap-[10px] min-[901px]:col-start-5">
          {IN_PRACTICE_OUTCOMES.map((item) => (
            <InPracticeFlowCard
              key={item.title}
              title={item.title}
              copy={item.copy}
              className={item.className}
              edge="left"
            />
          ))}
        </div>
      </div>
    </div>
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
  const activeOverviewBenefits = OVERVIEW_AREA_BENEFITS[activeOverviewArea] ?? null
  const suppressSupportingCopy =
    activeOverviewArea === 'Architecture' ||
    activeOverviewArea === 'Tokens' ||
    Boolean(activeOverviewBenefits) ||
    visibleSections.size > 0
  const suppressEmptyStateAreas = new Set([
    'Architecture',
    'Components',
    'Patterns',
    'Documentation',
    'How to',
    'Sample pages'
  ])

  return (
    <div className="min-h-screen bg-black tracking-wide text-slate-200">
      <TabPanel id="system-diagrams">
        <div className="mx-auto max-w-6xl space-y-10 px-6 pt-0">
          <section className="space-y-4">
            <DesignSystemInPracticeDiagram
              activeOverviewArea={activeOverviewArea}
              setActiveOverviewArea={setActiveOverviewArea}
            />
          </section>

        </div>
      </TabPanel>

      <div className="mx-auto max-w-6xl space-y-16 px-6 py-12">
        <TabPanel id="overview-detail-wrap">
            <div
              id="overview-detail-panel"
              className={`rounded-4xl border p-6 text-left ${activeOverviewAccent}`.trim()}
            >
              <div>
                <h2 className="text-3xl font-semibold tracking-wide text-white sm:text-4xl">{activeOverviewArea}</h2>
                {activeOverviewDetail.status && !suppressSupportingCopy ? (
                  <p className="mt-2 text-sm text-slate-400">{activeOverviewDetail.status}</p>
                ) : null}
                {activeOverviewDetail.summary ? (
                  <p className="mt-2 text-sm leading-relaxed text-slate-400/95">{activeOverviewDetail.summary}</p>
                ) : null}
              </div>
              {activeOverviewDetail.detail && !suppressSupportingCopy ? (
                <p className="mt-4 text-sm leading-relaxed text-slate-300">{activeOverviewDetail.detail}</p>
              ) : null}
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
              ) : activeOverviewBenefits ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeOverviewBenefits.map((benefit) => (
                    <BenefitPill key={benefit} label={benefit} />
                  ))}
                </div>
              ) : null}
              {activeOverviewDetail.sources?.length ? (
                <div className="mt-5">
                  {activeOverviewArea === 'Tokens' ? (
                    <>
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
                        {TOKEN_SOURCE_ROLES.map(({ label, file, description, cls, titleCls }, index) => (
                          <div key={file} className="contents">
                            <div className={`flex h-full min-h-0 flex-col rounded-2xl border px-4 py-4 ${cls}`.trim()}>
                              <p className={`text-sm font-semibold leading-snug ${titleCls}`.trim()}>{label}</p>
                              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{description}</p>
                              <p className="mt-3 font-mono text-[11px] text-cyan-100/70">{file}</p>
                            </div>
                            {index < TOKEN_SOURCE_ROLES.length - 1 ? (
                              <div
                                className="hidden h-full min-h-12 items-center justify-center text-slate-500 lg:flex"
                                aria-hidden
                              >
                                <span className="text-lg">-&gt;</span>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : activeOverviewArea === 'Architecture' ? (
                    <>
                      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
                        {ARCHITECTURE_SOURCE_ROLES.map(({ label, file, description, cls, titleCls }, index) => (
                          <div key={file} className="contents">
                            <div className={`flex h-full min-h-0 flex-col rounded-2xl border px-4 py-4 ${cls}`.trim()}>
                              <p className={`text-sm font-semibold leading-snug ${titleCls}`.trim()}>{label}</p>
                              <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-400">{description}</p>
                              <p className="mt-3 font-mono text-[11px] text-cyan-100/70">{file}</p>
                            </div>
                            {index < ARCHITECTURE_SOURCE_ROLES.length - 1 ? (
                              <div
                                className="hidden h-full min-h-12 items-center justify-center text-slate-500 lg:flex"
                                aria-hidden
                              >
                                <span className="text-lg">-&gt;</span>
                              </div>
                            ) : null}
                          </div>
                        ))}
                      </div>
                      <div className={`mt-4 rounded-2xl border px-4 py-4 ${ARCHITECTURE_DOC_ROLE.cls}`.trim()}>
                        <p className={`text-sm font-semibold leading-snug ${ARCHITECTURE_DOC_ROLE.titleCls}`.trim()}>
                          {ARCHITECTURE_DOC_ROLE.label}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-slate-300">{ARCHITECTURE_DOC_ROLE.description}</p>
                        <p className="mt-3 font-mono text-[11px] text-cyan-100/70">{ARCHITECTURE_DOC_ROLE.file}</p>
                      </div>
                    </>
                  ) : (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <p className="w-full text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        Files to look at
                      </p>
                      {(activeOverviewDetail.sources ?? []).map((source) => (
                        <SourceBadge key={source} label={source} />
                      ))}
                    </div>
                  )}
                </div>
              ) : null}
              {activeOverviewDetail.next && !suppressSupportingCopy ? (
                <p className="mt-5 text-sm leading-relaxed text-slate-400">
                  {activeOverviewDetail.next}
                </p>
              ) : null}
              {activeOverviewArea === 'Sample pages' ? (
                <div className="mt-6 rounded-4xl border border-white/10 bg-black/20 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">Live page</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    <code className={code}>src/pages/Home.jsx</code> uses these shared styles, components, and larger UI
                    patterns in the live page.
                  </p>
                </div>
              ) : null}
            </div>
        </TabPanel>

        {visibleSections.has('foundations-tokens') ? (
        <TabPanel id="foundations-tokens">
          <section>
            <p className="mb-4 text-sm text-slate-400">Current token groups and named values in use.</p>
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
            <p className="mb-4 text-sm text-slate-400">Hero name and gradient H2s as shipped.</p>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Hero</TokenCaption>
                <p
                  className="text-center text-[2.75rem] font-semibold leading-[1.1] tracking-normal sm:text-6xl md:text-8xl lg:text-9xl"
                  style={homeHeroNameGradientTextStyle}
                >
                  Joel Hickey
                </p>
                <ElementSpec>
                  <code>homeHeroNameGradientTextStyle</code> from <code className={code}>src/design-system/home.js</code>{' '}
                  (inline style) +{' '}
                  <code>text-[2.75rem] sm:text-6xl md:text-8xl lg:text-9xl font-semibold leading-[1.1] tracking-normal</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>Stories section heading</TokenCaption>
                <p className="w-full bg-home-h2-stories bg-clip-text text-center text-4xl font-bold tracking-wide text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                  Stories
                </p>
                <ElementSpec>
                  <code className={tokenLabel}>bg-home-h2-stories</code> + <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>Value section heading</TokenCaption>
                <p className="w-full bg-home-h2-value bg-clip-text text-center text-4xl font-bold tracking-wide text-transparent sm:text-6xl md:text-7xl lg:text-8xl">
                  How I create value
                </p>
                <ElementSpec>
                  <code className={tokenLabel}>bg-home-h2-value</code> + <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wide</code>
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('typography-supporting') ? (
        <TabPanel id="typography-supporting">
          <section>
            <p className="mb-4 text-sm text-slate-400">Supporting typography styles used across the home page.</p>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Hero supporting line</TokenCaption>
                <p className="text-center text-base font-light leading-snug tracking-wider text-slate-200 sm:text-xl md:text-2xl lg:text-3xl">
                  Designing high-impact products with systems thinking, craft, and AI.
                </p>
                <ElementSpec>
                  <code>text-base sm:text-xl md:text-2xl lg:text-3xl font-light leading-snug tracking-wider</code>
                </ElementSpec>
              </SampleCard>

              <SampleCard>
                <TokenCaption>Case-study supporting copy</TokenCaption>
                <p className="text-xl font-extralight tracking-wider text-white md:text-2xl">
                  Coverage woven into the travel journey.
                </p>
                <ElementSpec>
                  <code>text-xl md:text-2xl font-extralight tracking-wider text-white</code>
                </ElementSpec>
              </SampleCard>

              <SampleCard>
                <TokenCaption>Small uppercase labels</TokenCaption>
                <div className="flex flex-wrap items-center gap-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 md:text-xs">CRM</p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-100/80 md:text-xs">
                    Deep link
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80 md:text-xs">
                    Product
                  </p>
                </div>
                <ElementSpec>
                  <code>text-[10px] md:text-xs font-semibold uppercase tracking-[0.22em]</code>
                </ElementSpec>
              </SampleCard>

              <SampleCard>
                <TokenCaption>Star-map labels</TokenCaption>
                <p className="text-sm font-normal leading-tight tracking-wider text-white md:text-lg lg:text-xl">
                  Strategy
                </p>
                <ElementSpec>
                  <code>text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-tight tracking-wider</code>
                </ElementSpec>
              </SampleCard>

              <SampleCard>
                <TokenCaption>Button label typography</TokenCaption>
                <p className="text-base font-normal tracking-wider text-white">View story</p>
                <ElementSpec>
                  <code>text-base font-normal tracking-wider text-white</code> — used by CTA labels, while button
                  padding, fill, radius, and states remain documented in the Buttons section.
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('card-titles') ? (
        <TabPanel id="card-titles">
          <section>
            <p className="mb-4 text-sm text-slate-400">Card <code className={code}>h3</code> scales as shipped.</p>
            <DarkPanel className="space-y-8 overflow-visible py-8">
              <SampleCard>
                <TokenCaption>Gradient · card title</TokenCaption>
                <p className="bg-home-card-title-on-dark bg-clip-text text-5xl font-semibold tracking-wide text-transparent md:text-6xl lg:text-7xl">
                  Agentic AI
                </p>
                <ElementSpec>
                  <code>bg-home-card-title-on-dark</code> + <code>bg-clip-text text-transparent</code> +{' '}
                  <code>text-5xl md:text-6xl lg:text-7xl font-semibold tracking-wide</code>
                </ElementSpec>
              </SampleCard>
              <SampleCard>
                <TokenCaption>White · card title</TokenCaption>
                <p className="text-2xl font-semibold tracking-wide text-white sm:text-4xl md:text-5xl lg:text-6xl">Insurance</p>
                <ElementSpec>
                  <code>text-white</code> +{' '}
                  <code>text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide</code> (e.g. Insurance card)
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
                <span className="inline-block rounded-full bg-home-cta px-8 py-4 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25">
                  Explore
                </span>
                <ElementSpec>
                  <code>bg-home-cta</code> + <code>px-8 py-4</code> +{' '}
                  <code>text-base font-normal tracking-wider text-white</code> + violet shadow / hover as shipped
                </ElementSpec>
              </SampleCard>
              <SampleCard className="sm:min-w-0 sm:flex-1">
                <TokenCaption>Card · tighter padding</TokenCaption>
                <span className="inline-block rounded-full bg-home-cta px-5 py-2.5 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25">
                  View story
                </span>
                <ElementSpec>
                  <code>bg-home-cta</code> + <code>px-5 py-2.5</code> +{' '}
                  <code>text-base font-normal tracking-wider text-white</code> + shadow / hover as shipped
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('buttons-secondary') ? (
        <TabPanel id="buttons-secondary">
          <section>
            <p className="mb-4 text-sm text-slate-400">
              Ghost control — gradient hairline ring + gradient label. Inner fill must be opaque (e.g.{' '}
              <code className="text-slate-300">bg-black</code>) so the outer gradient doesn’t show through as a solid
              pill.
            </p>
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
                <TokenCaption>Gradient ring · opaque inner (live)</TokenCaption>
                <div className="inline-block rounded-full bg-home-cta p-px shadow-sm shadow-violet-500/15 transition hover:shadow-violet-500/25 hover:brightness-105">
                  <span className="block rounded-full bg-black px-5 py-2.5 text-base font-normal tracking-wider transition hover:bg-white/5">
                    <span className="bg-home-cta-label bg-clip-text text-transparent">View more stories</span>
                  </span>
                </div>
                <ElementSpec>
                  Outer <code>bg-home-cta p-px</code> + inner <code>bg-black</code> (masks center —{' '}
                  <code>bg-transparent</code> wrongly shows full gradient) + <code>hover:bg-white/5</code> + gradient
                  label
                </ElementSpec>
              </SampleCard>
            </DarkPanel>
          </section>
        </TabPanel>
        ) : null}

        {visibleSections.has('cards-elevation') ? (
        <TabPanel id="cards-elevation">
          <section className="pb-2">
            <p className="mb-4 text-sm text-slate-400">Case study shells as shipped.</p>
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
          <p className="mb-4 text-sm text-slate-400">How responsibilities are split across the repo:</p>
          <DarkPanel className="text-sm text-slate-400">
            <ul className="list-inside list-disc space-y-2 marker:text-slate-600">
              <li>
                <code className={code}>tailwind.config.js</code> — defines the shared visual values used across the
                system, including gradients, shadows, and radius.
              </li>
              <li>
                <code className={code}>src/design-system/home.js</code> — mirrors those values for JavaScript and
                inline-style use when Tailwind utilities are not enough.
              </li>
              <li>
                <code className={code}>src/pages/Home.jsx</code> — applies those shared values in the live UI through
                buttons, headings, cards, and larger page patterns.
              </li>
              <li>
                <code className={code}>src/pages/DesignSystem.jsx</code> — documents the system so the structure and
                usage are visible without tracing the whole app first.
              </li>
            </ul>
          </DarkPanel>
        </TabPanel>
        ) : null}

        {!visibleSections.size && !suppressEmptyStateAreas.has(activeOverviewArea) ? (
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
