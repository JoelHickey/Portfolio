/**
 * Line-art SVG for "Product Strategy & Design" — roadmap, nodes, path.
 * All strokes so AnimatedSVGDraw can animate as if drawn in real time.
 */
function ProductStrategyDrawing({ className = '' }) {
  return (
    <svg
      viewBox="0 0 400 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Roadmap path: winding line from left to right */}
      <path
        d="M 40 200 Q 100 180 160 160 T 280 140 T 360 120"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Nodes along the path (circles) */}
      <circle cx="40" cy="200" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="120" cy="170" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="200" cy="150" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="280" cy="140" r="8" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="360" cy="120" r="10" stroke="currentColor" strokeWidth="2.5" />
      {/* Arrow at end (direction / outcome) */}
      <path
        d="M 352 128 L 368 112 M 368 128 L 352 112"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Secondary curve: "vision" arc above */}
      <path
        d="M 60 100 Q 200 40 340 100"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Small connecting lines from arc to main path */}
      <line x1="120" y1="170" x2="140" y2="85" stroke="currentColor" strokeWidth="1.5" />
      <line x1="200" y1="150" x2="200" y2="70" stroke="currentColor" strokeWidth="1.5" />
      <line x1="280" y1="140" x2="260" y2="85" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default ProductStrategyDrawing
