"use client"

import { useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { processImageWithFilter } from "@/lib/film-filter"
import { PolaroidFrame } from "./polaroid-frame"

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
  const [flash, setFlash] = useState(false)

  const handleCapture = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || shotsLeft <= 0) return

    setFlash(true)
    setTimeout(() => setFlash(false), 300)

    setUploading(true)

    try {
      const processed = await processImageWithFilter(file, "polaroid")
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          className="text-6xl mb-4"
        >
          📸
        </motion.div>
        <h2 className="text-xl font-semibold text-text">All done!</h2>
        <p className="text-muted mt-1">You&apos;ve used all your shots.</p>
      </motion.div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-50 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-sm text-muted">
          <span className="font-semibold text-accent text-lg">{shotsLeft}</span> shots remaining
        </p>
      </motion.div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleCapture}
      />

      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full max-w-sm"
          >
            <PolaroidFrame src={preview} loading={uploading} className="w-full" />
          </motion.div>
        ) : (
          <motion.div
            key="capture-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => fileInputRef.current?.click()}
            className="w-full max-w-sm aspect-[4/3] rounded-xl border-2 border-dashed border-border bg-white flex flex-col items-center justify-center cursor-pointer hover:border-accent transition-colors touch-manipulation"
          >
            <motion.span
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-5xl mb-2"
            >
              📷
            </motion.span>
            <span className="text-sm text-muted">Tap to capture</span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-xs"
      >
        <Button
          size="lg"
          className="w-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? "Developing..." : "Take Photo"}
        </Button>
      </motion.div>
    </div>
  )
}
