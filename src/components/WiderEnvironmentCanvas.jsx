import { useEffect, useRef } from 'react'

const CX = 200
const CY = 200
const SIZE = 640

const RING_CONFIG = [
  { r: 304, label: 'Earth' },
  { r: 234, label: 'Society' },
  { r: 164, label: 'Mission' },
]

const COLORS = {
  black: {
    ringStroke: (i) => `rgba(0, 0, 0, ${0.55 - i * 0.05})`,
    label: 'rgba(0, 0, 0, 0.95)',
    circleStroke: 'rgba(0, 0, 0, 0.45)',
    centerDot: 'rgba(0, 0, 0, 0.8)',
  },
  cyan: {
    ringStroke: (i) => `rgba(34, 211, 238, ${0.55 - i * 0.05})`,
    label: 'rgba(203, 213, 225, 0.95)',
    circleStroke: 'rgba(34, 211, 238, 0.45)',
    centerDot: 'rgba(34, 211, 238, 0.8)',
  },
}

const CIRCLES = [
  { x: 168, y: 184, r: 58, label: 'Product' },
  { x: 232, y: 184, r: 58, label: 'Business' },
  { x: 200, y: 232, r: 58, label: 'Design' },
]

function WiderEnvironmentCanvas({ className = '', width = 560, height = 560, variant = 'cyan' }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const colors = COLORS[variant] ?? COLORS.cyan

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
      RING_CONFIG.forEach((ring, i) => {
        ctx.beginPath()
        ctx.arc(CX, CY, ring.r, 0, Math.PI * 2)
        ctx.strokeStyle = colors.ringStroke(i)
        ctx.lineWidth = 1.5
        ctx.stroke()
      })
      ctx.setLineDash([])
      ctx.translate(CX, CY)
      ctx.rotate(-rotation)
      ctx.translate(-CX, -CY)

      // Ring labels — placed at bottom of each ring, inside
      ctx.font = '14px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      RING_CONFIG.forEach((ring) => {
        ctx.fillStyle = colors.label
        ctx.fillText(ring.label, CX, CY + ring.r - 24)
      })

      // Venn circles
      ctx.strokeStyle = colors.circleStroke
      ctx.lineWidth = 1.5
      CIRCLES.forEach((c) => {
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.stroke()
      })

      // Circle labels — centered in each Venn circle
      ctx.font = '13px system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = colors.label
      CIRCLES.forEach((c) => {
        const labelY = c.label === 'Design' ? c.y + 24 : c.y
        ctx.fillText(c.label, c.x, labelY)
      })

      // Center dot (design process) — pulse
      const r = 12 * pulse
      ctx.beginPath()
      ctx.arc(CX, CY, r, 0, Math.PI * 2)
      ctx.fillStyle = colors.centerDot
      ctx.fill()

      ctx.restore()
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafRef.current)
  }, [width, height, variant])

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
