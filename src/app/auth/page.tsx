"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AuthPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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
    } else {
      const data = await res.json()
      setError(data.error || "Something went wrong")
    }
  }

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
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send magic link"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
