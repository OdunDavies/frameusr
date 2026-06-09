"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { Button } from "./ui/button"

interface QRDisplayProps {
  url: string
}

export function QRDisplay({ url }: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, url, {
        width: 200,
        margin: 2,
        color: { dark: "#2C2C2C", light: "#FAF8F5" },
      })
    }
  }, [url])

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl border border-border">
      <canvas ref={canvasRef} className="rounded-lg" />
      <Button variant="secondary" size="sm" onClick={copyLink}>
        {copied ? "Copied!" : "Copy share link"}
      </Button>
    </div>
  )
}
