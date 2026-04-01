import { useCallback, useEffect, useId, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { JoelAvatar } from './JoelAvatar'

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduce(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduce
}

/** Keep tooltip box fully outside target + generous height so it never covers the CTA cards. */
function pickTooltipPosition(rect, innerW, innerH) {
  const edge = 16
  const tw = Math.min(320, innerW - edge * 2)
  // Real panel is ~200–260px tall with buttons; overestimate to avoid overlap when placing “above”.
  const th = 300
  const gap = 20

  const hot = {
    left: rect.left - gap,
    top: rect.top - gap,
    right: rect.left + rect.width + gap,
    bottom: rect.top + rect.height + gap,
  }

  const boxIntersectsHot = (left, top) => {
    const r = { left, top, right: left + tw, bottom: top + th }
    return !(r.right <= hot.left || r.left >= hot.right || r.bottom <= hot.top || r.top >= hot.bottom)
  }

  const inViewport = (left, top) => {
    const r = { left, top, right: left + tw, bottom: top + th }
    return r.left >= edge && r.top >= edge && r.right <= innerW - edge && r.bottom <= innerH - edge
  }

  const clampX = (x) => Math.max(edge, Math.min(x, innerW - tw - edge))
  const cx = clampX(rect.left + rect.width / 2 - tw / 2)

  const tryBelow = { left: cx, top: rect.top + rect.height + gap }
  if (!boxIntersectsHot(tryBelow.left, tryBelow.top) && inViewport(tryBelow.left, tryBelow.top)) {
    return { ...tryBelow, width: tw, variant: 'anchored' }
  }

  const tryAbove = { left: cx, top: rect.top - th - gap }
  if (!boxIntersectsHot(tryAbove.left, tryAbove.top) && inViewport(tryAbove.left, tryAbove.top)) {
    return { ...tryAbove, width: tw, variant: 'anchored' }
  }

  // Side (legacy vs Travel Connect sit side-by-side — avoid spilling onto the neighbour card).
  const tryRight = { left: rect.left + rect.width + gap, top: rect.top }
  if (
    tryRight.left + tw <= innerW - edge &&
    !boxIntersectsHot(tryRight.left, tryRight.top) &&
    inViewport(tryRight.left, tryRight.top)
  ) {
    return { ...tryRight, width: tw, variant: 'anchored' }
  }

  const tryLeft = { left: rect.left - tw - gap, top: rect.top }
  if (
    tryLeft.left >= edge &&
    !boxIntersectsHot(tryLeft.left, tryLeft.top) &&
    inViewport(tryLeft.left, tryLeft.top)
  ) {
    return { ...tryLeft, width: tw, variant: 'anchored' }
  }

  // Bottom strip — never covers the mock booking UI.
  const bw = innerW - edge * 2
  const bottomTop = innerH - th - edge
  return { left: edge, top: Math.max(edge, bottomTop), width: bw, variant: 'bottom' }
}

/** Fixed horizontal-center card anchored to top or bottom edge (no spotlight rect). */
function pickDockedCoachCard(innerW, opts = {}) {
  const edge = typeof opts.edge === 'number' ? opts.edge : 16
  const anchor = opts.anchor === 'top' ? 'top' : 'bottom'
  const tw = Math.min(320, innerW - edge * 2)
  const left = (innerW - tw) / 2
  if (anchor === 'top') {
    return { left, top: edge, width: tw, variant: 'docked-top' }
  }
  return { left, bottom: edge, width: tw, variant: 'docked' }
}

/** Fixed viewport center; spotlight still tracks targets when used with `tooltipPlacement="center"`. */
function pickCenteredCoachCard(innerW) {
  const edge = 16
  const tw = Math.min(320, innerW - edge * 2)
  return { width: tw, variant: 'centered' }
}

/**
 * Full-viewport dim with a transparent cutout over the target (no white ring).
 * Coach card stacks above the dim. Targets stay clickable; cutout shows the spotlight.
 */
export function DemoCoachTour({
  active,
  steps,
  /** When set with rememberDismiss, dismissal survives refresh. */
  storageKey,
  /** If false, dismissal is only for this page load — refresh shows the tour again. */
  rememberDismiss = true,
  onDismiss,
  zClass = 'z-[200]',
  showAvatar = false,
  /**
   * `auto` — place the card beside / below the highlighted target.
   * `top` — fixed top-center (default inset clears demo chrome). `bottom` — fixed bottom-center.
   * `center` — fixed viewport center (cutout still follows the target).
   */
  tooltipPlacement = 'auto',
  /** When false, step footer does not suggest clicking highlighted targets (e.g. targets are disabled during tour). */
  targetsClickableDuringTour = true,
}) {
  const persistKey = storageKey && rememberDismiss ? storageKey : null

  const [dismissed, setDismissed] = useState(() => {
    if (!persistKey) return false
    try {
      return window.localStorage.getItem(persistKey) === '1'
    } catch {
      return false
    }
  })
  const [step, setStep] = useState(0)
  const [rect, setRect] = useState(null)
  const reduceMotion = usePrefersReducedMotion()
  const titleId = useId()

  const persistDismiss = useCallback(() => {
    if (persistKey) {
      try {
        window.localStorage.setItem(persistKey, '1')
      } catch {
        /* ignore */
      }
    }
    setDismissed(true)
    onDismiss?.()
  }, [persistKey, onDismiss])

  useEffect(() => {
    if (!active) {
      setStep(0)
      setRect(null)
    }
  }, [active])

  useLayoutEffect(() => {
    if (!active || dismissed || !steps.length) {
      setRect(null)
      return
    }

    const sel = steps[step]?.selector
    if (sel == null || sel === '') {
      setRect(null)
      return
    }

    const el = document.querySelector(sel)
    if (!el || !(el instanceof HTMLElement)) {
      setRect(null)
      return
    }

    const update = () => {
      const r = el.getBoundingClientRect()
      setRect({
        left: r.left,
        top: r.top,
        width: r.width,
        height: r.height,
      })
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [active, dismissed, step, steps])

  if (!active || dismissed || !steps.length) return null

  const current = steps[step]
  const last = step >= steps.length - 1
  const noTarget = Boolean(current && (current.selector == null || current.selector === ''))
  const showTooltip = Boolean(current && (noTarget || rect != null))
  /** Next → Done is enough for very short tours; Skip is redundant noise. */
  const showSkipTour = steps.length > 2

  const iw = typeof window !== 'undefined' ? window.innerWidth : 1024
  const ih = typeof window !== 'undefined' ? window.innerHeight : 800

  const dockOpts =
    noTarget && (current.dock === 'top' || current.dock === 'bottom')
      ? { anchor: current.dock, edge: typeof current.dockInset === 'number' ? current.dockInset : 16 }
      : {}

  const tooltipLayout =
    tooltipPlacement === 'bottom'
      ? pickDockedCoachCard(iw)
      : tooltipPlacement === 'top'
        ? pickDockedCoachCard(iw, { anchor: 'top', edge: 96 })
        : tooltipPlacement === 'center'
          ? pickCenteredCoachCard(iw)
          : noTarget
            ? pickDockedCoachCard(iw, dockOpts)
            : rect != null
              ? pickTooltipPosition(rect, iw, ih)
              : pickDockedCoachCard(iw)

  const tooltipMotion =
    reduceMotion ||
    tooltipPlacement === 'bottom' ||
    tooltipPlacement === 'top' ||
    tooltipPlacement === 'center'
      ? 'none'
      : tooltipLayout.variant === 'docked'
        ? 'none'
        : 'top 0.28s ease, left 0.28s ease'

  const cutoutStyle =
    rect != null
      ? {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          boxShadow: '0 0 0 9999px rgba(15, 23, 42, 0.52)',
          transition: reduceMotion
            ? 'none'
            : 'left 0.35s ease, top 0.35s ease, width 0.35s ease, height 0.35s ease, box-shadow 0.2s ease',
        }
      : null

  const portal = (
    <div className={`pointer-events-none fixed inset-0 ${zClass} isolate`}>
      {/* Dimmed backdrop with a clear “hole” over the target; no white ring */}
      {cutoutStyle && (
        <div
          className="pointer-events-none absolute rounded-xl"
          style={{ ...cutoutStyle, zIndex: 0 }}
          aria-hidden
        />
      )}
      {rect != null && !noTarget && (
        <div
          aria-hidden
          className="pointer-events-none absolute z-[5] select-none text-2xl leading-none"
          style={{
            left: rect.left + rect.width / 2,
            top: rect.top - 6,
            transform: 'translate(-50%, -100%)',
            transition: reduceMotion
              ? 'none'
              : 'left 0.35s ease, top 0.35s ease, transform 0.35s ease',
          }}
        >
          <span
            className={`inline-block drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] ${
              reduceMotion ? '' : 'animate-bounce'
            }`}
          >
            👇
          </span>
        </div>
      )}
      {noTarget && !rect && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-slate-900/50" aria-hidden />
      )}

      {showTooltip && current && (
        <div
          role="region"
          aria-labelledby={titleId}
          aria-live="polite"
          className={`pointer-events-auto fixed z-10 rounded-xl border border-slate-200 bg-white p-4 shadow-xl ${
            tooltipLayout.variant === 'docked' ||
            tooltipLayout.variant === 'docked-top' ||
            tooltipLayout.variant === 'centered' ||
            tooltipLayout.variant === 'bottom' ||
            tooltipLayout.variant === 'anchored'
              ? 'max-h-[min(320px,42vh)] overflow-y-auto'
              : ''
          }`}
          style={
            tooltipLayout.variant === 'docked'
              ? {
                  left: tooltipLayout.left,
                  bottom: tooltipLayout.bottom,
                  width: tooltipLayout.width,
                  top: 'auto',
                  transition: tooltipMotion,
                }
              : tooltipLayout.variant === 'docked-top'
                ? {
                    left: tooltipLayout.left,
                    top: tooltipLayout.top,
                    width: tooltipLayout.width,
                    bottom: 'auto',
                    transition: tooltipMotion,
                  }
                : tooltipLayout.variant === 'centered'
                  ? {
                      left: '50%',
                      top: '50%',
                      width: tooltipLayout.width,
                      transform: 'translate(-50%, -50%)',
                      bottom: 'auto',
                      transition: tooltipMotion,
                    }
                  : {
                      top: tooltipLayout.top,
                      left: tooltipLayout.left,
                      width: tooltipLayout.width,
                      bottom: 'auto',
                      transition: tooltipMotion,
                      maxWidth:
                        tooltipLayout.variant === 'anchored'
                          ? 'min(320px, calc(100vw - 32px))'
                          : undefined,
                    }
          }
        >
          {showAvatar ? (
            <div className="flex gap-3">
              <JoelAvatar sizeClass="h-9 w-9" className="ring-1 ring-slate-200/80 shrink-0" />
              <div className="min-w-0 flex-1">
                <header>
                  <h2
                    id={titleId}
                    className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {current.title}
                  </h2>
                </header>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{current.body}</p>
              </div>
            </div>
          ) : (
            <>
              <header>
                <h2
                  id={titleId}
                  className="text-xs font-semibold uppercase tracking-wide text-slate-500"
                >
                  {current.title}
                </h2>
              </header>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{current.body}</p>
            </>
          )}
          <footer className="mt-4 border-t border-slate-100 pt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                  >
                    Back
                  </button>
                )}
                {!last ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={persistDismiss}
                    className="rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Got it
                  </button>
                )}
              </div>
              {showSkipTour && (
                <button
                  type="button"
                  onClick={persistDismiss}
                  className="self-start text-sm font-medium text-slate-500 underline-offset-2 hover:text-slate-800 hover:underline sm:self-center"
                >
                  Skip tour
                </button>
              )}
            </div>
            <p className="mt-3 text-[10px] leading-snug text-slate-400">
              Step {step + 1} of {steps.length}
              {current.selector && targetsClickableDuringTour ? ' · you can still click the cards anytime' : ''}
            </p>
          </footer>
        </div>
      )}
    </div>
  )

  return createPortal(portal, document.body)
}
