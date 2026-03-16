function Contact() {
  return (
    <section className="flex flex-col">
      <div className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
        <div className="mx-auto w-full max-w-3xl px-6 text-center">
          <h1 className="text-5xl font-medium text-white md:text-6xl">Contact</h1>
          <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
            Let’s build the next release together.
          </p>
        </div>
      </div>
      <div className="w-full min-h-screen bg-white">
        <div className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="tel:0421366486">0421 366 486</a></li>
              <li><a href="mailto:joelhickeydesigns@gmail.com">Email</a></li>
              <li><a href="https://www.linkedin.com/in/joel-hickey-493757138/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
              <li><a href="https://dribbble.com/joelhickey" target="_blank" rel="noopener noreferrer">Dribbble</a></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
