import { redirect } from "next/navigation"
import Link from "next/link"
import Script from "next/script"
import { createClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { breadcrumbSchema } from "@/lib/schema"
import type { Event } from "@/lib/types"

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

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

  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Dashboard", url: `${siteUrl}/dashboard` },
  ])

  return (
    <div className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8">
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumb)}
      </Script>
      <nav className="text-sm text-muted mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-text transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-text">Dashboard</span>
      </nav>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl text-text">Your Films</h1>
          <p className="text-sm text-muted mt-1">
            {events?.length ?? 0} film{(events?.length ?? 0) !== 1 ? "s" : ""}
          </p>
        </div>
        <Link href="/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Create a New Film</Button>
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
