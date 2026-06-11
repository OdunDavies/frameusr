export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "filmroll",
    url: "https://filmrollapp.vercel.app",
    description:
      "A shared disposable camera for your event. Guests join via QR, snap photos, and the album reveals after the event.",
    applicationCategory: "Multimedia",
  }
}

export function webApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "filmroll",
    url: "https://filmrollapp.vercel.app",
    description:
      "A shared disposable camera app for events. Guests join via QR code, take limited photos, and the gallery reveals after the event.",
    applicationCategory: "Multimedia",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  }
}

export function faqPageSchema(questions: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
}

export function howToSchema(steps: { name: string; text: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to use filmroll for your event",
    description:
      "Create a shared disposable camera experience for your event guests.",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
      url: s.url,
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
