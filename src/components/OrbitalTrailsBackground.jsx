import { useEffect, useRef } from 'react'

/**
 * Orbital Trails — spinning rainbow rings with constellation connections.
 */
function OrbitalTrailsBackground({ className = '', width, height }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const size = width != null && height != null ? { w: width, h: height } : null

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let centerX = 0
    let centerY = 0

    const resize = () => {
      if (size) {
        width = canvas.width = size.w
        height = canvas.height = size.h
      } else {
        width = canvas.width = window.innerWidth
        height = canvas.height = window.innerHeight
      }
      centerX = width / 2
      centerY = height / 2
    }
    resize()
    if (!size) window.addEventListener('resize', resize)

    const getRainbowColor = (t) => {
      const hue = (t * 360) % 360
      const s = 0.85, l = 0.6
      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
      const m = l - c / 2
      let r, g, b
      if (hue < 60) { r = c; g = x; b = 0 }
      else if (hue < 120) { r = x; g = c; b = 0 }
      else if (hue < 180) { r = 0; g = c; b = x }
      else if (hue < 240) { r = 0; g = x; b = c }
      else if (hue < 300) { r = x; g = 0; b = c }
      else { r = c; g = 0; b = x }
      return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((b + m) * 255) }
    }

    const minDim = Math.min(width, height)
    const scale = Math.min(1, minDim / 400)
    const RING_COUNT = 5
    const rings = []
    for (let i = 0; i < RING_COUNT; i++) {
      rings.push({
        radius: 40 + (i / RING_COUNT) * minDim * 0.38 * scale,
        speed: (0.04 + i * 0.01) * (i % 2 === 0 ? 1 : -1),
        phase: (i / RING_COUNT) * Math.PI * 2,
        hueOffset: (i / RING_COUNT) * 120,
      })
    }

    const PARTICLE_COUNT = 24
    const particles = []
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        angle: (i / PARTICLE_COUNT) * Math.PI * 2 + Math.random() * 0.3,
        radius: 50 + Math.random() * minDim * 0.32 * scale,
        speed: (0.02 + Math.random() * 0.03) * (i % 2 === 0 ? 1 : -1),
        hueOffset: (i / PARTICLE_COUNT) * 360,
      })
    }

    const CONNECT_DIST = minDim * 0.5
    let time = 0

    function animate() {
      time += 0.02
      ctx.fillStyle = 'rgba(3, 11, 15, 0.08)'
      ctx.fillRect(0, 0, width, height)

      // Draw thin spinning rings
      for (let i = 0; i < rings.length; i++) {
        const ring = rings[i]
        const startAngle = ring.phase + time * ring.speed
        const endAngle = startAngle + Math.PI * 1.6

        ctx.beginPath()
        ctx.arc(centerX, centerY, ring.radius, startAngle, endAngle)
        const hueT = (startAngle / (Math.PI * 2) + 0.5) % 1
        const { r, g, b } = getRainbowColor(hueT + ring.hueOffset / 360)
        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.25)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Update particle positions
      const positions = []
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.angle += p.speed
        const x = centerX + Math.cos(p.angle) * p.radius
        const y = centerY + Math.sin(p.angle) * p.radius
        positions.push({ x, y, hueT: (p.angle / (Math.PI * 2) + 0.5) % 1, hueOffset: p.hueOffset })
      }

      // Constellation: draw thin lines between nearby particles
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const a = positions[i]
          const posB = positions[j]
          const dist = Math.hypot(a.x - posB.x, a.y - posB.y)
          if (dist < CONNECT_DIST) {
            const alpha = 0.15 * (1 - dist / CONNECT_DIST)
            const { r, g, b } = getRainbowColor((a.hueT + posB.hueT / 360) / 2)
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(posB.x, posB.y)
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // Draw particles as small dots
      for (let i = 0; i < positions.length; i++) {
        const { x, y, hueT, hueOffset } = positions[i]
        const { r, g, b } = getRainbowColor(hueT + hueOffset / 360)
        ctx.beginPath()
        ctx.arc(x, y, 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.7)`
        ctx.fill()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (!size) window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${size ? 'block' : 'absolute inset-0 h-full w-full'} ${className}`}
      aria-hidden
    />
  )
}

export default OrbitalTrailsBackground
