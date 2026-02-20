/**
 * Gradient label pill — e.g. Efficiency, Assurance, Knowledge, Value.
 * @param {string} gradient - Tailwind gradient classes (from-X to-Y)
 */
export default function LabelPill({ children, gradient = 'from-amber-500 to-orange-600', className = '' }) {
  return (
    <p className={`whitespace-nowrap bg-gradient-to-r ${gradient} bg-clip-text text-4xl font-bold text-transparent ${className}`}>
      {children}
    </p>
  )
}
