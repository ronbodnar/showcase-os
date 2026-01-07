import { Button } from "@shared/components/button/Button"
import Icon from "@shared/components/icon/Icon"
import { CloseButton } from "./CloseButton"

interface Props {
  isFocused: boolean
  isMaximized: boolean
  titleText?: string
  hideControls?: boolean
  onClose?: (e: React.MouseEvent) => void
  onMinimize?: (e: React.MouseEvent) => void
  onMaximize?: (e: React.MouseEvent) => void
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void
  onBackNavigation?: (() => void) | undefined
}

export function WindowTitleBar({
  titleText,
  hideControls,
  isMaximized,
  isFocused,
  onClose,
  onMinimize,
  onMaximize,
  onPointerDown,
  onBackNavigation,
}: Props) {
  return (
    <div
      className="relative w-full h-10 bg-window text-text rounded-t-lg text-sm flex items-center justify-center"
      onPointerDown={onPointerDown}
      onDoubleClickCapture={onMaximize}
      style={{ touchAction: "none" }}
    >
      {onBackNavigation !== undefined && (
        <div className="absolute left-1">
          <Button
            color="window"
            onClick={onBackNavigation}
            className="p-1 text-text rounded-sm hover:shadow-lg"
          >
            <Icon name="ChevronLeft" className="w-5 h-5" />
          </Button>
        </div>
      )}

      <h5>{titleText}</h5>

      {!hideControls && (
        <div className="absolute right-1 space-x-2 flex items-center">
          <MinimizeButton onClick={onMinimize} />

          {isMaximized ? (
            <RestoreButton onClick={onMaximize} />
          ) : (
            <MaximizeButton onClick={onMaximize} />
          )}

          <CloseButton onClick={onClose} className={isFocused ? "text-accent" : "text-muted"} />
        </div>
      )}
    </div>
  )
}

function MinimizeButton({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick} className="hover:bg-surface-hover-alt rounded-full p-0.5">
      <Icon name="WindowMinimize" />
    </button>
  )
}

function MaximizeButton({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick} className="hover:bg-surface-hover-alt rounded-full p-0.5">
      <Icon name="WindowMaximize" />
    </button>
  )
}

function RestoreButton({ onClick }: { onClick?: (e: React.MouseEvent) => void }) {
  return (
    <button onClick={onClick} className="hover:bg-surface-hover-alt rounded-full p-0.5">
      <Icon name="WindowRestore" />
    </button>
  )
}
