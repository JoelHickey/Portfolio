import { useEffect, useState, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AmendmentsFlowDemo from '../amendments/AmendmentsFlowDemo'

const WELCOME_MESSAGE = "Hey — I built three versions of this flow to show how the experience evolved. Pick one to jump in."

const FLOW_MESSAGES = {
  turtle: "That was the legacy flow — 9 screens, 13+ clicks. Now try Rabbit to see what shipped.",
  rabbit: "That's the redesigned flow — 3 screens, 6 clicks. Try Dream to see where it could go next.",
  dream: "That's the AI concept — no screens, just conversation. Try Turtle to feel the original pain.",
}

function useTypewriter(text, speed = 30) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    setDisplayed('')
    setDone(false)
    if (!text) return
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

function AmendmentsDemo() {
  const navigate = useNavigate()
  const demoRef = useRef(null)
  const [completedFlows, setCompletedFlows] = useState(new Set())
  const [currentMessage, setCurrentMessage] = useState(WELCOME_MESSAGE)
  const [showGuide, setShowGuide] = useState(true)
  const { displayed, done } = useTypewriter(currentMessage)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const handleFlowComplete = useCallback((flowName) => {
    setCompletedFlows(prev => {
      const next = new Set(prev)
      next.add(flowName)
      return next
    })
    if (FLOW_MESSAGES[flowName]) {
      setCurrentMessage(FLOW_MESSAGES[flowName])
    }
  }, [])

  const launchFlow = (flowName) => {
    if (!demoRef.current) return
    if (flowName === 'turtle') demoRef.current.startOldFlow()
    else if (flowName === 'rabbit') demoRef.current.startAmendmentFlow()
    else if (flowName === 'dream') demoRef.current.startDreamFlow()
  }

  const allDone = completedFlows.size >= 3

  return (
    <section className="relative z-20 -mt-12 min-h-screen bg-slate-50" style={{ isolation: 'isolate' }}>
      <div className="relative z-10 pb-6 pt-12">
        <div className="mx-auto w-full max-w-6xl px-6">
          <Link
            to="/stories/amendments"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            <span aria-hidden>←</span>
            Back to story
          </Link>
        </div>
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16">
        {showGuide && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white px-5 py-5 shadow-sm sm:px-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  JH
                </div>
              </div>
              <div className="min-w-0 flex-1">
                {/* Typewriter message */}
                <p className="text-sm text-slate-700 leading-relaxed">
                  {displayed}
                  {!done && <span className="ml-0.5 inline-block w-[2px] h-[14px] bg-slate-400 align-text-bottom animate-pulse" />}
                </p>

                {/* Flow buttons — show after typing finishes or if a flow completed */}
                {(done || completedFlows.size > 0) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => launchFlow('turtle')}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                        completedFlows.has('turtle')
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span aria-hidden>🐢</span>
                      Turtle
                      <span className="hidden text-xs text-slate-400 sm:inline">— legacy</span>
                      {completedFlows.has('turtle') && <span className="text-emerald-500" aria-hidden>✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => launchFlow('rabbit')}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                        completedFlows.has('rabbit')
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span aria-hidden>🐰</span>
                      Rabbit
                      <span className="hidden text-xs text-slate-400 sm:inline">— redesigned</span>
                      {completedFlows.has('rabbit') && <span className="text-emerald-500" aria-hidden>✓</span>}
                    </button>
                    <button
                      type="button"
                      onClick={() => launchFlow('dream')}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-medium transition ${
                        completedFlows.has('dream')
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <span aria-hidden>🚀</span>
                      Dream
                      <span className="hidden text-xs text-slate-400 sm:inline">— AI concept</span>
                      {completedFlows.has('dream') && <span className="text-emerald-500" aria-hidden>✓</span>}
                    </button>
                  </div>
                )}

                {allDone && done && (
                  <p className="mt-3 text-xs text-slate-500">
                    You've tried all three — that's the full evolution from legacy to vision.{' '}
                    <Link to="/stories/amendments" className="font-medium text-slate-700 underline hover:text-slate-900">
                      Back to the case study
                    </Link>
                  </p>
                )}
              </div>

              {/* Dismiss */}
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
        <AmendmentsFlowDemo
          ref={demoRef}
          embedded
          onBackToCaseStudy={() => navigate('/stories/amendments')}
          onClose={() => navigate('/stories/amendments')}
          onFlowComplete={handleFlowComplete}
        />
      </div>
    </section>
  )
}

export default AmendmentsDemo
