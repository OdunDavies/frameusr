"use client"

import { useRef, useState, useCallback } from "react"
import { Button } from "./ui/button"
import { processImageWithFilter } from "@/lib/film-filter"

interface CameraViewProps {
  eventId: string
  guestToken: string
  shotsRemaining: number
  onPhotoTaken: () => void
}

export function CameraView({ eventId, guestToken, shotsRemaining, onPhotoTaken }: CameraViewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [shotsLeft, setShotsLeft] = useState(shotsRemaining)

  const handleCapture = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || shotsLeft <= 0) return

    setUploading(true)

    try {
      const processed = await processImageWithFilter(file, "warm")
      const previewUrl = URL.createObjectURL(processed)
      setPreview(previewUrl)

      const formData = new FormData()
      formData.append("photo", processed, file.name)
      formData.append("eventId", eventId)
      formData.append("guestToken", guestToken)

      const res = await fetch("/api/events/upload", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Upload failed")

      setShotsLeft((p) => p - 1)
      onPhotoTaken()
    } catch {
      alert("Failed to upload photo. Try again.")
    } finally {
      setUploading(false)
      setPreview(null)
      if (fileInputRef.current) fileInputRef.current.value = ""
    }
  }, [eventId, guestToken, shotsLeft, onPhotoTaken])

  if (shotsLeft <= 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">📸</div>
        <h2 className="text-xl font-semibold text-text">All done!</h2>
        <p className="text-muted mt-1">You&apos;ve used all your shots.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <div className="text-center">
        <p className="text-sm text-muted">
          <span className="font-semibold text-accent text-lg">{shotsLeft}</span> shots remaining
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCapture}
      />

      {preview ? (
        <div className="relative w-full max-w-sm aspect-[4/3] rounded-xl overflow-hidden bg-zinc-200">
          <img src={preview} alt="" className="w-full h-full object-cover" />
          {uploading && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-full max-w-sm aspect-[4/3] rounded-xl border-2 border-dashed border-border bg-white flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors touch-manipulation"
        >
          <span className="text-5xl mb-2">📷</span>
          <span className="text-sm text-muted">Tap to capture</span>
        </div>
      )}

      <Button
        size="lg"
        className="w-full max-w-xs"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? "Developing..." : "Take Photo"}
      </Button>
    </div>
  )
}
