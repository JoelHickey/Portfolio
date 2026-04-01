import { useEffect } from 'react'

function About() {
  useEffect(() => { document.title = 'About — Joel Hickey' }, [])

  return (
    <section className="relative z-10 flex flex-col" aria-labelledby="about-heading">
      <div
        className="relative flex w-full flex-col justify-start overflow-hidden px-6 pt-24 pb-2 sm:px-12 md:px-20 md:pt-32 lg:px-24"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <div className="flex max-w-full flex-col items-start leading-none">
            <h1 id="about-heading" className="m-0 text-5xl font-bold tracking-wide bg-clip-text text-transparent md:text-6xl lg:text-7xl" style={{ background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              About
            </h1>
            <p className="mt-4 text-base font-extralight tracking-wider text-white md:text-lg">
              Senior Product Designer — complex B2B platforms, end-to-end delivery, AI workflows.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-6 pt-12 pb-20 sm:px-12 md:px-20 md:pt-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8 text-sm leading-relaxed text-slate-300">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Summary</h2>
                <p className="mt-3 font-light tracking-wide">
                  Product designer who ships end-to-end — and builds AI workflows that make design teams faster.
                  I connect business goals to user needs through strategy, systems thinking, and hands-on design,
                  while using AI tools to speed up real design and development work.
                  Background across enterprise travel platforms, comparison marketplaces, and logistics SaaS,
                  with measurable revenue and efficiency impact at each.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Experience</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="font-normal text-white">
                      Flight Centre Travel Group — Senior UI/UX Designer · 2021–2025
                    </p>
                    <p className="text-xs font-light tracking-wide text-slate-400">3,000+ daily platform users · B2B travel booking and servicing</p>
                    <ul className="list-disc space-y-1.5 pl-5 font-light tracking-wide text-slate-300">
                      <li>
                        Redesigned a high-friction amendment flow that forced consultants through multiple screens
                        and manual steps, cutting average handling time from 8–12 minutes to 2–3 minutes.
                      </li>
                      <li>
                        Wove insurance coverage into the travel booking journey, removing context switching and
                        manual calculations — improving attachment rates by 45% and reducing add time to 30 seconds.
                      </li>
                      <li>
                        Built a one-click connection between CRM and booking systems, saving 45 seconds per customer lookup for 3,000+ staff.
                      </li>
                      <li>
                        Redesigned core workflows in Helio, the daily platform for 3,000+ travel consultants — from discovery through launch and optimisation.
                      </li>
                      <li>Recognised: FCTG Global Lisbon selectee (2024); Buzz Night award winner (2022, 2023).</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-normal text-white">Canstar — Lead UI/UX Designer · 2019–2020</p>
                    <p className="text-xs font-light tracking-wide text-slate-400">Financial comparison marketplace · home loans, credit cards, insurance</p>
                    <ul className="list-disc space-y-1.5 pl-5 font-light tracking-wide text-slate-300">
                      <li>
                        Redesigned consumer-facing comparison pages and built a new internal platform that replaced manual workflows.
                      </li>
                      <li>
                        Moved the team to Figma, created a shared component library, and set up clear design-to-dev processes.
                      </li>
                      <li>
                        Introduced usability testing, ran stakeholder workshops, and prioritised UX improvements across product areas.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-normal text-white">Temando — UI/UX Designer · 2015–2019</p>
                    <p className="text-xs font-light tracking-wide text-slate-400">Logistics SaaS · shipping tools for Magento merchants</p>
                    <ul className="list-disc space-y-1.5 pl-5 font-light tracking-wide text-slate-300">
                      <li>
                        Designed bulk shipping workflows for Magento merchants, making it faster to process and dispatch large order volumes.
                      </li>
                      <li>Delivered end-to-end design proposals for clients including Nike, Myer, and ASOS.</li>
                      <li>Founded a UX guild and created shared design frameworks so teams could work together more consistently.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Tools</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-light tracking-wide text-slate-300">
                  {[
                    'Figma',
                    'Cursor (AI-native IDE)',
                    'Claude / ChatGPT',
                    'React / Tailwind CSS',
                    'GitHub',
                    'Miro',
                    'FullStory',
                    'Confluence'
                  ].map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Skills</h3>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm font-light tracking-wide text-slate-300">
                  {[
                    'AI Design Workflows',
                    'Design Systems',
                    'Prototyping',
                    'Usability Testing',
                    'Research & Synthesis',
                    'UX Strategy',
                    'Workshop Facilitation',
                    'Accessibility'
                  ].map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Education</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm font-light tracking-wide text-slate-300">
                  <li>Master of Interactive Media — Queensland College of Art (2015–2016)</li>
                  <li>Bachelor of Audio Engineering & Sound Production — JMC Academy (2011–2013)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>Location</h3>
                <p className="mt-3 text-sm font-light tracking-wide text-slate-300">Brisbane, AU · available for contract · open to remote</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest bg-clip-text text-transparent" style={{ background: 'linear-gradient(90deg, #0891b2, #7c3aed)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>CV</h3>
                <p className="mt-3 text-sm font-light tracking-wide text-slate-300">
                  <a
                    href="/joel-hickey-cv.pdf"
                    download="Joel-Hickey-CV.pdf"
                    className="text-cyan-400/90 underline decoration-cyan-500/40 underline-offset-2 transition hover:text-cyan-300 hover:decoration-cyan-400/60"
                  >
                    Download CV (PDF)
                  </a>
                  <span className="text-slate-500"> · </span>
                  <a
                    href="/cv.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 underline decoration-slate-600/50 underline-offset-2 transition hover:text-slate-300"
                  >
                    HTML version
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
