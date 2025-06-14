"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Building, User, Lock, ArrowRight, Sparkles, Zap } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useTheme } from "@/components/providers/theme-provider"

interface EnhancedAuthModalProps {
  onAuthComplete: () => void
}

export function EnhancedAuthModal({ onAuthComplete }: EnhancedAuthModalProps) {
  const [authStep, setAuthStep] = useState<"select" | "enterprise" | "demo">("select")
  const [isLoading, setIsLoading] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { login } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleEnterpriseAuth = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    await login({
      id: "enterprise-user",
      name: "Dr. Maria Silva",
      email: "maria.silva@hospital.com",
      role: "physician",
      organization: "Hospital São Paulo",
      avatar: "MS",
    })

    setIsLoading(false)
    onAuthComplete()
  }

  const handleDemoAuth = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await login({
      id: "demo-user",
      name: "Demo User",
      email: "demo@zeo.app",
      role: "demo",
      organization: "ZEO Demo",
      avatar: "DU",
    })

    setIsLoading(false)
    onAuthComplete()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center auth-modal-backdrop">
      {/* Dynamic lighting effects inspired by x.ai */}
      <div
        className="auth-light-orb"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />
      <div className="auth-light-orb-secondary" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md mx-4 relative"
      >
        <div className="auth-card">
          {/* Floating particles */}
          <div className="auth-particles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="auth-particle"
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                }}
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${10 + (i % 2) * 80}%`,
                }}
              />
            ))}
          </div>

          {/* Header with enhanced styling */}
          <div className="text-center space-y-3 relative z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="auth-logo-container"
            >
              <h2 className="auth-logo-text">ZEO</h2>
              <div className="auth-logo-glow" />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="auth-subtitle"
            >
              <Sparkles className="inline w-4 h-4 mr-2" />
              Secure Access
            </motion.p>
          </div>

          <AnimatePresence mode="wait">
            {authStep === "select" && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="auth-description"
                >
                  Escolha como deseja acessar o ZEO
                </motion.p>

                <div className="space-y-3">
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    onClick={() => setAuthStep("enterprise")}
                    className="auth-option-card group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="auth-option-icon">
                      <Building className="w-6 h-6" />
                      <div className="auth-option-icon-glow" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="auth-option-title">Acesso Empresarial</h3>
                      <p className="auth-option-subtitle">Microsoft Entra ID</p>
                    </div>
                    <ArrowRight className="w-5 h-5 auth-option-arrow" />
                  </motion.button>

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    onClick={() => setAuthStep("demo")}
                    className="auth-option-card group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="auth-option-icon">
                      <User className="w-6 h-6" />
                      <div className="auth-option-icon-glow" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="auth-option-title">Modo Demo</h3>
                      <p className="auth-option-subtitle">Acesso rápido para teste</p>
                    </div>
                    <ArrowRight className="w-5 h-5 auth-option-arrow" />
                  </motion.button>
                </div>
              </motion.div>
            )}

            {authStep === "enterprise" && (
              <motion.div
                key="enterprise"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <div className="auth-service-icon">
                    <Building className="w-8 h-8" />
                    <div className="auth-service-icon-glow" />
                  </div>
                  <div>
                    <h3 className="auth-service-title">Microsoft Entra ID</h3>
                    <p className="auth-service-description">Faça login com sua conta organizacional Microsoft</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleEnterpriseAuth}
                  disabled={isLoading}
                  className="auth-primary-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="auth-spinner" />
                      <span>Autenticando...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Entrar com Microsoft</span>
                      <Zap className="w-4 h-4 ml-2 opacity-60" />
                    </>
                  )}
                </motion.button>

                <button onClick={() => setAuthStep("select")} className="auth-back-button">
                  ← Voltar
                </button>
              </motion.div>
            )}

            {authStep === "demo" && (
              <motion.div
                key="demo"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="text-center space-y-4">
                  <div className="auth-service-icon">
                    <User className="w-8 h-8" />
                    <div className="auth-service-icon-glow" />
                  </div>
                  <div>
                    <h3 className="auth-service-title">Modo Demo</h3>
                    <p className="auth-service-description">Explore o ZEO com funcionalidades completas</p>
                  </div>
                </div>

                <motion.button
                  onClick={handleDemoAuth}
                  disabled={isLoading}
                  className="auth-primary-button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <div className="auth-spinner" />
                      <span>Iniciando...</span>
                    </>
                  ) : (
                    <>
                      <ArrowRight className="w-5 h-5" />
                      <span>Entrar no Demo</span>
                      <Sparkles className="w-4 h-4 ml-2 opacity-60" />
                    </>
                  )}
                </motion.button>

                <button onClick={() => setAuthStep("select")} className="auth-back-button">
                  ← Voltar
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="auth-footer">
            <p>ZEO AI Assistant - Seguro & Inteligente</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
