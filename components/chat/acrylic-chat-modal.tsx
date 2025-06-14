"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Sparkles, Sun, Moon } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"
import { useTheme } from "@/components/providers/theme-provider"

interface AcrylicChatModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  isTyping?: boolean
}

export function AcrylicChatModal({ isOpen, onClose }: AcrylicChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o ZEO, seu assistente inteligente. Posso ajudar com questões clínicas, tecnologia, ciência, ou qualquer outro tópico. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { transcription } = useAudio()
  const { theme, toggleTheme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    try {
      // Call XAI API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          context: transcription ? { transcription } : null,
        }),
      })

      const result = await response.json()

      setIsTyping(false)

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: result.success ? result.response : "Desculpe, ocorreu um erro. Tente novamente.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Chat error:", error)
      setIsTyping(false)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Erro de conexão. Verifique sua internet e tente novamente.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="chat-modal-backdrop"
          />

          {/* Acrylic Chat Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="chat-modal-container"
          >
            <div className="chat-modal-acrylic">
              {/* Header */}
              <div className="chat-modal-header">
                <div className="flex items-center space-x-3">
                  <div className="chat-avatar-container">
                    <Bot className="w-5 h-5" />
                    <div className="chat-avatar-glow" />
                  </div>
                  <div>
                    <h3 className="chat-title">ZEO Assistant</h3>
                    <p className="chat-status">
                      <span className="chat-status-dot" />
                      Online • Powered by xAI
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button onClick={toggleTheme} className="chat-theme-toggle" title="Alternar tema">
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button onClick={onClose} className="chat-close-button">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="chat-messages-container">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`chat-message ${message.sender === "user" ? "chat-message-user" : "chat-message-bot"}`}
                  >
                    <div className="chat-message-avatar">
                      {message.sender === "bot" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>

                    <div className="chat-message-content">
                      <div className={`chat-message-bubble ${message.sender === "user" ? "user" : "bot"}`}>
                        <p>{message.content}</p>
                      </div>
                      <span className="chat-message-time">{formatTime(message.timestamp)}</span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="chat-message chat-message-bot"
                  >
                    <div className="chat-message-avatar">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="chat-message-content">
                      <div className="chat-typing-indicator">
                        <div className="chat-typing-dots">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 1, 0.3],
                              }}
                              transition={{
                                duration: 1.4,
                                repeat: Number.POSITIVE_INFINITY,
                                delay: i * 0.2,
                              }}
                              className="chat-typing-dot"
                            />
                          ))}
                        </div>
                        <span className="chat-typing-text">ZEO está pensando...</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="chat-input-container">
                <div className="chat-input-wrapper">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Pergunte qualquer coisa..."
                    className="chat-input"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="chat-send-button"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <div className="chat-input-hint">
                  <Sparkles className="w-3 h-3" />
                  <span>Powered by xAI Grok • Pergunte sobre qualquer assunto</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
