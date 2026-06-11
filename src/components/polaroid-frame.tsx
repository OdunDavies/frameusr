"use client"

import { motion } from "framer-motion"

interface PolaroidFrameProps {
  src: string
  alt?: string
  loading?: boolean
  className?: string
}

export function PolaroidFrame({ src, alt = "", loading = false, className = "" }: PolaroidFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -4, scale: 1.02, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
      className={`relative flex flex-col items-center mx-auto bg-white p-3 pb-10 rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow duration-300 ${className}`}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100">
        <img src={src} alt={alt} className="w-full h-full object-cover" />
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
