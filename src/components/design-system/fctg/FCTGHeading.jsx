/**
 * FCTG AI Talk section heading.
 * @param {'v1'|'v2'|'v2-hero'} variant - v1: light theme (slate/indigo), v2: dark slides (cyan→purple), v2-hero: larger
 * @param {string} size - Optional size override (e.g. '!text-[2.25rem] md:!text-[2.75rem]')
 */
export default function FCTGHeading({ children, variant = 'v1', size, className = '', as: Component = 'h2', ...rest }) {
  const base = 'font-semibold leading-tight tracking-tight'
  const variants = {
    v1: 'text-6xl pb-3 leading-normal bg-gradient-to-r from-slate-800 via-indigo-700 to-slate-800 bg-clip-text text-transparent',
    v2: 'fctg-heading !text-[2.25rem] md:!text-[2.75rem] inline-block',
    'v2-hero': 'fctg-heading-hero',
  }
  const v = variants[variant] ?? variants.v1
  const sizeClass = size ?? ''
  return (
    <Component
      className={`${base} ${v} ${sizeClass} ${className}`.trim()}
      style={variant === 'v2' || variant === 'v2-hero' ? { background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' } : undefined}
      {...rest}
    >
      {children}
    </Component>
  )
}
