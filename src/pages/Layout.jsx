import { NavLink, Outlet } from 'react-router-dom'

const navLinkClass = ({ isActive }) =>
  [
    'relative inline-block transition hover:text-slate-100',
    isActive
      ? 'text-white font-semibold'
      : 'text-slate-200'
  ].join(' ')

function Layout() {
  return (
    <div className="flex min-h-screen flex-col text-slate-100">
      <header className="bg-transparent">
        <div className="mx-auto flex max-w-6xl items-center justify-center p-2">
          <nav className="flex w-full items-center justify-center gap-12 text-xs font-medium text-slate-200">
            <NavLink to="/" className={navLinkClass} end>
              Home
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <NavLink to="/portfolio" className={navLinkClass}>
              Portfolio
            </NavLink>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="w-full flex-1 px-2 py-12">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
