import React, { useEffect, useRef } from 'react'

const CHARS = '01'

function MatrixRain({ className = '', opacity = 0.9, speed = 1, static: isStatic = false }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let columns
    let drops = []
    const fontSize = 14

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      columns = Math.floor(rect.width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.random() * -50)
    }

    const drawFrame = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = 'rgba(3, 11, 15, 0.05)'
      ctx.fillRect(0, 0, rect.width, rect.height)

      ctx.font = '14px monospace'
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 8

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = '#00ff41'
        ctx.globalAlpha = opacity
        ctx.fillText(char, x, y)
        ctx.shadowBlur = 8
        ctx.fillText(char, x, y)
        ctx.shadowBlur = 0

        if (y > 0 && Math.random() > 0.975) {
          ctx.fillStyle = '#008f11'
          ctx.globalAlpha = opacity * 0.6
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y - fontSize)
        }
        ctx.globalAlpha = 1

        if (y > rect.height && Math.random() > 0.98) {
          drops[i] = 0
        } else {
          drops[i] += speed * (0.8 + Math.random() * 0.4)
        }
      }
    }

    const drawStatic = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.fillStyle = '#030b0f'
      ctx.fillRect(0, 0, rect.width, rect.height)

      ctx.font = '14px monospace'
      ctx.shadowColor = '#00ff41'
      ctx.shadowBlur = 8

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize
        const startY = Math.random() * -80
        for (let k = 0; k < 18; k++) {
          const y = startY + k * fontSize
          if (y < -fontSize || y > rect.height + fontSize) continue
          const t = k / 18
          const charAlpha = 0.25 + (1 - t) * 0.65
          ctx.globalAlpha = opacity * charAlpha
          ctx.fillStyle = k === 0 ? '#00ff41' : '#008f11'
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], x, y)
        }
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
    }

    const tick = () => {
      drawFrame()
      animationId = requestAnimationFrame(tick)
    }

    resize()
    if (isStatic) {
      drawStatic()
    } else {
      tick()
      window.addEventListener('resize', resize)
    }

    return () => {
      if (!isStatic) {
        window.removeEventListener('resize', resize)
        cancelAnimationFrame(animationId)
      }
    }
  }, [opacity, speed, isStatic])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden
    />
  )
}

export default MatrixRain
