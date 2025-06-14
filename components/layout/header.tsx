"use client"

import { motion } from "framer-motion"
import { LogOut, Sun, Moon } from "lucide-react"
import { useAuth } from "@/components/providers/auth-provider"
import { useTheme } from "@/components/providers/theme-provider"
import { useMCP } from "@/components/providers/mcp-provider"

export function Header() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { connectionStatus, connectedServers } = useMCP()

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`border-b backdrop-blur-xl ${
        theme === "dark" ? "bg-black/20 border-white/10" : "bg-white/20 border-black/10"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1
              className={`font-bold text-3xl ${theme === "dark" ? "text-white" : "text-black"}`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              ZEO
            </h1>
            <div className="hidden md:block">
              <span
                className={`text-sm uppercase tracking-wider ${theme === "dark" ? "text-white/60" : "text-black/60"}`}
              >
                AI Assistant
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-2 h-2 rounded-full ${connectionStatus === "connected" ? "bg-green-400" : "bg-red-400"}`}
              />
              <span className={`text-sm ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                MCP: {connectedServers} servers
              </span>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                theme === "dark"
                  ? "bg-white/10 hover:bg-white/20 text-white/60 hover:text-white/80"
                  : "bg-black/5 hover:bg-black/10 text-black/60 hover:text-black/80"
              }`}
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div
              className={`rounded-xl p-2 flex items-center space-x-3 ${theme === "dark" ? "bg-white/5" : "bg-black/5"}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  theme === "dark" ? "bg-white/10" : "bg-black/10"
                }`}
              >
                <span className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-black"}`}>
                  {user?.avatar}
                </span>
              </div>
              <div className="hidden md:block">
                <p className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-black"}`}>{user?.name}</p>
                <p className={`text-xs ${theme === "dark" ? "text-white/60" : "text-black/60"}`}>
                  {user?.organization}
                </p>
              </div>
            </div>

            <button
              onClick={logout}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-red-500/10 ${
                theme === "dark"
                  ? "bg-white/5 text-white/60 hover:text-red-400"
                  : "bg-black/5 text-black/60 hover:text-red-500"
              }`}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}
