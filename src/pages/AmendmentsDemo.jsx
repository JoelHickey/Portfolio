import { useEffect, useRef, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AmendmentsFlowDemo from '../amendments/AmendmentsFlowDemo'
import { CaseStudyDemoShell, useCaseStudyDemoGuide } from '../components/CaseStudyDemoShell'

const WELCOME_MESSAGE =
  'Hey — I built three versions of this flow to show how the experience evolved. Pick one to jump in.'

const FLOW_MESSAGES = {
  turtle: "That was the legacy flow — 9 screens, 13+ clicks. Now try Rabbit to see what shipped.",
  rabbit: "That's the redesigned flow — 3 screens, 6 clicks. Try Dream to see where it could go next.",
  dream: "That's the AI concept — no screens, just conversation. Try Turtle to feel the original pain.",
}

const FLOWS = [
  { id: 'turtle', emoji: '🐢', label: 'Turtle', subtitle: 'legacy' },
  { id: 'rabbit', emoji: '🐰', label: 'Rabbit', subtitle: 'redesigned' },
  { id: 'dream', emoji: '🚀', label: 'Dream', subtitle: 'AI concept' },
]

function AmendmentsDemo() {
  const navigate = useNavigate()
  const demoRef = useRef(null)
  const { displayed, done, showGuide, setShowGuide, completedFlows, handleFlowComplete, allDone } =
    useCaseStudyDemoGuide({
      welcomeMessage: WELCOME_MESSAGE,
      flowMessages: FLOW_MESSAGES,
      totalFlows: 3,
      typewriterSpeed: 30,
    })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const launchFlow = useCallback((flowName) => {
    if (!demoRef.current) return
    if (flowName === 'turtle') demoRef.current.startOldFlow()
    else if (flowName === 'rabbit') demoRef.current.startAmendmentFlow()
    else if (flowName === 'dream') demoRef.current.startDreamFlow()
  }, [])

  return (
    <CaseStudyDemoShell
      backTo="/stories/amendments"
      displayed={displayed}
      done={done}
      showGuide={showGuide}
      setShowGuide={setShowGuide}
      completedFlows={completedFlows}
      allDone={allDone}
      flows={FLOWS}
      onLaunchFlow={launchFlow}
      allDoneFooter={
        <>
          You&apos;ve tried all three — that&apos;s the full evolution from legacy to vision.{' '}
          <Link
            to="/stories/amendments"
            className="font-medium text-slate-700 underline hover:text-slate-900"
          >
            Back to the case study
          </Link>
        </>
      }
    >
      <AmendmentsFlowDemo
        ref={demoRef}
        embedded
        onBackToCaseStudy={() => navigate('/stories/amendments')}
        onClose={() => navigate('/stories/amendments')}
        onFlowComplete={handleFlowComplete}
      />
    </CaseStudyDemoShell>
  )
}

export default AmendmentsDemo
