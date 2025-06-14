"use client"

import React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Header } from "@/components/layout/header"
import { AudioUpload } from "@/components/audio/audio-upload"
import { AudioProcessing } from "@/components/audio/audio-processing"
import { TranscriptionResults } from "@/components/audio/transcription-results"
import { ChatModal } from "@/components/chat/chat-modal"
import { FloatingChatButton } from "@/components/chat/floating-chat-button"
import { useAudio } from "@/components/providers/audio-provider"
import { useTheme } from "@/components/providers/theme-provider"

type AppState = "upload" | "processing" | "results"

export function MainApplication() {
  const [appState, setAppState] = useState<AppState>("upload")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const { currentJob, transcription } = useAudio()
  const { theme } = useTheme()

  // Auto-transition based on audio processing state
  React.useEffect(() => {
    if (currentJob) {
      if (currentJob.status === "processing") {
        setAppState("processing")
      } else if (currentJob.status === "completed" && transcription) {
        setAppState("results")
      }
    }
  }, [currentJob, transcription])

  const handleReset = () => {
    setAppState("upload")
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gradient-to-br from-black via-gray-900 to-black"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <AnimatePresence mode="wait">
          {appState === "upload" && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AudioUpload />
            </motion.div>
          )}

          {appState === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <AudioProcessing />
            </motion.div>
          )}

          {appState === "results" && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <TranscriptionResults onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <FloatingChatButton onClick={() => setIsChatOpen(true)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  )
}
