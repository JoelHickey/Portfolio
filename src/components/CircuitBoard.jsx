function CircuitBoard({ className = '', width = 400, height = 200 }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={`block ${className}`}
      width={width}
      height={height}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Circuit traces — horizontal and vertical lines */}
      <g stroke="rgba(34, 211, 238, 0.35)" strokeWidth="1" fill="none">
        <line x1="20" y1="40" x2="120" y2="40" />
        <line x1="120" y1="40" x2="120" y2="80" />
        <line x1="120" y1="80" x2="200" y2="80" />
        <line x1="200" y1="80" x2="200" y2="120" />
        <line x1="200" y1="120" x2="280" y2="120" />
        <line x1="280" y1="120" x2="280" y2="160" />
        <line x1="280" y1="160" x2="380" y2="160" />
        <line x1="20" y1="100" x2="80" y2="100" />
        <line x1="80" y1="100" x2="80" y2="140" />
        <line x1="80" y1="140" x2="180" y2="140" />
        <line x1="180" y1="140" x2="180" y2="60" />
        <line x1="180" y1="60" x2="260" y2="60" />
        <line x1="260" y1="60" x2="260" y2="100" />
        <line x1="260" y1="100" x2="340" y2="100" />
      </g>
      {/* Animated pulse lines — dashed stroke that moves */}
      <g stroke="rgba(34, 211, 238, 0.5)" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <line x1="20" y1="40" x2="120" y2="40" className="circuit-trace" style={{ animationDelay: '0s' }} />
        <line x1="120" y1="40" x2="120" y2="80" className="circuit-trace" style={{ animationDelay: '0.3s' }} />
        <line x1="120" y1="80" x2="200" y2="80" className="circuit-trace" style={{ animationDelay: '0.6s' }} />
        <line x1="200" y1="80" x2="200" y2="120" className="circuit-trace" style={{ animationDelay: '0.9s' }} />
        <line x1="200" y1="120" x2="280" y2="120" className="circuit-trace" style={{ animationDelay: '1.2s' }} />
        <line x1="280" y1="120" x2="280" y2="160" className="circuit-trace" style={{ animationDelay: '1.5s' }} />
        <line x1="280" y1="160" x2="380" y2="160" className="circuit-trace" style={{ animationDelay: '1.8s' }} />
      </g>
      {/* Nodes */}
      <g fill="rgba(34, 211, 238, 0.4)">
        <circle cx="20" cy="40" r="2.5" />
        <circle cx="120" cy="40" r="2.5" />
        <circle cx="120" cy="80" r="2.5" />
        <circle cx="200" cy="80" r="2.5" />
        <circle cx="200" cy="120" r="2.5" />
        <circle cx="280" cy="120" r="2.5" />
        <circle cx="280" cy="160" r="2.5" />
        <circle cx="380" cy="160" r="2.5" />
        <circle cx="80" cy="100" r="2.5" />
        <circle cx="80" cy="140" r="2.5" />
        <circle cx="180" cy="140" r="2.5" />
        <circle cx="180" cy="60" r="2.5" />
        <circle cx="260" cy="60" r="2.5" />
        <circle cx="260" cy="100" r="2.5" />
        <circle cx="340" cy="100" r="2.5" />
      </g>
    </svg>
  )
}

export default CircuitBoard
