import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const from = location.state?.from || '/'

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password })
      navigate(from, { replace: true })
    } catch (err) {
      setError(err?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="authGrid">
        <div className="authLeft">
          <h1 className="pageTitle">Welcome back</h1>
          <p className="muted">
            Demo login (frontend-only). Any email/password will work.
          </p>
          <div className="authHint card">
            <div className="authHintTitle">Tip</div>
            <div className="muted">
              We store a demo token in <b>localStorage</b> and also set a{' '}
              <b>cookie</b> named <code>nm_token</code>.
            </div>
          </div>
        </div>

        <form className="card authCard" onSubmit={onSubmit}>
          <div className="authCardTitle">Login</div>

          {error ? <div className="alert danger">{error}</div> : null}

          <label className="field">
            <span className="fieldLabel">Email</span>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span className="fieldLabel">Password</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          <button className="btn primary wide" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <div className="muted authBottom">
            Don’t have an account? <Link to="/signup">Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}


