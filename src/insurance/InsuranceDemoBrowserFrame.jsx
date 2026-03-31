/**
 * Browser tab strip + address bar aligned with the Insurance case study “shipped product” mock
 * (Design section) so the demo reads as real multi-tab consultant workflow.
 */
export function InsuranceDemoBrowserFrame({
  /** Which browser tab is active: Helio booking vs the second tab (Cover-More or Travel Connect). */
  activeTab,
  /** Second tab label, e.g. "Cover-More" or "Travel Connect". */
  secondaryLabel,
  /** Shown in the address bar (reflects active tab). */
  url,
  /** When false, only the Helio tab is shown (e.g. idle home before a flow). */
  showSecondaryTab = true,
  /** When the second tab is active, makes the inactive Helio tab clickable (e.g. return from Cover-More). */
  onSelectHelioTab,
  children,
  className = '',
}) {
  const helioActive = activeTab === 'helio'
  const secondaryActive = activeTab === 'secondary'
  const helioTabIsButton = !helioActive && typeof onSelectHelioTab === 'function'

  return (
    <div
      className={`overflow-hidden rounded-xl border border-slate-200 text-[13px] shadow-lg ${className}`}
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <div className="bg-[#e8e8e8] px-3 pb-0 pt-2.5">
        <div className="mb-2 flex items-center gap-1.5">
          <div className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" aria-hidden />
          <div className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" aria-hidden />
          <div className="h-[10px] w-[10px] rounded-full bg-[#28c840]" aria-hidden />
        </div>
        <div className="flex items-end gap-0.5" role="tablist" aria-label="Browser tabs">
          {helioTabIsButton ? (
            <button
              type="button"
              role="tab"
              aria-selected={false}
              aria-label="Switch to Helio tab"
              className="flex items-center gap-1.5 rounded-t-md bg-[#d1d1d1] px-3 py-1.5 text-[10px] text-slate-600 transition hover:bg-[#c6c6c6] focus-visible:outline focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1"
              onClick={onSelectHelioTab}
            >
              <div className="h-3 w-3 rounded-sm bg-slate-500/25" aria-hidden />
              Helio
              <span className="ml-1 text-[8px] text-slate-400" aria-hidden>
                ×
              </span>
            </button>
          ) : (
            <div
              role="tab"
              aria-selected={helioActive}
              className={`flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-[10px] ${
                helioActive
                  ? 'bg-white font-medium text-slate-800'
                  : 'bg-[#d1d1d1] text-slate-600'
              }`}
            >
              <div
                className={`h-3 w-3 rounded-sm ${helioActive ? 'bg-slate-400/40' : 'bg-slate-500/25'}`}
                aria-hidden
              />
              Helio
              <span className="ml-1 text-[8px] text-slate-400" aria-hidden>
                ×
              </span>
            </div>
          )}
          {showSecondaryTab && (
            <div
              role="tab"
              aria-selected={secondaryActive}
              className={`flex items-center gap-1.5 rounded-t-md px-3 py-1.5 text-[10px] ${
                secondaryActive
                  ? 'bg-white font-medium text-slate-800'
                  : 'bg-[#d1d1d1] text-slate-600'
              }`}
            >
              <div
                className={`h-3 w-3 rounded-sm ${
                  secondaryActive ? 'bg-blue-400/30' : 'bg-slate-500/20'
                }`}
                aria-hidden
              />
              {secondaryLabel}
              <span className="ml-1 text-[8px] text-slate-400" aria-hidden>
                ×
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 border-b border-slate-200 bg-[#f0f0f0] px-3 py-1.5">
        <div className="flex items-center gap-1 text-slate-400" aria-hidden>
          <span className="text-[10px]">←</span>
          <span className="text-[10px]">→</span>
          <span className="ml-0.5 text-[10px]">⟳</span>
        </div>
        <div className="min-w-0 flex-1 truncate rounded-sm bg-white px-2.5 py-1 text-[10px] text-slate-500">
          {url}
        </div>
      </div>
      <div className="flex h-[560px] flex-col overflow-hidden bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="min-h-full">{children}</div>
        </div>
      </div>
    </div>
  )
}

export const INSURANCE_DEMO_URLS = {
  helio: 'bookings.flightcentre.com.au · BK-2024-HI',
  coverMore: 'covermore.com.au · consultant quote',
  travelConnect: 'travelconnect.flightcentre.space',
}
