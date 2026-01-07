interface Props {
  style?: React.CSSProperties
  className?: string
  childrenStyle?: React.CSSProperties
  childrenClassName?: string
  children: React.ReactNode
  showOverlay?: boolean
}

export function ScrollableContainer({
  style,
  className,
  childrenStyle,
  childrenClassName,
  children,
  showOverlay = true,
}: Props) {
  return (
    <div className={`relative flex flex-1 overflow-hidden ${className ?? ""}`} style={style ?? {}}>
      {/* Pseudo-elements to create a gradient fade effect on the edge of the scrollable area */}
      {showOverlay && (
        <>
          <div className="absolute top-0 left-0 right-0 h-4 pointer-events-none bg-linear-to-b from-window/75 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none bg-linear-to-t from-window/75 to-transparent z-10" />
        </>
      )}

      <div
        className={`flex-1 overflow-y-auto ${childrenClassName ?? ""}`}
        style={childrenStyle ?? {}}
      >
        {children}
      </div>
    </div>
  )
}
