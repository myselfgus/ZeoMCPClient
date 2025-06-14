"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Bot, User, Sun, Moon } from "lucide-react"
import { useTheme } from "@/components/providers/theme-provider"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá! Sou o ZEO, seu assistente inteligente. Posso ajudar com qualquer assunto - tecnologia, ciência, medicina, ou apenas conversar. Como posso ajudá-lo?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { theme, toggleTheme } = useTheme()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      })

      const result = await response.json()

      setIsTyping(false)

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: result.success ? result.response : "Desculpe, ocorreu um erro. Tente novamente.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      setIsTyping(false)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Erro de conexão. Verifique sua internet.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 z-40 ${theme === "dark" ? "bg-black/60" : "bg-white/60"} backdrop-blur-sm`}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md h-[600px] z-50"
          >
            <div
              className={`h-full rounded-3xl border backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden ${
                theme === "dark" ? "bg-black/80 border-white/10" : "bg-white/90 border-black/10"
              }`}
            >
              {/* Header */}
              <div
                className={`p-4 border-b flex items-center justify-between ${
                  theme === "dark" ? "border-white/10" : "border-black/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      theme === "dark" ? "bg-white/10" : "bg-black/5"
                    }`}
                  >
                    <Bot className={`w-5 h-5 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>ZEO Assistant</h3>
                    <p
                      className={`text-xs flex items-center gap-1 ${
                        theme === "dark" ? "text-white/60" : "text-black/60"
                      }`}
                    >
                      <span className="w-2 h-2 bg-green-400 rounded-full" />
                      Online • Powered by xAI
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleTheme}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      theme === "dark"
                        ? "hover:bg-white/10 text-white/60 hover:text-white/80"
                        : "hover:bg-black/5 text-black/60 hover:text-black/80"
                    }`}
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={onClose}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      theme === "dark"
                        ? "hover:bg-white/10 text-white/60 hover:text-white/80"
                        : "hover:bg-black/5 text-black/60 hover:text-black/80"
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        theme === "dark" ? "bg-white/10" : "bg-black/5"
                      }`}
                    >
                      {message.sender === "bot" ? (
                        <Bot className={`w-4 h-4 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                      ) : (
                        <User className={`w-4 h-4 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                      )}
                    </div>

                    <div className="flex-1 space-y-1">
                      <div
                        className={`rounded-2xl p-3 max-w-[80%] ${
                          message.sender === "user"
                            ? theme === "dark"
                              ? "bg-white text-black ml-auto"
                              : "bg-black text-white ml-auto"
                            : theme === "dark"
                              ? "bg-white/10 text-white"
                              : "bg-black/5 text-black"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                      </div>
                      <p
                        className={`text-xs ${
                          theme === "dark" ? "text-white/40" : "text-black/40"
                        } ${message.sender === "user" ? "text-right" : ""}`}
                      >
                        {message.timestamp.toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        theme === "dark" ? "bg-white/10" : "bg-black/5"
                      }`}
                    >
                      <Bot className={`w-4 h-4 ${theme === "dark" ? "text-white/80" : "text-black/80"}`} />
                    </div>
                    <div className={`rounded-2xl p-3 ${theme === "dark" ? "bg-white/10" : "bg-black/5"}`}>
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
                            className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-white/60" : "bg-black/60"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className={`p-4 border-t ${theme === "dark" ? "border-white/10" : "border-black/10"}`}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Pergunte qualquer coisa..."
                    className={`flex-1 px-4 py-2 rounded-xl border outline-none transition-colors ${
                      theme === "dark"
                        ? "bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-white/20"
                        : "bg-black/5 border-black/10 text-black placeholder-black/40 focus:border-black/20"
                    }`}
                    disabled={isTyping}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isTyping}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-50 ${
                      theme === "dark"
                        ? "bg-white text-black hover:bg-white/90"
                        : "bg-black text-white hover:bg-black/90"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
