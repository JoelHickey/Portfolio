import { NavLink, Outlet, useLocation } from 'react-router-dom'
import ParticleBackground from '../components/ParticleBackground'

function Layout() {
  const { pathname } = useLocation()
  const storiesIndexPage = pathname === '/stories'
  const aboutPage = pathname === '/about'
  const designSystemPage = pathname === '/design-system'
  const isHome = pathname === '/'
  const contactPage = pathname === '/contact'
  const isLightPage = storiesIndexPage || aboutPage

  const navLinkClass = ({ isActive }) =>
    [
      'relative inline-flex items-center min-h-[44px] px-2 font-light transition rounded focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent outline-none',
      isLightPage ? 'hover:text-slate-900' : 'hover:text-slate-100',
      isActive
        ? isLightPage ? 'text-slate-900 font-medium' : 'text-white'
        : isLightPage ? 'text-slate-800' : 'text-slate-200'
    ].join(' ')

  return (
    <div className={`flex min-h-screen flex-col ${isLightPage ? 'bg-white text-slate-900' : 'bg-black text-slate-100'}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-slate-900 focus:shadow-lg">
        Skip to content
      </a>
      {isHome && (
        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
          <ParticleBackground variant="title" />
        </div>
      )}
      <header className={`relative z-20 ${isLightPage ? 'bg-white' : 'bg-black'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-center p-2">
          <nav aria-label="Main" className={`flex w-full items-center justify-center gap-4 text-xs font-light tracking-wider sm:gap-8 md:gap-12 ${isLightPage ? 'text-slate-800' : 'text-slate-200'}`}>
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
          isLightPage
            ? 'w-full flex-1 bg-white text-slate-900'
            : isHome
              ? 'relative z-10 w-full flex-1 bg-transparent py-12'
              : designSystemPage
                ? 'w-full flex-1 bg-black pb-12 pt-20 text-slate-200'
                : contactPage
                  ? 'w-full flex-1 bg-black text-slate-200'
                  : 'w-full flex-1 bg-black py-12'
        }
      >
        <Outlet />
      </main>

      <footer id="site-footer" className={`relative z-10 mt-auto shrink-0 py-6 text-center text-sm tracking-wider ${isLightPage ? 'text-slate-500' : 'text-slate-500'}`}>
        © {new Date().getFullYear()} Joel Hickey Designs
      </footer>
    </div>
  )
}

export default Layout
