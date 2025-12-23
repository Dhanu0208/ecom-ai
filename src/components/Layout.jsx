import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar.jsx'

export function Layout() {
  return (
    <div className="appShell">
      <Navbar />
      <main className="container">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="container footerInner">
          <span className="muted">Demo store • Frontend only</span>
          <span className="muted">Built with React</span>
        </div>
      </footer>
    </div>
  )
}


