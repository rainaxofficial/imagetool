import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from '../utils/cropImage'
import { Button } from '@/components/ui/button'

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedImage, setCroppedImage] = useState(null)

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageSrc(reader.result)
        setCroppedImage(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const cropImage = async () => {
    try {
      const cropped = await getCroppedImg(imageSrc, croppedAreaPixels)
      setCroppedImage(cropped)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">✂️ Crop Image</h2>

      <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4" />

      {imageSrc && (
        <div className="relative w-full aspect-square bg-gray-100">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
      )}

      {imageSrc && (
        <div className="mt-4 flex gap-4 items-center">
          <input
            type="range"
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e) => setZoom(e.target.value)}
            className="w-full"
          />
          <Button onClick={cropImage}>Crop</Button>
        </div>
      )}

      {croppedImage && (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Cropped Image:</h3>
          <img src={croppedImage} alt="Cropped" className="rounded-lg shadow-md max-w-full" />
        </div>
      )}
    </div>
  )
}
