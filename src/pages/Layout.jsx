import { NavLink, Outlet, useLocation } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'

function Layout() {
  const { pathname } = useLocation()
  const designSystemPage = pathname === '/design-system'
  const isHome = pathname === '/'
  const contactPage = pathname === '/contact'

  const navLinkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center min-h-[44px] px-1 sm:px-2 font-light transition rounded focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent outline-none',
      'hover:text-slate-100',
      isActive ? 'text-white font-medium' : 'text-slate-200'
    ].join(' ')

  return (
    <div className="flex min-h-screen flex-col bg-black text-slate-100">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg">
        Skip to content
      </a>
      {isHome && (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <ParticleBackground variant="title" />
        </div>
      )}
      <header className="relative z-20 bg-black">
        <div className="mx-auto flex max-w-6xl items-center justify-center p-2">
            <nav aria-label="Main" className="flex w-full items-center justify-center gap-2 text-xs font-light tracking-wider text-slate-200 sm:gap-8 md:gap-12">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/stories" className={navLinkClass}>
              Stories
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/design-system" className={navLinkClass}>
              System
            </NavLink>
          </nav>
        </div>
      </header>

      <main
        id="main-content"
        className={
          isHome
            ? 'relative z-10 w-full flex-1 bg-transparent py-12'
            : designSystemPage
              ? 'w-full flex-1 bg-black pb-12 pt-20 text-slate-200'
              : contactPage
                ? 'w-full flex-1 bg-black text-slate-200'
                : 'w-full flex-1 bg-black'
        }
      >
        <Outlet />
      </main>

      <footer id="site-footer" className="relative z-10 mt-auto shrink-0 py-6 text-center text-sm tracking-wider text-slate-500">
        © {new Date().getFullYear()} Joel Hickey Designs
      </footer>
    </div>
  )
}

export default Layout
