import { LauncherAction } from "@features/launcher/actions/launcherActions"
import { SystemAction } from "./actions/systemRegistry"

export type OSAction = LauncherAction | SystemAction

export function isSystemAction(action: OSAction): action is SystemAction {
  return typeof action === "string"
}
