import { systemService } from "@core/services/systemService"
import {
  LauncherAction,
  launcherActionRegistry,
  executeLauncherAction,
} from "@features/launcher/actions/launcherActions"
import { debugMessage } from "@shared/utils/utils"

export type SystemAction =
  | "lockScreen"
  | "promptShutdown"
  | "reboot"
  | "shutdown"
  | "resetHomeScreen"

const systemActionRegistry: Record<SystemAction, (args?: Record<string, unknown>) => void> = {
  lockScreen: () => systemService.lockScreen(),
  promptShutdown: () => systemService.promptShutdown(),
  reboot: () => systemService.reboot(),
  shutdown: () => systemService.shutdown(),
  resetHomeScreen: () => systemService.resetHomeScreen(),
}

export function executeAction(
  action: LauncherAction | SystemAction,
  args?: Record<string, unknown>,
) {
  if (systemActionRegistry[action as SystemAction]) {
    executeSystemAction(action as SystemAction, args)
  } else if (launcherActionRegistry[action as LauncherAction]) {
    executeLauncherAction(action as LauncherAction, args)
  }
}

export function executeSystemAction(action: SystemAction, args?: Record<string, unknown>) {
  const handler = systemActionRegistry[action]
  if (typeof handler !== "function") {
    debugMessage(`Action ${action} is not a registered system function`)
    return
  }
  handler(args)
}
