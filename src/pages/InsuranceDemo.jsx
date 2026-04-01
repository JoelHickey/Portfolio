import { useEffect, useRef, useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InsuranceFlowDemo from '../insurance/InsuranceFlowDemo'
import { CaseStudyDemoShell, useCaseStudyDemoGuide } from '../components/CaseStudyDemoShell'
import { DemoCoachTour } from '../components/DemoCoachTour'

/** Spotlight tour — `rememberDismiss={false}` + remount on replay so it shows every visit / on demand. */
const INSURANCE_SPOTLIGHT_TOUR_STEPS = [
  {
    title: 'Two flows',
    body: 'Hi — here are two flows to show how insurance-on-booking evolved: Before is legacy (Helio manual line, Cover-More tab, re-keying, then checkout before coverage lands — the friction the redesign removed). After is Travel Connect. Click Add insurance on the Legacy card to try Before.',
    selector: '[data-insurance-demo-tour="legacy-flow"]',
  },
  {
    title: 'Travel Connect',
    body: 'Hi — After is this side: linked tab, search and tiers in Travel Connect, a success beat, then Helio with the quote on the booking. Click Add insurance on the Travel Connect card to try it — or Before if you want the contrast.',
    selector: '[data-insurance-demo-tour="travel-connect-flow"]',
  },
]

const WELCOME_MESSAGE =
  'Hi — here are two flows: Before (legacy Helio + Cover-More) and After (Travel Connect). Click Add insurance on either card to start.'

const FLOW_MESSAGES = {
  before:
    "That was the legacy path — modal, Cover-More, re-keying, then checkout before coverage shows. Try After next for Travel Connect if you haven't; the contrast is the point.",
  after:
    "That was Travel Connect — search, tiers, confirmation, then Helio with coverage on the booking. Try Before if you'd like to compare.",
}

const NO_COMPLETED_FLOWS = new Set()

function InsuranceDemo() {
  const navigate = useNavigate()
  const demoRef = useRef(null)
  /** Start after paint so `[data-insurance-demo-tour]` nodes exist for the first spotlight step. */
  const [spotlightActive, setSpotlightActive] = useState(false)
  const [spotlightMountId, setSpotlightMountId] = useState(0)
  const { handleFlowComplete } = useCaseStudyDemoGuide({
    welcomeMessage: WELCOME_MESSAGE,
    flowMessages: FLOW_MESSAGES,
    totalFlows: 2,
    typewriterSpeed: 28,
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
      backTo="/stories/insurance"
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
      <InsuranceFlowDemo
        ref={demoRef}
        embedded
        spotlightTourActive={spotlightActive}
        onBackToCaseStudy={() => navigate('/stories/insurance')}
        onClose={() => navigate('/stories/insurance')}
        onFlowComplete={handleFlowComplete}
        onFlowBegin={hideSpotlight}
      />
    </CaseStudyDemoShell>

    <DemoCoachTour
      key={spotlightMountId}
      active={spotlightActive}
      steps={INSURANCE_SPOTLIGHT_TOUR_STEPS}
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

export default InsuranceDemo
