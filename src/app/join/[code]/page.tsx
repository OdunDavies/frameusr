import { createClient } from "@/lib/supabase/server"
import { GuestView } from "./guest-view"
import type { Event, Photo } from "@/lib/types"

export default async function JoinPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const supabase = await createClient()

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("join_code", code)
    .single<Event>()

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h1 className="font-serif text-2xl text-text">Film not found</h1>
          <p className="text-muted mt-1">This link may be expired or invalid.</p>
        </div>
      </div>
    )
  }

  const now = new Date()
  const revealTime = event.reveal_at ? new Date(event.reveal_at) : null
  const isRevealed = !!(event.is_revealed || (revealTime && now >= revealTime))

  let photos: Photo[] = []
  if (isRevealed) {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .eq("event_id", event.id)
      .order("taken_at", { ascending: true })
      .returns<Photo[]>()
    photos = data ?? []
  }

  return (
    <GuestView
      event={event}
      photos={photos}
      isRevealed={isRevealed}
    />
  )
}
