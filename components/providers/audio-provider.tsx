"use client"

import { createContext, useContext, useState, useRef, type ReactNode } from "react"

interface AudioJob {
  id: string
  status: "processing" | "completed" | "error"
  progress: number
  duration?: string
  createdAt: Date
  completedAt?: Date
}

interface AudioContextType {
  currentJob: AudioJob | null
  transcription: string | null
  analysis: {
    summary?: string
    keywords?: string[]
  } | null
  isProcessing: boolean
  startRecording: () => Promise<void>
  stopRecording: () => Promise<Blob | null>
  uploadFile: (file: File) => Promise<void>
  resetAudio: () => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

export function AudioProvider({ children }: { children: ReactNode }) {
  const [currentJob, setCurrentJob] = useState<AudioJob | null>(null)
  const [transcription, setTranscription] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const recordedChunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        },
      })

      streamRef.current = stream
      recordedChunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      })

      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.start(1000) // Collect data every second
    } catch (error) {
      console.error("Failed to start recording:", error)
      throw error
    }
  }

  const stopRecording = async (): Promise<Blob | null> => {
    return new Promise((resolve) => {
      if (!mediaRecorderRef.current) {
        resolve(null)
        return
      }

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: "audio/webm" })

        // Stop all tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
          streamRef.current = null
        }

        // Process the recorded audio
        processAudio(blob, "recording.webm")
        resolve(blob)
      }

      mediaRecorderRef.current.stop()
    })
  }

  const uploadFile = async (file: File) => {
    await processAudio(file, file.name)
  }

  const processAudio = async (audioBlob: Blob, filename: string) => {
    setIsProcessing(true)

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const job: AudioJob = {
      id: jobId,
      status: "processing",
      progress: 0,
      createdAt: new Date(),
    }

    setCurrentJob(job)
    setTranscription(null)
    setAnalysis(null)

    try {
      // Simulate MCP processing with realistic progress updates
      const progressSteps = [
        { progress: 10, delay: 500, message: "Uploading audio..." },
        { progress: 30, delay: 1000, message: "Analyzing audio quality..." },
        { progress: 50, delay: 1500, message: "Transcribing with AI..." },
        { progress: 70, delay: 2000, message: "Processing medical context..." },
        { progress: 90, delay: 1000, message: "Generating insights..." },
        { progress: 100, delay: 500, message: "Complete!" },
      ]

      for (const step of progressSteps) {
        await new Promise((resolve) => setTimeout(resolve, step.delay))

        setCurrentJob((prev) =>
          prev
            ? {
                ...prev,
                progress: step.progress,
              }
            : null,
        )
      }

      // Simulate transcription result
      const mockTranscription = `Paciente do sexo feminino, 45 anos, comparece à consulta relatando dor abdominal há aproximadamente 3 dias. A dor é localizada no quadrante superior direito, de intensidade moderada a forte, com irradiação para o ombro direito. Nega febre, náuseas ou vômitos associados.

Ao exame físico: paciente consciente, orientada, corada, hidratada, anictérica. Sinais vitais estáveis. Abdome: inspeção normal, palpação revela sensibilidade à palpação profunda em hipocôndrio direito, sem sinais de irritação peritoneal. Sinal de Murphy positivo.

Hipótese diagnóstica: Colecistite aguda. Solicitado ultrassom abdominal para confirmação diagnóstica e avaliação da vesícula biliar. Orientada dieta leve, analgesia conforme necessário e retorno em 48 horas ou se piora do quadro.`

      const mockAnalysis = {
        summary:
          "Consulta de paciente feminina de 45 anos com quadro sugestivo de colecistite aguda. Exame físico compatível com inflamação da vesícula biliar.",
        keywords: [
          "colecistite aguda",
          "dor abdominal",
          "hipocôndrio direito",
          "sinal de Murphy",
          "ultrassom abdominal",
        ],
      }

      setTranscription(mockTranscription)
      setAnalysis(mockAnalysis)

      setCurrentJob((prev) =>
        prev
          ? {
              ...prev,
              status: "completed",
              progress: 100,
              completedAt: new Date(),
              duration: "2:34",
            }
          : null,
      )
    } catch (error) {
      console.error("Audio processing failed:", error)
      setCurrentJob((prev) =>
        prev
          ? {
              ...prev,
              status: "error",
              progress: 0,
            }
          : null,
      )
    } finally {
      setIsProcessing(false)
    }
  }

  const resetAudio = () => {
    setCurrentJob(null)
    setTranscription(null)
    setAnalysis(null)
    setIsProcessing(false)

    // Clean up any ongoing recording
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
  }

  return (
    <AudioContext.Provider
      value={{
        currentJob,
        transcription,
        analysis,
        isProcessing,
        startRecording,
        stopRecording,
        uploadFile,
        resetAudio,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider")
  }
  return context
}
