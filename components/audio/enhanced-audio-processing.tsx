"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { AudioWaveformIcon as Waveform, Brain, FileText } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { ZeoAnimations } from "@/lib/gsap"

export function EnhancedAudioProcessing() {
  const { currentJob } = useAudio()
  const progressRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const progress = currentJob?.progress || 0
  const status = currentJob?.status || "processing"

  useEffect(() => {
    // Animate progress bar with GSAP
    if (progressRef.current) {
      ZeoAnimations.animateProgress(progressRef.current, progress)
    }

    // Animate card entrance
    if (cardRef.current) {
      ZeoAnimations.transitionIn(cardRef.current)
    }
  }, [progress])

  const getStatusText = () => {
    if (progress < 30) return "Analisando áudio..."
    if (progress < 70) return "Transcrevendo com IA..."
    if (progress < 90) return "Processando contexto médico..."
    return "Finalizando transcrição..."
  }

  const getStatusIcon = () => {
    if (progress < 30) return Waveform
    if (progress < 70) return Brain
    return FileText
  }

  const StatusIcon = getStatusIcon()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Processing Card with Enhanced Styling */}
      <div ref={cardRef} className="zeo-processing-card">
        {/* Header */}
        <div className="space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-20 h-20 mx-auto glass-effect rounded-full flex items-center justify-center"
          >
            <StatusIcon className="w-10 h-10 text-white/80" />
          </motion.div>

          <div>
            <h2 className="font-heading text-2xl font-semibold text-white mb-2">Processando Áudio</h2>
            <p className="font-body text-white/60">{getStatusText()}</p>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="space-y-4">
          <div className="zeo-progress-container">
            <div className="zeo-progress-bar">
              <div ref={progressRef} className="zeo-progress-fill" style={{ width: "0%" }} />
            </div>
            <span className="zeo-progress-text">{Math.round(progress)}%</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-body text-white/60 text-sm">Progresso</span>
            <span className="zeo-status-badge">{status === "processing" ? "Processando..." : "Concluído"}</span>
          </div>
        </div>

        {/* Processing Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Waveform, label: "Análise de Áudio", completed: progress > 30 },
            { icon: Brain, label: "Transcrição IA", completed: progress > 70 },
            { icon: FileText, label: "Contexto Médico", completed: progress > 90 },
          ].map((step, index) => (
            <div
              key={step.label}
              className={`glass-effect rounded-xl p-4 space-y-2 transition-all duration-500 ${
                step.completed ? "bg-green-500/10 border-green-500/20" : ""
              }`}
            >
              <step.icon
                className={`w-6 h-6 mx-auto transition-colors duration-500 ${
                  step.completed ? "text-green-400" : "text-white/40"
                }`}
              />
              <p
                className={`font-body text-xs transition-colors duration-500 ${
                  step.completed ? "text-green-300" : "text-white/60"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center">
          <div className="loader-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </div>

      {/* Info Card */}
      <div className="glass-effect rounded-xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-white">Processamento via MCP</h3>
        <p className="font-body text-white/60 text-sm leading-relaxed">
          Utilizamos o Model Context Protocol para conectar com servidores especializados em transcrição médica,
          garantindo precisão e contexto clínico adequado.
        </p>
      </div>
    </motion.div>
  )
}
