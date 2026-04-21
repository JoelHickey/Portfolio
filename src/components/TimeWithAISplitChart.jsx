/**
 * Slide 50 from the FCTG AI talk — approximate time split while building & prepping the deck.
 * Shared between the interactive deck and the portfolio case study page.
 */
const WITHOUT_AI = [
  { key: 'execution', pct: 85 },
  { key: 'judgment', pct: 6 },
  { key: 'direction', pct: 5 },
  { key: 'decisions', pct: 4 },
]

const WITH_CURSOR = [
  { key: 'execution', pct: 52 },
  { key: 'judgment', pct: 18 },
  { key: 'direction', pct: 16 },
  { key: 'decisions', pct: 14 },
]

const LEGEND = [
  { key: 'execution', label: 'Execution' },
  { key: 'judgment', label: 'Judgment' },
  { key: 'direction', label: 'Direction' },
  { key: 'decisions', label: 'Decisions' },
]

function segmentClass(key, variant) {
  if (variant === 'dark') {
    const m = {
      execution: 'bg-amber-500/60',
      judgment: 'bg-emerald-500/60',
      direction: 'bg-cyan-500/60',
      decisions: 'bg-violet-500/60',
    }
    return m[key] ?? 'bg-slate-500/60'
  }
  const m = {
    execution: 'bg-amber-400',
    judgment: 'bg-emerald-500',
    direction: 'bg-cyan-500',
    decisions: 'bg-violet-500',
  }
  return m[key] ?? 'bg-slate-400'
}

function legendSwatchClass(key, variant) {
  if (variant === 'dark') {
    const m = {
      execution: 'bg-amber-500/60',
      judgment: 'bg-emerald-500/60',
      direction: 'bg-cyan-500/60',
      decisions: 'bg-violet-500/60',
    }
    return m[key] ?? 'bg-slate-500/60'
  }
  const m = {
    execution: 'bg-amber-400',
    judgment: 'bg-emerald-500',
    direction: 'bg-cyan-500',
    decisions: 'bg-violet-500',
  }
  return m[key] ?? 'bg-slate-400'
}

export default function TimeWithAISplitChart({ variant = 'light', className = '', titleId }) {
  const isDark = variant === 'dark'
  const TitleTag = isDark ? 'h2' : 'h3'
  const titleClass = isDark
    ? 'fctg-heading !text-[2rem] md:!text-[2.5rem] inline-block whitespace-nowrap'
    : 'text-2xl font-semibold tracking-tight text-slate-900 sm:text-[1.65rem]'
  const titleStyle = isDark
    ? {
        background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }
    : {
        background: 'linear-gradient(90deg, #0f766e 0%, #0e7490 32%, #4f46e5 68%, #6d28d9 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
      }
  const darkSubtitleClass =
    'mt-2 max-w-xl text-sm text-slate-300'

  const barRow = (rowLabel, segments) => (
    <div className="grid grid-cols-[minmax(0,5.5rem)_1fr] items-center gap-3 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <p
        className={
          isDark
            ? 'text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400'
            : 'text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500'
        }
      >
        {rowLabel}
      </p>
      <div
        className={
          isDark
            ? 'flex h-9 w-full overflow-hidden rounded-md bg-slate-950/50 ring-1 ring-white/10'
            : 'flex h-9 w-full overflow-hidden rounded-md bg-slate-300/60 shadow-inner ring-1 ring-slate-300/50'
        }
        role="presentation"
      >
        {segments.map(({ key, pct }, i) => (
          <div
            key={key}
            style={{ width: `${pct}%` }}
            className={`min-h-full min-w-0 ${segmentClass(key, variant)} ${
              isDark
                ? i > 0
                  ? 'border-l border-black/25'
                  : ''
                : i > 0
                  ? 'border-l border-white/70'
                  : ''
            }`}
            title={`${LEGEND.find((l) => l.key === key)?.label ?? key}: ~${pct}%`}
          />
        ))}
      </div>
    </div>
  )

  const chartBody = (
    <>
      {barRow('Without AI', WITHOUT_AI)}
      {barRow('With Cursor', WITH_CURSOR)}
      <div
        className={
          isDark
            ? 'grid grid-cols-2 gap-x-4 gap-y-2 pt-1 text-left text-xs text-slate-500 sm:grid-cols-4 sm:justify-items-center sm:text-center'
            : 'grid grid-cols-2 gap-3 pt-2 text-xs text-slate-600 sm:grid-cols-4 sm:justify-items-start'
        }
      >
        {LEGEND.map(({ key, label }) => (
          <span key={key} className={`flex items-center gap-2 ${isDark ? 'sm:justify-center' : ''}`}>
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-sm shadow-sm ${legendSwatchClass(key, variant)}`}
              aria-hidden
            />
            <span className={isDark ? 'font-medium text-slate-300' : 'font-medium text-slate-700'}>
              {label}
            </span>
          </span>
        ))}
      </div>
      {isDark ? (
        <p className="border-t border-white/10 pt-3 text-center text-[11px] leading-snug text-slate-500">
          Rough split from building and prepping this deck.
        </p>
      ) : null}
    </>
  )

  const chartAriaDark =
    'Approximate time split: Without AI versus With Cursor, across Execution, Judgment, Direction, and Decisions, from building and prepping this deck.'
  const chartAriaLight =
    'Stacked bars for Without AI and With Cursor; segments are Execution, Judgment, Direction, and Decisions.'

  return (
    <div className={className}>
      {isDark ? (
        <>
          <div className="mb-5 flex flex-col items-center text-center sm:mb-6">
            <TitleTag className={titleClass} style={titleStyle}>
              Time with AI
            </TitleTag>
            <p className={darkSubtitleClass}>Less friction, more space to think clearly about what matters.</p>
          </div>
          <div className="space-y-5" role="img" aria-label={chartAriaDark}>
            {chartBody}
          </div>
        </>
      ) : (
        <figure className="m-0">
          <header className="mb-5 sm:mb-6">
            <TitleTag id={titleId} className={`${titleClass} block`} style={titleStyle}>
              How time shifted
            </TitleTag>
          </header>
          <div className="space-y-4 sm:space-y-5" role="img" aria-label={chartAriaLight}>
            {chartBody}
          </div>
        </figure>
      )}
    </div>
  )
}
