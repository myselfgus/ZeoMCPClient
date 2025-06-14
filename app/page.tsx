"use client"

import { useEffect, useState } from "react"
import { SplashScreen } from "@/components/ui/splash-screen"
import { AuthModal } from "@/components/auth/auth-modal"
import { MainApplication } from "@/components/main-application"
import { useAuth } from "@/components/providers/auth-provider"

export default function HomePage() {
  const [currentView, setCurrentView] = useState<"splash" | "auth" | "app">("splash")
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setCurrentView("app")
      } else {
        setCurrentView("auth")
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated && currentView !== "app") {
      setCurrentView("app")
    }
  }, [isAuthenticated, currentView])

  if (currentView === "splash") {
    return <SplashScreen />
  }

  if (currentView === "auth" && !isAuthenticated) {
    return <AuthModal onComplete={() => setCurrentView("app")} />
  }

  return <MainApplication />
}
