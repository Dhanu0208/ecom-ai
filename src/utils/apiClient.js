const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

async function jsonFetch(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const text = await res.text()
  let data = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    // leave data as null
  }

  if (!res.ok) {
    const message = data?.error || data?.message || res.statusText
    throw new Error(message)
  }

  return data
}

export const api = {
  signup(payload) {
    return jsonFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  login(payload) {
    return jsonFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  logout() {
    return jsonFetch('/api/auth/logout', { method: 'POST' })
  },
  me() {
    return jsonFetch('/api/auth/me')
  },
}


