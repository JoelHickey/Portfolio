import { useEffect, useRef } from 'react'

function lerp(a, b, t) {
  return a + (b - a) * t
}

function ParticleBackground({ className = '' }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      centerX = width / 2
      centerY = height / 2
    }
    resize()
    window.addEventListener('resize', resize)

    const PARTICLE_COUNT = 800
    const particles = []
    const palette = [
      { r: 34, g: 211, b: 238 },
      { r: 6, g: 182, b: 212 },
      { r: 20, g: 184, b: 166 },
      { r: 94, g: 234, b: 212 },
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseColor = palette[Math.floor(Math.random() * palette.length)]
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        seed: Math.random(),
        seed2: Math.random(),
        angle: Math.random() * Math.PI * 2,
        radius: Math.random(),
        baseColor,
        baseOpacity: 0.02 + Math.random() * 0.04,
        speedMult: 0.6 + Math.random() * 0.8,
      })
    }

    let time = 0

    function getTarget(p) {
      const wave = Math.sin(p.seed * 62.8 + time * 0.4) * 25
      const wave2 = Math.cos(p.seed2 * 62.8 + time * 0.3) * 20
      const burstAngle = p.seed * Math.PI * 2
      const burstR = 60 + p.radius * Math.min(width, height) * 0.35
      const pulse = Math.sin(time * 0.3 + p.radius * 3) * 15
      return {
        x: centerX + Math.cos(burstAngle) * (burstR + pulse + wave),
        y: centerY + Math.sin(burstAngle) * (burstR + pulse + wave2),
      }
    }

    function animate() {
      time += 0.01
      ctx.fillStyle = 'rgba(3, 11, 15, 0.04)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const target = getTarget(p)
        p.x = lerp(p.x, target.x, 0.08)
        p.y = lerp(p.y, target.y, 0.08)
        p.angle += 0.002

        const alpha = p.baseOpacity
        const size = (0.4 + p.radius * 0.5) * 1.2
        if (alpha < 0.01) continue

        const { r, g, b } = p.baseColor
        const col = `rgba(${r}, ${g}, ${b}, ${alpha})`

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)
        ctx.fillStyle = col
        ctx.beginPath()
        ctx.arc(0, 0, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden
    />
  )
}

export default ParticleBackground
