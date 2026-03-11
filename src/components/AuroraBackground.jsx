const STARS = [
  { top: '5%',  left: '12%', size: 2,   delay: '0s',   dur: '3.2s' },
  { top: '9%',  left: '78%', size: 1.5, delay: '1.1s', dur: '4.5s' },
  { top: '18%', left: '55%', size: 2,   delay: '0.4s', dur: '3.8s' },
  { top: '3%',  left: '40%', size: 1.5, delay: '2.3s', dur: '5.1s' },
  { top: '28%', left: '88%', size: 2,   delay: '0.9s', dur: '4.0s' },
  { top: '14%', left: '22%', size: 1,   delay: '1.7s', dur: '2.9s' },
  { top: '38%', left: '7%',  size: 1.5, delay: '3.1s', dur: '4.4s' },
  { top: '6%',  left: '63%', size: 2,   delay: '0.2s', dur: '3.6s' },
  { top: '24%', left: '70%', size: 1,   delay: '2.8s', dur: '5.5s' },
  { top: '44%', left: '92%', size: 1.5, delay: '1.4s', dur: '3.3s' },
  { top: '11%', left: '91%', size: 2,   delay: '0.7s', dur: '4.7s' },
  { top: '32%', left: '35%', size: 1,   delay: '2.0s', dur: '3.0s' },
  { top: '2%',  left: '30%', size: 2,   delay: '3.5s', dur: '4.2s' },
  { top: '20%', left: '5%',  size: 1.5, delay: '1.9s', dur: '3.9s' },
  { top: '42%', left: '58%', size: 1,   delay: '0.6s', dur: '5.0s' },
  { top: '16%', left: '47%', size: 1,   delay: '2.6s', dur: '3.5s' },
  { top: '7%',  left: '85%', size: 1.5, delay: '1.3s', dur: '4.1s' },
  { top: '35%', left: '18%', size: 2,   delay: '0.5s', dur: '3.7s' },
]

export default function AuroraBackground({ className = '' }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden>
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#050915]" />

      {/* Aurora band 1 — teal, top-left sweep */}
      <div
        className="absolute"
        style={{
          top: '-10%', left: '-20%',
          width: '90%', height: '60%',
          background: 'radial-gradient(ellipse at 40% 50%, rgba(34,211,238,0.22) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'aurora-band-1 18s ease-in-out infinite',
          transformOrigin: '60% 50%',
        }}
      />

      {/* Aurora band 2 — violet, top-right */}
      <div
        className="absolute"
        style={{
          top: '-15%', left: '35%',
          width: '80%', height: '55%',
          background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.25) 0%, rgba(167,139,250,0.1) 40%, transparent 70%)',
          filter: 'blur(56px)',
          animation: 'aurora-band-2 22s ease-in-out infinite',
          transformOrigin: '40% 50%',
        }}
      />

      {/* Aurora band 3 — cyan/teal, lower sweep */}
      <div
        className="absolute"
        style={{
          top: '20%', left: '10%',
          width: '70%', height: '45%',
          background: 'radial-gradient(ellipse at 45% 40%, rgba(6,182,212,0.18) 0%, rgba(45,212,191,0.07) 50%, transparent 75%)',
          filter: 'blur(64px)',
          animation: 'aurora-band-3 26s ease-in-out infinite',
          transformOrigin: '50% 60%',
        }}
      />

      {/* Aurora band 4 — purple accent, right edge */}
      <div
        className="absolute"
        style={{
          top: '5%', right: '-10%',
          width: '55%', height: '50%',
          background: 'radial-gradient(ellipse at 55% 45%, rgba(232,121,249,0.15) 0%, rgba(167,139,250,0.06) 50%, transparent 75%)',
          filter: 'blur(52px)',
          animation: 'aurora-band-4 20s ease-in-out infinite',
          transformOrigin: '45% 50%',
        }}
      />

      {/* Soft bottom glow to ground the slide */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: '35%',
          background: 'linear-gradient(to top, rgba(3,9,21,0.9) 0%, transparent 100%)',
        }}
      />

      {/* Twinkling stars */}
      {STARS.map(({ top, left, size, delay, dur }, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top, left,
            width: size,
            height: size,
            animation: `star-twinkle ${dur} ease-in-out ${delay} infinite`,
            boxShadow: `0 0 ${size * 3}px ${size}px rgba(255,255,255,0.55)`,
          }}
        />
      ))}
    </div>
  )
}
