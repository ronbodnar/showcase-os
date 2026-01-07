import { memo, useRef, useState, useCallback } from "react"

interface PhotoViewerProps {
  src: string
}

export const PhotoViewer = memo(function PhotoViewer({ src }: PhotoViewerProps) {
  const [_isZoomed, setIsZoomed] = useState(false)

  return (
    <div className="flex flex-col h-full w-full bg-surface overflow-hidden">
      <ZoomableImage key={src} src={src} onZoomChange={setIsZoomed} />
    </div>
  )
})

function ZoomableImage({ src, onZoomChange }: { src: string; onZoomChange: (z: boolean) => void }) {
  const [scale, setScale] = useState(1)
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const imageRef = useRef<HTMLImageElement>(null)

  const handlePointerUp = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation()

      if (scale > 1) {
        setScale(1)
        setPosition({ x: 50, y: 50 })
        onZoomChange(false)
      } else {
        if (!imageRef.current) return

        // Calculate click coordinates relative to image dimensions
        const { left, top, width, height } = imageRef.current.getBoundingClientRect()
        const x = ((e.clientX - left) / width) * 100
        const y = ((e.clientY - top) / height) * 100

        setPosition({ x, y })
        setScale(2.5)
        onZoomChange(true)
      }
    },
    [scale, onZoomChange],
  )

  const handleMouseMove = (e: React.MouseEvent) => {
    if (scale === 1 || !imageRef.current) return

    const { left, top, width, height } = imageRef.current.getBoundingClientRect()

    // Smoothly update the transform origin based on mouse movement
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100

    setPosition({ x, y })
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${scale > 1 ? "cursor-zoom-out" : "cursor-zoom-in"}`}
      onPointerUp={handlePointerUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setScale(1)
        onZoomChange(false)
      }}
    >
      <img
        ref={imageRef}
        src={src}
        alt=""
        className={`max-w-full max-h-full object-contain transition-transform duration-200 ease-out pointer-events-none`}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
      />
    </div>
  )
}

export default PhotoViewer
