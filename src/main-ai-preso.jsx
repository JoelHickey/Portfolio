import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'
import AuthGate from './components/AuthGate.jsx'
import FCTGAITalkSlides from './components/FCTGAITalkSlides.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <AuthGate>
        <FCTGAITalkSlides />
      </AuthGate>
    </AuthProvider>
  </StrictMode>,
)
