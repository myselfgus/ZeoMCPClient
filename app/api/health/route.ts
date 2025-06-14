import { NextResponse } from "next/server"

export async function GET() {
  try {
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
      services: {
        mcp: {
          status: "ready",
          servers: ["transcription", "clinical-analysis"],
        },
        audio: {
          status: "ready",
          formats: ["webm", "mp3", "wav", "m4a"],
        },
        auth: {
          status: "ready",
          providers: ["demo", "enterprise"],
        },
      },
    }

    return NextResponse.json(healthData)
  } catch (error) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
