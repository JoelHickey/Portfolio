function About() {

  return (
    <section className="relative z-10 flex flex-col">
      <div
        className="relative flex w-full flex-col justify-start overflow-hidden px-16 pt-24 pb-2 md:px-20 md:pt-32 lg:px-24"
        role="region"
        aria-labelledby="about-heading"
      >
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start text-left">
          <div className="flex max-w-full flex-col items-start leading-none">
            <h1 id="about-heading" className="m-0 text-5xl font-bold tracking-wide bg-clip-text text-transparent md:text-6xl lg:text-7xl" style={{ background: 'linear-gradient(90deg, #0891b2 0%, #0d9488 25%, #4f46e5 50%, #7c3aed 75%, #c026d3 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              About
            </h1>
            <p className="mt-4 text-base font-extralight tracking-wider text-slate-400 md:text-lg">
              Senior Product Designer targeting complex B2B workflows — discovery through measurement, with agentic AI built into the process.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-16 pt-12 pb-20 md:px-20 md:pt-14 lg:px-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-8 text-sm leading-relaxed text-slate-300">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Summary</h2>
                <p className="mt-3">
                  Product designer who ships end-to-end — and builds the AI workflows that make design teams faster.
                  I connect business goals to user needs through strategy, systems thinking, and human-centred craft,
                  while integrating agentic AI tools into real design and development practice.
                  Background across enterprise travel platforms, comparison marketplaces, and logistics SaaS,
                  with measurable revenue and efficiency impact at each.
                </p>
              </div>
              <div className="space-y-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Experience</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="font-semibold text-white">
                      Flight Centre Travel Group — Senior Product Designer · 2021–2025
                    </p>
                    <p className="text-xs text-slate-500">3,000+ daily platform users · B2B travel booking and servicing</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>
                        • Redesigned a high-friction amendment flow that forced consultants through multiple screens
                        and manual steps, cutting average handling time from 8–12 minutes to 2–3 minutes.
                      </li>
                      <li>
                        • Wove insurance coverage into the travel booking journey, removing context switching and
                        manual calculations — improving attachment rates by 45% and reducing add time to ~30 seconds.
                      </li>
                      <li>
                        • Led design across cross-functional squads from discovery through prototyping, launch,
                        and post-release optimisation for enterprise booking platforms.
                      </li>
                      <li>
                        • Designed and presented agentic AI workflows to 15+ designers and 200+ consultants,
                        demonstrating practical AI integration for design and development teams.
                      </li>
                      <li>• Recognised: FCTG Global Lisbon selectee (2024); Buzz Night award winner (2022, 2023).</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-white">Canstar — Lead UI/UX Designer · 2019–2020</p>
                    <p className="text-xs text-slate-500">Financial comparison marketplace · consumer + internal</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>
                        • Led the UX transformation of website verticals and delivered a new internal platform that
                        streamlined operations.
                      </li>
                      <li>
                        • Migrated design workflow to Figma and established a living UI repository and handoff standards,
                        reducing design-to-dev friction.
                      </li>
                      <li>
                        • Built a usability testing framework, ran stakeholder workshops, and delivered prioritised UX
                        improvements across customer product verticals.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-white">Temando — UI/UX Designer · 2015–2019</p>
                    <p className="text-xs text-slate-500">Logistics SaaS · merchant shipping tools for Magento</p>
                    <ul className="space-y-1.5 text-slate-400">
                      <li>
                        • Designed merchant workflows for Magento Shipping (bulk shipments), enabling faster dispatch
                        flows and measurably higher merchant throughput.
                      </li>
                      <li>• Developed end-to-end proposals and workflows for clients including Nike, Myer and ASOS.</li>
                      <li>• Founded a UX guild and documented design frameworks to scale cross-team collaboration.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Tools</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                  {[
                    'Figma',
                    'Cursor (AI-native IDE)',
                    'Claude / ChatGPT',
                    'Miro',
                    'FullStory',
                    'Confluence',
                    'GitHub Copilot',
                    'v0 / Bolt'
                  ].map((tool) => (
                    <li key={tool}>• {tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Skills</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-400">
                  {[
                    'Agentic AI Workflows',
                    'Design Systems',
                    'Prototyping',
                    'Usability Testing',
                    'Research & Synthesis',
                    'UX Strategy',
                    'AI-Augmented Design',
                    'Accessibility'
                  ].map((skill) => (
                    <li key={skill}>• {skill}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Education</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-400">
                  <li>• Master of Interactive Media — Queensland College of Art (2015–2016)</li>
                  <li>• Bachelor of Audio Engineering & Sound Production — JMC Academy (2011–2013)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500">Location</h3>
                <p className="mt-3 text-sm text-slate-400">Brisbane, AU · open to remote</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
