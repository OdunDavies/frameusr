import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { nanoid } from "nanoid"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("photo") as File | null
    const eventId = formData.get("eventId") as string | null
    const guestToken = formData.get("guestToken") as string | null

    if (!file || !eventId || !guestToken) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data: guest, error: guestError } = await supabase
      .from("guests")
      .select("id, shots_remaining, event_id")
      .eq("token", guestToken)
      .eq("event_id", eventId)
      .single()

    if (guestError || !guest) {
      return NextResponse.json({ error: "Invalid guest" }, { status: 403 })
    }

    if (guest.shots_remaining <= 0) {
      return NextResponse.json({ error: "No shots remaining" }, { status: 403 })
    }

    const ext = file.name.split(".").pop() || "jpg"
    const storagePath = `${eventId}/${guest.id}/${nanoid()}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from("photos")
      .upload(storagePath, file)

    if (uploadError) {
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }

    await supabase.from("photos").insert({
      event_id: eventId,
      guest_id: guest.id,
      storage_path: storagePath,
      width: 0,
      height: 0,
    })

    await supabase
      .from("guests")
      .update({ shots_remaining: guest.shots_remaining - 1 })
      .eq("id", guest.id)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
