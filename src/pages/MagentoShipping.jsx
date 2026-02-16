import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// Images from https://joelhickey.myportfolio.com/batch-processing-2 (Adobe Portfolio CDN)
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
    window.scrollTo(0, 0)
  }, [])

  return (
    <section className="flex flex-col">
      <div className="flex min-h-[calc(100vh-64px)] w-full items-start justify-center bg-white pb-28 -mt-12">
        <div className="mx-auto w-full max-w-6xl px-6 text-left">
          <div className="full-bleed mb-0">
            <div className="relative w-full h-[600px] overflow-hidden bg-slate-200">
              <img
                src="/portfolio-slideshow/magento-batch.png"
                alt="Magento Shipping batch processing"
                className="h-full w-full object-cover object-center"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/80"
                aria-hidden
              />
              <div className="absolute left-0 right-0 top-0 pt-12">
                <div className="mx-auto w-full max-w-6xl px-6">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-white/90 transition hover:text-white"
                  >
                    <span aria-hidden>←</span>
                    Back to Portfolio
                  </Link>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-stretch justify-end pb-16">
                <div className="mx-auto w-full max-w-6xl px-6 text-left text-white">
                  <p className="text-lg font-medium leading-snug sm:text-xl md:text-2xl">
                    Magento Shipping — Batch Processing
                  </p>
                  <p className="mt-3 text-sm text-white/90">
                    I was tasked with designing a streamlined order fulfillment process. Working agile with a remote team. Here is my journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative z-10 overflow-hidden pt-20">
            <h1 className="text-6xl font-semibold text-slate-900 md:text-7xl">
              Magento Shipping — Batch Processing
            </h1>
            <p className="mt-6 max-w-2xl text-base text-slate-600 leading-relaxed md:text-lg">
              Designing a streamlined order fulfillment process for Magento Shipping. Working agile with a remote team.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Quick Rundown</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Merchants using Magento Shipping were processing individual orders using a single page. This can be slow and detrimental to the user experience and efficiency of merchants who need to send out multiple orders to their customers quickly.
          </p>
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 leading-relaxed italic">
              I like to take a simple use case to explain the value of adding such a feature to Magento Shipping.
            </p>
            <p className="mt-4 text-slate-800 leading-relaxed">
              &ldquo;Taylor owns a small online store and sells mostly the same product (iPhone) through Magento. She often becomes frustrated as she can only process one order at a time currently. To improve her efficiency, she would like to assign packaging to items, get shipping quotes, and book orders on a line by line basis.&rdquo;
            </p>
          </div>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            So where did I begin?
          </p>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Understanding the context</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            There was a clear user need brought to me by the product manager who had held initial conversation with on-boarded merchants. Value for such a feature was already evident.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            I needed to understand how the merchant would go about their current process by putting myself in their shoes. Empathy was key.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            The current page used for processing is referred to as OrderShip. It provides value to a merchant placing single orders allowing for some customisation related to fulfillment.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            It&apos;s long — and is rather complex the way it is all tied together.
          </p>
          <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
            <img
              src={MAGENTO_IMAGES.orderShipComplex}
              alt="OrderShip page — long and complex, with multiple blocks of shipping information"
              className="w-full object-contain"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-500">
              OrderShip — the existing single-order page. Long and complex.
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Background exploration</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Diving into multiple competitors and Magento Partners, I was able to get an idea of how they were approaching such a solution, paying attention to UX patterns and their approach to UI.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            It was also important to understand how batch processing would affect other parts of Magento 2. For example, batch processing would rely heavily on Shipping Experiences (a rule system for Merchants of Magento Shipping). Understanding the IA and how everything fit together was paramount.
          </p>
          <figure className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img
              src={MAGENTO_IMAGES.backgroundExploration}
              alt="Background exploration — competitors, Magento Partners, and IA"
              className="w-full object-contain"
            />
            <figcaption className="px-4 py-3 text-sm text-slate-500">
              Understanding how batch processing fits into Magento 2 and Shipping Experiences.
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Working out a solution</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            I began sketching some potential solutions, whiteboarding and exploring these concepts further. I created some simple user flow charts, to show the potential UX at a high level. This would prevent me from investing my time in too much detail early on in the process.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            More detail could be added as I worked out a solution further. Magento offered a wizard in their UI and I thought this would be a good approach. It was important to pay close attention to Magento patterns, as designs would often be knocked back if we failed to stick to the style guide.
          </p>
          <p className="mt-4">
            <a
              href="https://devdocs.magento.com/guides/v2.2/pattern-library/navigation/wizard/wizard.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 font-medium underline decoration-slate-400 hover:decoration-slate-700"
            >
              Magento 2 wizard pattern (devdocs)
            </a>
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            I knew some requirements for the merchant would be to process orders quickly, on a single screen. Rather than scrolling down through multiple &ldquo;blocks&rdquo; of shipping information, the merchant could see all the information related to a single order in a slim horizontal block. These blocks could then be stacked on top of each other and data filled in quickly.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Here are a few different variations of the concept further along in the process.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAGENTO_IMAGES.solutionSketches.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
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
          <p className="mt-8 max-w-3xl text-lg text-slate-600 leading-relaxed">
            I was able to develop the screens into clickable, interactive prototypes using Sketch Cloud.{' '}
            <a
              href="https://sketch.cloud/s/YyoqM/a/vQ2xVb/play"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-700 font-medium underline decoration-slate-400 hover:decoration-slate-700"
            >
              Have a play!
            </a>
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            This helped demonstrate the potential feel and flow of the solution. Sending this early on to the developers before the sprint started helped to get essential feedback. They picked up on areas such as &ldquo;error handling&rdquo; and potential problems with my UI. Adjustments were made thanks to the feedback. I could also run early usability tests with the prototype making sure usability heuristics were being adhered to.
          </p>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Initial usability testing</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Before development had begun, I was able to run some in-house usability tests. This helped to provide initial feedback on the prototypes. User testing early with people from different areas of the company would help to identify potential flaws in the designs and pick up on elements of the design that may need to be improved. Quick iterations could be made based on early feedback.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Here is a look at some of the tests.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {MAGENTO_IMAGES.usabilityTesting.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
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

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">Solution under development</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            With a solid prototype, I was ready for development to begin. Prior to the planned sprint starting, the prototype was put in front of the developers for initial feedback. They were able to point out areas of the prototype UI which may be difficult to implement given the way our platform had been set up.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            During the sprint, I was in constant communication with the developers, updating the designs and covering details which may not have been realised initially (e.g. error handling).
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Keeping a constant eye on UI details which were often missed by the developers, and providing the team with clear updates helped the solution to move forward. Finding a balance between the business value of updates at this time and getting the product over the line was key.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {MAGENTO_IMAGES.solutionInDev.map((src, index) => (
              <figure
                key={src}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm"
              >
                <img
                  src={src}
                  alt={`Batch processing in development — screenshot ${index + 1}`}
                  className="w-full object-contain"
                />
                <figcaption className="px-4 py-2 text-sm text-slate-500">
                  Solution under development
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-6 py-28">
          <h2 className="text-4xl font-semibold text-slate-900 md:text-5xl">To wrap up</h2>
          <p className="mt-6 max-w-3xl text-lg text-slate-600 leading-relaxed">
            At the end of the sprint, the team had successfully implemented Batch Processing for Magento Shipping. The feature would be iterated over the next few months based on feedback from merchants. Additional components would be added (e.g. allowing International Shipments). Finding a neat way to incorporate a large amount of additional fields into the current solution proved to be a challenge.
          </p>
          <p className="mt-4 max-w-3xl text-lg text-slate-600 leading-relaxed">
            Batch processing continues to offer value to merchants and continues to be updated by Temando. In the end, the feature provided a way merchants could ship multiple orders quicker utilising a more pleasant experience.
          </p>
          <div className="mt-10">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              <span aria-hidden>←</span>
              Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MagentoShipping
