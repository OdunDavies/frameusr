import type { Photo } from "@/lib/types"
import { photoUrl } from "@/lib/download"

interface PhotoGridProps {
  photos: Photo[]
}

export function PhotoGrid({ photos }: PhotoGridProps) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted">
        <p className="text-lg">No photos yet</p>
        <p className="text-sm">Photos will appear here after the reveal.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
      {photos.map((photo) => (
        <a
          key={photo.id}
          href={photoUrl(photo.storage_path)}
          target="_blank"
          rel="noopener noreferrer"
          className="aspect-square rounded-lg overflow-hidden bg-zinc-100 hover:opacity-90 transition-opacity"
        >
          <img
            src={photoUrl(photo.storage_path)}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </a>
      ))}
    </div>
  )
}
