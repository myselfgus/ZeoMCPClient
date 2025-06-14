"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  role: string
  organization: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("zeo_user")
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setUser(userData)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("Failed to parse stored user data:", error)
        localStorage.removeItem("zeo_user")
      }
    }
  }, [])

  const login = async (userData: User) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("zeo_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("zeo_user")
    // Reload page to reset app state
    window.location.reload()
  }

  return <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
