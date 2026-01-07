import { GridContainer } from "@features/grid/components/GridContainer"
import { useLauncherStore } from "@features/launcher/store/useLauncherStore"

export function HomeScreen({ className }: { className?: string }) {
  const launchers = useLauncherStore((state) => state.launchersByGrid["home"]) || []
  const iconSize = 48

  return (
    <div className={`w-full h-full flex flex-col gap-3 ${className}`}>
      <GridContainer
        id="home"
        iconSize={iconSize}
        launchers={launchers}
        showGridLines={false}
        isGridResponsive={true}
        useMobileLauncher={true}
      />
    </div>
  )
}
