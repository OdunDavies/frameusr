import Link from "next/link"
import Script from "next/script"
import { faqPageSchema, howToSchema, breadcrumbSchema } from "@/lib/schema"
import { AnimateIn, StaggerContainer, StaggerItem, HeroVisual, FilmStripDecoration, DemoPolaroid } from "@/components/animations"

const faqs = [
  {
    question: "How can I use filmroll at my wedding?",
    answer:
      "Set up a filmroll film with a custom title and QR code. Print the QR on table tents, place cards, or a sign at the entrance. Guests scan and snap candid moments throughout the reception.",
  },
  {
    question: "Can guests take photos at the ceremony and reception?",
    answer:
      "Yes. The film stays open from when you share the QR until the reveal time you set. Guests can take photos at any point, from getting ready through the reception.",
  },
  {
    question: "How do guests access the wedding film?",
    answer:
      "They scan the QR code with their phone camera. No app download or account needed — it opens right in their browser.",
  },
  {
    question: "When do the wedding photos get revealed?",
    answer:
      "You choose the reveal time when creating the film — typically the day after the wedding or during the brunch. Photos unlock automatically for everyone who joined.",
  },
  {
    question: "Can we download all the wedding photos?",
    answer:
      "Yes. After the film is revealed, the host can download all photos as a zip file. Guests can view the gallery but only the host can download.",
  },
  {
    question: "How many photos can each wedding guest take?",
    answer:
      "You set the shot limit per guest — typically 3–5 shots, just like a disposable camera. This encourages thoughtful captures.",
  },
]

const steps = [
  {
    name: "Create your wedding film",
    text: "Set up a film for your wedding day — name it, choose how many shots each guest gets, and set the reveal time for after the celebration.",
  },
  {
    name: "Share the QR at your venue",
    text: "Print the unique QR code on table cards, a sign at the bar, or a note at each place setting. Guests scan with their phone — no app needed.",
  },
  {
    name: "Guests capture candid moments",
    text: "Throughout the reception, guests snap photos from their perspective. Limited shots mean each capture is intentional and meaningful.",
  },
  {
    name: "Relive the day after the wedding",
    text: "Photos unlock at your chosen reveal time. Every guest who joined can see the full gallery, and you can download every photo.",
  },
]

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

export const metadata = {
  title: "filmroll for Weddings — A shared disposable camera for your wedding day",
  description:
    "Let your wedding guests capture candid moments through their own eyes. Create a shared film, share a QR code, and relive every perspective after the big day.",
  openGraph: {
    title: "filmroll for Weddings — A shared disposable camera for your wedding day",
    description:
      "Let your wedding guests capture candid moments through their own eyes. Create a shared film, share a QR code, and relive every perspective after the big day.",
  },
}

export default function WeddingPage() {
  const faqSchema = faqPageSchema(faqs)
  const howTo = howToSchema(
    steps.map((s) => ({
      ...s,
      url: `${siteUrl}/auth`,
    }))
  )
  const breadcrumb = breadcrumbSchema([
    { name: "Home", url: siteUrl },
    { name: "Wedding", url: `${siteUrl}/wedding` },
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
              Your wedding, through your guests&apos; eyes.
            </h1>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.15}>
            <p className="mt-6 text-base sm:text-lg text-secondary max-w-lg">
              A shared disposable camera for your wedding. Guests scan a QR, snap
              candid moments, and the album reveals the morning after.
            </p>
          </AnimateIn>
          <AnimateIn direction="up" delay={0.3}>
            <Link
              href="/auth"
              className="mt-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
            >
              Create your wedding film
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
                How it works for your wedding
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
              Wedding questions
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
                Make your wedding unforgettable.
              </h2>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.15}>
              <p className="mt-4 text-muted">
                Create a shared film and let every guest capture the day.
              </p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.3}>
              <Link
                href="/auth"
                className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
              >
                Create your wedding film
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
