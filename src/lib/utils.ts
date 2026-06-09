import { nanoid } from "nanoid"

export function generateJoinCode(): string {
  return nanoid(10)
}

export function generateGuestToken(): string {
  return nanoid(24)
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ")
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
