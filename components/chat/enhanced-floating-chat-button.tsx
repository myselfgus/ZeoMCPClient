"use client"

import { motion } from "framer-motion"
import { MessageCircle, Sparkles } from "lucide-react"

interface EnhancedFloatingChatButtonProps {
  onClick: () => void
}

export function EnhancedFloatingChatButton({ onClick }: EnhancedFloatingChatButtonProps) {
  return (
    <motion.button
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="chat-fab"
    >
      <div className="chat-fab-content">
        <MessageCircle className="w-6 h-6" />
        <Sparkles className="w-3 h-3 chat-fab-sparkle" />
      </div>

      {/* Pulse rings */}
      <div className="chat-fab-ring chat-fab-ring-1" />
      <div className="chat-fab-ring chat-fab-ring-2" />
      <div className="chat-fab-ring chat-fab-ring-3" />

      {/* Glow effect */}
      <div className="chat-fab-glow" />
    </motion.button>
  )
}
