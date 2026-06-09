import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(
  request: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params
  const supabase = await createClient()

  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Missing guest token" }, { status: 400 })
    }

    const { data: event, error: eventError } = await supabase
      .from("events")
      .select("*")
      .eq("join_code", code)
      .single()

    if (eventError || !event) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 })
    }

    if (event.status === "archived") {
      return NextResponse.json({ error: "This film has been archived" }, { status: 410 })
    }

    if (event.is_revealed || (event.reveal_at && new Date() >= new Date(event.reveal_at))) {
      return NextResponse.json({ error: "This film has already been revealed" }, { status: 410 })
    }

    const { count: guestCount } = await supabase
      .from("guests")
      .select("*", { count: "exact", head: true })
      .eq("event_id", event.id)

    if (guestCount && guestCount >= event.guest_cap) {
      return NextResponse.json({ error: "This film is full" }, { status: 403 })
    }

    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .insert({
        event_id: event.id,
        token,
        shots_remaining: event.shot_limit,
      })
      .select()
      .single()

    if (guestError) {
      return NextResponse.json({ error: guestError.message }, { status: 500 })
    }

    return NextResponse.json({
      event_id: event.id,
      guest_id: guest.id,
      shots_remaining: guest.shots_remaining,
    })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
