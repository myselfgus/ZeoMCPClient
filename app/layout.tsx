import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Manrope } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/providers/auth-provider"
import { AudioProvider } from "@/components/providers/audio-provider"
import { MCPProvider } from "@/components/providers/mcp-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ZEO - AI Assistant",
  description: "Premium AI-powered assistant with xAI integration",
  keywords: ["AI", "Assistant", "xAI", "Grok"],
  authors: [{ name: "ZEO Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${manrope.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AuthProvider>
            <MCPProvider>
              <AudioProvider>{children}</AudioProvider>
            </MCPProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
