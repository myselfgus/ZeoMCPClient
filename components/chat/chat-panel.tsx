"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User } from "lucide-react"
import { useAudio } from "@/components/providers/audio-provider"

interface ChatPanelProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatPanel({ isOpen, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Olá! Sou o ZEO, seu assistente clínico. Como posso ajudá-lo hoje?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { transcription } = useAudio()

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

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(inputValue, transcription),
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userInput: string, context?: string) => {
    const responses = [
      "Baseado na transcrição, posso ajudar com análises específicas. O que gostaria de saber?",
      "Posso fornecer insights sobre os dados clínicos mencionados. Tem alguma dúvida específica?",
      "Estou aqui para auxiliar na interpretação dos dados médicos. Como posso ser útil?",
      "Com base no contexto da consulta, posso oferecer sugestões. O que precisa?",
    ]

    if (context) {
      return responses[Math.floor(Math.random() * responses.length)]
    }

    return "Entendo sua pergunta. Como posso ajudá-lo com informações clínicas?"
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />

          {/* Chat Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 glass-effect rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white/80" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-white">ZEO Assistant</h3>
                  <p className="font-body text-white/60 text-sm">Online</p>
                </div>
              </div>

              <button onClick={onClose} className="glass-button rounded-full p-2 hover:bg-white/10">
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex space-x-3 ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                >
                  <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center flex-shrink-0">
                    {message.sender === "bot" ? (
                      <Bot className="w-4 h-4 text-white/80" />
                    ) : (
                      <User className="w-4 h-4 text-white/80" />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div
                      className={`glass-effect rounded-2xl p-3 max-w-[80%] ${
                        message.sender === "user" ? "ml-auto bg-white/10" : "bg-white/5"
                      }`}
                    >
                      <p className="font-body text-white/90 text-sm leading-relaxed">{message.content}</p>
                    </div>
                    <p className="font-body text-white/40 text-xs">{formatTime(message.timestamp)}</p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex space-x-3">
                  <div className="w-8 h-8 glass-effect rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="glass-effect rounded-2xl p-3 bg-white/5">
                    <div className="flex space-x-1">
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
                          className="w-2 h-2 bg-white/60 rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 glass-effect rounded-xl px-4 py-3 font-body text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-white/90 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-xl p-3 transition-all duration-300 hover:scale-[1.02]"
                >
                  <Send className="w-5 h-5 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
