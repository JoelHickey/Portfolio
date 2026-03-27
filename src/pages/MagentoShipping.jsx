import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const gradientStyle = {
  background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

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
            src="/portfolio-slideshow/magento-batch.png"
            alt="Magento Shipping batch processing interface"
            className="h-full w-full object-cover object-center"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/25 via-black/35 to-black/80"
            aria-hidden="true"
          />
          <div className="absolute left-0 right-0 top-0 pt-12">
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
              <p className="font-semibold uppercase tracking-widest text-slate-400">Role</p>
              <p className="mt-0.5 font-medium text-slate-700">UI/UX Designer — end-to-end ownership from research to sprint delivery</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Domain</p>
              <p className="mt-0.5 font-medium text-slate-700">E-commerce SaaS — merchant shipping tools</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Team</p>
              <p className="mt-0.5 font-medium text-slate-700">PM, UX, remote engineering squad</p>
            </div>
            <div>
              <p className="font-semibold uppercase tracking-widest text-slate-400">Duration</p>
              <p className="mt-0.5 font-medium text-slate-700">~3 months, 2018</p>
            </div>
          </div>
        </div>
      </div>

      {/* TL;DR */}
      <div className="w-full bg-white border-b border-slate-100">
        <div className="mx-auto w-full max-w-6xl px-6 py-6">
          <div className="max-w-3xl space-y-2 text-sm text-slate-600">
            <p className="font-semibold uppercase tracking-widest text-slate-400 text-xs">Summary</p>
            <p className="leading-relaxed">Magento Shipping merchants could only process one order at a time — a bottleneck for anyone shipping in volume. I designed a batch processing workflow within the Magento 2 pattern library constraints, taking it from sketches and Sketch Cloud prototypes through in-house usability testing to sprint delivery with a remote engineering team.</p>
          </div>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROBLEM
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Problem</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Merchants using Magento Shipping could only process one order at a time through the OrderShip page — a long, complex screen that bundled every fulfillment option into a single vertical scroll. For merchants shipping dozens or hundreds of orders daily, the one-at-a-time constraint was a bottleneck that cost real time and revenue.
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

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Strategy</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Value for batch processing was already validated — the PM had spoken to onboarded merchants who confirmed the need. My first step was understanding how the existing OrderShip page worked end-to-end, then researching how competitors and Magento Partners approached bulk fulfillment.
          </p>

          <figure className="mt-12 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
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
            A key constraint: all designs had to follow the Magento 2 pattern library strictly — proposals that deviated from the style guide were consistently rejected by the platform team. Magento offered a wizard pattern, which aligned well with a multi-step fulfillment flow: select orders, assign packaging, get quotes, confirm and book.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Rather than scrolling through multiple "blocks" of information per order, the core design decision was to compress each order into a slim horizontal row — stacking rows so merchants could scan, configure, and book multiple orders on a single screen.
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          PROTOTYPING & TESTING
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Prototyping & testing</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I sketched and whiteboarded potential solutions, then created user flow diagrams to show the high-level UX before investing in detail. Multiple concept variations explored different approaches to order row density, inline editing, and step sequencing.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAGENTO_IMAGES.solutionSketches.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm"
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
            I developed the screens into clickable prototypes using Sketch Cloud, which let me share early with the development team for feedback before the sprint started. Developers flagged implementation risks — error handling edge cases and platform API constraints — and I adjusted the designs accordingly.
          </p>

          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            I also ran in-house usability tests with colleagues from different parts of the company to catch usability issues early. Quick iterations were made based on this feedback before development kicked off.
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

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Delivery</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            During the sprint, I worked in close communication with the remote development team — updating designs in real time, covering details that surfaced during build (error handling, edge cases around mixed domestic/international orders), and keeping a constant eye on UI fidelity.
          </p>
          <p className="mt-4 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            The Sketch Cloud prototype was the primary spec artifact — developers could inspect flows interactively rather than parsing static documents. Feedback rounds were fast: I'd update screens, share a new prototype link, and get dev responses within hours despite the remote setup.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {MAGENTO_IMAGES.solutionInDev.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={src}
                  alt={`Batch processing in development — screenshot ${index + 1}`}
                  className="w-full object-contain"
                />
                <figcaption className="px-4 py-2 text-sm text-slate-500">
                  Solution in development
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Balancing UI polish against sprint velocity was a constant trade-off — I focused on the interactions and patterns that directly affected merchant efficiency, deferring visual refinements that wouldn't block the release.
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          OUTCOME
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Outcome</h2>
          <p className="mt-8 max-w-2xl text-lg tracking-wide text-slate-600 leading-relaxed">
            Batch processing shipped at the end of the sprint and was iterated over the following months based on merchant feedback. The feature replaced a single-order bottleneck with a multi-order workflow that let merchants ship faster with fewer repetitive actions.
          </p>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl" style={gradientStyle}>Bulk</p>
              <p className="mt-2 text-sm text-slate-500">Multi-order processing — from one-at-a-time to batch</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl" style={gradientStyle}>1 screen</p>
              <p className="mt-2 text-sm text-slate-500">Scan, configure, and book orders without page switching</p>
            </div>
            <div>
              <p className="text-5xl font-semibold text-transparent md:text-6xl" style={gradientStyle}>Shipped</p>
              <p className="mt-2 text-sm text-slate-500">Live within Magento 2, iterated post-launch</p>
            </div>
          </div>

          <p className="mt-10 max-w-2xl text-xs text-slate-500">
            Note: this was an early-career project (2018) at Temando. Quantitative impact metrics were not systematically tracked at the time — outcomes are described qualitatively based on merchant feedback and feature adoption.
          </p>
        </div>
      </div>


      {/* ════════════════════════════════════════════════════════════════
          REFLECTION
          ════════════════════════════════════════════════════════════════ */}

      <div className="w-full bg-slate-50">
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
      <div className="w-full bg-white">
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
