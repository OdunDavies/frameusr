import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { EventHostView } from "./event-host-view"
import type { Event, Photo } from "@/lib/types"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/auth")

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single<Event>()

  if (!event || event.host_id !== user.id) redirect("/dashboard")

  const { data: photos } = await supabase
    .from("photos")
    .select("*")
    .eq("event_id", id)
    .order("taken_at", { ascending: true })
    .returns<Photo[]>()

  const { count: guestCount } = await supabase
    .from("guests")
    .select("*", { count: "exact", head: true })
    .eq("event_id", id)

  return (
    <EventHostView
      event={event}
      photos={photos ?? []}
      guestCount={guestCount ?? 0}
    />
  )
}
