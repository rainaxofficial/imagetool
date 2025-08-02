import React, { useState } from 'react'

const ImageRotator = () => {
  const [image, setImage] = useState(null)
  const [rotated, setRotated] = useState(null)

  const handleRotate = () => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = img.height
      canvas.height = img.width
      ctx.translate(canvas.width / 2, canvas.height / 2)
      ctx.rotate(90 * Math.PI / 180)
      ctx.drawImage(img, -img.width / 2, -img.height / 2)
      setRotated(canvas.toDataURL())
    }
    img.src = URL.createObjectURL(image)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Image Rotator (90°)</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleRotate}>Rotate</button>
      {rotated && (
        <div>
          <img src={rotated} alt="Rotated" className="mt-4" />
          <a href={rotated} download="rotated.png" className="text-blue-600 underline block mt-2">Download</a>
        </div>
      )}
    </div>
  )
}

export default ImageRotator
