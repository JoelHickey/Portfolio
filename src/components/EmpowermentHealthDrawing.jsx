/**
 * Line-drawn outline of the Earth health app for Empowerment slide.
 * Traces the interface structure: window, header, toolbar, sliders, status bar.
 * Matches FCTG aesthetic: gradient strokes, stroke-dashoffset draw animation.
 */
function EmpowermentHealthDrawing() {
  // Grid: frame inset 4, header 24px, toolbar 24px, content 60-296, status 12px, bottom inset 4
  const pad = 4
  const headerH = 24
  const toolbarH = 24
  const contentTop = pad + headerH + toolbarH
  const contentH = 228
  const statusH = 20
  const w = 512
  const h = contentTop + contentH + statusH + pad

  // Sliders: 8 tracks, 8px wide, 52px center-to-center, centered in content
  const trackW = 8
  const trackH = 140
  const trackTop = contentTop + 20
  const contentW = w - pad * 4
  const totalSliderW = 8 * trackW + 7 * 44
  const sliderStartX = pad * 2 + (contentW - totalSliderW) / 2

  const sliderCenters = Array.from({ length: 8 }, (_, i) => sliderStartX + trackW / 2 + i * 52)
  const thumbPositions = [0.6, 0.45, 0.7, 0.35, 0.8, 0.25, 0.55, 0.75]

  return (
    <div className="flex justify-center" aria-hidden>
      <style>{`
        @keyframes fctg-emp-draw-1 { from { stroke-dashoffset: 1600; } to { stroke-dashoffset: 0; } }
        @keyframes fctg-emp-draw-2 { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
        @keyframes fctg-emp-draw-3 { from { stroke-dashoffset: 1200; } to { stroke-dashoffset: 0; } }
        .fctg-emp-1 { stroke-dasharray: 1600; stroke-dashoffset: 1600; animation: fctg-emp-draw-1 1.2s ease-out 0.2s forwards; }
        .fctg-emp-2 { stroke-dasharray: 800; stroke-dashoffset: 800; animation: fctg-emp-draw-2 0.8s ease-out 0.5s forwards; }
        .fctg-emp-3 { stroke-dasharray: 1200; stroke-dashoffset: 1200; animation: fctg-emp-draw-3 1s ease-out 0.9s forwards; }
      `}</style>
      <svg
        viewBox={`0 0 ${w + pad * 2} ${h + pad}`}
        className="w-full max-w-[400px] h-auto shrink-0"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="butt"
        strokeLinejoin="miter"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="fctg-emp-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="33%" stopColor="#2dd4bf" />
            <stop offset="66%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#e879f9" />
          </linearGradient>
        </defs>

        {/* Window frame */}
        <rect x={pad} y={pad} width={w} height={h} className="fctg-emp-1" stroke="url(#fctg-emp-grad)" strokeOpacity="0.9" />

        {/* Header bar — aligns with frame inner edge */}
        <rect x={pad * 2} y={pad * 2} width={w - pad * 2} height={headerH} className="fctg-emp-1" stroke="url(#fctg-emp-grad)" strokeOpacity="0.85" />
        {/* Window buttons */}
        <rect x={w - 32} y={pad * 2 + 6} width={12} height={12} className="fctg-emp-1" stroke="url(#fctg-emp-grad)" strokeOpacity="0.6" />
        <rect x={w - 16} y={pad * 2 + 6} width={12} height={12} className="fctg-emp-1" stroke="url(#fctg-emp-grad)" strokeOpacity="0.6" />

        {/* Toolbar — flush with header bottom */}
        <rect x={pad * 2} y={pad * 2 + headerH} width={w - pad * 2} height={toolbarH} className="fctg-emp-2" stroke="url(#fctg-emp-grad)" strokeOpacity="0.7" />
        {/* Toolbar buttons — 5 tabs */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={pad * 2 + 8 + i * 44} y={pad * 2 + headerH + 4} width={36} height={16} className="fctg-emp-2" stroke="url(#fctg-emp-grad)" strokeOpacity="0.6" />
        ))}
        {/* Output bar */}
        <rect x={w - 140} y={pad * 2 + headerH + 6} width={120} height={12} className="fctg-emp-2" stroke="url(#fctg-emp-grad)" strokeOpacity="0.6" />

        {/* Content area */}
        <rect x={pad * 2} y={contentTop} width={w - pad * 4} height={contentH} className="fctg-emp-3" stroke="url(#fctg-emp-grad)" strokeOpacity="0.5" />

        {/* Slider tracks — vertically centered in content */}
        {sliderCenters.map((cx, i) => (
          <rect key={i} x={cx - trackW / 2} y={trackTop} width={trackW} height={trackH} className="fctg-emp-3" stroke="url(#fctg-emp-grad)" strokeOpacity="0.65" />
        ))}

        {/* Slider thumbs — centered on tracks */}
        {sliderCenters.map((cx, i) => {
          const ty = trackTop + thumbPositions[i] * (trackH - 16)
          return (
            <rect key={i} x={cx - 8} y={ty} width={16} height={16} className="fctg-emp-3" stroke="url(#fctg-emp-grad)" strokeOpacity="0.8" />
          )
        })}

        {/* Status bar — full width, flush with content bottom */}
        <rect x={pad * 2} y={contentTop + contentH} width={w - pad * 4} height={statusH} className="fctg-emp-3" stroke="url(#fctg-emp-grad)" strokeOpacity="0.7" />
      </svg>
    </div>
  )
}

export default EmpowermentHealthDrawing
