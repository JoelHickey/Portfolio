import { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { JoelAvatar } from './JoelAvatar'

function useTypewriter(text, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    if (!text) {
      setDone(true)
      return
    }
    setDone(false)
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(interval)
  }, [text, speed])

  return { displayed, done }
}

/**
 * Shared state for the case-study interactive demo guide (typewriter + completion tracking).
 */
export function useCaseStudyDemoGuide({ welcomeMessage, flowMessages, totalFlows, typewriterSpeed = 30 }) {
  const [completedFlows, setCompletedFlows] = useState(new Set())
  const [currentMessage, setCurrentMessage] = useState(welcomeMessage)
  const [showGuide, setShowGuide] = useState(true)
  const { displayed, done } = useTypewriter(currentMessage, typewriterSpeed)

  const handleFlowComplete = useCallback(
    (flowName) => {
      setCompletedFlows((prev) => {
        const next = new Set(prev)
        next.add(flowName)
        return next
      })
      if (flowMessages[flowName]) {
        setCurrentMessage(flowMessages[flowName])
      }
    },
    [flowMessages]
  )

  const allDone = completedFlows.size >= totalFlows

  return {
    displayed,
    done,
    showGuide,
    setShowGuide,
    completedFlows,
    handleFlowComplete,
    allDone,
  }
}

/** Page chrome for interactive story demos: back link, guide card, flow launcher buttons (Amendments pattern). */
export function CaseStudyDemoShell({
  backTo,
  displayed,
  done,
  showGuide,
  setShowGuide,
  completedFlows,
  allDone,
  flows = [],
  onLaunchFlow = () => {},
  allDoneFooter,
  /** When true, skip the avatar + typewriter card (e.g. insurance uses in-demo coach instead). */
  hideGuideCard = false,
  children,
}) {
  const showFlowButtons = flows.length > 0
  return (
    <section className="relative z-20 -mt-12 min-h-screen bg-slate-50" style={{ isolation: 'isolate' }}>
      <div className="relative z-10 pb-6 pt-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <span aria-hidden>←</span>
            Back to story
          </Link>
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        {showGuide && !hideGuideCard && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6">
            <div className="flex items-start gap-4">
              <div className="shrink-0">
                <JoelAvatar className="ring-1 ring-slate-200/80" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed text-slate-700">
                  {displayed}
                  {!done && (
                    <span className="ml-0.5 inline-block h-[14px] w-[2px] animate-pulse bg-slate-400 align-text-bottom" />
                  )}
                </p>

                {showFlowButtons && (done || completedFlows.size > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {flows.map(({ id, emoji, label, subtitle }) => {
                      const complete = completedFlows.has(id)
                      return (
                        <button
                          key={id}
                          type="button"
                          onClick={() => onLaunchFlow(id)}
                          className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                            complete
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                              : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span aria-hidden>{emoji}</span>
                          {label}
                          {subtitle != null && subtitle !== '' && (
                            <span className="hidden text-xs text-slate-400 sm:inline">— {subtitle}</span>
                          )}
                          {complete && <span className="text-emerald-500" aria-hidden>✓</span>}
                        </button>
                      )
                    })}
                  </div>
                )}

                {allDone && done && <div className="mt-3 text-xs text-slate-500">{allDoneFooter}</div>}
              </div>

              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="shrink-0 rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
                aria-label="Dismiss guide"
              >
                <span className="text-lg leading-none">×</span>
              </button>
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
