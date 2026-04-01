import { useEffect, useRef, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AmendmentsFlowDemo from '../amendments/AmendmentsFlowDemo'
import { CaseStudyDemoShell, useCaseStudyDemoGuide } from '../components/CaseStudyDemoShell'
import { DemoCoachTour } from '../components/DemoCoachTour'

/** Spotlight tour — `rememberDismiss={false}` + remount on replay so it shows every visit / on demand. */
const AMENDMENTS_SPOTLIGHT_TOUR_STEPS = [
  {
    title: 'Three flows',
    body: 'Hi — here are three flows to show how the amend experience evolved: Turtle (legacy screens), Rabbit (the shipped redesign), and Dream (AI concept). Click the ⋮ on the hotel card to pick one.',
    selector: '[data-amendments-demo-tour="card-actions"]',
  },
]

const WELCOME_MESSAGE =
  'Hi — here are three flows to show how the amend experience evolved. Use the ⋮ on the hotel card to try Turtle, Rabbit, or Dream.'

const FLOW_MESSAGES = {
  turtle: "That was the legacy flow — 9 screens, 13+ clicks. Now try Rabbit to see what shipped.",
  rabbit: "That's the redesigned flow — 3 screens, 6 clicks. Try Dream to see where it could go next.",
  dream: "That's the AI concept — no screens, just conversation. Try Turtle to feel the original pain.",
}

const NO_COMPLETED_FLOWS = new Set()

function AmendmentsDemo() {
  const navigate = useNavigate()
  const demoRef = useRef(null)
  /** Start after paint so `[data-amendments-demo-tour]` nodes exist for the first spotlight step. */
  const [spotlightActive, setSpotlightActive] = useState(false)
  const [spotlightMountId, setSpotlightMountId] = useState(0)
  const { handleFlowComplete } = useCaseStudyDemoGuide({
    welcomeMessage: WELCOME_MESSAGE,
    flowMessages: FLOW_MESSAGES,
    totalFlows: 3,
    typewriterSpeed: 30,
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let cancelled = false
    const start = () => {
      if (!cancelled) setSpotlightActive(true)
    }
    const id = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(start)
    })
    return () => {
      cancelled = true
      window.cancelAnimationFrame(id)
    }
  }, [])

  const hideSpotlight = useCallback(() => setSpotlightActive(false), [])

  const replaySpotlight = useCallback(() => {
    setSpotlightMountId((id) => id + 1)
    setSpotlightActive(true)
  }, [])

  return (
    <>
      <CaseStudyDemoShell
        backTo="/stories/amendments"
        displayed=""
        done
        showGuide={false}
        setShowGuide={() => {}}
        completedFlows={NO_COMPLETED_FLOWS}
        allDone={false}
        flows={[]}
        hideGuideCard
        backLinkDisabled={spotlightActive}
        allDoneFooter={null}
      >
        <AmendmentsFlowDemo
          ref={demoRef}
          embedded
          spotlightTourActive={spotlightActive}
          onBackToCaseStudy={() => navigate('/stories/amendments')}
          onClose={() => navigate('/stories/amendments')}
          onFlowComplete={handleFlowComplete}
          onFlowBegin={hideSpotlight}
        />
      </CaseStudyDemoShell>

      <DemoCoachTour
        key={spotlightMountId}
        active={spotlightActive}
        steps={AMENDMENTS_SPOTLIGHT_TOUR_STEPS}
        rememberDismiss={false}
        showAvatar
        zClass="z-[500]"
        targetsClickableDuringTour={false}
        onDismiss={hideSpotlight}
      />

      {!spotlightActive && (
        <button
          type="button"
          onClick={replaySpotlight}
          className="fixed bottom-6 right-6 z-[250] rounded-full border border-slate-600 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-100 shadow-lg shadow-black/40 transition hover:border-slate-500 hover:bg-slate-800"
        >
          Replay spotlight tour
        </button>
      )}
    </>
  )
}

export default AmendmentsDemo
