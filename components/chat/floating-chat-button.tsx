"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"

interface FloatingChatButtonProps {
  onClick: () => void
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  const { theme } = useTheme()

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center z-40 transition-all ${
        theme === "dark" ? "bg-white text-black hover:bg-white/90" : "bg-black text-white hover:bg-black/90"
      }`}
    >
      <MessageCircle className="w-6 h-6" />

      {/* Pulse rings */}
      <div
        className={`absolute inset-0 rounded-full animate-ping ${theme === "dark" ? "bg-white/20" : "bg-black/20"}`}
      />
    </motion.button>
  )
}
