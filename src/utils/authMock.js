function base64url(str) {
  const b64 = btoa(str)
  return b64.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '')
}

function makeToken(payload) {
  // demo "JWT-like" token (NOT secure). Backend should issue real JWT.
  const header = base64url(JSON.stringify({ alg: 'none', typ: 'JWT' }))
  const body = base64url(JSON.stringify(payload))
  return `${header}.${body}.demo`
}

export function mockSignup({ name, email, password }) {
  if (!name?.trim()) throw new Error('Name is required')
  if (!email?.includes('@')) throw new Error('Valid email is required')
  if (!password || password.length < 6)
    throw new Error('Password must be at least 6 characters')

  const user = { id: crypto.randomUUID(), name: name.trim(), email: email.trim() }
  const token = makeToken({ sub: user.id, email: user.email, name: user.name })
  return { user, token }
}

export function mockLogin({ email, password }) {
  if (!email?.includes('@')) throw new Error('Valid email is required')
  if (!password) throw new Error('Password is required')

  // demo: accept any email/password
  const user = { id: crypto.randomUUID(), name: 'Demo User', email: email.trim() }
  const token = makeToken({ sub: user.id, email: user.email, name: user.name })
  return { user, token }
}


