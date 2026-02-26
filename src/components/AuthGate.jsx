import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { supabase } from '../lib/supabase.js'
import { FiLogIn, FiLogOut, FiMail } from 'react-icons/fi'
import ParticleBackground from './ParticleBackground.jsx'

export default function AuthGate({ children }) {
  const { user, loading, signOut } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState(null)

  // No Supabase config: show preso without auth (and a small debug hint)
  if (!supabase) {
    return (
      <div className="relative">
        <div className="fixed top-2 right-2 z-[100] px-2 py-1 rounded text-xs bg-amber-900/80 text-amber-200">
          Auth disabled (no Supabase config)
        </div>
        {children}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#030b0f] relative overflow-hidden">
        <div className="pointer-events-none fixed inset-0 z-0">
          <ParticleBackground variant="calmness" />
        </div>
        <div className="relative z-10 text-cyan-400/80 animate-pulse text-lg">Loading…</div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="relative">
        <div className="fixed bottom-4 right-4 z-[99999] flex items-center gap-2 px-3 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-slate-600/80">
          <span className="text-xs text-slate-400 truncate max-w-[140px]">{user.email}</span>
          <button
            onClick={signOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-700/80 hover:bg-slate-600/80 text-slate-300 hover:text-white text-sm transition shrink-0"
          >
            <FiLogOut className="w-3.5 h-3.5" /> Log out
          </button>
        </div>
        {children}
      </div>
    )
  }

  const handleMagicLink = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin },
      })
      if (err) throw err
      setSent(true)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#030b0f] p-6 relative overflow-hidden">
      {/* Particle background — matches slide aesthetic */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ParticleBackground variant="empowerment" />
      </div>
      {/* Subtle pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-[1] fctg-pattern-hexagon opacity-[0.03] bg-[#030b0f]" aria-hidden />

      {/* Login card — floats above particles */}
      <div className="relative z-10 w-full min-w-fit max-w-lg rounded-2xl bg-black/60 backdrop-blur-xl border border-cyan-500/30 p-8 shadow-2xl shadow-cyan-500/10">
        <h1
          className="text-2xl font-semibold mb-1 whitespace-nowrap"
          style={{
            background: 'linear-gradient(90deg, #22d3ee 0%, #2dd4bf 25%, #818cf8 50%, #a78bfa 75%, #e879f9 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Invigoration, innovation and impact
        </h1>
        <p className="text-slate-400 mb-6">Sign in to view the presentation</p>

        {sent ? (
          <div className="text-cyan-400 text-sm space-y-2">
            <p>Check your inbox for the magic link.</p>
            <p className="text-slate-500 text-xs">It may take a moment to arrive.</p>
          </div>
        ) : (
          <form onSubmit={handleMagicLink} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-500/70" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-900/80 border border-cyan-500/20 text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 outline-none transition"
                />
              </div>
            </div>
            {error && (
              <p className="text-sm text-red-400">{error}</p>
            )}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white font-medium transition shadow-lg shadow-cyan-500/20"
            >
              <FiLogIn className="w-4 h-4" /> Send magic link
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
