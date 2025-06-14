import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Mock MCP server status
    const servers = [
      {
        name: "transcription",
        status: "connected",
        transport: "http",
        capabilities: ["transcribe_audio", "analyze_speech"],
        health: {
          status: "healthy",
          lastPing: new Date().toISOString(),
          responseTime: 45,
        },
      },
      {
        name: "clinical-analysis",
        status: "connected",
        transport: "websocket",
        capabilities: ["analyze_clinical_text", "extract_keywords", "generate_summary"],
        health: {
          status: "healthy",
          lastPing: new Date().toISOString(),
          responseTime: 32,
        },
      },
      {
        name: "documents",
        status: "disconnected",
        transport: "stdio",
        capabilities: ["store_document", "retrieve_document", "search_documents"],
        health: {
          status: "error",
          lastPing: null,
          error: "Connection timeout",
        },
      },
    ]

    return NextResponse.json({
      success: true,
      servers,
      summary: {
        total: servers.length,
        connected: servers.filter((s) => s.status === "connected").length,
        healthy: servers.filter((s) => s.health.status === "healthy").length,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
