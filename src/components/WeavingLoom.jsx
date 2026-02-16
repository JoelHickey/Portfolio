import React from 'react'

const WARP_COUNT = 24
const DURATION = 4

function WeavingLoom({ className = '', width = 280, height = 120 }) {
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full max-w-full overflow-visible"
        aria-hidden
      >
        <defs>
          <linearGradient id="weaving-warp" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgb(148 163 184)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="rgb(100 116 139)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="rgb(148 163 184)" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="weaving-shuttle" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(71 85 105)" />
            <stop offset="100%" stopColor="rgb(100 116 139)" />
          </linearGradient>
          <pattern id="weft-pattern" x="0" y="0" width={width} height="4" patternUnits="userSpaceOnUse">
            {Array.from({ length: Math.ceil(width / 8) }).map((_, i) => (
              <line
                key={i}
                x1={i * 8}
                y1="2"
                x2={i * 8 + 4}
                y2="2"
                stroke="rgb(148 163 184)"
                strokeWidth="0.8"
                strokeOpacity="0.6"
              />
            ))}
          </pattern>
        </defs>
        {/* Warp threads (vertical) */}
        <g stroke="url(#weaving-warp)" strokeWidth="0.6">
          {Array.from({ length: WARP_COUNT }).map((_, i) => {
            const x = (i / (WARP_COUNT - 1)) * (width - 20) + 10
            return <line key={i} x1={x} y1="8" x2={x} y2={height - 8} />
          })}
        </g>
        {/* Woven weft (built-up horizontal lines) */}
        <rect x="0" y="0" width={width} height={height} fill="url(#weft-pattern)" opacity="0.4" />
        {/* Shuttle / beater bar */}
        <g
          style={{
            animation: `weaving-shuttle ${DURATION}s ease-in-out infinite`
          }}
        >
          <rect
            x="-12"
            y={height / 2 - 6}
            width="24"
            height="12"
            rx="2"
            fill="url(#weaving-shuttle)"
            stroke="rgb(71 85 105)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1={height / 2}
            x2="0"
            y2={height - 8}
            stroke="rgb(100 116 139)"
            strokeWidth="0.5"
            strokeOpacity="0.8"
          />
        </g>
      </svg>
      <style>{`
        @keyframes weaving-shuttle {
          0%, 100% { transform: translateX(10px); }
          25% { transform: translateX(${width / 2 - 10}px); }
          50% { transform: translateX(${width - 20}px); }
          75% { transform: translateX(${width / 2 - 10}px); }
        }
      `}</style>
    </div>
  )
}

export default WeavingLoom
