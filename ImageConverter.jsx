import React, { useState } from 'react'

const ImageConverter = () => {
  const [image, setImage] = useState(null)
  const [format, setFormat] = useState('image/png')
  const [converted, setConverted] = useState(null)

  const handleConvert = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      setConverted(canvas.toDataURL(format))
    }
    img.src = URL.createObjectURL(image)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Image Converter</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <select value={format} onChange={(e) => setFormat(e.target.value)} className="border p-2">
        <option value="image/png">PNG</option>
        <option value="image/jpeg">JPG</option>
        <option value="image/webp">WEBP</option>
      </select>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleConvert}>Convert</button>
      {converted && (
        <div>
          <img src={converted} alt="Converted" className="mt-4" />
          <a href={converted} download={`converted.${format.split('/')[1]}`} className="text-blue-600 underline block mt-2">Download</a>
        </div>
      )}
    </div>
  )
}

export default ImageConverter