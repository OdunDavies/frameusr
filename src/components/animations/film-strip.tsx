"use client"

import { motion } from "framer-motion"

const sprocketHoles = Array.from({ length: 12 }, (_, i) => i)

export function FilmStripDecoration() {
  return (
    <div className="w-full overflow-hidden py-4 opacity-40">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-4 items-center"
      >
        {sprocketHoles.map((i) => (
          <div key={i} className="flex items-center gap-4 shrink-0">
            {/* Sprocket hole */}
            <div className="w-3 h-4 rounded-sm border border-border bg-white" />
            {/* Frame */}
            <div className="w-16 h-16 bg-white rounded border border-border flex items-center justify-center shadow-sm">
              <div className="w-12 h-12 bg-zinc-100 rounded-sm" />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
