import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

// themes: water as highest good, finding low places, grace without force
// visualization: ASCII characters flow like water, seeking their natural level without effort

const useAnimationFrame = (callback, isRunning = true) => {
  const requestRef = useRef(null)
  const previousTimeRef = useRef(null)
  const callbackRef = useRef(callback)
  const animateRef = useRef(null)

  useEffect(() => {
    callbackRef.current = callback
    animateRef.current = (time) => {
      if (previousTimeRef.current !== null) {
        const deltaTime = time - previousTimeRef.current
        callbackRef.current(deltaTime)
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animateRef.current)
    }
  })

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animateRef.current)
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = null
      }
      previousTimeRef.current = null
    }
  }, [isRunning])
}

function WaterAscii({ className = '', background = '#F0EEE6', color = '#0f172a', fullViewport = false }) {
  const [frame, setFrame] = useState(0)
  const containerRef = useRef(null)
  const wrapperRef = useRef(null)
  const [dimensions, setDimensions] = useState({ rows: 25, cols: 52, width: 520, height: 300 })
  const characters = '~≈≋⋿⊰⊱◟◝'
  const charWidth = 6
  const charHeight = 12
  const rows = fullViewport ? dimensions.rows : 25
  const cols = fullViewport ? dimensions.cols : 52

  useEffect(() => {
    if (!fullViewport) return
    const el = wrapperRef.current
    if (!el) return
    const update = () => {
      const w = el.offsetWidth || window.innerWidth
      const h = el.offsetHeight || window.innerHeight
      setDimensions({
        cols: Math.max(52, Math.floor(w / charWidth)),
        rows: Math.max(25, Math.floor(h / charHeight)),
        width: w,
        height: h,
      })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [fullViewport])

  const charactersLength = characters.length
  const charLengthDivide4 = charactersLength / 4

  const lastUpdateRef = useRef(0)

  const updateAnimation = useCallback((deltaTime) => {
    lastUpdateRef.current += deltaTime
    if (lastUpdateRef.current > 166) {
      setFrame((f) => f + 1)
      lastUpdateRef.current = 0
    }
  }, [])

  useAnimationFrame(updateAnimation)

  useEffect(() => {
    return () => {
      lastUpdateRef.current = 0
    }
  }, [])

  const generateAscii = useCallback(() => {
    const rowsArray = []
    const centerPos = { x: 0.5, y: 0.5 }
    const piTimes2 = Math.PI * 2
    const frameDiv4 = frame / 6.7
    const frameDiv5 = frame / 8.3
    const frameDiv8 = frame / 13.3

    for (let y = 0; y < rows; y++) {
      const yDivRows = y / rows
      const yDiv5 = y / 5
      const yDiv3 = y / 3
      let rowString = ''
      let rowOpacity = 1

      for (let x = 0; x < cols; x++) {
        const xDivCols = x / cols
        const xDiv3 = x / 3
        const xDiv4 = x / 4

        const dx = xDivCols - centerPos.x
        const dy = yDivRows - centerPos.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const distTimes10 = dist * 10
        const distTimes5 = dist * 5

        const wave = Math.sin(xDiv3 + yDiv5 + frameDiv4 + distTimes10) +
          Math.cos(xDiv4 - yDiv3 - frameDiv5) +
          Math.sin(frameDiv8 + xDivCols * piTimes2)

        const charValue = (wave + 2) * charLengthDivide4 + distTimes5
        const charIndex = Math.floor(Math.abs(charValue)) % charactersLength

        const opacity = Math.max(0.2, Math.min(0.8, 1 - dist + Math.sin(wave) / 3))

        if (x === 0) rowOpacity = opacity
        else rowOpacity = (rowOpacity + opacity) / 2

        rowString += characters[charIndex]
      }

      rowsArray.push({ text: rowString, opacity: rowOpacity })
    }
    return rowsArray
  }, [frame, charactersLength, charLengthDivide4, characters, rows, cols])

  const ascii = useMemo(() => generateAscii(), [generateAscii])

  const containerStyle = useMemo(() => ({
    margin: 0,
    background,
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  }), [background])

  const innerContainerStyle = useMemo(() => ({
    padding: fullViewport ? 0 : '30px',
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: fullViewport ? 'flex-start' : 'center',
    justifyContent: fullViewport ? 'flex-start' : 'center',
    overflow: fullViewport ? 'hidden' : 'visible',
  }), [fullViewport])

  const preStyle = useMemo(() => {
    const baseFontSize = fullViewport && dimensions.rows > 0 && dimensions.height > 0
      ? Math.max(4, Math.min(14, dimensions.height / dimensions.rows))
      : 10
    return {
      fontFamily: 'monospace',
      fontSize: `${baseFontSize}px`,
      lineHeight: '1',
      cursor: 'default',
      userSelect: 'none',
      margin: 0,
      padding: fullViewport ? '0' : '20px',
      color,
    }
  }, [color, fullViewport, dimensions.rows, dimensions.height])

  return (
    <div ref={wrapperRef} className={className} style={containerStyle} aria-hidden>
      <div ref={containerRef} style={innerContainerStyle}>
        <pre style={preStyle}>
          {ascii.map((row, i) => (
            <div
              key={i}
              style={{
                opacity: row.opacity,
                margin: 0,
                lineHeight: '1',
              }}
            >
              {row.text}
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

export default WaterAscii
