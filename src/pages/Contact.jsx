import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi'
import { SiLinkedin, SiDribbble } from 'react-icons/si'

import { useEffect } from 'react'

function Contact() {
  useEffect(() => { document.title = 'Contact — Joel Hickey' }, [])

  return (
    <section className="relative z-10 flex flex-col items-center px-16 pt-24 pb-20 md:px-20 md:pt-32 lg:px-24">
      <div
        className="flex flex-col items-center text-center"
        role="region"
        aria-labelledby="contact-heading"
      >
        <h1 id="contact-heading" className="m-0 text-5xl font-bold tracking-wide bg-clip-text text-transparent md:text-6xl lg:text-7xl" style={{ background: 'linear-gradient(90deg, #06b6d4 0%, #14b8a6 25%, #6366f1 50%, #8b5cf6 75%, #d946ef 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
          Contact
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-300">
          Open to product design roles — helping teams build better digital products with AI.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Brisbane, AU · remote friendly · talks &amp; workshops welcome
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="mailto:joelhickeydesigns@gmail.com"
            className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
          >
            <HiOutlineMail className="shrink-0" size={20} aria-hidden="true" />
            Email me
          </a>
          <a
            href="tel:0421366486"
            className="inline-flex items-center gap-2 rounded-full bg-home-cta px-6 py-3 text-base font-normal tracking-wider text-white shadow-lg shadow-violet-500/25 transition hover:shadow-violet-500/40 hover:brightness-110 outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent min-h-[44px]"
          >
            <HiOutlinePhone className="shrink-0" size={20} aria-hidden="true" />
            Call me
          </a>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-slate-400">
          <a
            href="https://www.linkedin.com/in/joelhickey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <SiLinkedin size={14} aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://dribbble.com/joelhickey"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <SiDribbble size={14} aria-hidden="true" />
            <span>Dribbble</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
