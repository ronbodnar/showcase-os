import Icon from "@shared/components/Icon"

export function CloseButton({
  onClick,
  className,
}: {
  onClick?: (e: React.MouseEvent) => void
  className?: string
}) {
  return (
    <button
      className="relative w-6.5 h-6.5 flex items-center justify-center hover:brightness-110"
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <svg viewBox="0 0 18 18" className={`absolute inset-0 w-full h-full ${className}`}>
        <circle cx="9" cy="9" r="6" fill="currentColor" />
      </svg>

      <Icon name="WindowClose" className="text-white" />
    </button>
  )
}
