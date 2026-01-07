import { ProgramId } from "../types"
import StartMenu from "./StartMenu/StartMenu"

export const PROGRAM_COMPONENTS: Partial<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Record<ProgramId, { loader: () => Promise<any> } | { component: React.ComponentType<any> }>
> = {
  app_drawer: { loader: () => import("./AppDrawer/AppDrawer") },
  browser: { loader: () => import("./Browser/Browser") },
  photo_viewer: { loader: () => import("./PhotoViewer/PhotoViewer") },
  software_center: { loader: () => import("./SoftwareCenter/SoftwareCenter") },

  start_menu: { component: StartMenu },

  system_info: { loader: () => import("./SystemInfo/SystemInfo") },
  system_settings: { loader: () => import("./SystemSettings/SystemSettings") },
  terminal: { loader: () => import("./Terminal/Terminal") },
  visual_studio_code: { loader: () => import("./VisualStudioCode/VisualStudioCode") },
}
