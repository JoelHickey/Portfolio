import { useEffect, useRef } from 'react'

function lerp(a, b, t) {
  return a + (b - a) * t
}

const VARIANTS = {
  strength: { waveSpeed: 0.4, pulseSpeed: 0.3, burstScale: 0.35, lerpSpeed: 0.08, palette: [{ r: 34, g: 211, b: 238 }, { r: 20, g: 184, b: 166 }, { r: 6, g: 182, b: 212 }] },
  speed: { waveSpeed: 0.6, pulseSpeed: 0.5, burstScale: 0.4, lerpSpeed: 0.1, palette: [{ r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 34, g: 211, b: 238 }] },
  iteration: { waveSpeed: 0.35, pulseSpeed: 0.25, burstScale: 0.38, lerpSpeed: 0.06, palette: [{ r: 34, g: 211, b: 238 }, { r: 94, g: 234, b: 212 }, { r: 129, g: 140, b: 248 }] },
  imagination: { waveSpeed: 0.55, pulseSpeed: 0.45, burstScale: 0.32, lerpSpeed: 0.09, palette: [{ r: 167, g: 139, b: 250 }, { r: 34, g: 211, b: 238 }, { r: 236, g: 72, b: 153 }] },
  empowerment: { waveSpeed: 0.3, pulseSpeed: 0.2, burstScale: 0.42, lerpSpeed: 0.07, palette: [{ r: 34, g: 211, b: 238 }, { r: 45, g: 212, b: 191 }, { r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 232, g: 121, b: 249 }, { r: 236, g: 72, b: 153 }], orbital: true, trailAlpha: 0.2, opacityMultiplier: 3, sizeMultiplier: 1.5, particleCount: 900 },
  title: { waveSpeed: 0.4, pulseSpeed: 0.25, burstScale: 0.42, lerpSpeed: 0.06, palette: [{ r: 34, g: 211, b: 238 }, { r: 45, g: 212, b: 191 }, { r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 232, g: 121, b: 249 }, { r: 236, g: 72, b: 153 }], orbital: true, trailAlpha: 0.2, opacityMultiplier: 3, sizeMultiplier: 1.5, particleCount: 900, wavy: true, waveAmplitude: 48, waveAmplitude2: 32 },
  mystical: { waveSpeed: 0.5, pulseSpeed: 0.4, burstScale: 0.36, lerpSpeed: 0.085, palette: [{ r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 34, g: 211, b: 238 }] },
  calmness: { waveSpeed: 0.08, pulseSpeed: 0.12, burstScale: 0.32, lerpSpeed: 0.04, palette: [{ r: 34, g: 211, b: 238 }, { r: 6, g: 182, b: 212 }, { r: 94, g: 234, b: 212 }], breathing: true },
  momentum: { waveSpeed: 0.8, pulseSpeed: 0.6, burstScale: 0.5, lerpSpeed: 0.12, palette: [{ r: 34, g: 211, b: 238 }, { r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 236, g: 72, b: 153 }], multidirectional: true },
  agents: { waveSpeed: 0.5, pulseSpeed: 0.4, burstScale: 0.45, lerpSpeed: 0.06, palette: [{ r: 34, g: 211, b: 238 }, { r: 129, g: 140, b: 248 }, { r: 167, g: 139, b: 250 }, { r: 232, g: 121, b: 249 }], orbital: true },
  brain: {
    waveSpeed: 0.25,
    pulseSpeed: 0.2,
    burstScale: 0.28,
    lerpSpeed: 0.04,
    palette: [
      { r: 129, g: 140, b: 248 },
      { r: 167, g: 139, b: 250 },
      { r: 34, g: 211, b: 238 },
      { r: 236, g: 72, b: 153 },
    ],
    orbital: true,
    particleCount: 600,
    opacityMultiplier: 2,
    brainShape: true,
  },
}

function ParticleBackground({ className = '', variant = 'strength' }) {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const config = VARIANTS[variant] || VARIANTS.strength

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

    const PARTICLE_COUNT = config.particleCount ?? (config.multidirectional ? 600 : config.orbital ? 700 : 800)
    const particles = []
    const palette = config.palette

    // 8 zones: top, top-right, right, bottom-right, bottom, bottom-left, left, top-left
    const ZONES = [
      { angle: -Math.PI / 2, edge: 'top' },
      { angle: -Math.PI / 4, edge: 'topRight' },
      { angle: 0, edge: 'right' },
      { angle: Math.PI / 4, edge: 'bottomRight' },
      { angle: Math.PI / 2, edge: 'bottom' },
      { angle: (3 * Math.PI) / 4, edge: 'bottomLeft' },
      { angle: Math.PI, edge: 'left' },
      { angle: (-3 * Math.PI) / 4, edge: 'topLeft' },
    ]

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const baseColor = palette[Math.floor(Math.random() * palette.length)]
      const zone = config.multidirectional ? ZONES[Math.floor(Math.random() * ZONES.length)] : null
      let x, y
      if (zone) {
        const margin = 80
        const t = Math.random()
        switch (zone.edge) {
          case 'top': x = margin + (width - 2 * margin) * t; y = -20 - Math.random() * 60; break
          case 'topRight': x = width + 20 + Math.random() * 80; y = -20 - Math.random() * 80; break
          case 'right': x = width + 20 + Math.random() * 60; y = margin + (height - 2 * margin) * t; break
          case 'bottomRight': x = width + 20 + Math.random() * 80; y = height + 20 + Math.random() * 80; break
          case 'bottom': x = margin + (width - 2 * margin) * t; y = height + 20 + Math.random() * 60; break
          case 'bottomLeft': x = -20 - Math.random() * 80; y = height + 20 + Math.random() * 80; break
          case 'left': x = -20 - Math.random() * 60; y = margin + (height - 2 * margin) * t; break
          case 'topLeft': x = -20 - Math.random() * 80; y = -20 - Math.random() * 80; break
          default: x = Math.random() * width; y = Math.random() * height
        }
      } else {
        x = Math.random() * width
        y = Math.random() * height
      }
      particles.push({
        x,
        y,
        seed: Math.random(),
        seed2: Math.random(),
        angle: Math.random() * Math.PI * 2,
        radius: Math.random(),
        baseColor,
        baseOpacity: config.multidirectional ? 0.04 + Math.random() * 0.08 : config.orbital ? 0.035 + Math.random() * 0.06 : 0.02 + Math.random() * 0.04,
        speedMult: config.multidirectional ? 0.8 + Math.random() * 1.2 : 0.6 + Math.random() * 0.8,
        zone,
        zoneOffset: Math.random(),
        zoneSpread: 0.3 + Math.random() * 0.5,
      })
    }

    let time = 0
    const { waveSpeed, pulseSpeed, burstScale, lerpSpeed, breathing, multidirectional, orbital, brainShape, wavy, waveAmplitude = 40, waveAmplitude2 = 24 } = config

    function getTarget(p) {
      if (orbital) {
        const orbitSpeed = 0.02 + p.seed * 0.015
        const orbitAngle = p.seed * Math.PI * 2 + time * orbitSpeed * (p.seed > 0.5 ? 1 : -1)

        // Brain-shaped orbital path: squashed ellipse with slight lobes and depth
        if (brainShape) {
          const baseR = 70 + p.radius * Math.min(width, height) * 0.3
          const lobe = Math.cos(orbitAngle * 2) * 12
          const depth = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(orbitAngle)) // front vs back
          const wobble = Math.sin(time * 0.3 + p.seed2 * 10) * 6
          return {
            x: centerX + Math.cos(orbitAngle) * (baseR + lobe),
            y: centerY + Math.sin(orbitAngle) * (baseR * 0.6 + wobble),
            depth,
          }
        }

        const orbitRadius = 80 + p.radius * Math.min(width, height) * 0.35
        if (wavy) {
          const wobble1 = Math.sin(time * 0.4 + p.seed2 * 10) * waveAmplitude
          const wobble2 = Math.sin(time * 0.7 + p.seed * 15) * waveAmplitude2
          const wobbleY = Math.sin(time * 0.5 + p.seed * 12) * waveAmplitude2 * 0.8
          const r = orbitRadius + wobble1 + wobble2
          return {
            x: centerX + Math.cos(orbitAngle) * r,
            y: centerY + Math.sin(orbitAngle) * (orbitRadius * 0.7 + wobbleY + wobble2 * 0.6),
          }
        }
        const wobble = Math.sin(time * 0.3 + p.seed2 * 10) * 15
        return {
          x: centerX + Math.cos(orbitAngle) * (orbitRadius + wobble),
          y: centerY + Math.sin(orbitAngle) * (orbitRadius + wobble * 0.7),
        }
      }
      if (multidirectional && p.zone) {
        // Particles flow IN from edges toward center — converging from all 8 angles
        const baseAngle = p.zone.angle + (p.zoneOffset - 0.5) * p.zoneSpread * Math.PI
        const phase = (time * 0.25 + p.seed * 5) % (Math.PI * 2)
        const wobble = Math.sin(phase) * 60 + Math.cos(p.seed2 * 8 + time * 0.4) * 40
        const maxR = Math.max(width, height) * 0.4
        const r = maxR * (0.1 + p.radius * 0.4) + wobble
        const swirl = time * 0.1 * (p.seed > 0.5 ? 1 : -1)
        const finalAngle = baseAngle + swirl
        return {
          x: centerX + Math.cos(finalAngle) * r,
          y: centerY + Math.sin(finalAngle) * r,
        }
      }

      const burstAngle = p.seed * Math.PI * 2
      const baseR = 60 + p.radius * Math.min(width, height) * burstScale

      if (breathing) {
        const breathPhase = Math.sin(time * 0.4)
        const breathAmp = Math.min(width, height) * 0.1
        const burstR = baseR + breathPhase * breathAmp
        return {
          x: centerX + Math.cos(burstAngle) * burstR,
          y: centerY + Math.sin(burstAngle) * burstR,
        }
      }

      const wave = Math.sin(p.seed * 62.8 + time * waveSpeed) * 25
      const wave2 = Math.cos(p.seed2 * 62.8 + time * waveSpeed * 0.8) * 20
      const pulse = Math.sin(time * pulseSpeed + p.radius * 3) * 15
      return {
        x: centerX + Math.cos(burstAngle) * (baseR + pulse + wave),
        y: centerY + Math.sin(burstAngle) * (baseR + pulse + wave2),
      }
    }

    const trailAlpha = config.trailAlpha ?? ((orbital || multidirectional) ? 0.12 : 0.04)

    function animate() {
      time += 0.01
      ctx.fillStyle = `rgba(3, 11, 15, ${trailAlpha})`
      ctx.fillRect(0, 0, width, height)

      const breathOpacity = breathing ? 0.7 + Math.sin(time * 0.4) * 0.3 : 1

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const target = getTarget(p)
        p.x = lerp(p.x, target.x, lerpSpeed)
        p.y = lerp(p.y, target.y, lerpSpeed)
        p.angle += breathing ? 0.0008 : multidirectional ? 0.004 : orbital ? 0.003 : 0.002

        if (multidirectional && p.zone) {
          const dx = p.x - centerX
          const dy = p.y - centerY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < Math.min(width, height) * 0.15) {
            const z = ZONES[Math.floor(Math.random() * ZONES.length)]
            const margin = 60
            const t = Math.random()
            switch (z.edge) {
              case 'top': p.x = margin + (width - 2 * margin) * t; p.y = -30 - Math.random() * 40; break
              case 'topRight': p.x = width + 30 + Math.random() * 60; p.y = -30 - Math.random() * 60; break
              case 'right': p.x = width + 30 + Math.random() * 50; p.y = margin + (height - 2 * margin) * t; break
              case 'bottomRight': p.x = width + 30 + Math.random() * 60; p.y = height + 30 + Math.random() * 60; break
              case 'bottom': p.x = margin + (width - 2 * margin) * t; p.y = height + 30 + Math.random() * 40; break
              case 'bottomLeft': p.x = -30 - Math.random() * 60; p.y = height + 30 + Math.random() * 60; break
              case 'left': p.x = -30 - Math.random() * 50; p.y = margin + (height - 2 * margin) * t; break
              case 'topLeft': p.x = -30 - Math.random() * 60; p.y = -30 - Math.random() * 60; break
              default: p.x = Math.random() * width; p.y = Math.random() * height
            }
            p.zone = z
          }
        }

        const opacityMult = config.opacityMultiplier ?? 1
        // For brainShape, dim "back" particles slightly if depth is provided
        const depth = target.depth ?? 1
        const alpha = Math.min(1, p.baseOpacity * breathOpacity * opacityMult * depth)
        const sizeMult = config.sizeMultiplier ?? 1
        const sizeBase = multidirectional ? (0.6 + p.radius * 1) : orbital ? (0.5 + p.radius * 0.8) : (0.4 + p.radius * 0.5) * 1.2
        const size = sizeBase * sizeMult * (brainShape ? depth : 1)
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
  }, [variant])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 w-screen h-screen ${className}`}
      aria-hidden
    />
  )
}

export default ParticleBackground
