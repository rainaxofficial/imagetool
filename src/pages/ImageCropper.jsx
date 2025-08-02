// src/pages/ImageCropper.jsx import React, { useState, useCallback } from 'react'; import Cropper from 'react-easy-crop'; import getCroppedImg from '../utils/cropImage'; import { Button } from '@/components/ui/button';
export default function ImageCropper() { const [image, setImage] = useState(null); const [crop, setCrop] = useState({ x: 0, y: 0 }); const [zoom, setZoom] = useState(1); const [croppedAreaPixels, setCroppedAreaPixels] = useState(null); const [croppedImage, setCroppedImage] = useState(null);
const onCropComplete = useCallback((_, croppedAreaPixels) => { setCroppedAreaPixels(croppedAreaPixels); }, []);
const handleFileChange = (e) => { const file = e.target.files[0]; if (file) { setImage(URL.createObjectURL(file)); } };
const showCroppedImage = async () => { try { const croppedImg = await getCroppedImg(image, croppedAreaPixels); setCroppedImage(croppedImg); } catch (e) { console.error(e); } };
return ( <div className="space-y-6"> <h2 className="text-2xl font-bold">Crop Image</h2>
<input type="file" accept="image/*" onChange={handleFileChange} />
  {image && (
    <div className="relative w-full h-96 bg-gray-200">
      <Cropper
        image={image}
        crop={crop}
        zoom={zoom}
        aspect={4 / 3}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
    </div>
  )}

  {image && (
    <div className="flex gap-4">
      <Button onClick={showCroppedImage}>Crop</Button>
    </div>
  )}

  {croppedImage && (
    <div>
      <h3 className="text-lg font-semibold">Cropped Result:</h3>
      <img src={croppedImage} alt="Cropped" className="rounded shadow mt-2 max-w-full" />
    </div>
  )}
</div>

); }


