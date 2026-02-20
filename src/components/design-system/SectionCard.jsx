/**
 * Card for section content — used in Looking back, etc.
 * @param {number} number - Optional badge number (1, 2, 3...)
 */
export default function SectionCard({ title, children, number, className = '' }) {
  return (
    <div
      className={`group rounded-xl border border-slate-200/80 bg-white/60 p-6 shadow-sm transition-all duration-300 hover:border-indigo-200/60 hover:bg-white hover:shadow-md ${className}`}
    >
      {(title != null || number != null) && (
        <div className="mb-3 flex items-center gap-2">
          {number != null && (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-100/80 text-sm font-semibold text-indigo-700">
              {number}
            </span>
          )}
          {title && <h3 className="text-lg font-semibold text-slate-900">{title}</h3>}
        </div>
      )}
      <p className="text-slate-600 text-[15px] leading-relaxed">{children}</p>
    </div>
  )
}
