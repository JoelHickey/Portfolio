import { useEffect, useRef } from 'react'

const CX = 200
const CY = 200
const SIZE = 640

const RINGS = [
  { r: 304, stroke: '#cbd5e1', label: 'Earth' },
  { r: 234, stroke: '#94a3b8', label: 'Society' },
  { r: 164, stroke: '#64748b', label: 'Mission' },
]

const CIRCLES = [
  { x: 168, y: 184, r: 58, label: 'Product' },
  { x: 232, y: 184, r: 58, label: 'Business' },
  { x: 200, y: 232, r: 58, label: 'Design' },
]

function WiderEnvironmentCanvas({ className = '', width = 560, height = 560 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = width
    const h = height
    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    ctx.scale(dpr, dpr)

    const scale = Math.min(w, h) / SIZE

    const draw = (t) => {
      const start = startRef.current ?? t
      startRef.current = start
      const elapsed = (t - start) / 1000
      const pulse = 0.75 + Math.sin(elapsed * 2) * 0.25

      ctx.clearRect(0, 0, w, h)
      ctx.save()
      ctx.translate(w / 2, h / 2)
      ctx.scale(scale, scale)
      ctx.translate(-CX, -CY)

      // Rings — rotate slowly
      const rotation = elapsed * 0.15
      ctx.translate(CX, CY)
      ctx.rotate(rotation)
      ctx.translate(-CX, -CY)
      ctx.setLineDash([6, 6])
      RINGS.forEach((ring) => {
        ctx.beginPath()
        ctx.arc(CX, CY, ring.r, 0, Math.PI * 2)
        ctx.strokeStyle = ring.stroke
        ctx.lineWidth = 1
        ctx.stroke()
      })
      ctx.setLineDash([])
      ctx.translate(CX, CY)
      ctx.rotate(-rotation)
      ctx.translate(-CX, -CY)

      // Venn circles
      ctx.strokeStyle = '#64748b'
      ctx.lineWidth = 1
      CIRCLES.forEach((c) => {
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Center dot (design process) — pulse
      const r = 12 * pulse
      ctx.beginPath()
      ctx.arc(CX, CY, r, 0, Math.PI * 2)
      ctx.fillStyle = '#475569'
      ctx.fill()

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      width={width}
      height={height}
      role="img"
      aria-label="Design process nested within Earth, society, mission, and the overlap of Product, Business, and Design"
    />
  )
}

export default WiderEnvironmentCanvas
