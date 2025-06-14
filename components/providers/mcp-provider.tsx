"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface MCPServer {
  name: string
  status: "connected" | "disconnected" | "error"
  capabilities: string[]
  lastPing?: Date
}

interface MCPContextType {
  servers: MCPServer[]
  connectionStatus: "connected" | "disconnected" | "partial"
  connectedServers: number
  connectToServer: (serverConfig: any) => Promise<boolean>
  disconnectFromServer: (serverName: string) => Promise<void>
  callTool: (toolName: string, args: any, serverName?: string) => Promise<any>
  getServerHealth: () => Promise<any>
}

const MCPContext = createContext<MCPContextType | undefined>(undefined)

export function MCPProvider({ children }: { children: ReactNode }) {
  const [servers, setServers] = useState<MCPServer[]>([
    {
      name: "transcription",
      status: "connected",
      capabilities: ["transcribe_audio", "analyze_speech"],
      lastPing: new Date(),
    },
    {
      name: "clinical-analysis",
      status: "connected",
      capabilities: ["analyze_clinical_text", "extract_keywords"],
      lastPing: new Date(),
    },
    {
      name: "documents",
      status: "disconnected",
      capabilities: ["store_document", "retrieve_document"],
    },
  ])

  const connectedServers = servers.filter((s) => s.status === "connected").length
  const connectionStatus =
    connectedServers === 0 ? "disconnected" : connectedServers === servers.length ? "connected" : "partial"

  const connectToServer = async (serverConfig: any): Promise<boolean> => {
    // Simulate server connection
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setServers((prev) =>
      prev.map((server) =>
        server.name === serverConfig.name ? { ...server, status: "connected", lastPing: new Date() } : server,
      ),
    )

    return true
  }

  const disconnectFromServer = async (serverName: string): Promise<void> => {
    setServers((prev) =>
      prev.map((server) =>
        server.name === serverName ? { ...server, status: "disconnected", lastPing: undefined } : server,
      ),
    )
  }

  const callTool = async (toolName: string, args: any, serverName?: string): Promise<any> => {
    // Simulate MCP tool call
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      success: true,
      result: `Tool ${toolName} executed successfully`,
      data: args,
    }
  }

  const getServerHealth = async (): Promise<any> => {
    return {
      totalServers: servers.length,
      connectedServers,
      servers: servers.map((s) => ({
        name: s.name,
        status: s.status,
        lastPing: s.lastPing,
      })),
    }
  }

  // Simulate periodic health checks
  useEffect(() => {
    const interval = setInterval(() => {
      setServers((prev) =>
        prev.map((server) => (server.status === "connected" ? { ...server, lastPing: new Date() } : server)),
      )
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <MCPContext.Provider
      value={{
        servers,
        connectionStatus,
        connectedServers,
        connectToServer,
        disconnectFromServer,
        callTool,
        getServerHealth,
      }}
    >
      {children}
    </MCPContext.Provider>
  )
}

export function useMCP() {
  const context = useContext(MCPContext)
  if (context === undefined) {
    throw new Error("useMCP must be used within an MCPProvider")
  }
  return context
}
