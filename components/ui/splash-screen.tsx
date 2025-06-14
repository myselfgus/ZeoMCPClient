"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export function SplashScreen() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2000),
    ]

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 30 }}
          className="text-8xl font-bold text-white mb-4 tracking-tight"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          ZEO
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: step >= 2 ? 120 : 0 }}
          className="h-0.5 bg-gradient-to-r from-transparent via-white to-transparent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
          className="text-white/60 text-lg tracking-widest uppercase"
          style={{ fontFamily: "Manrope, sans-serif" }}
        >
          AI Assistant
        </motion.p>

        {step >= 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 bg-white/40 rounded-full"
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
