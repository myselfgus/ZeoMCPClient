"use client"

import { motion } from "framer-motion"
import { Download, RotateCcw, Copy, CheckCircle } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { useState } from "react"

interface TranscriptionResultsProps {
  onReset: () => void
}

export function TranscriptionResults({ onReset }: TranscriptionResultsProps) {
  const { transcription, analysis, currentJob } = useAudio()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (transcription) {
      await navigator.clipboard.writeText(transcription)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleExport = () => {
    if (transcription) {
      const blob = new Blob([transcription], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `transcricao-${new Date().toISOString().slice(0, 10)}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-effect rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h2 className="font-heading text-xl font-semibold text-white">Transcrição Completa</h2>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="font-body text-green-300 text-sm">Concluído</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCopy}
            className="glass-button rounded-xl px-4 py-2 font-body text-sm text-white hover:scale-[1.02] transition-all duration-300 flex items-center space-x-2"
          >
            {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Copiado!" : "Copiar"}</span>
          </button>

          <button
            onClick={handleExport}
            className="glass-button rounded-xl px-4 py-2 font-body text-sm text-white hover:scale-[1.02] transition-all duration-300 flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>

          <button
            onClick={onReset}
            className="bg-white/90 hover:bg-white text-black rounded-xl px-4 py-2 font-body text-sm font-medium hover:scale-[1.02] transition-all duration-300 flex items-center space-x-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Nova Transcrição</span>
          </button>
        </div>
      </div>

      {/* Transcription Content */}
      <div className="glass-effect rounded-2xl p-6 space-y-4">
        <h3 className="font-heading font-semibold text-white">Transcrição</h3>
        <div className="glass-effect rounded-xl p-6 min-h-[200px]">
          <p className="font-body text-white/90 leading-relaxed whitespace-pre-wrap">
            {transcription || "Transcrição não disponível"}
          </p>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-semibold text-white">Resumo Clínico</h3>
            <p className="font-body text-white/80 text-sm leading-relaxed">
              {analysis.summary || "Resumo não disponível"}
            </p>
          </div>

          <div className="glass-effect rounded-2xl p-6 space-y-4">
            <h3 className="font-heading font-semibold text-white">Palavras-chave</h3>
            <div className="flex flex-wrap gap-2">
              {analysis.keywords?.map((keyword, index) => (
                <span key={index} className="glass-effect rounded-full px-3 py-1 font-body text-white/80 text-sm">
                  {keyword}
                </span>
              )) || <span className="font-body text-white/60 text-sm">Nenhuma palavra-chave identificada</span>}
            </div>
          </div>
        </div>
      )}

      {/* Metadata */}
      <div className="glass-effect rounded-xl p-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <p className="font-body text-white/40 text-xs uppercase tracking-wider">Duração</p>
            <p className="font-heading text-white font-semibold">{currentJob?.duration || "--:--"}</p>
          </div>
          <div>
            <p className="font-body text-white/40 text-xs uppercase tracking-wider">Qualidade</p>
            <p className="font-heading text-white font-semibold">HD</p>
          </div>
          <div>
            <p className="font-body text-white/40 text-xs uppercase tracking-wider">Idioma</p>
            <p className="font-heading text-white font-semibold">PT-BR</p>
          </div>
          <div>
            <p className="font-body text-white/40 text-xs uppercase tracking-wider">Modelo</p>
            <p className="font-heading text-white font-semibold">MCP-AI</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
