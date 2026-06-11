"use client"

import Link from "next/link"
import Script from "next/script"
import { motion } from "framer-motion"
import { faqPageSchema, howToSchema } from "@/lib/schema"
import { AnimateIn, StaggerContainer, StaggerItem, HeroVisual, FilmStripDecoration, DemoPolaroid } from "@/components/animations"

const faqs = [
  {
    question: "What is filmroll and how does it work?",
    answer:
      "filmroll is a shared disposable camera for events. Hosts create a digital film, share a QR code or link with guests, and everyone captures moments through their phone camera. Photos stay hidden until the host reveals them — building anticipation like a real disposable camera.",
  },
  {
    question: "Do guests need to download an app?",
    answer:
      "No. Guests join by scanning a QR code or opening a link in their browser. There is no app download and no account required to participate.",
  },
  {
    question: "How much does filmroll cost?",
    answer:
      "filmroll is free to use during early access. You can create films, invite guests, and download all photos at no cost.",
  },
  {
    question: "Can guests see photos before the reveal?",
    answer:
      "No. Photos are hidden until the host sets reveal time passes or the host manually reveals them. This keeps the experience present and builds anticipation.",
  },
  {
    question: "How many guests can join a film?",
    answer:
      "Hosts set a guest cap when creating a film, up to 500 guests. Each guest gets a limited number of shots — just like a real disposable camera.",
  },
  {
    question: "Can I download the photos after the event?",
    answer:
      "Yes. After the film is revealed, all photos can be downloaded individually or as a zip file. Photos never expire.",
  },
  {
    question: "Can guests use any phone?",
    answer:
      "Yes. filmroll works on any phone with a browser — iPhone, Android, or anything else. No app download needed.",
  },
  {
    question: "Is filmroll private?",
    answer:
      "Yes. Each film is private by default. Only people with the QR code or link can join and see photos. The host controls who has access.",
  },
]

const steps = [
  {
    name: "Create a film",
    text: "Name your film, set how many shots each guest gets, and pick when photos reveal. Customize the cover and rules for your event.",
  },
  {
    name: "Share the QR code",
    text: "Share the unique QR code or link with your guests. They join instantly in their browser — no app download, no account.",
  },
  {
    name: "Guests capture together",
    text: "Everyone takes photos throughout the event. Each guest has a limited number of shots, encouraging thoughtful, genuine moments.",
  },
  {
    name: "Photos develop after the event",
    text: "Photos unlock at your chosen time. Everyone can relive the event through each other's eyes and download every photo.",
  },
]

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
}

export default function Home() {
  const faqSchema = faqPageSchema(faqs)
  const howTo = howToSchema(
    steps.map((s) => ({
      ...s,
      url: `${siteUrl}/auth`,
    }))
  )

  return (
    <div className="flex flex-col flex-1">
      <Script id="schema-faq" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(faqSchema)}
      </Script>
      <Script id="schema-howto" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(howTo)}
      </Script>

      <header className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-5xl mx-auto w-full">
        <motion.span
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="font-serif text-2xl text-text"
        >
          filmroll
        </motion.span>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href="/auth" className="text-sm text-text hover:text-accent transition-colors">
            Sign in
          </Link>
        </motion.div>
      </header>

      <main className="flex-1 flex flex-col items-center">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20 text-center max-w-5xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 variants={childVariants} className="font-serif text-4xl sm:text-5xl md:text-6xl text-text max-w-2xl leading-tight">
              Your event, through everyone&apos;s eyes.
            </motion.h1>
            <motion.p variants={childVariants} className="mt-6 text-base sm:text-lg text-secondary max-w-lg">
              A shared disposable camera for your event. Guests join via QR, snap
              photos, and the album reveals after the party.
            </motion.p>
            <motion.div variants={childVariants}>
              <Link
                href="/auth"
                className="mt-10 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
              >
                Create your first film
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Hero visual - polaroid cluster */}
        <section className="w-full px-4 sm:px-6 max-w-5xl mx-auto">
          <HeroVisual />
        </section>

        <FilmStripDecoration />

        {/* Use cases */}
        <AnimateIn direction="up" className="w-full border-t border-border">
          <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20">
            <AnimateIn direction="up" delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl text-text text-center mb-4">
                Perfect for any event
              </h2>
              <p className="text-center text-muted max-w-md mx-auto mb-12">
                Weddings, parties, corporate events — filmroll works wherever you want authentic guest-captured photos.
              </p>
            </AnimateIn>
            <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <StaggerItem>
                <Link
                  href="/wedding"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border hover:shadow-md transition-all h-full"
                >
                  <span className="text-3xl mb-3">💍</span>
                  <h3 className="font-semibold text-text text-lg">Weddings</h3>
                  <p className="text-sm text-muted mt-1">
                    Let guests capture candid moments from their seat.
                  </p>
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link
                  href="/party"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border hover:shadow-md transition-all h-full"
                >
                  <span className="text-3xl mb-3">🎉</span>
                  <h3 className="font-semibold text-text text-lg">Parties</h3>
                  <p className="text-sm text-muted mt-1">
                    Everyone snaps the night from their perspective.
                  </p>
                </Link>
              </StaggerItem>
              <StaggerItem>
                <Link
                  href="/corporate"
                  className="flex flex-col items-center text-center p-6 bg-white rounded-xl border border-border hover:shadow-md transition-all h-full"
                >
                  <span className="text-3xl mb-3">🏢</span>
                  <h3 className="font-semibold text-text text-lg">Corporate</h3>
                  <p className="text-sm text-muted mt-1">
                    Team events and offsites captured by everyone.
                  </p>
                </Link>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </AnimateIn>

        {/* How it works */}
        <section className="w-full bg-white border-t border-border" id="how-it-works">
          <AnimateIn direction="up" className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-16 sm:py-20">
            <AnimateIn direction="up" delay={0.1}>
              <h2 className="font-serif text-3xl sm:text-4xl text-text text-center mb-12">
                How filmroll works
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

        {/* FAQ */}
        <section className="w-full max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20" id="faq">
          <AnimateIn direction="up">
            <h2 className="font-serif text-3xl sm:text-4xl text-text text-center mb-12">
              Frequently asked questions
            </h2>
          </AnimateIn>
          <StaggerContainer staggerDelay={0.06}>
            {faqs.map((faq, i) => (
              <StaggerItem key={i}>
                <details className="group bg-white rounded-xl border border-border overflow-hidden mb-4">
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none hover:bg-zinc-50 transition-colors">
                    <h3 className="font-medium text-text text-sm sm:text-base pr-4">
                      {faq.question}
                    </h3>
                    <span className="text-muted shrink-0 group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5">
                    <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>

        {/* CTA */}
        <section className="w-full bg-white border-t border-border">
          <AnimateIn direction="up" className="flex flex-col items-center px-4 sm:px-6 py-16 sm:py-20 text-center max-w-lg mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.15 } },
              }}
            >
              <motion.h2
                variants={childVariants}
                className="font-serif text-3xl sm:text-4xl text-text"
              >
                Capture your next event.
              </motion.h2>
              <motion.p variants={childVariants} className="mt-4 text-muted">
                Create a film, share the link, and see your event through everyone&apos;s eyes.
              </motion.p>
              <motion.div variants={childVariants}>
                <Link
                  href="/auth"
                  className="mt-8 w-full sm:w-auto inline-flex items-center justify-center px-8 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-hover transition-colors shadow-sm"
                >
                  Get started free
                </Link>
              </motion.div>
            </motion.div>
          </AnimateIn>
        </section>
      </main>

      <footer className="border-t border-border px-4 sm:px-6 py-8">
        <div className="max-w-5xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <span className="font-serif text-lg text-text">filmroll</span>
          <p>&copy; {new Date().getFullYear()} filmroll. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
