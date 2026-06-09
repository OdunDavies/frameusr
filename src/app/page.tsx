import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      <header className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto w-full">
        <span className="font-serif text-2xl text-text">Frames</span>
        <Link
          href="/auth"
          className="text-sm text-text hover:text-accent transition-colors"
        >
          Sign in
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="font-serif text-5xl sm:text-6xl text-text max-w-2xl leading-tight">
          Your event, through everyone&apos;s eyes.
        </h1>
        <p className="mt-6 text-lg text-secondary max-w-lg">
          A shared disposable camera for your event. Guests join via QR, snap
          photos, and the album reveals after the party.
        </p>

        <Link
          href="/auth"
          className="mt-10 inline-flex items-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
        >
          Create your first film
        </Link>

        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl w-full">
          {[
            { step: "01", title: "Create a film", desc: "Name your film, set shot limits, and pick when photos reveal." },
            { step: "02", title: "Share the QR", desc: "Guests join instantly — no app download, no account needed." },
            { step: "03", title: "Relive together", desc: "Photos unlock at your chosen time. Download them all." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <span className="text-sm font-mono text-accent">{item.step}</span>
              <h3 className="mt-2 font-semibold text-text">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
