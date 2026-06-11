"use client"

import { motion } from "framer-motion"

interface DemoPolaroidProps {
  text: string
  rotate?: number
  index?: number
}

const placeholderImg = (text: string) =>
  `https://placehold.co/600x450/F5F0EB/D4815B?text=${encodeURIComponent(text)}`

export function DemoPolaroid({ text, rotate = 0, index = 0 }: DemoPolaroidProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -6, rotate: 0, scale: 1.02 }}
      className="bg-white p-2 pb-8 rounded-[2px] shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="w-full aspect-[4/3] overflow-hidden bg-zinc-100 rounded-[1px]">
        <img
          src={placeholderImg(text)}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  )
}
