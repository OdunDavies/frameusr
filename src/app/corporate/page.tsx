import Link from "next/link"
import Script from "next/script"
import { faqPageSchema, howToSchema, breadcrumbSchema } from "@/lib/schema"
import { AnimateIn, StaggerContainer, StaggerItem, HeroVisual, FilmStripDecoration, DemoPolaroid } from "@/components/animations"

const faqs = [
  {
    question: "How can I use filmroll for corporate events?",
    answer:
      "Create a film for team offsites, holiday parties, conferences, or company retreats. Share the QR around the venue and let team members capture the event from their perspective.",
  },
  {
    question: "What types of corporate events work best?",
    answer:
      "Team building days, holiday parties, conference booths, company retreats, product launches, office parties, and client appreciation events all work well with filmroll.",
  },
  {
    question: "Do attendees need to sign up or download anything?",
    answer:
      "No. Attendees scan the QR code with their phone camera — it opens directly in their browser. No app install, no account creation, no friction.",
  },
  {
    question: "Can I control how many photos each person takes?",
    answer:
      "Yes. You set the shot limit per guest when creating the film. This prevents spam and keeps the photo collection curated.",
  },
  {
    question: "Can the company download all photos after the event?",
    answer:
      "Yes. After the film is revealed, the host can download all photos as a zip file for internal use, social media, or recap content.",
  },
  {
    question: "Is there a limit on how many guests can join?",
    answer:
      "You set the guest cap when creating the film — up to 500 guests. Perfect for events of any size.",
  },
]

const steps = [
  {
    name: "Create a corporate event film",
    text: "Set up a film for your team event — name it after the occasion, set shot limits, and choose the reveal time.",
  },
  {
    name: "Share the QR around the venue",
    text: "Print the QR code on signs, table tents, or badges. Share it in the team chat or email. Guests scan and start snapping.",
  },
  {
    name: "Team members capture their perspective",
    text: "Everyone takes photos throughout the event. The limited shots encourage genuine, candid moments instead of endless phone snaps.",
  },
  {
    name: "Share the album after the event",
    text: "Photos unlock at your chosen time. Download everything as a zip for internal recaps, social posts, or company memories.",
  },
]

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

export const metadata = {
  title: "filmroll for Corporate Events — A shared camera for team events",
  description:
    "Let your team capture corporate events through their own eyes. Create a shared film for offsites, holiday parties, and conferences.",
  openGraph: {
    title: "filmroll for Corporate Events — A shared camera for team events",
    description:
      "Let your team capture corporate events through their own eyes. Create a shared film for offsites, holiday parties, and conferences.",
  },
}

export default function CorporatePage() {
  const faqSchema = faqPageSchema(faqs)
  const howTo = howToSchema(
    steps.map((s) => ({
      ...s,
      url: `${siteUrl}/auth`,
    }))
  )
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Corporate", url: `${siteUrl}/corporate` },
  ])

  return (
    <div className="flex flex-col flex-1">
      <Script id="schema-breadcrumb" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(breadcrumb)}
      </Script>
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="schema-howto" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(howTo)}
      </Script>

      <header className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-5xl mx-auto w-full">
        <Link href="/" className="font-serif text-2xl text-text">filmroll</Link>
        <Link href="/auth" className="text-sm text-text hover:text-accent transition-colors">
          Sign in
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center">
        <section className="flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center max-w-5xl mx-auto w-full">
          <AnimateIn direction="up">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-text max-w-2xl leading-tight">
              Your corporate event, through the team&apos;s eyes.
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-secondary max-w-lg">
              A shared disposable camera for corporate events. Offsites, holiday
              parties, and conferences — captured by everyone who attended.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.3}>
            <Link
              href="/auth"
              className="mt-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
            >
              Create your corporate film
            </Link>
          </AnimateIn>
        </section>

        {/* Hero visual */}
        <section className="w-full px-4 sm:px-6 max-w-5xl mx-auto">
          <HeroVisual />
        </section>

        <FilmStripDecoration />

        <section className="w-full bg-white border-t border-border" id="how-it-works">
          <AnimateIn direction="up" className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20">
            <AnimateIn direction="up" delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl text-text text-center mb-12">
                How it works for your corporate event
              </h2>
            </AnimateIn>
            <StaggerContainer staggerDelay={0.15}>
              {steps.map((step, i) => (
                <StaggerItem key={i}>
                  <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 py-6 items-start">
                    <span className="text-sm font-mono text-accent shrink-0 pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-text">{step.name}</h3>
                      <p className="text-muted mt-1">{step.text}</p>
                    </div>
                    <div className="w-40 shrink-0 hidden sm:block">
                      <DemoPolaroid text={step.name} index={i} />
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimateIn>
        </section>

        <FilmStripDecoration />

        <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20" id="faq">
          <AnimateIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl text-text text-center mb-12">
              Corporate event questions
            </h2>
          </AnimateIn>
          <StaggerContainer staggerDelay={0.06}>
            {faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group bg-white rounded-xl border border-border overflow-hidden mb-4">
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none hover:bg-zinc-50 transition-colors">
                    <h3 className="font-medium text-text text-sm sm:text-base pr-4">{faq.question}</h3>
                    <span className="text-muted shrink-0 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        <section className="w-full bg-white border-t border-border">
          <div className="flex flex-col items-center px-4 sm:px-6 py-16 sm:py-20 text-center max-w-lg mx-auto">
            <AnimateIn direction="up">
              <h2 className="font-serif text-3xl sm:text-4xl text-text">
                Make your event memorable.
              </h2>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.15}>
              <p className="mt-4 text-muted">
                Create a shared film and let your team capture the moment.
              </p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <Link
                href="/auth"
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
              >
                Create your corporate film
              </Link>
            </AnimateIn>
          </div>
        </section>
      </main>

      <footer className="border-t border-border px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <Link href="/" className="font-serif text-lg text-text">filmroll</Link>
          <p>&copy; {new Date().getFullYear()} filmroll. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
