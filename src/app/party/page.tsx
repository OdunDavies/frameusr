import Link from "next/link"
import Script from "next/script"
import { faqPageSchema, howToSchema, breadcrumbSchema } from "@/lib/schema"
import { AnimateIn, StaggerContainer, StaggerItem, HeroVisual, FilmStripDecoration, DemoPolaroid } from "@/components/animations"

const faqs = [
  {
    question: "How can I use filmroll for a party?",
    answer:
      "Create a film for your party, share the QR code around the venue, and let guests snap photos throughout the night. Photos unlock at the time you choose.",
  },
  {
    question: "What kind of parties work best with filmroll?",
    answer:
      "Birthday parties, house parties, milestone celebrations, bachelor/bachelorette, New Year's Eve, and any gathering where you want authentic guest-captured moments.",
  },
  {
    question: "Do guests need to download anything?",
    answer:
      "No. Guests scan the QR code with their phone camera and it opens in their browser. No app, no account, no friction.",
  },
  {
    question: "Can I set a photo limit per guest?",
    answer:
      "Yes. You choose how many shots each guest gets — typically 3–5. Limited shots keep the experience playful and intentional, like a real disposable camera.",
  },
  {
    question: "When do the party photos get revealed?",
    answer:
      "You set the reveal time when creating the film — right after the party, the next morning, or whenever you want. Photos unlock automatically.",
  },
  {
    question: "Can I share the QR code digitally?",
    answer:
      "Yes. Share the link or QR code via text, WhatsApp, Instagram, or any messaging app. Guests can also scan a printed QR at the venue.",
  },
]

const steps = [
  {
    name: "Create a party film",
    text: "Set up a film for your event — give it a fun name, choose the shot limit per guest, and pick when the photos reveal.",
  },
  {
    name: "Share the QR around the party",
    text: "Print the QR code or share it digitally. Place it near the drinks, the dance floor, or send it in the group chat.",
  },
  {
    name: "Guests snap throughout the night",
    text: "Everyone captures the party from their perspective. The shot limit keeps each photo meaningful and avoids a flood of blurry shots.",
  },
  {
    name: "Relive the party the next day",
    text: "Photos unlock at your chosen time. Watch the gallery fill with moments you might have missed — all from your guests' cameras.",
  },
]

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

export const metadata = {
  title: "filmroll for Parties — A shared camera for your next party",
  description:
    "Let your party guests capture the night through their own eyes. Create a shared film, share a QR code, and see every perspective after the party.",
  openGraph: {
    title: "filmroll for Parties — A shared camera for your next party",
    description:
      "Let your party guests capture the night through their own eyes. Create a shared film, share a QR code, and see every perspective after the party.",
  },
}

export default function PartyPage() {
  const faqSchema = faqPageSchema(faqs)
  const howTo = howToSchema(
    steps.map((s) => ({
      ...s,
      url: `${siteUrl}/auth`,
    }))
  )
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Party", url: `${siteUrl}/party` },
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
              Your party, through everyone&apos;s eyes.
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-secondary max-w-lg">
              A shared disposable camera for your party. Guests scan a QR, snap
              photos all night, and the album reveals the morning after.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.3}>
            <Link
              href="/auth"
              className="mt-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
            >
              Create your party film
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
                How it works for your party
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
              Party questions
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
                Make your party unforgettable.
              </h2>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.15}>
              <p className="mt-4 text-muted">
                Create a shared film and let every guest capture the night.
              </p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <Link
                href="/auth"
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
              >
                Create your party film
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
