import { HiOutlineMail } from 'react-icons/hi'
import { SiLinkedin, SiDribbble } from 'react-icons/si'
import ParticleBackground from '../components/ParticleBackground'

function About() {
  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <ParticleBackground variant="title" contained />
      </div>
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10">
        <div className="relative rounded-2xl shadow-lg">
          {/* White layer so particles only show around the document, not behind it */}
          <div className="absolute inset-0 rounded-2xl bg-white" aria-hidden />
          <div className="relative z-10 grid gap-8 rounded-2xl bg-white p-8 lg:grid-cols-[1.2fr_2fr]">
            <div className="space-y-6">
              <div>
                <p className="text-lg font-semibold text-slate-900">Joel Hickey</p>
                <p className="text-sm text-slate-600">Senior Product Designer</p>
              </div>
              <div className="space-y-2 text-sm text-slate-600">
                <p><a href="tel:0421366486">0421 366 486</a></p>
                <p>
                  <a href="mailto:joelhickeydesigns@gmail.com" className="inline-flex items-center gap-1.5">
                    <HiOutlineMail size={16} />
                    <span>Email</span>
                  </a>
                </p>
                <p>
                  <a href="https://www.linkedin.com/in/joel-hickey-493757138/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                    <SiLinkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </p>
                <p>
                  <a href="https://dribbble.com/joelhickey" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5">
                    <SiDribbble size={18} />
                    <span>Dribbble</span>
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">Tools &amp; Methods</h3>
                <ul className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
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
                <h3 className="text-sm font-semibold text-slate-900">Education</h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-600">
                  <li>Master of Interactive Media — Queensland College of Art (2015-2016)</li>
                  <li>Bachelor of Audio Engineering &amp; Sound Production — JMC Academy (2011-2013)</li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">References</h3>
                <p className="mt-3 text-sm text-slate-600">References available on request</p>
              </div>
            </div>

            <div className="space-y-8 text-sm text-slate-600">
              <p>
                From an early age I developed a unique lens that blends art and design. With experience in interaction
                design, service design, and human-centred thinking, I move fast to deliver valuable, delightful,
                measurable solutions that feel effortless to use.
              </p>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Experience</h3>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <p className="font-semibold text-slate-900">
                      Flight Centre Travel Group — Senior UI/UX Designer · 2021-2025
                    </p>
                    <ul className="space-y-1">
                      <li>
                        Solved a high-friction amendment flow that forced consultants through multiple screens and manual
                        steps, lifting consultant productivity and cutting average handling time from 8–12 minutes to 2–3
                        minutes.
                      </li>
                      <li>
                        Embedded insurance quoting into the booking workflow to remove context switching and manual
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
                    <p className="font-semibold text-slate-900">Canstar — Lead UI/UX Designer · 2019-2020</p>
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
                    <p className="font-semibold text-slate-900">Temando — UI/UX Designer · 2015-2019</p>
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
