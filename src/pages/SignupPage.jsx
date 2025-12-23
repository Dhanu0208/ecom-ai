import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export function SignupPage() {
  const { signup } = useAuth()
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signup({ name, email, password })
      navigate('/', { replace: true })
    } catch (err) {
      setError(err?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="authGrid">
        <div className="authLeft">
          <h1 className="pageTitle">Create your account</h1>
          <p className="muted">Demo signup (frontend-only).</p>
        </div>

        <form className="card authCard" onSubmit={onSubmit}>
          <div className="authCardTitle">Sign up</div>

          {error ? <div className="alert danger">{error}</div> : null}

          <label className="field">
            <span className="fieldLabel">Full name</span>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

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
            <span className="fieldLabel">Password (min 6 chars)</span>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </label>

          <button className="btn primary wide" disabled={loading}>
            {loading ? 'Creating…' : 'Create account'}
          </button>

          <div className="muted authBottom">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </form>
      </div>
    </div>
  )
}


