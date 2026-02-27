import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FCTGAITalkSlides from './components/FCTGAITalkSlides.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FCTGAITalkSlides />
  </StrictMode>,
)
