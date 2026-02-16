import { useLayoutEffect, useRef, useState } from 'react'

const STROKE_SELECTOR = 'path, line, circle, polyline, polygon, rect'

/**
 * Wraps an SVG and animates its strokes as a "line drawing" (stroke-dashoffset).
 * Starts the animation when the element enters the viewport (animateWhenVisible) or on mount.
 */
export function AnimatedSVGDraw({
  children,
  duration = 1.6,
  className = '',
  animateWhenVisible = true,
  forceInView,
  ...props
}) {
  const wrapperRef = useRef(null)
  const [inView, setInView] = useState(Boolean(forceInView))

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const svg = wrapper.querySelector('svg')
    if (!svg) return

    const elements = svg.querySelectorAll(STROKE_SELECTOR)
    elements.forEach((el) => {
      let length = 0
      if (el.getTotalLength) {
        length = el.getTotalLength()
      } else if (el.tagName === 'line') {
        const x1 = parseFloat(el.getAttribute('x1')) || 0
        const y1 = parseFloat(el.getAttribute('y1')) || 0
        const x2 = parseFloat(el.getAttribute('x2')) || 0
        const y2 = parseFloat(el.getAttribute('y2')) || 0
        length = Math.hypot(x2 - x1, y2 - y1)
      } else if (el.tagName === 'circle') {
        const r = parseFloat(el.getAttribute('r')) || 0
        length = 2 * Math.PI * r
      }
      if (length > 0) {
        el.style.setProperty('--stroke-length', String(length))
      }
    })
  }, [children])

  useLayoutEffect(() => {
    if (forceInView !== undefined) {
      setInView(Boolean(forceInView))
      return
    }
    if (!animateWhenVisible) {
      setInView(true)
      return
    }
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -20px 0px' }
    )
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [animateWhenVisible, forceInView])

  return (
    <span
      ref={wrapperRef}
      className={`animate-stroke-draw inline-block ${inView ? 'in-view' : ''} ${className}`.trim()}
      style={{ ['--stroke-draw-duration']: `${duration}s` }}
      {...props}
    >
      {children}
    </span>
  )
}

/**
 * Wraps an image and reveals it with a horizontal "draw" (clip-path).
 * Use for photos or illustrations to animate in.
 */
export function AnimatedImageReveal({ src, alt, className = '', ...imgProps }) {
  return (
    <span className={`block overflow-hidden ${className}`.trim()}>
      <img
        src={src}
        alt={alt}
        className="animate-image-reveal h-full w-full object-cover"
        {...imgProps}
      />
    </span>
  )
}

export default AnimatedSVGDraw
