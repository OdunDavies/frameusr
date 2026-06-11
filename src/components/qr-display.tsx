"use client"

import { useEffect, useRef, useState } from "react"
import QRCode from "qrcode"
import { Button } from "./ui/button"

interface QRDisplayProps {
  url: string
}

export function QRDisplay({ url }: QRDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    const size = Math.min(containerRef.current.clientWidth - 48, 200)
    QRCode.toCanvas(canvasRef.current, url, {
      width: size,
      margin: 2,
      color: { dark: "#2C2C2C", light: "#FAF8F5" },
    })
  }, [url])

  const copyLink = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-4 p-4 sm:p-6 bg-white rounded-xl border border-border">
      <canvas ref={canvasRef} className="rounded-lg max-w-full" />
      <Button variant="secondary" size="sm" className="w-full sm:w-auto" onClick={copyLink}>
        {copied ? "Copied!" : "Copy share link"}
      </Button>
    </div>
  )
}
