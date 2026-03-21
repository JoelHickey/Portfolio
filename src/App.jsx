import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'

const Work = lazy(() => import('./pages/Work.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Amendments = lazy(() => import('./pages/Amendments.jsx'))
const AmendmentsDemo = lazy(() => import('./pages/AmendmentsDemo.jsx'))
const Insurance = lazy(() => import('./pages/Insurance.jsx'))
const InsuranceDemo = lazy(() => import('./pages/InsuranceDemo.jsx'))
const FCTGAITalk = lazy(() => import('./pages/FCTGAITalk.jsx'))
const MagentoShipping = lazy(() => import('./pages/MagentoShipping.jsx'))
const HelioDeepLinking = lazy(() => import('./pages/HelioDeepLinking.jsx'))
const DesignSystem = lazy(() => import('./pages/DesignSystem.jsx'))

function App() {
  return (
    <Suspense fallback={<div className="flex min-h-[50vh] items-center justify-center bg-black text-slate-400">Loading…</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="stories" element={<Work />} />
          <Route path="stories/amendments" element={<Amendments />} />
          <Route path="stories/amendments/demo" element={<AmendmentsDemo />} />
          <Route path="stories/insurance" element={<Insurance />} />
          <Route path="stories/insurance/demo" element={<InsuranceDemo />} />
          <Route path="stories/fctg-ai-talk" element={<FCTGAITalk />} />
          <Route path="stories/fctg-ai-talk/v2" element={<FCTGAITalk />} />
          <Route path="stories/magento-shipping" element={<MagentoShipping />} />
          <Route path="stories/helio-deep-linking" element={<HelioDeepLinking />} />
          <Route path="design-system" element={<DesignSystem />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
