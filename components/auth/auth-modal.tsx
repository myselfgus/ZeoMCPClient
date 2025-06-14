"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Building, User, ArrowRight, Sparkles } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useTheme } from "@/components/providers/theme-provider"

interface AuthModalProps {
  onComplete: () => void
}

export function AuthModal({ onComplete }: AuthModalProps) {
  const [step, setStep] = useState<"select" | "enterprise" | "demo">("select")
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const { login } = useAuth()
  const { theme } = useTheme()

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouse)
    return () => window.removeEventListener("mousemove", handleMouse)
  }, [])

  const handleAuth = async (type: "enterprise" | "demo") => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (type === "enterprise") {
      await login({
        id: "enterprise-user",
        name: "Dr. Maria Silva",
        email: "maria.silva@hospital.com",
        role: "physician",
        organization: "Hospital São Paulo",
        avatar: "MS",
      })
    } else {
      await login({
        id: "demo-user",
        name: "Demo User",
        email: "demo@zeo.app",
        role: "demo",
        organization: "ZEO Demo",
        avatar: "DU",
      })
    }

    setLoading(false)
    onComplete()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      {/* Background with x.ai style lighting */}
      <div className={`absolute inset-0 ${theme === "dark" ? "bg-black" : "bg-gray-50"}`} />

      {/* Dynamic light orb following mouse */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none transition-all duration-300 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
          background:
            theme === "dark"
              ? "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Static ambient lights */}
      <div
        className={`absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl ${
          theme === "dark" ? "bg-white/5" : "bg-black/3"
        } animate-pulse`}
      />
      <div
        className={`absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full blur-3xl ${
          theme === "dark" ? "bg-white/3" : "bg-black/2"
        } animate-pulse delay-1000`}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div
          className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl ${
            theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/80 border-black/10 shadow-black/5"
          }`}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-4xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              ZEO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`flex items-center justify-center gap-2 text-sm uppercase tracking-wider ${
                theme === "dark" ? "text-white/60" : "text-black/60"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Secure Access
            </motion.p>
          </div>

          {step === "select" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <p className={`text-center mb-6 ${theme === "dark" ? "text-white/70" : "text-black/70"}`}>
                Escolha como deseja acessar o ZEO
              </p>

              <button
                onClick={() => setStep("enterprise")}
                className={`w-full p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] group ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-white/60 border-black/10 hover:bg-white/80 hover:border-black/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === "dark" ? "bg-white/10" : "bg-black/5"
                    }`}
                  >
                    <Building className={`w-6 h-6 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                      Acesso Empresarial
                    </h3>
                    <p className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                      Microsoft Entra ID
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      theme === "dark" ? "text-white/40" : "text-black/40"
                    }`}
                  />
                </div>
              </button>

              <button
                onClick={() => setStep("demo")}
                className={`w-full p-4 rounded-2xl border transition-all duration-300 hover:scale-[1.02] group ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
                    : "bg-white/60 border-black/10 hover:bg-white/80 hover:border-black/20"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      theme === "dark" ? "bg-white/10" : "bg-black/5"
                    }`}
                  >
                    <User className={`w-6 h-6 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>Modo Demo</h3>
                    <p className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                      Acesso rápido para teste
                    </p>
                  </div>
                  <ArrowRight
                    className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                      theme === "dark" ? "text-white/40" : "text-black/40"
                    }`}
                  />
                </div>
              </button>
            </motion.div>
          )}

          {(step === "enterprise" || step === "demo") && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 ${
                    theme === "dark" ? "bg-white/10" : "bg-black/5"
                  }`}
                >
                  {step === "enterprise" ? (
                    <Building className={`w-8 h-8 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                  ) : (
                    <User className={`w-8 h-8 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                  )}
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {step === "enterprise" ? "Microsoft Entra ID" : "Modo Demo"}
                </h3>
                <p className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                  {step === "enterprise"
                    ? "Faça login com sua conta organizacional"
                    : "Explore o ZEO com funcionalidades completas"}
                </p>
              </div>

              <button
                onClick={() => handleAuth(step)}
                disabled={loading}
                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                  theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    {step === "enterprise" ? "Autenticando..." : "Iniciando..."}
                  </div>
                ) : step === "enterprise" ? (
                  "Entrar com Microsoft"
                ) : (
                  "Entrar no Demo"
                )}
              </button>

              <button
                onClick={() => setStep("select")}
                className={`w-full text-sm transition-colors ${
                  theme === "dark" ? "text-white/60 hover:text-white/80" : "text-black/60 hover:text-black/80"
                }`}
              >
                ← Voltar
              </button>
            </motion.div>
          )}

          <div
            className={`text-center mt-8 pt-6 border-t text-xs ${
              theme === "dark" ? "border-white/10 text-white/40" : "border-black/10 text-black/40"
            }`}
          >
            ZEO AI Assistant - Seguro & Inteligente
          </div>
        </div>
      </motion.div>
    </div>
  )
}
