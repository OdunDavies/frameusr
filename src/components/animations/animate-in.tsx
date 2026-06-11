"use client"

import { motion } from "framer-motion"

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  className?: string
  once?: boolean
}

const directionOffset = {
  up: { x: 0, y: 24 },
  down: { x: 0, y: -24 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

export function AnimateIn({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
  once = true,
}: AnimateInProps) {
  const offset = directionOffset[direction]

  return (
    <motion.div
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
