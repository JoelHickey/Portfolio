import { useEffect, useRef } from 'react'

function starMapOrbitTranslateY(outer, radiusScale = 1) {
  const radiusVar = outer ? '--cap-radius-outer' : '--cap-radius'
  const s = Number.isFinite(radiusScale) ? radiusScale : 1
  return `translateY(calc(-1 * var(${radiusVar}) * ${s}))`
}

/** Orbit transform only (no bounce offset). Use when React must not own `style.transform`. */
export function applyStarMapOrbitTransform(el, layout) {
  if (!el || !layout) return
  const s = layout.radiusScale ?? 1
  el.style.transform = `translate(-50%, -50%) rotate(${layout.angle}deg) ${starMapOrbitTranslateY(layout.outer, s)} rotate(${-layout.angle}deg)`
}

/**
 * One-time 2D bounce + settle intro for star-map circles when `active` becomes true.
 * Updates each node's transform with translate(dx,dy) before the orbit chain.
 */
export function useStarMapBounceIntro({ active, containerRef, starRefsRef, layouts }) {
  const playedRef = useRef(false)

  useEffect(() => {
    if (!active || playedRef.current) return
    if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      playedRef.current = true
      return
    }

    const container = containerRef.current
    if (!container) return

    let cancelled = false
    let rafId = 0
    let waitFrames = 0

    const run = () => {
      if (cancelled) return
      const stars = starRefsRef.current
      if (!stars || stars.length !== layouts.length || stars.some((el) => !el)) {
        waitFrames += 1
        if (waitFrames > 240) {
          playedRef.current = true
          return
        }
        rafId = requestAnimationFrame(run)
        return
      }

      playedRef.current = true

      const c = container.getBoundingClientRect()
      const cx = c.left + c.width / 2
      const cy = c.top + c.height / 2
      const hx = c.width / 2 - 8
      const hy = c.height / 2 - 8

      const particles = layouts.map((layout, i) => {
        const el = stars[i]
        const er = el.getBoundingClientRect()
        const tx = er.left + er.width / 2 - cx
        const ty = er.top + er.height / 2 - cy
        const r = Math.max(er.width, er.height) / 2
        return {
          el,
          tx,
          ty,
          r,
          angle: layout.angle,
          outer: layout.outer,
          radiusScale: layout.radiusScale ?? 1,
          x: (Math.random() - 0.5) * c.width * 0.72,
          y: (Math.random() - 0.5) * c.height * 0.72,
          vx: (Math.random() - 0.5) * 9,
          vy: (Math.random() - 0.5) * 9
        }
      })

      const restitution = 0.58
      const damping = 0.9965
      const T_PHYSICS_MS = 3200
      const T_SETTLE_MS = 1100
      let start = performance.now()
      let phase = 'physics'

      const applyTransform = (p) => {
        const dx = +(p.x - p.tx).toFixed(2)
        const dy = +(p.y - p.ty).toFixed(2)
        p.el.style.transform = `translate(-50%, -50%) translate(${dx}px, ${dy}px) rotate(${p.angle}deg) ${starMapOrbitTranslateY(p.outer, p.radiusScale)} rotate(${-p.angle}deg)`
      }

      const tick = (now) => {
        if (cancelled) {
          for (const p of particles) {
            p.el.style.transform = `translate(-50%, -50%) rotate(${p.angle}deg) ${starMapOrbitTranslateY(p.outer, p.radiusScale)} rotate(${-p.angle}deg)`
          }
          return
        }

        if (phase === 'physics') {
          const elapsed = now - start
          const tNorm = Math.min(1, elapsed / T_PHYSICS_MS)
          const smoothT = tNorm * tNorm * (3 - 2 * tNorm)
          const rampIn = Math.min(1, tNorm / 0.1)
          const rampOut = 1 - Math.min(1, Math.max(0, tNorm - 0.72) / 0.28) ** 2
          const pull = (0.0001 + smoothT * smoothT * 0.00155) * rampIn * rampOut

          for (const p of particles) {
            p.vx += (p.tx - p.x) * pull
            p.vy += (p.ty - p.y) * pull
            p.vx *= damping
            p.vy *= damping
            p.x += p.vx
            p.y += p.vy
          }

          const n = particles.length
          for (let i = 0; i < n; i++) {
            const pi = particles[i]
            if (pi.x - pi.r < -hx) {
              pi.x = -hx + pi.r
              pi.vx *= -restitution
            }
            if (pi.x + pi.r > hx) {
              pi.x = hx - pi.r
              pi.vx *= -restitution
            }
            if (pi.y - pi.r < -hy) {
              pi.y = -hy + pi.r
              pi.vy *= -restitution
            }
            if (pi.y + pi.r > hy) {
              pi.y = hy - pi.r
              pi.vy *= -restitution
            }
          }

          for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
              const pi = particles[i]
              const pj = particles[j]
              const dx = pj.x - pi.x
              const dy = pj.y - pi.y
              const dist = Math.hypot(dx, dy) || 1e-6
              const minD = pi.r + pj.r
              if (dist < minD) {
                const nx = dx / dist
                const ny = dy / dist
                const overlap = minD - dist
                const sep = 0.42
                pi.x -= nx * overlap * sep
                pi.y -= ny * overlap * sep
                pj.x += nx * overlap * sep
                pj.y += ny * overlap * sep
                const dvx = pj.vx - pi.vx
                const dvy = pj.vy - pi.vy
                const dvn = dvx * nx + dvy * ny
                if (dvn < 0) {
                  const imp = (-(1 + restitution) * dvn) / 2
                  pi.vx -= imp * nx
                  pi.vy -= imp * ny
                  pj.vx += imp * nx
                  pj.vy += imp * ny
                }
              }
            }
          }

          for (const p of particles) applyTransform(p)

          if (elapsed >= T_PHYSICS_MS) {
            for (const p of particles) {
              p.sx = p.x
              p.sy = p.y
            }
            phase = 'settle'
            start = now
          }
        } else {
          const settleT = Math.min(1, (now - start) / T_SETTLE_MS)
          const u = 1 - (1 - settleT) ** 4
          for (const p of particles) {
            p.x = p.sx + (p.tx - p.sx) * u
            p.y = p.sy + (p.ty - p.sy) * u
            applyTransform(p)
          }
          if (settleT >= 1) {
            for (const p of particles) {
              p.el.style.transform = `translate(-50%, -50%) rotate(${p.angle}deg) ${starMapOrbitTranslateY(p.outer, p.radiusScale)} rotate(${-p.angle}deg)`
            }
            return
          }
        }

        rafId = requestAnimationFrame(tick)
      }

      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(run)
    })

    return () => {
      cancelled = true
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [active, containerRef, starRefsRef, layouts])
}
