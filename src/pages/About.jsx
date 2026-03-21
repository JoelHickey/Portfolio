import { useEffect } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { SiLinkedin, SiDribbble } from 'react-icons/si'
import ParticleBackground from '../components/ParticleBackground'

function About() {
  useEffect(() => {
    document.body.classList.add('home-sky')
    return () => document.body.classList.remove('home-sky')
  }, [])

  return (
    <section className="relative z-10 flex w-full flex-col">
      {/* Hero — same pattern as Stories */}
      <div
        className="relative flex min-h-[calc(100vh-64px)] w-full flex-col justify-center overflow-hidden px-6 py-12"
        role="region"
        aria-labelledby="about-heading"
      >
        <div className="pointer-events-none absolute inset-0 min-h-[calc(100vh-64px)]">
          <ParticleBackground variant="momentum" className="absolute inset-0 h-full w-full" />
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
          <div className="flex max-w-full flex-col items-center text-4xl font-medium leading-none sm:text-5xl md:text-6xl lg:text-7xl">
            <h1 id="about-heading" className="m-0">
              <span className="bg-[linear-gradient(90deg,#06b6d4_0%,#14b8a6_35%,#2dd4bf_65%,#5eead4_100%)] bg-clip-text text-transparent">
                About
              </span>
            </h1>
            <div
              className="mt-3 h-10 w-full max-w-md min-w-[16rem] sm:h-11 sm:max-w-lg md:h-14 md:max-w-xl"
              aria-hidden
            >
              <svg
                viewBox="0 0 420 72"
                className="mx-auto h-full w-full max-w-full text-cyan-400/70"
                preserveAspectRatio="xMidYMid meet"
              >
                <title>Sound wave</title>
                {[...Array(22)].map((_, i) => (
                  <circle
                    key={i}
                    cx={14 + i * 18}
                    cy={36}
                    r={4}
                    fill="currentColor"
                    className="stories-sound-dot"
                    style={{ animationDelay: `${i * 0.08}s` }}
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 pb-20">
        <div className="relative overflow-hidden rounded-xl border border-cyan-500/30 bg-cyan-950/20 shadow-xl backdrop-blur-sm transition-all duration-200 hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]">
          <div className="absolute inset-0 rounded-xl bg-cyan-950/20" aria-hidden />
          <div className="relative z-10 grid gap-8 rounded-xl p-8 lg:grid-cols-[1.2fr_2fr]">
            <div className="space-y-6">
              <div>
                <p className="text-lg font-semibold text-cyan-200">Joel Hickey</p>
                <p className="text-sm text-slate-300">Senior Product Designer</p>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <p>
                  <a href="tel:0421366486" className="text-cyan-200/90 transition-colors hover:text-cyan-400">
                    0421 366 486
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:joelhickeydesigns@gmail.com"
                    className="inline-flex items-center gap-1.5 text-cyan-200/90 transition-colors hover:text-cyan-400"
                  >
                    <HiOutlineMail size={16} />
                    <span>Email</span>
                  </a>
                </p>
                <p>
                  <a
                    href="https://www.linkedin.com/in/joel-hickey-493757138/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-200/90 transition-colors hover:text-cyan-400"
                  >
                    <SiLinkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </p>
                <p>
                  <a
                    href="https://dribbble.com/joelhickey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-200/90 transition-colors hover:text-cyan-400"
                  >
                    <SiDribbble size={18} />
                    <span>Dribbble</span>
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cyan-200">Tools &amp; Methods</h3>
                <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:grid-cols-2">
                  {[
                    'Figma',
                    'Miro',
                    'FullStory',
                    'Confluence',
                    'Design Systems',
                    'Prototyping',
                    'Usability Testing',
                    'Research & Synthesis',
                    'UX Strategy',
                    'Accessibility',
                    'Sound design for UI',
                    'AI Tools: Cursor, GitHub'
                  ].map((tool) => (
                    <li key={tool}>• {tool}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cyan-200">Education</h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-300">
                  <li>Master of Interactive Media — Queensland College of Art (2015-2016)</li>
                  <li>Bachelor of Audio Engineering &amp; Sound Production — JMC Academy (2011-2013)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-cyan-200">References</h3>
                <p className="mt-3 text-sm text-slate-300">References available on request</p>
              </div>
            </div>

            <div className="space-y-8 text-sm text-slate-300">
              <p>
                From an early age I developed a unique lens that blends art and design. With experience in interaction
                design, service design, and human-centred thinking, I move fast to deliver valuable, delightful,
                measurable solutions that feel effortless to use.
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-cyan-200">Experience</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-semibold text-cyan-200/95">
                      Flight Centre Travel Group — Senior UI/UX Designer · 2021-2025
                    </p>
                    <ul className="space-y-1">
                      <li>
                        Solved a high-friction amendment flow across travel booking components that forced consultants
                        through multiple screens and manual steps, lifting consultant productivity and cutting average
                        handling time from 8–12 minutes to 2–3 minutes.
                      </li>
                      <li>
                        Coverage woven into the travel journey to remove context switching and manual
                        calculations, improving attachment rates by 45%, boosting productivity, and reducing add time to
                        ~30 seconds.
                      </li>
                      <li>
                        Improved consultant satisfaction scores for booking tasks and conversion metrics for travel
                        add-ons.
                      </li>
                      <li>
                        Coordinated and delivered design within external and internal teams through discovery, prototyping,
                        launch, and post-release optimisation.
                      </li>
                      <li>Recognized: FCTG Global Lisbon selectee (2024); Buzz Night award winner (2022, 2023).</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-cyan-200/95">Canstar — Lead UI/UX Designer · 2019-2020</p>
                    <ul className="space-y-1">
                      <li>
                        Led the UX transformation of website verticals and delivered a new internal platform that
                        streamlined operations.
                      </li>
                      <li>
                        Migrated design workflow to Figma and established a living UI repository and handoff standards,
                        reducing design-to-dev friction.
                      </li>
                      <li>
                        Built a usability testing framework, ran stakeholder workshops, and delivered prioritized UX
                        improvements across customer product verticals.
                      </li>
                      <li>
                        Represented UX in agile ceremonies and drove adoption of design system practices across product
                        teams.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-cyan-200/95">Temando — UI/UX Designer · 2015-2019</p>
                    <ul className="space-y-1">
                      <li>
                        Designed merchant workflows for Magento Shipping (bulk shipments), enabling faster dispatch flows
                        and measurably higher merchant throughput and satisfaction.
                      </li>
                      <li>Developed end-to-end proposals and workflows for clients including Nike, Myer and ASOS.</li>
                      <li>Founded a UX guild and documented design frameworks to scale cross-team collaboration.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
