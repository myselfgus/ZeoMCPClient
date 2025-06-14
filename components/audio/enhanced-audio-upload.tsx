"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Mic, Upload, Square, Play } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { ZeoAnimations } from "@/lib/gsap"

export function EnhancedAudioUpload() {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioPreview, setAudioPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const intervalRef = useRef<NodeJS.Timeout>()
  const cardRef = useRef<HTMLDivElement>(null)
  const recordBtnRef = useRef<HTMLButtonElement>(null)

  const { startRecording, stopRecording, uploadFile, isProcessing } = useAudio()

  useEffect(() => {
    // Initialize GSAP animations for buttons
    if (recordBtnRef.current) {
      ZeoAnimations.setupButtonAnimations(".zeo-btn-primary, .zeo-btn-secondary")
    }

    // Initialize main app animations
    ZeoAnimations.initializeMainAppAnimations()
  }, [])

  const handleStartRecording = async () => {
    try {
      await startRecording()
      setIsRecording(true)
      setRecordingTime(0)

      // Add recording class for CSS animation
      if (recordBtnRef.current) {
        recordBtnRef.current.classList.add("recording")
      }

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Failed to start recording:", error)
      alert("Erro ao acessar o microfone. Verifique as permissões.")
    }
  }

  const handleStopRecording = async () => {
    try {
      const audioBlob = await stopRecording()
      setIsRecording(false)

      // Remove recording class
      if (recordBtnRef.current) {
        recordBtnRef.current.classList.remove("recording")
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }

      if (audioBlob) {
        const audioUrl = URL.createObjectURL(audioBlob)
        setAudioPreview(audioUrl)
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
      {/* Main Upload Card with Enhanced Styling */}
      <div ref={cardRef} className="zeo-upload-card">
        <div className="space-y-4">
          <motion.div
            animate={{
              scale: isRecording ? [1, 1.1, 1] : 1,
              rotate: isRecording ? [0, 5, -5, 0] : 0,
            }}
            transition={{
              duration: isRecording ? 2 : 0,
              repeat: isRecording ? Number.POSITIVE_INFINITY : 0,
            }}
            className="zeo-upload-icon"
          >
            <Mic className={`zeo-icon-main ${isRecording ? "text-red-400" : ""}`} />
          </motion.div>

          <div>
            <h2>Iniciar Gravação ou Enviar Áudio</h2>
            <p>Grave sua consulta ou faça upload de um arquivo de áudio</p>
          </div>
        </div>

        {/* Recording Controls with Enhanced Styling */}
        <div className="space-y-4">
          {!isRecording ? (
            <button
              ref={recordBtnRef}
              onClick={handleStartRecording}
              disabled={isProcessing}
              className="zeo-btn-primary"
            >
              <Mic className="zeo-btn-icon" />
              <span>Iniciar Gravação</span>
            </button>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />
                <span className="font-body text-white font-mono text-lg">{formatTime(recordingTime)}</span>
              </div>

              <button onClick={handleStopRecording} className="zeo-btn-primary recording">
                <Square className="zeo-btn-icon" />
                <span>Parar Gravação</span>
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="zeo-divider">ou</div>

          {/* File Upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="audio/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isProcessing}
            />
            <button onClick={() => fileInputRef.current?.click()} disabled={isProcessing} className="zeo-btn-secondary">
              <Upload className="zeo-btn-icon" />
              <span>Selecionar Arquivo</span>
            </button>
          </div>
        </div>

        {/* Audio Preview */}
        {audioPreview && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="zeo-transcription-content mt-6"
          >
            <p className="font-body text-white/80 text-sm mb-3">Prévia da Gravação</p>
            <audio controls className="w-full">
              <source src={audioPreview} type="audio/wav" />
              Seu navegador não suporta o elemento de áudio.
            </audio>
          </motion.div>
        )}
      </div>

      {/* Features Grid with Enhanced Styling */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            icon: Mic,
            title: "Gravação HD",
            description: "Qualidade de áudio profissional",
          },
          {
            icon: Upload,
            title: "Múltiplos Formatos",
            description: "MP3, WAV, M4A e mais",
          },
          {
            icon: Play,
            title: "Processamento IA",
            description: "Transcrição inteligente via MCP",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="zeo-upload-card p-4 space-y-2"
          >
            <feature.icon className="w-8 h-8 text-white/60 mx-auto" />
            <h3 className="font-heading font-semibold text-white text-sm">{feature.title}</h3>
            <p className="font-body text-white/50 text-xs">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
