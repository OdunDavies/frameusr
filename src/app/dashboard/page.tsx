import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Event } from "@/lib/types"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth")
  }

  const { data: events } = await supabase
    .from("events")
    .select("*")
    .eq("host_id", user.id)
    .order("created_at", { ascending: false })
    .returns<Event[]>()

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-6 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-text">Your Films</h1>
          <p className="text-sm text-muted mt-1">
            {events?.length ?? 0} film{(events?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/create">
          <Button>Create a New Film</Button>
        </Link>
      </div>

      {!events || events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🎞️</div>
          <h2 className="text-xl font-semibold text-text">No films yet</h2>
          <p className="text-muted mt-1 mb-6">Create your first shared film for an event.</p>
          <Link href="/create">
            <Button>Create a Film</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/event/${event.id}`}
              className="group bg-white rounded-xl border border-border overflow-hidden hover:shadow-md transition-all"
            >
              <div className="aspect-[4/3] bg-zinc-100 flex items-center justify-center">
                {event.cover_url ? (
                  <img src={event.cover_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-4xl">🎞️</span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-text group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted">
                  <span className={statusColor(event.status)}>
                    {event.status}
                  </span>
                  <span>{formatDate(event.created_at)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

function statusColor(status: string) {
  switch (status) {
    case "active": return "text-green-600"
    case "developing": return "text-amber-600"
    case "revealed": return "text-accent"
    case "archived": return "text-muted"
    default: return ""
  }
}
