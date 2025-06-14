"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Mic, Upload, Square } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { useTheme } from "@/components/providers/theme-provider"

export function AudioUpload() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const { startRecording, stopRecording, uploadFile, isProcessing } = useAudio()
  const { theme } = useTheme()

  const handleStartRecording = async () => {
    try {
      await startRecording()
      setIsRecording(true)
      setRecordingTime(0)

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      alert("Erro ao acessar o microfone. Verifique as permissões.")
    }
  }

  const handleStopRecording = async () => {
    try {
      await stopRecording()
      setIsRecording(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    } catch (error) {
      console.error("Failed to stop recording:", error)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      uploadFile(file)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div
        className={`backdrop-blur-xl border rounded-3xl p-8 text-center transition-all duration-300 hover:scale-[1.01] ${
          theme === "dark"
            ? "bg-white/5 border-white/10 hover:bg-white/10"
            : "bg-white/60 border-black/10 hover:bg-white/80"
        }`}
      >
        <motion.div
          animate={{
            scale: isRecording ? [1, 1.1, 1] : 1,
          }}
          transition={{
            duration: isRecording ? 2 : 0,
            repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
          }}
          className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 ${
            theme === "dark" ? "bg-white/10" : "bg-black/5"
          }`}
        >
          <Mic
            className={`w-10 h-10 ${
              isRecording ? "text-red-400" : theme === "dark" ? "text-white/60" : "text-black/60"
            }`}
          />
        </motion.div>

        <h2 className={`text-2xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-black"}`}>
          Iniciar Gravação ou Enviar Áudio
        </h2>
        <p className={`mb-8 ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
          Grave sua consulta ou faça upload de um arquivo de áudio
        </p>

        <div className="space-y-4">
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              disabled={isProcessing}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
              }`}
            >
              <div className="flex items-center gap-2">
                <Mic className="w-5 h-5" />
                Iniciar Gravação
              </div>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-4">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className={`font-mono text-lg ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {formatTime(recordingTime)}
                </span>
              </div>
              <button
                onClick={handleStopRecording}
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-2">
                  <Square className="w-5 h-5" />
                  Parar Gravação
                </div>
              </button>
            </div>
          )}

          <div className={`flex items-center gap-4 ${theme === "dark" ? "text-white/40" : "text-black/40"}`}>
            <div className="flex-1 h-px bg-current" />
            <span className="text-sm uppercase tracking-wider">ou</span>
            <div className="flex-1 h-px bg-current" />
          </div>

          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isProcessing}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className={`px-8 py-3 rounded-xl font-semibold border transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 ${
                theme === "dark"
                  ? "bg-white/5 border-white/20 text-white hover:bg-white/10"
                  : "bg-black/5 border-black/20 text-black hover:bg-black/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Selecionar Arquivo
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { icon: Mic, title: "Gravação HD", desc: "Qualidade profissional" },
          { icon: Upload, title: "Múltiplos Formatos", desc: "MP3, WAV, M4A" },
          { icon: Square, title: "Processamento IA", desc: "Transcrição inteligente" },
        ].map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`p-4 rounded-2xl text-center ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}
          >
            <feature.icon className={`w-8 h-8 mx-auto mb-2 ${theme === "dark" ? "text-white/60" : "text-black/60"}`} />
            <h3 className={`font-semibold text-sm mb-1 ${theme === "dark" ? "text-white" : "text-black"}`}>
              {feature.title}
            </h3>
            <p className={`text-xs ${theme === "dark" ? "text-white/50" : "text-black/50"}`}>{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
