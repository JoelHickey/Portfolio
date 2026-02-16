import { useState } from 'react'

const PLANS = [
  { id: 'basic', name: 'Basic', coverage: 'Medical, luggage', price: 24, per: 'trip' },
  { id: 'standard', name: 'Standard', coverage: 'Medical, luggage, cancellation', price: 39, per: 'trip' },
  { id: 'premium', name: 'Premium', coverage: 'Full coverage + activities', price: 59, per: 'trip' }
]

function InsuranceFlowDemo({ embedded = false, onBackToCaseStudy, onClose }) {
  const [flow, setFlow] = useState(null) // null | 'before' | 'after'
  const [beforeStep, setBeforeStep] = useState(1)
  const [afterStep, setAfterStep] = useState(1)
  const [selectedPlanId, setSelectedPlanId] = useState(null)
  const [addedToBooking, setAddedToBooking] = useState(false)

  const resetFlow = () => {
    setFlow(null)
    setBeforeStep(1)
    setAfterStep(1)
    setSelectedPlanId(null)
    setAddedToBooking(false)
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-lg overflow-hidden">
      {!flow && (
        <div className="p-8 md:p-10">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            Embedded insurance: before vs after
          </h2>
          <p className="mt-2 text-slate-600 max-w-xl">
            See how we moved insurance quoting from a separate journey into the booking flow.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setFlow('before')}
              className="rounded-xl border-2 border-slate-200 bg-slate-50 p-6 text-left transition hover:border-slate-300 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-amber-700">Before</span>
              <p className="mt-2 font-semibold text-slate-900">Leave booking → open insurance tab → manual quote</p>
              <p className="mt-1 text-sm text-slate-600">Context switch, extra steps, drop-off.</p>
            </button>
            <button
              type="button"
              onClick={() => setFlow('after')}
              className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-6 text-left transition hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
            >
              <span className="text-sm font-semibold uppercase tracking-wider text-emerald-700">After</span>
              <p className="mt-2 font-semibold text-slate-900">Inline quote in booking</p>
              <p className="mt-1 text-sm text-slate-600">One place, one flow, ~30 seconds.</p>
            </button>
          </div>
          {(onBackToCaseStudy || onClose) && embedded && (
            <div className="mt-8 flex flex-wrap gap-3">
              {onBackToCaseStudy && (
                <button
                  type="button"
                  onClick={onBackToCaseStudy}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Back to story
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {flow === 'before' && (
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-amber-800">Before: separate journey</h3>
            <button
              type="button"
              onClick={resetFlow}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Choose again
            </button>
          </div>
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-6">
            {beforeStep === 1 && (
              <>
                <p className="text-slate-700 font-medium">1. Consultant is in the booking screen.</p>
                <p className="mt-2 text-sm text-slate-600">To add insurance they had to leave the booking, open a separate insurance tool, re-enter trip details, then manually apply the quote. Easy to forget or abandon.</p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBeforeStep(2)}
                    className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {beforeStep === 2 && (
              <>
                <p className="text-slate-700 font-medium">2. Separate insurance tab / tool.</p>
                <p className="mt-2 text-sm text-slate-600">Trip details re-entered manually. Quote calculated. Consultant copies result or switches back — context switching and risk of errors or drop-off.</p>
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setBeforeStep(1)}
                    className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={resetFlow}
                    className="rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {flow === 'after' && (
        <div className="p-8 md:p-10">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-emerald-800">After: embedded in booking</h3>
            {!addedToBooking && (
              <button
                type="button"
                onClick={resetFlow}
                className="text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                Choose again
              </button>
            )}
          </div>

          {afterStep === 1 && !addedToBooking && (
            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-medium text-slate-500">Booking summary</p>
                <p className="mt-1 font-semibold text-slate-900">Sydney → Honolulu, 7 nights</p>
                <p className="mt-1 text-slate-600">Total: $2,450</p>
                <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-800">Add travel insurance</p>
                  <p className="mt-1 text-xs text-slate-600">Get a quote without leaving the booking.</p>
                  <button
                    type="button"
                    onClick={() => setAfterStep(2)}
                    className="mt-3 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Get quote
                  </button>
                </div>
              </div>
            </div>
          )}

          {afterStep === 2 && !addedToBooking && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-slate-600">Select a plan — quote is based on this booking.</p>
              <ul className="grid gap-3 sm:grid-cols-3">
                {PLANS.map((plan) => (
                  <li key={plan.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`w-full rounded-xl border-2 p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 ${
                        selectedPlanId === plan.id
                          ? 'border-emerald-500 bg-emerald-50'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <p className="font-semibold text-slate-900">{plan.name}</p>
                      <p className="mt-1 text-xs text-slate-600">{plan.coverage}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">${plan.price}</p>
                      <p className="text-xs text-slate-500">per {plan.per}</p>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setAfterStep(1)}
                  className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAddedToBooking(true)
                    setAfterStep(3)
                  }}
                  disabled={!selectedPlanId}
                  className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Add to booking
                </button>
              </div>
            </div>
          )}

          {addedToBooking && (
            <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="font-semibold text-emerald-900">Added to booking</p>
              <p className="mt-1 text-sm text-emerald-800">
                {PLANS.find((p) => p.id === selectedPlanId)?.name} travel insurance (${PLANS.find((p) => p.id === selectedPlanId)?.price}) is now part of this booking. Total updated — no context switch.
              </p>
              <button
                type="button"
                onClick={resetFlow}
                className="mt-4 rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
              >
                Try again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default InsuranceFlowDemo
