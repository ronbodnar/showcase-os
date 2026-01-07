import { ProgramId, ProgramMetadata } from "@features/program/types"
import Icon from "@shared/components/icon/Icon"
import { CarouselControls } from "./CarouselControls"
import { useCarousel } from "./useCarousel"

interface Props {
  programs: { id: ProgramId; meta: ProgramMetadata; backgroundImage?: string }[]
  autoPlay?: boolean
  autoPlayInterval?: number
  className?: string
  onSelectProgram?: (programId: ProgramId) => void
}

export function ProgramCarousel({
  programs,
  autoPlay = true,
  autoPlayInterval = 5000,
  className,
  onSelectProgram,
}: Props) {
  const { index, setIndex, next, prev, handleTouchStart, handleTouchMove, handleTouchEnd } =
    useCarousel(programs.length, autoPlay, autoPlayInterval)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="flex transition-transform duration-500 w-full h-full"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {programs.map((program) => (
          <div
            key={program.id}
            className="w-full h-full shrink-0 relative flex rounded-lg overflow-hidden cursor-pointer"
            onClick={() => onSelectProgram?.(program.id as ProgramId)}
          >
            {/* Right: scalable background */}
            <div
              className="flex-1 h-full"
              style={{
                backgroundColor: program.meta.background?.color ?? "#6c5ce7",
                backgroundImage: program.meta.background?.image
                  ? `url(${program.meta.background.image})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />

            {/* Left overlay content */}
            <div className="absolute left-0 top-0 h-full w-full flex p-4 pt-0 lg:pt-4 z-10 text-white">
              {/* Icon column */}
              {program.meta.icon && (
                <div className="shrink-0 h-full w-15 lg:w-20 flex items-center justify-center mr-4">
                  <Icon name={program.meta.icon} className="rounded-lg" />
                </div>
              )}

              {/* Text column */}
              <div className="flex flex-col justify-center">
                <h3 className="text-sm lg:text-lg font-bold">{program.meta.name}</h3>
                <p className="text-xs lg:text-sm line-clamp-2">
                  {program.meta.details?.description?.short}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      {programs.length > 1 && (
        <CarouselControls
          items={programs.length}
          index={index}
          prev={prev}
          next={next}
          setIndex={setIndex}
        />
      )}
    </div>
  )
}
