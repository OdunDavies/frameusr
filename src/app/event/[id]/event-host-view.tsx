"use client"

import { QRDisplay } from "@/components/qr-display"
import { PhotoGrid } from "@/components/photo-grid"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { downloadAllAsZip } from "@/lib/download"
import type { Event, Photo } from "@/lib/types"
import Link from "next/link"
import { useState } from "react"

interface Props {
  event: Event
  photos: Photo[]
  guestCount: number
}

export function EventHostView({ event, photos, guestCount }: Props) {
  const [downloading, setDownloading] = useState(false)
  const joinUrl = `${window.location.origin}/join/${event.join_code}`
  const now = new Date()
  const revealTime = event.reveal_at ? new Date(event.reveal_at) : null
  const isRevealed = !!(event.is_revealed || (revealTime && now >= revealTime))

  return (
    <div className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <Link href="/dashboard" className="text-sm text-muted hover:text-text mb-2 inline-block">
            &larr; Back to films
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl text-text">{event.title}</h1>
          <p className="text-sm text-muted mt-1">
            Created {formatDate(event.created_at)} &middot; {guestCount} guests joined &middot;{" "}
            <span className={isRevealed ? "text-accent" : "text-amber-600"}>
              {isRevealed ? "Revealed" : "Developing"}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <div className="md:col-span-1">
          <QRDisplay url={joinUrl} />
          <div className="mt-4 p-4 bg-white rounded-xl border border-border text-sm text-muted space-y-2">
            <p><strong className="text-text">Shots per guest:</strong> {event.shot_limit}</p>
            <p><strong className="text-text">Guest limit:</strong> {event.guest_cap}</p>
            {event.reveal_at && (
              <p><strong className="text-text">Reveals at:</strong> {formatDate(event.reveal_at)}</p>
            )}
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-text">
              Photos ({photos.length})
            </h2>
            {photos.length > 0 && (
              <Button
                variant="secondary"
                size="sm"
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
                {downloading ? "Zipping..." : "Download all"}
              </Button>
            )}
          </div>
          <PhotoGrid photos={photos} />
        </div>
      </div>
    </div>
  )
}
