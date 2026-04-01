import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react'
import {
  DEMO_TRIP_DEFAULT_ITINERARY,
  DEMO_TRIP_HERO,
  demoTripPackageTotalFormatted,
} from '../amendments/demoTripConstants'
import { InsuranceDemoBrowserFrame, INSURANCE_DEMO_URLS } from './InsuranceDemoBrowserFrame'
import {
  TravelConnectTierComparisonMock,
  TravelConnectSearchPageMock,
  TravelConnectInsuranceAddedSuccessMock,
} from './TravelConnectTierComparisonMock'

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

/** Bronze / Silver / Gold columns in the Figma-tier mock, prices aligned to PLANS for the demo. */
const TRAVEL_CONNECT_QUOTE_TIERS = [
  { planId: 'basic', label: 'Bronze', price: PLANS[0].price.toFixed(2) },
  { planId: 'standard', label: 'Silver', price: PLANS[1].price.toFixed(2) },
  { planId: 'premium', label: 'Gold', price: PLANS[2].price.toFixed(2) },
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

/** Pre-filled manual line values for the return-from–Cover-More step (click empty field = demo shortcut; typing still works). */
const DEMO_MANUAL_LINE_PRODUCT = 'Comprehensive leisure'
const DEMO_MANUAL_LINE_SUPPLIER = 'CM-AU'

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

function formatManualPremiumDisplay(aud) {
  const t = String(aud ?? '').trim()
  if (!t) return '—'
  if (t.startsWith('$')) return t
  return `$${t}`
}

function manualPremiumToNumber(form) {
  const raw = String(form?.premiumAud ?? '').replace(/[^0-9.]/g, '')
  const n = parseFloat(raw)
  return Number.isFinite(n) ? n : 0
}

/** Insurance line item on Helio itinerary after a flow completes (under hotel / package). */
function HelioAddedInsuranceLineCard({ title, subtitle, priceLabel }) {
  return (
    <div className="relative rounded-xl border border-emerald-200 bg-emerald-50/40 p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-emerald-800/80">Insurance</p>
          <p className="mt-1 text-sm font-medium text-slate-900">{title}</p>
          <p className="mt-0.5 text-xs text-slate-600">{subtitle}</p>
        </div>
        <p className="shrink-0 text-sm font-semibold tabular-nums text-slate-900">{priceLabel}</p>
      </div>
    </div>
  )
}

/**
 * Compact Travel Connect outcome — sits in a narrow column beside itinerary on sm+ so the mock
 * doesn’t stack a huge block under the hotel + insurance cards.
 */
function HelioTravelConnectOutcomePanel({ clicks, planLabel, priceAmount, bookingTotal, onTryAnother }) {
  const totalNow = bookingTotal + priceAmount
  return (
    <div
      className="w-full shrink-0 rounded-lg border border-emerald-200 bg-gradient-to-b from-emerald-50/90 to-white p-3 text-left shadow-sm sm:sticky sm:top-2 sm:max-w-[240px] sm:self-start"
      role="status"
      aria-label="Travel Connect flow summary"
    >
      <div className="flex items-start gap-2">
        <span className="text-base leading-none" aria-hidden>
          ⚡
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-semibold leading-tight text-emerald-900">That&apos;s Travel Connect</p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            <span className="inline-flex rounded border border-emerald-100 bg-white/90 px-1.5 py-0.5 text-[9px] font-bold tabular-nums text-emerald-800">
              {clicks}
            </span>
            <span className="inline-flex rounded border border-emerald-100 bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-800">
              1 sys
            </span>
            <span className="inline-flex rounded border border-emerald-100 bg-white/90 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-800">
              ~30s
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-snug text-slate-800">
            <span className="font-medium">{planLabel}</span> · <span className="font-semibold">${priceAmount}</span> · $
            {totalNow.toLocaleString()}
          </p>
          <p className="mt-1.5 text-[9px] leading-snug text-emerald-800/95 line-clamp-4">
            Data pre-filled in Travel Connect; quote writes back — less friction than Helio + Cover-More.
          </p>
          <button
            type="button"
            onClick={onTryAnother}
            className="mt-2 w-full rounded-md bg-slate-900 px-2 py-1.5 text-[10px] font-semibold text-white transition hover:bg-slate-800"
          >
            Try another flow
          </button>
        </div>
      </div>
    </div>
  )
}

/** Turtle-style checkout progress inside Helio (Cart → Travellers → Payment). */
function LegacyHelioCheckoutProgress({ page }) {
  const currentNum = page === 'cart' ? 1 : page === 'travellers' ? 2 : 3
  const labels = ['Cart', 'Travellers', 'Payment']
  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-2 border-b border-slate-200 pb-3">
        {labels.map((label, i) => {
          const stepNum = i + 1
          const active = stepNum === currentNum
          const done = stepNum < currentNum
          return (
            <div
              key={label}
              className={`flex flex-1 items-center justify-center text-center text-xs sm:text-sm ${
                active ? 'font-semibold text-slate-900' : done ? 'text-emerald-600' : 'text-slate-400'
              }`}
            >
              {stepNum}. {label}
            </div>
          )
        })}
      </div>
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-slate-900 transition-all duration-300"
          style={{ width: `${(currentNum / 3) * 100}%` }}
        />
      </div>
    </>
  )
}

function LegacyCheckoutBusyOverlay({ message }) {
  return (
    <div
      className="absolute inset-0 z-[100] flex items-center justify-center bg-white/90"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  )
}

/** Full content-area loader when switching to Cover-More / Travel Connect (matches tab + URL, not UI yet). */
function SecondaryTabLoadingView({ message }) {
  return (
    <div
      className="flex min-h-full items-center justify-center border-t border-slate-100 bg-slate-50"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        <p className="mt-4 text-sm font-medium text-slate-600">{message}</p>
      </div>
    </div>
  )
}

/**
 * Same copy on first open and when returning from Cover‑More.
 * When `onCoverMoreDemoClick` is set, Cover‑More is the demo jump link; when omitted (return step), plain text so the flow doesn’t reset.
 */
function LegacyManualInsuranceModalIntro({ onCoverMoreDemoClick }) {
  const coverMore =
    typeof onCoverMoreDemoClick === 'function' ? (
      <a
        href="#cover-more-demo"
        className="font-medium text-blue-700 underline decoration-blue-600/50 underline-offset-2 hover:text-blue-900"
        aria-label="Switch to Cover-More tab (demo)"
        onClick={(e) => {
          e.preventDefault()
          onCoverMoreDemoClick()
        }}
      >
        Cover-More
      </a>
    ) : (
      <span className="font-medium text-slate-700">Cover-More</span>
    )

  return (
    <p className="text-xs leading-relaxed text-slate-600">
      Quote in {coverMore} and return to this form to add details.
    </p>
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
  /** Optional click-to-fill for demo (empty field + click applies value; onChange always works). */
  clickToFillDemo,
}) {
  const id = (suffix) => `${fieldIdPrefix}-${suffix}`

  const fillIfEmpty = (key, demoValue) => {
    if (demoValue == null || String(demoValue).trim() === '') return
    setManualItemForm((p) => {
      const cur = p[key]
      if (typeof cur === 'string' && cur.trim() !== '') return p
      return { ...p, [key]: demoValue }
    })
  }

  return (
    <div
      className="absolute inset-0 z-[240] flex items-start justify-center overflow-y-auto bg-slate-950/80 px-4 py-8 backdrop-blur-sm sm:items-center sm:py-10"
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
                onClick={() => fillIfEmpty('productName', clickToFillDemo?.productName)}
                placeholder={
                  clickToFillDemo?.productName
                    ? 'Click to add product (demo) or type'
                    : 'e.g. Comprehensive leisure'
                }
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
                onClick={() => fillIfEmpty('supplierCode', clickToFillDemo?.supplierCode)}
                placeholder={
                  clickToFillDemo?.supplierCode
                    ? 'Click to add supplier (demo) or type'
                    : 'e.g. CM-AU'
                }
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
                  onClick={() => fillIfEmpty('premiumAud', clickToFillDemo?.premiumAud)}
                  placeholder={
                    clickToFillDemo?.premiumAud
                      ? 'Click to add premium (demo) or type'
                      : '0.00'
                  }
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
                  onClick={() => fillIfEmpty('quoteRef', clickToFillDemo?.quoteRef)}
                  placeholder={
                    clickToFillDemo?.quoteRef
                      ? 'Click to paste reference (demo) or type'
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
        {/* Hero row aligned with AmendmentsFlowDemoTailwind: trip summary | price */}
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
  {
    embedded = false,
    onBackToCaseStudy,
    onClose,
    onFlowComplete,
    onFlowBegin,
    /** When true (spotlight tour open), idle Add insurance cards are non-interactive. */
    spotlightTourActive = false,
  },
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
  const [checkoutBusy, setCheckoutBusy] = useState(null)

  const track = useCallback(() => setClicks(c => c + 1), [])

  const runCheckoutBusy = useCallback((message, fn) => {
    setCheckoutBusy(message)
    window.setTimeout(() => {
      setCheckoutBusy(null)
      fn()
    }, 850)
  }, [])

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
    setCheckoutBusy(null)
  }, [])

  const startBefore = useCallback(() => {
    onFlowBegin?.()
    setClicks(0)
    setFilledFields({})
    setTypingKey(null)
    setTypingDisplay('')
    setSelectedPlan(null)
    setManualItemForm(emptyManualInsuranceItemForm())
    setManualLineModalDismissed(false)
    setCheckoutBusy(null)
    setFlow('before')
    setStep(1)
  }, [onFlowBegin])

  const startAfter = useCallback(() => {
    onFlowBegin?.()
    setClicks(0)
    setFilledFields({})
    setTypingKey(null)
    setTypingDisplay('')
    setSelectedPlan(null)
    setManualItemForm(emptyManualInsuranceItemForm())
    setCheckoutBusy(null)
    setFlow('after')
    setStep(0)
  }, [onFlowBegin])

  useImperativeHandle(ref, () => ({
    startBeforeFlow: startBefore,
    startAfterFlow: startAfter,
  }))

  /* Auto-advance transitions */
  useEffect(() => {
    let t
    if (flow === 'before') {
      if (step === 2) t = setTimeout(() => setStep(3), 1800)
      if (step === 10) t = setTimeout(() => setStep(11), 900)
    }
    if (flow === 'after') {
      if (step === 0) t = setTimeout(() => setStep(1), 1700)
      if (step === 2) t = setTimeout(() => setStep(3), 1400)
    }
    return () => clearTimeout(t)
  }, [flow, step])

  /* Notify parent on completion */
  useEffect(() => {
    if (flow === 'before' && step === 14) onFlowComplete?.('before')
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
    if (filledFields[key]) return
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
        disabled={isFilled || isTyping}
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
              disabled={spotlightTourActive}
              aria-label="Try the legacy path: Helio modal and Cover-More tab"
              data-insurance-demo-tour="legacy-flow"
              className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 text-left shadow-sm transition hover:border-amber-300 hover:bg-amber-50 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              <p className="text-base font-semibold text-amber-950">
                <span className="text-amber-600" aria-hidden>
                  +{' '}
                </span>
                Add insurance
              </p>
              <p className="mt-1 text-xs font-medium text-amber-900">Legacy</p>
            </button>
            <button
              type="button"
              onClick={startAfter}
              disabled={spotlightTourActive}
              aria-label="Try adding insurance with Travel Connect"
              data-insurance-demo-tour="travel-connect-flow"
              className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50 disabled:pointer-events-none disabled:cursor-not-allowed"
            >
              <p className="text-base font-semibold text-emerald-950">
                <span className="text-emerald-600" aria-hidden>
                  +{' '}
                </span>
                Add insurance
              </p>
              <p className="mt-1 text-xs font-medium text-emerald-900">Travel Connect</p>
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
          <InsuranceDemoBrowserFrame
            activeTab="helio"
            secondaryLabel="Cover-More"
            url={INSURANCE_DEMO_URLS.helio}
          >
            <InsuranceBookingShell activeTab="itinerary" inBrowser>
              <div className="min-h-[300px] space-y-4 p-4">
                <div className="rounded-lg border border-amber-200 bg-amber-50/90 px-3 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-amber-900/90">
                    Open Cover-More
                  </p>
                  <a
                    href="#cover-more-demo"
                    className="mt-1 block max-w-full truncate text-xs font-medium text-blue-700 underline decoration-blue-600/50 underline-offset-2 hover:text-blue-900"
                    aria-label="Switch to Cover-More tab (demo)"
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
        )
      }

      return (
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
              <LegacyManualInsuranceModalIntro
                onCoverMoreDemoClick={() => {
                  track()
                  setStep(2)
                }}
              />
            }
          />
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B2 — Brief transition while the mock switches active tab to Cover-More */
    if (step === 2) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.coverMore}
        >
          <SecondaryTabLoadingView message="Loading Cover-More…" />
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
          <LegacyManualInsuranceItemModal
            onClose={resetAll}
            titleId="legacy-manual-insurance-return-title"
            fieldIdPrefix="manual-ins-ret"
            manualItemForm={manualItemForm}
            setManualItemForm={setManualItemForm}
            primaryLabel="Add to cart"
            primaryDisabled={!isManualInsuranceFormReadyForCart(manualItemForm)}
            onPrimary={() => {
              track()
              setStep(10)
            }}
            clickToFillDemo={{
              quoteRef: QUOTE_REF,
              premiumAud: premiumAudDemoFromPlan(selectedPlan),
              productName: DEMO_MANUAL_LINE_PRODUCT,
              supplierCode: DEMO_MANUAL_LINE_SUPPLIER,
            }}
            intro={<LegacyManualInsuranceModalIntro />}
          />
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B10 — Adding manual line to cart (loading, then checkout steps) */
    if (step === 10) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <div className="flex min-h-full items-center justify-center border-t border-slate-100 bg-slate-50">
            <div className="text-center">
              <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
              <p className="mt-4 text-sm font-medium text-slate-600">Adding to cart…</p>
            </div>
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B11 — Cart */
    if (step === 11) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <div className="relative min-h-full">
            {checkoutBusy ? <LegacyCheckoutBusyOverlay message={checkoutBusy} /> : null}
            <div className="flex flex-col p-4">
              <LegacyHelioCheckoutProgress page="cart" />
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-800">Cart</p>
                <div className="rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-slate-900">{manualItemForm.productName || 'Insurance'}</p>
                      <p className="mt-0.5 text-xs text-slate-500">
                        {manualItemForm.supplierCode}
                        {manualItemForm.quoteRef ? ` · ${manualItemForm.quoteRef}` : ''}
                      </p>
                    </div>
                    <p className="shrink-0 font-semibold text-slate-900 tabular-nums">
                      {formatManualPremiumDisplay(manualItemForm.premiumAud)}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-slate-500">Manual line item · 1 traveller</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      setStep(9)
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back to line item
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      runCheckoutBusy('Loading travellers…', () => setStep(12))
                    }}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Continue to travellers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B12 — Travellers */
    if (step === 12) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <div className="relative min-h-full">
            {checkoutBusy ? <LegacyCheckoutBusyOverlay message={checkoutBusy} /> : null}
            <div className="flex flex-col p-4">
              <LegacyHelioCheckoutProgress page="travellers" />
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-800">Select travellers</p>
                <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-sm font-medium text-slate-900">{BOOKING.customer}</p>
                  <p className="text-xs text-slate-500">Adult · Primary traveller</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      setStep(11)
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back to cart
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      runCheckoutBusy('Loading payment form…', () => setStep(13))
                    }}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Continue to payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B13 — Payment */
    if (step === 13) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <div className="relative min-h-full">
            {checkoutBusy ? <LegacyCheckoutBusyOverlay message={checkoutBusy} /> : null}
            <div className="flex flex-col p-4">
              <LegacyHelioCheckoutProgress page="payment" />
              <div className="space-y-4">
                <p className="text-sm font-medium text-slate-800">Payment</p>
                <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                  <strong>Ready to pay.</strong> Insurance premium ({formatManualPremiumDisplay(manualItemForm.premiumAud)}) will be
                  added to the booking total using your saved payment method.
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      setStep(12)
                    }}
                    className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back to travellers
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      track()
                      runCheckoutBusy('Processing payment…', () => setStep(14))
                    }}
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Confirm payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* B14 — Back on Helio: itinerary + insurance line + same Travel Connect outcome panel (demo parity). */
    if (step === 14) {
      const coverPlan = selectedPlan ? PLANS.find((p) => p.id === selectedPlan) : null
      const priceAmount = coverPlan?.price ?? manualPremiumToNumber(manualItemForm)
      const planLabel = coverPlan?.name ?? (manualItemForm.productName.trim() || 'Insurance')
      const insTitle = manualItemForm.productName.trim() || planLabel
      const insSubParts = []
      if (manualItemForm.supplierCode.trim()) insSubParts.push(`Cover-More · ${manualItemForm.supplierCode.trim()}`)
      if (manualItemForm.quoteRef.trim()) insSubParts.push(manualItemForm.quoteRef.trim())
      const insSubtitle = insSubParts.length > 0 ? insSubParts.join(' · ') : 'Cover-More · manual line item'

      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="Cover-More"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <InsuranceBookingShell activeTab="itinerary" inBrowser>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
              <div className="min-w-0 flex-1 space-y-4">
                <BookingSummaryCard />
                <HelioAddedInsuranceLineCard
                  title={insTitle}
                  subtitle={insSubtitle}
                  priceLabel={`$${priceAmount}`}
                />
              </div>
              <HelioTravelConnectOutcomePanel
                clicks={clicks}
                planLabel={planLabel}
                priceAmount={priceAmount}
                bookingTotal={BOOKING.total}
                onTryAnother={resetAll}
              />
            </div>
          </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }
  }

  /* ────────────────────────────────────────────────────────────
     AFTER FLOW
     ──────────────────────────────────────────────────────────── */
  if (flow === 'after') {
    /* A0 — Tab switches to Travel Connect; brief load before the linked booking UI appears */
    if (step === 0) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
          <SecondaryTabLoadingView message="Loading Travel Connect…" />
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A1 — Travel Connect search: same app chrome + cards as tier results (Insurance case study mock). */
    if (step === 1) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
          <div className="min-h-full overflow-y-auto overflow-x-hidden bg-white">
            <TravelConnectSearchPageMock
              destination="Honolulu, Hawaii"
              dateRange={`${BOOKING.departure} - ${BOOKING.returnDate}`}
              travellersLabel={BOOKING.travellers}
              bookingId={BOOKING.id}
              hotelTitle={BOOKING.hotelTitle}
              tripDetailLine={`${BOOKING.heroDateRange} · ${BOOKING.nights} nights · ${BOOKING.roomStr}`}
              customerName={BOOKING.customer}
              customerSub="Adult · Primary traveller"
              onSearchInsurance={() => {
                track()
                setStep(2)
              }}
            />
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A2 — Loading quotes / tier screen after Search insurance */
    if (step === 2) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
          <SecondaryTabLoadingView message="Searching insurance…" />
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A3 — Figma / shipped tier comparison (same UI as case study Design section) */
    if (step === 3) {
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
        >
          <div className="min-h-full overflow-y-auto overflow-x-hidden bg-white">
            <TravelConnectTierComparisonMock
              variant="pageOnly"
              className="bg-white"
              destination="Honolulu, Hawaii"
              dateRange={`${BOOKING.departure} - ${BOOKING.returnDate}`}
              travellersLabel={BOOKING.travellers}
              tiers={TRAVEL_CONNECT_QUOTE_TIERS}
              onAddToHelio={(planId) => {
                track()
                setSelectedPlan(planId)
                setStep(4)
              }}
            />
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A4 — Travel Connect confirmation after Add to HELIO */
    if (step === 4) {
      const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS.find((p) => p.recommended)
      const goHelio = () => {
        track()
        setStep(5)
      }
      return (
        <InsuranceDemoBrowserFrame
          activeTab="secondary"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.travelConnect}
          onSelectHelioTab={goHelio}
        >
          <div className="min-h-full overflow-y-auto overflow-x-hidden bg-white">
            <TravelConnectInsuranceAddedSuccessMock
              planLine={`${plan.name} · $${plan.price} · sent to booking ${BOOKING.id}`}
              onContinueToHelio={goHelio}
            />
          </div>
        </InsuranceDemoBrowserFrame>
      )
    }

    /* A5 — Helio: itinerary + insurance line + outcome panel */
    if (step === 5) {
      const plan = PLANS.find((p) => p.id === selectedPlan) ?? PLANS.find((p) => p.recommended)
      return (
        <InsuranceDemoBrowserFrame
          activeTab="helio"
          secondaryLabel="TravelConnect"
          url={INSURANCE_DEMO_URLS.helio}
        >
          <InsuranceBookingShell activeTab="itinerary" inBrowser>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
              <div className="min-w-0 flex-1 space-y-4">
                <BookingSummaryCard />
                <HelioAddedInsuranceLineCard
                  title={plan.name}
                  subtitle="Travel Connect · quote applied to booking"
                  priceLabel={`$${plan.price}`}
                />
              </div>
              <HelioTravelConnectOutcomePanel
                clicks={clicks}
                planLabel={plan.name}
                priceAmount={plan.price}
                bookingTotal={BOOKING.total}
                onTryAnother={resetAll}
              />
            </div>
          </InsuranceBookingShell>
        </InsuranceDemoBrowserFrame>
      )
    }
  }

  return null
})

export default InsuranceFlowDemo
