import JSZip from "jszip"

const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/photos`

export async function downloadAllAsZip(paths: string[], filename: string = "photos.zip") {
  const zip = new JSZip()

  await Promise.all(
    paths.map(async (storagePath, i) => {
      try {
        const res = await fetch(`${STORAGE_URL}/${storagePath}`)
        const blob = await res.blob()
        const ext = storagePath.split(".").pop() || "jpg"
        zip.file(`photo-${i + 1}.${ext}`, blob)
      } catch {}
    })
  )

  const blob = await zip.generateAsync({ type: "blob" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export function photoUrl(storagePath: string): string {
  return `${STORAGE_URL}/${storagePath}`
}
