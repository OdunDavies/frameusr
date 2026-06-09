"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const form = new FormData(e.currentTarget)
    const data = {
      title: form.get("title") as string,
      shot_limit: parseInt(form.get("shot_limit") as string) || 24,
      guest_cap: parseInt(form.get("guest_cap") as string) || 50,
      reveal_at: (form.get("reveal_at") as string) || null,
    }

    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (res.ok) {
      const event = await res.json()
      router.push(`/event/${event.id}`)
    } else {
      const err = await res.json()
      setError(err.error || "Failed to create film")
    }
  }

  return (
    <div className="flex-1 max-w-lg mx-auto w-full px-6 py-12">
      <h1 className="font-serif text-3xl text-text mb-8">Create a New Film</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          id="title"
          name="title"
          label="Film name"
          placeholder="Sarah & Tom's Wedding"
          required
        />

        <Input
          id="shot_limit"
          name="shot_limit"
          label="Shots per guest"
          type="number"
          defaultValue={24}
          min={1}
          max={100}
        />

        <Input
          id="guest_cap"
          name="guest_cap"
          label="Maximum guests"
          type="number"
          defaultValue={50}
          min={1}
          max={500}
        />

        <Input
          id="reveal_at"
          name="reveal_at"
          label="Reveal photos at (optional)"
          type="datetime-local"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Film"}
        </Button>
      </form>
    </div>
  )
}
