"use client"

import { motion } from "framer-motion"

const demoPhotos = [
  { rotate: -6, y: 0, delay: 0.2, text: "Candid moments" },
  { rotate: 4, y: 20, delay: 0.4, text: "Guest perspective" },
  { rotate: -2, y: -10, delay: 0.6, text: "Event memories" },
]

const placeholderImg = (text: string) =>
  `https://placehold.co/600x450/F5F0EB/D4815B?text=${encodeURIComponent(text)}`

export function HeroVisual() {
  return (
    <div className="relative flex items-center justify-center py-8 sm:py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.2 } },
        }}
        className="relative flex flex-wrap justify-center gap-4 sm:gap-6"
      >
        {demoPhotos.map((photo, i) => (
          <motion.div
            key={i}
            variants={{
              hidden: { opacity: 0, y: 40, rotate: 0 },
              visible: { opacity: 1, y: photo.y, rotate: photo.rotate, transition: { duration: 0.6, ease: "easeOut" } },
            }}
            whileHover={{ y: -8, rotate: 0, scale: 1.03, transition: { duration: 0.3 } }}
            className="relative bg-white p-2 pb-8 rounded-[2px] shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
            style={{ zIndex: demoPhotos.length - i }}
          >
            <div className="w-36 sm:w-44 aspect-[4/3] overflow-hidden bg-zinc-100 rounded-[1px]">
              <img
                src={placeholderImg(photo.text)}
                alt=""
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative camera icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 15 }}
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-10 bg-accent rounded-full flex items-center justify-center shadow-md"
      >
        <span className="text-lg">📷</span>
      </motion.div>
    </div>
  )
}
