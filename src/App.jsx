import { Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import Home from './pages/Home.jsx'
import Work from './pages/Work.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import Amendments from './pages/Amendments.jsx'
import AmendmentsDemo from './pages/AmendmentsDemo.jsx'
import Insurance from './pages/Insurance.jsx'
import InsuranceDemo from './pages/InsuranceDemo.jsx'
import FCTGAITalk from './pages/FCTGAITalk.jsx'
import MagentoShipping from './pages/MagentoShipping.jsx'
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stories" element={<Work />} />
        <Route path="stories/amendments" element={<Amendments />} />
        <Route path="stories/amendments/demo" element={<AmendmentsDemo />} />
        <Route path="stories/insurance" element={<Insurance />} />
        <Route path="stories/insurance/demo" element={<InsuranceDemo />} />
        <Route path="stories/fctg-ai-talk" element={<FCTGAITalk />} />
        <Route path="stories/magento-shipping" element={<MagentoShipping />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App
