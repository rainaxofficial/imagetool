import React, { useState } from 'react'

const ImageResizer = () => {
  const [image, setImage] = useState(null)
  const [width, setWidth] = useState(300)
  const [height, setHeight] = useState(300)
  const [resized, setResized] = useState(null)

  const handleResize = () => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height)
      setResized(canvas.toDataURL())
    }
    img.src = URL.createObjectURL(image)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Image Resizer</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <div>
        <label>Width: </label>
        <input type="number" value={width} onChange={(e) => setWidth(+e.target.value)} className="border p-1 w-20" />
        <label className="ml-4">Height: </label>
        <input type="number" value={height} onChange={(e) => setHeight(+e.target.value)} className="border p-1 w-20" />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleResize}>Resize</button>
      {resized && (
        <div>
          <img src={resized} alt="Resized" className="mt-4" />
          <a href={resized} download="resized.png" className="text-blue-600 underline block mt-2">Download</a>
        </div>
      )}
    </div>
  )
}

export default ImageResizer