import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event, error } = await supabase
    .from("events")
    .select("id, is_revealed, reveal_at, status")
    .eq("id", id)
    .single()

  if (error || !event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 })
  }

  const now = new Date()
  const revealTime = event.reveal_at ? new Date(event.reveal_at) : null
  const shouldReveal = revealTime && now >= revealTime

  if (shouldReveal && !event.is_revealed) {
    await supabase
      .from("events")
      .update({ is_revealed: true, status: "revealed" })
      .eq("id", id)
  }

  return NextResponse.json({
    revealed: event.is_revealed || !!shouldReveal,
  })
}
