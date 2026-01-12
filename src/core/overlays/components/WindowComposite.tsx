import { memo, useCallback, useState } from "react"
import { ContainerSize } from "types"
import { CloseButton } from "@shared/components/CloseButton"

interface WindowCompositeProps {
  title: string
  frameSize: ContainerSize
  compositeSize: ContainerSize
  onClose?: (e: React.MouseEvent) => void
  onClick?: (e: React.MouseEvent) => void
  onMouseEnter?: (e: React.MouseEvent) => void
  onMouseLeave?: (e: React.MouseEvent) => void
  setRef?: (el: HTMLDivElement | null) => void
}

export const WindowComposite = memo(function WindowComposite({
  title,
  frameSize,
  compositeSize,
  onClose,
  onClick,
  onMouseEnter,
  onMouseLeave,
  setRef,
}: WindowCompositeProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      onMouseEnter?.(e)
      setIsHovered(true)
    },
    [onMouseEnter],
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      onMouseLeave?.(e)
      setIsHovered(false)
    },
    [onMouseLeave],
  )

  return (
    <div
      className={`flex flex-col gap-1 p-1 rounded-sm bg-shell/70 backdrop-blur-sm border ${isHovered ? "border-accent" : "border-border"}`}
      style={{ width: frameSize.width, height: frameSize.height }}
      onClick={onClick}
      onPointerUp={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Composite title */}
      <div className="h-6 flex items-center justify-between px-1">
        <span className="text-text text-sm line-clamp-1 text-ellipsis">{title}</span>
        <div className="flex items-center justify-center">
          {isHovered && <CloseButton onClick={onClose} className="text-danger" />}
        </div>
      </div>

      {/* Injection container for composite rendering */}
      <div
        className="relative overflow-hidden pointer-events-none"
        style={{ width: compositeSize.width, height: compositeSize.height }}
      >
        <div ref={setRef} className="absolute origin-top-left">
          {/* Composite injected by render loop */}
        </div>
      </div>
    </div>
  )
})
