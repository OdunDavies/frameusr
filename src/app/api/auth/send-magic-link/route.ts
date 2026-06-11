import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS = 3
const WINDOW_MS = 60_000

function getClientIp(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const now = Date.now()
    const entry = rateLimit.get(ip)

    if (entry && now < entry.resetAt) {
      if (entry.count >= MAX_REQUESTS) {
        return NextResponse.json(
          { error: "Too many requests. Please wait a minute and try again." },
          { status: 429 }
        )
      }
      entry.count++
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    }

    const { email } = await request.json()
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/confirm`,
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ sent: true })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
