/**
 * Travel Connect tier comparison — same UI as the Design section / Figma screenshot
 * on the Insurance case study (`Insurance.jsx`). Reused in the interactive demo.
 */
const DEFAULT_TIERS = [
  { planId: 'basic', label: 'Bronze', price: '160.00' },
  { planId: 'standard', label: 'Silver', price: '160.00' },
  { planId: 'premium', label: 'Gold', price: '200.00' },
]

const DEFAULT_COVERAGE_ROWS = [
  { label: 'Medical screening', vals: ['✓', '✓', '✓'] },
  { label: 'Cruise cover', vals: ['✗', '✗', '✗'] },
  { label: 'Covid-19: Cancellation', vals: ['$2,500', '$2,500', '$5,000'] },
  { label: 'Covid-19: Overseas Medical', vals: ['Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Cancellation', vals: ['$15,000', '$15,000', 'Unlimited'] },
  { label: 'Medical expenses', vals: ['Unlimited', 'Unlimited', 'Unlimited'] },
  { label: 'Excess', vals: ['$100', '$100', '$100'] },
  { label: 'Personal liability', vals: ['$2,500,000', '$2,500,000', '$5,000,000'] },
  { label: 'Baggage', vals: ['$6,000', '$6,000', '✗'] },
  { label: 'Accidental death', vals: ['$37,500', '$37,500', '$50,000'] },
]

const travelConnectFont =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'

/** Red app bar + grey page background (matches shipped Travel Connect / tier results screen). */
export function TravelConnectAppShell({ children, className = '' }) {
  return (
    <>
      <div className="bg-[#e10a0a] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1" />
              <circle cx="6" cy="4" r="1.5" fill="white" />
              <path d="M3 9.5c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="white" strokeWidth="0.8" />
            </svg>
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide shrink-0">FLIGHT CENTRE</span>
          <span className="text-[11px] text-white/70 truncate">Payments</span>
        </div>
        <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-white">MK</span>
        </div>
      </div>
      <div className={`bg-[#f7f7f7] px-4 py-4 sm:px-6 sm:py-6 ${className}`}>{children}</div>
    </>
  )
}

function TravelConnectQuoteIntroCard({ destination, dateRange, travellersLabel }) {
  return (
    <div className="bg-white rounded-lg px-4 py-3 sm:px-5 sm:py-4 mb-4 sm:mb-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect x="3" y="5" width="12" height="9" rx="1.5" stroke="#dc2626" strokeWidth="1.2" />
            <path
              d="M6 5V3.5A1.5 1.5 0 0 1 7.5 2h3A1.5 1.5 0 0 1 12 3.5V5"
              stroke="#dc2626"
              strokeWidth="1.2"
            />
            <circle cx="13" cy="10" r="3" fill="#dc2626" stroke="#dc2626" strokeWidth="0.5" />
            <path
              d="M11.8 10l.8.8 1.6-1.6"
              stroke="white"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-slate-900">Get an insurance quote</p>
          <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
            Travelling to <span className="font-medium text-slate-600">{destination}</span> from{' '}
            <span className="font-medium text-slate-600">{dateRange}</span> for{' '}
            <span className="font-medium text-slate-600">{travellersLabel}</span>.{' '}
            <button type="button" className="text-blue-500 hover:underline">
              Edit
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Pre-search step in the demo — same chrome and card system as the tier comparison (results) screen.
 */
export function TravelConnectSearchPageMock({
  destination = 'Honolulu, Hawaii',
  dateRange = '15 May 2024 - 20 May 2024',
  travellersLabel = '1 traveller',
  bookingId = 'BK-2024-HI',
  hotelTitle = 'Hilton Hawaiian Village',
  tripDetailLine = '',
  customerName = 'Sarah Chen',
  customerSub = 'Adult · Primary traveller',
  onSearchInsurance,
}) {
  return (
    <div
      className="overflow-hidden text-[13px] bg-white"
      style={{ fontFamily: travelConnectFont }}
      role="region"
      aria-label="Travel Connect insurance search"
    >
      <TravelConnectAppShell>
        <TravelConnectQuoteIntroCard
          destination={destination}
          dateRange={dateRange}
          travellersLabel={travellersLabel}
        />

        <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
          <table className="w-full border-collapse text-[11px] sm:text-[12px] text-slate-600">
            <tbody>
              <tr className="border-b border-slate-100/60">
                <th scope="row" className="py-[10px] pl-4 sm:pl-5 pr-3 text-left font-normal text-slate-700 align-top w-[38%] sm:w-[32%]">
                  Booking
                </th>
                <td className="py-[10px] pr-4 sm:pr-5 font-mono text-[11px] text-slate-900">{bookingId}</td>
              </tr>
              <tr className="border-b border-slate-100/60">
                <th scope="row" className="py-[10px] pl-4 sm:pl-5 pr-3 text-left font-normal text-slate-700 align-top">
                  Trip
                </th>
                <td className="py-[10px] pr-4 sm:pr-5 text-slate-900">
                  <span className="font-medium">{hotelTitle}</span>
                  {tripDetailLine ? (
                    <span className="mt-1 block text-slate-500 font-normal">{tripDetailLine}</span>
                  ) : null}
                </td>
              </tr>
              <tr className="border-b border-slate-100/60">
                <th scope="row" className="py-[10px] pl-4 sm:pl-5 pr-3 text-left font-normal text-slate-700 align-top">
                  Travellers
                </th>
                <td className="py-[10px] pr-4 sm:pr-5">
                  <span className="font-medium text-slate-900">{customerName}</span>
                  <span className="mt-0.5 block text-slate-500">{customerSub}</span>
                </td>
              </tr>
              <tr>
                <th scope="row" className="py-[10px] pl-4 sm:pl-5 pr-3 text-left font-normal text-slate-700 align-top">
                  Source
                </th>
                <td className="py-[10px] pr-4 sm:pr-5">
                  <span className="text-blue-500 font-medium">From booking</span>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onSearchInsurance}
              className="w-full sm:w-auto min-w-[140px] bg-[#e10a0a] text-white text-[11px] font-semibold py-[10px] px-5 rounded-[4px] transition hover:bg-[#c70909]"
            >
              Search insurance
            </button>
          </div>
        </div>
      </TravelConnectAppShell>
    </div>
  )
}

/**
 * Shown after “Add to HELIO” in the demo — stay on Travel Connect, then user switches to Helio.
 */
export function TravelConnectInsuranceAddedSuccessMock({ planLine, onContinueToHelio }) {
  return (
    <div
      className="overflow-hidden text-[13px] bg-white"
      style={{ fontFamily: travelConnectFont }}
      role="region"
      aria-label="Insurance added to booking"
    >
      <TravelConnectAppShell>
        <div className="flex min-h-[min(360px,50vh)] items-center justify-center px-2 py-6">
          <div className="w-full max-w-md rounded-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100" aria-hidden>
              <span className="text-2xl text-emerald-700">✓</span>
            </div>
            <p className="mt-4 text-[15px] font-semibold text-slate-900">Insurance added successfully</p>
            {planLine ? (
              <p className="mt-2 text-[12px] text-slate-600">{planLine}</p>
            ) : null}
            <p className="mt-3 text-[12px] leading-relaxed text-slate-600">
              Go to <span className="font-medium text-slate-800">Helio</span> and refresh the tab to see the insurance on the booking.
            </p>
            <p className="mt-2 text-[11px] text-slate-500">
              Click the <span className="font-medium text-slate-700">Helio</span> tab above, or use the button below.
            </p>
            <button
              type="button"
              onClick={onContinueToHelio}
              className="mt-6 w-full rounded-[4px] bg-[#e10a0a] px-4 py-2.5 text-[11px] font-semibold text-white transition hover:bg-[#c70909] sm:w-auto sm:min-w-[160px]"
            >
              Switch to Helio
            </button>
          </div>
        </div>
      </TravelConnectAppShell>
    </div>
  )
}

export function TravelConnectTierComparisonMock({
  destination = 'Indonesia',
  dateRange = '10 May 2024 - 18 May 2024',
  travellersLabel = '2 travellers',
  tiers = DEFAULT_TIERS,
  /** When set, “Add to HELIO” is interactive (demo). Omit for static case-study display. */
  onAddToHelio,
  className = '',
  /**
   * `full` — fake browser chrome + app (case study figure).
   * `pageOnly` — app UI only; use inside `InsuranceDemoBrowserFrame` so tabs/URL aren’t doubled.
   */
  variant = 'full',
}) {
  const showBrowserChrome = variant === 'full'

  return (
    <div
      className={`overflow-hidden text-[13px] ${showBrowserChrome ? 'rounded-xl border border-slate-200 shadow-sm' : ''} ${className}`}
      style={{ fontFamily: travelConnectFont }}
      role="region"
      aria-label="Travel Connect insurance quote comparison"
    >
      {showBrowserChrome && (
        <>
          <div className="bg-[#e8e8e8] pt-2.5 pb-0 px-3">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]" aria-hidden />
              <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]" aria-hidden />
              <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]" aria-hidden />
            </div>
            <div className="flex items-end gap-0.5" role="tablist" aria-label="Browser tabs">
              <div className="bg-[#d1d1d1] rounded-t-md px-3 py-1.5 text-[10px] text-slate-600 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-slate-400/40" aria-hidden />
                Helio
                <span className="text-slate-400 text-[8px] ml-1" aria-hidden>
                  ×
                </span>
              </div>
              <div className="bg-white rounded-t-md px-3 py-1.5 text-[10px] text-slate-800 flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-sm bg-blue-400/30" aria-hidden />
                TravelConnect
                <span className="text-slate-400 text-[8px] ml-1" aria-hidden>
                  ×
                </span>
              </div>
            </div>
          </div>
          <div className="bg-[#f0f0f0] px-3 py-1.5 flex items-center gap-2 border-b border-slate-200">
            <div className="flex items-center gap-1 text-slate-400" aria-hidden>
              <span className="text-[10px]">←</span>
              <span className="text-[10px]">→</span>
              <span className="text-[10px] ml-0.5">⟳</span>
            </div>
            <div className="flex-1 bg-white rounded-sm px-2.5 py-1 text-[10px] text-slate-500 truncate">
              travelconnect.flightcentre.space
            </div>
          </div>
        </>
      )}

      <TravelConnectAppShell>
        <TravelConnectQuoteIntroCard
          destination={destination}
          dateRange={dateRange}
          travellersLabel={travellersLabel}
        />

        <div className="bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="w-[36%]" />
                  {tiers.map((t) => (
                    <th key={t.planId} className="text-center py-3 sm:py-4 px-2 font-normal">
                      <p className="text-[12px] text-slate-500">{t.label}</p>
                      <p className="text-slate-900 mt-0.5">
                        <span className="text-[8px] text-slate-400 align-top mr-px">AUD</span>
                        <span className="text-[16px] sm:text-[18px] font-bold tabular-nums">{t.price}</span>
                      </p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[11px] sm:text-[12px] text-slate-600">
                {DEFAULT_COVERAGE_ROWS.map((row) => (
                  <tr key={row.label} className="border-b border-slate-100/60">
                    <td className="py-[7px] pl-4 sm:pl-5 pr-3 text-slate-700">{row.label}</td>
                    {row.vals.map((v, i) => (
                      <td key={`${row.label}-${i}`} className="py-[7px] text-center px-2">
                        {v === '✓' ? (
                          <span className="text-emerald-500 text-[14px]" aria-hidden>
                            ✓
                          </span>
                        ) : v === '✗' ? (
                          <span className="text-red-400 text-[14px]" aria-hidden>
                            ✗
                          </span>
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="py-1 flex items-center justify-center">
            <p className="text-[11px] text-slate-300 tracking-[0.2em]" aria-hidden>
              ⋯
            </p>
          </div>

          <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-2">
            <div className="grid grid-cols-[minmax(0,36%)_1fr_1fr_1fr] gap-0 min-w-[520px]">
              <div />
              {tiers.map((t) => (
                <div key={t.planId} className="text-center px-1 sm:px-2">
                  {onAddToHelio ? (
                    <button
                      type="button"
                      onClick={() => onAddToHelio(t.planId)}
                      className="w-full max-w-[120px] mx-auto bg-[#e10a0a] text-white text-[10px] font-semibold py-[7px] px-2 rounded-[4px] transition hover:bg-[#c70909]"
                    >
                      Add to HELIO
                    </button>
                  ) : (
                    <div className="bg-[#e10a0a] text-white text-[10px] font-semibold py-[7px] px-2 rounded-[4px] cursor-default">
                      Add to HELIO
                    </div>
                  )}
                  <p className="mt-2 text-[10px] text-blue-500 cursor-default">
                    Refine quote <span className="text-[8px]">↗</span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TravelConnectAppShell>
    </div>
  )
}

export { DEFAULT_TIERS, DEFAULT_COVERAGE_ROWS }
