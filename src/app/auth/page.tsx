"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const COOLDOWN_SECONDS = 60

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (cooldown > 0) return
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/send-magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })

    setLoading(false)

    if (res.ok) {
      setSent(true)
      setCooldown(COOLDOWN_SECONDS)
    } else {
      const data = await res.json()
      const msg = data.error || "Something went wrong"
      if (msg.toLowerCase().includes("rate") || msg.toLowerCase().includes("limited")) {
        setError("Too many requests. Please wait a minute and try again.")
        setCooldown(COOLDOWN_SECONDS)
      } else {
        setError(msg)
      }
    }
  }, [email, cooldown])

  return (
    <div className="flex flex-1 items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl text-text text-center mb-8">
          filmroll
        </h1>

        {sent ? (
          <div className="text-center p-8 bg-white rounded-xl border border-border">
            <div className="text-4xl mb-3">✉️</div>
            <h2 className="font-semibold text-text">Check your email</h2>
            <p className="text-sm text-muted mt-1">
              We sent a magic link to <strong>{email}</strong>
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-4 text-sm text-accent hover:underline"
            >
              Send again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={error}
            />
            <Button type="submit" className="w-full" disabled={loading || cooldown > 0}>
              {loading ? "Sending..." : cooldown > 0 ? `Wait ${cooldown}s` : "Send magic link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
