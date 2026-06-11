import type { Metadata, Viewport } from "next"
import { Inter, Instrument_Serif } from "next/font/google"
import Script from "next/script"
import { organizationSchema, webApplicationSchema } from "@/lib/schema"
import { FilmGrain } from "@/components/animations"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
}

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://filmrollapp.vercel.app"

export const metadata: Metadata = {
  title: "filmroll — Capture your event through everyone's eyes",
  description:
    "A shared disposable camera for your event. Guests join via QR, snap photos, and the album reveals after the event.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "filmroll — Capture your event through everyone's eyes",
    description:
      "A shared disposable camera for your event. Guests join via QR, snap photos, and the album reveals after the event.",
    url: siteUrl,
    siteName: "filmroll",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "filmroll — Capture your event through everyone's eyes",
    description:
      "A shared disposable camera for your event. Guests join via QR, snap photos, and the album reveals after the event.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJson = organizationSchema()
  const appJson = webApplicationSchema()

  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans">
        <Script id="schema-organization" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(orgJson)}
        </Script>
        <Script id="schema-webapplication" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(appJson)}
        </Script>
        <FilmGrain />
        {children}
      </body>
    </html>
  )
}
