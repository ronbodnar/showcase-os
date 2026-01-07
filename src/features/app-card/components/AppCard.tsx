import { memo } from "react"
import { AppCardState } from "../types"
import { ScrollableContainer } from "@shared/components/ScrollableContainer"
import { debugMessage } from "@shared/utils/utils"

export type AppCardProps = {
  state: AppCardState
  ref: React.RefObject<HTMLDivElement | null>
  headerColor: string
  backgroundColor: string
  children: React.ReactNode
}

export const AppCard = memo(function AppCard({
  state,
  ref,
  headerColor,
  backgroundColor,
  children,
}: AppCardProps) {
  const { id, title } = state

  debugMessage("Rendering AppCard:", title, state)

  return (
    <div key={id} ref={ref} className="flex flex-col h-full">
      <h1
        className="flex justify-around items-end w-full text-lg text-text sticky top-0 z-10 pb-2"
        style={{
          backgroundColor: headerColor,
          height: "4rem",
        }}
      >
        <span className="line-clamp-1">{title}</span>
      </h1>

      <ScrollableContainer style={{ backgroundColor }}>{children}</ScrollableContainer>
    </div>
  )
})
