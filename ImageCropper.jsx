import React, { useState, useRef } from 'react'

const ImageCropper = () => {
  const [image, setImage] = useState(null)
  const [cropped, setCropped] = useState(null)
  const canvasRef = useRef(null)

  const handleCrop = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = 200
      canvas.height = 200
      ctx.drawImage(img, 50, 50, 200, 200, 0, 0, 200, 200)
      setCropped(canvas.toDataURL())
    }
    img.src = URL.createObjectURL(image)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Image Cropper</h2>
      <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleCrop}>Crop</button>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {cropped && (
        <div>
          <img src={cropped} alt="Cropped" className="mt-4" />
          <a href={cropped} download="cropped.png" className="text-blue-600 underline block mt-2">Download</a>
        </div>
      )}
    </div>
  )
}

export default ImageCropper