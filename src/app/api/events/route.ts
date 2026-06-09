import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { generateJoinCode } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, shot_limit, guest_cap, reveal_at } = await request.json()

    if (!title || !title.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 })
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single()

    if (!profile) {
      await supabase.from("profiles").insert({ id: user.id, name: user.email ?? "" })
    }

    const join_code = generateJoinCode()

    const { data, error } = await supabase
      .from("events")
      .insert({
        host_id: user.id,
        title: title.trim(),
        shot_limit: Math.min(Math.max(shot_limit || 24, 1), 100),
        guest_cap: Math.min(Math.max(guest_cap || 50, 1), 500),
        reveal_at: reveal_at || null,
        join_code,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
