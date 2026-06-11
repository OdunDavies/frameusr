"use client"

import { motion } from "framer-motion"
import type { Photo } from "@/lib/types"
import { photoUrl } from "@/lib/download"

interface PhotoGridProps {
  photos: Photo[]
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-muted"
      >
        <p className="text-lg">No photos yet</p>
        <p className="text-sm">Photos will appear here after the reveal.</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.05 } },
      }}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3"
    >
      {photos.map((photo) => (
        <motion.a
          key={photo.id}
          href={photoUrl(photo.storage_path)}
          target="_blank"
          rel="noopener noreferrer"
          variants={{
            hidden: { opacity: 0, scale: 0.9 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
          }}
          whileHover={{ scale: 1.04, zIndex: 10 }}
          className="aspect-square rounded-lg overflow-hidden bg-zinc-100"
        >
          <img
            src={photoUrl(photo.storage_path)}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.a>
      ))}
    </motion.div>
  )
}
