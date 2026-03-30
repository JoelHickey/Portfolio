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
          Open to product design and AI workflow roles — where strategy, craft, and agentic tooling drive real outcomes.
        </p>
        <p className="mt-2 text-base text-slate-500">
          Enterprise or startup — also open to speaking, AI workshops, and collaborations.
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Based in Brisbane, AU · open to remote.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 text-sm text-slate-300 sm:flex-row sm:gap-8">
          <a href="tel:0421366486" className="inline-flex items-center gap-2 transition-colors hover:text-white">
            <HiOutlinePhone size={16} aria-hidden="true" />
            <span>0421 366 486</span>
          </a>
          <a
            href="mailto:joelhickeydesigns@gmail.com"
            className="inline-flex items-center gap-2 transition-colors hover:text-white"
          >
            <HiOutlineMail size={16} aria-hidden="true" />
            <span>joelhickeydesigns@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/joel-hickey-493757138/"
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
