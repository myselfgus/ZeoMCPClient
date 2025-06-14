import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()

    if (!message) {
      return NextResponse.json({ success: false, error: "Message is required" }, { status: 400 })
    }

    const XAI_API_KEY = process.env.XAI_API_KEY

    if (!XAI_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "xAI API key not configured",
        },
        { status: 500 },
      )
    }

    // Prepare messages for xAI
    const messages = [
      {
        role: "system",
        content: `Você é o ZEO, um assistente inteligente versátil e amigável. Você pode ajudar com:

- Questões clínicas e médicas (quando relevante)
- Tecnologia e programação
- Ciência e pesquisa
- Educação e aprendizado
- Criatividade e arte
- Negócios e produtividade
- Questões gerais do dia a dia

Seja sempre útil, preciso e engajante. Adapte seu tom à pergunta do usuário. Para questões médicas, sempre recomende consultar profissionais de saúde qualificados para diagnósticos e tratamentos.`,
      },
    ]

    if (context?.transcription) {
      messages.push({
        role: "system",
        content: `Contexto adicional da consulta médica: ${context.transcription}`,
      })
    }

    messages.push({
      role: "user",
      content: message,
    })

    // Call xAI API
    const xaiResponse = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${XAI_API_KEY}`,
      },
      body: JSON.stringify({
        messages,
        model: "grok-beta",
        temperature: 0.7,
        max_tokens: 2000,
        stream: false,
      }),
    })

    if (!xaiResponse.ok) {
      const errorText = await xaiResponse.text()
      console.error("xAI API error:", xaiResponse.status, errorText)
      return NextResponse.json({
        success: false,
        error: `xAI API error: ${xaiResponse.status}`,
      })
    }

    const data = await xaiResponse.json()
    const response = data.choices[0].message.content

    return NextResponse.json({
      success: true,
      response,
      model: "grok-beta",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Chat error:", error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
