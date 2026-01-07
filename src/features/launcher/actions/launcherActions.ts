import { gridService } from "@features/grid/services/gridService"
import { panelService } from "@core/services/panelService"
import { LauncherMetadata } from "../types"
import { debugMessage } from "@shared/utils/utils"
import { launcherService } from "../services/launcherService"

export type LauncherAction =
  | "openUrl"
  | "launchProgram"
  | "panelSettings"
  | "closeLauncherWindows"
  | "deleteLauncherFromHome"
  | "addLauncherToHome"
  | "addLauncherToPanel"
  | "unpinLauncherFromPanel"

export const launcherActionRegistry: Record<
  LauncherAction,
  (args?: Record<string, unknown>) => void
> = {
  openUrl: (args) => {
    const url = args?.url
    if (typeof url !== "string") {
      debugMessage(`Cannot open URL. URL is not a string: "${url}"`)
      return
    }
    window.open(url, "_blank")
  },

  launchProgram: (args) => {
    const id = args?.id
    if (typeof id !== "string") {
      debugMessage(`Cannot launch program without a valid id. "${id}" is not valid.`)
      return
    }

    launcherService.openLauncherById(id)
  },

  panelSettings: () => {
    // Possible future feature, could include height/width and anchoring (top/bottom/left/right)
    debugMessage("Selected panel settings")
  },

  closeLauncherWindows: (args) => {
    const id = args?.id
    if (typeof id !== "string") {
      debugMessage("Cannot close launcher without an ID")
      return
    }
    launcherService.closeWindows(id)
  },

  deleteLauncherFromHome: (args) => {
    const id = args?.id
    if (typeof id !== "string") {
      debugMessage("Cannot delete launcher without an ID")
      return
    }
    launcherService.deleteFromGrid("home", id)
  },

  addLauncherToHome: (args) => {
    const meta = args?.meta as LauncherMetadata
    if (!meta) {
      debugMessage("Cannot add launcher to home screen without a LauncherMetadata")
      return
    }
    gridService.addLauncher("home", meta)
  },

  addLauncherToPanel: (args) => {
    const id = args?.id as string
    const meta = args?.meta as LauncherMetadata
    if (!meta && typeof id !== "string") {
      debugMessage("Cannot add launcher to panel without metadata or a store ID")
      return
    }

    if (meta) {
      panelService.addLauncher(meta, true)
    } else {
      panelService.addLauncherById(id, true)
    }
  },

  unpinLauncherFromPanel: (args) => {
    const id = args?.id
    if (typeof id !== "string") {
      debugMessage("Cannot unpin launcher from panel without an ID")
      return
    }
    panelService.unpinLauncher(id)
  },
}

export function executeLauncherAction(action: LauncherAction, args?: Record<string, unknown>) {
  const handler = launcherActionRegistry[action]
  if (typeof handler !== "function") {
    debugMessage(`Action ${action} is not a registered function`)
    return
  }
  handler(args)
}
