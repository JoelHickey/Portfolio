/**
 * FCTG label pill — e.g. Efficiency, Assurance, Knowledge, Value on Strength page.
 * Re-exports LabelPill with FCTG gradient presets.
 */
import LabelPill from '../LabelPill'

const FCTG_GRADIENTS = {
  efficiency: 'from-amber-500 to-orange-600',
  assurance: 'from-emerald-500 to-teal-600',
  knowledge: 'from-cyan-500 to-sky-600',
  value: 'from-violet-500 to-purple-600',
}

export default function FCTGLabelPill({ children, variant, gradient, className = '' }) {
  const g = gradient ?? (variant && FCTG_GRADIENTS[variant]) ?? FCTG_GRADIENTS.efficiency
  return <LabelPill gradient={g} className={className}>{children}</LabelPill>
}
