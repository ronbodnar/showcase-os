import React from "react"
import { PROGRAM_COMPONENTS } from "@features/program/components"
import { ProgramId } from "@features/program/types"

interface ProgramNavigation {
  canGoBack: () => boolean
  goBack: () => void
}

const navigationHandlers: Record<string, ProgramNavigation> = {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const programComponentMap = new Map<ProgramId, React.ComponentType<any>>()

export const programService = {
  // Bridges OS title bar controls to internal program navigation state.
  registerNavigationHandler: (id: string, handler: ProgramNavigation) => {
    navigationHandlers[id] = handler
  },

  unregisterNavigationHandler: (id: string) => {
    delete navigationHandlers[id]
  },

  getNavigationHandler: (id: string) => navigationHandlers[id],

  loadProgramComponent: (id: ProgramId) => {
    if (programComponentMap.has(id)) {
      return programComponentMap.get(id)!
    }

    const entry = PROGRAM_COMPONENTS[id]
    if (!entry) return undefined

    if ("component" in entry) {
      programComponentMap.set(id, entry.component)
      return entry.component
    }

    const lazyComp = React.lazy(async () => {
      const module = await entry.loader()
      return { default: module.default }
    })

    programComponentMap.set(id, lazyComp)
    return lazyComp
  },
}
