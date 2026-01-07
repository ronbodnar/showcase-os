export function LauncherLabel({
  label,
  isMobile,
  isHovered,
  isSelected,
  className,
}: {
  label: string | undefined
  isMobile: boolean
  isHovered: boolean
  isSelected: boolean
  className?: string
}) {
  if (!label) return null

  const maxLabelLength = isMobile ? 14 : 11
  const padding = isMobile
    ? "pt-1"
    : label.length > maxLabelLength
      ? "py-0.5"
      : "pt-1 pb-1.5 px-1 leading-none"

  const backgroundColor =
    isHovered && !isSelected ? "bg-shell/50" : isSelected ? "bg-accent/80" : "bg-transparent"

  return (
    <div className={`mt-1 rounded-sm ${padding} ${backgroundColor} ${className}`}>
      <p
        className={`
        text-center text-xs 
        ${isMobile ? "line-clamp-1" : "line-clamp-2 text-shadow-xs text-shadow-black"}`}
        style={{ maxWidth: `${maxLabelLength}ch` }}
      >
        {label}
      </p>
    </div>
  )
}
