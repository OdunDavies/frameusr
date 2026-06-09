"use client"

import { useState, useEffect } from "react"
import { CameraView } from "@/components/camera-view"
import { PhotoGrid } from "@/components/photo-grid"
import { Button } from "@/components/ui/button"
import { generateGuestToken, formatDate } from "@/lib/utils"
import { downloadAllAsZip } from "@/lib/download"
import type { Event, Photo } from "@/lib/types"

interface Props {
  event: Event
  photos: Photo[]
  isRevealed: boolean
}

export function GuestView({ event, photos: initialPhotos, isRevealed: initialRevealed }: Props) {
  const [joined, setJoined] = useState(false)
  const [guestToken, setGuestToken] = useState("")
  const [eventId, setEventId] = useState("")
  const [shotsRemaining, setShotsRemaining] = useState(0)
  const [photos, setPhotos] = useState(initialPhotos)
  const [isRevealed, setIsRevealed] = useState(initialRevealed)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (event.reveal_at && !isRevealed) {
      const interval = setInterval(async () => {
        const res = await fetch(`/api/events/${event.id}/reveal`)
        const data = await res.json()
        if (data.revealed) {
          setIsRevealed(true)
          clearInterval(interval)
          const photosRes = await fetch(`/api/events/${event.id}/photos`)
          const photosData = await photosRes.json()
          setPhotos(photosData.photos ?? [])
        }
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [event.id, event.reveal_at, isRevealed])

  const handleJoin = async () => {
    const token = generateGuestToken()
    setGuestToken(token)

    const res = await fetch(`/api/events/join/${event.join_code}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })

    if (res.ok) {
      const data = await res.json()
      setEventId(data.event_id)
      setShotsRemaining(data.shots_remaining)
      setJoined(true)
    } else {
      const err = await res.json()
      alert(err.error || "Could not join this film")
    }
  }

  if (!joined && !isRevealed) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🎞️</div>
          <h1 className="font-serif text-2xl sm:text-3xl text-text">{event.title}</h1>
          <p className="text-muted mt-2 text-sm">
            Join this film and capture the moment.
          </p>
          <div className="mt-3 flex items-center justify-center gap-3 text-xs text-muted">
            <span>📸 {event.shot_limit} shots each</span>
            <span>👥 {event.guest_cap} guests max</span>
          </div>
          <Button size="lg" className="mt-6 w-full sm:w-auto" onClick={handleJoin}>
            Join & Start Shooting
          </Button>
        </div>
      </div>
    )
  }

  if (joined && !isRevealed) {
    return (
      <div className="flex-1 max-w-lg mx-auto w-full px-4">
        <div className="text-center py-4 sm:py-6">
          <h1 className="font-serif text-xl sm:text-2xl text-text">{event.title}</h1>
          <p className="text-xs text-muted mt-1">Snap your photos before the reveal</p>
        </div>
        <CameraView
          eventId={eventId}
          guestToken={guestToken}
          shotsRemaining={shotsRemaining}
          onPhotoTaken={() => {}}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="font-serif text-2xl sm:text-3xl text-text">{event.title}</h1>
        <p className="text-accent text-sm mt-1">
          {event.reveal_at ? `Revealed ${formatDate(event.reveal_at)}` : "This film has been revealed."}
        </p>
        <p className="text-muted text-xs mt-0.5">{photos.length} photos captured</p>
      </div>
      <PhotoGrid photos={photos} />
      {photos.length > 0 && (
        <div className="flex justify-center mt-6">
          <Button
            variant="secondary"
            disabled={downloading}
            onClick={async () => {
              setDownloading(true)
              await downloadAllAsZip(
                photos.map((p) => p.storage_path),
                `${event.title.replace(/\s+/g, "-").toLowerCase()}.zip`
              )
              setDownloading(false)
            }}
          >
            {downloading ? "Zipping..." : "Download all photos"}
          </Button>
        </div>
      )}
    </div>
  )
}
