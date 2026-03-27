import { useEffect, useRef, useState } from 'react'

/**
 * Sticky in-page nav for case study sections.
 * Pass an array of { id, label } — each id should match a section's `id` attribute.
 */
export default function CaseStudyNav({ sections }) {
  const [activeId, setActiveId] = useState(null)
  const [visible, setVisible] = useState(false)
  const navRef = useRef(null)

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean)

    if (!els.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sections])

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 500)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  }

  return (
    <nav
      ref={navRef}
      aria-label="Case study sections"
      className={`fixed top-20 right-6 z-40 hidden xl:flex flex-col gap-1.5 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => handleClick(s.id)}
          className={`text-right text-xs tracking-wide transition-colors px-3 py-1 rounded-full ${
            activeId === s.id
              ? 'text-slate-900 bg-slate-200/80 font-medium'
              : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}
