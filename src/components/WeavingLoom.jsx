import React from 'react'

const DURATION = 4
const FULL_PAGE_DURATION = 72

function WeavingLoom({ className = '', width = 280, height = 120, variant = 'light', fullPage = false, showShuttle = true }) {
  const isDark = variant === 'dark'
  const isPurple = variant === 'purple'
  const w = fullPage ? 800 : width
  const h = fullPage ? 450 : height
  const warpCount = fullPage ? 48 : 24
  const warpColors = isPurple
    ? { top: 'rgb(124 58 237)', mid: 'rgb(109 40 217)', bottom: 'rgb(124 58 237)' }
    : isDark
      ? { top: 'rgb(34 211 238)', mid: 'rgb(34 211 238)', bottom: 'rgb(34 211 238)' }
      : { top: 'rgb(148 163 184)', mid: 'rgb(100 116 139)', bottom: 'rgb(148 163 184)' }
  const warpOpacity = isPurple ? { top: 0.35, mid: 0.65, bottom: 0.35 } : isDark ? { top: 0.4, mid: 0.7, bottom: 0.4 } : { top: 0.3, mid: 0.7, bottom: 0.3 }
  const shuttleColors = isPurple
    ? { start: 'rgb(109 40 217)', end: 'rgb(124 58 237)' }
    : isDark
      ? { start: 'rgb(34 211 238)', end: 'rgb(6 182 212)' }
      : { start: 'rgb(71 85 105)', end: 'rgb(100 116 139)' }
  const weftColor = isPurple ? 'rgb(139 92 246)' : isDark ? 'rgb(34 211 238)' : 'rgb(148 163 184)'
  const weftOpacity = isPurple ? 0.5 : isDark ? 0.5 : 0.6
  const strokeWidth = isPurple ? 1 : isDark ? 1.2 : 0.6

  const svg = (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className={fullPage ? 'absolute inset-0 h-full w-full' : 'w-full max-w-full'}
      preserveAspectRatio={fullPage ? 'xMidYMid slice' : 'xMidYMid meet'}
      overflow="visible"
      aria-hidden
    >
        <defs>
          <linearGradient id="weaving-warp" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={warpColors.top} stopOpacity={warpOpacity.top} />
            <stop offset="50%" stopColor={warpColors.mid} stopOpacity={warpOpacity.mid} />
            <stop offset="100%" stopColor={warpColors.bottom} stopOpacity={warpOpacity.bottom} />
          </linearGradient>
          <linearGradient id="weaving-shuttle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={shuttleColors.start} />
            <stop offset="100%" stopColor={shuttleColors.end} />
          </linearGradient>
          <pattern id="weft-pattern" x="0" y="0" width={w} height="4" patternUnits="userSpaceOnUse">
            {Array.from({ length: Math.ceil(w / 8) }).map((_, i) => (
              <line
                key={i}
                x1={i * 8}
                y1="2"
                x2={i * 8 + 4}
                y2="2"
                stroke={weftColor}
                strokeWidth={strokeWidth}
                strokeOpacity={weftOpacity}
              />
            ))}
          </pattern>
        </defs>
        {/* Warp threads (vertical) */}
        <g stroke="url(#weaving-warp)" strokeWidth={strokeWidth}>
          {Array.from({ length: warpCount }).map((_, i) => {
            const x = (i / (warpCount - 1)) * (w - 20) + 10
            return <line key={i} x1={x} y1="8" x2={x} y2={h - 8} />
          })}
        </g>
        {/* Woven weft (built-up horizontal lines) */}
        <rect x="0" y="0" width={w} height={h} fill="url(#weft-pattern)" opacity={isPurple ? 0.45 : isDark ? 0.45 : 0.4} />
        {/* Shuttle / beater bar — optional so it can be hidden (e.g. on Looking back slide) */}
        {showShuttle && (
        <g
          style={{
            animation: `weaving-shuttle ${fullPage ? FULL_PAGE_DURATION : DURATION}s ease-in-out infinite`,
            opacity: isPurple ? 0.5 : isDark ? 0.22 : 0.4,
          }}
        >
          <rect
            x="-12"
            y={h / 2 - 6}
            width="24"
            height="12"
            rx="2"
            fill="url(#weaving-shuttle)"
            stroke={isPurple ? 'rgb(109 40 217)' : isDark ? 'rgb(34 211 238)' : 'rgb(71 85 105)'}
            strokeWidth={isPurple ? 1 : isDark ? 1 : 0.5}
          />
          <line
            x1="0"
            y1={h / 2}
            x2="0"
            y2={h - 8}
            stroke={isPurple ? 'rgb(109 40 217)' : isDark ? 'rgb(34 211 238)' : 'rgb(100 116 139)'}
            strokeWidth={strokeWidth}
            strokeOpacity={isDark ? 1 : 0.8}
          />
        </g>
        )}
    </svg>
  )

  const numRows = fullPage ? 24 : 8
  const startY = -h / 2
  const rowStep = (h - 8) / numRows
  const leftX = 10
  const rightX = w - 20
  const midX = w / 2 - 10

  const steps = []
  for (let i = 0; i < numRows; i++) {
    const y = startY + i * rowStep
    const yNext = startY + (i + 1) * rowStep
    const segLen = 100 / (numRows * 2)
    const pct = segLen * (i * 2)
    const pctMid = pct + segLen * 0.4
    const pctEnd = pct + segLen
    const pctReturnMid = pctEnd + segLen * 0.4
    steps.push(`${pct.toFixed(2)}% { transform: translate(${leftX}px, ${y}px); }`)
    steps.push(`${pctMid.toFixed(2)}% { transform: translate(${midX}px, ${y}px); }`)
    steps.push(`${pctEnd.toFixed(2)}% { transform: translate(${rightX}px, ${y}px); }`)
    steps.push(`${pctReturnMid.toFixed(2)}% { transform: translate(${midX}px, ${i < numRows - 1 ? yNext : y}px); }`)
  }
  steps.push(`100% { transform: translate(${leftX}px, ${startY}px); }`)

  const keyframes = `
    @keyframes weaving-shuttle {
      ${steps.join('\n      ')}
    }
  `

  if (fullPage) {
    return (
      <div className={`absolute inset-0 overflow-hidden bg-[#030b0f] ${className}`} aria-hidden>
        <style>{keyframes}</style>
        {svg}
      </div>
    )
  }

  return (
    <div className={className}>
      <style>{keyframes}</style>
      {svg}
    </div>
  )
}

export default WeavingLoom
