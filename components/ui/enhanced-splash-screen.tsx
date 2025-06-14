"use client"

import { useEffect, useState, useRef } from "react"
import { ZeoAnimations } from "@/lib/gsap"

export function EnhancedSplashScreen() {
  const [isComplete, setIsComplete] = useState(false)
  const splashRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const runSplashAnimation = async () => {
      // Wait for GSAP to be ready
      await new Promise((resolve) => setTimeout(resolve, 100))

      // Run the splash screen animation
      await ZeoAnimations.animateSplashScreen()

      // Mark as complete
      setIsComplete(true)
    }

    runSplashAnimation()
  }, [])

  return (
    <div ref={splashRef} className={`zeo-splash-screen ${isComplete ? "hidden" : ""}`}>
      <div className="splash-content">
        <div className="splash-logo">
          <h1 className="splash-title">ZEO</h1>
          <div className="splash-underline"></div>
        </div>
        <div className="splash-tagline">AI Clinical Assistant</div>
        <div className="splash-loader">
          <div className="loader-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  )
}
