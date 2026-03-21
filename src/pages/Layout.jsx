import { NavLink, Outlet, useLocation } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'

const navLinkClass = ({ isActive }) =>
  [
    'relative inline-block transition hover:text-slate-100',
    isActive
      ? 'text-white font-semibold'
      : 'text-slate-200'
  ].join(' ')

function Layout() {
  const { pathname } = useLocation()
  const storiesIndexPage = pathname === '/stories'
  const designSystemPage = pathname === '/design-system'
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col bg-black text-slate-100">
      {isHome && (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <ParticleBackground variant="title" />
        </div>
      )}
      <header className="relative z-[20] bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-center p-2">
          <nav className="flex w-full items-center justify-center gap-12 text-xs font-medium text-slate-200">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/stories" className={navLinkClass}>
              Stories
            </NavLink>
            <NavLink to="/design-system" className={navLinkClass}>
              Design system
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main
        className={
          storiesIndexPage
            ? 'w-full flex-1 bg-white text-slate-900'
            : isHome
              ? 'relative z-10 w-full flex-1 bg-transparent py-12'
              : designSystemPage
                ? 'w-full flex-1 bg-black text-slate-200 py-12'
                : 'w-full flex-1 bg-black py-12'
        }
      >
        <Outlet />
      </main>

      <footer id="site-footer" role="contentinfo" className="relative z-[10] mt-auto shrink-0 py-6 text-center text-sm tracking-wider text-slate-500">
        © {new Date().getFullYear()} Joel Hickey Designs
      </footer>
    </div>
  )
}

export default Layout
