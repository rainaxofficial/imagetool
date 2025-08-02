import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import ImageResizer from './pages/ImageResizer'
import ImageConverter from './pages/ImageConverter'
import ImageCompressor from './pages/ImageCompressor'
import ImageCropper from './pages/ImageCropper'
import ImageRotator from './pages/ImageRotator'

export default function App() {
  return (
    <Router>
      <div className="p-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🛠️ Image Tools App</h1>
        <nav className="mb-6 space-x-4">
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          <Link to="/resize" className="text-blue-500 hover:underline">Resize</Link>
          <Link to="/convert" className="text-blue-500 hover:underline">Convert</Link>
          <Link to="/compress" className="text-blue-500 hover:underline">Compress</Link>
          <Link to="/crop" className="text-blue-500 hover:underline">Crop</Link>
          <Link to="/rotate" className="text-blue-500 hover:underline">Rotate</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resize" element={<ImageResizer />} />
          <Route path="/convert" element={<ImageConverter />} />
          <Route path="/compress" element={<ImageCompressor />} />
          <Route path="/crop" element={<ImageCropper />} />
          <Route path="/rotate" element={<ImageRotator />} />
        </Routes>
      </div>
    </Router>
  )
}
