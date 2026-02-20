/**
 * FCTG v2 dark card — used in slides (Models, Vibe vs agentic, etc.)
 * @param {boolean} compact - Use compact padding (Building momentum)
 * @param {boolean} momentum - Use momentum card layout (centered, equal height)
 */
export default function FCTGCard({ title, children, compact = false, momentum = false, className = '' }) {
  const cardClass = [
    'fctg-card',
    compact && 'fctg-card-compact',
    momentum && 'fctg-momentum-card',
    className,
  ].filter(Boolean).join(' ')
  return (
    <div className={cardClass}>
      {title && (
        <h3 className={momentum ? 'fctg-card-title fctg-card-title-compact' : 'fctg-card-title'}>
          {title}
        </h3>
      )}
      {children && (
        <p className={momentum ? 'fctg-card-text fctg-card-text-compact mt-2' : 'fctg-card-text mt-2'}>
          {children}
        </p>
      )}
    </div>
  )
}
