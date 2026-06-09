export function applyFilmFilter(
  imageData: ImageData,
  style: "warm" | "bw" = "warm"
): ImageData {
  const data = imageData.data

  for (let i = 0; i < data.length; i += 4) {
    let r = data[i]
    let g = data[i + 1]
    let b = data[i + 2]

    if (style === "warm") {
      r = Math.min(255, r + 12)
      g = Math.min(255, g + 4)
      b = Math.max(0, b - 8)
      const grain = (Math.random() - 0.5) * 6
      r = Math.min(255, Math.max(0, r + grain))
      g = Math.min(255, Math.max(0, g + grain))
      b = Math.min(255, Math.max(0, b + grain))
    } else {
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b)
      r = gray
      g = gray
      b = gray
      const grain = (Math.random() - 0.5) * 10
      r = Math.min(255, Math.max(0, r + grain))
      g = Math.min(255, Math.max(0, g + grain))
      b = Math.min(255, Math.max(0, b + grain))
    }

    data[i] = r
    data[i + 1] = g
    data[i + 2] = b
  }

  return imageData
}

export function processImageWithFilter(
  file: File,
  style: "warm" | "bw" = "warm"
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const maxDim = 1920
      let { width, height } = img

      if (width > maxDim || height > maxDim) {
        const ratio = Math.min(maxDim / width, maxDim / height)
        width = Math.round(width * ratio)
        height = Math.round(height * ratio)
      }

      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")!

      ctx.drawImage(img, 0, 0, width, height)
      const imageData = ctx.getImageData(0, 0, width, height)
      const filtered = applyFilmFilter(imageData, style)
      ctx.putImageData(filtered, 0, 0)

      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url)
        if (blob) resolve(blob)
        else reject(new Error("Failed to process image"))
      }, file.type || "image/jpeg", 0.92)
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error("Failed to load image"))
    }

    img.src = url
  })
}
