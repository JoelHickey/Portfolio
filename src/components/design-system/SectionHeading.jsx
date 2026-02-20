/**
 * Section heading with optional gradient variant.
 * @param {string} variant - 'plain' | 'gradient' (default: plain)
 */
export default function SectionHeading({ children, variant = 'plain', className = '' }) {
  const base = 'text-4xl font-semibold leading-tight tracking-tight md:text-5xl'
  const variants = {
    plain: 'text-slate-900',
    gradient: 'bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent',
  }
  return (
    <h2 className={`${base} ${variants[variant] ?? variants.plain} ${className}`}>
      {children}
    </h2>
  )
}
