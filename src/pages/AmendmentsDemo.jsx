import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AmendmentsFlowDemo from '../amendments/AmendmentsFlowDemo'

function AmendmentsDemo() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
        <AmendmentsFlowDemo
          embedded
          onBackToCaseStudy={() => navigate('/stories/amendments')}
          onClose={() => navigate('/stories/amendments')}
        />
      </div>
    </section>
  )
}

export default AmendmentsDemo
