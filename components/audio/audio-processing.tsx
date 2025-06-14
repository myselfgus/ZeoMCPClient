"use client"

import { motion } from "framer-motion"
import { AudioWaveformIcon as Waveform, Brain, FileText } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { useTheme } from "@/components/providers/theme-provider"

export function AudioProcessing() {
  const { currentJob } = useAudio()
  const { theme } = useTheme()
  const progress = currentJob?.progress || 0

  const getStatusText = () => {
    if (progress < 30) return "Analisando áudio..."
    if (progress < 70) return "Transcrevendo com IA..."
    if (progress < 90) return "Processando contexto..."
    return "Finalizando..."
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
      <div
        className={`backdrop-blur-xl border rounded-3xl p-8 text-center ${
          theme === "dark" ? "bg-white/5 border-white/10" : "bg-white/60 border-black/10"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
            theme === "dark" ? "bg-white/10" : "bg-black/5"
          }`}
        >
          <StatusIcon className={`w-10 h-10 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
        </motion.div>

        <h2 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Processando Áudio
        </h2>
        <p className={`mb-8 ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>{getStatusText()}</p>

        {/* Progress */}
        <div className="space-y-4">
          <div
            className={`w-full h-2 rounded-full overflow-hidden ${theme === "dark" ? "bg-white/10" : "bg-black/10"}`}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full rounded-full ${theme === "dark" ? "bg-white/60" : "bg-black/60"}`}
            />
          </div>

          <div className="flex justify-between items-center">
            <span className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>Progresso</span>
            <span className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
              {Math.round(progress)}%
            </span>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Waveform, label: "Análise", completed: progress > 30 },
            { icon: Brain, label: "Transcrição", completed: progress > 70 },
            { icon: FileText, label: "Contexto", completed: progress > 90 },
          ].map((step, i) => (
            <div
              key={step.label}
              className={`p-4 rounded-2xl transition-all duration-500 ${
                step.completed
                  ? "bg-green-500/10 border border-green-500/20"
                  : theme === "dark"
                    ? "bg-white/5"
                    : "bg-black/5"
              }`}
            >
              <step.icon
                className={`w-6 h-6 mx-auto mb-2 transition-colors duration-500 ${
                  step.completed ? "text-green-400" : theme === "dark" ? "text-white/40" : "text-black/40"
                }`}
              />
              <p
                className={`text-xs transition-colors duration-500 ${
                  step.completed ? "text-green-300" : theme === "dark" ? "text-white/60" : "text-black/60"
                }`}
              >
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
