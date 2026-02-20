/**
 * Standard section content wrapper — max-width, padding, centered.
 */
export default function SectionLayout({ children, className = '', maxWidth = 'max-w-6xl' }) {
  return (
    <div className={`mx-auto w-full ${maxWidth} px-6 py-12 ${className}`}>
      {children}
    </div>
  )
}
