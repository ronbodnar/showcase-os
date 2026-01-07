import { useEffect, useState } from "react"
import { SoftwareCenterDetails } from "./SoftwareCenterDetails"
import { programService } from "@features/program/services/programService"
import { useAppStackStore } from "@core/store/useAppStackStore"
import { useOSStore } from "@core/store/useOSStore"
import { getProgramMeta } from "@features/program/registry"
import { ProgramId } from "@features/program/types"
import { useWindowStore } from "@features/window/store/useWindowStore"
import { AnimatePresence, motion } from "motion/react"
import { SoftwareCenterMain } from "./SoftwareCenterMain"

export interface SoftwareCenterProps {
  displayId: string
  program: ProgramId
}

export default function SoftwareCenter({ displayId, program }: SoftwareCenterProps) {
  const [activeProgram, setActiveProgram] = useState<ProgramId | undefined>(program)
  const isDesktop = useOSStore((state) => state.platform === "desktop")
  const setTitle = isDesktop
    ? useWindowStore.getState().setTitle
    : useAppStackStore.getState().setTitle

  useEffect(() => {
    programService.registerNavigationHandler(displayId, {
      canGoBack: () => activeProgram !== undefined,
      goBack: () => setActiveProgram(undefined),
    })

    return () => programService.unregisterNavigationHandler(displayId)
  }, [displayId, activeProgram])

  useEffect(() => {
    if (!activeProgram) {
      setTitle(displayId, "Software Center")
      return
    }

    const programMeta = getProgramMeta(activeProgram)
    setTitle(displayId, `${programMeta.name} – Software Center`)
  }, [displayId, activeProgram, setTitle])

  return (
    <AnimatePresence mode="wait">
      {activeProgram ? (
        <motion.div
          key="softareCenterDetails"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <SoftwareCenterDetails
            programId={activeProgram}
            programMeta={getProgramMeta(activeProgram)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="softwareCenterMain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full h-full"
        >
          <SoftwareCenterMain onSelectProgram={setActiveProgram} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
