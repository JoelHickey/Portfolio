import { useEffect, useRef } from 'react'

const PALETTE = [
  { r: 34, g: 211, b: 238 },
  { r: 45, g: 212, b: 191 },
  { r: 129, g: 140, b: 248 },
  { r: 167, g: 139, b: 250 },
  { r: 232, g: 121, b: 249 },
]

function BatteryParticleFill({ width = 452, height = 76, className = '' }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const PARTICLE_COUNT = 220
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const col = PALETTE[Math.floor(Math.random() * PALETTE.length)]
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.3,
        radius: 1.2 + Math.random() * 1.8,
        baseOpacity: 0.6 + Math.random() * 0.35,
        color: col,
        phase: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.5,
      })
    }

    let time = 0

    canvas.width = width
    canvas.height = height

    function animate() {
      time += 0.016
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        const wobble = Math.sin(time + p.phase) * p.drift
        p.x += wobble
        p.y += Math.cos(time * 0.7 + p.phase) * p.drift * 0.5

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        const pulse = 0.85 + Math.sin(time * 2 + p.phase) * 0.15
        const alpha = p.baseOpacity * pulse

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    />
  )
}

export default BatteryParticleFill
