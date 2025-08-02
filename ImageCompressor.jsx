import React, { useState } from 'react'

const ImageCompressor = () => {
  const [image, setImage] = useState(null)
  const [quality, setQuality] = useState(0.7)
  const [compressed, setCompressed] = useState(null)

  const handleCompress = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      setCompressed(canvas.toDataURL('image/jpeg', quality))
    }
    img.src = URL.createObjectURL(image)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Image Compressor</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <div>
        <label>Quality (0–1): </label>
        <input type="number" step="0.1" value={quality} onChange={(e) => setQuality(+e.target.value)} className="border p-1 w-24" />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCompress}>Compress</button>
      {compressed && (
        <div>
          <img src={compressed} alt="Compressed" className="mt-4" />
          <a href={compressed} download="compressed.jpg" className="text-blue-600 underline block mt-2">Download</a>
        </div>
      )}
    </div>
  )
}

export default ImageCompressor