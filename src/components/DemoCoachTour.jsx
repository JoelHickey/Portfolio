import { useCallback, useEffect, useId, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { JoelAvatar } from './JoelAvatar'

/** Coach card width; wider copy wraps less and stays shorter vertically. */
const COACH_CARD_MAX_W = 400

/**
 * Dim over everything except the current target. Kept light so UI that stays under the overlay
 * (e.g. the adjacent card in a pair) remains readable — only the punched hole reads as “spotlight”.
 */
const SPOTLIGHT_DIM_CLASS = 'bg-slate-900/30'
const SPOTLIGHT_DIM_FILL = 'rgba(15, 23, 42, 0.28)'
/** Matches `rounded-xl` on common tour targets. */
const SPOTLIGHT_HOLE_RX = 12
/** Gap between 👇 and the spotlight top edge (viewport px). */
const POINTER_ABOVE_TARGET_PX = 6

/** Horizontally centered, just above the target’s top — 👇 points down onto the card/control. */
function spotlightPointerAnchor(rect) {
  const { left, top, width } = rect
  return {
    left: left + width / 2,
    top: top - POINTER_ABOVE_TARGET_PX,
  }
}

/** One clear hole via SVG mask — nothing is drawn on top of the target; sibling controls stay dimmed. */
function SpotlightSvgDim({ hole, innerW, innerH, maskId, reduceMotion }) {
  if (hole == null) return null
  const tr = reduceMotion ? 'none' : 'opacity 0.2s ease'
  const { left, top, width, height } = hole
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      width={innerW}
      height={innerH}
      style={{ transition: tr }}
    >
      <defs>
        <mask
          id={maskId}
          maskUnits="userSpaceOnUse"
          maskContentUnits="userSpaceOnUse"
          x="0"
          y="0"
          width={innerW}
          height={innerH}
        >
          <rect x="0" y="0" width={innerW} height={innerH} fill="white" />
          <rect
            x={left}
            y={top}
            width={width}
            height={height}
            rx={SPOTLIGHT_HOLE_RX}
            ry={SPOTLIGHT_HOLE_RX}
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width={innerW}
        height={innerH}
        fill={SPOTLIGHT_DIM_FILL}
        mask={`url(#${maskId})`}
      />
    </svg>
  )
}

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
  const tw = Math.min(COACH_CARD_MAX_W, innerW - edge * 2)
  // Estimated full card height for placement; keep realistic so “below/above” aren’t rejected on laptop viewports.
  const th = 420
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
  /** Keep side tooltips in the viewport when the target sits low (avoids rejecting tryRight / forcing tryLeft into the corner). */
  const sideTop = Math.max(edge, Math.min(rect.top, innerH - th - edge))

  const tryBelow = { left: cx, top: rect.top + rect.height + gap }
  if (!boxIntersectsHot(tryBelow.left, tryBelow.top) && inViewport(tryBelow.left, tryBelow.top)) {
    return { ...tryBelow, width: tw, variant: 'anchored' }
  }

  const tryAbove = { left: cx, top: rect.top - th - gap }
  if (!boxIntersectsHot(tryAbove.left, tryAbove.top) && inViewport(tryAbove.left, tryAbove.top)) {
    return { ...tryAbove, width: tw, variant: 'anchored' }
  }

  // Side-by-side targets (e.g. Legacy | Travel Connect): prefer right, then bottom-center — not
  // tryLeft before bottom, or the card docks on the viewport edge far from the highlight.
  const tryRight = { left: rect.left + rect.width + gap, top: sideTop }
  if (
    tryRight.left + tw <= innerW - edge &&
    !boxIntersectsHot(tryRight.left, tryRight.top) &&
    inViewport(tryRight.left, tryRight.top)
  ) {
    return { ...tryRight, width: tw, variant: 'anchored' }
  }

  const bottomTop = Math.max(edge, innerH - th - edge)
  const bottomLeft = Math.max(edge, (innerW - tw) / 2)
  const tryBottom = { left: bottomLeft, top: bottomTop, width: tw, variant: 'bottom' }
  if (!boxIntersectsHot(tryBottom.left, tryBottom.top) && inViewport(tryBottom.left, tryBottom.top)) {
    return tryBottom
  }

  const tryLeft = { left: rect.left - tw - gap, top: sideTop }
  if (
    tryLeft.left >= edge &&
    !boxIntersectsHot(tryLeft.left, tryLeft.top) &&
    inViewport(tryLeft.left, tryLeft.top)
  ) {
    return { ...tryLeft, width: tw, variant: 'anchored' }
  }

  // Last resort: bottom-center even if it overlaps hot (better than a corner card).
  return tryBottom
}

/** Fixed horizontal-center card anchored to top or bottom edge (no spotlight rect). */
function pickDockedCoachCard(innerW, opts = {}) {
  const edge = typeof opts.edge === 'number' ? opts.edge : 16
  const anchor = opts.anchor === 'top' ? 'top' : 'bottom'
  const tw = Math.min(COACH_CARD_MAX_W, innerW - edge * 2)
  const left = (innerW - tw) / 2
  if (anchor === 'top') {
    return { left, top: edge, width: tw, variant: 'docked-top' }
  }
  return { left, bottom: edge, width: tw, variant: 'docked' }
}

/** Fixed viewport center; spotlight still tracks targets when used with `tooltipPlacement="center"`. */
function pickCenteredCoachCard(innerW) {
  const edge = 16
  const tw = Math.min(COACH_CARD_MAX_W, innerW - edge * 2)
  return { width: tw, variant: 'centered' }
}

/** One string or several short lines for easier scanning in the coach card. */
function StepBody({ body }) {
  const parts = Array.isArray(body) ? body : [body]
  return (
    <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
      {parts.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
    </div>
  )
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
  /**
   * When true, shows 👇 centered above the target’s top edge, pointing down onto it.
   */
  showTargetPointer = false,
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
  /** Current step target in viewport coords — single spotlight hole + tooltip placement. */
  const [targetRect, setTargetRect] = useState(null)
  const reduceMotion = usePrefersReducedMotion()
  const tourUid = useId().replace(/:/g, '')
  const titleId = `coach-title-${tourUid}`
  const spotlightMaskId = `coach-spotlight-${tourUid}`

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
      setTargetRect(null)
    }
  }, [active])

  useLayoutEffect(() => {
    if (!active || dismissed || !steps.length) {
      setTargetRect(null)
      return
    }

    const sel = steps[step]?.selector
    if (sel == null || sel === '') {
      setTargetRect(null)
      return
    }

    let cancelled = false
    let ro = null
    let rafId = 0
    let scrollResizeUpdate = null

    const cleanup = () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      if (ro) {
        ro.disconnect()
        ro = null
      }
      if (scrollResizeUpdate) {
        window.removeEventListener('resize', scrollResizeUpdate)
        window.removeEventListener('scroll', scrollResizeUpdate, true)
        scrollResizeUpdate = null
      }
    }

    const bind = (el) => {
      const update = () => {
        if (cancelled || !el.isConnected) return
        const r = el.getBoundingClientRect()
        setTargetRect({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        })
      }
      update()
      ro = new ResizeObserver(update)
      ro.observe(el)
      window.addEventListener('resize', update)
      window.addEventListener('scroll', update, true)
      return update
    }

    const tryAttach = () => {
      const el = document.querySelector(sel)
      if (el instanceof HTMLElement) {
        scrollResizeUpdate = bind(el)
        return true
      }
      return false
    }

    if (tryAttach()) {
      return cleanup
    }

    let attempts = 0
    const maxAttempts = 90
    const tick = () => {
      if (cancelled) return
      if (tryAttach()) return
      attempts += 1
      if (attempts < maxAttempts) {
        rafId = requestAnimationFrame(tick)
      }
    }
    rafId = requestAnimationFrame(tick)

    return cleanup
  }, [active, dismissed, step, steps])

  if (!active || dismissed || !steps.length) return null

  const current = steps[step]
  const last = step >= steps.length - 1
  const noTarget = Boolean(current && (current.selector == null || current.selector === ''))
  const showTooltip = Boolean(current && (noTarget || targetRect != null))
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
            : targetRect != null
              ? pickTooltipPosition(targetRect, iw, ih)
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

  const pointerAnchor =
    showTargetPointer && targetRect != null && !noTarget ? spotlightPointerAnchor(targetRect) : null

  const portal = (
    <div className={`pointer-events-none fixed inset-0 ${zClass} isolate`}>
      {targetRect != null && (
        <SpotlightSvgDim
          hole={targetRect}
          innerW={iw}
          innerH={ih}
          maskId={spotlightMaskId}
          reduceMotion={reduceMotion}
        />
      )}
      {noTarget && !targetRect && (
        <div className={`pointer-events-none absolute inset-0 z-0 ${SPOTLIGHT_DIM_CLASS}`} aria-hidden />
      )}

      {pointerAnchor != null && (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[5] select-none text-2xl leading-none"
          style={{
            left: pointerAnchor.left,
            top: pointerAnchor.top,
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
              ? 'max-h-[calc(100svh-2rem)] overflow-y-auto'
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
                        tooltipLayout.variant === 'anchored' ||
                        tooltipLayout.variant === 'bottom'
                          ? `min(${COACH_CARD_MAX_W}px, calc(100vw - 32px))`
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
                <StepBody body={current.body} />
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
              <StepBody body={current.body} />
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
