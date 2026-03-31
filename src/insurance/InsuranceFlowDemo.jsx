import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import {
  DEMO_TRIP_DEFAULT_ITINERARY,
  DEMO_TRIP_HERO,
  demoTripPackageTotalFormatted,
} from '../amendments/demoTripConstants'
import { InsuranceDemoBrowserFrame, INSURANCE_DEMO_URLS } from './InsuranceDemoBrowserFrame'

/* ── Same fictional trip as AmendmentsFlowDemoTailwind (see demoTripConstants.js) ── */

const BOOKING = {
  id: 'BK-2024-HI',
  customer: 'Sarah Chen',
  tripTitle: DEMO_TRIP_HERO.title,
  heroDateRange: DEMO_TRIP_HERO.dateRange,
  travellers: DEMO_TRIP_HERO.travellersLabel,
  total: DEMO_TRIP_HERO.packageTotalAmount,
  hotelTitle: DEMO_TRIP_DEFAULT_ITINERARY.title,
  itineraryDatesStr: DEMO_TRIP_DEFAULT_ITINERARY.datesStr,
  roomStr: DEMO_TRIP_DEFAULT_ITINERARY.roomStr,
  lineItemPriceDisplay: DEMO_TRIP_DEFAULT_ITINERARY.price,
  nights: 5,
  departure: '15 May 2024',
  returnDate: '20 May 2024',
}

const PLANS = [
  { id: 'basic', name: 'Basic', desc: 'Medical + luggage ($5k)', price: 79 },
  { id: 'standard', name: 'Standard', desc: 'Medical, luggage ($15k), cancellation', price: 139, recommended: true },
  { id: 'premium', name: 'Premium', desc: 'Full cover ($50k), activities, cancellation', price: 199 },
]

const TRIP_FIELDS = [
  { key: 'destination', label: 'Destination', value: 'Honolulu, Hawaii' },
  { key: 'departure', label: 'Departure date', value: '15/05/2024' },
  { key: 'return', label: 'Return date', value: '20/05/2024' },
  { key: 'travellers', label: 'Number of travellers', value: '1' },
  { key: 'tripType', label: 'Trip type', value: 'Leisure' },
]

const CUSTOMER_FIELDS = [
  { key: 'name', label: 'Full name', value: 'Sarah Chen' },
  { key: 'dob', label: 'Date of birth', value: '12/08/1987' },
  { key: 'email', label: 'Email address', value: 's.chen@email.com' },
]

const QUOTE_REF = 'TSQ-2024-88712'

function premiumAudDemoFromPlan(planId) {
  const plan = planId ? PLANS.find((p) => p.id === planId) : null
  const resolved = plan ?? PLANS.find((p) => p.recommended)
  return resolved ? String(resolved.price) : '139'
}

function emptyManualInsuranceItemForm() {
  return {
    productName: '',
    supplierCode: '',
    premiumAud: '',
    quoteRef: '',
    policyNumber: '',
  }
}

function isManualInsuranceFormReadyForCart(form) {
  return (
    form.productName.trim() !== '' &&
    form.supplierCode.trim() !== '' &&
    form.premiumAud.trim() !== ''
  )
}

/** Legacy Helio manual insurance modal — first open (step 1) and after Cover-More (step 9). */
function LegacyManualInsuranceItemModal({
  onClose,
  titleId,
  intro,
  fieldIdPrefix,
  manualItemForm,
  setManualItemForm,
  primaryLabel,
  onPrimary,
  primaryDisabled,
  clickToFillDemo,
}) {
  const id = (suffix) => `${fieldIdPrefix}-${suffix}`
  return (
    <div
      className="absolute inset-0 z-[240] flex items-start justify-center overflow-y-auto rounded-xl bg-slate-950/80 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-10"
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="my-auto w-full max-w-lg rounded-xl border border-amber-200/90 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-3 border-b border-amber-100 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <p id={titleId} className="text-base font-semibold text-amber-950">
              Add insurance — manual line item
            </p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800/90">
              Helio · booking {BOOKING.id}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close modal"
          >
            <span className="block text-xl leading-none" aria-hidden>
              ×
            </span>
          </button>
        </div>

        <div className="max-h-[min(70vh,640px)] overflow-y-auto px-4 py-4 sm:px-5">
          {intro}

          <div className="mt-4 space-y-3">
            <div>
              <label htmlFor={id('product')} className="block text-xs font-medium text-slate-700">
                Product / cover name
              </label>
              <input
                id={id('product')}
                type="text"
                autoComplete="off"
                value={manualItemForm.productName}
                onChange={(e) => setManualItemForm((p) => ({ ...p, productName: e.target.value }))}
                placeholder="e.g. Comprehensive leisure"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor={id('supplier')} className="block text-xs font-medium text-slate-700">
                Supplier code
              </label>
              <input
                id={id('supplier')}
                type="text"
                autoComplete="off"
                value={manualItemForm.supplierCode}
                onChange={(e) => setManualItemForm((p) => ({ ...p, supplierCode: e.target.value }))}
                placeholder="e.g. CM-AU"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor={id('premium')} className="block text-xs font-medium text-slate-700">
                  Premium (AUD)
                </label>
                <input
                  id={id('premium')}
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  value={manualItemForm.premiumAud}
                  onChange={(e) => setManualItemForm((p) => ({ ...p, premiumAud: e.target.value }))}
                  onClick={() => {
                    if (!clickToFillDemo?.premiumAud || manualItemForm.premiumAud.trim() !== '') return
                    setManualItemForm((p) => ({ ...p, premiumAud: clickToFillDemo.premiumAud }))
                  }}
                  placeholder={clickToFillDemo?.premiumAud ? 'Click to add premium from quote' : '0.00'}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
              <div>
                <label htmlFor={id('quote')} className="block text-xs font-medium text-slate-700">
                  External quote reference
                </label>
                <input
                  id={id('quote')}
                  type="text"
                  autoComplete="off"
                  value={manualItemForm.quoteRef}
                  onChange={(e) => setManualItemForm((p) => ({ ...p, quoteRef: e.target.value }))}
                  onClick={() => {
                    if (!clickToFillDemo?.quoteRef || manualItemForm.quoteRef.trim() !== '') return
                    setManualItemForm((p) => ({ ...p, quoteRef: clickToFillDemo.quoteRef }))
                  }}
                  placeholder={
                    clickToFillDemo?.quoteRef
                      ? 'Click to paste reference from Cover-More'
                      : 'From Cover-More when ready'
                  }
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
              </div>
            </div>
            <div>
              <label htmlFor={id('policy')} className="block text-xs font-medium text-slate-700">
                Policy number (if known)
              </label>
              <input
                id={id('policy')}
                type="text"
                autoComplete="off"
                value={manualItemForm.policyNumber}
                onChange={(e) => setManualItemForm((p) => ({ ...p, policyNumber: e.target.value }))}
                placeholder="Optional until issued"
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="order-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 sm:order-1"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={primaryDisabled}
              onClick={onPrimary}
              className="order-1 rounded-lg bg-amber-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-800 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-amber-700 sm:order-2"
            >
              {primaryLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Small components ───────────────────────────────────────── */

/** Default itinerary row — same copy as AmendmentsFlowDemoTailwind TRIP_DEFAULT_ITINERARY_CARD. */
function BookingSummaryCard() {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-white p-4 transition-all">
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-slate-900">{BOOKING.hotelTitle}</p>
          <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-slate-500">
            <span>{BOOKING.itineraryDatesStr}</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>{BOOKING.roomStr}</span>
            <span className="text-slate-300" aria-hidden>
              ·
            </span>
            <span>{BOOKING.lineItemPriceDisplay}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

function StepIndicator({ current, total, label }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i < current ? 'bg-blue-600' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-slate-400">{label}</span>
    </div>
  )
}

/** Hero + tab strip aligned with AmendmentsFlowDemoTailwind. */
const SHELL_TAB_IDS = ['itinerary', 'travellers', 'documents', 'payments', 'notes', 'history']

function InsuranceBookingShell({ activeTab = 'itinerary', badge = null, inBrowser = false, children }) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden bg-white ${
        inBrowser
          ? 'h-full min-h-0 rounded-none border-0 shadow-none'
          : 'min-h-[560px] rounded-xl border border-slate-200 shadow-lg'
      }`}
      role="region"
      aria-label="Insurance booking demo"
    >
      <div
        className={`relative h-36 w-full overflow-visible bg-slate-200 sm:h-44 ${
          inBrowser ? 'rounded-t-none' : 'rounded-t-xl'
        }`}
      >
        <div className={`absolute inset-0 overflow-hidden ${inBrowser ? 'rounded-t-none' : 'rounded-t-xl'}`}>
          <img
            src="/images/amendments/hawaii.avif"
            alt=""
            className="h-full w-full scale-x-[-1] object-cover object-[center_92%]"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/15" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-black/25 to-transparent"
            aria-hidden
          />
        </div>
        {/* Same flex structure as AmendmentsFlowDemoTailwind: left | price | actions */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 px-4 pb-3 pt-8">
          <div className="min-w-0 flex-1 text-sm text-white drop-shadow-sm">
            <span className="font-medium">{BOOKING.tripTitle}</span>
            <span className="text-white/90">
              {' '}
              · {BOOKING.heroDateRange} · {BOOKING.travellers}
            </span>
          </div>
          <span className="shrink-0 text-sm font-semibold text-white drop-shadow-sm">
            {demoTripPackageTotalFormatted()}
          </span>
          <div className="relative -mr-1 flex shrink-0 items-center gap-1">
            {badge}
            <button
              type="button"
              tabIndex={-1}
              className="rounded p-1.5 text-white/90 hover:bg-white/20 hover:text-white"
              aria-label="Actions"
              onClick={(e) => e.preventDefault()}
            >
              <span className="flex h-5 w-5 items-center justify-center text-lg leading-none">⋮</span>
            </button>
          </div>
        </div>
      </div>

      <nav
        className="flex overflow-x-auto border-b border-slate-200 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        aria-label="Trip sections"
      >
        {SHELL_TAB_IDS.map((tab) => (
          <button
            key={tab}
            type="button"
            tabIndex={-1}
            className={`shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${
              activeTab === tab
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
            aria-current={activeTab === tab ? 'page' : undefined}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <div className="min-h-[280px] flex-1 overflow-visible p-4">
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  )
}

const travelConnectBadge = (
  <span className="rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white drop-shadow-sm">
    Travel Connect
  </span>
)

/* ── Main demo component ────────────────────────────────────── */

const InsuranceFlowDemo = forwardRef(function InsuranceFlowDemo(
  { embedded = false, onBackToCaseStudy, onClose, onFlowComplete },
  ref
) {
  const [flow, setFlow] = useState(null)
  const [step, setStep] = useState(0)
  const [clicks, setClicks] = useState(0)
  const [filledFields, setFilledFields] = useState({})
  const [typingKey, setTypingKey] = useState(null)
  const [typingDisplay, setTypingDisplay] = useState('')
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [manualItemForm, setManualItemForm] = useState(emptyManualInsuranceItemForm)
  const [manualLineModalDismissed, setManualLineModalDismissed] = useState(false)

  const track = useCallback(() => setClicks(c => c + 1), [])

  const resetAll = useCallback(() => {
    setFlow(null)
    setStep(0)
    setClicks(0)
    setFilledFields({})
    setTypingKey(null)
    setTypingDisplay('')
    setSelectedPlan(null)
    setManualItemForm(emptyManualInsuranceItemForm())
    setManualLineModalDismissed(false)
  }, [])

  const startBefore = useCallback(() => {
    setClicks(0)
    setFilledFields({})
    setTypingKey(null)
    setTypingDisplay('')
    setSelectedPlan(null)
    setManualItemForm(emptyManualInsuranceItemForm())
    setManualLineModalDismissed(false)
    setFlow('before')
    setStep(1)
  }, [])

  const startAfter = useCallback(() => {
    setClicks(0)
    setFilledFields({})
    setTypingKey(null)
    setTypingDisplay('')
    setSelectedPlan(null)
    setManualItemForm(emptyManualInsuranceItemForm())
    setFlow('after')
    setStep(1)
  }, [])

  useImperativeHandle(ref, () => ({
    startBeforeFlow: startBefore,
    startAfterFlow: startAfter,
  }))

  /* Auto-advance transitions */
  useEffect(() => {
    let t
    if (flow === 'before' && step === 2) t = setTimeout(() => setStep(3), 1800)
    else if (flow === 'after' && step === 3) t = setTimeout(() => setStep(4), 1200)
    return () => clearTimeout(t)
  }, [flow, step])

  /* Notify parent on completion */
  useEffect(() => {
    if (flow === 'before' && step === 10) onFlowComplete?.('before')
    if (flow === 'after' && step === 5) onFlowComplete?.('after')
  }, [flow, step, onFlowComplete])

  /* Manual item modal — Escape closes (full reset while either modal is open) */
  useEffect(() => {
    const legacyModalOpen =
      (flow === 'before' && step === 1 && !manualLineModalDismissed) ||
      (flow === 'before' && step === 9)
    if (!legacyModalOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') resetAll()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [flow, step, manualLineModalDismissed, resetAll])

  /* Step 9: clear quote + premium so the demo uses click-to-fill (simulates paste from Cover-More). */
  useEffect(() => {
    if (flow !== 'before' || step !== 9) return
    setManualItemForm((p) => ({ ...p, quoteRef: '', premiumAud: '' }))
  }, [flow, step])

  /* Typing animation for form fields */
  useEffect(() => {
    if (!typingKey) return
    const allFields = [...TRIP_FIELDS, ...CUSTOMER_FIELDS]
    const field = allFields.find(f => f.key === typingKey)
    if (!field) return

    let i = 0
    setTypingDisplay('')
    const interval = setInterval(() => {
      i++
      setTypingDisplay(field.value.slice(0, i))
      if (i >= field.value.length) {
        clearInterval(interval)
        setFilledFields(prev => ({ ...prev, [typingKey]: true }))
        setTypingKey(null)
        setTypingDisplay('')
      }
    }, 30)
    return () => clearInterval(interval)
  }, [typingKey])

  const handleFieldClick = (key) => {
    if (filledFields[key] || typingKey) return
    track()
    setTypingKey(key)
  }

  const renderField = (field) => {
    const isFilled = !!filledFields[field.key]
    const isTyping = typingKey === field.key

    return (
      <button
        key={field.key}
        type="button"
        onClick={() => handleFieldClick(field.key)}
        disabled={isFilled || !!typingKey}
        className={`w-full rounded-lg border px-3 py-2.5 text-left shadow-sm transition ${
          isFilled
            ? 'border-emerald-300 bg-emerald-50/50'
            : isTyping
              ? 'border-blue-400 bg-white ring-2 ring-blue-100'
              : 'cursor-pointer border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
        }`}
      >
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">{field.label}</p>
        <div className="mt-0.5 flex items-center justify-between">
          <p className={`text-sm ${isFilled || isTyping ? 'text-slate-900' : 'text-slate-300'}`}>
            {isFilled ? field.value : isTyping ? typingDisplay : 'Click to enter...'}
            {isTyping && (
              <span className="ml-0.5 inline-block w-[1.5px] h-[14px] bg-blue-500 align-text-bottom animate-pulse" />
            )}
          </p>
          {isFilled && <span className="text-emerald-500 text-xs">✓</span>}
        </div>
      </button>
    )
  }

  const allTripFilled = TRIP_FIELDS.every(f => filledFields[f.key])
  const allCustomerFilled = CUSTOMER_FIELDS.every(f => filledFields[f.key])

  /* ────────────────────────────────────────────────────────────
     IDLE — booking shell + Before / After cards
     ──────────────────────────────────────────────────────────── */
  if (!flow) {
    return (
      <InsuranceDemoBrowserFrame
        activeTab="helio"
        showSecondaryTab={false}
        secondaryLabel=""
        url={INSURANCE_DEMO_URLS.helio}
      >
        <InsuranceBookingShell activeTab="itinerary" inBrowser>
          <BookingSummaryCard />
          <div className="grid gap-4 rounded-xl sm:grid-cols-2">
            <button
              type="button"
              onClick={startBefore}
              aria-label="Try the legacy path: Helio modal and Cover-More tab"
              className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left shadow-sm transition hover:border-amber-300 hover:bg-amber-50"
            >
              <p className="text-base font-semibold text-amber-950">
                <span className="text-amber-600" aria-hidden>
                  +{' '}
                </span>
                Add insurance
              </p>
              <p className="mt-1 text-xs font-medium text-amber-800/80">Legacy</p>
            </button>
            <button
              type="button"
              onClick={startAfter}
              aria-label="Try adding insurance with Travel Connect"
              className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <p className="text-base font-semibold text-emerald-950">
                <span className="text-emerald-600" aria-hidden>
                  +{' '}
                </span>
                Add insurance
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-800/80">Travel Connect</p>
            </button>
          </div>
        </InsuranceBookingShell>
      </InsuranceDemoBrowserFrame>
    )
  }

  /* ────────────────────────────────────────────────────────────
     BEFORE FLOW
     ──────────────────────────────────────────────────────────── */
  if (flow === 'before') {
    /* B1 — Helio: manual insurance item modal (opens from legacy “Add insurance”) */
    if (step === 1) {
      if (manualLineModalDismissed) {
        return (
          <div className="relative overflow-hidden rounded-xl">
            <InsuranceDemoBrowserFrame
              activeTab="helio"
              secondaryLabel="Cover-More"
              url={INSURANCE_DEMO_URLS.helio}
            >
              <InsuranceBookingShell activeTab="itinerary" inBrowser>
                <div className="min-h-[300px] space-y-4 p-4">
                  <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-900/90">
                      Open in new tab
                    </p>
                    <a
                      href="#cover-more-demo"
                      className="mt-1 block max-w-full truncate text-xs font-medium text-blue-700 underline decoration-blue-600/50 underline-offset-2 hover:text-blue-900"
                      aria-label="Open Cover-More in a new tab (demo)"
                      onClick={(e) => {
                        e.preventDefault()
                        track()
                        setStep(2)
                      }}
                    >
                      {INSURANCE_DEMO_URLS.coverMore}
                    </a>
                  </div>
                  <BookingSummaryCard />
                  <div className="grid gap-4 rounded-xl sm:grid-cols-2 opacity-90">
                    <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left shadow-sm">
                      <p className="text-base font-semibold text-amber-950">+ Add insurance</p>
                      <p className="mt-1 text-xs font-medium text-amber-800/80">Legacy</p>
                    </div>
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-sm">
                      <p className="text-base font-semibold text-emerald-950">+ Add insurance</p>
                      <p className="mt-1 text-xs font-medium text-emerald-800/80">Travel Connect</p>
                    </div>
                  </div>
                </div>
              </InsuranceBookingShell>
            </InsuranceDemoBrowserFrame>
          </div>
        )
      }

      return (
        <div className="relative overflow-hidden rounded-xl">
          <InsuranceDemoBrowserFrame
            activeTab="helio"
            secondaryLabel="Cover-More"
            url={INSURANCE_DEMO_URLS.helio}
          >
            <InsuranceBookingShell activeTab="itinerary" inBrowser>
              <div className="pointer-events-none min-h-[300px] select-none opacity-[0.35]" aria-hidden>
                <BookingSummaryCard />
                <div className="grid gap-4 rounded-xl sm:grid-cols-2">
                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left shadow-sm">
                    <p className="text-base font-semibold text-amber-950">+ Add insurance</p>
                    <p className="mt-1 text-xs font-medium text-amber-800/80">Legacy</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-sm">
                    <p className="text-base font-semibold text-emerald-950">+ Add insurance</p>
                    <p className="mt-1 text-xs font-medium text-emerald-800/80">Travel Connect</p>
                  </div>
                </div>
              </div>
            </InsuranceBookingShell>
          </InsuranceDemoBrowserFrame>
          <LegacyManualInsuranceItemModal
            onClose={resetAll}
            titleId="legacy-manual-insurance-title"
            fieldIdPrefix="manual-ins"
            manualItemForm={manualItemForm}
            setManualItemForm={setManualItemForm}
            primaryLabel="Add to Cart"
            primaryDisabled={!isManualInsuranceFormReadyForCart(manualItemForm)}
            onPrimary={() => {
              track()
              setManualLineModalDismissed(true)
            }}
            intro={
              <p className="text-xs leading-relaxed text-slate-600">
                Add product and supplier first. When you’ve finished quoting in{' '}
                <a
                  href="#cover-more-demo"
                  className="font-medium text-blue-700 underline decoration-blue-600/50 underline-offset-2 hover:text-blue-900"
                  aria-label="Open Cover-More in a new tab (demo)"
                  onClick={(e) => {
                    e.preventDefault()
                    track()
                    setStep(2)
                  }}
                >
                  Cover-More
                </a>, copy the reference and click the <span className="font-medium text-slate-700">Helio</span> tab
                at the top to return. Then add premium and quote reference here before add to cart.
              </p>
            }
          />
        </div>
      )
    }

    /* B2 — New tab → Cover-More */
    if (step === 2) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
          <div className="flex min-h-full items-center justify-center border-t border-slate-100 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
              <p className="mt-4 text-sm font-medium text-slate-600">Opening new tab…</p>
              <p className="mt-1 text-xs text-slate-400">Loading Cover-More</p>
            </div>
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B3 — Cover-More login */
    if (step === 3) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center bg-blue-900 px-4 py-2.5">
            <span className="text-sm font-bold text-white">Cover-More</span>
            <span className="ml-2 text-xs text-blue-300">Insurance Portal</span>
          </div>
          <div className="flex min-h-[280px] items-center justify-center p-8">
            <div className="w-full max-w-xs">
              <p className="text-center text-lg font-semibold text-slate-900">Log in</p>
              <div className="mt-6 space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Email</p>
                  <p className="text-sm text-slate-600">consultant@fctg.com.au</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400">Password</p>
                  <p className="text-sm text-slate-600">••••••••</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => { track(); setStep(4) }}
                className="mt-6 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Log In
              </button>
            </div>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B4 — Trip details form (manual entry) */
    if (step === 4) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center bg-blue-900 px-4 py-2.5">
            <span className="text-sm font-bold text-white">Cover-More</span>
            <span className="ml-2 text-xs text-blue-300">New Quote — Trip Details</span>
          </div>
          <div className="p-4 sm:p-5">
            <StepIndicator current={1} total={3} label="Trip details" />
            <p className="text-sm text-slate-500">Enter the trip information to get a quote.</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {TRIP_FIELDS.map(renderField)}
            </div>
            <button
              type="button"
              disabled={!allTripFilled || !!typingKey}
              onClick={() => { track(); setStep(5) }}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next →
            </button>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B5 — Customer details form (manual entry) */
    if (step === 5) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center bg-blue-900 px-4 py-2.5">
            <span className="text-sm font-bold text-white">Cover-More</span>
            <span className="ml-2 text-xs text-blue-300">New Quote — Customer</span>
          </div>
          <div className="p-4 sm:p-5">
            <StepIndicator current={2} total={3} label="Customer details" />
            <p className="text-sm text-slate-500">Enter the customer&apos;s personal information.</p>
            <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {CUSTOMER_FIELDS.map(renderField)}
            </div>
            <button
              type="button"
              disabled={!allCustomerFilled || !!typingKey}
              onClick={() => { track(); setStep(6) }}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Calculate Quote →
            </button>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B6 — Quote results / plan selection */
    if (step === 6) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center bg-blue-900 px-4 py-2.5">
            <span className="text-sm font-bold text-white">Cover-More</span>
            <span className="ml-2 text-xs text-blue-300">New Quote — Results</span>
          </div>
          <div className="p-4 sm:p-5">
            <StepIndicator current={3} total={3} label="Select a plan" />
            <p className="text-sm text-slate-600">
              Quote for {BOOKING.customer} · {BOOKING.travellers}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => {
                    if (!selectedPlan) track()
                    setSelectedPlan(plan.id)
                  }}
                  className={`relative rounded-xl border p-4 text-left shadow-sm transition ${
                    selectedPlan === plan.id
                      ? 'border-2 border-blue-600 bg-blue-50/90 ring-1 ring-blue-600/15'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {plan.recommended && (
                    <span className="absolute -top-2 right-2 rounded-full bg-blue-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                      Popular
                    </span>
                  )}
                  <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{plan.desc}</p>
                  <p className="mt-3 text-lg font-bold tabular-nums text-slate-900">${plan.price}</p>
                  <p className="text-[10px] text-slate-400">1 traveller · total premium</p>
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={!selectedPlan}
              onClick={() => { track(); setStep(7) }}
              className="mt-6 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Generate Quote Reference
            </button>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B7 — Quote reference generated (return via Helio tab) */
    if (step === 7) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
          onSelectHelioTab={() => {
            track()
            setStep(9)
          }}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="flex items-center bg-blue-900 px-4 py-2.5">
            <span className="text-sm font-bold text-white">Cover-More</span>
            <span className="ml-2 text-xs text-blue-300">Quote Generated</span>
          </div>
          <div className="flex min-h-[260px] items-center justify-center p-8">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                <span className="text-xl text-blue-600">✓</span>
              </div>
              <p className="mt-3 text-lg font-semibold text-slate-900">Quote generated</p>
              <div className="mt-3 inline-block rounded-lg border border-slate-200 bg-slate-50 px-4 py-2">
                <p className="font-mono text-lg font-semibold text-slate-900">{QUOTE_REF}</p>
              </div>
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-slate-600">
                Copy the reference, then click the <span className="font-medium text-slate-800">Helio</span> tab at
                the top of the browser — same as when you’re switching back from a real Cover-More tab.
              </p>
            </div>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B9 — Same manual item modal after switching back to Helio from Cover-More */
    if (step === 9) {
      return (
        <div className="relative overflow-hidden rounded-xl">
          <InsuranceDemoBrowserFrame
            activeTab="helio"
            secondaryLabel="Cover-More"
            url={INSURANCE_DEMO_URLS.helio}
          >
            <InsuranceBookingShell activeTab="itinerary" inBrowser>
              <div className="pointer-events-none min-h-[300px] select-none opacity-[0.35]" aria-hidden>
                <BookingSummaryCard />
                <div className="grid gap-4 rounded-xl sm:grid-cols-2">
                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left shadow-sm">
                    <p className="text-base font-semibold text-amber-950">+ Add insurance</p>
                    <p className="mt-1 text-xs font-medium text-amber-800/80">Legacy</p>
                  </div>
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-sm">
                    <p className="text-base font-semibold text-emerald-950">+ Add insurance</p>
                    <p className="mt-1 text-xs font-medium text-emerald-800/80">Travel Connect</p>
                  </div>
                </div>
              </div>
            </InsuranceBookingShell>
          </InsuranceDemoBrowserFrame>
          <LegacyManualInsuranceItemModal
            onClose={resetAll}
            titleId="legacy-manual-insurance-return-title"
            fieldIdPrefix="manual-ins-ret"
            manualItemForm={manualItemForm}
            setManualItemForm={setManualItemForm}
            primaryLabel="Save & add to cart"
            primaryDisabled={!isManualInsuranceFormReadyForCart(manualItemForm)}
            onPrimary={() => {
              track()
              setStep(10)
            }}
            clickToFillDemo={{
              quoteRef: QUOTE_REF,
              premiumAud: premiumAudDemoFromPlan(selectedPlan),
            }}
            intro={
              <p className="text-xs leading-relaxed text-slate-600">
                You switched back on the <span className="font-medium text-slate-700">Helio</span> tab — the same
                manual line is open. Click <span className="font-medium text-slate-700">External quote reference</span>{' '}
                to paste the value you copied from Cover-More, then click <span className="font-medium text-slate-700">Premium (AUD)</span>{' '}
                to add the amount from your quote. <span className="font-medium text-slate-700">Save &amp; add to cart</span>{' '}
                turns on once product, supplier, and premium are all set.
              </p>
            }
          />
        </div>
      )
    }

    /* B10 — Before done */
    if (step === 10) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-amber-200 bg-gradient-to-b from-amber-50 to-white shadow-sm">
          <div className="p-8 text-center md:p-10">
            <p className="text-3xl" aria-hidden>😓</p>
            <p className="mt-3 text-xl font-semibold text-amber-900">That was the old way</p>
            <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-4">
              <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-amber-800">{clicks}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-600">clicks</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-amber-800">2</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-600">systems</p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-amber-800">5–8m</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-600">typical</p>
              </div>
            </div>
            <p className="mx-auto mt-5 max-w-md text-sm text-amber-700">
              Modal in Helio, Cover-More in another tab, then re-keying quote details on the manual item before
              save — most of what you typed already lived on the booking or in Cover-More.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try another flow
            </button>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }
  }

  /* ────────────────────────────────────────────────────────────
     AFTER FLOW
     ──────────────────────────────────────────────────────────── */
  if (flow === 'after') {
    /* A1 — booking entry point → Travel Connect (demo uses one shell; shipped: new tab + write-back) */
    if (step === 1) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.helio}
        >
        <InsuranceBookingShell activeTab="itinerary" badge={travelConnectBadge} inBrowser>
          <BookingSummaryCard />
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-emerald-900">Insurance</p>
                <p className="mt-1 text-sm leading-snug text-slate-800">
                  Open Travel Connect with this booking&apos;s details already filled in.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-emerald-200/80 bg-white px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                NEW
              </span>
            </div>
            <button
              type="button"
              onClick={() => { track(); setStep(2) }}
              className="mt-4 rounded-lg bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Get Insurance Quote
            </button>
          </div>
        </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A2 — Travellers pre-filled */
    if (step === 2) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
        <InsuranceBookingShell activeTab="travellers" badge={travelConnectBadge} inBrowser>
          <BookingSummaryCard />
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 shadow-sm">
            <p className="text-xs font-semibold text-emerald-900">Travellers · pre-filled from booking</p>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2.5 shadow-sm">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900">{BOOKING.customer}</p>
                  <p className="text-xs text-slate-500">Adult · Primary traveller</p>
                </div>
                <span className="shrink-0 text-xs font-medium text-emerald-600">✓ from booking</span>
              </div>
            </div>
            <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm">
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">{BOOKING.hotelTitle}</span>
                {' · Honolulu, Hawaii · '}
                {BOOKING.heroDateRange}
                {' · '}
                {BOOKING.nights} nights
              </p>
            </div>
            <button
              type="button"
              onClick={() => { track(); setStep(3) }}
              className="mt-4 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Search Quotes
            </button>
          </div>
        </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A3 — Loading quotes */
    if (step === 3) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
        <InsuranceBookingShell activeTab="itinerary" badge={travelConnectBadge} inBrowser>
          <BookingSummaryCard />
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-slate-50/60 py-10 shadow-sm">
            <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-600" />
            <p className="mt-4 text-sm font-medium text-slate-700">Fetching quotes via partner API…</p>
            <p className="mt-1 max-w-xs px-4 text-center text-xs leading-relaxed text-slate-500">
              Booking data sent automatically — no re-entry needed
            </p>
          </div>
        </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A4 — Plan comparison */
    if (step === 4) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
        <InsuranceBookingShell activeTab="itinerary" badge={travelConnectBadge} inBrowser>
          <BookingSummaryCard />
          <p className="text-sm leading-relaxed text-slate-600">
            Compare plans for {BOOKING.customer} · {BOOKING.travellers}
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                type="button"
                onClick={() => {
                  if (!selectedPlan) track()
                  setSelectedPlan(plan.id)
                }}
                className={`relative rounded-xl border p-4 text-left shadow-sm transition ${
                  selectedPlan === plan.id
                    ? 'border-2 border-emerald-600 bg-emerald-50/90 ring-1 ring-emerald-600/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                {plan.recommended && (
                  <span className="absolute -top-2 right-2 rounded-full bg-emerald-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white shadow-sm">
                    Popular
                  </span>
                )}
                <p className="text-sm font-semibold text-slate-900">{plan.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-500">{plan.desc}</p>
                <p className="mt-3 text-lg font-bold tabular-nums text-slate-900">${plan.price}</p>
                <p className="text-[10px] text-slate-400">1 traveller · total premium</p>
              </button>
            ))}
          </div>
          <button
            type="button"
            disabled={!selectedPlan}
            onClick={() => { track(); setStep(5) }}
            className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add to Booking
          </button>
        </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A5 — After done */
    if (step === 5) {
      const plan = PLANS.find(p => p.id === selectedPlan)
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.helio}
        >
        <div className="m-3 overflow-hidden rounded-lg border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white shadow-sm">
          <div className="p-8 text-center md:p-10">
            <p className="text-3xl" aria-hidden>⚡</p>
            <p className="mt-3 text-xl font-semibold text-emerald-900">That&apos;s Travel Connect</p>
            <div className="mx-auto mt-6 grid max-w-sm grid-cols-3 gap-4">
              <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-emerald-800">{clicks}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                  clicks
                </p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-emerald-800">1</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                  system
                </p>
              </div>
              <div className="rounded-xl border border-emerald-100 bg-white p-3 shadow-sm">
                <p className="text-2xl font-bold text-emerald-800">~30s</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                  typical
                </p>
              </div>
            </div>
            {plan && (
              <div className="mx-auto mt-5 inline-block rounded-lg border border-emerald-200 bg-white px-4 py-2">
                <p className="text-sm text-slate-900">
                  {plan.name} added · <span className="font-semibold">${plan.price}</span> · total now $
                  {(BOOKING.total + plan.price).toLocaleString()}
                </p>
              </div>
            )}
            <p className="mx-auto mt-4 max-w-md text-sm text-emerald-700">
              Booking data carried into Travel Connect automatically — no re-keying — and the confirmed quote
              writes back. Same trip, far less friction than the Helio modal + Cover-More tab loop.
            </p>
            <button
              type="button"
              onClick={resetAll}
              className="mt-6 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Try another flow
            </button>
          </div>
        </div>
        </InsuranceDemoBrowserFrame>
      )
    }
  }

  return null
})

export default InsuranceFlowDemo
