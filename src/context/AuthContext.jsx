import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { api as authApi } from '../utils/apiClient.js'

const USER_KEY = 'nm_user'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [initialised, setInitialised] = useState(false)

  useEffect(() => {
    const savedUser = localStorage.getItem(USER_KEY)
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        // ignore
      }
    }
    // try to sync with backend session
    authApi
      .me()
      .then((data) => {
        if (data?.user) {
          setUser(data.user)
          localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        }
      })
      .catch(() => {
        // not logged in or session invalid
        setUser(null)
        localStorage.removeItem(USER_KEY)
      })
      .finally(() => {
        setInitialised(true)
      })
  }, [])

  const value = useMemo(() => {
    const isAuthed = Boolean(user)

    return {
      user,
      ready: initialised,
      isAuthed,
      login: async ({ email, password }) => {
        const data = await authApi.login({ email, password })
        if (data?.user) {
          setUser(data.user)
          localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        }
        return data
      },
      signup: async ({ name, email, password }) => {
        const data = await authApi.signup({ name, email, password })
        if (data?.user) {
          setUser(data.user)
          localStorage.setItem(USER_KEY, JSON.stringify(data.user))
        }
        return data
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem(USER_KEY)
        authApi.logout().catch(() => {})
      },
    }
  }, [user, initialised])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


