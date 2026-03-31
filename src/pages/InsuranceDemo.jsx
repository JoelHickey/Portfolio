import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InsuranceFlowDemo from '../insurance/InsuranceFlowDemo'
import { CaseStudyDemoShell, useCaseStudyDemoGuide } from '../components/CaseStudyDemoShell'

const FLOW_MESSAGES = {
  before:
    "That was the old path — Helio modal, Cover-More in another tab, then re-keying on the manual item before save. Now try After for Travel Connect (linked tab, less re-entry, saves back to the booking).",
  after:
    "That's Travel Connect — less tab-hopping and re-keying than the Cover-More loop, and the quote saves onto the booking. Try Before if you haven't; the contrast is the point.",
}

function InsuranceDemo() {
  const navigate = useNavigate()
  const demoRef = useRef(null)
  const { displayed, done, showGuide, setShowGuide, completedFlows, handleFlowComplete, allDone } =
    useCaseStudyDemoGuide({
      welcomeMessage: '',
      flowMessages: FLOW_MESSAGES,
      totalFlows: 2,
      typewriterSpeed: 28,
    })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <CaseStudyDemoShell
      backTo="/stories/insurance"
      displayed={displayed}
      done={done}
      showGuide={showGuide}
      setShowGuide={setShowGuide}
      completedFlows={completedFlows}
      allDone={allDone}
      hideGuideCard
      allDoneFooter={
        <>
          You&apos;ve tried both — that&apos;s the full before and after.{' '}
          <Link
            to="/stories/insurance"
            className="font-medium text-slate-700 underline hover:text-slate-900"
          >
            Back to the case study
          </Link>
        </>
      }
    >
      {showGuide && (completedFlows.size > 0 || allDone) && (
        <div className="relative mb-6 rounded-xl border border-slate-200 bg-white px-5 py-4 pr-10 shadow-sm">
          <button
            type="button"
            onClick={() => setShowGuide(false)}
            className="absolute right-3 top-3 rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            aria-label="Dismiss message"
          >
            <span className="text-lg leading-none">×</span>
          </button>
          <p className="text-sm leading-relaxed text-slate-700">
            {displayed}
            {!done && (
              <span className="ml-0.5 inline-block h-[14px] w-[2px] animate-pulse bg-slate-400 align-text-bottom" />
            )}
          </p>
          {allDone && done && <div className="mt-3 text-xs text-slate-500">{allDoneFooter}</div>}
        </div>
      )}
      <InsuranceFlowDemo
        ref={demoRef}
        embedded
        onBackToCaseStudy={() => navigate('/stories/insurance')}
        onClose={() => navigate('/stories/insurance')}
        onFlowComplete={handleFlowComplete}
      />
    </CaseStudyDemoShell>
  )
}

export default InsuranceDemo
