import { SectionHeading, SectionLayout, SectionCard, LabelPill, FCTGHeading, FCTGCard, FCTGLabelPill } from '../components/design-system'

export default function DesignSystem() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-6 py-8">
        <h1 className="text-3xl font-bold text-slate-900">Design System</h1>
        <p className="mt-2 text-slate-600">
          Tokens and components used across the portfolio.
        </p>
        <div className="mt-6 space-y-4 text-slate-600 leading-relaxed max-w-3xl">
          <p>
            <strong className="text-slate-800">Started with Tailwind default CSS.</strong> The portfolio began using Tailwind&apos;s utility classes directly — <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">text-4xl</code>, <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">bg-gradient-to-r</code>, <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">from-slate-800</code> — applied inline wherever needed. Fast to ship, but patterns repeated and drifted over time.
          </p>
          <p>
            <strong className="text-slate-800">Extracted tokens and components.</strong> Repeated values moved into <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">tailwind.config.js</code>; common UI became reusable components (<code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">SectionHeading</code>, <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">SectionCard</code>, <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">LabelPill</code>).
          </p>
          <p>
            <strong className="text-slate-800">FCTG AI Talk: v1 and v2.</strong> The talk exists in two layouts: <strong className="text-slate-800">v1</strong> (long-scroll at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">/stories/fctg-ai-talk</code>) and <strong className="text-slate-800">v2</strong> (slides at <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">/stories/fctg-ai-talk/v2</code>). Both started with raw Tailwind. We extracted patterns into <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">FCTGHeading</code> (v1 light / v2 dark), <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">FCTGCard</code>, and <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">FCTGLabelPill</code>. v2 uses these components; v1 uses equivalent inline Tailwind for scroll performance.
          </p>
          <p>
            <strong className="text-slate-800">Hook into existing systems.</strong> Extend or layer on top of established design systems for accessibility, theming, and primitives — e.g. <a href="https://chakra-ui.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Chakra UI</a>, <a href="https://primer.style" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Primer</a> (GitHub), <a href="https://www.radix-ui.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Radix</a>, <a href="https://mantine.dev" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Mantine</a>, <a href="https://mui.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Material UI</a>, <a href="https://ant.design" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Ant Design</a>, <a href="https://polaris.shopify.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 underline">Polaris</a> (Shopify). Mix and match as needed.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-16 px-6 py-16">
        {/* Typography */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Typography</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500 mb-1">SectionHeading (plain)</p>
              <SectionHeading variant="plain">Looking back to look ahead</SectionHeading>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-1">SectionHeading (gradient)</p>
              <SectionHeading variant="gradient">Questioning the fundamentals</SectionHeading>
            </div>
          </div>
        </section>

        {/* Section Layout */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Section Layout</h2>
          <SectionLayout>
            <p className="text-slate-600">
              Standard content wrapper with max-w-6xl, px-6, py-12.
            </p>
          </SectionLayout>
        </section>

        {/* Cards */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Section Cards</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            <SectionCard number={1} title="Weavers">
              Craft redefined, not replaced.
            </SectionCard>
            <SectionCard number={2} title="Cart to car">
              The leap matters more than the increment.
            </SectionCard>
            <SectionCard title="Card without number">
              Optional number badge.
            </SectionCard>
          </div>
        </section>

        {/* Label Pills */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Label Pills</h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <LabelPill gradient="from-amber-500 to-orange-600">Efficiency</LabelPill>
            <LabelPill gradient="from-emerald-500 to-teal-600">Assurance</LabelPill>
            <LabelPill gradient="from-cyan-500 to-sky-600">Knowledge</LabelPill>
            <LabelPill gradient="from-violet-500 to-purple-600">Value</LabelPill>
          </div>
        </section>

        {/* FCTG AI Talk — v1 & v2 */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">FCTG AI Talk</h2>
          <p className="text-slate-600 mb-6">Components for the FCTG AI Talk (v1 long-scroll and v2 slides).</p>
          <div className="space-y-8">
            <div>
              <p className="text-sm text-slate-500 mb-2">FCTGHeading v1 (light theme)</p>
              <FCTGHeading variant="v1">Energy</FCTGHeading>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">FCTGHeading v2 (dark slides)</p>
              <div className="rounded-lg bg-slate-900 p-8">
                <FCTGHeading variant="v2">The wider environment</FCTGHeading>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">FCTGCard (v2 dark)</p>
              <div className="rounded-lg bg-slate-900 p-8 flex gap-4">
                <FCTGCard title="Quick" compact>Sonnet, GPT-4o-mini — renames, typos.</FCTGCard>
                <FCTGCard title="Complex">Opus, GPT-4o — architecture, design decisions.</FCTGCard>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-500 mb-2">FCTGLabelPill (Strength labels)</p>
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <FCTGLabelPill variant="efficiency">Efficiency</FCTGLabelPill>
                <FCTGLabelPill variant="assurance">Assurance</FCTGLabelPill>
                <FCTGLabelPill variant="knowledge">Knowledge</FCTGLabelPill>
                <FCTGLabelPill variant="value">Value</FCTGLabelPill>
              </div>
            </div>
          </div>
        </section>

        {/* Color Tokens */}
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Color Tokens</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="h-12 rounded bg-ds-primary mb-2" />
              <p className="text-sm font-medium text-slate-900">ds-primary</p>
              <p className="text-xs text-slate-500">#4f46e5</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="h-12 rounded bg-ds-accent mb-2" />
              <p className="text-sm font-medium text-slate-900">ds-accent</p>
              <p className="text-xs text-slate-500">#22d3ee</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="h-12 rounded bg-ds-surface-muted mb-2" />
              <p className="text-sm font-medium text-slate-900">ds-surface-muted</p>
              <p className="text-xs text-slate-500">slate-50</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
