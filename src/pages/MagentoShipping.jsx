import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyNav from '../components/CaseStudyNav'

const MAGENTO_IMAGES = {
  orderShipComplex:
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/9d67432a-03a0-47b2-8f82-dfac64d7dc9e_rw_1200.png?h=dbd0c232c5df8334d0333dfb68c1102d',
  backgroundExploration:
    'https://pro2-bar-s3-cdn-cf3.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/41d02d9a-8c19-4b7c-aee2-91242cc54a65_rw_1200.png?h=334906dff28b6812322116284a6f172c',
  solutionSketches: [
    'https://pro2-bar-s3-cdn-cf.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/8f57343c-350a-4470-bae1-76720a031c48_rw_1200.jpg?h=d742a15c77dd12fce2e3724a7dc59e98',
    'https://pro2-bar-s3-cdn-cf6.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/0c6b435f-cf3f-4133-868b-c2cdce6118ff_rw_1200.png?h=6e4e68aa0b3961e299553aab415900f5',
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/9f2d5629-b2de-48cc-b3c1-aa2651531ac0_rw_1200.png?h=66b1be81d42b5bfad87c484406d0af1d',
    'https://pro2-bar-s3-cdn-cf.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/17529ceb-3b98-4f2f-a149-bf826b9c2728_rw_1200.png?h=2b08b0c3c748d63dd9d47eb9e68448c7',
    'https://pro2-bar-s3-cdn-cf.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/b9cebe9e-3fc7-42ff-af4c-dfd56d8acde8_rw_1200.png?h=654dabdd28b4eefe7397ee16672bd532'
  ],
  usabilityTesting: [
    'https://pro2-bar-s3-cdn-cf2.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/dc5980c6-827c-475e-91ab-787db8a475a1_rw_1200.png?h=22ee77ee87d53af43615ae38bb45a75c',
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/90ebaf6f-eb56-4281-88dd-a568757920c9_rw_1200.png?h=e8085c77cabcdd599733b5d555ea4ad5'
  ],
  solutionInDev: [
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/c68d1655-dfca-4b08-9688-a1d9d9973b26_rw_1200.png?h=bb83a73b72e3830897018a536f49f305',
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/cdd63dc3-7d1c-48eb-bd54-8d86af50ecea_rw_1200.png?h=3807ebc75ba48815f5bb6488245fcdcf',
    'https://pro2-bar-s3-cdn-cf4.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/f94b654d-935f-4ee4-81c8-4d6a607fd194_rw_1200.png?h=4a44a920d4a52c57ceca67543ef98461',
    'https://pro2-bar-s3-cdn-cf1.myportfolio.com/52e0116a-ff98-4f4f-9856-b55b86f4cec6/9c56fd20-7085-45a9-b556-8772f0a81607_rw_1200.png?h=1386000d0f2c973098edf20a980261da'
  ]
}

function MagentoShipping() {
  useEffect(() => {
    document.title = 'Magento Shipping Case Study — Joel Hickey'
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col" aria-label="Magento Shipping case study">

      {/* ════════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════════ */}
      <div className="w-full -mt-12">
        <div className="relative w-full h-[400px] sm:h-[480px] md:h-[560px] lg:h-[600px] overflow-hidden bg-slate-200">
          <img
            src="/images/magento-shipping-hero.png"
            alt="Stacked shipping boxes ready for fulfillment"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-0 pt-20">
            <div className="mx-auto w-full max-w-6xl px-6">
              <Link
                to="/stories"
                className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-black/45 hover:text-white"
              >
                <span aria-hidden="true">←</span>
                Back to Stories
              </Link>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-16">
            <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
              <h1 className="text-4xl font-bold tracking-wide leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Ship more, click less.
              </h1>
              <p className="mt-3 max-w-2xl font-extralight tracking-wider text-white/90 text-xl md:text-2xl">
                Designing batch order fulfillment for Magento merchants — from one-at-a-time to bulk processing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Slim metadata bar */}
      <div className="w-full bg-slate-50 border-b border-slate-200">
        <div className="mx-auto w-full max-w-6xl px-6 py-5">
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-xs">
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">UI/UX Designer — end-to-end ownership</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Context</p>
              <p className="mt-0.5 font-medium text-slate-700">E-commerce SaaS — merchant shipping tools</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">3 months, 2018</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-500">Tools</p>
              <p className="mt-0.5 font-medium text-slate-700">Sketch, Sketch Cloud, Magento 2 pattern library</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Results */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-10">
          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-4xl font-semibold text-slate-900">Bulk</p>
              <p className="mt-2 text-sm text-slate-500">Multi-order processing — from one-at-a-time to batch</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900">1 screen</p>
              <p className="mt-2 text-sm text-slate-500">Scan, configure, and book orders without page switching</p>
            </div>
            <div>
              <p className="text-4xl font-semibold text-slate-900">Shipped</p>
              <p className="mt-2 text-sm text-slate-500">Live within Magento 2, iterated post-launch</p>
            </div>
          </div>
        </div>
      </div>

      <CaseStudyNav
        sections={[
          { id: 'ms-problem', label: 'Problem' },
          { id: 'ms-strategy', label: 'Strategy' },
          { id: 'ms-design', label: 'Design' },
          { id: 'ms-delivery', label: 'Delivery' },
          { id: 'ms-outcome', label: 'Outcome' },
          { id: 'ms-reflection', label: 'Reflection' },
        ]}
      />


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-problem" className="scroll-mt-20 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Magento Shipping merchants could only process one order at a time — a long, complex screen that bundled every fulfillment option into a single vertical scroll. I designed a batch processing workflow within the Magento 2 pattern library constraints, taking it from sketches through usability testing to sprint delivery with a remote engineering team.
          </p>

          <blockquote className="mt-10">
            <p className="text-base italic text-slate-700 md:text-lg leading-relaxed">
              "Taylor owns a small online store and sells mostly the same product through Magento. She often becomes frustrated as she can only process one order at a time — to improve her efficiency, she needs to assign packaging, get quotes, and book orders in bulk."
            </p>
            <footer className="mt-3 text-sm font-medium text-slate-500">— User scenario, product brief</footer>
          </blockquote>

          <figure className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={MAGENTO_IMAGES.orderShipComplex}
              alt="OrderShip page — long and complex, with multiple blocks of shipping information"
              className="w-full object-contain"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-500">
              OrderShip — the existing single-order page. Long, complex, and repeated per order.
            </figcaption>
          </figure>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          STRATEGY
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-strategy" className="scroll-mt-20 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Batch value was already validated — the PM had merchant confirmation. I mapped the existing OrderShip flow end-to-end, then researched how competitors and Magento Partners handled bulk fulfillment.
          </p>

          <figure className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
            <img
              src={MAGENTO_IMAGES.backgroundExploration}
              alt="Background exploration — competitors, Magento Partners, and IA mapping"
              className="w-full object-contain"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-500">
              Competitor analysis and information architecture — understanding how batch fits into Magento 2.
            </figcaption>
          </figure>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            A key constraint: all designs had to follow the Magento 2 pattern library strictly — proposals that broke the style guide were rejected. The platform's wizard pattern aligned well with a multi-step fulfillment flow: select orders, assign packaging, get quotes, confirm and book. The core design decision was compressing each order into a slim horizontal row so merchants could scan, configure, and book multiple orders on a single screen.
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROTOTYPING & TESTING
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-design" className="scroll-mt-20 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Prototyping & testing</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I sketched and whiteboarded potential solutions, then created user flow diagrams to show the high-level UX before investing in detail. Multiple concept variations explored different approaches to order row density, inline editing, and step sequencing.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAGENTO_IMAGES.solutionSketches.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={src}
                  alt={`Concept variation ${index + 1} — batch processing UI`}
                  className="w-full object-contain"
                />
                <figcaption className="px-4 py-2 text-xs text-slate-500">
                  Concept variation {index + 1}
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Sketch Cloud prototypes let me share flows with developers before the sprint started — they flagged implementation risks (error handling, platform API constraints) and I adjusted designs before build began. I also ran in-house usability tests to catch interaction issues early.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {MAGENTO_IMAGES.usabilityTesting.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={src}
                  alt={`Usability test ${index + 1} — in-house testing`}
                  className="w-full object-contain"
                />
                <figcaption className="px-4 py-2 text-sm text-slate-500">
                  In-house usability testing
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          DELIVERY
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-delivery" className="scroll-mt-20 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            During the sprint I worked closely with the remote development team — updating designs in real time as edge cases surfaced (mixed domestic/international orders, error states). The Sketch Cloud prototype served as the primary spec: developers inspected flows interactively rather than parsing static documents, and feedback rounds completed within hours.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {MAGENTO_IMAGES.solutionInDev.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                <img
                  src={src}
                  alt={`Magento batch order processing flow — step ${index + 1} of ${MAGENTO_IMAGES.solutionInDev.length}: origin selection, order confirmation, and booking preparation`}
                  className="w-full object-contain"
                />
                <figcaption className="px-4 py-2 text-sm text-slate-500">
                  Solution in development
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-outcome" className="scroll-mt-20 w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Batch processing shipped at the end of the sprint and was iterated over the following months based on merchant feedback. The feature replaced a single-order bottleneck with a multi-order workflow that let merchants ship faster with fewer repetitive actions.
          </p>
          <p className="mt-4 max-w-2xl text-xs text-slate-500">
            Note: this was an early-career project (2018) at Temando. Quantitative impact metrics were not systematically tracked — outcomes are described qualitatively based on merchant feedback and feature adoption.
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          REFLECTION
          ════════════════════════════════════════════════════════════════ */}

      <div id="ms-reflection" className="scroll-mt-20 w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Reflection</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            This was one of my earlier end-to-end design projects, and the lessons shaped how I work today.
          </p>

          <div className="mt-10 max-w-2xl space-y-6 text-sm text-slate-600">
            <div className="border-l-2 border-emerald-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Platform constraints force sharper design decisions</p>
              <p className="mt-1">The Magento 2 pattern library wasn't negotiable — designs that broke the style guide were rejected. Working within those guardrails taught me to solve problems with interaction patterns and information architecture rather than custom UI.</p>
            </div>
            <div className="border-l-2 border-amber-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Early developer feedback prevents rework</p>
              <p className="mt-1">Sharing the Sketch Cloud prototype with developers before the sprint started surfaced implementation risks early. Adjustments were cheap at that stage — and the build went smoother because of it.</p>
            </div>
            <div className="border-l-2 border-sky-400 pl-4 py-1.5 leading-relaxed">
              <p className="font-semibold text-slate-800">Subsequent complexity was harder than the first feature</p>
              <p className="mt-1">Adding international shipment support later proved challenging — incorporating a large set of additional fields into the existing row-based layout required rethinking the information density model. The initial design worked, but extensibility needed more upfront thought.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer navigation ── */}
      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <Link to="/stories" className="text-sm text-slate-500 transition hover:text-slate-900">
            ← All stories
          </Link>
        </div>
      </div>
    </section>
  )
}

export default MagentoShipping
