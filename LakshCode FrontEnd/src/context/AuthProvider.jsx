import { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('lakshcode_token'))

  const login = (tkn) => {
    localStorage.setItem('lakshcode_token', tkn)
    setToken(tkn)
  }

  const logout = () => {
    localStorage.removeItem('lakshcode_token')
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuth: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
