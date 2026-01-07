import { Suspense, useMemo, useRef } from "react"
import { processService } from "@core/services/processService"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { LauncherProgramTarget } from "@features/launcher/types"
import { useProgramComponent } from "@features/program/hooks/useProgramComponent"
import { getProgramMeta } from "@features/program/registry"
import { useTheme } from "@features/theme/hooks/useTheme"
import { ContentComponent } from "@shared/components/ContentComponent"
import { ProgramLoading } from "@shared/components/ProgramLoading"
import { AppCard } from "./AppCard"
import { debugMessage } from "@shared/utils/utils"

export function AppCardInstance({ id }: { id: string }) {
  const appCard = useAppStackStore((state) => state.appCards[id])
  const appCardRef = useRef<HTMLDivElement | null>(null)

  const process = processService.getProcess(appCard.processId)
  const launchTarget = process.launcher.target as LauncherProgramTarget

  const programMeta = getProgramMeta(process?.programId)

  const component = useProgramComponent(process?.programId)

  const theme = useTheme()
  const shellColor = theme.colors.shell
  const surfaceColor = theme.colors.surface

  function getHeaderColor() {
    return programMeta?.background?.color ?? shellColor
  }

  function getBackgroundColor() {
    return surfaceColor
  }

  debugMessage("Rendering AppCardInstance", appCard)

  const memoizedComponent = useMemo(
    () =>
      component && (
        <Suspense fallback={<ProgramLoading />}>
          <ContentComponent
            component={component}
            args={{ displayId: id, ...(launchTarget.args ?? {}) }}
          />
        </Suspense>
      ),
    [id, launchTarget, component],
  )

  return (
    <AppCard
      state={appCard}
      ref={appCardRef}
      headerColor={getHeaderColor()}
      backgroundColor={getBackgroundColor()}
    >
      {memoizedComponent}
    </AppCard>
  )
}
