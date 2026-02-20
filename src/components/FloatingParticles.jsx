import { useEffect, useRef } from 'react'

/**
 * Soft floating particles for light backgrounds — slow drift, visible colors.
 */
function FloatingParticles({ className = '', count = 80 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = canvas?.parentElement
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let animationId = null

    const palette = [
      { r: 34, g: 211, b: 238 },   // cyan-400
      { r: 129, g: 140, b: 248 }, // violet-400
      { r: 167, g: 139, b: 250 }, // violet-400
      { r: 45, g: 212, b: 191 },  // teal-400
      { r: 100, g: 116, b: 139 }, // slate-400
    ]

    let particles = []

    const init = () => {
      const rect = container.getBoundingClientRect()
      width = rect.width || window.innerWidth
      height = rect.height || window.innerHeight
      canvas.width = width
      canvas.height = height
      if (width === 0 || height === 0) return
      particles = []
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        radius: 3 + Math.random() * 4,
        baseColor: palette[Math.floor(Math.random() * palette.length)],
        alpha: 0.5 + Math.random() * 0.45,
          wobble: Math.random() * Math.PI * 2,
        })
      }
    }

    const ro = new ResizeObserver(() => {
      init()
    })
    ro.observe(container)
    init()

    window.addEventListener('resize', () => init())

    function animate() {
      if (width === 0 || height === 0) {
        const rect = container.getBoundingClientRect()
        width = rect.width || window.innerWidth
        height = rect.height || window.innerHeight
        canvas.width = width
        canvas.height = height
        if (width > 0 && height > 0 && particles.length === 0) init()
      }

      ctx.clearRect(0, 0, width, height)
      const t = Date.now() * 0.001

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx + Math.sin(t + p.wobble) * 0.03
        p.y += p.vy + Math.cos(t * 0.7 + p.wobble) * 0.03

        if (p.x < -20) p.x = width + 20
        if (p.x > width + 20) p.x = -20
        if (p.y < -20) p.y = height + 20
        if (p.y > height + 20) p.y = -20

        const pulse = 0.8 + Math.sin(t * 0.5 + p.wobble) * 0.2
        const { r, g, b } = p.baseColor
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, p.alpha * pulse)})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', init)
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [count])

  return (
    <div className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className={`pointer-events-none h-full w-full ${className}`}
        style={{ display: 'block' }}
        aria-hidden
      />
    </div>
  )
}

export default FloatingParticles
