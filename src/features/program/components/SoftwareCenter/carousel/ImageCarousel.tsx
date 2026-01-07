import { processService } from "@core/services/processService"
import { CarouselControls } from "./CarouselControls"
import { useCarousel } from "./useCarousel"

interface Props {
  images: string[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
}

export function ImageCarousel({
  images,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
}: Props) {
  const { index, setIndex, next, prev, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useCarousel(images.length, autoPlay, autoPlayInterval)

  function handlePointerUp(e: React.MouseEvent<HTMLDivElement>, src: string) {
    e.stopPropagation()
    processService.startProcess({
      target: {
        type: "program",
        programId: "photo_viewer",
        args: {
          src,
        },
      },
    })
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 w-full h-full cursor-zoom-in"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src) => (
          <div
            key={src}
            className="w-full h-full shrink-0"
            onPointerUp={(e) => handlePointerUp(e, src)}
          >
            <img src={src} alt="" className="w-full h-full object-contain" />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <CarouselControls
          index={index}
          items={images.length}
          prev={prev}
          next={next}
          setIndex={setIndex}
        />
      )}
    </div>
  )
}
