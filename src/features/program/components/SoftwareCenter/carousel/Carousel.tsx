import { ProgramId, ProgramMetadata } from "@features/program/types"
import Icon from "@shared/components/Icon"
import { CarouselControls } from "./CarouselControls"
import { useCarousel } from "./useCarousel"
import { processService } from "@core/services/processService"

interface ProgramAsset {
  id: ProgramId
  meta: ProgramMetadata
  backgroundImage?: string
}

interface Props {
  assets: string[] | ProgramAsset[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
  onSelectProgram?: (programId: ProgramId) => void
}

export function Carousel({
  assets,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  onSelectProgram,
}: Props) {
  const { index, setIndex, next, prev, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useCarousel(assets.length, autoPlay, autoPlayInterval)

  const isImageSrc = (asset: string | ProgramAsset) => typeof asset === "string"

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
      className={`relative overflow-hidden shadow-2xl shadow-black/30 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 w-full h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {assets.map((asset) =>
          isImageSrc(asset) ? (
            <div
              key={asset}
              className="w-full h-full shrink-0"
              onPointerUp={(e) => handlePointerUp(e, asset)}
            >
              <img src={asset} alt="" className="w-full h-full object-contain" />
            </div>
          ) : (
            <div
              key={asset.id}
              className="w-full h-full shrink-0 relative flex rounded-lg overflow-hidden cursor-pointer"
              onPointerUp={() => onSelectProgram?.(asset.id as ProgramId)}
            >
              {/* Right: scalable background */}
              <div
                className="flex-1 h-full"
                style={{
                  backgroundColor: asset.meta.background?.color ?? "#6c5ce7",
                  backgroundImage: asset.meta.background?.image
                    ? `url(${asset.meta.background.image})`
                    : undefined,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {/* Left overlay content */}
              <div className="absolute left-0 top-0 h-full w-full flex p-4 pt-0 lg:pt-4 z-10 text-white">
                {/* Icon column */}
                {asset.meta.icon && (
                  <div className="shrink-0 h-full w-15 lg:w-20 flex items-center justify-center mr-4">
                    <Icon name={asset.meta.icon} className="rounded-lg" />
                  </div>
                )}

                {/* Text column */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm lg:text-lg font-bold">{asset.meta.name}</h3>
                  <p className="text-xs lg:text-sm line-clamp-2">
                    {asset.meta.details?.description?.short}
                  </p>
                </div>
              </div>
            </div>
          ),
        )}
      </div>

      {assets.length > 1 && (
        <CarouselControls
          items={assets.length}
          index={index}
          prev={prev}
          next={next}
          setIndex={setIndex}
        />
      )}
    </div>
  )
}
